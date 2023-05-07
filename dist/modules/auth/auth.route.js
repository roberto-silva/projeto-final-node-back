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

// src/modules/auth/auth.route.ts
var auth_route_exports = {};
__export(auth_route_exports, {
  default: () => auth_route_default
});
module.exports = __toCommonJS(auth_route_exports);

// src/utils/hash.ts
var import_crypto = __toESM(require("crypto"));
function verifyPassword({ candidatePassword, salt, hash }) {
  const candidateHash = import_crypto.default.pbkdf2Sync(candidatePassword, salt, 1e3, 64, "sha512").toString("hex");
  return candidateHash === hash;
}

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/user/user.service.ts
async function findUserByEmail(email) {
  return await prisma_default.user.findUnique({ where: { email } });
}

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

// src/modules/auth/auth.schema.ts
var import_zod = require("zod");
var import_fastify_zod = require("fastify-zod");
var loginSchema = import_zod.z.object({
  email: import_zod.z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  }).email(),
  password: import_zod.z.string()
});
var loginResponseSchema = import_zod.z.object({
  accessToken: import_zod.z.string()
});
var { schemas: loginSchemas, $ref } = (0, import_fastify_zod.buildJsonSchemas)({
  loginSchema,
  loginResponseSchema
});

// src/modules/auth/auth.route.ts
var loginUserValidations = {
  schema: {
    body: $ref("loginSchema"),
    response: { 200: $ref("loginResponseSchema") }
  }
};
async function authRoutes(server) {
  server.post("/login", loginUserValidations, loginHandler);
}
var auth_route_default = authRoutes;
