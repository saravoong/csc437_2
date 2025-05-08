import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import tokens from "./styles/tokens.css.ts";
import page from "./styles/page.css.ts";
import stories from "./styles/stories.css.ts";

interface Chapter {
    chapterNumber: number;
    title: string;
    url: string;
}

interface Story {
    "img-src": string;
    authorName: string;
    genre: string;
    chapterCount: number;
    storyTitle: string;
    communityOrOfficial: string;
    storyLink: string;
    synopsis: string;
    chapters: Chapter[];
}

export class StoryTemplateElement extends LitElement {
    @property()
    src?: string;

    @state()
    stories: Array<Story> = [];

    @state()
    private storyTitle: string = "";

    connectedCallback() {
        super.connectedCallback();
        const title = this.getAttribute('data-title');
        if (title) {
            this.storyTitle = title;
            if (this.src) {
                this.hydrate(this.src, title);
            }
        }
    }

    override render() {
        const selectedStory = this.stories.find(story => story.storyTitle === this.storyTitle);

        if (!selectedStory) {
            return html`<p>Story not found.</p>`;
        }

        const currentUrl = window.location.pathname;
        const storyTitleLink = currentUrl.split('/')[2];

        return html`
            <section>
            <header>
                <a href="../../../index.html">&larr; Home</a>
                <h1>${selectedStory.storyTitle}</h1>
            </header>

            <div class="page-layout">
                <div class="left-column">
                    <section>
                        <img src="${selectedStory['img-src']}" height="350" />
                        <p>Author: ${selectedStory.authorName}</p>
                        <p>Genre: ${selectedStory.genre}</p>
                        <p>Number of Chapters: ${selectedStory.chapterCount}</p>
                        <p>Official or Community: ${selectedStory.communityOrOfficial}</p>
                        <a href="${selectedStory.storyLink}">Read now</a>
                    </section>
                    <hr>
                    <section>
                        <h3>Synopsis</h3>
                        <p>${selectedStory.synopsis}</p>
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
                            ${selectedStory.chapters?.map(
                                    chapter => html`
                                        <li>
                                            <a href="/stories/${storyTitleLink}/chapters/${String(chapter.chapterNumber).padStart(2, '0')}.html">
                                                ${chapter.title}
                                            </a>
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

    hydrate(src: string, title: string) {
        fetch(src)
            .then(res => res.json())
            .then((json: { stories: Story[] }) => {
                if (json && Array.isArray(json.stories)) {
                    const selectedStory = json.stories.find(story => story.storyTitle === title);
                    if (selectedStory) {
                        this.stories = [selectedStory];
                    } else {
                        console.error(`Story with title "${title}" not found.`);
                    }
                }
            })
            .catch(err => console.error("Failed to fetch stories:", err));
    }
}
