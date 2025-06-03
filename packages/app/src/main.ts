import {
    Auth,
    History,
    Switch,
    Store,
    define
} from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { HeaderElement } from "./components/episode-header";
import { HomeViewElement } from "./views/home-view";
import { StoryViewElement } from "./views/story-view.ts";
import { ChapterViewElement } from "./views/chapter-view.ts";
import { ReaderViewElement } from "./views/reader-view.ts";
import { ReaderEditElement } from "./views/reader-edit.ts";

const routes: Switch.Route[] = [
    {
        auth: "protected",
        path: "/app/stories/:storyPath/chapters/:chapterNumber",
        view: (params: Switch.Params) => html`
            <chapter-view
                    storyPath=${params.storyPath}
                    chapterNumber=${params.chapterNumber}>
            </chapter-view>
        `
    },
    {
        path: "/app/stories/:storyPath",
        view: (params: Switch.Params) => html`
      <story-view storyPath=${params.storyPath}></story-view>
    `
    },
    {
        auth: "protected",
        path: "/app/profiles/:username/edit",
        view: (params: Switch.Params) => html`
    <reader-edit username=${params.username}></reader-edit>`
    },
    {
        auth: "protected",
        path: "/app/profiles/:username",
        view: (
            params: Switch.Params
        ) => html`
      <reader-view
        username=${params.username}></reader-view>
    `
    },
    {
        path: "/app",
        view: () => html`
      <home-view></home-view>
    `
    },
    {
        path: "/",
        redirect: "/app"
    }
];

define({
    "mu-auth": Auth.Provider,
    "mu-history": History.Provider,
    "mu-switch": class AppSwitch extends Switch.Element {
        constructor() {
            super(routes, "episode:history", "episode:auth");
        }
    },
    "mu-store": class AppStore
        extends Store.Provider<Model, Msg>
    {
        constructor() {
            super(update, init, "episode:auth");
        }
    },
    "episode-header": HeaderElement,
    "home-view": HomeViewElement,
    "story-view": StoryViewElement,
    "chapter-view": ChapterViewElement,
    "reader-view": ReaderViewElement,
    "reader-edit": ReaderEditElement
});