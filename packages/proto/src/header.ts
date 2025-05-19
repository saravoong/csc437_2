import {
    define,
    Auth,
    Dropdown,
    Events,
    Observer
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import reset from "./styles/reset.css.ts";
import headings from "./styles/headings.css.ts";
import { state } from "lit/decorators.js";
import page from "./styles/page.css.ts";
import tokens from "./styles/tokens.css.ts";

export class HeaderElement extends LitElement {
    static uses = define({
        "mu-dropdown": Dropdown.Element
    });

    @state()
    loggedIn = false;

    @state()
    username?: string;

    render() {
        return html`
            <header class="front-page-header">
                <div class="left-group">
                    <h1 class="Episode-logo">Episode</h1>
                    <p>For all the Episode fans out there!</p>
                    <label>
                        <input
                                type="checkbox"
                                @change=${(event: Event) =>
                                        Events.relay(event, "dark-mode", {
                                            checked: (event.target as HTMLInputElement).checked
                                        })}
                        />
                        Dark mode
                    </label>
                </div>

                <mu-dropdown>
                    <a slot="actuator">Hello, <b>${this.username || "episodian"}</b></a>
                    <menu>
                        <li>
                            ${this.loggedIn
                                    ? this.renderSignOutButton()
                                    : this.renderSignInButton()}
                        </li>
                    </menu>
                </mu-dropdown>
            </header>
        `;
    }


    static styles = [
        reset.styles,
        page.styles,
        tokens.styles,
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


    renderSignOutButton() {
        return html`
            <button
                    @click=${(e: UIEvent) => {
                        Events.relay(e, "auth:message", ["auth/signout"]);
                    }}
            >
                Sign Out
            </button>
        `;
    }

    renderSignInButton() {
        return html`
            <button @click=${() => {
                window.location.href = "/login.html";
            }}>
                Sign In
            </button>
        `;
    }

    private _authObserver = new Observer<Auth.Model>(this, "episode:auth");

    connectedCallback() {
        super.connectedCallback();

        this._authObserver.observe((auth: Auth.Model) => {
            const { user } = auth;

            if (user && user.authenticated) {
                this.loggedIn = true;
                this.username = user.username;
            } else {
                this.loggedIn = false;
                this.username = undefined;
            }
        });
    }

    static initializeOnce() {
        function toggleDarkMode(page: HTMLElement | null, checked: boolean) {
            page?.classList.toggle("dark-mode", checked);
        }

        document.body.addEventListener("dark-mode", (event: Event) =>
            toggleDarkMode(
                event.currentTarget as HTMLElement,
                (event as CustomEvent).detail.checked
            )
        );
    }
}
