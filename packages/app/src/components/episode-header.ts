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
import reset from "../styles/reset.css.ts";
import headings from "../styles/headings.css.ts";
import page from "../styles/page.css.ts";
import tokens from "../styles/tokens.css.ts";
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

    @state()
    get profile() {
        return this.model.profile;
    }

    constructor() {
        super("episode:model");
    }

    protected render() {
        const displayName = this.username || "episodian";
        const profilePicture = this.profile?.profilePicture || "/assets/profile.jpg";
        const color = this.profile?.color || "#ccc";

        return html`
            <header class="front-page-header">
                <div class="left-group">
                    <img src="/assets/logo.png" alt="Episode Logo" class="logo" />
                </div>

                <mu-dropdown>
                    <img
                            slot="actuator"
                            src=${profilePicture}
                            alt="Profile Picture"
                            class="profile-pic"
                            style="border: 2px solid ${color}"
                    />
                    <menu>
                        <li class="user-name"><b>${displayName}</b></li>
                        <li>
                            <a href="/app/profiles/${this.username}">View Profile</a>
                        </li>
                        <li>
                            <label class="dark-toggle">
                                <input type="checkbox" @change=${toggleDarkMode} />
                                Dark Mode
                            </label>
                        </li>
                        <li class="when-signed-in">
                            <a id="signout" @click=${signOut}>Sign Out</a>
                        </li>
                        <li class="when-signed-out">
                            <a href="/login">Sign In</a>
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
                background-color: #eeeef6ff;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.5rem 1.5rem;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                border-bottom: 4px solid white; 
                position: relative;
                z-index: 10;
            }

            .logo {
                height: 40px;
            }

            mu-dropdown {
                position: relative;
            }

            .profile-pic {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                padding: 4px;
                background-color: white;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
                cursor: pointer;
            }

            menu {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding: 0.75rem;
            }

            .dark-toggle {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
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