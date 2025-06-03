import{f as p,x as m,r as d,i as f,c as u,n as l}from"./reset.css-BPlqXxCa.js";var b=Object.defineProperty,n=(h,s,t,o)=>{for(var e=void 0,a=h.length-1,c;a>=0;a--)(c=h[a])&&(e=c(s,t,e)||e);return e&&b(s,t,e),e};const i=class i extends p{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return m`
            <form
                    @change=${s=>this.handleChange(s)}
                    @submit=${s=>this.handleSubmit(s)}
            >
                <slot></slot>
                <slot name="button">
                    <button
                            ?disabled=${!this.canSubmit}
                            type="submit">
                        <slot name="button-label">Login</slot>
                    </button>
                </slot>
                <p class="error">${this.error}</p>
            </form>
        `}handleChange(s){const t=s.target,o=t==null?void 0:t.name,e=t==null?void 0:t.value,a=this.formData;switch(o){case"username":this.formData={...a,username:e};break;case"password":this.formData={...a,password:e};break}}handleSubmit(s){s.preventDefault(),this.canSubmit&&fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200&&t.status!==201)throw"Login failed";return t.json()}).then(t=>{const{token:o}=t,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:o,redirect:this.redirect}]});console.log("dispatching message",e),this.dispatchEvent(e)}).catch(t=>{console.log(t),this.error=t.toString()})}};i.styles=[d.styles,f`
            .error:not(:empty) {
                color: #9bda39;
                border: 1px solid;
            }
        `];let r=i;n([u()],r.prototype,"formData");n([l()],r.prototype,"api");n([l()],r.prototype,"redirect");n([u()],r.prototype,"error");export{r as L};
