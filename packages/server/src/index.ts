import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Stories from "./services/story-svc";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, Wrld");
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

connect("episode");