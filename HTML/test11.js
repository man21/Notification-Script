

// var   response = {
//     "campaign": {
//         "onBoarding": false,
//         "_id": "5f4dec0e74814a416e9582d2",
//         "campaignType": "default",
//         "campaignName": "test",
//         "websiteUrl": "test.com",
//         "profile": "5c6d4b8b98948500132d07e9",
//         "isActive": true,
//         "trackingId": "INF-3gbfcjjsd6vhvo",
//         "createdAt": "2020-09-01T06:37:02.778Z",
//         "updatedAt": "2020-09-01T06:37:02.778Z",
//         "__v": 0,
//         "id": "5f4dec0e74814a416e9582d2"
//     },
//     "configuration": {
//         "_id": "5f4dec0f74814a416e9582d3",
//         "activity": true,
//         "panelStyle": {
//             "noButtonStyle": "outline",
//             "color": {
//                 "r": 0,
//                 "g": 0,
//                 "b": 0,
//                 "a": 1
//             }
//         },
//         "langName": {
//             "language": "en",
//             "name": "English"
//         },
//         "scrollToConsent": true,
//         "position": "left",
//         "customPromptText": "customPromptText",
//         "customAcceptText": "customAcceptText",
//         "brandingText": "brandingText",
//         "brandingStyle": "brandingStyle",
//         "poweredBy": "Influence",
//         "poweredByLink": "https://useinfluence.co",
//         "cookiecampaign": "5f4dec0e74814a416e9582d2",
//         "trackingId": "INF-3gbfcjjsd6vhvo",
//         "createdAt": "2020-09-01T06:37:03.149Z",
//         "updatedAt": "2020-09-01T06:37:03.149Z",
//         "__v": 0,
//         "id": "5f4dec0f74814a416e9582d3"
//     },
//     "microPolicies": [
//         {
//             "useCookie": true,
//             "essentialPolicy": true,
//             "cookieWidgets": false,
//             "_id": "5f4e13b68acd492ae77f74a3",
//             "name": "test",
//             "description": "test Policy Description",
//             "websiteUrl": "test.com",
//             "slug": "test",
//             "trackingId": "INF-3gbfcjjsd6vhvo",
//             "cookiecampaign": "5f4dec0e74814a416e9582d2",
//             "profile": "5f4dec0e74814a416e9582d2",
//             "createdAt": "2020-09-01T09:26:14.749Z",
//             "updatedAt": "2020-09-01T09:26:14.749Z",
//             "__v": 0,
//             "id": "5f4e13b68acd492ae77f74a3",
//             "provider": [
//                 {
//                     "_id": "5f48ef30d0aae6670d49648b",
//                     "name": "https://test2109.herokuapp.com",
//                     "provider": "cdn.dashly.app",
//                     "type": "esential",
//                     "trackingId": "INF-3gbfcjjsd6vhvo",
//                     "createdAt": "2020-08-28T11:49:04.611Z",
//                     "updatedAt": "2020-08-28T11:49:04.611Z",
//                     "id": "5f48ef30d0aae6670d49648b"
//                 }
//             ]
//         },
//         {
//             "useCookie": true,
//             "essentialPolicy": true,
//             "cookieWidgets": false,
//             "_id": "5f4e13b68acd492ae77f74a4",
//             "name": "test",
//             "description": "test Policy Description",
//             "websiteUrl": "test.com",
//             "slug": "Essential11",
//             "trackingId": "INF-3gbfcjjsd6vhvo",
//             "cookiecampaign": "5f4dec0e74814a416e9582d2",
//             "profile": "5f4dec0e74814a416e9582d2",
//             "createdAt": "2020-09-01T09:26:14.749Z",
//             "updatedAt": "2020-09-01T09:26:14.749Z",
//             "__v": 0,
//             "id": "5f4e13b68acd492ae77f74a3",
//             "provider": [
//                 {
//                     "_id": "5f48ef30d0aae6670d49648b",
//                     "name": "https://test2109.herokuapp.com",
//                     "provider": "bootstrap",
//                     "type": "test",
//                     "trackingId": "INF-3gbfcjjsd6vhvo",
//                     "createdAt": "2020-08-28T11:49:04.611Z",
//                     "updatedAt": "2020-08-28T11:49:04.611Z",
//                     "id": "5f48ef30d0aae6670d49648b",
//                     "description": "test Policy Description",

