import test from "node:test";
import assert from "node:assert/strict";
import {
  hashPassword,
  verifyPassword,
} from "../dist/modules/consultation-admin/password.js";
test("password hashes are salted, verify correctly and fail closed", async () => {
  const password = "Mật-khẩu-kiểm-thử-123";
  const first = await hashPassword(password);
  const second = await hashPassword(password);
  assert.notEqual(first, second);
  assert.equal(await verifyPassword(password, first), true);
  assert.equal(await verifyPassword("wrong", first), false);
  assert.equal(await verifyPassword(password, "corrupt"), false);
});
