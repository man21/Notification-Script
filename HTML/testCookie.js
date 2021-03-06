var isTabVisibility = true,
  flagMouseOver = false;
var exclued_button_text = 'login, signin, loginnow, memberlogin, accountlogin, post comment';
var __pathname = window.location.pathname;
__pathname = '/' + __pathname.split('/')[1];

var influenceScript = 'testCookie.js';
var BASE_URL = "https://strapi.useinfluence.co";

var m = []


document.addEventListener('visibilitychange', function(e) {
  document.hidden ? isTabVisibility = false : isTabVisibility = true;
});


if (typeof Influence === 'undefined') {
  /**
   * Constructs a new Influence  Analytics tracker.
   *
   * @constructor Influence
   *
   * @param options.tracker   The tracker to use for tracking events.
   *                          Must be: function(collection, event).
   *
   */
  var Influence = function(options) {
    if (!(this instanceof Influence)) return new Influence(config);
    /**
     * New InfluenceTracker()
     * @type {{tracker}|{}}
     */
    tracker = new InfluenceTracker(options.trackingId);
    var notificationTimmer = setInterval(function() {


      cookie = new CookieFunc(options.trackingId);
      this.notificationsInstance = cookie;


      clearInterval(notificationTimmer);
    }, 100);

    options = options || {};

    this.options = options;

    this.trackerInstance = tracker;

    this.initialize();
  };

  (function(Influence) {
    Influence.prototype.options = function() {
      return this.options;
    };

    // Browser Detection
    var BrowserDetect = (function() {
      var BrowserDetect = {
        init: function() {
          this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
          this.version = this.searchVersion(navigator.userAgent) ||
            this.searchVersion(navigator.appVersion) ||
            "an unknown version";
          this.OS = this.searchString(this.dataOS) || "an unknown OS";
        },
        searchString: function(data) {
          var len = data.length
          for (var i = 0; i < len; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
              if (dataString.indexOf(data[i].subString) != -1)
                return data[i].identity;
            } else if (data[i].prop)
              return data[i].identity;
          }
        },
        searchVersion: function(dataString) {
          var index = dataString.indexOf(this.versionSearchString);
          if (index == -1) return;
          return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        },
        dataBrowser: [{
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
          },
          {
            string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
          },
          {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
          },
          {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
          },
          {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
          },
          {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
          },
          {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
          },
          {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
          },
          { // for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
          },
          {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
          },
          {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
          },
          { // for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
          }
        ],
        dataOS: [{
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
          },
          {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
          },
          {
            string: navigator.userAgent,
            subString: "iPod",
            identity: "iPod"
          },
          {
            string: navigator.userAgent,
            subString: "iPad",
            identity: "iPad"
          },
          {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone"
          },
          {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
          }
        ]

      };
      BrowserDetect.init();
      return BrowserDetect;
    })();

    var Geo = {};

    Geo.geoip = function(success, failure) {
      httpGetAsync('https://extreme-ip-lookup.com/json/?key=UTiXVnrYntPf6s0qokOK', (res) => {
        response = JSON.parse(res);
        if (response)
          success({
            latitude: response.lat,
            longitude: response.lon,
            city: response.city,
            country: response.country,
            region: response.region,
            ip: response.query
          });
        else
          failure;
      });
    };

    var Util = {};

    Util.copyFields = function(source, target) {
      var createDelegate = function(source, value) {
        return function() {
          return value.apply(source, arguments);
        };
      };

      target = target || {};

      var key, value;

      for (key in source) {
        if (!/layerX|Y/.test(key)) {
          value = source[key];

          if (typeof value === 'function') {
            // Bind functions to object being copied (???):
            target[key] = createDelegate(source, value);
          } else {
            target[key] = value;
          }
        }
      }

      return target;
    };

    Util.merge = function(o1, o2) {
      var r, key, index;
      if (o1 === undefined) return o1;
      else if (o2 === undefined) return o1;
      else if (o1 instanceof Array && o2 instanceof Array) {
        r = [];
        // Copy
        for (index = 0; index < o1.length; index++) {
          r.push(o1[index]);
        }
        // Merge
        for (index = 0; index < o2.length; index++) {
          if (r.length > index) {
            r[index] = Util.merge(r[index], o2[index]);
          } else {
            r.push(o2[index]);
          }
        }
        return r;
      } else if (o1 instanceof Object && o2 instanceof Object) {
        r = {};
        // Copy:
        for (key in o1) {
          r[key] = o1[key];
        }
        // Merge:
        for (key in o2) {
          if (r[key] !== undefined) {
            r[key] = Util.merge(r[key], o2[key]);
          } else {
            r[key] = o2[key];
          }
        }
        return r;
      } else {
        return o2;
      }
    };

    Util.toObject = function(olike) {
      var o = {},
        key;

      for (key in olike) {
        o[key] = olike[key];
      }

      return o;
    };

    Util.genGuid = function() {
      var s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    };

    Util.parseQueryString = function(qs) {
      var pairs = {};

      if (qs.length > 0) {
        var query = qs.charAt(0) === '?' ? qs.substring(1) : qs;

        if (query.length > 0) {
          var vars = query.split('&');
          for (var i = 0; i < vars.length; i++) {
            if (vars[i].length > 0) {
              var pair = vars[i].split('=');

              try {
                var name = decodeURIComponent(pair[0]);
                var value = (pair.length > 1) ? decodeURIComponent(pair[1]) : 'true';

                pairs[name] = value;
              } catch (e) {}
            }
          }
        }
      }
      return pairs;
    };

    Util.unparseQueryString = function(qs) {
      var kvs = [],
        k, v;
      for (k in qs) {
        if (!qs.hasOwnProperty || qs.hasOwnProperty(k)) {
          v = qs[k];

          kvs.push(
            encodeURIComponent(k) + '=' + encodeURIComponent(v)
          );
        }
      }
      var string = kvs.join('&');

      if (string.length > 0) return '?' + string;
      else return '';
    };

    Util.size = function(v) {
      if (v === undefined) return 0;
      else if (v instanceof Array) return v.length;
      else if (v instanceof Object) {
        var size = 0;
        for (var key in v) {
          if (!v.hasOwnProperty || v.hasOwnProperty(key)) ++size;
        }
        return size;
      } else return 1;
    };

    Util.mapJson = function(v, f) {
      var vp, vv;
      if (v instanceof Array) {
        vp = [];
        for (var i = 0; i < v.length; i++) {
          vv = Util.mapJson(v[i], f);

          if (Util.size(vv) > 0) vp.push(vv);
        }
        return vp;
      } else if (v instanceof Object) {
        vp = {};
        for (var k in v) {
          vv = Util.mapJson(v[k], f);

          if (Util.size(vv) > 0) vp[k] = vv;
        }
        return vp;
      } else return f(v);
    };

    Util.jsonify = function(v) {
      return Util.mapJson(v, function(v) {
        if (v === '') return undefined;
        else {
          var r;
          try {
            r = JSON.parse(v);
          } catch (e) {
            r = v;
          }

          return r;
        }
      });
    };

    Util.undup = function(f, cutoff) {
      cutoff = cutoff || 250;

      var lastInvoked = 0;
      return function() {
        var curTime = (new Date()).getTime();
        var delta = curTime - lastInvoked;

        if (delta > cutoff) {
          lastInvoked = curTime;

          return f.apply(this, arguments);
        } else {
          return undefined;
        }
      };
    };

    Util.parseUrl = function(url) {
      var l = document.createElement("a");
      l.href = url;
      if (l.host === '') {
        l.href = l.href;
      }
      return {
        hash: l.hash,
        host: l.host,
        hostname: l.hostname,
        pathname: l.pathname,
        protocol: l.protocol,
        query: Util.parseQueryString(l.search)
      };
    };

    Util.unparseUrl = function(url) {
      return (url.protocol || '') +
        '//' +
        (url.host || '') +
        (url.pathname || '') +
        Util.unparseQueryString(url.query) +
        (url.hash || '');
    };

    Util.equals = function(v1, v2) {
      var leftEqualsObject = function(o1, o2) {
        for (var k in o1) {
          if (!o1.hasOwnProperty || o1.hasOwnProperty(k)) {
            if (!Util.equals(o1[k], o2[k])) return false;
          }
        }
        return true;
      };

      if (v1 instanceof Array) {
        if (v2 instanceof Array) {
          if (v1.length !== v2.length) return false;

          for (var i = 0; i < v1.length; i++) {
            if (!Util.equals(v1[i], v2[i])) {
              return false;
            }
          }

          return true;
        } else {
          return false;
        }
      } else if (v1 instanceof Object) {
        if (v2 instanceof Object) {
          return leftEqualsObject(v1, v2) && leftEqualsObject(v2, v1);
        } else {
          return false;
        }
      } else {
        return v1 === v2;
      }
    };

    Util.isSamePage = function(url1, url2) {
      url1 = url1 instanceof String ? Util.parseUrl(url1) : url1;
      url2 = url2 instanceof String ? Util.parseUrl(url2) : url2;

      // Ignore the hash when comparing to see if two pages represent the same resource:
      return url1.protocol === url2.protocol &&
        url1.host === url2.host &&
        url1.pathname === url2.pathname &&
        Util.equals(url1.query, url2.query);
    };

    Util.qualifyUrl = function(url) {
      var escapeHTML = function(s) {
        return s.split('&').join('&amp;').split('<').join('&lt;').split('"').join('&quot;');
      };

      var el = document.createElement('div');
      el.innerHTML = '<a href="' + escapeHTML(url) + '">x</a>';
      return el.firstChild.href;
    };

    Util.padLeft = function(n, p, c) {
      var pad_char = typeof c !== 'undefined' ? c : '0';
      var pad = new Array(1 + p).join(pad_char);
      return (pad + n).slice(-pad.length);
    };

    var DomUtil = {};


    DomUtil.loadCss = function(css) {
      try {
        var head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style');

        head.appendChild(style);

        style.type = 'text/css';
        style.id = "dynamicLoaded"
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }
      } catch (e) {
        console.log(e);
      }
    }

    // DomUtil.getFormData = function(node) {
    //   if (node) {
    //     const queryString = new URLSearchParams(new FormData(node)).toString()
    //     const formObj = Util.parseQueryString(queryString)
    //     const objValue = Object.values(formObj)
    //     const email = objValue.find(o => o.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi));
    //     const firstname = formObj["customerFirstName"] || formObj["firstname"] || formObj["form_fields[name]"] || formObj["form_fields[firstname]"] || formObj["your-name"] || formObj["name"] || formObj["NAMA"] || formObj["FNAME"] || formObj["customerFirstName"] || formObj["Fname"] || formObj["nama"] || formObj["NAME"] || formObj["FIRSTNAME"] || formObj["username"] || formObj["FIRST NAME"] || formObj["UserName"] || formObj["USERNAME"] || formObj["userName"] || formObj["Username"] || formObj["user_id"] || formObj["ctl19$txtName"] || formObj["form_submission[name]"] || formObj["wpforms[fields][12]"] || formObj["checkout_offer[extra_contact_information][custom_14]"]
    //     const lastname = formObj["customerLastName"] || formObj["lastname"] || formObj["form_fields[lastname]"] || formObj["last-name"] || formObj["lname"] || formObj["LNAME"] || formObj["customerLastName"] || formObj["Lname"] || formObj["lnama"] || formObj["LNAME"] || formObj["LASTNAME"] || formObj["LAST NAME"]

    //     return ({
    //       firstname: firstname ? firstname.replace('+', ' ') : '',
    //       lastname: lastname ? lastname.replace('+', ' ') : '',
    //       email
    //     })
    //   }
    //   return ({})
    // }


    DomUtil.monitorElements = function(tagName, onnew, refresh) {
      refresh = refresh || 50;

      var checker = function() {
        var curElements = document.getElementsByTagName(tagName);

        var curLen = curElements.length;
        for (var i = 0; i < curLen; i++) {
          var el = curElements[i];

          var scanned = el.getAttribute('influence_scanned');

          if (!scanned) {
            el.setAttribute('influence_scanned', true);
            try {
              onnew(el);
            } catch (e) {
              window.onerror(e);
            }
          }
        }

        setTimeout(checker, refresh);
      };

      setTimeout(checker, 0);
    };

    DomUtil.getDataset = function(node) {
      if (typeof node.dataset !== 'undefined') {
        return Util.toObject(node.dataset);
      } else if (node.attributes) {
        var dataset = {};

        var attrs = node.attributes;
        var attrsLen = attrs.length;
        for (var i = 0; i < attrsLen; i++) {
          var name = attrs[i].name;

          if (name.indexOf('data-') === 0) {
            name = name.substr('data-'.length);

            dataset[name] = attrs[i].value;
          }
        }

        return dataset;
      } else return {};
    };


    DomUtil.genCssSelector = function(node) {
      var sel = '';

      while (node != document.body) {
        var id = node.id;
        var classes = typeof node.className === 'string' ?
          node.className.trim().split(/\s+/).join(".") : '';
        var tagName = node.nodeName.toLowerCase();

        if (id && id !== "") id = '#' + id;
        if (classes !== "") classes = '.' + classes;

        var prefix = tagName + id + classes;

        var parent = node.parentNode;

        var nthchild = 1;

        for (var i = 0; i < parent.childNodes.length; i++) {
          if (parent.childNodes[i] === node) break;
          else {
            if (parent.childNodes[i].tagName !== undefined) {
              nthchild = nthchild + 1;
            }
          }
        }

        if (sel !== '') sel = '>' + sel;

        sel = prefix + ':nth-child(' + nthchild + ')' + sel;

        node = parent;
      }

      return sel;
    };

    DomUtil.getNodeDescriptor = function(node) {
      return {
        id: node.id,
        selector: DomUtil.genCssSelector(node),
        title: node.title === '' ? undefined : node.title,
        data: DomUtil.getDataset(node)
      };
    };

    DomUtil.getAncestors = function(node) {
      var cur = node;
      var result = [];

      while (cur && cur !== document.body) {
        result.push(cur);
        cur = cur.parentNode;
      }

      return result;
    };

    DomUtil.simulateMouseEvent = function(element, eventName, options) {
      var eventMatchers = {
        'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
        'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
      };

      options = Util.merge({
        pointerX: 0,
        pointerY: 0,
        button: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        bubbles: true,
        cancelable: true
      }, options || {});

      var oEvent, eventType = null;

      for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) {
          eventType = name;
          break;
        }
      }

      if (!eventType) throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

      if (document.createEvent) {
        oEvent = document.createEvent(eventType);
        if (eventType === 'HTMLEvents') {
          oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        } else {
          oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element
          );
        }
        element.dispatchEvent(oEvent);
      } else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = Util.merge(evt, options);
        try {
          element.fireEvent('on' + eventName, oEvent);
        } catch (error) {
          // IE nonsense:
          element.fireEvent('on' + eventName);
        }
      }
      return element;
    };

    var ArrayUtil = {};

    ArrayUtil.removeElement = function(array, from, to) {
      var tail = array.slice((to || from) + 1 || array.length);
      array.length = from < 0 ? array.length + from : from;
      return array.push.apply(array, tail);
    };

 

    ArrayUtil.contains = function(array, el) {
      return ArrayUtil.exists(array, function(e) {
        return e === el;
      });
    };

    ArrayUtil.diff = function(arr1, arr2) {
      var i, el, diff = [];
      for (i = 0; i < arr1.length; i++) {
        el = arr1[i];

        if (!ArrayUtil.contains(arr2, el)) diff.push(el);
      }
      return diff;
    };

    ArrayUtil.exists = function(array, f) {
      for (var i = 0; i < array.length; i++) {
        if (f(array[i])) return true;
      }
      return false;
    };

    ArrayUtil.map = function(array, f) {
      var r = [],
        i;
      for (i = 0; i < array.length; i++) {
        r.push(f(array[i]));
      }
      return r;
    };

    var Env = {};

    Env.getFingerprint = function() {
      var data = [
        JSON.stringify(Env.getPluginsData()),
        JSON.stringify(Env.getLocaleData()),
        navigator.userAgent.toString()
      ];

      return MD5.hash(data.join(""));
    };

    Env.getBrowserData = function() {
      var fingerprint = Env.getFingerprint();

      return ({
        ua: navigator.userAgent,
        name: BrowserDetect.browser,
        version: BrowserDetect.version,
        platform: BrowserDetect.OS,
        language: navigator.language || navigator.userLanguage || navigator.systemLanguage,
        plugins: Env.getPluginsData()
      });
    };

    Env.getUrlData = function() {
      var l = document.location;
      return ({
        hash: l.hash,
        host: l.host,
        hostname: l.hostname,
        pathname: l.pathname,
        protocol: l.protocol,
        query: Util.parseQueryString(l.search)
      });
    };

    Env.getDocumentData = function() {
      return ({
        title: document.title,
        referrer: document.referrer && Util.parseUrl(document.referrer) || undefined,
        url: Env.getUrlData()
      });
    };

    Env.getScreenData = function() {
      return ({
        height: screen.height,
        width: screen.width,
        colorDepth: screen.colorDepth
      });
    };

    Env.getLocaleData = function() {
      // "Mon Apr 15 2013 12:21:35 GMT-0600 (MDT)"
      //
      var results = new RegExp('([A-Z]+-[0-9]+) \\(([A-Z]+)\\)').exec((new Date()).toString());

      var gmtOffset, timezone;

      if (results && results.length >= 3) {
        gmtOffset = results[1];
        timezone = results[2];
      }

      return ({
        language: navigator.systemLanguage || navigator.userLanguage || navigator.language,
        timezoneOffset: (new Date()).getTimezoneOffset(),
        gmtOffset: gmtOffset,
        timezone: timezone
      });
    };

    Env.getPageloadData = function() {
      var l = document.location;
      return {
        //browser: Env.getBrowserData(),
        document: Env.getDocumentData(),
        screen: Env.getScreenData(),
        locale: Env.getLocaleData()
      };
    };

    Env.getPluginsData = function() {
      var plugins = [];
      var p = navigator.plugins;
      var pLen = p.length;
      for (var i = 0; i < pLen; i++) {
        var pi = p[i];
        plugins.push({
          name: pi.name,
          description: pi.description,
          filename: pi.filename,
          version: pi.version,
          mimeType: (pi.length > 0) ? ({
            type: pi[0].type,
            description: pi[0].description,
            suffixes: pi[0].suffixes
          }) : undefined
        });
      }
      return plugins;
    };

    var Handler = function() {
      this.handlers = [];
      this.onerror = (console && console.log) || window.onerror || (function(e) {});
    };

    Handler.prototype.push = function(f) {
      this.handlers.push(f);
    };

    Handler.prototype.dispatch = function() {
      var args = Array.prototype.slice.call(arguments, 0),
        i;

      for (i = 0; i < this.handlers.length; i++) {
        try {
          this.handlers[i].apply(null, args);
        } catch (e) {
          onerror(e);
        }
      }
    };

    var Events = {};

    Events.onready = function(f) {
      if (document.body != null) f();
      else setTimeout(function() {
        Events.onready(f);
      }, 10);
    };

    Events.onevent = function(el, type, capture, f_) {
      var fixup = function(f) {
        return function(e) {
          if (!e) e = window.event;

          // Perform a shallow clone (Firefox bugs):
          e = Util.copyFields(e);

          e.target = e.target || e.srcElement;
          e.keyCode = e.keyCode || e.which || e.charCode;
          e.which = e.which || e.keyCode;
          e.charCode = (typeof e.which === "number") ? e.which : e.keyCode;
          e.timeStamp = e.timeStamp || (new Date()).getTime();

          if (e.target && e.target.nodeType == 3) e.target = e.target.parentNode;

          var retVal;

          if (!e.preventDefault) {
            e.preventDefault = function() {
              retVal = false;
            };
          }

          return f(e) || retVal;
        };
      };

      var f = fixup(f_);

      if (el.addEventListener) {
        el.addEventListener(type, f, capture);
      } else if (el.attachEvent) {
        el.attachEvent('on' + type, f);
      }
    };

    Events.onexit = (function() {
      var unloaded = false;

      var handler = new Handler();

      var handleUnload = function(e) {
        if (!unloaded) {
          handler.dispatch(e);
          unloaded = true;
        }
      };

      Events.onevent(window, 'unload', undefined, handleUnload);

      var replaceUnloader = function(obj) {
        var oldUnloader = obj.onunload || (function(e) {});

        obj.onunload = function(e) {
          handleUnload();

          oldUnloader(e);
        };
      };

      replaceUnloader(window);

      Events.onready(function() {
        replaceUnloader(document.body);
      });

      return function(f) {
        handler.push(f);
      };
    })();

    Events.onengage = (function() {
      var handler = new Handler();
      var events = [];

      Events.onready(function() {
        Events.onevent(document.body, 'mouseover', true, function(e) {
          events.push(e);
        });

        Events.onevent(document.body, 'mouseout', true, function(end) {
          var i, start;

          for (i = events.length - 1; i >= 0; i--) {
            if (events[i].target === end.target) {
              start = events[i];
              ArrayUtil.removeElement(events, i);
              break;
            }
          }

          if (start !== undefined) {
            var delta = (end.timeStamp - start.timeStamp);

            if (delta >= 1000 && delta <= 20000) {
              handler.dispatch(start, end);
            }
          }
        });
      });

      return function(f) {
        handler.push(f);
      };
    })();

    Events.onhashchange = (function() {
      var handler = new Handler();
      var lastHash = document.location.hash;

      var dispatch = function(e) {
        var newHash = document.location.hash;

        if (lastHash != newHash) {
          lastHash = newHash;

          e.hash = newHash;

          handler.dispatch(e);
        }
      };

      if (window.onhashchange) {
        Events.onevent(window, 'hashchange', false, dispatch);
      } else {
        setInterval(function() {
          dispatch({});
        }, 25);
      }

      return function(f) {
        handler.push(f);
      };
    })();

    Events.onerror = (function() {
      var handler = new Handler();

      if (typeof window.onerror === 'function') handler.push(window.onerror);

      window.onerror = function(err, url, line) {
        handler.dispatch(err, url, line);
      };

      return function(f) {
        handler.push(f);
      };
    })();

    Events.onsubmit = (function() {
      var handler = new Handler();

      var handle = Util.undup(function(e) {
        handler.dispatch(e);
      });

      Events.onready(function() {
        Events.onevent(document.body, 'submit', true, function(e) {
          handle(e);
        });

        // Intercept enter keypresses which will submit the form in most browsers.
        Events.onevent(document.body, 'keypress', false, function(e) {
          if (e.keyCode == 13) {
            var target = e.target;
            var form = target.form;

            if (form) {
              e.form = form;
              handle(e);
            }
          }
        });

        // Intercept clicks on any buttons:
        Events.onevent(document.body, 'click', false, function(e) {
          var target = e.target;
          var targetType = (target.type || '').toLowerCase();

          if (e && e.target && (e.target.innerText || e.target.defaultValue) && exclued_button_text.indexOf(e.target.innerText.toLowerCase().replace(/\s/g, "") || e.target.defaultValue.toLowerCase().replace(/\s/g, "")) !== -1) return;
          if (target.form && (targetType === 'submit' || targetType === 'button')) {
            e.form = target.form;
            handle(e);
          }
        });
      });

      return function(f) {
        handler.push(f);
      };
    })();

    /**
     * Initializes Influence. This is called internally by the constructor and does
     * not need to be called manually.
     */
    Influence.prototype.initialize = function() {
      var self = this;

      this.options = Util.merge({
        bucket: 'none',
        breakoutUsers: false,
        breakoutVisitors: false,
        waitOnTracker: false,
        resolveGeo: true,
        trackPageViews: true,
        trackClicks: false,
        trackHashChanges: false,
        trackEngagement: false,
        trackLinkClicks: false,
        trackRedirects: false,
        trackSubmissions: true
      }, this.options);

      this.options.trackEngagement = false;
      // Always assume that Javascript is the culprit of leaving the page
      // (we'll detect and intercept clicks on links and buttons as best
      // as possible and override this assumption in these cases):
      this.javascriptRedirect = true;

      this.context = {};

      this.context.fingerprint = Env.getFingerprint();

      this.context.sessionId = (function() {
        var sessionId = sessionStorage.getItem('influence_sid') || Util.genGuid();

        sessionStorage.setItem('influence_sid', sessionId);

        return sessionId;
      })();

      function readCookie(name) {
        var key = name + "=";
        var cookies = document.cookie.split(';');

        var cookieLen = cookies.length;
        for (var i = 0; i < cookieLen; i++) {
          var cookie = cookies[i];
          while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
          }
          if (cookie.indexOf(key) === 0) {
            return cookie.substring(key.length, cookie.length);
          }
        }
        return null;
      }

      this.context.visitorId = (function() {
        var visitorId = readCookie('influence_vid');

        if (!visitorId) {
          visitorId = Util.genGuid();
          document.cookie = `influence_vid=${visitorId};`;
        }

        return visitorId;
      })();

      this.context.trackingId = this.options.trackingId;

      this.context.userId = JSON.parse(localStorage.getItem('influence_uid') || 'null');
      this.context.userProfile = JSON.parse(localStorage.getItem('influence_uprofile') || 'null');

      self.oldHash = document.location.hash;

      var trackJump = function(hash) {
        if (self.oldHash !== hash) { // Guard against tracking more than once
          var id = hash.substring(1);

          // If it's a real node, get it so we can capture node data:
          var targetNode = document.getElementById(id);

          var data = Util.merge({
            url: Util.parseUrl(document.location)
          }, targetNode ? DomUtil.getNodeDescriptor(targetNode) : {
            id: id
          });

          self.track('jump', {
            target: data,
            source: {
              url: Util.merge(Util.parseUrl(document.location), {
                hash: self.oldHash // Override the hash
              })
            }
          });

          self.oldHash = hash;
        }
      };

      // Try to obtain geo location if possible:
      if (this.options.resolveGeo) {
        Geo.geoip(function(position) {
          self.context.geo = position;
        });
      }

      // Track page view
      if (this.options.trackPageViews) {
        Events.onready(function() {
          // Track page view, but only after the DOM has loaded:
          self.pageview();
        });
      }

      // Track clicks
      if (this.options.trackClicks) {
        Events.onready(function() {
          // Track all clicks to the document:
          Events.onevent(document.body, 'click', true, function(e) {
            var ancestors = DomUtil.getAncestors(e.target);

            // Do not track clicks on links, these are tracked separately!
            if (!ArrayUtil.exists(ancestors, function(e) {
                return e.tagName === 'A';
              })) {
              self.track('click', {
                target: DomUtil.getNodeDescriptor(e.target)
              });
            }
          });
        });
      }

      // Track hash changes:
      if (this.options.trackHashChanges) {
        Events.onhashchange(function(e) {
          trackJump(e.hash);
        });
      }

      //Set Tracking Id




      // Track all engagement:
      if (this.options.trackEngagement) {
        Events.onengage(function(start, end) {
          self.track('engage', {
            target: DomUtil.getNodeDescriptor(start.target),
            duration: end.timeStamp - start.timeStamp
          });
        });
      }

      // Track all clicks on links:
      if (this.options.trackLinkClicks) {
        var that = this;
        DomUtil.monitorElements('a', function(el) {
          Events.onevent(el, 'click', true, function(e) {
            //return if this click it created with createEvent and not by a real click
            if (!e.isTrusted) return;

            var target = e.target;

            // TODO: Make sure the link is actually to a page.
            // It's a click, not a Javascript redirect:
            self.javascriptRedirect = false;
            setTimeout(function() {
              self.javascriptRedirect = true;
            }, 500);

            var parsedUrl = Util.parseUrl(el.href);
            var value = {
              target: Util.merge({
                url: parsedUrl
              }, DomUtil.getNodeDescriptor(target))
            };

            if (Util.isSamePage(parsedUrl, document.location.href)) {
              // User is jumping around the same page. Track here in case the
              // client prevents the default action and the hash doesn't change
              // (otherwise it would be tracked by onhashchange):
              self.oldHash = undefined;

              trackJump(document.location.hash);
            } else if (parsedUrl.hostname === document.location.hostname) {
              // We are linking to a page on the same site. There's no need to send
              // the event now, we can safely send it later:
              self.trackLater('click', value);
            } else {
              if (that.options.waitOnTracker) e.preventDefault();

              // We are linking to a page that is not on this site. So we first
              // wait to send the event before simulating a different click
              // on the link. This ensures we don't lose the event if the user
              // does not return to this site ever again.
              self.track('click',
                value,
                function() {
                  // It's a click, not a Javascript redirect:
                  self.javascriptRedirect = false;

                  // Simulate a click to the original element if we were waiting on the tracker:
                  if (that.options.waitOnTracker) DomUtil.simulateMouseEvent(target, 'click');
                }
              );
            }
          });
        });

        Events.onevent(document.body, 'click', true, function(e) {
          if (e.target && e.target.className && e.target.className.indexOf && e.target.className.indexOf('FPqR') !== -1) {
            var ancestors = DomUtil.getAncestors(e.target);
            self.track('click', {
              target: DomUtil.getNodeDescriptor(e.target)
            });
          } else {
            //for fetch submit event, for without <form></form>
            var tagname = e.target.tagName;
            var arrEmail = document.getElementsByName("email");
            var strFName = document.getElementsByName("firstname").length > 0 ? document.getElementsByName("firstname")[0].value : '';

            var strLName = document.getElementsByName("lastname").length > 0 ? document.getElementsByName("lastname")[0].value : '';

            if (!strFName)
              strFName = document.getElementsByName("customerFirstName").length > 0 ? document.getElementsByName("customerFirstName")[0].value //: '';
              ||
              document.getElementsByName("firstname")[0].value ||
              document.getElementsByName("form_fields[name]")[0].value || document.getElementsByName("form_fields[firstname]")[0].value ||
              document.getElementsByName("your-name")[0].value || document.getElementsByName("name")[0].value || document.getElementsByName("NAMA")[0].value ||
              document.getElementsByName("FNAME")[0].value || document.getElementsByName("customerFirstName")[0].value ||
              document.getElementsByName("Fname")[0].value || document.getElementsByName("nama")[0].value ||
              document.getElementsByName("NAME")[0].value || document.getElementsByName("FIRSTNAME")[0].value ||
              document.getElementsByName("username")[0].value || document.getElementsByName("FIRST NAME")[0].value ||
              document.getElementsByName("UserName")[0].value || document.getElementsByName("USERNAME")[0].value ||
              document.getElementsByName("userName")[0].value || document.getElementsByName("Username")[0].value ||
              document.getElementsByName("user_id")[0].value :
              '';

            if (!strLName)
              strLName = document.getElementsByName("customerLastName").length > 0 ? document.getElementsByName("customerLastName")[0].value : '';
            var strEmail = '';
            if (document.forms.length == 0 && tagname == 'BUTTON') {
              if (e && e.target && e.target.innerText && exclued_button_text.indexOf(e.target.innerText.toLowerCase().replace(/\s/g, "")) !== -1) return;
              if (arrEmail && arrEmail.length > 0 && arrEmail[0].type !== 'hidden') {
                strEmail = document.getElementsByName("email")[0].value;
              } else {
                strEmail = getEmailByInputType();
              }
              if (strEmail) {
                self.track('formsubmit', {
                  form: Util.merge({
                    formId: Util.genGuid()
                  }, {
                    email: strEmail,
                    firstname: strFName,
                    lastname: strLName
                  })
                });
              }
            }

          }
        });

        Events.onevent(document.body, 'mouseover', true, function(e) {
          if (e.target && e.target.className && e.target.className.indexOf && e.target.className.indexOf('FPqR') !== -1) {
            var ancestors = DomUtil.getAncestors(e.target);
            self.track('mouseover', {
              target: DomUtil.getNodeDescriptor(e.target)
            });
          }
        });
      }

      // Track JavaScript-based redirects, which can occur without warning:
      if (this.options.trackRedirects) {
        Events.onexit(function(e) {
          if (self.javascriptRedirect) {
            self.trackLater('redirect');
          }
        });
      }

      // Track form submissions:
      if (this.options.trackSubmissions) {
        Events.onsubmit((e) => {
          if (e.form) {
            if (!e.form.formId) {
              e.form.formId = Util.genGuid();
            }
            const btnText = e.form.querySelector('button[type="submit"]') ? e.form.querySelector('button[type="submit"]').innerText : e.form.querySelector('input[type="submit"]') ? e.form.querySelector('input[type="submit"]').value : e.form.querySelector('button[type="submit"]') ? e.form.querySelector('button[type="submit"]').value : ''
            const incluedForm = exclued_button_text.indexOf(btnText.toLowerCase().replace(/\s/g, "")) === -1
            if (incluedForm) {
              self.track('formsubmit', {
                form: Util.merge({
                  formId: e.form.formId
                }, DomUtil.getFormData(e.form))
              });
            }
          }
        });
      }


      // Track form abandonments:


      // Load and send any pending events:
      this._loadOutbox();
      this._sendOutbox();

      // DomUtil.loadCss(noteCSS);
      // DomUtil.loadCss(animateCss);
      var attachNotifcationListener = function(container, self) {
        if (!container) {
          return;
        }
        container.addEventListener('mouseover', function(e) {
          self.track('mouseover', {
            target: DomUtil.getNodeDescriptor(e.target) //DomUtil.getNodeDescriptor(e.target)
          });
        });
        container.addEventListener('click', function(e) {
          self.track('click', {
            target: DomUtil.getNodeDescriptor(e.target) //DomUtil.genCssSelector(e.target)
          });
        });
      }
      //notification view
      new MutationObserver(function(mutations) {
        var element = document.querySelector('#FPqR2DbIqJeA2DbI7MM9_0');
        var in_dom = document.body.contains(element);
        if (in_dom) {
          var url = document.location;
          self.track('notificationview', Util.merge(Env.getPageloadData(), {
            url: Util.parseUrl(url + '')
          }));
        }
        attachNotifcationListener(element, self);
      }).observe(document.body, {
        childList: true
      });
    };

    /**
     * Retrieves the path where a certain category of data is stored.
     *
     * @memberof Influence
     *
     * @param type  A simple String describing the category of data, such as
     *              'profile' or 'events'.
     */
    Influence.prototype.getPath = function(type) {
      var now = new Date();
      var rootNode = this.context.userId ? (this.options.breakoutUsers ? '/users/' + this.context.userId + '/' : '/users/') :
        (this.options.breakoutVisitors ? '/visitors/' + this.context.visitorId + '/' : '/visitors/');
      var dateNode;

      if (/daily|day/.test(this.options.bucket)) {
        dateNode = now.getUTCFullYear() + '-' + Util.padLeft(now.getUTCMonth(), 2) + '-' + Util.padLeft(now.getUTCDate(), 2) + '/';
      } else if (/month/.test(this.options.bucket)) {
        dateNode = now.getUTCFullYear() + '-' + Util.padLeft(now.getUTCMonth(), 2) + '/';
      } else if (/year/.test(this.options.bucket)) {
        dateNode = now.getUTCFullYear() + '/';
      } else {
        dateNode = '';
      }

      var targetNode = type + '/';

      return rootNode + dateNode + targetNode;
    };

    Influence.prototype._saveOutbox = function() {
      localStorage.setItem('influence_outbox', JSON.stringify(this.outbox));
    };

    Influence.prototype._loadOutbox = function() {
      this.outbox = JSON.parse(localStorage.getItem('influence_outbox') || '[]');
    };

    Influence.prototype._sendOutbox = function() {
      for (var i = 0; i < this.outbox.length; i++) {
        var message = this.outbox[i];

        var event = message.value.event;

        // Specially modify redirect, formSubmit events to save the new URL,
        // because the URL is not known at the time of the event:
        if (ArrayUtil.contains(['redirect', 'formSubmit'], event)) {
          message.value.target = Util.jsonify(Util.merge(message.value.target || {}, {
            url: Util.parseUrl(document.location)
          }));
        }

        // If source and target urls are the same, change redirect events
        // to reload events:
        if (event === 'redirect') {
          try {
            // See if it's a redirect (= different url) or reload (= same url):
            var sourceUrl = Util.unparseUrl(message.value.source.url);
            var targetUrl = Util.unparseUrl(message.value.target.url);

            if (sourceUrl === targetUrl) {
              // It's a reload:
              message.value.event = 'reload';
            }
          } catch (e) {
            window.onerror && window.onerror(e);
          }
        }

        try {
          this.trackerInstance.tracker(message);
        } catch (e) {
          // Don't let one bad apple spoil the batch.
          window.onerror && window.onerror(e);
        }
      }
      this.outbox = [];
      this._saveOutbox();
    };

    /**
     * Identifies a user.
     *
     * @memberof Influence
     *
     * @param userId  The unique user id.
     * @param props   An arbitrary JSON object describing properties of the user.
     *
     */
    Influence.prototype.identify = function(userId, props, context, success, failure) {
      this.context.userId = this.options.trackingId;
      this.context.userProfile = props;

      localStorage.setItem('influence_uid', JSON.stringify(userId));
      localStorage.setItem('influence_uprofile', JSON.stringify(props || {}));

      this.context = Util.merge(context || {}, this.context);

      this.trackerInstance.tracker({
        path: this.getPath('profile'),
        value: this._createEvent(undefined, props),
        op: 'replace',
        success: success,
        failure: failure
      });
    };

    /**
     * A utility function to create an event. Adds timestamp, stores the name
     * of the event and contextual data, and generates an idiomatic, trimmed
     * JSON objects that contains all event details.
     */
    Influence.prototype._createEvent = function(name, props) {
      props = props || {};

      props.timestamp = props.timestamp || (new Date()).toISOString();
      props.event = name;
      props.source = Util.merge({
        url: Util.parseUrl(document.location)
      }, props.source || {});

      return Util.jsonify(Util.merge(this.context, props));
    };

    /**
     * Tracks an event now.
     *
     * @memberof Influence
     *
     * @param name        The name of the event, such as 'downloaded trial'.
     * @param props       An arbitrary JSON object describing properties of the event.
     * @param callback    A function to call when the tracking is complete.
     *
     */
    Influence.prototype.track = function(name, props, success, failure) {
      this.trackerInstance.tracker({
        path: this.getPath('events'),
        value: this._createEvent(name, props),
        op: 'append',
        success: success,
        failure: failure
      });
    };

    /**
     * Tracks an event later. The event will only be tracked if the user visits
     * some page on the same domain that has Influence Analytics installed.
     *
     * This function is mainly useful when the user is leaving the page and
     * there is not enough time to capture some user behavior.
     *
     * @memberof Influence
     *
     * @param name        The name of the event, such as 'downloaded trial'.
     * @param props       An arbitrary JSON object describing properties of the event.
     *
     */
    Influence.prototype.trackLater = function(name, props) {
      this.outbox.push({
        path: this.getPath('events'),
        value: this._createEvent(name, props),
        op: 'append'
      });

      this._saveOutbox();
    };

    /**
     * Identifies the user as a member of some group.
     *
     * @memberof Influence
     *
     * @param groupId
     * @param props
     *
     */
    Influence.prototype.group = function(groupId, props, success, failure) {
      this.context.userGroupId = groupId;
      this.context.userGroupProfile = props;

      this.context = Util.merge(context || {}, this.context);

      this.trackerInstance.tracker({
        path: this.getPath('groups'),
        value: this._createEvent(undefined, props),
        op: 'replace',
        success: success,
        failure: failure
      });
    };

    /**
     * Tracks a page view.
     *
     */
    Influence.prototype.pageview = function(url, success, failure) {
      url = url || document.location;

      this.track('pageview', Util.merge(Env.getPageloadData(), {
        url: Util.parseUrl(url + '')
      }), success, failure);
    };


    /**
     * MD5 Function
     */


    var MD5 = (typeof MD5 === 'undefined') ? {} : MD5;

    (function(MD5) {
      function md5cycle(x, k) {
        var a = x[0],
          b = x[1],
          c = x[2],
          d = x[3];

        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22, 1236535329);

        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);

        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174);
        d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);

        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);

        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3]);

      }

      function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
      }

      function ff(a, b, c, d, x, s, t) {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
      }

      function gg(a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
      }

      function hh(a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
      }

      function ii(a, b, c, d, x, s, t) {
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
      }

      function md51(s) {
        var n = s.length,
          state = [1732584193, -271733879, -1732584194, 271733878],
          i;
        for (i = 64; i <= s.length; i += 64) {
          md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < s.length; i++)
          tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
          md5cycle(state, tail);
          for (i = 0; i < 16; i++) tail[i] = 0;
        }
        tail[14] = n * 8;
        md5cycle(state, tail);
        return state;
      }

      /* there needs to be support for Unicode here,
       * unless we pretend that we can redefine the MD-5
       * algorithm for multi-byte characters (perhaps
       * by adding every four 16-bit characters and
       * shortening the sum to 32 bits). Otherwise
       * I suggest performing MD-5 as if every character
       * was two bytes--e.g., 0040 0025 = @%--but then
       * how will an ordinary MD-5 sum be matched?
       * There is no way to standardize text to something
       * like UTF-8 before transformation; speed cost is
       * utterly prohibitive. The JavaScript standard
       * itself needs to look at this: it should start
       * providing access to strings as preformed UTF-8
       * 8-bit unsigned value arrays.
       */

      function md5blk(s) {
        /* I figured global was faster.   */
        var md5blks = [],
          i; /* Andy King said do it this way. */
        for (i = 0; i < 64; i += 4) {
          md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
      }

      var hex_chr = '0123456789abcdef'.split('');

      function rhex(n) {
        var s = '',
          j = 0;
        for (; j < 4; j++)
          s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
        return s;
      }

      function hex(x) {
        for (var i = 0; i < x.length; i++)
          x[i] = rhex(x[i]);
        return x.join('');
      }

      function md5(s) {
        return hex(md51(s));
      }

      /* this function is much faster,
      so if possible we use it. Some IEs
      are the only ones I know of that
      need the idiotic second function,
      generated by an if clause.  */

      function add32(a, b) {
        return (a + b) & 0xFFFFFFFF;
      }

      if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
        function add32(x, y) {
          var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
          return (msw << 16) | (lsw & 0xFFFF);
        }
      }

      MD5.hash = md5;
    })(MD5);


    /**
     *
     * Date Function
     */

    // Date shim:
    if (!Date.prototype.toISOString) {
      (function() {
        function pad(number) {
          var r = String(number);
          if (r.length === 1) {
            r = '0' + r;
          }
          return r;
        }

        Date.prototype.toISOString = function() {
          return this.getUTCFullYear() +
            '-' + pad(this.getUTCMonth() + 1) +
            '-' + pad(this.getUTCDate()) +
            'T' + pad(this.getUTCHours()) +
            ':' + pad(this.getUTCMinutes()) +
            ':' + pad(this.getUTCSeconds()) +
            '.' + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) +
            'Z';
        };
      }());
    }

    /**
     * /** HTML5 sessionStorage
     * @build       2009-08-20 23:35:12
     * @author      Andrea Giammarchi
     * @license     Mit Style License
     * @project     http://code.google.com/p/sessionstorage/
     */
    if (typeof sessionStorage === "undefined") {
      (function(j) {
        var k = j;
        try {
          while (k !== k.top) {
            k = k.top
          }
        } catch (i) {}
        var f = (function(e, n) {
          return {
            decode: function(o, p) {
              return this.encode(o, p)
            },
            encode: function(y, u) {
              for (var p = y.length, w = u.length, o = [], x = [], v = 0, s = 0, r = 0, q = 0, t; v < 256; ++v) {
                x[v] = v
              }
              for (v = 0; v < 256; ++v) {
                s = (s + (t = x[v]) + y.charCodeAt(v % p)) % 256;
                x[v] = x[s];
                x[s] = t
              }
              for (s = 0; r < w; ++r) {
                v = r % 256;
                s = (s + (t = x[v])) % 256;
                p = x[v] = x[s];
                x[s] = t;
                o[q++] = e(u.charCodeAt(r) ^ x[(p + t) % 256])
              }
              return o.join("")
            },
            key: function(q) {
              for (var p = 0, o = []; p < q; ++p) {
                o[p] = e(1 + ((n() * 255) << 0))
              }
              return o.join("")
            }
          }
        })(j.String.fromCharCode, j.Math.random);
        var a = (function(n) {
          function o(r, q, p) {
            this._i = (this._data = p || "").length;
            if (this._key = q) {
              this._storage = r
            } else {
              this._storage = {
                _key: r || ""
              };
              this._key = "_key"
            }
          }
          o.prototype.c = String.fromCharCode(1);
          o.prototype._c = ".";
          o.prototype.clear = function() {
            this._storage[this._key] = this._data
          };
          o.prototype.del = function(p) {
            var q = this.get(p);
            if (q !== null) {
              this._storage[this._key] = this._storage[this._key].replace(e.call(this, p, q), "")
            }
          };
          o.prototype.escape = n.escape;
          o.prototype.get = function(q) {
            var s = this._storage[this._key],
              t = this.c,
              p = s.indexOf(q = t.concat(this._c, this.escape(q), t, t), this._i),
              r = null;
            if (-1 < p) {
              p = s.indexOf(t, p + q.length - 1) + 1;
              r = s.substring(p, p = s.indexOf(t, p));
              r = this.unescape(s.substr(++p, r))
            }
            return r
          };
          o.prototype.key = function() {
            var u = this._storage[this._key],
              v = this.c,
              q = v + this._c,
              r = this._i,
              t = [],
              s = 0,
              p = 0;
            while (-1 < (r = u.indexOf(q, r))) {
              t[p++] = this.unescape(u.substring(r += 2, s = u.indexOf(v, r)));
              r = u.indexOf(v, s) + 2;
              s = u.indexOf(v, r);
              r = 1 + s + 1 * u.substring(r, s)
            }
            return t
          };
          o.prototype.set = function(p, q) {
            this.del(p);
            this._storage[this._key] += e.call(this, p, q)
          };
          o.prototype.unescape = n.unescape;

          function e(p, q) {
            var r = this.c;
            return r.concat(this._c, this.escape(p), r, r, (q = this.escape(q)).length, r, q)
          }
          return o
        })(j);
        if (Object.prototype.toString.call(j.opera) === "[object Opera]") {
          history.navigationMode = "compatible";
          a.prototype.escape = j.encodeURIComponent;
          a.prototype.unescape = j.decodeURIComponent
        }

        function l() {
          function r() {
            s.cookie = ["sessionStorage=" + j.encodeURIComponent(h = f.key(128))].join(";");
            g = f.encode(h, g);
            a = new a(k, "name", k.name)
          }
          var e = k.name,
            s = k.document,
            n = /\bsessionStorage\b=([^;]+)(;|$)/,
            p = n.exec(s.cookie),
            q;
          if (p) {
            h = j.decodeURIComponent(p[1]);
            g = f.encode(h, g);
            a = new a(k, "name");
            for (var t = a.key(), q = 0, o = t.length, u = {}; q < o; ++q) {
              if ((p = t[q]).indexOf(g) === 0) {
                b.push(p);
                u[p] = a.get(p);
                a.del(p)
              }
            }
            a = new a.constructor(k, "name", k.name);
            if (0 < (this.length = b.length)) {
              for (q = 0, o = b.length, c = a.c, p = []; q < o; ++q) {
                p[q] = c.concat(a._c, a.escape(t = b[q]), c, c, (t = a.escape(u[t])).length, c, t)
              }
              k.name += p.join("")
            }
          } else {
            r();
            if (!n.exec(s.cookie)) {
              b = null
            }
          }
        }
        l.prototype = {
          length: 0,
          key: function(e) {
            if (typeof e !== "number" || e < 0 || b.length <= e) {
              throw "Invalid argument"
            }
            return b[e]
          },
          getItem: function(e) {
            e = g + e;
            if (d.call(m, e)) {
              return m[e]
            }
            var n = a.get(e);
            if (n !== null) {
              n = m[e] = f.decode(h, n)
            }
            return n
          },
          setItem: function(e, n) {
            this.removeItem(e);
            e = g + e;
            a.set(e, f.encode(h, m[e] = "" + n));
            this.length = b.push(e)
          },
          removeItem: function(e) {
            var n = a.get(e = g + e);
            if (n !== null) {
              delete m[e];
              a.del(e);
              this.length = b.remove(e)
            }
          },
          clear: function() {
            a.clear();
            m = {};
            b.length = 0
          }
        };
        var g = k.document.domain,
          b = [],
          m = {},
          d = m.hasOwnProperty,
          h;
        b.remove = function(n) {
          var e = this.indexOf(n);
          if (-1 < e) {
            this.splice(e, 1)
          }
          return this.length
        };
        if (!b.indexOf) {
          b.indexOf = function(o) {
            for (var e = 0, n = this.length; e < n; ++e) {
              if (this[e] === o) {
                return e
              }
            }
            return -1
          }
        }
        if (k.sessionStorage) {
          l = function() {};
          l.prototype = k.sessionStorage
        }
        l = new l;
        if (b !== null) {
          j.sessionStorage = l
        }
      })(window)
    };

    return Influence;
  })(Influence);
}




