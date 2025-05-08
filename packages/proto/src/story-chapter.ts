import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import tokens from "./styles/tokens.css.ts";
import page from "./styles/page.css.ts";

interface Chapter {
    storyTitle: string;
    chapterNumber: number;
    title: string;
    href: string;
    summary: string;
    comments: string[];
}

interface Story {
    storyTitle: string;
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

    connectedCallback() {
        super.connectedCallback();
        const title = this.getAttribute('data-title');
        const chapNum = this.getAttribute('chapter-number');
        if (title && chapNum) {
            this.storyTitle = title;
            this.chapterNumber = Number(chapNum);
            if (this.src) {
                this.hydrate(this.src, title, Number(chapNum));
            }
        }
    }

    override render() {
        if (!this.selectedChapter) {
            return html`<p>Loading chapter=...</p>`;
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

    hydrate(src: string, title: string, chapterNum: number) {
        fetch(src)
            .then(res => res.json())
            .then((json: { stories: Story[] }) => {
                console.log("Fetched stories:", json);
                const story = json.stories.find(s => s.storyTitle === title);
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
