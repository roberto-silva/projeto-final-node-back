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

// src/modules/user/user.route.ts
var user_route_exports = {};
__export(user_route_exports, {
  default: () => user_route_default
});
module.exports = __toCommonJS(user_route_exports);

// src/utils/hash.ts
var import_crypto = __toESM(require("crypto"));
function hashPassword(password) {
  const salt = import_crypto.default.randomBytes(16).toString("hex");
  const hash = import_crypto.default.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
  return { hash, salt };
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
