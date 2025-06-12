import { Schema, model } from "mongoose";
import { Chapter, Story } from "../models/models"

const CommentSchema = new Schema(
    {
        username: { type: String, required: true },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now }
    },
    { _id: false }
);

export const ChapterSchema = new Schema<Chapter>(
    {
        storyTitle: { type: String, required: true, trim: true },
        chapterNumber: { type: Number, required: true },
        title: String,
        summary: String,
        comments: { type: [CommentSchema], default: [] }
    },
    { collection: "chapters" }
);

const ChapterModel = model<Chapter>(
    "Chapter",
    ChapterSchema
);

function index(): Promise<Story[]> {
        return ChapterModel.find();
}

function get(storyPath: String, chapterNumber: Number): Promise<Chapter> {
        return ChapterModel.find({ storyPath, chapterNumber })
            .then((list) => list[0])
            .catch((err) => {
                    throw `${storyPath} Chapter ${chapterNumber} Not Found`;
            });
}

export default { index, get };