//                 }
//             ]
//         },
//         {
//             "useCookie": true,
//             "essentialPolicy": true,
//             "cookieWidgets": false,
//             "_id": "5f4e13b68acd492ae77f74a1",
//             "name": "Hello",
//             "description": "Hello Policy Description",
//             "websiteUrl": "test.com",
//             "slug": "Hello",
//             "trackingId": "INF-3gbfcjjsd6vhvo",
//             "cookiecampaign": "5f4dec0e74814a416e9582d2",
//             "profile": "5f4dec0e74814a416e9582d2",
//             "createdAt": "2020-09-01T09:26:14.749Z",
//             "updatedAt": "2020-09-01T09:26:14.749Z",
//             "__v": 0,
//             "id": "5f4e13b68acd492ae77f74a3",
//             "provider": [
//                 {
//                     "_id": "5f48ef30d0aae6670d49648b",
//                     "name": "https://test2109.herokuapp.com",
//                     "provider": "javascript",
//                     "type": "test",
//                     "trackingId": "INF-3gbfcjjsd6vhvo",
//                     "createdAt": "2020-08-28T11:49:04.611Z",
//                     "updatedAt": "2020-08-28T11:49:04.611Z",
//                     "id": "5f48ef30d0aae6670d49648b",
//                     "description": "test Policy Description",

//                 }
//             ]
//         }
//     ]
// }


// var m =[]
// response.microPolicies.map(e=>{

//     var d = getCookieById(e._id)

//     if(d.key == "true"){
//         e.provider.map(e =>{
//             console.log(e.provider)

//             m.push(new RegExp(e.provider))
//         })
//     }
    
// })

// window.YETT_BLACKLIST =  m //[/cdn.dashly.app/]


// console.log(window.YETT_BLACKLIST, "DECLARE $$$$$$$$444")


// function getCookieById (name){
//     const COOKIE_PREFIX = "Influence_";    
//     name = name+"="
//     const cookies = document.cookie.split(";")

//     for(var i = 0; i < cookies.length; i++) {
//         var cookie = cookies[i]
//        if(cookie.indexOf(COOKIE_PREFIX+name) == 1){
//             name = cookie.split('=')[0].trim().substring(COOKIE_PREFIX.length);
//             value = cookie.split('=')[1];

//         return {name: name, key: value}
//      }
//     }
//     return null;
// }

// !(function (t, e) {


//         "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(((t = t || self).yett = {}));
//     })(this, function (t) {
//         "use strict";

//         function o(e, t) {
//             return (
//                 e &&
//                 (!t || t !== c) &&
//                 (!s.blacklist ||
//                     s.blacklist.some(function (t) {
//                         return t.test(e);
//                     })) &&
//                 (!s.whitelist ||
//                     s.whitelist.every(function (t) {
//                         return !t.test(e);
//                     }))
//             );
//         }
//         function l(t) {
//             var e = t.getAttribute("src");
//             return (
//                 (s.blacklist &&
//                     s.blacklist.every(function (t) {
//                         return !t.test(e);
//                     })) ||
//                 (s.whitelist &&
//                     s.whitelist.some(function (t) {
//                         return t.test(e);
//                     }))
//             );
//         }
//         var c = "javascript/blocked",
//             s = { blacklist: window.YETT_BLACKLIST ? window.YETT_BLACKLIST: [], whitelist: window.YETT_WHITELIST },
//             u = { blacklisted: [] },
//             observer = new MutationObserver(function (t) {
//                 for (var e = 0; e < t.length; e++)
//                     for (
//                         var i = t[e].addedNodes,
//                             r = function (t) {
//                                 var r = i[t];
//                                 if (1 === r.nodeType && "SCRIPT" === r.tagName) {
//                                     var e = r.src,
//                                         n = r.type;
//                                     if (o(e, n)) {
//                                         u.blacklisted.push([r, r.type]), (r.type = c);
//                                         r.addEventListener("beforescriptexecute", function t(e) {
//                                             r.getAttribute("type") === c && e.preventDefault(), r.removeEventListener("beforescriptexecute", t);
//                                         }),
//                                             r.parentElement && r.parentElement.removeChild(r);
//                                     }
//                                 }
//                             },
//                             n = 0;
//                         n < i.length;
//                         n++
//                     )
//                         r(n);
//             });

