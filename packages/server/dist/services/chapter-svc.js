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
var chapter_svc_exports = {};
__export(chapter_svc_exports, {
  ChapterSchema: () => ChapterSchema
});
module.exports = __toCommonJS(chapter_svc_exports);
var import_mongoose = require("mongoose");
const ChapterSchema = new import_mongoose.Schema(
  {
    storyTitle: { type: String, required: true, trim: true },
    chapterNumber: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
    summary: String,
    comments: { type: [String], default: [] }
  },
  { collection: "chapters" }
);
const ChapterModel = (0, import_mongoose.model)(
  "Chapter",
  ChapterSchema
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChapterSchema
});
