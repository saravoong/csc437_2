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
var story_svc_exports = {};
__export(story_svc_exports, {
  default: () => story_svc_default
});
module.exports = __toCommonJS(story_svc_exports);
var import_mongoose = require("mongoose");
var import_chapter_svc = require("./chapter-svc");
const StorySchema = new import_mongoose.Schema(
  {
    "img-src": { type: String, required: true, trim: true },
    authorName: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    chapterCount: { type: Number, default: 0 },
    storyTitle: { type: String, required: true, trim: true },
    communityOrOfficial: { type: String, required: true, trim: true },
    storyLink: { type: String, required: true, trim: true },
    storyPath: { type: String, required: true, trim: true },
    synopsis: String,
    chapters: [import_chapter_svc.ChapterSchema]
  },
  { collection: "stories" }
);
const StoryModel = (0, import_mongoose.model)(
  "Story",
  StorySchema
);
function index() {
  return StoryModel.find();
}
function get(storyPath) {
  return StoryModel.find({ storyPath }).then((list) => list[0]).catch((err) => {
    throw `${storyPath} Not Found`;
  });
}
var story_svc_default = { index, get };
