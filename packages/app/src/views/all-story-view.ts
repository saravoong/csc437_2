import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
//import headings from "../styles/headings.css.ts";
import reset from "../styles/reset.css.ts";
//import page from "../styles/page.css.ts"
//import tokens from "../styles/tokens.css.ts"

interface Story {
    "img-src": string;
    authorName: string;
    genre: string;
    chapterCount: { $numberInt: string };
    storyTitle: string;
    communityOrOfficial: string;
    storyLink: string;
    storyPath: string;
    synopsis: string;
}

@customElement("all-story-view")
export class AllStoryViewElement extends LitElement {
    @state()
    stories: Story[] = [];

    @state()
    loading = true;

    @state()
    error: string | null = null;

    @state() searchTerm = "";
    @state() selectedGenre = "";

    connectedCallback() {
        super.connectedCallback();
        this.loadStories();
    }

    async loadStories() {
        try {
            this.loading = true;
            this.error = null;
            const response = await fetch("/api/stories");
            if (!response.ok) {
                throw new Error(`Failed to fetch stories: ${response.statusText}`);
            }
            const data: Story[] = await response.json();
            this.stories = data;
        } catch (err: any) {
            this.error = err.message || "Unknown error";
        } finally {
            this.loading = false;
        }
    }

    get filteredStories() {
        return this.stories.filter((story) => {
            const matchesSearch =
                story.storyTitle.toLowerCase().includes(this.searchTerm) ||
                story.authorName.toLowerCase().includes(this.searchTerm);

            const matchesGenre =
                !this.selectedGenre || story.genre === this.selectedGenre;

            return matchesSearch && matchesGenre;
        });
    }

    addStory() {
        window.location.href = "/app/stories/add";
    }

    render() {
        return html`
            <episode-header></episode-header>
            <section class="filters">
                <input
                        type="text"
                        placeholder="Search by title or author"
                        @input=${(e: Event) => (this.searchTerm = (e.target as HTMLInputElement).value.toLowerCase())}
                />
                <select @change=${(e: Event) => (this.selectedGenre = (e.target as HTMLSelectElement).value)}>
                    <option value="">All Genres</option>
                    ${[
                        "Romance", "Drama", "LGBTQ", "Fantasy", "SciFi",
                        "Mystery", "Comedy", "Action", "Adventure", "Thriller", "Horror"
                    ].map(
                            (genre) => html`<option value=${genre}>${genre}</option>`
                    )}
                </select>
                <button @click=${this.addStory}>Add Story +</button>
            </section>
            <main class="story-list">
                ${this.filteredStories.map(
                        (story) => html`
                            <article class="story-card">
                                <a href="/app/stories/${story.storyPath}">
                                    <img src=${story["img-src"] || "/assets/defaultstorycover.png" }
                                         alt=${story.storyTitle} 
                                    />
                                    <h2>${story.storyTitle}</h2>
                                </a>
                            </article>
                        `
                )}
            </main>
        `;
    }

    static styles = [
        reset.styles,
        css`
            :host {
                display: block;
                min-height: 100vh;
                background-color: #eeeef6ff;
            }
            
            .story-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 2rem;
                justify-content: center;
                padding: 2rem;
            }

            .story-list {
                display: flex;
                flex-wrap: wrap;
                gap: 2rem;
                padding: 1rem;
                justify-content: center;
            }

            .story-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                width: 210px;
                padding: 1rem;
                background-color: white;
                border-radius: 15px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                border: 2px solid transparent; 
                transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
            }
            
            .story-card:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
                border: 2px solid #ff987a; 
            }

            .story-card img {
                width: 180px;
                height: auto;
                border-radius: 1.8rem;
                object-fit: cover;
            }

            .story-card h2 {
                font-family: "Comfortaa", sans-serif;
                font-weight: bold;
                margin: 0.5rem 0 1rem 0;
                color: #1a1a40;
            }

            .story-card a {
                margin-top: 0.5rem;
                font-size: 0.8rem;
                color: #1a1a40;
                text-decoration: none;
                transition: color 0.3s ease;
            }

            .story-card a:hover {
                color: #f792c8;
                text-decoration: none;
            }
            .filters {
                display: flex;
                gap: 1rem;
                padding: 1.5rem 2rem 0;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
            }

            .filters input,
            .filters select {
                padding: 0.65rem 1rem;
                font-size: 1rem;
                border-radius: 8px;
                border: 1px solid #ccc;
                font-family: "Comfortaa", sans-serif;
                width: 250px; 
            }

            .filters input::placeholder {
                color: #999;
            }
            
            .filters select {
                background-color: #fff;
            }

            .filters button {
                padding: 0.65rem 1.2rem;
                font-size: 1rem;
                font-weight: 600;
                color: white;
                background-color: #f7923c;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-family: "Comfortaa", sans-serif;
                transition: background-color 0.3s ease;
            }

            .filters button:hover {
                background-color: #e06a00;
            }
        `,
    ];
}
