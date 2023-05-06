"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/modules/product/product.controller.ts
var product_controller_exports = {};
__export(product_controller_exports, {
  createProductHandler: () => createProductHandler,
  deleteProductByIdHandler: () => deleteProductByIdHandler,
  getProductByIdHandler: () => getProductByIdHandler,
  getProductsHandler: () => getProductsHandler,
  updateProductHandler: () => updateProductHandler
});
module.exports = __toCommonJS(product_controller_exports);

// ../Projetos/PUC/fastify-prisma-rest-api/src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createProductHandler,
  deleteProductByIdHandler,
  getProductByIdHandler,
  getProductsHandler,
  updateProductHandler
});
