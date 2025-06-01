// src/model.ts
import {Story, Chapter, Reader} from "../../server/src/models/models.ts";

export interface Model {
    chapter?: Chapter;
    story?: Story;
    reader?: Reader;
}

export const init: Model = {};