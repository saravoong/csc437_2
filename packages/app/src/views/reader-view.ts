import { History, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Reader } from "../../../server/src/models/models.ts";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

export class ReaderViewElement extends View<Model, Msg> {
    @property()
    username?: string;

    @state()
    get profile(): Reader | undefined {
        return this.model.profile;
    }

    render() {
        const {
            username,
            profilePicture,
            color = "ffffff"
        } = this.profile || {};

        return html`
            <episode-header></episode-header>
            <section>
      <main class="card">
          <section class="profile-view">
        <img src=${profilePicture}/>
              <dt>Username</dt>
              <dd>${username || "N/A"}</dd>
              <dt>Favorite Color</dt>
              <dd>
              <span
                      class="swatch"
                      style="background: ${color}"></span>
                  </slot>
                  <slot name="color-name">${color}</slot>
              </dd>
              
        <button id="edit"
                   @click=${() =>
            History.dispatch(
                this,
                "history/navigate",
                {
                    href: `/app/profiles/${this.username}/edit`
                }
            )
        }
        >Edit Profile
        </button>
      </section>
      
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
                flex-direction: column;
                justify-content: center;
                align-items: center;   
            }

            .card {
                background: white;
                padding: 2.5rem;
                border-radius: 1rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                max-width: 400px;
                width: 100%;
                box-sizing: border-box;
                text-align: center;
            }

            nav {
                margin-bottom: 1rem;
                text-align: left;
            }

            button {
                cursor: pointer;
                background: none;
                border: none;
                color: #1a1a40ff;
                font-weight: 600;
                font-size: 1rem;
                padding: 0;
                margin-bottom: 1rem;
            }

            .profile-view img.avatar {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                object-fit: cover;
                margin-bottom: 1rem;
            }

            h1 {
                margin-top: 0;
                margin-bottom: 1rem;
                font-weight: 700;
                font-size: 1.75rem;
            }

            dl {
                text-align: left;
                margin: 0 auto 1.5rem;
                max-width: 260px;
            }

            dt {
                font-weight: 600;
                color: #2a2a55ff;
            }

            dd {
                margin: 0 0 1rem 0;
            }

            .swatch {
                display: inline-block;
                width: 1.5em;
                height: 1.5em;
                border-radius: 0.25rem;
                vertical-align: middle;
                margin-right: 0.5em;
                border: 1px solid #ccc;
            }

            #edit {
                background-color: #2a2a55ff;
                color: white;
                border-radius: 0.5rem;
                padding: 0.6rem 1.2rem;
                font-weight: 600;
                border: none;
                transition: background-color 0.2s ease;
            }

            #edit:hover {
                background-color: #1a1a40ff;
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

    firstUpdated() {
        if (this.username) {
            this.dispatchMessage(["profile/select", { username: this.username }]);
        }
    }

}