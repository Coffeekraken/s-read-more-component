/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	var _index = __webpack_require__(2);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	// @version 0.7.23
	(function() {
	  window.WebComponents = window.WebComponents || {
	    flags: {}
	  };
	  var file = "webcomponents-lite.js";
	  var script = document.querySelector('script[src*="' + file + '"]');
	  var flags = {};
	  if (!flags.noOpts) {
	    location.search.slice(1).split("&").forEach(function(option) {
	      var parts = option.split("=");
	      var match;
	      if (parts[0] && (match = parts[0].match(/wc-(.+)/))) {
	        flags[match[1]] = parts[1] || true;
	      }
	    });
	    if (script) {
	      for (var i = 0, a; a = script.attributes[i]; i++) {
	        if (a.name !== "src") {
	          flags[a.name] = a.value || true;
	        }
	      }
	    }
	    if (flags.log && flags.log.split) {
	      var parts = flags.log.split(",");
	      flags.log = {};
	      parts.forEach(function(f) {
	        flags.log[f] = true;
	      });
	    } else {
	      flags.log = {};
	    }
	  }
	  if (flags.register) {
	    window.CustomElements = window.CustomElements || {
	      flags: {}
	    };
	    window.CustomElements.flags.register = flags.register;
	  }
	  WebComponents.flags = flags;
	})();

	(function(scope) {
	  "use strict";
	  var hasWorkingUrl = false;
	  if (!scope.forceJURL) {
	    try {
	      var u = new URL("b", "http://a");
	      u.pathname = "c%20d";
	      hasWorkingUrl = u.href === "http://a/c%20d";
	    } catch (e) {}
	  }
	  if (hasWorkingUrl) return;
	  var relative = Object.create(null);
	  relative["ftp"] = 21;
	  relative["file"] = 0;
	  relative["gopher"] = 70;
	  relative["http"] = 80;
	  relative["https"] = 443;
	  relative["ws"] = 80;
	  relative["wss"] = 443;
	  var relativePathDotMapping = Object.create(null);
	  relativePathDotMapping["%2e"] = ".";
	  relativePathDotMapping[".%2e"] = "..";
	  relativePathDotMapping["%2e."] = "..";
	  relativePathDotMapping["%2e%2e"] = "..";
	  function isRelativeScheme(scheme) {
	    return relative[scheme] !== undefined;
	  }
	  function invalid() {
	    clear.call(this);
	    this._isInvalid = true;
	  }
	  function IDNAToASCII(h) {
	    if ("" == h) {
	      invalid.call(this);
	    }
	    return h.toLowerCase();
	  }
	  function percentEscape(c) {
	    var unicode = c.charCodeAt(0);
	    if (unicode > 32 && unicode < 127 && [ 34, 35, 60, 62, 63, 96 ].indexOf(unicode) == -1) {
	      return c;
	    }
	    return encodeURIComponent(c);
	  }
	  function percentEscapeQuery(c) {
	    var unicode = c.charCodeAt(0);
	    if (unicode > 32 && unicode < 127 && [ 34, 35, 60, 62, 96 ].indexOf(unicode) == -1) {
	      return c;
	    }
	    return encodeURIComponent(c);
	  }
	  var EOF = undefined, ALPHA = /[a-zA-Z]/, ALPHANUMERIC = /[a-zA-Z0-9\+\-\.]/;
	  function parse(input, stateOverride, base) {
	    function err(message) {
	      errors.push(message);
	    }
	    var state = stateOverride || "scheme start", cursor = 0, buffer = "", seenAt = false, seenBracket = false, errors = [];
	    loop: while ((input[cursor - 1] != EOF || cursor == 0) && !this._isInvalid) {
	      var c = input[cursor];
	      switch (state) {
	       case "scheme start":
	        if (c && ALPHA.test(c)) {
	          buffer += c.toLowerCase();
	          state = "scheme";
	        } else if (!stateOverride) {
	          buffer = "";
	          state = "no scheme";
	          continue;
	        } else {
	          err("Invalid scheme.");
	          break loop;
	        }
	        break;

	       case "scheme":
	        if (c && ALPHANUMERIC.test(c)) {
	          buffer += c.toLowerCase();
	        } else if (":" == c) {
	          this._scheme = buffer;
	          buffer = "";
	          if (stateOverride) {
	            break loop;
	          }
	          if (isRelativeScheme(this._scheme)) {
	            this._isRelative = true;
	          }
	          if ("file" == this._scheme) {
	            state = "relative";
	          } else if (this._isRelative && base && base._scheme == this._scheme) {
	            state = "relative or authority";
	          } else if (this._isRelative) {
	            state = "authority first slash";
	          } else {
	            state = "scheme data";
	          }
	        } else if (!stateOverride) {
	          buffer = "";
	          cursor = 0;
	          state = "no scheme";
	          continue;
	        } else if (EOF == c) {
	          break loop;
	        } else {
	          err("Code point not allowed in scheme: " + c);
	          break loop;
	        }
	        break;

	       case "scheme data":
	        if ("?" == c) {
	          this._query = "?";
	          state = "query";
	        } else if ("#" == c) {
	          this._fragment = "#";
	          state = "fragment";
	        } else {
	          if (EOF != c && "\t" != c && "\n" != c && "\r" != c) {
	            this._schemeData += percentEscape(c);
	          }
	        }
	        break;

	       case "no scheme":
	        if (!base || !isRelativeScheme(base._scheme)) {
	          err("Missing scheme.");
	          invalid.call(this);
	        } else {
	          state = "relative";
	          continue;
	        }
	        break;

	       case "relative or authority":
	        if ("/" == c && "/" == input[cursor + 1]) {
	          state = "authority ignore slashes";
	        } else {
	          err("Expected /, got: " + c);
	          state = "relative";
	          continue;
	        }
	        break;

	       case "relative":
	        this._isRelative = true;
	        if ("file" != this._scheme) this._scheme = base._scheme;
	        if (EOF == c) {
	          this._host = base._host;
	          this._port = base._port;
	          this._path = base._path.slice();
	          this._query = base._query;
	          this._username = base._username;
	          this._password = base._password;
	          break loop;
	        } else if ("/" == c || "\\" == c) {
	          if ("\\" == c) err("\\ is an invalid code point.");
	          state = "relative slash";
	        } else if ("?" == c) {
	          this._host = base._host;
	          this._port = base._port;
	          this._path = base._path.slice();
	          this._query = "?";
	          this._username = base._username;
	          this._password = base._password;
	          state = "query";
	        } else if ("#" == c) {
	          this._host = base._host;
	          this._port = base._port;
	          this._path = base._path.slice();
	          this._query = base._query;
	          this._fragment = "#";
	          this._username = base._username;
	          this._password = base._password;
	          state = "fragment";
	        } else {
	          var nextC = input[cursor + 1];
	          var nextNextC = input[cursor + 2];
	          if ("file" != this._scheme || !ALPHA.test(c) || nextC != ":" && nextC != "|" || EOF != nextNextC && "/" != nextNextC && "\\" != nextNextC && "?" != nextNextC && "#" != nextNextC) {
	            this._host = base._host;
	            this._port = base._port;
	            this._username = base._username;
	            this._password = base._password;
	            this._path = base._path.slice();
	            this._path.pop();
	          }
	          state = "relative path";
	          continue;
	        }
	        break;

	       case "relative slash":
	        if ("/" == c || "\\" == c) {
	          if ("\\" == c) {
	            err("\\ is an invalid code point.");
	          }
	          if ("file" == this._scheme) {
	            state = "file host";
	          } else {
	            state = "authority ignore slashes";
	          }
	        } else {
	          if ("file" != this._scheme) {
	            this._host = base._host;
	            this._port = base._port;
	            this._username = base._username;
	            this._password = base._password;
	          }
	          state = "relative path";
	          continue;
	        }
	        break;

	       case "authority first slash":
	        if ("/" == c) {
	          state = "authority second slash";
	        } else {
	          err("Expected '/', got: " + c);
	          state = "authority ignore slashes";
	          continue;
	        }
	        break;

	       case "authority second slash":
	        state = "authority ignore slashes";
	        if ("/" != c) {
	          err("Expected '/', got: " + c);
	          continue;
	        }
	        break;

	       case "authority ignore slashes":
	        if ("/" != c && "\\" != c) {
	          state = "authority";
	          continue;
	        } else {
	          err("Expected authority, got: " + c);
	        }
	        break;

	       case "authority":
	        if ("@" == c) {
	          if (seenAt) {
	            err("@ already seen.");
	            buffer += "%40";
	          }
	          seenAt = true;
	          for (var i = 0; i < buffer.length; i++) {
	            var cp = buffer[i];
	            if ("\t" == cp || "\n" == cp || "\r" == cp) {
	              err("Invalid whitespace in authority.");
	              continue;
	            }
	            if (":" == cp && null === this._password) {
	              this._password = "";
	              continue;
	            }
	            var tempC = percentEscape(cp);
	            null !== this._password ? this._password += tempC : this._username += tempC;
	          }
	          buffer = "";
	        } else if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c) {
	          cursor -= buffer.length;
	          buffer = "";
	          state = "host";
	          continue;
	        } else {
	          buffer += c;
	        }
	        break;

	       case "file host":
	        if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c) {
	          if (buffer.length == 2 && ALPHA.test(buffer[0]) && (buffer[1] == ":" || buffer[1] == "|")) {
	            state = "relative path";
	          } else if (buffer.length == 0) {
	            state = "relative path start";
	          } else {
	            this._host = IDNAToASCII.call(this, buffer);
	            buffer = "";
	            state = "relative path start";
	          }
	          continue;
	        } else if ("\t" == c || "\n" == c || "\r" == c) {
	          err("Invalid whitespace in file host.");
	        } else {
	          buffer += c;
	        }
	        break;

	       case "host":
	       case "hostname":
	        if (":" == c && !seenBracket) {
	          this._host = IDNAToASCII.call(this, buffer);
	          buffer = "";
	          state = "port";
	          if ("hostname" == stateOverride) {
	            break loop;
	          }
	        } else if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c) {
	          this._host = IDNAToASCII.call(this, buffer);
	          buffer = "";
	          state = "relative path start";
	          if (stateOverride) {
	            break loop;
	          }
	          continue;
	        } else if ("\t" != c && "\n" != c && "\r" != c) {
	          if ("[" == c) {
	            seenBracket = true;
	          } else if ("]" == c) {
	            seenBracket = false;
	          }
	          buffer += c;
	        } else {
	          err("Invalid code point in host/hostname: " + c);
	        }
	        break;

	       case "port":
	        if (/[0-9]/.test(c)) {
	          buffer += c;
	        } else if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c || stateOverride) {
	          if ("" != buffer) {
	            var temp = parseInt(buffer, 10);
	            if (temp != relative[this._scheme]) {
	              this._port = temp + "";
	            }
	            buffer = "";
	          }
	          if (stateOverride) {
	            break loop;
	          }
	          state = "relative path start";
	          continue;
	        } else if ("\t" == c || "\n" == c || "\r" == c) {
	          err("Invalid code point in port: " + c);
	        } else {
	          invalid.call(this);
	        }
	        break;

	       case "relative path start":
	        if ("\\" == c) err("'\\' not allowed in path.");
	        state = "relative path";
	        if ("/" != c && "\\" != c) {
	          continue;
	        }
	        break;

	       case "relative path":
	        if (EOF == c || "/" == c || "\\" == c || !stateOverride && ("?" == c || "#" == c)) {
	          if ("\\" == c) {
	            err("\\ not allowed in relative path.");
	          }
	          var tmp;
	          if (tmp = relativePathDotMapping[buffer.toLowerCase()]) {
	            buffer = tmp;
	          }
	          if (".." == buffer) {
	            this._path.pop();
	            if ("/" != c && "\\" != c) {
	              this._path.push("");
	            }
	          } else if ("." == buffer && "/" != c && "\\" != c) {
	            this._path.push("");
	          } else if ("." != buffer) {
	            if ("file" == this._scheme && this._path.length == 0 && buffer.length == 2 && ALPHA.test(buffer[0]) && buffer[1] == "|") {
	              buffer = buffer[0] + ":";
	            }
	            this._path.push(buffer);
	          }
	          buffer = "";
	          if ("?" == c) {
	            this._query = "?";
	            state = "query";
	          } else if ("#" == c) {
	            this._fragment = "#";
	            state = "fragment";
	          }
	        } else if ("\t" != c && "\n" != c && "\r" != c) {
	          buffer += percentEscape(c);
	        }
	        break;

	       case "query":
	        if (!stateOverride && "#" == c) {
	          this._fragment = "#";
	          state = "fragment";
	        } else if (EOF != c && "\t" != c && "\n" != c && "\r" != c) {
	          this._query += percentEscapeQuery(c);
	        }
	        break;

	       case "fragment":
	        if (EOF != c && "\t" != c && "\n" != c && "\r" != c) {
	          this._fragment += c;
	        }
	        break;
	      }
	      cursor++;
	    }
	  }
	  function clear() {
	    this._scheme = "";
	    this._schemeData = "";
	    this._username = "";
	    this._password = null;
	    this._host = "";
	    this._port = "";
	    this._path = [];
	    this._query = "";
	    this._fragment = "";
	    this._isInvalid = false;
	    this._isRelative = false;
	  }
	  function jURL(url, base) {
	    if (base !== undefined && !(base instanceof jURL)) base = new jURL(String(base));
	    this._url = url;
	    clear.call(this);
	    var input = url.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "");
	    parse.call(this, input, null, base);
	  }
	  jURL.prototype = {
	    toString: function() {
	      return this.href;
	    },
	    get href() {
	      if (this._isInvalid) return this._url;
	      var authority = "";
	      if ("" != this._username || null != this._password) {
	        authority = this._username + (null != this._password ? ":" + this._password : "") + "@";
	      }
	      return this.protocol + (this._isRelative ? "//" + authority + this.host : "") + this.pathname + this._query + this._fragment;
	    },
	    set href(href) {
	      clear.call(this);
	      parse.call(this, href);
	    },
	    get protocol() {
	      return this._scheme + ":";
	    },
	    set protocol(protocol) {
	      if (this._isInvalid) return;
	      parse.call(this, protocol + ":", "scheme start");
	    },
	    get host() {
	      return this._isInvalid ? "" : this._port ? this._host + ":" + this._port : this._host;
	    },
	    set host(host) {
	      if (this._isInvalid || !this._isRelative) return;
	      parse.call(this, host, "host");
	    },
	    get hostname() {
	      return this._host;
	    },
	    set hostname(hostname) {
	      if (this._isInvalid || !this._isRelative) return;
	      parse.call(this, hostname, "hostname");
	    },
	    get port() {
	      return this._port;
	    },
	    set port(port) {
	      if (this._isInvalid || !this._isRelative) return;
	      parse.call(this, port, "port");
	    },
	    get pathname() {
	      return this._isInvalid ? "" : this._isRelative ? "/" + this._path.join("/") : this._schemeData;
	    },
	    set pathname(pathname) {
	      if (this._isInvalid || !this._isRelative) return;
	      this._path = [];
	      parse.call(this, pathname, "relative path start");
	    },
	    get search() {
	      return this._isInvalid || !this._query || "?" == this._query ? "" : this._query;
	    },
	    set search(search) {
	      if (this._isInvalid || !this._isRelative) return;
	      this._query = "?";
	      if ("?" == search[0]) search = search.slice(1);
	      parse.call(this, search, "query");
	    },
	    get hash() {
	      return this._isInvalid || !this._fragment || "#" == this._fragment ? "" : this._fragment;
	    },
	    set hash(hash) {
	      if (this._isInvalid) return;
	      this._fragment = "#";
	      if ("#" == hash[0]) hash = hash.slice(1);
	      parse.call(this, hash, "fragment");
	    },
	    get origin() {
	      var host;
	      if (this._isInvalid || !this._scheme) {
	        return "";
	      }
	      switch (this._scheme) {
	       case "data":
	       case "file":
	       case "javascript":
	       case "mailto":
	        return "null";
	      }
	      host = this.host;
	      if (!host) {
	        return "";
	      }
	      return this._scheme + "://" + host;
	    }
	  };
	  var OriginalURL = scope.URL;
	  if (OriginalURL) {
	    jURL.createObjectURL = function(blob) {
	      return OriginalURL.createObjectURL.apply(OriginalURL, arguments);
	    };
	    jURL.revokeObjectURL = function(url) {
	      OriginalURL.revokeObjectURL(url);
	    };
	  }
	  scope.URL = jURL;
	})(self);

	if (typeof WeakMap === "undefined") {
	  (function() {
	    var defineProperty = Object.defineProperty;
	    var counter = Date.now() % 1e9;
	    var WeakMap = function() {
	      this.name = "__st" + (Math.random() * 1e9 >>> 0) + (counter++ + "__");
	    };
	    WeakMap.prototype = {
	      set: function(key, value) {
	        var entry = key[this.name];
	        if (entry && entry[0] === key) entry[1] = value; else defineProperty(key, this.name, {
	          value: [ key, value ],
	          writable: true
	        });
	        return this;
	      },
	      get: function(key) {
	        var entry;
	        return (entry = key[this.name]) && entry[0] === key ? entry[1] : undefined;
	      },
	      "delete": function(key) {
	        var entry = key[this.name];
	        if (!entry || entry[0] !== key) return false;
	        entry[0] = entry[1] = undefined;
	        return true;
	      },
	      has: function(key) {
	        var entry = key[this.name];
	        if (!entry) return false;
	        return entry[0] === key;
	      }
	    };
	    window.WeakMap = WeakMap;
	  })();
	}

	(function(global) {
	  if (global.JsMutationObserver) {
	    return;
	  }
	  var registrationsTable = new WeakMap();
	  var setImmediate;
	  if (/Trident|Edge/.test(navigator.userAgent)) {
	    setImmediate = setTimeout;
	  } else if (window.setImmediate) {
	    setImmediate = window.setImmediate;
	  } else {
	    var setImmediateQueue = [];
	    var sentinel = String(Math.random());
	    window.addEventListener("message", function(e) {
	      if (e.data === sentinel) {
	        var queue = setImmediateQueue;
	        setImmediateQueue = [];
	        queue.forEach(function(func) {
	          func();
	        });
	      }
	    });
	    setImmediate = function(func) {
	      setImmediateQueue.push(func);
	      window.postMessage(sentinel, "*");
	    };
	  }
	  var isScheduled = false;
	  var scheduledObservers = [];
	  function scheduleCallback(observer) {
	    scheduledObservers.push(observer);
	    if (!isScheduled) {
	      isScheduled = true;
	      setImmediate(dispatchCallbacks);
	    }
	  }
	  function wrapIfNeeded(node) {
	    return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(node) || node;
	  }
	  function dispatchCallbacks() {
	    isScheduled = false;
	    var observers = scheduledObservers;
	    scheduledObservers = [];
	    observers.sort(function(o1, o2) {
	      return o1.uid_ - o2.uid_;
	    });
	    var anyNonEmpty = false;
	    observers.forEach(function(observer) {
	      var queue = observer.takeRecords();
	      removeTransientObserversFor(observer);
	      if (queue.length) {
	        observer.callback_(queue, observer);
	        anyNonEmpty = true;
	      }
	    });
	    if (anyNonEmpty) dispatchCallbacks();
	  }
	  function removeTransientObserversFor(observer) {
	    observer.nodes_.forEach(function(node) {
	      var registrations = registrationsTable.get(node);
	      if (!registrations) return;
	      registrations.forEach(function(registration) {
	        if (registration.observer === observer) registration.removeTransientObservers();
	      });
	    });
	  }
	  function forEachAncestorAndObserverEnqueueRecord(target, callback) {
	    for (var node = target; node; node = node.parentNode) {
	      var registrations = registrationsTable.get(node);
	      if (registrations) {
	        for (var j = 0; j < registrations.length; j++) {
	          var registration = registrations[j];
	          var options = registration.options;
	          if (node !== target && !options.subtree) continue;
	          var record = callback(options);
	          if (record) registration.enqueue(record);
	        }
	      }
	    }
	  }
	  var uidCounter = 0;
	  function JsMutationObserver(callback) {
	    this.callback_ = callback;
	    this.nodes_ = [];
	    this.records_ = [];
	    this.uid_ = ++uidCounter;
	  }
	  JsMutationObserver.prototype = {
	    observe: function(target, options) {
	      target = wrapIfNeeded(target);
	      if (!options.childList && !options.attributes && !options.characterData || options.attributeOldValue && !options.attributes || options.attributeFilter && options.attributeFilter.length && !options.attributes || options.characterDataOldValue && !options.characterData) {
	        throw new SyntaxError();
	      }
	      var registrations = registrationsTable.get(target);
	      if (!registrations) registrationsTable.set(target, registrations = []);
	      var registration;
	      for (var i = 0; i < registrations.length; i++) {
	        if (registrations[i].observer === this) {
	          registration = registrations[i];
	          registration.removeListeners();
	          registration.options = options;
	          break;
	        }
	      }
	      if (!registration) {
	        registration = new Registration(this, target, options);
	        registrations.push(registration);
	        this.nodes_.push(target);
	      }
	      registration.addListeners();
	    },
	    disconnect: function() {
	      this.nodes_.forEach(function(node) {
	        var registrations = registrationsTable.get(node);
	        for (var i = 0; i < registrations.length; i++) {
	          var registration = registrations[i];
	          if (registration.observer === this) {
	            registration.removeListeners();
	            registrations.splice(i, 1);
	            break;
	          }
	        }
	      }, this);
	      this.records_ = [];
	    },
	    takeRecords: function() {
	      var copyOfRecords = this.records_;
	      this.records_ = [];
	      return copyOfRecords;
	    }
	  };
	  function MutationRecord(type, target) {
	    this.type = type;
	    this.target = target;
	    this.addedNodes = [];
	    this.removedNodes = [];
	    this.previousSibling = null;
	    this.nextSibling = null;
	    this.attributeName = null;
	    this.attributeNamespace = null;
	    this.oldValue = null;
	  }
	  function copyMutationRecord(original) {
	    var record = new MutationRecord(original.type, original.target);
	    record.addedNodes = original.addedNodes.slice();
	    record.removedNodes = original.removedNodes.slice();
	    record.previousSibling = original.previousSibling;
	    record.nextSibling = original.nextSibling;
	    record.attributeName = original.attributeName;
	    record.attributeNamespace = original.attributeNamespace;
	    record.oldValue = original.oldValue;
	    return record;
	  }
	  var currentRecord, recordWithOldValue;
	  function getRecord(type, target) {
	    return currentRecord = new MutationRecord(type, target);
	  }
	  function getRecordWithOldValue(oldValue) {
	    if (recordWithOldValue) return recordWithOldValue;
	    recordWithOldValue = copyMutationRecord(currentRecord);
	    recordWithOldValue.oldValue = oldValue;
	    return recordWithOldValue;
	  }
	  function clearRecords() {
	    currentRecord = recordWithOldValue = undefined;
	  }
	  function recordRepresentsCurrentMutation(record) {
	    return record === recordWithOldValue || record === currentRecord;
	  }
	  function selectRecord(lastRecord, newRecord) {
	    if (lastRecord === newRecord) return lastRecord;
	    if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord)) return recordWithOldValue;
	    return null;
	  }
	  function Registration(observer, target, options) {
	    this.observer = observer;
	    this.target = target;
	    this.options = options;
	    this.transientObservedNodes = [];
	  }
	  Registration.prototype = {
	    enqueue: function(record) {
	      var records = this.observer.records_;
	      var length = records.length;
	      if (records.length > 0) {
	        var lastRecord = records[length - 1];
	        var recordToReplaceLast = selectRecord(lastRecord, record);
	        if (recordToReplaceLast) {
	          records[length - 1] = recordToReplaceLast;
	          return;
	        }
	      } else {
	        scheduleCallback(this.observer);
	      }
	      records[length] = record;
	    },
	    addListeners: function() {
	      this.addListeners_(this.target);
	    },
	    addListeners_: function(node) {
	      var options = this.options;
	      if (options.attributes) node.addEventListener("DOMAttrModified", this, true);
	      if (options.characterData) node.addEventListener("DOMCharacterDataModified", this, true);
	      if (options.childList) node.addEventListener("DOMNodeInserted", this, true);
	      if (options.childList || options.subtree) node.addEventListener("DOMNodeRemoved", this, true);
	    },
	    removeListeners: function() {
	      this.removeListeners_(this.target);
	    },
	    removeListeners_: function(node) {
	      var options = this.options;
	      if (options.attributes) node.removeEventListener("DOMAttrModified", this, true);
	      if (options.characterData) node.removeEventListener("DOMCharacterDataModified", this, true);
	      if (options.childList) node.removeEventListener("DOMNodeInserted", this, true);
	      if (options.childList || options.subtree) node.removeEventListener("DOMNodeRemoved", this, true);
	    },
	    addTransientObserver: function(node) {
	      if (node === this.target) return;
	      this.addListeners_(node);
	      this.transientObservedNodes.push(node);
	      var registrations = registrationsTable.get(node);
	      if (!registrations) registrationsTable.set(node, registrations = []);
	      registrations.push(this);
	    },
	    removeTransientObservers: function() {
	      var transientObservedNodes = this.transientObservedNodes;
	      this.transientObservedNodes = [];
	      transientObservedNodes.forEach(function(node) {
	        this.removeListeners_(node);
	        var registrations = registrationsTable.get(node);
	        for (var i = 0; i < registrations.length; i++) {
	          if (registrations[i] === this) {
	            registrations.splice(i, 1);
	            break;
	          }
	        }
	      }, this);
	    },
	    handleEvent: function(e) {
	      e.stopImmediatePropagation();
	      switch (e.type) {
	       case "DOMAttrModified":
	        var name = e.attrName;
	        var namespace = e.relatedNode.namespaceURI;
	        var target = e.target;
	        var record = new getRecord("attributes", target);
	        record.attributeName = name;
	        record.attributeNamespace = namespace;
	        var oldValue = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
	        forEachAncestorAndObserverEnqueueRecord(target, function(options) {
	          if (!options.attributes) return;
	          if (options.attributeFilter && options.attributeFilter.length && options.attributeFilter.indexOf(name) === -1 && options.attributeFilter.indexOf(namespace) === -1) {
	            return;
	          }
	          if (options.attributeOldValue) return getRecordWithOldValue(oldValue);
	          return record;
	        });
	        break;

	       case "DOMCharacterDataModified":
	        var target = e.target;
	        var record = getRecord("characterData", target);
	        var oldValue = e.prevValue;
	        forEachAncestorAndObserverEnqueueRecord(target, function(options) {
	          if (!options.characterData) return;
	          if (options.characterDataOldValue) return getRecordWithOldValue(oldValue);
	          return record;
	        });
	        break;

	       case "DOMNodeRemoved":
	        this.addTransientObserver(e.target);

	       case "DOMNodeInserted":
	        var changedNode = e.target;
	        var addedNodes, removedNodes;
	        if (e.type === "DOMNodeInserted") {
	          addedNodes = [ changedNode ];
	          removedNodes = [];
	        } else {
	          addedNodes = [];
	          removedNodes = [ changedNode ];
	        }
	        var previousSibling = changedNode.previousSibling;
	        var nextSibling = changedNode.nextSibling;
	        var record = getRecord("childList", e.target.parentNode);
	        record.addedNodes = addedNodes;
	        record.removedNodes = removedNodes;
	        record.previousSibling = previousSibling;
	        record.nextSibling = nextSibling;
	        forEachAncestorAndObserverEnqueueRecord(e.relatedNode, function(options) {
	          if (!options.childList) return;
	          return record;
	        });
	      }
	      clearRecords();
	    }
	  };
	  global.JsMutationObserver = JsMutationObserver;
	  if (!global.MutationObserver) {
	    global.MutationObserver = JsMutationObserver;
	    JsMutationObserver._isPolyfilled = true;
	  }
	})(self);

	(function() {
	  var needsTemplate = typeof HTMLTemplateElement === "undefined";
	  if (/Trident/.test(navigator.userAgent)) {
	    (function() {
	      var importNode = document.importNode;
	      document.importNode = function() {
	        var n = importNode.apply(document, arguments);
	        if (n.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
	          var f = document.createDocumentFragment();
	          f.appendChild(n);
	          return f;
	        } else {
	          return n;
	        }
	      };
	    })();
	  }
	  var needsCloning = function() {
	    if (!needsTemplate) {
	      var t = document.createElement("template");
	      var t2 = document.createElement("template");
	      t2.content.appendChild(document.createElement("div"));
	      t.content.appendChild(t2);
	      var clone = t.cloneNode(true);
	      return clone.content.childNodes.length === 0 || clone.content.firstChild.content.childNodes.length === 0;
	    }
	  }();
	  var TEMPLATE_TAG = "template";
	  var TemplateImpl = function() {};
	  if (needsTemplate) {
	    var contentDoc = document.implementation.createHTMLDocument("template");
	    var canDecorate = true;
	    var templateStyle = document.createElement("style");
	    templateStyle.textContent = TEMPLATE_TAG + "{display:none;}";
	    var head = document.head;
	    head.insertBefore(templateStyle, head.firstElementChild);
	    TemplateImpl.prototype = Object.create(HTMLElement.prototype);
	    TemplateImpl.decorate = function(template) {
	      if (template.content) {
	        return;
	      }
	      template.content = contentDoc.createDocumentFragment();
	      var child;
	      while (child = template.firstChild) {
	        template.content.appendChild(child);
	      }
	      template.cloneNode = function(deep) {
	        return TemplateImpl.cloneNode(this, deep);
	      };
	      if (canDecorate) {
	        try {
	          Object.defineProperty(template, "innerHTML", {
	            get: function() {
	              var o = "";
	              for (var e = this.content.firstChild; e; e = e.nextSibling) {
	                o += e.outerHTML || escapeData(e.data);
	              }
	              return o;
	            },
	            set: function(text) {
	              contentDoc.body.innerHTML = text;
	              TemplateImpl.bootstrap(contentDoc);
	              while (this.content.firstChild) {
	                this.content.removeChild(this.content.firstChild);
	              }
	              while (contentDoc.body.firstChild) {
	                this.content.appendChild(contentDoc.body.firstChild);
	              }
	            },
	            configurable: true
	          });
	        } catch (err) {
	          canDecorate = false;
	        }
	      }
	      TemplateImpl.bootstrap(template.content);
	    };
	    TemplateImpl.bootstrap = function(doc) {
	      var templates = doc.querySelectorAll(TEMPLATE_TAG);
	      for (var i = 0, l = templates.length, t; i < l && (t = templates[i]); i++) {
	        TemplateImpl.decorate(t);
	      }
	    };
	    document.addEventListener("DOMContentLoaded", function() {
	      TemplateImpl.bootstrap(document);
	    });
	    var createElement = document.createElement;
	    document.createElement = function() {
	      "use strict";
	      var el = createElement.apply(document, arguments);
	      if (el.localName === "template") {
	        TemplateImpl.decorate(el);
	      }
	      return el;
	    };
	    var escapeDataRegExp = /[&\u00A0<>]/g;
	    function escapeReplace(c) {
	      switch (c) {
	       case "&":
	        return "&amp;";

	       case "<":
	        return "&lt;";

	       case ">":
	        return "&gt;";

	       case " ":
	        return "&nbsp;";
	      }
	    }
	    function escapeData(s) {
	      return s.replace(escapeDataRegExp, escapeReplace);
	    }
	  }
	  if (needsTemplate || needsCloning) {
	    var nativeCloneNode = Node.prototype.cloneNode;
	    TemplateImpl.cloneNode = function(template, deep) {
	      var clone = nativeCloneNode.call(template, false);
	      if (this.decorate) {
	        this.decorate(clone);
	      }
	      if (deep) {
	        clone.content.appendChild(nativeCloneNode.call(template.content, true));
	        this.fixClonedDom(clone.content, template.content);
	      }
	      return clone;
	    };
	    TemplateImpl.fixClonedDom = function(clone, source) {
	      if (!source.querySelectorAll) return;
	      var s$ = source.querySelectorAll(TEMPLATE_TAG);
	      var t$ = clone.querySelectorAll(TEMPLATE_TAG);
	      for (var i = 0, l = t$.length, t, s; i < l; i++) {
	        s = s$[i];
	        t = t$[i];
	        if (this.decorate) {
	          this.decorate(s);
	        }
	        t.parentNode.replaceChild(s.cloneNode(true), t);
	      }
	    };
	    var originalImportNode = document.importNode;
	    Node.prototype.cloneNode = function(deep) {
	      var dom = nativeCloneNode.call(this, deep);
	      if (deep) {
	        TemplateImpl.fixClonedDom(dom, this);
	      }
	      return dom;
	    };
	    document.importNode = function(element, deep) {
	      if (element.localName === TEMPLATE_TAG) {
	        return TemplateImpl.cloneNode(element, deep);
	      } else {
	        var dom = originalImportNode.call(document, element, deep);
	        if (deep) {
	          TemplateImpl.fixClonedDom(dom, element);
	        }
	        return dom;
	      }
	    };
	    if (needsCloning) {
	      HTMLTemplateElement.prototype.cloneNode = function(deep) {
	        return TemplateImpl.cloneNode(this, deep);
	      };
	    }
	  }
	  if (needsTemplate) {
	    window.HTMLTemplateElement = TemplateImpl;
	  }
	})();

	(function(scope) {
	  "use strict";
	  if (!(window.performance && window.performance.now)) {
	    var start = Date.now();
	    window.performance = {
	      now: function() {
	        return Date.now() - start;
	      }
	    };
	  }
	  if (!window.requestAnimationFrame) {
	    window.requestAnimationFrame = function() {
	      var nativeRaf = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
	      return nativeRaf ? function(callback) {
	        return nativeRaf(function() {
	          callback(performance.now());
	        });
	      } : function(callback) {
	        return window.setTimeout(callback, 1e3 / 60);
	      };
	    }();
	  }
	  if (!window.cancelAnimationFrame) {
	    window.cancelAnimationFrame = function() {
	      return window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function(id) {
	        clearTimeout(id);
	      };
	    }();
	  }
	  var workingDefaultPrevented = function() {
	    var e = document.createEvent("Event");
	    e.initEvent("foo", true, true);
	    e.preventDefault();
	    return e.defaultPrevented;
	  }();
	  if (!workingDefaultPrevented) {
	    var origPreventDefault = Event.prototype.preventDefault;
	    Event.prototype.preventDefault = function() {
	      if (!this.cancelable) {
	        return;
	      }
	      origPreventDefault.call(this);
	      Object.defineProperty(this, "defaultPrevented", {
	        get: function() {
	          return true;
	        },
	        configurable: true
	      });
	    };
	  }
	  var isIE = /Trident/.test(navigator.userAgent);
	  if (!window.CustomEvent || isIE && typeof window.CustomEvent !== "function") {
	    window.CustomEvent = function(inType, params) {
	      params = params || {};
	      var e = document.createEvent("CustomEvent");
	      e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
	      return e;
	    };
	    window.CustomEvent.prototype = window.Event.prototype;
	  }
	  if (!window.Event || isIE && typeof window.Event !== "function") {
	    var origEvent = window.Event;
	    window.Event = function(inType, params) {
	      params = params || {};
	      var e = document.createEvent("Event");
	      e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
	      return e;
	    };
	    window.Event.prototype = origEvent.prototype;
	  }
	})(window.WebComponents);

	window.HTMLImports = window.HTMLImports || {
	  flags: {}
	};

	(function(scope) {
	  var IMPORT_LINK_TYPE = "import";
	  var useNative = Boolean(IMPORT_LINK_TYPE in document.createElement("link"));
	  var hasShadowDOMPolyfill = Boolean(window.ShadowDOMPolyfill);
	  var wrap = function(node) {
	    return hasShadowDOMPolyfill ? window.ShadowDOMPolyfill.wrapIfNeeded(node) : node;
	  };
	  var rootDocument = wrap(document);
	  var currentScriptDescriptor = {
	    get: function() {
	      var script = window.HTMLImports.currentScript || document.currentScript || (document.readyState !== "complete" ? document.scripts[document.scripts.length - 1] : null);
	      return wrap(script);
	    },
	    configurable: true
	  };
	  Object.defineProperty(document, "_currentScript", currentScriptDescriptor);
	  Object.defineProperty(rootDocument, "_currentScript", currentScriptDescriptor);
	  var isIE = /Trident/.test(navigator.userAgent);
	  function whenReady(callback, doc) {
	    doc = doc || rootDocument;
	    whenDocumentReady(function() {
	      watchImportsLoad(callback, doc);
	    }, doc);
	  }
	  var requiredReadyState = isIE ? "complete" : "interactive";
	  var READY_EVENT = "readystatechange";
	  function isDocumentReady(doc) {
	    return doc.readyState === "complete" || doc.readyState === requiredReadyState;
	  }
	  function whenDocumentReady(callback, doc) {
	    if (!isDocumentReady(doc)) {
	      var checkReady = function() {
	        if (doc.readyState === "complete" || doc.readyState === requiredReadyState) {
	          doc.removeEventListener(READY_EVENT, checkReady);
	          whenDocumentReady(callback, doc);
	        }
	      };
	      doc.addEventListener(READY_EVENT, checkReady);
	    } else if (callback) {
	      callback();
	    }
	  }
	  function markTargetLoaded(event) {
	    event.target.__loaded = true;
	  }
	  function watchImportsLoad(callback, doc) {
	    var imports = doc.querySelectorAll("link[rel=import]");
	    var parsedCount = 0, importCount = imports.length, newImports = [], errorImports = [];
	    function checkDone() {
	      if (parsedCount == importCount && callback) {
	        callback({
	          allImports: imports,
	          loadedImports: newImports,
	          errorImports: errorImports
	        });
	      }
	    }
	    function loadedImport(e) {
	      markTargetLoaded(e);
	      newImports.push(this);
	      parsedCount++;
	      checkDone();
	    }
	    function errorLoadingImport(e) {
	      errorImports.push(this);
	      parsedCount++;
	      checkDone();
	    }
	    if (importCount) {
	      for (var i = 0, imp; i < importCount && (imp = imports[i]); i++) {
	        if (isImportLoaded(imp)) {
	          newImports.push(this);
	          parsedCount++;
	          checkDone();
	        } else {
	          imp.addEventListener("load", loadedImport);
	          imp.addEventListener("error", errorLoadingImport);
	        }
	      }
	    } else {
	      checkDone();
	    }
	  }
	  function isImportLoaded(link) {
	    return useNative ? link.__loaded || link.import && link.import.readyState !== "loading" : link.__importParsed;
	  }
	  if (useNative) {
	    new MutationObserver(function(mxns) {
	      for (var i = 0, l = mxns.length, m; i < l && (m = mxns[i]); i++) {
	        if (m.addedNodes) {
	          handleImports(m.addedNodes);
	        }
	      }
	    }).observe(document.head, {
	      childList: true
	    });
	    function handleImports(nodes) {
	      for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
	        if (isImport(n)) {
	          handleImport(n);
	        }
	      }
	    }
	    function isImport(element) {
	      return element.localName === "link" && element.rel === "import";
	    }
	    function handleImport(element) {
	      var loaded = element.import;
	      if (loaded) {
	        markTargetLoaded({
	          target: element
	        });
	      } else {
	        element.addEventListener("load", markTargetLoaded);
	        element.addEventListener("error", markTargetLoaded);
	      }
	    }
	    (function() {
	      if (document.readyState === "loading") {
	        var imports = document.querySelectorAll("link[rel=import]");
	        for (var i = 0, l = imports.length, imp; i < l && (imp = imports[i]); i++) {
	          handleImport(imp);
	        }
	      }
	    })();
	  }
	  whenReady(function(detail) {
	    window.HTMLImports.ready = true;
	    window.HTMLImports.readyTime = new Date().getTime();
	    var evt = rootDocument.createEvent("CustomEvent");
	    evt.initCustomEvent("HTMLImportsLoaded", true, true, detail);
	    rootDocument.dispatchEvent(evt);
	  });
	  scope.IMPORT_LINK_TYPE = IMPORT_LINK_TYPE;
	  scope.useNative = useNative;
	  scope.rootDocument = rootDocument;
	  scope.whenReady = whenReady;
	  scope.isIE = isIE;
	})(window.HTMLImports);

	(function(scope) {
	  var modules = [];
	  var addModule = function(module) {
	    modules.push(module);
	  };
	  var initializeModules = function() {
	    modules.forEach(function(module) {
	      module(scope);
	    });
	  };
	  scope.addModule = addModule;
	  scope.initializeModules = initializeModules;
	})(window.HTMLImports);

	window.HTMLImports.addModule(function(scope) {
	  var CSS_URL_REGEXP = /(url\()([^)]*)(\))/g;
	  var CSS_IMPORT_REGEXP = /(@import[\s]+(?!url\())([^;]*)(;)/g;
	  var path = {
	    resolveUrlsInStyle: function(style, linkUrl) {
	      var doc = style.ownerDocument;
	      var resolver = doc.createElement("a");
	      style.textContent = this.resolveUrlsInCssText(style.textContent, linkUrl, resolver);
	      return style;
	    },
	    resolveUrlsInCssText: function(cssText, linkUrl, urlObj) {
	      var r = this.replaceUrls(cssText, urlObj, linkUrl, CSS_URL_REGEXP);
	      r = this.replaceUrls(r, urlObj, linkUrl, CSS_IMPORT_REGEXP);
	      return r;
	    },
	    replaceUrls: function(text, urlObj, linkUrl, regexp) {
	      return text.replace(regexp, function(m, pre, url, post) {
	        var urlPath = url.replace(/["']/g, "");
	        if (linkUrl) {
	          urlPath = new URL(urlPath, linkUrl).href;
	        }
	        urlObj.href = urlPath;
	        urlPath = urlObj.href;
	        return pre + "'" + urlPath + "'" + post;
	      });
	    }
	  };
	  scope.path = path;
	});

	window.HTMLImports.addModule(function(scope) {
	  var xhr = {
	    async: true,
	    ok: function(request) {
	      return request.status >= 200 && request.status < 300 || request.status === 304 || request.status === 0;
	    },
	    load: function(url, next, nextContext) {
	      var request = new XMLHttpRequest();
	      if (scope.flags.debug || scope.flags.bust) {
	        url += "?" + Math.random();
	      }
	      request.open("GET", url, xhr.async);
	      request.addEventListener("readystatechange", function(e) {
	        if (request.readyState === 4) {
	          var redirectedUrl = null;
	          try {
	            var locationHeader = request.getResponseHeader("Location");
	            if (locationHeader) {
	              redirectedUrl = locationHeader.substr(0, 1) === "/" ? location.origin + locationHeader : locationHeader;
	            }
	          } catch (e) {
	            console.error(e.message);
	          }
	          next.call(nextContext, !xhr.ok(request) && request, request.response || request.responseText, redirectedUrl);
	        }
	      });
	      request.send();
	      return request;
	    },
	    loadDocument: function(url, next, nextContext) {
	      this.load(url, next, nextContext).responseType = "document";
	    }
	  };
	  scope.xhr = xhr;
	});

	window.HTMLImports.addModule(function(scope) {
	  var xhr = scope.xhr;
	  var flags = scope.flags;
	  var Loader = function(onLoad, onComplete) {
	    this.cache = {};
	    this.onload = onLoad;
	    this.oncomplete = onComplete;
	    this.inflight = 0;
	    this.pending = {};
	  };
	  Loader.prototype = {
	    addNodes: function(nodes) {
	      this.inflight += nodes.length;
	      for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
	        this.require(n);
	      }
	      this.checkDone();
	    },
	    addNode: function(node) {
	      this.inflight++;
	      this.require(node);
	      this.checkDone();
	    },
	    require: function(elt) {
	      var url = elt.src || elt.href;
	      elt.__nodeUrl = url;
	      if (!this.dedupe(url, elt)) {
	        this.fetch(url, elt);
	      }
	    },
	    dedupe: function(url, elt) {
	      if (this.pending[url]) {
	        this.pending[url].push(elt);
	        return true;
	      }
	      var resource;
	      if (this.cache[url]) {
	        this.onload(url, elt, this.cache[url]);
	        this.tail();
	        return true;
	      }
	      this.pending[url] = [ elt ];
	      return false;
	    },
	    fetch: function(url, elt) {
	      flags.load && console.log("fetch", url, elt);
	      if (!url) {
	        setTimeout(function() {
	          this.receive(url, elt, {
	            error: "href must be specified"
	          }, null);
	        }.bind(this), 0);
	      } else if (url.match(/^data:/)) {
	        var pieces = url.split(",");
	        var header = pieces[0];
	        var body = pieces[1];
	        if (header.indexOf(";base64") > -1) {
	          body = atob(body);
	        } else {
	          body = decodeURIComponent(body);
	        }
	        setTimeout(function() {
	          this.receive(url, elt, null, body);
	        }.bind(this), 0);
	      } else {
	        var receiveXhr = function(err, resource, redirectedUrl) {
	          this.receive(url, elt, err, resource, redirectedUrl);
	        }.bind(this);
	        xhr.load(url, receiveXhr);
	      }
	    },
	    receive: function(url, elt, err, resource, redirectedUrl) {
	      this.cache[url] = resource;
	      var $p = this.pending[url];
	      for (var i = 0, l = $p.length, p; i < l && (p = $p[i]); i++) {
	        this.onload(url, p, resource, err, redirectedUrl);
	        this.tail();
	      }
	      this.pending[url] = null;
	    },
	    tail: function() {
	      --this.inflight;
	      this.checkDone();
	    },
	    checkDone: function() {
	      if (!this.inflight) {
	        this.oncomplete();
	      }
	    }
	  };
	  scope.Loader = Loader;
	});

	window.HTMLImports.addModule(function(scope) {
	  var Observer = function(addCallback) {
	    this.addCallback = addCallback;
	    this.mo = new MutationObserver(this.handler.bind(this));
	  };
	  Observer.prototype = {
	    handler: function(mutations) {
	      for (var i = 0, l = mutations.length, m; i < l && (m = mutations[i]); i++) {
	        if (m.type === "childList" && m.addedNodes.length) {
	          this.addedNodes(m.addedNodes);
	        }
	      }
	    },
	    addedNodes: function(nodes) {
	      if (this.addCallback) {
	        this.addCallback(nodes);
	      }
	      for (var i = 0, l = nodes.length, n, loading; i < l && (n = nodes[i]); i++) {
	        if (n.children && n.children.length) {
	          this.addedNodes(n.children);
	        }
	      }
	    },
	    observe: function(root) {
	      this.mo.observe(root, {
	        childList: true,
	        subtree: true
	      });
	    }
	  };
	  scope.Observer = Observer;
	});

	window.HTMLImports.addModule(function(scope) {
	  var path = scope.path;
	  var rootDocument = scope.rootDocument;
	  var flags = scope.flags;
	  var isIE = scope.isIE;
	  var IMPORT_LINK_TYPE = scope.IMPORT_LINK_TYPE;
	  var IMPORT_SELECTOR = "link[rel=" + IMPORT_LINK_TYPE + "]";
	  var importParser = {
	    documentSelectors: IMPORT_SELECTOR,
	    importsSelectors: [ IMPORT_SELECTOR, "link[rel=stylesheet]:not([type])", "style:not([type])", "script:not([type])", 'script[type="application/javascript"]', 'script[type="text/javascript"]' ].join(","),
	    map: {
	      link: "parseLink",
	      script: "parseScript",
	      style: "parseStyle"
	    },
	    dynamicElements: [],
	    parseNext: function() {
	      var next = this.nextToParse();
	      if (next) {
	        this.parse(next);
	      }
	    },
	    parse: function(elt) {
	      if (this.isParsed(elt)) {
	        flags.parse && console.log("[%s] is already parsed", elt.localName);
	        return;
	      }
	      var fn = this[this.map[elt.localName]];
	      if (fn) {
	        this.markParsing(elt);
	        fn.call(this, elt);
	      }
	    },
	    parseDynamic: function(elt, quiet) {
	      this.dynamicElements.push(elt);
	      if (!quiet) {
	        this.parseNext();
	      }
	    },
	    markParsing: function(elt) {
	      flags.parse && console.log("parsing", elt);
	      this.parsingElement = elt;
	    },
	    markParsingComplete: function(elt) {
	      elt.__importParsed = true;
	      this.markDynamicParsingComplete(elt);
	      if (elt.__importElement) {
	        elt.__importElement.__importParsed = true;
	        this.markDynamicParsingComplete(elt.__importElement);
	      }
	      this.parsingElement = null;
	      flags.parse && console.log("completed", elt);
	    },
	    markDynamicParsingComplete: function(elt) {
	      var i = this.dynamicElements.indexOf(elt);
	      if (i >= 0) {
	        this.dynamicElements.splice(i, 1);
	      }
	    },
	    parseImport: function(elt) {
	      elt.import = elt.__doc;
	      if (window.HTMLImports.__importsParsingHook) {
	        window.HTMLImports.__importsParsingHook(elt);
	      }
	      if (elt.import) {
	        elt.import.__importParsed = true;
	      }
	      this.markParsingComplete(elt);
	      if (elt.__resource && !elt.__error) {
	        elt.dispatchEvent(new CustomEvent("load", {
	          bubbles: false
	        }));
	      } else {
	        elt.dispatchEvent(new CustomEvent("error", {
	          bubbles: false
	        }));
	      }
	      if (elt.__pending) {
	        var fn;
	        while (elt.__pending.length) {
	          fn = elt.__pending.shift();
	          if (fn) {
	            fn({
	              target: elt
	            });
	          }
	        }
	      }
	      this.parseNext();
	    },
	    parseLink: function(linkElt) {
	      if (nodeIsImport(linkElt)) {
	        this.parseImport(linkElt);
	      } else {
	        linkElt.href = linkElt.href;
	        this.parseGeneric(linkElt);
	      }
	    },
	    parseStyle: function(elt) {
	      var src = elt;
	      elt = cloneStyle(elt);
	      src.__appliedElement = elt;
	      elt.__importElement = src;
	      this.parseGeneric(elt);
	    },
	    parseGeneric: function(elt) {
	      this.trackElement(elt);
	      this.addElementToDocument(elt);
	    },
	    rootImportForElement: function(elt) {
	      var n = elt;
	      while (n.ownerDocument.__importLink) {
	        n = n.ownerDocument.__importLink;
	      }
	      return n;
	    },
	    addElementToDocument: function(elt) {
	      var port = this.rootImportForElement(elt.__importElement || elt);
	      port.parentNode.insertBefore(elt, port);
	    },
	    trackElement: function(elt, callback) {
	      var self = this;
	      var done = function(e) {
	        elt.removeEventListener("load", done);
	        elt.removeEventListener("error", done);
	        if (callback) {
	          callback(e);
	        }
	        self.markParsingComplete(elt);
	        self.parseNext();
	      };
	      elt.addEventListener("load", done);
	      elt.addEventListener("error", done);
	      if (isIE && elt.localName === "style") {
	        var fakeLoad = false;
	        if (elt.textContent.indexOf("@import") == -1) {
	          fakeLoad = true;
	        } else if (elt.sheet) {
	          fakeLoad = true;
	          var csr = elt.sheet.cssRules;
	          var len = csr ? csr.length : 0;
	          for (var i = 0, r; i < len && (r = csr[i]); i++) {
	            if (r.type === CSSRule.IMPORT_RULE) {
	              fakeLoad = fakeLoad && Boolean(r.styleSheet);
	            }
	          }
	        }
	        if (fakeLoad) {
	          setTimeout(function() {
	            elt.dispatchEvent(new CustomEvent("load", {
	              bubbles: false
	            }));
	          });
	        }
	      }
	    },
	    parseScript: function(scriptElt) {
	      var script = document.createElement("script");
	      script.__importElement = scriptElt;
	      script.src = scriptElt.src ? scriptElt.src : generateScriptDataUrl(scriptElt);
	      scope.currentScript = scriptElt;
	      this.trackElement(script, function(e) {
	        if (script.parentNode) {
	          script.parentNode.removeChild(script);
	        }
	        scope.currentScript = null;
	      });
	      this.addElementToDocument(script);
	    },
	    nextToParse: function() {
	      this._mayParse = [];
	      return !this.parsingElement && (this.nextToParseInDoc(rootDocument) || this.nextToParseDynamic());
	    },
	    nextToParseInDoc: function(doc, link) {
	      if (doc && this._mayParse.indexOf(doc) < 0) {
	        this._mayParse.push(doc);
	        var nodes = doc.querySelectorAll(this.parseSelectorsForNode(doc));
	        for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
	          if (!this.isParsed(n)) {
	            if (this.hasResource(n)) {
	              return nodeIsImport(n) ? this.nextToParseInDoc(n.__doc, n) : n;
	            } else {
	              return;
	            }
	          }
	        }
	      }
	      return link;
	    },
	    nextToParseDynamic: function() {
	      return this.dynamicElements[0];
	    },
	    parseSelectorsForNode: function(node) {
	      var doc = node.ownerDocument || node;
	      return doc === rootDocument ? this.documentSelectors : this.importsSelectors;
	    },
	    isParsed: function(node) {
	      return node.__importParsed;
	    },
	    needsDynamicParsing: function(elt) {
	      return this.dynamicElements.indexOf(elt) >= 0;
	    },
	    hasResource: function(node) {
	      if (nodeIsImport(node) && node.__doc === undefined) {
	        return false;
	      }
	      return true;
	    }
	  };
	  function nodeIsImport(elt) {
	    return elt.localName === "link" && elt.rel === IMPORT_LINK_TYPE;
	  }
	  function generateScriptDataUrl(script) {
	    var scriptContent = generateScriptContent(script);
	    return "data:text/javascript;charset=utf-8," + encodeURIComponent(scriptContent);
	  }
	  function generateScriptContent(script) {
	    return script.textContent + generateSourceMapHint(script);
	  }
	  function generateSourceMapHint(script) {
	    var owner = script.ownerDocument;
	    owner.__importedScripts = owner.__importedScripts || 0;
	    var moniker = script.ownerDocument.baseURI;
	    var num = owner.__importedScripts ? "-" + owner.__importedScripts : "";
	    owner.__importedScripts++;
	    return "\n//# sourceURL=" + moniker + num + ".js\n";
	  }
	  function cloneStyle(style) {
	    var clone = style.ownerDocument.createElement("style");
	    clone.textContent = style.textContent;
	    path.resolveUrlsInStyle(clone);
	    return clone;
	  }
	  scope.parser = importParser;
	  scope.IMPORT_SELECTOR = IMPORT_SELECTOR;
	});

	window.HTMLImports.addModule(function(scope) {
	  var flags = scope.flags;
	  var IMPORT_LINK_TYPE = scope.IMPORT_LINK_TYPE;
	  var IMPORT_SELECTOR = scope.IMPORT_SELECTOR;
	  var rootDocument = scope.rootDocument;
	  var Loader = scope.Loader;
	  var Observer = scope.Observer;
	  var parser = scope.parser;
	  var importer = {
	    documents: {},
	    documentPreloadSelectors: IMPORT_SELECTOR,
	    importsPreloadSelectors: [ IMPORT_SELECTOR ].join(","),
	    loadNode: function(node) {
	      importLoader.addNode(node);
	    },
	    loadSubtree: function(parent) {
	      var nodes = this.marshalNodes(parent);
	      importLoader.addNodes(nodes);
	    },
	    marshalNodes: function(parent) {
	      return parent.querySelectorAll(this.loadSelectorsForNode(parent));
	    },
	    loadSelectorsForNode: function(node) {
	      var doc = node.ownerDocument || node;
	      return doc === rootDocument ? this.documentPreloadSelectors : this.importsPreloadSelectors;
	    },
	    loaded: function(url, elt, resource, err, redirectedUrl) {
	      flags.load && console.log("loaded", url, elt);
	      elt.__resource = resource;
	      elt.__error = err;
	      if (isImportLink(elt)) {
	        var doc = this.documents[url];
	        if (doc === undefined) {
	          doc = err ? null : makeDocument(resource, redirectedUrl || url);
	          if (doc) {
	            doc.__importLink = elt;
	            this.bootDocument(doc);
	          }
	          this.documents[url] = doc;
	        }
	        elt.__doc = doc;
	      }
	      parser.parseNext();
	    },
	    bootDocument: function(doc) {
	      this.loadSubtree(doc);
	      this.observer.observe(doc);
	      parser.parseNext();
	    },
	    loadedAll: function() {
	      parser.parseNext();
	    }
	  };
	  var importLoader = new Loader(importer.loaded.bind(importer), importer.loadedAll.bind(importer));
	  importer.observer = new Observer();
	  function isImportLink(elt) {
	    return isLinkRel(elt, IMPORT_LINK_TYPE);
	  }
	  function isLinkRel(elt, rel) {
	    return elt.localName === "link" && elt.getAttribute("rel") === rel;
	  }
	  function hasBaseURIAccessor(doc) {
	    return !!Object.getOwnPropertyDescriptor(doc, "baseURI");
	  }
	  function makeDocument(resource, url) {
	    var doc = document.implementation.createHTMLDocument(IMPORT_LINK_TYPE);
	    doc._URL = url;
	    var base = doc.createElement("base");
	    base.setAttribute("href", url);
	    if (!doc.baseURI && !hasBaseURIAccessor(doc)) {
	      Object.defineProperty(doc, "baseURI", {
	        value: url
	      });
	    }
	    var meta = doc.createElement("meta");
	    meta.setAttribute("charset", "utf-8");
	    doc.head.appendChild(meta);
	    doc.head.appendChild(base);
	    doc.body.innerHTML = resource;
	    if (window.HTMLTemplateElement && HTMLTemplateElement.bootstrap) {
	      HTMLTemplateElement.bootstrap(doc);
	    }
	    return doc;
	  }
	  if (!document.baseURI) {
	    var baseURIDescriptor = {
	      get: function() {
	        var base = document.querySelector("base");
	        return base ? base.href : window.location.href;
	      },
	      configurable: true
	    };
	    Object.defineProperty(document, "baseURI", baseURIDescriptor);
	    Object.defineProperty(rootDocument, "baseURI", baseURIDescriptor);
	  }
	  scope.importer = importer;
	  scope.importLoader = importLoader;
	});

	window.HTMLImports.addModule(function(scope) {
	  var parser = scope.parser;
	  var importer = scope.importer;
	  var dynamic = {
	    added: function(nodes) {
	      var owner, parsed, loading;
	      for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
	        if (!owner) {
	          owner = n.ownerDocument;
	          parsed = parser.isParsed(owner);
	        }
	        loading = this.shouldLoadNode(n);
	        if (loading) {
	          importer.loadNode(n);
	        }
	        if (this.shouldParseNode(n) && parsed) {
	          parser.parseDynamic(n, loading);
	        }
	      }
	    },
	    shouldLoadNode: function(node) {
	      return node.nodeType === 1 && matches.call(node, importer.loadSelectorsForNode(node));
	    },
	    shouldParseNode: function(node) {
	      return node.nodeType === 1 && matches.call(node, parser.parseSelectorsForNode(node));
	    }
	  };
	  importer.observer.addCallback = dynamic.added.bind(dynamic);
	  var matches = HTMLElement.prototype.matches || HTMLElement.prototype.matchesSelector || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector;
	});

	(function(scope) {
	  var initializeModules = scope.initializeModules;
	  var isIE = scope.isIE;
	  if (scope.useNative) {
	    return;
	  }
	  initializeModules();
	  var rootDocument = scope.rootDocument;
	  function bootstrap() {
	    window.HTMLImports.importer.bootDocument(rootDocument);
	  }
	  if (document.readyState === "complete" || document.readyState === "interactive" && !window.attachEvent) {
	    bootstrap();
	  } else {
	    document.addEventListener("DOMContentLoaded", bootstrap);
	  }
	})(window.HTMLImports);

	window.CustomElements = window.CustomElements || {
	  flags: {}
	};

	(function(scope) {
	  var flags = scope.flags;
	  var modules = [];
	  var addModule = function(module) {
	    modules.push(module);
	  };
	  var initializeModules = function() {
	    modules.forEach(function(module) {
	      module(scope);
	    });
	  };
	  scope.addModule = addModule;
	  scope.initializeModules = initializeModules;
	  scope.hasNative = Boolean(document.registerElement);
	  scope.isIE = /Trident/.test(navigator.userAgent);
	  scope.useNative = !flags.register && scope.hasNative && !window.ShadowDOMPolyfill && (!window.HTMLImports || window.HTMLImports.useNative);
	})(window.CustomElements);

	window.CustomElements.addModule(function(scope) {
	  var IMPORT_LINK_TYPE = window.HTMLImports ? window.HTMLImports.IMPORT_LINK_TYPE : "none";
	  function forSubtree(node, cb) {
	    findAllElements(node, function(e) {
	      if (cb(e)) {
	        return true;
	      }
	      forRoots(e, cb);
	    });
	    forRoots(node, cb);
	  }
	  function findAllElements(node, find, data) {
	    var e = node.firstElementChild;
	    if (!e) {
	      e = node.firstChild;
	      while (e && e.nodeType !== Node.ELEMENT_NODE) {
	        e = e.nextSibling;
	      }
	    }
	    while (e) {
	      if (find(e, data) !== true) {
	        findAllElements(e, find, data);
	      }
	      e = e.nextElementSibling;
	    }
	    return null;
	  }
	  function forRoots(node, cb) {
	    var root = node.shadowRoot;
	    while (root) {
	      forSubtree(root, cb);
	      root = root.olderShadowRoot;
	    }
	  }
	  function forDocumentTree(doc, cb) {
	    _forDocumentTree(doc, cb, []);
	  }
	  function _forDocumentTree(doc, cb, processingDocuments) {
	    doc = window.wrap(doc);
	    if (processingDocuments.indexOf(doc) >= 0) {
	      return;
	    }
	    processingDocuments.push(doc);
	    var imports = doc.querySelectorAll("link[rel=" + IMPORT_LINK_TYPE + "]");
	    for (var i = 0, l = imports.length, n; i < l && (n = imports[i]); i++) {
	      if (n.import) {
	        _forDocumentTree(n.import, cb, processingDocuments);
	      }
	    }
	    cb(doc);
	  }
	  scope.forDocumentTree = forDocumentTree;
	  scope.forSubtree = forSubtree;
	});

	window.CustomElements.addModule(function(scope) {
	  var flags = scope.flags;
	  var forSubtree = scope.forSubtree;
	  var forDocumentTree = scope.forDocumentTree;
	  function addedNode(node, isAttached) {
	    return added(node, isAttached) || addedSubtree(node, isAttached);
	  }
	  function added(node, isAttached) {
	    if (scope.upgrade(node, isAttached)) {
	      return true;
	    }
	    if (isAttached) {
	      attached(node);
	    }
	  }
	  function addedSubtree(node, isAttached) {
	    forSubtree(node, function(e) {
	      if (added(e, isAttached)) {
	        return true;
	      }
	    });
	  }
	  var hasThrottledAttached = window.MutationObserver._isPolyfilled && flags["throttle-attached"];
	  scope.hasPolyfillMutations = hasThrottledAttached;
	  scope.hasThrottledAttached = hasThrottledAttached;
	  var isPendingMutations = false;
	  var pendingMutations = [];
	  function deferMutation(fn) {
	    pendingMutations.push(fn);
	    if (!isPendingMutations) {
	      isPendingMutations = true;
	      setTimeout(takeMutations);
	    }
	  }
	  function takeMutations() {
	    isPendingMutations = false;
	    var $p = pendingMutations;
	    for (var i = 0, l = $p.length, p; i < l && (p = $p[i]); i++) {
	      p();
	    }
	    pendingMutations = [];
	  }
	  function attached(element) {
	    if (hasThrottledAttached) {
	      deferMutation(function() {
	        _attached(element);
	      });
	    } else {
	      _attached(element);
	    }
	  }
	  function _attached(element) {
	    if (element.__upgraded__ && !element.__attached) {
	      element.__attached = true;
	      if (element.attachedCallback) {
	        element.attachedCallback();
	      }
	    }
	  }
	  function detachedNode(node) {
	    detached(node);
	    forSubtree(node, function(e) {
	      detached(e);
	    });
	  }
	  function detached(element) {
	    if (hasThrottledAttached) {
	      deferMutation(function() {
	        _detached(element);
	      });
	    } else {
	      _detached(element);
	    }
	  }
	  function _detached(element) {
	    if (element.__upgraded__ && element.__attached) {
	      element.__attached = false;
	      if (element.detachedCallback) {
	        element.detachedCallback();
	      }
	    }
	  }
	  function inDocument(element) {
	    var p = element;
	    var doc = window.wrap(document);
	    while (p) {
	      if (p == doc) {
	        return true;
	      }
	      p = p.parentNode || p.nodeType === Node.DOCUMENT_FRAGMENT_NODE && p.host;
	    }
	  }
	  function watchShadow(node) {
	    if (node.shadowRoot && !node.shadowRoot.__watched) {
	      flags.dom && console.log("watching shadow-root for: ", node.localName);
	      var root = node.shadowRoot;
	      while (root) {
	        observe(root);
	        root = root.olderShadowRoot;
	      }
	    }
	  }
	  function handler(root, mutations) {
	    if (flags.dom) {
	      var mx = mutations[0];
	      if (mx && mx.type === "childList" && mx.addedNodes) {
	        if (mx.addedNodes) {
	          var d = mx.addedNodes[0];
	          while (d && d !== document && !d.host) {
	            d = d.parentNode;
	          }
	          var u = d && (d.URL || d._URL || d.host && d.host.localName) || "";
	          u = u.split("/?").shift().split("/").pop();
	        }
	      }
	      console.group("mutations (%d) [%s]", mutations.length, u || "");
	    }
	    var isAttached = inDocument(root);
	    mutations.forEach(function(mx) {
	      if (mx.type === "childList") {
	        forEach(mx.addedNodes, function(n) {
	          if (!n.localName) {
	            return;
	          }
	          addedNode(n, isAttached);
	        });
	        forEach(mx.removedNodes, function(n) {
	          if (!n.localName) {
	            return;
	          }
	          detachedNode(n);
	        });
	      }
	    });
	    flags.dom && console.groupEnd();
	  }
	  function takeRecords(node) {
	    node = window.wrap(node);
	    if (!node) {
	      node = window.wrap(document);
	    }
	    while (node.parentNode) {
	      node = node.parentNode;
	    }
	    var observer = node.__observer;
	    if (observer) {
	      handler(node, observer.takeRecords());
	      takeMutations();
	    }
	  }
	  var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);
	  function observe(inRoot) {
	    if (inRoot.__observer) {
	      return;
	    }
	    var observer = new MutationObserver(handler.bind(this, inRoot));
	    observer.observe(inRoot, {
	      childList: true,
	      subtree: true
	    });
	    inRoot.__observer = observer;
	  }
	  function upgradeDocument(doc) {
	    doc = window.wrap(doc);
	    flags.dom && console.group("upgradeDocument: ", doc.baseURI.split("/").pop());
	    var isMainDocument = doc === window.wrap(document);
	    addedNode(doc, isMainDocument);
	    observe(doc);
	    flags.dom && console.groupEnd();
	  }
	  function upgradeDocumentTree(doc) {
	    forDocumentTree(doc, upgradeDocument);
	  }
	  var originalCreateShadowRoot = Element.prototype.createShadowRoot;
	  if (originalCreateShadowRoot) {
	    Element.prototype.createShadowRoot = function() {
	      var root = originalCreateShadowRoot.call(this);
	      window.CustomElements.watchShadow(this);
	      return root;
	    };
	  }
	  scope.watchShadow = watchShadow;
	  scope.upgradeDocumentTree = upgradeDocumentTree;
	  scope.upgradeDocument = upgradeDocument;
	  scope.upgradeSubtree = addedSubtree;
	  scope.upgradeAll = addedNode;
	  scope.attached = attached;
	  scope.takeRecords = takeRecords;
	});

	window.CustomElements.addModule(function(scope) {
	  var flags = scope.flags;
	  function upgrade(node, isAttached) {
	    if (node.localName === "template") {
	      if (window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
	        HTMLTemplateElement.decorate(node);
	      }
	    }
	    if (!node.__upgraded__ && node.nodeType === Node.ELEMENT_NODE) {
	      var is = node.getAttribute("is");
	      var definition = scope.getRegisteredDefinition(node.localName) || scope.getRegisteredDefinition(is);
	      if (definition) {
	        if (is && definition.tag == node.localName || !is && !definition.extends) {
	          return upgradeWithDefinition(node, definition, isAttached);
	        }
	      }
	    }
	  }
	  function upgradeWithDefinition(element, definition, isAttached) {
	    flags.upgrade && console.group("upgrade:", element.localName);
	    if (definition.is) {
	      element.setAttribute("is", definition.is);
	    }
	    implementPrototype(element, definition);
	    element.__upgraded__ = true;
	    created(element);
	    if (isAttached) {
	      scope.attached(element);
	    }
	    scope.upgradeSubtree(element, isAttached);
	    flags.upgrade && console.groupEnd();
	    return element;
	  }
	  function implementPrototype(element, definition) {
	    if (Object.__proto__) {
	      element.__proto__ = definition.prototype;
	    } else {
	      customMixin(element, definition.prototype, definition.native);
	      element.__proto__ = definition.prototype;
	    }
	  }
	  function customMixin(inTarget, inSrc, inNative) {
	    var used = {};
	    var p = inSrc;
	    while (p !== inNative && p !== HTMLElement.prototype) {
	      var keys = Object.getOwnPropertyNames(p);
	      for (var i = 0, k; k = keys[i]; i++) {
	        if (!used[k]) {
	          Object.defineProperty(inTarget, k, Object.getOwnPropertyDescriptor(p, k));
	          used[k] = 1;
	        }
	      }
	      p = Object.getPrototypeOf(p);
	    }
	  }
	  function created(element) {
	    if (element.createdCallback) {
	      element.createdCallback();
	    }
	  }
	  scope.upgrade = upgrade;
	  scope.upgradeWithDefinition = upgradeWithDefinition;
	  scope.implementPrototype = implementPrototype;
	});

	window.CustomElements.addModule(function(scope) {
	  var isIE = scope.isIE;
	  var upgradeDocumentTree = scope.upgradeDocumentTree;
	  var upgradeAll = scope.upgradeAll;
	  var upgradeWithDefinition = scope.upgradeWithDefinition;
	  var implementPrototype = scope.implementPrototype;
	  var useNative = scope.useNative;
	  function register(name, options) {
	    var definition = options || {};
	    if (!name) {
	      throw new Error("document.registerElement: first argument `name` must not be empty");
	    }
	    if (name.indexOf("-") < 0) {
	      throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '" + String(name) + "'.");
	    }
	    if (isReservedTag(name)) {
	      throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '" + String(name) + "'. The type name is invalid.");
	    }
	    if (getRegisteredDefinition(name)) {
	      throw new Error("DuplicateDefinitionError: a type with name '" + String(name) + "' is already registered");
	    }
	    if (!definition.prototype) {
	      definition.prototype = Object.create(HTMLElement.prototype);
	    }
	    definition.__name = name.toLowerCase();
	    if (definition.extends) {
	      definition.extends = definition.extends.toLowerCase();
	    }
	    definition.lifecycle = definition.lifecycle || {};
	    definition.ancestry = ancestry(definition.extends);
	    resolveTagName(definition);
	    resolvePrototypeChain(definition);
	    overrideAttributeApi(definition.prototype);
	    registerDefinition(definition.__name, definition);
	    definition.ctor = generateConstructor(definition);
	    definition.ctor.prototype = definition.prototype;
	    definition.prototype.constructor = definition.ctor;
	    if (scope.ready) {
	      upgradeDocumentTree(document);
	    }
	    return definition.ctor;
	  }
	  function overrideAttributeApi(prototype) {
	    if (prototype.setAttribute._polyfilled) {
	      return;
	    }
	    var setAttribute = prototype.setAttribute;
	    prototype.setAttribute = function(name, value) {
	      changeAttribute.call(this, name, value, setAttribute);
	    };
	    var removeAttribute = prototype.removeAttribute;
	    prototype.removeAttribute = function(name) {
	      changeAttribute.call(this, name, null, removeAttribute);
	    };
	    prototype.setAttribute._polyfilled = true;
	  }
	  function changeAttribute(name, value, operation) {
	    name = name.toLowerCase();
	    var oldValue = this.getAttribute(name);
	    operation.apply(this, arguments);
	    var newValue = this.getAttribute(name);
	    if (this.attributeChangedCallback && newValue !== oldValue) {
	      this.attributeChangedCallback(name, oldValue, newValue);
	    }
	  }
	  function isReservedTag(name) {
	    for (var i = 0; i < reservedTagList.length; i++) {
	      if (name === reservedTagList[i]) {
	        return true;
	      }
	    }
	  }
	  var reservedTagList = [ "annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph" ];
	  function ancestry(extnds) {
	    var extendee = getRegisteredDefinition(extnds);
	    if (extendee) {
	      return ancestry(extendee.extends).concat([ extendee ]);
	    }
	    return [];
	  }
	  function resolveTagName(definition) {
	    var baseTag = definition.extends;
	    for (var i = 0, a; a = definition.ancestry[i]; i++) {
	      baseTag = a.is && a.tag;
	    }
	    definition.tag = baseTag || definition.__name;
	    if (baseTag) {
	      definition.is = definition.__name;
	    }
	  }
	  function resolvePrototypeChain(definition) {
	    if (!Object.__proto__) {
	      var nativePrototype = HTMLElement.prototype;
	      if (definition.is) {
	        var inst = document.createElement(definition.tag);
	        nativePrototype = Object.getPrototypeOf(inst);
	      }
	      var proto = definition.prototype, ancestor;
	      var foundPrototype = false;
	      while (proto) {
	        if (proto == nativePrototype) {
	          foundPrototype = true;
	        }
	        ancestor = Object.getPrototypeOf(proto);
	        if (ancestor) {
	          proto.__proto__ = ancestor;
	        }
	        proto = ancestor;
	      }
	      if (!foundPrototype) {
	        console.warn(definition.tag + " prototype not found in prototype chain for " + definition.is);
	      }
	      definition.native = nativePrototype;
	    }
	  }
	  function instantiate(definition) {
	    return upgradeWithDefinition(domCreateElement(definition.tag), definition);
	  }
	  var registry = {};
	  function getRegisteredDefinition(name) {
	    if (name) {
	      return registry[name.toLowerCase()];
	    }
	  }
	  function registerDefinition(name, definition) {
	    registry[name] = definition;
	  }
	  function generateConstructor(definition) {
	    return function() {
	      return instantiate(definition);
	    };
	  }
	  var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
	  function createElementNS(namespace, tag, typeExtension) {
	    if (namespace === HTML_NAMESPACE) {
	      return createElement(tag, typeExtension);
	    } else {
	      return domCreateElementNS(namespace, tag);
	    }
	  }
	  function createElement(tag, typeExtension) {
	    if (tag) {
	      tag = tag.toLowerCase();
	    }
	    if (typeExtension) {
	      typeExtension = typeExtension.toLowerCase();
	    }
	    var definition = getRegisteredDefinition(typeExtension || tag);
	    if (definition) {
	      if (tag == definition.tag && typeExtension == definition.is) {
	        return new definition.ctor();
	      }
	      if (!typeExtension && !definition.is) {
	        return new definition.ctor();
	      }
	    }
	    var element;
	    if (typeExtension) {
	      element = createElement(tag);
	      element.setAttribute("is", typeExtension);
	      return element;
	    }
	    element = domCreateElement(tag);
	    if (tag.indexOf("-") >= 0) {
	      implementPrototype(element, HTMLElement);
	    }
	    return element;
	  }
	  var domCreateElement = document.createElement.bind(document);
	  var domCreateElementNS = document.createElementNS.bind(document);
	  var isInstance;
	  if (!Object.__proto__ && !useNative) {
	    isInstance = function(obj, ctor) {
	      if (obj instanceof ctor) {
	        return true;
	      }
	      var p = obj;
	      while (p) {
	        if (p === ctor.prototype) {
	          return true;
	        }
	        p = p.__proto__;
	      }
	      return false;
	    };
	  } else {
	    isInstance = function(obj, base) {
	      return obj instanceof base;
	    };
	  }
	  function wrapDomMethodToForceUpgrade(obj, methodName) {
	    var orig = obj[methodName];
	    obj[methodName] = function() {
	      var n = orig.apply(this, arguments);
	      upgradeAll(n);
	      return n;
	    };
	  }
	  wrapDomMethodToForceUpgrade(Node.prototype, "cloneNode");
	  wrapDomMethodToForceUpgrade(document, "importNode");
	  document.registerElement = register;
	  document.createElement = createElement;
	  document.createElementNS = createElementNS;
	  scope.registry = registry;
	  scope.instanceof = isInstance;
	  scope.reservedTagList = reservedTagList;
	  scope.getRegisteredDefinition = getRegisteredDefinition;
	  document.register = document.registerElement;
	});

	(function(scope) {
	  var useNative = scope.useNative;
	  var initializeModules = scope.initializeModules;
	  var isIE = scope.isIE;
	  if (useNative) {
	    var nop = function() {};
	    scope.watchShadow = nop;
	    scope.upgrade = nop;
	    scope.upgradeAll = nop;
	    scope.upgradeDocumentTree = nop;
	    scope.upgradeSubtree = nop;
	    scope.takeRecords = nop;
	    scope.instanceof = function(obj, base) {
	      return obj instanceof base;
	    };
	  } else {
	    initializeModules();
	  }
	  var upgradeDocumentTree = scope.upgradeDocumentTree;
	  var upgradeDocument = scope.upgradeDocument;
	  if (!window.wrap) {
	    if (window.ShadowDOMPolyfill) {
	      window.wrap = window.ShadowDOMPolyfill.wrapIfNeeded;
	      window.unwrap = window.ShadowDOMPolyfill.unwrapIfNeeded;
	    } else {
	      window.wrap = window.unwrap = function(node) {
	        return node;
	      };
	    }
	  }
	  if (window.HTMLImports) {
	    window.HTMLImports.__importsParsingHook = function(elt) {
	      if (elt.import) {
	        upgradeDocument(wrap(elt.import));
	      }
	    };
	  }
	  function bootstrap() {
	    upgradeDocumentTree(window.wrap(document));
	    window.CustomElements.ready = true;
	    var requestAnimationFrame = window.requestAnimationFrame || function(f) {
	      setTimeout(f, 16);
	    };
	    requestAnimationFrame(function() {
	      setTimeout(function() {
	        window.CustomElements.readyTime = Date.now();
	        if (window.HTMLImports) {
	          window.CustomElements.elapsed = window.CustomElements.readyTime - window.HTMLImports.readyTime;
	        }
	        document.dispatchEvent(new CustomEvent("WebComponentsReady", {
	          bubbles: true
	        }));
	      });
	    });
	  }
	  if (document.readyState === "complete" || scope.flags.eager) {
	    bootstrap();
	  } else if (document.readyState === "interactive" && !window.attachEvent && (!window.HTMLImports || window.HTMLImports.ready)) {
	    bootstrap();
	  } else {
	    var loadEvent = window.HTMLImports && !window.HTMLImports.ready ? "HTMLImportsLoaded" : "DOMContentLoaded";
	    window.addEventListener(loadEvent, bootstrap);
	  }
	})(window.CustomElements);

	(function(scope) {
	  var style = document.createElement("style");
	  style.textContent = "" + "body {" + "transition: opacity ease-in 0.2s;" + " } \n" + "body[unresolved] {" + "opacity: 0; display: block; overflow: hidden; position: relative;" + " } \n";
	  var head = document.querySelector("head");
	  head.insertBefore(style, head.firstChild);
	})(window.WebComponents);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _SReadMoreComponent = __webpack_require__(3);

	var _SReadMoreComponent2 = _interopRequireDefault(_SReadMoreComponent);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.default = _SReadMoreComponent2.default.define('s-read-more', _SReadMoreComponent2.default);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	var _get = function get(object, property, receiver) {
		if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
			var parent = Object.getPrototypeOf(object);if (parent === null) {
				return undefined;
			} else {
				return get(parent, property, receiver);
			}
		} else if ("value" in desc) {
			return desc.value;
		} else {
			var getter = desc.get;if (getter === undefined) {
				return undefined;
			}return getter.call(receiver);
		}
	};

	var _SWebComponent2 = __webpack_require__(4);

	var _SWebComponent3 = _interopRequireDefault(_SWebComponent2);

	var _realHeight = __webpack_require__(97);

	var _realHeight2 = _interopRequireDefault(_realHeight);

	var _getStyleProperty = __webpack_require__(98);

	var _getStyleProperty2 = _interopRequireDefault(_getStyleProperty);

	var _style = __webpack_require__(99);

	var _style2 = _interopRequireDefault(_style);

	var _matches = __webpack_require__(26);

	var _matches2 = _interopRequireDefault(_matches);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var SReadMoreComponent = function (_SWebComponent) {
		_inherits(SReadMoreComponent, _SWebComponent);

		function SReadMoreComponent() {
			_classCallCheck(this, SReadMoreComponent);

			return _possibleConstructorReturn(this, (SReadMoreComponent.__proto__ || Object.getPrototypeOf(SReadMoreComponent)).call(this));
		}

		/**
	  * Default props
	  * @definition 		SWebComponent.getDefaultProps
	  */

		_createClass(SReadMoreComponent, [{
			key: 'componentWillMount',

			/**
	   * Component will mount
	   * @definition 		SWebComponent.componentWillMount
	   */
			value: function componentWillMount() {
				_get(SReadMoreComponent.prototype.__proto__ || Object.getPrototypeOf(SReadMoreComponent.prototype), 'componentWillMount', this).call(this);
				this._targetedHeight;
			}

			/**
	   * Mount component
	   * @definition 		SWebComponent.componentMount
	   */

		}, {
			key: 'componentMount',
			value: function componentMount() {
				var _this2 = this;

				_get(SReadMoreComponent.prototype.__proto__ || Object.getPrototypeOf(SReadMoreComponent.prototype), 'componentMount', this).call(this);

				// update targeted and original height
				this._updateTargetedAndOriginalHeight();

				// listen for click on the element
				this.addEventListener('click', this._onClick.bind(this));

				// check threshold
				this._checkThreshold();

				// listen for update read more
				this.addEventListener('update:height', function (e) {
					_this2._updateTargetedAndOriginalHeight();
					_this2._checkThreshold();
				});

				// listen for content mutation
				this._listenMutations();
			}

			/**
	   * Component unmount
	   * @definition 		SWebComponent.componentUnmount
	   */

		}, {
			key: 'componentUnmount',
			value: function componentUnmount() {
				_get(SReadMoreComponent.prototype.__proto__ || Object.getPrototypeOf(SReadMoreComponent.prototype), 'componentUnmount', this).call(this);
				if (this._sReadMoreMutationObserver) {
					this._sReadMoreMutationObserver.disconnect();
				}
			}

			/**
	   * Component will receive prop
	   * @definition 		SWebComponent.componentWillReceiveProp
	   */

		}, {
			key: 'componentWillReceiveProp',
			value: function componentWillReceiveProp(name, newVal, oldVal) {
				switch (name) {
					case 'height':
						this._targetedHeight = newVal;
						this._checkThreshold();
						break;
				}
			}

			/**
	   * Listen mutations
	   */

		}, {
			key: '_listenMutations',
			value: function _listenMutations() {
				var _this3 = this;

				var mutationTimeout = null;
				this._sReadMoreMutationObserver = new MutationObserver(function (mutations) {
					//let render = false;
					// mutations.forEach((mutation) => {
					// 	let parentNode = mutation.target.parentNode;
					// 	if (mutation.target.nodeName === '#text') {
					// 		parentNode = parentNode.parentNode;
					// 	}
					// 	if ( mutation.target !== this && ( ! parentNode || parentNode === this)) render = true;
					// });
					clearTimeout(mutationTimeout);
					mutationTimeout = setTimeout(function () {
						// update targeted and original height
						_this3._updateTargetedAndOriginalHeight();
						// check threshold
						_this3._checkThreshold();
						// render
						_this3.render();
					});
				});
				this._sReadMoreMutationObserver.observe(this, {
					childList: true,
					subtree: true,
					characterData: true
				});
			}

			/**
	   * On click on the read more
	   */

		}, {
			key: '_onClick',
			value: function _onClick(e) {
				if (e.target !== this) return;
				// toggle the active state
				if (this.isActive()) this.unactivate();else this.activate();
			}

			/**
	   * Update targeted and original height
	   */

		}, {
			key: '_updateTargetedAndOriginalHeight',
			value: function _updateTargetedAndOriginalHeight() {
				// check if has an targeted height
				if (!this._targetedHeight) {
					var targetedHeight = this.props.height || this.style.maxHeight || (0, _getStyleProperty2.default)(this, 'maxHeight');
					if (targetedHeight === 'none') {
						targetedHeight = null;
					}
					if (targetedHeight) {
						targetedHeight = parseFloat(targetedHeight);
					}
					this._targetedHeight = targetedHeight;
				}

				// check the actual height of the target
				var realHeight = (0, _realHeight2.default)(this);
				this._originalHeight = realHeight;
			}

			/**
	   * Check threshold to disable the read more if needed
	   */

		}, {
			key: '_checkThreshold',
			value: function _checkThreshold() {
				// check if the targetedHeight is lower that the actual height
				if (this._targetedHeight + this.props.threshold >= this._originalHeight) {
					// disable the component
					this.setProp('disabled', true);
				} else {
					this.setProp('disabled', false);
				}
			}
		}, {
			key: 'activate',

			/**
	   * Activate
	   */
			value: function activate() {
				this.setProp('active', true);
			}

			/**
	   * Unactivate
	   */

		}, {
			key: 'unactivate',
			value: function unactivate() {
				this.setProp('active', false);
			}

			/**
	   * Return if the read more is activate or not
	   */

		}, {
			key: 'isActive',
			value: function isActive() {
				return this.props.active;
			}

			/**
	   * Render the component
	   * @definition 		SWebComponent.render
	   */

		}, {
			key: 'render',
			value: function render() {
				var _this4 = this;

				if (!this.props.disabled) {
					if (this.props.active) {
						setTimeout(function () {
							// open the read more
							(0, _style2.default)(_this4, {
								maxHeight: _this4._originalHeight + _this4._originalHeight / 100 * 10 + 'px'
							});
						});
					} else {
						(0, _style2.default)(this, {
							maxHeight: this._targetedHeight + 'px'
						});
					}
				} else {
					(0, _style2.default)(this, {
						maxHeight: null
					});
				}
			}
		}, {
			key: 'active',
			set: function set(value) {
				if (value) this.activate();else this.unactivate();
			},
			get: function get() {
				return this.isActive();
			}
		}], [{
			key: 'css',

			/**
	   * Css
	   */
			value: function css(componentName, componentNameDash) {
				return '\n\t\t\t' + componentNameDash + ' {\n\t\t\t\toverflow : hidden;\n\t\t\t\tdisplay : block;\n\t\t\t}\n\t\t';
			}
		}, {
			key: 'defaultProps',
			get: function get() {
				return {
					/**
	     * Set the threshold difference height between the content and the
	     * actual read more size under which the read more will not been enabled
	     * @prop
	     * @type 		{Number}
	     */
					threshold: 0,

					active: false,

					disabled: false,

					height: null

				};
			}
		}, {
			key: 'physicalProps',
			get: function get() {
				return ['disabled', 'active'];
			}
		}]);

		return SReadMoreComponent;
	}(_SWebComponent3.default);

	exports.default = SReadMoreComponent;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _mixwith = __webpack_require__(5);

	var _SWebComponentMixin = __webpack_require__(6);

	var _SWebComponentMixin2 = _interopRequireDefault(_SWebComponentMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	if (typeof HTMLElement !== 'function') {
		var _HTMLElement = function _HTMLElement() {};
		_HTMLElement.prototype = HTMLElement.prototype;
		HTMLElement = _HTMLElement;
	}

	var SWebComponent = function (_mix$with) {
		_inherits(SWebComponent, _mix$with);

		/**
	  * Constructor
	  */
		function SWebComponent() {
			_classCallCheck(this, SWebComponent);

			return _possibleConstructorReturn(this, _mix$with.call(this));
		}

		return SWebComponent;
	}((0, _mixwith.mix)(HTMLElement).with(_SWebComponentMixin2.default));

	exports.default = SWebComponent;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports);
	    global.mixwith = mod.exports;
	  }
	})(undefined, function (exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  var _appliedMixin = '__mixwith_appliedMixin';

	  var apply = exports.apply = function (superclass, mixin) {
	    var application = mixin(superclass);
	    application.prototype[_appliedMixin] = unwrap(mixin);
	    return application;
	  };

	  var isApplicationOf = exports.isApplicationOf = function (proto, mixin) {
	    return proto.hasOwnProperty(_appliedMixin) && proto[_appliedMixin] === unwrap(mixin);
	  };

	  var hasMixin = exports.hasMixin = function (o, mixin) {
	    while (o != null) {
	      if (isApplicationOf(o, mixin)) return true;
	      o = Object.getPrototypeOf(o);
	    }
	    return false;
	  };

	  var _wrappedMixin = '__mixwith_wrappedMixin';

	  var wrap = exports.wrap = function (mixin, wrapper) {
	    Object.setPrototypeOf(wrapper, mixin);
	    if (!mixin[_wrappedMixin]) {
	      mixin[_wrappedMixin] = mixin;
	    }
	    return wrapper;
	  };

	  var unwrap = exports.unwrap = function (wrapper) {
	    return wrapper[_wrappedMixin] || wrapper;
	  };

	  var _cachedApplications = '__mixwith_cachedApplications';

	  var Cached = exports.Cached = function (mixin) {
	    return wrap(mixin, function (superclass) {
	      // Get or create a symbol used to look up a previous application of mixin
	      // to the class. This symbol is unique per mixin definition, so a class will have N
	      // applicationRefs if it has had N mixins applied to it. A mixin will have
	      // exactly one _cachedApplicationRef used to store its applications.

	      var cachedApplications = superclass[_cachedApplications];
	      if (!cachedApplications) {
	        cachedApplications = superclass[_cachedApplications] = new Map();
	      }

	      var application = cachedApplications.get(mixin);
	      if (!application) {
	        application = mixin(superclass);
	        cachedApplications.set(mixin, application);
	      }

	      return application;
	    });
	  };

	  var DeDupe = exports.DeDupe = function (mixin) {
	    return wrap(mixin, function (superclass) {
	      return hasMixin(superclass.prototype, mixin) ? superclass : mixin(superclass);
	    });
	  };

	  var HasInstance = exports.HasInstance = function (mixin) {
	    if (Symbol && Symbol.hasInstance && !mixin[Symbol.hasInstance]) {
	      Object.defineProperty(mixin, Symbol.hasInstance, {
	        value: function value(o) {
	          return hasMixin(o, mixin);
	        }
	      });
	    }
	    return mixin;
	  };

	  var BareMixin = exports.BareMixin = function (mixin) {
	    return wrap(mixin, function (s) {
	      return apply(s, mixin);
	    });
	  };

	  var Mixin = exports.Mixin = function (mixin) {
	    return DeDupe(Cached(BareMixin(mixin)));
	  };

	  var mix = exports.mix = function (superclass) {
	    return new MixinBuilder(superclass);
	  };

	  var MixinBuilder = function () {
	    function MixinBuilder(superclass) {
	      _classCallCheck(this, MixinBuilder);

	      this.superclass = superclass || function () {
	        function _class() {
	          _classCallCheck(this, _class);
	        }

	        return _class;
	      }();
	    }

	    _createClass(MixinBuilder, [{
	      key: 'with',
	      value: function _with() {
	        for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
	          mixins[_key] = arguments[_key];
	        }

	        return mixins.reduce(function (c, m) {
	          return m(c);
	        }, this.superclass);
	      }
	    }]);

	    return MixinBuilder;
	  }();
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _mixwith = __webpack_require__(5);

	var _autoCast = __webpack_require__(7);

	var _autoCast2 = _interopRequireDefault(_autoCast);

	var _camelize = __webpack_require__(8);

	var _camelize2 = _interopRequireDefault(_camelize);

	var _uniqid = __webpack_require__(9);

	var _uniqid2 = _interopRequireDefault(_uniqid);

	var _upperFirst = __webpack_require__(10);

	var _upperFirst2 = _interopRequireDefault(_upperFirst);

	var _sSettings = __webpack_require__(11);

	var _sSettings2 = _interopRequireDefault(_sSettings);

	var _fastdom = __webpack_require__(15);

	var _fastdom2 = _interopRequireDefault(_fastdom);

	var _dispatchEvent = __webpack_require__(16);

	var _dispatchEvent2 = _interopRequireDefault(_dispatchEvent);

	var _whenInViewport = __webpack_require__(19);

	var _whenInViewport2 = _interopRequireDefault(_whenInViewport);

	var _whenVisible = __webpack_require__(20);

	var _whenVisible2 = _interopRequireDefault(_whenVisible);

	var _matches = __webpack_require__(26);

	var _matches2 = _interopRequireDefault(_matches);

	var _closest = __webpack_require__(27);

	var _closest2 = _interopRequireDefault(_closest);

	var _whenAttribute = __webpack_require__(28);

	var _whenAttribute2 = _interopRequireDefault(_whenAttribute);

	var _propertyProxy = __webpack_require__(44);

	var _propertyProxy2 = _interopRequireDefault(_propertyProxy);

	var _domReady = __webpack_require__(12);

	var _domReady2 = _interopRequireDefault(_domReady);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	if (!window.sugar) window.sugar = {};
	if (!window.sugar._webComponentsStack) window.sugar._webComponentsStack = {};
	if (!window.sugar._webComponentsDefaultPropsStack) window.sugar._webComponentsDefaultPropsStack = {};
	if (!window.sugar._templateWebComponents) window.sugar._templateWebComponents = {};
	if (!window.sugar._webComponentCss) window.sugar._webComponentCss = {};

	exports.default = (0, _mixwith.Mixin)(function (superclass) {
		return function (_superclass) {
			_inherits(_class2, _superclass);

			function _class2() {
				var _temp, _this, _ret;

				_classCallCheck(this, _class2);

				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				return _ret = (_temp = (_this = _possibleConstructorReturn(this, _superclass.call.apply(_superclass, [this].concat(args))), _this), _this.props = {}, _temp), _possibleConstructorReturn(_this, _ret);
			}

			/**
	   * Define the new web component
	   * @param 			{String} 			name 		The name of the component
	   * @param 			{SWebComponent} 	component 	The component class
	   */
			_class2.define = function define(name, component) {
				var ext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				var componentName = (0, _upperFirst2.default)((0, _camelize2.default)(name));
				var componentNameDash = name;
				window.sugar._webComponentsStack[componentName] = component;

				// register the webcomponent
				var webcomponent = void 0;
				if (document.registerElement) {
					webcomponent = document.registerElement(name, {
						prototype: component.prototype,
						extends: ext
					});
				} else if (window.customElements) {
					webcomponent = window.customElements.define(name, component, {
						extends: ext
					});
				} else {
					throw 'Your browser does not support either document.registerElement or window.customElements.define webcomponents specification...';
				}

				// fix for firefox and surely other crapy browser...
				// this make sur that the (static) methods of the component
				// are present on the webcomponent itself
				Object.keys(component).forEach(function (key) {
					if (!webcomponent[key]) {
						webcomponent[key] = component[key];
					}
				});

				// handle css
				component._injectCss(component, componentName, componentNameDash);

				// return the webcomponent instance
				return webcomponent;
			};

			/**
	   * Inject css into html
	   * @param 		{String} 		componentName 		The component name
	   * @param 		{String} 		componentNameDash 	The dash formated component name
	   */


			_class2._injectCss = function _injectCss(componentClass, componentName, componentNameDash) {
				// __domReady().then(() => {
				// check if component has a css to be injected into the page
				if (window.sugar._webComponentCss[componentName] === undefined) {
					var css = '';
					var comp = componentClass;
					while (comp) {
						if (comp.css) {
							css += comp.css(componentName, componentNameDash);
						}
						comp = Object.getPrototypeOf(comp);
					}
					if (css) {
						css = css.replace(/[\s]+/g, ' ');
						window.sugar._webComponentCss[componentName] = css;
						// fastdom.mutate(() => {
						var styleElm = document.createElement('style');
						styleElm.setAttribute('name', componentName);
						styleElm.innerHTML = css;
						document.head.appendChild(styleElm);
						// });
					} else {
						window.sugar._webComponentCss[componentName] = false;
					}
				}
				// });
			};

			/**
	   * Store all the props of the component
	   * Props are actual computed props with attributes
	   * @type 		{Object}
	   */


			_class2.setDefaultProps = function setDefaultProps(props) {
				var tagname = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				// if a tagname is specified, we store the default props for a
				// particular tagname
				if (tagname) {
					tagname = [].concat(tagname);
					tagname.forEach(function (tag) {
						tag = (0, _upperFirst2.default)((0, _camelize2.default)(tag));
						window.sugar._webComponentsDefaultPropsStack[tag] = _extends({}, window.sugar._webComponentsDefaultPropsStack[tag] || {}, props);
					});
				} else {
					var proto = this;
					proto._defaultProps = _extends({}, proto._defaultProps || {}, props);
				}
			};

			/**
	   * Get the default props for this particular instance
	   * @return 		{Object} 			The default props
	   */


			/**
	   * Component css
	   */
			_class2.css = function css(componentName, componentNameDash) {
				return '';
			};

			/**
	   * Method called before the component will be added in the dom.
	   * You will not have access to the siblings, etc here.
	   * This is the place to init your component, just like a constructor
	   *
	   * @example
	   * componentWillMount() {
	   * 		// call parent method
	   * 		super.componentWillMount();
	   * 		// do something here...
	   * }
	   *
	   * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	   */
			_class2.prototype.componentWillMount = function componentWillMount() {
				var _this2 = this;

				// dispatch event
				this.onComponentWillMount && this.onComponentWillMount();
				this.dispatchComponentEvent('componentWillMount');

				// internal properties
				this._nextPropsStack = {};
				this._prevPropsStack = {};
				this._nextPropsTimeout = null;
				this._componentMounted = false;
				this._componentAttached = false;
				this._fastdomSetProp = null;

				// set the componentName
				var sourceName = this.getAttribute('is') || this.tagName.toLowerCase();
				this._componentNameDash = sourceName;
				this._componentName = (0, _upperFirst2.default)((0, _camelize2.default)(sourceName));

				// save each instances into the element _sComponents stack
				this._typeOf = [];
				var comp = window.sugar._webComponentsStack[this._componentName];
				while (comp) {
					var funcNameRegex = /function (.{1,})\(/;
					var res = funcNameRegex.exec(comp.toString());
					if (res && res[1]) {
						if (this._typeOf.indexOf(res[1]) === -1) {
							this._typeOf.push(res[1]);
						}
					}
					comp = Object.getPrototypeOf(comp);
				}

				// default props init
				this.props = Object.assign({}, this.defaultProps);

				// compute props
				this._computeProps();

				// props proxy
				// this._initPropsProxy();

				// check the required props
				this.requiredProps.forEach(function (prop) {
					if (!_this2.props[prop]) {
						throw 'The "' + _this2._componentNameDash + '" component need the "' + prop + '" property in order to work';
					}
				});
			};

			/**
	   * Method called right after that the component has been added in the dom,
	   * and before the initial render
	   * This is the first place where you will have access to the dom.
	   *
	   * @example
	   * componentMount() {
	   * 		// call parent method
	   * 		super.componentMount();
	   * 		// do something here...
	   * }
	   *
	   * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	   */


			_class2.prototype.componentMount = function componentMount() {
				// update the status
				this._componentMounted = true;
				// dispatch event
				this.onComponentMount && this.onComponentMount();
				this.dispatchComponentEvent('componentMount');
			};

			/**
	   * Method called after the initial component render
	   *
	   * @example
	   * componentDidMount() {
	   * 		// call parent method
	   * 		super.componentDidMount();
	   * 		// do something here...
	   * }
	   *
	   * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	   */


			_class2.prototype.componentDidMount = function componentDidMount() {
				// dispatch event
				this.onComponentDidMount && this.onComponentDidMount();
				this.dispatchComponentEvent('componentDidMount');
			};

			/**
	   * Method called right before the render when some props have been updated.
	   * This method is not called before the initial render
	   *
	   * @param 		{Object} 		nextProps 			An object that represent the props that have been updated
	   * @param 		{Array} 		nextPropsArray 		An array representation of the nextProps object [{name:...,value:...}]
	   *
	   * @example
	   * componentWillUpdate() {
	   * 		// call parent method
	   * 		super.componentWillUpdate();
	   * 		// do something here...
	   * }
	   *
	   * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	   */


			_class2.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
				// dispatch event
				this.onComponentWillUpdate && this.onComponentWillUpdate(nextProps);
				this.dispatchComponentEvent('componentWillUpdate', nextProps);
			};

			/**
	   * Apply all the updated that you need in the dom for the component to reflect the props
	   *
	   * @example
	   * render() {
	   * 		// call the parent method
	   * 		super.render();
	   * 		// apply some classes, properties, styles, etc... in the dom
	   * 		// in order to reflect the props object state
	   * }
	   *
	   * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	   */


			_class2.prototype.render = function render() {
				// dispatch event
				this.onComponentRender && this.onComponentRender();
				this.dispatchComponentEvent('componentRender');
			};

			_class2.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
				// dispatch event
				this.onComponentDidUpdate && this.onComponentDidUpdate(prevProps);
				this.dispatchComponentEvent('componentDidUpdate', prevProps);
			};

			_class2.prototype.componentWillUnmount = function componentWillUnmount() {
				// dispatch event
				this.onComponentWillUnmount && this.onComponentWillUnmount();
				this.dispatchComponentEvent('componentWillUnmount');
			};

			_class2.prototype.componentUnmount = function componentUnmount() {
				// update the status
				this._componentMounted = false;
				// dispatch event
				this.onComponentUnmount && this.onComponentUnmount();
				this.dispatchComponentEvent('componentUnmount');
			};

			_class2.prototype.componentDidUnmount = function componentDidUnmount() {
				// dispatch event
				this.onComponentDidUnmount && this.onComponentDidUnmount();
				this.dispatchComponentEvent('componentDidUnmount');
			};

			/**
	   * When the component is created
	   */


			_class2.prototype.createdCallback = function createdCallback() {
				// component will mount only if part of the active document
				this.componentWillMount();
			};

			/**
	   * When the element is attached
	   */


			_class2.prototype.attachedCallback = function attachedCallback() {
				var _this3 = this;

				// update attached status
				this._componentAttached = true;

				// wait until dependencies are ok
				this._whenMountDependenciesAreOk().then(function () {
					// switch on the mountWhen prop
					switch (_this3.props.mountWhen) {
						case 'inViewport':
							(0, _whenInViewport2.default)(_this3).then(function () {
								_this3._mountComponent();
							});
							break;
						case 'mouseover':
							_this3.addEventListener('mouseover', _this3._onMouseoverComponentMount.bind(_this3));
							break;
						case 'isVisible':
							(0, _whenVisible2.default)(_this3).then(function () {
								_this3._mountComponent();
							});
							break;
						default:
							// mount component directly
							_this3._mountComponent();
							break;
					}
				});
			};

			/**
	   * When mount dependencies
	   * @return 			{Promise} 				A promise that will be resolved when the dependencies are resolved
	   */


			_class2.prototype._whenMountDependenciesAreOk = function _whenMountDependenciesAreOk() {
				var _this4 = this;

				var promise = new Promise(function (resolve, reject) {
					if (!_this4.mountDependencies.length) {
						resolve();
					} else {
						// resolve all the promises
						Promise.all(_this4.mountDependencies).then(function () {
							resolve();
						});
					}
				});
				return promise;
			};

			/**
	   * Init props proxy.
	   * This will create a getter/setter accessor on the item itself
	   * that get and update his corresponding props.{name} property
	   */


			_class2.prototype._initPropsProxy = function _initPropsProxy() {
				var _this5 = this;

				var _loop = function _loop(key) {
					(0, _propertyProxy2.default)(_this5, key, {
						get: function get() {
							return _this5.props[key];
						},
						set: function set(value) {
							_this5.setProp(key, value);
						}
					});
				};

				// loop on each props
				for (var key in this.props) {
					_loop(key);
				}
			};

			/**
	   * On mouse over
	   */


			_class2.prototype._onMouseoverComponentMount = function _onMouseoverComponentMount() {
				this._mountComponent();
				this.removeEventListener('mouseover', this._onMouseoverComponentMount);
			};

			/**
	  * Internal mount component method
	  */


			_class2.prototype._mountComponent = function _mountComponent() {
				var _this6 = this;

				// wait next frame
				this.mutate(function () {
					// sometimes, the component has been unmounted between the
					// fastdom execution, so we stop here if it's the case
					if (!_this6._componentAttached) return;
					// init
					_this6.componentMount();
					// render
					_this6.render();
					// component did mount
					_this6.componentDidMount();
				});
			};

			/**
	  * When the component is detached
	  */


			_class2.prototype.detachedCallback = function detachedCallback() {
				var _this7 = this;

				// update attached status
				this._componentAttached = false;
				// will unmount
				this.componentWillUnmount();
				// wait next frame
				this.mutate(function () {
					// unmount only if the component is mounted
					if (!_this7._componentMounted) return;
					// unmount
					_this7.componentUnmount();
					// did unmount
					_this7.componentDidUnmount();
				});
			};

			/**
	   * When any of the component attribute changes
	   */


			_class2.prototype.attributeChangedCallback = function attributeChangedCallback(attribute, oldVal, newVal) {
				// cast the new val
				newVal = (0, _autoCast2.default)(newVal);

				var _attribute = attribute;

				// process the attribute to camelCase
				attribute = (0, _camelize2.default)(attribute);

				// do nothing if the value is already the same
				if (this.props[attribute] === newVal) return;

				// when the prop is false
				// and the element has not this attribute
				// we assume that the prop will stay to false
				if (this.props[attribute] === false && !this.hasAttribute(_attribute)) {
					return;
				}

				// if there's no new value but that the element has
				// the attribute on itself, we assume the newVal
				// is equal to true
				if (!newVal && newVal !== 0
				// && ! this.props[attribute]
				&& newVal !== 'false' && newVal !== 'null' && this.hasAttribute(_attribute)) {
					this.setProp(attribute, true);
					return;
				}

				// set the new prop
				this.setProp(attribute, newVal);
			};

			/**
	   * Dispatch an event from the tag with namespaced event name
	   * This will dispatch actually two events :
	   * 1. {tagName}.{name} : example : s-datepicker.change
	   * 2. {name} 		   : example : change
	   *
	   * @param		{String} 		name 		The event name
	   * @param 		{Mixed} 		data 		Some data to attach to the event
	   */


			_class2.prototype.dispatchComponentEvent = function dispatchComponentEvent(name) {
				var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				(0, _dispatchEvent2.default)(this, name, data);
				(0, _dispatchEvent2.default)(this, this.tagName.toLowerCase() + '.' + name, data);
			};

			/**
	   * Set properties
	   */


			_class2.prototype.setProps = function setProps() {
				var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// set each props
				for (var key in props) {
					this.setProp(key, props[key]);
				}
				return this;
			};

			/**
	   * Set a property
	   */


			_class2.prototype.setProp = function setProp(prop, value) {
				var _this8 = this;

				// save the oldVal
				var _oldVal = this.props[prop];

				// stop if same value
				if (_oldVal === value) return;

				// set the prop
				this.props[prop] = value;

				// handle physical props
				this._handlePhysicalProps(prop, value);

				// if the component is not mounted
				// we do nothing here...
				if (!this.isComponentMounted()) return;

				// create the stacks
				this._prevPropsStack[prop] = _oldVal;
				this._nextPropsStack[prop] = value;

				// component will receive prop
				if (this.componentWillReceiveProp) {
					this.componentWillReceiveProp(prop, value, _oldVal);
				}

				// wait till next frame
				_fastdom2.default.clear(this._fastdomSetProp);
				this._fastdomSetProp = _fastdom2.default.mutate(function () {

					// create array version of each stacks
					var nextPropsArray = [],
					    prevPropsArray = [];
					for (var key in _this8._nextPropsStack) {
						var val = _this8._nextPropsStack[key];
						nextPropsArray.push({
							name: key,
							value: val
						});
					}
					for (var _key2 in _this8._prevPropsStack) {
						var _val = _this8._prevPropsStack[_key2];
						prevPropsArray.push({
							name: _key2,
							value: _val
						});
					}

					// call the will reveiveProps if exist
					if (_this8.componentWillReceiveProps) {
						_this8.componentWillReceiveProps(_this8._nextPropsStack, nextPropsArray);
					}

					// should component update
					if (_this8.shouldComponentUpdate && !_this8.shouldComponentUpdate(_this8._nextPropsStack, nextPropsArray)) return;

					// component will update
					_this8.componentWillUpdate(_this8._nextPropsStack, nextPropsArray);

					// render the component
					_this8.render();

					// component did update
					_this8.componentDidUpdate(_this8._prevPropsStack, prevPropsArray);
				});
			};

			/**
	   * Check if component is mounted
	   * @return 			{Boolean} 			true if mounted, false if not
	   */


			_class2.prototype.isComponentMounted = function isComponentMounted() {
				return this._componentMounted;
			};

			/**
	   * Handle physical props by setting or not the prop
	   * on the dom element as attribute
	   */


			_class2.prototype._handlePhysicalProps = function _handlePhysicalProps(prop, value) {
				// check if is a physical prop to set it in the dom
				var physicalProps = this.physicalProps;
				if (physicalProps.indexOf(prop) !== -1) {
					// set the prop on the node
					if (value !== 0 && (value === false || value === 'null' || !value)) {
						this.removeAttribute(prop);
					} else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
						this.setAttribute(prop, JSON.stringify(value));
					} else if (typeof value === 'function') {
						this.setAttribute(prop, 'fn');
					} else {
						this.setAttribute(prop, value);
					}
				}
			};

			/**
	   * Compute props by mixing settings with attributes presents on the component
	   */


			_class2.prototype._computeProps = function _computeProps() {
				for (var i = 0; i < this.attributes.length; i++) {
					var attr = this.attributes[i];
					if (!attr.value) {
						// the attribute has no value but it is present
						// so we assume the prop value is true
						this.props[(0, _camelize2.default)(attr.name)] = true;
						continue;
					}
					// cast the value
					this.props[(0, _camelize2.default)(attr.name)] = (0, _autoCast2.default)(attr.value);
				}

				// handle physicalProps
				for (var key in this.props) {
					var value = this.props[key];
					// handle physical props
					this._handlePhysicalProps(key, value);
				}
			};

			/**
	   * Mutate the dom using an optimize requestAnimationFrame technique
	   * @param 		{Function} 		cb 			The callback to exexute
	   */


			_class2.prototype.mutate = function mutate(cb) {
				return _fastdom2.default.mutate(cb);
			};

			/**
	   * componentClassName
	   * Set a class that will be construct with the componentNameDash,
	   * an optional element and modifier
	   * @param 	{String} 	[element=null] 		The element name
	   * @param 	{String} 	[modifier=null] 	The modifier name
	   * @param 	{String} 	[state=null] 		The state name
	   * @return 	{String} 						The generated class
	   */


			_class2.prototype.componentClassName = function componentClassName() {
				var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
				var modifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				// if the method is BEM
				var sel = this._componentNameDash;
				// @TODO : handle the sSettings at component load
				if (false) {
					if (element) {
						sel += '-' + element;
					}
					if (modifier) {
						sel += '-' + modifier;
					}
					if (state) {
						sel += ' is-' + state;
					}
				} else {
					if (element) {
						sel += '__' + element;
					}
					if (modifier) {
						sel += '--' + modifier;
					}
					if (state) {
						sel += '--' + state;
					}
				}
				return sel;
			};

			/**
	   * Get a component selector class built with the passed element, modifier and state parameters
	   * @param 	{String} 	[element=null] 		The element name
	   * @param 	{String} 	[modifier=null] 	The modifier name
	   * @param 	{String} 	[state=null] 		The state name
	   * @return 	{String} 						The generated class
	   */


			_class2.prototype.componentSelector = function componentSelector() {
				var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
				var modifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				var sel = this.componentClassName(element, modifier, state);
				sel = ('.' + sel).replace(' ', '.');
				return sel;
			};

			/**
	   * hasComponentClass
	   * Check if the passed element has the component class generated by the element and modifier argument
	   * @param 	{HTMLElement} 	elm 				The element to check
	   * @param 	{String} 		[element=null] 		The element name
	   * @param 	{String} 		[modifier=null] 	The modifier name
	   * @param 	{String} 		[state=null] 		The state name
	   * @return 	{Boolean} 							The check result
	   */


			_class2.prototype.hasComponentClass = function hasComponentClass(elm) {
				var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var modifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var state = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				// generate the class
				var cls = this.componentSelector(element, modifier, state);
				var _cls = cls.split('.');
				for (var i = 0; i < _cls.length; i++) {
					var cl = _cls[i];
					if (cl && cl !== '') {
						if (!elm.classList.contains(cl)) {
							return false;
						}
					}
				}
				return true;
			};

			/**
	   * Add a class on the passed element that will be construct with the componentNameDash,
	   * an optional element, modifier and state
	   * @param 	{String} 	[element=null] 		The element name
	   * @param 	{String} 	[modifier=null] 	The modifier name
	   * @param 	{String} 	[state=null] 		The state name
	   * @return 	{SComponent}} 			The component itself
	   */


			_class2.prototype.addComponentClass = function addComponentClass(elm) {
				var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				var _this9 = this;

				var modifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var state = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				// if is an array
				if (elm instanceof Array || elm instanceof NodeList) {
					[].forEach.call(elm, function (el) {
						_this9.addComponentClass(el, element, modifier, state);
					});
					return this;
				}

				// get the component class
				var cls = this.componentSelector(element, modifier, state);
				// loop on each classes to add
				cls.split('.').forEach(function (cl) {
					if (cl && cl !== '') {
						_this9.mutate(function () {
							elm.classList.add(cl);
						});
					}
				});
				// return the instance to maintain chainability
				return this;
			};

			/**
	   * Remove a class on the passed element that will be construct with the componentNameDash,
	   * an optional element, modifier and state
	   * @param 	{String} 	[element=null] 		The element name
	   * @param 	{String} 	[modifier=null] 	The modifier name
	   * @param 	{String} 	[state=null] 		The state name
	   * @return 	{SComponent}} 					The component itself
	   */


			_class2.prototype.removeComponentClass = function removeComponentClass(elm) {
				var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				var _this10 = this;

				var modifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var state = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				// if is an array
				if (elm instanceof Array || elm instanceof NodeList) {
					[].forEach.call(elm, function (el) {
						_this10.removeComponentClass(el, element, modifier, state);
					});
					return this;
				}

				// get the component class
				var cls = this.componentSelector(element, modifier, state);
				// loop on each classes to add
				cls.split('.').forEach(function (cl) {
					if (cl && cl !== '') {
						_this10.mutate(function () {
							elm.classList.remove(cl);
						});
					}
				});
				// return the instance to maintain chainability
				return this;
			};

			_createClass(_class2, [{
				key: 'defaultProps',
				get: function get() {
					var props = window.sugar._webComponentsStack[this._componentName].defaultProps;
					var comp = window.sugar._webComponentsStack[this._componentName];
					while (comp) {
						if (comp.defaultProps) {
							props = _extends({}, comp.defaultProps, props);
						}
						if (comp._defaultProps) {
							props = _extends({}, props, comp._defaultProps);
						}
						comp = Object.getPrototypeOf(comp);
					}
					// extend with default props stored in the component default props stack by tagname
					if (window.sugar._webComponentsDefaultPropsStack[this._componentName]) {
						props = _extends({}, props, window.sugar._webComponentsDefaultPropsStack[this._componentName]);
					}
					return props;
				}

				/**
	    * Return an array of props to set on the dom
	    */

			}, {
				key: 'physicalProps',


				/**
	    * Get physical props for this particular instance
	    * @return 		{Object} 			The physical props array
	    */
				get: function get() {
					var props = window.sugar._webComponentsStack[this._componentName].physicalProps;
					var comp = window.sugar._webComponentsStack[this._componentName];
					while (comp) {
						if (comp.physicalProps) {
							comp.physicalProps.forEach(function (prop) {
								if (props.indexOf(prop) === -1) {
									props.push(prop);
								}
							});
						}
						comp = Object.getPrototypeOf(comp);
					}
					return props;
				}

				/**
	    * Return an array of required props to init the component
	    */

			}, {
				key: 'requiredProps',


				/**
	    * Get the required props array for this particular instance
	    * @return 		{Array} 			An array of required props
	    */
				get: function get() {
					var props = window.sugar._webComponentsStack[this._componentName].requiredProps;
					var comp = window.sugar._webComponentsStack[this._componentName];
					while (comp) {
						if (comp.requiredProps) {
							comp.requiredProps.forEach(function (prop) {
								if (props.indexOf(prop) === -1) {
									props.push(prop);
								}
							});
						}
						comp = Object.getPrototypeOf(comp);
					}
					return props;
				}
			}, {
				key: 'css',
				get: function get() {
					var css = '';
					var comp = window.sugar._webComponentsStack[this._componentName];
					while (comp) {
						if (comp.css) {
							css += comp.css(this._componentName, this._componentNameDash);
						}
						comp = Object.getPrototypeOf(comp);
					}
					return css;
				}

				/**
	    * Return an array of props to set on the dom
	    */

			}, {
				key: 'mountDependencies',


				/**
	    * Get physical props for this particular instance
	    * @return 		{Object} 			The physical props array
	    */
				get: function get() {
					var _this11 = this;

					var deps = window.sugar._webComponentsStack[this._componentName].mountDependencies;
					var comp = window.sugar._webComponentsStack[this._componentName];
					while (comp) {
						if (comp.mountDependencies) {
							comp.mountDependencies.forEach(function (dep) {
								if (typeof dep === 'function') {
									dep = dep.bind(_this11);
									dep = dep();
								}
								if (deps.indexOf(dep) === -1) {
									deps.push(dep);
								}
							});
						}
						comp = Object.getPrototypeOf(comp);
					}
					return deps;
				}
			}], [{
				key: 'defaultProps',


				/**
	    * Return the default props for the component.
	    * Need to take care of the passed props parameter and mix it at the
	    * end of your default props
	    *
	    * @example
	    * getDefaultProps(props = {}) {
	    * 		return super.getDefaultProps({
	    * 			myCoolProp : null,
	    * 			...props
	    * 		});
	    * }
	    *
	    * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	    */
				get: function get() {
					return {
						mountWhen: null
					};
				}
			}, {
				key: 'physicalProps',
				get: function get() {
					return [];
				}
			}, {
				key: 'requiredProps',
				get: function get() {
					return [];
				}
			}, {
				key: 'mountDependencies',
				get: function get() {
					// return [];
					return [function () {
						var _this12 = this;

						return new Promise(function (resolve, reject) {
							var isTemplate = false;
							if (_this12._typeOf.indexOf('STemplateWebComponent')) {
								resolve();
							} else {
								setTimeout(function () {
									resolve();
								});
							}
						});
					}];
				}
			}]);

			return _class2;
		}(superclass);
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = autoCast;
	/**
	 * Auto cast the string into the correct variable type
	 */
	function autoCast(string) {
		// boolean values
		if (string === 'false' || string === 'true' || string === 'undefined' || string === 'null' || !isNaN(string)) {
			return eval(string);
		}
		// array
		if (typeof string === 'string' && string.substr(0, 1) === '[') {
			var val = eval(string);
			if (val instanceof Array) return val;
		}
		// parse json
		if (typeof string === 'string' && string.substr(0, 1) === '{') {
			return eval('(' + string + ')');
		}
		// window. || document.
		if (typeof string === 'string' && (string.indexOf('window.') === 0 || string.indexOf('document.') === 0)) {
			var _val = eval(string);
			if (_val) return _val;
		}
		// return the string if nothing can be casted
		return string;
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = camelize;
	/**
	 * Camelize a string
	 */
	function camelize(text) {
		var res = '';
		res = text.replace(/(?:^|[-_])(\w)/g, function (_, c) {
			return c ? c.toUpperCase() : '';
		});
		res = res.substr(0, 1).toLowerCase() + res.slice(1);
		return res.trim();
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = uniqid;
	var uniqidIdx = 0;
	if (!window.sugar) window.sugar = {};
	if (!window.sugar._uniqid) window.sugar._uniqid = 0;

	/**
	 * Get a uniq id
	 */
	function uniqid() {
		// update uniqid idx
		window.sugar._uniqid++;
		return "s" + window.sugar._uniqid.toString();
		// uniqidIdx++;

		// let ts=String(new Date().getTime()), i = 0, out = '';
		// for(i=0;i<ts.length;i+=2) {
		// 	out+=Number(ts.substr(i, 2)).toString(36);
		// }
		// return ('s' + out + (uniqidIdx * Math.round(Math.random()*9999999)));
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = upperFirst;
	/**
	 * Upper first
	 */
	function upperFirst(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _domReady = __webpack_require__(12);

	var _domReady2 = _interopRequireDefault(_domReady);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// prepare a settings object to store
	// the getted settings from the css
	var settings = {};

	// wait the css to be loaded
	/**
	 * Store all the sugar settings grabed from your scss settings
	 * @type 		{Object}
	 * @name 		settings
	 */

	// imports
	(0, _domReady2.default)(function () {
		var settingsElm = document.createElement('div');
		settingsElm.classList.add('s-settings');
		document.body.appendChild(settingsElm);
		var _settings = window.getComputedStyle(settingsElm, ':after').getPropertyValue('content').trim();
		if (_settings && _settings !== '' && _settings !== 'none') {
			_settings = _settings.replace(/\\"/g, '"');
			// _settings = _settings.replace(/\\\'\\"/g,'"').replace(/\\"\\\'/g,'"');
			// _settings = _settings.replace(/\'\\"/g,'"').replace(/\\"\'/g,'"');
			// _settings = _settings.replace(/'"/g,'"').replace(/"'/g,'"');
			_settings = _settings.slice(1, _settings.length - 1);
			_settings = JSON.parse(_settings);
			Object.assign(settings, _settings);
			// settings = {...settings, ..._settings};
		}
	});

	// export the settings
	module.exports = settings;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = domReady;

	var _stylesheetsReady = __webpack_require__(13);

	var _stylesheetsReady2 = _interopRequireDefault(_stylesheetsReady);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var neededStylesheetsStack = null; /**
	                                    * Wait that the dom is ready before resolving the promise
	                                    * If you need that some css files are loaded before considering the dom as loaded
	                                    * you can add the attribute 's-domready-dependency' on any css link tag
	                                    *
	                                    * @name 		domReady
	                                    * @param 		{Function} 		cb 			An optional callback that will be called when the dom is ready
	                                    * @return 		{Promise} 					A promise that will be resolved when the dom is ready
	                                    *
	                                    * @example  	js
	                                    * import domReady from 'sugarcss/js/dom/domReady'
	                                    * // using callback
	                                    * domReady(() => {
	                                    * 		// do something
	                                    * });
	                                    * // using promise
	                                    * domReady().then(() => {
	                                    * 		// do something
	                                    * });
	                                    *
	                                    * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	                                    */


	function _domReady() {
		var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

		return new Promise(function (resolve, reject) {

			var _domReady = function _domReady() {
				if (!document.body || /(un|ing)/.test(document.readyState)) {
					setTimeout(function () {
						_domReady();
					}, 9);
				} else {

					// grab all the needed stylesheets if not already done
					if (!neededStylesheetsStack) {
						// check in dom if has some needed stylesheets
						neededStylesheetsStack = document.querySelectorAll('link[s-domready-dependency]');
					}

					if (!neededStylesheetsStack.length) {
						if (cb) cb();
						resolve();
					} else {

						(0, _stylesheetsReady2.default)(neededStylesheetsStack, function () {
							// console.log('stylesheets loaded');
							if (cb) cb();
							resolve();
						});
					}
				}
			};
			_domReady();
		});
	}

	var domReadyCallbacks = [];
	var domReadyProcess = false;
	var domIsReady = false;

	function domReady() {
		var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


		return new Promise(function (resolve, reject) {

			// check if the dom is already ready
			if (domIsReady) {
				if (cb) cb();
				resolve();
				return;
			}

			// add the callback to the stack
			domReadyCallbacks.push(function () {
				if (cb) cb();
				resolve();
			});

			// check if already a domReady detecting process
			if (!domReadyProcess) {
				domReadyProcess = true;
				_domReady(function () {
					// update the domIsReady
					domIsReady = true;
					// apply all the callbacks
					domReadyCallbacks.forEach(function (callback) {
						callback();
					});
				});
			}
		});
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = stylesheetsReady;

	var _linkLoaded = __webpack_require__(14);

	var _linkLoaded2 = _interopRequireDefault(_linkLoaded);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Wait until all the HTMLLinkElement's are properly loaded
	 *
	 * @name 		stylesheetsReady
	 * @param 		{Array}<HTMLLinkElement> 		links 			The HTMLLinkElement tags to process
	 * @param 		{Function} 						[cb=null] 		An optional callback function to call when all the links are loaded
	 * @return 		{Promise} 										The promise that will be resolved when all the links are loaded
	 *
	 * @example 	js
	 * import stylesheetsReady from 'sugarcss/js/dom/stylesheetsReady'
	 * stylesheetsReady([
	 * 		myHTMLLinkElement1,
	 * 		myHTMLLinkElement2
	 * ]).then(() => {
	 * 		// do something when all the links are loaded
	 * });
	 *
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function stylesheetsReady(links) {
		var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


		var neededStylesheetsStack = links;
		var neededStylesheetsCount = links.length;
		var loadedStylesheedsCount = 0;
		var loadedStylesheetsCallbacks = [];
		var loadedStylesheedsProcess = false;
		var stylesheetsDependenciesStatus = false;

		return new Promise(function (resolve, reject) {

			if (stylesheetsDependenciesStatus) {
				cb !== null && cb();
				resolve();
				return;
			}

			// check if has some needed stylesheeds
			if (!neededStylesheetsCount) {
				// update the stylesheetsDependenciesStatus
				stylesheetsDependenciesStatus = true;
				// no dependencies or already loaded
				cb !== null && cb();
				resolve();
				return;
			}

			// add the callback into the loaded stylesheets stack
			// add the the callback stack
			loadedStylesheetsCallbacks.push(function () {
				cb !== null && cb();
				resolve();
			});

			// check if already a process of checking for loaded
			// stylesheets
			if (!loadedStylesheedsProcess) {

				// update the status
				loadedStylesheedsProcess = true;

				if (neededStylesheetsStack.length) {
					[].forEach.call(neededStylesheetsStack, function (link) {
						// check loaded
						(0, _linkLoaded2.default)(link).then(function (link) {
							// update the loaded stylesheet count
							loadedStylesheedsCount++;
							// check if all stylesheets has been loaded
							if (loadedStylesheedsCount >= neededStylesheetsCount) {

								// update the stylesheetsDependenciesStatus
								stylesheetsDependenciesStatus = true;
								// loop on all the loadedStylesheetsCallbacks
								loadedStylesheetsCallbacks.forEach(function (callback) {
									// apply the callback
									callback();
								});
							}
						}, function (error) {
							// something goes wrong...
							console.error('The following link as not been loaded properly...', error);
						});
					});
				}
			}
		});
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = linkLoaded;
	/**
	 * Wait until the passed HTMLLinkElement is fully loaded
	 *
	 * @name 		linkLoaded
	 * @param 		{HTMLLinkElement} 			link  		The link tag to check the loading state
	 * @param 		{Function}					[cb=null] 	An optional callback to call
	 * @return 		{Promise} 								The promise that will be resolved
	 *
	 * @example  	js
	 * import linkLoaded from 'sugarcss/js/dom/linkLoaded'
	 * linkLoaded(myCoolHTMLLinlElement).then((link) => {
	 * 		// do something when the link is loaded
	 * });
	 *
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function alreadyLoaded(link) {
		var href = link.href;
		var result = false;
		for (var i = 0; i < document.styleSheets.length; i++) {
			if (document.styleSheets[i].href && document.styleSheets[i].href.match(href)) {
				if (!document.styleSheets[i].cssRules || document.styleSheets[i].cssRules.length == 0) {
					// Fallback. There is a request for the css file, but it failed.
					break;
				}
				// the css is already loaded
				result = true;
			} else if (i == document.styleSheets.length - 1) {
				// Fallback. There is no request for the css file.
			}
		}
		return result;
	}

	function linkLoaded(link) {
		var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		return new Promise(function (resolve, reject) {
			// check if image is already loaded
			if (alreadyLoaded(link)) {
				// resolve promise
				resolve(link);
				// call the callback if exist
				callback != null && callback(link);
			} else {

				var img = document.createElement('img');

				// wait until loaded
				// console.log('CHECK LOADING', link.href);
				// we load the css into an image
				// when the image is in error more
				// that mean that the css is loaded
				img.addEventListener('error', function (e) {
					// console.log('LOADED', e);
					// resolve the promise
					resolve(link);
					// callback if exist
					callback != null && callback(link);
				});
				// listen for error
				// img.addEventListener('error', (e) => {
				// 	console.error('ERROR', e);
				// 	// reject
				// 	reject(e);
				// }, false);

				// set url
				img.src = link.href;
				// document.body.appendChild(img);
			}
		});
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(function(win) {

	/**
	 * FastDom
	 *
	 * Eliminates layout thrashing
	 * by batching DOM read/write
	 * interactions.
	 *
	 * @author Wilson Page <wilsonpage@me.com>
	 * @author Kornel Lesinski <kornel.lesinski@ft.com>
	 */

	'use strict';

	/**
	 * Mini logger
	 *
	 * @return {Function}
	 */
	var debug = 0 ? console.log.bind(console, '[fastdom]') : function() {};

	/**
	 * Normalized rAF
	 *
	 * @type {Function}
	 */
	var raf = win.requestAnimationFrame
	  || win.webkitRequestAnimationFrame
	  || win.mozRequestAnimationFrame
	  || win.msRequestAnimationFrame
	  || function(cb) { return setTimeout(cb, 16); };

	/**
	 * Initialize a `FastDom`.
	 *
	 * @constructor
	 */
	function FastDom() {
	  var self = this;
	  self.reads = [];
	  self.writes = [];
	  self.raf = raf.bind(win); // test hook
	  debug('initialized', self);
	}

	FastDom.prototype = {
	  constructor: FastDom,

	  /**
	   * Adds a job to the read batch and
	   * schedules a new frame if need be.
	   *
	   * @param  {Function} fn
	   * @public
	   */
	  measure: function(fn, ctx) {
	    debug('measure');
	    var task = !ctx ? fn : fn.bind(ctx);
	    this.reads.push(task);
	    scheduleFlush(this);
	    return task;
	  },

	  /**
	   * Adds a job to the
	   * write batch and schedules
	   * a new frame if need be.
	   *
	   * @param  {Function} fn
	   * @public
	   */
	  mutate: function(fn, ctx) {
	    debug('mutate');
	    var task = !ctx ? fn : fn.bind(ctx);
	    this.writes.push(task);
	    scheduleFlush(this);
	    return task;
	  },

	  /**
	   * Clears a scheduled 'read' or 'write' task.
	   *
	   * @param {Object} task
	   * @return {Boolean} success
	   * @public
	   */
	  clear: function(task) {
	    debug('clear', task);
	    return remove(this.reads, task) || remove(this.writes, task);
	  },

	  /**
	   * Extend this FastDom with some
	   * custom functionality.
	   *
	   * Because fastdom must *always* be a
	   * singleton, we're actually extending
	   * the fastdom instance. This means tasks
	   * scheduled by an extension still enter
	   * fastdom's global task queue.
	   *
	   * The 'super' instance can be accessed
	   * from `this.fastdom`.
	   *
	   * @example
	   *
	   * var myFastdom = fastdom.extend({
	   *   initialize: function() {
	   *     // runs on creation
	   *   },
	   *
	   *   // override a method
	   *   measure: function(fn) {
	   *     // do extra stuff ...
	   *
	   *     // then call the original
	   *     return this.fastdom.measure(fn);
	   *   },
	   *
	   *   ...
	   * });
	   *
	   * @param  {Object} props  properties to mixin
	   * @return {FastDom}
	   */
	  extend: function(props) {
	    debug('extend', props);
	    if (typeof props != 'object') throw new Error('expected object');

	    var child = Object.create(this);
	    mixin(child, props);
	    child.fastdom = this;

	    // run optional creation hook
	    if (child.initialize) child.initialize();

	    return child;
	  },

	  // override this with a function
	  // to prevent Errors in console
	  // when tasks throw
	  catch: null
	};

	/**
	 * Schedules a new read/write
	 * batch if one isn't pending.
	 *
	 * @private
	 */
	function scheduleFlush(fastdom) {
	  if (!fastdom.scheduled) {
	    fastdom.scheduled = true;
	    fastdom.raf(flush.bind(null, fastdom));
	    debug('flush scheduled');
	  }
	}

	/**
	 * Runs queued `read` and `write` tasks.
	 *
	 * Errors are caught and thrown by default.
	 * If a `.catch` function has been defined
	 * it is called instead.
	 *
	 * @private
	 */
	function flush(fastdom) {
	  debug('flush');

	  var writes = fastdom.writes;
	  var reads = fastdom.reads;
	  var error;

	  try {
	    debug('flushing reads', reads.length);
	    runTasks(reads);
	    debug('flushing writes', writes.length);
	    runTasks(writes);
	  } catch (e) { error = e; }

	  fastdom.scheduled = false;

	  // If the batch errored we may still have tasks queued
	  if (reads.length || writes.length) scheduleFlush(fastdom);

	  if (error) {
	    debug('task errored', error.message);
	    if (fastdom.catch) fastdom.catch(error);
	    else throw error;
	  }
	}

	/**
	 * We run this inside a try catch
	 * so that if any jobs error, we
	 * are able to recover and continue
	 * to flush the batch until it's empty.
	 *
	 * @private
	 */
	function runTasks(tasks) {
	  debug('run tasks');
	  var task; while (task = tasks.shift()) task();
	}

	/**
	 * Remove an item from an Array.
	 *
	 * @param  {Array} array
	 * @param  {*} item
	 * @return {Boolean}
	 */
	function remove(array, item) {
	  var index = array.indexOf(item);
	  return !!~index && !!array.splice(index, 1);
	}

	/**
	 * Mixin own properties of source
	 * object into the target.
	 *
	 * @param  {Object} target
	 * @param  {Object} source
	 */
	function mixin(target, source) {
	  for (var key in source) {
	    if (source.hasOwnProperty(key)) target[key] = source[key];
	  }
	}

	// There should never be more than
	// one instance of `FastDom` in an app
	var exports = win.fastdom = (win.fastdom || new FastDom()); // jshint ignore:line

	// Expose to CJS & AMD
	if (("function")[0] == 'f') !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return exports; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	else if ((typeof module)[0] == 'o') module.exports = exports;

	})( typeof window !== 'undefined' ? window : this);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = dispatchEvent;

	var _SEvent = __webpack_require__(17);

	var _SEvent2 = _interopRequireDefault(_SEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Helper to quickly display an event with some optional data attached to it
	 *
	 * @name 		dispatchEvent
	 * @param 		{HTMLElement} 					target  		The element to dispatch the event from
	 * @param 		{String} 						name 			The event name to dispatch
	 * @param 		{Mixed} 						data 			The data to attache to the event
	 *
	 * @example  	js
	 * import dispatchEvent from 'sugarcss/js/dom/dispatchEvent'
	 * dispatchEvent(myCoolHTMLElement, 'myCoolEventName', {
	 * 		var1 : 'value1'
	 * });
	 *
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function dispatchEvent(target, name) {
	  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	  // create new event
	  var e = new _SEvent2.default(name, {
	    detail: data,
	    bubbles: true,
	    cancelable: true
	  });
	  target.dispatchEvent(e);
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = undefined;

	var _customEvent = __webpack_require__(18);

	var _customEvent2 = _interopRequireDefault(_customEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _customEvent2.default;

	/**
	 * @constructor
	 * @param  		{String} 	name 		The event name
	 * @param 		{Object} 	settings 	The event settings
	 */

	/**
	 * Set if the event is cancelable or not
	 * @setting
	 * @name 		cancelable
	 * @type 		{Boolean}
	 * @default 	true
	 */

	/**
	 * Set if the event will bubble or not
	 * @setting
	 * @name 		bubbles
	 * @type 		{Boolean}
	 * @default 	true
	 */

	/**
	 * Pass an object that will be sent with the event
	 * @setting
	 * @name 		detail
	 * @type 		{Object}
	 * @default 	null
	 */
	/**
	 * @class 		SEvent
	 * Proxy class to create custom events that can be dispatched
	 * through the standard dispatch method on any HTMLElement
	 *
	 * @example 	js
	 * let myEvent = new SEvent('myCoolEvent', {
	 * 		cancelable : true,
	 * 		bubbles : false,
	 * 		detail : {
	 * 			// some datas to send with the event
	 * 		}
	 * });
	 * // dispatch the event from an HTMLElement
	 * myHTMLElement.dispatch(myEvent);
	 *
	 * @see 		https://www.npmjs.com/package/customevent
	 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
	 */

/***/ },
/* 18 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var NativeCustomEvent = global.CustomEvent;

	function useNative () {
	  try {
	    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
	    return  'cat' === p.type && 'bar' === p.detail.foo;
	  } catch (e) {
	  }
	  return false;
	}

	/**
	 * Cross-browser `CustomEvent` constructor.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
	 *
	 * @public
	 */

	module.exports = useNative() ? NativeCustomEvent :

	// IE >= 9
	'undefined' !== typeof document && 'function' === typeof document.createEvent ? function CustomEvent (type, params) {
	  var e = document.createEvent('CustomEvent');
	  if (params) {
	    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
	  } else {
	    e.initCustomEvent(type, false, false, void 0);
	  }
	  return e;
	} :

	// IE <= 8
	function CustomEvent (type, params) {
	  var e = document.createEventObject();
	  e.type = type;
	  if (params) {
	    e.bubbles = Boolean(params.bubbles);
	    e.cancelable = Boolean(params.cancelable);
	    e.detail = params.detail;
	  } else {
	    e.bubbles = false;
	    e.cancelable = false;
	    e.detail = void 0;
	  }
	  return e;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = whenInViewport;

	var _whenVisible = __webpack_require__(20);

	var _whenVisible2 = _interopRequireDefault(_whenVisible);

	var _isInViewport = __webpack_require__(23);

	var _isInViewport2 = _interopRequireDefault(_isInViewport);

	var _throttle = __webpack_require__(25);

	var _throttle2 = _interopRequireDefault(_throttle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Monitor an HTMLElement to be notified when it is in the viewport
	 *
	 * @name 		whenInViewport
	 * @param 		{HTMLElement} 				elm 		The element to monitor
	 * @param 		{Function} 					[cb=null] 	An optional callback to call when the element is in the viewport
	 * @return 		(Promise) 								The promise that will be resolved when the element is in the viewport
	 *
	 * @example 	js
	 * import whenInViewport from 'sugarcss/js/dom/whenInViewport'
	 * whenInViewport(myCoolHTMLElement).then((elm) => {
	 * 		// do something with your element that has entered the viewport...
	 * });
	 *
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function whenInViewport(elm) {
		var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		return new Promise(function (resolve, reject) {
			var isInViewport = false,
			    isVisible = false,
			    _cb = function _cb() {
				if (isVisible && isInViewport) {
					document.removeEventListener('scroll', checkViewport);
					window.removeEventListener('resize', checkViewport);
					if (cb) cb(elm);
					resolve(elm);
				}
			};
			var checkViewport = (0, _throttle2.default)(function (e) {
				isInViewport = (0, _isInViewport2.default)(elm, { top: 50, right: 50, bottom: 50, left: 50 });
				_cb();
			}, 100);

			// detect when visible
			(0, _whenVisible2.default)(elm).then(function (elm) {
				isVisible = true;
				_cb();
			});

			// listen for resize
			document.addEventListener('scroll', checkViewport);
			window.addEventListener('resize', checkViewport);
			setTimeout(function () {
				checkViewport(null);
			});
		});
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = whenVisible;

	var _isVisible = __webpack_require__(21);

	var _isVisible2 = _interopRequireDefault(_isVisible);

	var _closestNotVisible = __webpack_require__(22);

	var _closestNotVisible2 = _interopRequireDefault(_closestNotVisible);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Monitor an HTMLElement to be notified when it is visible
	 *
	 * @name 		whenVisible
	 * @param 		{HTMLElement} 				elm 		The element to monitor
	 * @param 		{Function} 					[cb=null] 	An optional callback to call when the element is visible
	 * @return 		(Promise) 								The promise that will be resolved when the element is visible
	 *
	 * @example 	js
	 * import whenVisible from 'sugarcss/js/dom/whenVisible'
	 * whenVisible(myCoolHTMLElement).then((elm) => {
	 * 		// do something with your element that is now visible
	 * });
	 *
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function whenVisible(elm) {
		var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		return new Promise(function (resolve, reject) {

			// variables
			var isSelfVisible = false,
			    areParentsVisible = false,
			    closestNotVisible = null,
			    selfObserver = null,
			    parentObserver = null;

			var _cb = function _cb() {
				if (isSelfVisible && areParentsVisible) {
					// process callbacks
					if (cb) cb(elm);
					resolve(elm);
					// remove the event listeners
					elm.removeEventListener('transitionend', _eventCb);
					elm.removeEventListener('animationstart', _eventCb);
					elm.removeEventListener('animationend', _eventCb);
					// remove the event listeners
					if (closestNotVisible) {
						closestNotVisible.removeEventListener('transitionend', _eventCb);
						closestNotVisible.removeEventListener('animationstart', _eventCb);
						closestNotVisible.removeEventListener('animationend', _eventCb);
					}
				}
			};

			// function called on each transitionend, start, etc...
			var _eventCb = function _eventCb(e) {
				// wait just a little time to check again
				setTimeout(function () {
					if (e.target === elm) {
						if ((0, _isVisible2.default)(elm)) {
							isSelfVisible = true;
							if (selfObserver && selfObserver.disconnect) {
								selfObserver.disconnect();
							}
							// remove the event listeners
							elm.removeEventListener('transitionend', _eventCb);
							elm.removeEventListener('animationstart', _eventCb);
							elm.removeEventListener('animationend', _eventCb);
						}
					} else if (e.target === closestNotVisible) {
						if ((0, _isVisible2.default)(closestNotVisible)) {
							areParentsVisible = true;
							if (parentObserver && parentObserver.disconnect) {
								parentObserver.disconnect();
							}
							// remove the event listeners
							closestNotVisible.removeEventListener('transitionend', _eventCb);
							closestNotVisible.removeEventListener('animationstart', _eventCb);
							closestNotVisible.removeEventListener('animationend', _eventCb);
						}
					}
					// callback
					_cb();
				});
			};

			// check if element itself is not visible
			if (!(0, _isVisible2.default)(elm)) {
				selfObserver = new MutationObserver(function (mutations) {
					mutations.forEach(function (mutation) {
						// check that is the style whos changed
						if (mutation.attributeName === 'style' || mutation.attributeName === 'class') {
							// check if is visible
							if ((0, _isVisible2.default)(mutation.target)) {
								// update
								isSelfVisible = true;
								// callback
								_cb();
								// stop observe
								selfObserver.disconnect();
							}
						}
					});
				});
				selfObserver.observe(elm, { attributes: true });

				// listen for animationstart to check if the element is visible
				elm.addEventListener('animationstart', _eventCb);
				elm.addEventListener('animationend', _eventCb);
				elm.addEventListener('transitionend', _eventCb);
			} else {
				isSelfVisible = true;
			}

			// get the closest not visible element
			// if found, we monitor it to check when it is visible
			closestNotVisible = (0, _closestNotVisible2.default)(elm);
			if (closestNotVisible) {
				parentObserver = new MutationObserver(function (mutations) {
					mutations.forEach(function (mutation) {
						// check that is the style whos changed
						if (mutation.attributeName === 'style' || mutation.attributeName === 'class') {
							// check if is visible
							if ((0, _isVisible2.default)(mutation.target)) {
								// update
								areParentsVisible = true;
								// callback
								_cb();
								// stop observe
								parentObserver.disconnect();
							}
						}
					});
				});
				parentObserver.observe(closestNotVisible, { attributes: true });

				// listen for animationstart to check if the element is visible
				closestNotVisible.addEventListener('animationstart', _eventCb);
				closestNotVisible.addEventListener('animationend', _eventCb);
				closestNotVisible.addEventListener('transitionend', _eventCb);
			} else {
				areParentsVisible = true;
			}

			// callback
			_cb();
		});
	}

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = isVisible;
	/**
	 * Check if the passed HTMLElement is visible or not.
	 * Visible mean that it has not an opacity of 0, not a visibility of hidden and not a display of none
	 *
	 * @name 		isVisible
	 * @param 		{HTMLElement} 				elm  		The element to check
	 * @return 		{Boolean								If the element is visible or not
	 *
	 * @example  	js
	 * import isVisible from 'sugarcss/js/dom/isVisible'
	 * if (isVisible(myCoolHTMLElement) {
	 * 		// i'm visible
	 * }
	 *
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function isVisible(elm) {

	  // assume that the script tag is always visible
	  if (elm.nodeName.toLowerCase() === 'script') return true;

	  // if no offset parent
	  // mean that the element is not visible
	  // if (elm.offsetParent === null) return false;

	  // get style
	  var style = window.getComputedStyle(elm, null),
	      opacity = style['opacity'],
	      visibility = style['visibility'],
	      display = style['display'];
	  return '0' !== opacity && 'none' !== display && 'hidden' !== visibility;
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = closestNotVisible;

	var _isVisible = __webpack_require__(21);

	var _isVisible2 = _interopRequireDefault(_isVisible);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Go up the dom three to find the first element that is not visible.
	 * Not visible mean that has either an opacity to 0, a visibility to hidden or a display to none
	 *
	 * @name 		closestNotVisible
	 * @param 		{HTMLElement} 					elm  		The element to start on
	 * @return 		{HTMLElement} 								The element found or null
	 *
	 * @example  	js
	 * import closestNotVisible from 'sugarcss/js/dom/closestNotVisible'
	 * const closestElm = closest(myCoolElement);
	 * if (closestElm) {
	 * 		// we have found en element is not visible
	 * }
	 *
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function closestNotVisible(elm) {
	  elm = elm.parentNode;
	  while (elm && elm != document) {
	    if (!(0, _isVisible2.default)(elm)) {
	      return elm;
	    }
	    elm = elm.parentNode;
	  }
	  return false;
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = isInViewport;

	var _getBoundingClientRect = __webpack_require__(24);

	var _getBoundingClientRect2 = _interopRequireDefault(_getBoundingClientRect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isInViewport(elm) {
	  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { top: 0, right: 0, bottom: 0, left: 0 };


	  var rect = (0, _getBoundingClientRect2.default)(elm);
	  var wh = window.innerHeight || document.documentElement.clientHeight;
	  var ww = window.innerWidth || document.documentElement.clientWidth;
	  return rect.top - wh - offset.top <= 0 && rect.bottom + offset.bottom >= 0 && rect.left - ww - offset.left <= 0 && rect.right + offset.right >= 0;
	} /**
	   * Check if the passed HTMLElement is in the viewport or not
	   *
	   * @name 		isInViewport
	   * @param 		{HTMLElement} 				elm  		The element to insert
	   * @param 		{Object} 					offset 		An object of top, right, bottom and left offset used to detect the status
	   * @return 		{Boolean								If the element is in the viewport or not
	   *
	   * @example  	js
	   * import isInViewport from 'sugarcss/js/dom/isInViewport'
	   * if (isInViewport(myCoolHTMLElement) {
	   * 		// i'm in the viewport
	   * }
	   *
	   * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	   */

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = getBoundingClientRect;
	/**
	 * Proxy to the HTMLElement.getBoundingClientRect function.
	 * This proxy make some optimisations like it store in cache the
	 * result in the element while no invalidate actions has been made
	 * like scrolling or resizing the window...
	 *
	 * @name 		closest
	 * @param 		{HTMLElement} 					elm  		The element to start on
	 * @return 		{Object} 									The bouding client rect object
	 *
	 * @example  	js
	 * import getBoundingClientRect from 'sugarcss/js/dom/getBoundingClientRect'
	 * const rect = getBoundingClientRect(myCoolHTMLElement);
	 *
	 * @see 		https://developer.mozilla.org/en/docs/Web/API/Element/getBoundingClientRect
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	var elmStack = [];
	document.addEventListener('scroll', invalidate);
	document.addEventListener('resize', invalidate);

	function invalidate() {
		elmStack.forEach(function (elm) {
			// check if the element is not in the dom anymore
			if (!elm || !elm.parentNode) {
				// remove the element from the stack
				elmStack.splice(elmStack.indexOf(elm), 1);
			} else {
				elm._sBoundingClientRect = null;
			}
		});
	}

	// export the function
	function getBoundingClientRect(elm) {

		// add the element to the stack
		if (elmStack.indexOf(elm) === -1) {
			elmStack.push(elm);
		}
		if (!elm._sBoundingClientRect) {
			elm._sBoundingClientRect = elm.getBoundingClientRect();
		}
		return elm._sBoundingClientRect;
	}

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = throttle;
	/**
	 * This utils function allows you to make sure that a function that will normally be called
	 * several times, for example during a scroll event, to be called once each threshhold time
	 *
	 * @name 			throttle
	 * @example 		js
	 * const myThrottledFn = throttle(() => {
	 * 		// my function content that will be
	 * 		// executed only once each second
	 * }, 1000);
	 *
	 * document.addEventListener('scroll', (e) => {
	 * 		// call my throttled function
	 * 		myThrottledFn();
	 * });
	 *
	 * @author 			Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function throttle(fn, threshhold) {
	    threshhold || (threshhold = 250);
	    var last, deferTimer;
	    return function () {
	        var context = this;

	        var now = +new Date(),
	            args = arguments;
	        if (last && now < last + threshhold) {
	            // hold on to it
	            clearTimeout(deferTimer);
	            deferTimer = setTimeout(function () {
	                last = now;
	                fn.apply(context, args);
	            }, threshhold);
	        } else {
	            last = now;
	            fn.apply(context, args);
	        }
	    };
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = matches;
	/**
	 * Polyfill for the Element.matches function
	 *
	 * @name 		matches
	 * @param 		{HTMLElement} 			elm  			The element to check
	 * @param 		{String} 				selector 		The selector to check on the element
	 * @return 		{Boolean} 								If the element match the selector or not
	 *
	 * @example  	js
	 * import matches from 'sugarcss/js/dom/matches'
	 * if (matches(myCoolHTMLElement, '.my-cool-css-selector')) {
	 * 		// the element match the selector
	 * }
	 *
	 * @see 		https://developer.mozilla.org/en/docs/Web/API/Element/matches
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function matches(el, selector) {
	  if (el.nodeName == '#comment' || el.nodeName == '#text') {
	    return false;
	  }
	  var p = Element.prototype;
	  var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
	    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
	  };
	  return f.call(el, selector);
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = closest;

	var _matches = __webpack_require__(26);

	var _matches2 = _interopRequireDefault(_matches);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Go up the dom three to find the first element that matches the passed selector
	 *
	 * @name 		closest
	 * @param 		{HTMLElement} 					elm  		The element to start on
	 * @param 		{String} 						selector 	A css selector to search for
	 * @return 		{HTMLElement} 								The element found or null
	 *
	 * @example  	js
	 * import closest from 'sugarcss/js/dom/closest'
	 * const closestElm = closest(myCoolElement, '.my-cool-class');
	 * if (closestElm) {
	 * 		// we have found en element that matches the selector
	 * }
	 *
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function closest(elm, selector) {
	  elm = elm.parentNode;
	  while (elm && elm != document) {
	    if ((0, _matches2.default)(elm, selector)) {
	      return elm;
	    }
	    elm = elm.parentNode;
	  }
	  return null;
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = whenAttribute;

	var _attributesObservable = __webpack_require__(29);

	var _attributesObservable2 = _interopRequireDefault(_attributesObservable);

	var _autoCast = __webpack_require__(7);

	var _autoCast2 = _interopRequireDefault(_autoCast);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Resolve a promise when the wanted attribute on the passed HTMLElement exist or pass the check function provided
	 *
	 * @name 		whenAttribute
	 * @param 		{HTMLElement} 				elm 				The HTMLElement on which to monitor the property
	 * @param 		{String} 					attribute 			The attribute to monitor
	 * @param 		{Function} 					[checkFn=null] 		An optional function to check the attribute. The promise is resolved when this function return true
	 * @return 		(Promise) 										The promise that will be resolved when the attribute exist on the element (and that it passes the checkFn)
	 *
	 * @example 	js
	 * import whenAttribute from 'sugarcss/js/dom/whenAttribute'
	 * whenAttribute(myCoolHTMLElement, 'value').then((value) => {
	 * 		// the value attribute exist on the element
	 * });
	 * // with a checkFn
	 * whenAttribute(myCoolHTMLElement, 'value', (newVal, oldVal) => {
	 * 		// make sure the value is a number
	 * 		return typeof(newVal) === 'number';
	 * }).then((value) => {
	 * 		// do something with your number value...
	 * });
	 *
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function whenAttribute(elm, attrName) {
		var checkFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		return new Promise(function (resolve, reject) {

			if (elm.hasAttribute(attrName)) {
				var value = (0, _autoCast2.default)(elm.getAttribute(attrName));
				if (checkFn && checkFn(value, value)) {
					resolve(value);
					return;
				} else if (!checkFn) {
					resolve(value);
					return;
				}
			}

			var obs = (0, _attributesObservable2.default)(elm).subscribe(function (mutation) {
				if (mutation.attributeName === attrName) {
					var _value = (0, _autoCast2.default)(mutation.target.getAttribute(mutation.attributeName));
					if (checkFn && checkFn(_value, mutation.oldValue)) {
						resolve(_value);
						obs.unsubscribe();
					} else if (!checkFn) {
						resolve(_value);
						obs.unsubscribe();
					}
				}
			});
		});
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	/**
	 * List of attributes to observe
	 * @setting
	 * @name 		attributes
	 * @type 		{Array}
	 * @default 	null
	 */
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/**
	 * Observe attributes on an HTMLElement and get mutations through the observable subscription
	 *
	 * @name 		attributesObservable
	 * @param 		{HTMLElement} 					target 		The element to observe
	 * @param 		{MutationObserverInit} 			settings 	The mutation observer settings
	 * @return 		{Observable} 								The mutation observable
	 *
	 * @example  	js
	 * import attributesObservable from 'sugarcss/js/dom/attributesObservable'
	 * attributesObservable(myCoolHTMLElement).subscribe((mutation) => {
	 * 		// do something with the mutation
	 * });
	 *
	 * @see 		https://developer.mozilla.org/en/docs/Web/API/MutationObserver
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */


	exports.default = function (target) {
		var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


		var observable = new _Observable.Observable(function (observer) {

			// create a new observer
			var mutationObserver = new MutationObserver(function (mutations) {
				var mutedAttrs = {};
				// loop on mutations
				mutations.forEach(function (mutation) {
					// push mutation
					if (!mutedAttrs[mutation.attribute]) {
						observer.next(mutation);
						mutedAttrs[mutation.attribute] = true;
					}
				});
				mutedAttrs = {};
			});
			mutationObserver.observe(target, _extends({
				attributes: true
			}, settings));
			// unsubscribe routine
			return function () {
				mutationObserver.disconnect();
			};
		});

		return observable;
	};

	var _Observable = __webpack_require__(30);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(31);
	var toSubscriber_1 = __webpack_require__(32);
	var observable_1 = __webpack_require__(43);
	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable = (function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is  called when the Observable is
	     * initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or
	     * `complete` can be called to notify of a successful completion.
	     */
	    function Observable(subscribe) {
	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * Creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @return {Observable} a new observable with the Operator applied
	     */
	    Observable.prototype.lift = function (operator) {
	        var observable = new Observable();
	        observable.source = this;
	        observable.operator = operator;
	        return observable;
	    };
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var operator = this.operator;
	        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
	        if (operator) {
	            operator.call(sink, this.source);
	        }
	        else {
	            sink.add(this._subscribe(sink));
	        }
	        if (sink.syncErrorThrowable) {
	            sink.syncErrorThrowable = false;
	            if (sink.syncErrorThrown) {
	                throw sink.syncErrorValue;
	            }
	        }
	        return sink;
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @return {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, PromiseCtor) {
	        var _this = this;
	        if (!PromiseCtor) {
	            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	                PromiseCtor = root_1.root.Rx.config.Promise;
	            }
	            else if (root_1.root.Promise) {
	                PromiseCtor = root_1.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        return new PromiseCtor(function (resolve, reject) {
	            var subscription = _this.subscribe(function (value) {
	                if (subscription) {
	                    // if there is a subscription, then we can surmise
	                    // the next handling is asynchronous. Any errors thrown
	                    // need to be rejected explicitly and unsubscribe must be
	                    // called manually
	                    try {
	                        next(value);
	                    }
	                    catch (err) {
	                        reject(err);
	                        subscription.unsubscribe();
	                    }
	                }
	                else {
	                    // if there is NO subscription, then we're getting a nexted
	                    // value synchronously during subscription. We can just call it.
	                    // If it errors, Observable's `subscribe` will ensure the
	                    // unsubscription logic is called, then synchronously rethrow the error.
	                    // After that, Promise will trap the error and send it
	                    // down the rejection path.
	                    next(value);
	                }
	            }, reject, resolve);
	        });
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        return this.source.subscribe(subscriber);
	    };
	    /**
	     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     * @method Symbol.observable
	     * @return {Observable} this instance of the observable
	     */
	    Observable.prototype[observable_1.$$observable] = function () {
	        return this;
	    };
	    // HACK: Since TypeScript inherits static properties too, we have to
	    // fight against TypeScript here so Subject can have a different static create signature
	    /**
	     * Creates a new cold Observable by calling the Observable constructor
	     * @static true
	     * @owner Observable
	     * @method create
	     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	     * @return {Observable} a new cold observable
	     */
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}());
	exports.Observable = Observable;
	//# sourceMappingURL=Observable.js.map

/***/ },
/* 31 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	/**
	 * window: browser in DOM main thread
	 * self: browser in WebWorker
	 * global: Node.js/other
	 */
	exports.root = (typeof window == 'object' && window.window === window && window
	    || typeof self == 'object' && self.self === self && self
	    || typeof global == 'object' && global.global === global && global);
	if (!exports.root) {
	    throw new Error('RxJS could not find any global context (window, self, global)');
	}
	//# sourceMappingURL=root.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Subscriber_1 = __webpack_require__(33);
	var rxSubscriber_1 = __webpack_require__(42);
	var Observer_1 = __webpack_require__(41);
	function toSubscriber(nextOrObserver, error, complete) {
	    if (nextOrObserver) {
	        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
	            return nextOrObserver;
	        }
	        if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
	            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
	        }
	    }
	    if (!nextOrObserver && !error && !complete) {
	        return new Subscriber_1.Subscriber(Observer_1.empty);
	    }
	    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	}
	exports.toSubscriber = toSubscriber;
	//# sourceMappingURL=toSubscriber.js.map

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isFunction_1 = __webpack_require__(34);
	var Subscription_1 = __webpack_require__(35);
	var Observer_1 = __webpack_require__(41);
	var rxSubscriber_1 = __webpack_require__(42);
	/**
	 * Implements the {@link Observer} interface and extends the
	 * {@link Subscription} class. While the {@link Observer} is the public API for
	 * consuming the values of an {@link Observable}, all Observers get converted to
	 * a Subscriber, in order to provide Subscription-like capabilities such as
	 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
	 * implementing operators, but it is rarely used as a public API.
	 *
	 * @class Subscriber<T>
	 */
	var Subscriber = (function (_super) {
	    __extends(Subscriber, _super);
	    /**
	     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
	     * defined Observer or a `next` callback function.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     */
	    function Subscriber(destinationOrNext, error, complete) {
	        _super.call(this);
	        this.syncErrorValue = null;
	        this.syncErrorThrown = false;
	        this.syncErrorThrowable = false;
	        this.isStopped = false;
	        switch (arguments.length) {
	            case 0:
	                this.destination = Observer_1.empty;
	                break;
	            case 1:
	                if (!destinationOrNext) {
	                    this.destination = Observer_1.empty;
	                    break;
	                }
	                if (typeof destinationOrNext === 'object') {
	                    if (destinationOrNext instanceof Subscriber) {
	                        this.destination = destinationOrNext;
	                        this.destination.add(this);
	                    }
	                    else {
	                        this.syncErrorThrowable = true;
	                        this.destination = new SafeSubscriber(this, destinationOrNext);
	                    }
	                    break;
	                }
	            default:
	                this.syncErrorThrowable = true;
	                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
	                break;
	        }
	    }
	    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () { return this; };
	    /**
	     * A static factory for a Subscriber, given a (potentially partial) definition
	     * of an Observer.
	     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
	     * Observer represented by the given arguments.
	     */
	    Subscriber.create = function (next, error, complete) {
	        var subscriber = new Subscriber(next, error, complete);
	        subscriber.syncErrorThrowable = false;
	        return subscriber;
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `next` from
	     * the Observable, with a value. The Observable may call this method 0 or more
	     * times.
	     * @param {T} [value] The `next` value.
	     * @return {void}
	     */
	    Subscriber.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._next(value);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `error` from
	     * the Observable, with an attached {@link Error}. Notifies the Observer that
	     * the Observable has experienced an error condition.
	     * @param {any} [err] The `error` exception.
	     * @return {void}
	     */
	    Subscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive a valueless notification of type
	     * `complete` from the Observable. Notifies the Observer that the Observable
	     * has finished sending push-based notifications.
	     * @return {void}
	     */
	    Subscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this.closed) {
	            return;
	        }
	        this.isStopped = true;
	        _super.prototype.unsubscribe.call(this);
	    };
	    Subscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    Subscriber.prototype._error = function (err) {
	        this.destination.error(err);
	        this.unsubscribe();
	    };
	    Subscriber.prototype._complete = function () {
	        this.destination.complete();
	        this.unsubscribe();
	    };
	    return Subscriber;
	}(Subscription_1.Subscription));
	exports.Subscriber = Subscriber;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SafeSubscriber = (function (_super) {
	    __extends(SafeSubscriber, _super);
	    function SafeSubscriber(_parent, observerOrNext, error, complete) {
	        _super.call(this);
	        this._parent = _parent;
	        var next;
	        var context = this;
	        if (isFunction_1.isFunction(observerOrNext)) {
	            next = observerOrNext;
	        }
	        else if (observerOrNext) {
	            context = observerOrNext;
	            next = observerOrNext.next;
	            error = observerOrNext.error;
	            complete = observerOrNext.complete;
	            if (isFunction_1.isFunction(context.unsubscribe)) {
	                this.add(context.unsubscribe.bind(context));
	            }
	            context.unsubscribe = this.unsubscribe.bind(this);
	        }
	        this._context = context;
	        this._next = next;
	        this._error = error;
	        this._complete = complete;
	    }
	    SafeSubscriber.prototype.next = function (value) {
	        if (!this.isStopped && this._next) {
	            var _parent = this._parent;
	            if (!_parent.syncErrorThrowable) {
	                this.__tryOrUnsub(this._next, value);
	            }
	            else if (this.__tryOrSetError(_parent, this._next, value)) {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._error) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._error, err);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._error, err);
	                    this.unsubscribe();
	                }
	            }
	            else if (!_parent.syncErrorThrowable) {
	                this.unsubscribe();
	                throw err;
	            }
	            else {
	                _parent.syncErrorValue = err;
	                _parent.syncErrorThrown = true;
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._complete) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._complete);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._complete);
	                    this.unsubscribe();
	                }
	            }
	            else {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            this.unsubscribe();
	            throw err;
	        }
	    };
	    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            parent.syncErrorValue = err;
	            parent.syncErrorThrown = true;
	            return true;
	        }
	        return false;
	    };
	    SafeSubscriber.prototype._unsubscribe = function () {
	        var _parent = this._parent;
	        this._context = null;
	        this._parent = null;
	        _parent.unsubscribe();
	    };
	    return SafeSubscriber;
	}(Subscriber));
	//# sourceMappingURL=Subscriber.js.map

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	function isFunction(x) {
	    return typeof x === 'function';
	}
	exports.isFunction = isFunction;
	//# sourceMappingURL=isFunction.js.map

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isArray_1 = __webpack_require__(36);
	var isObject_1 = __webpack_require__(37);
	var isFunction_1 = __webpack_require__(34);
	var tryCatch_1 = __webpack_require__(38);
	var errorObject_1 = __webpack_require__(39);
	var UnsubscriptionError_1 = __webpack_require__(40);
	/**
	 * Represents a disposable resource, such as the execution of an Observable. A
	 * Subscription has one important method, `unsubscribe`, that takes no argument
	 * and just disposes the resource held by the subscription.
	 *
	 * Additionally, subscriptions may be grouped together through the `add()`
	 * method, which will attach a child Subscription to the current Subscription.
	 * When a Subscription is unsubscribed, all its children (and its grandchildren)
	 * will be unsubscribed as well.
	 *
	 * @class Subscription
	 */
	var Subscription = (function () {
	    /**
	     * @param {function(): void} [unsubscribe] A function describing how to
	     * perform the disposal of resources when the `unsubscribe` method is called.
	     */
	    function Subscription(unsubscribe) {
	        /**
	         * A flag to indicate whether this Subscription has already been unsubscribed.
	         * @type {boolean}
	         */
	        this.closed = false;
	        if (unsubscribe) {
	            this._unsubscribe = unsubscribe;
	        }
	    }
	    /**
	     * Disposes the resources held by the subscription. May, for instance, cancel
	     * an ongoing Observable execution or cancel any other type of work that
	     * started when the Subscription was created.
	     * @return {void}
	     */
	    Subscription.prototype.unsubscribe = function () {
	        var hasErrors = false;
	        var errors;
	        if (this.closed) {
	            return;
	        }
	        this.closed = true;
	        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
	        this._subscriptions = null;
	        if (isFunction_1.isFunction(_unsubscribe)) {
	            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
	            if (trial === errorObject_1.errorObject) {
	                hasErrors = true;
	                (errors = errors || []).push(errorObject_1.errorObject.e);
	            }
	        }
	        if (isArray_1.isArray(_subscriptions)) {
	            var index = -1;
	            var len = _subscriptions.length;
	            while (++index < len) {
	                var sub = _subscriptions[index];
	                if (isObject_1.isObject(sub)) {
	                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
	                    if (trial === errorObject_1.errorObject) {
	                        hasErrors = true;
	                        errors = errors || [];
	                        var err = errorObject_1.errorObject.e;
	                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
	                            errors = errors.concat(err.errors);
	                        }
	                        else {
	                            errors.push(err);
	                        }
	                    }
	                }
	            }
	        }
	        if (hasErrors) {
	            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
	        }
	    };
	    /**
	     * Adds a tear down to be called during the unsubscribe() of this
	     * Subscription.
	     *
	     * If the tear down being added is a subscription that is already
	     * unsubscribed, is the same reference `add` is being called on, or is
	     * `Subscription.EMPTY`, it will not be added.
	     *
	     * If this subscription is already in an `closed` state, the passed
	     * tear down logic will be executed immediately.
	     *
	     * @param {TeardownLogic} teardown The additional logic to execute on
	     * teardown.
	     * @return {Subscription} Returns the Subscription used or created to be
	     * added to the inner subscriptions list. This Subscription can be used with
	     * `remove()` to remove the passed teardown logic from the inner subscriptions
	     * list.
	     */
	    Subscription.prototype.add = function (teardown) {
	        if (!teardown || (teardown === Subscription.EMPTY)) {
	            return Subscription.EMPTY;
	        }
	        if (teardown === this) {
	            return this;
	        }
	        var sub = teardown;
	        switch (typeof teardown) {
	            case 'function':
	                sub = new Subscription(teardown);
	            case 'object':
	                if (sub.closed || typeof sub.unsubscribe !== 'function') {
	                    break;
	                }
	                else if (this.closed) {
	                    sub.unsubscribe();
	                }
	                else {
	                    (this._subscriptions || (this._subscriptions = [])).push(sub);
	                }
	                break;
	            default:
	                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
	        }
	        return sub;
	    };
	    /**
	     * Removes a Subscription from the internal list of subscriptions that will
	     * unsubscribe during the unsubscribe process of this Subscription.
	     * @param {Subscription} subscription The subscription to remove.
	     * @return {void}
	     */
	    Subscription.prototype.remove = function (subscription) {
	        // HACK: This might be redundant because of the logic in `add()`
	        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
	            return;
	        }
	        var subscriptions = this._subscriptions;
	        if (subscriptions) {
	            var subscriptionIndex = subscriptions.indexOf(subscription);
	            if (subscriptionIndex !== -1) {
	                subscriptions.splice(subscriptionIndex, 1);
	            }
	        }
	    };
	    Subscription.EMPTY = (function (empty) {
	        empty.closed = true;
	        return empty;
	    }(new Subscription()));
	    return Subscription;
	}());
	exports.Subscription = Subscription;
	//# sourceMappingURL=Subscription.js.map

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
	//# sourceMappingURL=isArray.js.map

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	function isObject(x) {
	    return x != null && typeof x === 'object';
	}
	exports.isObject = isObject;
	//# sourceMappingURL=isObject.js.map

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var errorObject_1 = __webpack_require__(39);
	var tryCatchTarget;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    }
	    catch (e) {
	        errorObject_1.errorObject.e = e;
	        return errorObject_1.errorObject;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	exports.tryCatch = tryCatch;
	;
	//# sourceMappingURL=tryCatch.js.map

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";
	// typeof any so that it we don't have to cast when comparing a result to the error object
	exports.errorObject = { e: {} };
	//# sourceMappingURL=errorObject.js.map

/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when one or more errors have occurred during the
	 * `unsubscribe` of a {@link Subscription}.
	 */
	var UnsubscriptionError = (function (_super) {
	    __extends(UnsubscriptionError, _super);
	    function UnsubscriptionError(errors) {
	        _super.call(this);
	        this.errors = errors;
	        var err = Error.call(this, errors ?
	            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
	        this.name = err.name = 'UnsubscriptionError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return UnsubscriptionError;
	}(Error));
	exports.UnsubscriptionError = UnsubscriptionError;
	//# sourceMappingURL=UnsubscriptionError.js.map

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";
	exports.empty = {
	    closed: true,
	    next: function (value) { },
	    error: function (err) { throw err; },
	    complete: function () { }
	};
	//# sourceMappingURL=Observer.js.map

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(31);
	var Symbol = root_1.root.Symbol;
	exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
	    Symbol.for('rxSubscriber') : '@@rxSubscriber';
	//# sourceMappingURL=rxSubscriber.js.map

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(31);
	function getSymbolObservable(context) {
	    var $$observable;
	    var Symbol = context.Symbol;
	    if (typeof Symbol === 'function') {
	        if (Symbol.observable) {
	            $$observable = Symbol.observable;
	        }
	        else {
	            $$observable = Symbol('observable');
	            Symbol.observable = $$observable;
	        }
	    }
	    else {
	        $$observable = '@@observable';
	    }
	    return $$observable;
	}
	exports.getSymbolObservable = getSymbolObservable;
	exports.$$observable = getSymbolObservable(root_1.root);
	//# sourceMappingURL=observable.js.map

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = propertyProxy;

	var _get2 = __webpack_require__(45);

	var _get3 = _interopRequireDefault(_get2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Create a proxy for and object property.
	 * This gives you the possibility to process the data of the property
	 * when it is getted or setted.
	 *
	 * @name 		propertyProxy
	 * @param 		{Object} 		obj 			The object on which to create the proxy
	 * @param 		{String} 		property 		The property name that will be proxied
	 * @param 		{Object} 		descriptor 		A descriptor object that contains at least a get or a set method, or both
	 * @param 		{Boolean} 		applySetterAtStart 	If need to apply the descriptor setter directly on the current value or not
	 *
	 * @example 	js
	 * const myObject = {
	 * 		title : 'World'
	 * };
	 * // create the proxy
	 * propertyProxy(myObject, 'title', {
	 * 		get : (value) => {
	 * 			return `Hello ${value}`;
	 * 		},
	 * 		set : (value) => {
	 * 			return `Youhou ${value}`;
	 * 		}
	 * });
	 * console.log(myObject.title) => 'Hello World';
	 * myObject.title = 'Universe';
	 * console.log(myObject.title) => 'Hello Youhou Universe';
	 *
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function propertyProxy(obj, property, descriptor) {
		var applySetterAtStart = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;


		// store the current value
		var val = (0, _get3.default)(obj, property);
		var currentDescriptor = Object.getOwnPropertyDescriptor(obj.prototype || obj, property);

		// custom setter check
		var _set = function _set(value) {

			if (descriptor.set) {
				value = descriptor.set(value);
			}

			// descriptor
			if (currentDescriptor && currentDescriptor.set) {
				var ret = currentDescriptor.set(value);
				if (ret) {
					val = ret;
				} else {
					val = currentDescriptor.get();
				}
			} else {
				val = value;
			}
		};

		// apply the setter if needed
		if (applySetterAtStart) _set(val);

		// make sure we have the good descriptor
		var d = Object.getOwnPropertyDescriptor(obj, property);
		Object.defineProperty(obj, property, {
			get: function get() {
				var _val = val;
				if (descriptor.get) {
					_val = descriptor.get(_val);
				}
				if (currentDescriptor && currentDescriptor.get) {
					_val = descriptor.get();
				}
				return _val;
			},
			set: function set(v) {
				// const oldValue = val;
				// internal set to use the good setter
				_set(v);
				// notify of new update
				// this.notify(objPath, val, oldValue);
			},
			configurable: currentDescriptor && currentDescriptor.configurable !== undefined ? currentDescriptor.configurable : false,
			enumarable: currentDescriptor && currentDescriptor.enumarable !== undefined ? currentDescriptor.enumarable : true
		});

		// return the value
		return val;
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(46);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(47),
	    toKey = __webpack_require__(96);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = castPath(path, object);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(48),
	    isKey = __webpack_require__(49),
	    stringToPath = __webpack_require__(58),
	    toString = __webpack_require__(93);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value, object) {
	  if (isArray(value)) {
	    return value;
	  }
	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}

	module.exports = castPath;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(48),
	    isSymbol = __webpack_require__(50);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(51),
	    isObjectLike = __webpack_require__(57);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(52),
	    getRawTag = __webpack_require__(55),
	    objectToString = __webpack_require__(56);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  value = Object(value);
	  return (symToStringTag && symToStringTag in value)
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(53);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(54);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 54 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(52);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 56 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 57 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(59);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(60);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(61);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(62),
	    mapCacheDelete = __webpack_require__(87),
	    mapCacheGet = __webpack_require__(90),
	    mapCacheHas = __webpack_require__(91),
	    mapCacheSet = __webpack_require__(92);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(63),
	    ListCache = __webpack_require__(78),
	    Map = __webpack_require__(86);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(64),
	    hashDelete = __webpack_require__(74),
	    hashGet = __webpack_require__(75),
	    hashHas = __webpack_require__(76),
	    hashSet = __webpack_require__(77);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(65);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(66);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(67),
	    getValue = __webpack_require__(73);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(68),
	    isMasked = __webpack_require__(70),
	    isObject = __webpack_require__(69),
	    toSource = __webpack_require__(72);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(51),
	    isObject = __webpack_require__(69);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(71);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(53);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 72 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 73 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 74 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(65);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(65);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(65);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(79),
	    listCacheDelete = __webpack_require__(80),
	    listCacheGet = __webpack_require__(83),
	    listCacheHas = __webpack_require__(84),
	    listCacheSet = __webpack_require__(85);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 79 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(81);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(82);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 82 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(81);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(81);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(81);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(66),
	    root = __webpack_require__(53);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(88);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(89);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(88);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(88);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(88);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(94);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(52),
	    arrayMap = __webpack_require__(95),
	    isArray = __webpack_require__(48),
	    isSymbol = __webpack_require__(50);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 95 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(50);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 97 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = realHeight;
	/**
	 * Return the full height of an element that has maybe a max-height, etc...
	 * @param 		{HTMLElement} 		elm 		The element to process
	 * @return 		{Number} 						The real height of the element
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function realHeight(elm) {
		// apply an overflow-y to the element
		elm.style.transition = 'none';
		elm.style.overflowY = 'scroll';
		// get the actual height through the scrollHeight
		var height = elm.scrollHeight;
		// reset the overflowY
		elm.style.overflowY = '';
		elm.style.transition = '';
		// return the height
		return height;
	}

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = getStyleProperty;

	var _camelize = __webpack_require__(8);

	var _camelize2 = _interopRequireDefault(_camelize);

	var _autoCast = __webpack_require__(7);

	var _autoCast2 = _interopRequireDefault(_autoCast);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Get a style property on the passed element through the computed style.
	 * This function try to store the actual style to not trigger more that 1 redraw
	 * each js execution loop.
	 *
	 * @name 		getStyleProperty
	 * @param 		{HTMLElement} 					elm  		The element to get style from
	 * @param 		{String} 						property 	The css property to get
	 * @return 		{Mixed} 									The style value
	 *
	 * @example  	js
	 * import getStyleProperty from 'sugarcss/js/dom/getStyleProperty'
	 * const opacity = getStyleProperty(myCoolHTMLElement, 'opacity');
	 *
	 * @see 		https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function getStyleProperty(elm, property) {

	  // caching mecanisme
	  setTimeout(function () {
	    elm._sComputedStyle = null;
	  });

	  var computed = elm._sComputedStyle || window.getComputedStyle(elm);
	  elm._sComputedStyle = computed;

	  var prefixes = ['', 'webkit-', 'moz-', 'ms-', 'o-', 'khtml-'];
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefix = prefixes[i];
	    var value = computed[(0, _camelize2.default)('' + prefix + property)];
	    if (value && value.trim() !== '') return (0, _autoCast2.default)(value);
	  }
	  return null;
	}

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = style;

	var _uncamelize = __webpack_require__(100);

	var _uncamelize2 = _interopRequireDefault(_uncamelize);

	var _styleString2Object = __webpack_require__(101);

	var _styleString2Object2 = _interopRequireDefault(_styleString2Object);

	var _styleObject2String = __webpack_require__(102);

	var _styleObject2String2 = _interopRequireDefault(_styleObject2String);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Set or remove a css style property on an HTMLElement
	 *
	 * @name 		style
	 * @param 		{HTMLElement} 			elm 			The element to process
	 * @param 		{Object} 				styleObj 		An object of style to apply
	 * @return 		(Object) 								The element applied style
	 *
	 * @example 	js
	 * import style from 'sugarcss/js/dom/style'
	 * style(myCoolHTMLElement, {
	 * 		paddingLeft : 20,
	 * 		display : null
	 * });
	 *
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */

	if (!window.sugar) window.sugar = {};
	window.sugar._styles = new Map();

	function style(elm, styleObj) {

		// get the current style of the element
		var current = window.sugar._styles.get(elm);

		// if first time handling style
		if (!current) {
			// convert style string to object
			var styleAttr = elm.getAttribute('style');

			if (styleAttr) {
				styleObj = _extends({}, (0, _styleString2Object2.default)(styleAttr), styleObj);
			}

			current = {
				styleObj: styleObj,
				elm: elm
			};
		}

		// mix the style oject
		current.styleObj = _extends({}, current.styleObj, styleObj);

		// apply the style to the element
		// elm.setAttribute('style', __styleObject2String(current.styleObj));
		elm.style.cssText = (0, _styleObject2String2.default)(current.styleObj);

		// save the styleObj into map
		window.sugar._styles.set(elm, current);

		// return the style
		return elm.style;
	}

/***/ },
/* 100 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = uncamelize;
	/**
	 * Uncamelize a string
	 */
	function uncamelize(text) {
		var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';

		// Replace all capital letters by separator followed by lowercase one
		var res = '';
		res = text.replace(/[A-Z]/g, function (letter) {
			return separator + letter.toLowerCase();
		});

		// Remove first separator (to avoid _hello_world name)
		return res.replace("/^" + separator + "/", '').trim();
	}

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = styleString2Object;

	var _camelize = __webpack_require__(8);

	var _camelize2 = _interopRequireDefault(_camelize);

	var _autoCast = __webpack_require__(7);

	var _autoCast2 = _interopRequireDefault(_autoCast);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Transform a style string to an object representation
	 *
	 * @name 		styleString2Object
	 * @param 		{String} 				style 			The style string
	 * @return 		(Object) 								The string object representation
	 *
	 * @example 	js
	 * import styleString2Object from 'sugarcss/js/dom/styleString2Object'
	 * const styleString = styleString2Object('padding-left:20px; display:block;');
	 * // output => {
	 * //		paddingLeft : '20px',
	 * // 		display : 'block'
	 * // }
	 *
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function styleString2Object(style) {
	  if (!style || style === '') return {};
	  var obj = {};
	  var split = style.replace(/\s/g, '').split(';');
	  split.forEach(function (statement) {
	    // split statement by key value pairs
	    var spl = statement.split(':'),
	        key = (0, _camelize2.default)(spl[0]),
	        value = spl[1];
	    // add element into object
	    obj[key] = (0, _autoCast2.default)(value);
	  });
	  // return the style object
	  return obj;
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = styleObject2String;

	var _uncamelize = __webpack_require__(100);

	var _uncamelize2 = _interopRequireDefault(_uncamelize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Transform a style object to inline string separated by ;
	 *
	 * @name 		styleObject2String
	 * @param 		{Object} 				styleObj 		An object of style to apply
	 * @return 		(String) 								The string style representation
	 *
	 * @example 	js
	 * import styleObject2String from 'sugarcss/js/dom/styleObject2String'
	 * const styleString = styleObject2String({
	 * 		paddingLeft : '20px',
	 * 		display : 'block'
	 * });
	 * // output => padding-left:20px; display:block;
	 *
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	function styleObject2String(styleObj) {
	  // process the style object
	  var propertiesArray = [];
	  for (var key in styleObj) {
	    var value = styleObj[key];
	    // if the value is ''
	    // mean that we need to get rid of
	    if (value === undefined || value === '') {
	      delete styleObj[key];
	    } else {
	      propertiesArray.push((0, _uncamelize2.default)(key) + ':' + value + ';');
	    }
	  }
	  // return the css text
	  return propertiesArray.join(' ');
	}

/***/ }
/******/ ]);