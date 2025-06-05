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
            return html`<p>Profile does not exist, please go back to the <a href="/app">homepage</a></p>`;
        }

        const imageUrl = this.image || this.profile?.profilePicture || "/assets/default.jpg";

        return html`
        <main class="page">
            <mu-form
                .init=${this.profile}
                @mu-form:submit=${this.handleSubmit}>
                <label>
                    <span>Username</span>
                </label>
                <label>
                    <span>Featured Image</span>
                    <img src=${imageUrl} class="preview-pic" alt="Preview" />
                    <input
                            type="file"
                            @change=${this._handleFileSelected} />
                </label>
                <label>
                    <span>Color</span>
                    <input type="color" name="color" .value=${this.profile.color ?? "#000000"} />
                </label>
            </mu-form>
        </main>
    `;
    }


    static styles = [
        reset.styles,
        css`
      :host {
        display: contents;
        grid-column: 2/-2;
      }
      .page {
        --page-grids: 12;

        display: grid;
        grid-template-columns:
          [start] repeat(var(--page-grids), 1fr)
          [end];
        gap: var(--size-spacing-large)
          var(--size-spacing-medium);
      }
      h1 {
        grid-row: 2;
        grid-column: auto / span 2;
      }
      ::slotted(img[slot="avatar"]) {
        display: block;
        grid-column: auto / span 2;
        grid-row: 1 / span 2;
      }
      .swatch,
      ::slotted([slot="color-swatch"]) {
        display: inline-block;
        width: 2em;
        aspect-ratio: 1;
        vertical-align: middle;
      }
      ::slotted(ul[slot="airports"]) {
        list-style: none;
        padding: 0;
      }
      mu-form {
        display: var(--display-editor-none, grid);
        grid-column: 1/-1;
        grid-template-columns: subgrid;
      }
    `
    ];

    constructor() {
        super("episode:model");
    }

    attributeChangedCallback(
        name: string,
        old: string | null,
        value: string | null
    ) {
        super.attributeChangedCallback(name, old, value);

        if (name === "username" && old !== value && value)
            this.dispatchMessage([
                "profile/select",
                { username: value }
            ]);
    }

    handleSubmit(event: Form.SubmitEvent<Reader>) {
        if (!this.username) {
            console.error("Username is not set, cannot save profile.");
            return;
        }

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
                        /*href: `/app/profiles/${event.detail.username}`*/
                    });
                },
                onFailure: (error: Error) =>
                    console.log("ERROR:", error)
            }
        ]);
    }

    firstUpdated() {
        if (this.username) {
            this.dispatchMessage(["profile/select", { username: this.username }]);
        }
    }

    _handleFileSelected(ev: Event) {
        const target = ev.target as HTMLInputElement;
        const selectedFile = (target.files as FileList)[0];

        const reader: Promise<ArrayBuffer> = new Promise(
            (resolve, reject) => {
                const fr = new FileReader();
                fr.onload = () => resolve(fr.result as ArrayBuffer);
                fr.onerror = (err) => reject(err);
                fr.readAsArrayBuffer(selectedFile);
            }
        );

        reader.then((buffer: ArrayBuffer) => {
            const { name, size, type } = selectedFile;
            const query = new URLSearchParams({ filename: name });
            const url = new URL("/images", document.location.origin);
            url.search = query.toString();

            console.log("Uploading file:", selectedFile);
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": type,
                    "Content-Length": size.toString()
                },
                body: buffer
            })
                .then((res) => {
                    if (res.status === 201) return res.json();
                    else throw res.status;
                })
                .then((json: { url: string } | undefined) => {
                    if (json) {
                        console.log("Image has been uploaded to", json.url);
                        this.image = json.url;
                    } else throw "No JSON response";
                })
                .catch((error) => {
                    console.log("Upload failed", error);
                });
        });
    }
}