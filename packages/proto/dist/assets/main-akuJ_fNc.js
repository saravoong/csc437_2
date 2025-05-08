var he;class it extends Error{}it.prototype.name="InvalidTokenError";function ws(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,e)=>{let s=e.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}function Ss(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return ws(t)}catch{return atob(t)}}function xs(r,t){if(typeof r!="string")throw new it("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,s=r.split(".")[e];if(typeof s!="string")throw new it(`Invalid token specified: missing part #${e+1}`);let i;try{i=Ss(s)}catch(n){throw new it(`Invalid token specified: invalid base64 for part #${e+1} (${n.message})`)}try{return JSON.parse(i)}catch(n){throw new it(`Invalid token specified: invalid json for part #${e+1} (${n.message})`)}}function Ps(r,t){const e=Le(t,r);return new Promise((s,i)=>{if(e){const n=e.localName;customElements.whenDefined(n).then(()=>s(e))}else i({context:t,reason:`No provider for this context "${t}:`})})}function Le(r,t){const e=`[provides="${r}"]`;if(!t||t===document.getRootNode())return;const s=t.closest(e);if(s)return s;const i=t.getRootNode();if(i instanceof ShadowRoot)return Le(r,i.host)}class ks extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function Ie(r="mu:message"){return(t,...e)=>t.dispatchEvent(new ks(e,r))}class Yt{constructor(t,e,s="service:message",i=!0){this._pending=[],this._context=e,this._update=t,this._eventType=s,this._running=i}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const s=e.detail;this.consume(s)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}apply(t){this._context.apply(t)}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${this._eventType} message`,t);const e=this._update(t,this.apply.bind(this));e&&e(this._context.value)}}function Cs(r){return t=>({...t,...r})}const qt="mu:auth:jwt",je=class De extends Yt{constructor(t,e){super((s,i)=>this.update(s,i),t,De.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":const{token:s,redirect:i}=t[1];return e(Rs(s)),It(i);case"auth/signout":return e(Us()),It(this._redirectForLogin);case"auth/redirect":return It(this._redirectForLogin,{next:window.location.href});default:const n=t[0];throw new Error(`Unhandled Auth message "${n}"`)}}};je.EVENT_TYPE="auth:message";let Ts=je;const Os=Ie(Ts.EVENT_TYPE);function It(r,t={}){if(!r)return;const e=window.location.href,s=new URL(r,e);return Object.entries(t).forEach(([i,n])=>s.searchParams.set(i,n)),()=>{console.log("Redirecting to ",r),window.location.assign(s)}}class bt{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(qt),t}}class At extends bt{constructor(t){super();const e=xs(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new At(t);return localStorage.setItem(qt,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(qt);return t?At.authenticate(t):new bt}}function Rs(r){return Cs({user:At.authenticate(r),token:r})}function Us(){return r=>{const t=r.user;return{user:t&&t.authenticated?bt.deauthenticate(t):t,token:""}}}function Bt(r,t,e){const s=r.target,i=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});console.log(`Relaying event from ${r.type}:`,i),s.dispatchEvent(i),r.stopPropagation()}function ce(r,t="*"){return r.composedPath().find(s=>{const i=s;return i.tagName&&i.matches(t)})}const Ns=new DOMParser;function dt(r,...t){const e=r.map((o,a)=>a?[t[a-1],o]:[o]).flat().join(""),s=Ns.parseFromString(e,"text/html"),i=s.head.childElementCount?s.head.children:s.body.children,n=new DocumentFragment;return n.replaceChildren(...i),n}function Ct(r){const t=r.firstElementChild,e=t&&t.tagName==="TEMPLATE"?t:void 0;return{attach:s};function s(i,n={mode:"open"}){const o=i.attachShadow(n);return e&&o.appendChild(e.content.cloneNode(!0)),o}}const Ms=class ze extends HTMLElement{constructor(){super(),this._state={},Ct(ze.template).attach(this),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}}),this.form&&this.form.addEventListener("submit",t=>{t.preventDefault(),Bt(t,"mu-form:submit",this._state)})}set init(t){this._state=t||{},Hs(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}};Ms.template=dt`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;function Hs(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const a=o;a.checked=!!i;break;case"date":o.value=i.toISOString().substr(0,10);break;default:o.value=i;break}}}return r}const Ve=class Fe extends Yt{constructor(t){super((e,s)=>this.update(e,s),t,Fe.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:s,state:i}=t[1];e(Is(s,i));break}case"history/redirect":{const{href:s,state:i}=t[1];e(js(s,i));break}}}};Ve.EVENT_TYPE="history:message";let Ls=Ve;function Is(r,t={}){return history.pushState(t,"",r),()=>({location:document.location,state:history.state})}function js(r,t={}){return history.replaceState(t,"",r),()=>({location:document.location,state:history.state})}const Ds=Ie(Ls.EVENT_TYPE);class Et{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,s)=>{if(this._provider){const i=new ue(this._provider,t);this._effects.push(i),e(i)}else Ps(this._target,this._contextLabel).then(i=>{const n=new ue(i,t);this._provider=i,this._effects.push(n),i.attach(o=>this._handleChange(o)),e(n)}).catch(i=>console.log(`Observer ${this._contextLabel} failed to locate a provider`,i))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),this._effects.forEach(e=>e.runEffect())}}class ue{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const qe=class Be extends HTMLElement{constructor(){super(),this._state={},this._user=new bt,this._authObserver=new Et(this,"blazing:auth"),Ct(Be.template).attach(this),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",s=this.isNew?"created":"updated",i=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;zs(i,this._state,e,this.authorization).then(n=>X(n,this)).then(n=>{const o=`mu-rest-form:${s}`,a=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[s]:n,url:i}});this.dispatchEvent(a)}).catch(n=>{const o="mu-rest-form:error",a=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,error:n,url:i,request:this._state}});this.dispatchEvent(a)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},X(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&de(this.src,this.authorization).then(e=>{this._state=e,X(e,this)}))})}attributeChangedCallback(t,e,s){switch(t){case"src":this.src&&s&&s!==e&&!this.isNew&&de(this.src,this.authorization).then(i=>{this._state=i,X(i,this)});break;case"new":s&&(this._state={},X({},this));break}}};qe.observedAttributes=["src","new","action"];qe.template=dt`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;function de(r,t){return fetch(r,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${r}:`,e))}function X(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const a=o;a.checked=!!i;break;default:o.value=i;break}}}return r}function zs(r,t,e="PUT",s={}){return fetch(r,{method:e,headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(i=>{if(i.status!=200&&i.status!=201)throw`Form submission failed: Status ${i.status}`;return i.json()})}const Vs=class We extends Yt{constructor(t,e){super(e,t,We.EVENT_TYPE,!1)}};Vs.EVENT_TYPE="mu:message";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $t=globalThis,Jt=$t.ShadowRoot&&($t.ShadyCSS===void 0||$t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Kt=Symbol(),pe=new WeakMap;let Ye=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Kt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Jt&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=pe.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&pe.set(e,t))}return t}toString(){return this.cssText}};const Fs=r=>new Ye(typeof r=="string"?r:r+"",void 0,Kt),qs=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new Ye(e,r,Kt)},Bs=(r,t)=>{if(Jt)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=$t.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},fe=Jt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Fs(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ws,defineProperty:Ys,getOwnPropertyDescriptor:Js,getOwnPropertyNames:Ks,getOwnPropertySymbols:Zs,getPrototypeOf:Gs}=Object,W=globalThis,me=W.trustedTypes,Qs=me?me.emptyScript:"",ge=W.reactiveElementPolyfillSupport,rt=(r,t)=>r,wt={toAttribute(r,t){switch(t){case Boolean:r=r?Qs:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Zt=(r,t)=>!Ws(r,t),ye={attribute:!0,type:String,converter:wt,reflect:!1,hasChanged:Zt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),W.litPropertyMetadata??(W.litPropertyMetadata=new WeakMap);let z=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ye){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Ys(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=Js(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const a=i==null?void 0:i.call(this);n.call(this,o),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ye}static _$Ei(){if(this.hasOwnProperty(rt("elementProperties")))return;const t=Gs(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(rt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(rt("properties"))){const e=this.properties,s=[...Ks(e),...Zs(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(fe(i))}else t!==void 0&&e.push(fe(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Bs(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var s;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:wt).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=i.getPropertyOptions(n),a=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:wt;this._$Em=n,this[n]=a.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??Zt)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[rt("elementProperties")]=new Map,z[rt("finalized")]=new Map,ge==null||ge({ReactiveElement:z}),(W.reactiveElementVersions??(W.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const St=globalThis,xt=St.trustedTypes,_e=xt?xt.createPolicy("lit-html",{createHTML:r=>r}):void 0,Je="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,Ke="?"+S,Xs=`<${Ke}>`,H=document,at=()=>H.createComment(""),lt=r=>r===null||typeof r!="object"&&typeof r!="function",Ze=Array.isArray,ti=r=>Ze(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",jt=`[ 	
\f\r]`,tt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$e=/-->/g,ve=/>/g,O=RegExp(`>|${jt}(?:([^\\s"'>=/]+)(${jt}*=${jt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,Ae=/"/g,Ge=/^(?:script|style|textarea|title)$/i,ei=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),et=ei(1),Y=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Ee=new WeakMap,U=H.createTreeWalker(H,129);function Qe(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return _e!==void 0?_e.createHTML(t):t}const si=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":"",o=tt;for(let a=0;a<e;a++){const l=r[a];let p,f,u=-1,h=0;for(;h<l.length&&(o.lastIndex=h,f=o.exec(l),f!==null);)h=o.lastIndex,o===tt?f[1]==="!--"?o=$e:f[1]!==void 0?o=ve:f[2]!==void 0?(Ge.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=O):f[3]!==void 0&&(o=O):o===O?f[0]===">"?(o=i??tt,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?O:f[3]==='"'?Ae:be):o===Ae||o===be?o=O:o===$e||o===ve?o=tt:(o=O,i=void 0);const c=o===O&&r[a+1].startsWith("/>")?" ":"";n+=o===tt?l+Xs:u>=0?(s.push(p),l.slice(0,u)+Je+l.slice(u)+S+c):l+S+(u===-2?a:c)}return[Qe(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),s]};let Wt=class Xe{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const a=t.length-1,l=this.parts,[p,f]=si(t,e);if(this.el=Xe.createElement(p,s),U.currentNode=this.el.content,e===2){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=U.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(Je)){const h=f[o++],c=i.getAttribute(u).split(S),d=/([.?@])?(.*)/.exec(h);l.push({type:1,index:n,name:d[2],strings:c,ctor:d[1]==="."?ri:d[1]==="?"?ni:d[1]==="@"?oi:Tt}),i.removeAttribute(u)}else u.startsWith(S)&&(l.push({type:6,index:n}),i.removeAttribute(u));if(Ge.test(i.tagName)){const u=i.textContent.split(S),h=u.length-1;if(h>0){i.textContent=xt?xt.emptyScript:"";for(let c=0;c<h;c++)i.append(u[c],at()),U.nextNode(),l.push({type:2,index:++n});i.append(u[h],at())}}}else if(i.nodeType===8)if(i.data===Ke)l.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(S,u+1))!==-1;)l.push({type:7,index:n}),u+=S.length-1}n++}}static createElement(t,e){const s=H.createElement("template");return s.innerHTML=t,s}};function J(r,t,e=r,s){var i,n;if(t===Y)return t;let o=s!==void 0?(i=e._$Co)==null?void 0:i[s]:e._$Cl;const a=lt(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==a&&((n=o==null?void 0:o._$AO)==null||n.call(o,!1),a===void 0?o=void 0:(o=new a(r),o._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=o:e._$Cl=o),o!==void 0&&(t=J(r,o._$AS(r,t.values),o,s)),t}let ii=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??H).importNode(e,!0);U.currentNode=i;let n=U.nextNode(),o=0,a=0,l=s[0];for(;l!==void 0;){if(o===l.index){let p;l.type===2?p=new Gt(n,n.nextSibling,this,t):l.type===1?p=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(p=new ai(n,this,t)),this._$AV.push(p),l=s[++a]}o!==(l==null?void 0:l.index)&&(n=U.nextNode(),o++)}return U.currentNode=H,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Gt=class ts{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),lt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==Y&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ti(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==$&&lt(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Wt.createElement(Qe(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===n)this._$AH.p(s);else{const o=new ii(n,this),a=o.u(this.options);o.p(s),this.T(a),this._$AH=o}}_$AC(t){let e=Ee.get(t.strings);return e===void 0&&Ee.set(t.strings,e=new Wt(t)),e}k(t){Ze(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new ts(this.S(at()),this.S(at()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}},Tt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=J(this,t,e,0),o=!lt(t)||t!==this._$AH&&t!==Y,o&&(this._$AH=t);else{const a=t;let l,p;for(t=n[0],l=0;l<n.length-1;l++)p=J(this,a[s+l],e,l),p===Y&&(p=this._$AH[l]),o||(o=!lt(p)||p!==this._$AH[l]),p===$?t=$:t!==$&&(t+=(p??"")+n[l+1]),this._$AH[l]=p}o&&!i&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ri=class extends Tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}},ni=class extends Tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},oi=class extends Tt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??$)===Y)return;const s=this._$AH,i=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==$&&(s===$||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}},ai=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}};const we=St.litHtmlPolyfillSupport;we==null||we(Wt,Gt),(St.litHtmlVersions??(St.litHtmlVersions=[])).push("3.1.3");const li=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new Gt(t.insertBefore(at(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let F=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=li(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Y}};F._$litElement$=!0,F.finalized=!0,(he=globalThis.litElementHydrateSupport)==null||he.call(globalThis,{LitElement:F});const Se=globalThis.litElementPolyfillSupport;Se==null||Se({LitElement:F});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.5");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const hi={attribute:!0,type:String,converter:wt,reflect:!1,hasChanged:Zt},ci=(r=hi,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,r)},init(a){return a!==void 0&&this.P(o,void 0,r),a}}}if(s==="setter"){const{name:o}=e;return function(a){const l=this[o];t.call(this,a),this.requestUpdate(o,l,r)}}throw Error("Unsupported decorator location: "+s)};function es(r){return(t,e)=>typeof e=="object"?ci(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ss(r){return es({...r,state:!0,attribute:!1})}function ui(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function di(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var is={};(function(r){var t=function(){var e=function(u,h,c,d){for(c=c||{},d=u.length;d--;c[u[d]]=h);return c},s=[1,9],i=[1,10],n=[1,11],o=[1,12],a=[5,11,12,13,14,15],l={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(h,c,d,g,m,y,Ut){var A=y.length-1;switch(m){case 1:return new g.Root({},[y[A-1]]);case 2:return new g.Root({},[new g.Literal({value:""})]);case 3:this.$=new g.Concat({},[y[A-1],y[A]]);break;case 4:case 5:this.$=y[A];break;case 6:this.$=new g.Literal({value:y[A]});break;case 7:this.$=new g.Splat({name:y[A]});break;case 8:this.$=new g.Param({name:y[A]});break;case 9:this.$=new g.Optional({},[y[A-1]]);break;case 10:this.$=h;break;case 11:case 12:this.$=h.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[2,2]},e(a,[2,4]),e(a,[2,5]),e(a,[2,6]),e(a,[2,7]),e(a,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},e(a,[2,10]),e(a,[2,11]),e(a,[2,12]),{1:[2,1]},e(a,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:s,12:[1,16],13:i,14:n,15:o},e(a,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(h,c){if(c.recoverable)this.trace(h);else{let d=function(g,m){this.message=g,this.hash=m};throw d.prototype=Error,new d(h,c)}},parse:function(h){var c=this,d=[0],g=[null],m=[],y=this.table,Ut="",A=0,oe=0,vs=2,ae=1,bs=m.slice.call(arguments,1),_=Object.create(this.lexer),C={yy:{}};for(var Nt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Nt)&&(C.yy[Nt]=this.yy[Nt]);_.setInput(h,C.yy),C.yy.lexer=_,C.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Mt=_.yylloc;m.push(Mt);var As=_.options&&_.options.ranges;typeof C.yy.parseError=="function"?this.parseError=C.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var Es=function(){var j;return j=_.lex()||ae,typeof j!="number"&&(j=c.symbols_[j]||j),j},b,T,E,Ht,I={},yt,w,le,_t;;){if(T=d[d.length-1],this.defaultActions[T]?E=this.defaultActions[T]:((b===null||typeof b>"u")&&(b=Es()),E=y[T]&&y[T][b]),typeof E>"u"||!E.length||!E[0]){var Lt="";_t=[];for(yt in y[T])this.terminals_[yt]&&yt>vs&&_t.push("'"+this.terminals_[yt]+"'");_.showPosition?Lt="Parse error on line "+(A+1)+`:
`+_.showPosition()+`
Expecting `+_t.join(", ")+", got '"+(this.terminals_[b]||b)+"'":Lt="Parse error on line "+(A+1)+": Unexpected "+(b==ae?"end of input":"'"+(this.terminals_[b]||b)+"'"),this.parseError(Lt,{text:_.match,token:this.terminals_[b]||b,line:_.yylineno,loc:Mt,expected:_t})}if(E[0]instanceof Array&&E.length>1)throw new Error("Parse Error: multiple actions possible at state: "+T+", token: "+b);switch(E[0]){case 1:d.push(b),g.push(_.yytext),m.push(_.yylloc),d.push(E[1]),b=null,oe=_.yyleng,Ut=_.yytext,A=_.yylineno,Mt=_.yylloc;break;case 2:if(w=this.productions_[E[1]][1],I.$=g[g.length-w],I._$={first_line:m[m.length-(w||1)].first_line,last_line:m[m.length-1].last_line,first_column:m[m.length-(w||1)].first_column,last_column:m[m.length-1].last_column},As&&(I._$.range=[m[m.length-(w||1)].range[0],m[m.length-1].range[1]]),Ht=this.performAction.apply(I,[Ut,oe,A,C.yy,E[1],g,m].concat(bs)),typeof Ht<"u")return Ht;w&&(d=d.slice(0,-1*w*2),g=g.slice(0,-1*w),m=m.slice(0,-1*w)),d.push(this.productions_[E[1]][0]),g.push(I.$),m.push(I._$),le=y[d[d.length-2]][d[d.length-1]],d.push(le);break;case 3:return!0}}return!0}},p=function(){var u={EOF:1,parseError:function(c,d){if(this.yy.parser)this.yy.parser.parseError(c,d);else throw new Error(c)},setInput:function(h,c){return this.yy=c||this.yy||{},this._input=h,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var h=this._input[0];this.yytext+=h,this.yyleng++,this.offset++,this.match+=h,this.matched+=h;var c=h.match(/(?:\r\n?|\n).*/g);return c?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),h},unput:function(h){var c=h.length,d=h.split(/(?:\r\n?|\n)/g);this._input=h+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-c),this.offset-=c;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),d.length-1&&(this.yylineno-=d.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:d?(d.length===g.length?this.yylloc.first_column:0)+g[g.length-d.length].length-d[0].length:this.yylloc.first_column-c},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-c]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(h){this.unput(this.match.slice(h))},pastInput:function(){var h=this.matched.substr(0,this.matched.length-this.match.length);return(h.length>20?"...":"")+h.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var h=this.match;return h.length<20&&(h+=this._input.substr(0,20-h.length)),(h.substr(0,20)+(h.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var h=this.pastInput(),c=new Array(h.length+1).join("-");return h+this.upcomingInput()+`
`+c+"^"},test_match:function(h,c){var d,g,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),g=h[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+h[0].length},this.yytext+=h[0],this.match+=h[0],this.matches=h,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(h[0].length),this.matched+=h[0],d=this.performAction.call(this,this.yy,this,c,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),d)return d;if(this._backtrack){for(var y in m)this[y]=m[y];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var h,c,d,g;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),y=0;y<m.length;y++)if(d=this._input.match(this.rules[m[y]]),d&&(!c||d[0].length>c[0].length)){if(c=d,g=y,this.options.backtrack_lexer){if(h=this.test_match(d,m[y]),h!==!1)return h;if(this._backtrack){c=!1;continue}else return!1}else if(!this.options.flex)break}return c?(h=this.test_match(c,m[g]),h!==!1?h:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var c=this.next();return c||this.lex()},begin:function(c){this.conditionStack.push(c)},popState:function(){var c=this.conditionStack.length-1;return c>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(c){return c=this.conditionStack.length-1-Math.abs(c||0),c>=0?this.conditionStack[c]:"INITIAL"},pushState:function(c){this.begin(c)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(c,d,g,m){switch(g){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return u}();l.lexer=p;function f(){this.yy={}}return f.prototype=l,l.Parser=f,new f}();typeof di<"u"&&(r.parser=t,r.Parser=t.Parser,r.parse=function(){return t.parse.apply(t,arguments)})})(is);function D(r){return function(t,e){return{displayName:r,props:t,children:e||[]}}}var rs={Root:D("Root"),Concat:D("Concat"),Literal:D("Literal"),Splat:D("Splat"),Param:D("Param"),Optional:D("Optional")},ns=is.parser;ns.yy=rs;var pi=ns,fi=Object.keys(rs);function mi(r){return fi.forEach(function(t){if(typeof r[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:r}}var os=mi,gi=os,yi=/[\-{}\[\]+?.,\\\^$|#\s]/g;function as(r){this.captures=r.captures,this.re=r.re}as.prototype.match=function(r){var t=this.re.exec(r),e={};if(t)return this.captures.forEach(function(s,i){typeof t[i+1]>"u"?e[s]=void 0:e[s]=decodeURIComponent(t[i+1])}),e};var _i=gi({Concat:function(r){return r.children.reduce((function(t,e){var s=this.visit(e);return{re:t.re+s.re,captures:t.captures.concat(s.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(r){return{re:r.props.value.replace(yi,"\\$&"),captures:[]}},Splat:function(r){return{re:"([^?]*?)",captures:[r.props.name]}},Param:function(r){return{re:"([^\\/\\?]+)",captures:[r.props.name]}},Optional:function(r){var t=this.visit(r.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(r){var t=this.visit(r.children[0]);return new as({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),$i=_i,vi=os,bi=vi({Concat:function(r,t){var e=r.children.map((function(s){return this.visit(s,t)}).bind(this));return e.some(function(s){return s===!1})?!1:e.join("")},Literal:function(r){return decodeURI(r.props.value)},Splat:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Param:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Optional:function(r,t){var e=this.visit(r.children[0],t);return e||""},Root:function(r,t){t=t||{};var e=this.visit(r.children[0],t);return e?encodeURI(e):!1}}),Ai=bi,Ei=pi,wi=$i,Si=Ai;pt.prototype=Object.create(null);pt.prototype.match=function(r){var t=wi.visit(this.ast),e=t.match(r);return e||!1};pt.prototype.reverse=function(r){return Si.visit(this.ast,r)};function pt(r){var t;if(this?t=this:t=Object.create(pt.prototype),typeof r>"u")throw new Error("A route spec is required");return t.spec=r,t.ast=Ei.parse(r),t}var xi=pt,Pi=xi,ki=Pi;const Ci=ui(ki);var Ti=Object.defineProperty,ls=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Ti(t,e,i),i};class Qt extends F{constructor(t,e,s=""){super(),this._cases=[],this._fallback=()=>et`
      <h1>Not Found</h1>
    `,this._cases=t.map(i=>({...i,route:new Ci(i.path)})),this._historyObserver=new Et(this,e),this._authObserver=new Et(this,s)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),et`
      <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?(Os(this,"auth/redirect"),et`
              <h1>Redirecting for Login</h1>
            `):e.view(e.params||{}):et`
              <h1>Authenticating</h1>
            `;if("redirect"in e){const s=e.redirect;if(typeof s=="string")return this.redirect(s),et`
              <h1>Redirecting to ${s}…</h1>
            `}}return this._fallback({})})()}</main>
    `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:s}=t,i=new URLSearchParams(e),n=s+e;for(const o of this._cases){const a=o.route.match(n);if(a)return{...o,path:s,params:a,query:i}}}redirect(t){Ds(this,"history/redirect",{href:t})}}Qt.styles=qs`
    :host,
    main {
      display: contents;
    }
  `;ls([ss()],Qt.prototype,"_user");ls([ss()],Qt.prototype,"_match");const Oi=class hs extends HTMLElement{constructor(){if(super(),Ct(hs.template).attach(this),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};Oi.template=dt`
    <template>
      <slot name="actuator"><button>Menu</button></slot>
      <div id="panel">
        <slot></slot>
      </div>

      <style>
        :host {
          position: relative;
        }
        #is-shown {
          display: none;
        }
        #panel {
          display: none;

          position: absolute;
          right: 0;
          margin-top: var(--size-spacing-small);
          width: max-content;
          padding: var(--size-spacing-small);
          border-radius: var(--size-radius-small);
          background: var(--color-background-card);
          color: var(--color-text);
          box-shadow: var(--shadow-popover);
        }
        :host([open]) #panel {
          display: block;
        }
      </style>
    </template>
  `;const Ri=class cs extends HTMLElement{constructor(){super(),this._array=[],Ct(cs.template).attach(this),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(us("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const s=new Event("change",{bubbles:!0}),i=e.value,n=e.closest("label");if(n){const o=Array.from(this.children).indexOf(n);this._array[o]=i,this.dispatchEvent(s)}}}),this.addEventListener("click",t=>{ce(t,"button.add")?Bt(t,"input-array:add"):ce(t,"button.remove")&&Bt(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],Ui(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const s=Array.from(this.children).indexOf(e);this._array.splice(s,1),e.remove()}}};Ri.template=dt`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style>
          :host {
            display: contents;
          }
          ul {
            display: contents;
          }
          button.add {
            grid-column: input / input-end;
          }
          ::slotted(label) {
            display: contents;
          }
        </style>
      </button>
    </template>
  `;function Ui(r,t){t.replaceChildren(),r.forEach((e,s)=>t.append(us(e)))}function us(r,t){const e=r===void 0?"":`value="${r}"`;return dt`
    <label>
      <input ${e} />
      <button class="remove" type="button">Remove</button>
    </label>
  `}function Ni(r){return Object.entries(r).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var Mi=Object.defineProperty,Hi=Object.getOwnPropertyDescriptor,Li=(r,t,e,s)=>{for(var i=Hi(t,e),n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Mi(t,e,i),i};class Ii extends F{constructor(t){super(),this._pending=[],this._observer=new Et(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([s,i])=>{console.log("Dispatching queued event",i,s),s.dispatchEvent(i)}),e.setEffect(()=>{var s;if(console.log("View effect",this,e,(s=this._context)==null?void 0:s.value),this._context)console.log("requesting update"),this.requestUpdate();else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const s=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",s),e.dispatchEvent(s)):(console.log("Queueing message event",s),this._pending.push([e,s]))}ref(t){return this.model?this.model[t]:void 0}}Li([es()],Ii.prototype,"model");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vt=globalThis,Xt=vt.ShadowRoot&&(vt.ShadyCSS===void 0||vt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,te=Symbol(),xe=new WeakMap;let ds=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==te)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Xt&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=xe.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&xe.set(e,t))}return t}toString(){return this.cssText}};const ji=r=>new ds(typeof r=="string"?r:r+"",void 0,te),Q=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new ds(e,r,te)},Di=(r,t)=>{if(Xt)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=vt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Pe=Xt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ji(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:zi,defineProperty:Vi,getOwnPropertyDescriptor:Fi,getOwnPropertyNames:qi,getOwnPropertySymbols:Bi,getPrototypeOf:Wi}=Object,P=globalThis,ke=P.trustedTypes,Yi=ke?ke.emptyScript:"",Dt=P.reactiveElementPolyfillSupport,nt=(r,t)=>r,Pt={toAttribute(r,t){switch(t){case Boolean:r=r?Yi:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ee=(r,t)=>!zi(r,t),Ce={attribute:!0,type:String,converter:Pt,reflect:!1,useDefault:!1,hasChanged:ee};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),P.litPropertyMetadata??(P.litPropertyMetadata=new WeakMap);let V=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ce){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Vi(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=Fi(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const a=i==null?void 0:i.call(this);n==null||n.call(this,o),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ce}static _$Ei(){if(this.hasOwnProperty(nt("elementProperties")))return;const t=Wi(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(nt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(nt("properties"))){const e=this.properties,s=[...qi(e),...Bi(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Pe(i))}else t!==void 0&&e.push(Pe(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Di(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:Pt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n,o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const a=s.getPropertyOptions(i),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:Pt;this._$Em=i,this[i]=l.fromAttribute(e,a.type)??((o=this._$Ej)==null?void 0:o.get(i))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const n=this.constructor,o=this[t];if(s??(s=n.getPropertyOptions(t)),!((s.hasChanged??ee)(o,e)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:a}=o,l=this[n];a!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,o,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[nt("elementProperties")]=new Map,V[nt("finalized")]=new Map,Dt==null||Dt({ReactiveElement:V}),(P.reactiveElementVersions??(P.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ot=globalThis,kt=ot.trustedTypes,Te=kt?kt.createPolicy("lit-html",{createHTML:r=>r}):void 0,ps="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,fs="?"+x,Ji=`<${fs}>`,L=document,ht=()=>L.createComment(""),ct=r=>r===null||typeof r!="object"&&typeof r!="function",se=Array.isArray,Ki=r=>se(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",zt=`[ 	
\f\r]`,st=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Oe=/-->/g,Re=/>/g,R=RegExp(`>|${zt}(?:([^\\s"'>=/]+)(${zt}*=${zt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,Ne=/"/g,ms=/^(?:script|style|textarea|title)$/i,Zi=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),q=Zi(1),K=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),Me=new WeakMap,N=L.createTreeWalker(L,129);function gs(r,t){if(!se(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Te!==void 0?Te.createHTML(t):t}const Gi=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=st;for(let a=0;a<e;a++){const l=r[a];let p,f,u=-1,h=0;for(;h<l.length&&(o.lastIndex=h,f=o.exec(l),f!==null);)h=o.lastIndex,o===st?f[1]==="!--"?o=Oe:f[1]!==void 0?o=Re:f[2]!==void 0?(ms.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=R):f[3]!==void 0&&(o=R):o===R?f[0]===">"?(o=i??st,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?R:f[3]==='"'?Ne:Ue):o===Ne||o===Ue?o=R:o===Oe||o===Re?o=st:(o=R,i=void 0);const c=o===R&&r[a+1].startsWith("/>")?" ":"";n+=o===st?l+Ji:u>=0?(s.push(p),l.slice(0,u)+ps+l.slice(u)+x+c):l+x+(u===-2?a:c)}return[gs(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class ut{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const a=t.length-1,l=this.parts,[p,f]=Gi(t,e);if(this.el=ut.createElement(p,s),N.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=N.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(ps)){const h=f[o++],c=i.getAttribute(u).split(x),d=/([.?@])?(.*)/.exec(h);l.push({type:1,index:n,name:d[2],strings:c,ctor:d[1]==="."?Xi:d[1]==="?"?tr:d[1]==="@"?er:Ot}),i.removeAttribute(u)}else u.startsWith(x)&&(l.push({type:6,index:n}),i.removeAttribute(u));if(ms.test(i.tagName)){const u=i.textContent.split(x),h=u.length-1;if(h>0){i.textContent=kt?kt.emptyScript:"";for(let c=0;c<h;c++)i.append(u[c],ht()),N.nextNode(),l.push({type:2,index:++n});i.append(u[h],ht())}}}else if(i.nodeType===8)if(i.data===fs)l.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(x,u+1))!==-1;)l.push({type:7,index:n}),u+=x.length-1}n++}}static createElement(t,e){const s=L.createElement("template");return s.innerHTML=t,s}}function Z(r,t,e=r,s){var o,a;if(t===K)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=ct(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((a=i==null?void 0:i._$AO)==null||a.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=Z(r,i._$AS(r,t.values),i,s)),t}class Qi{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??L).importNode(e,!0);N.currentNode=i;let n=N.nextNode(),o=0,a=0,l=s[0];for(;l!==void 0;){if(o===l.index){let p;l.type===2?p=new ft(n,n.nextSibling,this,t):l.type===1?p=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(p=new sr(n,this,t)),this._$AV.push(p),l=s[++a]}o!==(l==null?void 0:l.index)&&(n=N.nextNode(),o++)}return N.currentNode=L,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class ft{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),ct(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==K&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ki(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==v&&ct(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=ut.createElement(gs(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new Qi(i,this),a=o.u(this.options);o.p(e),this.T(a),this._$AH=o}}_$AC(t){let e=Me.get(t.strings);return e===void 0&&Me.set(t.strings,e=new ut(t)),e}k(t){se(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new ft(this.O(ht()),this.O(ht()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Ot{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=Z(this,t,e,0),o=!ct(t)||t!==this._$AH&&t!==K,o&&(this._$AH=t);else{const a=t;let l,p;for(t=n[0],l=0;l<n.length-1;l++)p=Z(this,a[s+l],e,l),p===K&&(p=this._$AH[l]),o||(o=!ct(p)||p!==this._$AH[l]),p===v?t=v:t!==v&&(t+=(p??"")+n[l+1]),this._$AH[l]=p}o&&!i&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Xi extends Ot{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}class tr extends Ot{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}}class er extends Ot{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??v)===K)return;const s=this._$AH,i=t===v&&s!==v||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==v&&(s===v||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class sr{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const Vt=ot.litHtmlPolyfillSupport;Vt==null||Vt(ut,ft),(ot.litHtmlVersions??(ot.litHtmlVersions=[])).push("3.3.0");const ir=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new ft(t.insertBefore(ht(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=globalThis;class B extends V{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ir(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return K}}var He;B._$litElement$=!0,B.finalized=!0,(He=M.litElementHydrateSupport)==null||He.call(M,{LitElement:B});const Ft=M.litElementPolyfillSupport;Ft==null||Ft({LitElement:B});(M.litElementVersions??(M.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rr={attribute:!0,type:String,converter:Pt,reflect:!1,hasChanged:ee},nr=(r=rr,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,r)},init(a){return a!==void 0&&this.C(o,void 0,r,a),a}}}if(s==="setter"){const{name:o}=e;return function(a){const l=this[o];t.call(this,a),this.requestUpdate(o,l,r)}}throw Error("Unsupported decorator location: "+s)};function mt(r){return(t,e)=>typeof e=="object"?nr(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Rt(r){return mt({...r,state:!0,attribute:!1})}const or=Q`
    * {
        margin: 0;
        box-sizing: border-box;
    }
    img {
        max-width: 100%;
    }
    ul,
    menu {
        display: flex;
        flex-direction: column;
        list-style: none;
        padding: 0;
    }
`,ys={styles:or},ar=Q`
    :root {
        --color-background-header: var(--color-text-heading);
        --color-header-text: rgb(255, 255, 255);
        --color-background-page: rgb(255, 255, 255);
        --color-accent: rgb(99, 129, 177);
        --color-accent-inverted: var(--color-link);
        --color-link: var(--color-text-heading);
        --color-text: rgb(36, 34, 38);
        --color-text-heading: rgb(37, 86, 142);
        --background-color-stories-homepage: rgb(246, 246, 246);
        --episode-logo-gradient: linear-gradient(to right, #ff987aff, #f792c8ff, #b693fdff, #6dbde1);
    }

    body.dark-mode {
        --color-background-header: rgb(37, 86, 142);
        --color-header-text: rgb(255, 255, 255);
        --color-background-page: rgb(15, 36, 57);
        --color-accent: rgb(255, 255, 255);
        --color-accent-inverted: rgb(255, 255, 255);
        --color-link: rgb(255, 255, 255);
        --color-text: rgb(255, 255, 255);
        --color-text-heading: rgb(255, 255, 255);
        --background-color-stories-homepage: rgb(37, 86, 142);
        --episode-logo-gradient: linear-gradient(to right,#cc6f54, #c76a9f, #8a6bd6, #438eb4);
    }
`,_s={styles:ar},lr=Q`
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
`,$s={styles:lr};var hr=Object.defineProperty,gt=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&hr(t,e,i),i};const re=class re extends B{constructor(){super(...arguments),this.chapters=[],this.storyTitle="",this.chapterNumber=0}connectedCallback(){super.connectedCallback();const t=this.getAttribute("data-title"),e=this.getAttribute("chapter-number");t&&e&&(this.storyTitle=t,this.chapterNumber=Number(e),this.src&&this.hydrate(this.src,t,Number(e)))}render(){if(!this.selectedChapter)return q`<p>Loading chapter=...</p>`;const e=window.location.pathname.split("/")[2];return q`
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
                    ${this.selectedChapter.comments.map(s=>q`<p>${s}</p>`)}
                </section>
            </section>
        `}hydrate(t,e,s){fetch(t).then(i=>i.json()).then(i=>{console.log("Fetched stories:",i);const n=i.stories.find(a=>a.storyTitle===e);if(!n){console.error(`Story with title "${e}" not found.`);return}const o=n.chapters.find(a=>a.chapterNumber===s);if(!o){console.error(`Chapter ${s} not found in story "${e}".`);return}this.selectedChapter=o}).catch(i=>console.error("Failed to fetch stories:",i))}};re.styles=[ys.styles,$s.styles,_s.styles,Q`
        `];let k=re;gt([mt()],k.prototype,"src");gt([Rt()],k.prototype,"chapters");gt([Rt()],k.prototype,"selectedChapter");gt([mt({type:String})],k.prototype,"storyTitle");gt([mt({type:Number})],k.prototype,"chapterNumber");const cr=Q`
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
`,ur={styles:cr};var dr=Object.defineProperty,ie=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&dr(t,e,i),i};const ne=class ne extends B{constructor(){super(...arguments),this.stories=[],this.storyTitle=""}connectedCallback(){super.connectedCallback();const t=this.getAttribute("data-title");t&&(this.storyTitle=t,this.src&&this.hydrate(this.src,t))}render(){var i;const t=this.stories.find(n=>n.storyTitle===this.storyTitle);if(!t)return q`<p>Story not found.</p>`;const s=window.location.pathname.split("/")[2];return q`
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
                            ${(i=t.chapters)==null?void 0:i.map(n=>q`
                                        <li>
                                            <a href="/stories/${s}/chapters/${String(n.chapterNumber).padStart(2,"0")}.html">
                                                ${n.title}
                                            </a>
                                        </li>
                                    `)}
                        </ul>
                    </section>
                </div>
            </div>
        </section>
    `}hydrate(t,e){fetch(t).then(s=>s.json()).then(s=>{if(s&&Array.isArray(s.stories)){const i=s.stories.find(n=>n.storyTitle===e);i?this.stories=[i]:console.error(`Story with title "${e}" not found.`)}}).catch(s=>console.error("Failed to fetch stories:",s))}};ne.styles=[ys.styles,$s.styles,_s.styles,ur.styles,Q`
            h1 {
                font-size: 2rem;
            }
            
            ul {
                list-style-type: disc;
                margin-left: 1.5em;
                padding-left: 1em;
            }
        `];let G=ne;ie([mt()],G.prototype,"src");ie([Rt()],G.prototype,"stories");ie([Rt()],G.prototype,"storyTitle");Ni({"chapter-template":k,"story-template":G});
