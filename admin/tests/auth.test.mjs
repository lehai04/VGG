import assert from "node:assert/strict";
import test from "node:test";
import { access, readFile } from "node:fs/promises";
import { hashPassword, passwordSchema, verifyPassword } from "../src/lib/auth/password.ts";
import { hashSessionToken } from "../src/lib/auth/token.ts";

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
