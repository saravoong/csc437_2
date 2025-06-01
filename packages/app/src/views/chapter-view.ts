import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

import type { Story, Chapter } from "../../../server/src/models/models.ts";

export class ChapterViewElement extends LitElement {
    @property({ attribute: "storypath" }) storyPath?: string;
    @property({ type: Number, attribute: "chapternumber" }) chapterNumber = 0;

    @state() story?: Story;
    @state() selectedChapter?: Chapter;

    connectedCallback() {
        super.connectedCallback();

        if (this.storyPath && this.chapterNumber) {
            this.loadChapter();
        }
    }

    updated(changedProps: Map<string, any>) {
        if (changedProps.has("storyPath") || changedProps.has("chapterNumber")) {
            this.loadChapter();
        }
    }

    async loadChapter() {
        if (!this.storyPath || !this.chapterNumber) return;

        try {
            const res = await fetch(`/api/stories/${this.storyPath}`);
            if (!res.ok) throw new Error(`Failed to fetch story: ${res.statusText}`);
            this.story = await res.json();

            if (this.story && this.story.chapters) {
                this.selectedChapter = this.story.chapters.find(
                    (c) => c.chapterNumber === this.chapterNumber
                );
            } else {
                this.selectedChapter = undefined;
            }

            if (!this.selectedChapter) {
                console.error(`Chapter ${this.chapterNumber} not found in story ${this.storyPath}`);
            }
        } catch (err) {
            console.error(err);
            this.story = undefined;
            this.selectedChapter = undefined;
        }
    }

    render() {

        if (!this.selectedChapter) {
            return html`<p>Loading chapter...</p>`;
        }

        // Use optional chaining and fallback defaults to avoid undefined errors
        const chapter = this.selectedChapter;

        return html`
            <section>
                <header>
                    <a href="/app/stories/${this.storyPath}">&larr; Back</a>
                    <h1>
                        Chapter ${chapter.chapterNumber} (${chapter.storyTitle ?? "Untitled"})
                    </h1>
                </header>
                <section>
                    <h3>Summary</h3>
                    <p>${chapter.summary ?? "No summary available."}</p>
                </section>
                <section>
                    <h3>Comments</h3>
                    ${chapter.comments && chapter.comments.length > 0
                            ? chapter.comments.map((comment) => html`<p>${comment}</p>`)
                            : html`<p>No comments yet.</p>`}
                </section>
            </section>
        `;
    }

    static styles = css`
    a {
      color: steelblue;
      font-weight: bold;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    h1 {
      font-size: 2rem;
      border-bottom: 2px solid steelblue;
      padding-bottom: 0.25em;
    }
    section {
      margin-bottom: 1.5em;
    }
    p {
      line-height: 1.4;
    }
    button {
      background-color: steelblue;
      color: white;
      border: none;
      padding: 0.5em 1em;
      cursor: pointer;
      border-radius: 4px;
    }
    button:hover {
      background-color: #1c4a8b;
    }
  `;
}
