import{a as C,i as d,V as j,O as H,d as z,b as K,x as n,r as f,e as U,c as l,f as k,n as m,h as D,g as E,s as W,_ as Y}from"./reset.css-BPlqXxCa.js";import{p as J,t as q}from"./tokens.css-B8I_IFMe.js";const X={};function Z(o,e,r){switch(o[0]){case"profile/save":ee(o[1],r).then(t=>e(i=>({...i,profile:t}))).then(()=>{const{onSuccess:t}=o[1];t&&t()}).catch(t=>{const{onFailure:i}=o[1];i&&i(t)});break;case"profile/select":V(o[1],r).then(t=>e(i=>({...i,profile:t})));break;case"story/save":te(o[1],r).then(t=>e(i=>({...i,story:t}))).then(()=>{const{onSuccess:t}=o[1];t&&t()}).catch(t=>{const{onFailure:i}=o[1];i&&i(t)});break;case"chapter/comment/add":re(o[1],r).then(t=>e(i=>{var s,x;return{...i,Story:{...i.story,chapters:((x=(s=i.story)==null?void 0:s.chapters)==null?void 0:x.map(c=>c.chapterNumber===t.chapterNumber?t:c))??[]}}})).then(()=>{const{onSuccess:t}=o[1];t&&t()}).catch(t=>{const{onFailure:i}=o[1];i&&i(t)});break;default:const a=o[0];throw new Error(`Unhandled message "${a}"`)}}function V(o,e){return fetch(`/api/profiles/${o.username}`,{headers:C.headers(e)}).then(async r=>{if(!r.ok){console.warn(`Profile fetch failed with status ${r.status}`);return}const a=await r.text();if(!a){console.warn(`Empty response for user ${o.username}`);return}try{return JSON.parse(a)}catch{console.error(`Failed to parse JSON for ${o.username}:`,a);return}})}function ee(o,e){return fetch(`/api/profiles/${o.username}`,{method:"PUT",headers:{"Content-Type":"application/json",...C.headers(e)},body:JSON.stringify(o.profile)}).then(r=>{if(r.status===200)return r.json();throw new Error(`Failed to save profile for ${o.username}`)}).then(r=>{if(r)return r})}function te(o,e){return console.log("Sending story to backend:",o.story),fetch("/api/stories",{method:"POST",headers:{"Content-Type":"application/json",...C.headers(e)},body:JSON.stringify(o.story)}).then(r=>{if(r.status===200)return r.json();throw new Error(`Failed to save profile for ${o.story}`)}).then(r=>{if(r)return r})}function re(o,e){return fetch(`/api/stories/${o.storyPath}/chapters/${o.chapterNumber}/comments`,{method:"POST",headers:{"Content-Type":"application/json",...C.headers(e)},body:JSON.stringify({comment:o.comment})}).then(r=>{if(r.ok)return r.json();throw new Error("Failed to add comment")})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F=o=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)},oe=d`
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
`,A={styles:oe};var ae=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,L=(o,e,r,a)=>{for(var t=a>1?void 0:a?ie(e,r):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(t=(a?s(e,r,t):s(t))||t);return a&&t&&ae(e,r,t),t};function se(o){const r=o.target.checked;U.relay(o,"dark-mode",{checked:r})}const _=class _ extends j{constructor(){super("episode:model"),this.loggedIn=!1,this.username="episodian",this._authObserver=new H(this,"episode:auth")}get profile(){return this.model.profile}render(){var t,i;const e=this.username||"episodian",r=((t=this.profile)==null?void 0:t.profilePicture)||"/assets/defaultpfp.png",a=((i=this.profile)==null?void 0:i.color)||"#ccc";return n`
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
                                src=${r}
                                alt="Profile Picture"
                                class="profile-pic"
                                style="border: 2px solid ${a}"
                        />
                        <menu>
                            <li>
                                <label class="dark-toggle">
                                    <input type="checkbox" @change=${se} />
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
        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&e.authenticated?(this.loggedIn=!0,this.username=e.username,this.dispatchMessage(["profile/select",{username:this.username}])):(this.loggedIn=!1,this.username=void 0)})}static initializeOnce(){function e(r,a){r.classList.toggle("dark-mode",a)}document.body.addEventListener("dark-mode",r=>{var a;return e(r.currentTarget,(a=r.detail)==null?void 0:a.checked)})}renderSignOutButton(){return n`
            <button
                    @click=${e=>{U.relay(e,"auth:message",["auth/signout"])}}
            >
                Sign Out
            </button>
        `}renderSignInButton(){return n`
            <button @click=${()=>{window.location.href="/login.html"}}>
                Sign In
            </button>
        `}};_.uses=z({"mu-dropdown":K.Element}),_.styles=[f.styles,J.styles,q.styles,A.styles,d`
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
        `];let g=_;L([l()],g.prototype,"loggedIn",2);L([l()],g.prototype,"username",2);L([l()],g.prototype,"profile",1);var ne=Object.getOwnPropertyDescriptor,le=(o,e,r,a)=>{for(var t=a>1?void 0:a?ne(e,r):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(t=s(t)||t);return t};let S=class extends k{render(){return n`
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

    `}};S.styles=[A.styles,f.styles,d`
            .front-page-header {
                position: relative; /* Needed for absolute positioning inside */
                padding-right: 3rem; /* space so dropdown doesn't overlap content */
            }

            mu-dropdown {
                position: absolute;
                top: 0.5rem;
                right: 1rem;
            }
        `];S=le([F("home-view")],S);var ce=Object.defineProperty,M=(o,e,r,a)=>{for(var t=void 0,i=o.length-1,s;i>=0;i--)(s=o[i])&&(t=s(e,r,t)||t);return t&&ce(e,r,t),t};const I=class I extends k{constructor(){super(...arguments),this.mode="view"}connectedCallback(){super.connectedCallback(),this.storyPath&&this.loadStory()}updated(e){var r;if(e.has("storyPath")&&this.loadStory(),this.story){const a={Romance:"hotpink",Drama:"darkslategray",LGBTQ:"mediumorchid",Fantasy:"rebeccapurple",SciFi:"deepskyblue",Mystery:"darkslateblue",Comedy:"goldenrod",Action:"firebrick",Adventure:"teal",Thriller:"indigo",Horror:"crimson"},t=((r=this.story.genre)==null?void 0:r.replace(/\+/g,""))||"",i=a[t]||"steelblue";this.style.setProperty("--accent-color",i)}}async loadStory(){try{const e=await fetch(`/api/stories/${this.storyPath}`);if(!e.ok)throw new Error(`Failed to fetch story: ${e.statusText}`);this.story=await e.json()}catch(e){console.error(e),this.story=void 0}}async handleAddChapter(){if(!this.story||!this.storyPath)return;const r=Math.max(0,...this.story.chapters.map(i=>i.chapterNumber||0))+1,a={chapterNumber:r,title:`Chapter ${r}`,summary:"",comments:[],href:`./chapters/${r}.html`,storyTitle:this.story.storyTitle},t={...this.story,chapterCount:r,chapters:[...this.story.chapters,a]};try{const i=await fetch(`/api/stories/${this.storyPath}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!i.ok)throw new Error("Failed to update story with new chapter");this.story=await i.json()}catch(i){console.error("Error adding chapter:",i)}}render(){return this.story?n`
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
                        <section><h3>Reviews</h3></section>
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
            </section>
        `:n`<p>Loading story...</p>`}};I.styles=[f.styles,d`
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

        `];let b=I;M([m({attribute:"storypath"})],b.prototype,"storyPath");M([m()],b.prototype,"mode");M([l()],b.prototype,"story");var de=Object.defineProperty,v=(o,e,r,a)=>{for(var t=void 0,i=o.length-1,s;i>=0;i--)(s=o[i])&&(t=s(e,r,t)||t);return t&&de(e,r,t),t};const G=class G extends k{constructor(){super(...arguments),this.chapterNumber=0,this.newComment="",this.errorMessage=""}connectedCallback(){super.connectedCallback(),this.storyPath&&this.chapterNumber&&this.loadChapter()}updated(e){(e.has("storyPath")||e.has("chapterNumber"))&&this.loadChapter()}async loadChapter(){if(!(!this.storyPath||!this.chapterNumber))try{const e=await fetch(`/api/stories/${this.storyPath}`);if(!e.ok)throw new Error(`Failed to fetch story: ${e.statusText}`);this.story=await e.json(),this.story&&this.story.chapters?this.selectedChapter=this.story.chapters.find(r=>r.chapterNumber===this.chapterNumber):this.selectedChapter=void 0,this.selectedChapter||console.error(`Chapter ${this.chapterNumber} not found in story ${this.storyPath}`)}catch(e){console.error(e),this.story=void 0,this.selectedChapter=void 0}}async handleAddComment(){if(!(!this.storyPath||!this.chapterNumber||!this.newComment.trim())){this.errorMessage="";try{const e=await fetch(`/api/stories/${this.storyPath}/chapters/${this.chapterNumber}/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({comment:this.newComment.trim()})});if(!e.ok){const a=await e.text();throw new Error(a||"Failed to submit comment")}const r=await e.json();this.selectedChapter=r,this.newComment=""}catch(e){this.errorMessage=e instanceof Error?e.message:"Unknown error"}}}render(){if(!this.selectedChapter)return n`<p>Loading chapter...</p>`;const e=this.selectedChapter;return n`
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
                    @input=${r=>this.newComment=r.target.value}
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
                    ${e.comments&&e.comments.length>0?e.comments.map(r=>n`<p>${r}</p>`):n`<p>No comments yet.</p>`}
                </section>
            </section>
        `}};G.styles=d`
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

    `;let h=G;v([m({attribute:"storypath"})],h.prototype,"storyPath");v([m({type:Number,attribute:"chapternumber"})],h.prototype,"chapterNumber");v([l()],h.prototype,"story");v([l()],h.prototype,"selectedChapter");v([l()],h.prototype,"newComment");v([l()],h.prototype,"errorMessage");var he=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,Q=(o,e,r,a)=>{for(var t=a>1?void 0:a?pe(e,r):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(t=(a?s(e,r,t):s(t))||t);return a&&t&&he(e,r,t),t};const R=class R extends j{get profile(){return this.model.profile}render(){const{username:e,profilePicture:r,color:a="ffffff"}=this.profile||{};return n`
            <episode-header></episode-header>
            <section>
      <main class="card">
          <section class="profile-view">
        <img src=${r}/>
              <dt>Username</dt>
              <dd>${e||"N/A"}</dd>
              <dt>Favorite Color</dt>
              <dd>
              <span
                      class="swatch"
                      style="background: ${a}"></span>
                  </slot>
                  <slot name="color-name">${a}</slot>
              </dd>
              
        <button id="edit"
                   @click=${()=>D.dispatch(this,"history/navigate",{href:`/app/profiles/${this.username}/edit`})}
        >Edit Profile
        </button>
      </section>
      
      </main>
            </section>
    `}constructor(){super("episode:model")}attributeChangedCallback(e,r,a){super.attributeChangedCallback(e,r,a),e==="username"&&r!==a&&a&&this.dispatchMessage(["profile/select",{username:a}])}firstUpdated(){this.username&&this.dispatchMessage(["profile/select",{username:this.username}])}};R.styles=[f.styles,d`
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
    `];let $=R;Q([m()],$.prototype,"username",2);Q([l()],$.prototype,"profile",1);var me=Object.defineProperty,ue=Object.getOwnPropertyDescriptor,B=(o,e,r,a)=>{for(var t=a>1?void 0:a?ue(e,r):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(t=(a?s(e,r,t):s(t))||t);return a&&t&&me(e,r,t),t};const T=class T extends j{constructor(){var e;super("episode:model"),this.image=(e=this.profile)==null?void 0:e.profilePicture}get profile(){return this.model.profile}render(){if(!this.profile)return n`
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
        `}handleSubmit(e){if(!this.username)return;const r={...e.detail,profilePicture:this.image};this.dispatchMessage(["profile/save",{username:this.username,profile:r,onSuccess:()=>{D.dispatch(this,"history/navigate",{href:`/app/profiles/${this.username}`})},onFailure:a=>console.log("ERROR:",a)}])}_handleFileSelected(e){var i;const a=(i=e.target.files)==null?void 0:i[0];if(!a)return;const t=new FileReader;t.onload=()=>{const s=t.result,x=new URL("/images",document.location.origin);x.searchParams.set("filename",a.name),fetch(x.toString(),{method:"POST",headers:{"Content-Type":a.type,"Content-Length":a.size.toString()},body:s}).then(c=>c.status===201?c.json():Promise.reject(c.status)).then(c=>{this.image=c.url}).catch(c=>console.log("Upload failed",c))},t.onerror=s=>console.log("File reading error",s),t.readAsArrayBuffer(a)}};T.uses=z({"mu-form":E.Element}),T.styles=[f.styles,d`
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
    `];let y=T;B([m()],y.prototype,"username",2);B([l()],y.prototype,"profile",1);B([l()],y.prototype,"image",2);var fe=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,w=(o,e,r,a)=>{for(var t=a>1?void 0:a?ge(e,r):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(t=(a?s(e,r,t):s(t))||t);return a&&t&&fe(e,r,t),t};let p=class extends k{constructor(){super(...arguments),this.stories=[],this.loading=!0,this.error=null,this.searchTerm="",this.selectedGenre=""}connectedCallback(){super.connectedCallback(),this.loadStories()}async loadStories(){try{this.loading=!0,this.error=null;const o=await fetch("/api/stories");if(!o.ok)throw new Error(`Failed to fetch stories: ${o.statusText}`);const e=await o.json();this.stories=e}catch(o){this.error=o.message||"Unknown error"}finally{this.loading=!1}}get filteredStories(){return this.stories.filter(o=>{const e=o.storyTitle.toLowerCase().includes(this.searchTerm)||o.authorName.toLowerCase().includes(this.searchTerm),r=!this.selectedGenre||o.genre===this.selectedGenre;return e&&r})}addStory(){window.location.href="/app/stories/add"}render(){return n`
            <episode-header></episode-header>
            <section class="filters">
                <input
                        type="text"
                        placeholder="Search by title or author"
                        @input=${o=>this.searchTerm=o.target.value.toLowerCase()}
                />
                <select @change=${o=>this.selectedGenre=o.target.value}>
                    <option value="">All Genres</option>
                    ${["Romance","Drama","LGBTQ","Fantasy","SciFi","Mystery","Comedy","Action","Adventure","Thriller","Horror"].map(o=>n`<option value=${o}>${o}</option>`)}
                </select>
                <button @click=${this.addStory}>Add Story +</button>
            </section>
            <main class="story-list">
                ${this.filteredStories.map(o=>n`
                            <article class="story-card">
                                <a href="/app/stories/${o.storyPath}">
                                    <img src=${o["img-src"]||"/assets/defaultstorycover.png"}
                                         alt=${o.storyTitle} 
                                    />
                                    <h2>${o.storyTitle}</h2>
                                </a>
                            </article>
                        `)}
            </main>
        `}};p.styles=[A.styles,f.styles,J.styles,q.styles,d`
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
        `];w([l()],p.prototype,"stories",2);w([l()],p.prototype,"loading",2);w([l()],p.prototype,"error",2);w([l()],p.prototype,"searchTerm",2);w([l()],p.prototype,"selectedGenre",2);p=w([F("all-story-view")],p);var be=Object.getOwnPropertyDescriptor,ye=(o,e,r,a)=>{for(var t=a>1?void 0:a?be(e,r):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(t=s(t)||t);return t};let O=class extends k{render(){return n`
      <episode-header></episode-header>
      <main>
          <add-story-form api="/api/stories"></add-story-form>
      </main>
    `}};O.styles=d`
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

  `;O=ye([F("add-story-view")],O);var ve=Object.defineProperty,P=(o,e,r,a)=>{for(var t=void 0,i=o.length-1,s;i>=0;i--)(s=o[i])&&(t=s(e,r,t)||t);return t&&ve(e,r,t),t};const N=class N extends j{constructor(){super(...arguments),this.formData={},this.redirect="/",this.buttonLabel="Add Story"}generateStoryPath(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"_")}get canSubmit(){const e=this.formData;return!!(this.api&&e.storyTitle&&e.authorName&&e.communityOrOfficial)}handleChange(e){const r=e.target,a=r.name;let t=r.value;a==="chapterCount"&&(t=parseInt(t,10),isNaN(t)&&(t=0)),this.formData={...this.formData,[a]:t}}handleSubmit(e){if(e.preventDefault(),!this.canSubmit){this.error="Please fill in all required fields.";return}const r={...this.formData,storyPath:this.generateStoryPath(this.formData.storyTitle||"")};fetch(this.api||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then(a=>{if(a.status!==200&&a.status!==201)throw new Error("Failed to add story");return a.json()}).then(a=>{this.error=void 0;const t=a.storyPath||r.storyPath;window.location.href=`/app/stories/${t}`}).catch(a=>{this.error=a.toString()})}_handleFileSelected(e){var i;const a=(i=e.target.files)==null?void 0:i[0];if(!a)return;const t=new FileReader;t.onload=()=>{this.formData={...this.formData,"img-src":t.result}},t.readAsDataURL(a)}render(){const e=this.formData;return n`
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
    `}};N.uses=z({"mu-form":E.Element}),N.styles=[f.styles,d`
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
        `];let u=N;P([l()],u.prototype,"formData");P([m({type:String})],u.prototype,"api");P([m({type:String})],u.prototype,"redirect");P([l()],u.prototype,"error");P([m({type:String})],u.prototype,"buttonLabel");const we=[{auth:"protected",path:"/app/stories/add",view:()=>n`
            <add-story-view></add-story-view>`},{auth:"protected",path:"/app/stories/:storyPath/chapters/:chapterNumber",view:o=>n`
            <chapter-view
                    storyPath=${o.storyPath}
                    chapterNumber=${o.chapterNumber}>
            </chapter-view>
        `},{path:"/app/stories/:storyPath",view:o=>n`
      <story-view storyPath=${o.storyPath}></story-view>
    `},{path:"/app/stories",view:()=>n`
      <all-story-view></all-story-view>
    `},{auth:"protected",path:"/app/profiles/:username/edit",view:o=>n`
    <reader-edit username=${o.username}></reader-edit>`},{auth:"protected",path:"/app/profiles/:username",view:o=>n`
      <reader-view
        username=${o.username}></reader-view>
    `},{path:"/app",view:()=>n`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];z({"mu-auth":C.Provider,"mu-history":D.Provider,"mu-switch":class extends Y.Element{constructor(){super(we,"episode:history","episode:auth")}},"mu-store":class extends W.Provider{constructor(){super(Z,X,"episode:auth")}},"episode-header":g,"home-view":S,"all-story-view":p,"story-view":b,"chapter-view":h,"reader-view":$,"reader-edit":y,"add-story-view":O,"add-story-form":u});
