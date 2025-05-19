import{i as g,a as m,O as f,d as u,b,e as c,x as d,r as v,c as h,f as k}from"./state-LPCHAKqD.js";import{p as y,t as w}from"./tokens.css-CLyr5EUn.js";function x(r,e,o){const n=r.currentTarget,t=new CustomEvent(e,{bubbles:!0,composed:!0,detail:o});console.log(`Relaying event from ${r.type}:`,t),n.dispatchEvent(t),r.stopPropagation()}window.relayEvent=x;function O(r,e){r.classList.toggle("dark-mode",e)}document.body.addEventListener("dark-mode",r=>O(r.currentTarget,r.detail.checked));const E=g`
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
        background: var(--episode-logo-gradient);
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
`,I={styles:E};var S=Object.defineProperty,p=(r,e,o,n)=>{for(var t=void 0,s=r.length-1,l;s>=0;s--)(l=r[s])&&(t=l(e,o,t)||t);return t&&S(e,o,t),t};const i=class i extends m{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new f(this,"episode:auth")}render(){return d`
            <header class="front-page-header">
                <div class="left-group">
                    <h1 class="Episode-logo">Episode</h1>
                    <p>For all the Episode fans out there!</p>
                    <label>
                        <input
                                type="checkbox"
                                @change=${e=>c.relay(e,"dark-mode",{checked:e.target.checked})}
                        />
                        Dark mode
                    </label>
                </div>

                <mu-dropdown>
                    <a slot="actuator">Hello, <b>${this.username||"episodian"}</b></a>
                    <menu>
                        <li>
                            ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
                        </li>
                    </menu>
                </mu-dropdown>
            </header>
        `}renderSignOutButton(){return d`
            <button
                    @click=${e=>{c.relay(e,"auth:message",["auth/signout"])}}
            >
                Sign Out
            </button>
        `}renderSignInButton(){return d`
            <button @click=${()=>{window.location.href="/login.html"}}>
                Sign In
            </button>
        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const{user:o}=e;o&&o.authenticated?(this.loggedIn=!0,this.username=o.username):(this.loggedIn=!1,this.username=void 0)})}static initializeOnce(){function e(o,n){o==null||o.classList.toggle("dark-mode",n)}document.body.addEventListener("dark-mode",o=>e(o.currentTarget,o.detail.checked))}};i.uses=u({"mu-dropdown":b.Element}),i.styles=[v.styles,y.styles,w.styles,I.styles,g`
            .front-page-header {
                position: relative; /* Needed for absolute positioning inside */
                padding-right: 3rem; /* space so dropdown doesn't overlap content */
            }

            mu-dropdown {
                position: absolute;
                top: 0.5rem;
                right: 1rem;
            }
        `];let a=i;p([h()],a.prototype,"loggedIn");p([h()],a.prototype,"username");u({"epi-header":a,"mu-auth":k.Provider});a.initializeOnce();
