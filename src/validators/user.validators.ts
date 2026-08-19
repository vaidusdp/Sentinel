import { z } from "zod";

export const createUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name should be atleast 2 charecters"),
    email: z
        .string()
        .trim()
        .email(),
    password: z
        .string()
        .min(8, "Password must be atleast 8 charecters"),
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email(),
    password: z
        .string()
        .min(8, "Password must be atleast 8 charecters"),   
})