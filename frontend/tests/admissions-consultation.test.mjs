import test from "node:test";
import assert from "node:assert/strict";
import { sendAdmissionConsultation } from "../src/features/admissions/consultation-request.js";

test("admissions sends the consultation payload in a POST body to the existing proxy", async () => {
  const payload = { name: "Test", programme: "Marketing", consent: true };
  let request;
  const result = await sendAdmissionConsultation(payload, async (url, options) => {
    request = { url, options };
    return { ok: true };
  });
  assert.equal(request.url, "/api/consultations");
  assert.equal(request.options.method, "POST");
  assert.deepEqual(JSON.parse(request.options.body), payload);
  assert.match(result, /đã tiếp nhận/);
});

test("admissions never reports success for a rejected or unavailable consultation backend", async () => {
  for (const status of [400, 429, 502, 503]) {
    await assert.rejects(sendAdmissionConsultation({}, async () => ({ ok: false, status })));
  }
  await assert.rejects(
    sendAdmissionConsultation({}, async () => {
      throw new Error("offline");
    }),
  );
});
