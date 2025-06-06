import { css } from "lit";

const styles = css`
    :host, :root {
        --color-background-header: var(--color-text-heading);
        --color-header-text: rgb(255, 255, 255);
        --color-background-page: #fde9f3;
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
`;

export default { styles };