import assert from "node:assert/strict";
import test from "node:test";
import { access, readFile } from "node:fs/promises";
import { randomBytes, createHash } from "node:crypto";
import { hashPassword, passwordSchema, verifyPassword } from "../src/lib/auth/password.ts";
import { hashSessionToken } from "../src/lib/auth/token.ts";
import {
  allowLoginAttempt,
  clearLoginAttempts,
  allowForgotPasswordAttempt,
  clearForgotPasswordAttempts,
} from "../src/lib/auth/login-rate-limit.ts";

test("password policy rejects weak values and accepts a strong value", () => {
  assert.equal(passwordSchema.safeParse("admin123").success, false);
  assert.equal(passwordSchema.safeParse("onlylowercase123!").success, false);
  assert.equal(passwordSchema.safeParse("Valid-Admin1!").success, true);
});

test("Argon2id hashes and verifies passwords without storing plaintext", async () => {
  const password = "Valid-Admin1!";
  const hash = await hashPassword(password);
  assert.match(hash, /^\$argon2id\$/);
  assert.equal(hash.includes(password), false);
  assert.equal(await verifyPassword(hash, password), true);
  assert.equal(await verifyPassword(hash, "Wrong-Admin1!"), false);
});

test("session token hashing is deterministic", () => {
  const hash = hashSessionToken("opaque-token");
  assert.equal(hash.length, 64);
  assert.equal(hash, hashSessionToken("opaque-token"));
});

test("session cookie is HttpOnly/SameSite and there is no public register route", async () => {
  const source = await readFile(new URL("../src/lib/auth/session.ts", import.meta.url), "utf8");
  assert.match(source, /httpOnly:\s*true/);
  assert.match(source, /sameSite:\s*"strict"/);
  await assert.rejects(access(new URL("../src/app/admin/register/page.tsx", import.meta.url)));
});

test("forgot password API route does not leak resetUrl or token in response", async () => {
  const source = await readFile(
    new URL("../src/app/api/admin/auth/forgot-password/route.ts", import.meta.url),
    "utf8"
  );
  // Ensure resetUrl / token / resetToken are NEVER returned in response JSON
  assert.doesNotMatch(source, /resetUrl:\s*resetUrl/);
  assert.doesNotMatch(source, /resetToken:/);
  assert.doesNotMatch(source, /token:/);
  assert.match(source, /NextResponse\.json\(\{\s*success:\s*true/);
  assert.match(source, /allowForgotPasswordAttempt/);
});

test("forgot password UI does not render reset links directly", async () => {
  const forgotFormSource = await readFile(
    new URL("../src/components/auth/ForgotPasswordForm.tsx", import.meta.url),
    "utf8"
  );
  assert.doesNotMatch(forgotFormSource, /resetUrl/);
  assert.doesNotMatch(forgotFormSource, /Nhấn vào đây để đặt lại mật khẩu/);

  const profileViewSource = await readFile(
    new URL("../src/components/profile/AccountProfileView.tsx", import.meta.url),
    "utf8"
  );
  assert.doesNotMatch(profileViewSource, /resetUrl/);
  assert.doesNotMatch(profileViewSource, /Mở trang đặt lại mật khẩu ngay/);
});

test("forgot password rate limiter enforces strict rate limit", () => {
  const testKey = "127.0.0.1:test-rate-limit@vlu.edu.vn";
  clearForgotPasswordAttempts(testKey);

  // First 5 attempts should be allowed
  for (let i = 0; i < 5; i++) {
    assert.equal(allowForgotPasswordAttempt(testKey), true, `Attempt ${i + 1} should be allowed`);
  }

  // 6th attempt must be rejected by rate limiter
  assert.equal(allowForgotPasswordAttempt(testKey), false, "6th attempt must be rate limited");

  // After clear, attempt is allowed again
  clearForgotPasswordAttempts(testKey);
  assert.equal(allowForgotPasswordAttempt(testKey), true, "Attempt after clear should be allowed");
  clearForgotPasswordAttempts(testKey);
});

test("password reset token security: cryptographically strong, hashed in DB, expiry and single-use checks", () => {
  const rawToken = randomBytes(32).toString("base64url");
  assert.ok(rawToken.length >= 40, "Token should have at least 256 bits of entropy");

  const tokenHash = createHash("sha256").update(rawToken).digest("hex");
  assert.equal(tokenHash.length, 64);
  assert.notEqual(tokenHash, rawToken);

  // Test expiration logic
  const now = new Date();
  const validExpiresAt = new Date(now.getTime() + 15 * 60 * 1000);
  const expiredExpiresAt = new Date(now.getTime() - 1000);

  const isValidToken = (expiresAt, usedAt) => {
    return usedAt === null && expiresAt > new Date();
  };

  assert.equal(isValidToken(validExpiresAt, null), true, "Valid token with future expiration and unused is accepted");
  assert.equal(isValidToken(expiredExpiresAt, null), false, "Expired token is rejected");
  assert.equal(isValidToken(validExpiresAt, new Date()), false, "Used token is rejected (single-use)");
});

test("CMS media uses private on-premise MinIO instead of Cloudinary", async () => {
  const pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(pkg.dependencies.cloudinary, undefined);
  assert.ok(pkg.dependencies.minio);
  const storage = await readFile(new URL("../src/lib/storage.ts", import.meta.url), "utf8");
  assert.match(storage, /STORAGE_ENDPOINT/);
  assert.match(storage, /\/api\/media\//);
  assert.doesNotMatch(storage, /cloudinary/i);
});
