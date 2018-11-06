! function (a) {
if ("object" == typeof exports && "undefined" != typeof module) {
module.exports = a();
} else {
if ("function" == typeof define && define.amd) {
define([], a);
} else {
("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).pako = a();
}
}
}(function () {
return function a(g, b, h) {
function f(m, j) {
if (!b[m]) {
if (!g[m]) {
var e = "function" == typeof require && require;
if (!j && e) {
return e(m, !0);
}
if (c) {
return c(m, !0);
}
var n = new Error("Cannot find module '" + m + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
var i = b[m] = {
exports: {}
};
g[m][0].call(i.exports, function (o) {
var l = g[m][1][o];
return f(l || o);
}, i, i.exports, a, g, b, h);
}
return b[m].exports;
}
for (var c = "function" == typeof require && require, d = 0; d < h.length; d++) {
f(h[d]);
}
return f;
}({
1: [function (d, h, b) {
function j(i, l) {
return Object.prototype.hasOwnProperty.call(i, l);
}
var g = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
b.assign = function (l) {
for (var n = Array.prototype.slice.call(arguments, 1); n.length;) {
var i = n.shift();
if (i) {
if ("object" != typeof i) {
throw new TypeError(i + "must be non-object");
}
for (var m in i) {
j(i, m) && (l[m] = i[m]);
}
}
}
return l;
}, b.shrinkBuf = function (i, l) {
return i.length === l ? i : i.subarray ? i.subarray(0, l) : (i.length = l, i);
};
var c = {
arraySet: function (o, q, l, s, p) {
if (q.subarray && o.subarray) {
o.set(q.subarray(l, l + s), p);
} else {
for (var m = 0; m < s; m++) {
o[p + m] = q[l + m];
}
}
},
flattenChunks: function (o) {
var u, l, v, q, m, p;
for (v = 0, u = 0, l = o.length; u < l; u++) {
v += o[u].length;
}
for (p = new Uint8Array(v), q = 0, u = 0, l = o.length; u < l; u++) {
m = o[u], p.set(m, q), q += m.length;
return p;
}
},
f = {
arraySet: function (o, q, l, s, p) {
for (var m = 0; m < s; m++) {
o[p + m] = q[l + m];
}
},
flattenChunks: function (e) {
return [].concat.apply([], e);
}
};
b.setTyped = function (e) {
e ? (b.Buf8 = Uint8Array, b.Buf16 = Uint16Array, b.Buf32 = Int32Array, b.assign(b, c)) : (b.Buf8 = Array, b.Buf16 = Array, b.Buf32 = Array, b.assign(b, f));
}, b.setTyped(g);
}, {}],
2: [function (o, j, m) {
function c(i, l) {
if (l < 65537 && (i.subarray && p || !i.subarray && f)) {
return String.fromCharCode.apply(null, b.shrinkBuf(i, l));
}
for (var h = "", q = 0; q < l; q++) {
h += String.fromCharCode(i[q]);
}
return h;
}
var b = o("./common"),
f = !0,
p = !0;
try {
String.fromCharCode.apply(null, [0]);
} catch (o) {
f = !1;
}
try {
String.fromCharCode.apply(null, new Uint8Array(1));
} catch (o) {
p = !1;
}
for (var g = new b.Buf8(256), d = 0; d < 256; d++) {
g[d] = d >= 252 ? 6 : d >= 248 ? 5 : d >= 240 ? 4 : d >= 224 ? 3 : d >= 192 ? 2 : 1;
}
g[254] = g[254] = 1, m.string2buf = function (v) {
var y, r, z, u, x, w = v.length,
q = 0;
for (u = 0; u < w; u++) {
55296 == (64512 & (r = v.charCodeAt(u))) && u + 1 < w && 56320 == (64512 & (z = v.charCodeAt(u + 1))) && (r = 65536 + (r - 55296 << 10) + (z - 56320), u++), q += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
}
for (y = new b.Buf8(q), x = 0, u = 0; x < q; u++) {
55296 == (64512 & (r = v.charCodeAt(u))) && u + 1 < w && 56320 == (64512 & (z = v.charCodeAt(u + 1))) && (r = 65536 + (r - 55296 << 10) + (z - 56320), u++), r < 128 ? y[x++] = r : r < 2048 ? (y[x++] = 192 | r >>> 6, y[x++] = 128 | 63 & r) : r < 65536 ? (y[x++] = 224 | r >>> 12, y[x++] = 128 | r >>> 6 & 63, y[x++] = 128 | 63 & r) : (y[x++] = 240 | r >>> 18, y[x++] = 128 | r >>> 12 & 63, y[x++] = 128 | r >>> 6 & 63, y[x++] = 128 | 63 & r);
}
return y;
}, m.buf2binstring = function (e) {
return c(e, e.length);
}, m.binstring2buf = function (i) {
for (var l = new b.Buf8(i.length), h = 0, q = l.length; h < q; h++) {
l[h] = i.charCodeAt(h);
}
return l;
}, m.buf2string = function (u, x) {
var n, w, q, v, h = x || u.length,
y = new Array(2 * h);
for (w = 0, n = 0; n < h;) {
if ((q = u[n++]) < 128) {
y[w++] = q;
} else {
if ((v = g[q]) > 4) {
y[w++] = 65533, n += v - 1;
} else {
for (q &= 2 === v ? 31 : 3 === v ? 15 : 7; v > 1 && n < h;) {
q = q << 6 | 63 & u[n++], v--;
}
v > 1 ? y[w++] = 65533 : q < 65536 ? y[w++] = q : (q -= 65536, y[w++] = 55296 | q >> 10 & 1023, y[w++] = 56320 | 1023 & q);
}
}
}
return c(y, w);
}, m.utf8border = function (i, l) {
var h;
for ((l = l || i.length) > i.length && (l = i.length), h = l - 1; h >= 0 && 128 == (192 & i[h]);) {
h--;
}
return h < 0 ? l : 0 === h ? l : h + g[i[h]] > l ? h : l;
};
}, {
"./common": 1
}],
3: [function (c, d, b) {
d.exports = function (h, m, f, o) {
for (var l = 65535 & h | 0, g = h >>> 16 & 65535 | 0, j = 0; 0 !== f;) {
f -= j = f > 2000 ? 2000 : f;
do {
g = g + (l = l + m[o++] | 0) | 0;
} while (--j);
l %= 65521, g %= 65521;
}
return l | g << 16 | 0;
};
}, {}],
4: [function (c, d, b) {
var f = function () {
for (var h, i = [], g = 0; g < 256; g++) {
h = g;
for (var j = 0; j < 8; j++) {
h = 1 & h ? 3988292384 ^ h >>> 1 : h >>> 1;
}
i[g] = h;
}
return i;
}();
d.exports = function (l, p, g, o) {
var j = f,
n = o + g;
l ^= -1;
for (var m = o; m < n; m++) {
l = l >>> 8 ^ j[255 & (l ^ p[m])];
}
return -1 ^ l;
};
}, {}],
5: [function (aW, bf, bj) {
function a4(b, c) {
return b.msg = ai[c], c;
}
function aY(b) {
return (b << 1) - (b > 4 ? 9 : 0);
}
function ba(b) {
for (var c = b.length;
--c >= 0;) {
b[c] = 0;
}
}
function aX(c) {
var d = c.state,
b = d.pending;
b > c.avail_out && (b = c.avail_out), 0 !== b && (aR.arraySet(c.output, d.pending_buf, d.pending_out, b, c.next_out), c.next_out += b, d.pending_out += b, c.total_out += b, c.avail_out -= b, d.pending -= b, 0 === d.pending && (d.pending_out = 0));
}
function bb(b, c) {
aF._tr_flush_block(b, b.block_start >= 0 ? b.block_start : -1, b.strstart - b.block_start, c), b.block_start = b.strstart, aX(b.strm);
}
function a6(b, c) {
b.pending_buf[b.pending++] = c;
}
function a2(b, c) {
b.pending_buf[b.pending++] = c >>> 8 & 255, b.pending_buf[b.pending++] = 255 & c;
}
function bk(c, f, b, g) {
var d = c.avail_in;
return d > g && (d = g), 0 === d ? 0 : (c.avail_in -= d, aR.arraySet(f, c.input, c.next_in, d, b), 1 === c.state.wrap ? c.adler = aG(c.adler, f, d, b) : 2 === c.state.wrap && (c.adler = aE(c.adler, f, d, b)), c.next_in += d, c.total_in += d, d);
}
function bg(C, w) {
var z, j, b = C.max_chain_length,
p = C.strstart,
D = C.prev_length,
q = C.nice_match,
m = C.strstart > C.w_size - a8 ? C.strstart - (C.w_size - a8) : 0,
g = C.window,
A = C.w_mask,
x = C.prev,
B = C.strstart + ah,
v = g[p + D - 1],
y = g[p + D];
C.prev_length >= C.good_match && (b >>= 2), q > C.lookahead && (q = C.lookahead);
do {
if (z = w, g[z + D] === y && g[z + D - 1] === v && g[z] === g[p] && g[++z] === g[p + 1]) {
p += 2, z++;
do {} while (g[++p] === g[++z] && g[++p] === g[++z] && g[++p] === g[++z] && g[++p] === g[++z] && g[++p] === g[++z] && g[++p] === g[++z] && g[++p] === g[++z] && g[++p] === g[++z] && p < B);
if (j = ah - (B - p), p = B - ah, j > D) {
if (C.match_start = w, D = j, j >= q) {
break;
}
v = g[p + D - 1], y = g[p + D];
}
}
} while ((w = x[w & A]) > m && 0 != --b);
return D <= C.lookahead ? D : C.lookahead;
}
function aU(d) {
var h, b, j, g, c, f = d.w_size;
do {
if (g = d.window_size - d.lookahead - d.strstart, d.strstart >= f + (f - a8)) {
aR.arraySet(d.window, d.window, f, f, 0), d.match_start -= f, d.strstart -= f, d.block_start -= f, h = b = d.hash_size;
do {
j = d.head[--h], d.head[h] = j >= f ? j - f : 0;
} while (--b);
h = b = f;
do {
j = d.prev[--h], d.prev[h] = j >= f ? j - f : 0;
} while (--b);
g += f;
}
if (0 === d.strm.avail_in) {
break;
}
if (b = bk(d.strm, d.window, d.strstart + d.lookahead, g), d.lookahead += b, d.lookahead + d.insert >= a0) {
for (c = d.strstart - d.insert, d.ins_h = d.window[c], d.ins_h = (d.ins_h << d.hash_shift ^ d.window[c + 1]) & d.hash_mask; d.insert && (d.ins_h = (d.ins_h << d.hash_shift ^ d.window[c + a0 - 1]) & d.hash_mask, d.prev[c & d.w_mask] = d.head[d.ins_h], d.head[d.ins_h] = c, c++, d.insert--, !(d.lookahead + d.insert < a0));) {}
}
} while (d.lookahead < a8 && 0 !== d.strm.avail_in);
}
function be(c, d) {
for (var b, f;;) {
if (c.lookahead < a8) {
if (aU(c), c.lookahead < a8 && d === a9) {
return aN;
}
if (0 === c.lookahead) {
break;
}
}
if (b = 0, c.lookahead >= a0 && (c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + a0 - 1]) & c.hash_mask, b = c.prev[c.strstart & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = c.strstart), 0 !== b && c.strstart - b <= c.w_size - a8 && (c.match_length = bg(c, b)), c.match_length >= a0) {
if (f = aF._tr_tally(c, c.strstart - c.match_start, c.match_length - a0), c.lookahead -= c.match_length, c.match_length <= c.max_lazy_match && c.lookahead >= a0) {
c.match_length--;
do {
c.strstart++, c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + a0 - 1]) & c.hash_mask, b = c.prev[c.strstart & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = c.strstart;
} while (0 != --c.match_length);
c.strstart++;
} else {
c.strstart += c.match_length, c.match_length = 0, c.ins_h = c.window[c.strstart], c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + 1]) & c.hash_mask;
}
} else {
f = aF._tr_tally(c, 0, c.window[c.strstart]), c.lookahead--, c.strstart++;
}
if (f && (bb(c, !1), 0 === c.strm.avail_out)) {
return aN;
}
}
return c.insert = c.strstart < a0 - 1 ? c.strstart : a0 - 1, d === aD ? (bb(c, !0), 0 === c.strm.avail_out ? aH : aw) : c.last_lit && (bb(c, !1), 0 === c.strm.avail_out) ? aN : aI;
}
function bh(c, f) {
for (var b, g, d;;) {
if (c.lookahead < a8) {
if (aU(c), c.lookahead < a8 && f === a9) {
return aN;
}
if (0 === c.lookahead) {
break;
}
}
if (b = 0, c.lookahead >= a0 && (c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + a0 - 1]) & c.hash_mask, b = c.prev[c.strstart & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = c.strstart), c.prev_length = c.match_length, c.prev_match = c.match_start, c.match_length = a0 - 1, 0 !== b && c.prev_length < c.max_lazy_match && c.strstart - b <= c.w_size - a8 && (c.match_length = bg(c, b), c.match_length <= 5 && (c.strategy === ay || c.match_length === a0 && c.strstart - c.match_start > 4096) && (c.match_length = a0 - 1)), c.prev_length >= a0 && c.match_length <= c.prev_length) {
d = c.strstart + c.lookahead - a0, g = aF._tr_tally(c, c.strstart - 1 - c.prev_match, c.prev_length - a0), c.lookahead -= c.prev_length - 1, c.prev_length -= 2;
do {
++c.strstart <= d && (c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + a0 - 1]) & c.hash_mask, b = c.prev[c.strstart & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = c.strstart);
} while (0 != --c.prev_length);
if (c.match_available = 0, c.match_length = a0 - 1, c.strstart++, g && (bb(c, !1), 0 === c.strm.avail_out)) {
return aN;
}
} else {
if (c.match_available) {
if ((g = aF._tr_tally(c, 0, c.window[c.strstart - 1])) && bb(c, !1), c.strstart++, c.lookahead--, 0 === c.strm.avail_out) {
return aN;
}
} else {
c.match_available = 1, c.strstart++, c.lookahead--;
}
}
}
return c.match_available && (g = aF._tr_tally(c, 0, c.window[c.strstart - 1]), c.match_available = 0), c.insert = c.strstart < a0 - 1 ? c.strstart : a0 - 1, f === aD ? (bb(c, !0), 0 === c.strm.avail_out ? aH : aw) : c.last_lit && (bb(c, !1), 0 === c.strm.avail_out) ? aN : aI;
}
function a1(d, h) {
for (var b, j, g, c, f = d.window;;) {
if (d.lookahead <= ah) {
if (aU(d), d.lookahead <= ah && h === a9) {
return aN;
}
if (0 === d.lookahead) {
break;
}
}
if (d.match_length = 0, d.lookahead >= a0 && d.strstart > 0 && (g = d.strstart - 1, (j = f[g]) === f[++g] && j === f[++g] && j === f[++g])) {
c = d.strstart + ah;
do {} while (j === f[++g] && j === f[++g] && j === f[++g] && j === f[++g] && j === f[++g] && j === f[++g] && j === f[++g] && j === f[++g] && g < c);
d.match_length = ah - (c - g), d.match_length > d.lookahead && (d.match_length = d.lookahead);
}
if (d.match_length >= a0 ? (b = aF._tr_tally(d, 1, d.match_length - a0), d.lookahead -= d.match_length, d.strstart += d.match_length, d.match_length = 0) : (b = aF._tr_tally(d, 0, d.window[d.strstart]), d.lookahead--, d.strstart++), b && (bb(d, !1), 0 === d.strm.avail_out)) {
return aN;
}
}
return d.insert = 0, h === aD ? (bb(d, !0), 0 === d.strm.avail_out ? aH : aw) : d.last_lit && (bb(d, !1), 0 === d.strm.avail_out) ? aN : aI;
}
function bc(c, d) {
for (var b;;) {
if (0 === c.lookahead && (aU(c), 0 === c.lookahead)) {
if (d === a9) {
return aN;
}
break;
}
if (c.match_length = 0, b = aF._tr_tally(c, 0, c.window[c.strstart]), c.lookahead--, c.strstart++, b && (bb(c, !1), 0 === c.strm.avail_out)) {
return aN;
}
}
return c.insert = 0, d === aD ? (bb(c, !0), 0 === c.strm.avail_out ? aH : aw) : c.last_lit && (bb(c, !1), 0 === c.strm.avail_out) ? aN : aI;
}
function a5(c, f, b, g, d) {
this.good_length = c, this.max_lazy = f, this.nice_length = b, this.max_chain = g, this.func = d;
}
function bi(b) {
b.window_size = 2 * b.w_size, ba(b.head), b.max_lazy_match = aP[b.level].max_lazy, b.good_match = aP[b.level].good_length, b.nice_match = aP[b.level].nice_length, b.max_chain_length = aP[b.level].max_chain, b.strstart = 0, b.block_start = 0, b.lookahead = 0, b.insert = 0, b.match_length = b.prev_length = a0 - 1, b.match_available = 0, b.ins_h = 0;
}
function aS() {
this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = av, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new aR.Buf16(2 * aO), this.dyn_dtree = new aR.Buf16(2 * (2 * ab + 1)), this.bl_tree = new aR.Buf16(2 * (2 * aa + 1)), ba(this.dyn_ltree), ba(this.dyn_dtree), ba(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new aR.Buf16(bd + 1), this.heap = new aR.Buf16(2 * ac + 1), ba(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new aR.Buf16(2 * ac + 1), ba(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
function aT(b) {
var c;
return b && b.state ? (b.total_in = b.total_out = 0, b.data_type = aA, c = b.state, c.pending = 0, c.pending_out = 0, c.wrap < 0 && (c.wrap = -c.wrap), c.status = c.wrap ? aJ : aV, b.adler = 2 === c.wrap ? 0 : 1, c.last_flush = a9, aF._tr_init(c), ao) : a4(b, ag);
}
function aQ(b) {
var c = aT(b);
return c === ao && bi(b.state), c;
}
function a7(f, n, c, m, d, j) {
if (!f) {
return ag;
}
var g = 1;
if (n === aj && (n = 6), m < 0 ? (g = 0, m = -m) : m > 15 && (g = 2, m -= 16), d < 1 || d > al || c !== av || m < 8 || m > 15 || n < 0 || n > 9 || j < 0 || j > aq) {
return a4(f, ag);
}
8 === m && (m = 9);
var b = new aS;
return f.state = b, b.strm = f, b.wrap = g, b.gzhead = null, b.w_bits = m, b.w_size = 1 << b.w_bits, b.w_mask = b.w_size - 1, b.hash_bits = d + 7, b.hash_size = 1 << b.hash_bits, b.hash_mask = b.hash_size - 1, b.hash_shift = ~~((b.hash_bits + a0 - 1) / a0), b.window = new aR.Buf8(2 * b.w_size), b.head = new aR.Buf16(b.hash_size), b.prev = new aR.Buf16(b.w_size), b.lit_bufsize = 1 << d + 6, b.pending_buf_size = 4 * b.lit_bufsize, b.pending_buf = new aR.Buf8(b.pending_buf_size), b.d_buf = 1 * b.lit_bufsize, b.l_buf = 3 * b.lit_bufsize, b.level = n, b.strategy = j, b.method = c, aQ(f);
}
var aP, aR = aW("../utils/common"),
aF = aW("./trees"),
aG = aW("./adler32"),
aE = aW("./crc32"),
ai = aW("./messages"),
a9 = 0,
aC = 1,
af = 3,
aD = 4,
ax = 5,
ao = 0,
aZ = 1,
ag = -2,
ar = -3,
ap = -5,
aj = -1,
ay = 1,
aB = 2,
au = 3,
aq = 4,
am = 0,
aA = 2,
av = 8,
al = 9,
ae = 15,
ad = 8,
ac = 286,
ab = 30,
aa = 19,
aO = 2 * ac + 1,
bd = 15,
a0 = 3,
ah = 258,
a8 = ah + a0 + 1,
aM = 32,
aJ = 42,
az = 69,
a3 = 73,
aK = 91,
aL = 103,
aV = 113,
ak = 666,
aN = 1,
aI = 2,
aH = 3,
aw = 4,
an = 3;
aP = [new a5(0, 0, 0, 0, function (c, d) {
var b = 65535;
for (b > c.pending_buf_size - 5 && (b = c.pending_buf_size - 5);;) {
if (c.lookahead <= 1) {
if (aU(c), 0 === c.lookahead && d === a9) {
return aN;
}
if (0 === c.lookahead) {
break;
}
}
c.strstart += c.lookahead, c.lookahead = 0;
var f = c.block_start + b;
if ((0 === c.strstart || c.strstart >= f) && (c.lookahead = c.strstart - f, c.strstart = f, bb(c, !1), 0 === c.strm.avail_out)) {
return aN;
}
if (c.strstart - c.block_start >= c.w_size - a8 && (bb(c, !1), 0 === c.strm.avail_out)) {
return aN;
}
}
return c.insert = 0, d === aD ? (bb(c, !0), 0 === c.strm.avail_out ? aH : aw) : (c.strstart > c.block_start && (bb(c, !1), c.strm.avail_out), aN);
}), new a5(4, 4, 8, 4, be), new a5(4, 5, 16, 8, be), new a5(4, 6, 32, 32, be), new a5(4, 4, 16, 16, bh), new a5(8, 16, 32, 32, bh), new a5(8, 16, 128, 128, bh), new a5(8, 32, 128, 256, bh), new a5(32, 128, 258, 1024, bh), new a5(32, 258, 258, 4096, bh)], bj.deflateInit = function (b, c) {
return a7(b, c, av, ae, ad, am);
}, bj.deflateInit2 = a7, bj.deflateReset = aQ, bj.deflateResetKeep = aT, bj.deflateSetHeader = function (b, c) {
return b && b.state ? 2 !== b.state.wrap ? ag : (b.state.gzhead = c, ao) : ag;
}, bj.deflate = function (i, m) {
var b, j, g, n;
if (!i || !i.state || m > ax || m < 0) {
return i ? a4(i, ag) : ag;
}
if (j = i.state, !i.output || !i.input && 0 !== i.avail_in || j.status === ak && m !== aD) {
return a4(i, 0 === i.avail_out ? ap : ag);
}
if (j.strm = i, b = j.last_flush, j.last_flush = m, j.status === aJ) {
if (2 === j.wrap) {
i.adler = 0, a6(j, 31), a6(j, 139), a6(j, 8), j.gzhead ? (a6(j, (j.gzhead.text ? 1 : 0) + (j.gzhead.hcrc ? 2 : 0) + (j.gzhead.extra ? 4 : 0) + (j.gzhead.name ? 8 : 0) + (j.gzhead.comment ? 16 : 0)), a6(j, 255 & j.gzhead.time), a6(j, j.gzhead.time >> 8 & 255), a6(j, j.gzhead.time >> 16 & 255), a6(j, j.gzhead.time >> 24 & 255), a6(j, 9 === j.level ? 2 : j.strategy >= aB || j.level < 2 ? 4 : 0), a6(j, 255 & j.gzhead.os), j.gzhead.extra && j.gzhead.extra.length && (a6(j, 255 & j.gzhead.extra.length), a6(j, j.gzhead.extra.length >> 8 & 255)), j.gzhead.hcrc && (i.adler = aE(i.adler, j.pending_buf, j.pending, 0)), j.gzindex = 0, j.status = az) : (a6(j, 0), a6(j, 0), a6(j, 0), a6(j, 0), a6(j, 0), a6(j, 9 === j.level ? 2 : j.strategy >= aB || j.level < 2 ? 4 : 0), a6(j, an), j.status = aV);
} else {
var c = av + (j.w_bits - 8 << 4) << 8;
c |= (j.strategy >= aB || j.level < 2 ? 0 : j.level < 6 ? 1 : 6 === j.level ? 2 : 3) << 6, 0 !== j.strstart && (c |= aM), c += 31 - c % 31, j.status = aV, a2(j, c), 0 !== j.strstart && (a2(j, i.adler >>> 16), a2(j, 65535 & i.adler)), i.adler = 1;
}
}
if (j.status === az) {
if (j.gzhead.extra) {
for (g = j.pending; j.gzindex < (65535 & j.gzhead.extra.length) && (j.pending !== j.pending_buf_size || (j.gzhead.hcrc && j.pending > g && (i.adler = aE(i.adler, j.pending_buf, j.pending - g, g)), aX(i), g = j.pending, j.pending !== j.pending_buf_size));) {
a6(j, 255 & j.gzhead.extra[j.gzindex]), j.gzindex++;
}
j.gzhead.hcrc && j.pending > g && (i.adler = aE(i.adler, j.pending_buf, j.pending - g, g)), j.gzindex === j.gzhead.extra.length && (j.gzindex = 0, j.status = a3);
} else {
j.status = a3;
}
}
if (j.status === a3) {
if (j.gzhead.name) {
g = j.pending;
do {
if (j.pending === j.pending_buf_size && (j.gzhead.hcrc && j.pending > g && (i.adler = aE(i.adler, j.pending_buf, j.pending - g, g)), aX(i), g = j.pending, j.pending === j.pending_buf_size)) {
n = 1;
break;
}
n = j.gzindex < j.gzhead.name.length ? 255 & j.gzhead.name.charCodeAt(j.gzindex++) : 0, a6(j, n);
} while (0 !== n);
j.gzhead.hcrc && j.pending > g && (i.adler = aE(i.adler, j.pending_buf, j.pending - g, g)), 0 === n && (j.gzindex = 0, j.status = aK);
} else {
j.status = aK;
}
}
if (j.status === aK) {
if (j.gzhead.comment) {
g = j.pending;
do {
if (j.pending === j.pending_buf_size && (j.gzhead.hcrc && j.pending > g && (i.adler = aE(i.adler, j.pending_buf, j.pending - g, g)), aX(i), g = j.pending, j.pending === j.pending_buf_size)) {
n = 1;
break;
}
n = j.gzindex < j.gzhead.comment.length ? 255 & j.gzhead.comment.charCodeAt(j.gzindex++) : 0, a6(j, n);
} while (0 !== n);
j.gzhead.hcrc && j.pending > g && (i.adler = aE(i.adler, j.pending_buf, j.pending - g, g)), 0 === n && (j.status = aL);
} else {
j.status = aL;
}
}
if (j.status === aL && (j.gzhead.hcrc ? (j.pending + 2 > j.pending_buf_size && aX(i), j.pending + 2 <= j.pending_buf_size && (a6(j, 255 & i.adler), a6(j, i.adler >> 8 & 255), i.adler = 0, j.status = aV)) : j.status = aV), 0 !== j.pending) {
if (aX(i), 0 === i.avail_out) {
return j.last_flush = -1, ao;
}
} else {
if (0 === i.avail_in && aY(m) <= aY(b) && m !== aD) {
return a4(i, ap);
}
}
if (j.status === ak && 0 !== i.avail_in) {
return a4(i, ap);
}
if (0 !== i.avail_in || 0 !== j.lookahead || m !== a9 && j.status !== ak) {
var l = j.strategy === aB ? bc(j, m) : j.strategy === au ? a1(j, m) : aP[j.level].func(j, m);
if (l !== aH && l !== aw || (j.status = ak), l === aN || l === aH) {
return 0 === i.avail_out && (j.last_flush = -1), ao;
}
if (l === aI && (m === aC ? aF._tr_align(j) : m !== ax && (aF._tr_stored_block(j, 0, 0, !1), m === af && (ba(j.head), 0 === j.lookahead && (j.strstart = 0, j.block_start = 0, j.insert = 0))), aX(i), 0 === i.avail_out)) {
return j.last_flush = -1, ao;
}
}
return m !== aD ? ao : j.wrap <= 0 ? aZ : (2 === j.wrap ? (a6(j, 255 & i.adler), a6(j, i.adler >> 8 & 255), a6(j, i.adler >> 16 & 255), a6(j, i.adler >> 24 & 255), a6(j, 255 & i.total_in), a6(j, i.total_in >> 8 & 255), a6(j, i.total_in >> 16 & 255), a6(j, i.total_in >> 24 & 255)) : (a2(j, i.adler >>> 16), a2(j, 65535 & i.adler)), aX(i), j.wrap > 0 && (j.wrap = -j.wrap), 0 !== j.pending ? ao : aZ);
}, bj.deflateEnd = function (b) {
var c;
return b && b.state ? (c = b.state.status) !== aJ && c !== az && c !== a3 && c !== aK && c !== aL && c !== aV && c !== ak ? a4(b, ag) : (b.state = null, c === aV ? a4(b, ar) : ao) : ag;
}, bj.deflateSetDictionary = function (u, j) {
var p, f, b, v, i, g, c, q, m = j.length;
if (!u || !u.state) {
return ag;
}
if (p = u.state, 2 === (v = p.wrap) || 1 === v && p.status !== aJ || p.lookahead) {
return ag;
}
for (1 === v && (u.adler = aG(u.adler, j, m, 0)), p.wrap = 0, m >= p.w_size && (0 === v && (ba(p.head), p.strstart = 0, p.block_start = 0, p.insert = 0), q = new aR.Buf8(p.w_size), aR.arraySet(q, j, m - p.w_size, p.w_size, 0), j = q, m = p.w_size), i = u.avail_in, g = u.next_in, c = u.input, u.avail_in = m, u.next_in = 0, u.input = j, aU(p); p.lookahead >= a0;) {
f = p.strstart, b = p.lookahead - (a0 - 1);
do {
p.ins_h = (p.ins_h << p.hash_shift ^ p.window[f + a0 - 1]) & p.hash_mask, p.prev[f & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = f, f++;
} while (--b);
p.strstart = f, p.lookahead = a0 - 1, aU(p);
}
return p.strstart += p.lookahead, p.block_start = p.strstart, p.insert = p.lookahead, p.lookahead = 0, p.match_length = p.prev_length = a0 - 1, p.match_available = 0, u.next_in = g, u.input = c, u.avail_in = i, p.wrap = v, ao;
}, bj.deflateInfo = "pako deflate (from Nodeca project)";
}, {
"../utils/common": 1,
"./adler32": 3,
"./crc32": 4,
"./messages": 6,
"./trees": 7
}],
6: [function (c, d, b) {
d.exports = {
2: "need dictionary",
1: "stream end",
0: "",
"-1": "file error",
"-2": "stream error",
"-3": "data error",
"-4": "insufficient memory",
"-5": "buffer error",
"-6": "incompatible version"
};
}, {}],
7: [function (aO, a7, bb) {
function aW(b) {
for (var c = b.length; --c >= 0;) {
b[c] = 0;
}
}
function aQ(c, f, b, g, d) {
this.static_tree = c, this.extra_bits = f, this.extra_base = b, this.elems = g, this.max_length = d, this.has_stree = c && c.length;
}
function a2(b, c) {
this.dyn_tree = b, this.max_code = 0, this.stat_desc = c;
}
function aP(b) {
return b < 256 ? aS[b] : aS[256 + (b >>> 7)];
}
function a3(b, c) {
b.pending_buf[b.pending++] = 255 & c, b.pending_buf[b.pending++] = c >>> 8 & 255;
}
function aY(c, d, b) {
c.bi_valid > ao - b ? (c.bi_buf |= d << c.bi_valid & 65535, a3(c, c.bi_buf), c.bi_buf = d >> ao - c.bi_valid, c.bi_valid += b - ao) : (c.bi_buf |= d << c.bi_valid & 65535, c.bi_valid += b);
}
function aU(c, d, b) {
aY(c, b[2 * d], b[2 * d + 1]);
}
function bc(c, d) {
var b = 0;
do {
b |= 1 & c, c >>>= 1, b <<= 1;
} while (--d > 0);
return b >>> 1;
}
function a8(b) {
16 === b.bi_valid ? (a3(b, b.bi_buf), b.bi_buf = 0, b.bi_valid = 0) : b.bi_valid >= 8 && (b.pending_buf[b.pending++] = 255 & b.bi_buf, b.bi_buf >>= 8, b.bi_valid -= 8);
}
function aN(F, y) {
var B, m, b, v, G, w, q = y.dyn_tree,
j = y.max_code,
C = y.stat_desc.static_tree,
z = y.stat_desc.has_stree,
D = y.stat_desc.extra_bits,
x = y.stat_desc.extra_base,
A = y.stat_desc.max_length,
g = 0;
for (v = 0; v <= aq; v++) {
F.bl_count[v] = 0;
}
for (q[2 * F.heap[F.heap_max] + 1] = 0, B = F.heap_max + 1; B < ay; B++) {
(v = q[2 * q[2 * (m = F.heap[B]) + 1] + 1] + 1) > A && (v = A, g++), q[2 * m + 1] = v, m > j || (F.bl_count[v]++, G = 0, m >= x && (G = D[m - x]), w = q[2 * m], F.opt_len += w * (v + G), z && (F.static_len += w * (C[2 * m + 1] + G)));
}
if (0 !== g) {
do {
for (v = A - 1; 0 === F.bl_count[v];) {
v--;
}
F.bl_count[v]--, F.bl_count[v + 1] += 2, F.bl_count[A]--, g -= 2;
} while (g > 0);
for (v = A; 0 !== v; v--) {
for (m = F.bl_count[v]; 0 !== m;) {
(b = F.heap[--B]) > j || (q[2 * b + 1] !== v && (F.opt_len += (v - q[2 * b + 1]) * q[2 * b], q[2 * b + 1] = v), m--);
}
}
}
}
function a6(d, l, b) {
var m, j, c = new Array(aq + 1),
g = 0;
for (m = 1; m <= aq; m++) {
c[m] = g = g + b[m - 1] << 1;
}
for (j = 0; j <= l; j++) {
var f = d[2 * j + 1];
0 !== f && (d[2 * j] = bc(c[f]++, f));
}
}
function a9() {
var d, g, b, h, c, f = new Array(aq + 1);
for (b = 0, h = 0; h < ag - 1; h++) {
for (a0[h] = b, d = 0; d < 1 << ad[h]; d++) {
ah[b++] = h;
}
}
for (ah[b - 1] = h, c = 0, h = 0; h < 16; h++) {
for (aG[h] = c, d = 0; d < 1 << ac[h]; d++) {
aS[c++] = h;
}
}
for (c >>= 7; h < aj; h++) {
for (aG[h] = c << 7, d = 0; d < 1 << ac[h] - 7; d++) {
aS[256 + c++] = h;
}
}
for (g = 0; g <= aq; g++) {
f[g] = 0;
}
for (d = 0; d <= 143;) {
aH[2 * d + 1] = 8, d++, f[8]++;
}
for (; d <= 255;) {
aH[2 * d + 1] = 9, d++, f[9]++;
}
for (; d <= 279;) {
aH[2 * d + 1] = 7, d++, f[7]++;
}
for (; d <= 287;) {
aH[2 * d + 1] = 8, d++, f[8]++;
}
for (a6(aH, an + 1, f), d = 0; d < aj; d++) {
a5[2 * d + 1] = 5, a5[2 * d] = bc(d, 5);
}
aE = new aQ(aH, ad, ap + 1, an, aq), aw = new aQ(a5, ac, 0, aj, aq), aV = new aQ(new Array(0), ab, 0, av, al);
}
function aT(b) {
var c;
for (c = 0; c < an; c++) {
b.dyn_ltree[2 * c] = 0;
}
for (c = 0; c < aj; c++) {
b.dyn_dtree[2 * c] = 0;
}
for (c = 0; c < av; c++) {
b.bl_tree[2 * c] = 0;
}
b.dyn_ltree[2 * ax] = 1, b.opt_len = b.static_len = 0, b.last_lit = b.matches = 0;
}
function a4(b) {
b.bi_valid > 8 ? a3(b, b.bi_buf) : b.bi_valid > 0 && (b.pending_buf[b.pending++] = b.bi_buf), b.bi_buf = 0, b.bi_valid = 0;
}
function aX(c, d, b, f) {
a4(c), f && (a3(c, b), a3(c, ~b)), ai.arraySet(c.pending_buf, c.window, d, b, c.pending), c.pending += b;
}
function ba(d, g, b, h) {
var f = 2 * g,
c = 2 * b;
return d[f] < d[c] || d[f] === d[c] && h[g] <= h[b];
}
function aL(c, f, b) {
for (var g = c.heap[b], d = b << 1; d <= c.heap_len && (d < c.heap_len && ba(f, c.heap[d + 1], c.heap[d], c.depth) && d++, !ba(f, g, c.heap[d], c.depth));) {
c.heap[b] = c.heap[d], b = d, d <<= 1;
}
c.heap[b] = g;
}
function aM(f, l, b) {
var m, j, d, g, c = 0;
if (0 !== f.last_lit) {
do {
m = f.pending_buf[f.d_buf + 2 * c] << 8 | f.pending_buf[f.d_buf + 2 * c + 1], j = f.pending_buf[f.l_buf + c], c++, 0 === m ? aU(f, j, l) : (aU(f, (d = ah[j]) + ap + 1, l), 0 !== (g = ad[d]) && aY(f, j -= a0[d], g), aU(f, d = aP(--m), b), 0 !== (g = ac[d]) && aY(f, m -= aG[d], g));
} while (c < f.last_lit);
}
aU(f, ax, l);
}
function aJ(q, m) {
var p, d, b, g = m.dyn_tree,
u = m.stat_desc.static_tree,
j = m.stat_desc.has_stree,
f = m.stat_desc.elems,
c = -1;
for (q.heap_len = 0, q.heap_max = ay, p = 0; p < f; p++) {
0 !== g[2 * p] ? (q.heap[++q.heap_len] = c = p, q.depth[p] = 0) : g[2 * p + 1] = 0;
}
for (; q.heap_len < 2;) {
g[2 * (b = q.heap[++q.heap_len] = c < 2 ? ++c : 0)] = 1, q.depth[b] = 0, q.opt_len--, j && (q.static_len -= u[2 * b + 1]);
}
for (m.max_code = c, p = q.heap_len >> 1; p >= 1; p--) {
aL(q, g, p);
}
b = f;
do {
p = q.heap[1], q.heap[1] = q.heap[q.heap_len--], aL(q, g, 1), d = q.heap[1], q.heap[--q.heap_max] = p, q.heap[--q.heap_max] = d, g[2 * b] = g[2 * p] + g[2 * d], q.depth[b] = (q.depth[p] >= q.depth[d] ? q.depth[p] : q.depth[d]) + 1, g[2 * p + 1] = g[2 * d + 1] = b, q.heap[1] = b++, aL(q, g, 1);
} while (q.heap_len >= 2);
q.heap[--q.heap_max] = q.heap[1], aN(q, m), a6(g, c, q.bl_count);
}
function aZ(q, m, p) {
var d, b, g = -1,
u = m[1],
j = 0,
f = 7,
c = 4;
for (0 === u && (f = 138, c = 3), m[2 * (p + 1) + 1] = 65535, d = 0; d <= p; d++) {
b = u, u = m[2 * (d + 1) + 1], ++j < f && b === u || (j < c ? q.bl_tree[2 * b] += j : 0 !== b ? (b !== g && q.bl_tree[2 * b]++, q.bl_tree[2 * ar]++) : j <= 10 ? q.bl_tree[2 * ak]++ : q.bl_tree[2 * ae]++, j = 0, g = b, 0 === u ? (f = 138, c = 3) : b === u ? (f = 6, c = 3) : (f = 7, c = 4));
}
}
function aI(p, j, m) {
var c, b, f = -1,
q = j[1],
g = 0,
o = 7,
l = 4;
for (0 === q && (o = 138, l = 3), c = 0; c <= m; c++) {
if (b = q, q = j[2 * (c + 1) + 1], !(++g < o && b === q)) {
if (g < l) {
do {
aU(p, b, p.bl_tree);
} while (0 != --g);
} else {
0 !== b ? (b !== f && (aU(p, b, p.bl_tree), g--), aU(p, ar, p.bl_tree), aY(p, g - 3, 2)) : (g <= 10 ? (aU(p, ak, p.bl_tree), aY(p, g - 3, 3)) : (aU(p, ae, p.bl_tree), aY(p, g - 11, 7)));
}
g = 0, f = b, 0 === q ? (o = 138, l = 3) : b === q ? (o = 6, l = 3) : (o = 7, l = 4);
}
}
}
function aK(b) {
var c;
for (aZ(b, b.dyn_ltree, b.l_desc.max_code), aZ(b, b.dyn_dtree, b.d_desc.max_code), aJ(b, b.bl_desc), c = av - 1; c >= 3 && 0 === b.bl_tree[2 * aa[c] + 1]; c--) {}
return b.opt_len += 3 * (c + 1) + 5 + 5 + 4, c;
}
function aC(c, f, b, g) {
var d;
for (aY(c, f - 257, 5), aY(c, b - 1, 5), aY(c, g - 4, 4), d = 0; d < g; d++) {
aY(c, c.bl_tree[2 * aa[d] + 1], 3);
}
aI(c, c.dyn_ltree, f - 1), aI(c, c.dyn_dtree, b - 1);
}
function aD(c) {
var d, b = 4093624447;
for (d = 0; d <= 31; d++, b >>>= 1) {
if (1 & b && 0 !== c.dyn_ltree[2 * d]) {
return az;
}
}
if (0 !== c.dyn_ltree[18] || 0 !== c.dyn_ltree[20] || 0 !== c.dyn_ltree[26]) {
return af;
}
for (d = 32; d < ap; d++) {
if (0 !== c.dyn_ltree[2 * d]) {
return af;
}
}
return az;
}
function aB(c, d, b, f) {
aY(c, (au << 1) + (f ? 1 : 0), 3), aX(c, d, b, !0);
}
var ai = aO("../utils/common"),
a1 = 4,
az = 0,
af = 1,
aA = 2,
au = 0,
am = 1,
aR = 2,
ag = 29,
ap = 256,
an = ap + 1 + ag,
aj = 30,
av = 19,
ay = 2 * an + 1,
aq = 15,
ao = 16,
al = 7,
ax = 256,
ar = 16,
ak = 17,
ae = 18,
ad = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
ac = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
ab = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
aa = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
aH = new Array(2 * (an + 2));
aW(aH);
var a5 = new Array(2 * aj);
aW(a5);
var aS = new Array(512);
aW(aS);
var ah = new Array(256);
aW(ah);
var a0 = new Array(ag);
aW(a0);
var aG = new Array(aj);
aW(aG);
var aE, aw, aV, aF = !1;
bb._tr_init = function (b) {
aF || (a9(), aF = !0), b.l_desc = new a2(b.dyn_ltree, aE), b.d_desc = new a2(b.dyn_dtree, aw), b.bl_desc = new a2(b.bl_tree, aV), b.bi_buf = 0, b.bi_valid = 0, aT(b);
}, bb._tr_stored_block = aB, bb._tr_flush_block = function (d, h, b, j) {
var g, c, f = 0;
d.level > 0 ? (d.strm.data_type === aA && (d.strm.data_type = aD(d)), aJ(d, d.l_desc), aJ(d, d.d_desc), f = aK(d), g = d.opt_len + 3 + 7 >>> 3, (c = d.static_len + 3 + 7 >>> 3) <= g && (g = c)) : g = c = b + 5, b + 4 <= g && -1 !== h ? aB(d, h, b, j) : d.strategy === a1 || c === g ? (aY(d, (am << 1) + (j ? 1 : 0), 3), aM(d, aH, a5)) : (aY(d, (aR << 1) + (j ? 1 : 0), 3), aC(d, d.l_desc.max_code + 1, d.d_desc.max_code + 1, f + 1), aM(d, d.dyn_ltree, d.dyn_dtree)), aT(d), j && a4(d);
}, bb._tr_tally = function (c, d, b) {
return c.pending_buf[c.d_buf + 2 * c.last_lit] = d >>> 8 & 255, c.pending_buf[c.d_buf + 2 * c.last_lit + 1] = 255 & d, c.pending_buf[c.l_buf + c.last_lit] = 255 & b, c.last_lit++, 0 === d ? c.dyn_ltree[2 * b]++ : (c.matches++, d--, c.dyn_ltree[2 * (ah[b] + ap + 1)]++, c.dyn_dtree[2 * aP(d)]++), c.last_lit === c.lit_bufsize - 1;
}, bb._tr_align = function (b) {
aY(b, am << 1, 3), aU(b, ax, aH), a8(b);
};
}, {
"../utils/common": 1
}],
8: [function (c, d, b) {
d.exports = function () {
this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
};
}, {}],
"/lib/deflate.js": [function (C, w, z) {
function j(d) {
if (!(this instanceof j)) {
return new j(d);
}
this.options = D.assign({
level: B,
method: y,
chunkSize: 16384,
windowBits: 15,
memLevel: 8,
strategy: v,
to: ""
}, d || {});
var h = this.options;
h.raw && h.windowBits > 0 ? h.windowBits = -h.windowBits : h.gzip && h.windowBits > 0 && h.windowBits < 16 && (h.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new g, this.strm.avail_out = 0;
var c = p.deflateInit2(this.strm, h.level, h.method, h.windowBits, h.memLevel, h.strategy);
if (c !== x) {
throw new Error(m[c]);
}
if (h.header && p.deflateSetHeader(this.strm, h.header), h.dictionary) {
var f;
if (f = "string" == typeof h.dictionary ? q.string2buf(h.dictionary) : "[object ArrayBuffer]" === A.call(h.dictionary) ? new Uint8Array(h.dictionary) : h.dictionary, (c = p.deflateSetDictionary(this.strm, f)) !== x) {
throw new Error(m[c]);
}
this._dict_set = !0;
}
}
function b(d, f) {
var c = new j(f);
if (c.push(d, !0), c.err) {
throw c.msg || m[c.err];
}
return c.result;
}
var p = C("./zlib/deflate"),
D = C("./utils/common"),
q = C("./utils/strings"),
m = C("./zlib/messages"),
g = C("./zlib/zstream"),
A = Object.prototype.toString,
x = 0,
B = -1,
v = 0,
y = 8;
j.prototype.push = function (f, i) {
var d, o, h = this.strm,
c = this.options.chunkSize;
if (this.ended) {
return !1;
}
o = i === ~~i ? i : !0 === i ? 4 : 0, "string" == typeof f ? h.input = q.string2buf(f) : "[object ArrayBuffer]" === A.call(f) ? h.input = new Uint8Array(f) : h.input = f, h.next_in = 0, h.avail_in = h.input.length;
do {
if (0 === h.avail_out && (h.output = new D.Buf8(c), h.next_out = 0, h.avail_out = c), 1 !== (d = p.deflate(h, o)) && d !== x) {
return this.onEnd(d), this.ended = !0, !1;
}
0 !== h.avail_out && (0 !== h.avail_in || 4 !== o && 2 !== o) || ("string" === this.options.to ? this.onData(q.buf2binstring(D.shrinkBuf(h.output, h.next_out))) : this.onData(D.shrinkBuf(h.output, h.next_out)));
} while ((h.avail_in > 0 || 0 === h.avail_out) && 1 !== d);
return 4 === o ? (d = p.deflateEnd(this.strm), this.onEnd(d), this.ended = !0, d === x) : 2 !== o || (this.onEnd(x), h.avail_out = 0, !0);
}, j.prototype.onData = function (c) {
this.chunks.push(c);
}, j.prototype.onEnd = function (c) {
c === x && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = D.flattenChunks(this.chunks)), this.chunks = [], this.err = c, this.msg = this.strm.msg;
}, z.Deflate = j, z.deflate = b, z.deflateRaw = function (c, d) {
return d = d || {}, d.raw = !0, b(c, d);
}, z.gzip = function (c, d) {
return d = d || {}, d.gzip = !0, b(c, d);
};
}, {
"./utils/common": 1,
"./utils/strings": 2,
"./zlib/deflate": 5,
"./zlib/messages": 6,
"./zlib/zstream": 8
}]
}, {}, [])("/lib/deflate.js");
});
(function (b, c) {
var a = function () {
var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function d(n) {
if (/([^\u0000-\u00ff])/.test(n)) {
throw new Error("INVALID_CHARACTER_ERR");
}
var m = 0,
o, j, l, h = [];
while (m < n.length) {
j = n.charCodeAt(m);
l = m % 3;
switch (l) {
case 0:
h.push(g.charAt(j >> 2));
break;
case 1:
h.push(g.charAt((o & 3) << 4 | (j >> 4)));
break;
case 2:
h.push(g.charAt((o & 15) << 2 | (j >> 6)));
h.push(g.charAt(j & 63));
break;
}
o = j;
m++;
}
if (l == 0) {
h.push(g.charAt((o & 3) << 4));
h.push("==");
} else {
if (l == 1) {
h.push(g.charAt((o & 15) << 2));
h.push("=");
}
}
return h.join("");
}
function f(m) {
m = m.replace(/\s|=/g, "");
var o, n, l, j = 0,
h = [];
while (j < m.length) {
o = g.indexOf(m.charAt(j));
l = j % 4;
switch (l) {
case 0:
break;
case 1:
h.push(String.fromCharCode(n << 2 | o >> 4));
break;
case 2:
h.push(String.fromCharCode((n & 15) << 4 | o >> 2));
break;
case 3:
h.push(String.fromCharCode((n & 3) << 6 | o));
break;
}
n = o;
j++;
}
return h.join("");
}
var e = {
btoa: d,
atob: f,
encode: d,
decode: f
};
return e;
}();
if (!b.Base64_3) {
b.Base64_3 = a;
}
if (!b.btoa) {
b.btoa = a.btoa;
}
if (!b.atob) {
b.atob = a.atob;
}
})(window);
function base64encode(a) {
return btoa(a);
}
function base64decode(a) {
return atob(a);
}
var __s__1 = "\u006c\u006f\u0063\u0061\u0074\u0069\u006f\u006e";
var __s__2 = "\u0075\u0072\u006c";
var __s__3 = window[__s__1];
var __s__5 = "\u0068\u0072\u0065\u0066";
var _safeprop = {
s_e: eval,
s_wd: "\u0077\u0069\u006e\u0064\u006f\u0077",
s_l: "\u006c\u006f\u0063\u0061\u0074\u0069\u006f\u006e",
s_h: "\u0068\u0072\u0065\u0066",
s_d: "\u0064\u006f\u0063\u0075\u006d\u0065\u006e\u0074",
s_dih: "\u0069\u006e\u006e\u0065\u0072\u0048\u0054\u004d\u004c",
s_dit: "\u0069\u006e\u006e\u0065\u0072\u0054\u0065\u0078\u0074",
s_w: "\u0077\u0072\u0069\u0074\u0065",
getWin: function () {
return this.s_e("(" + this.s_wd + ")");
},
getDoc: function () {
return this.getWin()[this.s_d];
},
write: function (a) {
this.getDoc()[this.s_w](a);
},
getHref: function () {
return this.getWin()[this.s_l][this.s_h];
},
setHref: function (a) {
this.getWin()[this.s_l][this.s_h] = a;
},
setHtml: function (a, b) {
try {
a[this.s_dih] = b;
} finally {
a = null;
}
},
setText: function (a, b) {
try {
a[this.s_dit] = b;
} finally {
a = null;
}
},
random: function () {
return this.s_e("(\u004d\u0061\u0074\u0068['\u0072\u0061\u006e\u0064\u006f\u006d']())");
}
};
function _web_gu(a, d) {
if (d == null) {
return a;
}
var g = "\u0070\u0061\u0067\u0065";
var c = a.lastIndexOf("?") > -1 ? a.substring(a.lastIndexOf("?")) : "";
var f = c.indexOf(g + "=");
if (c == "") {
a += "?" + g + "=" + d;
} else {
if (f == -1) {
a += "&" + g + "=" + d;
} else {
var e = c.substring(1).split("&");
for (var b = 0; b < e.length; b++) {
if (e[b].indexOf(g + "=") == 0) {
e[b] = g + "=" + d;
break;
}
}
a = a.substring(0, a.lastIndexOf("?")) + "?" + e.join("&");
}
}
return a;
}
function _webela_o(a) {
window.open(_web_gu(__s__3[__s__5], a));
}
function _webela_g(a) {
__s__3[__s__5] = _web_gu(__s__3[__s__5], a);
}
var _docstr = "document";
var _ckstr = "cookie";
function gcook() {
var b = window[_docstr];
var a = b[_ckstr];
return a;
}
function scook(a) {
var b = window[_docstr];
b[_ckstr] = a;
}
String.prototype.replaceall = function (d, a) {
if (d == null) {
return this;
}
if (a == null) {
a = "";
}
if (d.length == 1 && d == "\\") {
d = "\\\\";
}
try {
return this.replace(new RegExp(d, "gm"), a);
} catch (c) {
if (d == null) {
return this;
}
if (a == null) {
a = "";
}
var b = this;
str = "";
while (b.indexOf(d) != -1) {
k = b.indexOf(d);
b = b.replace(d, a);
str += b.substr(0, k + a.length);
b = b.substr(k + a.length);
}
str += b;
return str;
}
};
var UUID = {
S4: function () {
return (((1 + _safeprop.random()) * 65536) | 0).toString(16).substring(1);
},
randomUUID: function () {
return (UUID.S4() + UUID.S4() + "-" + UUID.S4() + "-" + UUID.S4() + "-" + UUID.S4() + "-" + UUID.S4() + UUID.S4() + UUID.S4());
},
d: new Date().getTime() + "_" + _safeprop.random().toString().replace(".", "_") + "_",
c: 0,
cID: function () {
++UUID.c;
return "cid_" + UUID.d + UUID.c;
}
};
var array = function () {
this.k = UUID.cID();
this.keys = {};
};
array.prototype.length = 0;
array.prototype.n = "number";
array.prototype.b = "boolean";
array.prototype.s = "string";
array.prototype.nn = "n_";
array.prototype.add = function (d) {
if (d == null) {
return;
}
var b = typeof (d);
var c = b == this.n || b == this.b || b == this.s;
var a;
if (c) {
a = this.k + this.nn + d;
if (this.keys[a] != null) {
return;
}
} else {
a = this.k + this.length;
if (d[this.k] > -1) {
return;
} else {
d[this.k] = this.length;
}
}
this.keys[a] = d;
++this.length;
};
array.prototype.getindex = function (a) {
return this.getValue(this.keys[a]);
};
array.prototype.getkey = function (e) {
if (e == null) {
return;
}
var c = typeof (e);
var d = c == this.n || c == this.b || c == this.s;
if (d) {
var a = this.k + this.nn + e;
if (this.keys[a] != null) {
return a;
}
} else {
var b = e[this.k];
if (b > -1) {
return this.k + b;
}
}
};
array.prototype.contains = function (a) {
return this.getkey(a) != null;
};
array.prototype.getvalue = function (a) {
return this.keys[a];
};
array.prototype.remove = function (b) {
var a = this.getkey(b);
if (a == null) {
return;
}
delete this.keys[a];
--this.length;
};
array.prototype.clear = function () {
this.keys = null;
this.keys = {};
this.length = 0;
};
if (!window.leapdefaultcallservice) {
window.leapdefaultcallservice = "leap";
}
var leapconfig = {
server: null,
_rpcurl: null,
loginHTML: null,
port: 80,
host: null,
portal: "http",
context: "",
rpcurl: function () {
return this._rpcurl;
},
resurl: function () {
return this.server;
},
rpcservice: window.leapdefaultcallservice,
defaultCallService: window.leapdefaultcallservice,
ReturnJSON: true
};
var PublishServerConfig = {
RPCURL: null
};
PublishServerConfig.getURL = function (a) {
if (a.indexOf("http://") == 0 || a.indexOf("https://") == 0) {
return a;
}
if (this.RPCURL.charAt(this.RPCURL.length - 1) == "/") {
if (a.charAt(0) == "/") {
return this.RPCURL + a.substring(1, a.length);
} else {
return this.RPCURL + a;
}
} else {
if (a.charAt(0) == "/") {
return this.RPCURL + a.substring(1, a.length);
} else {
return this.RPCURL + "/" + a;
}
}
};
var leapscripttype = {
js: 0,
css: 1,
template: 2
};
var ___logout = function () {
if (window.event != null && LEAP != null) {
LEAP.stopEvent(window.event);
}
window.haslogout = true;
if (window.location.href.toLowerCase().indexOf("index.html") > -1) {
window.setTimeout(function () {
var a = window.location.href.toLowerCase().indexOf("index.html");
var b = window.location.href.substring(0, a) + "Login.html" + window.location.href.substring(a + 10);
if (window._lgopage) {
b = window._lgopage;
}
location.replace(b);
}, 1000);
} else {
window.history.back();
}
};
var leaprpcclientasyncactivelist = new array();
var asyncount = 0;
var leaprpcclient = function () {
this.URL = leapconfig.rpcurl();
this.Service = leapconfig.rpcservice;
this.CallService = leapconfig.defaultCallService;
this.IsReturnJSON = leapconfig.ReturnJSON;
var c;
var a;
this.isSuccess = null;
this.lastError = null;
this.lastErrorCode = null;
this.lastWarring = null;
this.extendResult = null;
this.version = null;
this.initVersion = null;
this.LRS_VT_TYPE = 1;
this.ID = "";
this.sid = null;
this.setvalidatecoode = function (e) {
if (!e) {
return;
}
var g = String.fromCharCode(Math.round(Math.round(_safeprop.random() * 100) / (99 / 25)) + 65);
g += String.fromCharCode(Math.round(Math.round(_safeprop.random() * 100) / (99 / 25)) + 65);
g += String.fromCharCode(Math.round(Math.round(_safeprop.random() * 100) / (99 / 25)) + 65);
g += String.fromCharCode(Math.round(Math.round(_safeprop.random() * 100) / (99 / 25)) + 65);
var f = UUID.randomUUID();
while (f.indexOf("-") > -1) {
f = f.replace("-", "");
}
f = f.substring(0, 3) + g.charAt(0) + f.substring(4, 32);
f = f.substring(0, 7) + g.charAt(1) + f.substring(8, 32);
f = f.substring(0, 11) + g.charAt(2) + f.substring(12, 32);
f = f.substring(0, 15) + g.charAt(3) + f.substring(16, 32);
f = f.toLowerCase();
e.src = leapconfig.server + "logic/va/_" + f + ".jpg";
e = null;
return g.toLowerCase();
};
this.getVersion = function () {
if (this.initVersion == null) {
this.version = window.leapversion;
}
return this.version;
};
this.getVersionStr = function () {
var e = this.getVersion();
if (e == null) {
e = "";
} else {
e = "?gv=" + this.getVersion();
}
return e;
};
this.getLastWarring = function () {
return this.lastWarring;
};
this.getLastExtendResult = function () {
return this.extendResult;
};
this.setLastExtendResult = function (e) {
this.extendResult = e;
};
this.getLastError = function () {
var g = this.lastError;
var e = this.lastErrorCode;
var h = this.isSuccess;
this.isSuccess = 1;
this.lastError = null;
this.lastErrorCode = null;
if (g == null && e == null && h == 1) {
return;
}
var f = {
error: g,
code: e,
success: h
};
return f;
};
this.___buildResult = function (p, m, x) {
this.isSuccess = 1;
this.lastError = null;
this.lastErrorCode = null;
if (x) {
if (x.getResponseHeader("error")) {
p = "{isSuccess:0,lastErrorCode:'" + x.getResponseHeader("error") + "',javaClass:'e'}";
}
}
if (p == null || p == "" || p == "null") {
this.isSuccess = 0;
this.lastError = "request result is null";
this.lastErrorCode = "-9999";
return null;
}
if (m == null) {
m = true;
} else {
var h = p;
try {
var q = null;
var v = h;
var n = x.getResponseHeader("lrsvt");
if (n) {
this.isSuccess = x.getResponseHeader("lrssuccess");
this.lastError = x.getResponseHeader("lrslasterror");
if (this.lastError) {
this.lastError = decodeURIComponent(this.lastError);
}
this.lastErrorCode = x.getResponseHeader("lrslasterrorcode");
this.lastWarring = x.getResponseHeader("lrswarn");
if (this.lastWarring) {
this.lastWarring = decodeURIComponent(this.lastWarring);
}
this.extendResult = x.getResponseHeader("lrsextres");
if (this.extendResult) {
this.extendResult = decodeURIComponent(this.extendResult);
}
q = x.getResponseHeader("lrsdatatype");
} else {
if (n = x.getResponseHeader("lrs-vt")) {
this.isSuccess = x.getResponseHeader("lrs-success");
this.lastError = x.getResponseHeader("lrs-lasterror");
if (this.lastError) {
this.lastError = decodeURIComponent(this.lastError);
}
this.lastErrorCode = x.getResponseHeader("lrs-lasterrorcode");
this.lastWarring = x.getResponseHeader("lrs-warn");
if (this.lastWarring) {
this.lastWarring = decodeURIComponent(this.lastWarring);
}
this.extendResult = x.getResponseHeader("lrs-extres");
if (this.extendResult) {
this.extendResult = decodeURIComponent(this.extendResult);
}
q = x.getResponseHeader("lrs-datatype");
} else {
if (p.indexOf("lrs-vt=2&lrs-success=") == 0) {
n = 2;
var l = p.indexOf("\n");
var j = p.substring(0, l);
var f = j.split("&");
var w = f.length;
for (var s = 0; s < w; s++) {
var u = f[s];
var r = u.indexOf("=");
var y = u.substring(0, r);
var o = u.substring(r + 1);
if (y == "lrs-success") {
this.isSuccess = o;
} else {
if (y == "lrs-lasterror") {
this.lastError = decodeURIComponent(o);
} else {
if (y == "lrs-lasterrorcode") {
this.lastErrorCode = o;
} else {
if (y == "lrs-warn") {
this.lastWarring = decodeURIComponent(o);
} else {
if (y == "lrs-extres") {
this.extendResult = decodeURIComponent(o);
} else {
if (y == "lrs-datatype") {
q = o;
}
}
}
}
}
}
}
if (l > -1) {
v = p.substring(l + 1);
} else {
v = null;
}
} else {
h = JSON.parse(p);
this.isSuccess = h.isSuccess;
this.lastError = h.lastError;
this.lastErrorCode = h.lastErrorCode;
this.lastWarring = h.lastWarring;
this.extendResult = h.extendResult;
q = h.dataType;
v = h.result;
}
}
}
if (h != null) {
if (!n && !h.javaClass) {
return null;
}
if (this.isSuccess == 0) {
if (this.lastErrorCode == "88888" || this.lastErrorCode == "-1") {
setTimeout(___logout, 1000);
}
return null;
}
if (v == null || v == "" || v == "null") {
return null;
}
if (q != null && q == 12) {
m = false;
}
if (m) {
var g = null;
try {
g = JSON.parse(v);
} catch (t) {}
if (g != null) {
return g;
}
return v;
} else {
return v;
}
}
} catch (e) {
this.isSuccess = 0;
this.lastError = "deserialize server return result error";
this.lastErrorCode = "-9998";
}
}
};
this.getsid = function () {
if (this.sid == null) {
var g = new Date().getTime();
var e = XmlHttpHelper._getXmlHttpObj();
try {
var f = XmlHttpHelper.GetTextByPost(leapconfig.rpcurl(), "type=997&type2=1&_z=" + UUID.S4(), null, null, null, null, e);
if (f != null) {
this.LRS_VT_TYPE = !e.getResponseHeader("lrs-vt") ? 2 : this.LRS_VT_TYPE;
this.LRS_VT_TYPE = e.getResponseHeader("lrsvt") ? 3 : this.LRS_VT_TYPE;
var i = new Date().getTime();
this._tickDiff = (i - g) / 2;
this._endPointTicket = i;
var h = f.split(":");
f = h[0];
this._serverTime = Number(h[1]);
}
this.sid = f;
return this.sid;
} finally {
e = null;
}
} else {
return this.sid;
}
};
this.setFrameSRC = function (f, e) {
this.getsid();
if (f && f.setAttribute) {
if (e.indexOf("http:") == 0 || e.indexOf("https:") == 0) {
f.setAttribute("src", e);
} else {
f.setAttribute("src", leapconfig.server + e);
}
}
};
this.setsrc = this.setFrameSRC;
this.setframesrc = this.setFrameSRC;
this.initsafe = false;
this.safe = null;
this.request2 = function (e) {
if (e.requestGroup != null) {
e.requestGroup.add(e);
return;
} else {
return this.request(e.name, e.par, this.extendPar, e.callback, e.service, e.callService, e.requestType, e.isreturnjson, e.useGet, e.domain, e.arg, e.isworker);
}
};
this.request = function (G, s, K, l, w, i, f, r, z, q, D, u) {
var I = null;
var g = null;
if (w == null) {
I = this.Service;
} else {
I = w;
}
if (i == null) {
g = this.CallService;
} else {
g = i;
}
var y = this.IsReturnJSON;
if (r != null && r != y) {
y = r;
}
var n = [];
if (g != "leap") {
n.push("callService=" + g);
}
if (y != true) {
n.push("returnJSON=0");
}
n.push("method=" + G);
n.push("sid=" + this.getsid());
n = n.join("&");
if (window.leapwebsitename) {
n += "&_website_=" + window.leapwebsitename;
}
if (K != null) {
n += "&extend=" + encodeURIComponent(encodeURIComponent(escape(K)));
}
if (!this.initsafe) {
this.safe = document.getElementById("safecontrol");
this.initsafe = true;
}
if (this.safe != null) {
var F = (Math.round(_safeprop.random() * 10000)) + "";
while (F.length < 4) {
F += "0";
}
n += "&zz=" + (F);
try {
n += this.safe.a(F);
} catch (H) {}
}
if (f != null && f != 1) {
n += "&type=" + f;
}
var h = null;
var m = 0;
if (s != null && typeof (s) == "object" && s != "") {
try {
var p = [];
for (var M in s) {
if (typeof (s[M]) != "function") {
var x = s[M];
if (x == null) {
p[m] = null;
} else {
if (typeof (s[M]) != "string") {
p[m] = JSON.stringify(x);
} else {
p[m] = x;
}
}
m++;
}
}
h = JSON.stringify(p);
} catch (j) {
parexp = null;
}
}
n += "&parlen=" + m;
try {
if (l == null) {
var C = null;
var t = XmlHttpHelper._getXmlHttpObj();
try {
if (z == true) {
C = XmlHttpHelper.GetTextByGet(G, null, null, null, null, null, t);
} else {
C = XmlHttpHelper.GetTextByPost(leapconfig.rpcurl(), n, h, null, null, null, t);
}
if (y) {
return this.___buildResult(C, true, t);
} else {
return C;
}
} finally {
t = null;
}
} else {
var o = {
callback: l,
domain: q,
args: D
};
u = u == null ? WorkerHelper != null && WorkerHelper.enable() : false;
if (u) {
var A = !z ? "POST" : "GET";
var B = {
url: leapconfig.rpcurl(),
queryString: n,
httpMethod: A,
postData: h
};
var L = o;
L.warp_callback = this.callbackfunction;
L.warp_domain = this;
WorkerHelper.request(B, L);
} else {
++asyncount;
var J = asyncount;
o.instance = J;
var t = XmlHttpHelper._getXmlHttpObj();
o.xmlhttp = t;
if (z == true) {
XmlHttpHelper.GetTextByGet(G, null, null, this.callbackfunction, this, o, t);
} else {
XmlHttpHelper.GetTextByPost(leapconfig.rpcurl(), n, h, this.callbackfunction, this, o, t);
}
leaprpcclientasyncactivelist.add(J);
return J;
}
}
} catch (j) {
if (l != null) {
return null;
}
}
};
this.asynrequest = function (g, h, i, f, e) {
return this.request(g, h, i, f, null, null, null, null, null, e);
};
this.callbackfunction = function (i, f) {
try {
var e = this.___buildResult(i, true, f.xmlhttp);
if (f.callback != null) {
var h = function () {
try {
var l = f.domain;
if (l == null) {
l = this;
}
if (!l.moduleDisposed) {
f.callback.call(l, e, f.args);
}
l = null;
} catch (j) {
throw j;
} finally {
l = f = null;
}
};
if (f.isworker) {
h();
} else {
setTimeout(h, 1);
}
}
} catch (g) {}
};
this.load = function (f) {
var e = f.charAt(0);
if (e == "/" || e == "\\") {
f = f.substring(1);
}
if (f.indexOf("?") == -1 && this.getVersion() != null) {
f += "?gv=" + this.getVersion();
}
return this.request(leapconfig.resurl() + f, null, null, null, null, null, 2, false, true);
};
this.loadjs = function (g, e, f) {
return this.loadscript(g, leapscripttype.js, e, f);
};
this.loadcss = function (f, e) {
return this.loadscript(f, leapscripttype.css, e);
};
this.loadtl = function (f, e) {
return this.loadscript(f, leapscripttype.template, e);
};
this._s = null;
this._c = null;
this.loadscript = function (j, s, q, e) {
var h = j.charAt(0);
if (h == "/" || h == "\\") {
j = j.substring(1);
}
if (this.getVersion() != null) {
if (j.indexOf("?") == -1) {
j += "?gv=" + this.getVersion();
} else {
j += "&gv=" + this.getVersion();
}
}
if (q == null) {
q = document;
}
var t = j;
if (j.indexOf("?") != -1) {
t = j.substring(0, j.indexOf("?"));
}
if (this._s == null) {
this._s = [];
var u = q.getElementsByTagName("SCRIPT");
if (u != null) {
for (var m = 0; m < u.length; m++) {
var f = u[m].getAttribute("path");
if (f != null) {
if (f.indexOf("?") != -1) {
f = f.substring(0, f.indexOf("?"));
}
this._s.push(f.toLowerCase());
}
f = null;
}
}
}
if (this._c == null) {
this._c = [];
var o = q.getElementsByTagName("LINK");
if (o != null) {
for (var m = 0; m < o.length; m++) {
var f = o[m].getAttribute("path");
if (f != null) {
if (f.indexOf("?") != -1) {
f = f.substring(0, f.indexOf("?"));
}
this._c.push(f.toLowerCase());
}
f = null;
}
}
}
if (s == null) {
s = leapscripttype.js;
}
if (s == leapscripttype.js) {
var g = this._s.length;
var n = t.toLowerCase();
for (var m = 0; m < g; m++) {
if (n == this._s[m]) {
return;
}
}
this._s.push(n);
} else {
if (s == leapscripttype.css) {
var g = this._c.length;
var n = t.toLowerCase();
for (var m = 0; m < g; m++) {
if (n == this._c[m]) {
return;
}
}
this._c.push(n);
}
}
var r = this.load(j);
if (r == null) {
return;
}
if (s == leapscripttype.js || s == leapscripttype.css) {
b(r, q, s, e, j);
} else {
try {
return r;
} finally {
r = null;
}
}
};
var b = function (j, g, e, m, l) {
try {
if (j != null) {
var i = g.getElementsByTagName("HEAD").item(0);
var h;
if (e == leapscripttype.js) {
h = g.createElement("script");
h.language = "javascript";
h.type = "text/javascript";
h.charset = "UTF-8";
h.defer = "defer";
h.text = j;
h.path = l;
} else {
if (e == leapscripttype.css) {
var h = g.createElement("link");
h.setAttribute("rel", "stylesheet");
h.setAttribute("type", "text/css");
h.setAttribute("href", leapconfig.server + l);
h.text = j;
h.path = l;
}
}
i.appendChild(h);
j = g = e = m = i = h = null;
return true;
}
} catch (f) {}
};
this.___geti1 = function (e) {
try {
if (e == null) {
return;
}
var j = __s__3[d];
var f = false;
for (var g = 0; g < e.length; g++) {
if (e[g].tagName == "SCRIPT" && e[g].src != null && (e[g].src.indexOf("Base.js") > -1 || e[g].src.indexOf("Net.js") > -1)) {
var h = e[g].src;
if (h.charAt(0) == "/") {
while (j.indexOf("//") > -1) {
j = j.replace("//", "_");
}
j = j.replace("http:_", "http://").replace("https:_", "https://");
while (j.lastIndexOf("/") > -1 && j.charAt(j.lastIndexOf("/") - 1) != "/") {
j = j.substring(0, j.lastIndexOf("/"));
}
if (e[g].src.indexOf("Base.js") > -1) {
j += h.replace("LEAP/Resource/JavaScript/Base.js", "");
} else {
j += h.replace("LEAP/Resource/JavaScript/Base/Net.js", "");
}
} else {
if (h.indexOf("http://") > -1 || h.indexOf("https://") > -1) {
if (e[g].src.indexOf("Base.js") > -1) {
j = h.replace("LEAP/Resource/JavaScript/Base.js", "");
} else {
j = h.replace("LEAP/Resource/JavaScript/Base/Net.js", "");
}
} else {
var l = 0;
while (h.indexOf("../") > -1) {
l += 1;
h = h.replace("../", "");
}
while (h.indexOf("./") > -1) {
h = h.replace("./", "");
}
while (j.indexOf("//") > -1) {
j = j.replace("//", "@");
}
j = j.replace("http:@", "http://").replace("https:@", "https://").substring(0, j.lastIndexOf("/") + 1);
if (l > 0) {
while (l > 0) {
l--;
j = j.substring(0, j.lastIndexOf("/"));
}
}
j = j + "/" + h;
if (e[g].src.indexOf("Base.js") > -1) {
if (j.indexOf("LEAP/Resource/JavaScript/Base.js") > -1) {
j = j.replace("LEAP/Resource/JavaScript/Base.js", "");
} else {
if (j.indexOf("Resource/JavaScript/Base.js") > -1) {
j = j.replace("Resource/JavaScript/Base.js", "");
}
}
} else {
j = j.replace("LEAP/Resource/JavaScript/Base/Net.js", "");
}
}
}
return j;
}
}
} finally {
e = null;
}
};
var d = "href";
this.init = function () {
if (__s__3[d].toLowerCase().indexOf("/webhelp/") > -1) {
return;
}
var l = __s__3[d];
var h = this.___geti1(document.getElementsByTagName("HEAD").item(0).childNodes);
if (!h) {
h = this.___geti1(document.getElementsByTagName("SCRIPT"));
}
l = h;
if (l.charAt(l.length - 1) != "/") {
l += "/";
}
var e = l;
var o = l.indexOf("://");
var m = l.indexOf("/", o + 3);
var f = "";
var j = l.substring(o + 3, m);
var n = 80;
var g = l.substring(0, o);
if (j.indexOf(":") > -1) {
var i = j.indexOf(":");
n = Number(j.substring(i + 1));
j = j.substring(0, i);
}
if (l.length > m + 1) {
f = l.substring(m + 1);
f = f.substring(0, f.length - 1);
}
leapconfig.port = n;
leapconfig.host = j;
leapconfig.portal = g;
leapconfig.context = f;
leapconfig.server = e;
leapconfig._rpcurl = e + "LEAP/Service/RPC/RPC.DO";
PublishServerConfig.RPCURL = e;
this.getsid();
};
};
var leapclient = new leaprpcclient();
if (window.Worker) {
var WorkerHelper = {};
WorkerHelper.defaultAsynMode = false;
WorkerHelper.maxActive = 5;
WorkerHelper.workerList = [];
WorkerHelper.workerList_free = [];
WorkerHelper.requestList = {};
WorkerHelper.enable = function () {
return WorkerHelper.defaultAsynMode && window.Worker != null;
};
WorkerHelper.request = function (d, h) {
var g = this.workerList_free.shift();
if (!g) {
if (this.workerList.length < this.maxActive) {
g = new Worker(leapconfig.server + "LEAP/Resource/JavaScript/Base/networker.js");
g.onmessage = this.onmessage;
g.onerror = this.onerror;
g.requestCount = 0;
var b = {
type: "init",
isIE: XmlHttpHelper.isIE,
IEVersion: XmlHttpHelper.IEVersion,
LEAP_LID: window.LEAP_LID,
isChrome: XmlHttpHelper.isChrome,
server: leapconfig.server,
_leap_systemarea: window._leap_systemarea,
_leap_systemname: window._leap_systemname,
_leap_systemcode: window._leap_systemcode
};
g.postMessage(b);
this.workerList.push(g);
} else {
var a = this.workerList.length;
g = this.workerList[0];
for (var c = 1; c < a; c++) {
var f = this.workerList[c];
if (f.requestCount < g.requestCount) {
g = f;
}
}
}
}
var e = {
type: "http.request",
instance: "LCR_" + UUID.randomUUID().replaceall("-", ""),
def: d
};
this.requestList[e.instance] = {
reqobj: e,
helpobj: h
};
g.requestCount++;
g.postMessage(e);
};
WorkerHelper.onmessage = function (a) {
var c = a.srcElement;
c.requestCount--;
WorkerHelper.workerList_free.push(c);
var h = a.data;
var f = h.data;
var j = h.instance;
var i = h.error;
var b = WorkerHelper.requestList[j];
delete WorkerHelper.requestList[j];
var d = b.helpobj;
d.xmlhttp = h.xmlhttp;
if (h.xmlhttp) {
h.xmlhttp.getResponseHeader = function (l) {
if (!l || l.length == "" || !this.headers) {
return null;
}
l = l.toLowerCase();
var e = this.headers.length;
for (var m = 0; m < e; m++) {
var n = this.headers[m];
if (n.name == l) {
return n.value;
}
}
};
}
d.isworker = true;
try {
b.helpobj.warp_callback.call(b.helpobj.warp_domain, f, d);
} catch (g) {}
};
WorkerHelper.onerror = function (a) {
if (console) {
console.log(a);
}
};
}
function XmlHttpHelper() {}
var arr_t = new Array("MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP.2.6", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP", "MSXML.XMLHTTP");
var arr_t_indx = -1;
XmlHttpHelper._getXmlHttpObj = function () {
var d = null;
if (window.ActiveXObject) {
if (arr_t_indx == -1) {
for (var b = 0; b < arr_t.length; b++) {
try {
d = new ActiveXObject(arr_t[b]);
arr_t_indx = b;
} catch (c) {}
if (d != null) {
break;
}
}
} else {
d = new ActiveXObject(arr_t[arr_t_indx]);
}
}
if (d == null) {
if (window.XMLHttpRequest) {
try {
d = new XMLHttpRequest();
if (d.overrideMimeType) {
d.overrideMimeType("text/xml");
}
} catch (a) {}
}
}
if (d == null) {
alert("con not create XMLHTTP object");
throw (new Error(-1, "con not create XMLHTTP object"));
}
return d;
};
XmlHttpHelper.GetTextByPost = function (e, g, d, f, c, a, b) {
return XmlHttpHelper.transmit(e, "POST", g, d, "text", f != null, f, c, a, b);
};
XmlHttpHelper.GetTextByGet = function (e, g, d, f, c, a, b) {
return XmlHttpHelper.transmit(e, "GET", g, d, "text", f != null, f, c, a, b);
};
XmlHttpHelper.processLID = function (a) {
if (a) {
try {
var c = a.getResponseHeader("LID");
if (c != null && c != "") {
window.LEAP_LID = c;
}
} catch (b) {}
}
a = null;
};
window.geturl = function (d) {
if (d != null) {
if ((!window.LEAP_LID || ((d.indexOf("http://") == 0 || d.indexOf("https://") == 0) && (d.indexOf(leapconfig.server) == -1 || d.toLowerCase().indexOf("login.html") > -1)))) {} else {
if (d.indexOf(".html") > -1 || d.indexOf(".htm") > -1 || d.endsWith("/")) {
if (d.indexOf("&lid=") == -1 && d.indexOf("?lid=") == -1) {
var a = d.indexOf("?");
if (a > -1) {
d = d.substring(0, a + 1) + "lid=" + window.LEAP_LID + "&" + d.substring(a + 1);
} else {
d += "?lid=" + window.LEAP_LID;
}
}
}
}
if (window._opensecure == "1") {
var b = false;
var e = leapconfig.server;
if (e != null && d != null) {
if (d.indexOf(e) == 0) {
b = true;
}
}
if (!b) {
var c = leapclient.request("app_checkuriSecure", {
url: d
});
if (!c) {
alert("璇ラ摼鎺ュ湴鍧€涓嶅湪绯荤粺鐧藉悕鍗曚腑锛岀郴缁熷皢绂佹鎵撳紑");
return null;
}
}
}
}
return d;
};
window._open = window["\u006f\u0070\u0065\u006e"];
window.open = function (c, b, a, f) {
if (b == undefined) {
b = null;
}
if (a == undefined) {
a = null;
}
if (f == undefined) {
f = null;
}
c = arguments[0] = window.geturl(c);
try {
if (window._open.apply) {
return window._open.apply(window, arguments);
}
if (b == a && a == f && f == null) {
return window._open(c);
} else {
if (b != null && a == f && f == null) {
return window._open(c, b);
} else {
if (b != null && a != null && f == null) {
return window._open(c, b, a);
} else {
if (b != null && a != null && f != null) {
return window._open(c, b, a, f);
} else {
if (b == null && a != null) {
if (f == null) {
return window._open(c, b, a);
} else {
return window._open(c, b, a, f);
}
} else {
return window._open(c);
}
}
}
}
}
} catch (d) {
return window._open(c);
}
};
window._navigate = window["\u006e\u0061\u0076\u0069\u0067\u0061\u0074\u0065"];
window["\u006e\u0061\u0076\u0069\u0067\u0061\u0074\u0065"] = function (a) {
a = arguments[0] = window.geturl(a);
if (window._navigate.apply) {
return window._navigate.apply(window, arguments);
} else {
return window._navigate(url);
}
};
window.leap_lid_loadurl = false;
XmlHttpHelper._ua = navigator.userAgent.toLowerCase();
XmlHttpHelper.isChrome = (XmlHttpHelper._ua.indexOf("chrome") != -1);
XmlHttpHelper.isIE = ((XmlHttpHelper._ua.indexOf("msie") != -1) || XmlHttpHelper._ua.indexOf("rv:") != -1) && (XmlHttpHelper._ua.indexOf("opera") == -1) && (XmlHttpHelper._ua.indexOf("webtv") == -1);
XmlHttpHelper.IEVersion = -1;
if (XmlHttpHelper.isIE) {
var _r = navigator.appVersion.match(/MSIE (\d+\.\d+)/, "");
if (_r) {
try {
XmlHttpHelper.IEVersion = Number(_r[1]);
} catch (E) {}
} else {
if (navigator.appVersion.indexOf("rv:") > -1) {
var _r2 = navigator.appVersion.match(/rv:(\d+\.\d+)/, "");
if (_r2) {
try {
XmlHttpHelper.IEVersion = Number(_r2[1]);
} catch (E) {}
}
} else {
if (XmlHttpHelper.name && XmlHttpHelper.name.indexOf("rv:") > -1) {
var _r2 = XmlHttpHelper.name.match(/rv:(\d+\.\d+)/, "");
if (_r2) {
try {
XmlHttpHelper.IEVersion = Number(_r2[1]);
} catch (E) {}
}
}
}
}
}
XmlHttpHelper.transmit = function (g, t, d, c, a, j, h, q, v, p) {
var A = null;
var G = p;
if (G == null) {
G = this._getXmlHttpObj();
}
try {
var l = g;
if (d != null) {
l += "?" + d;
}
G.open(t, l, j);
if (!XmlHttpHelper.isChrome) {
G.setRequestHeader("connection", "keep-alive");
}
if (!window.leap_lid_loadurl) {
window.leap_lid_loadurl = true;
var g = __s__3.search != null ? __s__3.search : __s__3.href;
if (g) {
var s = g.indexOf("?");
if (s > -1) {
var n = g.substring(s + 1);
var B = n.split("&");
for (var w = 0; w < B.length; w++) {
var y = B[w].split("=");
if (y && y.length && y.length > 1) {
var F = y[0];
var u = y[1];
if (F == "lid") {
window.LEAP_LID = u;
break;
}
}
}
}
}
}
G.setRequestHeader("lrqvt", leapclient.LRS_VT_TYPE + "");
G.setRequestHeader("lrq-vt", leapclient.LRS_VT_TYPE + "");
if (window.LEAP_LID) {
G.setRequestHeader("LID", window.LEAP_LID);
}
var f = false;
if (t.toLowerCase() == "post") {
G.setRequestHeader("Pragma", "no-cache");
G.setRequestHeader("Cache-Control", "no-cache");
var r = 0;
if (c == null || c == "") {
c = " ";
}
if (c != null) {
try {
var b = c.length;
var z = false;
if (leapflash.fp != null && leapflash.fp.compress != null && b > 1000) {
if (!(XmlHttpHelper.isIE && XmlHttpHelper.IEVersion == 8)) {
z = true;
c = "a=" + leapflash.fp.compress(c);
G.setRequestHeader("Data-Type", "2");
}
}
if (!z && b > 0) {
if (b > 99) {
c = "a=" + base64encode(pako.deflate(c, {
to: "string"
}));
G.setRequestHeader("Data-Type", "6");
} else {
c = "a=" + base64encode(encodeURIComponent(escape(c)));
G.setRequestHeader("Data-Type", "4");
}
}
} catch (x) {}
G.setRequestHeader("Post-Type", "1");
r = c.length;
}
if (!XmlHttpHelper.isChrome) {
G.setRequestHeader("Content-Length", '"' + r + '"');
}
G.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
} else {
if (c != null) {
if (d != null) {
l += "&requestData=" + c;
} else {
l = "?requestData=" + c;
}
}
}
if (window._leap_systemarea) {
G.setRequestHeader("LSYS-AREA", window._leap_systemarea);
}
if (window._leap_systemname) {
G.setRequestHeader("LSYS-NAME", window._leap_systemname);
}
if (window._leap_systemcode) {
G.setRequestHeader("LSYS-CODE", window._leap_systemcode);
}
if (j) {
if (v != null && v.instance != null) {
A = v.instance;
}
G.onreadystatechange = function () {
XmlHttpHelper.processLID(G);
if (G.readyState == 4) {
try {
if (a != null) {
if (a.toLowerCase() == "text") {
if (h != null) {
if (q != null) {
if (A == null || (A != null && leaprpcclientasyncactivelist.contains(A))) {
var e = G.responseText;
if (G.getResponseHeader("LENC")) {
if (f) {
if (e) {
e = leapflash.fp.d(e);
if (e) {
e = decodeURIComponent(e);
}
}
}
}
h.call(q, e, v);
} else {
h = v = null;
}
if (A != null) {
leaprpcclientasyncactivelist.remove(A);
}
} else {
var e = G.responseText;
if (G.getResponseHeader("LENC")) {
if (f) {
if (e) {
e = leapflash.fp.d(e);
if (e) {
e = decodeURIComponent(e);
}
}
}
}
h.call(e);
}
}
} else {
if (a.toLowerCase() == "xml") {
if (q != null) {
if (A == null || (A != null && leaprpcclientasyncactivelist.contains(A))) {
h.call(q, G.responseXML, v);
} else {
h = v = null;
}
if (A != null) {
leaprpcclientasyncactivelist.remove(A);
}
} else {
h.call(G.responseXML);
}
}
}
} else {
if (q != null) {
if (v != null) {
h.call(q, null, v);
} else {
h.call(q);
}
} else {
h.call();
}
}
} finally {}
}
};
if (c == null) {
c = "";
}
G.send(c);
} else {
if (c == null) {
c = "";
}
G.send(c);
XmlHttpHelper.processLID(G);
if (G.status == 200) {
if (a != null) {
if (a.toLowerCase() == "text") {
if (G.getResponseHeader("LENC")) {
if (f) {
var D = G.responseText;
if (D) {
D = leapflash.fp.d(D);
if (D) {
D = decodeURIComponent(D);
}
}
return D;
}
}
var o = G.getResponseHeader("ServerTime997");
if (o != null && o.length > 0) {
return G.responseText + ":" + o;
} else {
return G.responseText;
}
} else {
if (a.toLowerCase() == "xml") {
return G.responseXML;
}
}
} else {
return null;
}
}
return null;
}
} catch (C) {
if (A != null) {
leaprpcclientasyncactivelist.remove(A);
}
} finally {
if (G != null) {
try {} catch (m) {}
}
}
};
RegExp.prototype.toJSON = function () {
return this.toString();
};
if (!this.JSON) {
this.JSON = {};
}(function () {
function f(n) {
return n < 10 ? "0" + n : n;
}
if (typeof Date.prototype.toJSON !== "function") {
Date.prototype.toJSON = function (key) {
return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
};
String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
return this.valueOf();
};
}
var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
gap, indent, meta = {
"\b": "\\b",
"\t": "\\t",
"\n": "\\n",
"\f": "\\f",
"\r": "\\r",
'"': '\\"',
"\\": "\\\\"
},
rep;
function quote(string) {
escapable.lastIndex = 0;
return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
var c = meta[a];
return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
}) + '"' : '"' + string + '"';
}
function str(key, holder) {
var i, k, v, length, mind = gap,
partial, value = holder[key];
if (value && typeof value === "object" && typeof value.toJSON === "function") {
value = value.toJSON(key);
}
if (typeof rep === "function") {
value = rep.call(holder, key, value);
}
switch (typeof value) {
case "string":
return quote(value);
case "number":
return isFinite(value) ? String(value) : "null";
case "boolean":
case "null":
return String(value);
case "object":
if (!value) {
return "null";
}
gap += indent;
partial = [];
if (Object.prototype.toString.apply(value) === "[object Array]") {
length = value.length;
for (i = 0; i < length; i += 1) {
partial[i] = str(i, value) || "null";
}
v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
gap = mind;
return v;
}
if (rep && typeof rep === "object") {
length = rep.length;
for (i = 0; i < length; i += 1) {
k = rep[i];
if (typeof k === "string") {
v = str(k, value);
if (v) {
partial.push(quote(k) + (gap ? ": " : ":") + v);
}
}
}
} else {
for (k in value) {
if (Object.hasOwnProperty.call(value, k)) {
v = str(k, value);
if (v) {
partial.push(quote(k) + (gap ? ": " : ":") + v);
}
}
}
}
v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
gap = mind;
return v;
}
}
var ___i8 = false;
try {
___i8 = (((LEAPBrowser.name.indexOf("msie") != -1) || LEAPBrowser.name.indexOf("rv:") != -1) && (LEAPBrowser.name.indexOf("opera") == -1) && (LEAPBrowser.name.indexOf("webtv") == -1) && navigator.appVersion.match(/MSIE (\d+\.\d+)/, "")[1] == 8);
} catch (E) {}
if (typeof JSON.stringify !== "function" || ___i8) {
JSON.stringify = function (value, replacer, space) {
var i;
gap = "";
indent = "";
if (typeof space === "number") {
for (i = 0; i < space; i += 1) {
indent += " ";
}
} else {
if (typeof space === "string") {
indent = space;
}
}
rep = replacer;
if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
throw new Error("JSON.stringify");
}
return str("", {
"": value
});
};
}
if (typeof JSON.parse !== "function" || ___i8) {
JSON.parse = function (text, reviver) {
if (text == null || text == "") {
return null;
}
var j;
function walk(holder, key) {
var k, v, value = holder[key];
if (value && typeof value === "object") {
for (k in value) {
if (Object.hasOwnProperty.call(value, k)) {
v = walk(value, k);
if (v !== undefined) {
value[k] = v;
} else {
delete value[k];
}
}
}
}
return reviver.call(holder, key, value);
}
cx.lastIndex = 0;
if (cx.test(text)) {
text = text.replace(cx, function (a) {
return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
});
}
if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
j = eval("(" + text + ")");
return typeof reviver === "function" ? walk({
"": j
}, "") : j;
}
throw new SyntaxError("JSON.parse");
};
}
}());
var json_parse = (function () {
var d, b, a = {
'"': '"',
"\\": "\\",
"/": "/",
b: "\b",
f: "\f",
n: "\n",
r: "\r",
t: "\t"
},
n, l = function (o) {
var p = {
name: "SyntaxError",
message: o,
at: d,
text: n
};
throw p;
},
g = function (o) {
if (o && o !== b) {
l("Expected '" + o + "' instead of '" + b + "'");
}
b = n.charAt(d);
d += 1;
return b;
},
f = function () {
var p, o = "";
if (b === "-") {
o = "-";
g("-");
}
while (b >= "0" && b <= "9") {
o += b;
g();
}
if (b === ".") {
o += ".";
while (g() && b >= "0" && b <= "9") {
o += b;
}
}
if (b === "e" || b === "E") {
o += b;
g();
if (b === "-" || b === "+") {
o += b;
g();
}
while (b >= "0" && b <= "9") {
o += b;
g();
}
}
p = +o;
if (isNaN(p)) {
l("Bad number");
} else {
return p;
}
},
h = function () {
var r, q, p = "",
o;
if (b === '"') {
while (g()) {
if (b === '"') {
g();
return p;
} else {
if (b === "\\") {
g();
if (b === "u") {
o = 0;
for (q = 0; q < 4; q += 1) {
r = parseInt(g(), 16);
if (!isFinite(r)) {
break;
}
o = o * 16 + r;
}
p += String.fromCharCode(o);
} else {
if (typeof a[b] === "string") {
p += a[b];
} else {
break;
}
}
} else {
p += b;
}
}
}
}
l("Bad string");
},
j = function () {
while (b && b <= " ") {
g();
}
},
c = function () {
switch (b) {
case "t":
g("t");
g("r");
g("u");
g("e");
return true;
case "f":
g("f");
g("a");
g("l");
g("s");
g("e");
return false;
case "n":
g("n");
g("u");
g("l");
g("l");
return null;
}
l("Unexpected '" + b + "'");
},
m, i = function () {
var o = [];
if (b === "[") {
g("[");
j();
if (b === "]") {
g("]");
return o;
}
while (b) {
o.push(m());
j();
if (b === "]") {
g("]");
return o;
}
g(",");
j();
}
}
l("Bad array");
},
e = function () {
var p, o = {};
if (b === "{") {
g("{");
j();
if (b === "}") {
g("}");
return o;
}
while (b) {
p = h();
j();
g(":");
if (Object.hasOwnProperty.call(o, p)) {
l('Duplicate key "' + p + '"');
}
o[p] = m();
j();
if (b === "}") {
g("}");
return o;
}
g(",");
j();
}
}
l("Bad object");
};
m = function () {
j();
switch (b) {
case "{":
return e();
case "[":
return i();
case '"':
return h();
case "-":
return f();
default:
return b >= "0" && b <= "9" ? f() : c();
}
};
return function (r, p) {
var o;
n = r;
d = 0;
b = " ";
o = m();
j();
if (b) {
l("Syntax error");
}
return typeof p === "function" ? (function q(w, u) {
var t, s, x = w[u];
if (x && typeof x === "object") {
for (t in x) {
if (Object.hasOwnProperty.call(x, t)) {
s = q(x, t);
if (s !== undefined) {
x[t] = s;
} else {
delete x[t];
}
}
}
}
return p.call(w, u, x);
}({
"": o
}, "")) : o;
};
}());
if (this.JSON && !window.ActiveXObject) {
if (this.JSON.parse && this.json_parse) {
this.JSON.innerParse = this.JSON.parse;
this.JSON.parse = function (c, a) {
if (c != null) {
try {
if (c.length >= 327680) {
return json_parse(c, a);
} else {
return JSON.innerParse(c, a);
}
} catch (b) {
return (new Function("", "return " + c))();
}
}
};
}
}
function leap_common_init() {
leapclient.init();
}
leap_common_init();
leapclient.ID = UUID.randomUUID().replaceall("-", "");
var leapflash = {};
leapflash.fp = null;
var __lpinite = false;
leapflash.inited = function (a, r) {
if (__lpinite) {
return;
}
__lpinite = true;
if (r) {
if (!leapflash.hasOwnProperty(r)) {
leapflash[r] = [];
}
}
if (a) {
leapflash[r].push(a);
}
if (r == "leaprpcportal") {
if (a) {
leapflash.fp = document.getElementById(a);
if (leapflash.fp && !leapflash.fp.compress) {
var n = leapflash.fp.getElementsByTagName("object");
if (n && n.length) {
leapflash.fp = n[0];
}
n = null;
}
if (leapflash.fp.s) {
leapflash.fp.s(leapclient.getsid());
}
}
if (window._s21) {
try {
var o = null;
if (a) {
o = leapflash.fp.uncompress(window._s21);
} else {
o = base64decode(window._s21);
}
window._s21 = null;
if (o != null) {
var p = o.split(";");
var d = p.length;
var h = {};
window.res_bgimgs = h;
for (var m = 0; m < d; m++) {
var t = p[m];
if (t != null && t.length > 0) {
var g = t.split(",");
h["I_" + g[0]] = g[1];
}
}
}
} catch (q) {}
}
if (window._s10) {
try {
var o = null;
if (a) {
o = leapflash.fp.uncompress(window._s10);
} else {
o = base64decode(window._s10);
}
window._s10 = null;
if (o != null) {
var u = JSON.parse(o);
for (var s in u) {
if (!s.endsWith("_hashkey")) {
var b = u[s + "_hashkey"];
if (b != null) {
var c = u[s];
var d = c.length;
var g = new hashtable();
for (var f = 0; f < d; f++) {
var t = c[f];
if (t[b] != null) {
g.add(t[b], t);
}
}
u[s] = g;
}
}
}
window.Application = u;
u = null;
}
o = null;
} catch (q) {}
}
}
};
var _fpinit = function () {
if (window && window.isleapybsbrowser == true) {} else {
if (leapflash.fp == null && document.getElementById("leaprpcportal01") == null) {
var b = '<object id="leaprpcportal01" style="position:absolute;left:-100px;top:-100px;" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="1" height="1" align="middle"><param name="movie" value="@pathLEAP/Resource/flash/hp.swf@gv" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><param name="play" value="true" /><param name="loop" value="true" /><param name="wmode" value="window" /><param name="scale" value="showall" /><param name="menu" value="true" /><param name="devicefont" value="false" /><param name="salign" value="" /><param name="allowScriptAccess" value="sameDomain" /><param name="FlashVars" value="id=leaprpcportal01&type=leaprpcportal"/><!--[if !IE]>--><object type="application/x-shockwave-flash" data="@pathLEAP/Resource/flash/hp.swf" width="1" height="1"><param name="movie" value="@pathLEAP/Resource/flash/hp.swf" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><param name="play" value="true" /><param name="loop" value="true" /><param name="wmode" value="window" /><param name="scale" value="showall" /><param name="menu" value="true" /><param name="devicefont" value="false" /><param name="salign" value="" /><param name="allowScriptAccess" value="sameDomain" /><param name="FlashVars" value="id=leaprpcportal01&type=leaprpcportal"/><!--<![endif]--><a href="http://www.adobe.com/go/getflash"><img src="' + leapconfig.server + 'LEAP/Resource/flash/get_flash_player.gif" alt="鑾峰緱 Adobe Flash Player" /></a><!--[if !IE]>--></object><!--<![endif]--></object>';
b = b.replaceall("@path", leapconfig.server).replaceall("@gv", leapclient.getVersionStr());
var a = document.createElement("div");
document.body.appendChild(a);
a.style.position = "absolute";
a.style.left = "-100px";
a.style.top = "-100px";
a.style.width = "1px";
a.style.height = "1px";
a.innerHTML = b;
a = null;
}
window.setTimeout(leapflash.inited, 1000);
}
};
if (window.attachEvent) {
window.attachEvent("onload", _fpinit);
} else {
window.addEventListener("load", _fpinit);
}