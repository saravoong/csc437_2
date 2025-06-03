import {
    Auth,
    define,
    Dropdown,
    Events,
    Observer,
    View
} from "@calpoly/mustang";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import headings from "../styles/headings.css.ts";
import reset from "../styles/reset.css.ts";
import { Model } from "../model.ts";
import { Msg } from "../messages.ts";

function toggleDarkMode(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    const checked = target.checked;

    Events.relay(ev, "dark-mode", { checked });
}

function signOut(ev: MouseEvent) {
    Events.relay(ev, "auth:message", ["auth/signout"]);
}

export class HeaderElement extends View<Model, Msg> {
    static uses = define({
        "mu-dropdown": Dropdown.Element
    });

    @state()
    loggedIn = false;

    @state()
    username?: string = "episodian";

    constructor() {
        super("episode:model");
    }

    protected render() {
        const displayName =
            this.username ||
            "episodian";

        return html`
            <header class="front-page-header">
                <div class="left-group">
                    <h1 class="Episode-logo">Episode</h1>
                    <p>For all the Episode fans out there!</p>
                    <label @change=${toggleDarkMode}>
                        <input type="checkbox" />
                        Dark Mode
                    </label>
                </div>

                <mu-dropdown>
                    <a href="/app/profiles/${this.username}">
                        View Profile
                    </a>
                    <a slot="actuator">Hello, <b>${displayName}</b></a>
                    <menu>
                        <li class="when-signed-in">
                            <a id="signout" @click=${signOut}>Sign Out</a>
                        </li>
                        <li class="when-signed-out">
                            <a href="/login">Sign In</a>
                        </li>
                    </menu>
                </mu-dropdown>
            </header>`;
    }

    static styles = [
        reset.styles,
        headings.styles,
        css`
            .front-page-header {
                position: relative; /* Needed for absolute positioning inside */
                padding-right: 3rem; /* space so dropdown doesn't overlap content */
            }

            mu-dropdown {
                position: absolute;
                top: 0.5rem;
                right: 1rem;
            }
        `
    ];

    _authObserver = new Observer<Auth.Model>(
        this,
        "episode:auth"
    );

    connectedCallback() {
        super.connectedCallback();

        this._authObserver.observe(({ user }) => {
            if (user && user.authenticated ) {
                this.loggedIn = true;
                this.username = user.username;

                this.dispatchMessage(["profile/select", {username: this.username}]);
            } else {
                this.loggedIn = false;
                this.username = undefined;
            }
        });
    }

    static initializeOnce() {
        function toggleDarkMode(
            page: HTMLElement,
            checked: boolean
        ) {
            page.classList.toggle("dark-mode", checked);
        }

        document.body.addEventListener("dark-mode", (event) =>
            toggleDarkMode(
                event.currentTarget as HTMLElement,
                (event as CustomEvent).detail?.checked
            )
        );
    }
}