var Scribe;
void 0 === Scribe && function(t) {
  t.prototype.options = function() {
    return this.options
  };
  // Browser Detection
  var apiDataResponse = [];
  const lengthOfData = apiDataResponse.length;
  console.log(lengthOfData);
  var e, n = ((e = {
      init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser", this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version", this.OS = this.searchString(this.dataOS) || "an unknown OS"
      },
      searchString: function(t) {
        for (var e = 0; e < t.length; e++) {
          var n = t[e].string,
            r = t[e].prop;
          if (this.versionSearchString = t[e].versionSearch || t[e].identity, n) {
            if (-1 != n.indexOf(t[e].subString)) return t[e].identity
          } else if (r) return t[e].identity
        }
      },
      searchVersion: function(t) {
        var e = t.indexOf(this.versionSearchString);
        if (-1 != e) return parseFloat(t.substring(e + this.versionSearchString.length + 1))
      },
      dataBrowser: [{
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
      }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
      }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
      }, {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
      }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
      }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
      }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
      }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
      }, { // for newer Netscapes (6+)
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
      }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
      }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
      }, { // for older Netscapes (4-)
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }, {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: !1
      }],
      dataOS: [{
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
      }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
      }, {
        string: navigator.userAgent,
        subString: "iPod",
        identity: "iPod"
      }, {
        string: navigator.userAgent,
        subString: "iPad",
        identity: "iPad"
      }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone"
      }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
      }]
    }).init(), e),
    r = function(e, t) {
      // MaxMind GeoIP2 JavaScript API:
      "undefined" != typeof geoip2 && geoip2.city(function(t) {
        e({
          latitude: e.location.latitude,
          longitude: e.location.longitude
        })
      }, t, {
        timeout: 2e3,
        w3c_geolocation_disabled: !0
      })
    },
    u = {
      copyFields: function(t, e) {
        var n, r;
        for (n in e = e || {}, t) /layerX|Y/.test(n) || (r = t[n],
          // Bind functions to object being copied (???):
          e[n] = "function" == typeof r ? function(t, e) {
            return function() {
              return e.apply(t, arguments)
            }
          }(t, r) : r);
        return e
      },
      merge: function(t, e) {
        var n, r, o;
        if (void 0 === t) return t;
        if (void 0 === e) return t;
        if (t instanceof Array && e instanceof Array) {
          // Copy
          for (n = [], o = 0; o < t.length; o++) n.push(t[o]);
          // Merge
          for (o = 0; o < e.length; o++) n.length > o ? n[o] = u.merge(n[o], e[o]) : n.push(e[o]);
          return n
        }
        if (t instanceof Object && e instanceof Object) {
          // Copy:
          for (r in n = {}, t) n[r] = t[r];
          // Merge:
          for (r in e) void 0 !== n[r] ? n[r] = u.merge(n[r], e[r]) : n[r] = e[r];
          return n
        }
        return e
      },
      toObject: function(t) {
        var e, n = {};
        for (e in t) n[e] = t[e];
        return n
      },
      genGuid: function() {
        function t() {
          return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }
        return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
      },
      parseQueryString: function(t) {
        var e = {};
        if (0 < t.length) {
          var n = "?" === t.charAt(0) ? t.substring(1) : t;
          if (0 < n.length)
            for (var r = n.split("&"), o = 0; o < r.length; o++)
              if (0 < r[o].length) {
                var i = r[o].split("=");
                try {
                  var a = decodeURIComponent(i[0]),
                    s = 1 < i.length ? decodeURIComponent(i[1]) : "true";
                  e[a] = s
                } catch (t) {}
              }
        }
        return e
      },
      unparseQueryString: function(t) {
        var e, n, r = [];
        for (e in t) t.hasOwnProperty && !t.hasOwnProperty(e) || (n = t[e], r.push(encodeURIComponent(e) + "=" + encodeURIComponent(n)));
        var o = r.join("&");
        return 0 < o.length ? "?" + o : ""
      },
      size: function(t) {
        if (void 0 === t) return 0;
        if (t instanceof Array) return t.length;
        if (t instanceof Object) {
          var e, n = 0;
          for (e in t) t.hasOwnProperty && !t.hasOwnProperty(e) || ++n;
          return n
        }
        return 1
      },
      mapJson: function(t, e) {
        var n, r;
        if (t instanceof Array) {
          n = [];
          for (var o = 0; o < t.length; o++) r = u.mapJson(t[o], e), 0 < u.size(r) && n.push(r);
          return n
        }
        if (t instanceof Object) {
          for (var i in n = {}, t) r = u.mapJson(t[i], e), 0 < u.size(r) && (n[i] = r);
          return n
        }
        return e(t)
      },
      jsonify: function(t) {
        return u.mapJson(t, function(e) {
          if ("" !== e) {
            var n;
            try {
              n = JSON.parse(e)
            } catch (t) {
              n = e
            }
            return n
          }
        })
      },
      undup: function(e, n) {
        n = n || 250;
        var r = 0;
        return function() {
          var t = (new Date).getTime();
          return n < t - r ? (r = t, e.apply(this, arguments)) : void 0
        }
      },
      parseUrl: function(t) {
        var e = document.createElement("a");
        return e.href = t, "" === e.host && (e.href = e.href), {
          hash: e.hash,
          host: e.host,
          hostname: e.hostname,
          pathname: e.pathname,
          protocol: e.protocol,
          query: u.parseQueryString(e.search)
        }
      },
      unparseUrl: function(t) {
        return (t.protocol || "") + "//" + (t.host || "") + (t.pathname || "") + u.unparseQueryString(t.query) + (t.hash || "")
      },
      equals: function(t, e) {
        function n(t, e) {
          for (var n in t)
            if ((!t.hasOwnProperty || t.hasOwnProperty(n)) && !u.equals(t[n], e[n])) return !1;
          return !0
        }
        if (t instanceof Array) {
          if (e instanceof Array) {
            if (t.length !== e.length) return !1;
            for (var r = 0; r < t.length; r++)
              if (!u.equals(t[r], e[r])) return !1;
            return !0
          }
          return !1
        }
        return t instanceof Object ? e instanceof Object && n(t, e) && n(e, t) : t === e
      },
      isSamePage: function(t, e) {
        // Ignore the hash when comparing to see if two pages represent the same resource:
        return t = t instanceof String ? u.parseUrl(t) : t, e = e instanceof String ? u.parseUrl(e) : e, t.protocol === e.protocol && t.host === e.host && t.pathname === e.pathname && u.equals(t.query, e.query)
      },
      qualifyUrl: function(t) {
        var e = document.createElement("div");
        return e.innerHTML = '<a href="' + t.split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;") + '">x</a>', e.firstChild.href
      },
      padLeft: function(t, e, n) {
        var r = void 0 !== n ? n : "0",
          o = new Array(1 + e).join(r);
        return (o + t).slice(-o.length)
      }
    },
    c = {};

  function o() {
    this.handlers = [], this.onerror = console && console.log || window.onerror || function(t) {}
  }
  c.getFormData = function(t) {
    function e(t, e) {
      "" === t && (t = "anonymous");
      var n = r[t];
      null != n ? n instanceof Array ? r[t].push(e) : r[t] = [n, e] : r[t] = e
    }
    for (var r = {}, n = 0; n < t.elements.length; n++) {
      var o, i = t.elements[n],
        a = i.tagName.toLowerCase();
      "input" == a || "textfield" == a ?
        // INPUT or TEXTFIELD element.
        // Make sure auto-complete is not turned off for the field:
        "off" !== (i.getAttribute("autocomplete") || "").toLowerCase() && "password" !== i.type && (
          // Make sure it's not a radio or it's a checked radio:
          "radio" === i.type && !i.checked || e(i.name, i.value)) : "select" == a && (o = i.options[i.selectedIndex], e(i.name, o.value))
    }
    return r
  }, c.monitorElements = function(r, o, i) {
    i = i || 50;
    var a = function() {
      for (var t = document.getElementsByTagName(r), e = 0; e < t.length; e++) {
        var n = t[e];
        if (!n.getAttribute("scribe_scanned")) {
          n.setAttribute("scribe_scanned", !0);
          try {
            o(n)
          } catch (t) {
            window.onerror(t)
          }
        }
      }
      setTimeout(a, i)
    };
    setTimeout(a, 0)
  }, c.getDataset = function(t) {
    if (void 0 !== t.dataset) return u.toObject(t.dataset);
    if (t.attributes) {
      for (var e = {}, n = t.attributes, r = 0; r < n.length; r++) {
        var o = n[r].name,
          i = n[r].value;
        0 === o.indexOf("data-") && (e[o = o.substr("data-".length)] = i)
      }
      return e
    }
    return {}
  }, c.genCssSelector = function(t) {
    for (var e = ""; t != document.body;) {
      var n = t.id,
        r = "string" == typeof t.className ? t.className.trim().split(/\s+/).join(".") : "";
      n && "" !== n && (n = "#" + n), "" !== r && (r = "." + r);
      for (var o = t.nodeName.toLowerCase() + n + r, i = t.parentNode, a = 1, s = 0; s < i.childNodes.length && i.childNodes[s] !== t; s++) void 0 !== i.childNodes[s].tagName && (a += 1);
      "" !== e && (e = ">" + e), e = o + ":nth-child(" + a + ")" + e, t = i
    }
    return e
  }, c.getNodeDescriptor = function(t) {
    return {
      id: t.id,
      selector: c.genCssSelector(t),
      title: "" === t.title ? void 0 : t.title,
      data: c.getDataset(t)
    }
  }, c.getAncestors = function(t) {
    for (var e = t, n = []; e && e !== document.body;) n.push(e), e = e.parentNode;
    return n
  }, c.simulateMouseEvent = function(t, e, n) {
    var r = {
      HTMLEvents: /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
      MouseEvents: /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
    };
    n = u.merge({
      pointerX: 0,
      pointerY: 0,
      button: 0,
      ctrlKey: !1,
      altKey: !1,
      shiftKey: !1,
      metaKey: !1,
      bubbles: !0,
      cancelable: !0
    }, n || {});
    var o, i = null;
    for (o in r)
      if (r[o].test(e)) {
        i = o;
        break
      } if (!i) throw new SyntaxError("Only HTMLEvents and MouseEvents interfaces are supported");
    if (document.createEvent) s = document.createEvent(i), "HTMLEvents" === i ? s.initEvent(e, n.bubbles, n.cancelable) : s.initMouseEvent(e, n.bubbles, n.cancelable, document.defaultView, n.button, n.pointerX, n.pointerY, n.pointerX, n.pointerY, n.ctrlKey, n.altKey, n.shiftKey, n.metaKey, n.button, t), t.dispatchEvent(s);
    else {
      n.clientX = n.pointerX, n.clientY = n.pointerY;
      var a = document.createEventObject(),
        s = u.merge(a, n);
      try {
        t.fireEvent("on" + e, s)
      } catch (n) {
        // IE nonsense:
        t.fireEvent("on" + e)
      }
    }
    return t
  };
  var l = {
      removeElement: function(t, e, n) {
        var r = t.slice((n || e) + 1 || t.length);
        return t.length = e < 0 ? t.length + e : e, t.push.apply(t, r)
      },
      toArray: function(t) {
        var e, n = [],
          r = t.length;
        for (n.length = t.length, e = 0; e < r; e++) n[e] = t[e];
        return n
      },
      contains: function(t, e) {
        return l.exists(t, function(t) {
          return t === e
        })
      },
      diff: function(t, e) {
        for (var n, r = [], o = 0; o < t.length; o++) n = t[o], l.contains(e, n) || r.push(n);
        return r
      },
      exists: function(t, e) {
        for (var n = 0; n < t.length; n++)
          if (e(t[n])) return !0;
        return !1
      },
      map: function(t, e) {
        for (var n = [], r = 0; r < t.length; r++) n.push(e(t[r]));
        return n
      }
    },
    d = {
      getFingerprint: function() {
        var t = [JSON.stringify(d.getPluginsData()), JSON.stringify(d.getLocaleData()), navigator.userAgent.toString()];
        return MD5.hash(t.join(""))
      },
      getBrowserData: function() {
        return d.getFingerprint(), {
          ua: navigator.userAgent,
          name: n.browser,
          version: n.version,
          platform: n.OS,
          language: navigator.language || navigator.userLanguage || navigator.systemLanguage,
          plugins: d.getPluginsData()
        }
      },
      getUrlData: function() {
        var t = document.location;
        return {
          hash: t.hash,
          host: t.host,
          hostname: t.hostname,
          pathname: t.pathname,
          protocol: t.protocol,
          query: u.parseQueryString(t.search)
        }
      },
      getDocumentData: function() {
        return {
          title: document.title,
          referrer: document.referrer && u.parseUrl(document.referrer) || void 0,
          url: d.getUrlData()
        }
      },
      getScreenData: function() {
        return {
          height: screen.height,
          width: screen.width,
          colorDepth: screen.colorDepth
        }
      },
      getLocaleData: function() {
        // "Mon Apr 15 2013 12:21:35 GMT-0600 (MDT)"
        //
        var t, e, n = new RegExp("([A-Z]+-[0-9]+) \\(([A-Z]+)\\)").exec((new Date).toString());
        return n && 3 <= n.length && (t = n[1], e = n[2]), {
          language: navigator.systemLanguage || navigator.userLanguage || navigator.language,
          timezoneOffset: (new Date).getTimezoneOffset(),
          gmtOffset: t,
          timezone: e
        }
      },
      getPageloadData: function() {
        return document.location, {
          browser: d.getBrowserData(),
          document: d.getDocumentData(),
          screen: d.getScreenData(),
          locale: d.getLocaleData()
        }
      },
      getPluginsData: function() {
        for (var t = [], e = navigator.plugins, n = 0; n < e.length; n++) {
          var r = e[n];
          t.push({
            name: r.name,
            description: r.description,
            filename: r.filename,
            version: r.version,
            mimeType: 0 < r.length ? {
              type: r[0].type,
              description: r[0].description,
              suffixes: r[0].suffixes
            } : void 0
          })
        }
        return t
      }
    };
  o.prototype.push = function(t) {
    this.handlers.push(t)
  }, o.prototype.dispatch = function() {
    for (var t = Array.prototype.slice.call(arguments, 0), e = 0; e < this.handlers.length; e++) try {
      this.handlers[e].apply(null, t)
    } catch (t) {
      onerror(t)
    }
  };
  var i, a, s, g, h, f, p, m, v, y = {};

  function b(t) {
    var e = document.location.hash;
    g != e && (g = e, t.hash = e, s.dispatch(t))
  }

  function S(t) {
    m || (v.dispatch(t), m = !0)
  }

  function w(t) {
    var e = t.onunload || function(t) {};
    t.onunload = function(t) {
      S(), e(t)
    }
  }
  y.onready = function(t) {
      null != document.body ? t() : setTimeout(function() {
        y.onready(t)
      }, 10)
    }, y.onevent = function(t, e, n, r) {
      var o, i = (o = r, function(t) {
        var e;
        return t = t || window.event,
          // Perform a shallow clone (Firefox bugs):
          (t = u.copyFields(t)).target = t.target || t.srcElement, t.keyCode = t.keyCode || t.which || t.charCode, t.which = t.which || t.keyCode, t.charCode = "number" == typeof t.which ? t.which : t.keyCode, t.timeStamp = t.timeStamp || (new Date).getTime(), t.target && 3 == t.target.nodeType && (t.target = t.target.parentNode), t.preventDefault || (t.preventDefault = function() {
            e = !1
          }), o(t) || e
      });
      t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
    }, y.onexit = (m = !1, v = new o, y.onevent(window, "unload", void 0, S), w(window), y.onready(function() {
      w(document.body)
    }), function(t) {
      v.push(t)
    }), y.onengage = (i = new o, a = [], y.onready(function() {
      y.onevent(document.body, "mouseover", !0, function(t) {
        a.push(t)
      }), y.onevent(document.body, "mouseout", !0, function(t) {
        for (var e, n, r = a.length - 1; 0 <= r; r--)
          if (a[r].target === t.target) {
            e = a[r], l.removeElement(a, r);
            break
          } void 0 === e || 1e3 <= (n = t.timeStamp - e.timeStamp) && n <= 2e4 && i.dispatch(e, t)
      })
    }), function(t) {
      i.push(t)
    }), y.onhashchange = (s = new o, g = document.location.hash, window.onhashchange ? y.onevent(window, "hashchange", !1, b) : setInterval(function() {
      b({})
    }, 25), function(t) {
      s.push(t)
    }), y.onerror = (h = new o, "function" == typeof window.onerror && h.push(window.onerror), window.onerror = function(t, e, n) {
      h.dispatch(t, e, n)
    }, function(t) {
      h.push(t)
    }), y.onsubmit = (f = new o, p = u.undup(function(t) {
        f.dispatch(t)
      }), y.onready(function() {
        y.onevent(document.body, "submit", !0, function(t) {
            p(t)
          }),
          // Intercept enter keypresses which will submit the form in most browsers.
          y.onevent(document.body, "keypress", !1, function(t) {
            var e;
            13 != t.keyCode || (e = t.target.form) && (t.form = e, p(t))
          }),
          // Intercept clicks on any buttons:
          y.onevent(document.body, "click", !1, function(t) {
            var e = t.target,
              n = (e.type || "").toLowerCase();
            !e.form || "submit" !== n && "button" !== n || (t.form = e.form, p(t))
          })
      }), function(t) {
        f.push(t)
      }
      /**
       * Initializes Scribe. This is called internally by the constructor and does
       * not need to be called manually.
       */
    ), t.prototype.initialize = function() {
      var t, e, i, a = this;

      function s(t) {
        var e, n, r;
        a.oldHash !== t && (e = t.substring(1), n = document.getElementById(e), r = u.merge({
          url: u.parseUrl(document.location)
        }, n ? c.getNodeDescriptor(n) : {
          id: e
        }), a.track("jump", {
          target: r,
          source: {
            url: u.merge(u.parseUrl(document.location), {
              hash: a.oldHash
            })
          }
        }), a.oldHash = t)
      }
      this.options = u.merge({
          bucket: "none",
          breakoutUsers: !1,
          breakoutVisitors: !1,
          waitOnTracker: !1,
          resolveGeo: !1,
          trackPageViews: !1,
          trackClicks: !1,
          trackHashChanges: !1,
          trackEngagement: !1,
          trackLinkClicks: !1,
          trackRedirects: !1,
          trackSubmissions: !1
        }, this.options),
        // Always assume that Javascript is the culprit of leaving the page
        // (we'll detect and intercept clicks on links and buttons as best
        // as possible and override this assumption in these cases):
        this.javascriptRedirect = !0, this.context = {}, this.context.fingerprint = d.getFingerprint(), this.context.sessionId = (t = sessionStorage.getItem("scribe_sid") || u.genGuid(), sessionStorage.setItem("scribe_sid", t), t), this.context.visitorId = (e = localStorage.getItem("scribe_vid") || u.genGuid(), localStorage.setItem("scribe_vid", e), e), this.context.userId = JSON.parse(localStorage.getItem("scribe_uid") || "null"), this.context.userProfile = JSON.parse(localStorage.getItem("scribe_uprofile") || "null"), a.oldHash = document.location.hash,
        // Try to obtain geo location if possible:
        this.options.resolveGeo && r(function(t) {
          a.context.geo = t
        }),
        // Track page view
        this.options.trackPageView && y.onready(function() {
          // Track page view, but only after the DOM has loaded:
          a.pageview()
        }),
        // Track clicks
        this.options.trackClicks && y.onready(function() {
          // Track all clicks to the document:
          y.onevent(document.body, "click", !0, function(t) {
            var e = c.getAncestors(t.target);
            // Do not track clicks on links, these are tracked separately!
            l.exists(e, function(t) {
              return "A" === t.tagName
            }) || a.track("click", {
              target: c.getNodeDescriptor(t.target)
            })
          })
        }),
        // Track hash changes:
        this.options.trackHashChanges && y.onhashchange(function(t) {
          s(t.hash)
        }),
        // Track all engagement:
        this.options.trackEngagement && y.onengage(function(t, e) {
          a.track("engage", {
            target: c.getNodeDescriptor(t.target),
            duration: e.timeStamp - t.timeStamp
          })
        }),
        // Track all clicks on links:
        this.options.trackLinkClicks && (i = this, c.monitorElements("a", function(o) {
          y.onevent(o, "click", !0, function(t) {
            //return if this click it created with createEvent and not by a real click
            var e, n, r;
            t.isTrusted && (e = t.target,
              // TODO: Make sure the link is actually to a page.
              // It's a click, not a Javascript redirect:
              a.javascriptRedirect = !1, setTimeout(function() {
                a.javascriptRedirect = !0
              }, 500), n = u.parseUrl(o.href), r = {
                target: u.merge({
                  url: n
                }, c.getNodeDescriptor(e))
              }, u.isSamePage(n, document.location.href) ? (
                // User is jumping around the same page. Track here in case the
                // client prevents the default action and the hash doesn't change
                // (otherwise it would be tracked by onhashchange):
                a.oldHash = void 0, s(document.location.hash)) : n.hostname === document.location.hostname ?
              // We are linking to a page on the same site. There's no need to send
              // the event now, we can safely send it later:
              a.trackLater("click", r) : (i.options.waitOnTracker && t.preventDefault(),
                // We are linking to a page that is not on this site. So we first
                // wait to send the event before simulating a different click
                // on the link. This ensures we don't lose the event if the user
                // does not return to this site ever again.
                a.track("click", r, function() {
                  // It's a click, not a Javascript redirect:
                  a.javascriptRedirect = !1,
                    // Simulate a click to the original element if we were waiting on the tracker:
                    i.options.waitOnTracker && c.simulateMouseEvent(e, "click")
                })))
          })
        })),
        // Track JavaScript-based redirects, which can occur without warning:
        this.options.trackRedirects && y.onexit(function(t) {
          a.javascriptRedirect && a.trackLater("redirect")
        }),
        // Track form submissions:
        this.options.trackSubmissions && y.onsubmit(function(t) {
          t.form && (t.form.formId || (t.form.formId = u.genGuid()), a.trackLater("formsubmit", {
            form: u.merge({
              formId: t.form.formId
            }, c.getFormData(t.form))
          }))
        }),
        // Track form abandonments:
        // Load and send any pending events:
        this._loadOutbox(), this._sendOutbox()
    },
    /**
     * Retrieves the path where a certain category of data is stored.
     *
     * @memberof Scribe
     *
     * @param type  A simple String describing the category of data, such as
     *              'profile' or 'events'.
     */
    t.prototype.getPath = function(t) {
      var e = new Date;
      return (this.context.userId ? this.options.breakoutUsers ? "/users/" + this.context.userId + "/" : "/users/" : this.options.breakoutVisitors ? "/visitors/" + this.context.visitorId + "/" : "/visitors/") + (/daily|day/.test(this.options.bucket) ? e.getUTCFullYear() + "-" + u.padLeft(e.getUTCMonth(), 2) + "-" + u.padLeft(e.getUTCDate(), 2) + "/" : /month/.test(this.options.bucket) ? e.getUTCFullYear() + "-" + u.padLeft(e.getUTCMonth(), 2) + "/" : /year/.test(this.options.bucket) ? e.getUTCFullYear() + "/" : "") + t + "/"
    }, t.prototype._saveOutbox = function() {
      localStorage.setItem("scribe_outbox", JSON.stringify(this.outbox))
    }, t.prototype._loadOutbox = function() {
      this.outbox = JSON.parse(localStorage.getItem("scribe_outbox") || "[]")
    }, t.prototype._sendOutbox = function() {
      for (var t = 0; t < this.outbox.length; t++) {
        var e = this.outbox[t],
          n = e.value.event;
        // If source and target urls are the same, change redirect events
        // to reload events:
        if (
          // Specially modify redirect, formSubmit events to save the new URL,
          // because the URL is not known at the time of the event:
          l.contains(["redirect", "formSubmit"], n) && (e.value.target = u.jsonify(u.merge(e.value.target || {}, {
            url: u.parseUrl(document.location)
          }))), "redirect" === n) try {
          u.unparseUrl(e.value.source.url) === u.unparseUrl(e.value.target.url) && (
            // It's a reload:
            e.value.event = "reload")
        } catch (t) {
          window.onerror && window.onerror(t)
        }
        try {
          this.trackerInstance.tracker(e)
        } catch (t) {
          // Don't let one bad apple spoil the batch.
          window.onerror && window.onerror(t)
        }
      }
      this.outbox = [], this._saveOutbox()
    },
    /**
     * Identifies a user.
     *
     * @memberof Scribe
     *
     * @param userId  The unique user id.
     * @param props   An arbitrary JSON object describing properties of the user.
     *
     */
    t.prototype.identify = function(t, e, n, r, o) {
      this.context.userId = t, this.context.userProfile = e, localStorage.setItem("scribe_uid", JSON.stringify(t)), localStorage.setItem("scribe_uprofile", JSON.stringify(e || {})), this.context = u.merge(n || {}, this.context), this.trackerInstance.tracker({
        path: this.getPath("profile"),
        value: this._createEvent(void 0, e),
        op: "replace",
        success: r,
        failure: o
      })
      /**
       * A utility function to create an event. Adds timestamp, stores the name
       * of the event and contextual data, and generates an idiomatic, trimmed
       * JSON objects that contains all event details.
       */
    }, t.prototype._createEvent = function(t, e) {
      return (e = e || {}).timestamp = e.timestamp || (new Date).toISOString(), e.event = t, e.source = u.merge({
        url: u.parseUrl(document.location)
      }, e.source || {}), u.jsonify(u.merge(this.context, e))
      /**
       * Tracks an event now.
       *
       * @memberof Scribe
       *
       * @param name        The name of the event, such as 'downloaded trial'.
       * @param props       An arbitrary JSON object describing properties of the event.
       * @param callback    A function to call when the tracking is complete.
       *
       */
    }, t.prototype.track = function(t, e, n, r) {
      this.trackerInstance.tracker({
        path: this.getPath("events"),
        value: this._createEvent(t, e),
        op: "append",
        success: n,
        failure: r
      })
    },
    /**
     * Tracks an event later. The event will only be tracked if the user visits
     * some page on the same domain that has Scribe Analytics installed.
     *
     * This function is mainly useful when the user is leaving the page and
     * there is not enough time to capture some user behavior.
     *
     * @memberof Scribe
     *
     * @param name        The name of the event, such as 'downloaded trial'.
     * @param props       An arbitrary JSON object describing properties of the event.
     *
     */
    t.prototype.trackLater = function(t, e) {
      this.outbox.push({
        path: this.getPath("events"),
        value: this._createEvent(t, e),
        op: "append"
      }), this._saveOutbox()
      /**
       * Identifies the user as a member of some group.
       *
       * @memberof Scribe
       *
       * @param groupId
       * @param props
       *
       */
    }, t.prototype.group = function(t, e, n, r) {
      this.context.userGroupId = t, this.context.userGroupProfile = e, this.context = u.merge(context || {}, this.context), this.trackerInstance.tracker({
        path: this.getPath("groups"),
        value: this._createEvent(void 0, e),
        op: "replace",
        success: n,
        failure: r
      })
      /**
       * Tracks a page view.
       *
       */
    }, t.prototype.pageview = function(t, e, n) {
      t = t || document.location, this.track("pageview", u.merge(d.getPageloadData(), {
        url: u.parseUrl(t + "")
      }), e, n)
    }
}(Scribe = function(t) {
  if (!(this instanceof Scribe)) return new Scribe(config);
  t = t || {}, this.options = t, this.trackerInstance = t.tracker, this.initialize()
});