var InfluenceTracker = function(config) {
  if (!(this instanceof InfluenceTracker)) return new InfluenceTracker(config);

  this.config = config;
};







var CookieFunc = function(config) {


  this.config = config;
  // var rule;

  var cookieNotif = document.createElement("link");
  cookieNotif.href = 'https://test2109.herokuapp.com/cookieNotif.css'
  cookieNotif.type = "text/css";
  cookieNotif.rel = "stylesheet";
  cookieNotif.id = "stylesheetID";
  document.getElementsByTagName("head")[0].appendChild(cookieNotif);


  
};



function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}




InfluenceTracker.prototype.tracker = function(info) {

//  -----------
};




function CookieFn() {

  var numAnim;

  function displayNotification(container, config) {


    let className = `animated_FPqR2bI7Mf_c `; //${config.rule.popupAnimationIn}
    container.className = className;
    const elem = document.getElementsByClassName(className);
    while (elem.length > 0) {
      elem[0].remove();
    }
    // if (!numAnim.error) {
    //     numAnim.start();
    // } else {
    //     console.error(numAnim.error);
    // }

    // setTimeout(function () {
    //     container.className = `animated_FPqR2bI7Mf_c `; //${config.rule.popupAnimationOut}
    // }, ((1) * 1000) + 3000);

    // setTimeout(function () {
    //     if(container && container.parentNode)
    //         container.parentNode.removeChild(container)
    // }, ((1) * 1000 + 4000));


    // document.body.appendChild(container);

    document.documentElement.appendChild(container);

    flagMouseOver = false;
  };

  async function notificationDisplay(configuration, microPolicies) {

    var cookieData;

    var finalCookieArr = [];

    cookieData = getCookies();

    microPolicies.map(policy => {

      if (cookieData.length > 0) {
        cookieData.map(data => {
          if (data.name == policy._id) {
            finalCookieArr.push({
              id: data.name,
              status: data.key
            })
          } else if (policy.essentialPolicy) {
            finalCookieArr.push({
              id: policy._id,
              status: true
            })
          } else {
            finalCookieArr.push({
              id: policy._id,
              status: false
            })
          }
        })
      } else {
        if (policy.essentialPolicy) {
          finalCookieArr.push({
            id: policy._id,
            status: true
          })
        } else {
          finalCookieArr.push({
            id: policy._id,
            status: false
          })
        }
      }

      // if(policy.essentialPolicy){
      //     finalCookieArr.push({id: policy._id, status: true})
      // }else{
      //     finalCookieArr.push({id: policy._id, status: false})

      // }
    })



    var cookieIcon = document.createElement('img')
    cookieIcon.src = 'lock.png'
    cookieIcon.style = "bottom:0;left:0;width:25px;height:25px;box-shadow: rgba(84, 92, 164, 0.5) 0px 4px 24px;border-radius: 50%;"
    cookieIcon.onclick = () => {
      // panelCall(0,0)
      container.appendChild(innerContainer)

      container.removeChild(cookieIcon)

    }

    var container = document.createElement('div');
    container.setAttribute("id", "FPqR2DbIqJeA2DbI7MM9_0");

    container.style = "z-index: 99999999999; position: fixed; bottom: 2%; left: 2% " //alignment;
    var innerContainer = document.createElement('div');
    innerContainer.setAttribute("id", "FPqR3tRBqJeA3tRB7MM9_0");
    var innerDiv = document.createElement('div');
    var mainContainer = document.createElement('div');
    var lockImg = document.createElement('img')
    lockImg.src = 'lock.png'
    lockImg.style = "bottom:0;left:0;width:55px;height:55px;box-shadow: rgba(84, 92, 164, 0.5) 0px 4px 24px;border-radius: 50%;"
    lockImg.onclick = () => {
      panelCall(0, 0)

    }

    function Parent1(activePanel, sourcePanel) {

      cookieData = getCookies();

      var p1Parent = document.createElement('div');

      p1Parent.className =
        activePanel === 0 ? `showPanel mainBoxStyle` : 'hidePanel1';

      var p1Child = document.createElement('div');
      p1Child.className = "childContainer";

      var uLine = document.createElement('p');
      uLine.className = "upperLine";

      if (activePanel === 0 && sourcePanel === 1) {
        var uLinenode = document.createTextNode("Save Preferences");
      } else {
        var uLinenode = document.createTextNode("Can we store Cookie?");
      }
      uLine.appendChild(uLinenode);
      p1Child.appendChild(uLine);
      /*Inf*/
      var aLine = document.createElement('a');
      aLine.className = "upperLine";
      var aLinenode = document.createTextNode("Inf");
      aLine.appendChild(aLinenode);
      p1Child.appendChild(aLine);
      p1Parent.appendChild(p1Child);

      var mLine = document.createElement('p');
      mLine.className = "middleLine";

      if (activePanel === 0 && sourcePanel === 1) {

        var dummy = []


        cookieData.map(data => {
          if (data.key) {
            var dataa = microPolicies.find(o => o._id === data.name);
            dummy.push(dataa.name)
          }
        })
        var mLinenode = document.createTextNode(dummy.length > 0 ? "You'll be accepting: " + dummy.join(",") : "You havn't select anything");


      } else {
        var mLinenode = document.createTextNode("These will be used to power trial and Marketing.");
      }

      mLine.appendChild(mLinenode);
      p1Parent.appendChild(mLine);
      //footer
      var p1Footer = document.createElement('div');
      p1Footer.style = "display:flex;justify-content:space-between;margin-top:36px;"

      var customizeB = document.createElement('button');
      customizeB.className = "generalBtnStyle leftBtn";
      customizeB.onclick = () => {
        panelCall(1, 0)

        container.appendChild(innerContainer)

        container.removeChild(cookieIcon)

      }

      if (activePanel === 0 && sourcePanel === 1) {
        customizeB.innerHTML = "No, Customize";
      } else {
        customizeB.innerHTML = "Customize";

      }


      p1Footer.appendChild(customizeB)
      var rightdiv = document.createElement('div');
      rightdiv.style = "display:flex";

      var NoB = document.createElement('button');
      NoB.className = "generalBtnStyle filledBtn";
      NoB.innerHTML = "No";
      NoB.onclick = () => {

        finalCookieArr.map(data => setCookies(data.id, data.status))

        // window.localStorage.setItem('influencepermission',`{enable: false}`)
        window.localStorage.setItem('influencepermission', JSON.stringify({
          enable: false
        }))
        // while(mainContainer.hasChildNodes()) {
        //     mainContainer.removeChild(mainContainer.childNodes[0]);

        //     // container.removeChild(container.childNodes[0]);
        //     // container.appendChild(cookieIcon)
        //   }
        container.removeChild(container.childNodes[0]);

        container.appendChild(cookieIcon)

      }

      var YesB = document.createElement('button');
      YesB.className = "generalBtnStyle filledBtn";
      YesB.innerHTML = "Yes";
      YesB.onclick = () => {
        // microPolicies.map(policy =>{

        //     if(policy.essentialPolicy){
        //         finalCookieArr.push({id: policy._id, status: false})
        //     }else{
        //         finalCookieArr.push({id: policy._id, status: false})

        //     }
        // })

        finalCookieArr.map(data => setCookies(data.id, data.status))


        // window.localStorage.setItem('influencepermission',`{enable:true}`)
        window.localStorage.setItem('influencepermission', JSON.stringify({
          enable: true
        }))

        // while(mainContainer.hasChildNodes()) {
        //     mainContainer.removeChild(mainContainer.childNodes[0]);

        //     // container.removeChild(container.childNodes[0]);

        //   }


        container.removeChild(container.childNodes[0]);

        container.appendChild(cookieIcon)

      }

      var ThatsOkayB = document.createElement('button');
      ThatsOkayB.className = "generalBtnStyle filledBtn";
      ThatsOkayB.innerHTML = "That's Okay";
      ThatsOkayB.onclick = () => {

        // while(mainContainer.hasChildNodes()) {
        //     mainContainer.removeChild(mainContainer.childNodes[0]);
        //   }

        container.removeChild(container.childNodes[0]);

        container.appendChild(cookieIcon)

      }
      if (activePanel === 0 && sourcePanel === 1) {
        rightdiv.appendChild(ThatsOkayB)

      } else {
        rightdiv.appendChild(YesB)
        rightdiv.appendChild(NoB)
      }
      p1Footer.appendChild(rightdiv)
      p1Parent.appendChild(p1Footer);
      //    var element = document.getElementById("div1");

      //  element.appendChild(p1Parent)
      while (mainContainer.hasChildNodes()) {
        mainContainer.removeChild(mainContainer.childNodes[0]);
      }
      mainContainer.appendChild(p1Parent);


    }

    function Parent2(activePanel, sourcePanel) {

      cookieData = getCookies();

      var p2Parent = document.createElement('div');

      p2Parent.className =
        activePanel === 1 ? `showPanel mainBoxStyle2` : 'hidePanel1';

      var navBarParent = document.createElement('div')
      navBarParent.className = "navBarParent"
      var backNav = document.createElement("div");
      backNav.className = "backNav"
      backNav.innerHTML = `<svg
                 width="16"
                 height="16"
                 viewBox="0 0 16 16"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <rect
                   width="1.33333"
                   height="9.33333"
                   rx="0.666667"
                   transform="matrix(0 -1 -1 0 12.6667 8.6665)"
                   fill="#979797"
                 ></rect>
                 <path
                   d="M8.47132 11.5284C8.73167 11.7888 8.73167 12.2109 8.47132 12.4712C8.21097 12.7316 7.78886 12.7316 7.52851 12.4712L3.52851 8.47124C3.27613 8.21886 3.2673 7.81246 3.50848 7.54935L7.17515 3.54935C7.42394 3.27794 7.84566 3.25961 8.11707 3.5084C8.38848 3.7572 8.40682 4.17891 8.15802 4.45032L4.92268 7.97979L8.47132 11.5284Z"
                   fill="currentColor"
                 ></path>
               </svg> Back`
      navBarParent.appendChild(backNav)
      backNav.addEventListener("click", () => {
        p2Parent.className = "hidePanel1"
        panelCall(0, 1)
      })
      var mainHeading = document.createElement('h1')
      mainHeading.className = "mainHeading"
      mainHeading.innerHTML = "Our Features"
      navBarParent.appendChild(mainHeading)
      var doneNav = document.createElement('div')
      doneNav.className = "doneNav"
      doneNav.innerHTML = "Done"

      doneNav.addEventListener("click", function() {
        // finalCookieArr.map(data =>{ setCookies(data.id, data.status) })

        finalCookieArr.map(data => setCookies(data.id, data.status))
        window.localStorage.setItem('influencepermission', JSON.stringify({
          enable: true
        }))


        container.removeChild(container.childNodes[0]);

        container.appendChild(cookieIcon)

        // while(mainContainer.hasChildNodes()) {
        //     mainContainer.removeChild(mainContainer.childNodes[0]);
        //   }

      })



      var div1 = document.createElement('div')
      div1.className = "bodyParent1"
      var div2 = document.createElement('div')
      div1.className = "bodyParent2"
      var div3 = document.createElement('div')
      div1.className = "bodyParent3"
      var ulist = document.createElement('ul')
      ulist.setAttribute("id", "qwe");

      ulist.style = "list-style-type:none; margin: 0%; padding: 5%;"

      microPolicies.map(policy => {

        var listItem = document.createElement('li')
        listItem.className = "listItem"
        var upperPart = document.createElement('div');
        upperPart.className = "upperPart";
        upperPart.innerHTML =
          `<svg
                         style="
                           color: rgb(88, 70, 109);
                           transition: color 250ms ease 0s;
                           margin-right: 12px;
                           margin-top:0px;
                           width: 16px;
                           height: 16px;
                           flex: 0 0 auto;
                         "
                         width=22
                         height=22
                         viewBox= "0 0 22 22"
                         fill=none
                         xmlns="http://www.w3.org/2000/svg"
                         class="Icon__StyledIcon-sc-1fw5m9z-0 fkqTFd"
                       >
                         <path
                           fill-rule="evenodd"
                           clip-rule="evenodd"
                           fill="currentColor"
                           d="M9.67336 15.9639C9.67336 16.6963 10.6154 16.9944 11.0368 16.3954L15.8773 9.51496C16.2269 9.01804 15.8715 8.33341 15.2639 8.33341H12.4322C11.8799 8.33341 11.4322 7.8857 11.4322 7.33341V4.03628C11.4322 3.3039 10.4901 3.00574 10.0687 3.60474L5.22821 10.4852C4.87862 10.9821 5.23404 11.6667 5.84162 11.6667H8.67336C9.22564 11.6667 9.67336 12.1145 9.67336 12.6667V15.9639Z"
                         ></path>
                       </svg>`;

        var headerText = document.createElement('p');
        headerText.className = "headerText"
        headerText.innerHTML = policy.name //"Essential"

        var switchContainer = document.createElement('div');
        switchContainer.style = "position:relative;"
        var switchLabel = document.createElement('label');
        switchLabel.className = "switch";
        var checkboxInput = document.createElement('input');
        checkboxInput.type = "checkbox";
        checkboxInput.id = "idData"
        checkboxInput.className = "generalInputCheckboxClass"

        // checkboxInput.disabled= policy.essentialPolicy

        if (policy.essentialPolicy == true) {
          checkboxInput.checked = true
          checkboxInput.disabled = true
        }


        cookieData.map(data => {
          if (data.name == policy._id) {
            if (data.key) {
              checkboxInput.checked = true
            } else {
              checkboxInput.checked = false
            }
          }
        })

        checkboxInput.onchange = () => {
          finalCookieArr = finalCookieArr.filter(data => (data.id !== policy._id))
          finalCookieArr.push({
            id: policy._id,
            status: checkboxInput.checked
          })
          setCookies(policy._id, checkboxInput.checked)
        }
        var checkboxSpan = document.createElement('span');
        checkboxSpan.className = "slider round";
        switchLabel.appendChild(checkboxInput)
        switchLabel.appendChild(checkboxSpan)
        switchContainer.appendChild(switchLabel)
        upperPart.appendChild(headerText)
        upperPart.appendChild(switchContainer)
        listItem.appendChild(upperPart)


        var lowerDiv = document.createElement('div')
        lowerDiv.style = "padding-left:28px;margin-top:0%;"
        var para = document.createElement('p')
        para.className = "subText"
        para.innerHTML = policy.description //"This includes key features like page navigation and logging you in. The website cannot function without this"
        var more = document.createElement('button')
        more.className = "moreDetailsButton"


        //    function test(){
        //      return cookieData.filter(e=>(e.name === policy._id))[0]

        //    }
        more.onclick = () => {
          p2Parent.classname = "hidePanel1"
          panelCall(2, 1, policy, policy._id)
        };
        more.innerHTML = "More Details"
        var imagesvg = document.createElement('span')
        imagesvg.innerHTML = ` <svg
                           width=16
                           height=16
                           viewBox= "0 0 16 16"
                           fill=none
                           xmlns=http://www.w3.org/2000/svg
                           class="Icon__StyledIcon-sc-1fw5m9z-0 PolicyList__Arrow-avna3w-0 jqvij"
                         >
                           <path
                             fill-rule="evenodd"
                             clip-rule="evenodd"
                             fill="currentColor"
                             d="M5.52843 4.47145C5.26808 4.2111 5.26808 3.78899 5.52843 3.52864C5.78878 3.26829 6.21089 3.26829 6.47124 3.52864L10.4712 7.52864C10.7236 7.78102 10.7325 8.18741 10.4913 8.45052L6.82461 12.4505C6.57581 12.7219 6.1541 12.7403 5.88269 12.4915C5.61127 12.2427 5.59294 11.821 5.84173 11.5496L9.07708 8.02009L5.52843 4.47145Z"
                           ></path>
                         </svg>`
        more.appendChild(imagesvg)
        lowerDiv.appendChild(para)
        lowerDiv.appendChild(more)
        listItem.appendChild(lowerDiv)

        ulist.appendChild(listItem)
      })
      div3.appendChild(ulist);
      div2.appendChild(div3);
      div1.appendChild(div2);
      //footer

      var footer = document.createElement('a')
      footer.href = "https://app.useinfluence.co"
      footer.className = "footer"
      var brand = document.createElement('p')
      brand.style = "color:rgb(151, 151, 151);font-size:12px;font-weight:500;margin-bottom:0px"
      brand.innerHTML = "Verified by Influence"

      var blueTick = document.createElement('span')
      blueTick.innerHTML = `<svg style="margin-top:0px;margin-right:4px;" width="9" height="9" viewBox="0 0 524 524" xmlns="http://www.w3.org/2000/svg">
                <defs>
                <style>.cls-1 {
                        fill: #5d93fe;
                    }
                    .cls-2 {
                        fill: #5d93fe;
                        filter: url(#a);
                    }
                    .cls-3 {
                        fill: #fff;
                        fill-rule: evenodd;
                    }</style>
                <filter id="a" x="51" y="51" width="423" height="423" filterUnits="userSpaceOnUse">
                <feOffset in="SourceAlpha" result="offset"/>
                <feGaussianBlur result="blur" stdDeviation="2.236"/>
                <feFlood flood-opacity=".06" result="flood"/>
                <feComposite in2="blur" operator="in" result="composite"/>
                <feBlend in="SourceGraphic" result="blend"/>
                </filter>
                </defs>
                <circle class="cls-1" cx="262" cy="262" r="262"/>
                <circle class="cls-2" cx="262" cy="262" r="207"/>
                <path class="cls-3" transform="translate(-640 -238)" d="m833.89 478.95 81.132 65.065a9 9 0 0 1 1.391 12.652l-25.651 31.985a9 9 0 0 1-12.652 1.39l-81.132-65.065a9 9 0 0 1-1.391-12.652l25.651-31.985a9 9 0 0 1 12.652-1.39z"/>
                <path class="cls-3" transform="translate(-640 -238)" d="m846.25 552.7 127.39-144.5a9.721 9.721 0 0 1 13.35-1.047l29.679 24.286a8.9 8.9 0 0 1 1.08 12.862l-127.39 144.5a9.721 9.721 0 0 1-13.35 1.047l-29.675-24.286a8.9 8.9 0 0 1-1.087-12.861z"/>
                </svg>`
      footer.appendChild(blueTick)
      footer.appendChild(brand)


      navBarParent.appendChild(doneNav)
      p2Parent.appendChild(navBarParent)
      p2Parent.appendChild(div1)
      p2Parent.appendChild(footer)
      //    var element = document.getElementById("div1");
      //         element.appendChild(p2Parent)
      while (mainContainer.hasChildNodes()) {
        mainContainer.removeChild(mainContainer.childNodes[0]);
      }
      mainContainer.appendChild(p2Parent);

    }

    function Parent3(activePanel, sourcePane, arr, policyData) {

      var p3Parent = document.createElement('div');

      p3Parent.className =
        activePanel === 2 ? `showPanel mainBoxStyle2` : 'hidePanel1';

      var navBarParent = document.createElement('div')
      navBarParent.className = "navBarParent"
      var backNav = document.createElement("div");
      backNav.className = "backNav"
      backNav.onclick = () => {

        //   p3Parent.classname="hidePanel1"
        panelCall(1, 2)

      }
      backNav.innerHTML = `<svg
                 width="16"
                 height="16"
                 viewBox="0 0 16 16"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <rect
                   width="1.33333"
                   height="9.33333"
                   rx="0.666667"
                   transform="matrix(0 -1 -1 0 12.6667 8.6665)"
                   fill="#979797"
                 ></rect>
                 <path
                   d="M8.47132 11.5284C8.73167 11.7888 8.73167 12.2109 8.47132 12.4712C8.21097 12.7316 7.78886 12.7316 7.52851 12.4712L3.52851 8.47124C3.27613 8.21886 3.2673 7.81246 3.50848 7.54935L7.17515 3.54935C7.42394 3.27794 7.84566 3.25961 8.11707 3.5084C8.38848 3.7572 8.40682 4.17891 8.15802 4.45032L4.92268 7.97979L8.47132 11.5284Z"
                   fill="currentColor"
                 ></path>
               </svg> Back`

      navBarParent.appendChild(backNav)
      var mainHeading = document.createElement('h1')
      mainHeading.className = "mainHeading"
      mainHeading.innerHTML = "Our Features"
      navBarParent.appendChild(mainHeading)
      var doneNav = document.createElement('div')
      doneNav.className = "doneNav"
      var switchLabel = document.createElement('label');
      switchLabel.className = "switch";
      var checkboxInput = document.createElement('input');
      checkboxInput.type = "checkbox";

      checkboxInput.className = "generalInputCheckboxClass"
      // checkboxInput.disabled= arr.essentialPolicy

      if (policy.essentialPolicy == true) {
        checkboxInput.checked = true
        checkboxInput.disabled = true
      }
      var d = getCookieById(policyData)

      checkboxInput.checked = d && d.key ? true : false
      if (arr.slug == "Essential1") {
        checkboxInput.checked = true
        checkboxInput.disabled = true
      }
      checkboxInput.onchange = (e) => {

        setCookies(arr._id, e.target.checked)

        // document.cookie = "key1 = value1;key2 = value2;expires = date";

      }
      var checkboxSpan = document.createElement('span');
      checkboxSpan.className = "slider round";

      switchLabel.appendChild(checkboxInput)
      switchLabel.appendChild(checkboxSpan)
      doneNav.appendChild(switchLabel)
      navBarParent.appendChild(doneNav)
      var div1 = document.createElement('div')
      div1.className = "bodyParent1"
      var div2 = document.createElement('div')
      div1.className = "bodyParent2"
      var div3 = document.createElement('div')
      div1.className = "bodyParent3"
      var ulist = document.createElement('ul')
      ulist.style = "list-style-type:none; margin: 0%; padding: 5%;"

      // arr.map(policy => {


      var listItem = document.createElement('div')
      listItem.classList = "listItemDetail"

      var upperPart = document.createElement('div')
      upperPart.className = "upperPart"


      var headerText = document.createElement('p')
      headerText.className = "headerText"
      headerText.innerHTML = arr.slug

      upperPart.appendChild(headerText)

      var lowerDiv = document.createElement('div')
      lowerDiv.style = "margin-top:0%;"
      var para = document.createElement('p')
      para.className = "subText"
      para.innerHTML = arr.description // "This includes key features like page navigation and logging you in. The website cannot function without this"
      lowerDiv.appendChild(para)
      listItem.appendChild(upperPart)
      listItem.appendChild(lowerDiv)
      ulist.appendChild(listItem)
      //})
      div3.appendChild(ulist);
      div2.appendChild(div3);
      div1.appendChild(div2);
      //footer

      var footer = document.createElement('a')
      footer.href = "https://app.useinfluence.co"
      footer.className = "footer"
      var brand = document.createElement('p')
      brand.style = "color:rgb(151, 151, 151);font-size:12px;font-weight:500;margin-bottom:0px"
      brand.innerHTML = "Verified by Influence"

      var blueTick = document.createElement('span')
      blueTick.innerHTML = `<svg style="margin-top:0px;margin-right:4px;" width="9" height="9" viewBox="0 0 524 524" xmlns="http://www.w3.org/2000/svg">
                <defs>
                <style>.cls-1 {
                        fill: #5d93fe;
                    }
                    .cls-2 {
                        fill: #5d93fe;
                        filter: url(#a);
                    }
                    .cls-3 {
                        fill: #fff;
                        fill-rule: evenodd;
                    }</style>
                <filter id="a" x="51" y="51" width="423" height="423" filterUnits="userSpaceOnUse">
                <feOffset in="SourceAlpha" result="offset"/>
                <feGaussianBlur result="blur" stdDeviation="2.236"/>
                <feFlood flood-opacity=".06" result="flood"/>
                <feComposite in2="blur" operator="in" result="composite"/>
                <feBlend in="SourceGraphic" result="blend"/>
                </filter>
                </defs>
                <circle class="cls-1" cx="262" cy="262" r="262"/>
                <circle class="cls-2" cx="262" cy="262" r="207"/>
                <path class="cls-3" transform="translate(-640 -238)" d="m833.89 478.95 81.132 65.065a9 9 0 0 1 1.391 12.652l-25.651 31.985a9 9 0 0 1-12.652 1.39l-81.132-65.065a9 9 0 0 1-1.391-12.652l25.651-31.985a9 9 0 0 1 12.652-1.39z"/>
                <path class="cls-3" transform="translate(-640 -238)" d="m846.25 552.7 127.39-144.5a9.721 9.721 0 0 1 13.35-1.047l29.679 24.286a8.9 8.9 0 0 1 1.08 12.862l-127.39 144.5a9.721 9.721 0 0 1-13.35 1.047l-29.675-24.286a8.9 8.9 0 0 1-1.087-12.861z"/>
                </svg>`
      footer.appendChild(blueTick)
      footer.appendChild(brand)
      navBarParent.appendChild(doneNav)
      p3Parent.appendChild(navBarParent)
      p3Parent.appendChild(div1)
      p3Parent.appendChild(footer)

      // var element = document.getElementById("div1");
      // element.appendChild(p3Parent)
      while (mainContainer.hasChildNodes()) {
        mainContainer.removeChild(mainContainer.childNodes[0]);
      }

      mainContainer.appendChild(p3Parent);


    }

    function panelCall(to, source, arr, policyId) {


      activePanel = to
      sourcePanel = source

      activePanel === 0 ?
        Parent1(activePanel, sourcePanel) :
        activePanel === 1 ?
        Parent2(activePanel, sourcePanel) :
        activePanel === 2 ?
        Parent3(activePanel, sourcePanel, arr, policyId) :
        Parent1(activePanel, sourcePanel)
    }

    panelCall(0, 0)
    //till here
    // mainContainer.appendChild(element);  


    // JSON.parse(localStorage.getItem('influencepermission')).enable == false ?  innerDiv.appendChild(mainContainer) : " "
    innerDiv.appendChild(mainContainer);
    innerDiv.appendChild(lockImg)
    innerContainer.appendChild(innerDiv);
    // container.appendChild(innerContainer);

    var influencePermission = JSON.parse(localStorage.getItem('influencepermission'))

    if (influencePermission && influencePermission.enable == true) {

      container.appendChild(cookieIcon)

    } else {
      container.appendChild(innerContainer)
    }

    // JSON.parse(localStorage.getItem('influencepermission')).enable == false ?  container.appendChild(innerContainer) : container.appendChild(lockImg)


    displayNotification(container, "config");
  }


  function setCookies(name, value) {

    console.log(name, value, "$$$$$$$$$$$")

    const COOKIE_PREFIX = "Influence_";

    name = COOKIE_PREFIX + name
    var d = new Date();
    d.setTime(d.setTime() + (1 * 24 * 60 * 60 * 1000))

    let expires = "expires=" + d.toUTCString();

    let sec = '';

    if (this._cookie_secure == 2) {
      if (location.protocol) {
        if (location.protocol == "https:") {
          sec = ';secure';
        }
      }
    } else if (this._cookie_secure == true) {

      sec = ';secure';

    }

    document.cookie = name + "=" + JSON.stringify(value) + ";" + expires //+ "; path=" + path + sec

  }



  /**
   * retrieve data from user's Cookie storage
   * @return ``` [{name: "NAME", key: true/false}] ```
   */
  function getCookies() {
    const COOKIE_PREFIX = "Influence_";
    name = name + "="
    const cookies = document.cookie.split(";")

    var getCookieArr = []

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i]

      if (cookie.indexOf(COOKIE_PREFIX) == 1) {

        name = cookie.split('=')[0].trim().substring(COOKIE_PREFIX.length);
        value = cookie.split('=')[1];

        getCookieArr.push({
          name: name,
          key: value == "true" ? true : false
        })
      }
    }
    return getCookieArr;
  }

  function getCookieById(name) {
    const COOKIE_PREFIX = "Influence_";
    name = name + "="
    const cookies = document.cookie.split(";")

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i]
      if (cookie.indexOf(COOKIE_PREFIX + name) == 1) {
        name = cookie.split('=')[0].trim().substring(COOKIE_PREFIX.length);
        value = cookie.split('=')[1];

        return {
          name: name,
          key: value
        }
      }
    }
    return null;
  }

  return {
    notificationdisplay: function notificationdisplay(type, config, containerStyle, iconStyle, alignment) {
      notificationDisplay(type, config, containerStyle, iconStyle, alignment);
    }
  };
};

