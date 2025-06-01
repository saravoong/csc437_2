import{i as p,a as y,x as n,r as f,n as u,c as d}from"./state-LPCHAKqD.js";import{p as m,t as g}from"./tokens.css-CLyr5EUn.js";const b=p`
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
`,x={styles:b};var v=Object.defineProperty,a=(l,t,o,s)=>{for(var e=void 0,r=l.length-1,h;r>=0;r--)(h=l[r])&&(e=h(t,o,e)||e);return e&&v(t,o,e),e};const c=class c extends y{constructor(){super(...arguments),this.stories=[],this.storyTitle=""}render(){var e;const t=this.stories.find(r=>r.storyTitle===this.storyTitle);if(!t)return n`<p>Story not found.</p>`;const s=window.location.pathname.split("/")[2];return n`
            <section>
            <header>
                <a href="../../../index.html">&larr; Home</a>
                <h1>${t.storyTitle}</h1>
            </header>

            <div class="page-layout">
                <div class="left-column">
                    <section>
                        <img src="${t["img-src"]}" height="350" />
                        <p>Author: ${t.authorName}</p>
                        <p>Genre: ${t.genre}</p>
                        <p>Number of Chapters: ${t.chapterCount}</p>
                        <p>Official or Community: ${t.communityOrOfficial}</p>
                        <a href="${t.storyLink}">Read now</a>
                    </section>
                    <hr>
                    <section>
                        <h3>Synopsis</h3>
                        <p>${t.synopsis}</p>
                    </section>
                    <hr>
                    <section>
                        <h3>Rating</h3>
                        <h3>Reviews</h3>
                    </section>
                    <section>
                        <h3>Characters</h3>
                    </section>
                </div>
                <hr>
                <div class="right-column">
                    <section>
                        <h3>Chapters</h3>
                        <ul>
                            ${(e=t.chapters)==null?void 0:e.map(r=>n`
                                        <li>
                                            <a href="/stories/${s}/chapters/${String(r.chapterNumber).padStart(2,"0")}.html">
                                                ${r.title}
                                            </a>
                                        </li>
                                    `)}
                        </ul>
                    </section>
                </div>
            </div>
        </section>
    `}updated(){const t=this.stories.find(o=>o.storyTitle===this.storyTitle);if(t){const s={Romance:"hotpink",Drama:"darkslategray",LGBTQ:"mediumorchid",Fantasy:"rebeccapurple",SciFi:"deepskyblue",Mystery:"darkslateblue",Comedy:"goldenrod",Action:"firebrick",Adventure:"teal",Thriller:"indigo",Horror:"crimson"}[t.genre]||"steelblue";this.style.setProperty("--accent-color",s)}}connectedCallback(){super.connectedCallback();const t=this.getAttribute("data-title");t&&(this.storyTitle=t,this.src&&this.hydrate(this.src,t))}hydrate(t,o){fetch(t).then(s=>s.json()).then(s=>{const e=s.find(r=>r.storyTitle===o);e?this.stories=[e]:console.error(`Story with title "${o}" not found.`)}).catch(s=>console.error("Failed to fetch stories:",s))}};c.styles=[f.styles,m.styles,g.styles,x.styles,p`
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
        `];let i=c;a([u()],i.prototype,"src");a([d()],i.prototype,"stories");a([d()],i.prototype,"storyTitle");export{i as S};
