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
    "img-src": String,
    authorName: { type: String, required: true, trim: true },
    genre: String,
    chapterCount: { type: Number, default: 0 },
    storyTitle: { type: String, required: true, trim: true },
    communityOrOfficial: { type: String, required: true, trim: true },
    storyLink: String,
    storyPath: String,
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
function getChapter(storyPath, chapterNumber) {
  return StoryModel.findOne({ storyPath }).then((story) => {
    if (!story) {
      throw new Error(`${storyPath} Not Found`);
    }
    const chapter = story.chapters.find((ch) => ch.chapterNumber === chapterNumber);
    if (!chapter) {
      throw new Error(`Chapter ${chapterNumber} not found in ${storyPath}`);
    }
    return chapter;
  }).catch((err) => {
    throw err.message;
  });
}
function create(json) {
  if (json.chapters && json.chapters.length > 0) {
    json.chapters.forEach((chapter) => {
      chapter.href = `./chapters/${String(chapter.chapterNumber)}.html`;
    });
  }
  const t = new StoryModel(json);
  return t.save();
}
function update(storyPath, story) {
  return StoryModel.findOneAndUpdate({ storyPath }, story, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${storyPath} not updated`;
    else return updated;
  });
}
function remove(storyPath) {
  return StoryModel.findOneAndDelete({ storyPath }).then(
    (deleted) => {
      if (!deleted) throw `${storyPath} not deleted`;
    }
  );
}
async function addComment(storyPath, chapterNumber, comment) {
  const story = await StoryModel.findOne({ storyPath });
  if (!story) throw new Error("Story not found");
  const chapter = story.chapters.find((ch) => ch.chapterNumber === chapterNumber);
  if (!chapter) throw new Error("Chapter not found");
  chapter.comments.push(comment);
  await story.save();
  return chapter;
}
var story_svc_default = { index, get, getChapter, create, update, remove, addComment };
