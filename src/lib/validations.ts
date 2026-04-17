import * as z from "zod";

export const contactSchema = z
  .object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.string().email("Invalid email"),
    confirmEmail: z.string().email("Invalid email"),
    comments: z.string().min(0).max(800, "Max 800 characters").optional(),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails don't match",
    path: ["confirmEmail"],
  });
