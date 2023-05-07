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

// src/modules/auth/auth.schema.ts
var auth_schema_exports = {};
__export(auth_schema_exports, {
  $ref: () => $ref,
  loginSchemas: () => loginSchemas
});
module.exports = __toCommonJS(auth_schema_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $ref,
  loginSchemas
});
