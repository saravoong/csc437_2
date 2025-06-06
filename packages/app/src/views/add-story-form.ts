import {
    define,
    Form,
    View,
} from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "../styles/reset.css";

interface StoryFormData {
    "img-src"?: string;
    authorName?: string;
    genre?: string;
    chapterCount?: number;
    storyTitle?: string;
    communityOrOfficial?: string;
    storyLink?: string;
    storyPath?: string;
    synopsis?: string;
}

export class AddStoryFormElement extends View<any, any> {
    static uses = define({
        "mu-form": Form.Element,
    });

    @state()
    formData: StoryFormData = {};

    @property({ type: String })
    api?: string;

    @property({ type: String })
    redirect: string = "/";

    @state()
    error?: string;

    @property({ type: String })
    buttonLabel = "Add Story";

    generateStoryPath(title: string): string {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "_");
    }

    get canSubmit(): boolean {
        const fd = this.formData;
        return Boolean(
            this.api &&
            fd.storyTitle &&
            fd.authorName &&
            fd.communityOrOfficial
        );
    }

    handleChange(e: InputEvent) {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        const name = target.name;
        let value: any = target.value;

        // For chapterCount, convert to number if possible
        if (name === "chapterCount") {
            value = parseInt(value, 10);
            if (isNaN(value)) value = 0;
        }

        this.formData = { ...this.formData, [name]: value };
    }

    handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        if (!this.canSubmit) {
            this.error = "Please fill in all required fields.";
            return;
        }

        const payload = {
            ...this.formData,
            storyPath: this.generateStoryPath(this.formData.storyTitle || ""),
        };

        fetch(this.api || "", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error("Failed to add story");
                }
                return res.json();
            })
            .then((createdStory) => {
                this.error = undefined;
                const path = createdStory.storyPath || payload.storyPath;
                window.location.href = `/app/stories/${path}`;
            })
            .catch((err) => {
                this.error = err.toString();
            });
    }

    _handleFileSelected(ev: Event) {
        const target = ev.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            this.formData = { ...this.formData, "img-src": reader.result as string };
        };
        reader.readAsDataURL(file);
    }

    static styles = [
        reset.styles,
        css`
            :host {
                display: flex;
                justify-content: center;
                padding: 2rem 1rem;
                font-family: "Comfortaa", sans-serif;
                color: #1a1a40;
                background-color: #f8f8fe;
                min-height: 100vh;
                box-sizing: border-box;
            }

            form {
                background: white;
                padding: 2.5rem 2rem;
                border-radius: 1rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                max-width: 480px;
                width: 100%;
                display: grid;
                gap: 1.25rem;
                box-sizing: border-box;
            }

            h2 {
                margin: 0 0 1.5rem 0;
                font-weight: 700;
                font-size: 1.8rem;
                text-align: center;
                color: #1a1a40;
            }

            label {
                display: flex;
                flex-direction: column;
                font-weight: 600;
                font-size: 0.95rem;
                color: #1a1a40;
            }

            input,
            textarea,
            select {
                margin-top: 0.4rem;
                padding: 0.6rem 0.8rem;
                font-size: 1rem;
                font-family: inherit;
                border-radius: 0.6rem;
                border: 1px solid #ccc;
                transition: border-color 0.3s ease;
                color: #1a1a40;
            }

            input:focus,
            textarea:focus,
            select:focus {
                outline: none;
                border-color: #6dbde1; /* accent color */
                box-shadow: 0 0 5px #6dbde1aa;
            }

            textarea {
                resize: vertical;
            }

            button {
                margin-top: 1rem;
                background-color: #6dbde1;
                color: white;
                font-weight: 600;
                font-size: 1.1rem;
                padding: 0.75rem 0;
                border: none;
                border-radius: 1rem;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            button:hover:not(:disabled) {
                background-color: #5aa9d7;
            }

            button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .error {
                color: #e55353;
                font-weight: 700;
                text-align: center;
                margin-top: 0.5rem;
            }

            img.preview {
                max-width: 100%;
                max-height: 240px;
                margin-top: 0.5rem;
                border-radius: 0.75rem;
                border: 1px solid #ccc;
                object-fit: contain;
                display: block;
            }
            
            h2 {
                color: #1a1a40;
            }
            
            button {
                font-family: Comfortaa, "Comfortaa", sans-serif;
            }
        `,
    ];

    render() {
        const fd = this.formData;

        return html`
      <form
        @input=${this.handleChange}
        @submit=${this.handleSubmit}
        autocomplete="off"
      >
          <h2>Add story</h2>
        <label>
          Story Title * 
          <input
            name="storyTitle"
            type="text"
            .value=${fd.storyTitle || ""}
            required
          />
        </label>

        <label>
          Author Name *
          <input
            name="authorName"
            type="text"
            .value=${fd.authorName || ""}
            required
          />
        </label>

        <label>
          Community or Official *
          <select name="communityOrOfficial" required>
            <option value="" ?selected=${!fd.communityOrOfficial}>Select...</option>
            <option value="Community" ?selected=${fd.communityOrOfficial === "Community"}>Community</option>
            <option value="Official" ?selected=${fd.communityOrOfficial === "Official"}>Official</option>
          </select>
        </label>
          <label>
              Genre
              <select name="genre" .value=${fd.genre || ""}>
                  <option value="" disabled selected>Select a genre</option>
                  <option value="Romance">Romance</option>
                  <option value="Drama">Drama</option>
                  <option value="LGBTQ+">LGBTQ+</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Horror">Horror</option>
              </select>
          </label>
          <label>
          Chapter Count
          <input
            name="chapterCount"
            type="number"
            min="0"
            .value=${fd.chapterCount ?? ""}
          />
        </label>

        <label>
          Synopsis
          <textarea
            name="synopsis"
            rows="5"
            .value=${fd.synopsis || ""}
          ></textarea>
        </label>

          <label>
              Link to story
              <input
                      name="storyLink"
                      type="text"
                      .value=${fd.storyLink || ""}
              />
          </label>

        <label>
          Image (optional)
          <input
            type="file"
            accept="image/*"
            @change=${this._handleFileSelected}
          />
          ${fd["img-src"]
            ? html`<img class="preview" src=${fd["img-src"]} alt="Story Image Preview" />`
            : null}
        </label>

        <button type="submit" ?disabled=${!this.canSubmit}>
          ${this.buttonLabel}
        </button>

        ${this.error ? html`<p class="error">${this.error}</p>` : ""}
      </form>
    `;
    }
}


