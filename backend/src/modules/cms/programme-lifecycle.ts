import { z } from "zod";
export const programmeStateInput = z.object({
  id: z.string().startsWith("programme:").max(150),
  action: z.enum(["hide", "restore", "archive"]),
  revision: z.string().nullable(),
}).strict();
export const programmeStateKey = (id: string) => `cms.programme-state.${id}`;
