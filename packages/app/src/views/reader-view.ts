import { define, Auth, Form, Observer, View } from "@calpoly/mustang";
import { html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { Reader } from "../../../server/src/models/models.ts";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css.js";
import headings from "../styles/headings.css.js";

export class ReaderViewElement extends View<Model, Msg> {
    static uses = define({
        "mu-form": Form.Element
    });

    @property({ attribute: "username" })
    username?: string;

    get src(): string | undefined {
        if (this.username) {
            return `/api/profiles/${this.username}`;
        }
    }

    @state()
    get reader(): Reader | undefined {
        return this.model.reader;
    }

    @property()
    mode = "view";

    constructor() {
        super("episode:model");
    }

    override render() {
        return this.mode === "edit"
            ? this.renderEditor()
            : this.renderView();
    }

    renderView() {
        const {
            username,
            profilePicture,
            color
        } = this.reader || {};

        return html`
            <button @click=${() => { this.mode = "edit"; }}>
                Edit
            </button>
            <img src=${profilePicture} alt=${username} />
            <h1>${username}</h1>
            <dl>
                <dt>Username</dt>
                <dd>${username}</dd>
                <dt>Favorite Color</dt>
                <dd>
                    <slot name="color-swatch">
                        <span class="swatch" style="background: ${color}"></span>
                    </slot>
                    <slot name="color-name">${color}</slot>
                </dd>
            </dl>
        `;
    }

    renderEditor() {
        const {
            username,
            profilePicture
        } = this.reader || {};

        const init = {
            ...this.reader,
        };

        return html`
            <mu-form
                    .init=${init}
                    @mu-form:submit=${(e: CustomEvent) => {
                        if (this.src) this.handleSubmit(this.src, e.detail);
                    }}>
                <img src=${profilePicture} alt=${username} />
                <h1><input name="username" /></h1>
                <dl>
                    <dt>Avatar</dt>
                    <dd>
                        <input
                                type="file"
                                @change=${(e: InputEvent) => {
                                    const target = e.target as HTMLInputElement;
                                    const files = target.files;
                                    if (files && files.length) {
                                        this.handleAvatarSelected(files);
                                    }
                                }}
                        />
                    </dd>
                    <dt>Username</dt>
                    <dd><input name="username" /></dd>
                    <dt>Favorite Color</dt>
                    <dd>
                        <input type="color" name="color" />
                    </dd>
                </dl>
            </mu-form>
        `;
    }

    static styles = [
        reset.styles,
        headings.styles,
        css`
            :host {
                display: contents;
                grid-column: 2 / -2;
                display: grid;
                grid-template-columns: subgrid;
            }
            section {
                display: grid;
                grid-template-columns: subgrid;
                gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
                align-items: end;
                grid-column: 1 / -1;
            }
            h1 {
                grid-row: 4;
                grid-column: auto / span 2;
            }
            img {
                display: block;
                grid-column: auto / span 2;
                grid-row: 1 / span 4;
            }
            .swatch {
                display: inline-block;
                width: 2em;
                aspect-ratio: 1;
                vertical-align: middle;
            }
            dl {
                display: grid;
                grid-column: 1 / -1;
                grid-row: 5 / auto;
                grid-template-columns: subgrid;
                align-items: baseline;
            }
            dt {
                grid-column: 1 / span 2;
                color: var(--color-accent);
                font-family: var(--font-family-display);
            }
            dd {
                grid-column: 3 / -1;
            }
            mu-form {
                display: contents;
            }
            input {
                margin: var(--size-spacing-medium) 0;
                font: inherit;
            }
        `
    ];

    attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
    ) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (name === "username" && oldValue !== newValue && newValue) {
            this.dispatchMessage(["profile/select", { username: newValue }]);
        }
    }

    _authObserver = new Observer<Auth.Model>(this, "episode:auth");
    _user?: Auth.User;

    override connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe((auth: Auth.Model) => {
            this._user = auth.user;
            if (this.src) this.loadReader(this.src);
        });
    }

    get authorization(): { Authorization?: string } {
        if (this._user && this._user.authenticated)
            return {
                Authorization: `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
            };
        else return {};
    }

    _avatar?: string;

    private async loadReader(url: string) {
        const res = await fetch(url, {
            headers: {
                ...this.authorization
            }
        });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const json = await res.json();
        this.dispatchMessage(["profile/loaded", json]);
    }

    handleSubmit(src: string, formData: object) {
        const json: object = {
            ...this.reader,
            ...formData
        };

        fetch(src, {
            headers: {
                "Content-Type": "application/json",
                ...this.authorization
            },
            method: "PUT",
            body: JSON.stringify(json)
        })
            .then(res => {
                if (!res.ok) throw new Error(`Status: ${res.status}`);
                return res.json();
            })
            .then((json: unknown) => {
                this.dispatchMessage(["profile/loaded", json as Reader]);
                this.mode = "view";
                const event = new Event("profile-updated", { bubbles: true, composed: true });
                this.dispatchEvent(event);
            })
            .catch(console.error);
    }

    handleAvatarSelected(files: FileList) {
        if (files.length) {
            const reader = new FileReader();
            reader.onload = () => {
                this._avatar = reader.result as string;
            };
            reader.onerror = (err) => console.error(err);
            reader.readAsDataURL(files[0]);
        }
    }
}
