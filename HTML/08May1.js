var isTabVisibility = true,flagMouseOver= false;
var exclued_button_text = 'login,signin,loginnow,memberlogin,accountlogin';
var __pathname = window.location.pathname;
__pathname = '/' + __pathname.split('/')[1];

var influenceScript = '08May.js';
var BASE_URL = "https://strapi.useinfluence.co";

document.addEventListener('visibilitychange', function (e) {
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
    var Influence = function (options) {
        if (!(this instanceof Influence)) return new Influence(config);
        /**
         * New InfluenceTracker()
         * @type {{tracker}|{}}
         */
        checkCampaignActive(options.trackingId, (err, res) => {
            tracker = new InfluenceTracker(options.trackingId);
            //res.isActive= true; // remove this code after implimantation

            console.log(res, "RES DATA ******************************")
            if (err)
                return;
            if (res.isActive) {
                console.log("entered ***************************")
                /**
                 * New InfluenceNotification()
                 * @type {{Notifications}}
                 */
                var notificationTimmer = setInterval(function () {
                    if (document.readyState !== 'complete') return;
                    notifications = new Notifications(options.trackingId);
                    this.notificationsInstance = notifications;
                    clearInterval(notificationTimmer);
                }, 100);
            }

            options = options || {};

            this.options = options;

            this.trackerInstance = tracker;

            this.initialize();
        });
    };

    (function (Influence) {
        Influence.prototype.options = function () {
            return this.options;
        };

        // Browser Detection
        var BrowserDetect = (function () {
            var BrowserDetect = {
                init: function () {
                    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
                    this.version = this.searchVersion(navigator.userAgent) ||
                        this.searchVersion(navigator.appVersion) ||
                        "an unknown version";
                    this.OS = this.searchString(this.dataOS) || "an unknown OS";
                },
                searchString: function (data) {
                    var len = data.length
                    for (var i = 0; i < len; i++) {
                        var dataString = data[i].string;
                        this.versionSearchString = data[i].versionSearch || data[i].identity;
                        if (dataString) {
                            if (dataString.indexOf(data[i].subString) != -1)
                                return data[i].identity;
                        }
                        else if (data[i].prop)
                            return data[i].identity;
                    }
                },
                searchVersion: function (dataString) {
                    var index = dataString.indexOf(this.versionSearchString);
                    if (index == -1) return;
                    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
                },
                dataBrowser: [
                    {
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
                    {   // for newer Netscapes (6+)
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
                    {     // for older Netscapes (4-)
                        string: navigator.userAgent,
                        subString: "Mozilla",
                        identity: "Netscape",
                        versionSearch: "Mozilla"
                    }
                ],
                dataOS: [
                    {
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

        Geo.geoip = function (success, failure) {
            httpGetAsync('https://extreme-ip-lookup.com/json', (res) => {
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

        Util.copyFields = function (source, target) {
            var createDelegate = function (source, value) {
                return function () {
                    return value.apply(source, arguments);
                };
            };

            target = target || {};

            var key, value;

            for (key in source) {
                if (! /layerX|Y/.test(key)) {
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

        Util.merge = function (o1, o2) {
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

        Util.toObject = function (olike) {
            var o = {}, key;

            for (key in olike) {
                o[key] = olike[key];
            }

            return o;
        };

        Util.genGuid = function () {
            var s4 = function () {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            };

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };

        Util.parseQueryString = function (qs) {
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
                            } catch (e) { }
                        }
                    }
                }
            }
            return pairs;
        };

        Util.unparseQueryString = function (qs) {
            var kvs = [], k, v;
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

        Util.size = function (v) {
            if (v === undefined) return 0;
            else if (v instanceof Array) return v.length;
            else if (v instanceof Object) {
                var size = 0;
                for (var key in v) {
                    if (!v.hasOwnProperty || v.hasOwnProperty(key))++size;
                }
                return size;
            } else return 1;
        };

        Util.mapJson = function (v, f) {
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

        Util.jsonify = function (v) {
            return Util.mapJson(v, function (v) {
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

        Util.undup = function (f, cutoff) {
            cutoff = cutoff || 250;

            var lastInvoked = 0;
            return function () {
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

        Util.parseUrl = function (url) {
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

        Util.unparseUrl = function (url) {
            return (url.protocol || '') +
                '//' +
                (url.host || '') +
                (url.pathname || '') +
                Util.unparseQueryString(url.query) +
                (url.hash || '');
        };

        Util.equals = function (v1, v2) {
            var leftEqualsObject = function (o1, o2) {
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

        Util.isSamePage = function (url1, url2) {
            url1 = url1 instanceof String ? Util.parseUrl(url1) : url1;
            url2 = url2 instanceof String ? Util.parseUrl(url2) : url2;

            // Ignore the hash when comparing to see if two pages represent the same resource:
            return url1.protocol === url2.protocol &&
                url1.host === url2.host &&
                url1.pathname === url2.pathname &&
                Util.equals(url1.query, url2.query);
        };

        Util.qualifyUrl = function (url) {
            var escapeHTML = function (s) {
                return s.split('&').join('&amp;').split('<').join('&lt;').split('"').join('&quot;');
            };

            var el = document.createElement('div');
            el.innerHTML = '<a href="' + escapeHTML(url) + '">x</a>';
            return el.firstChild.href;
        };

        Util.padLeft = function (n, p, c) {
            var pad_char = typeof c !== 'undefined' ? c : '0';
            var pad = new Array(1 + p).join(pad_char);
            return (pad + n).slice(-pad.length);
        };

        var DomUtil = {};


        DomUtil.loadCss = function (css) {
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

        // DomUtil.getFormData = function (node) {
        //     var acc = {};

        //     var setField = function (name, value) {
        //         if (name === '') name = 'anonymous';

        //         var oldValue = acc[name];

        //         if (oldValue != null) {
        //             if (oldValue instanceof Array) {
        //                 acc[name].push(value);
        //             } else {
        //                 acc[name] = [oldValue, value];
        //             }
        //         } else {
        //             acc[name] = value;
        //         }
        //     };
        //     var eLen = node.elements.length;
        //     for (var i = 0; i < eLen; i++) {
        //         var child = node.elements[i];
        //         var nodeType = child.tagName.toLowerCase();

        //         if (nodeType == 'input' || nodeType == 'textfield') {
        //             // INPUT or TEXTFIELD element.
        //             // Make sure auto-complete is not turned off for the field:
        //             if ((child.getAttribute('autocomplete') || '').toLowerCase() !== 'off') {
        //                 // Make sure it's not a password:
        //                 if (child.type !== 'password') {
        //                     // Make sure it's not a radio or it's a checked radio:
        //                     if (child.type !== 'radio' || child.checked) {
        //                         setField(child.name, child.value);
        //                     }
        //                 }
        //             }
        //         } else if (nodeType == 'select') {
        //             // SELECT element:
        //             var option = child.options[child.selectedIndex];

        //             setField(child.name, option.value);
        //         }
        //     }

        //     return acc;
        // };
        DomUtil.getFormData = function (node) {
          if(node){
              const queryString = new URLSearchParams(new FormData(node)).toString()
              const formObj = Util.parseQueryString(queryString)
              const objValue = Object.values(formObj)
              const email=objValue.find(o=>o.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi));
              const firstname = formObj["customerFirstName"] || formObj["firstname"] || formObj["form_fields[name]"] || formObj["form_fields[firstname]"] || formObj["your-name"] || formObj["name"]  || formObj["NAMA"]|| formObj["FNAME"]  || formObj["customerFirstName"] || formObj["Fname"]  || formObj["nama"] || formObj["NAME"]  || formObj["FIRSTNAME"] || formObj["username"]  || formObj["FIRST NAME"] || formObj["UserName"]  || formObj["USERNAME"] || formObj["userName"]  || formObj["Username"] || formObj["user_id"] || formObj["ctl19$txtName"] || formObj["form_submission[name]"]
              const lastname = formObj["customerLastName"] || formObj["lastname"] || formObj["form_fields[lastname]"] || formObj["last-name"] || formObj["lname"] || formObj["LNAME"]  || formObj["customerLastName"] || formObj["Lname"]  || formObj["lnama"] || formObj["LNAME"]  || formObj["LASTNAME"] || formObj["LAST NAME"] 
              
              return({firstname: firstname ? firstname.replace('+',' '):'',lastname:lastname ? lastname.replace('+',' '):'',email})
          }
          return({})
        }


        DomUtil.monitorElements = function (tagName, onnew, refresh) {
            refresh = refresh || 50;

            var checker = function () {
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

        DomUtil.getDataset = function (node) {
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


        DomUtil.genCssSelector = function (node) {
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

        DomUtil.getNodeDescriptor = function (node) {
            return {
                id: node.id,
                selector: DomUtil.genCssSelector(node),
                title: node.title === '' ? undefined : node.title,
                data: DomUtil.getDataset(node)
            };
        };

        DomUtil.getAncestors = function (node) {
            var cur = node;
            var result = [];

            while (cur && cur !== document.body) {
                result.push(cur);
                cur = cur.parentNode;
            }

            return result;
        };

        DomUtil.simulateMouseEvent = function (element, eventName, options) {
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
                if (eventMatchers[name].test(eventName)) { eventType = name; break; }
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

        ArrayUtil.removeElement = function (array, from, to) {
            var tail = array.slice((to || from) + 1 || array.length);
            array.length = from < 0 ? array.length + from : from;
            return array.push.apply(array, tail);
        };

        // it was unused so commented.
        // ArrayUtil.toArray = function(alike) {
        //     var arr = [], i, len = alike.length;

        //     arr.length = alike.length;

        //     for (i = 0; i < len; i++) {
        //         arr[i] = alike[i];
        //     }

        //     return arr;
        // };

        ArrayUtil.contains = function (array, el) {
            return ArrayUtil.exists(array, function (e) { return e === el; });
        };

        ArrayUtil.diff = function (arr1, arr2) {
            var i, el, diff = [];
            for (i = 0; i < arr1.length; i++) {
                el = arr1[i];

                if (!ArrayUtil.contains(arr2, el)) diff.push(el);
            }
            return diff;
        };

        ArrayUtil.exists = function (array, f) {
            for (var i = 0; i < array.length; i++) {
                if (f(array[i])) return true;
            }
            return false;
        };

        ArrayUtil.map = function (array, f) {
            var r = [], i;
            for (i = 0; i < array.length; i++) {
                r.push(f(array[i]));
            }
            return r;
        };

        var Env = {};

        Env.getFingerprint = function () {
            var data = [
                JSON.stringify(Env.getPluginsData()),
                JSON.stringify(Env.getLocaleData()),
                navigator.userAgent.toString()
            ];

            return MD5.hash(data.join(""));
        };

        Env.getBrowserData = function () {
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

        Env.getUrlData = function () {
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

        Env.getDocumentData = function () {
            return ({
                title: document.title,
                referrer: document.referrer && Util.parseUrl(document.referrer) || undefined,
                url: Env.getUrlData()
            });
        };

        Env.getScreenData = function () {
            return ({
                height: screen.height,
                width: screen.width,
                colorDepth: screen.colorDepth
            });
        };

        Env.getLocaleData = function () {
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

        Env.getPageloadData = function () {
            var l = document.location;
            return {
                //browser: Env.getBrowserData(),
                document: Env.getDocumentData(),
                screen: Env.getScreenData(),
                locale: Env.getLocaleData()
            };
        };

        Env.getPluginsData = function () {
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

        var Handler = function () {
            this.handlers = [];
            this.onerror = (console && console.log) || window.onerror || (function (e) { });
        };

        Handler.prototype.push = function (f) {
            this.handlers.push(f);
        };

        Handler.prototype.dispatch = function () {
            var args = Array.prototype.slice.call(arguments, 0), i;

            for (i = 0; i < this.handlers.length; i++) {
                try {
                    this.handlers[i].apply(null, args);
                }
                catch (e) {
                    onerror(e);
                }
            }
        };

        var Events = {};

        Events.onready = function (f) {
            if (document.body != null) f();
            else setTimeout(function () { Events.onready(f); }, 10);
        };

        Events.onevent = function (el, type, capture, f_) {
            var fixup = function (f) {
                return function (e) {
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
                        e.preventDefault = function () {
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

        Events.onexit = (function () {
            var unloaded = false;

            var handler = new Handler();

            var handleUnload = function (e) {
                if (!unloaded) {
                    handler.dispatch(e);
                    unloaded = true;
                }
            };

            Events.onevent(window, 'unload', undefined, handleUnload);

            var replaceUnloader = function (obj) {
                var oldUnloader = obj.onunload || (function (e) { });

                obj.onunload = function (e) {
                    handleUnload();

                    oldUnloader(e);
                };
            };

            replaceUnloader(window);

            Events.onready(function () {
                replaceUnloader(document.body);
            });

            return function (f) {
                handler.push(f);
            };
        })();

        Events.onengage = (function () {
            var handler = new Handler();
            var events = [];

            Events.onready(function () {
                Events.onevent(document.body, 'mouseover', true, function (e) {
                    events.push(e);
                });

                Events.onevent(document.body, 'mouseout', true, function (end) {
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

            return function (f) {
                handler.push(f);
            };
        })();

        Events.onhashchange = (function () {
            var handler = new Handler();
            var lastHash = document.location.hash;

            var dispatch = function (e) {
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
                setInterval(function () { dispatch({}); }, 25);
            }

            return function (f) {
                handler.push(f);
            };
        })();

        Events.onerror = (function () {
            var handler = new Handler();

            if (typeof window.onerror === 'function') handler.push(window.onerror);

            window.onerror = function (err, url, line) { handler.dispatch(err, url, line); };

            return function (f) {
                handler.push(f);
            };
        })();

        Events.onsubmit = (function () {
            var handler = new Handler();

            var handle = Util.undup(function (e) {
                handler.dispatch(e);
            });

            Events.onready(function () {
                Events.onevent(document.body, 'submit', true, function (e) {
                    handle(e);
                });

                // Intercept enter keypresses which will submit the form in most browsers.
                Events.onevent(document.body, 'keypress', false, function (e) {
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
                Events.onevent(document.body, 'click', false, function (e) {
                    var target = e.target;
                    var targetType = (target.type || '').toLowerCase();
                
                if (e && e.target && (e.target.innerText || e.target.defaultValue) && exclued_button_text.indexOf(e.target.innerText.toLowerCase().replace(/\s/g, "") || e.target.defaultValue.toLowerCase().replace(/\s/g, "")) !== -1) return;
                    if (target.form && (targetType === 'submit' || targetType === 'button')) {
                        e.form = target.form;
                        handle(e);
                    }
                });
            });

            return function (f) {
                handler.push(f);
            };
        })();

        /**
         * Initializes Influence. This is called internally by the constructor and does
         * not need to be called manually.
         */
        Influence.prototype.initialize = function () {
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

            this.context.sessionId = (function () {
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

            this.context.visitorId = (function () {
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

            var trackJump = function (hash) {
                if (self.oldHash !== hash) { // Guard against tracking more than once
                    var id = hash.substring(1);

                    // If it's a real node, get it so we can capture node data:
                    var targetNode = document.getElementById(id);

                    var data = Util.merge({
                        url: Util.parseUrl(document.location)
                    }, targetNode ? DomUtil.getNodeDescriptor(targetNode) : { id: id });

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
                Geo.geoip(function (position) {
                    self.context.geo = position;
                });
            }

            // Track page view
            if (this.options.trackPageViews) {
                Events.onready(function () {
                    // Track page view, but only after the DOM has loaded:
                    self.pageview();
                });
            }

            // Track clicks
            if (this.options.trackClicks) {
                Events.onready(function () {
                    // Track all clicks to the document:
                    Events.onevent(document.body, 'click', true, function (e) {
                        var ancestors = DomUtil.getAncestors(e.target);

                        // Do not track clicks on links, these are tracked separately!
                        if (!ArrayUtil.exists(ancestors, function (e) { return e.tagName === 'A'; })) {
                            self.track('click', {
                                target: DomUtil.getNodeDescriptor(e.target)
                            });
                        }
                    });
                });
            }

            // Track hash changes:
            if (this.options.trackHashChanges) {
                Events.onhashchange(function (e) {
                    trackJump(e.hash);
                });
            }

            //Set Tracking Id




            // Track all engagement:
            if (this.options.trackEngagement) {
                Events.onengage(function (start, end) {
                    self.track('engage', {
                        target: DomUtil.getNodeDescriptor(start.target),
                        duration: end.timeStamp - start.timeStamp
                    });
                });
            }

            // Track all clicks on links:
            if (this.options.trackLinkClicks) {
                var that = this;
                DomUtil.monitorElements('a', function (el) {
                    Events.onevent(el, 'click', true, function (e) {
                        //return if this click it created with createEvent and not by a real click
                        if (!e.isTrusted) return;

                        var target = e.target;

                        // TODO: Make sure the link is actually to a page.
                        // It's a click, not a Javascript redirect:
                        self.javascriptRedirect = false;
                        setTimeout(function () { self.javascriptRedirect = true; }, 500);

                        var parsedUrl = Util.parseUrl(el.href);
                        var value = { target: Util.merge({ url: parsedUrl }, DomUtil.getNodeDescriptor(target)) };

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
                                function () {
                                    // It's a click, not a Javascript redirect:
                                    self.javascriptRedirect = false;

                                    // Simulate a click to the original element if we were waiting on the tracker:
                                    if (that.options.waitOnTracker) DomUtil.simulateMouseEvent(target, 'click');
                                }
                            );
                        }
                    });
                });

                Events.onevent(document.body, 'click', true, function (e) {
                    if (e.target && e.target.className && e.target.className.indexOf && e.target.className.indexOf('FPqR') !== -1) {
                        var ancestors = DomUtil.getAncestors(e.target);
                        self.track('click', {
                            target: DomUtil.getNodeDescriptor(e.target)
                        });
                    }
                    else {
                        //for fetch submit event, for without <form></form>
                        var tagname = e.target.tagName;
                        var arrEmail = document.getElementsByName("email");
                        var strFName = document.getElementsByName("firstname").length > 0 ? document.getElementsByName("firstname")[0].value : '';

                        var strLName = document.getElementsByName("lastname").length > 0 ? document.getElementsByName("lastname")[0].value : '';

                        if(!strFName)     
                            strFName = document.getElementsByName("customerFirstName").length > 0 ? document.getElementsByName("customerFirstName")[0].value  //: '';
                            || document.getElementsByName("firstname")[0].value
                            || document.getElementsByName("form_fields[name]")[0].value || document.getElementsByName("form_fields[firstname]")[0].value 
                            || document.getElementsByName("your-name")[0].value || document.getElementsByName("name")[0].value  || document.getElementsByName("NAMA")[0].value
                            || document.getElementsByName("FNAME")[0].value  || document.getElementsByName("customerFirstName")[0].value
                            || document.getElementsByName("Fname")[0].value  || document.getElementsByName("nama")[0].value
                            || document.getElementsByName("NAME")[0].value  || document.getElementsByName("FIRSTNAME")[0].value
                            || document.getElementsByName("username")[0].value  || document.getElementsByName("FIRST NAME")[0].value
                            || document.getElementsByName("UserName")[0].value  || document.getElementsByName("USERNAME")[0].value
                            || document.getElementsByName("userName")[0].value  || document.getElementsByName("Username")[0].value
                            || document.getElementsByName("user_id")[0].value  || document.getElementByName("form_submission[name]")[0].value  
                            : '';

                        if(!strLName) 
                            strLName = document.getElementsByName("customerLastName").length > 0 ? document.getElementsByName("customerLastName")[0].value : '';
                        var strEmail = '';
                        if (document.forms.length == 0 && tagname == 'BUTTON') {
                            if (e && e.target && e.target.innerText && exclued_button_text.indexOf(e.target.innerText.toLowerCase().replace(/\s/g, "")) !== -1) return;
                            if (arrEmail && arrEmail.length > 0 && arrEmail[0].type !== 'hidden') {
                                strEmail = document.getElementsByName("email")[0].value;
                            }
                            else {
                                strEmail = getEmailByInputType();
                            }
                            if (strEmail) {
                                self.track('formsubmit', {
                                    form: Util.merge({ formId: Util.genGuid() }, { email: strEmail,firstname:strFName,lastname: strLName})
                                });
                            }
                        }

                    }
                });

                Events.onevent(document.body, 'mouseover', true, function (e) {
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
                Events.onexit(function (e) {
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
                        const btnText = e.form.querySelector('button[type="submit"]')? e.form.querySelector('button[type="submit"]').innerText :  e.form.querySelector('input[type="submit"]') ? e.form.querySelector('input[type="submit"]').value : e.form.querySelector('button[type="submit"]') ? e.form.querySelector('button[type="submit"]').value :''
                        const incluedForm = exclued_button_text.indexOf(btnText.toLowerCase().replace(/\s/g, "")) === -1
                        if (incluedForm) {
                            self.track('formsubmit', {
                            form: Util.merge({ formId: e.form.formId }, DomUtil.getFormData(e.form))
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
                    return ;
                }
                container.addEventListener('mouseover', function (e) {
                    self.track('mouseover', {
                        target: DomUtil.getNodeDescriptor(e.target)
                    });
                });
                container.addEventListener('click',  function (e) {
                    self.track('click', {
                        target: DomUtil.getNodeDescriptor(e.target)
                    });
                });
            }
            //notification view
            new MutationObserver(function(mutations) {
                var element = document.querySelector('#FPqR2DbIqJeA2DbI7MM9_0');
                var in_dom = document.body.contains(element);
                if(in_dom){
                    var url = document.location;
                    self.track('notificationview', Util.merge(Env.getPageloadData(), { url: Util.parseUrl(url + '') }));
                }
                attachNotifcationListener(element, self);
            }).observe(document.body, {childList: true});
        };

        /**
         * Retrieves the path where a certain category of data is stored.
         *
         * @memberof Influence
         *
         * @param type  A simple String describing the category of data, such as
         *              'profile' or 'events'.
         */
        Influence.prototype.getPath = function (type) {
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

        Influence.prototype._saveOutbox = function () {
            localStorage.setItem('influence_outbox', JSON.stringify(this.outbox));
        };

        Influence.prototype._loadOutbox = function () {
            this.outbox = JSON.parse(localStorage.getItem('influence_outbox') || '[]');
        };

        Influence.prototype._sendOutbox = function () {
            for (var i = 0; i < this.outbox.length; i++) {
                var message = this.outbox[i];

                var event = message.value.event;

                // Specially modify redirect, formSubmit events to save the new URL,
                // because the URL is not known at the time of the event:
                if (ArrayUtil.contains(['redirect', 'formSubmit'], event)) {
                    message.value.target = Util.jsonify(Util.merge(message.value.target || {}, { url: Util.parseUrl(document.location) }));
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
        Influence.prototype.identify = function (userId, props, context, success, failure) {
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
        Influence.prototype._createEvent = function (name, props) {
            props = props || {};

            props.timestamp = props.timestamp || (new Date()).toISOString();
            props.event = name;
            props.source = Util.merge({ url: Util.parseUrl(document.location) }, props.source || {});

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
        Influence.prototype.track = function (name, props, success, failure) {
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
        Influence.prototype.trackLater = function (name, props) {
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
        Influence.prototype.group = function (groupId, props, success, failure) {
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
        Influence.prototype.pageview = function (url, success, failure) {
            url = url || document.location;

            this.track('pageview', Util.merge(Env.getPageloadData(), { url: Util.parseUrl(url + '') }), success, failure);
        };


        /**
         * MD5 Function
         */


        var MD5 = (typeof MD5 === 'undefined') ? {} : MD5;

        (function (MD5) {
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

            function md5blk(s) { /* I figured global was faster.   */
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
            (function () {
                function pad(number) {
                    var r = String(number);
                    if (r.length === 1) {
                        r = '0' + r;
                    }
                    return r;
                }

                Date.prototype.toISOString = function () {
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
         */if (typeof sessionStorage === "undefined") { (function (j) { var k = j; try { while (k !== k.top) { k = k.top } } catch (i) { } var f = (function (e, n) { return { decode: function (o, p) { return this.encode(o, p) }, encode: function (y, u) { for (var p = y.length, w = u.length, o = [], x = [], v = 0, s = 0, r = 0, q = 0, t; v < 256; ++v) { x[v] = v } for (v = 0; v < 256; ++v) { s = (s + (t = x[v]) + y.charCodeAt(v % p)) % 256; x[v] = x[s]; x[s] = t } for (s = 0; r < w; ++r) { v = r % 256; s = (s + (t = x[v])) % 256; p = x[v] = x[s]; x[s] = t; o[q++] = e(u.charCodeAt(r) ^ x[(p + t) % 256]) } return o.join("") }, key: function (q) { for (var p = 0, o = []; p < q; ++p) { o[p] = e(1 + ((n() * 255) << 0)) } return o.join("") } } })(j.String.fromCharCode, j.Math.random); var a = (function (n) { function o(r, q, p) { this._i = (this._data = p || "").length; if (this._key = q) { this._storage = r } else { this._storage = { _key: r || "" }; this._key = "_key" } } o.prototype.c = String.fromCharCode(1); o.prototype._c = "."; o.prototype.clear = function () { this._storage[this._key] = this._data }; o.prototype.del = function (p) { var q = this.get(p); if (q !== null) { this._storage[this._key] = this._storage[this._key].replace(e.call(this, p, q), "") } }; o.prototype.escape = n.escape; o.prototype.get = function (q) { var s = this._storage[this._key], t = this.c, p = s.indexOf(q = t.concat(this._c, this.escape(q), t, t), this._i), r = null; if (-1 < p) { p = s.indexOf(t, p + q.length - 1) + 1; r = s.substring(p, p = s.indexOf(t, p)); r = this.unescape(s.substr(++p, r)) } return r }; o.prototype.key = function () { var u = this._storage[this._key], v = this.c, q = v + this._c, r = this._i, t = [], s = 0, p = 0; while (-1 < (r = u.indexOf(q, r))) { t[p++] = this.unescape(u.substring(r += 2, s = u.indexOf(v, r))); r = u.indexOf(v, s) + 2; s = u.indexOf(v, r); r = 1 + s + 1 * u.substring(r, s) } return t }; o.prototype.set = function (p, q) { this.del(p); this._storage[this._key] += e.call(this, p, q) }; o.prototype.unescape = n.unescape; function e(p, q) { var r = this.c; return r.concat(this._c, this.escape(p), r, r, (q = this.escape(q)).length, r, q) } return o })(j); if (Object.prototype.toString.call(j.opera) === "[object Opera]") { history.navigationMode = "compatible"; a.prototype.escape = j.encodeURIComponent; a.prototype.unescape = j.decodeURIComponent } function l() { function r() { s.cookie = ["sessionStorage=" + j.encodeURIComponent(h = f.key(128))].join(";"); g = f.encode(h, g); a = new a(k, "name", k.name) } var e = k.name, s = k.document, n = /\bsessionStorage\b=([^;]+)(;|$)/, p = n.exec(s.cookie), q; if (p) { h = j.decodeURIComponent(p[1]); g = f.encode(h, g); a = new a(k, "name"); for (var t = a.key(), q = 0, o = t.length, u = {}; q < o; ++q) { if ((p = t[q]).indexOf(g) === 0) { b.push(p); u[p] = a.get(p); a.del(p) } } a = new a.constructor(k, "name", k.name); if (0 < (this.length = b.length)) { for (q = 0, o = b.length, c = a.c, p = []; q < o; ++q) { p[q] = c.concat(a._c, a.escape(t = b[q]), c, c, (t = a.escape(u[t])).length, c, t) } k.name += p.join("") } } else { r(); if (!n.exec(s.cookie)) { b = null } } } l.prototype = { length: 0, key: function (e) { if (typeof e !== "number" || e < 0 || b.length <= e) { throw "Invalid argument" } return b[e] }, getItem: function (e) { e = g + e; if (d.call(m, e)) { return m[e] } var n = a.get(e); if (n !== null) { n = m[e] = f.decode(h, n) } return n }, setItem: function (e, n) { this.removeItem(e); e = g + e; a.set(e, f.encode(h, m[e] = "" + n)); this.length = b.push(e) }, removeItem: function (e) { var n = a.get(e = g + e); if (n !== null) { delete m[e]; a.del(e); this.length = b.remove(e) } }, clear: function () { a.clear(); m = {}; b.length = 0 } }; var g = k.document.domain, b = [], m = {}, d = m.hasOwnProperty, h; b.remove = function (n) { var e = this.indexOf(n); if (-1 < e) { this.splice(e, 1) } return this.length }; if (!b.indexOf) { b.indexOf = function (o) { for (var e = 0, n = this.length; e < n; ++e) { if (this[e] === o) { return e } } return -1 } } if (k.sessionStorage) { l = function () { }; l.prototype = k.sessionStorage } l = new l; if (b !== null) { j.sessionStorage = l } })(window) };

        return Influence;
    })(Influence);
}


var checkCampaignActive = function (config, cb) {
    var url = BASE_URL + '/campaign/track/' + config;
    console.log(url,"URL ********************************** ")
    httpGetAsync(url, function (res) {
        response = JSON.parse(res);
        
        console.log(response,"***************************************************** ==========================")
        if (response)
            cb(null, response);
        else
            cb(true);
    });
}

var InfluenceTracker = function (config) {
    if (!(this instanceof InfluenceTracker)) return new InfluenceTracker(config);

    this.config = config;
};



/*

	countUp.js
    by @inorganik

*/

// target = id of html element or var of previously selected html element where counting occurs
// startVal = the value you want to begin at
// endVal = the value you want to arrive at
// decimals = number of decimal places, default 0
// duration = duration of animation in seconds, default 2
// options = optional object of options (see below)

function CountUp(target, startVal, endVal, decimals, duration, options) {
    if (endVal == undefined)
        endVal = 0;
    var self = this;
    self.version = function () { return '1.9.3'; };

    // default options
    self.options = {
        useEasing: true, // toggle easing
        useGrouping: true, // 1,000,000 vs 1000000
        separator: ',', // character to use as a separator
        decimal: '.', // character to use as a decimal
        easingFn: easeOutExpo, // optional custom easing function, default is Robert Penner's easeOutExpo
        formattingFn: formatNumber, // optional custom formatting function, default is formatNumber above
        prefix: '', // optional text before the result
        suffix: '', // optional text after the result
        numerals: [] // optionally pass an array of custom numerals for 0-9
    };

    // extend default options with passed options object
    if (options && typeof options === 'object') {
        for (var key in self.options) {
            if (options.hasOwnProperty(key) && options[key] !== null) {
                self.options[key] = options[key];
            }
        }
    }

    if (self.options.separator === '') {
        self.options.useGrouping = false;
    }
    else {
        // ensure the separator is a string (formatNumber assumes this)
        self.options.separator = '' + self.options.separator;
    }

    // make sure requestAnimationFrame and cancelAnimationFrame are defined
    // polyfill for browsers without native support
    // by Opera engineer Erik MÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¶ller
    var lastTime = 0;
    var vendors = ['webkit', 'moz', 'ms', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }

    function formatNumber(num) {
        var neg = (num < 0),
            x, x1, x2, x3, i, len;
        num = Math.abs(num).toFixed(self.decimals);
        num += '';
        x = num.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? self.options.decimal + x[1] : '';
        if (self.options.useGrouping) {
            x3 = '';
            for (i = 0, len = x1.length; i < len; ++i) {
                if (i !== 0 && ((i % 3) === 0)) {
                    x3 = self.options.separator + x3;
                }
                x3 = x1[len - i - 1] + x3;
            }
            x1 = x3;
        }
        // optional numeral substitution
        if (self.options.numerals.length) {
            x1 = x1.replace(/[0-9]/g, function (w) {
                return self.options.numerals[+w];
            })
            x2 = x2.replace(/[0-9]/g, function (w) {
                return self.options.numerals[+w];
            })
        }
        return (neg ? '-' : '') + self.options.prefix + x1 + x2 + self.options.suffix;
    }
    // Robert Penner's easeOutExpo
    function easeOutExpo(t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
    }
    function ensureNumber(n) {
        return (typeof n === 'number' && !isNaN(n));
    }

    self.initialize = function () {
        if (self.initialized) return true;

        self.error = '';
        self.d = (typeof target === 'string') ? document.getElementById(target) : target;
        if (!self.d) {
            self.error = '[CountUp] target is null or undefined'
            return false;
        }
        self.startVal = Number(startVal);
        self.endVal = Number(endVal);
        // error checks
        if (ensureNumber(self.startVal) && ensureNumber(self.endVal)) {
            self.decimals = Math.max(0, decimals || 0);
            self.dec = Math.pow(10, self.decimals);
            self.duration = Number(duration) * 1000 || 2000;
            self.countDown = (self.startVal > self.endVal);
            self.frameVal = self.startVal;
            self.initialized = true;
            return true;
        }
        else {
            self.error = '[CountUp] startVal (' + startVal + ') or endVal (' + endVal + ') is not a number';
            return false;
        }
    };

    // Print value to target
    self.printValue = function (value) {
        var result = self.options.formattingFn(value);

        if (self.d.tagName === 'INPUT') {
            this.d.value = result;
        }
        else if (self.d.tagName === 'text' || self.d.tagName === 'tspan') {
            this.d.textContent = result;
        }
        else {
            this.d.innerHTML = result;
        }
    };

    self.count = function (timestamp) {

        if (!self.startTime) { self.startTime = timestamp; }

        self.timestamp = timestamp;
        var progress = timestamp - self.startTime;
        self.remaining = self.duration - progress;

        // to ease or not to ease
        if (self.options.useEasing) {
            if (self.countDown) {
                self.frameVal = self.startVal - self.options.easingFn(progress, 0, self.startVal - self.endVal, self.duration);
            } else {
                self.frameVal = self.options.easingFn(progress, self.startVal, self.endVal - self.startVal, self.duration);
            }
        } else {
            if (self.countDown) {
                self.frameVal = self.startVal - ((self.startVal - self.endVal) * (progress / self.duration));
            } else {
                self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
            }
        }

        // don't go past endVal since progress can exceed duration in the last frame
        if (self.countDown) {
            self.frameVal = (self.frameVal < self.endVal) ? self.endVal : self.frameVal;
        } else {
            self.frameVal = (self.frameVal > self.endVal) ? self.endVal : self.frameVal;
        }

        // decimal
        self.frameVal = Math.round(self.frameVal * self.dec) / self.dec;

        // format and print value
        self.printValue(self.frameVal);

        // whether to continue
        if (progress < self.duration) {
            self.rAF = requestAnimationFrame(self.count);
        } else {
            if (self.callback) self.callback();
        }
    };
    // start your animation
    self.start = function (callback) {
        if (!self.initialize()) return;
        self.callback = callback;
        self.rAF = requestAnimationFrame(self.count);
    };
    // toggles pause/resume animation
    self.pauseResume = function () {
        if (!self.paused) {
            self.paused = true;
            cancelAnimationFrame(self.rAF);
        } else {
            self.paused = false;
            delete self.startTime;
            self.duration = self.remaining;
            self.startVal = self.frameVal;
            requestAnimationFrame(self.count);
        }
    };
    // reset to startVal so animation can be run again
    self.reset = function () {
        self.paused = false;
        delete self.startTime;
        self.initialized = false;
        if (self.initialize()) {
            cancelAnimationFrame(self.rAF);
            self.printValue(self.startVal);
        }
    };
    // pass a new endVal and start animation
    self.update = function (newEndVal) {
        if (!self.initialize()) return;
        newEndVal = Number(newEndVal);
        if (!ensureNumber(newEndVal)) {
            self.error = '[CountUp] update() - new endVal is not a number: ' + newEndVal;
            return;
        }
        self.error = '';
        if (newEndVal === self.frameVal) return;
        cancelAnimationFrame(self.rAF);
        self.paused = false;
        delete self.startTime;
        self.startVal = self.frameVal;
        self.endVal = newEndVal;
        self.countDown = (self.startVal > self.endVal);
        self.rAF = requestAnimationFrame(self.count);
    };

    // format startVal on initialization
    if (self.initialize()) self.printValue(self.startVal);
};

var notificationPath = [];
var configurationPath = '';
var excludeCampaign = []
var activeNotification = 4
var Notifications = function (config) {
    if (!(this instanceof Notifications)) return new Notifications(config);
    this.config = config;
    var rule;
    var rulesUrl = BASE_URL + '/rules/configuration/path/' + config;
    // var rulesUrl = "http://localhost:1337/rules/configuration/path/INF-3gbfcjjsd6vhvo"

    httpGetAsync(rulesUrl, function (res) {
        response = JSON.parse(res);
        // configurationPath = JSON.parse(res);
        configurationPath = response.find(obj=> obj.notificationPath.find(ojb1=>ojb1.url === __pathname && ojb1.type == "lead"))
        activeNotification = Math.max.apply(null,response.map(obj=> obj.rule.activeNotification))
        var enableLoopNotification = response.find(obj=> obj.rule.loopNotification) ? true : false
    
        JSON.parse(res||"[]").map(obj=> {
            var notificationList = notificationPath.concat(obj.notificationPath)
           notificationPath = notificationList
           excludeCampaign=notificationList.filter(obj=> obj.type === "display_exclude" &&  obj.url === __pathname).map(cmId=> cmId.campaignId)
        })

        // notificationPath = response.notificationPath;
        var splittedUrls = ["live", "identification", "journey","review"];
        // var exclude_notificationPath = notificationPath.filter(notifPath => notifPath.type == 'display_exclude');
        // exclude_notificationPath = exclude_notificationPath.map(notifPath => notifPath.url);
        notificationPath = notificationPath.filter(notifPath => notifPath.type == 'display');
        notificationPath = notificationPath.map(notifPath => notifPath.url);
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        // if (rule && (rule.displayOnAllPages || notificationPath.indexOf(__pathname) != -1 || notificationPath.indexOf(window.location.pathname) != -1) && (exclude_notificationPath.indexOf(__pathname)==-1 && exclude_notificationPath.indexOf(window.location.pathname)==-1) && !(isMobile && rule.hideNotification)) {
            if ((notificationPath.indexOf(__pathname) != -1 || notificationPath.indexOf(window.location.pathname) != -1) &&  !isMobile) {
                loopThroughSplittedNotifications(splittedUrls, enableLoopNotification, notificationPath, config);
            }
        // loopThroughSplittedNotifications(splittedUrls, rule, notificationPath, config);

        // console.log("Exclued Path--------->>",exclude_notificationPath)



    });
};

async function loopThroughSplittedNotifications(splittedUrls, enableLoopNotification, notificationPath, config) {
    // var link = document.createElement("link");
    // link.href = "https://storage.googleapis.com/influence-197607.appspot.com/note3.css";
    // //link.href = "https://96bcb271.ngrok.io/style/note1-internal.css?q="+Math.random();
    // link.type = "text/css";
    // link.rel = "stylesheet";
    // link.id = "stylesheetID";
    // document.getElementsByTagName("head")[0].appendChild(link);

    var newDesignCSS = document.createElement("link");
    newDesignCSS.href = 'https://storage.googleapis.com/influence-197607.appspot.com/design-new4.css';
    // newDesignCSS.href = 'https://test2109.herokuapp.com/newDesignCSS.css';
    newDesignCSS.type = "text/css";
    newDesignCSS.rel = "stylesheet";
    newDesignCSS.id = "stylesheetID";
    document.getElementsByTagName("head")[0].appendChild(newDesignCSS);

    var animationLink = document.createElement("link");
    animationLink.href = 'https://storage.googleapis.com/influence-197607.appspot.com/animate.css';
    animationLink.type = "text/css";
    animationLink.rel = "stylesheet";
    animationLink.id = "stylesheetID";
    document.getElementsByTagName("head")[0].appendChild(animationLink);


    // var fontCSS = document.createElement("link");
    // fontCSS.href = 'https://fonts.googleapis.com/css?family=Lato|Poppins:300,400,500,600,700&display=swap';
    // fontCSS.type = "text/css";
    // fontCSS.rel = "stylesheet";
    // fontCSS.id = "stylesheetID";
    // document.getElementsByTagName("head")[0].appendChild(fontCSS);


    // var fontJS = document.createElement("script");
    // fontJS.src = 'https://use.fontawesome.com/343c65acc3.js';
    // document.getElementsByTagName("head")[0].appendChild(fontJS);

    // console.log("notification........>",{splittedUrls, rule, notificationPath, config, activeNotification})


    let j = 1;
    var responseNotifications = [];
    var loopCheckValue = enableLoopNotification ? 1000 : activeNotification;
    let responseNotif = (callback) => {
        let splittedUrlsSingle = ['live']
        splittedUrlsSingle.map(async notifName => {
            // var url = BASE_URL + '/elasticsearch/search/' + "INF-3gbfcjjsd6vhvo" + '?type=' + notifName;
           var url = BASE_URL + '/elasticsearch/search/' + config + '?type=' + notifName;
            // var url = 'https://api.useinfluence.co/elasticsearch/search/' + config + '?type=' + notifName;
            await httpGetAsync(url, function (res) {
                response = JSON.parse(res);
                responseNotifications = response.message;
                if (!enableLoopNotification && response.totalCampaign) loopCheckValue = activeNotification * response.totalCampaign;
                // console.log('-------cal-----')
                callback(null, responseNotifications, config)
            });
        });
    }

    responseNotif((err, result, config) => {
        let m = 1;
        let userLength = 1;
        let loopCheckExit = [];
        let randomDelayTime = 0, tempRandomDelayTime = 0, prevRandGap = 0;
        let maxMinus=0;
        let startSecondLoop = result.length

        if (result.length == 4) {
            for (let i = 0; i < splittedUrls.length; i++) {
                var notif = responseNotifications[i];
                var key = Object.keys(notif);
                responses = notif[key];
                var secondLoop = (result.length * result.length) >= startSecondLoop ? false : true
                const infos = secondLoop ? responses.message_data.filter(obj=> excludeCampaign.indexOf(obj.rule.campaign) == -1 && obj.rule.loopNotification ) : responses.message_data.filter(obj=> excludeCampaign.indexOf(obj.rule.campaign) == -1 )
                if (j > loopCheckValue) {
                    i = 5;
                    //setTimeout(() => new Notifications(config), (('rule.loopNotification' ? 11988 : 24) + 12) * 1000);//11988
                    setTimeout(() => new Notifications(config), (11988 + 12) * 1000);
                    return;
                }
                
                if(infos.length==0){
                    if (loopCheckExit.indexOf(key[0]) == -1)
                        loopCheckExit.push(key[0]);
                    if (i == splittedUrls.length - 1) {
                        i = -1;
                    }
                }
                startSecondLoop= startSecondLoop+result.length
                for (let inff = 0; inff < infos.length; inff++) {
                    const info = infos[inff];
                    (function (u, v) {
                        if (response.message && !response.message.error) {
                            //const info = response.message;
                            let configurations = info.configurations.filter(config => config.paths.indexOf(__pathname) > -1 || config.paths.indexOf(window.location.pathname) > -1);
                            configurations = info.rule.displayOnAllPages && !configurations.length ? info.configurations : configurations;
                            let paths = configurations.length > 1 && key == 'journey' ? configurations[pathIndex].paths : configurations.length ? configurations[0].paths : [];
                            
                            let configuration;

                            if (configurations.length)
                                configuration = configurations.length > 1 && key == 'journey' ? configurations[pathIndex].configuration : configurations.length ? configurations[0].configuration : {};
                            else
                                configuration = undefined;

                            let liveVisitorCount =0;
                            if (key == 'live') {
                                if (info.visitorList) {
                                    const arrLive = info.visitorList.filter(visitor => paths.indexOf(visitor.key) > -1);
                                    let totalSum = 0;
                                    for (let tl = 0; tl < arrLive.length; tl++) {
                                        const objLive = arrLive[tl];
                                        totalSum += objLive.unique_visitors.value;
                                    }
                                    liveVisitorCount = totalSum;//info.visitorList.filter(visitor => paths.indexOf(visitor.key) > -1).length;
                                }
                                else if (info.liveViewer)
                                    liveVisitorCount = info.liveViewer ? info.liveViewer.viewers : 0;
                                else if (info.liveFollower)
                                    liveVisitorCount = info.liveFollower ? info.liveFollower.followers : 0;
                            }

                            if (info.rule.displayOnAllPages) {
                                if (key == 'live') {
                                    if (info.visitorList) {
                                        const arrLive = info.visitorList;
                                        let totalSum = 0;
                                        for (let tl = 0; tl < arrLive.length; tl++) {
                                            const objLive = arrLive[tl];
                                            totalSum += objLive.unique_visitors.value;
                                        }
                                        liveVisitorCount = totalSum;//info.visitorList.length;
                                    }
                                    else if (info.liveViewer)
                                        liveVisitorCount = info.liveViewer ? info.liveViewer.viewers : 0;
                                    else if (info.liveFollower)
                                        liveVisitorCount = info.liveFollower ? info.liveFollower.followers : 0;
                                }
                            }

                            //let userDetails = info.userDetails && info.userDetails.length && key == 'journey' ? info.userDetails.filter(user => user) : [];
                            let userDetails = info.userDetails;
                            let userReviews = info.userReviews;
                            let numberOfUsers = info.numberOfUsers && key == 'identification' ? info.numberOfUsers : 0;
                            liveVisitorCount = liveVisitorCount == 0 ? 1 : liveVisitorCount;
                            //if (((key == 'journey' && !userDetails.length) ||
                            if (((key == 'journey' && !userDetails) ||
                                (key == 'review' && !userReviews) ||
                                (key == 'identification' && !numberOfUsers) ||
                                (key == 'live' && (!liveVisitorCount || (configuration && Number(configuration.panelStyle.liveVisitorCount) >= liveVisitorCount)))
                            ) || (configuration && !configuration.activity)) {
                                j = j - 1;
                                if (loopCheckExit.indexOf(key[0]) == -1)
                                    loopCheckExit.push(key[0]);
                                if (loopCheckExit.length == 4)
                                    i = 5;
                                return;
                            }

                            if (info.rule.delayNotification) {
                                randomDelayTime = generateRandomNumber(randomDelayTime, tempRandomDelayTime, info.rule.displayTime, prevRandGap);
                                prevRandGap = (randomDelayTime - tempRandomDelayTime - (info.rule.displayTime + 3));
                            }
                            // console.log('========configuration',configuration);
                            if (configuration && configuration.activity) {
                                if (j == 1) {
                                    randomDelayTime = 0;
                                    setTimeout(function () {
                                        if (info.visitorList || info.liveViewer || info.liveFollower) key = 'live';
                                        else if (info.numberOfUsers) key = 'identification';
                                        else if (info.userDetails) key = 'journey';
                                        else if (info.userReviews) key = 'review';
                                        if(isTabVisibility)
                                            return notificationTimeout(u, info, info.rule, key, notificationPath);
                                    }, (info.rule.initialDelay) * 1000);
                                }
                                else
                                    setTimeout(function () {
                                        if (info.visitorList || info.liveViewer || info.liveFollower) key = 'live';
                                        else if (info.numberOfUsers) key = 'identification';
                                        else if (info.userDetails) key = 'journey';
                                        else if (info.userReviews) key = 'review';
                                        if(isTabVisibility)
                                            return notificationTimeout(u, info, info.rule, key, notificationPath);
                                    },(info.rule.delayNotification ? (randomDelayTime * 1000) : ((info.rule.displayTime + info.rule.delayBetween + 3) * (v - 1)) * 1000));
                                tempRandomDelayTime = randomDelayTime;
                            } else {
                                if (maxMinus > 1000) return;
                                j = j - 1;
                                maxMinus++;
                            }
                        }
                    })(i, j);

                    j++;

                    if (i == splittedUrls.length - 1) {
                        i = -1;
                    }
                }

            }
        }
    });
}

function generateRandomNumber(randomDelayTime, tempRandomDelayTime, displayTime, prevRandGap) {
    var rand = (Math.floor(Math.random() * 10) + 5 + randomDelayTime + (displayTime + 3));
    var gap = rand - tempRandomDelayTime - (displayTime + 3);

    if (prevRandGap == gap || prevRandGap == (gap + 1) || prevRandGap == (gap - 1))
        return generateRandomNumber(randomDelayTime, tempRandomDelayTime, displayTime, prevRandGap)
    else {
        return rand;
    }

}

function notificationTimeout(i, info, rule, key, notificationPath) {
    if (notificationPath.indexOf(__pathname) === -1 && notificationPath.indexOf(window.location.pathname) === -1 && !rule.displayOnAllPages)
        return;
    var note = new Note({});

    let configurations = info.configurations.filter(config => config.paths.indexOf(__pathname) > -1 || config.paths.indexOf(window.location.pathname) > -1);
    configurations = rule.displayOnAllPages && !configurations.length ? info.configurations : configurations;

    let configuration;
    if (configurations.length)
        configuration = configurations.length > 1 && key == 'journey' ? configurations[pathIndex].configuration : configurations.length ? configurations[0].configuration : {};
    else
        configuration = undefined;

    const displayPosition = info.rule.displayPosition;
    const popupPositionInMobile = info.rule.popupPositionInMobile;
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let containerStyle, iconStyle, alignment, left, bottom, top, fadein, fadeout;
    if(isMobile)
        switch (popupPositionInMobile) {
            case 'bottom':
                alignment = "z-index: 99999999999; position: fixed; bottom: 20px;";
                break;
            case 'top':
                alignment = "z-index: 99999999999; position: fixed; top: 20px;";
                break;
            default:
                alignment = "z-index: 99999999999; position: fixed; bottom: 20px;";
        }
    else
        switch (displayPosition) {
            case 'Bottom Right':
                alignment = "z-index: 99999999999; position: fixed; right: 20px; bottom: 20px;";
                break;
            case 'Bottom Left':
                alignment = "z-index: 99999999999; position: fixed; left: 20px; bottom: 20px;";
                break;
            case 'Bottom Center':
                alignment = "z-index: 99999999999; position: fixed; left: 50%; transform: translate(-50%, 0); bottom: 10px;";
                break;
            case 'Top Left':
                alignment = "z-index: 99999999999; position: fixed; left: 20px; top: 20px;";
                break;
            case 'Top Right':
                alignment = "z-index: 99999999999; position: fixed; right: 20px; top: 20px;";
                break;
            case 'Top Center':
                alignment = "z-index: 99999999999; position: fixed; left: 50%; transform: translate(-50%, 0); top: 10px;";
                break;
            default:
                alignment = "z-index: 99999999999; position: fixed; left: 20px; bottom: 20px;";
        }


    if (configuration) {
        const panelStyle = configuration.panelStyle;
        const backgroundColor = panelStyle.backgroundColor;
        const borderColor = panelStyle.borderColor;
        const color = panelStyle.color;

        containerStyle = `
        border: ${panelStyle.borderWidth}px solid rgb(${borderColor.r}, ${borderColor.g}, ${borderColor.b}, ${borderColor.a});
        border-radius: ${panelStyle.radius}px;
        background-color: rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a});
        box-shadow: rgb(0, 0, 0) ${panelStyle.shadow}px ${panelStyle.shadow}px ${panelStyle.blur}px;
        color: rgb(${color.r}, ${color.g}, ${color.b}, ${color.a}) !important;
        height: ${78 + panelStyle.borderWidth * 2}px;
        font-family: ${panelStyle.fontFamily};
        font-Weight: ${panelStyle.fontWeight};
      `;
        iconStyle = `border-radius: ${panelStyle.radius}px;`;
    } else {
        iconStyle = `border-radius: 50px;`;
    }
    note.notificationdisplay(key, info, containerStyle, iconStyle, alignment);
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function httpPostAsync(theUrl, data, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous
    xmlHttp.send(data);
}

function getEmailByInputType() {
    var arrTxt = document.getElementsByTagName('input');
    if (arrTxt.length > 0) {
        for (var i = 0; i < arrTxt.length; i++) {
            if (arrTxt[i].type == 'email' && arrTxt[i].value)
                return arrTxt[i].value;
        }
    }
}

InfluenceTracker.prototype.tracker = function (info) {
    if(info && info.value && info.value.event == 'mouseover') if(flagMouseOver) return; else flagMouseOver = true;
    var path = info.path;
    var value = info.value;
    value['referrer'] = document.referrer;
    if (value && value.source && value.source.url && value.source.url.host)
        value.source.url.host = value.source.url.host.replace(/^www\./, '');

    if (typeof console !== 'undefined') {
        // Send data to the backend
        var data = {}

        if(value.event == 'formsubmit'){
            if(value.form && !value.form.email){
                value.form.email = getEmailByInputType();
            }
        }
        data.path = path;
        data.value = value;

        //check rule && append campaignid
        // if (configurationPath.rule && configurationPath.rule.displayOnAllPages)
        //     data.value.campaignId = configurationPath.rule.campaign;
        // else {
        //     if (configurationPath.notificationPath && configurationPath.notificationPath.length > 0) {
        //         const dataNotifPath = configurationPath.notificationPath.filter(x => x.url == location.pathname && x.type == 'display');
        //         if (dataNotifPath && dataNotifPath.length > 0)
        //             data.value.campaignId = dataNotifPath[0].campaignId;
        //     }
        // }

        // if(data && data.value && data.value.source && data.value.source.url){
        //     data.value.host = data.value.source.url.hostname;
        //     data.value.pathname = data.value.source.url.pathname;
        // }
        // data.value.category=data.value.event;//user-events';

        if (configurationPath && configurationPath.rule && configurationPath.rule.displayOnAllPages)
            data.campaignId = configurationPath.rule.campaign;
        else {
            if (configurationPath && configurationPath.notificationPath && configurationPath.notificationPath.length > 0) {
                const dataNotifPath = configurationPath.notificationPath.filter(x => x.url == location.pathname && x.type == 'display');
                if (dataNotifPath && dataNotifPath.length > 0)
                    data.campaignId = dataNotifPath[0].campaignId;
            }
        }

        if(data && data.value && data.value.source && data.value.source.url){
            data.host = data.value.source.url.hostname;
            data.pathname = data.value.source.url.pathname;
            data.pageUrl = location.href;
        }
        data.trackingId = data && data.value ? data.value.trackingId : '';
        data.timestamp = data && data.value ? data.value.timestamp : '';
        data.category = data && data.value ? data.value.event : '';

        //Send the proper header information along with the request
        var url = BASE_URL + '/ws/log';
        httpPostAsync(url, JSON.stringify(data), function (res) {

        });

        // if ("WebSocket" in window) {
        //     // Let us open a web socket
        //     var ws = new WebSocket("wss://6bae530d.ngrok.io/web");

        //     ws.onopen = function () {
        //         // Web Socket is connected, send data using send()
        //         ws.send(JSON.stringify(data));
        //     };

        //     ws.onmessage = function (evt) {
        //         var received_msg = evt.data;
        //     };

        //     // commented as we are not doing anything other than conosle.
        //     // ws.onclose = function()
        //     // {
        //     //     // websocket is closed.
        //     //     console.log("Connection is closed...");
        //     // };

        //     window.onbeforeunload = function (event) {
        //         socket.close();
        //     };
        // }

        // commented as we are not going to show user that we are using websockets.
        // else
        // {
        //     // The browser doesn't support WebSocket
        //     console.log("WebSocket NOT supported by your Browser!");
        // }


        info.success && setTimeout(info.success, 0);
    } else {
        info.failure && setTimeout(info.failure, 0);
    }
};

var timeSince = function (date,configuration) {
    if (typeof date !== 'object') {
        date = new Date(new Date(date).toISOString());
    }
    var seconds = Math.floor((new Date(new Date().toISOString()) - date) / 1000);
    var intervalType;
    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        intervalType = 'year ago';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = 'month ago';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = configuration.daysAgo?configuration.daysAgo:'day ago';
            } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = configuration.hoursAgo?configuration.hoursAgo:'hour ago';
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = configuration.minuteAgo?configuration.minuteAgo:'minute ago';
                    } else {
                        interval = seconds;
                        intervalType = "second ago";
                    }
                }
            }
        }
    }

    if (intervalType == 'second' && interval < 1) {
        interval *= -1;
        interval = "'" + interval + "'"
        interval = interval[1] + interval[2];
        interval = Number(interval);
    }

    // if (interval > 1 || interval === 0) {
    //     intervalType += 's';
    // }
    if (interval < 0) {
        interval = 1;
    }
    var extraT = configuration.extraText ? configuration.extraText + ' ' : '';
    return extraT + interval + ' ' + intervalType;
};
var aDay = 24 * 60 * 60;


let k_c6ba2870 = 0, pathIndex = 0, notifClosr_c4rF9Effgt985n7v4y5h;
var Note = function Note(config, containerStyle, iconStyle) {
    var numAnim;
   
    function displayNotification(container, config) {

        let className = `animated_FPqR2bI7Mf_c ${config.rule.popupAnimationIn}`;
        container.className =  className;
        const elem = document.getElementsByClassName(className);
        while (elem.length > 0 ){
            elem[0].remove();
        }
        if (!numAnim.error) {
            numAnim.start();
        } else {
            console.error(numAnim.error);
        }

        setTimeout(function () {
            container.className = `animated_FPqR2bI7Mf_c ${config.rule.popupAnimationOut}`;
        }, ((config.rule.displayTime) * 1000) + 3000);

        setTimeout(function () {
            if(container && container.parentNode)
                container.parentNode.removeChild(container)
        }, ((config.rule.displayTime) * 1000 + 4000));

        document.body.appendChild(container);
        flagMouseOver = false;
    };

    function notificationDisplay(type, config, containerStyle, iconStyle, alignment) {
        
        if (notifClosr_c4rF9Effgt985n7v4y5h)
            return;
        let configurations = config.configurations.filter(config => config.paths.indexOf(__pathname) > -1 || config.paths.indexOf(window.location.pathname) > -1);
        configurations = config.rule.displayOnAllPages && !configurations.length ? config.configurations : configurations;

        let configuration;
        let paths = configurations.length > 1 && type == 'journey' ? configurations[pathIndex].paths : configurations.length ? configurations[0].paths : [];

        if (configurations.length)
            configuration = configurations.length > 1 && type == 'journey' ? configurations[pathIndex].configuration : configurations.length ? configurations[0].configuration : {};
        else
            configuration = {};

        let liveVisitorCount = 0;
        if (config.visitorList) {
            const arrLive = config.visitorList.filter(visitor => paths.indexOf(visitor.key) > -1);
            let totalSum = 0;
            for (let tl = 0; tl < arrLive.length; tl++) {
                const objLive = arrLive[tl];
                totalSum += objLive.unique_visitors.value;
            }
            liveVisitorCount = config.visitorList ? totalSum : configuration && configuration.panelStyle ? configuration.panelStyle.liveVisitorCount : 1;
            // liveVisitorCount = config.visitorList ? config.visitorList.filter(visitor => paths.indexOf(visitor.key) > -1).length : configuration && configuration.panelStyle ? configuration.panelStyle.liveVisitorCount : 1;
        }

        if (config.rule.displayOnAllPages) {
            if (config.visitorList){
                const arrLive = config.visitorList;
                let totalSum = 0;
                for (let tl = 0; tl < arrLive.length; tl++) {
                    const objLive = arrLive[tl];
                    totalSum += objLive.unique_visitors.value;
                }
                liveVisitorCount = config.visitorList ? totalSum : configuration && configuration.panelStyle ? configuration.panelStyle.liveVisitorCount : 1;
                //liveVisitorCount = config.visitorList ? config.visitorList.length : configuration && configuration.panelStyle ? configuration.panelStyle.liveVisitorCount : 1;
            }
        }

        if (config.liveViewer)
            liveVisitorCount = config.liveViewer ? config.liveViewer.viewers : 1;

        if (config.liveFollower)
            liveVisitorCount = config.liveFollower ? config.liveFollower.followers : 1;

        //let userDetails = config.userDetails && config.userDetails.length ? config.userDetails.filter(user => user) : [];
        let userDetails = config.userDetails;
        let numberOfUsers = config.numberOfUsers;
        let userReview = config.userReviews;

        var container = document.createElement('div');
        container.setAttribute("id", "FPqR2DbIqJeA2DbI7MM9_0");
        container.onclick = function (e) {
            if (e.target.id == 'notif_close') {
                notifClosr_c4rF9Effgt985n7v4y5h = true;
                return container.parentNode.removeChild(container);
            }

            if (e.target.id == 'cta' || e.target.id == 'ctatext') {
                window.open(configuration.ctaHyperlinkUrl);
            }

            if (configuration && configuration.poweredByLink && e.target.id == 'poweredBy') {
                window.open(configuration.poweredByLink);
            }
            
            if(userDetails && userDetails.productUrl && configuration && configuration.isEnablePurchaseNotificationUrl!==false)
                window.open(userDetails.productUrl);
            else if (configuration && configuration.notificationUrl)
                window.open(configuration.notificationUrl);
            else
                return;
        };

        container.style = alignment;
        var innerContainer = document.createElement('div');
        innerContainer.setAttribute("id", "FPqR3tRBqJeA3tRB7MM9_0");
        var innerDiv = document.createElement('div');
        var mainContainer = document.createElement('div');



        var recentNotiifcationContainer = document.createElement('div')
        //recentNotiifcationContainer.className = 'notif-card';
        recentNotiifcationContainer.style = type == 'journey' ? "display:block" : "display:none";
        //recentNotiifcationContainer.style = containerStyle;

        var recentNotiifcationMainContainer = document.createElement('div')
        recentNotiifcationMainContainer.className = 'notif-card-recent';
         recentNotiifcationMainContainer.style = containerStyle

        var recentNotiifcationUpperPartContainer = document.createElement('div')
        recentNotiifcationUpperPartContainer.className = 'upper-part-recent'

        var recentNotificationImageContainer = document.createElement('div')
        recentNotificationImageContainer.className = 'image-container-recent'

        var recentNotificationImage = document.createElement('img')
        recentNotificationImage.className = 'image-recent'

        var res_img = 'https://storage.googleapis.com/influence-197607.appspot.com/default_icon.png';

        if (userDetails && userDetails) {
            if (userDetails.productImg) {
                res_img = userDetails.productImg;
            }
            else if (configuration && configuration.toggleMap == 'map') {
                if (userDetails.city && userDetails.country) {
                    res_img = `https://image.maps.cit.api.here.com/mia/1.6/mapview?app_id=r2BEHmdoXBQ0jkkZdcsx&app_code=vz4FkvFNsZaU2o-CCS77sg&ci=${userDetails.city}&co=${userDetails.country}&z=10&h=200&w=200`;
                    // res_img = `https://image.maps.ls.hereapi.com/mia/1.6/mapview?co=${userDetails.country}&z=10&ci=${userDetails.city}&h=200&w=200&apiKey=GnxMRg61uO4_XgMs5cSR8wZej8Bf-fiqtbngQ6pmLtg`;
                }
                else if (userDetails.city) {
                    res_img = `https://image.maps.cit.api.here.com/mia/1.6/mapview?app_id=r2BEHmdoXBQ0jkkZdcsx&app_code=vz4FkvFNsZaU2o-CCS77sg&ci=${userDetails.city}&z=10&h=200&w=200`;
                    // res_img = `https://image.maps.ls.hereapi.com/mia/1.6/mapview?z=10&ci=${userDetails.city}&h=200&w=200&apiKey=GnxMRg61uO4_XgMs5cSR8wZej8Bf-fiqtbngQ6pmLtg`;
                }
                else if (userDetails.country) {
                    res_img = `https://image.maps.cit.api.here.com/mia/1.6/mapview?app_id=r2BEHmdoXBQ0jkkZdcsx&app_code=vz4FkvFNsZaU2o-CCS77sg&co=${userDetails.country}&z=10&h=200&w=200`;
                    // res_img = `https://image.maps.ls.hereapi.com/mia/1.6/mapview?co=${userDetails.country}&z=10&h=200&w=200&apiKey=GnxMRg61uO4_XgMs5cSR8wZej8Bf-fiqtbngQ6pmLtg`;
                }
            }
            else if (configuration && configuration.panelStyle) {
                res_img = configuration.panelStyle.image;
            }
        }

        recentNotificationImage.setAttribute('src', res_img ? res_img : "https://storage.googleapis.com/influence-197607.appspot.com/user_icon.png");
        recentNotificationImage.style = iconStyle;
        //recentNotificationImage.setAttribute('src', 'https://cdn.zeplin.io/5de290feb524497c4a9c9959/assets/5FCE8400-0616-426F-8BEA-F53136305123.png')
        recentNotificationImageContainer.appendChild(recentNotificationImage)


        recentNotiifcationUpperPartContainer.appendChild(recentNotificationImageContainer)

        var recentNotificationCloseContainer = document.createElement('div')
        recentNotificationCloseContainer.className = 'close-btn-container-recent'
        recentNotificationCloseContainer.style = config.rule.closeNotification ? 'display:block' : 'display:none';
        var recentNotificationCloseIcon = document.createElement('button')
        recentNotificationCloseIcon.id = 'notif_close'
        recentNotificationCloseIcon.className = 'close-btn-recent'
        recentNotificationCloseIcon.innerHTML = "+"
        recentNotificationCloseContainer.appendChild(recentNotificationCloseIcon)
        recentNotiifcationUpperPartContainer.appendChild(recentNotificationCloseContainer)

        var recentNotificationTextContainer = document.createElement('div')
        recentNotificationTextContainer.className = 'text-container-recent'

        var recentNotificationNameText = document.createElement('div')
         recentNotificationNameText.className = 'para-recent main-text-recent'

         var res_name = userDetails && userDetails ? userDetails.username ? userDetails.username : userDetails.response.json.value.form.firstname : null;
        if (res_name && res_name.trim().length == 0) res_name = 'Someone';
        res_name = res_name ? res_name.replace(/[0-9]/g, '').toLowerCase().split('.').join(' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : res_name;
        if (res_name && res_name.split(' ').length > 1 && configuration.isHideLastname == true) {
            res_name = res_name.split(' ')[0];
        }
        if (configuration && configuration.toggleHideName) {
            res_name = configuration.usernameText;
        }
        var user_details = userDetails && userDetails ?
            userDetails.city && userDetails.country && res_name && !configuration.isHideFullLocation ?
                `${res_name} ${(!configuration.isHideCityLocation || !configuration.isHideCountryLocation) ? configuration && configuration.recentText1 ? configuration.recentText1 : 'from' : ''} ${!configuration.isHideCityLocation ? userDetails.city : ''}${!configuration.isHideCityLocation && !configuration.isHideCountryLocation ? ', ' : ''} ${!configuration.isHideCountryLocation ? userDetails.country : ''}`
                :
                userDetails.city && res_name && !configuration.isHideFullLocation && !configuration.isHideCityLocation?
                    `${res_name} ${configuration && configuration.recentText1 ? configuration.recentText1 : 'from'} ${userDetails.city}`
                    :
                    userDetails.country && res_name && !configuration.isHideFullLocation && !configuration.isHideCountryLocation?
                        `${res_name} ${configuration && configuration.recentText1 ? configuration.recentText1 : 'from'} ${userDetails.country}`
                        :
                        res_name ?
                            `${res_name}`
                            :
                            "Anonymous"
            : "Anonymous";

         recentNotificationNameText.innerHTML = user_details  //'Samuel from Seattle, Washington'

         recentNotificationTextContainer.appendChild(recentNotificationNameText)

          var recentNotificationUpperSecondaryText = document.createElement('div')
        recentNotificationUpperSecondaryText.className = 'para-recent secondary-text-recent'
        
        if(configuration.panelStyle.secondaryColor){
            recentNotificationUpperSecondaryText.style = `color: rgb(${configuration.panelStyle.secondaryColor.r},${configuration.panelStyle.secondaryColor.g},${configuration.panelStyle.secondaryColor.b});`
           }

        if (userDetails && userDetails && userDetails.productName)
        recentNotificationUpperSecondaryText.innerHTML = configuration.orderText + ' ' + userDetails.productName
        else
        recentNotificationUpperSecondaryText.innerHTML = configuration.otherText + ' ' + configuration.contentText;

        //recentNotificationUpperSecondaryText.innerHTML = "recently bought a Mexican teriyaki pizza!"

        recentNotificationTextContainer.appendChild(recentNotificationUpperSecondaryText)


        recentNotiifcationUpperPartContainer.appendChild(recentNotificationTextContainer)
        recentNotiifcationMainContainer.appendChild(recentNotiifcationUpperPartContainer)

        var recentNotificationBorder = document.createElement('div')
        recentNotificationBorder.className = 'border-recent'
        recentNotiifcationMainContainer.appendChild(recentNotificationBorder)

        var recentNotificationLowerTextContainer = document.createElement('div')
        recentNotificationLowerTextContainer.className = 'lower-part-recent'

        var recentNotificationFooterLeft = document.createElement('div')
        recentNotificationFooterLeft.className = 'footer-left-recent'
        var recentNotificationFooterLeftText = document.createElement('div')
        recentNotificationFooterLeftText.className = 'footer-left-text-recent'
        var timeStamp = userDetails && userDetails ? userDetails.timestamp : new Date();
        recentNotificationFooterLeftText.innerHTML = 'updated ' +timeStamp ? timeSince(new Date(new Date(timeStamp) - aDay).toISOString(),configuration) : "Not available ";
        // recentNotificationFooterLeftText.innerHTML = "updated 9 min ago"
     
         recentNotificationFooterLeft.appendChild(recentNotificationFooterLeftText)
        
        recentNotificationLowerTextContainer.appendChild(recentNotificationFooterLeft)

        var recentNotificationLowerPTag = document.createElement('div')
        // console.log("togglepoweredby", configuration.togglePoweredBy)
        if (!configuration.togglePoweredBy){
            recentNotificationLowerPTag.style = 'display: none'
        }
        recentNotificationLowerPTag.className = 'para-recent footer-text-right-recent'

        var recentNotificationFooterFirstText = document.createElement('em')
        recentNotificationFooterFirstText.className = 'verified-text-recent'
        recentNotificationFooterFirstText.innerHTML = `${configuration && configuration.recentText2 ? configuration.recentText2 : 'verified by'}`;   //"Verified by"

        recentNotificationLowerPTag.appendChild(recentNotificationFooterFirstText)

        var recentNotificationFooterverified = document.createElement('em')
        recentNotificationFooterverified.className = 'verified-icon-recent'

        var recentNotificationTick = document.createElement('span')
        recentNotificationTick.className = "recent-svg"
        recentNotificationTick.innerHTML = `<svg width="9" height="9" viewBox="0 0 524 524" xmlns="http://www.w3.org/2000/svg">
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
        recentNotificationFooterverified.appendChild(recentNotificationTick)

        recentNotificationLowerPTag.appendChild(recentNotificationFooterverified)

        var recentNotificationFooterPoweredBy = document.createElement('em')
        recentNotificationFooterPoweredBy.className = 'influence-text-recent'
        recentNotificationFooterPoweredBy.innerHTML = configuration.poweredBy ? configuration.poweredBy : 'Influence'; //"Influence"

        recentNotificationLowerPTag.appendChild(recentNotificationFooterPoweredBy)

        var recentNotificationFooterDot = document.createElement('em')
        recentNotificationFooterDot.className = 'footer-dot-recent'
        recentNotificationFooterDot.innerHTML = "."

        // removed by raman
        // var recentNotificationFooterCircle = document.createElement('span')
        // recentNotificationFooterCircle.innerHTML = "."

        // recentNotificationFooterDot.appendChild(recentNotificationFooterCircle)
        recentNotificationLowerPTag.appendChild(recentNotificationFooterDot)

        var recentNotificationFooterMobileTimeContainer = document.createElement('em')
        recentNotificationFooterMobileTimeContainer.className = 'time-container-recent'
        var timeStamp = userDetails && userDetails ? userDetails.timestamp : new Date();
        recentNotificationFooterMobileTimeContainer.innerHTML = timeStamp ? timeSince(new Date(new Date(timeStamp) - aDay).toISOString(),configuration) : "Not available ";
       // recentNotificationFooterMobileTimeContainer.innerHTML = '9 mins ago'

        recentNotificationLowerPTag.appendChild(recentNotificationFooterMobileTimeContainer)

        recentNotificationLowerTextContainer.appendChild(recentNotificationLowerPTag)

        recentNotiifcationMainContainer.appendChild(recentNotificationLowerTextContainer)

        recentNotiifcationContainer.appendChild(recentNotiifcationMainContainer)






        var notificationLiveContainer = document.createElement('div')
        //notificationLiveContainer.className = 'oiuytretg';
        notificationLiveContainer.style = type == 'live' ? "display:block" : "display:none";
       //notificationLiveContainer.style= containerStyle
       // notificationLiveContainer.style = containerStyle;
       
       var notificationLiveMainContainer = document.createElement('div');
       notificationLiveMainContainer.className= 'oiuytretg';
       notificationLiveMainContainer.style = containerStyle;

         

        var liveNotiifcationUpperPartContainer = document.createElement('div')
        liveNotiifcationUpperPartContainer.className= 'jihuygtfrdes'
        //liveNotiifcationUpperPartContainer.style = containerStyle;
    
        var liveNotificationImageContainer = document.createElement('div')
        liveNotificationImageContainer.className= 'jhgfdfghb'



        var liveNotificationAnimationContainer= document.createElement('div')
                liveNotificationAnimationContainer.className= 'animation-wrapper'

                var liveNotificationAnimationCircle= document.createElement('div')
                liveNotificationAnimationCircle.className= 'animationClass'

                var liveNotificationAnimationCircle2= document.createElement('div')
                liveNotificationAnimationCircle2.className= 'circle-2'

                liveNotificationAnimationCircle.appendChild(liveNotificationAnimationCircle2)

                liveNotificationAnimationContainer.appendChild(liveNotificationAnimationCircle)

                liveNotificationImageContainer.appendChild(liveNotificationAnimationContainer)





    
    //     var liveNotificationImage = document.createElement('div')
    //     liveNotificationImage.className= 'klhjgyf'


    //     if (configuration.panelStyle && configuration.panelStyle.image) {
    //        // notifLiveImgContainer.className = "FPqRH0WDqJeAH0WD7MM9_1";
    //         //notifLiveImg.classList = "FPqRh0ePqJeAh0eP7MM9_1";
    //        // var notifLiveImgContent = document.createElement('img');
    //         //notifLiveImgContent.className = "FPqRqg5HqJmAqu5I7MM9C";
    //         liveNotificationImage.setAttribute('src', configuration.panelStyle.image);
    //         liveNotificationImage.style = `padding: ${configuration.panelStyle.imagePadding ? configuration.panelStyle.imagePadding + 'px' : '11px'}; border-radius: 0; height: 50px; width: 50px;`;
    //        // notifLiveImg.appendChild(notifLiveImgContent);
    //     } else {
    //         if (config.liveViewer && config.liveViewer.icon) {
                
    //             liveNotificationImage.setAttribute('src', config.liveViewer.icon);
    //             liveNotificationImage.style = 'padding: 2px; border-radius: 0; height: 50px; width: 120px;';
                
    //         }
    //         else if (config.liveFollower && config.liveFollower.icon) {
               
    //             liveNotificationImage.setAttribute('src', config.liveFollower.icon);
    //             liveNotificationImage.style = 'padding: 2px; border-radius: 0; height: 50px; width: 120px;';
                
    //         }
    //         else {
                
    //             liveNotificationImage.style=`background: rgb(${configuration.panelStyle.iconBGColor ? configuration.panelStyle.iconBGColor.r : 0}, ${configuration.panelStyle.iconBGColor ? configuration.panelStyle.iconBGColor.g : 149}, ${configuration.panelStyle.iconBGColor ? configuration.panelStyle.iconBGColor.b : 247}, ${configuration.panelStyle.iconBGColor ? configuration.panelStyle.iconBGColor.a : 1})`
    //         }
    //     }


    //    // liveNotificationImage.setAttribute('src', config.liveViewer.icon)
    
    //     liveNotificationImageContainer.appendChild(liveNotificationImage)
    
        liveNotiifcationUpperPartContainer.appendChild(liveNotificationImageContainer)
    
           var liveNotificationCloseContainer = document.createElement('div')
            liveNotificationCloseContainer.className='khjvgcfdrgtyh'
            liveNotificationCloseContainer.style = config.rule.closeNotification ? 'display:block' : 'display:none';
            var liveNotificationCloseIcon = document.createElement('button')
            liveNotificationCloseIcon.id = 'notif_close';
            liveNotificationCloseIcon.className ='jhfgdxsghj'
            liveNotificationCloseIcon.innerHTML ="+"
            liveNotificationCloseContainer.appendChild(liveNotificationCloseIcon)
         liveNotiifcationUpperPartContainer.appendChild(liveNotificationCloseContainer)
    
         var liveNotificationTextContainer = document.createElement('div')
         liveNotificationTextContainer.className= 'bvxgfxchgcg'
    
        var liveNotificationPTag = document.createElement('div')
        liveNotificationPTag.className ='lkhuf'
    
        var liveNotificationFirstText = document.createElement('em')
        liveNotificationFirstText.className= 'oiuyftgc'
        //liveNotificationFirstText.style.backgroundColor = "black";
        if (configuration && configuration.panelStyle && configuration.panelStyle.color) {
        	liveNotificationFirstText.style = `color: rgb(${configuration.panelStyle.color.r},${configuration.panelStyle.color.g},${configuration.panelStyle.color.b});`
        }
        liveNotificationFirstText.innerHTML = liveVisitorCount == 0 ? 1 : liveVisitorCount + ' ' + ` ${configuration.visitorText}`      //"21 People"
    
        var liveNotificationSecondText = document.createElement('em')
        liveNotificationSecondText.className= 'jhjfdrtfgvgj'

        // if (configuration && configuration.panelStyle && configuration.panelStyle.color) {
        // 	liveNotificationSecondText.style = `color: rgb(${configuration.panelStyle.color.r},${configuration.panelStyle.color.g},${configuration.panelStyle.color.b});`
        // }

        liveNotificationSecondText.innerHTML = ` ${configuration.liveVisitorText}`;
        if(config.liveViewer)
        liveNotificationSecondText.innerHTML =` ${configuration.liveViewerText}`;
        else if(config.liveFollower)
        liveNotificationSecondText.innerHTML =` ${configuration.liveFollowerText}`;


       // liveNotificationSecondText.innerHTML =    //"are viewing this side"
         liveNotificationPTag.appendChild(liveNotificationFirstText)
         liveNotificationPTag.appendChild(liveNotificationSecondText)
        liveNotificationTextContainer.appendChild(liveNotificationPTag)
         liveNotiifcationUpperPartContainer.appendChild(liveNotificationTextContainer)
    
         notificationLiveMainContainer.appendChild(liveNotiifcationUpperPartContainer)
    
        var liveNotificationBorder = document.createElement('div')
        if (!configuration.togglePoweredBy) {
            liveNotificationBorder.style = 'display: none'
        }
        liveNotificationBorder.className='hvhvyhjvg'
        notificationLiveMainContainer.appendChild(liveNotificationBorder)
    
        var liveNotificationLowerTextContainer= document.createElement('div')
        if(!configuration.togglePoweredBy){
            liveNotificationLowerTextContainer.style = 'display: none'
        }
        liveNotificationLowerTextContainer.className ='kbhgcghv'
    
        var liveNotificationLowerPTag = document.createElement('div')
        liveNotificationLowerPTag.className ='lkhuf jvygcghv'
    
        var liveNotificationFooterFirstText = document.createElement('em')
        liveNotificationFooterFirstText.className= 'uytdr'
        liveNotificationFooterFirstText.innerHTML = `${configuration && configuration.liveText ? configuration.liveText : 'verified by '}`  //"Verified by"
    
        liveNotificationLowerPTag.appendChild(liveNotificationFooterFirstText)
    
        var liveNotificationFooterverified = document.createElement('em')
        liveNotificationFooterverified.className= 'lkjhgvftg'
    
        var liveNotificationTick = document.createElement('span')
        liveNotificationTick.innerHTML =`<svg width="9" height="9" viewBox="0 0 524 524" xmlns="http://www.w3.org/2000/svg">
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
        liveNotificationFooterverified.appendChild(liveNotificationTick)
    
        liveNotificationLowerPTag.appendChild(liveNotificationFooterverified)
    
        var liveNotificationFooterPoweredBy = document.createElement('em')
        liveNotificationFooterPoweredBy.className= 'jbhftyftgckjgyh'
        liveNotificationFooterPoweredBy.innerHTML = configuration.poweredBy ? configuration.poweredBy : 'Influence'  //"Influence"
    
        liveNotificationLowerPTag.appendChild(liveNotificationFooterPoweredBy)
    
    
        liveNotificationLowerTextContainer.appendChild(liveNotificationLowerPTag)

        notificationLiveMainContainer.appendChild(liveNotificationLowerTextContainer)

         notificationLiveContainer.appendChild(notificationLiveMainContainer)




        //***************** start for review notification ********************//
        // console.log('====userReview',userReview.fromApp)
        const fromAppType = userReview ? userReview.fromApp :'';


        var reviewNotiifcationContainer = document.createElement('div')
        // reviewNotiifcationContainer.className = 'notif-card-review';
        reviewNotiifcationContainer.style= type == 'review' ? "display:block" : "display:none";

        
        var reviewNotiifcationMainContainer = document.createElement('div')
        reviewNotiifcationMainContainer.className = 'notif-card-review';
        reviewNotiifcationMainContainer.style = containerStyle; 

        var reviewNotiifcationUpperPartContainer = document.createElement('div')
        reviewNotiifcationUpperPartContainer.className = 'upper-part-review'

        var reviewNotificationImageContainer = document.createElement('div')
        reviewNotificationImageContainer.className = 'image-container-review'

        var reviewNotificationImage = document.createElement('img')
        reviewNotificationImage.className = 'image-review'
       // reviewNotificationImage.setAttribute('src', 'https://cdn.zeplin.io/5de290feb524497c4a9c9959/assets/5FCE8400-0616-426F-8BEA-F53136305123.png')

        reviewNotificationImage.setAttribute('src', userReview ? userReview.profileImg :'');
        //reviewNotificationImage.setAttribute('src', 'https://storage.googleapis.com/influence-197607.appspot.com/googlereview.png');
       // notifReviewImgContent.style = `padding: 11px; border-radius: 0; height: 50px; width: 50px;`;

        reviewNotificationImageContainer.appendChild(reviewNotificationImage)


        reviewNotiifcationUpperPartContainer.appendChild(reviewNotificationImageContainer)

        var reviewNotificationCloseContainer = document.createElement('div')
        reviewNotificationCloseContainer.className = 'close-btn-container-review'
        reviewNotificationCloseContainer.style = config.rule.closeNotification ? 'display:block' : 'display:none';
        var reviewNotificationCloseIcon = document.createElement('button')
        reviewNotificationCloseIcon.id = 'notif_close';
        reviewNotificationCloseIcon.className = 'close-btn-review'
        reviewNotificationCloseIcon.innerHTML = "+"
        reviewNotificationCloseContainer.appendChild(reviewNotificationCloseIcon)
        reviewNotiifcationUpperPartContainer.appendChild(reviewNotificationCloseContainer)

        var reviewNotificationTextContainer = document.createElement('div')
        reviewNotificationTextContainer.className = 'text-container-review'

        var reviewNotificationUserNameContainer = document.createElement('div')
        reviewNotificationUserNameContainer.className = 'user-name-container-review'


        var reviewNotificationNameText = document.createElement('div')
        reviewNotificationNameText.className = 'para-review main-text-review'

        if (fromAppType == 'facebook')
        reviewNotificationNameText.innerHTML = userReview.username   //'Recommended us on Facebook';
        else if (fromAppType == 'google') {
        reviewNotificationNameText.innerHTML = userReview && userReview.username ? userReview.username : 'Someone' ;
        }

       // reviewNotificationNameText.innerHTML =    //'Aviel Sela'
        reviewNotificationUserNameContainer.appendChild(reviewNotificationNameText)

        var reviewNotificationUpperLogoContainer = document.createElement('div')
        reviewNotificationUpperLogoContainer.className = 'upper-logo-container-review'

        var reviewNotificationUpperLogo = document.createElement('img')
        reviewNotificationUpperLogo.className = 'footer-logo-review'
        reviewNotificationUpperLogo.setAttribute('src', 'https://cdn.zeplin.io/5de290feb524497c4a9c9959/assets/79341C01-B8BF-4484-AD66-B9314BAE4121.png')


        reviewNotificationUpperLogoContainer.appendChild(reviewNotificationUpperLogo)


        var reviewNotificationUpperStarContainer = document.createElement('div')
        reviewNotificationUpperStarContainer.className = 'footer-star-container-review'


        var reviewNotificationUpperStar = document.createElement('span')
        if(fromAppType == 'google'){
        var star = '';
        if (userReview && userReview.rating) {
            for (let star_i = 0; star_i < userReview.rating; star_i++) {
                star += `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                   viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
                    <polygon style="fill:rgb(255, 215, 0, 1);" points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 
                    10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "/>
                  </svg>`
            }
        }

        reviewNotificationUpperStar.innerHTML= star
    }else {

    }
    reviewNotificationUpperStarContainer.appendChild(reviewNotificationUpperStar)


        // var star = '';
        // if (userReview && userReview.rating) {
        //     for (let star_i = 0; star_i < userReview.rating; star_i++) {
        //         star += `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        //            viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
        //             <polygon style="fill:rgb(255, 215, 0, 1);" points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 
        //             10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "/>
        //           </svg>`
        //     }
        // }

        // console.log(star ,"STAR VALUE in REVIEW NOTIFICATIOn")
        // reviewNotificationUpperStarContainer.innerHTML= star

        //console.log(reviewNotificationUpperStarContainer,"YES")

        var reviewNotificationStar1 = document.createElement('span')


        if(fromAppType == 'google'){
       


        var star = '';
        if (userReview && userReview.rating) {
            for (let star_i = 0; star_i < userReview.rating; star_i++) {
                star += `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                   viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
                    <polygon style="fill:rgb(255, 215, 0, 1);" points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 
                    10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "/>
                  </svg>`
            }
        }

        reviewNotificationStar1.innerHTML= star
    } 
    reviewNotificationUpperStarContainer.appendChild(reviewNotificationStar1)


        reviewNotificationUpperLogoContainer.appendChild(reviewNotificationUpperStarContainer)

        reviewNotificationUserNameContainer.appendChild(reviewNotificationUpperLogoContainer)
        reviewNotificationTextContainer.appendChild(reviewNotificationUserNameContainer)

        var reviewNotificationUpperSecondaryText = document.createElement('div')
        reviewNotificationUpperSecondaryText.className = 'para-review secondary-text-review'

    //     if (fromAppType == 'facebook')
    //     reviewNotificationUpperSecondaryText.innerHTML = 'Recommended us on Facebook';
    // else if (fromAppType == 'google') {
    //     reviewNotificationUpperSecondaryText.innerHTML = userReview && userReview.username ? userReview.username : 'Someone' + ' ' + configuration.gglReviewText ? configuration.gglReviewText : 'Reviewed us on Google';       
    // }

    if(userReview && userReview.review_text) {
        reviewNotificationUpperSecondaryText.innerHTML = userReview.review_text  //configuration.gglReviewText ? configuration.gglReviewText : 'Reviewed us on Google';         //"Awesome must have tool for every marketer or an online business! Easy to use, great uxui, and most importantly - gets more leads than any other platform."
     }else{
         reviewNotificationUpperSecondaryText.innerHTML = 'Reviewed us on Google';    
     }
     
        reviewNotificationTextContainer.appendChild(reviewNotificationUpperSecondaryText)
        reviewNotiifcationUpperPartContainer.appendChild(reviewNotificationTextContainer)
        reviewNotiifcationMainContainer.appendChild(reviewNotiifcationUpperPartContainer)

        var reviewNotificationBorder = document.createElement('div')
        reviewNotificationBorder.className = 'border-review'
        reviewNotiifcationMainContainer.appendChild(reviewNotificationBorder)

        var reviewNotificationLowerTextContainer = document.createElement('div')
        reviewNotificationLowerTextContainer.className = 'lower-part-review'

        var reviewNotificationFooterLeft = document.createElement('div')
        reviewNotificationFooterLeft.className = 'footer-left-review'

        var reviewNotificationFooterLeftText = document.createElement('div')
        reviewNotificationFooterLeftText.className = 'footer-left-text-review'
        reviewNotificationFooterLeftText.innerHTML = "updated 9 min ago"
        reviewNotificationFooterLeftText.style = "display: none"
        reviewNotificationFooterLeft.appendChild(reviewNotificationFooterLeftText)
        var reviewNotificationFooterLogoContainer = document.createElement('div')
        reviewNotificationFooterLogoContainer.className = 'footer-logo-container-review'

        var reviewNotificationFooterLogo = document.createElement('img')

        if(fromAppType == 'google'){
        reviewNotificationFooterLogo.className = 'footer-logo-review'
        reviewNotificationFooterLogo.setAttribute('src', 'https://cdn.zeplin.io/5de290feb524497c4a9c9959/assets/79341C01-B8BF-4484-AD66-B9314BAE4121.png')
       }

        reviewNotificationFooterLogoContainer.appendChild(reviewNotificationFooterLogo)

        var reviewNotificationFooterStarContainer = document.createElement('div')
        reviewNotificationFooterStarContainer.className = 'footer-star-container-review'

        //reviewNotificationFooterStarContainer.innerHTML= star

        var reviwNotificationFooterStar1 = document.createElement('span')
        reviwNotificationFooterStar1.style= "display: flex"

        if(fromAppType == 'google'){
        var star = '';
        if (userReview && userReview.rating) {
            for (let star_i = 0; star_i < userReview.rating; star_i++) {
                star += `<svg version="1.1" style= "height: 10px; width: 10px" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                   viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
                    <polygon style="fill:rgb(255, 215, 0, 1);" points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 
                    10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "/>
                  </svg>`
            }
        }
        reviwNotificationFooterStar1.innerHTML= star
    }
        reviewNotificationFooterStarContainer.appendChild(reviwNotificationFooterStar1)

        reviewNotificationFooterLogoContainer.appendChild(reviewNotificationFooterStarContainer)
        reviewNotificationFooterLeft.appendChild(reviewNotificationFooterLogoContainer)
        reviewNotificationLowerTextContainer.appendChild(reviewNotificationFooterLeft)

        var reviewNotificationLowerPTag = document.createElement('div')
        reviewNotificationLowerPTag.className = 'para-review footer-text-right-review'

        var reviewNotificationFooterFirstText = document.createElement('em')
        reviewNotificationFooterFirstText.className = 'verified-text-review'
        reviewNotificationFooterFirstText.innerHTML = `${configuration && configuration.liveText ? configuration.liveText : 'verified by '}` //"Verified by"

        reviewNotificationLowerPTag.appendChild(reviewNotificationFooterFirstText)

        var reviewNotificationFooterverified = document.createElement('em')
        reviewNotificationFooterverified.className = 'verified-icon-review'

        var reviewNotificationTick = document.createElement('span')
        reviewNotificationTick.innerHTML = `<svg width="9" height="9" viewBox="0 0 524 524" xmlns="http://www.w3.org/2000/svg">
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
        reviewNotificationFooterverified.appendChild(reviewNotificationTick)

        reviewNotificationLowerPTag.appendChild(reviewNotificationFooterverified)

        var reviewNotificationFooterPoweredBy = document.createElement('em')
        reviewNotificationFooterPoweredBy.className = 'influence-text-review'
        reviewNotificationFooterPoweredBy.innerHTML = configuration.poweredBy ? configuration.poweredBy : 'Influence' //"Influence"

        reviewNotificationLowerPTag.appendChild(reviewNotificationFooterPoweredBy)

        var reviewNotificationFooterDot = document.createElement('em')
        reviewNotificationFooterDot.className = 'footer-dot-review'

        // var reviewNotificationFooterCircle = document.createElement('span')
        // reviewNotificationFooterCircle.innerHTML = `<svg width="9" height="9" viewBox="0 0 524 524" xmlns="http://www.w3.org/2000/svg">
        // <defs>
        // <style>.cls-1 {
        //         fill: #5d93fe;
        //     }
        //     .cls-2 {
        //         fill: #5d93fe;
        //         filter: url(#a);
        //     }
        //     .cls-3 {
        //         fill: #fff;
        //         fill-rule: evenodd;
        //     }</style>
        // <filter id="a" x="51" y="51" width="423" height="423" filterUnits="userSpaceOnUse">
        // <feOffset in="SourceAlpha" result="offset"/>
        // <feGaussianBlur result="blur" stdDeviation="2.236"/>
        // <feFlood flood-opacity=".06" result="flood"/>
        // <feComposite in2="blur" operator="in" result="composite"/>
        // <feBlend in="SourceGraphic" result="blend"/>
        // </filter>
        // </defs>
        // <circle class="cls-1" cx="262" cy="262" r="262"/>
        // <circle class="cls-2" cx="262" cy="262" r="207"/>
        // <path class="cls-3" transform="translate(-640 -238)" d="m833.89 478.95 81.132 65.065a9 9 0 0 1 1.391 12.652l-25.651 31.985a9 9 0 0 1-12.652 1.39l-81.132-65.065a9 9 0 0 1-1.391-12.652l25.651-31.985a9 9 0 0 1 12.652-1.39z"/>
        // <path class="cls-3" transform="translate(-640 -238)" d="m846.25 552.7 127.39-144.5a9.721 9.721 0 0 1 13.35-1.047l29.679 24.286a8.9 8.9 0 0 1 1.08 12.862l-127.39 144.5a9.721 9.721 0 0 1-13.35 1.047l-29.675-24.286a8.9 8.9 0 0 1-1.087-12.861z"/>
        // </svg>`

        // reviewNotificationFooterDot.appendChild(reviewNotificationFooterCircle)
        reviewNotificationLowerPTag.appendChild(reviewNotificationFooterDot)

        var reviewNotificationFooterMobileTimeContainer = document.createElement('em')
        reviewNotificationFooterMobileTimeContainer.className = 'time-container-review'
        reviewNotificationFooterMobileTimeContainer.innerHTML ='        ' //'9 mins ago'

        reviewNotificationLowerPTag.appendChild(reviewNotificationFooterMobileTimeContainer)

        reviewNotificationLowerTextContainer.appendChild(reviewNotificationLowerPTag)

        reviewNotiifcationMainContainer.appendChild(reviewNotificationLowerTextContainer)
        reviewNotiifcationContainer.appendChild(reviewNotiifcationMainContainer)




        //***************** end for review notification ********************//



        var bulkNotiifcationContainer = document.createElement('div')
    //     bulkNotiifcationContainer.className = 'notif-card';
        bulkNotiifcationContainer.style = type == 'identification' ? "display:block" : "display:none";
       // bulkNotiifcationContainer.style = containerStyle;

       var bulkNotiifcationMainContainer = document.createElement('div')
       bulkNotiifcationMainContainer.className = 'notif-card-bulk';
       bulkNotiifcationMainContainer.style =containerStyle

        var bulkNotiifcationUpperPartContainer = document.createElement('div')
        bulkNotiifcationUpperPartContainer.className= 'upper-part-bulk'
    
        var bulkNotificationImageContainer = document.createElement('div')
        bulkNotificationImageContainer.className= 'image-container-bulk'
    
        var bulkNotificationImage = document.createElement('img')
        bulkNotificationImage.className= 'image-bulk'

        if (config.icon)
        bulkNotificationImage.setAttribute('src', config.icon);
        else
        bulkNotificationImage.setAttribute('src', configuration.panelStyle.image ? configuration.panelStyle.image : 'https://cdn.zeplin.io/5de290feb524497c4a9c9959/assets/C77C11F2-0E34-49DE-97CC-10DF6C848B69.png')
        if (configuration.panelStyle && configuration.panelStyle.image) {
           // notifBulkImg.style = `padding:${configuration.panelStyle.imagePadding}px; border-radius: 0;`;
           // notifBulkImg.className = 'FPqR37xpqJeA37xp7MM9_IMG FPqRqg5HqJmAqu5I7MM9C';
        }

      //  bulkNotificationImage.setAttribute('src', 'https://cdn.zeplin.io/5de290feb524497c4a9c9959/assets/C77C11F2-0E34-49DE-97CC-10DF6C848B69.png')
    
        bulkNotificationImageContainer.appendChild(bulkNotificationImage)
    
        bulkNotiifcationUpperPartContainer.appendChild(bulkNotificationImageContainer)
    
           var bulkNotificationCloseContainer = document.createElement('div')
            bulkNotificationCloseContainer.className='close-btn-container-bulk'
            bulkNotificationCloseContainer.style = config.rule.closeNotification ? 'display:block' : 'display:none';
            var bulkNotificationCloseIcon = document.createElement('button')
            bulkNotificationCloseIcon.id = 'notif_close';
            bulkNotificationCloseIcon.className ='close-btn-bulk'
            bulkNotificationCloseIcon.innerHTML ="+"
            bulkNotificationCloseContainer.appendChild(bulkNotificationCloseIcon)
         bulkNotiifcationUpperPartContainer.appendChild(bulkNotificationCloseContainer)
    
         var bulkNotificationTextContainer = document.createElement('div')
         bulkNotificationTextContainer.className= 'text-container-bulk'
    
        var bulkNotificationPTag = document.createElement('div')
        bulkNotificationPTag.className ='para-bulk'
    
        var bulkNotificationFirstText = document.createElement('em')
        bulkNotificationFirstText.className= 'main-text-bulk main-text-bulk-digit'
        bulkNotificationFirstText.style.backgroundColor = "#f3f7ff";
    //     bulkNotificationFirstText.style.color= background-color: #f3f7ff
        numAnim = new CountUp(bulkNotificationFirstText, 0, numberOfUsers, 0, 3);
       //  bulkNotificationFirstText.innerHTML = '11111  ' //numberOfUsers + "123 " // + configuration.visitorText
    

        var bulkNotificationSecondText = document.createElement('em')
        bulkNotificationSecondText.className= 'secondary-text-bulk'

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();     
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }
        today = yyyy + '/' + mm + '/' + dd;
        var date2 = new Date(today);
        var date1 = new Date(config.rule.createdAt);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));

        bulkNotificationSecondText.innerHTML = ` ${configuration ? configuration.otherText : ''} ${configuration ? configuration.contentText : ''} ${configuration && configuration.bulkText ? configuration.bulkText : 'in the last'} ${configuration.panelStyle.bulkData} ${configuration && configuration.bulkDaysLable ? configuration.bulkDaysLable : 'days'}`  //"signed up for influence in the last 7 days"
         bulkNotificationPTag.appendChild(bulkNotificationFirstText)

         var bulkNotificationFirstText2= document.createElement('em')
            bulkNotificationFirstText2.className = 'main-text-bulk notif-space-bulk'
            bulkNotificationFirstText2.style.backgroundColor = "#f3f7ff";
            bulkNotificationFirstText2.style.paddingLeft = "0px";
            bulkNotificationFirstText2.innerHTML= configuration.visitorText  //people
            bulkNotificationPTag.appendChild(bulkNotificationFirstText2)
     
         bulkNotificationPTag.appendChild(bulkNotificationSecondText)
        bulkNotificationTextContainer.appendChild(bulkNotificationPTag)
         bulkNotiifcationUpperPartContainer.appendChild(bulkNotificationTextContainer)
    
         bulkNotiifcationMainContainer.appendChild(bulkNotiifcationUpperPartContainer)
    
        var bulkNotificationBorder = document.createElement('div')
        if (!configuration.togglePoweredBy) {
            bulkNotificationBorder.style = 'display: none'
        }
        bulkNotificationBorder.className='border-bulk'
        bulkNotiifcationMainContainer.appendChild(bulkNotificationBorder)
    
        var bulkNotificationLowerTextContainer= document.createElement('div')
        if(!configuration.togglePoweredBy){
            bulkNotificationLowerTextContainer.style = 'display: none'
        }
        bulkNotificationLowerTextContainer.className ='lower-part-bulk'
    
        var bulkNotificationLowerPTag = document.createElement('div')
        bulkNotificationLowerPTag.className ='para-bulk footer-text-bulk'
    
        var bulkNotificationFooterFirstText = document.createElement('em')
        bulkNotificationFooterFirstText.className= 'verified-text-bulk'
        bulkNotificationFooterFirstText.innerHTML = configuration.recentText2 ? configuration.recentText2 : 'Verified by '  //"Verified by"
    
        bulkNotificationLowerPTag.appendChild(bulkNotificationFooterFirstText)
    
        var bulkNotificationFooterverified = document.createElement('em')
        bulkNotificationFooterverified.className= 'verified-icon-bulk'
    
        var bulkNotificationTick = document.createElement('span')
        bulkNotificationTick.innerHTML = `<svg width="9" height="9" viewBox="0 0 524 524" xmlns="http://www.w3.org/2000/svg">
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
        bulkNotificationFooterverified.appendChild(bulkNotificationTick)
    
        bulkNotificationLowerPTag.appendChild(bulkNotificationFooterverified)
    
        var bulkNotificationFooterPoweredBy = document.createElement('em')
        bulkNotificationFooterPoweredBy.className= 'influence-text-bulk'
        bulkNotificationFooterPoweredBy.innerHTML = configuration.poweredBy ? configuration.poweredBy : 'Influence'   //"Influence"
    
        bulkNotificationLowerPTag.appendChild(bulkNotificationFooterPoweredBy)
    
    
        bulkNotificationLowerTextContainer.appendChild(bulkNotificationLowerPTag)
        bulkNotiifcationMainContainer.appendChild(bulkNotificationLowerTextContainer)
        bulkNotiifcationContainer.appendChild(bulkNotiifcationMainContainer)



        var innerNotifCTAContainer = document.createElement('div');
        innerNotifCTAContainer.style = configuration.toggleCTA ? 'display:flex;justify-content:flex-end;' : 'display:none';
        innerNotifCTAContainer.setAttribute("id", "cta");
        var innerInnerNotifCTAContainer = document.createElement('div');
        innerInnerNotifCTAContainer.setAttribute("id", "ctatext");
        if (configuration && configuration.panelStyle)
            innerInnerNotifCTAContainer.style = `
                background-color: rgb(${configuration.panelStyle.ctaBackgroundColor ? configuration.panelStyle.ctaBackgroundColor.r : 0}, ${configuration.panelStyle.ctaBackgroundColor ? configuration.panelStyle.ctaBackgroundColor.g : 0}, ${configuration.panelStyle.ctaBackgroundColor ? configuration.panelStyle.ctaBackgroundColor.b : 0}, ${configuration.panelStyle.ctaBackgroundColor ? configuration.panelStyle.ctaBackgroundColor.a : 0});
                width: auto;
                border: ${configuration.panelStyle.ctaBorderWidth}px solid rgb(${configuration.panelStyle.ctaBorderColor ? configuration.panelStyle.ctaBorderColor.r : 0}, ${configuration.panelStyle.ctaBorderColor ? configuration.panelStyle.ctaBorderColor.g : 0}, ${configuration.panelStyle.ctaBorderColor ? configuration.panelStyle.ctaBorderColor.b : 0}, ${configuration.panelStyle.ctaBorderColor ? configuration.panelStyle.ctaBorderColor.a : 0});
                border-radius: ${configuration.panelStyle.ctaRadius}px;
                color: rgb(${configuration.panelStyle.ctaTextColor ? configuration.panelStyle.ctaTextColor.r : 0}, ${configuration.panelStyle.ctaTextColor ? configuration.panelStyle.ctaTextColor.g : 0}, ${configuration.panelStyle.ctaTextColor ? configuration.panelStyle.ctaTextColor.b : 0}, ${configuration.panelStyle.ctaTextColor ? configuration.panelStyle.ctaTextColor.a : 0});
                height: 20.5px;
                font-size: 10px;
                font-family: inherit;
                font-weight: normal;
                pointer-events: auto;
                overflow: hidden;
                position: relative;
                float: right;
                font-weight: 400;
                margin-bottom: ${configuration.isCTATop ? '4px' : '0px'};
                margin-top: ${!configuration.isCTATop ? '3px' : '0px'};
                margin-right: 25px;
                padding: 6px 14px;
                box-sizing: border-box;
                line-height: 1em;
                box-shadow: 0 0 1px rgba(0,0,0,.2), 0 1px 2px rgba(0,0,0,.15), 0 5px 50px rgba(0,0,0,.15);
                cursor: pointer;
                opacity: 0.95;
            `;
        var createCTAText = document.createTextNode(configuration.ctaButtonText);
        innerInnerNotifCTAContainer.appendChild(createCTAText);
        innerNotifCTAContainer.appendChild(innerInnerNotifCTAContainer);


    if (configuration.isCTATop)
    mainContainer.appendChild(innerNotifCTAContainer);

    mainContainer.appendChild(bulkNotiifcationContainer);
    mainContainer.appendChild(notificationLiveContainer);
    mainContainer.appendChild(recentNotiifcationContainer);
    mainContainer.appendChild(reviewNotiifcationContainer);

    //console.log(mainContainer,"Main Container Data")

        if (!configuration.isCTATop)
        mainContainer.appendChild(innerNotifCTAContainer);

        innerDiv.appendChild(mainContainer);
        innerContainer.appendChild(innerDiv);
        container.appendChild(innerContainer);
       

        if (type == 'journey' && userDetails && userDetails.length > k_c6ba2870) {
            k_c6ba2870++;
            k_c6ba2870 = k_c6ba2870 == userDetails.length ? 0 : k_c6ba2870;
        } else if (type == 'journey' && userDetails && userDetails.length <= k_c6ba2870) {
            k_c6ba2870 = 0;
        }

        if (k_c6ba2870 == 0) {
            if (type == 'journey' && configurations.length - 1 > pathIndex) {
                pathIndex = pathIndex + 1;
            } else if (type == 'journey' && configurations.length - 1 <= pathIndex) {
                pathIndex = 0;
            }
        }

        displayNotification(container, config);
    }

    return {
        notificationdisplay: function notificationdisplay(type, config, containerStyle, iconStyle, alignment) {
            notificationDisplay(type, config, containerStyle, iconStyle, alignment);
        }
    };
};




if (typeof module !== "undefined" && module.exports) module.exports = Note;
Influence = typeof Influence === 'undefined' ? require('../server') : Influence;


(async function () {
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