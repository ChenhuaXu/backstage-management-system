webpackJsonp([2],{"8hXn":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("rVsN"),n=s.n(o),l={name:"nav-menu",data:function(){return{isCollapse:!1}},props:{menuList:{type:Array,default:function(){return[]}}},methods:{pageJump:function(e){e.url==="/"+this.$route.name?this.$emit("route-reload"):this.$router.push({path:e.url})}},watch:{isCollapse:function(e){this.$emit("menuCollapse",e)}}},a={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"nav-menu full-height pull-left p-y-t-2"},[s("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"background-color":"#e8eaec","unique-opened":!0,"collapse-transition":!1,"default-active":e.$route.path,collapse:e.isCollapse}},[e._l(e.menuList,function(t){return[t.children&&t.children.length>0?s("el-submenu",{key:t.id,attrs:{index:t.id}},[s("template",{slot:"title"},[s("i",{class:t.icon}),e._v(" "),s("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.label))])]),e._v(" "),t.children&&t.children.length>0?s("div",e._l(t.children,function(t){return s("el-menu-item",{key:t.id,attrs:{index:t.url},nativeOn:{click:function(s){e.pageJump(t)}}},[e._v("\n            "+e._s(t.label)+"\n          ")])}),1):e._e()],2):s("el-menu-item",{key:t.id,attrs:{index:t.url},nativeOn:{click:function(s){e.pageJump(t)}}},[s("i",{class:t.icon}),e._v(" "),s("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.label))])])]})],2),e._v(" "),s("a",{staticClass:"collapse-block text-center color-white",attrs:{href:"javascript:void(0)"},on:{click:function(t){e.isCollapse=!e.isCollapse}}},[e._v("||")])],1)},staticRenderFns:[]};var r=s("C7Lr")(l,a,!1,function(e){s("BZY5")},"data-v-3c0351a0",null).exports,i=s("Apws"),c={name:"index",components:{"nav-menu":r},data:function(){var e=this;return{routeIsReload:!0,isCollapse:!1,name:"",menuList:[],logoutModal:!1,resetPsdModal:!1,form:{oriPsd:"",newPsd:"",conPsd:""},rules:{oriPsd:[{required:!0,message:"请输入旧密码",trigger:"blur"}],newPsd:[{required:!0,message:"请输入新密码",trigger:"blur"},{validator:function(t,s,o){s===e.form.oriPsd?o(new Error("请输入不同于旧密码的新密码")):o()},trigger:"blur"}],conPsd:[{required:!0,message:"请再次输入新密码",trigger:"blur"},{validator:function(t,s,o){s!==e.form.newPsd?o(new Error("两次输入密码不一致")):o()},trigger:"blur"}]}}},methods:{handleCommand:function(e){switch(e){case"0":this.resetPsdModal=!0;break;case"1":this.logoutModal=!0;break;default:return!1}},logout:function(){var e=this;this.$store.dispatch("userLogout").then(function(){e.$router.replace("login")})},confirm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;i.a.updatePassord({}).then(function(e){e.resultCode,e.result;var s=e.msg;t.$message.info(s),t.resetPsdModal=!1,t.cancel()})})},cancel:function(){this.resetPsdModal=!1,this.form={oriPsd:"",newPsd:"",conPsd:""}},routeReload:function(){var e=this;this.routeIsReload=!1,this.$nextTick(function(){e.routeIsReload=!0})},menuCollapse:function(e){this.isCollapse=e}},mounted:function(){var e=this;return new n.a(function(t,s){i.a.userInfo().then(function(s){s.resultCode;var o=s.result;s.msg;e.$store.dispatch("saveUserInfo",o),t(o)}).catch(function(e){s(e)})}).then(function(t){e.name=t.name,e.menuList=t.menu}).catch(function(){e.$message.error("验证用户信息失败，请重新登录。"),e.$dispatch("userLogout").then(function(){e.$router.replace("login")})})}},u={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"index full"},[s("header",{staticClass:"full-width clearfix"},[s("strong",{staticClass:"size20"},[e._v("Backstage Management System")]),e._v(" "),s("section",{staticClass:"pull-right size16"},[s("el-dropdown",{staticClass:"pull-rught",on:{command:e.handleCommand}},[s("span",{staticClass:"el-dropdown-link"},[s("span",{staticClass:"size18 m-x-r-1 name pointer"},[e._v(e._s(e.name))]),e._v(" "),s("span",{staticClass:"head-container"},[s("img",{staticClass:"head-icon full",attrs:{src:"https://i.loli.net/2017/08/21/599a521472424.jpg"}})])]),e._v(" "),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",{attrs:{command:"0"}},[s("el-icon",{staticClass:"m-x-r-1",attrs:{type:"md-unlock"}}),e._v("修改密码\n          ")],1),e._v(" "),s("el-dropdown-item",{attrs:{command:"1",divided:""}},[s("el-icon",{staticClass:"m-x-r-1",attrs:{type:"md-log-out"}}),e._v("退出登录\n          ")],1)],1)],1)],1)]),e._v(" "),s("main",{staticClass:"full-width"},[s("nav-menu",{ref:"navMenu",attrs:{menuList:e.menuList},on:{"route-reload":e.routeReload,menuCollapse:e.menuCollapse}}),e._v(" "),s("article",{class:["router-container","p-2","full",{"article-collapse":e.isCollapse}]},[e.routeIsReload?s("router-view"):e._e()],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"提示",visible:e.logoutModal,width:"30%","close-on-click-modal":!1,"close-on-press-escape":!1,"show-close":!1},on:{"update:visible":function(t){e.logoutModal=t}}},[s("p",[e._v("确认退出登录？")]),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.logoutModal=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.logout}},[e._v("确 认")])],1)]),e._v(" "),s("el-dialog",{attrs:{title:"修改密码",visible:e.resetPsdModal,width:"30%","close-on-click-modal":!1,"close-on-press-escape":!1,"show-close":!1},on:{"update:visible":function(t){e.resetPsdModal=t}}},[s("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[s("el-form-item",{attrs:{label:"原密码",prop:"oriPsd"}},[s("el-input",{attrs:{type:"password"},model:{value:e.form.oriPsd,callback:function(t){e.$set(e.form,"oriPsd",t)},expression:"form.oriPsd"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"新密码",prop:"newPsd"}},[s("el-input",{attrs:{type:"password"},model:{value:e.form.newPsd,callback:function(t){e.$set(e.form,"newPsd",t)},expression:"form.newPsd"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"请确认",prop:"conPsd"}},[s("el-input",{attrs:{type:"password"},model:{value:e.form.conPsd,callback:function(t){e.$set(e.form,"conPsd",t)},expression:"form.conPsd"}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.cancel}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(t){e.confirm("form")}}},[e._v("确 认")])],1)],1)],1)},staticRenderFns:[]};var d=s("C7Lr")(c,u,!1,function(e){s("EhLw")},"data-v-77ba2542",null);t.default=d.exports},BZY5:function(e,t){},EhLw:function(e,t){}});