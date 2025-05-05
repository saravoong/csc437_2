import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import tokens from "./styles/tokens.css.ts";
import page from "./styles/page.css.ts";
import stories from "./styles/stories.css.ts";

export class StoryTemplateElement extends LitElement {
    @property()
    storyTitle: string = "Story Title";

    @property({ attribute: "img-src" })
    imgSrc?: string;

    @property()
    authorName: string = "Author Name";

    @property()
    genre: string = "Genre";

    @property()
    chapterCount: number = 0;

    @property()
    communityOrOfficial: string = "Community or Official";

    @property()
    storyLink: string = "#";

    @property()
    chapterNumber: number = 1;

    @property()
    synopsis: string = "This is a summary of the story...";

    @property()
    chapters = [
        { number: 1, title: "Chapter 1", url: "chapters/01.html" },
        { number: 2, title: "Chapter 2", url: "chapters/02.html" }
    ];

    override render() {
        return html`
            <section>
            <header>
                <a href="../../../index.html">&larr; Home</a>
                <h1>${this.storyTitle}</h1>
            </header>
            <div class="page-layout">
                <div class="left-column">
            <section>
                <img src="${this.imgSrc}" height="350"/>
                <p>Author: ${this.authorName}</p>
                <p>Genre: ${this.genre}</p>
                <p>Number of Chapters: ${this.chapterCount}</p>
                <p>Official or Community: ${this.communityOrOfficial}</p>
                <a href="${this.storyLink}">Read now</a>
            </section>
            <hr>
            <section>
                <h3>Synopsis</h3>
                <p> ${this.synopsis}</p>
            </section>
            <hr>
            <section>
                <h3>Rating</h3>
                <h3>Reviews</h3>
            </section>
            <section>
                <h3>Characters</h3>
            </section>
            
                </div>
                <hr>
                <div class="right-column">
            <section>
                <h3>Chapters</h3>
                <ul>
                    ${this.chapters.map(chapter => html`<li><a href="${chapter.url}">${chapter.title}</a></li>`)}
                </ul>
            </section>
                </div>
            </div>
            </section>
        `;
    }

    static styles = [
        reset.styles,
        page.styles,
        tokens.styles,
        stories.styles,
        css`
            h1 {
                font-size: 2rem;
            }
            
            ul {
                list-style-type: disc;
                margin-left: 1.5em;
                padding-left: 1em;
            }
        `
    ];
}
