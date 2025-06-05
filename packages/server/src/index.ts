import express, { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "path";
import auth, { authenticateUser } from "./routes/auth";
import Stories from "./services/story-svc";
import stories from "./routes/stories";
import Users from "./services/user-svc";
import users from "./routes/users";
import { getFile, saveFile } from "./services/filesystem";
import { connect } from "./services/mongo";

const app = express();
const port = process.env.PORT || 3000;

// Mongo Connection
connect("episode");

// Middleware:
app.use(express.raw({ type: "image/*", limit: "32Mb" }));
app.use(express.json());

// Auth routes
app.use("/auth", auth);

// API Routes:
app.use("/api/stories", stories);
app.use("/api/profiles", users);

// Image routes
app.post("/images", saveFile);
app.get("/images/:id", getFile);

// Static files
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(express.static(staticDir));

// Page Routes:
app.get("/ping", (_: Request, res: Response) => {
    res.send(
        `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
    );
});

app.use("/app", (req: Request, res: Response) => {
    const indexHtml = path.resolve(staticDir, "index.html");
    fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
        res.send(html)
    );
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});