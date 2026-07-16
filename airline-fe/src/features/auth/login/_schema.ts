import { z } from "zod";

export const loginSearchSchema = z.object({
  alert: z.string().optional(),
  searchParams: z
    .object({
      redirect: z.string().optional(),
    })
    .optional(),
});
