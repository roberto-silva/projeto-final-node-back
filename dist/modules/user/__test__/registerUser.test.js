"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/modules/user/__test__/registerUser.test.ts
var import_faker = __toESM(require("@faker-js/faker"));
var import_tap = require("tap");
var import_ts_mock_imports = require("ts-mock-imports");

// ../Projetos/PUC/fastify-prisma-rest-api/src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_fastify_jwt = __toESM(require("fastify-jwt"));
var import_fastify_swagger = __toESM(require("fastify-swagger"));
var import_fastify_zod3 = require("fastify-zod");

// ../Projetos/PUC/fastify-prisma-rest-api/src/utils/hash.ts
var import_crypto = __toESM(require("crypto"));
function hashPassword(password) {
  const salt = import_crypto.default.randomBytes(16).toString("hex");
  const hash = import_crypto.default.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
  return { hash, salt };
}
function verifyPassword({
  candidatePassword,
  salt,
  hash
}) {
  const candidateHash = import_crypto.default.pbkdf2Sync(candidatePassword, salt, 1e3, 64, "sha512").toString("hex");
  return candidateHash === hash;
}

// src/modules/user/user.service.ts
var user_service_exports = {};
__export(user_service_exports, {
  createUser: () => createUser,
  findUserByEmail: () => findUserByEmail,
  findUsers: () => findUsers,
  removeUserByEmail: () => removeUserByEmail,
  updateUser: () => updateUser
});

// ../Projetos/PUC/fastify-prisma-rest-api/src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/user/user.service.ts
function createUser(input) {
  return __async(this, null, function* () {
    const _a = input, { password } = _a, rest = __objRest(_a, ["password"]);
    const { hash, salt } = hashPassword(password);
    const user = yield prisma_default.user.create({
      data: __spreadProps(__spreadValues({}, rest), { salt, password: hash })
    });
    return user;
  });
}
function updateUser(email, user) {
  return __async(this, null, function* () {
    return yield prisma_default.user.update({
      where: { email },
      data: user
    });
  });
}
function findUserByEmail(email) {
  return __async(this, null, function* () {
    return yield prisma_default.user.findUnique({
      where: {
        email
      }
    });
  });
}
function removeUserByEmail(email) {
  return __async(this, null, function* () {
    return yield prisma_default.user.delete({
      where: {
        email
      }
    });
  });
}
function findUsers() {
  return __async(this, null, function* () {
    return prisma_default.user.findMany({
      select: {
        email: true,
        name: true,
        id: true
      }
    });
  });
}

// src/modules/user/user.controller.ts
function registerUserHandler(request, reply) {
  return __async(this, null, function* () {
    const body = request.body;
    try {
      const user = yield createUser(body);
      return reply.code(201).send(user);
    } catch (e) {
      console.log(e);
      return reply.code(500).send(e);
    }
  });
}
function updateUserHandler(request, reply) {
  return __async(this, null, function* () {
    var _a;
    try {
      const email = (_a = request == null ? void 0 : request.params) == null ? void 0 : _a.email;
      const body = request.body;
      const user = yield updateUser(email, body);
      return reply.code(201).send(user);
    } catch (e) {
      console.log(e);
      return reply.code(500).send(e);
    }
  });
}
function loginHandler(request, reply) {
  return __async(this, null, function* () {
    const body = request.body;
    const user = yield findUserByEmail(body.email);
    if (!user) {
      return reply.code(401).send({
        message: "Invalid email or password"
      });
    }
    const correctPassword = verifyPassword({
      candidatePassword: body.password,
      salt: user.salt,
      hash: user.password
    });
    if (correctPassword) {
      const _a = user, { password, salt } = _a, rest = __objRest(_a, ["password", "salt"]);
      return { accessToken: request.jwt.sign(rest) };
    }
    return reply.code(401).send({
      message: "Invalid email or password"
    });
  });
}
function getUsersHandler() {
  return __async(this, null, function* () {
    const users = yield findUsers();
    return users;
  });
}
function getUsersByEmailHandler(request, reply) {
  return __async(this, null, function* () {
    var _a;
    try {
      const email = (_a = request == null ? void 0 : request.params) == null ? void 0 : _a.email;
      const user = yield findUserByEmail(email);
      return reply.code(201).send(user);
    } catch (e) {
      console.log(e);
      return reply.code(500).send(e);
    }
  });
}
function deleteUsersByEmailHandler(request, reply) {
  return __async(this, null, function* () {
    var _a;
    try {
      const email = (_a = request == null ? void 0 : request.params) == null ? void 0 : _a.email;
      const user = yield removeUserByEmail(email);
      return reply.code(201).send(user);
    } catch (e) {
      console.log(e);
      return reply.code(500).send(e);
    }
  });
}

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
var createUserSchema = import_zod.z.object(__spreadProps(__spreadValues({}, userCore), {
  password: import_zod.z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
  })
}));
var createUserResponseSchema = import_zod.z.object(__spreadValues({
  id: import_zod.z.number()
}, userCore));
var loginSchema = import_zod.z.object({
  email: import_zod.z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  }).email(),
  password: import_zod.z.string()
});
var findeUserSchema = import_zod.z.object({
  email: import_zod.z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  }).email()
});
var loginResponseSchema = import_zod.z.object({
  accessToken: import_zod.z.string()
});
var { schemas: userSchemas, $ref } = (0, import_fastify_zod.buildJsonSchemas)({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
  findeUserSchema
});

