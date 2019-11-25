"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap v4.3.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).bootstrap = e();
}(void 0, function () {
  "use strict";

  function t(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function e(e, n, i) {
    return n && t(e.prototype, n), i && t(e, i), e;
  }

  function n(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = n, t;
  }

  function i(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = null != arguments[e] ? arguments[e] : {},
          o = Object.keys(i);
      "function" == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(i).filter(function (t) {
        return Object.getOwnPropertyDescriptor(i, t).enumerable;
      }))), o.forEach(function (e) {
        n(t, e, i[e]);
      });
    }

    return t;
  }

  var o,
      r,
      s,
      a = "transitionend",
      l = window.jQuery,
      c = function c(t) {
    do {
      t += ~~(1e6 * Math.random());
    } while (document.getElementById(t));

    return t;
  },
      f = function f(t) {
    var e = t.getAttribute("data-target");

    if (!e || "#" === e) {
      var n = t.getAttribute("href");
      e = n && "#" !== n ? n.trim() : "";
    }

    try {
      return document.querySelector(e) ? e : null;
    } catch (t) {
      return null;
    }
  },
      u = function u(t) {
    if (!t) return 0;
    var e = window.getComputedStyle(t),
        n = e.transitionDuration,
        i = e.transitionDelay,
        o = parseFloat(n),
        r = parseFloat(i);
    return o || r ? (n = n.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(i))) : 0;
  },
      h = function h(t) {
    var e = document.createEvent("HTMLEvents");
    e.initEvent(a, !0, !0), t.dispatchEvent(e);
  },
      d = function d(t) {
    return (t[0] || t).nodeType;
  },
      p = function p(t, e) {
    var n = !1,
        i = e + 5;
    t.addEventListener(a, function e() {
      n = !0, t.removeEventListener(a, e);
    }), setTimeout(function () {
      n || h(t);
    }, i);
  },
      g = function g(t, e, n) {
    Object.keys(n).forEach(function (i) {
      var o,
          r = n[i],
          s = e[i],
          a = s && d(s) ? "element" : (o = s, {}.toString.call(o).match(/\s([a-z]+)/i)[1].toLowerCase());
      if (!new RegExp(r).test(a)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + a + '" but expected type "' + r + '".');
    });
  },
      m = function m(t) {
    return t ? [].slice.call(t) : [];
  },
      _ = function _(t) {
    return !!t && !!(t.style && t.parentNode && t.parentNode.style) && "none" !== t.style.display && "none" !== t.parentNode.style.display && "hidden" !== t.style.visibility;
  },
      v = function v() {
    return function () {};
  },
      y = function y(t) {
    return t.offsetHeight;
  },
      b = (o = {}, r = 1, {
    set: function set(t, e, n) {
      "undefined" == typeof t.key && (t.key = {
        key: e,
        id: r
      }, r++), o[t.key.id] = n;
    },
    get: function get(t, e) {
      if (!t || "undefined" == typeof t.key) return null;
      var n = t.key;
      return n.key === e ? o[n.id] : null;
    },
    "delete": function _delete(t, e) {
      if ("undefined" != typeof t.key) {
        var n = t.key;
        n.key === e && (delete o[n.id], delete t.key);
      }
    }
  }),
      E = {
    setData: function setData(t, e, n) {
      b.set(t, e, n);
    },
    getData: function getData(t, e) {
      return b.get(t, e);
    },
    removeData: function removeData(t, e) {
      b["delete"](t, e);
    }
  },
      w = Element.prototype,
      D = w.matches,
      T = w.closest,
      I = Element.prototype.querySelectorAll,
      A = Element.prototype.querySelector,
      O = function O(t, e) {
    return new CustomEvent(t, e);
  };

  if ("function" != typeof window.CustomEvent && (O = function O(t, e) {
    e = e || {
      bubbles: !1,
      cancelable: !1,
      detail: null
    };
    var n = document.createEvent("CustomEvent");
    return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n;
  }), !((s = document.createEvent("CustomEvent")).initEvent("Bootstrap", !0, !0), s.preventDefault(), s.defaultPrevented)) {
    var S = Event.prototype.preventDefault;

    Event.prototype.preventDefault = function () {
      this.cancelable && (S.call(this), Object.defineProperty(this, "defaultPrevented", {
        get: function get() {
          return !0;
        },
        configurable: !0
      }));
    };
  }

  var L = function () {
    var t = O("Bootstrap", {
      cancelable: !0
    }),
        e = document.createElement("div");
    return e.addEventListener("Bootstrap", function () {
      return null;
    }), t.preventDefault(), e.dispatchEvent(t), t.defaultPrevented;
  }();

  D || (D = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), T || (T = function T(t) {
    var e = this;

    do {
      if (D.call(e, t)) return e;
      e = e.parentElement || e.parentNode;
    } while (null !== e && 1 === e.nodeType);

    return null;
  });
  var C = /:scope\b/;
  (function () {
    var t = document.createElement("div");

    try {
      t.querySelectorAll(":scope *");
    } catch (t) {
      return !1;
    }

    return !0;
  })() || (I = function I(t) {
    if (!C.test(t)) return this.querySelectorAll(t);
    var e = Boolean(this.id);
    e || (this.id = c("scope"));
    var n = null;

    try {
      t = t.replace(C, "#" + this.id), n = this.querySelectorAll(t);
    } finally {
      e || this.removeAttribute("id");
    }

    return n;
  }, A = function A(t) {
    if (!C.test(t)) return this.querySelector(t);
    var e = I.call(this, t);
    return "undefined" != typeof e[0] ? e[0] : null;
  });
  var N = /[^.]*(?=\..*)\.|.*/,
      k = /\..*/,
      P = /^key/,
      x = /::\d+$/,
      M = {},
      H = 1,
      j = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  },
      R = ["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"];

  function W(t, e) {
    return e && e + "::" + H++ || t.uidEvent || H++;
  }

  function F(t) {
    var e = W(t);
    return t.uidEvent = e, M[e] = M[e] || {}, M[e];
  }

  function U(t, e) {
    null === t.which && P.test(t.type) && (t.which = null === t.charCode ? t.keyCode : t.charCode), t.delegateTarget = e;
  }

  function B(t, e, n) {
    void 0 === n && (n = null);

    for (var i = 0, o = Object.keys(t); i < o.length; i++) {
      var r = o[i],
          s = t[r];
      if (s.originalHandler === e && s.delegationSelector === n) return t[r];
    }

    return null;
  }

  function K(t, e, n) {
    var i = "string" == typeof e,
        o = i ? n : e,
        r = t.replace(k, ""),
        s = j[r];
    return s && (r = s), R.indexOf(r) > -1 || (r = t), [i, o, r];
  }

  function V(t, e, n, i, o) {
    if ("string" == typeof e && t) {
      n || (n = i, i = null);
      var r = K(e, n, i),
          s = r[0],
          a = r[1],
          l = r[2],
          c = F(t),
          f = c[l] || (c[l] = {}),
          u = B(f, a, s ? n : null);
      if (u) u.oneOff = u.oneOff && o;else {
        var h = W(a, e.replace(N, "")),
            d = s ? function (t, e, n) {
          return function i(o) {
            for (var r = t.querySelectorAll(e), s = o.target; s && s !== this; s = s.parentNode) {
              for (var a = r.length; a--;) {
                if (r[a] === s) return U(o, s), i.oneOff && Q.off(t, o.type, n), n.apply(s, [o]);
              }
            }

            return null;
          };
        }(t, n, i) : function (t, e) {
          return function n(i) {
            return U(i, t), n.oneOff && Q.off(t, i.type, e), e.apply(t, [i]);
          };
        }(t, n);
        d.delegationSelector = s ? n : null, d.originalHandler = a, d.oneOff = o, d.uidEvent = h, f[h] = d, t.addEventListener(l, d, s);
      }
    }
  }

  function Y(t, e, n, i, o) {
    var r = B(e[n], i, o);
    null !== r && (t.removeEventListener(n, r, Boolean(o)), delete e[n][r.uidEvent]);
  }

  var Q = {
    on: function on(t, e, n, i) {
      V(t, e, n, i, !1);
    },
    one: function one(t, e, n, i) {
      V(t, e, n, i, !0);
    },
    off: function off(t, e, n, i) {
      if ("string" == typeof e && t) {
        var o = K(e, n, i),
            r = o[0],
            s = o[1],
            a = o[2],
            l = a !== e,
            c = F(t),
            f = "." === e.charAt(0);

        if ("undefined" == typeof s) {
          f && Object.keys(c).forEach(function (n) {
            !function (t, e, n, i) {
              var o = e[n] || {};
              Object.keys(o).forEach(function (r) {
                if (r.indexOf(i) > -1) {
                  var s = o[r];
                  Y(t, e, n, s.originalHandler, s.delegationSelector);
                }
              });
            }(t, c, n, e.substr(1));
          });
          var u = c[a] || {};
          Object.keys(u).forEach(function (n) {
            var i = n.replace(x, "");

            if (!l || e.indexOf(i) > -1) {
              var o = u[n];
              Y(t, c, a, o.originalHandler, o.delegationSelector);
            }
          });
        } else {
          if (!c || !c[a]) return;
          Y(t, c, a, s, r ? n : null);
        }
      }
    },
    trigger: function trigger(t, e, n) {
      if ("string" != typeof e || !t) return null;
      var i,
          o = e.replace(k, ""),
          r = e !== o,
          s = R.indexOf(o) > -1,
          a = !0,
          c = !0,
          f = !1,
          u = null;
      return r && "undefined" != typeof l && (i = l.Event(e, n), l(t).trigger(i), a = !i.isPropagationStopped(), c = !i.isImmediatePropagationStopped(), f = i.isDefaultPrevented()), s ? (u = document.createEvent("HTMLEvents")).initEvent(o, a, !0) : u = O(e, {
        bubbles: a,
        cancelable: !0
      }), "undefined" != typeof n && Object.keys(n).forEach(function (t) {
        Object.defineProperty(u, t, {
          get: function get() {
            return n[t];
          }
        });
      }), f && (u.preventDefault(), L || Object.defineProperty(u, "defaultPrevented", {
        get: function get() {
          return !0;
        }
      })), c && t.dispatchEvent(u), u.defaultPrevented && "undefined" != typeof i && i.preventDefault(), u;
    }
  },
      G = {
    matches: function matches(t, e) {
      return D.call(t, e);
    },
    find: function find(t, e) {
      return void 0 === e && (e = document.documentElement), "string" != typeof t ? null : I.call(e, t);
    },
    findOne: function findOne(t, e) {
      return void 0 === e && (e = document.documentElement), "string" != typeof t ? null : A.call(e, t);
    },
    children: function children(t, e) {
      var n = this;
      if ("string" != typeof e) return null;
      var i = m(t.children);
      return i.filter(function (t) {
        return n.matches(t, e);
      });
    },
    parents: function parents(t, e) {
      if ("string" != typeof e) return null;

      for (var n = [], i = t.parentNode; i && i.nodeType === Node.ELEMENT_NODE && 3 !== i.nodeType;) {
        this.matches(i, e) && n.push(i), i = i.parentNode;
      }

      return n;
    },
    closest: function closest(t, e) {
      return "string" != typeof e ? null : T.call(t, e);
    },
    prev: function prev(t, e) {
      if ("string" != typeof e) return null;

      for (var n = [], i = t.previousSibling; i && i.nodeType === Node.ELEMENT_NODE && 3 !== i.nodeType;) {
        this.matches(i, e) && n.push(i), i = i.previousSibling;
      }

      return n;
    }
  },
      X = "bs.alert",
      q = "." + X,
      z = {
    CLOSE: "close" + q,
    CLOSED: "closed" + q,
    CLICK_DATA_API: "click" + q + ".data-api"
  },
      Z = "alert",
      $ = "fade",
      J = "show",
      tt = function () {
    function t(t) {
      this._element = t, this._element && E.setData(t, X, this);
    }

    var n = t.prototype;
    return n.close = function (t) {
      var e = this._element;
      t && (e = this._getRootElement(t));

      var n = this._triggerCloseEvent(e);

      null === n || n.defaultPrevented || this._removeElement(e);
    }, n.dispose = function () {
      E.removeData(this._element, X), this._element = null;
    }, n._getRootElement = function (t) {
      var e = f(t),
          n = !1;
      return e && (n = G.findOne(e)), n || (n = G.closest(t, "." + Z)), n;
    }, n._triggerCloseEvent = function (t) {
      return Q.trigger(t, z.CLOSE);
    }, n._removeElement = function (t) {
      var e = this;

      if (t.classList.remove(J), t.classList.contains($)) {
        var n = u(t);
        Q.one(t, a, function (n) {
          return e._destroyElement(t, n);
        }), p(t, n);
      } else this._destroyElement(t);
    }, n._destroyElement = function (t) {
      t.parentNode && t.parentNode.removeChild(t), Q.trigger(t, z.CLOSED);
    }, t._jQueryInterface = function (e) {
      return this.each(function () {
        var n = E.getData(this, X);
        n || (n = new t(this)), "close" === e && n[e](this);
      });
    }, t._handleDismiss = function (t) {
      return function (e) {
        e && e.preventDefault(), t.close(this);
      };
    }, t._getInstance = function (t) {
      return E.getData(t, X);
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.3.1";
      }
    }]), t;
  }();

  if (Q.on(document, z.CLICK_DATA_API, '[data-dismiss="alert"]', tt._handleDismiss(new tt())), "undefined" != typeof l) {
    var et = l.fn.alert;
    l.fn.alert = tt._jQueryInterface, l.fn.alert.Constructor = tt, l.fn.alert.noConflict = function () {
      return l.fn.alert = et, tt._jQueryInterface;
    };
  }

  var nt = "bs.button",
      it = "." + nt,
      ot = "active",
      rt = "btn",
      st = "focus",
      at = '[data-toggle^="button"]',
      lt = '[data-toggle="buttons"]',
      ct = 'input:not([type="hidden"])',
      ft = ".active",
      ut = ".btn",
      ht = {
    CLICK_DATA_API: "click" + it + ".data-api",
    FOCUS_DATA_API: "focus" + it + ".data-api",
    BLUR_DATA_API: "blur" + it + ".data-api"
  },
      dt = function () {
    function t(t) {
      this._element = t, E.setData(t, nt, this);
    }

    var n = t.prototype;
    return n.toggle = function () {
      var t = !0,
          e = !0,
          n = G.closest(this._element, lt);

      if (n) {
        var i = G.findOne(ct, this._element);

        if (i) {
          if ("radio" === i.type) if (i.checked && this._element.classList.contains(ot)) t = !1;else {
            var o = G.findOne(ft, n);
            o && o.classList.remove(ot);
          }

          if (t) {
            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
            i.checked = !this._element.classList.contains(ot), Q.trigger(i, "change");
          }

          i.focus(), e = !1;
        }
      }

      e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(ot)), t && this._element.classList.toggle(ot);
    }, n.dispose = function () {
      E.removeData(this._element, nt), this._element = null;
    }, t._jQueryInterface = function (e) {
      return this.each(function () {
        var n = E.getData(this, nt);
        n || (n = new t(this)), "toggle" === e && n[e]();
      });
    }, t._getInstance = function (t) {
      return E.getData(t, nt);
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.3.1";
      }
    }]), t;
  }();

  if (Q.on(document, ht.CLICK_DATA_API, at, function (t) {
    t.preventDefault();
    var e = t.target;
    e.classList.contains(rt) || (e = G.closest(e, ut));
    var n = E.getData(e, nt);
    n || (n = new dt(e), E.setData(e, nt, n)), n.toggle();
  }), Q.on(document, ht.FOCUS_DATA_API, at, function (t) {
    var e = G.closest(t.target, ut);
    e && e.classList.add(st);
  }), Q.on(document, ht.BLUR_DATA_API, at, function (t) {
    var e = G.closest(t.target, ut);
    e && e.classList.remove(st);
  }), "undefined" != typeof l) {
    var pt = l.fn.button;
    l.fn.button = dt._jQueryInterface, l.fn.button.Constructor = dt, l.fn.button.noConflict = function () {
      return l.fn.button = pt, dt._jQueryInterface;
    };
  }

  function gt(t) {
    return "true" === t || "false" !== t && (t === Number(t).toString() ? Number(t) : "" === t || "null" === t ? null : t);
  }

  function mt(t) {
    return t.replace(/[A-Z]/g, function (t) {
      return t.toLowerCase();
    });
  }

  var _t = {
    setDataAttribute: function setDataAttribute(t, e, n) {
      t.setAttribute("data-" + mt(e), n);
    },
    removeDataAttribute: function removeDataAttribute(t, e) {
      t.removeAttribute("data-" + mt(e));
    },
    getDataAttributes: function getDataAttributes(t) {
      if (!t) return {};
      var e = i({}, t.dataset);
      return Object.keys(e).forEach(function (t) {
        e[t] = gt(e[t]);
      }), e;
    },
    getDataAttribute: function getDataAttribute(t, e) {
      return gt(t.getAttribute("data-" + mt(e)));
    },
    offset: function offset(t) {
      var e = t.getBoundingClientRect();
      return {
        top: e.top + document.body.scrollTop,
        left: e.left + document.body.scrollLeft
      };
    },
    position: function position(t) {
      return {
        top: t.offsetTop,
        left: t.offsetLeft
      };
    },
    toggleClass: function toggleClass(t, e) {
      t && (t.classList.contains(e) ? t.classList.remove(e) : t.classList.add(e));
    }
  },
      vt = "carousel",
      yt = "bs.carousel",
      bt = "." + yt,
      Et = {
    interval: 5e3,
    keyboard: !0,
    slide: !1,
    pause: "hover",
    wrap: !0,
    touch: !0
  },
      wt = {
    interval: "(number|boolean)",
    keyboard: "boolean",
    slide: "(boolean|string)",
    pause: "(string|boolean)",
    wrap: "boolean",
    touch: "boolean"
  },
      Dt = "next",
      Tt = "prev",
      It = "left",
      At = "right",
      Ot = {
    SLIDE: "slide" + bt,
    SLID: "slid" + bt,
    KEYDOWN: "keydown" + bt,
    MOUSEENTER: "mouseenter" + bt,
    MOUSELEAVE: "mouseleave" + bt,
    TOUCHSTART: "touchstart" + bt,
    TOUCHMOVE: "touchmove" + bt,
    TOUCHEND: "touchend" + bt,
    POINTERDOWN: "pointerdown" + bt,
    POINTERUP: "pointerup" + bt,
    DRAG_START: "dragstart" + bt,
    LOAD_DATA_API: "load" + bt + ".data-api",
    CLICK_DATA_API: "click" + bt + ".data-api"
  },
      St = "carousel",
      Lt = "active",
      Ct = "slide",
      Nt = "carousel-item-right",
      kt = "carousel-item-left",
      Pt = "carousel-item-next",
      xt = "carousel-item-prev",
      Mt = "pointer-event",
      Ht = {
    ACTIVE: ".active",
    ACTIVE_ITEM: ".active.carousel-item",
    ITEM: ".carousel-item",
    ITEM_IMG: ".carousel-item img",
    NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
    INDICATORS: ".carousel-indicators",
    DATA_SLIDE: "[data-slide], [data-slide-to]",
    DATA_RIDE: '[data-ride="carousel"]'
  },
      jt = {
    TOUCH: "touch",
    PEN: "pen"
  },
      Rt = function () {
    function t(t, e) {
      this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = G.findOne(Ht.INDICATORS, this._element), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners(), E.setData(t, yt, this);
    }

    var n = t.prototype;
    return n.next = function () {
      this._isSliding || this._slide(Dt);
    }, n.nextWhenVisible = function () {
      !document.hidden && _(this._element) && this.next();
    }, n.prev = function () {
      this._isSliding || this._slide(Tt);
    }, n.pause = function (t) {
      t || (this._isPaused = !0), G.findOne(Ht.NEXT_PREV, this._element) && (h(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null;
    }, n.cycle = function (t) {
      t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
    }, n.to = function (t) {
      var e = this;
      this._activeElement = G.findOne(Ht.ACTIVE_ITEM, this._element);

      var n = this._getItemIndex(this._activeElement);

      if (!(t > this._items.length - 1 || t < 0)) if (this._isSliding) Q.one(this._element, Ot.SLID, function () {
        return e.to(t);
      });else {
        if (n === t) return this.pause(), void this.cycle();
        var i = t > n ? Dt : Tt;

        this._slide(i, this._items[t]);
      }
    }, n.dispose = function () {
      Q.off(this._element, bt), E.removeData(this._element, yt), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
    }, n._getConfig = function (t) {
      return t = i({}, Et, t), g(vt, t, wt), t;
    }, n._handleSwipe = function () {
      var t = Math.abs(this.touchDeltaX);

      if (!(t <= 40)) {
        var e = t / this.touchDeltaX;
        this.touchDeltaX = 0, e > 0 && this.prev(), e < 0 && this.next();
      }
    }, n._addEventListeners = function () {
      var t = this;
      this._config.keyboard && Q.on(this._element, Ot.KEYDOWN, function (e) {
        return t._keydown(e);
      }), "hover" === this._config.pause && (Q.on(this._element, Ot.MOUSEENTER, function (e) {
        return t.pause(e);
      }), Q.on(this._element, Ot.MOUSELEAVE, function (e) {
        return t.cycle(e);
      })), this._config.touch && this._addTouchEventListeners();
    }, n._addTouchEventListeners = function () {
      var t = this;

      if (this._touchSupported) {
        var e = function e(_e2) {
          t._pointerEvent && jt[_e2.pointerType.toUpperCase()] ? t.touchStartX = _e2.clientX : t._pointerEvent || (t.touchStartX = _e2.touches[0].clientX);
        },
            n = function n(e) {
          t._pointerEvent && jt[e.pointerType.toUpperCase()] && (t.touchDeltaX = e.clientX - t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function (e) {
            return t.cycle(e);
          }, 500 + t._config.interval));
        };

        m(G.find(Ht.ITEM_IMG, this._element)).forEach(function (t) {
          Q.on(t, Ot.DRAG_START, function (t) {
            return t.preventDefault();
          });
        }), this._pointerEvent ? (Q.on(this._element, Ot.POINTERDOWN, function (t) {
          return e(t);
        }), Q.on(this._element, Ot.POINTERUP, function (t) {
          return n(t);
        }), this._element.classList.add(Mt)) : (Q.on(this._element, Ot.TOUCHSTART, function (t) {
          return e(t);
        }), Q.on(this._element, Ot.TOUCHMOVE, function (e) {
          return function (e) {
            e.touches && e.touches.length > 1 ? t.touchDeltaX = 0 : t.touchDeltaX = e.touches[0].clientX - t.touchStartX;
          }(e);
        }), Q.on(this._element, Ot.TOUCHEND, function (t) {
          return n(t);
        }));
      }
    }, n._keydown = function (t) {
      if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
        case 37:
          t.preventDefault(), this.prev();
          break;

        case 39:
          t.preventDefault(), this.next();
      }
    }, n._getItemIndex = function (t) {
      return this._items = t && t.parentNode ? m(G.find(Ht.ITEM, t.parentNode)) : [], this._items.indexOf(t);
    }, n._getItemByDirection = function (t, e) {
      var n = t === Dt,
          i = t === Tt,
          o = this._getItemIndex(e),
          r = this._items.length - 1;

      if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;
      var s = (o + (t === Tt ? -1 : 1)) % this._items.length;
      return -1 === s ? this._items[this._items.length - 1] : this._items[s];
    }, n._triggerSlideEvent = function (t, e) {
      var n = this._getItemIndex(t),
          i = this._getItemIndex(G.findOne(Ht.ACTIVE_ITEM, this._element));

      return Q.trigger(this._element, Ot.SLIDE, {
        relatedTarget: t,
        direction: e,
        from: i,
        to: n
      });
    }, n._setActiveIndicatorElement = function (t) {
      if (this._indicatorsElement) {
        for (var e = G.find(Ht.ACTIVE, this._indicatorsElement), n = 0; n < e.length; n++) {
          e[n].classList.remove(Lt);
        }

        var i = this._indicatorsElement.children[this._getItemIndex(t)];

        i && i.classList.add(Lt);
      }
    }, n._slide = function (t, e) {
      var n,
          i,
          o,
          r = this,
          s = G.findOne(Ht.ACTIVE_ITEM, this._element),
          l = this._getItemIndex(s),
          c = e || s && this._getItemByDirection(t, s),
          f = this._getItemIndex(c),
          h = Boolean(this._interval);

      if (t === Dt ? (n = kt, i = Pt, o = It) : (n = Nt, i = xt, o = At), c && c.classList.contains(Lt)) this._isSliding = !1;else if (!this._triggerSlideEvent(c, o).defaultPrevented && s && c) {
        if (this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(c), this._element.classList.contains(Ct)) {
          c.classList.add(i), y(c), s.classList.add(n), c.classList.add(n);
          var d = parseInt(c.getAttribute("data-interval"), 10);
          d ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = d) : this._config.interval = this._config.defaultInterval || this._config.interval;
          var g = u(s);
          Q.one(s, a, function () {
            c.classList.remove(n), c.classList.remove(i), c.classList.add(Lt), s.classList.remove(Lt), s.classList.remove(i), s.classList.remove(n), r._isSliding = !1, setTimeout(function () {
              Q.trigger(r._element, Ot.SLID, {
                relatedTarget: c,
                direction: o,
                from: l,
                to: f
              });
            }, 0);
          }), p(s, g);
        } else s.classList.remove(Lt), c.classList.add(Lt), this._isSliding = !1, Q.trigger(this._element, Ot.SLID, {
          relatedTarget: c,
          direction: o,
          from: l,
          to: f
        });

        h && this.cycle();
      }
    }, t._carouselInterface = function (e, n) {
      var o = E.getData(e, yt),
          r = i({}, Et, _t.getDataAttributes(e));
      "object" == _typeof(n) && (r = i({}, r, n));
      var s = "string" == typeof n ? n : r.slide;
      if (o || (o = new t(e, r)), "number" == typeof n) o.to(n);else if ("string" == typeof s) {
        if ("undefined" == typeof o[s]) throw new TypeError('No method named "' + s + '"');
        o[s]();
      } else r.interval && r.ride && (o.pause(), o.cycle());
    }, t._jQueryInterface = function (e) {
      return this.each(function () {
        t._carouselInterface(this, e);
      });
    }, t._dataApiClickHandler = function (e) {
      var n = f(this);

      if (n) {
        var o = G.findOne(n);

        if (o && o.classList.contains(St)) {
          var r = i({}, _t.getDataAttributes(o), _t.getDataAttributes(this)),
              s = this.getAttribute("data-slide-to");
          s && (r.interval = !1), t._carouselInterface(o, r), s && E.getData(o, yt).to(s), e.preventDefault();
        }
      }
    }, t._getInstance = function (t) {
      return E.getData(t, yt);
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.3.1";
      }
    }, {
      key: "Default",
      get: function get() {
        return Et;
      }
    }]), t;
  }();

  if (Q.on(document, Ot.CLICK_DATA_API, Ht.DATA_SLIDE, Rt._dataApiClickHandler), Q.on(window, Ot.LOAD_DATA_API, function () {
    for (var t = m(G.find(Ht.DATA_RIDE)), e = 0, n = t.length; e < n; e++) {
      Rt._carouselInterface(t[e], E.getData(t[e], yt));
    }
  }), "undefined" != typeof l) {
    var Wt = l.fn[vt];
    l.fn[vt] = Rt._jQueryInterface, l.fn[vt].Constructor = Rt, l.fn[vt].noConflict = function () {
      return l.fn[vt] = Wt, Rt._jQueryInterface;
    };
  }

  var Ft = "collapse",
      Ut = "bs.collapse",
      Bt = "." + Ut,
      Kt = {
    toggle: !0,
    parent: ""
  },
      Vt = {
    toggle: "boolean",
    parent: "(string|element)"
  },
      Yt = {
    SHOW: "show" + Bt,
    SHOWN: "shown" + Bt,
    HIDE: "hide" + Bt,
    HIDDEN: "hidden" + Bt,
    CLICK_DATA_API: "click" + Bt + ".data-api"
  },
      Qt = "show",
      Gt = "collapse",
      Xt = "collapsing",
      qt = "collapsed",
      zt = "width",
      Zt = "height",
      $t = {
    ACTIVES: ".show, .collapsing",
    DATA_TOGGLE: '[data-toggle="collapse"]'
  },
      Jt = function () {
    function t(t, e) {
      this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = m(G.find('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));

      for (var n = m(G.find($t.DATA_TOGGLE)), i = 0, o = n.length; i < o; i++) {
        var r = n[i],
            s = f(r),
            a = m(G.find(s)).filter(function (e) {
          return e === t;
        });
        null !== s && a.length && (this._selector = s, this._triggerArray.push(r));
      }

      this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle(), E.setData(t, Ut, this);
    }

    var n = t.prototype;
    return n.toggle = function () {
      this._element.classList.contains(Qt) ? this.hide() : this.show();
    }, n.show = function () {
      var e = this;

      if (!this._isTransitioning && !this._element.classList.contains(Qt)) {
        var n, i;
        this._parent && 0 === (n = m(G.find($t.ACTIVES, this._parent)).filter(function (t) {
          return "string" == typeof e._config.parent ? t.getAttribute("data-parent") === e._config.parent : t.classList.contains(Gt);
        })).length && (n = null);
        var o = G.findOne(this._selector);

        if (n) {
          var r = n.filter(function (t) {
            return o !== t;
          });
          if ((i = r[0] ? E.getData(r[0], Ut) : null) && i._isTransitioning) return;
        }

        if (!Q.trigger(this._element, Yt.SHOW).defaultPrevented) {
          n && n.forEach(function (e) {
            o !== e && t._collapseInterface(e, "hide"), i || E.setData(e, Ut, null);
          });

          var s = this._getDimension();

          this._element.classList.remove(Gt), this._element.classList.add(Xt), this._element.style[s] = 0, this._triggerArray.length && this._triggerArray.forEach(function (t) {
            t.classList.remove(qt), t.setAttribute("aria-expanded", !0);
          }), this.setTransitioning(!0);
          var l = "scroll" + (s[0].toUpperCase() + s.slice(1)),
              c = u(this._element);
          Q.one(this._element, a, function () {
            e._element.classList.remove(Xt), e._element.classList.add(Gt), e._element.classList.add(Qt), e._element.style[s] = "", e.setTransitioning(!1), Q.trigger(e._element, Yt.SHOWN);
          }), p(this._element, c), this._element.style[s] = this._element[l] + "px";
        }
      }
    }, n.hide = function () {
      var t = this;

      if (!this._isTransitioning && this._element.classList.contains(Qt) && !Q.trigger(this._element, Yt.HIDE).defaultPrevented) {
        var e = this._getDimension();

        this._element.style[e] = this._element.getBoundingClientRect()[e] + "px", y(this._element), this._element.classList.add(Xt), this._element.classList.remove(Gt), this._element.classList.remove(Qt);
        var n = this._triggerArray.length;
        if (n > 0) for (var i = 0; i < n; i++) {
          var o = this._triggerArray[i],
              r = f(o);
          if (null !== r) G.findOne(r).classList.contains(Qt) || (o.classList.add(qt), o.setAttribute("aria-expanded", !1));
        }
        this.setTransitioning(!0);
        this._element.style[e] = "";
        var s = u(this._element);
        Q.one(this._element, a, function () {
          t.setTransitioning(!1), t._element.classList.remove(Xt), t._element.classList.add(Gt), Q.trigger(t._element, Yt.HIDDEN);
        }), p(this._element, s);
      }
    }, n.setTransitioning = function (t) {
      this._isTransitioning = t;
    }, n.dispose = function () {
      E.removeData(this._element, Ut), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
    }, n._getConfig = function (t) {
      return (t = i({}, Kt, t)).toggle = Boolean(t.toggle), g(Ft, t, Vt), t;
    }, n._getDimension = function () {
      return this._element.classList.contains(zt) ? zt : Zt;
    }, n._getParent = function () {
      var e = this,
          n = this._config.parent;
      d(n) ? "undefined" == typeof n.jquery && "undefined" == typeof n[0] || (n = n[0]) : n = G.findOne(n);
      var i = '[data-toggle="collapse"][data-parent="' + n + '"]';
      return m(G.find(i, n)).forEach(function (n) {
        e._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n]);
      }), n;
    }, n._addAriaAndCollapsedClass = function (t, e) {
      if (t) {
        var n = t.classList.contains(Qt);
        e.length && e.forEach(function (t) {
          n ? t.classList.remove(qt) : t.classList.add(qt), t.setAttribute("aria-expanded", n);
        });
      }
    }, t._getTargetFromElement = function (t) {
      var e = f(t);
      return e ? G.findOne(e) : null;
    }, t._collapseInterface = function (e, n) {
      var o = E.getData(e, Ut),
          r = i({}, Kt, _t.getDataAttributes(e), "object" == _typeof(n) && n ? n : {});

      if (!o && r.toggle && /show|hide/.test(n) && (r.toggle = !1), o || (o = new t(e, r)), "string" == typeof n) {
        if ("undefined" == typeof o[n]) throw new TypeError('No method named "' + n + '"');
        o[n]();
      }
    }, t._jQueryInterface = function (e) {
      return this.each(function () {
        t._collapseInterface(this, e);
      });
    }, t._getInstance = function (t) {
      return E.getData(t, Ut);
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.3.1";
      }
    }, {
      key: "Default",
      get: function get() {
        return Kt;
      }
    }]), t;
  }();

  if (Q.on(document, Yt.CLICK_DATA_API, $t.DATA_TOGGLE, function (t) {
    "A" === t.target.tagName && t.preventDefault();

    var e = _t.getDataAttributes(this),
        n = f(this);

    m(G.find(n)).forEach(function (t) {
      var n,
          i = E.getData(t, Ut);
      i ? (null === i._parent && "string" == typeof e.parent && (i._config.parent = e.parent, i._parent = i._getParent()), n = "toggle") : n = e, Jt._collapseInterface(t, n);
    });
  }), "undefined" != typeof l) {
    var te = l.fn[Ft];
    l.fn[Ft] = Jt._jQueryInterface, l.fn[Ft].Constructor = Jt, l.fn[Ft].noConflict = function () {
      return l.fn[Ft] = te, Jt._jQueryInterface;
    };
  }

  for (var ee = "undefined" != typeof window && "undefined" != typeof document, ne = ["Edge", "Trident", "Firefox"], ie = 0, oe = 0; oe < ne.length; oe += 1) {
    if (ee && navigator.userAgent.indexOf(ne[oe]) >= 0) {
      ie = 1;
      break;
    }
  }

  var re = ee && window.Promise ? function (t) {
    var e = !1;
    return function () {
      e || (e = !0, window.Promise.resolve().then(function () {
        e = !1, t();
      }));
    };
  } : function (t) {
    var e = !1;
    return function () {
      e || (e = !0, setTimeout(function () {
        e = !1, t();
      }, ie));
    };
  };

  function se(t) {
    return t && "[object Function]" === {}.toString.call(t);
  }

  function ae(t, e) {
    if (1 !== t.nodeType) return [];
    var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
    return e ? n[e] : n;
  }

  function le(t) {
    return "HTML" === t.nodeName ? t : t.parentNode || t.host;
  }

  function ce(t) {
    if (!t) return document.body;

    switch (t.nodeName) {
      case "HTML":
      case "BODY":
        return t.ownerDocument.body;

      case "#document":
        return t.body;
    }

    var e = ae(t),
        n = e.overflow,
        i = e.overflowX,
        o = e.overflowY;
    return /(auto|scroll|overlay)/.test(n + o + i) ? t : ce(le(t));
  }

  var fe = ee && !(!window.MSInputMethodContext || !document.documentMode),
      ue = ee && /MSIE 10/.test(navigator.userAgent);

  function he(t) {
    return 11 === t ? fe : 10 === t ? ue : fe || ue;
  }

  function de(t) {
    if (!t) return document.documentElement;

    for (var e = he(10) ? document.body : null, n = t.offsetParent || null; n === e && t.nextElementSibling;) {
      n = (t = t.nextElementSibling).offsetParent;
    }

    var i = n && n.nodeName;
    return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === ae(n, "position") ? de(n) : n : t ? t.ownerDocument.documentElement : document.documentElement;
  }

  function pe(t) {
    return null !== t.parentNode ? pe(t.parentNode) : t;
  }

  function ge(t, e) {
    if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
    var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
        i = n ? t : e,
        o = n ? e : t,
        r = document.createRange();
    r.setStart(i, 0), r.setEnd(o, 0);
    var s,
        a,
        l = r.commonAncestorContainer;
    if (t !== l && e !== l || i.contains(o)) return "BODY" === (a = (s = l).nodeName) || "HTML" !== a && de(s.firstElementChild) !== s ? de(l) : l;
    var c = pe(t);
    return c.host ? ge(c.host, e) : ge(t, pe(e).host);
  }

  function me(t) {
    var e = "top" === (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
        n = t.nodeName;

    if ("BODY" === n || "HTML" === n) {
      var i = t.ownerDocument.documentElement;
      return (t.ownerDocument.scrollingElement || i)[e];
    }

    return t[e];
  }

  function _e(t, e) {
    var n = "x" === e ? "Left" : "Top",
        i = "Left" === n ? "Right" : "Bottom";
    return parseFloat(t["border" + n + "Width"], 10) + parseFloat(t["border" + i + "Width"], 10);
  }

  function ve(t, e, n, i) {
    return Math.max(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], he(10) ? parseInt(n["offset" + t]) + parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0);
  }

  function ye(t) {
    var e = t.body,
        n = t.documentElement,
        i = he(10) && getComputedStyle(n);
    return {
      height: ve("Height", e, n, i),
      width: ve("Width", e, n, i)
    };
  }

  var be = function be(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  },
      Ee = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }

    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
      we = function we(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = n, t;
  },
      De = Object.assign || function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];

      for (var i in n) {
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
      }
    }

    return t;
  };

  function Te(t) {
    return De({}, t, {
      right: t.left + t.width,
      bottom: t.top + t.height
    });
  }

  function Ie(t) {
    var e = {};

    try {
      if (he(10)) {
        e = t.getBoundingClientRect();
        var n = me(t, "top"),
            i = me(t, "left");
        e.top += n, e.left += i, e.bottom += n, e.right += i;
      } else e = t.getBoundingClientRect();
    } catch (t) {}

    var o = {
      left: e.left,
      top: e.top,
      width: e.right - e.left,
      height: e.bottom - e.top
    },
        r = "HTML" === t.nodeName ? ye(t.ownerDocument) : {},
        s = r.width || t.clientWidth || o.right - o.left,
        a = r.height || t.clientHeight || o.bottom - o.top,
        l = t.offsetWidth - s,
        c = t.offsetHeight - a;

    if (l || c) {
      var f = ae(t);
      l -= _e(f, "x"), c -= _e(f, "y"), o.width -= l, o.height -= c;
    }

    return Te(o);
  }

  function Ae(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        i = he(10),
        o = "HTML" === e.nodeName,
        r = Ie(t),
        s = Ie(e),
        a = ce(t),
        l = ae(e),
        c = parseFloat(l.borderTopWidth, 10),
        f = parseFloat(l.borderLeftWidth, 10);
    n && o && (s.top = Math.max(s.top, 0), s.left = Math.max(s.left, 0));
    var u = Te({
      top: r.top - s.top - c,
      left: r.left - s.left - f,
      width: r.width,
      height: r.height
    });

    if (u.marginTop = 0, u.marginLeft = 0, !i && o) {
      var h = parseFloat(l.marginTop, 10),
          d = parseFloat(l.marginLeft, 10);
      u.top -= c - h, u.bottom -= c - h, u.left -= f - d, u.right -= f - d, u.marginTop = h, u.marginLeft = d;
    }

    return (i && !n ? e.contains(a) : e === a && "BODY" !== a.nodeName) && (u = function (t, e) {
      var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
          i = me(e, "top"),
          o = me(e, "left"),
          r = n ? -1 : 1;
      return t.top += i * r, t.bottom += i * r, t.left += o * r, t.right += o * r, t;
    }(u, e)), u;
  }

  function Oe(t) {
    if (!t || !t.parentElement || he()) return document.documentElement;

    for (var e = t.parentElement; e && "none" === ae(e, "transform");) {
      e = e.parentElement;
    }

    return e || document.documentElement;
  }

  function Se(t, e, n, i) {
    var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
        r = {
      top: 0,
      left: 0
    },
        s = o ? Oe(t) : ge(t, e);
    if ("viewport" === i) r = function (t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          n = t.ownerDocument.documentElement,
          i = Ae(t, n),
          o = Math.max(n.clientWidth, window.innerWidth || 0),
          r = Math.max(n.clientHeight, window.innerHeight || 0),
          s = e ? 0 : me(n),
          a = e ? 0 : me(n, "left");
      return Te({
        top: s - i.top + i.marginTop,
        left: a - i.left + i.marginLeft,
        width: o,
        height: r
      });
    }(s, o);else {
      var a = void 0;
      "scrollParent" === i ? "BODY" === (a = ce(le(e))).nodeName && (a = t.ownerDocument.documentElement) : a = "window" === i ? t.ownerDocument.documentElement : i;
      var l = Ae(a, s, o);
      if ("HTML" !== a.nodeName || function t(e) {
        var n = e.nodeName;
        if ("BODY" === n || "HTML" === n) return !1;
        if ("fixed" === ae(e, "position")) return !0;
        var i = le(e);
        return !!i && t(i);
      }(s)) r = l;else {
        var c = ye(t.ownerDocument),
            f = c.height,
            u = c.width;
        r.top += l.top - l.marginTop, r.bottom = f + l.top, r.left += l.left - l.marginLeft, r.right = u + l.left;
      }
    }
    var h = "number" == typeof (n = n || 0);
    return r.left += h ? n : n.left || 0, r.top += h ? n : n.top || 0, r.right -= h ? n : n.right || 0, r.bottom -= h ? n : n.bottom || 0, r;
  }

  function Le(t, e, n, i, o) {
    var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === t.indexOf("auto")) return t;
    var s = Se(n, i, r, o),
        a = {
      top: {
        width: s.width,
        height: e.top - s.top
      },
      right: {
        width: s.right - e.right,
        height: s.height
      },
      bottom: {
        width: s.width,
        height: s.bottom - e.bottom
      },
      left: {
        width: e.left - s.left,
        height: s.height
      }
    },
        l = Object.keys(a).map(function (t) {
      return De({
        key: t
      }, a[t], {
        area: (e = a[t], e.width * e.height)
      });
      var e;
    }).sort(function (t, e) {
      return e.area - t.area;
    }),
        c = l.filter(function (t) {
      var e = t.width,
          i = t.height;
      return e >= n.clientWidth && i >= n.clientHeight;
    }),
        f = c.length > 0 ? c[0].key : l[0].key,
        u = t.split("-")[1];
    return f + (u ? "-" + u : "");
  }

  function Ce(t, e, n) {
    var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
    return Ae(n, i ? Oe(e) : ge(e, n), i);
  }

  function Ne(t) {
    var e = t.ownerDocument.defaultView.getComputedStyle(t),
        n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
        i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
    return {
      width: t.offsetWidth + i,
      height: t.offsetHeight + n
    };
  }

  function ke(t) {
    var e = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    return t.replace(/left|right|bottom|top/g, function (t) {
      return e[t];
    });
  }

  function Pe(t, e, n) {
    n = n.split("-")[0];
    var i = Ne(t),
        o = {
      width: i.width,
      height: i.height
    },
        r = -1 !== ["right", "left"].indexOf(n),
        s = r ? "top" : "left",
        a = r ? "left" : "top",
        l = r ? "height" : "width",
        c = r ? "width" : "height";
    return o[s] = e[s] + e[l] / 2 - i[l] / 2, o[a] = n === a ? e[a] - i[c] : e[ke(a)], o;
  }

  function xe(t, e) {
    return Array.prototype.find ? t.find(e) : t.filter(e)[0];
  }

  function Me(t, e, n) {
    return (void 0 === n ? t : t.slice(0, function (t, e, n) {
      if (Array.prototype.findIndex) return t.findIndex(function (t) {
        return t[e] === n;
      });
      var i = xe(t, function (t) {
        return t[e] === n;
      });
      return t.indexOf(i);
    }(t, "name", n))).forEach(function (t) {
      t["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
      var n = t["function"] || t.fn;
      t.enabled && se(n) && (e.offsets.popper = Te(e.offsets.popper), e.offsets.reference = Te(e.offsets.reference), e = n(e, t));
    }), e;
  }

  function He(t, e) {
    return t.some(function (t) {
      var n = t.name;
      return t.enabled && n === e;
    });
  }

  function je(t) {
    for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e.length; i++) {
      var o = e[i],
          r = o ? "" + o + n : t;
      if ("undefined" != typeof document.body.style[r]) return r;
    }

    return null;
  }

  function Re(t) {
    var e = t.ownerDocument;
    return e ? e.defaultView : window;
  }

  function We(t, e, n, i) {
    n.updateBound = i, Re(t).addEventListener("resize", n.updateBound, {
      passive: !0
    });
    var o = ce(t);
    return function t(e, n, i, o) {
      var r = "BODY" === e.nodeName,
          s = r ? e.ownerDocument.defaultView : e;
      s.addEventListener(n, i, {
        passive: !0
      }), r || t(ce(s.parentNode), n, i, o), o.push(s);
    }(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n;
  }

  function Fe() {
    var t, e;
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference, e = this.state, Re(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function (t) {
      t.removeEventListener("scroll", e.updateBound);
    }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e));
  }

  function Ue(t) {
    return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
  }

  function Be(t, e) {
    Object.keys(e).forEach(function (n) {
      var i = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && Ue(e[n]) && (i = "px"), t.style[n] = e[n] + i;
    });
  }

  var Ke = ee && /Firefox/i.test(navigator.userAgent);

  function Ve(t, e, n) {
    var i = xe(t, function (t) {
      return t.name === e;
    }),
        o = !!i && t.some(function (t) {
      return t.name === n && t.enabled && t.order < i.order;
    });

    if (!o) {
      var r = "`" + e + "`",
          s = "`" + n + "`";
      console.warn(s + " modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!");
    }

    return o;
  }

  var Ye = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
      Qe = Ye.slice(3);

  function Ge(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        n = Qe.indexOf(t),
        i = Qe.slice(n + 1).concat(Qe.slice(0, n));
    return e ? i.reverse() : i;
  }

  var Xe = {
    FLIP: "flip",
    CLOCKWISE: "clockwise",
    COUNTERCLOCKWISE: "counterclockwise"
  };

  function qe(t, e, n, i) {
    var o = [0, 0],
        r = -1 !== ["right", "left"].indexOf(i),
        s = t.split(/(\+|\-)/).map(function (t) {
      return t.trim();
    }),
        a = s.indexOf(xe(s, function (t) {
      return -1 !== t.search(/,|\s/);
    }));
    s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
    var l = /\s*,\s*|\s+/,
        c = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] : [s];
    return (c = c.map(function (t, i) {
      var o = (1 === i ? !r : r) ? "height" : "width",
          s = !1;
      return t.reduce(function (t, e) {
        return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, s = !0, t) : s ? (t[t.length - 1] += e, s = !1, t) : t.concat(e);
      }, []).map(function (t) {
        return function (t, e, n, i) {
          var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
              r = +o[1],
              s = o[2];
          if (!r) return t;

          if (0 === s.indexOf("%")) {
            var a = void 0;

            switch (s) {
              case "%p":
                a = n;
                break;

              case "%":
              case "%r":
              default:
                a = i;
            }

            return Te(a)[e] / 100 * r;
          }

          if ("vh" === s || "vw" === s) return ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * r;
          return r;
        }(t, o, e, n);
      });
    })).forEach(function (t, e) {
      t.forEach(function (n, i) {
        Ue(n) && (o[e] += n * ("-" === t[i - 1] ? -1 : 1));
      });
    }), o;
  }

  var ze = {
    placement: "bottom",
    positionFixed: !1,
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate: function onCreate() {},
    onUpdate: function onUpdate() {},
    modifiers: {
      shift: {
        order: 100,
        enabled: !0,
        fn: function fn(t) {
          var e = t.placement,
              n = e.split("-")[0],
              i = e.split("-")[1];

          if (i) {
            var o = t.offsets,
                r = o.reference,
                s = o.popper,
                a = -1 !== ["bottom", "top"].indexOf(n),
                l = a ? "left" : "top",
                c = a ? "width" : "height",
                f = {
              start: we({}, l, r[l]),
              end: we({}, l, r[l] + r[c] - s[c])
            };
            t.offsets.popper = De({}, s, f[i]);
          }

          return t;
        }
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: function fn(t, e) {
          var n = e.offset,
              i = t.placement,
              o = t.offsets,
              r = o.popper,
              s = o.reference,
              a = i.split("-")[0],
              l = void 0;
          return l = Ue(+n) ? [+n, 0] : qe(n, r, s, a), "left" === a ? (r.top += l[0], r.left -= l[1]) : "right" === a ? (r.top += l[0], r.left += l[1]) : "top" === a ? (r.left += l[0], r.top -= l[1]) : "bottom" === a && (r.left += l[0], r.top += l[1]), t.popper = r, t;
        },
        offset: 0
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn: function fn(t, e) {
          var n = e.boundariesElement || de(t.instance.popper);
          t.instance.reference === n && (n = de(n));
          var i = je("transform"),
              o = t.instance.popper.style,
              r = o.top,
              s = o.left,
              a = o[i];
          o.top = "", o.left = "", o[i] = "";
          var l = Se(t.instance.popper, t.instance.reference, e.padding, n, t.positionFixed);
          o.top = r, o.left = s, o[i] = a, e.boundaries = l;
          var c = e.priority,
              f = t.offsets.popper,
              u = {
            primary: function primary(t) {
              var n = f[t];
              return f[t] < l[t] && !e.escapeWithReference && (n = Math.max(f[t], l[t])), we({}, t, n);
            },
            secondary: function secondary(t) {
              var n = "right" === t ? "left" : "top",
                  i = f[n];
              return f[t] > l[t] && !e.escapeWithReference && (i = Math.min(f[n], l[t] - ("right" === t ? f.width : f.height))), we({}, n, i);
            }
          };
          return c.forEach(function (t) {
            var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
            f = De({}, f, u[e](t));
          }), t.offsets.popper = f, t;
        },
        priority: ["left", "right", "top", "bottom"],
        padding: 5,
        boundariesElement: "scrollParent"
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn: function fn(t) {
          var e = t.offsets,
              n = e.popper,
              i = e.reference,
              o = t.placement.split("-")[0],
              r = Math.floor,
              s = -1 !== ["top", "bottom"].indexOf(o),
              a = s ? "right" : "bottom",
              l = s ? "left" : "top",
              c = s ? "width" : "height";
          return n[a] < r(i[l]) && (t.offsets.popper[l] = r(i[l]) - n[c]), n[l] > r(i[a]) && (t.offsets.popper[l] = r(i[a])), t;
        }
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn: function fn(t, e) {
          var n;
          if (!Ve(t.instance.modifiers, "arrow", "keepTogether")) return t;
          var i = e.element;

          if ("string" == typeof i) {
            if (!(i = t.instance.popper.querySelector(i))) return t;
          } else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;

          var o = t.placement.split("-")[0],
              r = t.offsets,
              s = r.popper,
              a = r.reference,
              l = -1 !== ["left", "right"].indexOf(o),
              c = l ? "height" : "width",
              f = l ? "Top" : "Left",
              u = f.toLowerCase(),
              h = l ? "left" : "top",
              d = l ? "bottom" : "right",
              p = Ne(i)[c];
          a[d] - p < s[u] && (t.offsets.popper[u] -= s[u] - (a[d] - p)), a[u] + p > s[d] && (t.offsets.popper[u] += a[u] + p - s[d]), t.offsets.popper = Te(t.offsets.popper);

          var g = a[u] + a[c] / 2 - p / 2,
              m = ae(t.instance.popper),
              _ = parseFloat(m["margin" + f], 10),
              v = parseFloat(m["border" + f + "Width"], 10),
              y = g - t.offsets.popper[u] - _ - v;

          return y = Math.max(Math.min(s[c] - p, y), 0), t.arrowElement = i, t.offsets.arrow = (we(n = {}, u, Math.round(y)), we(n, h, ""), n), t;
        },
        element: "[x-arrow]"
      },
      flip: {
        order: 600,
        enabled: !0,
        fn: function fn(t, e) {
          if (He(t.instance.modifiers, "inner")) return t;
          if (t.flipped && t.placement === t.originalPlacement) return t;
          var n = Se(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed),
              i = t.placement.split("-")[0],
              o = ke(i),
              r = t.placement.split("-")[1] || "",
              s = [];

          switch (e.behavior) {
            case Xe.FLIP:
              s = [i, o];
              break;

            case Xe.CLOCKWISE:
              s = Ge(i);
              break;

            case Xe.COUNTERCLOCKWISE:
              s = Ge(i, !0);
              break;

            default:
              s = e.behavior;
          }

          return s.forEach(function (a, l) {
            if (i !== a || s.length === l + 1) return t;
            i = t.placement.split("-")[0], o = ke(i);

            var c = t.offsets.popper,
                f = t.offsets.reference,
                u = Math.floor,
                h = "left" === i && u(c.right) > u(f.left) || "right" === i && u(c.left) < u(f.right) || "top" === i && u(c.bottom) > u(f.top) || "bottom" === i && u(c.top) < u(f.bottom),
                d = u(c.left) < u(n.left),
                p = u(c.right) > u(n.right),
                g = u(c.top) < u(n.top),
                m = u(c.bottom) > u(n.bottom),
                _ = "left" === i && d || "right" === i && p || "top" === i && g || "bottom" === i && m,
                v = -1 !== ["top", "bottom"].indexOf(i),
                y = !!e.flipVariations && (v && "start" === r && d || v && "end" === r && p || !v && "start" === r && g || !v && "end" === r && m),
                b = !!e.flipVariationsByContent && (v && "start" === r && p || v && "end" === r && d || !v && "start" === r && m || !v && "end" === r && g),
                E = y || b;

            (h || _ || E) && (t.flipped = !0, (h || _) && (i = s[l + 1]), E && (r = function (t) {
              return "end" === t ? "start" : "start" === t ? "end" : t;
            }(r)), t.placement = i + (r ? "-" + r : ""), t.offsets.popper = De({}, t.offsets.popper, Pe(t.instance.popper, t.offsets.reference, t.placement)), t = Me(t.instance.modifiers, t, "flip"));
          }), t;
        },
        behavior: "flip",
        padding: 5,
        boundariesElement: "viewport",
        flipVariations: !1,
        flipVariationsByContent: !1
      },
      inner: {
        order: 700,
        enabled: !1,
        fn: function fn(t) {
          var e = t.placement,
              n = e.split("-")[0],
              i = t.offsets,
              o = i.popper,
              r = i.reference,
              s = -1 !== ["left", "right"].indexOf(n),
              a = -1 === ["top", "left"].indexOf(n);
          return o[s ? "left" : "top"] = r[n] - (a ? o[s ? "width" : "height"] : 0), t.placement = ke(e), t.offsets.popper = Te(o), t;
        }
      },
      hide: {
        order: 800,
        enabled: !0,
        fn: function fn(t) {
          if (!Ve(t.instance.modifiers, "hide", "preventOverflow")) return t;
          var e = t.offsets.reference,
              n = xe(t.instance.modifiers, function (t) {
            return "preventOverflow" === t.name;
          }).boundaries;

          if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
            if (!0 === t.hide) return t;
            t.hide = !0, t.attributes["x-out-of-boundaries"] = "";
          } else {
            if (!1 === t.hide) return t;
            t.hide = !1, t.attributes["x-out-of-boundaries"] = !1;
          }

          return t;
        }
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn: function fn(t, e) {
          var n = e.x,
              i = e.y,
              o = t.offsets.popper,
              r = xe(t.instance.modifiers, function (t) {
            return "applyStyle" === t.name;
          }).gpuAcceleration;
          void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");

          var s = void 0 !== r ? r : e.gpuAcceleration,
              a = de(t.instance.popper),
              l = Ie(a),
              c = {
            position: o.position
          },
              f = function (t, e) {
            var n = t.offsets,
                i = n.popper,
                o = n.reference,
                r = Math.round,
                s = Math.floor,
                a = function a(t) {
              return t;
            },
                l = r(o.width),
                c = r(i.width),
                f = -1 !== ["left", "right"].indexOf(t.placement),
                u = -1 !== t.placement.indexOf("-"),
                h = e ? f || u || l % 2 == c % 2 ? r : s : a,
                d = e ? r : a;

            return {
              left: h(l % 2 == 1 && c % 2 == 1 && !u && e ? i.left - 1 : i.left),
              top: d(i.top),
              bottom: d(i.bottom),
              right: h(i.right)
            };
          }(t, window.devicePixelRatio < 2 || !Ke),
              u = "bottom" === n ? "top" : "bottom",
              h = "right" === i ? "left" : "right",
              d = je("transform"),
              p = void 0,
              g = void 0;

          if (g = "bottom" === u ? "HTML" === a.nodeName ? -a.clientHeight + f.bottom : -l.height + f.bottom : f.top, p = "right" === h ? "HTML" === a.nodeName ? -a.clientWidth + f.right : -l.width + f.right : f.left, s && d) c[d] = "translate3d(" + p + "px, " + g + "px, 0)", c[u] = 0, c[h] = 0, c.willChange = "transform";else {
            var m = "bottom" === u ? -1 : 1,
                _ = "right" === h ? -1 : 1;

            c[u] = g * m, c[h] = p * _, c.willChange = u + ", " + h;
          }
          var v = {
            "x-placement": t.placement
          };
          return t.attributes = De({}, v, t.attributes), t.styles = De({}, c, t.styles), t.arrowStyles = De({}, t.offsets.arrow, t.arrowStyles), t;
        },
        gpuAcceleration: !0,
        x: "bottom",
        y: "right"
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn: function fn(t) {
          var e, n;
          return Be(t.instance.popper, t.styles), e = t.instance.popper, n = t.attributes, Object.keys(n).forEach(function (t) {
            !1 !== n[t] ? e.setAttribute(t, n[t]) : e.removeAttribute(t);
          }), t.arrowElement && Object.keys(t.arrowStyles).length && Be(t.arrowElement, t.arrowStyles), t;
        },
        onLoad: function onLoad(t, e, n, i, o) {
          var r = Ce(o, e, t, n.positionFixed),
              s = Le(n.placement, r, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
          return e.setAttribute("x-placement", s), Be(e, {
            position: n.positionFixed ? "fixed" : "absolute"
          }), n;
        },
        gpuAcceleration: void 0
      }
    }
  },
      Ze = function () {
    function t(e, n) {
      var i = this,
          o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      be(this, t), this.scheduleUpdate = function () {
        return requestAnimationFrame(i.update);
      }, this.update = re(this.update.bind(this)), this.options = De({}, t.Defaults, o), this.state = {
        isDestroyed: !1,
        isCreated: !1,
        scrollParents: []
      }, this.reference = e && e.jquery ? e[0] : e, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(De({}, t.Defaults.modifiers, o.modifiers)).forEach(function (e) {
        i.options.modifiers[e] = De({}, t.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[e] : {});
      }), this.modifiers = Object.keys(this.options.modifiers).map(function (t) {
        return De({
          name: t
        }, i.options.modifiers[t]);
      }).sort(function (t, e) {
        return t.order - e.order;
      }), this.modifiers.forEach(function (t) {
        t.enabled && se(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state);
      }), this.update();
      var r = this.options.eventsEnabled;
      r && this.enableEventListeners(), this.state.eventsEnabled = r;
    }

    return Ee(t, [{
      key: "update",
      value: function value() {
        return function () {
          if (!this.state.isDestroyed) {
            var t = {
              instance: this,
              styles: {},
              arrowStyles: {},
              attributes: {},
              flipped: !1,
              offsets: {}
            };
            t.offsets.reference = Ce(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = Le(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = Pe(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = Me(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t));
          }
        }.call(this);
      }
    }, {
      key: "destroy",
      value: function value() {
        return function () {
          return this.state.isDestroyed = !0, He(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[je("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
        }.call(this);
      }
    }, {
      key: "enableEventListeners",
      value: function value() {
        return function () {
          this.state.eventsEnabled || (this.state = We(this.reference, this.options, this.state, this.scheduleUpdate));
        }.call(this);
      }
    }, {
      key: "disableEventListeners",
      value: function value() {
        return Fe.call(this);
      }
    }]), t;
  }();

  Ze.Utils = ("undefined" != typeof window ? window : global).PopperUtils, Ze.placements = Ye, Ze.Defaults = ze;

  var $e = "dropdown",
      Je = "bs.dropdown",
      tn = "." + Je,
      en = new RegExp("38|40|27"),
      nn = {
    HIDE: "hide" + tn,
    HIDDEN: "hidden" + tn,
    SHOW: "show" + tn,
    SHOWN: "shown" + tn,
    CLICK: "click" + tn,
    CLICK_DATA_API: "click" + tn + ".data-api",
    KEYDOWN_DATA_API: "keydown" + tn + ".data-api",
    KEYUP_DATA_API: "keyup" + tn + ".data-api"
  },
      on = "disabled",
      rn = "show",
      sn = "dropup",
      an = "dropright",
      ln = "dropleft",
      cn = "dropdown-menu-right",
      fn = "position-static",
      un = '[data-toggle="dropdown"]',
      hn = ".dropdown form",
      dn = ".dropdown-menu",
      pn = ".navbar-nav",
      gn = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
      mn = "top-start",
      _n = "top-end",
      vn = "bottom-start",
      yn = "bottom-end",
      bn = "right-start",
      En = "left-start",
      wn = {
    offset: 0,
    flip: !0,
    boundary: "scrollParent",
    reference: "toggle",
    display: "dynamic"
  },
      Dn = {
    offset: "(number|string|function)",
    flip: "boolean",
    boundary: "(string|element)",
    reference: "(string|element)",
    display: "string"
  },
      Tn = function () {
    function t(t, e) {
      this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners(), E.setData(t, Je, this);
    }

    var n = t.prototype;
    return n.toggle = function () {
      if (!this._element.disabled && !this._element.classList.contains(on)) {
        var e = t._getParentFromElement(this._element),
            n = this._menu.classList.contains(rn);

        if (t._clearMenus(), !n) {
          var i = {
            relatedTarget: this._element
          };

          if (!Q.trigger(e, nn.SHOW, i).defaultPrevented) {
            if (!this._inNavbar) {
              if ("undefined" == typeof Ze) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org)");
              var o = this._element;
              "parent" === this._config.reference ? o = e : d(this._config.reference) && (o = this._config.reference, "undefined" != typeof this._config.reference.jquery && (o = this._config.reference[0])), "scrollParent" !== this._config.boundary && e.classList.add(fn), this._popper = new Ze(o, this._menu, this._getPopperConfig());
            }

            "ontouchstart" in document.documentElement && !m(G.closest(e, pn)).length && m(document.body.children).forEach(function (t) {
              return Q.on(t, "mouseover", null, function () {});
            }), this._element.focus(), this._element.setAttribute("aria-expanded", !0), _t.toggleClass(this._menu, rn), _t.toggleClass(e, rn), Q.trigger(e, nn.SHOWN, i);
          }
        }
      }
    }, n.show = function () {
      if (!(this._element.disabled || this._element.classList.contains(on) || this._menu.classList.contains(rn))) {
        var e = t._getParentFromElement(this._element),
            n = {
          relatedTarget: this._element
        };

        Q.trigger(e, nn.SHOW, n).defaultPrevented || (_t.toggleClass(this._menu, rn), _t.toggleClass(e, rn), Q.trigger(e, nn.SHOWN, n));
      }
    }, n.hide = function () {
      if (!this._element.disabled && !this._element.classList.contains(on) && this._menu.classList.contains(rn)) {
        var e = t._getParentFromElement(this._element),
            n = {
          relatedTarget: this._element
        };

        Q.trigger(e, nn.HIDE, n).defaultPrevented || (_t.toggleClass(this._menu, rn), _t.toggleClass(e, rn), Q.trigger(e, nn.HIDDEN, n));
      }
    }, n.dispose = function () {
      E.removeData(this._element, Je), Q.off(this._element, tn), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null);
    }, n.update = function () {
      this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate();
    }, n._addEventListeners = function () {
      var t = this;
      Q.on(this._element, nn.CLICK, function (e) {
        e.preventDefault(), e.stopPropagation(), t.toggle();
      });
    }, n._getConfig = function (t) {
      return t = i({}, this.constructor.Default, _t.getDataAttributes(this._element), t), g($e, t, this.constructor.DefaultType), t;
    }, n._getMenuElement = function () {
      if (!this._menu) {
        var e = t._getParentFromElement(this._element);

        e && (this._menu = G.findOne(dn, e));
      }

      return this._menu;
    }, n._getPlacement = function () {
      var t = this._element.parentNode,
          e = vn;
      return t.classList.contains(sn) ? (e = mn, this._menu.classList.contains(cn) && (e = _n)) : t.classList.contains(an) ? e = bn : t.classList.contains(ln) ? e = En : this._menu.classList.contains(cn) && (e = yn), e;
    }, n._detectNavbar = function () {
      return Boolean(G.closest(this._element, ".navbar"));
    }, n._getOffset = function () {
      var t = this,
          e = {};
      return "function" == typeof this._config.offset ? e.fn = function (e) {
        return e.offsets = i({}, e.offsets, t._config.offset(e.offsets, t._element) || {}), e;
      } : e.offset = this._config.offset, e;
    }, n._getPopperConfig = function () {
      var t = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      };
      return "static" === this._config.display && (t.modifiers.applyStyle = {
        enabled: !1
      }), t;
    }, t._dropdownInterface = function (e, n) {
      var i = E.getData(e, Je);

      if (i || (i = new t(e, "object" == _typeof(n) ? n : null)), "string" == typeof n) {
        if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
        i[n]();
      }
    }, t._jQueryInterface = function (e) {
      return this.each(function () {
        t._dropdownInterface(this, e);
      });
    }, t._clearMenus = function (e) {
      if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which)) for (var n = m(G.find(un)), i = 0, o = n.length; i < o; i++) {
        var r = t._getParentFromElement(n[i]),
            s = E.getData(n[i], Je),
            a = {
          relatedTarget: n[i]
        };

        if (e && "click" === e.type && (a.clickEvent = e), s) {
          var l = s._menu;
          if (r.classList.contains(rn)) if (!(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && r.contains(e.target))) Q.trigger(r, nn.HIDE, a).defaultPrevented || ("ontouchstart" in document.documentElement && m(document.body.children).forEach(function (t) {
            return Q.off(t, "mouseover", null, function () {});
          }), n[i].setAttribute("aria-expanded", "false"), l.classList.remove(rn), r.classList.remove(rn), Q.trigger(r, nn.HIDDEN, a));
        }
      }
    }, t._getParentFromElement = function (t) {
      var e,
          n = f(t);
      return n && (e = G.findOne(n)), e || t.parentNode;
    }, t._dataApiKeydownHandler = function (e) {
      if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || G.closest(e.target, dn))) : en.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !this.classList.contains(on))) {
        var n = t._getParentFromElement(this),
            i = n.classList.contains(rn);

        if (!i || i && (27 === e.which || 32 === e.which)) return 27 === e.which && Q.trigger(G.findOne(un, n), "focus"), void t._clearMenus();
        var o = m(G.find(gn, n));

        if (o.length) {
          var r = o.indexOf(e.target);
          38 === e.which && r > 0 && r--, 40 === e.which && r < o.length - 1 && r++, r < 0 && (r = 0), o[r].focus();
        }
      }
    }, t._getInstance = function (t) {
      return E.getData(t, Je);
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.3.1";
      }
    }, {
      key: "Default",
      get: function get() {
        return wn;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return Dn;
      }
    }]), t;
  }();

  if (Q.on(document, nn.KEYDOWN_DATA_API, un, Tn._dataApiKeydownHandler), Q.on(document, nn.KEYDOWN_DATA_API, dn, Tn._dataApiKeydownHandler), Q.on(document, nn.CLICK_DATA_API, Tn._clearMenus), Q.on(document, nn.KEYUP_DATA_API, Tn._clearMenus), Q.on(document, nn.CLICK_DATA_API, un, function (t) {
    t.preventDefault(), t.stopPropagation(), Tn._dropdownInterface(this, "toggle");
  }), Q.on(document, nn.CLICK_DATA_API, hn, function (t) {
    return t.stopPropagation();
  }), "undefined" != typeof l) {
    var In = l.fn[$e];
    l.fn[$e] = Tn._jQueryInterface, l.fn[$e].Constructor = Tn, l.fn[$e].noConflict = function () {
      return l.fn[$e] = In, Tn._jQueryInterface;
    };
  }

  var An = "bs.modal",
      On = "." + An,
      Sn = {
    backdrop: !0,
    keyboard: !0,
    focus: !0,
    show: !0
  },
      Ln = {
    backdrop: "(boolean|string)",
    keyboard: "boolean",
    focus: "boolean",
    show: "boolean"
  },
      Cn = {
    HIDE: "hide" + On,
    HIDDEN: "hidden" + On,
    SHOW: "show" + On,
    SHOWN: "shown" + On,
    FOCUSIN: "focusin" + On,
    RESIZE: "resize" + On,
    CLICK_DISMISS: "click.dismiss" + On,
    KEYDOWN_DISMISS: "keydown.dismiss" + On,
    MOUSEUP_DISMISS: "mouseup.dismiss" + On,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + On,
    CLICK_DATA_API: "click" + On + ".data-api"
  },
      Nn = "modal-dialog-scrollable",
      kn = "modal-scrollbar-measure",
      Pn = "modal-backdrop",
      xn = "modal-open",
      Mn = "fade",
      Hn = "show",
      jn = {
    DIALOG: ".modal-dialog",
    MODAL_BODY: ".modal-body",
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    STICKY_CONTENT: ".sticky-top"
  },
      Rn = function () {
    function t(t, e) {
      this._config = this._getConfig(e), this._element = t, this._dialog = G.findOne(jn.DIALOG, t), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0, E.setData(t, An, this);
    }

    var n = t.prototype;
    return n.toggle = function (t) {
      return this._isShown ? this.hide() : this.show(t);
    }, n.show = function (t) {
      var e = this;

      if (!this._isShown && !this._isTransitioning) {
        this._element.classList.contains(Mn) && (this._isTransitioning = !0);
        var n = Q.trigger(this._element, Cn.SHOW, {
          relatedTarget: t
        });
        this._isShown || n.defaultPrevented || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), Q.on(this._element, Cn.CLICK_DISMISS, jn.DATA_DISMISS, function (t) {
          return e.hide(t);
        }), Q.on(this._dialog, Cn.MOUSEDOWN_DISMISS, function () {
          Q.one(e._element, Cn.MOUSEUP_DISMISS, function (t) {
            t.target === e._element && (e._ignoreBackdropClick = !0);
          });
        }), this._showBackdrop(function () {
          return e._showElement(t);
        }));
      }
    }, n.hide = function (t) {
      var e = this;

      if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
        var n = Q.trigger(this._element, Cn.HIDE);

        if (this._isShown && !n.defaultPrevented) {
          this._isShown = !1;

          var i = this._element.classList.contains(Mn);

          if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), Q.off(document, Cn.FOCUSIN), this._element.classList.remove(Hn), Q.off(this._element, Cn.CLICK_DISMISS), Q.off(this._dialog, Cn.MOUSEDOWN_DISMISS), i) {
            var o = u(this._element);
            Q.one(this._element, a, function (t) {
              return e._hideModal(t);
            }), p(this._element, o);
          } else this._hideModal();
        }
      }
    }, n.dispose = function () {
      [window, this._element, this._dialog].forEach(function (t) {
        return Q.off(t, On);
      }), Q.off(document, Cn.FOCUSIN), E.removeData(this._element, An), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null;
    }, n.handleUpdate = function () {
      this._adjustDialog();
    }, n._getConfig = function (t) {
      return t = i({}, Sn, t), g("modal", t, Ln), t;
    }, n._showElement = function (t) {
      var e = this,
          n = this._element.classList.contains(Mn);

      this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._dialog.classList.contains(Nn) ? G.findOne(jn.MODAL_BODY, this._dialog).scrollTop = 0 : this._element.scrollTop = 0, n && y(this._element), this._element.classList.add(Hn), this._config.focus && this._enforceFocus();

      var i = function i() {
        e._config.focus && e._element.focus(), e._isTransitioning = !1, Q.trigger(e._element, Cn.SHOWN, {
          relatedTarget: t
        });
      };

      if (n) {
        var o = u(this._dialog);
        Q.one(this._dialog, a, i), p(this._dialog, o);
      } else i();
    }, n._enforceFocus = function () {
      var t = this;
      Q.off(document, Cn.FOCUSIN), Q.on(document, Cn.FOCUSIN, function (e) {
        document === e.target || t._element === e.target || t._element.contains(e.target) || t._element.focus();
      });
    }, n._setEscapeEvent = function () {
      var t = this;
      this._isShown && this._config.keyboard ? Q.on(this._element, Cn.KEYDOWN_DISMISS, function (e) {
        27 === e.which && (e.preventDefault(), t.hide());
      }) : this._isShown || Q.off(this._element, Cn.KEYDOWN_DISMISS);
    }, n._setResizeEvent = function () {
      var t = this;
      this._isShown ? Q.on(window, Cn.RESIZE, function (e) {
        return t.handleUpdate(e);
      }) : Q.off(window, Cn.RESIZE);
    }, n._hideModal = function () {
      var t = this;
      this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function () {
        document.body.classList.remove(xn), t._resetAdjustments(), t._resetScrollbar(), Q.trigger(t._element, Cn.HIDDEN);
      });
    }, n._removeBackdrop = function () {
      this._backdrop && (this._backdrop.parentNode.removeChild(this._backdrop), this._backdrop = null);
    }, n._showBackdrop = function (t) {
      var e = this,
          n = this._element.classList.contains(Mn) ? Mn : "";

      if (this._isShown && this._config.backdrop) {
        if (this._backdrop = document.createElement("div"), this._backdrop.className = Pn, n && this._backdrop.classList.add(n), document.body.appendChild(this._backdrop), Q.on(this._element, Cn.CLICK_DISMISS, function (t) {
          e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide());
        }), n && y(this._backdrop), this._backdrop.classList.add(Hn), !t) return;
        if (!n) return void t();
        var i = u(this._backdrop);
        Q.one(this._backdrop, a, t), p(this._backdrop, i);
      } else if (!this._isShown && this._backdrop) {
        this._backdrop.classList.remove(Hn);

        var o = function o() {
          e._removeBackdrop(), t && t();
        };

        if (this._element.classList.contains(Mn)) {
          var r = u(this._backdrop);
          Q.one(this._backdrop, a, o), p(this._backdrop, r);
        } else o();
      } else t && t();
    }, n._adjustDialog = function () {
      var t = this._element.scrollHeight > document.documentElement.clientHeight;
      !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px");
    }, n._resetAdjustments = function () {
      this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
    }, n._checkScrollbar = function () {
      var t = document.body.getBoundingClientRect();
      this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
    }, n._setScrollbar = function () {
      var t = this;

      if (this._isBodyOverflowing) {
        m(G.find(jn.FIXED_CONTENT)).forEach(function (e) {
          var n = e.style.paddingRight,
              i = window.getComputedStyle(e)["padding-right"];
          _t.setDataAttribute(e, "padding-right", n), e.style.paddingRight = parseFloat(i) + t._scrollbarWidth + "px";
        }), m(G.find(jn.STICKY_CONTENT)).forEach(function (e) {
          var n = e.style.marginRight,
              i = window.getComputedStyle(e)["margin-right"];
          _t.setDataAttribute(e, "margin-right", n), e.style.marginRight = parseFloat(i) - t._scrollbarWidth + "px";
        });
        var e = document.body.style.paddingRight,
            n = window.getComputedStyle(document.body)["padding-right"];
        _t.setDataAttribute(document.body, "padding-right", e), document.body.style.paddingRight = parseFloat(n) + this._scrollbarWidth + "px";
      }

      document.body.classList.add(xn);
    }, n._resetScrollbar = function () {
      m(G.find(jn.FIXED_CONTENT)).forEach(function (t) {
        var e = _t.getDataAttribute(t, "padding-right");

        "undefined" != typeof e && (_t.removeDataAttribute(t, "padding-right"), t.style.paddingRight = e);
      }), m(G.find("" + jn.STICKY_CONTENT)).forEach(function (t) {
        var e = _t.getDataAttribute(t, "margin-right");

        "undefined" != typeof e && (_t.removeDataAttribute(t, "margin-right"), t.style.marginRight = e);
      });

      var t = _t.getDataAttribute(document.body, "padding-right");

      "undefined" == typeof t ? document.body.style.paddingRight = "" : (_t.removeDataAttribute(document.body, "padding-right"), document.body.style.paddingRight = t);
    }, n._getScrollbarWidth = function () {
      var t = document.createElement("div");
      t.className = kn, document.body.appendChild(t);
      var e = t.getBoundingClientRect().width - t.clientWidth;
      return document.body.removeChild(t), e;
    }, t._jQueryInterface = function (e, n) {
      return this.each(function () {
        var o = E.getData(this, An),
            r = i({}, Sn, _t.getDataAttributes(this), "object" == _typeof(e) && e ? e : {});

        if (o || (o = new t(this, r)), "string" == typeof e) {
          if ("undefined" == typeof o[e]) throw new TypeError('No method named "' + e + '"');
          o[e](n);
        } else r.show && o.show(n);
      });
    }, t._getInstance = function (t) {
      return E.getData(t, An);
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.3.1";
      }
    }, {
      key: "Default",
      get: function get() {
        return Sn;
      }
    }]), t;
  }();

  if (Q.on(document, Cn.CLICK_DATA_API, jn.DATA_TOGGLE, function (t) {
    var e,
        n = this,
        o = f(this);
    o && (e = G.findOne(o));
    var r = E.getData(e, An) ? "toggle" : i({}, _t.getDataAttributes(e), _t.getDataAttributes(this));
    "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault(), Q.one(e, Cn.SHOW, function (t) {
      t.defaultPrevented || Q.one(e, Cn.HIDDEN, function () {
        _(n) && n.focus();
      });
    });
    var s = E.getData(e, An);
    s || (s = new Rn(e, r)), s.show(this);
  }), "undefined" != typeof l) {
    var Wn = l.fn.modal;
    l.fn.modal = Rn._jQueryInterface, l.fn.modal.Constructor = Rn, l.fn.modal.noConflict = function () {
      return l.fn.modal = Wn, Rn._jQueryInterface;
    };
  }

  var Fn = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
      Un = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,
      Bn = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i,
      Kn = function Kn(t, e) {
    var n = t.nodeName.toLowerCase();
    if (-1 !== e.indexOf(n)) return -1 === Fn.indexOf(n) || Boolean(t.nodeValue.match(Un) || t.nodeValue.match(Bn));

    for (var i = e.filter(function (t) {
      return t instanceof RegExp;
    }), o = 0, r = i.length; o < r; o++) {
      if (n.match(i[o])) return !0;
    }

    return !1;
  },
      Vn = {
    "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };

  function Yn(t, e, n) {
    if (!t.length) return t;
    if (n && "function" == typeof n) return n(t);

    for (var i = new window.DOMParser().parseFromString(t, "text/html"), o = Object.keys(e), r = m(i.body.querySelectorAll("*")), s = function s(t, n) {
      var i = r[t],
          s = i.nodeName.toLowerCase();
      if (-1 === o.indexOf(s)) return i.parentNode.removeChild(i), "continue";
      var a = m(i.attributes),
          l = [].concat(e["*"] || [], e[s] || []);
      a.forEach(function (t) {
        Kn(t, l) || i.removeAttribute(t.nodeName);
      });
    }, a = 0, l = r.length; a < l; a++) {
      s(a);
    }

    return i.body.innerHTML;
  }

  var Qn = "tooltip",
      Gn = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
      Xn = ["sanitize", "whiteList", "sanitizeFn"],
      qn = {
    animation: "boolean",
    template: "string",
    title: "(string|element|function)",
    trigger: "string",
    delay: "(number|object)",
    html: "boolean",
    selector: "(string|boolean)",
    placement: "(string|function)",
    offset: "(number|string|function)",
    container: "(string|element|boolean)",
    fallbackPlacement: "(string|array)",
    boundary: "(string|element)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    whiteList: "object"
  },
      zn = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: "right",
    BOTTOM: "bottom",
    LEFT: "left"
  },
      Zn = {
    animation: !0,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    selector: !1,
    placement: "top",
    offset: 0,
    container: !1,
    fallbackPlacement: "flip",
    boundary: "scrollParent",
    sanitize: !0,
    sanitizeFn: null,
    whiteList: Vn
  },
      $n = "show",
      Jn = "out",
      ti = {
    HIDE: "hide.bs.tooltip",
    HIDDEN: "hidden.bs.tooltip",
    SHOW: "show.bs.tooltip",
    SHOWN: "shown.bs.tooltip",
    INSERTED: "inserted.bs.tooltip",
    CLICK: "click.bs.tooltip",
    FOCUSIN: "focusin.bs.tooltip",
    FOCUSOUT: "focusout.bs.tooltip",
    MOUSEENTER: "mouseenter.bs.tooltip",
    MOUSELEAVE: "mouseleave.bs.tooltip"
  },
      ei = "fade",
      ni = "show",
      ii = ".tooltip-inner",
      oi = ".tooltip-arrow",
      ri = "hover",
      si = "focus",
      ai = "click",
      li = "manual",
      ci = function () {
    function t(t, e) {
      if ("undefined" == typeof Ze) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org)");
      this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners(), E.setData(t, this.constructor.DATA_KEY, this);
    }

    var n = t.prototype;
    return n.enable = function () {
      this._isEnabled = !0;
    }, n.disable = function () {
      this._isEnabled = !1;
    }, n.toggleEnabled = function () {
      this._isEnabled = !this._isEnabled;
    }, n.toggle = function (t) {
      if (this._isEnabled) if (t) {
        var e = this.constructor.DATA_KEY,
            n = E.getData(t.delegateTarget, e);
        n || (n = new this.constructor(t.delegateTarget, this._getDelegateConfig()), E.setData(t.delegateTarget, e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n);
      } else {
        if (this.getTipElement().classList.contains(ni)) return void this._leave(null, this);

        this._enter(null, this);
      }
    }, n.dispose = function () {
      clearTimeout(this._timeout), E.removeData(this.element, this.constructor.DATA_KEY), Q.off(this.element, this.constructor.EVENT_KEY), Q.off(G.closest(this.element, ".modal"), "hide.bs.modal"), this.tip && this.tip.parentNode.removeChild(this.tip), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null;
    }, n.show = function () {
      var t = this;
      if ("none" === this.element.style.display) throw new Error("Please use show on visible elements");

      if (this.isWithContent() && this._isEnabled) {
        var e = Q.trigger(this.element, this.constructor.Event.SHOW),
            n = function t(e) {
          if (!document.documentElement.attachShadow) return null;

          if ("function" == typeof e.getRootNode) {
            var n = e.getRootNode();
            return n instanceof ShadowRoot ? n : null;
          }

          return e instanceof ShadowRoot ? e : e.parentNode ? t(e.parentNode) : null;
        }(this.element),
            i = null === n ? this.element.ownerDocument.documentElement.contains(this.element) : n.contains(this.element);

        if (e.defaultPrevented || !i) return;
        var o = this.getTipElement(),
            r = c(this.constructor.NAME);
        o.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && o.classList.add(ei);

        var s = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
            l = this._getAttachment(s);

        this.addAttachmentClass(l);

        var f = this._getContainer();

        E.setData(o, this.constructor.DATA_KEY, this), this.element.ownerDocument.documentElement.contains(this.tip) || f.appendChild(o), Q.trigger(this.element, this.constructor.Event.INSERTED), this._popper = new Ze(this.element, o, {
          placement: l,
          modifiers: {
            offset: this._getOffset(),
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: oi
            },
            preventOverflow: {
              boundariesElement: this.config.boundary
            }
          },
          onCreate: function onCreate(e) {
            e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e);
          },
          onUpdate: function onUpdate(e) {
            return t._handlePopperPlacementChange(e);
          }
        }), o.classList.add(ni), "ontouchstart" in document.documentElement && m(document.body.children).forEach(function (t) {
          Q.on(t, "mouseover", function () {});
        });

        var h = function h() {
          t.config.animation && t._fixTransition();
          var e = t._hoverState;
          t._hoverState = null, Q.trigger(t.element, t.constructor.Event.SHOWN), e === Jn && t._leave(null, t);
        };

        if (this.tip.classList.contains(ei)) {
          var d = u(this.tip);
          Q.one(this.tip, a, h), p(this.tip, d);
        } else h();
      }
    }, n.hide = function (t) {
      var e = this,
          n = this.getTipElement(),
          i = function i() {
        e._hoverState !== $n && n.parentNode && n.parentNode.removeChild(n), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), Q.trigger(e.element, e.constructor.Event.HIDDEN), null !== e._popper && e._popper.destroy(), t && t();
      };

      if (!Q.trigger(this.element, this.constructor.Event.HIDE).defaultPrevented) {
        if (n.classList.remove(ni), "ontouchstart" in document.documentElement && m(document.body.children).forEach(function (t) {
          return Q.off(t, "mouseover", v);
        }), this._activeTrigger[ai] = !1, this._activeTrigger[si] = !1, this._activeTrigger[ri] = !1, this.tip.classList.contains(ei)) {
          var o = u(n);
          Q.one(n, a, i), p(n, o);
        } else i();

        this._hoverState = "";
      }
    }, n.update = function () {
      null !== this._popper && this._popper.scheduleUpdate();
    }, n.isWithContent = function () {
      return Boolean(this.getTitle());
    }, n.addAttachmentClass = function (t) {
      this.getTipElement().classList.add("bs-tooltip-" + t);
    }, n.getTipElement = function () {
      if (this.tip) return this.tip;
      var t = document.createElement("div");
      return t.innerHTML = this.config.template, this.tip = t.children[0], this.tip;
    }, n.setContent = function () {
      var t = this.getTipElement();
      this.setElementContent(G.findOne(ii, t), this.getTitle()), t.classList.remove(ei), t.classList.remove(ni);
    }, n.setElementContent = function (t, e) {
      if (null !== t) return "object" == _typeof(e) && (e.nodeType || e.jquery) ? (e.jquery && (e = e[0]), void (this.config.html ? e.parentNode !== t && (t.innerHTML = "", t.appendChild(e)) : t.innerText = e.textContent)) : void (this.config.html ? (this.config.sanitize && (e = Yn(e, this.config.whiteList, this.config.sanitizeFn)), t.innerHTML = e) : t.innerText = e);
    }, n.getTitle = function () {
      var t = this.element.getAttribute("data-original-title");
      return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t;
    }, n._getOffset = function () {
      var t = this,
          e = {};
      return "function" == typeof this.config.offset ? e.fn = function (e) {
        return e.offsets = i({}, e.offsets, t.config.offset(e.offsets, t.element) || {}), e;
      } : e.offset = this.config.offset, e;
    }, n._getContainer = function () {
      return !1 === this.config.container ? document.body : d(this.config.container) ? this.config.container : G.findOne(this.config.container);
    }, n._getAttachment = function (t) {
      return zn[t.toUpperCase()];
    }, n._setListeners = function () {
      var t = this;
      this.config.trigger.split(" ").forEach(function (e) {
        if ("click" === e) Q.on(t.element, t.constructor.Event.CLICK, t.config.selector, function (e) {
          return t.toggle(e);
        });else if (e !== li) {
          var n = e === ri ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
              i = e === ri ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
          Q.on(t.element, n, t.config.selector, function (e) {
            return t._enter(e);
          }), Q.on(t.element, i, t.config.selector, function (e) {
            return t._leave(e);
          });
        }
      }), Q.on(G.closest(this.element, ".modal"), "hide.bs.modal", function () {
        t.element && t.hide();
      }), this.config.selector ? this.config = i({}, this.config, {
        trigger: "manual",
        selector: ""
      }) : this._fixTitle();
    }, n._fixTitle = function () {
      var t = _typeof(this.element.getAttribute("data-original-title"));

      (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
    }, n._enter = function (t, e) {
      var n = this.constructor.DATA_KEY;
      (e = e || E.getData(t.delegateTarget, n)) || (e = new this.constructor(t.delegateTarget, this._getDelegateConfig()), E.setData(t.delegateTarget, n, e)), t && (e._activeTrigger["focusin" === t.type ? si : ri] = !0), e.getTipElement().classList.contains(ni) || e._hoverState === $n ? e._hoverState = $n : (clearTimeout(e._timeout), e._hoverState = $n, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function () {
        e._hoverState === $n && e.show();
      }, e.config.delay.show) : e.show());
    }, n._leave = function (t, e) {
      var n = this.constructor.DATA_KEY;
      (e = e || E.getData(t.delegateTarget, n)) || (e = new this.constructor(t.delegateTarget, this._getDelegateConfig()), E.setData(t.delegateTarget, n, e)), t && (e._activeTrigger["focusout" === t.type ? si : ri] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = Jn, e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function () {
        e._hoverState === Jn && e.hide();
      }, e.config.delay.hide) : e.hide());
    }, n._isWithActiveTrigger = function () {
      for (var t in this._activeTrigger) {
        if (this._activeTrigger[t]) return !0;
      }

      return !1;
    }, n._getConfig = function (t) {
      var e = _t.getDataAttributes(this.element);

      return Object.keys(e).forEach(function (t) {
        -1 !== Xn.indexOf(t) && delete e[t];
      }), t && "object" == _typeof(t.container) && t.container.jquery && (t.container = t.container[0]), "number" == typeof (t = i({}, this.constructor.Default, e, "object" == _typeof(t) && t ? t : {})).delay && (t.delay = {
        show: t.delay,
        hide: t.delay
      }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), g(Qn, t, this.constructor.DefaultType), t.sanitize && (t.template = Yn(t.template, t.whiteList, t.sanitizeFn)), t;
    }, n._getDelegateConfig = function () {
      var t = {};
      if (this.config) for (var e in this.config) {
        this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
      }
      return t;
    }, n._cleanTipClass = function () {
      var t = this.getTipElement(),
          e = t.getAttribute("class").match(Gn);
      null !== e && e.length && e.map(function (t) {
        return t.trim();
      }).forEach(function (e) {
        return t.classList.remove(e);
      });
    }, n._handlePopperPlacementChange = function (t) {
      var e = t.instance;
      this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement));
    }, n._fixTransition = function () {
      var t = this.getTipElement(),
          e = this.config.animation;
      null === t.getAttribute("x-placement") && (t.classList.remove(ei), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e);
    }, t._jQueryInterface = function (e) {
      return this.each(function () {
        var n = E.getData(this, "bs.tooltip"),
            i = "object" == _typeof(e) && e;

        if ((n || !/dispose|hide/.test(e)) && (n || (n = new t(this, i)), "string" == typeof e)) {
          if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
          n[e]();
        }
      });
    }, t._getInstance = function (t) {
      return E.getData(t, "bs.tooltip");
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.3.1";
      }
    }, {
      key: "Default",
      get: function get() {
        return Zn;
      }
    }, {
      key: "NAME",
      get: function get() {
        return Qn;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return "bs.tooltip";
      }
    }, {
      key: "Event",
      get: function get() {
        return ti;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return ".bs.tooltip";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return qn;
      }
    }]), t;
  }();

  if ("undefined" != typeof l) {
    var fi = l.fn.tooltip;
    l.fn.tooltip = ci._jQueryInterface, l.fn.tooltip.Constructor = ci, l.fn.tooltip.noConflict = function () {
      return l.fn.tooltip = fi, ci._jQueryInterface;
    };
  }

  var ui = "popover",
      hi = new RegExp("(^|\\s)bs-popover\\S+", "g"),
      di = i({}, ci.Default, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  }),
      pi = i({}, ci.DefaultType, {
    content: "(string|element|function)"
  }),
      gi = "fade",
      mi = "show",
      _i = ".popover-header",
      vi = ".popover-body",
      yi = {
    HIDE: "hide.bs.popover",
    HIDDEN: "hidden.bs.popover",
    SHOW: "show.bs.popover",
    SHOWN: "shown.bs.popover",
    INSERTED: "inserted.bs.popover",
    CLICK: "click.bs.popover",
    FOCUSIN: "focusin.bs.popover",
    FOCUSOUT: "focusout.bs.popover",
    MOUSEENTER: "mouseenter.bs.popover",
    MOUSELEAVE: "mouseleave.bs.popover"
  },
      bi = function (t) {
    var n, i;

    function o() {
      return t.apply(this, arguments) || this;
    }

    i = t, (n = o).prototype = Object.create(i.prototype), n.prototype.constructor = n, n.__proto__ = i;
    var r = o.prototype;
    return r.isWithContent = function () {
      return this.getTitle() || this._getContent();
    }, r.addAttachmentClass = function (t) {
      this.getTipElement().classList.add("bs-popover-" + t);
    }, r.setContent = function () {
      var t = this.getTipElement();
      this.setElementContent(G.findOne(_i, t), this.getTitle());

      var e = this._getContent();

      "function" == typeof e && (e = e.call(this.element)), this.setElementContent(G.findOne(vi, t), e), t.classList.remove(gi), t.classList.remove(mi);
    }, r._getContent = function () {
      return this.element.getAttribute("data-content") || this.config.content;
    }, r._cleanTipClass = function () {
      var t = this.getTipElement(),
          e = t.getAttribute("class").match(hi);
      null !== e && e.length > 0 && e.map(function (t) {
        return t.trim();
      }).forEach(function (e) {
        return t.classList.remove(e);
      });
    }, o._jQueryInterface = function (t) {
      return this.each(function () {
        var e = E.getData(this, "bs.popover"),
            n = "object" == _typeof(t) ? t : null;

        if ((e || !/dispose|hide/.test(t)) && (e || (e = new o(this, n), E.setData(this, "bs.popover", e)), "string" == typeof t)) {
          if ("undefined" == typeof e[t]) throw new TypeError('No method named "' + t + '"');
          e[t]();
        }
      });
    }, o._getInstance = function (t) {
      return E.getData(t, "bs.popover");
    }, e(o, null, [{
      key: "VERSION",
      get: function get() {
        return "4.3.1";
      }
    }, {
      key: "Default",
      get: function get() {
        return di;
      }
    }, {
      key: "NAME",
      get: function get() {
        return ui;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return "bs.popover";
      }
    }, {
      key: "Event",
      get: function get() {
        return yi;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return ".bs.popover";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return pi;
      }
    }]), o;
  }(ci);

  if ("undefined" != typeof l) {
    var Ei = l.fn.popover;
    l.fn.popover = bi._jQueryInterface, l.fn.popover.Constructor = bi, l.fn.popover.noConflict = function () {
      return l.fn.popover = Ei, bi._jQueryInterface;
    };
  }

  var wi = "scrollspy",
      Di = "bs.scrollspy",
      Ti = "." + Di,
      Ii = {
    offset: 10,
    method: "auto",
    target: ""
  },
      Ai = {
    offset: "number",
    method: "string",
    target: "(string|element)"
  },
      Oi = {
    ACTIVATE: "activate" + Ti,
    SCROLL: "scroll" + Ti,
    LOAD_DATA_API: "load" + Ti + ".data-api"
  },
      Si = {
    DROPDOWN_ITEM: "dropdown-item",
    ACTIVE: "active"
  },
      Li = {
    DATA_SPY: '[data-spy="scroll"]',
    NAV_LIST_GROUP: ".nav, .list-group",
    NAV_LINKS: ".nav-link",
    NAV_ITEMS: ".nav-item",
    LIST_ITEMS: ".list-group-item",
    DROPDOWN: ".dropdown",
    DROPDOWN_TOGGLE: ".dropdown-toggle"
  },
      Ci = "offset",
      Ni = "position",
      ki = function () {
    function t(t, e) {
      var n = this;
      this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + Li.NAV_LINKS + "," + this._config.target + " " + Li.LIST_ITEMS + "," + this._config.target + " ." + Si.DROPDOWN_ITEM, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, Q.on(this._scrollElement, Oi.SCROLL, function (t) {
        return n._process(t);
      }), this.refresh(), this._process(), E.setData(t, Di, this);
    }

    var n = t.prototype;
    return n.refresh = function () {
      var t = this,
          e = this._scrollElement === this._scrollElement.window ? Ci : Ni,
          n = "auto" === this._config.method ? e : this._config.method,
          i = n === Ni ? this._getScrollTop() : 0;
      this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), m(G.find(this._selector)).map(function (t) {
        var e,
            o = f(t);

        if (o && (e = G.findOne(o)), e) {
          var r = e.getBoundingClientRect();
          if (r.width || r.height) return [_t[n](e).top + i, o];
        }

        return null;
      }).filter(function (t) {
        return t;
      }).sort(function (t, e) {
        return t[0] - e[0];
      }).forEach(function (e) {
        t._offsets.push(e[0]), t._targets.push(e[1]);
      });
    }, n.dispose = function () {
      E.removeData(this._element, Di), Q.off(this._scrollElement, Ti), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
    }, n._getConfig = function (t) {
      if ("string" != typeof (t = i({}, Ii, "object" == _typeof(t) && t ? t : {})).target) {
        var e = t.target.id;
        e || (e = c(wi), t.target.id = e), t.target = "#" + e;
      }

      return g(wi, t, Ai), t;
    }, n._getScrollTop = function () {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    }, n._getScrollHeight = function () {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }, n._getOffsetHeight = function () {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    }, n._process = function () {
      var t = this._getScrollTop() + this._config.offset,
          e = this._getScrollHeight(),
          n = this._config.offset + e - this._getOffsetHeight();

      if (this._scrollHeight !== e && this.refresh(), t >= n) {
        var i = this._targets[this._targets.length - 1];
        this._activeTarget !== i && this._activate(i);
      } else {
        if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();

        for (var o = this._offsets.length; o--;) {
          this._activeTarget !== this._targets[o] && t >= this._offsets[o] && ("undefined" == typeof this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o]);
        }
      }
    }, n._activate = function (t) {
      this._activeTarget = t, this._clear();

      var e = this._selector.split(",").map(function (e) {
        return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]';
      }),
          n = G.findOne(e.join(","));

      n.classList.contains(Si.DROPDOWN_ITEM) ? (G.findOne(Li.DROPDOWN_TOGGLE, G.closest(n, Li.DROPDOWN)).classList.add(Si.ACTIVE), n.classList.add(Si.ACTIVE)) : (n.classList.add(Si.ACTIVE), G.parents(n, Li.NAV_LIST_GROUP).forEach(function (t) {
        G.prev(t, Li.NAV_LINKS + ", " + Li.LIST_ITEMS).forEach(function (t) {
          return t.classList.add(Si.ACTIVE);
        }), G.prev(t, Li.NAV_ITEMS).forEach(function (t) {
          G.children(t, Li.NAV_LINKS).forEach(function (t) {
            return t.classList.add(Si.ACTIVE);
          });
        });
      })), Q.trigger(this._scrollElement, Oi.ACTIVATE, {
        relatedTarget: t
      });
    }, n._clear = function () {
      m(G.find(this._selector)).filter(function (t) {
        return t.classList.contains(Si.ACTIVE);
      }).forEach(function (t) {
        return t.classList.remove(Si.ACTIVE);
      });
    }, t._jQueryInterface = function (e) {
      return this.each(function () {
        var n = E.getData(this, Di);

        if (n || (n = new t(this, "object" == _typeof(e) && e)), "string" == typeof e) {
          if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
          n[e]();
        }
      });
    }, t._getInstance = function (t) {
      return E.getData(t, Di);
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.3.1";
      }
    }, {
      key: "Default",
      get: function get() {
        return Ii;
      }
    }]), t;
  }();

  if (Q.on(window, Oi.LOAD_DATA_API, function () {
    m(G.find(Li.DATA_SPY)).forEach(function (t) {
      return new ki(t, _t.getDataAttributes(t));
    });
  }), "undefined" != typeof l) {
    var Pi = l.fn[wi];
    l.fn[wi] = ki._jQueryInterface, l.fn[wi].Constructor = ki, l.fn[wi].noConflict = function () {
      return l.fn[wi] = Pi, ki._jQueryInterface;
    };
  }

  var xi = "bs.tab",
      Mi = "." + xi,
      Hi = {
    HIDE: "hide" + Mi,
    HIDDEN: "hidden" + Mi,
    SHOW: "show" + Mi,
    SHOWN: "shown" + Mi,
    CLICK_DATA_API: "click" + Mi + ".data-api"
  },
      ji = "dropdown-menu",
      Ri = "active",
      Wi = "disabled",
      Fi = "fade",
      Ui = "show",
      Bi = ".dropdown",
      Ki = ".nav, .list-group",
      Vi = ".active",
      Yi = ":scope > li > .active",
      Qi = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      Gi = ".dropdown-toggle",
      Xi = ":scope > .dropdown-menu .active",
      qi = function () {
    function t(t) {
      this._element = t, E.setData(this._element, xi, this);
    }

    var n = t.prototype;
    return n.show = function () {
      var t = this;

      if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(Ri) || this._element.classList.contains(Wi))) {
        var e,
            n,
            i = G.closest(this._element, Ki),
            o = f(this._element);

        if (i) {
          var r = "UL" === i.nodeName || "OL" === i.nodeName ? Yi : Vi;
          n = (n = m(G.find(r, i)))[n.length - 1];
        }

        var s = null;

        if (n && (s = Q.trigger(n, Hi.HIDE, {
          relatedTarget: this._element
        })), !(Q.trigger(this._element, Hi.SHOW, {
          relatedTarget: n
        }).defaultPrevented || null !== s && s.defaultPrevented)) {
          o && (e = G.findOne(o)), this._activate(this._element, i);

          var a = function a() {
            Q.trigger(n, Hi.HIDDEN, {
              relatedTarget: t._element
            }), Q.trigger(t._element, Hi.SHOWN, {
              relatedTarget: n
            });
          };

          e ? this._activate(e, e.parentNode, a) : a();
        }
      }
    }, n.dispose = function () {
      E.removeData(this._element, xi), this._element = null;
    }, n._activate = function (t, e, n) {
      var i = this,
          o = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? G.children(e, Vi) : G.find(Yi, e))[0],
          r = n && o && o.classList.contains(Fi),
          s = function s() {
        return i._transitionComplete(t, o, n);
      };

      if (o && r) {
        var l = u(o);
        o.classList.remove(Ui), Q.one(o, a, s), p(o, l);
      } else s();
    }, n._transitionComplete = function (t, e, n) {
      if (e) {
        e.classList.remove(Ri);
        var i = G.findOne(Xi, e.parentNode);
        i && i.classList.remove(Ri), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1);
      }

      (t.classList.add(Ri), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), y(t), t.classList.contains(Fi) && t.classList.add(Ui), t.parentNode && t.parentNode.classList.contains(ji)) && (G.closest(t, Bi) && m(G.find(Gi)).forEach(function (t) {
        return t.classList.add(Ri);
      }), t.setAttribute("aria-expanded", !0));
      n && n();
    }, t._jQueryInterface = function (e) {
      return this.each(function () {
        var n = E.getData(this, xi) || new t(this);

        if ("string" == typeof e) {
          if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
          n[e]();
        }
      });
    }, t._getInstance = function (t) {
      return E.getData(t, xi);
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.3.1";
      }
    }]), t;
  }();

  if (Q.on(document, Hi.CLICK_DATA_API, Qi, function (t) {
    t.preventDefault(), (E.getData(this, xi) || new qi(this)).show();
  }), "undefined" != typeof l) {
    var zi = l.fn.tab;
    l.fn.tab = qi._jQueryInterface, l.fn.tab.Constructor = qi, l.fn.tab.noConflict = function () {
      return l.fn.tab = zi, qi._jQueryInterface;
    };
  }

  var Zi = "bs.toast",
      $i = "." + Zi,
      Ji = {
    CLICK_DISMISS: "click.dismiss" + $i,
    HIDE: "hide" + $i,
    HIDDEN: "hidden" + $i,
    SHOW: "show" + $i,
    SHOWN: "shown" + $i
  },
      to = "fade",
      eo = "hide",
      no = "show",
      io = "showing",
      oo = {
    animation: "boolean",
    autohide: "boolean",
    delay: "number"
  },
      ro = {
    animation: !0,
    autohide: !0,
    delay: 500
  },
      so = '[data-dismiss="toast"]',
      ao = function () {
    function t(t, e) {
      this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners(), E.setData(t, Zi, this);
    }

    var n = t.prototype;
    return n.show = function () {
      var t = this;
      Q.trigger(this._element, Ji.SHOW), this._config.animation && this._element.classList.add(to);

      var e = function e() {
        t._element.classList.remove(io), t._element.classList.add(no), Q.trigger(t._element, Ji.SHOWN), t._config.autohide && (t._timeout = setTimeout(function () {
          t.hide();
        }, t._config.delay));
      };

      if (this._element.classList.remove(eo), this._element.classList.add(io), this._config.animation) {
        var n = u(this._element);
        Q.one(this._element, a, e), p(this._element, n);
      } else e();
    }, n.hide = function () {
      var t = this;

      if (this._element.classList.contains(no)) {
        Q.trigger(this._element, Ji.HIDE);

        var e = function e() {
          t._element.classList.add(eo), Q.trigger(t._element, Ji.HIDDEN);
        };

        if (this._element.classList.remove(no), this._config.animation) {
          var n = u(this._element);
          Q.one(this._element, a, e), p(this._element, n);
        } else e();
      }
    }, n.dispose = function () {
      clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(no) && this._element.classList.remove(no), Q.off(this._element, Ji.CLICK_DISMISS), E.removeData(this._element, Zi), this._element = null, this._config = null;
    }, n._getConfig = function (t) {
      return t = i({}, ro, _t.getDataAttributes(this._element), "object" == _typeof(t) && t ? t : {}), g("toast", t, this.constructor.DefaultType), t;
    }, n._setListeners = function () {
      var t = this;
      Q.on(this._element, Ji.CLICK_DISMISS, so, function () {
        return t.hide();
      });
    }, t._jQueryInterface = function (e) {
      return this.each(function () {
        var n = E.getData(this, Zi);

        if (n || (n = new t(this, "object" == _typeof(e) && e)), "string" == typeof e) {
          if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
          n[e](this);
        }
      });
    }, t._getInstance = function (t) {
      return E.getData(t, Zi);
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.3.1";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return oo;
      }
    }, {
      key: "Default",
      get: function get() {
        return ro;
      }
    }]), t;
  }();

  if ("undefined" != typeof l) {
    var lo = l.fn.toast;
    l.fn.toast = ao._jQueryInterface, l.fn.toast.Constructor = ao, l.fn.toast.noConflict = function () {
      return l.fn.toast = lo, ao._jQueryInterface;
    };
  }

  return {
    Alert: tt,
    Button: dt,
    Carousel: Rt,
    Collapse: Jt,
    Dropdown: Tn,
    Modal: Rn,
    Popover: bi,
    ScrollSpy: ki,
    Tab: qi,
    Toast: ao,
    Tooltip: ci
  };
});
//# sourceMappingURL=bootstrap.bundle.js.map
