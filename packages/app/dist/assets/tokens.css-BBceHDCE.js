import{i as r}from"./reset.css-BPlqXxCa.js";const o=r`
    body {
        background-color: var(--color-background-page);
        margin: 0;
        padding: 0;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: "Montserrat", sans-serif;
    }

    h1 {
        margin: 0;
        padding: 0;
    }

    h2 {
        color: var(--color-text-heading);
    }

    h3 {
        color: var(--color-text-heading);
    }

    a {
        color: var(--color-link);
    }

    ul {
        color: var(--color-text);
    }

    ol {
        color: var(--color-text);
    }

    p {
        color: var(--color-text);
        margin: 0;
        padding: 0;
    }

    a, p {
        font-family: "Open Sans", sans-serif;
    }

    hr {
        color: var(--color-accent);
        margin: 0;
        padding: 0;
    }

    header {
        color: var(--color-header-text);
        background-color: var(--color-background-header);
        margin: 0;
        padding: 0;
    }

    header a, header p {
        color: inherit;
        margin: 0;
        padding: 0;
    }

    .front-page-header {
        text-align: center;
        margin: 0;
        padding: 25px;
        font-size: 1.3em;
    }

    .Episode-logo {
        font-family: "Oleo Script", system-ui;
    }

    .title-with-icons {
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }

    svg.icon {
        display: inline;
        height: 2em;
        width: 2em;
        vertical-align: top;
    }

    .bookmark-icon {
        fill: rgb(41, 100, 154);
    }

    .love-icon {
        fill: rgb(198, 46, 46);
    }

    .star-icon {
        fill: rgb(243, 203, 116);
    }

    .stories-grid {
        display: grid;
        grid-template-columns: [start] 1fr 1fr 1fr 1fr[end];
        gap: 1rem;
        margin-top: 1rem;
    }

    .stories-grid > * {
        border: 1.5px solid rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        background-color: var(--background-color-stories-homepage);
        display: flex;
        justify-content: center;
        align-items: center;
    }
`,t={styles:o},e=r`
    :host, :root {
        --color-background-header: var(--color-text-heading);
        --color-header-text: rgb(255, 255, 255);
        --color-background-page: rgb(255, 255, 255);
        --color-accent: rgb(99, 129, 177);
        --color-accent-inverted: var(--color-link);
        --color-link: var(--color-text-heading);
        --color-text: rgb(36, 34, 38);
        --color-text-heading: rgb(37, 86, 142);
        --background-color-stories-homepage: rgb(246, 246, 246);
        --episode-logo-gradient: linear-gradient(to right, #ff987aff, #f792c8ff, #b693fdff, #6dbde1);
    }

    body.dark-mode {
        --color-background-header: rgb(37, 86, 142);
        --color-header-text: rgb(255, 255, 255);
        --color-background-page: rgb(15, 36, 57);
        --color-accent: rgb(255, 255, 255);
        --color-accent-inverted: rgb(255, 255, 255);
        --color-link: rgb(255, 255, 255);
        --color-text: rgb(255, 255, 255);
        --color-text-heading: rgb(255, 255, 255);
        --background-color-stories-homepage: rgb(37, 86, 142);
        --episode-logo-gradient: linear-gradient(to right,#cc6f54, #c76a9f, #8a6bd6, #438eb4);
    }
`,c={styles:e};export{t as p,c as t};
