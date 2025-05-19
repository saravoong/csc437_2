import express, { Request, Response } from "express";
import auth, { authenticateUser } from "./routes/auth";
import Stories from "./services/story-svc";
import stories from "./routes/stories";
import Users from "./services/user-svc";
import users from "./routes/users";
import { connect } from "./services/mongo";

const app = express();
const port = process.env.PORT || 3000;

// Mongo Connection
connect("episode");

// Static files
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(express.static(staticDir));

// Middleware:
app.use(express.raw({ type: "image/*", limit: "32Mb" }));
app.use(express.json());

// Auth routes
app.use("/auth", auth);

// API Routes:
app.use("/api/stories", authenticateUser, stories);
app.use("/api/users", authenticateUser, users);

// Page Routes:
app.get("/ping", (_: Request, res: Response) => {
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

app.get("/stories", async (req: Request, res: Response) => {
    try {
        const allStories = await Stories.index();
        res
            .set("Content-Type", "application/json")
            .send(JSON.stringify(allStories));
    } catch (err) {
        res.status(500).send("Failed to load stories");
    }
});

app.get("/stories/:storyPath", (req: Request, res: Response) => {
    const { storyPath } = req.params;

    Stories.get(storyPath).then((data) => {
        if (data) res
            .set("Content-Type", "application/json")
            .send(JSON.stringify(data));
        else res
            .status(404).send();
    });
});

app.get("/stories/:storyPath/chapters/:chapterNumber", (req: Request, res: Response) => {
    const { storyPath, chapterNumber } = req.params;

    // Convert chapterNumber to a Number
    const chapterNum = Number(chapterNumber);

    // Call getChapter from Stories service
    Stories.getChapter(storyPath, chapterNum)
        .then((data) => {
            res
                .set("Content-Type", "application/json")
                .send(JSON.stringify(data));  // Send the chapter data as JSON
        })
        .catch((err) => {
            res.status(404).send(err);  // If not found, send 404 with the error message
        });
});

app.get("/users", async (req: Request, res: Response) => {
    try {
        const allUsers = await Users.index();
        res
            .set("Content-Type", "application/json")
            .send(JSON.stringify(allUsers));
    } catch (err) {
        res.status(500).send("Failed to load stories");
    }
});

app.get("/users/:username", (req: Request, res: Response) => {
    const { username } = req.params;

    Users.get(username).then((data) => {
        if (data) res
            .set("Content-Type", "application/json")
            .send(JSON.stringify(data));
        else res
            .status(404).send();
    });
});

app.use(express.static(staticDir));
