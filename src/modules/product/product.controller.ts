import {FastifyReply, FastifyRequest} from "fastify";
import {createProduct, findProductById, getProducts, removeProductById, updateProduct} from "./product.service";
import {CreateProductInput, FindeProducSchema} from "./product.schema";

export async function test() {
    return 'aqui';
}

export async function getProductsHandler(request: FastifyRequest<any>, reply: FastifyReply) {
    try {
        const products: any[] = await getProducts();
        return reply.code(201).send(products);
    } catch (error: any) {
        console.log(error);
        return reply.code(500).send(error);
    }
}

export async function getProductByIdHandler(request: FastifyRequest<{ Params: FindeProducSchema; }>, reply: FastifyReply) {
    try {
        const product = await findProductById(Number(request?.params?.id));
        return reply.code(201).send(product);
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }
}

export async function postProductHandler(request: FastifyRequest<{ Body: CreateProductInput; }> | any, reply: FastifyReply) {
    try {
        const product = await createProduct({...request.body, ownerId: request?.user?.id});
        return reply.code(201).send(product);
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }
}

export async function putProductHandler(
    request: FastifyRequest<{ Body: CreateProductInput; Params: FindeProducSchema; }>, reply: FastifyReply) {
    try {
        const product = await updateProduct(Number(request?.params?.id), request?.body);
        return reply.code(201).send(product);
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }
}

export async function deleteProductByIdHandler(request: FastifyRequest<{ Params: FindeProducSchema; }>, reply: FastifyReply) {
    try {
        const product = await removeProductById(Number(request?.params?.id));
        return reply.code(201).send(product);
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }
}
