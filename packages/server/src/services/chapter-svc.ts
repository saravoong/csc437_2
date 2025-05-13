import { Schema, model } from "mongoose";
import { Chapter } from "../models/models"

export const ChapterSchema = new Schema<Chapter>(
    {
        storyTitle: { type: String, required: true, trim: true },
        chapterNumber: { type: Number, required: true },
        title: { type: String, required: true, trim: true },
        href: { type: String, required: true, trim: true },
        summary: String,
        comments: { type: [String], default: [] }
    },
    { collection: "chapters" }
);

const ChapterModel = model<Chapter>(
    "Chapter",
    ChapterSchema
);



