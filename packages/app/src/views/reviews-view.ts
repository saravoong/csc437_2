import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";
import { Reader } from "../../../server/src/models/models.ts";
import type { Review } from "../../../server/src/models/models.ts";

export class ReviewsViewElement extends View<Model, Msg> {
    @state()
    get profile(): Reader | undefined {
        return this.model.profile;
    }

    @property({ type: String }) storyPath = "";

    @state() reviews: Review[] = [];
    @state() newComment = "";
    @state() errorMessage = "";

    @property({ type: String })
    username = "Testing for now";

    static styles = [
        reset.styles,
        css`
      :host {
        display: block;
        max-width: 600px;
        font-family: "Comfortaa", sans-serif;
        margin: 1rem auto;
        background: white;
        padding: 1.5rem;
        border-radius: 1rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
      h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-weight: 700;
        color: #2a2a55ff;
      }
      textarea {
        width: 100%;
        min-height: 4rem;
        font-family: "Comfortaa", cursive;
        font-size: 1rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #ccc;
        resize: vertical;
        box-sizing: border-box;
        margin-bottom: 0.5rem;
      }
      button {
        background-color: #2a2a55ff;
        color: white;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        font-weight: 600;
        cursor: pointer;
      }
      button:disabled {
        background-color: #999;
        cursor: not-allowed;
      }
      .error {
        color: crimson;
        margin-top: 0.5rem;
        font-weight: 600;
      }
      ul {
        padding-left: 1rem;
        margin-top: 1rem;
        max-height: 300px;
        overflow-y: auto;
      }
      li {
        border-bottom: 1px solid #eee;
        padding: 0.5rem 0;
      }
      .review-username {
        font-weight: 700;
        color: #1a1a40ff;
      }
      .review-date {
        font-size: 0.75rem;
        color: #888;
        margin-left: 0.5rem;
      }
    `
    ];

    constructor() {
        super("episode:model");
    }

    connectedCallback() {
        super.connectedCallback();
        this.loadReviews();
    }

    updated(changedProps: Map<string, any>) {
        if (changedProps.has("storyPath")) {
            this.loadReviews();
        }
    }

    async loadReviews() {
        if (!this.storyPath) {
            this.reviews = [];
            return;
        }

        try {
            const res = await fetch(`/api/stories/${this.storyPath}/reviews`);
            if (!res.ok) throw new Error("Failed to load reviews");
            this.reviews = await res.json();
            this.errorMessage = "";
        } catch (e) {
            this.errorMessage = (e as Error).message;
        }
    }

    handleSubmit() {
        if (!this.newComment.trim()) return;

        this.errorMessage = "";

        const username = this.profile?.username || "Anonymous";

        const newReview: Review = {
            username,
            rating: 1,
            comment: this.newComment.trim(),
            date: new Date(),
        };

        const dateString =
            newReview.date instanceof Date
                ? newReview.date.toISOString()
                : newReview.date;

        this.dispatchMessage([
            "story/review/add",
            {
                storyPath: this.storyPath,
                review: { ...newReview, date: dateString },
            },
        ]);

        this.reviews = [newReview, ...this.reviews];

        this.newComment = "";
    }

    render() {
        return html`
      <section>
        <h3>Reviews</h3>
          ${this.profile ? html`
      <textarea
        .value=${this.newComment}
        @input=${(e: InputEvent) =>
                          (this.newComment = (e.target as HTMLTextAreaElement).value)}
      ></textarea>
      <button
        @click=${this.handleSubmit}
        ?disabled=${!this.newComment.trim()}
      >
        Submit Review
      </button>
    `
                  : html`<p><em>You must be signed in to leave a review.</em></p>`}
          ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}
        ${this.reviews.length
            ? html`<ul>
              ${this.reviews.map(
                (r) => html`<li>
                  <span class="review-username">${r.username}</span>
                    <span class="review-date">
                      ${r.date ? new Date(r.date).toLocaleDateString() : "No date"}
                    </span>
                    <div>${r.comment}</div>
                </li>`
            )}
            </ul>`
            : html`<p>No reviews yet. Be the first to add one!</p>`}
      </section>
    `;
    }
}

