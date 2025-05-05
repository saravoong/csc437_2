import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import tokens from "./styles/tokens.css.ts";
import page from "./styles/page.css.ts";

export class ChapterTemplateElement extends LitElement {
    @property()
    href: string = "#";

    @property()
    chapterNumber: number = 1;

    @property()
    storyTitle: string = "Story Title";

    @property()
    summary: string = "This is a brief summary of the chapter...";

    @property()
    comments: string[] = ["Comment 1 goes here", "Comment 2 goes here"];

    override willUpdate(changedProps: Map<string | number | symbol, unknown>) {
        if (changedProps.has("comments") && typeof this.comments === "string") {
            this.comments = JSON.parse(this.comments);
        }
    }

    override render() {
        return html`

            <section>
                <header>
                    <a href="${this.href}">&larr; Back</a>
                    <h1>Chapter ${this.chapterNumber} (${this.storyTitle})</h1>
                </header>
                <section>
                    <h3>Summary</h3>
                    <p>${this.summary}</p>
                </section>
                <section>
                    <h3>Comments</h3>
                    ${(this.comments as string[]).map(comment => html`<p>${comment}</p>`)}
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
}
