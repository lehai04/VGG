import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { Prisma } from "@prisma/client";

process.env.DATABASE_URL ||= "postgresql://unused:unused@127.0.0.1:1/unused";
process.env.NODE_ENV = "test";
const { buildApp } = await import("../dist/app.js");
const { prisma } = await import("../dist/shared/database/prisma.js");

const publicUrl = "/api/public/knowledge-registrations";
const adminUrl = "/api/admin/knowledge-registrations";

test("knowledge registration validates submissions, rejects duplicate CCCD, and protects the CMS details and files", async (t) => {
  let saved;
  let canManageContent = true;
  const original = {
    create: prisma.knowledgeRegistration.create,
    findMany: prisma.knowledgeRegistration.findMany,
    findUnique: prisma.knowledgeRegistration.findUnique,
    findFile: prisma.knowledgeAttachment.findUnique,
    findSession: prisma.consultationSession.findUnique,
  };
  t.after(() => {
    prisma.knowledgeRegistration.create = original.create;
    prisma.knowledgeRegistration.findMany = original.findMany;
    prisma.knowledgeRegistration.findUnique = original.findUnique;
    prisma.knowledgeAttachment.findUnique = original.findFile;
    prisma.consultationSession.findUnique = original.findSession;
  });
  prisma.knowledgeRegistration.create = async ({ data }) => {
    if (saved?.citizenId === data.citizenId) {
      throw new Prisma.PrismaClientKnownRequestError("Duplicate", {
        code: "P2002",
        clientVersion: "test",
      });
    }
    const { attachments, ...values } = data;
    saved = {
      ...values,
      id: randomUUID(),
      createdAt: new Date(),
      attachments: attachments.create.map((file) => ({
        ...file,
        id: randomUUID(),
      })),
    };
    return { id: saved.id };
  };
  prisma.knowledgeRegistration.findMany = async ({ select }) => [
    Object.fromEntries(Object.keys(select).map((key) => [key, saved[key]])),
  ];
  prisma.knowledgeRegistration.findUnique = async ({ where }) => {
    if (where.id !== saved.id) return null;
    return {
      ...saved,
      attachments: saved.attachments.map(({ id, field, filename }) => ({
        id,
        field,
        filename,
      })),
    };
  };
  prisma.knowledgeAttachment.findUnique = async ({ where }) =>
    saved.attachments.find(({ id }) => id === where.id) ?? null;
  prisma.consultationSession.findUnique = async () => ({
    expiresAt: new Date(Date.now() + 60_000),
    staff: { disabled: false, canManageContent },
  });

  const app = await buildApp();
  t.after(() => app.close());
  const challenge = await app.inject({ url: publicUrl });
  assert.equal(challenge.statusCode, 200);
  const { question, token } = challenge.json().data;
  const answer = question
    .match(/[0-9]+/g)
    .reduce((sum, digit) => sum + Number(digit), 0);
  const pdf = Buffer.from("%PDF-1.4\n%%EOF\n");

  async function submit({
    captchaAnswer = answer,
    transcript = true,
    ...overrides
  } = {}) {
    const form = new FormData();
    const values = {
      citizenId: "001234567890",
      fullName: "Nguyễn Văn A",
      email: "test@example.test",
      phone: "0900000000",
      graduateMajor: "Kế toán",
      masterProgramme: "mba",
      courses: JSON.stringify(["Quản trị học", "Marketing căn bản"]),
      birthDate: "01/01/2001",
      birthplace: "TP. Hồ Chí Minh",
      gender: "Nam",
      address: "TP. Hồ Chí Minh",
      identityIssuedDate: "01/01/2025",
      identityIssuedAt: "TP. Hồ Chí Minh",
      university: "Đại học Văn Lang",
      graduateYear: "2024",
      schedule: "weekend-online",
      captchaToken: token,
      captchaAnswer: String(captchaAnswer),
      note: "Ghi chú",
      ...overrides,
    };
    for (const [key, value] of Object.entries(values)) form.set(key, value);
    form.set(
      "diploma",
      new Blob([pdf], { type: "application/pdf" }),
      "van-bang.pdf",
    );
    if (transcript)
      form.set(
        "transcript",
        new Blob([pdf], { type: "application/pdf" }),
        "bang-diem.pdf",
      );
    const request = new Request("http://localhost" + publicUrl, {
      method: "POST",
      body: form,
    });
    return app.inject({
      url: publicUrl,
      method: "POST",
      headers: { "content-type": request.headers.get("content-type") },
      payload: Buffer.from(await request.arrayBuffer()),
    });
  }
  assert.equal((await submit({ citizenId: "not-a-cccd" })).statusCode, 400);
  assert.equal(
    (await submit({ captchaAnswer: 0 })).json().code,
    "INVALID_CAPTCHA",
  );
  assert.equal(
    (await submit({ transcript: false })).json().code,
    "FILES_REQUIRED",
  );
  for (const overrides of [
    { courses: JSON.stringify(["Kỹ thuật lập trình"]) },
    { courses: JSON.stringify(["Quản trị học", "Quản trị học"]) },
    { masterProgramme: "unknown" },
  ]) {
    assert.equal((await submit(overrides)).json().code, "INVALID_COURSES");
  }
  const results = await Promise.all([submit(), submit()]);
  assert.deepEqual(
    results.map(({ statusCode }) => statusCode).sort(),
    [201, 409],
    results.map(({ body }) => body).join("\n"),
  );
  assert.equal(saved.details.captchaToken, undefined);
  assert.equal(saved.masterProgramme, "Quản trị kinh doanh");
  assert.deepEqual(saved.details.courses, [
    "Quản trị học",
    "Marketing căn bản",
  ]);
  assert.equal(saved.details.estimatedTuition, 2400000);
  assert.equal(saved.citizenId, "001234567890");
  assert.equal(saved.attachments.length, 2);

  const headers = { cookie: `vgg_consultation_session=${"a".repeat(64)}` };
  const detailUrl = `${adminUrl}/${saved.id}`;
  const fileUrl = `${adminUrl}/file/${saved.attachments[0].id}`;
  for (const url of [adminUrl, detailUrl, fileUrl]) {
    assert.equal((await app.inject({ url })).statusCode, 401);
    canManageContent = false;
    assert.equal((await app.inject({ url, headers })).statusCode, 403);
    canManageContent = true;
  }
  const list = await app.inject({ url: adminUrl, headers });
  assert.equal(list.statusCode, 200);
  const [exportRow] = list.json().data.items;
  assert.equal(exportRow.citizenId, undefined);
  assert.equal(exportRow.details, undefined);
  assert.deepEqual(exportRow.courses, ["Quản trị học", "Marketing căn bản"]);
  assert.equal(exportRow.estimatedTuition, 2400000);
  const detail = await app.inject({ url: detailUrl, headers });
  assert.equal(detail.statusCode, 200);
  assert.equal(detail.json().data.item.details.note, "Ghi chú");
  const file = await app.inject({ url: fileUrl, headers });
  assert.match(file.headers["content-disposition"], /^attachment/);
  assert.deepEqual(file.rawPayload, pdf);
});
