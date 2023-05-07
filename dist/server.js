"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/server.ts
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_fastify = __toESM(require("fastify"));
var import_jwt = __toESM(require("@fastify/jwt"));
var import_swagger = __toESM(require("@fastify/swagger"));
var import_fastify_zod4 = require("fastify-zod");

// src/modules/user/user.schema.ts
var import_zod = require("zod");
var import_fastify_zod = require("fastify-zod");
var userCore = {
  email: import_zod.z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  }).email(),
  name: import_zod.z.string()
};
var createUserSchema = import_zod.z.object({
  ...userCore,
  password: import_zod.z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
  })
});
var createUserResponseSchema = import_zod.z.object({
  id: import_zod.z.number(),
  ...userCore
});
var updateUserSchema = import_zod.z.object({
  id: import_zod.z.number(),
  ...userCore,
  password: import_zod.z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
  })
});
var findeUserSchema = import_zod.z.object({
  email: import_zod.z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  }).email()
});
var { schemas: userSchemas, $ref } = (0, import_fastify_zod.buildJsonSchemas)({
  createUserSchema,
  updateUserSchema,
  createUserResponseSchema,
  findeUserSchema
});

// src/modules/product/product.schema.ts
var import_zod2 = require("zod");
var import_fastify_zod2 = require("fastify-zod");
var productInput = {
  title: import_zod2.z.string(),
  price: import_zod2.z.number(),
  content: import_zod2.z.string().optional()
};
var productGenerated = {
  id: import_zod2.z.number(),
  createdAt: import_zod2.z.string(),
  updatedAt: import_zod2.z.string()
};
var findeProducSchema = import_zod2.z.object({
  id: import_zod2.z.number({
    required_error: "Id is required",
    invalid_type_error: "Id must be a number"
  })
});
var createProductSchema = import_zod2.z.object({
  ...productInput
});
var productResponseSchema = import_zod2.z.object({
  ...productInput,
  ...productGenerated
});
var productsResponseSchema = import_zod2.z.array(productResponseSchema);
var { schemas: productSchemas, $ref: $ref2 } = (0, import_fastify_zod2.buildJsonSchemas)({
  createProductSchema,
  productResponseSchema,
  productsResponseSchema,
  findeProducSchema
});

// src/utils/hash.ts
var import_crypto = __toESM(require("crypto"));
function hashPassword(password) {
  const salt = import_crypto.default.randomBytes(16).toString("hex");
  const hash = import_crypto.default.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
  return { hash, salt };
}
function verifyPassword({ candidatePassword, salt, hash }) {
  const candidateHash = import_crypto.default.pbkdf2Sync(candidatePassword, salt, 1e3, 64, "sha512").toString("hex");
  return candidateHash === hash;
}
function isAuthenticate(server) {
  return { preHandler: [server.authenticate] };
}

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/user/user.service.ts
async function findUsers() {
  return prisma_default.user.findMany({ select: { email: true, name: true, id: true } });
}
async function findUserByEmail(email) {
  return await prisma_default.user.findUnique({ where: { email } });
}
async function createUser(input) {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);
  const user = await prisma_default.user.create({ data: { ...rest, salt, password: hash } });
  return user;
}
async function updateUser(email, user) {
  return await prisma_default.user.update({ where: { email }, data: user });
}
async function removeUserByEmail(email) {
  return await prisma_default.user.delete({ where: { email } });
}