// src/modules/user/user.route.ts
function userRoutes(server) {
  return __async(this, null, function* () {
    server.get("/", { preHandler: [server.authenticate] }, getUsersHandler);
    server.get("/:email", { preHandler: [server.authenticate] }, getUsersByEmailHandler);
    server.post("/", {
      schema: {
        body: $ref("createUserSchema"),
        response: { 201: $ref("createUserResponseSchema") }
      }
    }, registerUserHandler);
    server.put("/:email", {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("loginSchema"),
        response: { 201: $ref("createUserResponseSchema") }
      }
    }, updateUserHandler);
    server.post("/login", {
      schema: {
        body: $ref("loginSchema"),
        response: { 200: $ref("loginResponseSchema") }
      }
    }, loginHandler);
    server.delete("/:email", { preHandler: [server.authenticate] }, deleteUsersByEmailHandler);
  });
}
var user_route_default = userRoutes;

// src/modules/product/product.service.ts
function getProducts() {
  return prisma_default.product.findMany({
    select: {
      content: true,
      title: true,
      price: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          name: true,
          id: true
        }
      }
    }
  });
}
function findProductById(id) {
  return __async(this, null, function* () {
    return yield prisma_default.product.findUnique({
      where: {
        id
      }
    });
  });
}
function createProduct(input) {
  return __async(this, null, function* () {
    const product = yield prisma_default.product.create({
      data: input
    });
    return product;
  });
}
function updateProduct(id, data) {
  return __async(this, null, function* () {
    return yield prisma_default.product.update({
      where: { id },
      data
    });
  });
}
function removeProductById(id) {
  return __async(this, null, function* () {
    return yield prisma_default.product.delete({
      where: {
        id
      }
    });
  });
}

// src/modules/product/product.controller.ts
function createProductHandler(request) {
  return __async(this, null, function* () {
    const product = yield createProduct(__spreadProps(__spreadValues({}, request.body), {
      ownerId: request.user.id
    }));
    return product;
  });
}
function updateProductHandler(request, reply) {
  return __async(this, null, function* () {
    var _a;
    try {
      const id = Number((_a = request == null ? void 0 : request.params) == null ? void 0 : _a.id);
      const body = request.body;
      const product = yield updateProduct(id, body);
      return reply.code(201).send(product);
    } catch (e) {
      console.log(e);
      return reply.code(500).send(e);
    }
  });
}
function getProductsHandler() {
  return __async(this, null, function* () {
    const products = yield getProducts();
    return products;
  });
}
function getProductByIdHandler(request, reply) {
  return __async(this, null, function* () {
    var _a;
    try {
      const id = Number((_a = request == null ? void 0 : request.params) == null ? void 0 : _a.id);
      const product = yield findProductById(id);
      return reply.code(201).send(product);
    } catch (e) {
      console.log(e);
      return reply.code(500).send(e);
    }
  });
}
function deleteProductByIdHandler(request, reply) {
  return __async(this, null, function* () {
    var _a;
    try {
      const id = Number((_a = request == null ? void 0 : request.params) == null ? void 0 : _a.id);
      const product = yield removeProductById(id);
      return reply.code(201).send(product);
    } catch (e) {
      console.log(e);
      return reply.code(500).send(e);
    }
  });
}

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
var createProductSchema = import_zod2.z.object(__spreadValues({}, productInput));
var productResponseSchema = import_zod2.z.object(__spreadValues(__spreadValues({}, productInput), productGenerated));
var productsResponseSchema = import_zod2.z.array(productResponseSchema);
var { schemas: productSchemas, $ref: $ref2 } = (0, import_fastify_zod2.buildJsonSchemas)({
  createProductSchema,
  productResponseSchema,
  productsResponseSchema,
  findeProducSchema
});

