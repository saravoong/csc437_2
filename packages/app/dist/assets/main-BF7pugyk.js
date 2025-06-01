import{a as O,i as l,b,O as S,d as $,c as j,x as n,r as k,e as p,f as N,n as u,V as z,g as F,h as L,s as B,_ as M}from"./reset.css-C8x1Zwsv.js";const T={};function D(s,e,t){switch(s[0]){case"profile/select":E(s[1],t).then(o=>e(r=>({...r,profile:o})));break;default:throw new Error('Unhandled Auth message ""')}}function E(s,e){return fetch(`/api/travelers/${s.username}`,{headers:O.headers(e)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Profile:",t),t})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)},I=l`
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
`,_={styles:I};var U=Object.defineProperty,A=(s,e,t,o)=>{for(var r=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(r=a(e,t,r)||r);return r&&U(e,t,r),r};function G(s){const t=s.target.checked;N.relay(s,"dark-mode",{checked:t})}function H(s){N.relay(s,"auth:message",["auth/signout"])}const f=class f extends b{constructor(){super(...arguments),this.loggedIn=!1,this.username="episodian",this._authObserver=new S(this,"episode:auth")}render(){return n`
            <header class="front-page-header">
                <div class="left-group">
                    <h1 class="Episode-logo">Episode</h1>
                    <p>For all the Episode fans out there!</p>
                    <label @change=${G}>
                        <input type="checkbox" />
                        Dark Mode
                    </label>
                </div>

                <mu-dropdown>
                    <a href="/app/profile/${this.username}">
                        View Profile
                    </a>
                    <a slot="actuator">Hello, <b>${this.username||"episodian"}</b></a>
                    <menu>
                        <li class="when-signed-in">
                            <a id="signout" @click=${H}>Sign Out</a>
                        </li>
                        <li class="when-signed-out">
                            <a href="/login">Sign In</a>
                        </li>
                    </menu>
                </mu-dropdown>
            </header>`}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&e.authenticated?(this.loggedIn=!0,this.username=e.username):(this.loggedIn=!1,this.username=void 0)})}static initializeOnce(){function e(t,o){t.classList.toggle("dark-mode",o)}document.body.addEventListener("dark-mode",t=>{var o;return e(t.currentTarget,(o=t.detail)==null?void 0:o.checked)})}};f.uses=$({"mu-dropdown":j.Element}),f.styles=[k.styles,_.styles,l`
            .front-page-header {
                position: relative; /* Needed for absolute positioning inside */
                padding-right: 3rem; /* space so dropdown doesn't overlap content */
            }

            mu-dropdown {
                position: absolute;
                top: 0.5rem;
                right: 1rem;
            }
        `];let g=f;A([p()],g.prototype,"loggedIn");A([p()],g.prototype,"username");var J=Object.getOwnPropertyDescriptor,Q=(s,e,t,o)=>{for(var r=o>1?void 0:o?J(e,t):e,i=s.length-1,a;i>=0;i--)(a=s[i])&&(r=a(r)||r);return r};let m=class extends b{render(){return n`
            <episode-header></episode-header>
      <section class="Trending">
        <div class="title-with-icons">
          <h2>Trending Stories Today</h2>
          <svg class="icon star-icon">
            <use href="/icons/deco.svg#icon-star" />
          </svg>
        </div>
        <div class="stories-grid">
          <a href="app/stories/catching_feelings">Catching Feelings</a>
          <a href="app/stories/blood_lust">Blood Lust</a>
          <a href="app/stories/rule_breaker">Rule Breaker</a>
        </div>
      </section>

      <hr />

      <section class="Recommendations">
        <div class="title-with-icons">
          <h2>Recommendations For You</h2>
          <svg class="icon love-icon">
            <use href="/icons/deco.svg#icon-love" />
          </svg>
        </div>
        <div class="stories-grid">
          <a href="app/stories/catching_feelings">Catching Feelings</a>
          <a href="app/stories/itll_be_our_secret">It'll Be Our Secret</a>
          <a href="app/stories/love_life">Love Life</a>
        </div>
      </section>

      <hr />

      <section class="Saved Stories">
        <div class="title-with-icons">
          <h2>My Saved Stories</h2>
          <svg class="icon bookmark-icon">
            <use href="/icons/deco.svg#icon-bookmark" />
          </svg>
        </div>
        <div class="stories-grid">
          <a href="app/stories/rule_breaker">Rule Breaker</a>
          <a href="app/stories/aligning_the_stars">Aligning the Stars</a>
        </div>
      </section>

      <hr />

      <section class="Stories">
        <h2>All Stories</h2>
        <div class="stories-grid">
          <a href="app/stories/catching_feelings">Catching Feelings</a>
          <a href="app/stories/blood_lust">Blood Lust</a>
          <a href="app/stories/rule_breaker">Rule Breaker</a>
          <a href="app/stories/aligning_the_stars">Aligning the Stars</a>
          <a href="app/stories/itll_be_our_secret">It'll Be Our Secret</a>
          <a href="app/stories/love_life">Love Life</a>
          <a href="app/stories/bad_meets_bad">Bad Meets Bad</a>
        </div>
      </section>
    `}};m.styles=[_.styles,k.styles,l`
            .front-page-header {
                position: relative; /* Needed for absolute positioning inside */
                padding-right: 3rem; /* space so dropdown doesn't overlap content */
            }

            mu-dropdown {
                position: absolute;
                top: 0.5rem;
                right: 1rem;
            }
        `];m=Q([R("home-view")],m);var Y=Object.defineProperty,C=(s,e,t,o)=>{for(var r=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(r=a(e,t,r)||r);return r&&Y(e,t,r),r};const v=class v extends b{constructor(){super(...arguments),this.mode="view"}connectedCallback(){super.connectedCallback(),this.storyPath&&this.loadStory()}updated(e){if(e.has("storyPath")&&this.loadStory(),this.story){const o={Romance:"hotpink",Drama:"darkslategray",LGBTQ:"mediumorchid",Fantasy:"rebeccapurple",SciFi:"deepskyblue",Mystery:"darkslateblue",Comedy:"goldenrod",Action:"firebrick",Adventure:"teal",Thriller:"indigo",Horror:"crimson"}[this.story.genre]||"steelblue";this.style.setProperty("--accent-color",o)}}async loadStory(){try{const e=await fetch(`/api/stories/${this.storyPath}`);if(!e.ok)throw new Error(`Failed to fetch story: ${e.statusText}`);this.story=await e.json()}catch(e){console.error(e),this.story=void 0}}render(){return this.story?n`
      <section>
        <header>
          <a href="../../../app">&larr; Home</a>
          <h1>${this.story.storyTitle}</h1>
        </header>

        <div class="page-layout">
          <div class="left-column">
            <section>
              <img src="${this.story["img-src"]}" height="350" />
              <p>Author: ${this.story.authorName}</p>
              <p>Genre: ${this.story.genre}</p>
              <p>Number of Chapters: ${this.story.chapterCount}</p>
              <p>Official or Community: ${this.story.communityOrOfficial}</p>
              <a href="${this.story.storyLink}">Read now</a>
            </section>
            <hr />
            <section>
              <h3>Synopsis</h3>
              <p>${this.story.synopsis}</p>
            </section>
            <hr />
            <section>
              <h3>Rating</h3>
            </section>
            <section>
              <h3>Reviews</h3>
            </section>
            <section>
              <h3>Characters</h3>
            </section>
          </div>
          <hr />
          <div class="right-column">
            <section>
              <h3>Chapters</h3>
              <ul>
                ${this.story.chapters.map(e=>n`
                    <li>
                      <a
                        href="/app/stories/${this.storyPath}/chapters/${String(e.chapterNumber)}"
                        >${e.title}</a
                      >
                    </li>
                  `)}
              </ul>
            </section>
          </div>
        </div>
      </section>
    `:n`<p>Loading story...</p>`}};v.uses={},v.styles=[l`
      :host {
        --accent-color: steelblue;
      }
      a {
        color: var(--accent-color);
        font-weight: bold;
      }
      h1 {
        font-size: 2rem;
        border-bottom: 2px solid var(--accent-color);
        padding-bottom: 0.25em;
      }
      ul {
        list-style-type: disc;
        margin-left: 1.5em;
        padding-left: 1em;
      }
    `];let c=v;C([u({attribute:"storypath"})],c.prototype,"storyPath");C([u()],c.prototype,"mode");C([p()],c.prototype,"story");var K=Object.defineProperty,w=(s,e,t,o)=>{for(var r=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(r=a(e,t,r)||r);return r&&K(e,t,r),r};const x=class x extends b{constructor(){super(...arguments),this.chapterNumber=0}connectedCallback(){super.connectedCallback(),this.storyPath&&this.chapterNumber&&this.loadChapter()}updated(e){(e.has("storyPath")||e.has("chapterNumber"))&&this.loadChapter()}async loadChapter(){if(!(!this.storyPath||!this.chapterNumber))try{const e=await fetch(`/api/stories/${this.storyPath}`);if(!e.ok)throw new Error(`Failed to fetch story: ${e.statusText}`);this.story=await e.json(),this.story&&this.story.chapters?this.selectedChapter=this.story.chapters.find(t=>t.chapterNumber===this.chapterNumber):this.selectedChapter=void 0,this.selectedChapter||console.error(`Chapter ${this.chapterNumber} not found in story ${this.storyPath}`)}catch(e){console.error(e),this.story=void 0,this.selectedChapter=void 0}}render(){if(!this.selectedChapter)return n`<p>Loading chapter...</p>`;const e=this.selectedChapter;return n`
            <section>
                <header>
                    <a href="/app/stories/${this.storyPath}">&larr; Back</a>
                    <h1>
                        Chapter ${e.chapterNumber} (${e.storyTitle??"Untitled"})
                    </h1>
                </header>
                <section>
                    <h3>Summary</h3>
                    <p>${e.summary??"No summary available."}</p>
                </section>
                <section>
                    <h3>Comments</h3>
                    ${e.comments&&e.comments.length>0?e.comments.map(t=>n`<p>${t}</p>`):n`<p>No comments yet.</p>`}
                </section>
            </section>
        `}};x.styles=l`
    a {
      color: steelblue;
      font-weight: bold;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    h1 {
      font-size: 2rem;
      border-bottom: 2px solid steelblue;
      padding-bottom: 0.25em;
    }
    section {
      margin-bottom: 1.5em;
    }
    p {
      line-height: 1.4;
    }
    button {
      background-color: steelblue;
      color: white;
      border: none;
      padding: 0.5em 1em;
      cursor: pointer;
      border-radius: 4px;
    }
    button:hover {
      background-color: #1c4a8b;
    }
  `;let d=x;w([u({attribute:"storypath"})],d.prototype,"storyPath");w([u({type:Number,attribute:"chapternumber"})],d.prototype,"chapterNumber");w([p()],d.prototype,"story");w([p()],d.prototype,"selectedChapter");var W=Object.defineProperty,X=Object.getOwnPropertyDescriptor,P=(s,e,t,o)=>{for(var r=o>1?void 0:o?X(e,t):e,i=s.length-1,a;i>=0;i--)(a=s[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&W(e,t,r),r};const y=class y extends z{constructor(){super("episode:model"),this.mode="view",this._authObserver=new S(this,"episode:auth")}get src(){if(this.username)return`/api/profiles/${this.username}`}get reader(){return this.model.reader}render(){return this.mode==="edit"?this.renderEditor():this.renderView()}renderView(){const{username:e,profilePicture:t,color:o}=this.reader||{};return n`
            <button @click=${()=>{this.mode="edit"}}>
                Edit
            </button>
            <img src=${t} alt=${e} />
            <h1>${e}</h1>
            <dl>
                <dt>Username</dt>
                <dd>${e}</dd>
                <dt>Favorite Color</dt>
                <dd>
                    <slot name="color-swatch">
                        <span class="swatch" style="background: ${o}"></span>
                    </slot>
                    <slot name="color-name">${o}</slot>
                </dd>
            </dl>
        `}renderEditor(){const{username:e,profilePicture:t}=this.reader||{},o={...this.reader};return n`
            <mu-form
                    .init=${o}
                    @mu-form:submit=${r=>{this.src&&this.handleSubmit(this.src,r.detail)}}>
                <img src=${t} alt=${e} />
                <h1><input name="username" /></h1>
                <dl>
                    <dt>Avatar</dt>
                    <dd>
                        <input
                                type="file"
                                @change=${r=>{const a=r.target.files;a&&a.length&&this.handleAvatarSelected(a)}}
                        />
                    </dd>
                    <dt>Username</dt>
                    <dd><input name="username" /></dd>
                    <dt>Favorite Color</dt>
                    <dd>
                        <input type="color" name="color" />
                    </dd>
                </dl>
            </mu-form>
        `}attributeChangedCallback(e,t,o){super.attributeChangedCallback(e,t,o),e==="username"&&t!==o&&o&&this.dispatchMessage(["profile/select",{username:o}])}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this.src&&this.loadReader(this.src)})}get authorization(){return this._user&&this._user.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}async loadReader(e){const t=await fetch(e,{headers:{...this.authorization}});if(!t.ok)throw new Error(`Failed to fetch: ${t.status}`);const o=await t.json();this.dispatchMessage(["profile/loaded",o])}handleSubmit(e,t){const o={...this.reader,...t};fetch(e,{headers:{"Content-Type":"application/json",...this.authorization},method:"PUT",body:JSON.stringify(o)}).then(r=>{if(!r.ok)throw new Error(`Status: ${r.status}`);return r.json()}).then(r=>{this.dispatchMessage(["profile/loaded",r]),this.mode="view";const i=new Event("profile-updated",{bubbles:!0,composed:!0});this.dispatchEvent(i)}).catch(console.error)}handleAvatarSelected(e){if(e.length){const t=new FileReader;t.onload=()=>{this._avatar=t.result},t.onerror=o=>console.error(o),t.readAsDataURL(e[0])}}};y.uses=$({"mu-form":F.Element}),y.styles=[k.styles,_.styles,l`
            :host {
                display: contents;
                grid-column: 2 / -2;
                display: grid;
                grid-template-columns: subgrid;
            }
            section {
                display: grid;
                grid-template-columns: subgrid;
                gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
                align-items: end;
                grid-column: 1 / -1;
            }
            h1 {
                grid-row: 4;
                grid-column: auto / span 2;
            }
            img {
                display: block;
                grid-column: auto / span 2;
                grid-row: 1 / span 4;
            }
            .swatch {
                display: inline-block;
                width: 2em;
                aspect-ratio: 1;
                vertical-align: middle;
            }
            dl {
                display: grid;
                grid-column: 1 / -1;
                grid-row: 5 / auto;
                grid-template-columns: subgrid;
                align-items: baseline;
            }
            dt {
                grid-column: 1 / span 2;
                color: var(--color-accent);
                font-family: var(--font-family-display);
            }
            dd {
                grid-column: 3 / -1;
            }
            mu-form {
                display: contents;
            }
            input {
                margin: var(--size-spacing-medium) 0;
                font: inherit;
            }
        `];let h=y;P([u({attribute:"username"})],h.prototype,"username",2);P([p()],h.prototype,"reader",1);P([u()],h.prototype,"mode",2);const Z=[{auth:"protected",path:"/app/stories/:storyPath/chapters/:chapterNumber",view:s=>n`
            <chapter-view
                    storyPath=${s.storyPath}
                    chapterNumber=${s.chapterNumber}>
            </chapter-view>
        `},{path:"/app/stories/:storyPath",view:s=>n`
      <story-view storyPath=${s.storyPath}></story-view>
    `},{auth:"protected",path:"/app/profile/:id",view:(s,e)=>n`
      <reader-view
        username=${s.id}
        mode=${e!=null&&e.has("edit")?"edit":e!=null&&e.has("new")?"new":"view"}></reader-view>
    `},{path:"/app",view:()=>n`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];$({"mu-auth":O.Provider,"mu-history":L.Provider,"mu-switch":class extends M.Element{constructor(){super(Z,"episode:history","episode:auth")}},"mu-store":class extends B.Provider{constructor(){super(D,T,"blazing:auth")}},"episode-header":g,"home-view":m,"story-view":c,"chapter-view":d,"reader-view":h});
