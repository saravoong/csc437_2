import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

export class DestinationElement extends LitElement {
    @property({ type: String })
    href: string = "#";

    @property({ type: Number })
    nights: number = 0;

    override render() {
        return html`
            <a href="${this.href}">Awesome sauce</a>
            <p>${this.nights} nights</p>
        `;
    }

    static styles = [
        reset.styles,
        css`
            :host {
                display: block;
            }

            h3 {
                font-size: 1.8rem;
                margin: 0;
            }
            a[href] {
                color: currentColor;
                text-decoration: none;
            }
            p {
                font-size: 1.2rem;
                margin: 4px 0 0;
                color: purple;
            }
        `
    ];
}
