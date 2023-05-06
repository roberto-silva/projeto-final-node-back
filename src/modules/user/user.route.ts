import {FastifyInstance} from "fastify";
import {
    deleteUsersByEmailHandler,
    getUsersByEmailHandler,
    getUsersHandler,
    loginHandler,
    registerUserHandler,
    updateUserHandler,
} from "./user.controller";
import {$ref} from "./user.schema";

async function userRoutes(server: FastifyInstance) {

    server.get("/", {preHandler: [server.authenticate]}, getUsersHandler);

    server.get("/:email", {preHandler: [server.authenticate]}, getUsersByEmailHandler)

    server.post("/", {
        schema: {
            body: $ref("createUserSchema"),
            response: {201: $ref("createUserResponseSchema"),},
        },
    }, registerUserHandler);

    server.put("/:email", {
        preHandler: [server.authenticate],
        schema: {
            body: $ref("loginSchema"),
            response: {201: $ref("createUserResponseSchema"),},
        },
    }, updateUserHandler);

    server.post("/login", {
        schema: {
            body: $ref("loginSchema"),
            response: {200: $ref("loginResponseSchema")}
        }
    }, loginHandler);

    server.delete("/:email", {preHandler: [server.authenticate]}, deleteUsersByEmailHandler);
}

export default userRoutes;
