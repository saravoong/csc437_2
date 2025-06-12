import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
//import headings from "../styles/headings.css.ts";
import reset from "../styles/reset.css.ts";
//import page from "../styles/page.css.ts";
//import tokens from "../styles/tokens.css.ts";

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
                <div class="heading-with-icon">
                    <h2>Trending Stories Today</h2>
                    <svg class="icon star-icon">
                        <use href="/icons/deco.svg#icon-star" />
                    </svg>
                </div>
                ${this.loading
                        ? html`<p>Loading trending stories...</p>`
                        : this.trendingStories.length > 0
                                ? html`<div class="story-list">${this.renderStoryCards(this.trendingStories)}</div>`
                                : html`<p>No trending stories at the moment.</p>`}
            </section>
        `;
    }

    static styles = [
        reset.styles,
        css`
            section {
                max-width: 1200px;
                margin: 0 auto;
            }

            .heading-with-icon {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }

            .heading-with-icon h2 {
                font-size: 1.8rem;
            }

            .icon {
                height: 1.8rem;
                width: 1.8rem;
                fill: gold;
            }

            .story-list {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
            }

            .story-card {
                background-color: white;
                border-radius: 0.5rem;
                overflow: hidden;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s ease-in-out;
            }

            .story-card:hover {
                transform: translateY(-5px);
            }

            .story-card img {
                width: 100%;
                height: 160px;
                object-fit: cover;
            }

            .story-card h2 {
                font-size: 1.2rem;
                padding: 1rem;
                margin: 0;
                color: rgb(26, 26, 64);
            }

            a {
                text-decoration: none;
                color: inherit;
                display: block;
            }

            p {
                font-family: "Comfortaa", sans-serif;
                font-size: 1rem;
            }

            @media (max-width: 600px) {
                .story-card img {
                    height: 120px;
                }

                h2 {
                    font-size: 1.5rem;
                }

                .story-card h2 {
                    font-size: 1rem;
                }
            }
        `
    ];

}
