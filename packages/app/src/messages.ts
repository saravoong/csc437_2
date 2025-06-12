import { Reader, Story, Review } from "../../server/src/models/models.ts";

export type Msg =
    | [
    "profile/save",
    {
        username: string;
        profile: Reader;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
    }
    ]
    | ["profile/select", { username: string } ]
    | ["story/save",
    {
        story: Story;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void
    } ]
    | ["chapter/comment/add",
    {
        storyPath: string;
        chapterNumber: number;
        comment: { username: string; text: string };
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
    }]
    | ["story/review/add", {
            storyPath: string;
            review: Review & { username: string };
            onSuccess?: () => void;
            onFailure?: (err: Error) => void;
        }]
    ;
