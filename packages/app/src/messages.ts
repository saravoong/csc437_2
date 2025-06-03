import { Reader } from "../../server/src/models/models.ts";

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
    | ["profile/select", { username: string }];
