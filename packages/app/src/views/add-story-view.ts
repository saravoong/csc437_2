import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("add-story-view")
export class AddStoryViewElement extends LitElement {
    render() {
        return html`
      <episode-header></episode-header>
      <main>
          <add-story-form api="/api/stories"></add-story-form>
      </main>
    `;
    }

    static styles = css`
        :host {
            display: block;
            min-height: 100vh;
            background-color: #f8f8fe;
        }
        
        main {
            padding: 2rem;
            max-width: 600px;
            margin: auto;
        }

  `;
}
