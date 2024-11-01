import { z } from "zod";

export const zRegister = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character in !@#$%^&*(),.?\":{}|<>"),
});

export type TypeZRegister = z.infer<typeof zRegister>;