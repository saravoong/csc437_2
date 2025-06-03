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
      <main class="page">
          <nav>
              <button @click=${() => {
                  History.dispatch(this, "history/navigate", { href: "/app" });
              }}>
                  ← Back to Home
              </button>
          </nav>

          <section class="view">
        <img src=${profilePicture}/>
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
        >Edit</button>
        <h1>${name}</h1>
        <dl>
            <dt>Avatar</dt>
          <dt>Username</dt>
          <dd>${username}</dd>
          <dt>Favorite Color</dt>
          <dd>
              <span
                class="swatch"
                style="background: #${color}"></span>
            </slot>
            <slot name="color-name">#${color}</slot>
          </dd>
        </dl>
      </section>
      <mu-form class="edit" .init=${this.profile}>
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
      section.view {
        display: var(--display-view-none, grid);
        grid-template-columns: subgrid;
        gap: inherit;
        gap: var(--size-spacing-medium)
          var(--size-spacing-xlarge);
        align-items: end;
        grid-column: 1 / -1;
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
      dl {
        display: grid;
        grid-column: 1 / span 4;
        grid-row: 5 / auto;
        grid-template-columns: subgrid;
        gap: 0 var(--size-spacing-xlarge);
        align-items: baseline;
      }
      dt {
        grid-column: 1 / span 2;
        justify-self: end;
        color: var(--color-accent);
        font-family: var(--font-family-display);
      }
      dd {
        grid-column: 3 / -1;
      }
      mu-form.edit {
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

    firstUpdated() {
        if (this.username) {
            this.dispatchMessage(["profile/select", { username: this.username }]);
        }
    }

}