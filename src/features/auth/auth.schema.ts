import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom est obligatoire")
    .max(20, "Le nom est trop long"),
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const signInSchema = signUpSchema.omit({
  name: true,
});

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
