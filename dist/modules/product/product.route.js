"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/modules/product/product.route.ts
var product_route_exports = {};
__export(product_route_exports, {
  default: () => product_route_default
});
module.exports = __toCommonJS(product_route_exports);

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/product/product.service.ts
async function getProducts() {
  return await prisma_default.product.findMany({
    select: {
      content: true,
      title: true,
      price: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      owner: { select: { name: true, id: true } }
    }
  });
}
async function findProductById(id) {
  return await prisma_default.product.findUnique({ where: { id } });
}
async function createProduct(input) {
  return await prisma_default.product.create({ data: input });
}
async function updateProduct(id, data) {
  return await prisma_default.product.update({ where: { id }, data });
}
async function removeProductById(id) {
  return await prisma_default.product.delete({ where: { id } });
}

// src/modules/product/product.controller.ts
async function getProductsHandler(request, reply) {
  try {
    const products = await getProducts();
    return reply.code(201).send(products);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}
async function getProductByIdHandler(request, reply) {
  try {
    const product = await findProductById(Number(request?.params?.id));
    return reply.code(201).send(product);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}
async function postProductHandler(request, reply) {
  try {
    const product = await createProduct({ ...request.body, ownerId: request?.user?.id });
    return reply.code(201).send(product);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}
async function putProductHandler(request, reply) {
  try {
    const product = await updateProduct(Number(request?.params?.id), request?.body);
    return reply.code(201).send(product);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}
async function deleteProductByIdHandler(request, reply) {
  try {
    const product = await removeProductById(Number(request?.params?.id));
    return reply.code(201).send(product);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

// src/utils/hash.ts
function isAuthenticate(server) {
  return { preHandler: [server.authenticate] };
}

// src/modules/product/product.schema.ts
var import_zod = require("zod");
var import_fastify_zod = require("fastify-zod");
var productInput = {
  title: import_zod.z.string(),
  price: import_zod.z.number(),
  content: import_zod.z.string().optional()
};
var productGenerated = {
  id: import_zod.z.number(),
  createdAt: import_zod.z.string(),
  updatedAt: import_zod.z.string()
};
var findeProducSchema = import_zod.z.object({
  id: import_zod.z.number({
    required_error: "Id is required",
    invalid_type_error: "Id must be a number"
  })
});
var createProductSchema = import_zod.z.object({
  ...productInput
});
var productResponseSchema = import_zod.z.object({
  ...productInput,
  ...productGenerated
});
var productsResponseSchema = import_zod.z.array(productResponseSchema);
var { schemas: productSchemas, $ref } = (0, import_fastify_zod.buildJsonSchemas)({
  createProductSchema,
  productResponseSchema,
  productsResponseSchema,
  findeProducSchema
});

// src/modules/product/product.route.ts
var findProductsResponse = {
  schema: {
    response: { 200: $ref("productsResponseSchema") }
  }
};
var modifyProducts = {
  schema: {
    body: $ref("createProductSchema"),
    response: { 201: $ref("productResponseSchema") }
  }
};
async function productRoutes(server) {
  server.get("/", { ...isAuthenticate(server), ...findProductsResponse }, getProductsHandler);
  server.get("/:id", isAuthenticate(server), getProductByIdHandler);
  server.post("/", { ...isAuthenticate(server), ...modifyProducts }, postProductHandler);
  server.put("/:id", { ...isAuthenticate(server), ...modifyProducts }, putProductHandler);
  server.delete("/:id", isAuthenticate(server), deleteProductByIdHandler);
}
var product_route_default = productRoutes;
