import { Schema, model } from "mongoose";
import { Chapter, Story } from "../models/models";
import { ChapterSchema } from "./chapter-svc";

const StorySchema = new Schema<Story>(
    {
        "img-src": String,
        authorName: { type: String, required: true, trim: true },
        genre: String,
        chapterCount: { type: Number, default: 0 },
        storyTitle: { type: String, required: true, trim: true },
        communityOrOfficial: { type: String, required: true, trim: true },
        storyLink: String,
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

function getChapter(storyPath: String, chapterNumber: Number): Promise<Chapter> {
    return StoryModel.findOne({ storyPath })
        .then((story) => {
            if (!story) {
                throw new Error(`${storyPath} Not Found`);
            }
            const chapter = story.chapters.find((ch) => ch.chapterNumber === chapterNumber);
            if (!chapter) {
                throw new Error(`Chapter ${chapterNumber} not found in ${storyPath}`);
            }
            return chapter;
        })
        .catch((err) => {
            throw err.message;
        });
}

function create(json: Story): Promise<Story> {
    const t = new StoryModel(json);
    return t.save();
}

function update(
    storyPath: String,
    story: Story
): Promise<Story> {
    return StoryModel.findOneAndUpdate({ storyPath }, story, {
        new: true
    }).then((updated) => {
        if (!updated) throw `${storyPath} not updated`;
        else return updated as Story;
    });
}

function remove(storyPath: String): Promise<void> {
    return StoryModel.findOneAndDelete({ storyPath }).then(
        (deleted) => {
            if (!deleted) throw `${storyPath} not deleted`;
        }
    );
}

export default { index, get, getChapter, create, update, remove };