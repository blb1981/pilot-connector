"use strict";(self.webpackChunkpilot_connector=self.webpackChunkpilot_connector||[]).push([[209],{8209:(J,l,e)=>{e.r(l),e.d(l,{AuthModule:()=>T});var m=e(6019),i=e(9133),p=e(546),c=e(7814),t=e(3668),f=e(1687),r=e(888),d=e(8167),h=e(138),Z=e(86);function A(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1,"Please enter a valid email"),t.qZA())}function v(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1,"Please enter a valid password"),t.qZA())}function C(n,a){1&n&&(t.TgZ(0,"span"),t._uU(1,"Login"),t.qZA())}function L(n,a){1&n&&(t.TgZ(0,"span",12),t._uU(1," ...loading "),t.qZA())}const M=[{path:"login",component:(()=>{class n{constructor(o){this.authService=o,this.isLoading=!1}ngOnInit(){this.authStatusSubscription=this.authService.getAuthStatusListener().subscribe(o=>{this.isLoading=!1})}onSubmit(o){o.invalid||(this.isLoading=!0,this.authService.login(o.value.email,o.value.password))}ngOnDestroy(){this.authStatusSubscription.unsubscribe()}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(f.e))},n.\u0275cmp=t.Xpm({type:n,selectors:[["ng-component"]],decls:21,vars:7,consts:[[1,"card"],[1,"card-header"],[3,"submit"],["loginForm","ngForm"],["appearance","outline",1,"form-field"],["matNativeControl","","type","email","name","email","ngModel","","placeholder","Email address","required","","email","","autofocus","",3,"disabled"],["emailInput","ngModel"],[4,"ngIf"],["matNativeControl","","type","password","name","password","ngModel","","placeholder","Password","required","",3,"disabled"],["passwordInput","ngModel"],["mat-raised-button","","color","accent","type","submit",1,"submit-button",3,"disabled"],["class","button-spinner",4,"ngIf"],[1,"button-spinner"]],template:function(o,s){if(1&o){const u=t.EpF();t.TgZ(0,"mat-card",0),t.TgZ(1,"mat-card-header",1),t.TgZ(2,"mat-card-title"),t._uU(3," Login "),t.qZA(),t.qZA(),t.TgZ(4,"mat-card-content"),t.TgZ(5,"form",2,3),t.NdJ("submit",function(){t.CHM(u);const y=t.MAs(6);return s.onSubmit(y)}),t.TgZ(7,"mat-form-field",4),t.TgZ(8,"mat-label"),t._uU(9,"Email address"),t.qZA(),t._UZ(10,"input",5,6),t.YNc(12,A,2,0,"mat-error",7),t.qZA(),t.TgZ(13,"mat-form-field",4),t._UZ(14,"input",8,9),t.YNc(16,v,2,0,"mat-error",7),t.qZA(),t.TgZ(17,"mat-card-actions"),t.TgZ(18,"button",10),t.YNc(19,C,2,0,"span",7),t.YNc(20,L,2,0,"span",11),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()}if(2&o){const u=t.MAs(11),g=t.MAs(15);t.xp6(10),t.Q6J("disabled",s.isLoading),t.xp6(2),t.Q6J("ngIf",u.invalid),t.xp6(2),t.Q6J("disabled",s.isLoading),t.xp6(2),t.Q6J("ngIf",g.invalid),t.xp6(2),t.Q6J("disabled",s.isLoading),t.xp6(1),t.Q6J("ngIf",!s.isLoading),t.xp6(1),t.Q6J("ngIf",s.isLoading)}},directives:[r.a8,r.dk,r.n5,r.dn,i._Y,i.JL,i.F,d.KE,d.hX,h.Nt,i.Fj,i.JJ,i.On,i.Q7,i.on,m.O5,r.hq,Z.lW,d.TO],styles:[".card[_ngcontent-%COMP%]{width:75vw;margin:0 auto;text-align:center}.card-header[_ngcontent-%COMP%]{justify-content:center;margin-bottom:1rem}form[_ngcontent-%COMP%]{width:90%;margin:0 auto}.form-field[_ngcontent-%COMP%]{width:100%}.button-spinner[_ngcontent-%COMP%]{padding:1rem 0}.submit-button[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center}@media screen and (min-width: 600px){.card[_ngcontent-%COMP%]{max-width:20rem}}"]}),n})()}];let b=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[c.Bz.forChild(M)],c.Bz]}),n})(),T=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[i.u5,m.ez,p.h,b]]}),n})()}}]);