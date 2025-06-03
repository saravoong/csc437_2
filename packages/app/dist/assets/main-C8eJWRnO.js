import{a as C,i as c,V as _,O as B,d as P,b as T,x as n,r as $,c as d,e as M,f as x,n as h,h as f,g as D,s as A,_ as I}from"./reset.css-BPlqXxCa.js";const R={};function U(r,e,t){switch(r[0]){case"profile/save":E(r[1],t).then(s=>e(i=>({...i,profile:s}))).then(()=>{const{onSuccess:s}=r[1];s&&s()}).catch(s=>{const{onFailure:i}=r[1];i&&i(s)});break;case"profile/select":J(r[1],t).then(s=>e(i=>({...i,profile:s})));break;default:const o=r[0];throw new Error(`Unhandled message "${o}"`)}}function J(r,e){return fetch(`/api/profiles/${r.username}`,{headers:C.headers(e)}).then(async t=>{if(!t.ok){console.warn(`Profile fetch failed with status ${t.status}`);return}const o=await t.text();if(!o){console.warn(`Empty response for user ${r.username}`);return}try{return JSON.parse(o)}catch{console.error(`Failed to parse JSON for ${r.username}:`,o);return}})}function E(r,e){return fetch(`/api/profiles/${r.username}`,{method:"PUT",headers:{"Content-Type":"application/json",...C.headers(e)},body:JSON.stringify(r.profile)}).then(t=>{if(t.status===200)return t.json();throw new Error(`Failed to save profile for ${r.username}`)}).then(t=>{if(t)return t})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)},H=c`
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
`,F={styles:H};var Q=Object.defineProperty,j=(r,e,t,o)=>{for(var s=void 0,i=r.length-1,a;i>=0;i--)(a=r[i])&&(s=a(e,t,s)||s);return s&&Q(e,t,s),s};function Y(r){const t=r.target.checked;M.relay(r,"dark-mode",{checked:t})}function q(r){M.relay(r,"auth:message",["auth/signout"])}const y=class y extends _{constructor(){super("episode:model"),this.loggedIn=!1,this.username="episodian",this._authObserver=new B(this,"episode:auth")}render(){const e=this.username||"episodian";return n`
            <header class="front-page-header">
                <div class="left-group">
                    <h1 class="Episode-logo">Episode</h1>
                    <p>For all the Episode fans out there!</p>
                    <label @change=${Y}>
                        <input type="checkbox" />
                        Dark Mode
                    </label>
                </div>

                <mu-dropdown>
                    <a href="/app/profiles/${this.username}">
                        View Profile
                    </a>
                    <a slot="actuator">Hello, <b>${e}</b></a>
                    <menu>
                        <li class="when-signed-in">
                            <a id="signout" @click=${q}>Sign Out</a>
                        </li>
                        <li class="when-signed-out">
                            <a href="/login">Sign In</a>
                        </li>
                    </menu>
                </mu-dropdown>
            </header>`}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&e.authenticated?(this.loggedIn=!0,this.username=e.username,this.dispatchMessage(["profile/select",{username:this.username}])):(this.loggedIn=!1,this.username=void 0)})}static initializeOnce(){function e(t,o){t.classList.toggle("dark-mode",o)}document.body.addEventListener("dark-mode",t=>{var o;return e(t.currentTarget,(o=t.detail)==null?void 0:o.checked)})}};y.uses=P({"mu-dropdown":T.Element}),y.styles=[$.styles,F.styles,c`
            .front-page-header {
                position: relative; /* Needed for absolute positioning inside */
                padding-right: 3rem; /* space so dropdown doesn't overlap content */
            }

            mu-dropdown {
                position: absolute;
                top: 0.5rem;
                right: 1rem;
            }
        `];let u=y;j([d()],u.prototype,"loggedIn");j([d()],u.prototype,"username");var K=Object.getOwnPropertyDescriptor,W=(r,e,t,o)=>{for(var s=o>1?void 0:o?K(e,t):e,i=r.length-1,a;i>=0;i--)(a=r[i])&&(s=a(s)||s);return s};let v=class extends x{render(){return n`
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
    `}};v.styles=[F.styles,$.styles,c`
            .front-page-header {
                position: relative; /* Needed for absolute positioning inside */
                padding-right: 3rem; /* space so dropdown doesn't overlap content */
            }

            mu-dropdown {
                position: absolute;
                top: 0.5rem;
                right: 1rem;
            }
        `];v=W([G("home-view")],v);var X=Object.defineProperty,O=(r,e,t,o)=>{for(var s=void 0,i=r.length-1,a;i>=0;i--)(a=r[i])&&(s=a(e,t,s)||s);return s&&X(e,t,s),s};const b=class b extends x{constructor(){super(...arguments),this.mode="view"}connectedCallback(){super.connectedCallback(),this.storyPath&&this.loadStory()}updated(e){if(e.has("storyPath")&&this.loadStory(),this.story){const o={Romance:"hotpink",Drama:"darkslategray",LGBTQ:"mediumorchid",Fantasy:"rebeccapurple",SciFi:"deepskyblue",Mystery:"darkslateblue",Comedy:"goldenrod",Action:"firebrick",Adventure:"teal",Thriller:"indigo",Horror:"crimson"}[this.story.genre]||"steelblue";this.style.setProperty("--accent-color",o)}}async loadStory(){try{const e=await fetch(`/api/stories/${this.storyPath}`);if(!e.ok)throw new Error(`Failed to fetch story: ${e.statusText}`);this.story=await e.json()}catch(e){console.error(e),this.story=void 0}}render(){return this.story?n`
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
    `:n`<p>Loading story...</p>`}};b.uses={},b.styles=[c`
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
    `];let p=b;O([h({attribute:"storypath"})],p.prototype,"storyPath");O([h()],p.prototype,"mode");O([d()],p.prototype,"story");var Z=Object.defineProperty,k=(r,e,t,o)=>{for(var s=void 0,i=r.length-1,a;i>=0;i--)(a=r[i])&&(s=a(e,t,s)||s);return s&&Z(e,t,s),s};const S=class S extends x{constructor(){super(...arguments),this.chapterNumber=0}connectedCallback(){super.connectedCallback(),this.storyPath&&this.chapterNumber&&this.loadChapter()}updated(e){(e.has("storyPath")||e.has("chapterNumber"))&&this.loadChapter()}async loadChapter(){if(!(!this.storyPath||!this.chapterNumber))try{const e=await fetch(`/api/stories/${this.storyPath}`);if(!e.ok)throw new Error(`Failed to fetch story: ${e.statusText}`);this.story=await e.json(),this.story&&this.story.chapters?this.selectedChapter=this.story.chapters.find(t=>t.chapterNumber===this.chapterNumber):this.selectedChapter=void 0,this.selectedChapter||console.error(`Chapter ${this.chapterNumber} not found in story ${this.storyPath}`)}catch(e){console.error(e),this.story=void 0,this.selectedChapter=void 0}}render(){if(!this.selectedChapter)return n`<p>Loading chapter...</p>`;const e=this.selectedChapter;return n`
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
        `}};S.styles=c`
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
  `;let l=S;k([h({attribute:"storypath"})],l.prototype,"storyPath");k([h({type:Number,attribute:"chapternumber"})],l.prototype,"chapterNumber");k([d()],l.prototype,"story");k([d()],l.prototype,"selectedChapter");var V=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,L=(r,e,t,o)=>{for(var s=o>1?void 0:o?ee(e,t):e,i=r.length-1,a;i>=0;i--)(a=r[i])&&(s=(o?a(e,t,s):a(s))||s);return o&&s&&V(e,t,s),s};const N=class N extends _{get profile(){return this.model.profile}render(){const{username:e,profilePicture:t,color:o="ffffff"}=this.profile||{};return n`
      <main class="page">
          <nav>
              <button @click=${()=>{f.dispatch(this,"history/navigate",{href:"/app"})}}>
                  ← Back to Home
              </button>
          </nav>

          <section class="view">
        <img src=${t}/>
        <button id="edit"
                   @click=${()=>f.dispatch(this,"history/navigate",{href:`/app/profiles/${this.username}/edit`})}
        >Edit</button>
        <h1>${name}</h1>
        <dl>
            <dt>Avatar</dt>
          <dt>Username</dt>
          <dd>${e}</dd>
          <dt>Favorite Color</dt>
          <dd>
              <span
                class="swatch"
                style="background: #${o}"></span>
            </slot>
            <slot name="color-name">#${o}</slot>
          </dd>
        </dl>
      </section>
      <mu-form class="edit" .init=${this.profile}>
      </main>
    `}constructor(){super("episode:model")}attributeChangedCallback(e,t,o){super.attributeChangedCallback(e,t,o),e==="username"&&t!==o&&o&&this.dispatchMessage(["profile/select",{username:o}])}firstUpdated(){this.username&&this.dispatchMessage(["profile/select",{username:this.username}])}};N.styles=[$.styles,c`
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
    `];let g=N;L([h()],g.prototype,"username",2);L([d()],g.prototype,"profile",1);var te=Object.defineProperty,re=Object.getOwnPropertyDescriptor,z=(r,e,t,o)=>{for(var s=o>1?void 0:o?re(e,t):e,i=r.length-1,a;i>=0;i--)(a=r[i])&&(s=(o?a(e,t,s):a(s))||s);return o&&s&&te(e,t,s),s};const w=class w extends _{get profile(){return this.model.profile}render(){return this.profile?n`
        <main class="page">
            <mu-form
                .init=${this.profile}
                @mu-form:submit=${this.handleSubmit}>
                <label>
                    <span>Username</span>
                    <input name="username" .value=${this.profile.username} />
                </label>
                <label>
                    <span>Avatar</span>
                    <input type="file" name="profilePicture" />
                </label>
                <label>
                    <span>Color</span>
                    <input type="color" name="color" .value=${this.profile.color??"#000000"} />
                </label>
            </mu-form>
        </main>
    `:n`<p>Loading...</p>`}constructor(){super("episode:model")}attributeChangedCallback(e,t,o){super.attributeChangedCallback(e,t,o),e==="username"&&t!==o&&o&&this.dispatchMessage(["profile/select",{username:o}])}handleSubmit(e){this.dispatchMessage(["profile/save",{username:this.username,profile:e.detail,onSuccess:()=>{f.dispatch(this,"history/navigate",{href:"/app"})},onFailure:t=>console.log("ERROR:",t)}])}firstUpdated(){this.username&&this.dispatchMessage(["profile/select",{username:this.username}])}};w.uses=P({"mu-form":D.Element}),w.styles=[$.styles,c`
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
      mu-form {
        display: var(--display-editor-none, grid);
        grid-column: 1/-1;
        grid-template-columns: subgrid;
      }
    `];let m=w;z([h()],m.prototype,"username",2);z([d()],m.prototype,"profile",1);const se=[{auth:"protected",path:"/app/stories/:storyPath/chapters/:chapterNumber",view:r=>n`
            <chapter-view
                    storyPath=${r.storyPath}
                    chapterNumber=${r.chapterNumber}>
            </chapter-view>
        `},{path:"/app/stories/:storyPath",view:r=>n`
      <story-view storyPath=${r.storyPath}></story-view>
    `},{auth:"protected",path:"/app/profiles/:username/edit",view:r=>n`
    <reader-edit username=${r.username}></reader-edit>`},{auth:"protected",path:"/app/profiles/:username",view:r=>n`
      <reader-view
        username=${r.username}></reader-view>
    `},{path:"/app",view:()=>n`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];P({"mu-auth":C.Provider,"mu-history":f.Provider,"mu-switch":class extends I.Element{constructor(){super(se,"episode:history","episode:auth")}},"mu-store":class extends A.Provider{constructor(){super(U,R,"episode:auth")}},"episode-header":u,"home-view":v,"story-view":p,"chapter-view":l,"reader-view":g,"reader-edit":m});
