import { Schema, model } from "mongoose";
import { Chapter, Story } from "../models/models";
import { ChapterSchema } from "./chapter-svc";

const StorySchema = new Schema<Story>(
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
        chapters: [ChapterSchema]
    },
    { collection: "stories" }
);

const StoryModel = model<Story>(
    "Story",
    StorySchema
);

function index(): Promise<Story[]> {
        return StoryModel.find();
}

function get(storyPath: String): Promise<Story> {
        return StoryModel.find({ storyPath })
            .then((list) => list[0])
            .catch((err) => {
                    throw `${storyPath} Not Found`;
            });
}

export default { index, get };