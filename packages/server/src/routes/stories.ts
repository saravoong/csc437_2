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

router.get("/:storyPath", (req: Request, res: Response) => {
    const { storyPath } = req.params;

    Stories.get(storyPath)
        .then((story: Story) => res.json(story))
        .catch((err) => res.status(404).send(err));
});

router.get("/:storyPath/chapters/:chapterNumber", authenticateUser, (req: Request, res: Response) => {
    const { storyPath, chapterNumber } = req.params;

    Stories.getChapter(storyPath, Number(chapterNumber))
        .then((chapter) => res.json(chapter))
        .catch((err) => res.status(404).send(err));
});

router.post("/", authenticateUser, (req: Request, res: Response) => {
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