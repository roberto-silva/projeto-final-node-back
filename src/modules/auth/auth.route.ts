import {FastifyInstance} from "fastify";
import {loginHandler} from "./auth.controller";
import {$ref} from "./auth.schema";

const loginUserValidations: any = {
    schema: {
        body: $ref("loginSchema"),
        response: {200: $ref("loginResponseSchema")}
    }
};

async function authRoutes(server: FastifyInstance) {

    server.post("/login", loginUserValidations, loginHandler);
}

export default authRoutes;
