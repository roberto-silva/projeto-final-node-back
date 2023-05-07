import {FastifyInstance} from "fastify";
import {isAuthenticate} from "../../utils/hash";
import {
    deleteUsersByEmailHandler,
    getUsersByEmailHandler,
    getUsersHandler,
    postUserHandler,
    putUserHandler
} from "./user.controller";
import {$ref} from "./user.schema";

const createUserValidations: any = {
    schema: {
        body: $ref("createUserSchema"),
        response: {201: $ref("createUserResponseSchema"),},
    }
};

const updateUserValidations: any = {
    schema: {
        body: $ref("updateUserSchema"),
        response: {201: $ref("createUserResponseSchema"),},
    }
};

async function userRoutes(server: FastifyInstance) {

    server.get("/", isAuthenticate(server), getUsersHandler);

    server.get("/:email", isAuthenticate(server), getUsersByEmailHandler)

    server.post("/", createUserValidations, postUserHandler);

    server.put("/:email", {...updateUserValidations, ...isAuthenticate(server)}, putUserHandler);

    server.delete("/:email", isAuthenticate(server), deleteUsersByEmailHandler);
}

export default userRoutes;
