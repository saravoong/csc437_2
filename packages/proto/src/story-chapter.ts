import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import tokens from "./styles/tokens.css.ts";
import page from "./styles/page.css.ts";
import { Observer, Auth } from "@calpoly/mustang";

interface Chapter {
    storyTitle: string;
    chapterNumber: number;
    title: string;
    href: string;
    summary: string;
    comments: string[];
}

interface Story {
    "img-src": string;
    authorName: string;
    genre: string;
    chapterCount: number;
    storyTitle: string;
    communityOrOfficial: string;
    storyLink: string;
    storyPath: string;
    synopsis: string;
    chapters: Chapter[];
}

export class ChapterTemplateElement extends LitElement {
    @property()
    src?: string;

    @state()
    chapters: Array<Chapter> = [];

    @state()
    selectedChapter?: Chapter;

    @property({ type: String })
    storyTitle: string = "";

    @property({ type: Number })
    chapterNumber: number = 0;

    override render() {
        if (!this.selectedChapter) {
            return html`
          <p>Please login or make an account</p>
          <button @click=${() => {
                    window.location.href = "/login.html";
                }}>
            Sign In
          </button>
        `;
        }

        const currentUrl = window.location.pathname;
        const storyTitle = currentUrl.split('/')[2];

        return html`
            <section>
                <header>
                    <a href="../../${storyTitle}/${storyTitle}.html">&larr; Back</a>
                    <h1>Chapter ${this.selectedChapter.chapterNumber} (${this.selectedChapter.storyTitle})</h1>
                </header>
                <section>
                    <h3>Summary</h3>
                    <p>${this.selectedChapter.summary}</p>
                </section>
                <section>
                    <h3>Comments</h3>
                    ${this.selectedChapter.comments.map(comment => html`<p>${comment}</p>`)}
                </section>
            </section>
        `;
    }

    static styles = [
        reset.styles,
        page.styles,
        tokens.styles,
        css`
        `
    ];

    _authObserver = new Observer<Auth.Model>(this, "episode:auth");
    _user?: Auth.User;

    connectedCallback() {
        super.connectedCallback();
        const title = this.getAttribute('data-title');
        const chapNum = this.getAttribute('chapter-number');

        this.storyTitle = title || '';
        this.chapterNumber = chapNum ? Number(chapNum) : 0;

        this._authObserver.observe((auth: Auth.Model) => {
            this._user = auth.user;
            if (this._user && this._user.authenticated && this.src && this.storyTitle && this.chapterNumber) {
                this.hydrate(this.src, this.storyTitle, this.chapterNumber);
            }
        });
    }

    get authorization(): { Authorization?: string } {
        if (this._user && this._user.authenticated)
            return {
                Authorization:
                    `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
            };
        else return {};
    }

    hydrate(src: string, title: string, chapterNum: number) {
        fetch(
            src,
            { headers: this.authorization }
        )
            .then(res => res.json())
            .then((stories: Story[]) => {
                console.log("Fetched stories:", stories);
                const story = stories.find(s => s.storyTitle === title);
                if (!story) {
                    console.error(`Story with title "${title}" not found.`);
                    return;
                }

                const chapter = story.chapters.find(c => c.chapterNumber === chapterNum);
                if (!chapter) {
                    console.error(`Chapter ${chapterNum} not found in story "${title}".`);
                    return;
                }

                this.selectedChapter = chapter;
            })
            .catch(err => console.error("Failed to fetch stories:", err));
    }

}
