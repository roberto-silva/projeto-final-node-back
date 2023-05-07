import {z} from "zod";
import {buildJsonSchemas} from "fastify-zod";

const loginSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
        .email(),
    password: z.string(),
});

const loginResponseSchema = z.object({
    accessToken: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const {schemas: loginSchemas, $ref} = buildJsonSchemas({
    loginSchema,
    loginResponseSchema,
});
