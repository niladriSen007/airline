import { z } from "zod";

export const signupSearchSchema = z.object({
  alert: z.string().optional(),
  searchParams: z
    .object({
      redirect: z.string().optional(),
    })
    .optional(),
});
