(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[312],{2839:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/sign-in",function(){return n(75)}])},75:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var r=n(7568),a=n(4924),s=n(6042),o=n(9396),i=n(655),u=n(5893),c=n(5985),l=n(9008),d=n.n(l),h=n(7702),f=(0,n(5503).ZF)({apiKey:"AIzaSyDN51CHjAvGeHR22bvjfyNAiaZGV9hP-Xk",authDomain:"matrimony-media.firebaseapp.com",projectId:"matrimony-media",storageBucket:"matrimony-media.appspot.com",messagingSenderId:"168930683447",appId:"1:168930683447:web:32cd640ef0712a4ae22db2"}),m=n(1163),p=n(7294),g=n(6627),x=n(6175);function y(e,t){return Math.ceil(Math.random()*(t-e)+e)}var v=n(7501);function b(){var e=function(){var e=(0,p.useState)(null),t=e[0],n=e[1];return(0,p.useEffect)((function(){n(null),x.Z.get("".concat("https://matrimony-media.herokuapp.com","/get-uids")).then((function(e){n(e.uIds)})).catch((function(e){n(null)}))}),[]),{uIds:t}}().uIds,t=(0,p.useState)({phone:"",otp:""}),n=t[0],l=t[1],b=(0,p.useState)(null),k=b[0],j=b[1],w=(0,p.useState)(!1),N=w[0],Z=w[1],_=(0,p.useState)(null),I=_[0],S=_[1],X=(0,p.useState)(!1),P=X[0],E=X[1],q=(0,m.useRouter)(),T=(0,c.Z)();(0,p.useEffect)((function(){T&&q.push("/")}),[T]),(0,p.useEffect)((function(){var t=y(10100,99999);if(j(t),e)for(;e.includes(k);)j(y(10100,99999)),console.log("exists, trying again!")}),[e]);var C=function(){var e=(0,r.Z)((function(e){var t,r;return(0,i.__generator)(this,(function(e){return t=(0,h.v0)(f),(r=new h.lI("recaptcha-container",{},t)).render(),[2,(0,h.$g)(t,"+88"+n.phone.split(" ").join(""),r)]}))}));return function(t){return e.apply(this,arguments)}}(),O=function(){var e=(0,r.Z)((function(e){var t,r;return(0,i.__generator)(this,(function(a){switch(a.label){case 0:return Z(!0),e.preventDefault(),isNaN(Number(n.phone))||n.phone.length<11||n.phone.length>14?(alert("Please enter a valid phone number"),Z(!1),[3,4]):[3,1];case 1:return a.trys.push([1,3,,4]),[4,C()];case 2:return t=a.sent(),S(t),E(!0),Z(!1),[3,4];case 3:return r=a.sent(),console.log("otp error",r),Z(!1),[3,4];case 4:return[2]}}))}));return function(t){return e.apply(this,arguments)}}(),B=function(){var e=(0,r.Z)((function(e){return(0,i.__generator)(this,(function(t){switch(t.label){case 0:Z(!0),e.preventDefault(),t.label=1;case 1:return t.trys.push([1,3,,4]),[4,I.confirm(n.otp)];case 2:return t.sent(),D(e),[3,4];case 3:return t.sent(),alert("wrong otp"),Z(!1),[3,4];case 4:return[2]}}))}));return function(t){return e.apply(this,arguments)}}(),D=function(){var e=(0,r.Z)((function(e){var t,r;return(0,i.__generator)(this,(function(a){switch(a.label){case 0:e.preventDefault(),a.label=1;case 1:return a.trys.push([1,3,,4]),[4,g.Z.signIn({phone:n.phone.split(" ").join(""),uId:k})];case 2:return t=a.sent(),localStorage.setItem("token",t.token),localStorage.setItem("id",t.id),localStorage.removeItem("bookmarks"),q.push("/profile/edit/primary"),[3,4];case 3:return r=a.sent(),alert(r.response.data.message),window.location.reload(),[3,4];case 4:return[2]}}))}));return function(t){return e.apply(this,arguments)}}(),F=function(e){return l((0,o.Z)((0,s.Z)({},n),(0,a.Z)({},e.target.name,e.target.value)))};return(0,u.jsxs)("div",{className:"bg-secondary",children:[(0,u.jsx)(d(),{children:(0,u.jsx)("title",{children:"\u09b8\u09be\u0987\u09a8 \u0987\u09a8 | \u099c\u09be\u09a8\u09cd\u09a8\u09be\u09a4\u09bf \u099c\u09c1\u099f\u09bf.COM"})}),(0,u.jsxs)("div",{className:"flex h-screen justify-center",children:[(0,u.jsx)("div",{className:"hidden bg-cover lg:block lg:w-2/3",style:{backgroundImage:"url('/images/homebg2.jpg')"},children:(0,u.jsx)("div",{className:"flex h-full items-center bg-gray-900 bg-opacity-40 px-20",children:(0,u.jsxs)("div",{children:[(0,u.jsxs)("h2",{className:"text-6xl font-bold text-white",children:[(0,u.jsx)("span",{className:"text-primary",children:"\u099c\u09be\u09a8\u09cd\u09a8\u09be\u09a4\u09bf"})," ",(0,u.jsx)("span",{className:"text-secondary",children:"\u099c\u09c1\u099f\u09bf"})]}),(0,u.jsx)("p",{className:"mt-3 text-xl max-w-xl text-white",children:"\u09a6\u09cd\u09ac\u09c0\u09a8\u09a6\u09be\u09b0 \u09aa\u09be\u09a4\u09cd\u09b0-\u09aa\u09be\u09a4\u09cd\u09b0\u09c0 \u0996\u09cb\u0981\u099c\u09be\u09b0 \u098f\u0995\u099f\u09bf \u09ac\u09bf\u09b6\u09cd\u09ac\u09b8\u09cd\u09a4 \u09aa\u09cd\u09b0\u09a4\u09bf\u09b7\u09cd\u09a0\u09be\u09a8"})]})})}),(0,u.jsx)("div",{className:"mx-auto bg-secondary flex w-full max-w-md items-center px-6 lg:w-2/6",children:(0,u.jsxs)("div",{className:"flex-1",children:[(0,u.jsxs)("div",{className:"text-center",children:[(0,u.jsx)("h2",{className:"text-center text-4xl md:text-6xl font-bold text-primary dark:text-white",children:"\u099c\u09be\u09a8\u09cd\u09a8\u09be\u09a4\u09bf \u099c\u09c1\u099f\u09bf"}),(0,u.jsx)("p",{className:"mt-5 text-lg text-white dark:text-gray-300",children:"\u0986\u09aa\u09a8\u09be\u09b0 \u09ab\u09cb\u09a8 \u09a8\u09ae\u09cd\u09ac\u09b0 \u09a6\u09bf\u09df\u09c7 \u09aa\u09cd\u09b0\u09ac\u09c7\u09b6 \u0995\u09b0\u09c1\u09a8"})]}),(0,u.jsxs)("div",{className:"mt-8",children:[!P&&(0,u.jsxs)("form",{onSubmit:O,children:[(0,u.jsxs)("div",{className:"mt-6",children:[(0,u.jsx)("label",{htmlFor:"phone",className:"text-sm text-white dark:text-gray-200",children:"Phone"}),(0,u.jsx)("input",{type:"number",placeholder:"01XXXXXXXXX",name:"phone",id:"phone",onChange:F,required:!0,className:"mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-secondary font-semibold placeholder-gray-400 focus:outline-none focus:ring focus:ring-dark dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600"})]}),(0,u.jsx)("div",{className:"my-3",children:(0,u.jsx)("div",{id:"recaptcha-container"})}),(0,u.jsx)("div",{className:"mt-6",children:(0,u.jsx)("button",{className:"".concat(N&&"pointer-events-none"," w-full bg-primary text-white hover:bg-dark transform rounded-md px-4 py-2 tracking-wide transition-colors duration-200 focus:outline-none focus:ring focus:ring-dark"),children:N?(0,u.jsx)(v.ZP,{color:"white",size:"sm"}):"OTP \u0995\u09cb\u09a1 \u09a8\u09bf\u09a8"})})]}),P&&(0,u.jsxs)("div",{className:"text-center",children:[(0,u.jsx)("h1",{className:"text-3xl text-white",children:"OTP \u0995\u09cb\u09a1 \u09a6\u09bf\u09a8"}),(0,u.jsxs)("form",{onSubmit:B,children:[(0,u.jsx)("input",{type:"number",name:"otp",onChange:F,required:!0,className:"mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"}),(0,u.jsx)("div",{className:"mt-6",children:(0,u.jsx)("button",{type:"submit",className:"".concat(N&&"pointer-events-none"," w-full bg-primary hover:bg-dark transform rounded-md bg-blue-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"),children:N?(0,u.jsx)(v.ZP,{color:"white",size:"sm"}):"OTP \u09a6\u09bf\u09df\u09c7 \u09aa\u09cd\u09b0\u09ac\u09c7\u09b6 \u0995\u09b0\u09c1\u09a8"})})]})]})]})]})})]})]})}},6175:function(e,t,n){"use strict";var r=n(6042),a=n(9396),s=n(9669),o=n.n(s)().create({baseURL:"https://matrimony-media.herokuapp.com",timeout:1e4});o.interceptors.request.use((function(e){return(0,a.Z)((0,r.Z)({},e),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}})}));var i=function(e){return e.data},u={get:function(e){return o.get(e).then(i)},post:function(e,t){return o.post(e,t).then(i)},patch:function(e,t){return o.patch(e,t).then(i)},delete:function(e){return o.delete(e).then(i)}};t.Z=u},6627:function(e,t,n){"use strict";var r=n(1438),a=n(2951),s=n(6175),o=function(){function e(){(0,r.Z)(this,e)}return(0,a.Z)(e,[{key:"signIn",value:function(e){return s.Z.post("/sign-in",e)}},{key:"getUser",value:function(){return s.Z.get("/get-user")}},{key:"getType",value:function(){return s.Z.get("/get-type")}},{key:"getFavorites",value:function(){return s.Z.get("/favorites")}},{key:"checkFavorite",value:function(e){return s.Z.get("/is-favorite/".concat(e))}},{key:"addToBookmark",value:function(e){return s.Z.get("/post-favorites/".concat(e))}},{key:"removeBookmark",value:function(e){return s.Z.delete("/delete-favorites/".concat(e))}},{key:"getFeatureds",value:function(){return s.Z.get("/get-featureds")}},{key:"makeRequest",value:function(e){return s.Z.post("/request-info",e)}},{key:"deleteHideRequest",value:function(e){return s.Z.post("/delete-hide-request",e)}},{key:"hideByUser",value:function(){return s.Z.get("/hide-by-user")}},{key:"postMessage",value:function(e){return s.Z.post("/post-message",e)}}]),e}();t.Z=new o}},function(e){e.O(0,[301,917,50,774,888,179],(function(){return t=2839,e(e.s=t);var t}));var t=e.O();_N_E=t}]);