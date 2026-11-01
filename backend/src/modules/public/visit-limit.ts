import { createHash } from "node:crypto";
import type { onRequestHookHandler } from "fastify";

/** One synchronous reservation per IP/agent; concurrent requests cannot both pass. */
export function createVisitLimit(): onRequestHookHandler {
  const expires = new Map<string, number>();
  const windowMs = 60 * 60 * 1000;
  const capacity = 50_000;
  return (request, reply, done) => {
    const now = Date.now();
    const key = createHash("sha256")
      .update(JSON.stringify([request.ip, request.headers["user-agent"]?.trim() ?? ""]))
      .digest("hex");
    const expiry = expires.get(key);
    let retryMs = expiry ? expiry - now : 0;
    if (retryMs <= 0) {
      if (expires.size >= capacity) {
        for (const [storedKey, until] of expires) {
          if (until <= now) expires.delete(storedKey);
        }
      }
      if (!expires.has(key) && expires.size >= capacity) {
        // Never evict an active reservation and let repeat visits through.
        retryMs = Math.min(...expires.values()) - now;
      } else {
        expires.set(key, now + windowMs);
        done();
        return;
      }
    }
    reply.header("Retry-After", Math.max(1, Math.ceil(retryMs / 1000)));
    reply.code(429).send({ success: false, code: "VISIT_RATE_LIMIT", message: "Lượt truy cập đã được ghi nhận. Vui lòng thử lại sau." });
  };
}