// function getCookieById(name) {
//   const COOKIE_PREFIX = "Influence_";
//   name = name + "="
//   const cookies = document.cookie.split(";")

//   for (var i = 0; i < cookies.length; i++) {
//     var cookie = cookies[i]
//     if (cookie.indexOf(COOKIE_PREFIX + name) == 1) {
//       name = cookie.split('=')[0].trim().substring(COOKIE_PREFIX.length);
//       value = cookie.split('=')[1];

//       return {
//         name: name,
//         key: value
//       }
//     }
//   }
//   return null;
// }





if (typeof module !== "undefined" && module.exports) module.exports = CookieFn;
Influence = typeof Influence === 'undefined' ? require('../server') : Influence;


(async function() {


//   var cookieNotif = document.createElement("link");
//   cookieNotif.href = 'https://test2109.herokuapp.com/cookieNotif.css'
//   cookieNotif.type = "text/css";
//   cookieNotif.rel = "stylesheet";
//   cookieNotif.id = "stylesheetID";
//   document.getElementsByTagName("head")[0].appendChild(cookieNotif);

  var apiDataResponse = {"host":"test2109.herokuapp.com","campaign":{"onBoarding":true,"uniqueVisitors":0,"_id":"5f7db8482b3590001c052f21","campaignName":"test2109","protocol":"https:","websiteUrl":"test2109.herokuapp.com","profile":"5c6d4b8b98948500132d07e9","isActive":true,"trackingId":"INF-3gbfcjjsd6vhvo","createdAt":"2020-10-07T12:44:56.141Z","updatedAt":"2020-10-07T12:45:17.336Z","__v":0,"id":"5f7db8482b3590001c052f21"},"configuration":{"_id":"5f7db8482b3590001c052f22","panelStyle":{"color":{"r":0,"g":0,"b":0,"a":1},"noButtonStyle":"outline"},"langName":{"name":{"name":{"name":{"language":"en","name":"English"}}}},"scrollToConsent":true,"position":"bottomLeft","customPromptText":"jjujriofjriojfiorjfiojfoijrf","customAcceptText":"customAcceptText","poweredBy":"Influence","poweredByLink":"https://useinfluence.co","cookiecampaign":"5f7db8482b3590001c052f21","trackingId":"INF-3gbfcjjsd6vhvo","createdAt":"2020-10-07T12:44:56.160Z","updatedAt":"2020-10-08T10:14:20.078Z","__v":0,"id":"5f7db8482b3590001c052f22"},"microPolicies":[{"useCookie":false,"essentialPolicy":false,"cookieWidgets":false,"_id":"5f7db85d2b3590001c052f23","name":"Dashly","description":"Test Description for Dashly 23","websiteUrl":"test2109.herokuapp.com","slug":"essential","trackingId":"INF-3gbfcjjsd6vhvo","cookieCampaign":"5f7db8482b3590001c052f21","profile":"5c6d4b8698948500132d07e7","createdAt":"2020-10-07T12:45:17.326Z","updatedAt":"2020-10-08T09:49:17.323Z","__v":0,"id":"5f7db85d2b3590001c052f23","provider":[{"_id":"5f7db85d2b3590001c052f29","name":"cdn.dashly.app","provider":"cdn.dashly.app","type":"essential","trackingId":"INF-3gbfcjjsd6vhvo","createdAt":"2020-10-07T12:45:17.385Z","updatedAt":"2020-10-07T12:45:17.385Z","id":"5f7db85d2b3590001c052f29"}]},{"useCookie":false,"essentialPolicy":false,"cookieWidgets":false,"_id":"5f7db85d2b3590001c052f24","name":"ajax.googleapis.com","description":"","websiteUrl":"test2109.herokuapp.com","slug":"essential","trackingId":"INF-3gbfcjjsd6vhvo","cookieCampaign":"5f7db8482b3590001c052f21","profile":"5c6d4b8698948500132d07e7","createdAt":"2020-10-07T12:45:17.327Z","updatedAt":"2020-10-07T12:45:17.327Z","__v":0,"id":"5f7db85d2b3590001c052f24","provider":[{"_id":"5f7db85d2b3590001c052f2b","name":"test2109.herokuapp.com","provider":"ajax.googleapis.com","type":"essential","trackingId":"INF-3gbfcjjsd6vhvo","createdAt":"2020-10-07T12:45:17.390Z","updatedAt":"2020-10-07T12:45:17.390Z","id":"5f7db85d2b3590001c052f2b"}]},{"useCookie":false,"essentialPolicy":false,"cookieWidgets":false,"_id":"5f7db85d2b3590001c052f27","name":"maxcdn.bootstrapcdn.com","description":"","websiteUrl":"test2109.herokuapp.com","slug":"marketing","trackingId":"INF-3gbfcjjsd6vhvo","cookieCampaign":"5f7db8482b3590001c052f21","profile":"5c6d4b8698948500132d07e7","createdAt":"2020-10-07T12:45:17.330Z","updatedAt":"2020-10-07T12:45:17.330Z","__v":0,"id":"5f7db85d2b3590001c052f27","provider":[{"_id":"5f7db85d2b3590001c052f2a","name":"test2109.herokuapp.com","provider":"maxcdn.bootstrapcdn.com","type":"marketing","trackingId":"INF-3gbfcjjsd6vhvo","createdAt":"2020-10-07T12:45:17.387Z","updatedAt":"2020-10-07T12:45:17.387Z","id":"5f7db85d2b3590001c052f2a"}]},{"useCookie":false,"essentialPolicy":false,"cookieWidgets":false,"_id":"5f7db85d2b3590001c052f25","name":"s3.amazonaws.com","description":"","websiteUrl":"test2109.herokuapp.com","slug":"essential","trackingId":"INF-3gbfcjjsd6vhvo","cookieCampaign":"5f7db8482b3590001c052f21","profile":"5c6d4b8698948500132d07e7","createdAt":"2020-10-07T12:45:17.328Z","updatedAt":"2020-10-07T12:45:17.328Z","__v":0,"id":"5f7db85d2b3590001c052f25","provider":[{"_id":"5f7db85d2b3590001c052f2c","name":"test2109.herokuapp.com","provider":"s3.amazonaws.com","type":"essential","trackingId":"INF-3gbfcjjsd6vhvo","createdAt":"2020-10-07T12:45:17.392Z","updatedAt":"2020-10-07T12:45:17.392Z","id":"5f7db85d2b3590001c052f2c"}]}]};


  var cookieFn = new CookieFn({})

  cookieFn.notificationdisplay(apiDataResponse.configuration, apiDataResponse.microPolicies);

  var m = []
  apiDataResponse.microPolicies.map(e => {

    var d = getCookieById(e._id)

    if (d && d.key == "false") {
      e.provider.map(e => {
        // console.log(e.provider)
        m.push(new RegExp(e.provider))
      })
    }

  })

  console.log(m, "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")

  window.YETT_BLACKLIST = m

  function getCookieById(name) {
    const COOKIE_PREFIX = "Influence_";
    name = name + "="
    const cookies = document.cookie.split(";")

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i]
      if (cookie.indexOf(COOKIE_PREFIX + name) == 1) {
        name = cookie.split('=')[0].trim().substring(COOKIE_PREFIX.length);
        value = cookie.split('=')[1];

        return {
          name: name,
          key: value
        }
      }
    }
    return null;
  }

  !(function(t, e) {

    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(((t = t || self).yett = {}));
  })(this, function(t) {
    "use strict";

    function o(e, t) {

      return (
        e &&
        (!t || t !== c) &&
        (!s.blacklist ||
          s.blacklist.some(function(t) {
            return t.test(e);
          })) &&
        (!s.whitelist ||
          s.whitelist.every(function(t) {
            return !t.test(e);
          }))
      );
    }

    function l(t) {

      var e = t.getAttribute("src");
      return (
        (s.blacklist &&
          s.blacklist.every(function(t) {
            return !t.test(e);
          })) ||
        (s.whitelist &&
          s.whitelist.some(function(t) {
            return t.test(e);
          }))
      );
    }
    var c = "javascript/blocked",
      s = {
        blacklist: window.YETT_BLACKLIST,
        whitelist: window.YETT_WHITELIST
      },
      u = {
        blacklisted: []
      },
      f = new MutationObserver(function(t) {
        for (var e = 0; e < t.length; e++)
          for (
            var i = t[e].addedNodes,
              r = function(t) {
                var r = i[t];
                if (1 === r.nodeType && "SCRIPT" === r.tagName) {
                  var e = r.src,
                    n = r.type;
                  if (o(e, n)) {
                    u.blacklisted.push([r, r.type]), (r.type = c);
                    r.addEventListener("beforescriptexecute", function t(e) {
                        r.getAttribute("type") === c && e.preventDefault(), r.removeEventListener("beforescriptexecute", t);
                      }),
                      r.parentElement && r.parentElement.removeChild(r);
                  }
                }
              },
              n = 0; n < i.length; n++
          )
            r(n);
      });

    f.observe(document.documentElement, {
      childList: !0,
      subtree: !0
    });
    var i = document.createElement,
      a = {
        src: Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "src"),
        type: Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "type")
      };

    function p(t, e) {
      return (
        (function(t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function(t, e) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
          var r = [],
            n = !0,
            i = !1,
            o = void 0;
          try {
            for (var c, a = t[Symbol.iterator](); !(n = (c = a.next()).done) && (r.push(c.value), !e || r.length !== e); n = !0);
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              n || null == a.return || a.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        })(t, e) ||
        r(t, e) ||
        (function() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        })()
      );
    }

    function y(t) {
      return (
        (function(t) {
          if (Array.isArray(t)) return n(t);
        })(t) ||
        (function(t) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
        })(t) ||
        r(t) ||
        (function() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        })()
      );
    }

    function r(t, e) {
      if (t) {
        if ("string" == typeof t) return n(t, e);
        var r = Object.prototype.toString.call(t).slice(8, -1);
        return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(t, e) : void 0;
      }
    }

    function n(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
      return n;
    }
    document.createElement = function() {
      for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
      if ("script" !== e[0].toLowerCase()) return i.bind(document).apply(void 0, e);
      var n = i.bind(document).apply(void 0, e);
      try {
        Object.defineProperties(n, {
            src: {
              get: function() {
                return a.src.get.call(this);
              },
              set: function(t) {
                o(t, n.type) && a.type.set.call(this, c), a.src.set.call(this, t);
              },
            },
            type: {
              set: function(t) {
                var e = o(n.src, n.type) ? c : t;
                a.type.set.call(this, e);
              },
            },
          }),
          (n.setAttribute = function(t, e) {
            "type" === t || "src" === t ? (n[t] = e) : HTMLScriptElement.prototype.setAttribute.call(n, t, e);
          });
      } catch (t) {
        console.warn("Yett: unable to prevent script execution for script src ", n.src, ".\n", 'A likely cause would be because you are using a third-party browser extension that monkey patches the "document.createElement" function.');
      }
      return n;
    };
    var d = new RegExp("[|\\{}()[\\]^$+*?.]", "g");
    (t.unblock = function() {
      for (var t = arguments.length, r = new Array(t), e = 0; e < t; e++) r[e] = arguments[e];
      r.length < 1 ?
        ((s.blacklist = []), (s.whitelist = [])) :
        (s.blacklist &&
          (s.blacklist = s.blacklist.filter(function(e) {
            return r.every(function(t) {
              return "string" == typeof t ? !e.test(t) : t instanceof RegExp ? e.toString() !== t.toString() : void 0;
            });
          })),
          s.whitelist &&
          (s.whitelist = [].concat(
            y(s.whitelist),
            y(
              r.map(function(e) {
                if ("string" == typeof e) {
                  var r = ".*" + e.replace(d, "\\$&") + ".*";
                  if (
                    s.whitelist.every(function(t) {
                      return t.toString() !== r.toString();
                    })
                  )
                    return new RegExp(r);
                } else if (
                  e instanceof RegExp &&
                  s.whitelist.every(function(t) {
                    return t.toString() !== e.toString();
                  })
                )
                  return e;
                return null;
              })
              .filter(Boolean)
            )
          )));
      for (var n = document.querySelectorAll('script[type="'.concat(c, '"]')), i = 0; i < n.length; i++) {
        var o = n[i];
        l(o) && (u.blacklisted.push([o, "application/javascript"]), o.parentElement.removeChild(o));
      }
      var a = 0;
      y(u.blacklisted).forEach(function(t, e) {
          var r = p(t, 2),
            n = r[0],
            i = r[1];
          if (l(n)) {
            var o = document.createElement("script");
            for (var c in (o.setAttribute("src", n.src), o.setAttribute("type", i || "application/javascript"), n)) c.startsWith("on") && (o[c] = n[c]);
            document.head.appendChild(o), u.blacklisted.splice(e - a, 1), a++;
          }
        }),
        s.blacklist && s.blacklist.length < 1 && f.disconnect();
    }),
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
  });



  var scripts = await document.getElementsByTagName('script');


  var myScript;
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.split('?')[0].indexOf(influenceScript) !== -1)
      myScript = scripts[i];
  }

  var queryString = myScript ? myScript.src.replace(/^[^\?]+\??/, '') : '';


  function parseQuery(query) {
    var Params = new Object();
    if (!query) return Params; // return empty object
    var Pairs = query.split(/[;&]/);
    for (var i = 0; i < Pairs.length; i++) {
      var KeyVal = Pairs[i].split('=');
      if (!KeyVal || KeyVal.length != 2) continue;
      var key = unescape(KeyVal[0]);
      var val = unescape(KeyVal[1]);
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
    }
    return Params;
  }

  var params = parseQuery(queryString);



  if (params.trackingId) {
    new Influence({
      trackingId: params.trackingId
    });
  }

})();