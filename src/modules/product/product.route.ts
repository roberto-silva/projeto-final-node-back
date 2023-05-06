import {FastifyInstance} from "fastify";
import {
    createProductHandler,
    deleteProductByIdHandler,
    getProductByIdHandler,
    getProductsHandler,
    updateProductHandler
} from "./product.controller";
import {$ref} from "./product.schema";

async function productRoutes(server: FastifyInstance) {

    server.get("/", {
            preHandler: [server.authenticate],
            schema: {
                response: {200: $ref("productsResponseSchema"),},
            },
        },
        getProductsHandler
    );

    server.get("/:id", {preHandler: [server.authenticate]}, getProductByIdHandler);

    server.post("/", {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("createProductSchema"),
                response: {201: $ref("productResponseSchema"),},
            },
        },
        createProductHandler
    );

    server.put("/:id", {
        preHandler: [server.authenticate],
        schema: {
            body: $ref("createProductSchema"),
            response: {201: $ref("productResponseSchema"),},
        },
    }, updateProductHandler);

    server.delete("/:id", {preHandler: [server.authenticate]}, deleteProductByIdHandler);
}

export default productRoutes;
