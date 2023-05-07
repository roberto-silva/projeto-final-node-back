import {FastifyInstance} from "fastify";
import {
    postProductHandler,
    getProductByIdHandler,
    getProductsHandler,
    test,
    putProductHandler, deleteProductByIdHandler
} from "./product.controller";
import {isAuthenticate} from "../../utils/hash";
import {$ref} from "./product.schema";

const findProductsResponse: any = {
    schema: {
        response: {200: $ref("productsResponseSchema"),},
    },
};

const modifyProducts: any = {
    schema: {
        body: $ref("createProductSchema"),
        response: {201: $ref("productResponseSchema"),},
    }
};

async function productRoutes(server: FastifyInstance) {

    server.get("/", {...isAuthenticate(server), ...findProductsResponse}, getProductsHandler);

    server.get("/:id", isAuthenticate(server), getProductByIdHandler);

    server.post("/", {...isAuthenticate(server), ...modifyProducts}, postProductHandler);

    server.put("/:id", {...isAuthenticate(server), ...modifyProducts}, putProductHandler);

    server.delete("/:id", isAuthenticate(server), deleteProductByIdHandler);
}

export default productRoutes;
