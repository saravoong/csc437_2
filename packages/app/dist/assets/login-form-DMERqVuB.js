import{f as u,x as h,r as f,i as p,c as d,n as i}from"./reset.css-BPlqXxCa.js";var b=Object.defineProperty,a=(c,r,t,n)=>{for(var e=void 0,s=c.length-1,m;s>=0;s--)(m=c[s])&&(e=m(r,t,e)||e);return e&&b(r,t,e),e};const l=class l extends u{constructor(){super(...arguments),this.formData={},this.redirect="/",this.buttonLabel="Login"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return h`
            <form
                    @input=${r=>this.handleChange(r)}
                    @submit=${r=>this.handleSubmit(r)}
            >
                <slot></slot>
                <slot name="button">
                    <button
                            ?disabled=${!this.canSubmit}
                            type="submit">
                        ${this.buttonLabel}
                    </button>
                </slot>
                <p class="error">${this.error}</p>
            </form>
        `}handleChange(r){const t=r.target,n=t==null?void 0:t.name,e=t==null?void 0:t.value,s=this.formData;switch(n){case"username":this.formData={...s,username:e};break;case"password":this.formData={...s,password:e};break}}handleSubmit(r){r.preventDefault(),this.canSubmit&&fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200&&t.status!==201)throw"Login failed";return t.json()}).then(t=>{const{token:n}=t,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:n,redirect:this.redirect}]});console.log("dispatching message",e),this.dispatchEvent(e)}).catch(t=>{console.log(t),this.error=t.toString()})}};l.styles=[f.styles,p`
            .error:not(:empty) {
                color: #da3939;
                border: 1px solid;
            }

            form {
                display: flex;
                flex-direction: column;
                align-items: stretch;
            }

            login-form label {
                display: flex;
                flex-direction: column;
                font-weight: 600;
                font-size: 0.95rem;
                margin-bottom: 0.5rem;
            }

            login-form input {
                padding: 0.6rem 0.8rem;
                margin-top: 0.3rem;
                border: 1px solid #ccc;
                border-radius: 0.5rem;
                font-size: 1rem;
                font-family: inherit;
                width: 100%;
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

            button:disabled {
                background-color: #ccc;
                cursor: not-allowed;
                transform: none;
            }
        `];let o=l;a([d()],o.prototype,"formData");a([i()],o.prototype,"api");a([i()],o.prototype,"redirect");a([d()],o.prototype,"error");a([i({type:String})],o.prototype,"buttonLabel");export{o as L};
