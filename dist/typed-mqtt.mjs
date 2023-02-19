var Pe = Object.defineProperty;
var Ce = (s, r, t) => r in s ? Pe(s, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[r] = t;
var B = (s, r, t) => (Ce(s, typeof r != "symbol" ? r + "" : r, t), t);
var H = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Oe(s) {
  if (s.__esModule)
    return s;
  var r = s.default;
  if (typeof r == "function") {
    var t = function a() {
      if (this instanceof a) {
        var c = [null];
        c.push.apply(c, arguments);
        var o = Function.bind.apply(r, c);
        return new o();
      }
      return r.apply(this, arguments);
    };
    t.prototype = r.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(s).forEach(function(a) {
    var c = Object.getOwnPropertyDescriptor(s, a);
    Object.defineProperty(t, a, c.get ? c : {
      enumerable: !0,
      get: function() {
        return s[a];
      }
    });
  }), t;
}
var Ue = (s) => {
  if (Object.prototype.toString.call(s) !== "[object Object]")
    return !1;
  const r = Object.getPrototypeOf(s);
  return r === null || r === Object.prototype;
};
const ne = Ue, { hasOwnProperty: we } = Object.prototype, { propertyIsEnumerable: Re } = Object, K = (s, r, t) => Object.defineProperty(s, r, {
  value: t,
  writable: !0,
  enumerable: !0,
  configurable: !0
}), De = H, ve = {
  concatArrays: !1,
  ignoreUndefined: !1
}, re = (s) => {
  const r = [];
  for (const t in s)
    we.call(s, t) && r.push(t);
  if (Object.getOwnPropertySymbols) {
    const t = Object.getOwnPropertySymbols(s);
    for (const a of t)
      Re.call(s, a) && r.push(a);
  }
  return r;
};
function G(s) {
  return Array.isArray(s) ? be(s) : ne(s) ? ke(s) : s;
}
function be(s) {
  const r = s.slice(0, 0);
  return re(s).forEach((t) => {
    K(r, t, G(s[t]));
  }), r;
}
function ke(s) {
  const r = Object.getPrototypeOf(s) === null ? /* @__PURE__ */ Object.create(null) : {};
  return re(s).forEach((t) => {
    K(r, t, G(s[t]));
  }), r;
}
const Se = (s, r, t, a) => (t.forEach((c) => {
  typeof r[c] > "u" && a.ignoreUndefined || (c in s && s[c] !== Object.getPrototypeOf(s) ? K(s, c, de(s[c], r[c], a)) : K(s, c, G(r[c])));
}), s), Be = (s, r, t) => {
  let a = s.slice(0, 0), c = 0;
  return [s, r].forEach((o) => {
    const v = [];
    for (let f = 0; f < o.length; f++)
      we.call(o, f) && (v.push(String(f)), o === s ? K(a, c++, o[f]) : K(a, c++, G(o[f])));
    a = Se(a, o, re(o).filter((f) => !v.includes(f)), t);
  }), a;
};
function de(s, r, t) {
  return t.concatArrays && Array.isArray(s) && Array.isArray(r) ? Be(s, r, t) : !ne(r) || !ne(s) ? G(r) : Se(s, r, re(r), t);
}
var Le = function(...s) {
  const r = de(G(ve), this !== De && this || {}, ve);
  let t = { _: {} };
  for (const a of s)
    if (a !== void 0) {
      if (!ne(a))
        throw new TypeError("`" + a + "` is not an Option Object");
      t = de(t, { _: a }, r);
    }
  return t._;
};
const qe = Le.bind({
  concatArrays: !0,
  ignoreUndefined: !0
});
function Ve(s, r) {
  const t = window.localStorage.getItem(s);
  if (t) {
    const a = JSON.parse(t), c = JSON.parse(r), o = JSON.stringify(qe(a, c));
    window.localStorage.setItem(s, o);
  } else
    window.localStorage.setItem(s, r);
}
function V(s, r) {
  return new Promise((t, a) => {
    try {
      const c = s();
      r == null || r(null, c), t(c);
    } catch (c) {
      r == null || r(c), a(c);
    }
  });
}
function te(s, r, t) {
  return Promise.all(s).then((a) => {
    const c = (t == null ? void 0 : t(a)) ?? null;
    return r == null || r(null, c), Promise.resolve(c);
  }, (a) => (r == null || r(a), Promise.reject(a)));
}
const $ = {
  /**
   * Fetches `key` value.
   */
  getItem: (s, r) => V(() => window.localStorage.getItem(s), r),
  /**
   * Sets `value` for `key`.
   */
  setItem: (s, r, t) => V(() => window.localStorage.setItem(s, r), t),
  /**
   * Removes a `key`
   */
  removeItem: (s, r) => V(() => window.localStorage.removeItem(s), r),
  /**
   * Merges existing value with input value, assuming they are stringified JSON.
   */
  mergeItem: (s, r, t) => V(() => Ve(s, r), t),
  /**
   * Erases *all* AsyncStorage for the domain.
   */
  clear: (s) => V(() => window.localStorage.clear(), s),
  /**
   * Gets *all* keys known to the app, for all callers, libraries, etc.
   */
  getAllKeys: (s) => V(() => {
    const r = window.localStorage.length, t = [];
    for (let a = 0; a < r; a += 1) {
      const c = window.localStorage.key(a) || "";
      t.push(c);
    }
    return t;
  }, s),
  /**
   * (stub) Flushes any pending requests using a single batch call to get the data.
   */
  flushGetRequests: () => {
  },
  /**
   * multiGet resolves to an array of key-value pair arrays that matches the
   * input format of multiSet.
   *
   *   multiGet(['k1', 'k2']) -> [['k1', 'val1'], ['k2', 'val2']]
   */
  multiGet: (s, r) => {
    const t = s.map((c) => $.getItem(c));
    return te(t, r, (c) => c.map((o, v) => [s[v], o]));
  },
  /**
   * Takes an array of key-value array pairs.
   *   multiSet([['k1', 'val1'], ['k2', 'val2']])
   */
  multiSet: (s, r) => {
    const t = s.map((a) => $.setItem(a[0], a[1]));
    return te(t, r);
  },
  /**
   * Delete all the keys in the `keys` array.
   */
  multiRemove: (s, r) => {
    const t = s.map((a) => $.removeItem(a));
    return te(t, r);
  },
  /**
   * Takes an array of key-value array pairs and merges them with existing
   * values, assuming they are stringified JSON.
   *
   *   multiMerge([['k1', 'val1'], ['k2', 'val2']])
   */
  multiMerge: (s, r) => {
    const t = s.map((a) => $.mergeItem(a[0], a[1]));
    return te(t, r);
  }
};
var Ae = {}, Y = {}, C = {};
Object.defineProperty(C, "__esModule", { value: !0 });
C.bytesToString = C.stringToBytes = C.NIL = C.X500 = C.OID = C.URL = C.DNS = C.hexToByte = C.byteToHex = void 0;
let _e = [], Me = {};
for (var F = 0; F < 256; F++)
  _e[F] = (F + 256).toString(16).substr(1), Me[_e[F]] = F;
C.byteToHex = _e;
C.hexToByte = Me;
C.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
C.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
C.OID = "6ba7b812-9dad-11d1-80b4-00c04fd430c8";
C.X500 = "6ba7b814-9dad-11d1-80b4-00c04fd430c8";
C.NIL = "00000000-0000-0000-0000-000000000000";
const Fe = (s) => {
  s = unescape(encodeURIComponent(s));
  const r = new Uint8Array(s.length);
  for (let t = 0; t < s.length; ++t)
    r[t] = s.charCodeAt(t);
  return r;
};
C.stringToBytes = Fe;
const Ke = (s) => {
  const r = new Uint8Array(s, 0, s.byteLength);
  return String.fromCharCode.apply(null, Array.from(r));
};
C.bytesToString = Ke;
Object.defineProperty(Y, "__esModule", { value: !0 });
Y.parse = void 0;
const Ge = C, Je = (s, r, t) => {
  let a = r && t || 0, c = 0;
  for (r = r || [], s.toLowerCase().replace(/[0-9a-f]{2}/g, (o) => (c < 16 && r && (r[a + c++] = Ge.hexToByte[o]), "")); c < 16; )
    r[a + c++] = 0;
  return r;
};
Y.parse = Je;
var z = {};
Object.defineProperty(z, "__esModule", { value: !0 });
z.unparse = void 0;
const je = C, Qe = (s, r) => {
  let t = r || 0, a = je.byteToHex;
  return a[s[t++]] + a[s[t++]] + a[s[t++]] + a[s[t++]] + "-" + a[s[t++]] + a[s[t++]] + "-" + a[s[t++]] + a[s[t++]] + "-" + a[s[t++]] + a[s[t++]] + "-" + a[s[t++]] + a[s[t++]] + a[s[t++]] + a[s[t++]] + a[s[t++]] + a[s[t++]];
};
z.unparse = Qe;
var J = {}, ge = {};
Object.defineProperty(ge, "__esModule", { value: !0 });
const $e = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
ge.default = $e;
var He = H && H.__importDefault || function(s) {
  return s && s.__esModule ? s : { default: s };
};
Object.defineProperty(J, "__esModule", { value: !0 });
J.validate = void 0;
const Ye = He(ge), ze = (s) => typeof s == "string" && Ye.default.test(s);
J.validate = ze;
var se = {};
Object.defineProperty(se, "__esModule", { value: !0 });
se.version = void 0;
const We = J, Xe = (s) => {
  if (!We.validate(s))
    throw TypeError("Invalid UUID");
  return parseInt(s.substr(14, 1), 16);
};
se.version = Xe;
var ie = {}, W = {};
Object.defineProperty(W, "__esModule", { value: !0 });
W.stringify = void 0;
const Ze = J, O = [];
for (let s = 0; s < 256; ++s)
  O.push((s + 256).toString(16).substr(1));
const et = (s, r = 0) => {
  const t = (O[s[r + 0]] + O[s[r + 1]] + O[s[r + 2]] + O[s[r + 3]] + "-" + O[s[r + 4]] + O[s[r + 5]] + "-" + O[s[r + 6]] + O[s[r + 7]] + "-" + O[s[r + 8]] + O[s[r + 9]] + "-" + O[s[r + 10]] + O[s[r + 11]] + O[s[r + 12]] + O[s[r + 13]] + O[s[r + 14]] + O[s[r + 15]]).toLowerCase();
  if (!Ze.validate(t))
    throw TypeError("Stringified UUID is invalid");
  return t;
};
W.stringify = et;
var X = {};
Object.defineProperty(X, "__esModule", { value: !0 });
X.rng = void 0;
const me = 0, tt = 256, ye = 16, nt = () => {
  let s = new Array(ye);
  for (let r = 0; r < ye; r++)
    s[r] = 255 & Math.random() * (tt - me) + me;
  return s;
};
X.rng = nt;
Object.defineProperty(ie, "__esModule", { value: !0 });
ie.v1 = void 0;
const rt = W, st = X;
let Ie, fe, le = 0, he = 0;
const it = (s, r, t = 0) => {
  let a = r && t || 0;
  const c = r || new Uint8Array(16);
  let o = s && s.node ? s.node : Ie, v = s && s.clockseq ? s.clockseq : fe;
  if (o == null || v == null) {
    const P = s && s.random ? s.random : s && s.rng ? s.rng() : st.rng();
    o == null && (o = Ie = [
      P[0] | 1,
      P[1],
      P[2],
      P[3],
      P[4],
      P[5]
    ]), v == null && (v = fe = (P[6] << 8 | P[7]) & 16383);
  }
  let f = s && s.msecs ? s.msecs : Date.now(), w = s && s.nsecs ? s.nsecs : he + 1;
  const A = f - le + (w - he) / 1e4;
  if (A < 0 && s && !s.clockseq && (v = v + 1 & 16383), (A < 0 || f > le) && s && !s.nsecs && (w = 0), w >= 1e4)
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  le = f, he = w, fe = v, f += 122192928e5;
  const M = ((f & 268435455) * 1e4 + w) % 4294967296;
  c[a++] = M >>> 24 & 255, c[a++] = M >>> 16 & 255, c[a++] = M >>> 8 & 255, c[a++] = M & 255;
  const k = f / 4294967296 * 1e4 & 268435455;
  c[a++] = k >>> 8 & 255, c[a++] = k & 255, c[a++] = k >>> 24 & 15 | 16, c[a++] = k >>> 16 & 255, c[a++] = v >>> 8 | 128, c[a++] = v & 255;
  for (let P = 0; P < 6; ++P)
    c[a + P] = o[P];
  return r || rt.stringify(c);
};
ie.v1 = it;
var oe = {};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.v4 = void 0;
const ot = z, at = X, ct = (s, r, t) => {
  let a = r && t || 0, c = at.rng();
  if (s && !(s instanceof String) && (s.random && (c = s.random), s.rng && (c = s.rng())), c[6] = c[6] & 15 | 64, c[8] = c[8] & 63 | 128, r)
    for (var o = 0; o < 16; o++)
      r[a + o] = c[o];
  return r || ot.unparse(c);
};
oe.v4 = ct;
var ae = {}, ce = {};
Object.defineProperty(ce, "__esModule", { value: !0 });
ce.v35 = void 0;
const ft = W, lt = Y, ue = C, ht = (s, r, t) => (c, o, v, f = 0) => {
  if (typeof c == "string" && (c = ue.stringToBytes(c)), typeof o == "string" && (o = lt.parse(o)), o && o.length !== 16)
    throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
  let w = new Uint8Array(16 + c.length);
  if (w.set(o), w.set(c, o.length), w = ue.stringToBytes(t(ue.bytesToString(w))), w[6] = w[6] & 15 | r, w[8] = w[8] & 63 | 128, v)
    for (let A = 0; A < 16; ++A)
      v[f + A] = w[A];
  return v || ft.stringify(w);
};
ce.v35 = ht;
var xe = {};
(function(s) {
  Object.defineProperty(s, "__esModule", { value: !0 }), s.any_hmac_sha1 = s.b64_hmac_sha1 = s.hex_hmac_sha1 = s.any_sha1 = s.b64_sha1 = s.hex_sha1 = void 0;
  let r = 0, t = "";
  const a = (m) => k(A(D(m)));
  s.hex_sha1 = a, s.default = s.hex_sha1;
  const c = (m) => P(A(D(m)));
  s.b64_sha1 = c;
  const o = (m, E) => L(A(D(m)), E);
  s.any_sha1 = o;
  const v = (m, E) => k(M(D(m), D(E)));
  s.hex_hmac_sha1 = v;
  const f = (m, E) => P(M(D(m), D(E)));
  s.b64_hmac_sha1 = f;
  const w = (m, E, e) => L(M(D(m), D(E)), e);
  s.any_hmac_sha1 = w;
  const A = (m) => U(q(j(m), m.length * 8)), M = (m, E) => {
    let e = j(m);
    e.length > 16 && (e = q(e, m.length * 8));
    let n = Array(16), i = Array(16);
    for (var l = 0; l < 16; l++)
      n[l] = e[l] ^ 909522486, i[l] = e[l] ^ 1549556828;
    var d = q(n.concat(j(E)), 512 + E.length * 8);
    return U(q(i.concat(d), 512 + 160));
  }, k = (m) => {
    try {
    } catch {
      r = 0;
    }
    for (var E = r ? "0123456789ABCDEF" : "0123456789abcdef", e = "", n, i = 0; i < m.length; i++)
      n = m.charCodeAt(i), e += E.charAt(n >>> 4 & 15) + E.charAt(n & 15);
    return e;
  }, P = (m) => {
    try {
    } catch {
      t = "";
    }
    for (var E = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = "", n = m.length, i = 0; i < n; i += 3)
      for (var l = m.charCodeAt(i) << 16 | (i + 1 < n ? m.charCodeAt(i + 1) << 8 : 0) | (i + 2 < n ? m.charCodeAt(i + 2) : 0), d = 0; d < 4; d++)
        i * 8 + d * 6 > m.length * 8 ? e += t : e += E.charAt(l >>> 6 * (3 - d) & 63);
    return e;
  }, L = (m, E) => {
    var e = E.length, n = [], i, l, d, u, _ = Array(Math.ceil(m.length / 2));
    for (i = 0; i < _.length; i++)
      _[i] = m.charCodeAt(i * 2) << 8 | m.charCodeAt(i * 2 + 1);
    for (; _.length > 0; ) {
      for (u = [], d = 0, i = 0; i < _.length; i++)
        d = (d << 16) + _[i], l = Math.floor(d / e), d -= l * e, (u.length > 0 || l > 0) && (u[u.length] = l);
      n[n.length] = d, _ = u;
    }
    var S = "";
    for (i = n.length - 1; i >= 0; i--)
      S += E.charAt(n[i]);
    var p = Math.ceil(m.length * 8 / (Math.log(E.length) / Math.log(2)));
    for (i = S.length; i < p; i++)
      S = E[0] + S;
    return S;
  }, D = (m) => {
    for (var E = "", e = -1, n, i; ++e < m.length; )
      n = m.charCodeAt(e), i = e + 1 < m.length ? m.charCodeAt(e + 1) : 0, n >= 55296 && n <= 56319 && i >= 56320 && i <= 57343 && (n = 65536 + ((n & 1023) << 10) + (i & 1023), e++), n <= 127 ? E += String.fromCharCode(n) : n <= 2047 ? E += String.fromCharCode(192 | n >>> 6 & 31, 128 | n & 63) : n <= 65535 ? E += String.fromCharCode(224 | n >>> 12 & 15, 128 | n >>> 6 & 63, 128 | n & 63) : n <= 2097151 && (E += String.fromCharCode(240 | n >>> 18 & 7, 128 | n >>> 12 & 63, 128 | n >>> 6 & 63, 128 | n & 63));
    return E;
  }, j = (m) => {
    for (var E = Array(m.length >> 2), e = 0; e < E.length; e++)
      E[e] = 0;
    for (var e = 0; e < m.length * 8; e += 8)
      E[e >> 5] |= (m.charCodeAt(e / 8) & 255) << 24 - e % 32;
    return E;
  }, U = (m) => {
    for (var E = "", e = 0; e < m.length * 32; e += 8)
      E += String.fromCharCode(m[e >> 5] >>> 24 - e % 32 & 255);
    return E;
  }, q = (m, E) => {
    m[E >> 5] |= 128 << 24 - E % 32, m[(E + 64 >> 9 << 4) + 15] = E;
    for (var e = Array(80), n = 1732584193, i = -271733879, l = -1732584194, d = 271733878, u = -1009589776, _ = 0; _ < m.length; _ += 16) {
      for (var S = n, p = i, N = l, y = d, h = u, g = 0; g < 80; g++) {
        g < 16 ? e[g] = m[_ + g] : e[g] = I(e[g - 3] ^ e[g - 8] ^ e[g - 14] ^ e[g - 16], 1);
        let x = b(b(I(n, 5), Z(g, i, l, d)), b(b(u, e[g]), ee(g)));
        u = d, d = l, l = I(i, 30), i = n, n = x;
      }
      n = b(n, S), i = b(i, p), l = b(l, N), d = b(d, y), u = b(u, h);
    }
    return [n, i, l, d, u];
  }, Z = (m, E, e, n) => m < 20 ? E & e | ~E & n : m < 40 ? E ^ e ^ n : m < 60 ? E & e | E & n | e & n : E ^ e ^ n, ee = (m) => m < 20 ? 1518500249 : m < 40 ? 1859775393 : m < 60 ? -1894007588 : -899497514, b = (m, E) => {
    var e = (m & 65535) + (E & 65535), n = (m >> 16) + (E >> 16) + (e >> 16);
    return n << 16 | e & 65535;
  }, I = (m, E) => m << E | m >>> 32 - E;
})(xe);
var ut = H && H.__importDefault || function(s) {
  return s && s.__esModule ? s : { default: s };
};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.v5 = void 0;
const dt = ce, _t = ut(xe);
ae.v5 = dt.v35("v5", 80, _t.default);
Object.defineProperty(Ae, "__esModule", { value: !0 });
const gt = Y, vt = z, mt = J, yt = se, It = ie, pt = oe, Et = ae, Q = C;
var wt = Ae.default = {
  parse: gt.parse,
  unparse: vt.unparse,
  validate: mt.validate,
  version: yt.version,
  v1: It.v1,
  v4: pt.v4,
  v5: Et.v5,
  NIL: Q.NIL,
  DNS: Q.DNS,
  URL: Q.URL,
  OID: Q.OID,
  X500: Q.X500
}, Te = {};
class pe {
  constructor(r) {
    this.name = "NotFoundError", this.message = `Not Found! Params: ${r}`, this.stack = new Error().stack;
  }
}
class Ee {
  constructor(r) {
    this.name = "ExpiredError", this.message = `Expired! Params: ${r}`, this.stack = new Error().stack;
  }
}
class St {
  constructor(r = {}) {
    let t = this;
    if (t._SIZE = r.size || 1e3, t.sync = r.sync || {}, t.defaultExpires = r.defaultExpires !== void 0 ? r.defaultExpires : 1e3 * 3600 * 24, t.enableCache = r.enableCache !== !1, t._s = r.storageBackend || null, t._innerVersion = 11, t.cache = {}, t._s && t._s.setItem)
      try {
        var a = t._s.setItem("__react_native_storage_test", "test");
        t.isPromise = !!(a && a.then);
      } catch (c) {
        throw console.warn(c), delete t._s, c;
      }
    else
      console.warn(`Data would be lost after reload cause there is no storageBackend specified!
      
Either use localStorage(for web) or AsyncStorage(for React Native) as a storageBackend.`);
    t._mapPromise = t.getItem("map").then((c) => {
      t._m = t._checkMap(c && JSON.parse(c) || {});
    });
  }
  getItem(r) {
    return this._s ? this.isPromise ? this._s.getItem(r) : Promise.resolve(this._s.getItem(r)) : Promise.resolve();
  }
  setItem(r, t) {
    return this._s ? this.isPromise ? this._s.setItem(r, t) : Promise.resolve(this._s.setItem(r, t)) : Promise.resolve();
  }
  removeItem(r) {
    return this._s ? this.isPromise ? this._s.removeItem(r) : Promise.resolve(this._s.removeItem(r)) : Promise.resolve();
  }
  _initMap() {
    return {
      innerVersion: this._innerVersion,
      index: 0,
      __keys__: {}
    };
  }
  _checkMap(r) {
    return r && r.innerVersion && r.innerVersion === this._innerVersion ? r : this._initMap();
  }
  _getId(r, t) {
    return r + "_" + t;
  }
  _saveToMap(r) {
    let { key: t, id: a, data: c } = r, o = this._getId(t, a), v = this._m;
    if (v[o] !== void 0)
      return this.enableCache && (this.cache[o] = JSON.parse(c)), this.setItem("map_" + v[o], c);
    if (v[v.index] !== void 0) {
      let w = v[v.index], A = w.split("_");
      delete v[w], this._removeIdInKey(A[0], A[1]), this.enableCache && delete this.cache[w];
    }
    if (v[o] = v.index, v[v.index] = o, v.__keys__[t] = v.__keys__[t] || [], v.__keys__[t].push(a), this.enableCache) {
      const w = JSON.parse(c);
      this.cache[o] = w;
    }
    let f = v.index;
    ++v.index === this._SIZE && (v.index = 0), this.setItem("map_" + f, c), this.setItem("map", JSON.stringify(v));
  }
  save(r) {
    let t = this, { key: a, id: c, rawData: o, expires: v } = r;
    a.toString().indexOf("_") !== -1 && console.error('Please do not use "_" in key!');
    let f = {
      rawData: o
    }, w = new Date().getTime();
    if (v === void 0 && (v = t.defaultExpires), v !== null && (f.expires = w + v), f = JSON.stringify(f), c === void 0) {
      if (t.enableCache) {
        const A = JSON.parse(f);
        t.cache[a] = A;
      }
      return t.setItem(a, f);
    } else
      return c.toString().indexOf("_") !== -1 && console.error('Please do not use "_" in id!'), this._mapPromise.then(() => t._saveToMap({
        key: a,
        id: c,
        data: f
      }));
  }
  getBatchData(r) {
    let t = this, a = [];
    for (let c = 0, o; o = r[c]; c++)
      a[c] = t.load(o);
    return Promise.all(a);
  }
  getBatchDataWithIds(r) {
    let t = this, { key: a, ids: c, syncInBackground: o } = r;
    return Promise.all(
      c.map((v) => t.load({ key: a, id: v, syncInBackground: o, autoSync: !1, batched: !0 }))
    ).then((v) => new Promise((f, w) => {
      const A = v.filter((M) => M.syncId !== void 0);
      return A.length ? t.sync[a]({
        id: A.map((M) => M.syncId),
        resolve: f,
        reject: w
      }) : f();
    }).then((f) => v.map((w) => w.syncId ? f.shift() : w)));
  }
  _lookupGlobalItem(r) {
    let t = this, a, { key: c } = r;
    return t.enableCache && t.cache[c] !== void 0 ? (a = t.cache[c], t._loadGlobalItem({ ret: a, ...r })) : t.getItem(c).then((o) => t._loadGlobalItem({ ret: o, ...r }));
  }
  _loadGlobalItem(r) {
    let t = this, { key: a, ret: c, autoSync: o, syncInBackground: v, syncParams: f } = r;
    if (c == null)
      return o && t.sync[a] ? new Promise((A, M) => t.sync[a]({ resolve: A, reject: M, syncParams: f })) : Promise.reject(new pe(JSON.stringify(r)));
    typeof c == "string" && (c = JSON.parse(c), this.enableCache && (this.cache[a] = c));
    let w = new Date().getTime();
    return c.expires < w ? o && t.sync[a] ? v ? (t.sync[a]({ syncParams: f }), Promise.resolve(c.rawData)) : new Promise((A, M) => t.sync[a]({ resolve: A, reject: M, syncParams: f })) : Promise.reject(new Ee(JSON.stringify(r))) : Promise.resolve(c.rawData);
  }
  _noItemFound(r) {
    let t = this, { key: a, id: c, autoSync: o, syncParams: v } = r;
    return t.sync[a] ? o ? new Promise((f, w) => t.sync[a]({ id: c, syncParams: v, resolve: f, reject: w })) : Promise.resolve({ syncId: c }) : Promise.reject(new pe(JSON.stringify(r)));
  }
  _loadMapItem(r) {
    let t = this, { ret: a, key: c, id: o, autoSync: v, batched: f, syncInBackground: w, syncParams: A } = r;
    if (a == null)
      return t._noItemFound(r);
    if (typeof a == "string") {
      a = JSON.parse(a);
      const { key: k, id: P } = r, L = t._getId(k, P);
      this.enableCache && (this.cache[L] = a);
    }
    let M = new Date().getTime();
    return a.expires < M ? v && t.sync[c] ? w ? (t.sync[c]({ id: o, syncParams: A }), Promise.resolve(a.rawData)) : new Promise((k, P) => t.sync[c]({ id: o, resolve: k, reject: P, syncParams: A })) : f ? Promise.resolve({ syncId: o }) : Promise.reject(new Ee(JSON.stringify(r))) : Promise.resolve(a.rawData);
  }
  _lookUpInMap(r) {
    let t = this, a = t._m, c, { key: o, id: v } = r, f = t._getId(o, v);
    return t.enableCache && t.cache[f] ? (c = t.cache[f], t._loadMapItem({ ret: c, ...r })) : a[f] !== void 0 ? t.getItem("map_" + a[f]).then((w) => t._loadMapItem({ ret: w, ...r })) : t._noItemFound({ ret: c, ...r });
  }
  remove(r) {
    return this._mapPromise.then(() => {
      let t = this, a = t._m, { key: c, id: o } = r;
      if (o === void 0)
        return t.enableCache && t.cache[c] && delete t.cache[c], t.removeItem(c);
      let v = t._getId(c, o);
      if (a[v] !== void 0) {
        t.enableCache && t.cache[v] && delete t.cache[v], t._removeIdInKey(c, o);
        let f = a[v];
        return delete a[v], t.setItem("map", JSON.stringify(a)), t.removeItem("map_" + f);
      }
    });
  }
  _removeIdInKey(r, t) {
    let a = this._m.__keys__[r].indexOf(t);
    a !== -1 && this._m.__keys__[r].splice(a, 1);
  }
  load(r) {
    let t = this, { key: a, id: c, autoSync: o = !0, syncInBackground: v = !0, syncParams: f } = r;
    return t._mapPromise.then(() => new Promise((w, A) => w(c === void 0 ? t._lookupGlobalItem({
      key: a,
      resolve: w,
      reject: A,
      autoSync: o,
      syncInBackground: v,
      syncParams: f
    }) : t._lookUpInMap({
      key: a,
      id: c,
      resolve: w,
      reject: A,
      autoSync: o,
      syncInBackground: v,
      syncParams: f
    }))));
  }
  clearMap() {
    this.removeItem("map").then(() => {
      this._m = this._initMap();
    });
  }
  clearMapForKey(r) {
    return this._mapPromise.then(() => {
      let t = this._m.__keys__[r].map((a) => this.remove({ key: r, id: a }));
      return Promise.all(t);
    });
  }
  getIdsForKey(r) {
    return this._mapPromise.then(() => this._m.__keys__[r] || []);
  }
  getAllDataForKey(r, t) {
    return t = Object.assign({ syncInBackground: !0 }, t), this.getIdsForKey(r).then((a) => {
      let c = a.map((o) => ({ key: r, id: o, syncInBackground: t.syncInBackground }));
      return this.getBatchData(c);
    });
  }
}
const At = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: St
}, Symbol.toStringTag, { value: "Module" })), Mt = /* @__PURE__ */ Oe(At);
typeof Paho > "u" && (Paho = {});
Paho.MQTT = function(s) {
  var r = "@VERSION@", t = {
    CONNECT: 1,
    CONNACK: 2,
    PUBLISH: 3,
    PUBACK: 4,
    PUBREC: 5,
    PUBREL: 6,
    PUBCOMP: 7,
    SUBSCRIBE: 8,
    SUBACK: 9,
    UNSUBSCRIBE: 10,
    UNSUBACK: 11,
    PINGREQ: 12,
    PINGRESP: 13,
    DISCONNECT: 14
  }, a = function(e, n) {
    for (var i in e)
      if (e.hasOwnProperty(i))
        if (n.hasOwnProperty(i)) {
          if (typeof e[i] !== n[i])
            throw new Error(f(o.INVALID_TYPE, [typeof e[i], i]));
        } else {
          var l = "Unknown property, " + i + ". Valid properties are:";
          for (var d in n)
            n.hasOwnProperty(d) && (l = l + " " + d);
          throw new Error(l);
        }
  }, c = function(e, n) {
    return function() {
      return e.apply(n, arguments);
    };
  }, o = {
    OK: { code: 0, text: "AMQJSC0000I OK." },
    CONNECT_TIMEOUT: { code: 1, text: "AMQJSC0001E Connect timed out." },
    SUBSCRIBE_TIMEOUT: { code: 2, text: "AMQJS0002E Subscribe timed out." },
    UNSUBSCRIBE_TIMEOUT: { code: 3, text: "AMQJS0003E Unsubscribe timed out." },
    PING_TIMEOUT: { code: 4, text: "AMQJS0004E Ping timed out." },
    INTERNAL_ERROR: {
      code: 5,
      text: "AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"
    },
    CONNACK_RETURNCODE: {
      code: 6,
      text: "AMQJS0006E Bad Connack return code:{0} {1}."
    },
    SOCKET_ERROR: { code: 7, text: "AMQJS0007E Socket error:{0}." },
    SOCKET_CLOSE: { code: 8, text: "AMQJS0008I Socket closed." },
    MALFORMED_UTF: {
      code: 9,
      text: "AMQJS0009E Malformed UTF data:{0} {1} {2}."
    },
    UNSUPPORTED: {
      code: 10,
      text: "AMQJS0010E {0} is not supported by this browser."
    },
    INVALID_STATE: { code: 11, text: "AMQJS0011E Invalid state {0}." },
    INVALID_TYPE: { code: 12, text: "AMQJS0012E Invalid type {0} for {1}." },
    INVALID_ARGUMENT: {
      code: 13,
      text: "AMQJS0013E Invalid argument {0} for {1}."
    },
    UNSUPPORTED_OPERATION: {
      code: 14,
      text: "AMQJS0014E Unsupported operation."
    },
    INVALID_STORED_DATA: {
      code: 15,
      text: "AMQJS0015E Invalid data in local storage key={0} value={1}."
    },
    INVALID_MQTT_MESSAGE_TYPE: {
      code: 16,
      text: "AMQJS0016E Invalid MQTT message type {0}."
    },
    MALFORMED_UNICODE: {
      code: 17,
      text: "AMQJS0017E Malformed Unicode string:{0} {1}."
    },
    BUFFER_FULL: {
      code: 18,
      text: "AMQJS0018E Message buffer is full, maximum buffer size: {0}."
    }
  }, v = {
    0: "Connection Accepted",
    1: "Connection Refused: unacceptable protocol version",
    2: "Connection Refused: identifier rejected",
    3: "Connection Refused: server unavailable",
    4: "Connection Refused: bad user name or password",
    5: "Connection Refused: not authorized"
  }, f = function(e, n) {
    var i = e.text;
    if (n) {
      for (var l, d, u = 0; u < n.length; u++)
        if (l = "{" + u + "}", d = i.indexOf(l), d > 0) {
          var _ = i.substring(0, d), S = i.substring(d + l.length);
          i = _ + n[u] + S;
        }
    }
    return i;
  }, w = [
    0,
    6,
    77,
    81,
    73,
    115,
    100,
    112,
    3
  ], A = [0, 4, 77, 81, 84, 84, 4], M = function(e, n) {
    this.type = e;
    for (var i in n)
      n.hasOwnProperty(i) && (this[i] = n[i]);
  };
  M.prototype.encode = function() {
    var e = (this.type & 15) << 4, n = 0, i = [], l = 0, d;
    switch (this.messageIdentifier !== void 0 && (n += 2), this.type) {
      case t.CONNECT:
        switch (this.mqttVersion) {
          case 3:
            n += w.length + 3;
            break;
          case 4:
            n += A.length + 3;
            break;
        }
        n += U(this.clientId) + 2, this.willMessage !== void 0 && (n += U(this.willMessage.destinationName) + 2, d = this.willMessage.payloadBytes, d instanceof Uint8Array || (d = new Uint8Array(_)), n += d.byteLength + 2), this.userName !== void 0 && (n += U(this.userName) + 2), this.password !== void 0 && (n += U(this.password) + 2);
        break;
      case t.SUBSCRIBE:
        e |= 2;
        for (var u = 0; u < this.topics.length; u++)
          i[u] = U(this.topics[u]), n += i[u] + 2;
        n += this.requestedQos.length;
        break;
      case t.UNSUBSCRIBE:
        e |= 2;
        for (var u = 0; u < this.topics.length; u++)
          i[u] = U(this.topics[u]), n += i[u] + 2;
        break;
      case t.PUBREL:
        e |= 2;
        break;
      case t.PUBLISH:
        this.payloadMessage.duplicate && (e |= 8), e = e |= this.payloadMessage.qos << 1, this.payloadMessage.retained && (e |= 1), l = U(this.payloadMessage.destinationName), n += l + 2;
        var _ = this.payloadMessage.payloadBytes;
        n += _.byteLength, _ instanceof ArrayBuffer ? _ = new Uint8Array(_) : _ instanceof Uint8Array || (_ = new Uint8Array(_.buffer));
        break;
    }
    var S = j(n), p = S.length + 1, N = new ArrayBuffer(n + p), y = new Uint8Array(N);
    if (y[0] = e, y.set(S, 1), this.type == t.PUBLISH)
      p = L(
        this.payloadMessage.destinationName,
        l,
        y,
        p
      );
    else if (this.type == t.CONNECT) {
      switch (this.mqttVersion) {
        case 3:
          y.set(w, p), p += w.length;
          break;
        case 4:
          y.set(A, p), p += A.length;
          break;
      }
      var h = 0;
      this.cleanSession && (h = 2), this.willMessage !== void 0 && (h |= 4, h |= this.willMessage.qos << 3, this.willMessage.retained && (h |= 32)), this.userName !== void 0 && (h |= 128), this.password !== void 0 && (h |= 64), y[p++] = h, p = P(this.keepAliveInterval, y, p);
    }
    switch (this.messageIdentifier !== void 0 && (p = P(this.messageIdentifier, y, p)), this.type) {
      case t.CONNECT:
        p = L(
          this.clientId,
          U(this.clientId),
          y,
          p
        ), this.willMessage !== void 0 && (p = L(
          this.willMessage.destinationName,
          U(this.willMessage.destinationName),
          y,
          p
        ), p = P(
          d.byteLength,
          y,
          p
        ), y.set(d, p), p += d.byteLength), this.userName !== void 0 && (p = L(
          this.userName,
          U(this.userName),
          y,
          p
        )), this.password !== void 0 && (p = L(
          this.password,
          U(this.password),
          y,
          p
        ));
        break;
      case t.PUBLISH:
        y.set(_, p);
        break;
      case t.SUBSCRIBE:
        for (var u = 0; u < this.topics.length; u++)
          p = L(this.topics[u], i[u], y, p), y[p++] = this.requestedQos[u];
        break;
      case t.UNSUBSCRIBE:
        for (var u = 0; u < this.topics.length; u++)
          p = L(this.topics[u], i[u], y, p);
        break;
    }
    return N;
  };
  function k(e, n) {
    var i = n, l = e[n], d = l >> 4, u = l &= 15;
    n += 1;
    var _, S = 0, p = 1;
    do {
      if (n == e.length)
        return [null, i];
      _ = e[n++], S += (_ & 127) * p, p *= 128;
    } while (_ & 128);
    var N = n + S;
    if (N > e.length)
      return [null, i];
    var y = new M(d);
    switch (d) {
      case t.CONNACK:
        var h = e[n++];
        h & 1 && (y.sessionPresent = !0), y.returnCode = e[n++];
        break;
      case t.PUBLISH:
        var g = u >> 1 & 3, x = D(e, n);
        n += 2;
        var R = Z(e, n, x);
        n += x, g > 0 && (y.messageIdentifier = D(e, n), n += 2);
        var T = new Paho.MQTT.Message(e.subarray(n, N));
        (u & 1) == 1 && (T.retained = !0), (u & 8) == 8 && (T.duplicate = !0), T.qos = g, T.destinationName = R, y.payloadMessage = T;
        break;
      case t.PUBACK:
      case t.PUBREC:
      case t.PUBREL:
      case t.PUBCOMP:
      case t.UNSUBACK:
        y.messageIdentifier = D(e, n);
        break;
      case t.SUBACK:
        y.messageIdentifier = D(e, n), n += 2, y.returnCode = e.subarray(n, N);
        break;
    }
    return [y, N];
  }
  function P(e, n, i) {
    return n[i++] = e >> 8, n[i++] = e % 256, i;
  }
  function L(e, n, i, l) {
    return l = P(n, i, l), q(e, i, l), l + n;
  }
  function D(e, n) {
    return 256 * e[n] + e[n + 1];
  }
  function j(e) {
    var n = new Array(1), i = 0;
    do {
      var l = e % 128;
      e = e >> 7, e > 0 && (l |= 128), n[i++] = l;
    } while (e > 0 && i < 4);
    return n;
  }
  function U(e) {
    for (var n = 0, i = 0; i < e.length; i++) {
      var l = e.charCodeAt(i);
      l > 2047 ? (55296 <= l && l <= 56319 && (i++, n++), n += 3) : l > 127 ? n += 2 : n++;
    }
    return n;
  }
  function q(e, n, i) {
    for (var l = i, d = 0; d < e.length; d++) {
      var u = e.charCodeAt(d);
      if (55296 <= u && u <= 56319) {
        var _ = e.charCodeAt(++d);
        if (isNaN(_))
          throw new Error(
            f(o.MALFORMED_UNICODE, [u, _])
          );
        u = (u - 55296 << 10) + (_ - 56320) + 65536;
      }
      u <= 127 ? n[l++] = u : u <= 2047 ? (n[l++] = u >> 6 & 31 | 192, n[l++] = u & 63 | 128) : u <= 65535 ? (n[l++] = u >> 12 & 15 | 224, n[l++] = u >> 6 & 63 | 128, n[l++] = u & 63 | 128) : (n[l++] = u >> 18 & 7 | 240, n[l++] = u >> 12 & 63 | 128, n[l++] = u >> 6 & 63 | 128, n[l++] = u & 63 | 128);
    }
    return n;
  }
  function Z(e, n, i) {
    for (var l = "", d, u = n; u < n + i; ) {
      var _ = e[u++];
      if (_ < 128)
        d = _;
      else {
        var S = e[u++] - 128;
        if (S < 0)
          throw new Error(
            f(o.MALFORMED_UTF, [
              _.toString(16),
              S.toString(16),
              ""
            ])
          );
        if (_ < 224)
          d = 64 * (_ - 192) + S;
        else {
          var p = e[u++] - 128;
          if (p < 0)
            throw new Error(
              f(o.MALFORMED_UTF, [
                _.toString(16),
                S.toString(16),
                p.toString(16)
              ])
            );
          if (_ < 240)
            d = 4096 * (_ - 224) + 64 * S + p;
          else {
            var N = e[u++] - 128;
            if (N < 0)
              throw new Error(
                f(o.MALFORMED_UTF, [
                  _.toString(16),
                  S.toString(16),
                  p.toString(16),
                  N.toString(16)
                ])
              );
            if (_ < 248)
              d = 262144 * (_ - 240) + 4096 * S + 64 * p + N;
            else
              throw new Error(
                f(o.MALFORMED_UTF, [
                  _.toString(16),
                  S.toString(16),
                  p.toString(16),
                  N.toString(16)
                ])
              );
          }
        }
      }
      d > 65535 && (d -= 65536, l += String.fromCharCode(55296 + (d >> 10)), d = 56320 + (d & 1023)), l += String.fromCharCode(d);
    }
    return l;
  }
  var ee = function(e, n, i) {
    this._client = e, this._window = n, this._keepAliveInterval = i * 1e3, this.isReset = !1;
    var l = new M(t.PINGREQ).encode(), d = function(_) {
      return function() {
        return u.apply(_);
      };
    }, u = function() {
      this.isReset ? (this.isReset = !1, this._client._trace("Pinger.doPing", "send PINGREQ"), this._client.socket.send(l), this.timeout = this._window.setTimeout(
        d(this),
        this._keepAliveInterval
      )) : (this._client._trace("Pinger.doPing", "Timed out"), this._client._disconnected(
        o.PING_TIMEOUT.code,
        f(o.PING_TIMEOUT)
      ));
    };
    this.reset = function() {
      this.isReset = !0, this._window.clearTimeout(this.timeout), this._keepAliveInterval > 0 && (this.timeout = setTimeout(d(this), this._keepAliveInterval));
    }, this.cancel = function() {
      this._window.clearTimeout(this.timeout);
    };
  }, b = function(e, n, i, l, d) {
    this._window = n, i || (i = 30);
    var u = function(_, S, p) {
      return function() {
        return _.apply(S, p);
      };
    };
    this.timeout = setTimeout(
      u(l, e, d),
      i * 1e3
    ), this.cancel = function() {
      this._window.clearTimeout(this.timeout);
    };
  }, I = function(e, n, i, l, d) {
    if (!("WebSocket" in s && s.WebSocket !== null))
      throw new Error(f(o.UNSUPPORTED, ["WebSocket"]));
    if (!("localStorage" in s && s.localStorage !== null))
      throw new Error(f(o.UNSUPPORTED, ["localStorage"]));
    if (!("ArrayBuffer" in s && s.ArrayBuffer !== null))
      throw new Error(f(o.UNSUPPORTED, ["ArrayBuffer"]));
    this._trace("Paho.MQTT.Client", e, n, i, l, d), this.host = n, this.port = i, this.path = l, this.uri = e, this.clientId = d, this._wsuri = null, this._localKey = n + ":" + i + (l != "/mqtt" ? ":" + l : "") + ":" + d + ":", this._msg_queue = [], this._buffered_msg_queue = [], this._sentMessages = {}, this._receivedMessages = {}, this._notify_msg_sent = {}, this._message_identifier = 1, this._sequence = 0;
    for (var u in localStorage)
      (u.indexOf("Sent:" + this._localKey) === 0 || u.indexOf("Received:" + this._localKey) === 0) && this.restore(u);
  };
  I.prototype.host = null, I.prototype.port = null, I.prototype.path = null, I.prototype.uri = null, I.prototype.clientId = null, I.prototype.socket = null, I.prototype.connected = !1, I.prototype.maxMessageIdentifier = 65536, I.prototype.connectOptions = null, I.prototype.hostIndex = null, I.prototype.onConnected = null, I.prototype.onConnectionLost = null, I.prototype.onMessageDelivered = null, I.prototype.onMessageArrived = null, I.prototype.traceFunction = null, I.prototype._msg_queue = null, I.prototype._buffered_msg_queue = null, I.prototype._connectTimeout = null, I.prototype.sendPinger = null, I.prototype.receivePinger = null, I.prototype._reconnectInterval = 1, I.prototype._reconnecting = !1, I.prototype._reconnectTimeout = null, I.prototype.disconnectedPublishing = !1, I.prototype.disconnectedBufferSize = 5e3, I.prototype.receiveBuffer = null, I.prototype._traceBuffer = null, I.prototype._MAX_TRACE_ENTRIES = 100, I.prototype.connect = function(e) {
    var n = this._traceMask(e, "password");
    if (this._trace(
      "Client.connect",
      n,
      this.socket,
      this.connected
    ), this.connected)
      throw new Error(f(o.INVALID_STATE, ["already connected"]));
    if (this.socket)
      throw new Error(f(o.INVALID_STATE, ["already connected"]));
    this._reconnecting && (this._reconnectTimeout.cancel(), this._reconnectTimeout = null, this._reconnecting = !1), this.connectOptions = e, this._reconnectInterval = 1, this._reconnecting = !1, e.uris ? (this.hostIndex = 0, this._doConnect(e.uris[0])) : this._doConnect(this.uri);
  }, I.prototype.subscribe = function(e, n) {
    if (this._trace("Client.subscribe", e, n), !this.connected)
      throw new Error(f(o.INVALID_STATE, ["not connected"]));
    var i = new M(t.SUBSCRIBE);
    i.topics = [e], n.qos !== void 0 ? i.requestedQos = [n.qos] : i.requestedQos = [0], n.onSuccess && (i.onSuccess = function(l) {
      n.onSuccess({
        invocationContext: n.invocationContext,
        grantedQos: l
      });
    }), n.onFailure && (i.onFailure = function(l) {
      n.onFailure({
        invocationContext: n.invocationContext,
        errorCode: l,
        errorMessage: f(l)
      });
    }), n.timeout && (i.timeOut = new b(
      this,
      window,
      n.timeout,
      n.onFailure,
      [
        {
          invocationContext: n.invocationContext,
          errorCode: o.SUBSCRIBE_TIMEOUT.code,
          errorMessage: f(o.SUBSCRIBE_TIMEOUT)
        }
      ]
    )), this._requires_ack(i), this._schedule_message(i);
  }, I.prototype.unsubscribe = function(e, n) {
    if (this._trace("Client.unsubscribe", e, n), !this.connected)
      throw new Error(f(o.INVALID_STATE, ["not connected"]));
    var i = new M(t.UNSUBSCRIBE);
    i.topics = [e], n.onSuccess && (i.callback = function() {
      n.onSuccess({
        invocationContext: n.invocationContext
      });
    }), n.timeout && (i.timeOut = new b(
      this,
      window,
      n.timeout,
      n.onFailure,
      [
        {
          invocationContext: n.invocationContext,
          errorCode: o.UNSUBSCRIBE_TIMEOUT.code,
          errorMessage: f(o.UNSUBSCRIBE_TIMEOUT)
        }
      ]
    )), this._requires_ack(i), this._schedule_message(i);
  }, I.prototype.send = function(e) {
    if (this._trace("Client.send", e), wireMessage = new M(t.PUBLISH), wireMessage.payloadMessage = e, this.connected)
      e.qos > 0 ? this._requires_ack(wireMessage) : this.onMessageDelivered && (this._notify_msg_sent[wireMessage] = this.onMessageDelivered(
        wireMessage.payloadMessage
      )), this._schedule_message(wireMessage);
    else if (this._reconnecting && this.disconnectedPublishing) {
      var n = Object.keys(this._sentMessages).length + this._buffered_msg_queue.length;
      if (n > this.disconnectedBufferSize)
        throw new Error(
          f(o.BUFFER_FULL, [this.disconnectedBufferSize])
        );
      e.qos > 0 ? this._requires_ack(wireMessage) : (wireMessage.sequence = ++this._sequence, this._buffered_msg_queue.push(wireMessage));
    } else
      throw new Error(f(o.INVALID_STATE, ["not connected"]));
  }, I.prototype.disconnect = function() {
    if (this._trace("Client.disconnect"), this._reconnecting && (this._reconnectTimeout.cancel(), this._reconnectTimeout = null, this._reconnecting = !1), !this.socket)
      throw new Error(
        f(o.INVALID_STATE, ["not connecting or connected"])
      );
    wireMessage = new M(t.DISCONNECT), this._notify_msg_sent[wireMessage] = c(this._disconnected, this), this._schedule_message(wireMessage);
  }, I.prototype.getTraceLog = function() {
    if (this._traceBuffer !== null) {
      this._trace("Client.getTraceLog", new Date()), this._trace(
        "Client.getTraceLog in flight messages",
        this._sentMessages.length
      );
      for (var e in this._sentMessages)
        this._trace("_sentMessages ", e, this._sentMessages[e]);
      for (var e in this._receivedMessages)
        this._trace("_receivedMessages ", e, this._receivedMessages[e]);
      return this._traceBuffer;
    }
  }, I.prototype.startTrace = function() {
    this._traceBuffer === null && (this._traceBuffer = []), this._trace("Client.startTrace", new Date(), r);
  }, I.prototype.stopTrace = function() {
    delete this._traceBuffer;
  }, I.prototype._doConnect = function(e) {
    if (this.connectOptions.useSSL) {
      var n = e.split(":");
      n[0] = "wss", e = n.join(":");
    }
    this._wsuri = e, this.connected = !1, this.connectOptions.mqttVersion < 4 ? this.socket = new WebSocket(e, ["mqttv3.1"]) : this.socket = new WebSocket(e, ["mqtt"]), this.socket.binaryType = "arraybuffer", this.socket.onopen = c(this._on_socket_open, this), this.socket.onmessage = c(this._on_socket_message, this), this.socket.onerror = c(this._on_socket_error, this), this.socket.onclose = c(this._on_socket_close, this), this.sendPinger = new ee(
      this,
      window,
      this.connectOptions.keepAliveInterval
    ), this.receivePinger = new ee(
      this,
      window,
      this.connectOptions.keepAliveInterval
    ), this._connectTimeout && (this._connectTimeout.cancel(), this._connectTimeout = null), this._connectTimeout = new b(
      this,
      window,
      this.connectOptions.timeout,
      this._disconnected,
      [o.CONNECT_TIMEOUT.code, f(o.CONNECT_TIMEOUT)]
    );
  }, I.prototype._schedule_message = function(e) {
    this._msg_queue.push(e), this.connected && this._process_queue();
  }, I.prototype.store = function(e, n) {
    var i = {
      type: n.type,
      messageIdentifier: n.messageIdentifier,
      version: 1
    };
    switch (n.type) {
      case t.PUBLISH:
        n.pubRecReceived && (i.pubRecReceived = !0), i.payloadMessage = {};
        for (var l = "", d = n.payloadMessage.payloadBytes, u = 0; u < d.length; u++)
          d[u] <= 15 ? l = l + "0" + d[u].toString(16) : l = l + d[u].toString(16);
        i.payloadMessage.payloadHex = l, i.payloadMessage.qos = n.payloadMessage.qos, i.payloadMessage.destinationName = n.payloadMessage.destinationName, n.payloadMessage.duplicate && (i.payloadMessage.duplicate = !0), n.payloadMessage.retained && (i.payloadMessage.retained = !0), e.indexOf("Sent:") === 0 && (n.sequence === void 0 && (n.sequence = ++this._sequence), i.sequence = n.sequence);
        break;
      default:
        throw Error(f(o.INVALID_STORED_DATA, [key, i]));
    }
    localStorage.setItem(
      e + this._localKey + n.messageIdentifier,
      JSON.stringify(i)
    );
  }, I.prototype.restore = function(e) {
    var n = localStorage.getItem(e), i = JSON.parse(n), l = new M(i.type, i);
    switch (i.type) {
      case t.PUBLISH:
        for (var d = i.payloadMessage.payloadHex, u = new ArrayBuffer(d.length / 2), _ = new Uint8Array(u), S = 0; d.length >= 2; ) {
          var p = parseInt(d.substring(0, 2), 16);
          d = d.substring(2, d.length), _[S++] = p;
        }
        var N = new Paho.MQTT.Message(_);
        N.qos = i.payloadMessage.qos, N.destinationName = i.payloadMessage.destinationName, i.payloadMessage.duplicate && (N.duplicate = !0), i.payloadMessage.retained && (N.retained = !0), l.payloadMessage = N;
        break;
      default:
        throw Error(f(o.INVALID_STORED_DATA, [e, n]));
    }
    e.indexOf("Sent:" + this._localKey) === 0 ? (l.payloadMessage.duplicate = !0, this._sentMessages[l.messageIdentifier] = l) : e.indexOf("Received:" + this._localKey) === 0 && (this._receivedMessages[l.messageIdentifier] = l);
  }, I.prototype._process_queue = function() {
    for (var e = null, n = this._msg_queue.reverse(); e = n.pop(); )
      this._socket_send(e), this._notify_msg_sent[e] && (this._notify_msg_sent[e](), delete this._notify_msg_sent[e]);
  }, I.prototype._requires_ack = function(e) {
    var n = Object.keys(this._sentMessages).length;
    if (n > this.maxMessageIdentifier)
      throw Error("Too many messages:" + n);
    for (; this._sentMessages[this._message_identifier] !== void 0; )
      this._message_identifier++;
    e.messageIdentifier = this._message_identifier, this._sentMessages[e.messageIdentifier] = e, e.type === t.PUBLISH && this.store("Sent:", e), this._message_identifier === this.maxMessageIdentifier && (this._message_identifier = 1);
  }, I.prototype._on_socket_open = function() {
    var e = new M(
      t.CONNECT,
      this.connectOptions
    );
    e.clientId = this.clientId, this._socket_send(e);
  }, I.prototype._on_socket_message = function(e) {
    this._trace("Client._on_socket_message", e.data);
    for (var n = this._deframeMessages(e.data), i = 0; i < n.length; i += 1)
      this._handleMessage(n[i]);
  }, I.prototype._deframeMessages = function(e) {
    var n = new Uint8Array(e), i = [];
    if (this.receiveBuffer) {
      var l = new Uint8Array(
        this.receiveBuffer.length + n.length
      );
      l.set(this.receiveBuffer), l.set(n, this.receiveBuffer.length), n = l, delete this.receiveBuffer;
    }
    try {
      for (var d = 0; d < n.length; ) {
        var u = k(n, d), _ = u[0];
        if (d = u[1], _ !== null)
          i.push(_);
        else
          break;
      }
      d < n.length && (this.receiveBuffer = n.subarray(d));
    } catch (p) {
      var S = p.hasOwnProperty("stack") == "undefined" ? p.stack.toString() : "No Error Stack Available";
      this._disconnected(
        o.INTERNAL_ERROR.code,
        f(o.INTERNAL_ERROR, [p.message, S])
      );
      return;
    }
    return i;
  }, I.prototype._handleMessage = function(e) {
    this._trace("Client._handleMessage", e);
    try {
      switch (e.type) {
        case t.CONNACK:
          if (this._connectTimeout.cancel(), this._reconnectTimeout && this._reconnectTimeout.cancel(), this.connectOptions.cleanSession) {
            for (var n in this._sentMessages) {
              var g = this._sentMessages[n];
              localStorage.removeItem(
                "Sent:" + this._localKey + g.messageIdentifier
              );
            }
            this._sentMessages = {};
            for (var n in this._receivedMessages) {
              var y = this._receivedMessages[n];
              localStorage.removeItem(
                "Received:" + this._localKey + y.messageIdentifier
              );
            }
            this._receivedMessages = {};
          }
          if (e.returnCode === 0)
            this.connected = !0, this.connectOptions.uris && (this.hostIndex = this.connectOptions.uris.length);
          else {
            this._disconnected(
              o.CONNACK_RETURNCODE.code,
              f(o.CONNACK_RETURNCODE, [
                e.returnCode,
                v[e.returnCode]
              ])
            );
            break;
          }
          var u = [];
          for (var i in this._sentMessages)
            this._sentMessages.hasOwnProperty(i) && u.push(this._sentMessages[i]);
          if (this._buffered_msg_queue.length > 0)
            for (var l = null, d = this._buffered_msg_queue.reverse(); l = d.pop(); )
              u.push(l), this.onMessageDelivered && (this._notify_msg_sent[l] = this.onMessageDelivered(
                l.payloadMessage
              ));
          for (var u = u.sort(function(R, T) {
            return R.sequence - T.sequence;
          }), _ = 0, S = u.length; _ < S; _++) {
            var g = u[_];
            if (g.type == t.PUBLISH && g.pubRecReceived) {
              var p = new M(t.PUBREL, {
                messageIdentifier: g.messageIdentifier
              });
              this._schedule_message(p);
            } else
              this._schedule_message(g);
          }
          this.connectOptions.onSuccess && this.connectOptions.onSuccess({
            invocationContext: this.connectOptions.invocationContext
          });
          var N = !1;
          this._reconnecting && (N = !0, this._reconnectInterval = 1, this._reconnecting = !1), this._connected(N, this._wsuri), this._process_queue();
          break;
        case t.PUBLISH:
          this._receivePublish(e);
          break;
        case t.PUBACK:
          var g = this._sentMessages[e.messageIdentifier];
          g && (delete this._sentMessages[e.messageIdentifier], localStorage.removeItem(
            "Sent:" + this._localKey + e.messageIdentifier
          ), this.onMessageDelivered && this.onMessageDelivered(g.payloadMessage));
          break;
        case t.PUBREC:
          var g = this._sentMessages[e.messageIdentifier];
          if (g) {
            g.pubRecReceived = !0;
            var p = new M(t.PUBREL, {
              messageIdentifier: e.messageIdentifier
            });
            this.store("Sent:", g), this._schedule_message(p);
          }
          break;
        case t.PUBREL:
          var y = this._receivedMessages[e.messageIdentifier];
          localStorage.removeItem(
            "Received:" + this._localKey + e.messageIdentifier
          ), y && (this._receiveMessage(y), delete this._receivedMessages[e.messageIdentifier]);
          var h = new M(t.PUBCOMP, {
            messageIdentifier: e.messageIdentifier
          });
          this._schedule_message(h);
          break;
        case t.PUBCOMP:
          var g = this._sentMessages[e.messageIdentifier];
          delete this._sentMessages[e.messageIdentifier], localStorage.removeItem(
            "Sent:" + this._localKey + e.messageIdentifier
          ), this.onMessageDelivered && this.onMessageDelivered(g.payloadMessage);
          break;
        case t.SUBACK:
          var g = this._sentMessages[e.messageIdentifier];
          g && (g.timeOut && g.timeOut.cancel(), e.returnCode[0] === 128 ? g.onFailure && g.onFailure(e.returnCode) : g.onSuccess && g.onSuccess(e.returnCode), delete this._sentMessages[e.messageIdentifier]);
          break;
        case t.UNSUBACK:
          var g = this._sentMessages[e.messageIdentifier];
          g && (g.timeOut && g.timeOut.cancel(), g.callback && g.callback(), delete this._sentMessages[e.messageIdentifier]);
          break;
        case t.PINGRESP:
          this.sendPinger.reset();
          break;
        case t.DISCONNECT:
          this._disconnected(
            o.INVALID_MQTT_MESSAGE_TYPE.code,
            f(o.INVALID_MQTT_MESSAGE_TYPE, [e.type])
          );
          break;
        default:
          this._disconnected(
            o.INVALID_MQTT_MESSAGE_TYPE.code,
            f(o.INVALID_MQTT_MESSAGE_TYPE, [e.type])
          );
      }
    } catch (R) {
      var x = R.hasOwnProperty("stack") == "undefined" ? R.stack.toString() : "No Error Stack Available";
      this._disconnected(
        o.INTERNAL_ERROR.code,
        f(o.INTERNAL_ERROR, [R.message, x])
      );
      return;
    }
  }, I.prototype._on_socket_error = function(e) {
    this._reconnecting || this._disconnected(
      o.SOCKET_ERROR.code,
      f(o.SOCKET_ERROR, [e.data])
    );
  }, I.prototype._on_socket_close = function() {
    this._reconnecting || this._disconnected(o.SOCKET_CLOSE.code, f(o.SOCKET_CLOSE));
  }, I.prototype._socket_send = function(e) {
    if (e.type == 1) {
      var n = this._traceMask(e, "password");
      this._trace("Client._socket_send", n);
    } else
      this._trace("Client._socket_send", e);
    this.socket.send(e.encode()), this.sendPinger.reset();
  }, I.prototype._receivePublish = function(e) {
    switch (e.payloadMessage.qos) {
      case "undefined":
      case 0:
        this._receiveMessage(e);
        break;
      case 1:
        var n = new M(t.PUBACK, {
          messageIdentifier: e.messageIdentifier
        });
        this._schedule_message(n), this._receiveMessage(e);
        break;
      case 2:
        this._receivedMessages[e.messageIdentifier] = e, this.store("Received:", e);
        var i = new M(t.PUBREC, {
          messageIdentifier: e.messageIdentifier
        });
        this._schedule_message(i);
        break;
      default:
        throw Error("Invaild qos=" + wireMmessage.payloadMessage.qos);
    }
  }, I.prototype._receiveMessage = function(e) {
    this.onMessageArrived && this.onMessageArrived(e.payloadMessage);
  }, I.prototype._connected = function(e, n) {
    this.onConnected && this.onConnected(e, n);
  }, I.prototype._reconnect = function() {
    this._trace("Client._reconnect"), this.connected || (this._reconnecting = !0, this.sendPinger.cancel(), this.receivePinger.cancel(), this._reconnectInterval < 128 && (this._reconnectInterval = this._reconnectInterval * 2), this.connectOptions.uris ? (this.hostIndex = 0, this._doConnect(this.connectOptions.uris[0])) : this._doConnect(this.uri));
  }, I.prototype._disconnected = function(e, n) {
    if (this._trace("Client._disconnected", e, n), e !== void 0 && this._reconnecting) {
      this._reconnectTimeout = new b(
        this,
        window,
        this._reconnectInterval,
        this._reconnect
      );
      return;
    }
    if (this.sendPinger.cancel(), this.receivePinger.cancel(), this._connectTimeout && (this._connectTimeout.cancel(), this._connectTimeout = null), this._msg_queue = [], this._buffered_msg_queue = [], this._notify_msg_sent = {}, this.socket && (this.socket.onopen = null, this.socket.onmessage = null, this.socket.onerror = null, this.socket.onclose = null, this.socket.readyState === 1 && this.socket.close(), delete this.socket), this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length - 1)
      this.hostIndex++, this._doConnect(this.connectOptions.uris[this.hostIndex]);
    else if (e === void 0 && (e = o.OK.code, n = f(o.OK)), this.connected) {
      if (this.connected = !1, this.onConnectionLost && this.onConnectionLost({
        errorCode: e,
        errorMessage: n,
        reconnect: this.connectOptions.reconnect,
        uri: this._wsuri
      }), e !== o.OK.code && this.connectOptions.reconnect) {
        this._reconnectInterval = 1, this._reconnect();
        return;
      }
    } else
      this.connectOptions.mqttVersion === 4 && this.connectOptions.mqttVersionExplicit === !1 ? (this._trace("Failed to connect V4, dropping back to V3"), this.connectOptions.mqttVersion = 3, this.connectOptions.uris ? (this.hostIndex = 0, this._doConnect(this.connectOptions.uris[0])) : this._doConnect(this.uri)) : this.connectOptions.onFailure && this.connectOptions.onFailure({
        invocationContext: this.connectOptions.invocationContext,
        errorCode: e,
        errorMessage: n
      });
  }, I.prototype._trace = function() {
    if (this.traceFunction) {
      for (var e in arguments)
        typeof arguments[e] < "u" && arguments.splice(e, 1, JSON.stringify(arguments[e]));
      var n = Array.prototype.slice.call(arguments).join("");
      this.traceFunction({ severity: "Debug", message: n });
    }
    if (this._traceBuffer !== null)
      for (var e = 0, i = arguments.length; e < i; e++)
        this._traceBuffer.length == this._MAX_TRACE_ENTRIES && this._traceBuffer.shift(), e === 0 ? this._traceBuffer.push(arguments[e]) : typeof arguments[e] > "u" ? this._traceBuffer.push(arguments[e]) : this._traceBuffer.push("  " + JSON.stringify(arguments[e]));
  }, I.prototype._traceMask = function(e, n) {
    var i = {};
    for (var l in e)
      e.hasOwnProperty(l) && (l == n ? i[l] = "******" : i[l] = e[l]);
    return i;
  };
  var m = function(e, n, i, l) {
    var d;
    if (typeof e != "string")
      throw new Error(f(o.INVALID_TYPE, [typeof e, "host"]));
    if (arguments.length == 2) {
      l = n, d = e;
      var u = d.match(
        /^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/
      );
      if (u)
        e = u[4] || u[2], n = parseInt(u[7]), i = u[8];
      else
        throw new Error(f(o.INVALID_ARGUMENT, [e, "host"]));
    } else {
      if (arguments.length == 3 && (l = i, i = "/mqtt"), typeof n != "number" || n < 0)
        throw new Error(f(o.INVALID_TYPE, [typeof n, "port"]));
      if (typeof i != "string")
        throw new Error(f(o.INVALID_TYPE, [typeof i, "path"]));
      var _ = e.indexOf(":") !== -1 && e.slice(0, 1) !== "[" && e.slice(-1) !== "]";
      d = "ws://" + (_ ? "[" + e + "]" : e) + ":" + n + i;
    }
    for (var S = 0, p = 0; p < l.length; p++) {
      var N = l.charCodeAt(p);
      55296 <= N && N <= 56319 && p++, S++;
    }
    if (typeof l != "string" || S > 65535)
      throw new Error(f(o.INVALID_ARGUMENT, [l, "clientId"]));
    var y = new I(d, e, n, i, l);
    this._getHost = function() {
      return e;
    }, this._setHost = function() {
      throw new Error(f(o.UNSUPPORTED_OPERATION));
    }, this._getPort = function() {
      return n;
    }, this._setPort = function() {
      throw new Error(f(o.UNSUPPORTED_OPERATION));
    }, this._getPath = function() {
      return i;
    }, this._setPath = function() {
      throw new Error(f(o.UNSUPPORTED_OPERATION));
    }, this._getURI = function() {
      return d;
    }, this._setURI = function() {
      throw new Error(f(o.UNSUPPORTED_OPERATION));
    }, this._getClientId = function() {
      return y.clientId;
    }, this._setClientId = function() {
      throw new Error(f(o.UNSUPPORTED_OPERATION));
    }, this._getOnConnected = function() {
      return y.onConnected;
    }, this._setOnConnected = function(h) {
      if (typeof h == "function")
        y.onConnected = h;
      else
        throw new Error(
          f(o.INVALID_TYPE, [typeof h, "onConnected"])
        );
    }, this._getDisconnectedPublishing = function() {
      return y.disconnectedPublishing;
    }, this._setDisconnectedPublishing = function(h) {
      y.disconnectedPublishing = h;
    }, this._getDisconnectedBufferSize = function() {
      return y.disconnectedBufferSize;
    }, this._setDisconnectedBufferSize = function(h) {
      y.disconnectedBufferSize = h;
    }, this._getOnConnectionLost = function() {
      return y.onConnectionLost;
    }, this._setOnConnectionLost = function(h) {
      if (typeof h == "function")
        y.onConnectionLost = h;
      else
        throw new Error(
          f(o.INVALID_TYPE, [
            typeof h,
            "onConnectionLost"
          ])
        );
    }, this._getOnMessageDelivered = function() {
      return y.onMessageDelivered;
    }, this._setOnMessageDelivered = function(h) {
      if (typeof h == "function")
        y.onMessageDelivered = h;
      else
        throw new Error(
          f(o.INVALID_TYPE, [
            typeof h,
            "onMessageDelivered"
          ])
        );
    }, this._getOnMessageArrived = function() {
      return y.onMessageArrived;
    }, this._setOnMessageArrived = function(h) {
      if (typeof h == "function")
        y.onMessageArrived = h;
      else
        throw new Error(
          f(o.INVALID_TYPE, [
            typeof h,
            "onMessageArrived"
          ])
        );
    }, this._getTrace = function() {
      return y.traceFunction;
    }, this._setTrace = function(h) {
      if (typeof h == "function")
        y.traceFunction = h;
      else
        throw new Error(f(o.INVALID_TYPE, [typeof h, "onTrace"]));
    }, this.connect = function(h) {
      if (h = h || {}, a(h, {
        timeout: "number",
        userName: "string",
        password: "string",
        willMessage: "object",
        keepAliveInterval: "number",
        cleanSession: "boolean",
        useSSL: "boolean",
        invocationContext: "object",
        onSuccess: "function",
        onFailure: "function",
        hosts: "object",
        ports: "object",
        reconnect: "boolean",
        mqttVersion: "number",
        mqttVersionExplicit: "boolean",
        uris: "object"
      }), h.keepAliveInterval === void 0 && (h.keepAliveInterval = 60), h.mqttVersion > 4 || h.mqttVersion < 3)
        throw new Error(
          f(o.INVALID_ARGUMENT, [
            h.mqttVersion,
            "connectOptions.mqttVersion"
          ])
        );
      if (h.mqttVersion === void 0 ? (h.mqttVersionExplicit = !1, h.mqttVersion = 4) : h.mqttVersionExplicit = !0, h.password !== void 0 && h.userName === void 0)
        throw new Error(
          f(o.INVALID_ARGUMENT, [
            h.password,
            "connectOptions.password"
          ])
        );
      if (h.willMessage) {
        if (!(h.willMessage instanceof E))
          throw new Error(
            f(o.INVALID_TYPE, [
              h.willMessage,
              "connectOptions.willMessage"
            ])
          );
        if (h.willMessage.stringPayload = null, typeof h.willMessage.destinationName > "u")
          throw new Error(
            f(o.INVALID_TYPE, [
              typeof h.willMessage.destinationName,
              "connectOptions.willMessage.destinationName"
            ])
          );
      }
      if (typeof h.cleanSession > "u" && (h.cleanSession = !0), h.hosts) {
        if (!(h.hosts instanceof Array))
          throw new Error(
            f(o.INVALID_ARGUMENT, [
              h.hosts,
              "connectOptions.hosts"
            ])
          );
        if (h.hosts.length < 1)
          throw new Error(
            f(o.INVALID_ARGUMENT, [
              h.hosts,
              "connectOptions.hosts"
            ])
          );
        for (var g = !1, x = 0; x < h.hosts.length; x++) {
          if (typeof h.hosts[x] != "string")
            throw new Error(
              f(o.INVALID_TYPE, [
                typeof h.hosts[x],
                "connectOptions.hosts[" + x + "]"
              ])
            );
          if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(
            h.hosts[x]
          )) {
            if (x === 0)
              g = !0;
            else if (!g)
              throw new Error(
                f(o.INVALID_ARGUMENT, [
                  h.hosts[x],
                  "connectOptions.hosts[" + x + "]"
                ])
              );
          } else if (g)
            throw new Error(
              f(o.INVALID_ARGUMENT, [
                h.hosts[x],
                "connectOptions.hosts[" + x + "]"
              ])
            );
        }
        if (g)
          h.uris = h.hosts;
        else {
          if (!h.ports)
            throw new Error(
              f(o.INVALID_ARGUMENT, [
                h.ports,
                "connectOptions.ports"
              ])
            );
          if (!(h.ports instanceof Array))
            throw new Error(
              f(o.INVALID_ARGUMENT, [
                h.ports,
                "connectOptions.ports"
              ])
            );
          if (h.hosts.length !== h.ports.length)
            throw new Error(
              f(o.INVALID_ARGUMENT, [
                h.ports,
                "connectOptions.ports"
              ])
            );
          h.uris = [];
          for (var x = 0; x < h.hosts.length; x++) {
            if (typeof h.ports[x] != "number" || h.ports[x] < 0)
              throw new Error(
                f(o.INVALID_TYPE, [
                  typeof h.ports[x],
                  "connectOptions.ports[" + x + "]"
                ])
              );
            var R = h.hosts[x], T = h.ports[x], Ne = R.indexOf(":") !== -1;
            d = "ws://" + (Ne ? "[" + R + "]" : R) + ":" + T + i, h.uris.push(d);
          }
        }
      }
      y.connect(h);
    }, this.subscribe = function(h, g) {
      if (typeof h != "string")
        throw new Error("Invalid argument:" + h);
      if (g = g || {}, a(g, {
        qos: "number",
        invocationContext: "object",
        onSuccess: "function",
        onFailure: "function",
        timeout: "number"
      }), g.timeout && !g.onFailure)
        throw new Error(
          "subscribeOptions.timeout specified with no onFailure callback."
        );
      if (typeof g.qos < "u" && !(g.qos === 0 || g.qos === 1 || g.qos === 2))
        throw new Error(
          f(o.INVALID_ARGUMENT, [
            g.qos,
            "subscribeOptions.qos"
          ])
        );
      y.subscribe(h, g);
    }, this.unsubscribe = function(h, g) {
      if (typeof h != "string")
        throw new Error("Invalid argument:" + h);
      if (g = g || {}, a(g, {
        invocationContext: "object",
        onSuccess: "function",
        onFailure: "function",
        timeout: "number"
      }), g.timeout && !g.onFailure)
        throw new Error(
          "unsubscribeOptions.timeout specified with no onFailure callback."
        );
      y.unsubscribe(h, g);
    }, this.send = function(h, g, x, R) {
      var T;
      if (arguments.length === 0)
        throw new Error("Invalid argument.length");
      if (arguments.length == 1) {
        if (!(h instanceof E) && typeof h != "string")
          throw new Error("Invalid argument:" + typeof h);
        if (T = h, typeof T.destinationName > "u")
          throw new Error(
            f(o.INVALID_ARGUMENT, [
              T.destinationName,
              "Message.destinationName"
            ])
          );
        y.send(T);
      } else
        T = new E(g), T.destinationName = h, arguments.length >= 3 && (T.qos = x), arguments.length >= 4 && (T.retained = R), y.send(T);
    }, this.publish = function(h, g, x, R) {
      console.log("Publising message to: ", h);
      var T;
      if (arguments.length === 0)
        throw new Error("Invalid argument.length");
      if (arguments.length == 1) {
        if (!(h instanceof E) && typeof h != "string")
          throw new Error("Invalid argument:" + typeof h);
        if (T = h, typeof T.destinationName > "u")
          throw new Error(
            f(o.INVALID_ARGUMENT, [
              T.destinationName,
              "Message.destinationName"
            ])
          );
        y.send(T);
      } else
        T = new E(g), T.destinationName = h, arguments.length >= 3 && (T.qos = x), arguments.length >= 4 && (T.retained = R), y.send(T);
    }, this.disconnect = function() {
      y.disconnect();
    }, this.getTraceLog = function() {
      return y.getTraceLog();
    }, this.startTrace = function() {
      y.startTrace();
    }, this.stopTrace = function() {
      y.stopTrace();
    }, this.isConnected = function() {
      return y.connected;
    };
  };
  m.prototype = {
    get host() {
      return this._getHost();
    },
    set host(e) {
      this._setHost(e);
    },
    get port() {
      return this._getPort();
    },
    set port(e) {
      this._setPort(e);
    },
    get path() {
      return this._getPath();
    },
    set path(e) {
      this._setPath(e);
    },
    get clientId() {
      return this._getClientId();
    },
    set clientId(e) {
      this._setClientId(e);
    },
    get onConnected() {
      return this._getOnConnected();
    },
    set onConnected(e) {
      this._setOnConnected(e);
    },
    get disconnectedPublishing() {
      return this._getDisconnectedPublishing();
    },
    set disconnectedPublishing(e) {
      this._setDisconnectedPublishing(e);
    },
    get disconnectedBufferSize() {
      return this._getDisconnectedBufferSize();
    },
    set disconnectedBufferSize(e) {
      this._setDisconnectedBufferSize(e);
    },
    get onConnectionLost() {
      return this._getOnConnectionLost();
    },
    set onConnectionLost(e) {
      this._setOnConnectionLost(e);
    },
    get onMessageDelivered() {
      return this._getOnMessageDelivered();
    },
    set onMessageDelivered(e) {
      this._setOnMessageDelivered(e);
    },
    get onMessageArrived() {
      return this._getOnMessageArrived();
    },
    set onMessageArrived(e) {
      this._setOnMessageArrived(e);
    },
    get trace() {
      return this._getTrace();
    },
    set trace(e) {
      this._setTrace(e);
    }
  };
  var E = function(e) {
    var n;
    if (typeof e == "string" || e instanceof ArrayBuffer || e instanceof Int8Array || e instanceof Uint8Array || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array)
      n = e;
    else
      throw f(o.INVALID_ARGUMENT, [e, "newPayload"]);
    this._getPayloadString = function() {
      return typeof n == "string" ? n : Z(n, 0, n.length);
    }, this._getPayloadBytes = function() {
      if (typeof n == "string") {
        var _ = new ArrayBuffer(U(n)), S = new Uint8Array(_);
        return q(n, S, 0), S;
      } else
        return n;
    };
    var i;
    this._getDestinationName = function() {
      return i;
    }, this._setDestinationName = function(_) {
      if (typeof _ == "string")
        i = _;
      else
        throw new Error(
          f(o.INVALID_ARGUMENT, [
            _,
            "newDestinationName"
          ])
        );
    };
    var l = 0;
    this._getQos = function() {
      return l;
    }, this._setQos = function(_) {
      if (_ === 0 || _ === 1 || _ === 2)
        l = _;
      else
        throw new Error("Invalid argument:" + _);
    };
    var d = !1;
    this._getRetained = function() {
      return d;
    }, this._setRetained = function(_) {
      if (typeof _ == "boolean")
        d = _;
      else
        throw new Error(
          f(o.INVALID_ARGUMENT, [_, "newRetained"])
        );
    };
    var u = !1;
    this._getDuplicate = function() {
      return u;
    }, this._setDuplicate = function(_) {
      u = _;
    };
  };
  return E.prototype = {
    get payloadString() {
      return this._getPayloadString();
    },
    get payloadBytes() {
      return this._getPayloadBytes();
    },
    get destinationName() {
      return this._getDestinationName();
    },
    set destinationName(e) {
      this._setDestinationName(e);
    },
    get topic() {
      return this._getDestinationName();
    },
    set topic(e) {
      this._setDestinationName(e);
    },
    get qos() {
      return this._getQos();
    },
    set qos(e) {
      this._setQos(e);
    },
    get retained() {
      return this._getRetained();
    },
    set retained(e) {
      this._setRetained(e);
    },
    get duplicate() {
      return this._getDuplicate();
    },
    set duplicate(e) {
      this._setDuplicate(e);
    }
  }, {
    Client: m,
    Message: E
  };
}(window);
Object.defineProperty(Te, "__esModule", { value: !0 });
const xt = Mt;
function Tt(s) {
  localStorage = new xt.default(s);
}
var Nt = Te.default = Tt;
class Pt {
  constructor() {
    B(this, "connection_data");
    B(this, "offline_messages", []);
    B(this, "subscriptions", {});
    B(this, "isConnected", !1);
    B(this, "client");
    B(this, "connect", ({
      protocol: r = "ws",
      url: t,
      port: a = 1883
    }) => new Promise((c) => {
      this.connection_data = [r, t, a], this.client = new Paho.MQTT.Client(t, a, wt.v4()), this.client.onConnectionLost = (o) => {
        o.errorCode !== 0 && (this.isConnected = !1);
      }, this.client.onMessageArrived = (o) => {
        var v, f;
        try {
          const { topic: w, payloadString: A } = o, M = JSON.parse(A);
          (f = (v = this.subscriptions)[w]) == null || f.call(v, M);
        } catch (w) {
          console.error("error while receiving a message: ", w);
        }
      }, this.client.disconnectedPublishing = !0, this.client.connect({
        onSuccess: () => {
          this.isConnected = !0, Object.keys(this.subscriptions).forEach(
            (o) => this.client.subscribe(o)
          ), c(!0);
        },
        onFailure: (o) => {
          console.error(o), this.isConnected = !1, c(!1);
        },
        reconnect: !0,
        keepAliveInterval: 10,
        useSSL: !0
      });
    }));
    B(this, "reconnect", () => this.client && this.connection_data && !this.isConnected ? this.client.connect(...this.connection_data) : !1);
    B(this, "disconnect", () => this.client ? this.client.disconnect() : !1);
    B(this, "storeMessage", (r, t) => {
      this.offline_messages.find(
        (c) => c.topic === r && c.data === t
      ) || this.offline_messages.push({ topic: r, data: t });
    });
    B(this, "send", (r, t) => {
      const a = JSON.stringify(t);
      this.client && !this.client.isConnected() && this.storeMessage(r, a), this.client.publish(r, a);
    });
    B(this, "subscribe", (r, t) => {
      this.client.subscribe(r), this.subscriptions[r] = t;
    });
    B(this, "unsubscribe", (r) => {
      this.client.unsubscribe(r), typeof r == "string" && delete this.subscriptions[r];
    });
    Nt({
      size: 1e4,
      storageBackend: $,
      defaultExpires: 1e3 * 3600 * 24,
      enableCache: !0,
      reconnect: !0,
      keepAliveInterval: 10,
      sync: {}
    });
  }
}
class Ot extends Pt {
  constructor() {
    super();
  }
}
export {
  Ot as default
};
