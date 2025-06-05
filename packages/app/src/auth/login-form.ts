import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "../styles/reset.css.js";

interface LoginFormData {
    username?: string;
    password?: string;
}

export class LoginFormElement extends LitElement {

    @state()
    formData: LoginFormData = {};

    @property()
    api?: string;

    @property()
    redirect: string = "/";

    @state()
    error?: string;

    @property({ type: String }) buttonLabel = "Login";

    get canSubmit(): boolean {
        return Boolean(this.api && this.formData.username &&
            this.formData.password);
    }

    override render() {
        return html`
            <form
                    @input=${(e: InputEvent) => this.handleChange(e)}
                    @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
            >
                <slot></slot>
                <slot name="button">
                    <button
                            ?disabled=${!this.canSubmit}
                            type="submit">
                        ${this.buttonLabel}
                    </button>
                </slot>
                <p class="error">${this.error}</p>
            </form>
        `;
    }

    static styles = [
        reset.styles,
        css`
            .error:not(:empty) {
                color: #da3939;
                border: 1px solid;
            }

            form {
                display: flex;
                flex-direction: column;
                align-items: stretch;
            }

            login-form label {
                display: flex;
                flex-direction: column;
                font-weight: 600;
                font-size: 0.95rem;
                margin-bottom: 0.5rem;
            }

            login-form input {
                padding: 0.6rem 0.8rem;
                margin-top: 0.3rem;
                border: 1px solid #ccc;
                border-radius: 0.5rem;
                font-size: 1rem;
                font-family: inherit;
                width: 100%;
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

            button:disabled {
                background-color: #ccc;
                cursor: not-allowed;
                transform: none;
            }
        `
    ];


    handleChange(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        const name = target?.name;
        const value = target?.value;
        const prevData = this.formData;

        switch (name) {
            case "username":
                this.formData = { ...prevData, username: value };
                break;
            case "password":
                this.formData = { ...prevData, password: value };
                break;
        }
    }

    handleSubmit(submitEvent: SubmitEvent) {
        submitEvent.preventDefault();

        if (this.canSubmit) {
            fetch(this?.api || "",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.formData)
                }
            )
                .then((res) => {
                    if (res.status !== 200 && res.status !== 201)
                        throw "Login failed";
                    else return res.json();
                })
                .then((json: object) => {
                    const { token } = json as { token: string };
                    const customEvent = new CustomEvent(
                        'auth:message', {
                            bubbles: true,
                            composed: true,
                            detail: [
                                'auth/signin',
                                { token, redirect: this.redirect }
                            ]
                        });
                    console.log("dispatching message", customEvent);
                    this.dispatchEvent(customEvent);
                })
                .catch((error: Error) => {
                    console.log(error);
                    this.error = error.toString();
                });
        }
    }
}