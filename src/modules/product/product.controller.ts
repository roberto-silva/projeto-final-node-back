import {FastifyReply, FastifyRequest} from "fastify";
import {CreateProductInput, FindeProducSchema} from "./product.schema";
import {createProduct, findProductById, getProducts, removeProductById, updateProduct} from "./product.service";
import {FindeUserInput, LoginInput} from "../user/user.schema";
import {updateUser} from "../user/user.service";

export async function createProductHandler(request: FastifyRequest<{ Body: CreateProductInput; }>) {
  const product = await createProduct({
    ...request.body,
    ownerId: request.user.id,
  });
  return product;
}

export async function updateProductHandler(
    request: FastifyRequest<{ Body: CreateProductInput; Params: FindeProducSchema; }>, reply: FastifyReply) {
  try {
    const id = Number(request?.params?.id);
    const body = request.body;
    const product = await updateProduct(id, body);

    return reply.code(201).send(product);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

export async function getProductsHandler() {
  const products = await getProducts();
  return products;
}

export async function getProductByIdHandler(request: FastifyRequest<{ Params: FindeProducSchema; }>, reply: FastifyReply) {
  try {
    const id = Number(request?.params?.id);
    const product = await findProductById(id);

    return reply.code(201).send(product);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

export async function deleteProductByIdHandler(request: FastifyRequest<{ Params: FindeProducSchema; }>, reply: FastifyReply) {
  try {
    const id = Number(request?.params?.id);
    const product = await removeProductById(id);

    return reply.code(201).send(product);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}