// src/modules/user/user.controller.ts
async function getUsersHandler(request, reply) {
  try {
    const users = await findUsers();
    return reply.code(201).send(users);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}
async function getUsersByEmailHandler(request, reply) {
  try {
    const user = await findUserByEmail(request?.params?.email || "");
    return reply.code(201).send(user);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}
async function postUserHandler(request, reply) {
  try {
    const user = await createUser(request?.body || {});
    return reply.code(201).send(user);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}
async function putUserHandler(request, reply) {
  try {
    const user = await updateUser(request?.params?.email || "", request?.body || {});
    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}
async function deleteUsersByEmailHandler(request, reply) {
  try {
    const user = await removeUserByEmail(request?.params?.email || "");
    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

// src/modules/user/user.route.ts
var createUserValidations = {
  schema: {
    body: $ref("createUserSchema"),
    response: { 201: $ref("createUserResponseSchema") }
  }
};
var updateUserValidations = {
  schema: {
    body: $ref("updateUserSchema"),
    response: { 201: $ref("createUserResponseSchema") }
  }
};
async function userRoutes(server) {
  server.get("/", isAuthenticate(server), getUsersHandler);
  server.get("/:email", isAuthenticate(server), getUsersByEmailHandler);
  server.post("/", createUserValidations, postUserHandler);
  server.put("/:email", { ...updateUserValidations, ...isAuthenticate(server) }, putUserHandler);
  server.delete("/:email", isAuthenticate(server), deleteUsersByEmailHandler);
}
var user_route_default = userRoutes;

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

// src/modules/product/product.route.ts
var findProductsResponse = {
  schema: {
    response: { 200: $ref2("productsResponseSchema") }
  }
};
var modifyProducts = {
  schema: {
    body: $ref2("createProductSchema"),
    response: { 201: $ref2("productResponseSchema") }
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

// src/modules/auth/auth.schema.ts
var import_zod3 = require("zod");
var import_fastify_zod3 = require("fastify-zod");
var loginSchema = import_zod3.z.object({
  email: import_zod3.z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  }).email(),
  password: import_zod3.z.string()
});
var loginResponseSchema = import_zod3.z.object({
  accessToken: import_zod3.z.string()
});
var { schemas: loginSchemas, $ref: $ref3 } = (0, import_fastify_zod3.buildJsonSchemas)({
  loginSchema,
  loginResponseSchema
});

// src/modules/auth/auth.controller.ts
async function loginHandler(request, reply) {
  const body = request?.body;
  const user = await findUserByEmail(body?.email || "");
  if (!user)
    return reply.code(401).send({ message: "Invalid email or password" });
  const correctPassword = verifyPassword({ candidatePassword: body.password, salt: user.salt, hash: user.password });
  if (correctPassword) {
    const { password, salt, ...rest } = user;
    return { accessToken: request.jwt.sign(rest) };
  }
  return reply.code(401).send({ message: "Invalid email or password" });
}

// src/modules/auth/auth.route.ts
var loginUserValidations = {
  schema: {
    body: $ref3("loginSchema"),
    response: { 200: $ref3("loginResponseSchema") }
  }
};
async function authRoutes(server) {
  server.post("/login", loginUserValidations, loginHandler);
}
var auth_route_default = authRoutes;

// src/server.ts
function buildJwtService(server) {
  server.register(import_jwt.default, { secret: "ndkandnan78duy9sau87dbndsa89u7dsy789adb" });
  server.decorate(
    "authenticate",
    async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );
  server.get("/healthcheck", async function() {
    return { status: "OK" };
  });
  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });
}
function upSchemas(server) {
  for (const schema of [...userSchemas, ...productSchemas, ...loginSchemas]) {
    server.addSchema(schema);
  }
}
function buildSwaggerService(server) {
  server.register(
    import_swagger.default,
    (0, import_fastify_zod4.withRefResolver)({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Fastify API",
          description: "API for some products",
          version: "1.0.0"
        }
      }
    })
  );
}
function upRoutes(server) {
  server.register(auth_route_default, { prefix: "api/v1/auth" });
  server.register(user_route_default, { prefix: "api/v1/users" });
  server.register(product_route_default, { prefix: "api/v1/products" });
}
function setCrossOrigin(server) {
  server.register(require("@fastify/cors"), {
    origin: "*"
  });
}
function buildServer() {
  const server = (0, import_fastify.default)();
  buildJwtService(server);
  upSchemas(server);
  buildSwaggerService(server);
  upRoutes(server);
  setCrossOrigin(server);
  return server;
}
var server_default = buildServer;
