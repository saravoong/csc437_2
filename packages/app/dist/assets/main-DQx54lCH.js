import{a as x,i as c,V as $,O as V,d as D,b as ee,x as n,r as g,e as K,c as l,f as F,n as d,h as M,g as W,s as te,_ as re}from"./reset.css-BPlqXxCa.js";import{p as Y,t as X}from"./tokens.css-B8I_IFMe.js";const oe={};function ae(r,e,t){switch(r[0]){case"profile/save":ie(r[1],t).then(a=>e(s=>({...s,profile:a}))).then(()=>{const{onSuccess:a}=r[1];a&&a()}).catch(a=>{const{onFailure:s}=r[1];s&&s(a)});break;case"profile/select":H(r[1],t).then(a=>e(s=>({...s,profile:a})));break;case"story/save":se(r[1],t).then(a=>e(s=>({...s,story:a}))).then(()=>{const{onSuccess:a}=r[1];a&&a()}).catch(a=>{const{onFailure:s}=r[1];s&&s(a)});break;case"chapter/comment/add":const i=r[1];H({username:t.username},t).then(a=>{if(!a)throw new Error("Failed to load user profile");return ne(i,t).then(s=>({updatedChapter:s,profile:a}))}).then(({updatedChapter:a,profile:s})=>e(b=>{var h,q;return{...b,profile:s,Story:{...b.story,chapters:((q=(h=b.story)==null?void 0:h.chapters)==null?void 0:q.map(Q=>Q.chapterNumber===a.chapterNumber?a:Q))??[]}}})).then(()=>{const{onSuccess:a}=i;a&&a()}).catch(a=>{const{onFailure:s}=i;s&&s(a)});break;case"story/review/add":le(r[1],t).then(a=>e(s=>({...s,story:a}))).then(()=>{const{onSuccess:a}=r[1];a&&a()}).catch(a=>{const{onFailure:s}=r[1];s&&s(a)});break;default:const o=r[0];throw new Error(`Unhandled message "${o}"`)}}function H(r,e){return fetch(`/api/profiles/${r.username}`,{headers:x.headers(e)}).then(async t=>{if(!t.ok){console.warn(`Profile fetch failed with status ${t.status}`);return}const i=await t.text();if(!i){console.warn(`Empty response for user ${r.username}`);return}try{return JSON.parse(i)}catch{console.error(`Failed to parse JSON for ${r.username}:`,i);return}})}function ie(r,e){return fetch(`/api/profiles/${r.username}`,{method:"PUT",headers:{"Content-Type":"application/json",...x.headers(e)},body:JSON.stringify(r.profile)}).then(t=>{if(t.status===200)return t.json();throw new Error(`Failed to save profile for ${r.username}`)}).then(t=>{if(t)return t})}function se(r,e){return console.log("Sending story to backend:",r.story),fetch("/api/stories",{method:"POST",headers:{"Content-Type":"application/json",...x.headers(e)},body:JSON.stringify(r.story)}).then(t=>{if(t.status===200)return t.json();throw new Error(`Failed to save profile for ${r.story}`)}).then(t=>{if(t)return t})}function ne(r,e){return fetch(`/api/stories/${r.storyPath}/chapters/${r.chapterNumber}/comments`,{method:"POST",headers:{"Content-Type":"application/json",...x.headers(e)},body:JSON.stringify({comment:r.comment})}).then(t=>{if(t.ok)return t.json();throw new Error("Failed to add comment")})}function le(r,e){return fetch(`/api/stories/${r.storyPath}/reviews`,{method:"POST",headers:{"Content-Type":"application/json",...x.headers(e)},body:JSON.stringify(r.review)}).then(t=>{if(t.ok)return t.json();throw new Error("Failed to add review")})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)},ce=c`
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
`,L={styles:ce};var de=Object.defineProperty,he=Object.getOwnPropertyDescriptor,B=(r,e,t,i)=>{for(var o=i>1?void 0:i?he(e,t):e,a=r.length-1,s;a>=0;a--)(s=r[a])&&(o=(i?s(e,t,o):s(o))||o);return i&&o&&de(e,t,o),o};function pe(r){const t=r.target.checked;K.relay(r,"dark-mode",{checked:t})}const T=class T extends ${constructor(){super("episode:model"),this.loggedIn=!1,this.username="episodian",this._authObserver=new V(this,"episode:auth")}get profile(){return this.model.profile}render(){var o,a;const e=this.username||"episodian",t=((o=this.profile)==null?void 0:o.profilePicture)||"/assets/defaultpfp.png",i=((a=this.profile)==null?void 0:a.color)||"#ccc";return n`
            <header class="front-page-header">
                <div class="left-group">
                    <img src="/assets/logo.png" alt="Episode Logo" class="logo" />
                    <nav class="nav-links">
                        <a href="/app">Home</a>
                        <a href="/app/stories">All Stories</a>
                        <a
                                @click=${()=>{this.loggedIn&&this.username?location.assign(`/app/profiles/${this.username}`):location.assign("/login.html")}}
                                style="cursor: pointer;">
                            My Profile
                        </a>
                        
                        <a href="/about">About</a>
                    </nav>
                </div>
                <div class="right-group">
                    <span class="greeting-text">hey, ${e}!</span>
                    <mu-dropdown>
                        <img
                                slot="actuator"
                                src=${t}
                                alt="Profile Picture"
                                class="profile-pic"
                                style="border: 2px solid ${i}"
                        />
                        <menu>
                            <li>
                                <label class="dark-toggle">
                                    <input type="checkbox" @change=${pe} />
                                    Dark Mode
                                </label>
                            </li>
                            <li>
                                ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
                            </li>
                        </menu>
                    </mu-dropdown>
                </div>
            </header>
        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&e.authenticated?(this.loggedIn=!0,this.username=e.username,this.dispatchMessage(["profile/select",{username:this.username}])):(this.loggedIn=!1,this.username=void 0)})}static initializeOnce(){function e(t,i){t.classList.toggle("dark-mode",i)}document.body.addEventListener("dark-mode",t=>{var i;return e(t.currentTarget,(i=t.detail)==null?void 0:i.checked)})}renderSignOutButton(){return n`
            <button
                    @click=${e=>{K.relay(e,"auth:message",["auth/signout"])}}
            >
                Sign Out
            </button>
        `}renderSignInButton(){return n`
            <button @click=${()=>{window.location.href="/login.html"}}>
                Sign In
            </button>
        `}};T.uses=D({"mu-dropdown":ee.Element}),T.styles=[g.styles,Y.styles,X.styles,L.styles,c`
            .front-page-header {
                background-color: white;
                display: flex;
                align-items: center;
                justify-content: space-between; /* space between left and right groups */
                padding: 0.5rem 1.5rem;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                border-bottom: 3px solid #f792c8;
                position: relative;
                z-index: 10;
                font-family: "Comfortaa", sans-serif;
            }

            .logo {
                height: 70px;
            }

            mu-dropdown {
                position: relative;
            }

            .profile-pic {
                width: 70px;
                height: 70px;
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
                padding: 0.75rem 1rem;
                background-color: white;
                border: 1px solid #ccc;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                min-width: 180px;
                position: absolute;
                top: 100%;
                right: 0;
                z-index: 100;
            }

            .dark-toggle {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
            }
            
            .nav-links {
                display: flex;
                gap: 1.25rem;
                align-items: center;
                font-weight: 500;
                margin-left: 1rem;
                font-family: "Comfortaa", sans-serif;
            }

            .nav-links a {
                text-decoration: none;
                color: #1a1a40;
                font-size: 1rem;
                transition: color 0.2s ease;
            }

            .nav-links a:hover {
                color: #f792c8;
                font-weight: bold;
            }

            .left-group {
                display: flex;
                align-items: center;
                gap: 1.5rem; 
            }

            .right-group {
                display: flex;
                align-items: center;
                gap: 0.8rem; 
            }
            
            a {
                font-family: "Comfortaa", sans-serif;
            }

            .greeting-text {
                color: #1a1a40;
                white-space: nowrap;
                font-size: 1rem;
                font-weight: bold;
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
        `];let y=T;B([l()],y.prototype,"loggedIn",2);B([l()],y.prototype,"username",2);B([l()],y.prototype,"profile",1);var me=Object.getOwnPropertyDescriptor,ue=(r,e,t,i)=>{for(var o=i>1?void 0:i?me(e,t):e,a=r.length-1,s;a>=0;a--)(s=r[a])&&(o=s(o)||o);return o};let _=class extends F{render(){return n`
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

    `}};_.styles=[L.styles,g.styles,c`
            .front-page-header {
                position: relative; /* Needed for absolute positioning inside */
                padding-right: 3rem; /* space so dropdown doesn't overlap content */
            }

            mu-dropdown {
                position: absolute;
                top: 0.5rem;
                right: 1rem;
            }
        `];_=ue([A("home-view")],_);var fe=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,C=(r,e,t,i)=>{for(var o=i>1?void 0:i?ge(e,t):e,a=r.length-1,s;a>=0;a--)(s=r[a])&&(o=(i?s(e,t,o):s(o))||o);return i&&o&&fe(e,t,o),o};const G=class G extends ${constructor(){super("episode:model"),this.storyPath="",this.reviews=[],this.newComment="",this.errorMessage="",this.username="Testing for now"}get profile(){return this.model.profile}connectedCallback(){super.connectedCallback(),this.loadReviews()}updated(e){e.has("storyPath")&&this.loadReviews()}async loadReviews(){if(!this.storyPath){this.reviews=[];return}try{const e=await fetch(`/api/stories/${this.storyPath}/reviews`);if(!e.ok)throw new Error("Failed to load reviews");this.reviews=await e.json(),this.errorMessage=""}catch(e){this.errorMessage=e.message}}handleSubmit(){var o;if(!this.newComment.trim())return;this.errorMessage="";const t={username:((o=this.profile)==null?void 0:o.username)||"Anonymous",rating:1,comment:this.newComment.trim(),date:new Date},i=t.date instanceof Date?t.date.toISOString():t.date;this.dispatchMessage(["story/review/add",{storyPath:this.storyPath,review:{...t,date:i}}]),this.reviews=[t,...this.reviews],this.newComment=""}render(){return n`
      <section>
        <h3>Reviews</h3>
        <textarea
          .value=${this.newComment}
          @input=${e=>this.newComment=e.target.value}
        ></textarea>
        <button
          @click=${this.handleSubmit}
          ?disabled=${!this.newComment.trim()}
        >
          Submit Review
        </button>
        ${this.errorMessage?n`<p class="error">${this.errorMessage}</p>`:""}
        ${this.reviews.length?n`<ul>
              ${this.reviews.map(e=>n`<li>
                  <span class="review-username">${e.username}</span>
                    <span class="review-date">
                      ${e.date?new Date(e.date).toLocaleDateString():"No date"}
                    </span>
                    <div>${e.comment}</div>
                </li>`)}
            </ul>`:n`<p>No reviews yet. Be the first to add one!</p>`}
      </section>
    `}};G.styles=[g.styles,c`
      :host {
        display: block;
        max-width: 600px;
        font-family: "Comfortaa", sans-serif;
        margin: 1rem auto;
        background: white;
        padding: 1.5rem;
        border-radius: 1rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
      h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-weight: 700;
        color: #2a2a55ff;
      }
      textarea {
        width: 100%;
        min-height: 4rem;
        font-family: "Comfortaa", cursive;
        font-size: 1rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #ccc;
        resize: vertical;
        box-sizing: border-box;
        margin-bottom: 0.5rem;
      }
      button {
        background-color: #2a2a55ff;
        color: white;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        font-weight: 600;
        cursor: pointer;
      }
      button:disabled {
        background-color: #999;
        cursor: not-allowed;
      }
      .error {
        color: crimson;
        margin-top: 0.5rem;
        font-weight: 600;
      }
      ul {
        padding-left: 1rem;
        margin-top: 1rem;
        max-height: 300px;
        overflow-y: auto;
      }
      li {
        border-bottom: 1px solid #eee;
        padding: 0.5rem 0;
      }
      .review-username {
        font-weight: 700;
        color: #1a1a40ff;
      }
      .review-date {
        font-size: 0.75rem;
        color: #888;
        margin-left: 0.5rem;
      }
    `];let p=G;C([l()],p.prototype,"profile",1);C([d({type:String})],p.prototype,"storyPath",2);C([l()],p.prototype,"reviews",2);C([l()],p.prototype,"newComment",2);C([l()],p.prototype,"errorMessage",2);C([d({type:String})],p.prototype,"username",2);var be=Object.defineProperty,R=(r,e,t,i)=>{for(var o=void 0,a=r.length-1,s;a>=0;a--)(s=r[a])&&(o=s(e,t,o)||o);return o&&be(e,t,o),o};const U=class U extends ${constructor(){super(...arguments),this.mode="view"}connectedCallback(){super.connectedCallback(),this.storyPath&&this.loadStory()}updated(e){var t;if(e.has("storyPath")&&this.loadStory(),this.story){const i={Romance:"hotpink",Drama:"darkslategray",LGBTQ:"mediumorchid",Fantasy:"rebeccapurple",SciFi:"deepskyblue",Mystery:"darkslateblue",Comedy:"goldenrod",Action:"firebrick",Adventure:"teal",Thriller:"indigo",Horror:"crimson"},o=((t=this.story.genre)==null?void 0:t.replace(/\+/g,""))||"",a=i[o]||"steelblue";this.style.setProperty("--accent-color",a)}}async loadStory(){try{const e=await fetch(`/api/stories/${this.storyPath}`);if(!e.ok)throw new Error(`Failed to fetch story: ${e.statusText}`);this.story=await e.json()}catch(e){console.error(e),this.story=void 0}}async handleAddChapter(){if(!this.story||!this.storyPath)return;const t=Math.max(0,...this.story.chapters.map(a=>a.chapterNumber||0))+1,i={chapterNumber:t,title:`Chapter ${t}`,summary:"",comments:[],href:`./chapters/${t}.html`,storyTitle:this.story.storyTitle},o={...this.story,chapterCount:t,chapters:[...this.story.chapters,i]};try{const a=await fetch(`/api/stories/${this.storyPath}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!a.ok)throw new Error("Failed to update story with new chapter");this.story=await a.json()}catch(a){console.error("Error adding chapter:",a)}}render(){return this.story?n`
            <episode-header></episode-header>
            <h1 style="padding: 2rem 0 1rem; color: #1a1a40;">${this.story.storyTitle}</h1>
            <section>
                <div class="page-layout">
                    <div class="left-column">
                        <section>
                            <img src="${this.story["img-src"]}" alt="Story Cover" />
                            <p><strong>Author:</strong> ${this.story.authorName}</p>
                            <p><strong>Genre:</strong> ${this.story.genre}</p>
                            <p><strong>Chapters:</strong> ${this.story.chapterCount}</p>
                            <p><strong>Community or Official:</strong> ${this.story.communityOrOfficial}</p>
                            <p>
                                <a href="${this.story.storyLink}" target="_blank" rel="noopener noreferrer"
                                >Read Now</a
                                >
                            </p>
                        </section>

                        <hr />

                        <section>
                            <h3>Synopsis</h3>
                            <p>${this.story.synopsis}</p>
                        </section>
                        
                    </div>

                    <div class="right-column">
                        <section>
                    <h3>Reviews</h3>
                            
                </section>

                        <section>
                            <h3>Chapters</h3>
                            <button @click=${this.handleAddChapter}>Add Chapter + </button>
                            <ul>
                                ${this.story.chapters.map(e=>n`
                                            <li>
                                                <a href="/app/stories/${this.storyPath}/chapters/${e.chapterNumber}">
                                                    ${e.title}
                                                </a>
                                            </li>
                                        `)}
                            </ul>
                        </section>
                    </div>
                </div>
                <reviews-view .storyPath=${this.storyPath}></reviews-view>
            </section>
        `:n`<p>Loading story...</p>`}};U.styles=[g.styles,c`
            :host {
                display: block;
                min-height: 100vh;
                background-color: #f5f7fa;
            }
            
            .page-layout {
                display: flex;
                gap: 2rem;
                flex-wrap: wrap;
                justify-content: space-between;
            }

            .left-column,
            .right-column {
                background: white;
                border-radius: 0.75rem;
                box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
                padding: 1.5rem 2rem;
                flex: 1 1 300px;
                min-width: 300px;
            }

            img {
                width: 70%;
                height: auto;
                border-radius: 0.75rem;
                margin-bottom: 1rem;
                box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
                object-fit: cover;
            }

            p {
                margin: 0.25rem 0 1rem;
                font-size: 1rem;
                color: #444c6b;
            }

            strong {
                color: #1a1a40;
            }

            a {
                color: var(--accent-color, steelblue);
                font-weight: 600;
                text-decoration: none;
                transition: color 0.3s ease;
            }

            a:hover,
            a:focus {
                text-decoration: underline;
                color: darken(var(--accent-color, steelblue), 15%);
            }

            ul {
                list-style: disc inside;
                margin: 0.5rem 0 1rem;
                padding-left: 1rem;
                color: #3a3a4a;
            }

            li {
                margin-bottom: 0.5rem;
                font-weight: 500;
            }

            hr {
                border: none;
                border-top: 1px solid #e0e0e0;
                margin: 2rem 0;
            }

            section h3 {
                margin-top: 0;
                margin-bottom: 1rem;
                font-weight: 700;
                color: var(--accent-color, steelblue);
                font-size: 1.25rem;
            }

            h1, h3 {
                font-family: 'Comfortaa', cursive;
            }

            p, a {
                font-family: 'Baloo 2', cursive;
            }

            button {
                margin-top: 1rem;
                padding: 0.5rem 1rem;
                font-family: 'Comfortaa', cursive;
                font-size: 1rem;
                font-weight: 600;
                background-color: var(--accent-color, steelblue);
                color: white;
                border: none;
                border-radius: 0.5rem;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            button:hover {
                background-color: #3a3a4a;
            }

            .add-review {
                margin-top: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .add-review input,
            .add-review select,
            .add-review textarea {
                padding: 0.5rem;
                font-family: "Baloo 2", cursive;
                font-size: 1rem;
                border-radius: 0.5rem;
                border: 1px solid #ccc;
                box-sizing: border-box;
                width: 100%;
            }

            .add-review textarea {
                resize: vertical;
                min-height: 4rem;
            }

            .add-review button {
                align-self: flex-start;
            }

            .error {
                color: crimson;
                font-weight: 600;
            }


        `];let v=U;R([d({attribute:"storypath"})],v.prototype,"storyPath");R([d()],v.prototype,"mode");R([l()],v.prototype,"story");var ye=Object.defineProperty,k=(r,e,t,i)=>{for(var o=void 0,a=r.length-1,s;a>=0;a--)(s=r[a])&&(o=s(e,t,o)||o);return o&&ye(e,t,o),o};const E=class E extends F{constructor(){super(...arguments),this.chapterNumber=0,this.newComment="",this.errorMessage=""}connectedCallback(){super.connectedCallback(),this.storyPath&&this.chapterNumber&&this.loadChapter()}updated(e){(e.has("storyPath")||e.has("chapterNumber"))&&this.loadChapter()}async loadChapter(){if(!(!this.storyPath||!this.chapterNumber))try{const e=await fetch(`/api/stories/${this.storyPath}`);if(!e.ok)throw new Error(`Failed to fetch story: ${e.statusText}`);this.story=await e.json(),this.story&&this.story.chapters?this.selectedChapter=this.story.chapters.find(t=>t.chapterNumber===this.chapterNumber):this.selectedChapter=void 0,this.selectedChapter||console.error(`Chapter ${this.chapterNumber} not found in story ${this.storyPath}`)}catch(e){console.error(e),this.story=void 0,this.selectedChapter=void 0}}async handleAddComment(){if(!(!this.storyPath||!this.chapterNumber||!this.newComment.trim())){this.errorMessage="";try{const e=await fetch(`/api/stories/${this.storyPath}/chapters/${this.chapterNumber}/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({comment:this.newComment.trim()})});if(!e.ok){const i=await e.text();throw new Error(i||"Failed to submit comment")}const t=await e.json();this.selectedChapter=t,this.newComment=""}catch(e){this.errorMessage=e instanceof Error?e.message:"Unknown error"}}}render(){if(!this.selectedChapter)return n`<p>Loading chapter...</p>`;const e=this.selectedChapter;return n`
            <section class="chapter-container">
                <header>
                    <a href="/app/stories/${this.storyPath}">&larr; Back to Story</a>
                    <h1>Chapter ${e.chapterNumber} — ${e.storyTitle??"Untitled"}</h1>
                </header>

                <section class="summary">
                    <h3>Summary</h3>
                    <p>${e.summary??"No summary available."}</p>
                </section>
                
                <section class="add-comment">
                  <h3>Add a Comment</h3>
                  <textarea
                    .value=${this.newComment}
                    @input=${t=>this.newComment=t.target.value}
                    placeholder="Write your comment here..."
                    rows="4"
                  ></textarea>
                  <button @click=${this.handleAddComment} ?disabled=${!this.newComment.trim()}>
                    Submit
                  </button>
                  ${this.errorMessage?n`<p class="error">${this.errorMessage}</p>`:""}
                </section>

                <section class="comments">
                    <h3>Comments</h3>
                    ${e.comments&&e.comments.length>0?e.comments.map(t=>n`<p>${t}</p>`):n`<p>No comments yet.</p>`}
                </section>
            </section>
        `}};E.styles=c`
        .chapter-container {
            max-width: 800px;
            margin: 2rem auto;
            background: white;
            border-radius: 0.75rem;
            box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
            padding: 2rem 3rem;
            color: #444c6b;
            font-family: "Baloo 2", cursive;
        }

        header a {
            display: inline-block;
            margin-bottom: 1rem;
            color: var(--accent-color, steelblue);
            font-weight: 600;
            text-decoration: none;
            font-family: "Comfortaa", cursive;
            font-size: 1rem;
            transition: color 0.3s ease;
        }
        header a:hover,
        header a:focus {
            text-decoration: underline;
            color: darken(var(--accent-color, steelblue), 15%);
        }

        header h1 {
            font-family: "Comfortaa", cursive;
            font-weight: 700;
            font-size: 2.25rem;
            margin: 0 0 2rem 0;
            color: var(--accent-color, steelblue);
        }

        section h3 {
            font-family: "Comfortaa", cursive;
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--accent-color, steelblue);
            margin-bottom: 1rem;
        }

        p {
            font-size: 1.125rem;
            line-height: 1.5;
            margin-bottom: 1rem;
            color: #444c6b;
            font-family: "Baloo 2", cursive;
        }

        .add-comment textarea {
            width: 100%;
            font-family: "Baloo 2", cursive;
            font-size: 1rem;
            padding: 0.5rem;
            border-radius: 0.5rem;
            border: 1px solid #ccc;
            resize: vertical;
            margin-bottom: 0.75rem;
            box-sizing: border-box;
        }

        .add-comment button {
            background-color: var(--accent-color, steelblue);
            color: white;
            border: none;
            padding: 0.5em 1.2em;
            cursor: pointer;
            border-radius: 0.5rem;
            font-weight: 600;
            font-family: "Comfortaa", cursive;
            font-size: 1rem;
        }

        .add-comment button:disabled {
            background-color: #a0a8b9;
            cursor: not-allowed;
        }

        .add-comment .error {
            color: crimson;
            font-weight: 600;
            margin-top: 0.5rem;
        }

    `;let m=E;k([d({attribute:"storypath"})],m.prototype,"storyPath");k([d({type:Number,attribute:"chapternumber"})],m.prototype,"chapterNumber");k([l()],m.prototype,"story");k([l()],m.prototype,"selectedChapter");k([l()],m.prototype,"newComment");k([l()],m.prototype,"errorMessage");var ve=Object.defineProperty,we=Object.getOwnPropertyDescriptor,Z=(r,e,t,i)=>{for(var o=i>1?void 0:i?we(e,t):e,a=r.length-1,s;a>=0;a--)(s=r[a])&&(o=(i?s(e,t,o):s(o))||o);return i&&o&&ve(e,t,o),o};const J=class J extends ${get profile(){return this.model.profile}render(){const{username:e,profilePicture:t,color:i="ffffff"}=this.profile||{};return n`
            <episode-header></episode-header>
            <section>
      <main class="card">
          <section class="profile-view">
        <img src=${t}/>
              <dt>Username</dt>
              <dd>${e||"N/A"}</dd>
              <dt>Favorite Color</dt>
              <dd>
              <span
                      class="swatch"
                      style="background: ${i}"></span>
                  </slot>
                  <slot name="color-name">${i}</slot>
              </dd>
              
        <button id="edit"
                   @click=${()=>M.dispatch(this,"history/navigate",{href:`/app/profiles/${this.username}/edit`})}
        >Edit Profile
        </button>
      </section>
      
      </main>
            </section>
    `}constructor(){super("episode:model")}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e==="username"&&t!==i&&i&&this.dispatchMessage(["profile/select",{username:i}])}firstUpdated(){this.username&&this.dispatchMessage(["profile/select",{username:this.username}])}};J.styles=[g.styles,c`
            :host {
                display: flex;
                flex-direction: column;
                height: 100vh;
                font-family: "Comfortaa", sans-serif;
                background-color: #eeeef6ff;
            }

            episode-header {
                flex: 0 0 auto; 
            }

            section {
                flex: 1 1 auto; 
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;   
            }

            .card {
                background: white;
                padding: 2.5rem;
                border-radius: 1rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                max-width: 400px;
                width: 100%;
                box-sizing: border-box;
                text-align: center;
            }

            nav {
                margin-bottom: 1rem;
                text-align: left;
            }

            button {
                cursor: pointer;
                background: none;
                border: none;
                color: #1a1a40ff;
                font-weight: 600;
                font-size: 1rem;
                padding: 0;
                margin-bottom: 1rem;
            }

            .profile-view img.avatar {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                object-fit: cover;
                margin-bottom: 1rem;
            }

            h1 {
                margin-top: 0;
                margin-bottom: 1rem;
                font-weight: 700;
                font-size: 1.75rem;
            }

            dl {
                text-align: left;
                margin: 0 auto 1.5rem;
                max-width: 260px;
            }

            dt {
                font-weight: 600;
                color: #2a2a55ff;
            }

            dd {
                margin: 0 0 1rem 0;
            }

            .swatch {
                display: inline-block;
                width: 1.5em;
                height: 1.5em;
                border-radius: 0.25rem;
                vertical-align: middle;
                margin-right: 0.5em;
                border: 1px solid #ccc;
            }

            #edit {
                background-color: #2a2a55ff;
                color: white;
                border-radius: 0.5rem;
                padding: 0.6rem 1.2rem;
                font-weight: 600;
                border: none;
                transition: background-color 0.2s ease;
            }

            #edit:hover {
                background-color: #1a1a40ff;
            }
    `];let S=J;Z([d()],S.prototype,"username",2);Z([l()],S.prototype,"profile",1);var xe=Object.defineProperty,$e=Object.getOwnPropertyDescriptor,I=(r,e,t,i)=>{for(var o=i>1?void 0:i?$e(e,t):e,a=r.length-1,s;a>=0;a--)(s=r[a])&&(o=(i?s(e,t,o):s(o))||o);return i&&o&&xe(e,t,o),o};const N=class N extends ${constructor(){var e;super("episode:model"),this.image=(e=this.profile)==null?void 0:e.profilePicture}get profile(){return this.model.profile}render(){if(!this.profile)return n`
                <p>Profile does not exist. Please go back to the <a href="/app">homepage</a>.</p>
            `;const e=this.image||this.profile.profilePicture||"/assets/default.jpg";return n`
            <episode-header></episode-header>
            <section>
                <main class="card">
                    <mu-form
                            .init=${this.profile}
                            @mu-form:submit=${this.handleSubmit}>

                        <label>
                            <span>Profile Picture</span>
                            <img src=${e} class="preview-pic" alt="Preview" />
                            <input type="file" @change=${this._handleFileSelected} />
                        </label>

                        <label>
                            <span>Favorite Color</span>
                            <input type="color" name="color" .value=${this.profile.color??"#000000"} />
                        </label>
                    </mu-form>
                </main>
            </section>
        `}handleSubmit(e){if(!this.username)return;const t={...e.detail,profilePicture:this.image};this.dispatchMessage(["profile/save",{username:this.username,profile:t,onSuccess:()=>{M.dispatch(this,"history/navigate",{href:`/app/profiles/${this.username}`})},onFailure:i=>console.log("ERROR:",i)}])}_handleFileSelected(e){var a;const i=(a=e.target.files)==null?void 0:a[0];if(!i)return;const o=new FileReader;o.onload=()=>{const s=o.result,b=new URL("/images",document.location.origin);b.searchParams.set("filename",i.name),fetch(b.toString(),{method:"POST",headers:{"Content-Type":i.type,"Content-Length":i.size.toString()},body:s}).then(h=>h.status===201?h.json():Promise.reject(h.status)).then(h=>{this.image=h.url}).catch(h=>console.log("Upload failed",h))},o.onerror=s=>console.log("File reading error",s),o.readAsArrayBuffer(i)}};N.uses=D({"mu-form":W.Element}),N.styles=[g.styles,c`
        :host {
            display: flex;
            flex-direction: column;
            height: 100vh;
            font-family: "Comfortaa", sans-serif;
            background-color: #eeeef6ff;
        }

        episode-header {
            flex: 0 0 auto;
        }

        section {
            flex: 1 1 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
        }

        .card {
            background: white;
            padding: 2.5rem;
            border-radius: 1rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
            box-sizing: border-box;

            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        mu-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            gap: 1.5rem;
        }

        label {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-weight: 600;
            color: #2a2a55ff;
            width: 100%;
        }

        .preview-pic {
            width: 100%;
            max-width: 200px;
            border-radius: 0.5rem;
            margin: 1rem 0;
            object-fit: cover;
        }

        input[type="file"],
        input[type="color"] {
            margin-top: 0.5rem;
        }

        input[type="color"] {
            width: 60px;
            height: 34px;
            border: none;
            padding: 0;
        }

        button {
            background-color: #2a2a55ff;
            color: white;
            border-radius: 0.5rem;
            padding: 0.6rem 1.2rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s ease;
            margin-top: 1rem;
        }

        button:hover {
            background-color: #1a1a40ff;
        }

            .submit-wrapper {
                display: flex;
                justify-content: center;
            }

            .custom-submit {
                background-color: #2a2a55ff;
                color: white;
                border-radius: 0.5rem;
                padding: 0.6rem 1.5rem;
                font-weight: 600;
                border: none;
                cursor: pointer;
                transition: background-color 0.2s ease;
                font-size: 1rem;
            }

            .custom-submit:hover {
                background-color: #1a1a40ff;
            }
    `];let w=N;I([d()],w.prototype,"username",2);I([l()],w.prototype,"profile",1);I([l()],w.prototype,"image",2);var Ce=Object.defineProperty,ke=Object.getOwnPropertyDescriptor,P=(r,e,t,i)=>{for(var o=i>1?void 0:i?ke(e,t):e,a=r.length-1,s;a>=0;a--)(s=r[a])&&(o=(i?s(e,t,o):s(o))||o);return i&&o&&Ce(e,t,o),o};let u=class extends F{constructor(){super(...arguments),this.stories=[],this.loading=!0,this.error=null,this.searchTerm="",this.selectedGenre=""}connectedCallback(){super.connectedCallback(),this.loadStories()}async loadStories(){try{this.loading=!0,this.error=null;const r=await fetch("/api/stories");if(!r.ok)throw new Error(`Failed to fetch stories: ${r.statusText}`);const e=await r.json();this.stories=e}catch(r){this.error=r.message||"Unknown error"}finally{this.loading=!1}}get filteredStories(){return this.stories.filter(r=>{const e=r.storyTitle.toLowerCase().includes(this.searchTerm)||r.authorName.toLowerCase().includes(this.searchTerm),t=!this.selectedGenre||r.genre===this.selectedGenre;return e&&t})}addStory(){window.location.href="/app/stories/add"}render(){return n`
            <episode-header></episode-header>
            <section class="filters">
                <input
                        type="text"
                        placeholder="Search by title or author"
                        @input=${r=>this.searchTerm=r.target.value.toLowerCase()}
                />
                <select @change=${r=>this.selectedGenre=r.target.value}>
                    <option value="">All Genres</option>
                    ${["Romance","Drama","LGBTQ","Fantasy","SciFi","Mystery","Comedy","Action","Adventure","Thriller","Horror"].map(r=>n`<option value=${r}>${r}</option>`)}
                </select>
                <button @click=${this.addStory}>Add Story +</button>
            </section>
            <main class="story-list">
                ${this.filteredStories.map(r=>n`
                            <article class="story-card">
                                <a href="/app/stories/${r.storyPath}">
                                    <img src=${r["img-src"]||"/assets/defaultstorycover.png"}
                                         alt=${r.storyTitle} 
                                    />
                                    <h2>${r.storyTitle}</h2>
                                </a>
                            </article>
                        `)}
            </main>
        `}};u.styles=[L.styles,g.styles,Y.styles,X.styles,c`
            :host {
                display: block;
                min-height: 100vh;
                background-color: #eeeef6ff;
            }
            
            .story-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 2rem;
                justify-content: center;
                padding: 2rem;
            }

            .story-list {
                display: flex;
                flex-wrap: wrap;
                gap: 2rem;
                padding: 1rem;
                justify-content: center;
            }

            .story-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                width: 210px;
                padding: 1rem;
                background-color: white;
                border-radius: 15px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                border: 2px solid transparent; 
                transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
            }
            
            .story-card:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
                border: 2px solid #ff987a; 
            }

            .story-card img {
                width: 180px;
                height: auto;
                border-radius: 1.8rem;
                object-fit: cover;
            }

            .story-card h2 {
                font-family: "Comfortaa", sans-serif;
                font-weight: bold;
                margin: 0.5rem 0 1rem 0;
                color: #1a1a40;
            }

            .story-card a {
                margin-top: 0.5rem;
                font-size: 0.8rem;
                color: #1a1a40;
                text-decoration: none;
                transition: color 0.3s ease;
            }

            .story-card a:hover {
                color: #f792c8;
                text-decoration: none;
            }
            .filters {
                display: flex;
                gap: 1rem;
                padding: 1.5rem 2rem 0;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
            }

            .filters input,
            .filters select {
                padding: 0.65rem 1rem;
                font-size: 1rem;
                border-radius: 8px;
                border: 1px solid #ccc;
                font-family: "Comfortaa", sans-serif;
                width: 250px; 
            }

            .filters input::placeholder {
                color: #999;
            }
            
            .filters select {
                background-color: #fff;
            }

            .filters button {
                padding: 0.65rem 1.2rem;
                font-size: 1rem;
                font-weight: 600;
                color: white;
                background-color: #f7923c;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-family: "Comfortaa", sans-serif;
                transition: background-color 0.3s ease;
            }

            .filters button:hover {
                background-color: #e06a00;
            }
        `];P([l()],u.prototype,"stories",2);P([l()],u.prototype,"loading",2);P([l()],u.prototype,"error",2);P([l()],u.prototype,"searchTerm",2);P([l()],u.prototype,"selectedGenre",2);u=P([A("all-story-view")],u);var Pe=Object.getOwnPropertyDescriptor,Se=(r,e,t,i)=>{for(var o=i>1?void 0:i?Pe(e,t):e,a=r.length-1,s;a>=0;a--)(s=r[a])&&(o=s(o)||o);return o};let j=class extends F{render(){return n`
      <episode-header></episode-header>
      <main>
          <add-story-form api="/api/stories"></add-story-form>
      </main>
    `}};j.styles=c`
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

  `;j=Se([A("add-story-view")],j);var Oe=Object.defineProperty,O=(r,e,t,i)=>{for(var o=void 0,a=r.length-1,s;a>=0;a--)(s=r[a])&&(o=s(e,t,o)||o);return o&&Oe(e,t,o),o};const z=class z extends ${constructor(){super(...arguments),this.formData={},this.redirect="/",this.buttonLabel="Add Story"}generateStoryPath(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"_")}get canSubmit(){const e=this.formData;return!!(this.api&&e.storyTitle&&e.authorName&&e.communityOrOfficial)}handleChange(e){const t=e.target,i=t.name;let o=t.value;i==="chapterCount"&&(o=parseInt(o,10),isNaN(o)&&(o=0)),this.formData={...this.formData,[i]:o}}handleSubmit(e){if(e.preventDefault(),!this.canSubmit){this.error="Please fill in all required fields.";return}const t={...this.formData,storyPath:this.generateStoryPath(this.formData.storyTitle||"")};fetch(this.api||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(i=>{if(i.status!==200&&i.status!==201)throw new Error("Failed to add story");return i.json()}).then(i=>{this.error=void 0;const o=i.storyPath||t.storyPath;window.location.href=`/app/stories/${o}`}).catch(i=>{this.error=i.toString()})}_handleFileSelected(e){var a;const i=(a=e.target.files)==null?void 0:a[0];if(!i)return;const o=new FileReader;o.onload=()=>{this.formData={...this.formData,"img-src":o.result}},o.readAsDataURL(i)}render(){const e=this.formData;return n`
      <form
        @input=${this.handleChange}
        @submit=${this.handleSubmit}
        autocomplete="off"
      >
          <h2>Add story</h2>
        <label>
          Story Title * 
          <input
            name="storyTitle"
            type="text"
            .value=${e.storyTitle||""}
            required
          />
        </label>

        <label>
          Author Name *
          <input
            name="authorName"
            type="text"
            .value=${e.authorName||""}
            required
          />
        </label>

        <label>
          Community or Official *
          <select name="communityOrOfficial" required>
            <option value="" ?selected=${!e.communityOrOfficial}>Select...</option>
            <option value="Community" ?selected=${e.communityOrOfficial==="Community"}>Community</option>
            <option value="Official" ?selected=${e.communityOrOfficial==="Official"}>Official</option>
          </select>
        </label>
          <label>
              Genre
              <select name="genre" .value=${e.genre||""}>
                  <option value="" disabled selected>Select a genre</option>
                  <option value="Romance">Romance</option>
                  <option value="Drama">Drama</option>
                  <option value="LGBTQ+">LGBTQ+</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Horror">Horror</option>
              </select>
          </label>
          <label>
          Chapter Count
          <input
            name="chapterCount"
            type="number"
            min="0"
            .value=${e.chapterCount??""}
          />
        </label>

        <label>
          Synopsis
          <textarea
            name="synopsis"
            rows="5"
            .value=${e.synopsis||""}
          ></textarea>
        </label>

          <label>
              Link to story
              <input
                      name="storyLink"
                      type="text"
                      .value=${e.storyLink||""}
              />
          </label>

        <label>
          Image (optional)
          <input
            type="file"
            accept="image/*"
            @change=${this._handleFileSelected}
          />
          ${e["img-src"]?n`<img class="preview" src=${e["img-src"]} alt="Story Image Preview" />`:null}
        </label>

        <button type="submit" ?disabled=${!this.canSubmit}>
          ${this.buttonLabel}
        </button>

        ${this.error?n`<p class="error">${this.error}</p>`:""}
      </form>
    `}};z.uses=D({"mu-form":W.Element}),z.styles=[g.styles,c`
            :host {
                display: flex;
                justify-content: center;
                padding: 2rem 1rem;
                font-family: "Comfortaa", sans-serif;
                color: #1a1a40;
                background-color: #f8f8fe;
                min-height: 100vh;
                box-sizing: border-box;
            }

            form {
                background: white;
                padding: 2.5rem 2rem;
                border-radius: 1rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                max-width: 480px;
                width: 100%;
                display: grid;
                gap: 1.25rem;
                box-sizing: border-box;
            }

            h2 {
                margin: 0 0 1.5rem 0;
                font-weight: 700;
                font-size: 1.8rem;
                text-align: center;
                color: #1a1a40;
            }

            label {
                display: flex;
                flex-direction: column;
                font-weight: 600;
                font-size: 0.95rem;
                color: #1a1a40;
            }

            input,
            textarea,
            select {
                margin-top: 0.4rem;
                padding: 0.6rem 0.8rem;
                font-size: 1rem;
                font-family: inherit;
                border-radius: 0.6rem;
                border: 1px solid #ccc;
                transition: border-color 0.3s ease;
                color: #1a1a40;
            }

            input:focus,
            textarea:focus,
            select:focus {
                outline: none;
                border-color: #6dbde1; /* accent color */
                box-shadow: 0 0 5px #6dbde1aa;
            }

            textarea {
                resize: vertical;
            }

            button {
                margin-top: 1rem;
                background-color: #6dbde1;
                color: white;
                font-weight: 600;
                font-size: 1.1rem;
                padding: 0.75rem 0;
                border: none;
                border-radius: 1rem;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            button:hover:not(:disabled) {
                background-color: #5aa9d7;
            }

            button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .error {
                color: #e55353;
                font-weight: 700;
                text-align: center;
                margin-top: 0.5rem;
            }

            img.preview {
                max-width: 100%;
                
                margin-top: 0.5rem;
                border-radius: 0.75rem;
                border: 1px solid #ccc;
                object-fit: contain;
                display: block;
            }
            
            h2 {
                color: #1a1a40;
            }
            
            button {
                font-family: Comfortaa, "Comfortaa", sans-serif;
            }
        `];let f=z;O([l()],f.prototype,"formData");O([d({type:String})],f.prototype,"api");O([d({type:String})],f.prototype,"redirect");O([l()],f.prototype,"error");O([d({type:String})],f.prototype,"buttonLabel");const _e=[{auth:"protected",path:"/app/stories/add",view:()=>n`
            <add-story-view></add-story-view>`},{auth:"protected",path:"/app/stories/:storyPath/chapters/:chapterNumber",view:r=>n`
            <chapter-view
                    storyPath=${r.storyPath}
                    chapterNumber=${r.chapterNumber}>
            </chapter-view>
        `},{path:"/app/stories/:storyPath",view:r=>n`
      <story-view storyPath=${r.storyPath}></story-view>
    `},{path:"/app/stories",view:()=>n`
      <all-story-view></all-story-view>
    `},{auth:"protected",path:"/app/profiles/:username/edit",view:r=>n`
    <reader-edit username=${r.username}></reader-edit>`},{auth:"protected",path:"/app/profiles/:username",view:r=>n`
      <reader-view
        username=${r.username}></reader-view>
    `},{path:"/app",view:()=>n`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];D({"mu-auth":x.Provider,"mu-history":M.Provider,"mu-switch":class extends re.Element{constructor(){super(_e,"episode:history","episode:auth")}},"mu-store":class extends te.Provider{constructor(){super(ae,oe,"episode:auth")}},"episode-header":y,"home-view":_,"all-story-view":u,"story-view":v,"chapter-view":m,"reader-view":S,"reader-edit":w,"add-story-view":j,"add-story-form":f,"reviews-view":p});
