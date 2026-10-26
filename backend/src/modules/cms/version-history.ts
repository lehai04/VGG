import { z } from "zod";
export const cmsVersionSchema = z.object({
  schemaVersion: z.literal(1),
  id: z.string().max(150),
  locale: z.enum(["vi", "en"]),
  values: z.record(z.string(), z.string().max(20000)),
  sourceRevision: z.string().max(100),
  event: z.enum(["publish", "baseline"]),
}).strict();
