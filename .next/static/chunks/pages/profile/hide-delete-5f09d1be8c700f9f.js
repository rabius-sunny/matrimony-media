(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[681],{808:function(e,t,r){"use strict";r.d(t,{ZP:function(){return R}});var n=r(7294),o=r(8878),i=r(275),s=r(9975);const l=(0,i.zo)("div",{transition:"$default",".nextui-collapse-title-content":{w:"100%","h1,h2,h3,h4,h5,h6,p,span,b":{margin:0}},".nextui-collapse-title-container":{d:"flex",jc:"space-between",ai:"center"},".nextui-collapse-title":{color:"$foreground"},".nextui-collapse-subtitle":{color:"$accents7",margin:0,"*":{margin:0}},".nextui-collapse-title-content-left":{mr:"$sm"},".nextui-collapse-title-content-left, .nextui-collapse-title-content-right":{d:"flex",ai:"center"},"@motion":{transition:"none",".nextui-collapse-title-content-right ":{svg:{transition:"none"}}},variants:{shadow:{true:{border:"none",boxShadow:"$md",br:"$lg",p:"0 $lg",bg:"$backgroundContrast"}},borderWeight:{light:{$$collapseBorderWidth:"$borderWeights$light"},normal:{$$collapseBorderWidth:"$borderWeights$normal"},bold:{$$collapseBorderWidth:"$borderWeights$bold"},extrabold:{$$collapseBorderWidth:"$borderWeights$extrabold"},black:{$$collapseBorderWidth:"$borderWeights$black"}},divider:{true:{borderTop:"$$collapseBorderWidth solid $border",borderBottom:"$$collapseBorderWidth solid $border"}},bordered:{true:{br:"$lg",p:"0 $lg",border:"$$collapseBorderWidth solid $border"}},animated:{true:{".nextui-collapse-title-content-right ":{svg:{transition:"transform 200ms ease"}}},false:{transition:"none"}},visible:{true:{".nextui-collapse-title-content-right ":{svg:{transform:"rotateZ(-90deg)"}}},false:{".nextui-collapse-title-content-right":{svg:{transform:"rotateZ(0deg)"}}}}},defaultVariants:{borderWeight:"light"}},s.xg),a=(0,i.zo)("div",{w:"100%",d:"block",ta:"left",bg:"transparent",border:"none",cursor:"pointer",outline:"none",padding:"$lg 0",variants:{disabled:{true:{cursor:"not-allowed",".nextui-collapse-title, .nextui-collapse-subtitle":{opacity:.5}}}}},s.BM),d=(0,i.zo)("div",{fontSize:"$base",lineHeight:"$lg",pb:"$lg","*:first-child":{mt:0},"*:last-child":{mb:0}}),c=(0,i.zo)("svg",{path:{stroke:"$accents7"}}),u=(0,i.zo)("div",{width:"auto",padding:"0 $sm","div + div":{borderTop:"none"},[`& ${l}:first-child`]:{borderTop:"none"},[`& ${l}:last-child`]:{borderBottom:"none"},variants:{borderWeight:{light:{$$collapseGroupBorderWidth:"$borderWeights$light"},normal:{$$collapseGroupBorderWidth:"$borderWeights$normal"},bold:{$$collapseGroupBorderWidth:"$borderWeights$bold"},extrabold:{$$collapseGroupBorderWidth:"$borderWeights$extrabold"},black:{$$collapseGroupBorderWidth:"$borderWeights$black"}},shadow:{true:{br:"$lg",border:"none",boxShadow:"$md",p:"0 $lg",bg:"$backgroundContrast"}},bordered:{true:{br:"$lg",p:"0 $lg",border:"$$collapseGroupBorderWidth solid $border"}},splitted:{true:{[`& ${l}`]:{br:"$lg",border:"none",bg:"$backgroundContrast",boxShadow:"$md",p:"0 $lg",margin:"$md 0"}}}},defaultVariants:{borderWeight:"light",shadow:!1,bordered:!1,splitted:!1}});var h=r(5893);const b=({...e})=>(0,h.jsx)(c,{role:"presentation",focusable:"false",className:"nextui-collapse-icon",width:"20",height:"20",fill:"none",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",...e,children:(0,h.jsx)("path",{d:"M15.5 19l-7-7 7-7",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})});b.toString=()=>".nextui-collapse-icon";var p=n.memo(b),x=r(88);const f=(e,t)=>{if(!e)return 0;const r=e.includes("px")?+e.split("px")[0]:e.includes("%")?+e.split("%")[0]*t*.01:e;return Number.isNaN(+r)?0:+r},g=e=>{if(!e||"undefined"==typeof window)return{width:0,height:0};const t=e.getBoundingClientRect(),{width:r,height:n}=window.getComputedStyle(e);return{width:f(`${r}`,t.width),height:f(`${n}`,t.height)}};var m=e=>{const[t,r]=(0,n.useState)({width:0,height:0}),o=()=>{const{width:t,height:n}=g(e.current);r({width:t,height:n})};return(0,n.useEffect)((()=>o()),[e.current]),[t,o]};const v=(0,i.zo)("div",{p:0,m:0,h:0,opacity:0,overflow:"hidden",variants:{expanded:{true:{opacity:1}}}});var $=(0,x.Z)((({isExpanded:e,delay:t,animated:r,css:o,children:i})=>{const[s,l]=(0,n.useState)(e?"auto":"0"),[a,d]=(0,n.useState)(e),c=(0,n.useRef)(null),u=(0,n.useRef)(),b=(0,n.useRef)(),p=(0,n.useRef)(),[x,f]=m(c);return(0,n.useEffect)((()=>l(`${x.height}px`)),[x.height]),(0,n.useEffect)((()=>{if(e!==a)return e||(f(),l(`${x.height}px`)),u.current=window.setTimeout((()=>{d(e),clearTimeout(u.current)}),30),e?p.current=window.setTimeout((()=>{l("auto"),clearTimeout(p.current)}),t):b.current=window.setTimeout((()=>{clearTimeout(b.current)}),t/2),()=>{clearTimeout(u.current),clearTimeout(b.current),clearTimeout(p.current)}}),[e]),(0,h.jsx)(v,{expanded:a,css:{height:a?s:"0",transition:r?`height ${t}ms ease 0ms,\n    opacity ${1.5*t}ms ease 0ms;`:"none",...o},children:(0,h.jsx)("div",{ref:c,className:"nextui-expand-content",children:i})})}),{isExpanded:!1,animated:!0,delay:200});const w=n.createContext({values:[]});var j=r(6391),y=r(7655),Z=r(2317),k=r(663),N=r(8944),W=r(1309);const C="nextui-collapse",B=({children:e,title:t,subtitle:r,expanded:i,shadow:s,className:c,divider:u,arrowIcon:b,showArrow:x,disabled:f,onChange:g,bordered:m,contentLeft:v,preventDefault:B,animated:S,borderWeight:E,index:T,...P})=>{const[R,_,M]=(0,j.Z)(i),{values:V,divider:q,animated:z,updateValues:G}=n.useContext(w),{isFocusVisible:H,focusProps:F}=(0,o.Fx)();t||(0,y.Z)('"title" is required.',"Collapse"),(0,n.useEffect)((()=>{R!==i&&_(i)}),[i]),(0,n.useEffect)((()=>{if(!V.length)return;const e=!!V.find((e=>e===T));_(e)}),[V.join(",")]);const I=(0,Z.Me)(),D=(0,Z.Me)(),L=(0,n.useMemo)((()=>x?b||(0,h.jsx)(p,{}):null),[b,x]),A=void 0===q?u:q,U=(0,n.useMemo)((()=>void 0===z?S:z),[z,S]),O=e=>{if(f)return;const t=!M.current;_(t),G&&G(T,t),g&&g(e,T,t)},{bindings:X}=(0,k.ZP)((e=>{O(e)}),[N.V.Enter,N.V.Space],{disableGlobalEvent:!0,preventDefault:B}),J=(0,n.useMemo)((()=>R?"open":"closed"),[R]);return(0,h.jsxs)(l,{tabIndex:-1,shadow:s,bordered:m,animated:U,divider:A,borderWeight:E,visible:R,"data-state":J,className:(0,W.Z)(c,C,`${C}--${J}`),...P,children:[(0,h.jsx)(a,{role:"button",tabIndex:f?-1:0,id:I,className:`${C}-view`,"data-state":J,disabled:f,"aria-disabled":f,"aria-expanded":R,"aria-controls":D,isFocusVisible:H,onClick:O,...F,...X,children:(0,h.jsxs)("div",{className:(0,W.Z)(`${C}-title-container`),children:[v&&(0,h.jsx)("div",{className:`${C}-title-content-left`,children:v}),(0,h.jsxs)("div",{className:`${C}-title-content`,children:[n.isValidElement(t)?t:(0,h.jsx)("h3",{className:`${C}-title`,children:t}),r&&(0,h.jsx)("div",{className:`${C}-subtitle`,children:r})]}),(0,h.jsx)("div",{className:`${C}-title-content-right`,children:L})]})}),(0,h.jsx)($,{isExpanded:R,animated:U,children:(0,h.jsx)(d,{role:"region",tabIndex:-1,id:D,"aria-labelledby":I,className:`${C}-content`,children:e})})]})};B.toString=()=>".nextui-collapse";var S=(0,x.Z)(B,{shadow:!1,divider:!0,bordered:!1,showArrow:!0,animated:!0,disabled:!1,preventDefault:!0,expanded:!1}),E=r(9644);const T=({children:e,accordion:t,animated:r,divider:o,onChange:i,...s})=>{const[l,a,d]=(0,j.Z)([]),c=(e,r)=>{const n=d.current.find((t=>t===e));if(i&&i(e,r),t)return a(r?[e]:[]);if(r){if(n)return;return a([...d.current,e])}a(d.current.filter((t=>t!==e)))},b=(0,n.useMemo)((()=>({values:l,updateValues:c,divider:o,animated:r})),[l.join(",")]),p=(0,n.useMemo)((()=>(0,E.CV)(e,[S])),[e]);return(0,h.jsx)(w.Provider,{value:b,children:(0,h.jsx)(u,{...s,children:p})})};T.toString=()=>".nextui-collapse-group";var P=(0,x.Z)(T,{accordion:!0});S.Group=P;var R=S},6476:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile/hide-delete",function(){return r(1690)}])},6303:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var n=r(5893);function o(e){var t=e.heading;return(0,n.jsx)("h1",{className:"coloredHeader h-40 text-center text-white bg-primary text-3xl md:text-5xl flex justify-center items-center",children:t})}},8127:function(e,t,r){"use strict";r.d(t,{Z:function(){return l}});var n=r(5893),o=(r(7294),r(6235)),i=r(5517),s=r(8886);function l(e){var t=e.visible,r=e.onClose,l=e.onTask,a=e.header,d=e.body,c=e.btn,u=e.color,h=e.scroll,b=e.bodyColor,p=e.preventClose,x=void 0===p||p;return(0,n.jsxs)(o.ZP,{css:{paddingBottom:0,cursor:"auto"},closeButton:!0,blur:!0,scroll:h,preventClose:x,"aria-labelledby":"modal-title",open:t,onClose:r,children:[(0,n.jsx)(o.ZP.Header,{children:(0,n.jsx)(i.Z,{b:!0,color:b,size:18,children:a})}),(0,n.jsx)(o.ZP.Body,{children:d}),(0,n.jsx)(o.ZP.Footer,{children:c&&(0,n.jsx)(s.ZP,{bordered:!0,auto:!0,color:u,onPress:l||r,children:c})})]})}},1690:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return h}});var n=r(5893),o=r(808),i=r(6303),s=r(8127),l=r(9008),a=r.n(l),d=r(1163),c=r(7294),u=r(6627);function h(){var e=(0,d.useRouter)(),t=(0,c.useState)(""),r=t[0],l=t[1],h=(0,c.useState)(!1),b=h[0],p=h[1],x=(0,c.useState)(!1),f=x[0],g=x[1],m=(0,c.useState)(1),v=m[0],$=m[1],w=function(e){switch(e){case 1:default:return"hide";case 2:return"delete"}};return(0,n.jsxs)("div",{children:[(0,n.jsx)(a(),{children:(0,n.jsx)("title",{children:"Delete/Hide Request"})}),(0,n.jsx)(i.Z,{heading:"Delete / Hide Request"}),(0,n.jsx)(s.Z,{visible:b,onClose:function(){p(!1),e.push("/")},preventClose:!1,body:"\u0986\u09aa\u09a8\u09be\u09b0 \u09b0\u09bf\u0995\u09c1\u09df\u09c7\u09b8\u09cd\u099f\u099f\u09bf \u0997\u09c3\u09b9\u09c0\u09a4 \u09b9\u09df\u09c7\u099b\u09c7, \u09b6\u09c0\u0998\u09cd\u09b0\u0987 SMS \u098f\u09b0 \u09ae\u09be\u09a7\u09cd\u09af\u09ae\u09c7 \u09ab\u09b2\u09be\u09ab\u09b2 \u09aa\u09c7\u09df\u09c7 \u09af\u09be\u09ac\u09c7\u09a8 \u0987\u09a8\u09b6\u09be \u0986\u09b2\u09cd\u09b2\u09be\u09b9!",btn:"ok",blur:!0}),(0,n.jsx)(s.Z,{visible:f,onClose:function(){return g(!1)},preventClose:!1,body:(0,n.jsx)("div",{className:"text-xl text-primary font-bold",children:"\u0987\u09b0\u09b0 \u09b9\u09df\u09c7\u099b\u09c7, \u0986\u09ac\u09be\u09b0 \u099a\u09c7\u09b7\u09cd\u099f\u09be \u0995\u09b0\u09c1\u09a8"}),btn:"ok",color:"error",blur:!0}),(0,n.jsx)("div",{className:"container",style:{maxWidth:"600px",minHeight:"60vh"},children:(0,n.jsxs)("div",{className:"my-8",children:[(0,n.jsx)("p",{className:"my-4 font-bold text-xl",children:"\u0986\u09aa\u09a8\u09be\u09b0 \u09ac\u09be\u09df\u09cb\u09a1\u09be\u099f\u09be \u09a1\u09bf\u09b2\u09bf\u099f / \u09b9\u09be\u0987\u09a1 \u0995\u09b0\u09a4\u09c7 \u09a8\u09bf\u09ae\u09cd\u09a8\u09cb\u0995\u09cd\u09a4 \u09ab\u09b0\u09cd\u09ae\u099f\u09bf \u09aa\u09c2\u09b0\u09a3\u09c7\u09b0 \u09ae\u09be\u09a7\u09cd\u09af\u09ae\u09c7 \u0986\u09ac\u09c7\u09a6\u09a8 \u0995\u09b0\u09c1\u09a8\u0964"}),(0,n.jsx)("p",{className:"my-4 font-bold text-xl",children:"\u098f\u0996\u09be\u09a8\u09c7 \u09a6\u09c1\u0987\u099f\u09bf \u0985\u09aa\u09b6\u09a8 \u0986\u099b\u09c7\u0964"}),(0,n.jsxs)("p",{className:"my-4",children:["\u09e7) \u09ac\u09be\u09df\u09cb\u09a1\u09be\u099f\u09be \u201c\u09a1\u09bf\u09b2\u09bf\u099f\u201d \u098f\u09b0 \u09ae\u09be\u09a7\u09cd\u09af\u09ae\u09c7 \u0986\u09aa\u09a8\u09be\u09b0 \u09ac\u09be\u09df\u09cb\u09a1\u09be\u099f\u09be \u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3\u09ad\u09be\u09ac\u09c7 \u0993\u09df\u09c7\u09ac\u09b8\u09be\u0987\u099f \u09a5\u09c7\u0995\u09c7 \u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7\u09a8\u0964 \u09af\u09be \u09aa\u09b0\u09ac\u09b0\u09cd\u09a4\u09c0\u09a4\u09c7 \u09ab\u09bf\u09b0\u09bf\u09df\u09c7 \u0986\u09a8\u09be \u09b8\u09ae\u09cd\u09ad\u09ac \u09a8\u09be\u0964",(0,n.jsx)("br",{}),"\u09e8) \u09ac\u09be\u09df\u09cb\u09a1\u09be\u099f\u09be \u201c\u09b9\u09be\u0987\u09a1\u201d \u098f\u09b0 \u09ae\u09be\u09a7\u09cd\u09af\u09ae\u09c7 \u0986\u09aa\u09a8\u09be\u09b0 \u09ac\u09be\u09df\u09cb\u09a1\u09be\u099f\u09be\u099f\u09bf \u09b8\u09be\u09b0\u09cd\u099a \u09ab\u09bf\u09b2\u09cd\u099f\u09be\u09b0 \u09a5\u09c7\u0995\u09c7 \u0997\u09cb\u09aa\u09a8\u09c7 \u09b0\u09be\u0996\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7\u09a8\u0964 \u09aa\u09b0\u09ac\u09b0\u09cd\u09a4\u09c0\u09a4\u09c7 \u09af\u09c7 \u09af\u09c7\u0995\u09cb\u09a8 \u09b8\u09ae\u09df \u09aa\u09c1\u09a8\u09b0\u09be\u09df \u09aa\u09be\u09ac\u09cd\u09b2\u09bf\u09b6 \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7\u09a8 \u0987\u09a8 \u09b6\u09be \u0986\u09b2\u09cd\u09b2\u09be\u09b9\u0964"]}),(0,n.jsxs)("div",{className:"my-4",children:[(0,n.jsxs)(o.ZP.Group,{onChange:function(e){l(""),$(e)},children:[(0,n.jsxs)(o.ZP,{expanded:!0,title:"\u09b9\u09be\u0987\u09a1 \u0995\u09b0\u09c1\u09a8",className:"font-bold text-2xl",children:[(0,n.jsx)("label",{className:"text-gray-600 font-bold",children:"\u09b9\u09be\u0987\u09a1 \u0995\u09b0\u09be\u09b0 \u0995\u09be\u09b0\u09a3"}),(0,n.jsx)("textarea",{value:r,rows:5,onChange:function(e){return l(e.target.value)},className:"w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500"})]}),(0,n.jsxs)(o.ZP,{title:"\u09a1\u09bf\u09b2\u09bf\u099f \u0995\u09b0\u09c1\u09a8",className:"font-bold text-2xl",children:[(0,n.jsx)("label",{className:"text-gray-600 font-bold",children:"\u09a1\u09bf\u09b2\u09bf\u099f \u0995\u09b0\u09be\u09b0 \u0995\u09be\u09b0\u09a3"}),(0,n.jsx)("textarea",{value:r,rows:5,onChange:function(e){return l(e.target.value)},className:"w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500"})]})]}),(0,n.jsx)("div",{className:"my-4",children:(0,n.jsx)("button",{onClick:function(e){""===r?alert("Enter your reason"):u.Z.deleteHideRequest({reason:r,type:w(v)}).then((function(e){"ok"===e.message&&p(!0)})).catch((function(e){return g(!0)}))},className:"w-full rounded-md bg-primary px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-primary focus:ring-2 focus:ring-red-800",children:"Submit"})})]})]})})]})}},6175:function(e,t,r){"use strict";var n=r(6042),o=r(9396),i=r(9669),s=r.n(i)().create({baseURL:"https://matrimony-media.herokuapp.com",timeout:1e4});s.interceptors.request.use((function(e){return(0,o.Z)((0,n.Z)({},e),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}})}));var l=function(e){return e.data},a={get:function(e){return s.get(e).then(l)},post:function(e,t){return s.post(e,t).then(l)},patch:function(e,t){return s.patch(e,t).then(l)},delete:function(e){return s.delete(e).then(l)}};t.Z=a},6627:function(e,t,r){"use strict";var n=r(1438),o=r(2951),i=r(6175),s=function(){function e(){(0,n.Z)(this,e)}return(0,o.Z)(e,[{key:"signIn",value:function(e){return i.Z.post("/sign-in",e)}},{key:"getUser",value:function(){return i.Z.get("/get-user")}},{key:"getType",value:function(){return i.Z.get("/get-type")}},{key:"getFavorites",value:function(){return i.Z.get("/favorites")}},{key:"checkFavorite",value:function(e){return i.Z.get("/is-favorite/".concat(e))}},{key:"addToBookmark",value:function(e){return i.Z.get("/post-favorites/".concat(e))}},{key:"removeBookmark",value:function(e){return i.Z.delete("/delete-favorites/".concat(e))}},{key:"getFeatureds",value:function(){return i.Z.get("/get-featureds")}},{key:"makeRequest",value:function(e){return i.Z.post("/request-info",e)}},{key:"deleteHideRequest",value:function(e){return i.Z.post("/delete-hide-request",e)}},{key:"hideByUser",value:function(){return i.Z.get("/hide-by-user")}}]),e}();t.Z=new s}},function(e){e.O(0,[917,164,774,888,179],(function(){return t=6476,e(e.s=t);var t}));var t=e.O();_N_E=t}]);