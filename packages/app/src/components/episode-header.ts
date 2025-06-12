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
        const profilePicture = this.profile?.profilePicture || "/assets/defaultpfp.png";
        const color = this.profile?.color || "#ccc";

        return html`
            <header class="front-page-header">
                <div class="left-group">
                    <img src="/assets/logo.png" alt="Episode Logo" class="logo" />
                    <nav class="nav-links">
                        <a href="/app">Home</a>
                        <a href="/app/stories">All Stories</a>
                        <a
                                @click=${() => {
                                    if (this.loggedIn && this.username) {
                                        location.assign(`/app/profiles/${this.username}`);
                                    } else {
                                        location.assign("/login.html");
                                    }
                                }}
                                style="cursor: pointer;">
                            My Profile
                        </a>
                        
                    </nav>
                </div>
                <div class="right-group">
                    <span class="greeting-text">hey, ${displayName}!</span>
                    <mu-dropdown>
                        <img
                                slot="actuator"
                                src=${profilePicture}
                                alt="Profile Picture"
                                class="profile-pic"
                                style="border: 2px solid ${color}"
                        />
                        <menu>
                            <li>
                                <label @change=${toggleDarkMode}>
                                    <input type="checkbox" />
                                    Dark Mode
                                </label>
                                
                            </li>
                            <li>
                                ${this.loggedIn
                                        ? this.renderSignOutButton()
                                        : this.renderSignInButton()}
                            </li>
                        </menu>
                    </mu-dropdown>
                </div>
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
                background-color: white;
                display: flex;
                align-items: center;
                justify-content: space-between; /* space between left and right groups */
                padding: 0.5rem 1.5rem;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                border-bottom: 3px solid #f792c8;
                position: relative;
                z-index: 10;
                font-family: "Comfortaa", sans-serif;
            }

            .logo {
                height: 70px;
            }

            mu-dropdown {
                position: relative;
            }

            .profile-pic {
                width: 70px;
                height: 70px;
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
                padding: 0.75rem 1rem;
                background-color: white;
                border: 1px solid #ccc;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                min-width: 180px;
                position: absolute;
                top: 100%;
                right: 0;
                z-index: 100;
            }

            .dark-toggle {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
            }
            
            .nav-links {
                display: flex;
                gap: 1.25rem;
                align-items: center;
                font-weight: 500;
                margin-left: 1rem;
                font-family: "Comfortaa", sans-serif;
            }

            .nav-links a {
                text-decoration: none;
                color: #1a1a40;
                font-size: 1rem;
                transition: color 0.2s ease;
            }

            .nav-links a:hover {
                color: #f792c8;
                font-weight: bold;
            }

            .left-group {
                display: flex;
                align-items: center;
                gap: 1.5rem; 
            }

            .right-group {
                display: flex;
                align-items: center;
                gap: 0.8rem; 
            }
            
            a {
                font-family: "Comfortaa", sans-serif;
            }

            .greeting-text {
                color: #1a1a40;
                white-space: nowrap;
                font-size: 1rem;
                font-weight: bold;
            }

            button {
                width: 100%;
                max-width: 280px;
                align-self: center;
                padding: 0.75rem 1.5rem;
                background-color: #2a2a55ff;
                color: white;
                border: none;
                border-radius: 0.75rem;
                font-size: 1rem;
                font-weight: 600;
                font-family: inherit;
                cursor: pointer;
                transition: background-color 0.25s ease, transform 0.1s ease;
                margin-top: 1rem;
            }

            button:hover:enabled {
                background-color: #1a1a40ff;
                transform: scale(1.02);
            }
        `];

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
}