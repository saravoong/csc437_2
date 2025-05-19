import{a as $,x as n,r as b,i as u,c as p,n as d,d as x}from"./state-LPCHAKqD.js";import{p as C,t as v}from"./tokens.css-CLyr5EUn.js";var N=Object.defineProperty,l=(h,t,s,i)=>{for(var e=void 0,r=h.length-1,o;r>=0;r--)(o=h[r])&&(e=o(t,s,e)||e);return e&&N(t,s,e),e};const m=class m extends ${constructor(){super(...arguments),this.chapters=[],this.storyTitle="",this.chapterNumber=0}connectedCallback(){super.connectedCallback();const t=this.getAttribute("data-title"),s=this.getAttribute("chapter-number");t&&s&&(this.storyTitle=t,this.chapterNumber=Number(s),this.src&&this.hydrate(this.src,t,Number(s)))}render(){if(!this.selectedChapter)return n`<p>Loading chapter=...</p>`;const s=window.location.pathname.split("/")[2];return n`
            <section>
                <header>
                    <a href="../../${s}/${s}.html">&larr; Back</a>
                    <h1>Chapter ${this.selectedChapter.chapterNumber} (${this.selectedChapter.storyTitle})</h1>
                </header>
                <section>
                    <h3>Summary</h3>
                    <p>${this.selectedChapter.summary}</p>
                </section>
                <section>
                    <h3>Comments</h3>
                    ${this.selectedChapter.comments.map(i=>n`<p>${i}</p>`)}
                </section>
            </section>
        `}hydrate(t,s,i){fetch(t).then(e=>e.json()).then(e=>{console.log("Fetched stories:",e);const r=e.stories.find(y=>y.storyTitle===s);if(!r){console.error(`Story with title "${s}" not found.`);return}const o=r.chapters.find(y=>y.chapterNumber===i);if(!o){console.error(`Chapter ${i} not found in story "${s}".`);return}this.selectedChapter=o}).catch(e=>console.error("Failed to fetch stories:",e))}};m.styles=[b.styles,C.styles,v.styles,u`
        `];let c=m;l([d()],c.prototype,"src");l([p()],c.prototype,"chapters");l([p()],c.prototype,"selectedChapter");l([d({type:String})],c.prototype,"storyTitle");l([d({type:Number})],c.prototype,"chapterNumber");const w=u`
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
`,T={styles:w};var k=Object.defineProperty,f=(h,t,s,i)=>{for(var e=void 0,r=h.length-1,o;r>=0;r--)(o=h[r])&&(e=o(t,s,e)||e);return e&&k(t,s,e),e};const g=class g extends ${constructor(){super(...arguments),this.stories=[],this.storyTitle=""}connectedCallback(){super.connectedCallback();const t=this.getAttribute("data-title");t&&(this.storyTitle=t,this.src&&this.hydrate(this.src,t))}render(){var e;const t=this.stories.find(r=>r.storyTitle===this.storyTitle);if(!t)return n`<p>Story not found.</p>`;const i=window.location.pathname.split("/")[2];return n`
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
                                            <a href="/stories/${i}/chapters/${String(r.chapterNumber).padStart(2,"0")}.html">
                                                ${r.title}
                                            </a>
                                        </li>
                                    `)}
                        </ul>
                    </section>
                </div>
            </div>
        </section>
    `}hydrate(t,s){fetch(t).then(i=>i.json()).then(i=>{if(i&&Array.isArray(i.stories)){const e=i.stories.find(r=>r.storyTitle===s);e?this.stories=[e]:console.error(`Story with title "${s}" not found.`)}}).catch(i=>console.error("Failed to fetch stories:",i))}};g.styles=[b.styles,C.styles,v.styles,T.styles,u`
            h1 {
                font-size: 2rem;
            }
            
            ul {
                list-style-type: disc;
                margin-left: 1.5em;
                padding-left: 1em;
            }
        `];let a=g;f([d()],a.prototype,"src");f([p()],a.prototype,"stories");f([p()],a.prototype,"storyTitle");x({"chapter-template":c,"story-template":a});
