(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-75e871da"],{"00b4":function(t,e,s){"use strict";s("ac1f");var i=s("23e7"),a=s("da84"),r=s("c65b"),n=s("e330"),o=s("1626"),c=s("861d"),l=function(){var t=!1,e=/[ac]/;return e.exec=function(){return t=!0,/./.exec.apply(this,arguments)},!0===e.test("abc")&&t}(),m=a.Error,u=n(/./.test);i({target:"RegExp",proto:!0,forced:!l},{test:function(t){var e=this.exec;if(!o(e))return u(this,t);var s=r(e,this,t);if(null!==s&&!c(s))throw new m("RegExp exec method returned something other than an Object or null");return!!s}})},"4eed":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("form",{staticClass:"form-area d-flex flex-column align-items-center",on:{submit:function(e){return e.preventDefault(),e.stopPropagation(),t.handleSubmit.apply(null,arguments)}}},[s("svg",{staticClass:"logo",attrs:{width:"50",height:"50",viewBox:"0 0 50 50",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[s("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M30.6996 23.4709C30.6996 23.4709 23.2328 35.5781 17.1109 35.5781C6.40314 35.5781 16.3821 12.5132 24.1916 12.5132C29.641 12.5132 30.6996 23.4709 30.6996 23.4709Z",fill:"#FF6600"}}),s("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M39.5723 38.6972C37.4451 40.9607 34.8198 42.6976 31.9044 43.7701C28.989 44.8426 25.8639 45.2213 22.7767 44.8761C19.6895 44.5309 16.7252 43.4713 14.1188 41.7813C11.5125 40.0914 9.33573 37.8175 7.76123 35.1401C9.5314 37.5477 12.5338 39.1527 16.803 39.1527C27.3199 39.1527 33.2899 30.98 33.2899 30.98C33.2899 30.98 33.8062 37.4392 39.5593 38.6972H39.5723Z",fill:"#FF6600"}}),s("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M42.7223 15.7451C44.2963 18.7527 45.0781 22.1116 44.9939 25.505C44.9096 28.8984 43.9621 32.2144 42.2407 35.1401C40.8792 34.3764 39.8725 33.1082 39.4379 31.609L37.1558 24.7724L42.7223 15.7451Z",fill:"#FF6600"}}),s("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M25.0031 5.01737C30.0185 5.01403 34.8513 6.89881 38.5398 10.2967L34.7521 16.4088C33.3811 12.843 30.5957 9.2729 25.1767 9.2729C14.0784 9.2729 5.85231 21.3888 5.85231 28.9846C5.84986 29.9669 5.97528 30.9454 6.22543 31.8953C5.11558 28.8725 4.75205 25.6265 5.16572 22.4331C5.57938 19.2398 6.75802 16.1934 8.60147 13.5531C10.4449 10.9127 12.8987 8.75634 15.7542 7.26726C18.6097 5.77818 21.7826 5.00039 25.0031 5V5.01737Z",fill:"#FF6600"}})]),s("h1",{staticClass:"title"},[t._v("建立你的帳號")]),s("div",{staticClass:"form-row d-flex flex-column",class:{invalid:t.accountHint,"is-processing":t.isProcessing}},[s("label",{attrs:{for:"account"}},[t._v(" 帳號 ")]),s("input",{directives:[{name:"model",rawName:"v-model.trim.lazy",value:t.account,expression:"account",modifiers:{trim:!0,lazy:!0}}],attrs:{id:"account",type:"text",autocomplete:"username",disabled:t.isProcessing},domProps:{value:t.account},on:{change:function(e){t.account=e.target.value.trim()},blur:function(e){return t.$forceUpdate()}}}),s("transition",{attrs:{name:"hint"}},[t.accountHint?s("p",{staticClass:"error-hint"},[t._v(" "+t._s("empty"===t.accountHint?"請輸入帳號！":"account 已重複註冊！")+" ")]):t._e()])],1),s("div",{staticClass:"form-row d-flex flex-column",class:{invalid:t.nameHint,"is-processing":t.isProcessing}},[s("label",{attrs:{for:"name"}},[t._v("名稱")]),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.name,expression:"name",modifiers:{trim:!0}}],attrs:{id:"name",type:"text",autocomplete:"nickname",disabled:t.isProcessing},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),s("transition",{attrs:{name:"hint"}},[t.nameHint?s("p",{staticClass:"error-hint"},[t._v(" "+t._s("empty"===t.nameHint?"請輸入名稱！":"字數超出上限！")+" ")]):t._e()]),s("transition",{attrs:{name:"hint"}},[t.nameCount?s("p",[t._v(t._s(t.nameCount)+"/50")]):t._e()])],1),s("div",{staticClass:"form-row d-flex flex-column",class:{invalid:t.emailHint,"is-processing":t.isProcessing}},[s("label",{attrs:{for:"email"}},[t._v("Email")]),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.email,expression:"email",modifiers:{trim:!0}}],attrs:{id:"email",type:"email",autocomplete:"email",disabled:t.isProcessing},domProps:{value:t.email},on:{blur:[t.emailFormat,function(e){return t.$forceUpdate()}],input:function(e){e.target.composing||(t.email=e.target.value.trim())}}}),s("transition",{attrs:{name:"hint"}},[t.emailHint?s("p",{staticClass:"error-hint"},[t._v(" "+t._s("empty"===t.emailHint?"請輸入名稱！":"format"===t.emailHint?"Email 格式錯誤":"Email 已重複註冊！")+" ")]):t._e()]),s("transition",{attrs:{name:"hint"}},[t.emailCheck?s("div",{staticClass:"hint d-flex align-items-center"},[s("svg",{staticClass:"h-6 w-6",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"}},[s("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"}})]),t._v("  輸入的Email 符合格式 ")]):t._e()])],1),s("div",{staticClass:"form-row d-flex flex-column",class:{invalid:t.passwordHint,"is-processing":t.isProcessing}},[s("label",{attrs:{for:"password"}},[t._v("密碼")]),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.password,expression:"password",modifiers:{trim:!0}}],attrs:{id:"password",type:"password",autocomplete:"new-password",disabled:t.isProcessing},domProps:{value:t.password},on:{blur:[t.passwordLength,function(e){return t.$forceUpdate()}],input:function(e){e.target.composing||(t.password=e.target.value.trim())}}}),s("transition",{attrs:{name:"hint"}},[t.passwordHint?s("p",{staticClass:"error-hint"},[t._v("密碼至少要有４個字")]):t._e()])],1),s("div",{staticClass:"form-row d-flex flex-column",class:{invalid:t.checkHint,"is-processing":t.isProcessing}},[s("label",{attrs:{for:"passwordCheck"}},[t._v("密碼確認")]),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.passwordCheck,expression:"passwordCheck",modifiers:{trim:!0}}],attrs:{id:"passwordCheck",type:"password",autocomplete:"new-password",disabled:t.isProcessing},domProps:{value:t.passwordCheck},on:{blur:[t.checkPassword,function(e){return t.$forceUpdate()}],input:function(e){e.target.composing||(t.passwordCheck=e.target.value.trim())}}}),s("transition",{attrs:{name:"hint"}},[t.checkHint?s("p",{staticClass:"error-hint"},[t._v(" "+t._s("empty"===t.checkHint?"請再次輸入密碼":"密碼確認錯誤！")+" ")]):t._e()])],1),s("button",{staticClass:"register",attrs:{type:"submit",disabled:t.isProcessing}},[t.isProcessing?s("Spinner"):t._e(),t._v(" 註冊 ")],1),s("router-link",{staticClass:"cancel",attrs:{to:"/login"}},[t._v("取消")])],1)},a=[],r=s("1da1"),n=(s("96cf"),s("b0c0"),s("ac1f"),s("466d"),s("00b4"),s("d9e2"),s("2375")),o=s("7696"),c={components:{Spinner:n["a"]},data:function(){return{account:"",accountHint:!1,name:"",nameHint:!1,email:"",emailHint:!1,emailCheck:!1,password:"",passwordHint:!1,passwordCheck:"",checkHint:!1,isProcessing:!1}},computed:{nameCount:function(){return this.name.length>50?this.nameHint=!0:this.nameHint=!1,this.name.length}},watch:{account:function(t,e){t&&t!==e&&(this.accountHint=!1)},email:function(t,e){t!==e&&(this.emailHint=!1),t.match(/[^@\s]+@[^@\s]+\.[^@\s]+/)?this.emailCheck=!0:this.emailCheck=!1},password:function(t,e){t!==e&&(this.passwordHint=!1)},passwordCheck:function(t,e){t!==e&&(this.checkHint=!1)}},methods:{emailFormat:function(){var t=/[^@\s]+@[^@\s]+\.[^@\s]+/;this.email&&!t.test(this.email)?this.emailHint="format":this.emailHint=!1},passwordLength:function(){this.password&&this.password.length<4?this.passwordHint=!0:this.passwordHint=!1},checkPassword:function(){this.passwordCheck&&this.password!==this.passwordCheck?this.checkHint=!0:this.checkHint=!1},handleSubmit:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,t.account){e.next=5;break}return t.$bus.$emit("toast",{icon:"error",title:"請填入想註冊的帳號"}),t.accountHint="empty",e.abrupt("return");case 5:if(t.name){e.next=11;break}return t.$bus.$emit("toast",{icon:"error",title:"請填入名稱"}),t.nameHint="empty",e.abrupt("return");case 11:if(!(t.name.length>50)){e.next=15;break}return t.$bus.$emit("toast",{icon:"error",title:"名稱字數超出上限！"}),t.nameHint=!0,e.abrupt("return");case 15:if(t.email){e.next=19;break}return t.$bus.$emit("toast",{icon:"error",title:"請填入 Email"}),t.emailHint="empty",e.abrupt("return");case 19:if(t.password){e.next=25;break}return t.$bus.$emit("toast",{icon:"error",title:"請填入密碼"}),t.passwordHint=!0,e.abrupt("return");case 25:if(!(t.password.length<4)){e.next=29;break}return t.$bus.$emit("toast",{icon:"error",title:"密碼至少要有４個字"}),t.passwordHint="empty",e.abrupt("return");case 29:if(t.passwordCheck){e.next=35;break}return t.$bus.$emit("toast",{icon:"error",title:"請再次確認密碼"}),t.checkHint="empty",e.abrupt("return");case 35:if(t.password===t.passwordCheck){e.next=39;break}return t.$bus.$emit("toast",{icon:"error",title:"密碼與密碼確認輸入內容不同"}),t.checkHint=!0,e.abrupt("return");case 39:return t.isProcessing=!0,e.next=42,o["a"].signUp({account:t.account,name:t.name,email:t.email,password:t.password});case 42:if(s=e.sent,i=s.data,"success"===i.status){e.next=46;break}throw new Error(i.message);case 46:t.$bus.$emit("toast",{icon:"success",title:"註冊成功"}),t.$router.push({name:"user-login"}),e.next=55;break;case 50:e.prev=50,e.t0=e["catch"](0),console.log(e.t0),t.isProcessing=!1,e.t0.message.match(/account/i)&&e.t0.message.match(/必填/)?(t.$bus.$emit("toast",{icon:"error",title:"帳號為必填欄位"}),t.accountHint="empty"):e.t0.message.match(/account/i)&&e.t0.message.match(/重複/)?(t.$bus.$emit("toast",{icon:"error",title:"account 已重複註冊！"}),t.accountHint=!0):e.t0.message.match(/字數/)&&e.t0.message.match(/超出/)?(t.$bus.$emit("toast",{icon:"error",title:"名稱字數超出上限"}),t.nameHint=!0):e.t0.message.match(/email/i)&&e.t0.message.match(/必填/)?(t.$bus.$emit("toast",{icon:"error",title:"Email 為必填欄位"}),t.accountHint="empty"):e.t0.message.match(/email/i)&&e.t0.message.match(/重複/)?(t.$bus.$emit("toast",{icon:"error",title:"email 已重複註冊！"}),t.accountHint=!0):e.t0.message.match(/密碼至少/)?(t.$bus.$emit("toast",{icon:"error",title:"密碼至少要有４個字"}),t.passwordHint=!0):t.$bus.$emit("toast",{icon:"error",title:"".concat(e.t0.message)});case 55:case"end":return e.stop()}}),e,null,[[0,50]])})))()}}},l=c,m=(s("99ef"),s("2877")),u=Object(m["a"])(l,i,a,!1,null,"c6dd7ea6",null);e["default"]=u.exports},"81f4":function(t,e,s){},"99ef":function(t,e,s){"use strict";s("81f4")}}]);
//# sourceMappingURL=chunk-75e871da.984bbba4.js.map