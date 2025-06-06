import {
    define,
    Form,
    View,
    History
} from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Reader } from "../../../server/src/models/models.ts";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css.js";

export class ReaderEditElement extends View<Model, Msg> {
    static uses = define({
        "mu-form": Form.Element,
    });

    @property()
    username?: string;

    @state()
    get profile(): Reader | undefined {
        return this.model.profile;
    }

    @state()
    image? = this.profile?.profilePicture;

    render() {
        if (!this.profile) {
            return html`
                <p>Profile does not exist. Please go back to the <a href="/app">homepage</a>.</p>
            `;
        }

        const imageUrl = this.image || this.profile.profilePicture || "/assets/default.jpg";

        return html`
            <episode-header></episode-header>
            <section>
                <main class="card">
                    <mu-form
                            .init=${this.profile}
                            @mu-form:submit=${this.handleSubmit}>

                        <label>
                            <span>Profile Picture</span>
                            <img src=${imageUrl} class="preview-pic" alt="Preview" />
                            <input type="file" @change=${this._handleFileSelected} />
                        </label>

                        <label>
                            <span>Favorite Color</span>
                            <input type="color" name="color" .value=${this.profile.color ?? "#000000"} />
                        </label>
                    </mu-form>
                </main>
            </section>
        `;
    }

    static styles = [
        reset.styles,
        css`
        :host {
            display: flex;
            flex-direction: column;
            height: 100vh;
            font-family: "Comfortaa", sans-serif;
            background-color: #eeeef6ff;
        }

        episode-header {
            flex: 0 0 auto;
        }

        section {
            flex: 1 1 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
        }

        .card {
            background: white;
            padding: 2.5rem;
            border-radius: 1rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
            box-sizing: border-box;

            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        mu-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            gap: 1.5rem;
        }

        label {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-weight: 600;
            color: #2a2a55ff;
            width: 100%;
        }

        .preview-pic {
            width: 100%;
            max-width: 200px;
            border-radius: 0.5rem;
            margin: 1rem 0;
            object-fit: cover;
        }

        input[type="file"],
        input[type="color"] {
            margin-top: 0.5rem;
        }

        input[type="color"] {
            width: 60px;
            height: 34px;
            border: none;
            padding: 0;
        }

        button {
            background-color: #2a2a55ff;
            color: white;
            border-radius: 0.5rem;
            padding: 0.6rem 1.2rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s ease;
            margin-top: 1rem;
        }

        button:hover {
            background-color: #1a1a40ff;
        }

            .submit-wrapper {
                display: flex;
                justify-content: center;
            }

            .custom-submit {
                background-color: #2a2a55ff;
                color: white;
                border-radius: 0.5rem;
                padding: 0.6rem 1.5rem;
                font-weight: 600;
                border: none;
                cursor: pointer;
                transition: background-color 0.2s ease;
                font-size: 1rem;
            }

            .custom-submit:hover {
                background-color: #1a1a40ff;
            }
    `
    ];

    constructor() {
        super("episode:model");
    }

    handleSubmit(event: Form.SubmitEvent<Reader>) {
        if (!this.username) return;

        const profileData = {
            ...event.detail,
            profilePicture: this.image
        };

        this.dispatchMessage([
            "profile/save",
            {
                username: this.username,
                profile: profileData,
                onSuccess: () => {
                    History.dispatch(this, "history/navigate", {
                        href: `/app/profiles/${this.username}`
                    });
                },
                onFailure: (error: Error) => console.log("ERROR:", error)
            }
        ]);
    }

    _handleFileSelected(ev: Event) {
        const input = ev.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const buffer = reader.result as ArrayBuffer;
            const url = new URL("/images", document.location.origin);
            url.searchParams.set("filename", file.name);

            fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": file.type,
                    "Content-Length": file.size.toString()
                },
                body: buffer
            })
                .then(res => res.status === 201 ? res.json() : Promise.reject(res.status))
                .then((json: { url: string }) => {
                    this.image = json.url;
                })
                .catch(err => console.log("Upload failed", err));
        };
        reader.onerror = (err) => console.log("File reading error", err);
        reader.readAsArrayBuffer(file);
    }
}
