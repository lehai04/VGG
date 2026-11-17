import {
  createHmac,
  randomBytes,
  randomInt,
  timingSafeEqual,
} from "node:crypto";
import type { FastifyInstance } from "fastify";
import multipart from "@fastify/multipart";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../shared/database/prisma.js";
import { fail, ok } from "../../shared/http/response.js";

import catalogue from "./course-catalogue.json" with { type: "json" };

const prefix = "/api/public/knowledge-registrations";
const maxFileSize = 3 * 1024 * 1024;
const captchaKey = process.env.KNOWLEDGE_CAPTCHA_SECRET || randomBytes(32);
const sign = (value: string) =>
  createHmac("sha256", captchaKey).update(value).digest("hex");

const required = z.string().trim().min(1).max(240);
const optional = z.string().trim().max(240).optional();
const year = z.string().regex(/^[0-9]{4}$/);
const date = z.string().refine((value) => {
  const match = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.exec(value);
  if (!match) return false;
  const [, day, month, yyyy] = match;
  const iso = `${yyyy}-${month}-${day}`;
  const parsed = new Date(iso);
  return !Number.isNaN(+parsed) && parsed.toISOString().slice(0, 10) === iso;
});
const optionalDate = date.or(z.literal("")).optional();
const input = z
  .object({
    citizenId: z
      .string()
      .trim()
      .regex(/^[0-9]{12}$/),
    fullName: required,
    email: z.string().trim().max(190).pipe(z.email()),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9][0-9 ().-]{7,19}$/),
    graduateMajor: required,
    masterProgramme: required,
    courses: z.preprocess((value) => {
      if (typeof value !== "string") return value;
      try {
        return JSON.parse(value);
      } catch {
        return undefined;
      }
    }, z.array(required).max(20)),
    birthDate: date.or(year),
    birthplace: required,
    gender: z.enum(["Nam", "Nữ"]),
    address: required,
    identityIssuedDate: date,
    identityIssuedAt: required,
    university: required,
    graduateYear: year,
    diplomaNumber: optional,
    diplomaRegistry: optional,
    diplomaDate: optionalDate,
    decisionNumber: optional,
    decisionDate: optionalDate,
    secondUniversity: optional,
    secondMajor: optional,
    secondYear: year.or(z.literal("")).optional(),
    secondDiplomaNumber: optional,
    secondDiplomaRegistry: optional,
    secondDiplomaDate: optionalDate,
    secondDecisionNumber: optional,
    secondDecisionDate: optionalDate,
    schedule: z.literal("weekend-online"),
    note: z.string().trim().max(2000).optional(),
    captchaToken: z.string().max(160),
    captchaAnswer: z
      .string()
      .trim()
      .regex(/^[0-9]{1,2}$/),
  })
  .strict();

function validCaptcha(token: string, answer: string) {
  const [expires, nonce, signature] = token.split(".");
  if (
    !/^[0-9]{13}$/.test(expires ?? "") ||
    Number(expires) < Date.now() ||
    !/^[a-f0-9]{32}$/.test(nonce ?? "") ||
    !/^[a-f0-9]{64}$/.test(signature ?? "")
  )
    return false;
  return timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(sign(`${expires}.${nonce}.${Number(answer)}`), "hex"),
  );
}

function attachmentType(bytes: Buffer) {
  if (bytes.subarray(0, 5).equals(Buffer.from("%PDF-")))
    return "application/pdf";
  if (bytes.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])))
    return "image/jpeg";
  if (
    bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  )
    return "image/png";
}

