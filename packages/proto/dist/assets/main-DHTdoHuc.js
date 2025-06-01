import{a as m,O as y,x as c,r as f,i as b,n as p,c as d,d as $}from"./state-LPCHAKqD.js";import{p as C,t as _}from"./tokens.css-CLyr5EUn.js";import{S as g}from"./story-DTctvjFZ.js";var v=Object.defineProperty,a=(l,s,e,o)=>{for(var t=void 0,i=l.length-1,h;i>=0;i--)(h=l[i])&&(t=h(s,e,t)||t);return t&&v(s,e,t),t};const u=class u extends m{constructor(){super(...arguments),this.chapters=[],this.storyTitle="",this.chapterNumber=0,this._authObserver=new y(this,"episode:auth")}render(){if(!this.selectedChapter)return c`
          <p>Please login or make an account</p>
          <button @click=${()=>{window.location.href="/login.html"}}>
            Sign In
          </button>
        `;const e=window.location.pathname.split("/")[2];return c`
            <section>
                <header>
                    <a href="../../${e}/${e}.html">&larr; Back</a>
                    <h1>Chapter ${this.selectedChapter.chapterNumber} (${this.selectedChapter.storyTitle})</h1>
                </header>
                <section>
                    <h3>Summary</h3>
                    <p>${this.selectedChapter.summary}</p>
                </section>
                <section>
                    <h3>Comments</h3>
                    ${this.selectedChapter.comments.map(o=>c`<p>${o}</p>`)}
                </section>
            </section>
        `}connectedCallback(){super.connectedCallback();const s=this.getAttribute("data-title"),e=this.getAttribute("chapter-number");this.storyTitle=s||"",this.chapterNumber=e?Number(e):0,this._authObserver.observe(o=>{this._user=o.user,this._user&&this._user.authenticated&&this.src&&this.storyTitle&&this.chapterNumber&&this.hydrate(this.src,this.storyTitle,this.chapterNumber)})}get authorization(){return this._user&&this._user.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}hydrate(s,e,o){fetch(s,{headers:this.authorization}).then(t=>t.json()).then(t=>{console.log("Fetched stories:",t);const i=t.find(n=>n.storyTitle===e);if(!i){console.error(`Story with title "${e}" not found.`);return}const h=i.chapters.find(n=>n.chapterNumber===o);if(!h){console.error(`Chapter ${o} not found in story "${e}".`);return}this.selectedChapter=h}).catch(t=>console.error("Failed to fetch stories:",t))}};u.styles=[f.styles,C.styles,_.styles,b`
        `];let r=u;a([p()],r.prototype,"src");a([d()],r.prototype,"chapters");a([d()],r.prototype,"selectedChapter");a([p({type:String})],r.prototype,"storyTitle");a([p({type:Number})],r.prototype,"chapterNumber");$({"chapter-template":r,"story-template":g});export{r as C};
