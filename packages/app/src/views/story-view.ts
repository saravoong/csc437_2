import { html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { Story, Chapter } from "../../../server/src/models/models.ts";
import reset from "../styles/reset.css.ts";
import { View } from "@calpoly/mustang";
import { Model } from "../model.ts";
import { Msg } from "../messages.ts";
import "./reviews-view";

export class StoryViewElement extends View<Model, Msg> {
    @property({ attribute: "storypath" })
    storyPath?: string;

    @property()
    mode = "view";

    @state()
    story?: Story;

    @state()
    get profile() {
        return this.model.profile;
    }

    static styles = [
        reset.styles,
        css`
            :host {
                display: block;
                min-height: 100vh;
                background-color: #f5f7fa;
            }
            
            .page-layout {
                display: flex;
                gap: 2rem;
                flex-wrap: wrap;
                justify-content: space-between;
            }

            .left-column,
            .right-column {
                background: white;
                border-radius: 0.75rem;
                box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
                padding: 1.5rem 2rem;
                flex: 1 1 300px;
                min-width: 300px;
            }

            img {
                width: 50%;
                height: auto;
                border-radius: 0.75rem;
                margin-bottom: 1rem;
                box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
                object-fit: cover;
            }

            p {
                margin: 0.25rem 0 1rem;
                font-size: 1rem;
                color: #444c6b;
            }

            strong {
                color: #1a1a40;
            }

            a {
                color: var(--accent-color, steelblue);
                font-weight: 600;
                text-decoration: none;
                transition: color 0.3s ease;
            }

            a:hover,
            a:focus {
                text-decoration: underline;
                color: darken(var(--accent-color, steelblue), 15%);
            }

            ul {
                list-style: disc inside;
                margin: 0.5rem 0 1rem;
                padding-left: 1rem;
                color: #3a3a4a;
            }

            li {
                margin-bottom: 0.5rem;
                font-weight: 500;
            }

            hr {
                border: none;
                border-top: 1px solid #e0e0e0;
                margin: 2rem 0;
            }

            section h3 {
                margin-top: 0;
                margin-bottom: 1rem;
                font-weight: 700;
                color: var(--accent-color, steelblue);
                font-size: 1.25rem;
            }

            h1, h3 {
                font-family: 'Comfortaa', cursive;
            }

            p, a {
                font-family: 'Baloo 2', cursive;
            }

            button {
                margin-top: 1rem;
                padding: 0.5rem 1rem;
                font-family: 'Comfortaa', cursive;
                font-size: 1rem;
                font-weight: 600;
                background-color: var(--accent-color, steelblue);
                color: white;
                border: none;
                border-radius: 0.5rem;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            button:hover {
                background-color: #3a3a4a;
            }

            .add-review {
                margin-top: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .add-review input,
            .add-review select,
            .add-review textarea {
                padding: 0.5rem;
                font-family: "Baloo 2", cursive;
                font-size: 1rem;
                border-radius: 0.5rem;
                border: 1px solid #ccc;
                box-sizing: border-box;
                width: 100%;
            }

            .add-review textarea {
                resize: vertical;
                min-height: 4rem;
            }

            .add-review button {
                align-self: flex-start;
            }

            .error {
                color: crimson;
                font-weight: 600;
            }


        `
    ];

    connectedCallback() {
        super.connectedCallback();

        if (this.storyPath) {
            this.loadStory();
        }
    }

    updated(changed: Map<string, any>) {
        if (changed.has("storyPath")) {
            this.loadStory();
        }

        if (this.story) {
            const genreColorMap: Record<string, string> = {
                Romance: "hotpink",
                Drama: "darkslategray",
                LGBTQ: "mediumorchid",
                Fantasy: "rebeccapurple",
                SciFi: "deepskyblue",
                Mystery: "darkslateblue",
                Comedy: "goldenrod",
                Action: "firebrick",
                Adventure: "teal",
                Thriller: "indigo",
                Horror: "crimson",
            };
            const genreKey = this.story.genre?.replace(/\+/g, "") || "";
            const genreColor = genreColorMap[genreKey] || "steelblue";
            this.style.setProperty("--accent-color", genreColor);
        }
    }

    async loadStory() {
        try {
            const res = await fetch(`/api/stories/${this.storyPath}`);
            if (!res.ok) throw new Error(`Failed to fetch story: ${res.statusText}`);
            this.story = await res.json();
        } catch (err) {
            console.error(err);
            this.story = undefined;
        }
    }

    async handleAddChapter() {
        if (!this.story || !this.storyPath) return;

        const maxChapterNumber = Math.max(0, ...this.story.chapters.map((ch) => ch.chapterNumber || 0));
        const newChapterNumber = maxChapterNumber + 1;

        const newChapter: Chapter = {
            chapterNumber: newChapterNumber,
            title: `Chapter ${newChapterNumber}`,
            summary: "",
            comments: [],
            href: `./chapters/${newChapterNumber}.html`,
            storyTitle: this.story.storyTitle
        };

        const updatedStory: Story = {
            ...this.story,
            chapterCount: newChapterNumber,
            chapters: [...this.story.chapters, newChapter]
        };

        try {
            const res = await fetch(`/api/stories/${this.storyPath}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedStory)
            });

            if (!res.ok) throw new Error("Failed to update story with new chapter");

            this.story = await res.json(); // update UI with new story data
        } catch (err) {
            console.error("Error adding chapter:", err);
        }
    }

    render() {

        if (!this.story) {
            return html`<p>Loading story...</p>`;
        }

        return html`
            <episode-header></episode-header>
            <h1 style="padding: 2rem 0 1rem; color: #1a1a40;">${this.story.storyTitle}</h1>
            <section>
                <div class="page-layout">
                    <div class="left-column">
                        <section>
                            <img src="${this.story["img-src"]}" alt="Story Cover" />
                            <p><strong>Author:</strong> ${this.story.authorName}</p>
                            <p><strong>Genre:</strong> ${this.story.genre}</p>
                            <p><strong>Chapters:</strong> ${this.story.chapterCount}</p>
                            <p><strong>Community or Official:</strong> ${this.story.communityOrOfficial}</p>
                            <p>
                                <a href="${this.story.storyLink}" target="_blank" rel="noopener noreferrer"
                                >Read Now</a
                                >
                            </p>
                        </section>

                        <hr />

                        <section>
                            <h3>Synopsis</h3>
                            <p>${this.story.synopsis}</p>
                        </section>
                        
                    </div>

                    <div class="right-column">
                        <section>
                    <h3>Reviews</h3>
                </section>

                        <section>
                            <h3>Chapters</h3>
                            <button @click=${this.handleAddChapter}>Add Chapter + </button>
                            <ul>
                                ${this.story.chapters.map(
                                        (chapter: Chapter) => html`
                                            <li>
                                                <a href="/app/stories/${this.storyPath}/chapters/${chapter.chapterNumber}">
                                                    ${chapter.title}
                                                </a>
                                            </li>
                                        `
                                )}
                            </ul>
                        </section>
                    </div>
                </div>
                <reviews-view .storyPath=${this.storyPath}></reviews-view>
            </section>
        `;
    }
}
