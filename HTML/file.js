!(function (t) {
    var e = {};
    function n(r) {
        if (e[r]) return e[r].exports;
        var o = (e[r] = { i: r, l: !1, exports: {} });
        return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    (n.m = t),
        (n.c = e),
        (n.d = function (t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
        }),
        (n.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
        }),
        (n.t = function (t, e) {
            if ((1 & e && (t = n(t)), 8 & e)) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var r = Object.create(null);
            if ((n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t))
                for (var o in t)
                    n.d(
                        r,
                        o,
                        function (e) {
                            return t[e];
                        }.bind(null, o)
                    );
            return r;
        }),
        (n.n = function (t) {
            var e =
                t && t.__esModule
                    ? function () {
                          return t.default;
                      }
                    : function () {
                          return t;
                      };
            return n.d(e, "a", e), e;
        }),
        (n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }),
        (n.p = "https://consent-manager.metomic.io/"),
        n((n.s = 257));
})({
    257: function (t, e, n) {
        "use strict";
        n.r(e);
        n(62);
        var r = function (t) {
                for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
            },
            o = n(4);
        function c(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(t);
                e &&
                    (r = r.filter(function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })),
                    n.push.apply(n, r);
            }
            return n;
        }
        function i(t, e, n) {
            return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = n), t;
        }
        var u = {
                autoblockingGates: [],
                registerAutoblockingGate: function (t) {
                    a().autoblockingGates.push(t);
                },
                autoblockingEvents: [],
            },
            a = function () {
                return u;
            },
            f = function () {
                return (u.configAutoblocking || {}).rules || [];
            },
            l = function (t) {
                return (
                    (u = (function (t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var n = null != arguments[e] ? arguments[e] : {};
                            e % 2
                                ? c(Object(n), !0).forEach(function (e) {
                                      i(t, e, n[e]);
                                  })
                                : Object.getOwnPropertyDescriptors
                                ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                                : c(Object(n)).forEach(function (e) {
                                      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                                  });
                        }
                        return t;
                    })({}, u, {}, t || {})),
                    a()
                );
            },
            d = n(9);
        var s = function (t) {
                var e = document.createElement("a");
                e.href = t;
                try {
                    return new URL(e.href).origin;
                } catch (e) {
                    var n = document.implementation.createHTMLDocument(""),
                        r = n.createElement("a");
                    return (r.href = t), n.body.appendChild(r), "".concat(r.protocol, "//").concat(r.hostname, ":").concat(r.port);
                }
            },
            p = n(61);
        function m(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(t);
                e &&
                    (r = r.filter(function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })),
                    n.push.apply(n, r);
            }
            return n;
        }
        function b(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2
                    ? m(Object(n), !0).forEach(function (e) {
                          v(t, e, n[e]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                    : m(Object(n)).forEach(function (e) {
                          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                      });
            }
            return t;
        }
        function v(t, e, n) {
            return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = n), t;
        }
        var g = "HOSTNAME",
            y = "SELECTOR",
            h = ["IFRAME", "IMG", "EMBED", "VIDEO", "AUDIO", "PICTURE", "SOURCE", "SCRIPT"],
            w = function (t) {
                var e = a().autoblockingGates;
                return (
                    !t ||
                    (e.length > 0 &&
                        e.every(function (e) {
                            return e(t);
                        }))
                );
            },
            O = {},
            j = function (t, e) {
                return (O[e] = O[e] || new RegExp(e)), O[e].test(t);
            };
        function E(t, e) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                if (e(r)) return r;
            }
        }
        function A(t) {
            var e,
                n,
                r = f(),
                o = E(r, function (n) {
                    var r,
                        o = E(n.matches, t);
                    return (e = null !== (r = e) && void 0 !== r ? r : o), o;
                });
            if (o && !o.placeholder) {
                var c = E(r, function (t) {
                    return t !== o && t.placeholder && t.providerId === o.providerId;
                });
                c && (n = { policyId: c.policyId, policySlug: c.policySlug });
            }
            var i = n ? b({}, o, {}, n) : o;
            return i && b({}, i, { matchFound: e });
        }
        var S = function (t) {
                var e = t.getAttribute("src") && s(t.getAttribute("src"));
                return A(function (n) {
                    var r = n.type,
                        o = n.value;
                    switch (r) {
                        case g:
                            return e && j(e, o);
                        case y:
                            return t.matches(o);
                        default:
                            return !1;
                    }
                });
            },
            k = function (t, e) {
                var n =
                        t &&
                        (function (t) {
                            var e = s(t);
                            return A(function (t) {
                                var n = t.type,
                                    r = t.value;
                                return n === g && j(e, r);
                            });
                        })(t),
                    o = !w(n);
                return r("%cshouldBlockRequest? config - ".concat(e, ": %c").concat(o ? "blocked" : "allowed"), "background: teal; color: black", "color: ".concat(o ? "red" : "green"), t, n), o;
            },
            M = function () {
                var t = document.createElement.bind(document);
                document.createElement = function (e) {
                    var n = t(e),
                        r = n.setAttribute.bind(n);
                    return (
                        "script" === e.toLowerCase()
                            ? (Object.defineProperties(n, {
                                  type: {
                                      set: function (t) {
                                          var e = this.src,
                                              n = e && k(e, "script type setter");
                                          return r("type", n ? d.c : t), !0;
                                      },
                                  },
                                  src: {
                                      get: function () {
                                          return n.getAttribute("src");
                                      },
                                      set: function (t) {
                                          return k(t, "script src setter") ? (r("src", t), D(n, "script src setter")) : r("src", t), !0;
                                      },
                                  },
                              }),
                              (n.setAttribute = function (t, e) {
                                  "type" !== t && "src" !== t ? r(t, e) : (n[t] = e);
                              }))
                            : (function (t) {
                                  return t && h.indexOf(t.toUpperCase()) > -1;
                              })(e) &&
                              (Object.defineProperties(n, {
                                  src: {
                                      get: function () {
                                          return this.getAttribute("src");
                                      },
                                      set: function (t) {
                                          return k(t, "spicy src setter") && D(n, "spicy src setter"), r("src", t), !0;
                                      },
                                  },
                              }),
                              (n.setAttribute = function (t, e) {
                                  "src" !== t ? r(t, e) : (n[t] = e);
                              })),
                        n
                    );
                };
            },
            P =
                (window.addEventListener,
                document.addEventListener,
                function () {
                    M();
                });
        function C(t, e) {
            var n = new XMLHttpRequest();
            n.open("POST", "https://api.rollbar.com/api/1/item/"),
                n.setRequestHeader("Content-Type", "application/json;charset=UTF-8"),
                n.setRequestHeader("X-Rollbar-Access-Token", "9d10323eb7f04ef3817808710b04f4c7"),
                n.send(
                    JSON.stringify({
                        access_token: "9d10323eb7f04ef3817808710b04f4c7",
                        data: {
                            code_version: "v1.38.0-3-ge522f23",
                            context: window.location.origin,
                            environment: "production",
                            platform: "browser",
                            framework: "browser-js",
                            language: "javascript",
                            request: { url: window.location.origin, query_string: "not-sent", user_ip: null },
                            body: { trace: { frames: [], exception: { class: t.name, message: e + ": " + t.message, stack: t.stack, description: t.toString() } } },
                            level: "critical",
                            client: { javascript: { browser: navigator.userAgent, code_version: "v1.38.0-3-ge522f23" } },
                            title: e + ": " + t.message,
                            custom: { is_in_iframe: !!window.frameElement },
                        },
                    })
                );
        }
        function x(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "Bootfail";
            return function () {
                try {
                    t.apply(null, arguments);
                } catch (t) {
                    C(t, e);
                }
            };
        }
        function L(t) {
            return (
                (function (t) {
                    if (Array.isArray(t)) {
                        for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
                        return n;
                    }
                })(t) ||
                (function (t) {
                    if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t);
                })(t) ||
                (function () {
                    throw new TypeError("Invalid attempt to spread non-iterable instance");
                })()
            );
        }
        function T(t) {
            var e,
                n,
                r,
                o = document.createElement("script");
            return (
                o.setAttribute("type", d.c),
                t.parentNode ? t.parentNode.replaceChild(o, t) : document.body.appendChild(o),
                (e = o),
                (n = t),
                (r = ["style", "class", "width", "height"]),
                Object(d.j)(e).forEach(function (t) {
                    var e = t.name,
                        o = t.value;
                    (r && -1 === r.indexOf(e)) || n.setAttribute(e, o);
                }),
                (o.text = t.outerHTML),
                o
            );
        }
        function D(t, e) {
            if (t.closest(d.d)) return t;
            var n = S(t);
            if (n) {
                r("%cblocking - ".concat(e, ":"), "background: red; color: black;", t.outerHTML);
                var o,
                    c,
                    i = "SCRIPT" === t.nodeName ? (((o = t).dataset[d.b] = o.getAttribute("type") || "text/javascript"), o.setAttribute("type", d.c), o) : T(t);
                (i.mtmBlockedNode = !0), (c = n), u.autoblockingEvents.push(c);
                var a = n.policySlug,
                    f = n.placeholder;
                if ((i.setAttribute(d.e, a), !f)) return i;
                var l = f.source,
                    s = f.params;
                return (
                    (i.dataset[p.f] = l || "/generic.html"),
                    s &&
                        (i.dataset[p.g] = Object.keys(s).reduce(function (t, e) {
                            var n = s[e];
                            return ""
                                .concat(t, "\n")
                                .concat(e, "=")
                                .concat("string" == typeof n ? n : JSON.stringify(n));
                        }, "")),
                    i
                );
            }
        }
        function _(t) {
            var e = t.reduce(function (t, e) {
                switch (e.type) {
                    case "childList":
                        var n = Object(o.k)(e.addedNodes).filter(function (t) {
                                return (
                                    1 === t.nodeType &&
                                    (function (t, e) {
                                        if (!t || !t.tagName) return !1;
                                        if (t.mtmBlockedNode) return !1;
                                        if (t.matches(d.d) || t.closest(d.d)) return !1;
                                        var n = S(t),
                                            o = !w(n);
                                        return r("%cshouldBlockNode? config - ".concat(e, ": %c").concat(o ? "blocked" : "allowed"), "background: blue; color: white", "color: ".concat(o ? "red" : "green"), t, n), o;
                                    })(t, "onDomChange")
                                );
                            }),
                            c = Object(o.k)(e.removedNodes);
                        return [].concat(L(t), L(n)).filter(function (t) {
                            return -1 === c.indexOf(t);
                        });
                    default:
                        return t;
                }
            }, []);
            e.length &&
                e.forEach(function (t) {
                    return D(t, "onDomChange");
                });
        }
        var I = function () {
                P(), Object(d.o)(_, { targetNode: document.documentElement, observerConfig: { childList: !0, subtree: !0 } });
            },
            R = "DOMContentLoaded";
        function N(t, e) {
            var n, r, o, c, i;
            if ("loading" !== (null === (n = e.document) || void 0 === n ? void 0 : n.readyState)) return t();
            var u = null === (r = e.performance) || void 0 === r ? void 0 : null === (o = r.getEntriesByType) || void 0 === o ? void 0 : o.call(r, "navigation")[0];
            if ((null == u ? void 0 : u.domContentLoadedEventStart) > 0 || (null === (c = e.performance) || void 0 === c ? void 0 : null === (i = c.timing) || void 0 === i ? void 0 : i.domContentLoadedEventStart) > 0) return t();
            e.attachEvent ? e.attachEvent(R, t) : e.addEventListener && e.addEventListener(R, t, !1);
        }
        var q = n(37);
        x(function () {
            if (
                ((window._mtm = window._mtm || {}),
                !(function () {
                    if (window._mtm.didEmbed) return !0;
                    var t = navigator && navigator.userAgent && navigator.userAgent.toLowerCase();
                    return (
                        !t ||
                        ["googleweblight", "googlebot", "apis-google", "mediapartners-google", "adsbot", "feedfetcher", "google-read-aloud", "bingbot", "msnbot", "bingpreview"].some(function (e) {
                            return -1 !== t.indexOf(e);
                        })
                    );
                })())
            ) {
                (window._mtm.didEmbed = !0), Object(q.c)(window), (window._mtm = l(window._mtm)), f().length && I();
                var t = a().projectId;
                t && window.Metomic("load", { projectId: t }),
                    (function () {
                        var t = document.createElement("iframe");
                        t.setAttribute("id", "metomic-iframe"), (t.src = "about:blank"), t.setAttribute("title", "metomic-iframe-bootstrap");
                        var e = document.createElement("script");
                        (e.type = "text/javascript"),
                            (e.charset = "utf-8"),
                            (e.async = !0),
                            (e.crossOrigin = "anonymous"),
                            t.setAttribute("title", "metomic-iframe-bootstrap"),
                            (e.onerror = x(function (t) {
                                throw new Error("Could not load: ".concat(t.target.src));
                            }, "Boot script onerror")),
                            (e.src = "https://consent-manager.metomic.io/bundle.js"),
                            (t.onload = x(function () {
                                var n = t.contentWindow;
                                N(function () {
                                    return n.document.body.appendChild(e);
                                }, n);
                            }, "Boot iframe onload")),
                            N(function () {
                                return document.head.appendChild(t);
                            }, window);
                    })();
            }
        }, "Embed script")();
    },
    37: function (t, e, n) {
        "use strict";
        function r(t) {
            return (
                (function (t) {
                    if (Array.isArray(t)) {
                        for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
                        return n;
                    }
                })(t) ||
                (function (t) {
                    if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t);
                })(t) ||
                (function () {
                    throw new TypeError("Invalid attempt to spread non-iterable instance");
                })()
            );
        }
        function o(t) {
            return (o =
                "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                    ? function (t) {
                          return typeof t;
                      }
                    : function (t) {
                          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                      })(t);
        }
        function c(t) {
            if (("object" === o(t.Metomic) ? (t.Metomic.snippetVersion = 1) : "function" == typeof t.Metomic ? (t.Metomic.snippetVersion = 2) : (t.Metomic = { snippetVersion: 3 }), "function" != typeof t.Metomic)) {
                var e = function () {
                        n.push(arguments);
                    },
                    n = [];
                (e.q = n),
                    Object.keys(t.Metomic || {}).forEach(function (n) {
                        return (e[n] = t.Metomic[n]);
                    }),
                    (t.Metomic = e);
            }
            return t.Metomic;
        }
        function i(t, e) {
            for (; t.q.length; ) e.apply(void 0, r(t.q.shift()));
        }
        function u(t, e) {
            (t.q.push = function (t) {
                return e.apply(void 0, r(t));
            }),
                i(t, e);
        }
        n.d(e, "c", function () {
            return c;
        }),
            n.d(e, "b", function () {
                return i;
            }),
            n.d(e, "a", function () {
                return u;
            });
    },
    4: function (t, e, n) {
        "use strict";
        function r(t) {
            return (
                (function (t) {
                    if (Array.isArray(t)) {
                        for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
                        return n;
                    }
                })(t) ||
                (function (t) {
                    if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t);
                })(t) ||
                (function () {
                    throw new TypeError("Invalid attempt to spread non-iterable instance");
                })()
            );
        }
        n.d(e, "f", function () {
            return o;
        }),
            n.d(e, "l", function () {
                return c;
            }),
            n.d(e, "d", function () {
                return i;
            }),
            n.d(e, "e", function () {
                return u;
            }),
            n.d(e, "j", function () {
                return a;
            }),
            n.d(e, "a", function () {
                return f;
            }),
            n.d(e, "k", function () {
                return l;
            }),
            n.d(e, "h", function () {
                return d;
            }),
            n.d(e, "b", function () {
                return s;
            }),
            n.d(e, "i", function () {
                return p;
            }),
            n.d(e, "c", function () {
                return m;
            }),
            n.d(e, "g", function () {
                return b;
            });
        var o = function (t, e) {
                var n = {},
                    r = !0,
                    o = !1,
                    c = void 0;
                try {
                    for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done); r = !0) {
                        var a = i.value;
                        n[a[t]] = a;
                    }
                } catch (t) {
                    (o = !0), (c = t);
                } finally {
                    try {
                        r || null == u.return || u.return();
                    } finally {
                        if (o) throw c;
                    }
                }
                return n;
            },
            c = function (t) {
                return r(new Set(t));
            },
            i = function () {
                return window.parent;
            },
            u = -1 !== navigator.userAgent.indexOf("MSIE") || navigator.appVersion.indexOf("Trident/") > -1,
            a = !u,
            f = function () {
                return window.matchMedia("(hover: hover)").matches;
            },
            l = function (t) {
                return [].slice.call(t);
            },
            d = function (t, e) {
                var n = [],
                    r = [],
                    o = !0,
                    c = !1,
                    i = void 0;
                try {
                    for (var u, a = t[Symbol.iterator](); !(o = (u = a.next()).done); o = !0) {
                        var f = u.value;
                        (e(f) ? n : r).push(f);
                    }
                } catch (t) {
                    (c = !0), (i = t);
                } finally {
                    try {
                        o || null == a.return || a.return();
                    } finally {
                        if (c) throw i;
                    }
                }
                return [n, r];
            },
            s = function (t, e, n) {
                return t > n ? n : t < e ? e : t;
            };
        function p(t, e, n) {
            return new Promise(function (r, o) {
                var c = new MessageChannel();
                (c.port1.onmessage = function (t) {
                    t.data.error ? o(t.data.error) : r(t.data), c.port1.close(), c.port2.close();
                }),
                    (c.port1.onmessageerror = function (t) {
                        return window.Rollbar.error(t);
                    }),
                    (c.port2.onmessageerror = function (t) {
                        return window.Rollbar.error(t);
                    }),
                    t.postMessage(e, n, [c.port2]);
            });
        }
        var m = function () {
                var t = [];
                if ("undefined" != typeof navigator) {
                    if (navigator.languages) for (var e = 0; e < navigator.languages.length; e++) t.push(navigator.languages[e]);
                    navigator.userLanguage && t.push(navigator.userLanguage), navigator.language && t.push(navigator.language);
                }
                return t[0];
            },
            b = function () {};
    },
    61: function (t, e, n) {
        "use strict";
        n.d(e, "c", function () {
            return r;
        }),
            n.d(e, "d", function () {
                return o;
            }),
            n.d(e, "f", function () {
                return c;
            }),
            n.d(e, "h", function () {
                return i;
            }),
            n.d(e, "g", function () {
                return u;
            }),
            n.d(e, "i", function () {
                return a;
            }),
            n.d(e, "e", function () {
                return f;
            }),
            n.d(e, "a", function () {
                return l;
            }),
            n.d(e, "b", function () {
                return d;
            }),
            n.d(e, "j", function () {
                return s;
            });
        var r = "placeholderContainer",
            o = "[data-placeholder-container]",
            c = "placeholder",
            i = "[data-".concat(c, "]"),
            u = "placeholderParams",
            a = "text",
            f = "mtmKey",
            l = "placeholderActivated",
            d = "[data-placeholder-activated]";
        function s(t) {
            return t.closest(o);
        }
    },
    62: function (t, e) {
        Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector),
            Element.prototype.closest ||
                (Element.prototype.closest = function (t) {
                    var e = this;
                    do {
                        if (e.matches(t)) return e;
                        e = e.parentElement || e.parentNode;
                    } while (null !== e && 1 === e.nodeType);
                    return null;
                });
    },
    9: function (t, e, n) {
        "use strict";
        n.d(e, "c", function () {
            return o;
        }),
            n.d(e, "d", function () {
                return c;
            }),
            n.d(e, "e", function () {
                return i;
            }),
            n.d(e, "b", function () {
                return u;
            }),
            n.d(e, "a", function () {
                return a;
            }),
            n.d(e, "l", function () {
                return f;
            }),
            n.d(e, "h", function () {
                return l;
            }),
            n.d(e, "q", function () {
                return d;
            }),
            n.d(e, "m", function () {
                return s;
            }),
            n.d(e, "n", function () {
                return p;
            }),
            n.d(e, "i", function () {
                return m;
            }),
            n.d(e, "j", function () {
                return b;
            }),
            n.d(e, "g", function () {
                return v;
            }),
            n.d(e, "f", function () {
                return g;
            }),
            n.d(e, "k", function () {
                return y;
            }),
            n.d(e, "p", function () {
                return h;
            }),
            n.d(e, "o", function () {
                return w;
            });
        var r = n(4),
            o = "text/x-metomic",
            c = '[type="'.concat(o, '"]'),
            i = "data-micropolicy",
            u = "blockedType",
            a = "blockedSrc",
            f = function () {
                return Object(r.d)().document;
            },
            l = function () {
                for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                return HTMLDocument.prototype.createElement.call(f(), e);
            },
            d = function (t) {
                return Object(r.k)(f().querySelectorAll(t));
            },
            s = function (t) {
                return t.getAttribute(i) || t.getAttribute("data-metomic-policy");
            },
            p = function (t) {
                return Object(r.l)(t.map(s));
            },
            m = function () {
                return d(c);
            },
            b = function (t) {
                return Object(r.k)(t.attributes).map(function (t) {
                    return { name: t.name, value: t.value };
                });
            };
        function v(t, e, n) {
            b(t).forEach(function (t) {
                var r = t.name,
                    o = t.value;
                (n && !n.includes(r)) || e.setAttribute(r, o);
            });
        }
        var g = function (t) {
                var e = l("script");
                return v(t, e), t.text && (e.text = t.text), e;
            },
            y = function (t) {
                var e = l("a");
                e.href = t;
                try {
                    return new URL(e.href).origin;
                } catch (t) {
                    return;
                }
            },
            h = function (t) {
                var e = Object(r.d)();
                "loading" !== f().readyState ? t() : e.attachEvent ? e.attachEvent("DOMContentLoaded", t) : e.addEventListener("DOMContentLoaded", t, !1);
            },
            w = function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if ("function" == typeof MutationObserver) {
                    var n = e.targetNode,
                        r = void 0 === n ? f().documentElement : n,
                        o = e.observerConfig,
                        c = void 0 === o ? { attributes: !0, childList: !0, characterData: !0, subtree: !0 } : o,
                        i = new MutationObserver(t);
                    return i.observe(r, c), i;
                }
            };
    },
});
//# sourceMappingURL=embed.js.map