//         observer.observe(document.documentElement, { childList: !0, subtree: !0 });
//         var i = document.createElement,
//             a = { src: Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "src"), type: Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "type") };
//         function p(t, e) {
//             return (
//                 (function (t) {
//                     if (Array.isArray(t)) return t;
//                 })(t) ||
//                 (function (t, e) {
//                     if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
//                     var r = [],
//                         n = !0,
//                         i = !1,
//                         o = void 0;
//                     try {
//                         for (var c, a = t[Symbol.iterator](); !(n = (c = a.next()).done) && (r.push(c.value), !e || r.length !== e); n = !0);
//                     } catch (t) {
//                         (i = !0), (o = t);
//                     } finally {
//                         try {
//                             n || null == a.return || a.return();
//                         } finally {
//                             if (i) throw o;
//                         }
//                     }
//                     return r;
//                 })(t, e) ||
//                 r(t, e) ||
//                 (function () {
//                     throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
//                 })()
//             );
//         }
//         function y(t) {
//             return (
//                 (function (t) {
//                     if (Array.isArray(t)) return n(t);
//                 })(t) ||
//                 (function (t) {
//                     if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
//                 })(t) ||
//                 r(t) ||
//                 (function () {
//                     throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
//                 })()
//             );
//         }
//         function r(t, e) {
//             if (t) {
//                 if ("string" == typeof t) return n(t, e);
//                 var r = Object.prototype.toString.call(t).slice(8, -1);
//                 return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(t, e) : void 0;
//             }
//         }
//         function n(t, e) {
//             (null == e || e > t.length) && (e = t.length);
//             for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
//             return n;
//         }
//         document.createElement = function () {
//             for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
//             if ("script" !== e[0].toLowerCase()) return i.bind(document).apply(void 0, e);
//             var n = i.bind(document).apply(void 0, e);
//             try {
//                 Object.defineProperties(n, {
//                     src: {
//                         get: function () {
//                             return a.src.get.call(this);
//                         },
//                         set: function (t) {
//                             o(t, n.type) && a.type.set.call(this, c), a.src.set.call(this, t);
//                         },
//                     },
//                     type: {
//                         set: function (t) {
//                             var e = o(n.src, n.type) ? c : t;
//                             a.type.set.call(this, e);
//                         },
//                     },
//                 }),
//                     (n.setAttribute = function (t, e) {
//                         "type" === t || "src" === t ? (n[t] = e) : HTMLScriptElement.prototype.setAttribute.call(n, t, e);
//                     });
//             } catch (t) {
//                 console.warn("Yett: unable to prevent script execution for script src ", n.src, ".\n", 'A likely cause would be because you are using a third-party browser extension that monkey patches the "document.createElement" function.');
//             }
//             return n;
//         };
//         var d = new RegExp("[|\\{}()[\\]^$+*?.]", "g");
//         (t.unblock = function () {
//             for (var t = arguments.length, r = new Array(t), e = 0; e < t; e++) r[e] = arguments[e];
//             r.length < 1
//                 ? ((s.blacklist = []), (s.whitelist = []))
//                 : (s.blacklist &&
//                     (s.blacklist = s.blacklist.filter(function (e) {
//                         return r.every(function (t) {
//                             return "string" == typeof t ? !e.test(t) : t instanceof RegExp ? e.toString() !== t.toString() : void 0;
//                         });
//                     })),
//                 s.whitelist &&
//                     (s.whitelist = [].concat(
//                         y(s.whitelist),
//                         y(
//                             r
//                                 .map(function (e) {
//                                     if ("string" == typeof e) {
//                                         var r = ".*" + e.replace(d, "\\$&") + ".*";
//                                         if (
//                                             s.whitelist.every(function (t) {
//                                                 return t.toString() !== r.toString();
//                                             })
//                                         )
//                                             return new RegExp(r);
//                                     } else if (
//                                         e instanceof RegExp &&
//                                         s.whitelist.every(function (t) {
//                                             return t.toString() !== e.toString();
//                                         })
//                                     )
//                                         return e;
//                                     return null;
//                                 })
//                                 .filter(Boolean)
//                         )
//                     )));
//             for (var n = document.querySelectorAll('script[type="'.concat(c, '"]')), i = 0; i < n.length; i++) {
//                 var o = n[i];
//                 l(o) && (u.blacklisted.push([o, "application/javascript"]), o.parentElement.removeChild(o));
//             }
//             var a = 0;
//             y(u.blacklisted).forEach(function (t, e) {
//                 var r = p(t, 2),
//                     n = r[0],
//                     i = r[1];
//                 if (l(n)) {
//                     var o = document.createElement("script");
//                     for (var c in (o.setAttribute("src", n.src), o.setAttribute("type", i || "application/javascript"), n)) 
//                     c.startsWith("on") && (o[c] = n[c]);

//                     document.head.appendChild(o), u.blacklisted.splice(e - a, 1), a++;
//                 }
//             }),
//                 s.blacklist && s.blacklist.length < 1 && observer.disconnect();
//         }),
//             Object.defineProperty(t, "__esModule", { value: !0 });
//     });
