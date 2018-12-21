// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"Promise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _Promise =
/*#__PURE__*/
function () {
  function _Promise(func) {
    var _this = this;

    _classCallCheck(this, _Promise);

    this.func = func;
    this.status = 0;
    this.value = null;
    this.handlers = [];
    this.resolve = this.resolve.bind(this);
    this.then = this.then.bind(this);
    this.reject = this.reject.bind(this);
    this.catch = this.catch.bind(this);
    setTimeout(function () {
      return func(_this.resolve, _this.reject);
    }, 0);
  }

  _createClass(_Promise, [{
    key: "resolve",
    value: function resolve(params) {
      var _this2 = this;

      this.status = 1;
      this.value = params;

      if (this.handlers.length) {
        var _this$handlers = _toArray(this.handlers),
            _ = _this$handlers[0],
            others = _this$handlers.slice(1);

        if (params instanceof _Promise) {
          setTimeout(function () {
            var nextChain = params;

            _this2.handlers.forEach(function (func) {
              return nextChain.then(func);
            });

            return nextChain;
          }, 0);
        } else {
          setTimeout(function () {
            var nextChain = new _Promise(function (resolve, reject) {
              resolve(_this2.handlers[0](_this2.value));
            });
            others.forEach(function (func) {
              return nextChain.then(func);
            });
            return nextChain;
          }, 0);
        }
      }
    }
  }, {
    key: "reject",
    value: function reject(params) {
      this.status = 2;
      return this;
    }
  }, {
    key: "then",
    value: function then(callback) {
      var _this3 = this;

      var cbType = _typeof(callback);

      if (cbType === 'function') {
        if (this.status === 0) {
          this.handlers.push(callback);
          return this;
        } else if (this.status === 1) {
          return new _Promise(function (resolve, reject) {
            return resolve(callback(_this3.value));
          });
        }
      }
    }
  }, {
    key: "catch",
    value: function _catch(callback) {
      if (this.status = 2) {
        this.value = callback(this.value);
        return this;
      }

      return this;
    }
  }, {
    key: "done",
    value: function done() {}
  }, {
    key: "finnaly",
    value: function finnaly() {}
  }]);

  return _Promise;
}();

exports.default = _Promise;
},{}],"ex1.js":[function(require,module,exports) {
"use strict";

var _Promise2 = _interopRequireDefault(require("./Promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var count = 0;

function fakeAjax(url, cb) {
  count++;
  var fake_responses = {
    "file1": "The first text",
    "file2": "The middle text",
    "file3": "The last text"
  };
  var randomDelay = (Math.round(Math.random() * 1E4) % 8000 + 1000) * count;
  return new _Promise2.default(function (resolve, reject) {
    setTimeout(function () {
      resolve(fake_responses[url]); // try {
      // 	if (randomDelay > 1600) throw new Error();
      // 	resolve(fake_responses[ url ]);
      // }
      //  catch (error) {
      // 	return Promise.resolve((fakeAjax( url )));
      // }
    }, randomDelay);
  });
}

function output(text) {
  console.log(text);
}

function getFile(file, log) {
  if (log) {
    console.log(log);
  }

  return fakeAjax(file);
}

var out1 = function out1() {
  return console.log('final');
};

var result = function result() {
  return getFile("file1").then(function (result) {
    return getFile("file2", result);
  }).then(function (result) {
    return getFile("file3", result);
  }).then(function (result) {
    return getFile("file1", result);
  }).then(function (result) {
    return getFile("file2", result);
  }).then(function (result) {
    return getFile("file3", result);
  }).then(function (result) {
    return getFile("file1", result);
  }).then(function (result) {
    return getFile("file2", result);
  }).then(function (result) {
    return getFile("file3", result);
  }).then(function (result) {
    return getFile("file1", result);
  }).then(function (result) {
    return getFile("file2", result);
  }).then(function (result) {
    return getFile("file3", result);
  }).then(function (result) {
    return getFile("file1", result);
  }).then(function (result) {
    return getFile("file2", result);
  }).then(function (result) {
    return getFile("file3", result);
  }).then(function (result) {
    return getFile("file1", result);
  }).then(function (result) {
    return getFile("file1", result);
  }).then(function (result) {
    return getFile("file2", result);
  }).then(function (result) {
    return getFile("file3", result);
  }).then(function (result) {
    return getFile("file3", result);
  }).then(function (result) {
    return getFile("file1", result);
  }).then(function (result) {
    return getFile("file2", result);
  }).then(function (result) {
    return getFile("file3", result);
  }).then(function (result) {
    return getFile("file1", result);
  }).then(function (result) {
    return getFile("file2", result);
  }).then(out1);
}; // .catch(() => console.log('1234'))


result();
},{"./Promise":"Promise.js"}],"../../../../../.nvm/versions/node/v8.11.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63055" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../.nvm/versions/node/v8.11.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ex1.js"], null)
//# sourceMappingURL=/ex1.a1e706d4.map