import{i as p,a as f,x as n,r as y,c as d,n as u}from"./state-LPCHAKqD.js";import{p as m,t as g}from"./tokens.css-CLyr5EUn.js";const x=p`
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
`,$={styles:x};var v=Object.defineProperty,a=(l,t,r,i)=>{for(var e=void 0,s=l.length-1,h;s>=0;s--)(h=l[s])&&(e=h(t,r,e)||e);return e&&v(t,r,e),e};const c=class c extends f{constructor(){super(...arguments),this.stories=[],this.storyTitle=""}render(){var e;const t=this.stories.find(s=>s.storyTitle===this.storyTitle);if(!t)return n`<p>Story not found.</p>`;const i=window.location.pathname.split("/")[2];return n`
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
                            ${(e=t.chapters)==null?void 0:e.map(s=>n`
                                        <li>
                                            <a href="/stories/${i}/chapters/${String(s.chapterNumber).padStart(2,"0")}.html">
                                                ${s.title}
                                            </a>
                                        </li>
                                    `)}
                        </ul>
                    </section>
                </div>
            </div>
        </section>
    `}connectedCallback(){super.connectedCallback();const t=this.getAttribute("data-title");t&&(this.storyTitle=t,this.src&&this.hydrate(this.src,t))}hydrate(t,r){fetch(t).then(i=>i.json()).then(i=>{const e=i.find(s=>s.storyTitle===r);e?this.stories=[e]:console.error(`Story with title "${r}" not found.`)}).catch(i=>console.error("Failed to fetch stories:",i))}};c.styles=[y.styles,m.styles,g.styles,$.styles,p`
            h1 {
                font-size: 2rem;
            }
            
            ul {
                list-style-type: disc;
                margin-left: 1.5em;
                padding-left: 1em;
            }
        `];let o=c;a([u()],o.prototype,"src");a([d()],o.prototype,"stories");a([d()],o.prototype,"storyTitle");export{o as S};
