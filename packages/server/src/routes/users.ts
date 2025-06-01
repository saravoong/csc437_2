import express, { Request, Response } from "express";
import { Reader } from "../models/models";
import Readers from "../services/user-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    Readers.index()
        .then((list: Reader[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:username", (req: Request, res: Response) => {
    const { username } = req.params;

    Readers.get(username)
        .then((user: Reader) => res.json(user))
        .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newUser = req.body;

    Readers.create(newUser)
        .then((user: Reader) =>
            res.status(201).json(user)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:username", (req: Request, res: Response) => {
    const { username } = req.params;
    const newUser = req.body;

    Readers.update(username, newUser)
        .then((user: Reader) => res.json(user))
        .catch((err) => res.status(404).end());
});

router.delete("/:username", (req: Request, res: Response) => {
    const { username } = req.params;

    Readers.remove(username)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;