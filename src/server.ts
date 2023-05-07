import Fastify, {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import fjwt, {JWT} from "@fastify/jwt";
import swagger from "@fastify/swagger";
import {withRefResolver} from "fastify-zod";
import {userSchemas} from "./modules/user/user.schema";
import {productSchemas} from "./modules/product/product.schema";
import userRoutes from "./modules/user/user.route";
import productRoutes from "./modules/product/product.route";
import {loginSchemas} from "./modules/auth/auth.schema";
import authRoutes from "./modules/auth/auth.route";

declare module "fastify" {
    interface FastifyRequest {
        jwt: JWT;
    }

    export interface FastifyInstance {
        authenticate: any;
    }
}

function buildJwtService(server: FastifyInstance | any): any {
    server.register(fjwt, {secret: "ndkandnan78duy9sau87dbndsa89u7dsy789adb"});

    server.decorate(
        "authenticate",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify();
            } catch (e) {
                return reply.send(e);
            }
        }
    );

    server.get("/healthcheck", async function () {
        return {status: "OK"};
    });

    server.addHook("preHandler", (req: any, reply: any, next: any) => {
        req.jwt = server.jwt;
        return next();
    });
}

function upSchemas(server: FastifyInstance | any): void {
    for (const schema of [...userSchemas, ...productSchemas, ...loginSchemas]) {
        server.addSchema(schema);
    }
}

function buildSwaggerService(server: FastifyInstance | any): void {
    server.register(
        swagger,
        withRefResolver({
            routePrefix: "/docs",
            exposeRoute: true,
            staticCSP: true,
            openapi: {
                info: {
                    title: "Fastify API",
                    description: "API for some products",
                    version: '1.0.0',
                },
            },
        })
    );
}

function upRoutes(server: FastifyInstance | any): void {
    server.register(authRoutes, {prefix: "api/v1/auth"});
    server.register(userRoutes, {prefix: "api/v1/users"});
    server.register(productRoutes, {prefix: "api/v1/products"});
}

function setCrossOrigin(server: FastifyInstance | any): void {
    server.register(require('@fastify/cors'), {
        origin: "*",
    });
}

function buildServer() {
    const server = Fastify();

    buildJwtService(server);
    upSchemas(server);
    buildSwaggerService(server);
    upRoutes(server);
    setCrossOrigin(server);

    return server;
}

export default buildServer;
