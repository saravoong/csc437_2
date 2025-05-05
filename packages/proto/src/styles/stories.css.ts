import { css } from "lit";

const styles = css`
    img {
        max-height: 300px;
        width: auto;
    }
    .page-layout {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 40px;
        padding: 20px;
    }

    .left-column {
        flex: 2;
        padding-right: 20px;
        border-right: 2px solid #ccc;
    }

    .right-column {
        flex: 1;
        padding-left: 20px;
    }
`;

export default { styles };