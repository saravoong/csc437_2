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

    render() {
        if (!this.profile) {
            return html`<p>Loading...</p>`;
        }

        return html`
        <main class="page">
            <mu-form
                .init=${this.profile}
                @mu-form:submit=${this.handleSubmit}>
                <label>
                    <span>Username</span>
                    <input name="username" .value=${this.profile.username} />
                </label>
                <label>
                    <span>Avatar</span>
                    <input type="file" name="profilePicture" />
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
        this.dispatchMessage([
            "profile/save",
            {
                username: this.username!,
                profile: event.detail,
                onSuccess: () => {
                    History.dispatch(this, "history/navigate", {
                        href: "/app"
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


}