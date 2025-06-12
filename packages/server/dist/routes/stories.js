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
var stories_exports = {};
__export(stories_exports, {
  default: () => stories_default
});
module.exports = __toCommonJS(stories_exports);
var import_express = __toESM(require("express"));
var import_story_svc = __toESM(require("../services/story-svc"));
var import_auth = require("./auth");
const router = import_express.default.Router();
router.get("/", (_, res) => {
  import_story_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.get("/trending", async (_, res) => {
  try {
    const allStories = await import_story_svc.default.index();
    const now = /* @__PURE__ */ new Date();
    const trendingStories = allStories.filter(
      (story) => story.chapters.some(
        (chapter) => chapter.comments.some((comment) => {
          const commentDate = new Date(comment.date);
          const timeDiff = now.getTime() - commentDate.getTime();
          const daysAgo = timeDiff / (1e3 * 60 * 60 * 24);
          return daysAgo <= 3;
        })
      )
    );
    res.json(trendingStories);
  } catch (err) {
    res.status(500).send(err instanceof Error ? err.message : err);
  }
});
router.get("/:storyPath", (req, res) => {
  const { storyPath } = req.params;
  import_story_svc.default.get(storyPath).then((story) => res.json(story)).catch((err) => res.status(404).send(err));
});
router.post("/:storyPath/reviews", import_auth.authenticateUser, async (req, res) => {
  const { storyPath } = req.params;
  const { username, rating, comment } = req.body;
  try {
    const updatedStory = await import_story_svc.default.addReview(storyPath, { username, rating, comment });
    res.status(201).json(updatedStory);
  } catch (err) {
    res.status(400).send(err instanceof Error ? err.message : err);
  }
});
router.get("/:storyPath/reviews", async (req, res) => {
  const { storyPath } = req.params;
  try {
    const story = await import_story_svc.default.get(storyPath);
    res.json(story.reviews || []);
  } catch (err) {
    res.status(404).send(err instanceof Error ? err.message : err);
  }
});
router.get("/:storyPath/chapters/:chapterNumber", (req, res) => {
  const { storyPath, chapterNumber } = req.params;
  import_story_svc.default.getChapter(storyPath, Number(chapterNumber)).then((chapter) => res.json(chapter)).catch((err) => res.status(404).send(err));
});
router.post("/:storyPath/chapters/:chapterNumber/comments", async (req, res) => {
  const { storyPath, chapterNumber } = req.params;
  const { username, text } = req.body;
  try {
    const updatedChapter = await import_story_svc.default.addComment(storyPath, Number(chapterNumber), { username, text });
    res.json(updatedChapter);
  } catch (err) {
    res.status(404).send(err instanceof Error ? err.message : err);
  }
});
router.get("/:storyPath/chapters/:chapterNumber/comments", async (req, res) => {
  const { storyPath, chapterNumber } = req.params;
  try {
    const chapter = await import_story_svc.default.getChapter(storyPath, Number(chapterNumber));
    res.json(chapter.comments || []);
  } catch (err) {
    res.status(404).send(err instanceof Error ? err.message : err);
  }
});
router.post("/", (req, res) => {
  const newStory = req.body;
  import_story_svc.default.create(newStory).then(
    (story) => res.status(201).json(story)
  ).catch((err) => res.status(500).send(err));
});
router.put("/:storyPath", (req, res) => {
  const { storyPath } = req.params;
  const newStory = req.body;
  import_story_svc.default.update(storyPath, newStory).then((story) => res.json(story)).catch((err) => res.status(404).end());
});
router.delete("/:storyPath", (req, res) => {
  const { storyPath } = req.params;
  import_story_svc.default.remove(storyPath).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
var stories_default = router;