export async function knowledgePublicRoutes(app: FastifyInstance) {
  await app.register(multipart, {
    limits: {
      files: 4,
      fields: 36,
      parts: 40,
      fileSize: maxFileSize,
      fieldSize: 8192,
    },
  });
  app.addHook("onRequest", async (_request, reply) => {
    reply.header("Cache-Control", "no-store");
  });
  app.get(
    prefix,
    { config: { rateLimit: { max: 30, timeWindow: "1 minute" } } },
    async (_request, reply) => {
      const a = randomInt(1, 10);
      const b = randomInt(1, 10);
      const challenge = `${Date.now() + 15 * 60_000}.${randomBytes(16).toString("hex")}`;
      return ok(reply, {
        question: `${a} + ${b} =`,
        token: `${challenge}.${sign(`${challenge}.${a + b}`)}`,
      });
    },
  );
  app.post(
    prefix,
    { config: { rateLimit: { max: 12, timeWindow: "5 minutes" } } },
    async (request, reply) => {
      if (!request.isMultipart())
        return fail(
          reply,
          415,
          "Vui lòng gửi biểu mẫu kèm hồ sơ.",
          "MULTIPART_REQUIRED",
        );
      const fields: Record<string, unknown> = Object.create(null);
      const attachments: Prisma.KnowledgeAttachmentCreateWithoutRegistrationInput[] =
        [];
      const fileFields = new Set([
        "diploma",
        "transcript",
        "secondDiploma",
        "secondTranscript",
      ]);
      for await (const part of request.parts()) {
        if (part.type === "field") {
          if (part.valueTruncated || Object.hasOwn(fields, part.fieldname))
            return fail(
              reply,
              400,
              "Trường dữ liệu không hợp lệ.",
              "VALIDATION_ERROR",
            );
          fields[part.fieldname] = part.value;
          continue;
        }
        const bytes = await part.toBuffer();
        if (!fileFields.delete(part.fieldname))
          return fail(reply, 400, "Tệp đính kèm không hợp lệ.", "FILE_FIELD");
        if (!part.filename && !bytes.length) continue;
        const mediaType = attachmentType(bytes);
        if (!mediaType)
          return reply.code(400).send({
            success: false,
            message: "Chỉ hỗ trợ tệp PDF, JPG và PNG.",
            code: "FILE_TYPE",
            fields: [part.fieldname],
          });
        attachments.push({
          field: part.fieldname,
          filename: part.filename
            .replace(/[\u0000-\u001f\u007f]/g, "")
            .slice(0, 160),
          mediaType,
          bytes: Uint8Array.from(bytes),
        });
      }
      const parsed = input.safeParse(fields);
      if (!parsed.success)
        return reply.code(400).send({
          success: false,
          message: "Vui lòng kiểm tra thông tin đã nhập.",
          code: "VALIDATION_ERROR",
          fields: Object.keys(z.flattenError(parsed.error).fieldErrors),
        });
      const {
        captchaToken,
        captchaAnswer,
        citizenId,
        fullName,
        email,
        phone,
        graduateMajor,
        masterProgramme,
        courses,
        ...details
      } = parsed.data;
      if (!validCaptcha(captchaToken, captchaAnswer))
        return fail(
          reply,
          400,
          "Mã bảo mật sai hoặc đã hết hạn. Vui lòng thử lại.",
          "INVALID_CAPTCHA",
        );
      if (
        !["diploma", "transcript"].every((field) =>
          attachments.some((file) => file.field === field),
        )
      )
        return fail(
          reply,
          400,
          "Vui lòng đính kèm văn bằng và bảng điểm đại học.",
          "FILES_REQUIRED",
        );
      const programme = catalogue.programmes.find(
        ({ id }) => id === masterProgramme,
      );
      if (
        !programme ||
        new Set(courses).size !== courses.length ||
        courses.some((course) => !programme.courses.includes(course))
      ) {
        return fail(
          reply,
          400,
          "Vui lòng kiểm tra ngành Thạc sĩ và các học phần đã chọn.",
          "INVALID_COURSES",
        );
      }
      try {
        await prisma.knowledgeRegistration.create({
          data: {
            citizenId,
            fullName,
            email,
            phone,
            graduateMajor,
            masterProgramme: programme.name,
            details: {
              ...details,
              courses,
              estimatedTuition: courses.length * catalogue.tuitionPerCourse,
            },
            attachments: { create: attachments },
          },
          select: { id: true },
        });
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          return fail(
            reply,
            409,
            "Số CCCD này đã có hồ sơ đăng ký bổ sung kiến thức.",
            "DUPLICATE_CITIZEN_ID",
          );
        }
        request.log.error("Unable to save knowledge registration");
        return fail(
          reply,
          500,
          "Không thể lưu hồ sơ. Vui lòng thử lại.",
          "REGISTRATION_FAILED",
        );
      }
      return reply.code(201).send({
        success: true,
        message: "Viện đã tiếp nhận hồ sơ đăng ký bổ sung kiến thức.",
      });
    },
  );
}
