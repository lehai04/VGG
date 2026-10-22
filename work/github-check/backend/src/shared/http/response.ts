import type { FastifyReply } from "fastify";

export function ok<T>(reply: FastifyReply, data: T, message = "") {
  return reply.send({ success: true, data, message });
}

export function fail(reply: FastifyReply, status: number, message: string, code = "REQUEST_ERROR") {
  return reply.code(status).send({ success: false, message, code });
}

