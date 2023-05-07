import {z} from "zod";
import {buildJsonSchemas} from "fastify-zod";

const userCore = {
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
        .email(),
    name: z.string(),
};

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }),
});

const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore,
});

const updateUserSchema = z.object({
    id: z.number(),
    ...userCore,
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }),
});

const findeUserSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
        .email(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type FindeUserInput = z.infer<typeof findeUserSchema>;

export const {schemas: userSchemas, $ref} = buildJsonSchemas({
    createUserSchema,
    updateUserSchema,
    createUserResponseSchema,
    findeUserSchema
});