// src/modules/product/product.route.ts
function productRoutes(server) {
  return __async(this, null, function* () {
    server.get(
      "/",
      {
        preHandler: [server.authenticate],
        schema: {
          response: { 200: $ref2("productsResponseSchema") }
        }
      },
      getProductsHandler
    );
    server.get("/:id", { preHandler: [server.authenticate] }, getProductByIdHandler);
    server.post(
      "/",
      {
        preHandler: [server.authenticate],
        schema: {
          body: $ref2("createProductSchema"),
          response: { 201: $ref2("productResponseSchema") }
        }
      },
      createProductHandler
    );
    server.put("/:id", {
      preHandler: [server.authenticate],
      schema: {
        body: $ref2("createProductSchema"),
        response: { 201: $ref2("productResponseSchema") }
      }
    }, updateProductHandler);
    server.delete("/:id", { preHandler: [server.authenticate] }, deleteProductByIdHandler);
  });
}
var product_route_default = productRoutes;

// ../Projetos/PUC/fastify-prisma-rest-api/package.json
var version = "1.0.0";

// ../Projetos/PUC/fastify-prisma-rest-api/src/server.ts
function buildServer() {
  const server = (0, import_fastify.default)();
  server.register(import_fastify_jwt.default, {
    secret: "ndkandnan78duy9sau87dbndsa89u7dsy789adb"
  });
  server.decorate(
    "authenticate",
    (request, reply) => __async(this, null, function* () {
      try {
        yield request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    })
  );
  server.get("/healthcheck", function() {
    return __async(this, null, function* () {
      return { status: "OK" };
    });
  });
  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });
  for (const schema of [...userSchemas, ...productSchemas]) {
    server.addSchema(schema);
  }
  server.register(
    import_fastify_swagger.default,
    (0, import_fastify_zod3.withRefResolver)({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Fastify API",
          description: "API for some products",
          version
        }
      }
    })
  );
  server.register(user_route_default, { prefix: "api/v1/users" });
  server.register(product_route_default, { prefix: "api/v1/products" });
  return server;
}
var server_default = buildServer;

// src/modules/user/__test__/registerUser.test.ts
(0, import_tap.test)("POST `/api/users` - create user successfully with mock createUser", (t) => __async(exports, null, function* () {
  const name = import_faker.default.name.findName();
  const email = import_faker.default.internet.email();
  const password = import_faker.default.internet.password();
  const id = Math.floor(Math.random() * 1e3);
  const fastify = server_default();
  const stub = import_ts_mock_imports.ImportMock.mockFunction(user_service_exports, "createUser", {
    name,
    email,
    id
  });
  t.teardown(() => {
    fastify.close();
    stub.restore();
  });
  const response = yield fastify.inject({
    method: "POST",
    url: "/api/users",
    payload: {
      email,
      password,
      name
    }
  });
  t.equal(response.statusCode, 201);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  const json = response.json();
  t.equal(json.name, name);
  t.equal(json.email, email);
  t.equal(json.id, id);
}));
(0, import_tap.test)("POST `/api/users` - create user successfully with test database", (t) => __async(exports, null, function* () {
  const name = import_faker.default.name.findName();
  const email = import_faker.default.internet.email();
  const password = import_faker.default.internet.password();
  const fastify = server_default();
  t.teardown(() => __async(exports, null, function* () {
    fastify.close();
    yield prisma_default.user.deleteMany({});
  }));
  const response = yield fastify.inject({
    method: "POST",
    url: "/api/users",
    payload: {
      email,
      password,
      name
    }
  });
  t.equal(response.statusCode, 201);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  const json = response.json();
  t.equal(json.name, name);
  t.equal(json.email, email);
  t.type(json.id, "number");
}));
(0, import_tap.test)("POST `/api/users` - fail to create a user", (t) => __async(exports, null, function* () {
  const name = import_faker.default.name.findName();
  const password = import_faker.default.internet.password();
  const fastify = server_default();
  t.teardown(() => __async(exports, null, function* () {
    fastify.close();
    yield prisma_default.user.deleteMany({});
  }));
  const response = yield fastify.inject({
    method: "POST",
    url: "/api/users",
    payload: {
      password,
      name
    }
  });
  t.equal(response.statusCode, 400);
  const json = response.json();
  t.equal(json.message, "body should have required property 'email'");
}));
