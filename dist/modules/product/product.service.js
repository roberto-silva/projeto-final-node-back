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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createProduct,
  findProductById,
  getProducts,
  removeProductById,
  updateProduct
});
