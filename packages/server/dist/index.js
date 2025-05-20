"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express = __toESM(require("express"));
var import_auth = __toESM(require("./routes/auth"));
var import_story_svc = __toESM(require("./services/story-svc"));
var import_stories = __toESM(require("./routes/stories"));
var import_user_svc = __toESM(require("./services/user-svc"));
var import_users = __toESM(require("./routes/users"));
var import_mongo = require("./services/mongo");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
(0, import_mongo.connect)("episode");
app.use(import_express.default.raw({ type: "image/*", limit: "32Mb" }));
app.use(import_express.default.json());
app.use("/auth", import_auth.default);
app.use("/api/stories", import_stories.default);
app.use("/api/users", import_auth.authenticateUser, import_users.default);
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(import_express.default.static(staticDir));
app.get("/ping", (_, res) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.get("/stories", async (req, res) => {
  try {
    const allStories = await import_story_svc.default.index();
    res.set("Content-Type", "application/json").send(JSON.stringify(allStories));
  } catch (err) {
    res.status(500).send("Failed to load stories");
  }
});
app.get("/stories/:storyPath", (req, res) => {
  const { storyPath } = req.params;
  import_story_svc.default.get(storyPath).then((data) => {
    if (data) res.set("Content-Type", "application/json").send(JSON.stringify(data));
    else res.status(404).send();
  });
});
app.get("/stories/:storyPath/chapters/:chapterNumber", (req, res) => {
  const { storyPath, chapterNumber } = req.params;
  const chapterNum = Number(chapterNumber);
  import_story_svc.default.getChapter(storyPath, chapterNum).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch((err) => {
    res.status(404).send(err);
  });
});
app.get("/users", async (req, res) => {
  try {
    const allUsers = await import_user_svc.default.index();
    res.set("Content-Type", "application/json").send(JSON.stringify(allUsers));
  } catch (err) {
    res.status(500).send("Failed to load stories");
  }
});
app.get("/users/:username", (req, res) => {
  const { username } = req.params;
  import_user_svc.default.get(username).then((data) => {
    if (data) res.set("Content-Type", "application/json").send(JSON.stringify(data));
    else res.status(404).send();
  });
});
