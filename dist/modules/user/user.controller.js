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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/modules/user/user.controller.ts
var user_controller_exports = {};
__export(user_controller_exports, {
  deleteUsersByEmailHandler: () => deleteUsersByEmailHandler,
  getUsersByEmailHandler: () => getUsersByEmailHandler,
  getUsersHandler: () => getUsersHandler,
  loginHandler: () => loginHandler,
  registerUserHandler: () => registerUserHandler,
  updateUserHandler: () => updateUserHandler
});
module.exports = __toCommonJS(user_controller_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteUsersByEmailHandler,
  getUsersByEmailHandler,
  getUsersHandler,
  loginHandler,
  registerUserHandler,
  updateUserHandler
});
