_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[15],{"3WHP":function(e,s,n){"use strict";n.r(s);var t=n("nKUr"),a=(n("q1tI"),n("VtrM")),c=n("LpSC");s.default=function(e){e.pokemon;var s="Test".name,n="https:/pokeapi.co/api/v2/pokemon"+s,r=Object(a.a)(n,c.fetch),i=r.data;return r.error?Object(t.jsx)("h1",{children:" Something went wrong!!!"}):i?Object(t.jsxs)("div",{className:"Card",children:[Object(t.jsxs)("span",{className:"Card--id",children:["#",i.id]}),Object(t.jsx)("img",{className:"Card--image",src:i.sprites.front_default,alt:s}),Object(t.jsx)("h1",{className:"Card--name",children:s}),Object(t.jsx)("span",{className:"Card--details",children:i.types.map((function(e){return e.type.name})).join(", ")})]}):Object(t.jsx)("h1",{children:"Loading..............."})}},K64n:function(e,s,n){"use strict";s.Headers=self.Headers,s.Request=self.Request,s.Response=self.Response,s.fetch=self.fetch},LNKT:function(e,s,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/Pokemon",function(){return n("3WHP")}])},LpSC:function(e,s,n){n("K64n"),e.exports=self.fetch.bind(self)}},[["LNKT",0,1,3]]]);