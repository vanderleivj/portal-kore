import { z } from "zod";

export const FormSchema = z.object({
  username: z.string().min(1, { message: "Usuário é obrigatório" }),
  password: z.string().min(2, { message: "Senha é obrigatória" }),
}) as z.ZodType<{
  username: string;
  password: string;
}>;

export type FormData = z.infer<typeof FormSchema>;
