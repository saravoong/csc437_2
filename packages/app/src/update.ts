import { Auth, Update } from "@calpoly/mustang";
import { Reader } from "../../server/src/models/models.ts";
import { Msg } from "./messages";
import { Model } from "./model";
import { Story } from "../../server/src/models/models.ts";

export default function update(
    message: Msg,
    apply: Update.ApplyMap<Model>,
    user: Auth.User
) {
    switch (message[0]) {
        case "profile/save":
            saveProfile(message[1], user)
                .then((profile) =>
                    apply((model) => ({ ...model, profile }))
                )
                .then(() => {
                    const { onSuccess } = message[1];
                    if (onSuccess) onSuccess();
                })
                .catch((error: Error) => {
                    const { onFailure } = message[1];
                    if (onFailure) onFailure(error);
                });
            break;
        case "profile/select":
            loadProfile(message[1], user)
                .then((profile) =>
                    apply((model) =>
                        ({ ...model, profile })
                    )
                );
            break;
        case "story/save":
            saveStory(message[1], user)
                .then((story) =>
                    apply((model) => ({ ...model, story }))
                )
                .then(() => {
                    const { onSuccess } = message[1];
                    if (onSuccess) onSuccess();
                })
                .catch((error: Error) => {
                    const { onFailure } = message[1];
                    if (onFailure) onFailure(error);
                });
            break;
        case "chapter/comment/add":
            addComment(message[1], user)
                .then((updatedChapter) =>
                    apply((model) => ({
                        ...model,
                        Story: {
                            ...model.story,
                            chapters: model.story?.chapters?.map((ch) =>
                                ch.chapterNumber === updatedChapter.chapterNumber ? updatedChapter : ch
                            ) ?? [],
                        },
                    }))
                )
                .then(() => {
                    const { onSuccess } = message[1];
                    if (onSuccess) onSuccess();
                })
                .catch((error: Error) => {
                    const { onFailure } = message[1];
                    if (onFailure) onFailure(error);
                });
            break;
        default:
            const unhandled: never = message[0];
            throw new Error(`Unhandled message "${unhandled}"`);
    }
}

function loadProfile(
    payload: { username: string },
    user: Auth.User
): Promise<Reader | undefined> {
    return fetch(`/api/profiles/${payload.username}`, {
        headers: Auth.headers(user),
    })
        .then(async (response: Response) => {
            if (!response.ok) {
                console.warn(`Profile fetch failed with status ${response.status}`);
                return undefined;
            }

            const text = await response.text();
            if (!text) {
                console.warn(`Empty response for user ${payload.username}`);
                return undefined;
            }

            try {
                return JSON.parse(text) as Reader;
            } catch (e) {
                console.error(`Failed to parse JSON for ${payload.username}:`, text);
                return undefined;
            }
        });
}

function saveProfile(
    msg: {
        username: string;
        profile: Reader;
    },
    user: Auth.User
) {
    return fetch(`/api/profiles/${msg.username}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...Auth.headers(user)
        },
        body: JSON.stringify(msg.profile)
    })
        .then((response: Response) => {
            if (response.status === 200) return response.json();
            else
                throw new Error(
                    `Failed to save profile for ${msg.username}`
                );
        })
        .then((json: unknown) => {
            if (json) return json as Reader;
            return undefined;
        });
}

function saveStory(
    msg: {
        story: Story
    },
    user: Auth.User
) {
    console.log("Sending story to backend:", msg.story);
    return fetch("/api/stories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...Auth.headers(user)
        },
        body: JSON.stringify(msg.story)
    }).then((response: Response) => {
        if (response.status === 200) return response.json();
        else throw new Error(
            `Failed to save profile for ${msg.story}`
        );
    })
        .then((json: unknown) => {
            if (json) return json as Story;
            return undefined;
        });
}

function addComment(
    msg: {
        storyPath: string;
        chapterNumber: number;
        comment: string;
    },
    user: Auth.User
) {
    return fetch(`/api/stories/${msg.storyPath}/chapters/${msg.chapterNumber}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...Auth.headers(user),
        },
        body: JSON.stringify({ comment: msg.comment }),
    }).then((response: Response) => {
        if (response.ok) return response.json();
        else throw new Error(`Failed to add comment`);
    });
}

