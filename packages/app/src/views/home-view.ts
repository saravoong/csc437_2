import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import headings from "../styles/headings.css.ts";
import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";
import tokens from "../styles/tokens.css.ts";

interface Story {
    "img-src": string;
    storyTitle: string;
    storyPath: string;
    commentCount: number;
    createdAt: string; // ISO string
}

@customElement("home-view")
export class HomeViewElement extends LitElement {
    @state()
    trendingStories: Story[] = [];

    @state()
    loading = true;

    connectedCallback() {
        super.connectedCallback();
        this.loadTrendingStories();
    }

    async loadTrendingStories() {
        try {
            const response = await fetch("/api/stories/trending");
            if (!response.ok) throw new Error("Failed to fetch trending stories");
            const stories = await response.json();
            this.trendingStories = stories;
        } catch (error) {
            console.error("Error loading trending stories:", error);
            this.trendingStories = [];
        } finally {
            this.loading = false;
        }
    }

    formatDate(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    }

    renderStoryCards(stories: Story[]) {
        return stories.map(
            (story) => html`
                <article class="story-card">
                    <a href="/app/stories/${story.storyPath}">
                        <img src=${story["img-src"] || "/assets/defaultstorycover.png"} alt=${story.storyTitle} />
                        <h2>${story.storyTitle}</h2>
                    </a>
                </article>
            `
        );
    }

    render() {
        return html`
            <episode-header></episode-header>
            <section>
                <h2>Trending Stories Today</h2>
                ${this.loading
                        ? html`<p>Loading trending stories...</p>`
                        : this.trendingStories.length > 0
                                ? html`<div class="story-list">${this.renderStoryCards(this.trendingStories)}</div>`
                                : html`<p>No trending stories at the moment.</p>`
                }
            </section>
        `;
    }

    static styles = [
        headings.styles,
        reset.styles,
        page.styles,
        tokens.styles,
        css`

            :host {
                display: block;
                font-family: "Comfortaa", sans-serif;
                background-color: #eeeef6ff;
                min-height: 100vh;
            }

            h2 {
                font-size: 1.8rem;
                margin: 1.5rem;
                color: #1a1a40;
                font-family: "Comfortaa", sans-serif;
            }

            .story-list {
                display: flex;
                flex-wrap: wrap;
                gap: 2rem;
                padding: 1rem;
                justify-content: center;
            }

            .story-card {
                width: 210px;
                padding: 1rem;
                background-color: white;
                border-radius: 15px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
                text-align: center;
            }

            .story-card:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
            }

            .story-card img {
                width: 180px;
                border-radius: 1.8rem;
                object-fit: cover;
            }

            .story-card h2 {
                margin: 0.5rem 0 0.3rem;
                font-weight: 700;
                font-size: 1.1rem;
                color: #1a1a40;
            }

            .story-card .meta {
                font-size: 0.8rem;
                color: #888;
                margin-top: 0.3rem;
            }

            a {
                text-decoration: none;
                color: inherit;
            }
            
            p {
                font-family: "Comfortaa", sans-serif;
            }
        `,
    ];
}
