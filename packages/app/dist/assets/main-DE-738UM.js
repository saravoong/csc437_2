import{a as C,i as d,V as O,O as I,d as S,b as R,x as n,r as k,c,e as T,f as N,n as f,h as v,g as J,s as G,_ as q}from"./reset.css-BPlqXxCa.js";import{p as H,t as Q}from"./tokens.css-BBceHDCE.js";const Y={};function E(o,e,t){switch(o[0]){case"profile/save":W(o[1],t).then(r=>e(i=>({...i,profile:r}))).then(()=>{const{onSuccess:r}=o[1];r&&r()}).catch(r=>{const{onFailure:i}=o[1];i&&i(r)});break;case"profile/select":K(o[1],t).then(r=>e(i=>({...i,profile:r})));break;default:const s=o[0];throw new Error(`Unhandled message "${s}"`)}}function K(o,e){return fetch(`/api/profiles/${o.username}`,{headers:C.headers(e)}).then(async t=>{if(!t.ok){console.warn(`Profile fetch failed with status ${t.status}`);return}const s=await t.text();if(!s){console.warn(`Empty response for user ${o.username}`);return}try{return JSON.parse(s)}catch{console.error(`Failed to parse JSON for ${o.username}:`,s);return}})}function W(o,e){return fetch(`/api/profiles/${o.username}`,{method:"PUT",headers:{"Content-Type":"application/json",...C.headers(e)},body:JSON.stringify(o.profile)}).then(t=>{if(t.status===200)return t.json();throw new Error(`Failed to save profile for ${o.username}`)}).then(t=>{if(t)return t})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X=o=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)},Z=d`
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
`,B={styles:Z};var V=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,F=(o,e,t,s)=>{for(var r=s>1?void 0:s?ee(e,t):e,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&V(e,t,r),r};function te(o){const t=o.target.checked;T.relay(o,"dark-mode",{checked:t})}function re(o){T.relay(o,"auth:message",["auth/signout"])}const w=class w extends O{constructor(){super("episode:model"),this.loggedIn=!1,this.username="episodian",this._authObserver=new I(this,"episode:auth")}get profile(){return this.model.profile}render(){var r,i;const e=this.username||"episodian",t=((r=this.profile)==null?void 0:r.profilePicture)||"/assets/profile.jpg",s=((i=this.profile)==null?void 0:i.color)||"#ccc";return n`
            <header class="front-page-header">
                <div class="left-group">
                    <img src="/assets/logo.png" alt="Episode Logo" class="logo" />
                </div>

                <mu-dropdown>
                    <img
                            slot="actuator"
                            src=${t}
                            alt="Profile Picture"
                            class="profile-pic"
                            style="border: 2px solid ${s}"
                    />
                    <menu>
                        <li class="user-name"><b>${e}</b></li>
                        <li>
                            <a href="/app/profiles/${this.username}">View Profile</a>
                        </li>
                        <li>
                            <label class="dark-toggle">
                                <input type="checkbox" @change=${te} />
                                Dark Mode
                            </label>
                        </li>
                        <li class="when-signed-in">
                            <a id="signout" @click=${re}>Sign Out</a>
                        </li>
                        <li class="when-signed-out">
                            <a href="/login">Sign In</a>
                        </li>
                    </menu>
                </mu-dropdown>
            </header>
        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&e.authenticated?(this.loggedIn=!0,this.username=e.username,this.dispatchMessage(["profile/select",{username:this.username}])):(this.loggedIn=!1,this.username=void 0)})}static initializeOnce(){function e(t,s){t.classList.toggle("dark-mode",s)}document.body.addEventListener("dark-mode",t=>{var s;return e(t.currentTarget,(s=t.detail)==null?void 0:s.checked)})}};w.uses=S({"mu-dropdown":R.Element}),w.styles=[k.styles,H.styles,Q.styles,B.styles,d`
            .front-page-header {
                background-color: #eeeef6ff;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.5rem 1.5rem;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                border-bottom: 4px solid white; 
                position: relative;
                z-index: 10;
            }

            .logo {
                height: 40px;
            }

            mu-dropdown {
                position: relative;
            }

            .profile-pic {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                padding: 4px;
                background-color: white;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
                cursor: pointer;
            }

            menu {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding: 0.75rem;
            }

            .dark-toggle {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
            }
        `];let u=w;F([c()],u.prototype,"loggedIn",2);F([c()],u.prototype,"username",2);F([c()],u.prototype,"profile",1);var se=Object.getOwnPropertyDescriptor,oe=(o,e,t,s)=>{for(var r=s>1?void 0:s?se(e,t):e,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=a(r)||r);return r};let b=class extends N{render(){return n`
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
    `}};b.styles=[B.styles,k.styles,d`
            .front-page-header {
                position: relative; /* Needed for absolute positioning inside */
                padding-right: 3rem; /* space so dropdown doesn't overlap content */
            }

            mu-dropdown {
                position: absolute;
                top: 0.5rem;
                right: 1rem;
            }
        `];b=oe([X("home-view")],b);var ie=Object.defineProperty,j=(o,e,t,s)=>{for(var r=void 0,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=a(e,t,r)||r);return r&&ie(e,t,r),r};const $=class $ extends N{constructor(){super(...arguments),this.mode="view"}connectedCallback(){super.connectedCallback(),this.storyPath&&this.loadStory()}updated(e){if(e.has("storyPath")&&this.loadStory(),this.story){const s={Romance:"hotpink",Drama:"darkslategray",LGBTQ:"mediumorchid",Fantasy:"rebeccapurple",SciFi:"deepskyblue",Mystery:"darkslateblue",Comedy:"goldenrod",Action:"firebrick",Adventure:"teal",Thriller:"indigo",Horror:"crimson"}[this.story.genre]||"steelblue";this.style.setProperty("--accent-color",s)}}async loadStory(){try{const e=await fetch(`/api/stories/${this.storyPath}`);if(!e.ok)throw new Error(`Failed to fetch story: ${e.statusText}`);this.story=await e.json()}catch(e){console.error(e),this.story=void 0}}render(){return this.story?n`
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
    `:n`<p>Loading story...</p>`}};$.uses={},$.styles=[d`
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
    `];let g=$;j([f({attribute:"storypath"})],g.prototype,"storyPath");j([f()],g.prototype,"mode");j([c()],g.prototype,"story");var ae=Object.defineProperty,x=(o,e,t,s)=>{for(var r=void 0,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=a(e,t,r)||r);return r&&ae(e,t,r),r};const z=class z extends N{constructor(){super(...arguments),this.chapterNumber=0}connectedCallback(){super.connectedCallback(),this.storyPath&&this.chapterNumber&&this.loadChapter()}updated(e){(e.has("storyPath")||e.has("chapterNumber"))&&this.loadChapter()}async loadChapter(){if(!(!this.storyPath||!this.chapterNumber))try{const e=await fetch(`/api/stories/${this.storyPath}`);if(!e.ok)throw new Error(`Failed to fetch story: ${e.statusText}`);this.story=await e.json(),this.story&&this.story.chapters?this.selectedChapter=this.story.chapters.find(t=>t.chapterNumber===this.chapterNumber):this.selectedChapter=void 0,this.selectedChapter||console.error(`Chapter ${this.chapterNumber} not found in story ${this.storyPath}`)}catch(e){console.error(e),this.story=void 0,this.selectedChapter=void 0}}render(){if(!this.selectedChapter)return n`<p>Loading chapter...</p>`;const e=this.selectedChapter;return n`
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
        `}};z.styles=d`
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
  `;let p=z;x([f({attribute:"storypath"})],p.prototype,"storyPath");x([f({type:Number,attribute:"chapternumber"})],p.prototype,"chapterNumber");x([c()],p.prototype,"story");x([c()],p.prototype,"selectedChapter");var ne=Object.defineProperty,le=Object.getOwnPropertyDescriptor,U=(o,e,t,s)=>{for(var r=s>1?void 0:s?le(e,t):e,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&ne(e,t,r),r};const M=class M extends O{get profile(){return this.model.profile}render(){const{username:e,profilePicture:t,color:s="ffffff"}=this.profile||{};return n`
      <main class="page">
          <nav>
              <button @click=${()=>{v.dispatch(this,"history/navigate",{href:"/app"})}}>
                  ← Back to Home
              </button>
          </nav>

          <section class="view">
        <img src=${t}/>
        <button id="edit"
                   @click=${()=>v.dispatch(this,"history/navigate",{href:`/app/profiles/${this.username}/edit`})}
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
                style="background: #${s}"></span>
            </slot>
            <slot name="color-name">#${s}</slot>
          </dd>
        </dl>
      </section>
      <mu-form class="edit" .init=${this.profile}>
      </main>
    `}constructor(){super("episode:model")}attributeChangedCallback(e,t,s){super.attributeChangedCallback(e,t,s),e==="username"&&t!==s&&s&&this.dispatchMessage(["profile/select",{username:s}])}firstUpdated(){this.username&&this.dispatchMessage(["profile/select",{username:this.username}])}};M.styles=[k.styles,d`
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
    `];let y=M;U([f()],y.prototype,"username",2);U([c()],y.prototype,"profile",1);var ce=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,L=(o,e,t,s)=>{for(var r=s>1?void 0:s?pe(e,t):e,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&ce(e,t,r),r};const P=class P extends O{constructor(){var e;super("episode:model"),this.image=(e=this.profile)==null?void 0:e.profilePicture}get profile(){return this.model.profile}render(){var t;if(!this.profile)return n`<p>Profile does not exist, please go back to the <a href="/app">homepage</a></p>`;const e=this.image||((t=this.profile)==null?void 0:t.profilePicture)||"/assets/default.jpg";return n`
        <main class="page">
            <mu-form
                .init=${this.profile}
                @mu-form:submit=${this.handleSubmit}>
                <label>
                    <span>Username</span>
                </label>
                <label>
                    <span>Featured Image</span>
                    <img src=${e} class="preview-pic" alt="Preview" />
                    <input
                            type="file"
                            @change=${this._handleFileSelected} />
                </label>
                <label>
                    <span>Color</span>
                    <input type="color" name="color" .value=${this.profile.color??"#000000"} />
                </label>
            </mu-form>
        </main>
    `}attributeChangedCallback(e,t,s){super.attributeChangedCallback(e,t,s),e==="username"&&t!==s&&s&&this.dispatchMessage(["profile/select",{username:s}])}handleSubmit(e){if(!this.username){console.error("Username is not set, cannot save profile.");return}const t={...e.detail,profilePicture:this.image};this.dispatchMessage(["profile/save",{username:this.username,profile:t,onSuccess:()=>{v.dispatch(this,"history/navigate",{href:`/app/profiles/${this.username}`})},onFailure:s=>console.log("ERROR:",s)}])}firstUpdated(){this.username&&this.dispatchMessage(["profile/select",{username:this.username}])}_handleFileSelected(e){const s=e.target.files[0];new Promise((i,a)=>{const h=new FileReader;h.onload=()=>i(h.result),h.onerror=_=>a(_),h.readAsArrayBuffer(s)}).then(i=>{const{name:a,size:h,type:_}=s,A=new URLSearchParams({filename:a}),D=new URL("/images",document.location.origin);D.search=A.toString(),console.log("Uploading file:",s),fetch(D,{method:"POST",headers:{"Content-Type":_,"Content-Length":h.toString()},body:i}).then(l=>{if(l.status===201)return l.json();throw l.status}).then(l=>{if(l)console.log("Image has been uploaded to",l.url),this.image=l.url;else throw"No JSON response"}).catch(l=>{console.log("Upload failed",l)})})}};P.uses=S({"mu-form":J.Element}),P.styles=[k.styles,d`
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
    `];let m=P;L([f()],m.prototype,"username",2);L([c()],m.prototype,"profile",1);L([c()],m.prototype,"image",2);const de=[{auth:"protected",path:"/app/stories/:storyPath/chapters/:chapterNumber",view:o=>n`
            <chapter-view
                    storyPath=${o.storyPath}
                    chapterNumber=${o.chapterNumber}>
            </chapter-view>
        `},{path:"/app/stories/:storyPath",view:o=>n`
      <story-view storyPath=${o.storyPath}></story-view>
    `},{auth:"protected",path:"/app/profiles/:username/edit",view:o=>n`
    <reader-edit username=${o.username}></reader-edit>`},{auth:"protected",path:"/app/profiles/:username",view:o=>n`
      <reader-view
        username=${o.username}></reader-view>
    `},{path:"/app",view:()=>n`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];S({"mu-auth":C.Provider,"mu-history":v.Provider,"mu-switch":class extends q.Element{constructor(){super(de,"episode:history","episode:auth")}},"mu-store":class extends G.Provider{constructor(){super(E,Y,"episode:auth")}},"episode-header":u,"home-view":b,"story-view":g,"chapter-view":p,"reader-view":y,"reader-edit":m});
