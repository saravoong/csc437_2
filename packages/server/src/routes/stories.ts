import express, { Request, Response } from "express";
import { Story } from "../models/models";
import Stories from "../services/story-svc";
import auth, { authenticateUser } from "./auth";

const router = express.Router();

router.get("/", (_, res: Response) => {
    Stories.index()
        .then((list: Story[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/trending", async (_, res: Response) => {
    try {
        const allStories = await Stories.index();

        const now = new Date();
        const trendingStories = allStories.filter((story) =>
            story.chapters.some((chapter) =>
                chapter.comments.some((comment) => {
                    const commentDate = new Date(comment.date);
                    const timeDiff = now.getTime() - commentDate.getTime();
                    const daysAgo = timeDiff / (1000 * 60 * 60 * 24);
                    return daysAgo <= 3;
                })
            )
        );

        res.json(trendingStories);
    } catch (err) {
        res.status(500).send(err instanceof Error ? err.message : err);
    }
});


router.get("/:storyPath", (req: Request, res: Response) => {
    const { storyPath } = req.params;

    Stories.get(storyPath)
        .then((story: Story) => res.json(story))
        .catch((err) => res.status(404).send(err));
});

router.post("/:storyPath/reviews", authenticateUser, async (req: Request, res: Response) => {
    const { storyPath } = req.params;
    const { username, rating, comment } = req.body;

    try {
        const updatedStory = await Stories.addReview(storyPath, { username, rating, comment });
        res.status(201).json(updatedStory);
    } catch (err) {
        res.status(400).send(err instanceof Error ? err.message : err);
    }
});

router.get("/:storyPath/reviews", async (req: Request, res: Response) => {
    const { storyPath } = req.params;

    try {
        const story = await Stories.get(storyPath);
        res.json(story.reviews || []);
    } catch (err) {
        res.status(404).send(err instanceof Error ? err.message : err);
    }
});

router.get("/:storyPath/chapters/:chapterNumber", (req: Request, res: Response) => {
    const { storyPath, chapterNumber } = req.params;

    Stories.getChapter(storyPath, Number(chapterNumber))
        .then((chapter) => res.json(chapter))
        .catch((err) => res.status(404).send(err));
});

router.post("/:storyPath/chapters/:chapterNumber/comments", async (req: Request, res: Response) => {
    const { storyPath, chapterNumber } = req.params;
    const { username, text } = req.body;

    try {
        const updatedChapter = await Stories.addComment(storyPath, Number(chapterNumber), { username, text });
        res.json(updatedChapter);
    } catch (err) {
        res.status(404).send(err instanceof Error ? err.message : err);
    }
});

router.get("/:storyPath/chapters/:chapterNumber/comments", async (req: Request, res: Response) => {
    const { storyPath, chapterNumber } = req.params;

    try {
        const chapter = await Stories.getChapter(storyPath, Number(chapterNumber));
        res.json(chapter.comments || []);
    } catch (err) {
        res.status(404).send(err instanceof Error ? err.message : err);
    }
});


router.post("/", (req: Request, res: Response) => {
    const newStory = req.body;

    Stories.create(newStory)
        .then((story: Story) =>
            res.status(201).json(story)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:storyPath", (req: Request, res: Response) => {
    const { storyPath } = req.params;
    const newStory = req.body;

    Stories.update(storyPath, newStory)
        .then((story: Story) => res.json(story))
        .catch((err) => res.status(404).end());
});

router.delete("/:storyPath", (req: Request, res: Response) => {
    const { storyPath } = req.params;

    Stories.remove(storyPath)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;