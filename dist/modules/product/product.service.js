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

// src/modules/product/product.service.ts
var product_service_exports = {};
__export(product_service_exports, {
  createProduct: () => createProduct,
  findProductById: () => findProductById,
  getProducts: () => getProducts,
  removeProductById: () => removeProductById,
  updateProduct: () => updateProduct
});
module.exports = __toCommonJS(product_service_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createProduct,
  findProductById,
  getProducts,
  removeProductById,
  updateProduct
});
