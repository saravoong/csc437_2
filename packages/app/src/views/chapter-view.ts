import { html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { Story, Chapter, Reader } from "../../../server/src/models/models.ts";
import { View } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";

export class ChapterViewElement extends View<Model, Msg> {
    get profile(): Reader | undefined {
        console.log("Current profile:", this.model.profile);
        return this.model.profile;
    }

    @property({ attribute: "storypath" }) storyPath?: string;
    @property({ type: Number, attribute: "chapternumber" }) chapterNumber = 0;

    @state() story?: Story;
    @state() selectedChapter?: Chapter;

    @state()
    newComment = "";

    @state()
    errorMessage = "";

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

    async handleAddComment() {
        if (!this.storyPath || !this.chapterNumber || !this.newComment.trim()) {
            return;
        }

        this.errorMessage = "";

        const username = this.profile?.username || "Anonymous";
        console.log("Username:", username);

        try {
            const res = await fetch(
                `/api/stories/${this.storyPath}/chapters/${this.chapterNumber}/comments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        text: this.newComment.trim()
                    })
                }
            );

            if (!res.ok) {
                const errText = await res.text();
                console.error("Error response:", errText);
            }

            const updatedChapter = await res.json();

            this.selectedChapter = updatedChapter;
            this.newComment = "";
        } catch (err) {
            this.errorMessage = err instanceof Error ? err.message : "Unknown error";
        }
    }



    render() {
        if (!this.selectedChapter) {
            return html`<p>Loading chapter...</p>`;
        }

        const chapter = this.selectedChapter;

        return html`
            <section class="chapter-container">
                <header>
                    <a href="/app/stories/${this.storyPath}">&larr; Back to Story</a>
                    <h1>Chapter ${chapter.chapterNumber} — ${chapter.storyTitle ?? "Untitled"}</h1>
                </header>

                <section class="summary">
                    <h3>Summary</h3>
                    <p>${chapter.summary ?? "No summary available."}</p>
                </section>
                
                <section class="add-comment">
                  <h3>Add a Comment</h3>
                  <textarea
                    .value=${this.newComment}
                    @input=${(e: Event) => this.newComment = (e.target as HTMLTextAreaElement).value}
                    placeholder="Write your comment here..."
                    rows="4"
                  ></textarea>
                  <button @click=${this.handleAddComment} ?disabled=${!this.newComment.trim()}>
                    Submit
                  </button>
                  ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}
                </section>

                <section class="comments">
                    <h3>Comments</h3>
                    ${chapter.comments && chapter.comments.length > 0
                            ? chapter.comments.map(comment => html`
                                <div class="comment">
                                    <p class="meta">
                                        <strong>${comment.username}</strong>
                                        <span> • ${new Date(comment.date).toLocaleDateString()}</span>
                                    </p>
                                    <p class="text">${comment.text}</p>
                                </div>
                            `)
                            : html`<p>No comments yet.</p>`}
                </section>
            </section>
        `;
    }

    constructor() {
        super("episode:model");
    }

    static styles = css`
        .chapter-container {
            max-width: 800px;
            margin: 2rem auto;
            background: white;
            border-radius: 0.75rem;
            box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
            padding: 2rem 3rem;
            color: #444c6b;
            font-family: "Baloo 2", cursive;
        }

        header a {
            display: inline-block;
            margin-bottom: 1rem;
            color: var(--accent-color, steelblue);
            font-weight: 600;
            text-decoration: none;
            font-family: "Comfortaa", cursive;
            font-size: 1rem;
            transition: color 0.3s ease;
        }
        header a:hover,
        header a:focus {
            text-decoration: underline;
            color: darken(var(--accent-color, steelblue), 15%);
        }

        header h1 {
            font-family: "Comfortaa", cursive;
            font-weight: 700;
            font-size: 2.25rem;
            margin: 0 0 2rem 0;
            color: var(--accent-color, steelblue);
        }

        section h3 {
            font-family: "Comfortaa", cursive;
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--accent-color, steelblue);
            margin-bottom: 1rem;
        }

        p {
            font-size: 1.125rem;
            line-height: 1.5;
            margin-bottom: 1rem;
            color: #444c6b;
            font-family: "Baloo 2", cursive;
        }

        .add-comment textarea {
            width: 100%;
            font-family: "Baloo 2", cursive;
            font-size: 1rem;
            padding: 0.5rem;
            border-radius: 0.5rem;
            border: 1px solid #ccc;
            resize: vertical;
            margin-bottom: 0.75rem;
            box-sizing: border-box;
        }

        .add-comment button {
            background-color: var(--accent-color, steelblue);
            color: white;
            border: none;
            padding: 0.5em 1.2em;
            cursor: pointer;
            border-radius: 0.5rem;
            font-weight: 600;
            font-family: "Comfortaa", cursive;
            font-size: 1rem;
        }

        .add-comment button:disabled {
            background-color: #a0a8b9;
            cursor: not-allowed;
        }

        .add-comment .error {
            color: crimson;
            font-weight: 600;
            margin-top: 0.5rem;
        }

    `;
}
