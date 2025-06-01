import { Reader } from "../../server/src/models/models.ts";

export type Msg =
    | ["profile/save", { userid: string; profile: Reader }]
    | ["profile/select", { username: string }]
    | ["profile/loaded", Reader];