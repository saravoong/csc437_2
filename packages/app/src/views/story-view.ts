import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

import type { Story, Chapter } from "../../../server/src/models/models.ts";

export class StoryViewElement extends LitElement {
    static uses = {
        // example if you want to use Mustang's Form element later
        // "mu-form": Form.Element,
    };

    @property({ attribute: "storypath" })
    storyPath?: string;

    @property()
    mode = "view";

    @state()
    story?: Story;

    connectedCallback() {
        super.connectedCallback();
        if (this.storyPath) {
            this.loadStory();
        }
    }

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has("storyPath")) {
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
            const genreColor = genreColorMap[this.story.genre] || "steelblue";
            this.style.setProperty("--accent-color", genreColor);
        }
    }

    async loadStory() {
        try {
            const res = await fetch(`/api/stories/${this.storyPath}`);
            if (!res.ok) throw new Error(`Failed to fetch story: ${res.statusText}`);
            this.story = await res.json();
        } catch (error) {
            console.error(error);
            this.story = undefined;
        }
    }

    render() {
        if (!this.story) {
            return html`<p>Loading story...</p>`;
        }

        return html`
      <section>
        <header>
          <a href="../../../app">&larr; Home</a>
          <h1>${this.story.storyTitle}</h1>
        </header>

        <div class="page-layout">
          <div class="left-column">
            <section>
              <img src="${this.story["img-src"]}" height="350" />
              <p>Author: ${this.story.authorName}</p>
              <p>Genre: ${this.story.genre}</p>
              <p>Number of Chapters: ${this.story.chapterCount}</p>
              <p>Official or Community: ${this.story.communityOrOfficial}</p>
              <a href="${this.story.storyLink}">Read now</a>
            </section>
            <hr />
            <section>
              <h3>Synopsis</h3>
              <p>${this.story.synopsis}</p>
            </section>
            <hr />
            <section>
              <h3>Rating</h3>
            </section>
            <section>
              <h3>Reviews</h3>
            </section>
            <section>
              <h3>Characters</h3>
            </section>
          </div>
          <hr />
          <div class="right-column">
            <section>
              <h3>Chapters</h3>
              <ul>
                ${this.story.chapters.map(
            (chapter: Chapter) => html`
                    <li>
                      <a
                        href="/app/stories/${this.storyPath}/chapters/${String(
                chapter.chapterNumber)}"
                        >${chapter.title}</a
                      >
                    </li>
                  `
        )}
              </ul>
            </section>
          </div>
        </div>
      </section>
    `;
    }

    static styles = [

        css`
      :host {
        --accent-color: steelblue;
      }
      a {
        color: var(--accent-color);
        font-weight: bold;
      }
      h1 {
        font-size: 2rem;
        border-bottom: 2px solid var(--accent-color);
        padding-bottom: 0.25em;
      }
      ul {
        list-style-type: disc;
        margin-left: 1.5em;
        padding-left: 1em;
      }
    `,
    ];
}
