import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import {
  createSsoState,
  verifySsoState,
  getSsoConfig,
  buildAuthorizationUrl,
} from "../src/lib/auth/sso.ts";

test("SSO State: creates valid signed state and verifies successfully", () => {
  const { state, cookieValue } = createSsoState("microsoft", "/admin/users");
  assert.ok(state.length >= 16);
  assert.ok(cookieValue.length > 20);

  const verification = verifySsoState(cookieValue, state, "microsoft");
  assert.equal(verification.ok, true);
  assert.equal(verification.returnTo, "/admin/users");
});

test("SSO State: rejects invalid nonce, wrong provider, or tampered cookie", () => {
  const { state, cookieValue } = createSsoState("microsoft", "/admin/dashboard");

  // Wrong provider
  const wrongProvider = verifySsoState(cookieValue, state, "google");
  assert.equal(wrongProvider.ok, false);

  // Wrong nonce
  const wrongNonce = verifySsoState(cookieValue, "fake-nonce-12345", "microsoft");
  assert.equal(wrongNonce.ok, false);

  // Missing cookie
  const missingCookie = verifySsoState(null, state, "microsoft");
  assert.equal(missingCookie.ok, false);

  // Tampered cookie
  const tamperedCookie = cookieValue.slice(0, -4) + "AAAA";
  const tampered = verifySsoState(tamperedCookie, state, "microsoft");
  assert.equal(tampered.ok, false);
});

test("SSO URL Builder: builds valid Microsoft and Google authorization URLs", () => {
  const msUrl = buildAuthorizationUrl("microsoft", "test-state-123", "http://localhost:3000/callback");
  assert.ok(msUrl.includes("login.microsoftonline.com"));
  assert.ok(msUrl.includes("response_type=code"));
  assert.ok(msUrl.includes("state=test-state-123"));
  assert.ok(msUrl.includes("prompt=select_account"));

  const gUrl = buildAuthorizationUrl("google", "test-state-456", "http://localhost:3000/callback");
  assert.ok(gUrl.includes("accounts.google.com"));
  assert.ok(gUrl.includes("response_type=code"));
  assert.ok(gUrl.includes("state=test-state-456"));
});

test("SSO Callback Security: verifies route enforces active admin lookup", async () => {
  const routeSource = await readFile(
    new URL("../src/app/api/admin/auth/sso/[provider]/callback/route.ts", import.meta.url),
    "utf8"
  );
  // Ensure database lookup by email
  assert.match(routeSource, /prisma\.admin\.findFirst/);
  // Ensure access control check for status === 'ACTIVE'
  assert.match(routeSource, /admin\.status\s*!==\s*"ACTIVE"/);
  // Ensure audit log is recorded on success and failure
  assert.match(routeSource, /writeAudit/);
  // Ensure cookie is set using existing session helper
  assert.match(routeSource, /createSession/);
  assert.match(routeSource, /setSessionCookie/);
});
