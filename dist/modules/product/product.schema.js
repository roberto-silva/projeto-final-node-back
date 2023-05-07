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

// src/modules/product/product.schema.ts
var product_schema_exports = {};
__export(product_schema_exports, {
  $ref: () => $ref,
  productSchemas: () => productSchemas
});
module.exports = __toCommonJS(product_schema_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $ref,
  productSchemas
});
