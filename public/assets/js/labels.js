!function(a) {
    void 0 === a.fn.each2 && a.extend(a.fn, {
        each2: function(b) {
            for (var c = a([0]), d = -1, e = this.length; ++d < e && (c.context = c[0] = this[d]) && !1 !== b.call(c[0], d, c); )
                ;
            return this
        }
    })
}(jQuery),
    function(a, b) {
        "use strict";
        function n(b) {
            var c = a(document.createTextNode(""));
            b.before(c),
                c.before(b),
                c.remove()
        }
        function o(a) {
            return a.replace(/[^\u0000-\u007E]/g, function(a) {
                return m[a] || a
            })
        }
        function p(a, b) {
            for (var c = 0, d = b.length; c < d; c += 1)
                if (r(a, b[c]))
                    return c;
            return -1
        }
        function r(a, c) {
            return a === c || a !== b && c !== b && (null !== a && null !== c && (a.constructor === String ? a + "" == c + "" : c.constructor === String && c + "" == a + ""))
        }
        function s(a, b, c) {
            var d, e, f;
            if (null === a || a.length < 1)
                return [];
            for (e = 0,
                     f = (d = a.split(b)).length; e < f; e += 1)
                d[e] = c(d[e]);
            return d
        }
        function t(a) {
            return a.outerWidth(!1) - a.width()
        }
        function u(c) {
            var d = "keyup-change-value";
            c.on("keydown", function() {
                a.data(c, d) === b && a.data(c, d, c.val())
            }),
                c.on("keyup", function() {
                    var e = a.data(c, d);
                    e !== b && c.val() !== e && (a.removeData(c, d),
                        c.trigger("keyup-change"))
                })
        }
        function v(c) {
            c.on("mousemove", function(c) {
                var d = h;
                d !== b && d.x === c.pageX && d.y === c.pageY || a(c.target).trigger("mousemove-filtered", c)
            })
        }
        function w(a, c, d) {
            var e;
            return d = d || b,
                function() {
                    var b = arguments;
                    window.clearTimeout(e),
                        e = window.setTimeout(function() {
                            c.apply(d, b)
                        }, a)
                }
        }
        function z(b) {
            var e, c = 0, d = 0;
            return "selectionStart"in (b = a(b)[0]) ? (c = b.selectionStart,
                d = b.selectionEnd - c) : "selection"in document && (b.focus(),
                e = document.selection.createRange(),
                d = document.selection.createRange().text.length,
                e.moveStart("character", -b.value.length),
                c = e.text.length - d),
                {
                    offset: c,
                    length: d
                }
        }
        function A(a) {
            a.preventDefault(),
                a.stopPropagation()
        }
        function C(b) {
            var c;
            return g || (c = b[0].currentStyle || window.getComputedStyle(b[0], null),
                (g = a(document.createElement("div")).css({
                    position: "absolute",
                    left: "-10000px",
                    top: "-10000px",
                    display: "none",
                    fontSize: c.fontSize,
                    fontFamily: c.fontFamily,
                    fontStyle: c.fontStyle,
                    fontWeight: c.fontWeight,
                    letterSpacing: c.letterSpacing,
                    textTransform: c.textTransform,
                    whiteSpace: "nowrap"
                })).attr("class", "select2-sizer"),
                a(document.body).append(g)),
                g.text(b.val()),
                g.width()
        }
        function D(b, c, d) {
            var g, f = [], e = a.trim(b.attr("class"));
            e && a((e = "" + e).split(/\s+/)).each2(function() {
                0 === this.indexOf("select2-") && f.push(this)
            }),
            (e = a.trim(c.attr("class"))) && a((e = "" + e).split(/\s+/)).each2(function() {
                0 !== this.indexOf("select2-") && ((g = d(this)) && f.push(g))
            }),
                b.attr("class", f.join(" "))
        }
        function E(a, b, c, d) {
            var e = o(a.toUpperCase()).indexOf(o(b.toUpperCase()))
                , b = b.length;
            return e < 0 ? void c.push(d(a)) : (c.push(d(a.substring(0, e))),
                c.push("<span class='select2-match'>"),
                c.push(d(a.substring(e, e + b))),
                c.push("</span>"),
                void c.push(d(a.substring(e + b, a.length))))
        }
        function F(a) {
            var b = {
                "\\": "&#92;",
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#47;"
            };
            return String(a).replace(/[&<>"'\/\\]/g, function(a) {
                return b[a]
            })
        }
        function G(c) {
            var d, e = null, f = c.quietMillis || 100, g = c.url, h = this;
            return function(i) {
                window.clearTimeout(d),
                    d = window.setTimeout(function() {
                        var d = c.data
                            , f = g
                            , j = c.transport || a.fn.select2.ajaxDefaults.transport
                            , k = {
                            type: c.type || "GET",
                            cache: c.cache || !1,
                            jsonpCallback: c.jsonpCallback || b,
                            dataType: c.dataType || "json"
                        }
                            , k = a.extend({}, a.fn.select2.ajaxDefaults.params, k)
                            , d = d ? d.call(h, i.term, i.page, i.context) : null
                            , f = "function" == typeof f ? f.call(h, i.term, i.page, i.context) : f;
                        e && "function" == typeof e.abort && e.abort(),
                        c.params && (a.isFunction(c.params) ? a.extend(k, c.params.call(h)) : a.extend(k, c.params)),
                            a.extend(k, {
                                url: f,
                                dataType: c.dataType,
                                data: d,
                                success: function(a) {
                                    a = c.results(a, i.page, i);
                                    i.callback(a)
                                },
                                error: function(a, b, c) {
                                    i.callback({
                                        hasError: !0,
                                        jqXHR: a,
                                        textStatus: b,
                                        errorThrown: c
                                    })
                                }
                            }),
                            e = j.call(h, k)
                    }, f)
            }
        }
        function H(b) {
            var d, e, c = b, f = function(a) {
                return "" + a.text
            }, b = (a.isArray(c) && (c = {
                results: e = c
            }),
            !1 === a.isFunction(c) && (e = c,
                    c = function() {
                        return e
                    }
            ),
                c());
            return b.text && (f = b.text,
            a.isFunction(f) || (d = b.text,
                    f = function(a) {
                        return a[d]
                    }
            )),
                function(b) {
                    var g, d = b.term, e = {
                        results: []
                    };
                    return "" === d ? void b.callback(c()) : (g = function(c, e) {
                        var h, i;
                        if ((c = c[0]).children) {
                            for (i in h = {},
                                c)
                                c.hasOwnProperty(i) && (h[i] = c[i]);
                            h.children = [],
                                a(c.children).each2(function(a, b) {
                                    g(b, h.children)
                                }),
                            (h.children.length || b.matcher(d, f(h), c)) && e.push(h)
                        } else
                            b.matcher(d, f(c), c) && e.push(c)
                    }
                        ,
                        a(c().results).each2(function(a, b) {
                            g(b, e.results)
                        }),
                        void b.callback(e))
                }
        }
        function I(c) {
            var d = a.isFunction(c);
            return function(e) {
                var f = e.term
                    , g = {
                    results: []
                }
                    , h = d ? c(e) : c;
                a.isArray(h) && (a(h).each(function() {
                    var a = this.text !== b
                        , c = a ? this.text : this;
                    "" !== f && !e.matcher(f, c) || g.results.push(a ? this : {
                        id: this,
                        text: this
                    })
                }),
                    e.callback(g))
            }
        }
        function J(b, c) {
            if (a.isFunction(b))
                return 1;
            if (b) {
                if ("string" == typeof b)
                    return 1;
                throw new Error(c + " must be a string, function, or falsy value")
            }
        }
        function K(b, c) {
            var d;
            return a.isFunction(b) ? (d = Array.prototype.slice.call(arguments, 2),
                b.apply(c, d)) : b
        }
        function L(b) {
            var c = 0;
            return a.each(b, function(a, b) {
                b.children ? c += L(b.children) : c++
            }),
                c
        }
        function N() {
            var b = this;
            a.each(arguments, function(a, c) {
                b[c].remove(),
                    b[c] = null
            })
        }
        function O(b, c) {
            function d() {}
            return ((d.prototype = new b).constructor = d).prototype.parent = b.prototype,
                d.prototype = a.extend(d.prototype, c),
                d
        }
        var g, j, h, k, m, i, f, c, d, e;
        window.Select2 === b && (h = {
            x: 0,
            y: 0
        },
            k = {
                TAB: 9,
                ENTER: 13,
                ESC: 27,
                SPACE: 32,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                HOME: 36,
                END: 35,
                BACKSPACE: 8,
                DELETE: 46,
                isArrow: function(a) {
                    switch (a = a.which || a) {
                        case k.LEFT:
                        case k.RIGHT:
                        case k.UP:
                        case k.DOWN:
                            return !0
                    }
                    return !1
                },
                isControl: function(a) {
                    switch (a.which) {
                        case k.SHIFT:
                        case k.CTRL:
                        case k.ALT:
                            return !0
                    }
                    return !!a.metaKey
                },
                isFunctionKey: function(a) {
                    return 112 <= (a = a.which || a) && a <= 123
                }
            },
            m = {
                "Ⓐ": "A",
                "Ａ": "A",
                "À": "A",
                "Á": "A",
                "Â": "A",
                "Ầ": "A",
                "Ấ": "A",
                "Ẫ": "A",
                "Ẩ": "A",
                "Ã": "A",
                "Ā": "A",
                "Ă": "A",
                "Ằ": "A",
                "Ắ": "A",
                "Ẵ": "A",
                "Ẳ": "A",
                "Ȧ": "A",
                "Ǡ": "A",
                "Ä": "A",
                "Ǟ": "A",
                "Ả": "A",
                "Å": "A",
                "Ǻ": "A",
                "Ǎ": "A",
                "Ȁ": "A",
                "Ȃ": "A",
                "Ạ": "A",
                "Ậ": "A",
                "Ặ": "A",
                "Ḁ": "A",
                "Ą": "A",
                "Ⱥ": "A",
                "Ɐ": "A",
                "Ꜳ": "AA",
                "Æ": "AE",
                "Ǽ": "AE",
                "Ǣ": "AE",
                "Ꜵ": "AO",
                "Ꜷ": "AU",
                "Ꜹ": "AV",
                "Ꜻ": "AV",
                "Ꜽ": "AY",
                "Ⓑ": "B",
                "Ｂ": "B",
                "Ḃ": "B",
                "Ḅ": "B",
                "Ḇ": "B",
                "Ƀ": "B",
                "Ƃ": "B",
                "Ɓ": "B",
                "Ⓒ": "C",
                "Ｃ": "C",
                "Ć": "C",
                "Ĉ": "C",
                "Ċ": "C",
                "Č": "C",
                "Ç": "C",
                "Ḉ": "C",
                "Ƈ": "C",
                "Ȼ": "C",
                "Ꜿ": "C",
                "Ⓓ": "D",
                "Ｄ": "D",
                "Ḋ": "D",
                "Ď": "D",
                "Ḍ": "D",
                "Ḑ": "D",
                "Ḓ": "D",
                "Ḏ": "D",
                "Đ": "D",
                "Ƌ": "D",
                "Ɗ": "D",
                "Ɖ": "D",
                "Ꝺ": "D",
                "Ǳ": "DZ",
                "Ǆ": "DZ",
                "ǲ": "Dz",
                "ǅ": "Dz",
                "Ⓔ": "E",
                "Ｅ": "E",
                "È": "E",
                "É": "E",
                "Ê": "E",
                "Ề": "E",
                "Ế": "E",
                "Ễ": "E",
                "Ể": "E",
                "Ẽ": "E",
                "Ē": "E",
                "Ḕ": "E",
                "Ḗ": "E",
                "Ĕ": "E",
                "Ė": "E",
                "Ë": "E",
                "Ẻ": "E",
                "Ě": "E",
                "Ȅ": "E",
                "Ȇ": "E",
                "Ẹ": "E",
                "Ệ": "E",
                "Ȩ": "E",
                "Ḝ": "E",
                "Ę": "E",
                "Ḙ": "E",
                "Ḛ": "E",
                "Ɛ": "E",
                "Ǝ": "E",
                "Ⓕ": "F",
                "Ｆ": "F",
                "Ḟ": "F",
                "Ƒ": "F",
                "Ꝼ": "F",
                "Ⓖ": "G",
                "Ｇ": "G",
                "Ǵ": "G",
                "Ĝ": "G",
                "Ḡ": "G",
                "Ğ": "G",
                "Ġ": "G",
                "Ǧ": "G",
                "Ģ": "G",
                "Ǥ": "G",
                "Ɠ": "G",
                "Ꞡ": "G",
                "Ᵹ": "G",
                "Ꝿ": "G",
                "Ⓗ": "H",
                "Ｈ": "H",
                "Ĥ": "H",
                "Ḣ": "H",
                "Ḧ": "H",
                "Ȟ": "H",
                "Ḥ": "H",
                "Ḩ": "H",
                "Ḫ": "H",
                "Ħ": "H",
                "Ⱨ": "H",
                "Ⱶ": "H",
                "Ɥ": "H",
                "Ⓘ": "I",
                "Ｉ": "I",
                "Ì": "I",
                "Í": "I",
                "Î": "I",
                "Ĩ": "I",
                "Ī": "I",
                "Ĭ": "I",
                "İ": "I",
                "Ï": "I",
                "Ḯ": "I",
                "Ỉ": "I",
                "Ǐ": "I",
                "Ȉ": "I",
                "Ȋ": "I",
                "Ị": "I",
                "Į": "I",
                "Ḭ": "I",
                "Ɨ": "I",
                "Ⓙ": "J",
                "Ｊ": "J",
                "Ĵ": "J",
                "Ɉ": "J",
                "Ⓚ": "K",
                "Ｋ": "K",
                "Ḱ": "K",
                "Ǩ": "K",
                "Ḳ": "K",
                "Ķ": "K",
                "Ḵ": "K",
                "Ƙ": "K",
                "Ⱪ": "K",
                "Ꝁ": "K",
                "Ꝃ": "K",
                "Ꝅ": "K",
                "Ꞣ": "K",
                "Ⓛ": "L",
                "Ｌ": "L",
                "Ŀ": "L",
                "Ĺ": "L",
                "Ľ": "L",
                "Ḷ": "L",
                "Ḹ": "L",
                "Ļ": "L",
                "Ḽ": "L",
                "Ḻ": "L",
                "Ł": "L",
                "Ƚ": "L",
                "Ɫ": "L",
                "Ⱡ": "L",
                "Ꝉ": "L",
                "Ꝇ": "L",
                "Ꞁ": "L",
                "Ǉ": "LJ",
                "ǈ": "Lj",
                "Ⓜ": "M",
                "Ｍ": "M",
                "Ḿ": "M",
                "Ṁ": "M",
                "Ṃ": "M",
                "Ɱ": "M",
                "Ɯ": "M",
                "Ⓝ": "N",
                "Ｎ": "N",
                "Ǹ": "N",
                "Ń": "N",
                "Ñ": "N",
                "Ṅ": "N",
                "Ň": "N",
                "Ṇ": "N",
                "Ņ": "N",
                "Ṋ": "N",
                "Ṉ": "N",
                "Ƞ": "N",
                "Ɲ": "N",
                "Ꞑ": "N",
                "Ꞥ": "N",
                "Ǌ": "NJ",
                "ǋ": "Nj",
                "Ⓞ": "O",
                "Ｏ": "O",
                "Ò": "O",
                "Ó": "O",
                "Ô": "O",
                "Ồ": "O",
                "Ố": "O",
                "Ỗ": "O",
                "Ổ": "O",
                "Õ": "O",
                "Ṍ": "O",
                "Ȭ": "O",
                "Ṏ": "O",
                "Ō": "O",
                "Ṑ": "O",
                "Ṓ": "O",
                "Ŏ": "O",
                "Ȯ": "O",
                "Ȱ": "O",
                "Ö": "O",
                "Ȫ": "O",
                "Ỏ": "O",
                "Ő": "O",
                "Ǒ": "O",
                "Ȍ": "O",
                "Ȏ": "O",
                "Ơ": "O",
                "Ờ": "O",
                "Ớ": "O",
                "Ỡ": "O",
                "Ở": "O",
                "Ợ": "O",
                "Ọ": "O",
                "Ộ": "O",
                "Ǫ": "O",
                "Ǭ": "O",
                "Ø": "O",
                "Ǿ": "O",
                "Ɔ": "O",
                "Ɵ": "O",
                "Ꝋ": "O",
                "Ꝍ": "O",
                "Ƣ": "OI",
                "Ꝏ": "OO",
                "Ȣ": "OU",
                "Ⓟ": "P",
                "Ｐ": "P",
                "Ṕ": "P",
                "Ṗ": "P",
                "Ƥ": "P",
                "Ᵽ": "P",
                "Ꝑ": "P",
                "Ꝓ": "P",
                "Ꝕ": "P",
                "Ⓠ": "Q",
                "Ｑ": "Q",
                "Ꝗ": "Q",
                "Ꝙ": "Q",
                "Ɋ": "Q",
                "Ⓡ": "R",
                "Ｒ": "R",
                "Ŕ": "R",
                "Ṙ": "R",
                "Ř": "R",
                "Ȑ": "R",
                "Ȓ": "R",
                "Ṛ": "R",
                "Ṝ": "R",
                "Ŗ": "R",
                "Ṟ": "R",
                "Ɍ": "R",
                "Ɽ": "R",
                "Ꝛ": "R",
                "Ꞧ": "R",
                "Ꞃ": "R",
                "Ⓢ": "S",
                "Ｓ": "S",
                "ẞ": "S",
                "Ś": "S",
                "Ṥ": "S",
                "Ŝ": "S",
                "Ṡ": "S",
                "Š": "S",
                "Ṧ": "S",
                "Ṣ": "S",
                "Ṩ": "S",
                "Ș": "S",
                "Ş": "S",
                "Ȿ": "S",
                "Ꞩ": "S",
                "Ꞅ": "S",
                "Ⓣ": "T",
                "Ｔ": "T",
                "Ṫ": "T",
                "Ť": "T",
                "Ṭ": "T",
                "Ț": "T",
                "Ţ": "T",
                "Ṱ": "T",
                "Ṯ": "T",
                "Ŧ": "T",
                "Ƭ": "T",
                "Ʈ": "T",
                "Ⱦ": "T",
                "Ꞇ": "T",
                "Ꜩ": "TZ",
                "Ⓤ": "U",
                "Ｕ": "U",
                "Ù": "U",
                "Ú": "U",
                "Û": "U",
                "Ũ": "U",
                "Ṹ": "U",
                "Ū": "U",
                "Ṻ": "U",
                "Ŭ": "U",
                "Ü": "U",
                "Ǜ": "U",
                "Ǘ": "U",
                "Ǖ": "U",
                "Ǚ": "U",
                "Ủ": "U",
                "Ů": "U",
                "Ű": "U",
                "Ǔ": "U",
                "Ȕ": "U",
                "Ȗ": "U",
                "Ư": "U",
                "Ừ": "U",
                "Ứ": "U",
                "Ữ": "U",
                "Ử": "U",
                "Ự": "U",
                "Ụ": "U",
                "Ṳ": "U",
                "Ų": "U",
                "Ṷ": "U",
                "Ṵ": "U",
                "Ʉ": "U",
                "Ⓥ": "V",
                "Ｖ": "V",
                "Ṽ": "V",
                "Ṿ": "V",
                "Ʋ": "V",
                "Ꝟ": "V",
                "Ʌ": "V",
                "Ꝡ": "VY",
                "Ⓦ": "W",
                "Ｗ": "W",
                "Ẁ": "W",
                "Ẃ": "W",
                "Ŵ": "W",
                "Ẇ": "W",
                "Ẅ": "W",
                "Ẉ": "W",
                "Ⱳ": "W",
                "Ⓧ": "X",
                "Ｘ": "X",
                "Ẋ": "X",
                "Ẍ": "X",
                "Ⓨ": "Y",
                "Ｙ": "Y",
                "Ỳ": "Y",
                "Ý": "Y",
                "Ŷ": "Y",
                "Ỹ": "Y",
                "Ȳ": "Y",
                "Ẏ": "Y",
                "Ÿ": "Y",
                "Ỷ": "Y",
                "Ỵ": "Y",
                "Ƴ": "Y",
                "Ɏ": "Y",
                "Ỿ": "Y",
                "Ⓩ": "Z",
                "Ｚ": "Z",
                "Ź": "Z",
                "Ẑ": "Z",
                "Ż": "Z",
                "Ž": "Z",
                "Ẓ": "Z",
                "Ẕ": "Z",
                "Ƶ": "Z",
                "Ȥ": "Z",
                "Ɀ": "Z",
                "Ⱬ": "Z",
                "Ꝣ": "Z",
                "ⓐ": "a",
                "ａ": "a",
                "ẚ": "a",
                "à": "a",
                "á": "a",
                "â": "a",
                "ầ": "a",
                "ấ": "a",
                "ẫ": "a",
                "ẩ": "a",
                "ã": "a",
                "ā": "a",
                "ă": "a",
                "ằ": "a",
                "ắ": "a",
                "ẵ": "a",
                "ẳ": "a",
                "ȧ": "a",
                "ǡ": "a",
                "ä": "a",
                "ǟ": "a",
                "ả": "a",
                "å": "a",
                "ǻ": "a",
                "ǎ": "a",
                "ȁ": "a",
                "ȃ": "a",
                "ạ": "a",
                "ậ": "a",
                "ặ": "a",
                "ḁ": "a",
                "ą": "a",
                "ⱥ": "a",
                "ɐ": "a",
                "ꜳ": "aa",
                "æ": "ae",
                "ǽ": "ae",
                "ǣ": "ae",
                "ꜵ": "ao",
                "ꜷ": "au",
                "ꜹ": "av",
                "ꜻ": "av",
                "ꜽ": "ay",
                "ⓑ": "b",
                "ｂ": "b",
                "ḃ": "b",
                "ḅ": "b",
                "ḇ": "b",
                "ƀ": "b",
                "ƃ": "b",
                "ɓ": "b",
                "ⓒ": "c",
                "ｃ": "c",
                "ć": "c",
                "ĉ": "c",
                "ċ": "c",
                "č": "c",
                "ç": "c",
                "ḉ": "c",
                "ƈ": "c",
                "ȼ": "c",
                "ꜿ": "c",
                "ↄ": "c",
                "ⓓ": "d",
                "ｄ": "d",
                "ḋ": "d",
                "ď": "d",
                "ḍ": "d",
                "ḑ": "d",
                "ḓ": "d",
                "ḏ": "d",
                "đ": "d",
                "ƌ": "d",
                "ɖ": "d",
                "ɗ": "d",
                "ꝺ": "d",
                "ǳ": "dz",
                "ǆ": "dz",
                "ⓔ": "e",
                "ｅ": "e",
                "è": "e",
                "é": "e",
                "ê": "e",
                "ề": "e",
                "ế": "e",
                "ễ": "e",
                "ể": "e",
                "ẽ": "e",
                "ē": "e",
                "ḕ": "e",
                "ḗ": "e",
                "ĕ": "e",
                "ė": "e",
                "ë": "e",
                "ẻ": "e",
                "ě": "e",
                "ȅ": "e",
                "ȇ": "e",
                "ẹ": "e",
                "ệ": "e",
                "ȩ": "e",
                "ḝ": "e",
                "ę": "e",
                "ḙ": "e",
                "ḛ": "e",
                "ɇ": "e",
                "ɛ": "e",
                "ǝ": "e",
                "ⓕ": "f",
                "ｆ": "f",
                "ḟ": "f",
                "ƒ": "f",
                "ꝼ": "f",
                "ⓖ": "g",
                "ｇ": "g",
                "ǵ": "g",
                "ĝ": "g",
                "ḡ": "g",
                "ğ": "g",
                "ġ": "g",
                "ǧ": "g",
                "ģ": "g",
                "ǥ": "g",
                "ɠ": "g",
                "ꞡ": "g",
                "ᵹ": "g",
                "ꝿ": "g",
                "ⓗ": "h",
                "ｈ": "h",
                "ĥ": "h",
                "ḣ": "h",
                "ḧ": "h",
                "ȟ": "h",
                "ḥ": "h",
                "ḩ": "h",
                "ḫ": "h",
                "ẖ": "h",
                "ħ": "h",
                "ⱨ": "h",
                "ⱶ": "h",
                "ɥ": "h",
                "ƕ": "hv",
                "ⓘ": "i",
                "ｉ": "i",
                "ì": "i",
                "í": "i",
                "î": "i",
                "ĩ": "i",
                "ī": "i",
                "ĭ": "i",
                "ï": "i",
                "ḯ": "i",
                "ỉ": "i",
                "ǐ": "i",
                "ȉ": "i",
                "ȋ": "i",
                "ị": "i",
                "į": "i",
                "ḭ": "i",
                "ɨ": "i",
                "ı": "i",
                "ⓙ": "j",
                "ｊ": "j",
                "ĵ": "j",
                "ǰ": "j",
                "ɉ": "j",
                "ⓚ": "k",
                "ｋ": "k",
                "ḱ": "k",
                "ǩ": "k",
                "ḳ": "k",
                "ķ": "k",
                "ḵ": "k",
                "ƙ": "k",
                "ⱪ": "k",
                "ꝁ": "k",
                "ꝃ": "k",
                "ꝅ": "k",
                "ꞣ": "k",
                "ⓛ": "l",
                "ｌ": "l",
                "ŀ": "l",
                "ĺ": "l",
                "ľ": "l",
                "ḷ": "l",
                "ḹ": "l",
                "ļ": "l",
                "ḽ": "l",
                "ḻ": "l",
                "ſ": "l",
                "ł": "l",
                "ƚ": "l",
                "ɫ": "l",
                "ⱡ": "l",
                "ꝉ": "l",
                "ꞁ": "l",
                "ꝇ": "l",
                "ǉ": "lj",
                "ⓜ": "m",
                "ｍ": "m",
                "ḿ": "m",
                "ṁ": "m",
                "ṃ": "m",
                "ɱ": "m",
                "ɯ": "m",
                "ⓝ": "n",
                "ｎ": "n",
                "ǹ": "n",
                "ń": "n",
                "ñ": "n",
                "ṅ": "n",
                "ň": "n",
                "ṇ": "n",
                "ņ": "n",
                "ṋ": "n",
                "ṉ": "n",
                "ƞ": "n",
                "ɲ": "n",
                "ŉ": "n",
                "ꞑ": "n",
                "ꞥ": "n",
                "ǌ": "nj",
                "ⓞ": "o",
                "ｏ": "o",
                "ò": "o",
                "ó": "o",
                "ô": "o",
                "ồ": "o",
                "ố": "o",
                "ỗ": "o",
                "ổ": "o",
                "õ": "o",
                "ṍ": "o",
                "ȭ": "o",
                "ṏ": "o",
                "ō": "o",
                "ṑ": "o",
                "ṓ": "o",
                "ŏ": "o",
                "ȯ": "o",
                "ȱ": "o",
                "ö": "o",
                "ȫ": "o",
                "ỏ": "o",
                "ő": "o",
                "ǒ": "o",
                "ȍ": "o",
                "ȏ": "o",
                "ơ": "o",
                "ờ": "o",
                "ớ": "o",
                "ỡ": "o",
                "ở": "o",
                "ợ": "o",
                "ọ": "o",
                "ộ": "o",
                "ǫ": "o",
                "ǭ": "o",
                "ø": "o",
                "ǿ": "o",
                "ɔ": "o",
                "ꝋ": "o",
                "ꝍ": "o",
                "ɵ": "o",
                "ƣ": "oi",
                "ȣ": "ou",
                "ꝏ": "oo",
                "ⓟ": "p",
                "ｐ": "p",
                "ṕ": "p",
                "ṗ": "p",
                "ƥ": "p",
                "ᵽ": "p",
                "ꝑ": "p",
                "ꝓ": "p",
                "ꝕ": "p",
                "ⓠ": "q",
                "ｑ": "q",
                "ɋ": "q",
                "ꝗ": "q",
                "ꝙ": "q",
                "ⓡ": "r",
                "ｒ": "r",
                "ŕ": "r",
                "ṙ": "r",
                "ř": "r",
                "ȑ": "r",
                "ȓ": "r",
                "ṛ": "r",
                "ṝ": "r",
                "ŗ": "r",
                "ṟ": "r",
                "ɍ": "r",
                "ɽ": "r",
                "ꝛ": "r",
                "ꞧ": "r",
                "ꞃ": "r",
                "ⓢ": "s",
                "ｓ": "s",
                "ß": "s",
                "ś": "s",
                "ṥ": "s",
                "ŝ": "s",
                "ṡ": "s",
                "š": "s",
                "ṧ": "s",
                "ṣ": "s",
                "ṩ": "s",
                "ș": "s",
                "ş": "s",
                "ȿ": "s",
                "ꞩ": "s",
                "ꞅ": "s",
                "ẛ": "s",
                "ⓣ": "t",
                "ｔ": "t",
                "ṫ": "t",
                "ẗ": "t",
                "ť": "t",
                "ṭ": "t",
                "ț": "t",
                "ţ": "t",
                "ṱ": "t",
                "ṯ": "t",
                "ŧ": "t",
                "ƭ": "t",
                "ʈ": "t",
                "ⱦ": "t",
                "ꞇ": "t",
                "ꜩ": "tz",
                "ⓤ": "u",
                "ｕ": "u",
                "ù": "u",
                "ú": "u",
                "û": "u",
                "ũ": "u",
                "ṹ": "u",
                "ū": "u",
                "ṻ": "u",
                "ŭ": "u",
                "ü": "u",
                "ǜ": "u",
                "ǘ": "u",
                "ǖ": "u",
                "ǚ": "u",
                "ủ": "u",
                "ů": "u",
                "ű": "u",
                "ǔ": "u",
                "ȕ": "u",
                "ȗ": "u",
                "ư": "u",
                "ừ": "u",
                "ứ": "u",
                "ữ": "u",
                "ử": "u",
                "ự": "u",
                "ụ": "u",
                "ṳ": "u",
                "ų": "u",
                "ṷ": "u",
                "ṵ": "u",
                "ʉ": "u",
                "ⓥ": "v",
                "ｖ": "v",
                "ṽ": "v",
                "ṿ": "v",
                "ʋ": "v",
                "ꝟ": "v",
                "ʌ": "v",
                "ꝡ": "vy",
                "ⓦ": "w",
                "ｗ": "w",
                "ẁ": "w",
                "ẃ": "w",
                "ŵ": "w",
                "ẇ": "w",
                "ẅ": "w",
                "ẘ": "w",
                "ẉ": "w",
                "ⱳ": "w",
                "ⓧ": "x",
                "ｘ": "x",
                "ẋ": "x",
                "ẍ": "x",
                "ⓨ": "y",
                "ｙ": "y",
                "ỳ": "y",
                "ý": "y",
                "ŷ": "y",
                "ỹ": "y",
                "ȳ": "y",
                "ẏ": "y",
                "ÿ": "y",
                "ỷ": "y",
                "ẙ": "y",
                "ỵ": "y",
                "ƴ": "y",
                "ɏ": "y",
                "ỿ": "y",
                "ⓩ": "z",
                "ｚ": "z",
                "ź": "z",
                "ẑ": "z",
                "ż": "z",
                "ž": "z",
                "ẓ": "z",
                "ẕ": "z",
                "ƶ": "z",
                "ȥ": "z",
                "ɀ": "z",
                "ⱬ": "z",
                "ꝣ": "z",
                "Ά": "Α",
                "Έ": "Ε",
                "Ή": "Η",
                "Ί": "Ι",
                "Ϊ": "Ι",
                "Ό": "Ο",
                "Ύ": "Υ",
                "Ϋ": "Υ",
                "Ώ": "Ω",
                "ά": "α",
                "έ": "ε",
                "ή": "η",
                "ί": "ι",
                "ϊ": "ι",
                "ΐ": "ι",
                "ό": "ο",
                "ύ": "υ",
                "ϋ": "υ",
                "ΰ": "υ",
                "ω": "ω",
                "ς": "σ"
            },
            i = a(document),
            f = function() {
                var a = 1;
                return function() {
                    return a++
                }
            }(),
            c = O(Object, {
                bind: function(a) {
                    var b = this;
                    return function() {
                        a.apply(b, arguments)
                    }
                },
                init: function(c) {
                    var d, e, g = ".select2-results", g = (this.opts = c = this.prepareOpts(c),
                        this.id = c.id,
                    c.element.data("select2") !== b && null !== c.element.data("select2") && c.element.data("select2").destroy(),
                        this.container = this.createContainer(),
                        this.liveRegion = a(".select2-hidden-accessible"),
                    0 == this.liveRegion.length && (this.liveRegion = a("<span>", {
                        role: "status",
                        "aria-live": "polite"
                    }).addClass("select2-hidden-accessible").appendTo(document.body)),
                        this.containerId = "s2id_" + (c.element.attr("id") || "autogen" + f()),
                        this.containerEventName = this.containerId.replace(/([.])/g, "_").replace(/([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"),
                        this.container.attr("id", this.containerId),
                        this.container.attr("title", c.element.attr("title")),
                        this.body = a(document.body),
                        D(this.container, this.opts.element, this.opts.adaptContainerCssClass),
                        this.container.attr("style", c.element.attr("style")),
                        this.container.css(K(c.containerCss, this.opts.element)),
                        this.container.addClass(K(c.containerCssClass, this.opts.element)),
                        this.elementTabIndex = this.opts.element.attr("tabindex"),
                        this.opts.element.data("select2", this).attr("tabindex", "-1").before(this.container).on("click.select2", A),
                        this.container.data("select2", this),
                        this.dropdown = this.container.find(".select2-drop"),
                        D(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass),
                        this.dropdown.addClass(K(c.dropdownCssClass, this.opts.element)),
                        this.dropdown.data("select2", this),
                        this.dropdown.on("click", A),
                        this.results = d = this.container.find(g),
                        this.search = e = this.container.find("input.select2-input"),
                        this.queryCount = 0,
                        this.resultsPage = 0,
                        this.context = null,
                        this.initContainer(),
                        this.container.on("click", A),
                        v(this.results),
                        this.dropdown.on("mousemove-filtered", g, this.bind(this.highlightUnderEvent)),
                        this.dropdown.on("touchstart touchmove touchend", g, this.bind(function(a) {
                            this._touchEvent = !0,
                                this.highlightUnderEvent(a)
                        })),
                        this.dropdown.on("touchmove", g, this.bind(this.touchMoved)),
                        this.dropdown.on("touchstart touchend", g, this.bind(this.clearTouchMoved)),
                        this.dropdown.on("click", this.bind(function(a) {
                            this._touchEvent && (this._touchEvent = !1,
                                this.selectHighlighted())
                        })),
                        function(a, b) {
                            var c = w(a, function(a) {
                                b.trigger("scroll-debounced", a)
                            });
                            b.on("scroll", function(a) {
                                0 <= p(a.target, b.get()) && c(a)
                            })
                        }(80, this.results),
                        this.dropdown.on("scroll-debounced", g, this.bind(this.loadMoreIfNeeded)),
                        a(this.container).on("change", ".select2-input", function(a) {
                            a.stopPropagation()
                        }),
                        a(this.dropdown).on("change", ".select2-input", function(a) {
                            a.stopPropagation()
                        }),
                    a.fn.mousewheel && d.mousewheel(function(a, b, c, e) {
                        var f = d.scrollTop();
                        0 < e && f - e <= 0 ? (d.scrollTop(0),
                            A(a)) : e < 0 && d.get(0).scrollHeight - d.scrollTop() + e <= d.height() && (d.scrollTop(d.get(0).scrollHeight - d.height()),
                            A(a))
                    }),
                        u(e),
                        e.on("keyup-change input paste", this.bind(this.updateResults)),
                        e.on("focus", function() {
                            e.addClass("select2-focused")
                        }),
                        e.on("blur", function() {
                            e.removeClass("select2-focused")
                        }),
                        this.dropdown.on("mouseup", g, this.bind(function(b) {
                            0 < a(b.target).closest(".select2-result-selectable").length && (this.highlightUnderEvent(b),
                                this.selectHighlighted(b))
                        })),
                        this.dropdown.on("click mouseup mousedown touchstart touchend focusin", function(a) {
                            a.stopPropagation()
                        }),
                        this.lastSearchTerm = b,
                    a.isFunction(this.opts.initSelection) && (this.initSelection(),
                        this.monitorSource()),
                    null !== c.maximumInputLength && this.search.attr("maxlength", c.maximumInputLength),
                        c.element.prop("disabled")), g = (this.enable(!(g = g === b ? !1 : g)),
                        c.element.prop("readonly"));
                    this.readonly(g = g === b ? !1 : g),
                        j = j || function() {
                            var b = a("<div class='select2-measure-scrollbar'></div>")
                                , c = (b.appendTo(document.body),
                                {
                                    width: b.width() - b[0].clientWidth,
                                    height: b.height() - b[0].clientHeight
                                });
                            return b.remove(),
                                c
                        }(),
                        this.autofocus = c.element.prop("autofocus"),
                        c.element.prop("autofocus", !1),
                    this.autofocus && this.focus(),
                        this.search.attr("placeholder", c.searchInputPlaceholder)
                },
                destroy: function() {
                    var a = this.opts.element
                        , c = a.data("select2")
                        , d = this;
                    this.close(),
                    a.length && a[0].detachEvent && d._sync && a.each(function() {
                        d._sync && this.detachEvent("onpropertychange", d._sync)
                    }),
                    this.propertyObserver && (this.propertyObserver.disconnect(),
                        this.propertyObserver = null),
                        this._sync = null,
                    c !== b && (c.container.remove(),
                        c.liveRegion.remove(),
                        c.dropdown.remove(),
                        a.removeData("select2").off(".select2"),
                        a.is("input[type='hidden']") ? a.css("display", "") : (a.show().prop("autofocus", this.autofocus || !1),
                            this.elementTabIndex ? a.attr({
                                tabindex: this.elementTabIndex
                            }) : a.removeAttr("tabindex"),
                            a.show())),
                        N.call(this, "container", "liveRegion", "dropdown", "results", "search")
                },
                optionToData: function(a) {
                    return a.is("option") ? {
                        id: a.prop("value"),
                        text: a.text(),
                        element: a.get(),
                        css: a.attr("class"),
                        disabled: a.prop("disabled"),
                        locked: r(a.attr("locked"), "locked") || r(a.data("locked"), !0)
                    } : a.is("optgroup") ? {
                        text: a.attr("label"),
                        children: [],
                        element: a.get(),
                        css: a.attr("class")
                    } : void 0
                },
                prepareOpts: function(c) {
                    var e, g, d, j, i = this;
                    if ("select" === (d = c.element).get(0).tagName.toLowerCase() && (this.select = e = c.element),
                    e && a.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function() {
                        if (this in c)
                            throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.")
                    }),
                        c.debug = c.debug || a.fn.select2.defaults.debug,
                    c.debug && console && console.warn && (null != c.id && console.warn("Select2: The `id` option has been removed in Select2 4.0.0, consider renaming your `id` property or mapping the property before your data makes it to Select2. You can read more at https://select2.github.io/announcements-4.0.html#changed-id"),
                    null != c.text && console.warn("Select2: The `text` option has been removed in Select2 4.0.0, consider renaming your `text` property or mapping the property before your data makes it to Select2. You can read more at https://select2.github.io/announcements-4.0.html#changed-id"),
                    null != c.sortResults && console.warn("Select2: the `sortResults` option has been renamed to `sorter` in Select2 4.0.0. "),
                    null != c.selectOnBlur && console.warn("Select2: The `selectOnBlur` option has been renamed to `selectOnClose` in Select2 4.0.0."),
                    null != c.ajax && null != c.ajax.results && console.warn("Select2: The `ajax.results` option has been renamed to `ajax.processResults` in Select2 4.0.0."),
                    null != c.formatNoResults && console.warn("Select2: The `formatNoResults` option has been renamed to `language.noResults` in Select2 4.0.0."),
                    null != c.formatSearching && console.warn("Select2: The `formatSearching` option has been renamed to `language.searching` in Select2 4.0.0."),
                    null != c.formatInputTooShort && console.warn("Select2: The `formatInputTooShort` option has been renamed to `language.inputTooShort` in Select2 4.0.0."),
                    null != c.formatInputTooLong && console.warn("Select2: The `formatInputTooLong` option has been renamed to `language.inputTooLong` in Select2 4.0.0."),
                    null != c.formatLoading && console.warn("Select2: The `formatLoading` option has been renamed to `language.loadingMore` in Select2 4.0.0."),
                    null != c.formatSelectionTooBig && console.warn("Select2: The `formatSelectionTooBig` option has been renamed to `language.maximumSelected` in Select2 4.0.0."),
                    c.element.data("select2Tags") && console.warn("Select2: The `data-select2-tags` attribute has been renamed to `data-tags` in Select2 4.0.0.")),
                    null != c.element.data("tags") && (j = c.element.data("tags"),
                    a.isArray(j) || (j = []),
                        c.element.data("select2Tags", j)),
                    null != c.sorter && (c.sortResults = c.sorter),
                    null != c.selectOnClose && (c.selectOnBlur = c.selectOnClose),
                    null != c.ajax && a.isFunction(c.ajax.processResults) && (c.ajax.results = c.ajax.processResults),
                    null != c.language && (j = c.language,
                    a.isFunction(j.noMatches) && (c.formatNoMatches = j.noMatches),
                    a.isFunction(j.searching) && (c.formatSearching = j.searching),
                    a.isFunction(j.inputTooShort) && (c.formatInputTooShort = j.inputTooShort),
                    a.isFunction(j.inputTooLong) && (c.formatInputTooLong = j.inputTooLong),
                    a.isFunction(j.loadingMore) && (c.formatLoading = j.loadingMore),
                    a.isFunction(j.maximumSelected) && (c.formatSelectionTooBig = j.maximumSelected)),
                    "function" != typeof (c = a.extend({}, {
                        populateResults: function(d, e, g) {
                            var h, j = this.opts.id, k = this.liveRegion;
                            (h = function(d, e, l) {
                                    for (var o, r, s, p, q, w = [], m = 0, n = (d = c.sortResults(d, e, g)).length; m < n; m += 1)
                                        p = !(q = !0 === (o = d[m]).disabled) && j(o) !== b,
                                            r = o.children && 0 < o.children.length,
                                            (s = a("<li></li>")).addClass("select2-results-dept-" + l),
                                            s.addClass("select2-result"),
                                            s.addClass(p ? "select2-result-selectable" : "select2-result-unselectable"),
                                        q && s.addClass("select2-disabled"),
                                        r && s.addClass("select2-result-with-children"),
                                            s.addClass(i.opts.formatResultCssClass(o)),
                                            s.attr("role", "presentation"),
                                            (p = a(document.createElement("div"))).addClass("select2-result-label"),
                                            p.attr("id", "select2-result-label-" + f()),
                                            p.attr("role", "option"),
                                        (q = c.formatResult(o, p, g, i.opts.escapeMarkup)) !== b && (p.html(q),
                                            s.append(p)),
                                        r && ((q = a("<ul></ul>")).addClass("select2-result-sub"),
                                            h(o.children, q, l + 1),
                                            s.append(q)),
                                            s.data("select2-data", o),
                                            w.push(s[0]);
                                    e.append(w),
                                        k.text(c.formatMatches(d.length))
                                }
                            )(e, d, 0)
                        }
                    }, a.fn.select2.defaults, c)).id && (g = c.id,
                            c.id = function(a) {
                                return a[g]
                            }
                    ),
                        a.isArray(c.element.data("select2Tags"))) {
                        if ("tags"in c)
                            throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + c.element.attr("id");
                        c.tags = c.element.data("select2Tags")
                    }
                    if (e ? (c.query = this.bind(function(a) {
                            var g, c = {
                                results: [],
                                more: !1
                            }, e = a.term, h = function(b, c) {
                                var d;
                                b.is("option") ? a.matcher(e, b.text(), b) && c.push(i.optionToData(b)) : b.is("optgroup") && (d = i.optionToData(b),
                                    b.children().each2(function(a, b) {
                                        h(b, d.children)
                                    }),
                                0 < d.children.length && c.push(d))
                            }, f = d.children();
                            this.getPlaceholder() !== b && 0 < f.length && ((g = this.getPlaceholderOption()) && (f = f.not(g))),
                                f.each2(function(a, b) {
                                    h(b, c.results)
                                }),
                                a.callback(c)
                        }),
                            c.id = function(a) {
                                return a.id
                            }
                    ) : "query"in c || ("ajax"in c ? ((j = c.element.data("ajax-url")) && 0 < j.length && (c.ajax.url = j),
                        c.query = G.call(c.element, c.ajax)) : "data"in c ? c.query = H(c.data) : "tags"in c && (c.query = I(c.tags),
                    c.createSearchChoice === b && (c.createSearchChoice = function(b) {
                            return {
                                id: a.trim(b),
                                text: a.trim(b)
                            }
                        }
                    ),
                    c.initSelection === b && (c.initSelection = function(b, d) {
                            var e = [];
                            a(s(b.val(), c.separator, c.transformVal)).each(function() {
                                var b = {
                                    id: this,
                                    text: this
                                }
                                    , d = c.tags;
                                a.isFunction(d) && (d = d()),
                                    a(d).each(function() {
                                        return r(this.id, b.id) ? (b = this,
                                            !1) : void 0
                                    }),
                                    e.push(b)
                            }),
                                d(e)
                        }
                    ))),
                    "function" != typeof c.query)
                        throw "query function not defined for Select2 " + c.element.attr("id");
                    if ("top" === c.createSearchChoicePosition)
                        c.createSearchChoicePosition = function(a, b) {
                            a.unshift(b)
                        }
                        ;
                    else if ("bottom" === c.createSearchChoicePosition)
                        c.createSearchChoicePosition = function(a, b) {
                            a.push(b)
                        }
                        ;
                    else if ("function" != typeof c.createSearchChoicePosition)
                        throw "invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";
                    return c
                },
                monitorSource: function() {
                    var d, c = this.opts.element, e = this;
                    c.on("change.select2", this.bind(function(a) {
                        !0 !== this.opts.element.data("select2-change-triggered") && this.initSelection()
                    })),
                        this._sync = this.bind(function() {
                            var a = c.prop("disabled")
                                , a = (this.enable(!(a = a === b ? !1 : a)),
                                c.prop("readonly"));
                            this.readonly(a = a === b ? !1 : a),
                            this.container && (D(this.container, this.opts.element, this.opts.adaptContainerCssClass),
                                this.container.addClass(K(this.opts.containerCssClass, this.opts.element))),
                            this.dropdown && (D(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass),
                                this.dropdown.addClass(K(this.opts.dropdownCssClass, this.opts.element)))
                        }),
                    c.length && c[0].attachEvent && c.each(function() {
                        this.attachEvent("onpropertychange", e._sync)
                    }),
                    (d = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver) !== b && (this.propertyObserver && (delete this.propertyObserver,
                        this.propertyObserver = null),
                        this.propertyObserver = new d(function(b) {
                                a.each(b, e._sync)
                            }
                        ),
                        this.propertyObserver.observe(c.get(0), {
                            attributes: !0,
                            subtree: !1
                        }))
                },
                triggerSelect: function(b) {
                    b = a.Event("select2-selecting", {
                        val: this.id(b),
                        object: b,
                        choice: b
                    });
                    return this.opts.element.trigger(b),
                        !b.isDefaultPrevented()
                },
                triggerChange: function(b) {
                    b = a.extend({}, b = b || {}, {
                        type: "change",
                        val: this.val()
                    }),
                        this.opts.element.data("select2-change-triggered", !0),
                        this.opts.element.trigger(b),
                        this.opts.element.data("select2-change-triggered", !1),
                        this.opts.element.click(),
                    this.opts.blurOnChange && this.opts.element.blur()
                },
                isInterfaceEnabled: function() {
                    return !0 === this.enabledInterface
                },
                enableInterface: function() {
                    var a = this._enabled && !this._readonly;
                    return a !== this.enabledInterface && (this.container.toggleClass("select2-container-disabled", !a),
                        this.close(),
                        this.enabledInterface = a,
                        !0)
                },
                enable: function(a) {
                    this._enabled !== (a = a === b ? !0 : a) && (this._enabled = a,
                        this.opts.element.prop("disabled", !a),
                        this.enableInterface())
                },
                disable: function() {
                    this.enable(!1)
                },
                readonly: function(a) {
                    this._readonly !== (a = a === b ? !1 : a) && (this._readonly = a,
                        this.opts.element.prop("readonly", a),
                        this.enableInterface())
                },
                opened: function() {
                    return !!this.container && this.container.hasClass("select2-dropdown-open")
                },
                positionDropdown: function() {
                    var w, x, b = this.dropdown, c = this.container, d = c.offset(), e = c.outerHeight(!1), f = c.outerWidth(!1), g = b.outerHeight(!1), h = a(window), i = h.width(), k = h.height(), l = h.scrollLeft() + i, k = h.scrollTop() + k, n = d.top + e, o = d.left, k = n + g <= k, q = d.top - g >= h.scrollTop(), r = b.outerWidth(!1);
                    b.hasClass("select2-drop-above") ? (w = !0,
                    !q && k && (w = !(x = !0))) : (w = !1,
                    !k && q && (w = x = !0)),
                    x && (b.hide(),
                        d = this.container.offset(),
                        e = this.container.outerHeight(!1),
                        f = this.container.outerWidth(!1),
                        g = b.outerHeight(!1),
                        l = h.scrollLeft() + i,
                        h.scrollTop(),
                        n = d.top + e,
                        o = d.left,
                        r = b.outerWidth(!1),
                        b.show(),
                        this.focusSearch()),
                        this.opts.dropdownAutoWidth ? (k = a(".select2-results", b)[0],
                            b.addClass("select2-drop-auto-width"),
                            b.css("width", ""),
                            f < (r = b.outerWidth(!1) + (k.scrollHeight === k.clientHeight ? 0 : j.width)) ? f = r : r = f,
                            g = b.outerHeight(!1)) : this.container.removeClass("select2-drop-auto-width"),
                    "static" !== this.body.css("position") && (n -= (q = this.body.offset()).top,
                        o -= q.left),
                        x = {
                            left: o = !(o + r <= l) && d.left + l + c.outerWidth(!1) > r ? d.left + this.container.outerWidth(!1) - r : o,
                            width: f
                        },
                        w ? (this.container.addClass("select2-drop-above"),
                            b.addClass("select2-drop-above"),
                            g = b.outerHeight(!1),
                            x.top = d.top - g,
                            x.bottom = "auto") : (x.top = n,
                            x.bottom = "auto",
                            this.container.removeClass("select2-drop-above"),
                            b.removeClass("select2-drop-above")),
                        x = a.extend(x, K(this.opts.dropdownCss, this.opts.element)),
                        b.css(x)
                },
                shouldOpen: function() {
                    var b;
                    return !this.opened() && (!1 !== this._enabled && !0 !== this._readonly && (b = a.Event("select2-opening"),
                        this.opts.element.trigger(b),
                        !b.isDefaultPrevented()))
                },
                clearDropdownAlignmentPreference: function() {
                    this.container.removeClass("select2-drop-above"),
                        this.dropdown.removeClass("select2-drop-above")
                },
                open: function() {
                    return !!this.shouldOpen() && (this.opening(),
                        i.on("mousemove.select2Event", function(a) {
                            h.x = a.pageX,
                                h.y = a.pageY
                        }),
                        !0)
                },
                opening: function() {
                    var f, b = this.containerEventName, c = "scroll." + b, d = "resize." + b, e = "orientationchange." + b, g = (this.container.addClass("select2-dropdown-open").addClass("select2-container-active"),
                        this.clearDropdownAlignmentPreference(),
                    this.dropdown[0] !== this.body.children().last()[0] && this.dropdown.detach().appendTo(this.body),
                    0 === (f = a("#select2-drop-mask")).length && ((f = a(document.createElement("div"))).attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"),
                        f.hide(),
                        f.appendTo(this.body),
                        f.on("mousedown touchstart click", function(b) {
                            n(f);
                            var c = a("#select2-drop");
                            0 < c.length && ((c = c.data("select2")).opts.selectOnBlur && c.selectHighlighted({
                                noFocus: !0
                            }),
                                c.close(),
                                b.preventDefault(),
                                b.stopPropagation())
                        })),
                    this.dropdown.prev()[0] !== f[0] && this.dropdown.before(f),
                        a("#select2-drop").removeAttr("id"),
                        this.dropdown.attr("id", "select2-drop"),
                        f.show(),
                        this.positionDropdown(),
                        this.dropdown.show(),
                        this.positionDropdown(),
                        this.dropdown.addClass("select2-drop-active"),
                        this);
                    this.container.parents().add(window).each(function() {
                        a(this).on(d + " " + c + " " + e, function(a) {
                            g.opened() && g.positionDropdown()
                        })
                    })
                },
                close: function() {
                    var b, c, d, e;
                    this.opened() && (b = this.containerEventName,
                        c = "scroll." + b,
                        d = "resize." + b,
                        e = "orientationchange." + b,
                        this.container.parents().add(window).each(function() {
                            a(this).off(c).off(d).off(e)
                        }),
                        this.clearDropdownAlignmentPreference(),
                        a("#select2-drop-mask").hide(),
                        this.dropdown.removeAttr("id"),
                        this.dropdown.hide(),
                        this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"),
                        this.results.empty(),
                        i.off("mousemove.select2Event"),
                        this.clearSearch(),
                        this.search.removeClass("select2-active"),
                        this.search.removeAttr("aria-activedescendant"),
                        this.opts.element.trigger(a.Event("select2-close")))
                },
                externalSearch: function(a) {
                    this.open(),
                        this.search.val(a),
                        this.updateResults(!1)
                },
                clearSearch: function() {},
                prefillNextSearchTerm: function() {
                    if ("" !== this.search.val())
                        return !1;
                    var a = this.opts.nextSearchTerm(this.data(), this.lastSearchTerm);
                    return a !== b && (this.search.val(a),
                        this.search.select(),
                        !0)
                },
                getMaximumSelectionSize: function() {
                    return K(this.opts.maximumSelectionSize, this.opts.element)
                },
                ensureHighlightVisible: function() {
                    var e, f, c, d, j, b = this.results;
                    (d = this.highlight()) < 0 || (0 == d ? b.scrollTop(0) : (c = this.findHighlightableChoices().find(".select2-result-label"),
                        f = (j = ((e = a(c[d])).offset() || {}).top || 0) + e.outerHeight(!0),
                    d === c.length - 1 && 0 < (d = b.find("li.select2-more-results")).length && (f = d.offset().top + d.outerHeight(!0)),
                    (c = b.offset().top + b.outerHeight(!1)) < f && b.scrollTop(b.scrollTop() + (f - c)),
                    (d = j - b.offset().top) < 0 && "none" != e.css("display") && b.scrollTop(b.scrollTop() + d)))
                },
                findHighlightableChoices: function() {
                    return this.results.find(".select2-result-selectable:not(.select2-disabled):not(.select2-selected)")
                },
                moveHighlight: function(b) {
                    for (var c = this.findHighlightableChoices(), d = this.highlight(); -1 < d && d < c.length; ) {
                        var e = a(c[d += b]);
                        if (e.hasClass("select2-result-selectable") && !e.hasClass("select2-disabled") && !e.hasClass("select2-selected")) {
                            this.highlight(d);
                            break
                        }
                    }
                },
                highlight: function(b) {
                    var c = this.findHighlightableChoices();
                    return 0 === arguments.length ? p(c.filter(".select2-highlighted")[0], c.get()) : ((b = b >= c.length ? c.length - 1 : b) < 0 && (b = 0),
                        this.removeHighlight(),
                        (c = a(c[b])).addClass("select2-highlighted"),
                        this.search.attr("aria-activedescendant", c.find(".select2-result-label").attr("id")),
                        this.ensureHighlightVisible(),
                        this.liveRegion.text(c.text()),
                        void ((b = c.data("select2-data")) && this.opts.element.trigger({
                            type: "select2-highlight",
                            val: this.id(b),
                            choice: b
                        })))
                },
                removeHighlight: function() {
                    this.results.find(".select2-highlighted").removeClass("select2-highlighted")
                },
                touchMoved: function() {
                    this._touchMoved = !0
                },
                clearTouchMoved: function() {
                    this._touchMoved = !1
                },
                countSelectableResults: function() {
                    return this.findHighlightableChoices().length
                },
                highlightUnderEvent: function(b) {
                    var d, b = a(b.target).closest(".select2-result-selectable");
                    0 < b.length && !b.is(".select2-highlighted") ? (d = this.findHighlightableChoices(),
                        this.highlight(d.index(b))) : 0 == b.length && this.removeHighlight()
                },
                loadMoreIfNeeded: function() {
                    var a = this.results
                        , b = a.find("li.select2-more-results")
                        , d = this.resultsPage + 1
                        , e = this
                        , f = this.search.val()
                        , g = this.context;
                    0 === b.length || b.offset().top - a.offset().top - a.height() <= this.opts.loadMorePadding && (b.addClass("select2-active"),
                        this.opts.query({
                            element: this.opts.element,
                            term: f,
                            page: d,
                            context: g,
                            matcher: this.opts.matcher,
                            callback: this.bind(function(c) {
                                e.opened() && (e.opts.populateResults.call(this, a, c.results, {
                                    term: f,
                                    page: d,
                                    context: g
                                }),
                                    e.postprocessResults(c, !1, !1),
                                    !0 === c.more ? (b.detach().appendTo(a).html(e.opts.escapeMarkup(K(e.opts.formatLoadMore, e.opts.element, d + 1))),
                                        window.setTimeout(function() {
                                            e.loadMoreIfNeeded()
                                        }, 10)) : b.remove(),
                                    e.positionDropdown(),
                                    e.resultsPage = d,
                                    e.context = c.context,
                                    this.opts.element.trigger({
                                        type: "select2-loaded",
                                        items: c
                                    }))
                            })
                        }))
                },
                tokenize: function() {},
                updateResults: function(c) {
                    function m() {
                        d.removeClass("select2-active"),
                            h.positionDropdown(),
                            e.find(".select2-no-results,.select2-selection-limit,.select2-searching").length ? h.liveRegion.text(e.text()) : h.liveRegion.text(h.opts.formatMatches(e.find('.select2-result-selectable:not(".select2-selected")').length))
                    }
                    function n(a) {
                        e.html(a),
                            m()
                    }
                    var d = this.search
                        , e = this.results
                        , f = this.opts
                        , h = this
                        , j = d.val()
                        , k = a.data(this.container, "select2-last-term");
                    if ((!0 === c || !k || !r(j, k)) && (a.data(this.container, "select2-last-term", j),
                    !0 === c || !1 !== this.showSearchInput && this.opened())) {
                        var l = ++this.queryCount
                            , k = this.getMaximumSelectionSize();
                        if (!(1 <= k && (j = this.data(),
                        a.isArray(j) && j.length >= k && J(f.formatSelectionTooBig, "formatSelectionTooBig"))))
                            return d.val().length < f.minimumInputLength ? (n(J(f.formatInputTooShort, "formatInputTooShort") ? "<li class='select2-no-results'>" + K(f.formatInputTooShort, f.element, d.val(), f.minimumInputLength) + "</li>" : ""),
                                void (c && this.showSearch && this.showSearch(!0))) : void (f.maximumInputLength && d.val().length > f.maximumInputLength ? n(J(f.formatInputTooLong, "formatInputTooLong") ? "<li class='select2-no-results'>" + K(f.formatInputTooLong, f.element, d.val(), f.maximumInputLength) + "</li>" : "") : (f.formatSearching && 0 === this.findHighlightableChoices().length && n("<li class='select2-searching'>" + K(f.formatSearching, f.element) + "</li>"),
                                d.addClass("select2-active"),
                                this.removeHighlight(),
                            (j = this.tokenize()) != b && null != j && d.val(j),
                                this.resultsPage = 1,
                                f.query({
                                    element: f.element,
                                    term: d.val(),
                                    page: this.resultsPage,
                                    context: null,
                                    matcher: f.matcher,
                                    callback: this.bind(function(g) {
                                        var i;
                                        if (l == this.queryCount)
                                            if (this.opened()) {
                                                if (g.hasError === b || !J(f.formatAjaxError, "formatAjaxError"))
                                                    return this.context = g.context === b ? null : g.context,
                                                    this.opts.createSearchChoice && "" !== d.val() && ((i = this.opts.createSearchChoice.call(h, d.val(), g.results)) !== b && null !== i && h.id(i) !== b && null !== h.id(i) && 0 === a(g.results).filter(function() {
                                                        return r(h.id(this), h.id(i))
                                                    }).length && this.opts.createSearchChoicePosition(g.results, i)),
                                                        0 === g.results.length && J(f.formatNoMatches, "formatNoMatches") ? (n("<li class='select2-no-results'>" + K(f.formatNoMatches, f.element, d.val()) + "</li>"),
                                                            void (this.showSearch && this.showSearch(d.val()))) : (e.empty(),
                                                            h.opts.populateResults.call(this, e, g.results, {
                                                                term: d.val(),
                                                                page: this.resultsPage,
                                                                context: null
                                                            }),
                                                        !0 === g.more && J(f.formatLoadMore, "formatLoadMore") && (e.append("<li class='select2-more-results'>" + f.escapeMarkup(K(f.formatLoadMore, f.element, this.resultsPage)) + "</li>"),
                                                            window.setTimeout(function() {
                                                                h.loadMoreIfNeeded()
                                                            }, 10)),
                                                            this.postprocessResults(g, c),
                                                            m(),
                                                            void this.opts.element.trigger({
                                                                type: "select2-loaded",
                                                                items: g
                                                            }));
                                                n("<li class='select2-ajax-error'>" + K(f.formatAjaxError, f.element, g.jqXHR, g.textStatus, g.errorThrown) + "</li>")
                                            } else
                                                this.search.removeClass("select2-active")
                                    })
                                })));
                        n("<li class='select2-selection-limit'>" + K(f.formatSelectionTooBig, f.element, k) + "</li>")
                    }
                },
                cancel: function() {
                    this.close()
                },
                blur: function() {
                    this.opts.selectOnBlur && this.selectHighlighted({
                        noFocus: !0
                    }),
                        this.close(),
                        this.container.removeClass("select2-container-active"),
                    this.search[0] === document.activeElement && this.search.blur(),
                        this.clearSearch(),
                        this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")
                },
                focusSearch: function() {
                    var a;
                    (a = this.search)[0] !== document.activeElement && window.setTimeout(function() {
                        var b = a[0]
                            , c = a.val().length;
                        a.focus(),
                        (0 < b.offsetWidth || 0 < b.offsetHeight) && b === document.activeElement && (b.setSelectionRange ? b.setSelectionRange(c, c) : b.createTextRange && ((c = b.createTextRange()).collapse(!1),
                            c.select()))
                    }, 0)
                },
                selectHighlighted: function(a) {
                    var b, d;
                    this._touchMoved ? this.clearTouchMoved() : (b = this.highlight(),
                        (d = this.results.find(".select2-highlighted").closest(".select2-result").data("select2-data")) ? (this.highlight(b),
                            this.onSelect(d, a)) : a && a.noFocus && this.close())
                },
                getPlaceholder: function() {
                    var a;
                    return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder || ((a = this.getPlaceholderOption()) !== b ? a.text() : b)
                },
                getPlaceholderOption: function() {
                    var c;
                    if (this.select)
                        return c = this.select.children("option").first(),
                            this.opts.placeholderOption !== b ? "first" === this.opts.placeholderOption && c || "function" == typeof this.opts.placeholderOption && this.opts.placeholderOption(this.select) : "" === a.trim(c.text()) && "" === c.val() ? c : void 0
                },
                initContainerWidth: function() {
                    var c = function() {
                        var b, c, d, e, f;
                        if ("off" === this.opts.width)
                            return null;
                        if ("element" === this.opts.width)
                            return 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px";
                        if ("copy" !== this.opts.width && "resolve" !== this.opts.width)
                            return a.isFunction(this.opts.width) ? this.opts.width() : this.opts.width;
                        if ("string" == typeof (b = this.opts.element.attr("style")))
                            for (e = 0,
                                     f = (c = b.split(";")).length; e < f; e += 1)
                                if (null !== (d = c[e].replace(/\s/g, "").match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i)) && 1 <= d.length)
                                    return d[1];
                        return "resolve" === this.opts.width ? 0 < (b = this.opts.element.css("width")).indexOf("%") ? b : 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px" : null
                    }
                        .call(this);
                    null !== c && this.container.css("width", c)
                }
            }),
            d = O(c, {
                createContainer: function() {
                    return a(document.createElement("div")).attr({
                        class: "select2-container"
                    }).html(["<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>", "   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>", "   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>", "</a>", "<label for='' class='select2-offscreen'></label>", "<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />", "<div class='select2-drop select2-display-none'>", "   <div class='select2-search'>", "       <label for='' class='select2-offscreen'></label>", "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'", "       aria-autocomplete='list' />", "   </div>", "   <ul class='select2-results' role='listbox'>", "   </ul>", "</div>"].join(""))
                },
                enableInterface: function() {
                    this.parent.enableInterface.apply(this, arguments) && this.focusser.prop("disabled", !this.isInterfaceEnabled())
                },
                opening: function() {
                    var b, c;
                    0 <= this.opts.minimumResultsForSearch && this.showSearch(!0),
                        this.parent.opening.apply(this, arguments),
                    !1 !== this.showSearchInput && this.search.val(this.focusser.val()),
                    this.opts.shouldFocusInput(this) && (this.search.focus(),
                        (b = this.search.get(0)).createTextRange ? ((c = b.createTextRange()).collapse(!1),
                            c.select()) : b.setSelectionRange && (c = this.search.val().length,
                            b.setSelectionRange(c, c))),
                        this.prefillNextSearchTerm(),
                        this.focusser.prop("disabled", !0).val(""),
                        this.updateResults(!0),
                        this.opts.element.trigger(a.Event("select2-open"))
                },
                close: function() {
                    this.opened() && (this.parent.close.apply(this, arguments),
                        this.focusser.prop("disabled", !1),
                    this.opts.shouldFocusInput(this) && this.focusser.focus())
                },
                focus: function() {
                    this.opened() ? this.close() : (this.focusser.prop("disabled", !1),
                    this.opts.shouldFocusInput(this) && this.focusser.focus())
                },
                isFocused: function() {
                    return this.container.hasClass("select2-container-active")
                },
                cancel: function() {
                    this.parent.cancel.apply(this, arguments),
                        this.focusser.prop("disabled", !1),
                    this.opts.shouldFocusInput(this) && this.focusser.focus()
                },
                destroy: function() {
                    a("label[for='" + this.focusser.attr("id") + "']").attr("for", this.opts.element.attr("id")),
                        this.parent.destroy.apply(this, arguments),
                        N.call(this, "selection", "focusser")
                },
                initContainer: function() {
                    var b, c = this.container, d = this.dropdown, e = f(), e = (this.opts.minimumResultsForSearch < 0 ? this.showSearch(!1) : this.showSearch(!0),
                        this.selection = b = c.find(".select2-choice"),
                        this.focusser = c.find(".select2-focusser"),
                        b.find(".select2-chosen").attr("id", "select2-chosen-" + e),
                        this.focusser.attr("aria-labelledby", "select2-chosen-" + e),
                        this.results.attr("id", "select2-results-" + e),
                        this.search.attr("aria-owns", "select2-results-" + e),
                        this.focusser.attr("id", "s2id_autogen" + e),
                        c = a("label[for='" + this.opts.element.attr("id") + "']"),
                        this.opts.element.on("focus.select2", this.bind(function() {
                            this.focus()
                        })),
                        this.focusser.prev().text(c.text()).attr("for", this.focusser.attr("id")),
                        this.opts.element.attr("title"));
                    this.opts.element.attr("title", e || c.text()),
                        this.focusser.attr("tabindex", this.elementTabIndex),
                        this.search.attr("id", this.focusser.attr("id") + "_search"),
                        this.search.prev().text(a("label[for='" + this.focusser.attr("id") + "']").text()).attr("for", this.search.attr("id")),
                        this.search.on("keydown", this.bind(function(a) {
                            if (this.isInterfaceEnabled() && 229 != a.keyCode)
                                if (a.which === k.PAGE_UP || a.which === k.PAGE_DOWN)
                                    A(a);
                                else
                                    switch (a.which) {
                                        case k.UP:
                                        case k.DOWN:
                                            return this.moveHighlight(a.which === k.UP ? -1 : 1),
                                                void A(a);
                                        case k.ENTER:
                                            return this.selectHighlighted(),
                                                void A(a);
                                        case k.TAB:
                                            return void this.selectHighlighted({
                                                noFocus: !0
                                            });
                                        case k.ESC:
                                            return this.cancel(a),
                                                void A(a)
                                    }
                        })),
                        this.search.on("blur", this.bind(function(a) {
                            document.activeElement === this.body.get(0) && window.setTimeout(this.bind(function() {
                                this.opened() && this.results && 1 < this.results.length && this.search.focus()
                            }), 0)
                        })),
                        this.focusser.on("keydown", this.bind(function(a) {
                            if (this.isInterfaceEnabled() && a.which !== k.TAB && !k.isControl(a) && !k.isFunctionKey(a) && a.which !== k.ESC) {
                                if (!1 !== this.opts.openOnEnter || a.which !== k.ENTER)
                                    return a.which == k.DOWN || a.which == k.UP || a.which == k.ENTER && this.opts.openOnEnter ? a.altKey || a.ctrlKey || a.shiftKey || a.metaKey ? void 0 : (this.open(),
                                        void A(a)) : a.which == k.DELETE || a.which == k.BACKSPACE ? (this.opts.allowClear && this.clear(),
                                        void A(a)) : void 0;
                                A(a)
                            }
                        })),
                        u(this.focusser),
                        this.focusser.on("keyup-change input", this.bind(function(a) {
                            0 <= this.opts.minimumResultsForSearch && (a.stopPropagation(),
                            this.opened() || this.open())
                        })),
                        b.on("mousedown touchstart", "abbr", this.bind(function(a) {
                            this.isInterfaceEnabled() && (this.clear(),
                                function(a) {
                                    a.preventDefault(),
                                        a.stopImmediatePropagation()
                                }(a),
                                this.close(),
                            this.selection && this.selection.focus())
                        })),
                        b.on("mousedown touchstart", this.bind(function(c) {
                            n(b),
                            this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")),
                                this.opened() ? this.close() : this.isInterfaceEnabled() && this.open(),
                                A(c)
                        })),
                        d.on("mousedown touchstart", this.bind(function() {
                            this.opts.shouldFocusInput(this) && this.search.focus()
                        })),
                        b.on("focus", this.bind(function(a) {
                            A(a)
                        })),
                        this.focusser.on("focus", this.bind(function() {
                            this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")),
                                this.container.addClass("select2-container-active")
                        })).on("blur", this.bind(function() {
                            this.opened() || (this.container.removeClass("select2-container-active"),
                                this.opts.element.trigger(a.Event("select2-blur")))
                        })),
                        this.search.on("focus", this.bind(function() {
                            this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")),
                                this.container.addClass("select2-container-active")
                        })),
                        this.initContainerWidth(),
                        this.opts.element.hide(),
                        this.setPlaceholder()
                },
                clear: function(b) {
                    var d, c = this.selection.data("select2-data");
                    c && (d = a.Event("select2-clearing"),
                        this.opts.element.trigger(d),
                    d.isDefaultPrevented() || (d = this.getPlaceholderOption(),
                        this.opts.element.val(d ? d.val() : ""),
                        this.selection.find(".select2-chosen").empty(),
                        this.selection.removeData("select2-data"),
                        this.setPlaceholder(),
                    !1 !== b && (this.opts.element.trigger({
                        type: "select2-removed",
                        val: this.id(c),
                        choice: c
                    }),
                        this.triggerChange({
                            removed: c
                        }))))
                },
                initSelection: function() {
                    var c;
                    this.isPlaceholderOptionSelected() ? (this.updateSelection(null),
                        this.close(),
                        this.setPlaceholder()) : (c = this).opts.initSelection.call(null, this.opts.element, function(a) {
                        a !== b && null !== a && (c.updateSelection(a),
                            c.close(),
                            c.setPlaceholder(),
                            c.lastSearchTerm = c.search.val())
                    })
                },
                isPlaceholderOptionSelected: function() {
                    var a;
                    return this.getPlaceholder() !== b && ((a = this.getPlaceholderOption()) !== b && a.prop("selected") || "" === this.opts.element.val() || this.opts.element.val() === b || null === this.opts.element.val())
                },
                prepareOpts: function() {
                    var b = this.parent.prepareOpts.apply(this, arguments)
                        , c = this;
                    return "select" === b.element.get(0).tagName.toLowerCase() ? b.initSelection = function(a, b) {
                            a = a.find("option").filter(function() {
                                return this.selected && !this.disabled
                            });
                            b(c.optionToData(a))
                        }
                        : "data"in b && (b.initSelection = b.initSelection || function(c, d) {
                            var e = c.val()
                                , f = null;
                            b.query({
                                matcher: function(a, c, d) {
                                    var g = r(e, b.id(d));
                                    return g && (f = d),
                                        g
                                },
                                callback: a.isFunction(d) ? function() {
                                        d(f)
                                    }
                                    : a.noop
                            })
                        }
                    ),
                        b
                },
                getPlaceholder: function() {
                    return this.select && this.getPlaceholderOption() === b ? b : this.parent.getPlaceholder.apply(this, arguments)
                },
                setPlaceholder: function() {
                    var a = this.getPlaceholder();
                    !this.isPlaceholderOptionSelected() || a === b || this.select && this.getPlaceholderOption() === b || (this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(a)),
                        this.selection.addClass("select2-default"),
                        this.container.removeClass("select2-allowclear"))
                },
                postprocessResults: function(a, b, c) {
                    var d = 0
                        , e = this;
                    this.findHighlightableChoices().each2(function(a, b) {
                        return r(e.id(b.data("select2-data")), e.opts.element.val()) ? (d = a,
                            !1) : void 0
                    }),
                    !1 !== c && (!0 === b && 0 <= d ? this.highlight(d) : this.highlight(0)),
                    !0 === b && 0 <= (c = this.opts.minimumResultsForSearch) && this.showSearch(L(a.results) >= c)
                },
                showSearch: function(b) {
                    this.showSearchInput !== b && (this.showSearchInput = b,
                        this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !b),
                        this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !b),
                        a(this.dropdown, this.container).toggleClass("select2-with-searchbox", b))
                },
                onSelect: function(a, b) {
                    var c, d;
                    this.triggerSelect(a) && (c = this.opts.element.val(),
                        d = this.data(),
                        this.opts.element.val(this.id(a)),
                        this.updateSelection(a),
                        this.opts.element.trigger({
                            type: "select2-selected",
                            val: this.id(a),
                            choice: a
                        }),
                        this.lastSearchTerm = this.search.val(),
                        this.close(),
                    b && b.noFocus || !this.opts.shouldFocusInput(this) || this.focusser.focus(),
                    r(c, this.id(a)) || this.triggerChange({
                        added: a,
                        removed: d
                    }))
                },
                updateSelection: function(a) {
                    var d, c = this.selection.find(".select2-chosen");
                    this.selection.data("select2-data", a),
                        c.empty(),
                    (d = null !== a ? this.opts.formatSelection(a, c, this.opts.escapeMarkup) : d) !== b && c.append(d),
                    (d = this.opts.formatSelectionCssClass(a, c)) !== b && c.addClass(d),
                        this.selection.removeClass("select2-default"),
                    this.opts.allowClear && this.getPlaceholder() !== b && this.container.addClass("select2-allowclear")
                },
                val: function() {
                    var a, c = !1, d = null, e = this, f = this.data();
                    if (0 === arguments.length)
                        return this.opts.element.val();
                    if (a = arguments[0],
                    1 < arguments.length && (c = arguments[1],
                    this.opts.debug && console && console.warn && console.warn('Select2: The second option to `select2("val")` is not supported in Select2 4.0.0. The `change` event will always be triggered in 4.0.0.')),
                        this.select)
                        this.opts.debug && console && console.warn && console.warn('Select2: Setting the value on a <select> using `select2("val")` is no longer supported in 4.0.0. You can use the `.val(newValue).trigger("change")` method provided by jQuery instead.'),
                            this.select.val(a).find("option").filter(function() {
                                return this.selected
                            }).each2(function(a, b) {
                                return d = e.optionToData(b),
                                    !1
                            }),
                            this.updateSelection(d),
                            this.setPlaceholder(),
                        c && this.triggerChange({
                            added: d,
                            removed: f
                        });
                    else if (a || 0 === a) {
                        if (this.opts.initSelection === b)
                            throw new Error("cannot call val() if initSelection() is not defined");
                        this.opts.element.val(a),
                            this.opts.initSelection(this.opts.element, function(a) {
                                e.opts.element.val(a ? e.id(a) : ""),
                                    e.updateSelection(a),
                                    e.setPlaceholder(),
                                c && e.triggerChange({
                                    added: a,
                                    removed: f
                                })
                            })
                    } else
                        this.clear(c)
                },
                clearSearch: function() {
                    this.search.val(""),
                        this.focusser.val("")
                },
                data: function(a) {
                    var c, d = !1;
                    return 0 === arguments.length ? c = (c = this.selection.data("select2-data")) == b ? null : c : (this.opts.debug && console && console.warn && console.warn('Select2: The `select2("data")` method can no longer set selected values in 4.0.0, consider using the `.val()` method instead.'),
                    1 < arguments.length && (d = arguments[1]),
                        void (a ? (c = this.data(),
                            this.opts.element.val(a ? this.id(a) : ""),
                            this.updateSelection(a),
                        d && this.triggerChange({
                            added: a,
                            removed: c
                        })) : this.clear(d)))
                }
            }),
            e = O(c, {
                createContainer: function() {
                    return a(document.createElement("div")).attr({
                        class: "select2-container select2-container-multi"
                    }).html(["<ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <label for='' class='select2-offscreen'></label>", "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi select2-display-none'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""))
                },
                prepareOpts: function() {
                    var b = this.parent.prepareOpts.apply(this, arguments)
                        , c = this;
                    return "select" === b.element.get(0).tagName.toLowerCase() ? b.initSelection = function(a, b) {
                            var d = [];
                            a.find("option").filter(function() {
                                return this.selected && !this.disabled
                            }).each2(function(a, b) {
                                d.push(c.optionToData(b))
                            }),
                                b(d)
                        }
                        : "data"in b && (b.initSelection = b.initSelection || function(c, d) {
                            var e = s(c.val(), b.separator, b.transformVal)
                                , f = [];
                            b.query({
                                matcher: function(c, d, g) {
                                    var h = a.grep(e, function(a) {
                                        return r(a, b.id(g))
                                    }).length;
                                    return h && f.push(g),
                                        h
                                },
                                callback: a.isFunction(d) ? function() {
                                        for (var a = [], c = 0; c < e.length; c++)
                                            for (var g = e[c], h = 0; h < f.length; h++) {
                                                var i = f[h];
                                                if (r(g, b.id(i))) {
                                                    a.push(i),
                                                        f.splice(h, 1);
                                                    break
                                                }
                                            }
                                        d(a)
                                    }
                                    : a.noop
                            })
                        }
                    ),
                        b
                },
                selectChoice: function(a) {
                    var b = this.container.find(".select2-search-choice-focus");
                    b.length && a && a[0] == b[0] || (b.length && this.opts.element.trigger("choice-deselected", b),
                        b.removeClass("select2-search-choice-focus"),
                    a && a.length && (this.close(),
                        a.addClass("select2-search-choice-focus"),
                        this.opts.element.trigger("choice-selected", a)))
                },
                destroy: function() {
                    a("label[for='" + this.search.attr("id") + "']").attr("for", this.opts.element.attr("id")),
                        this.parent.destroy.apply(this, arguments),
                        N.call(this, "searchContainer", "selection")
                },
                initContainer: function() {
                    var c, b = ".select2-choices", d = (this.searchContainer = this.container.find(".select2-search-field"),
                        this.selection = c = this.container.find(b),
                        this);
                    this.selection.on("click", ".select2-container:not(.select2-container-disabled) .select2-search-choice:not(.select2-locked)", function(b) {
                        d.search[0].focus(),
                            d.selectChoice(a(this))
                    }),
                        this.search.attr("id", "s2id_autogen" + f()),
                        this.search.prev().text(a("label[for='" + this.opts.element.attr("id") + "']").text()).attr("for", this.search.attr("id")),
                        this.opts.element.on("focus.select2", this.bind(function() {
                            this.focus()
                        })),
                        this.search.on("input paste", this.bind(function() {
                            this.search.attr("placeholder") && 0 == this.search.val().length || this.isInterfaceEnabled() && !this.opened() && this.open()
                        })),
                        this.search.attr("tabindex", this.elementTabIndex),
                        this.keydowns = 0,
                        this.search.on("keydown", this.bind(function(a) {
                            if (this.isInterfaceEnabled()) {
                                ++this.keydowns;
                                var g, b = c.find(".select2-search-choice-focus"), d = b.prev(".select2-search-choice:not(.select2-locked)"), e = b.next(".select2-search-choice:not(.select2-locked)"), f = z(this.search);
                                if (b.length && (a.which == k.LEFT || a.which == k.RIGHT || a.which == k.BACKSPACE || a.which == k.DELETE || a.which == k.ENTER))
                                    return g = b,
                                        a.which == k.LEFT && d.length ? g = d : a.which == k.RIGHT ? g = e.length ? e : null : a.which === k.BACKSPACE ? this.unselect(b.first()) && (this.search.width(10),
                                            g = d.length ? d : e) : a.which == k.DELETE ? this.unselect(b.first()) && (this.search.width(10),
                                            g = e.length ? e : null) : a.which == k.ENTER && (g = null),
                                        this.selectChoice(g),
                                        A(a),
                                        void (g && g.length || this.open());
                                if ((a.which === k.BACKSPACE && 1 == this.keydowns || a.which == k.LEFT) && 0 == f.offset && !f.length)
                                    return this.selectChoice(c.find(".select2-search-choice:not(.select2-locked)").last()),
                                        void A(a);
                                if (this.selectChoice(null),
                                    this.opened())
                                    switch (a.which) {
                                        case k.UP:
                                        case k.DOWN:
                                            return this.moveHighlight(a.which === k.UP ? -1 : 1),
                                                void A(a);
                                        case k.ENTER:
                                            return this.selectHighlighted(),
                                                void A(a);
                                        case k.TAB:
                                            return this.selectHighlighted({
                                                noFocus: !0
                                            }),
                                                void this.close();
                                        case k.ESC:
                                            return this.cancel(a),
                                                void A(a)
                                    }
                                if (a.which !== k.TAB && !k.isControl(a) && !k.isFunctionKey(a) && a.which !== k.BACKSPACE && a.which !== k.ESC) {
                                    if (a.which === k.ENTER) {
                                        if (!1 === this.opts.openOnEnter)
                                            return;
                                        if (a.altKey || a.ctrlKey || a.shiftKey || a.metaKey)
                                            return
                                    }
                                    this.open(),
                                    a.which !== k.PAGE_UP && a.which !== k.PAGE_DOWN || A(a),
                                    a.which === k.ENTER && A(a)
                                }
                            }
                        })),
                        this.search.on("keyup", this.bind(function(a) {
                            this.keydowns = 0,
                                this.resizeSearch()
                        })),
                        this.search.on("blur", this.bind(function(b) {
                            this.container.removeClass("select2-container-active"),
                                this.search.removeClass("select2-focused"),
                                this.selectChoice(null),
                            this.opened() || this.clearSearch(),
                                b.stopImmediatePropagation(),
                                this.opts.element.trigger(a.Event("select2-blur"))
                        })),
                        this.container.on("click", b, this.bind(function(b) {
                            !this.isInterfaceEnabled() || 0 < a(b.target).closest(".select2-search-choice").length || (this.selectChoice(null),
                                this.clearPlaceholder(),
                            this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")),
                                this.open(),
                                this.focusSearch(),
                                b.preventDefault())
                        })),
                        this.container.on("focus", b, this.bind(function() {
                            this.isInterfaceEnabled() && (this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")),
                                this.container.addClass("select2-container-active"),
                                this.dropdown.addClass("select2-drop-active"),
                                this.clearPlaceholder())
                        })),
                        this.initContainerWidth(),
                        this.opts.element.hide(),
                        this.clearSearch()
                },
                enableInterface: function() {
                    this.parent.enableInterface.apply(this, arguments) && this.search.prop("disabled", !this.isInterfaceEnabled())
                },
                initSelection: function() {
                    var c;
                    "" === this.opts.element.val() && "" === this.opts.element.text() && (this.updateSelection([]),
                        this.close(),
                        this.clearSearch()),
                    !this.select && "" === this.opts.element.val() || (c = this).opts.initSelection.call(null, this.opts.element, function(a) {
                        a !== b && null !== a && (c.updateSelection(a),
                            c.close(),
                            c.clearSearch())
                    })
                },
                clearSearch: function() {
                    var a = this.getPlaceholder()
                        , c = this.getMaxSearchWidth();
                    a !== b && 0 === this.getVal().length && !1 === this.search.hasClass("select2-focused") ? (this.search.val(a).addClass("select2-default"),
                        this.search.width(0 < c ? c : this.container.css("width"))) : this.search.val("").width(10)
                },
                clearPlaceholder: function() {
                    this.search.hasClass("select2-default") && this.search.val("").removeClass("select2-default")
                },
                opening: function() {
                    this.clearPlaceholder(),
                        this.resizeSearch(),
                        this.parent.opening.apply(this, arguments),
                        this.focusSearch(),
                        this.prefillNextSearchTerm(),
                        this.updateResults(!0),
                    this.opts.shouldFocusInput(this) && this.search.focus(),
                        this.opts.element.trigger(a.Event("select2-open"))
                },
                close: function() {
                    this.opened() && this.parent.close.apply(this, arguments)
                },
                focus: function() {
                    this.close(),
                        this.search.focus()
                },
                isFocused: function() {
                    return this.search.hasClass("select2-focused")
                },
                updateSelection: function(b) {
                    var c = {}
                        , d = []
                        , e = this;
                    a(b).each(function() {
                        e.id(this)in c || (c[e.id(this)] = 0,
                            d.push(this))
                    }),
                        this.selection.find(".select2-search-choice").remove(),
                        this.addSelectedChoice(d),
                        e.postprocessResults()
                },
                tokenize: function() {
                    var a = this.search.val();
                    null != (a = this.opts.tokenizer.call(this, a, this.data(), this.bind(this.onSelect), this.opts)) && a != b && (this.search.val(a),
                    0 < a.length && this.open())
                },
                onSelect: function(a, b) {
                    this.triggerSelect(a) && "" !== a.text && (this.addSelectedChoice(a),
                        this.opts.element.trigger({
                            type: "selected",
                            val: this.id(a),
                            choice: a
                        }),
                        this.lastSearchTerm = this.search.val(),
                        this.clearSearch(),
                        this.updateResults(),
                    !this.select && this.opts.closeOnSelect || this.postprocessResults(a, !1, !0 === this.opts.closeOnSelect),
                        !this.opts.closeOnSelect && 0 < this.countSelectableResults() ? (this.search.width(10),
                            this.resizeSearch(),
                            0 < this.getMaximumSelectionSize() && this.val().length >= this.getMaximumSelectionSize() ? this.updateResults(!0) : this.prefillNextSearchTerm() && this.updateResults(),
                            this.positionDropdown()) : (this.close(),
                            this.search.width(10)),
                        this.triggerChange({
                            added: a
                        }),
                    b && b.noFocus || this.focusSearch())
                },
                cancel: function() {
                    this.close(),
                        this.focusSearch()
                },
                addSelectedChoice: function(b) {
                    var c = this.getVal()
                        , d = this;
                    a(b).each(function() {
                        c.push(d.createChoice(this))
                    }),
                        this.setVal(c)
                },
                createChoice: function(c) {
                    var d = !c.locked
                        , e = a("<li class='select2-search-choice'>    <div></div>    <a href='#' class='select2-search-choice-close' tabindex='-1'></a></li>")
                        , f = a("<li class='select2-search-choice select2-locked'><div></div></li>")
                        , e = d ? e : f
                        , f = this.id(c)
                        , i = this.opts.formatSelection(c, e.find("div"), this.opts.escapeMarkup);
                    return i != b && e.find("div").replaceWith(a("<div></div>").html(i)),
                    (i = this.opts.formatSelectionCssClass(c, e.find("div"))) != b && e.addClass(i),
                    d && e.find(".select2-search-choice-close").on("mousedown", A).on("click dblclick", this.bind(function(b) {
                        this.isInterfaceEnabled() && (this.unselect(a(b.target)),
                            this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"),
                            A(b),
                            this.close(),
                            this.focusSearch())
                    })).on("focus", this.bind(function() {
                        this.isInterfaceEnabled() && (this.container.addClass("select2-container-active"),
                            this.dropdown.addClass("select2-drop-active"))
                    })),
                        e.data("select2-data", c),
                        e.insertBefore(this.searchContainer),
                        f
                },
                unselect: function(b) {
                    var d, e, c = this.getVal();
                    if (0 === (b = b.closest(".select2-search-choice")).length)
                        throw "Invalid argument: " + b + ". Must be .select2-search-choice";
                    if (d = b.data("select2-data")) {
                        var f = a.Event("select2-removing");
                        if (f.val = this.id(d),
                            f.choice = d,
                            this.opts.element.trigger(f),
                            f.isDefaultPrevented())
                            return !1;
                        for (; 0 <= (e = p(this.id(d), c)); )
                            c.splice(e, 1),
                                this.setVal(c),
                            this.select && this.postprocessResults();
                        return b.remove(),
                            this.opts.element.trigger({
                                type: "select2-removed",
                                val: this.id(d),
                                choice: d
                            }),
                            this.triggerChange({
                                removed: d
                            }),
                            !0
                    }
                },
                postprocessResults: function(a, b, c) {
                    var d = this.getVal()
                        , e = this.results.find(".select2-result")
                        , f = this.results.find(".select2-result-with-children")
                        , g = this;
                    e.each2(function(a, b) {
                        0 <= p(g.id(b.data("select2-data")), d) && (b.addClass("select2-selected"),
                            b.find(".select2-result-selectable").addClass("select2-selected"))
                    }),
                        f.each2(function(a, b) {
                            b.is(".select2-result-selectable") || 0 !== b.find(".select2-result-selectable:not(.select2-selected)").length || b.addClass("select2-selected")
                        }),
                    -1 == this.highlight() && !1 !== c && !0 === this.opts.closeOnSelect && g.highlight(0),
                    !this.opts.createSearchChoice && 0 < !e.filter(".select2-result:not(.select2-selected)").length && (!a || !a.more && 0 === this.results.find(".select2-no-results").length) && J(g.opts.formatNoMatches, "formatNoMatches") && this.results.append("<li class='select2-no-results'>" + K(g.opts.formatNoMatches, g.opts.element, g.search.val()) + "</li>")
                },
                getMaxSearchWidth: function() {
                    return this.selection.width() - t(this.search)
                },
                resizeSearch: function() {
                    var f = t(this.search)
                        , a = C(this.search) + 10
                        , b = this.search.offset().left
                        , c = this.selection.width()
                        , b = c - (b - this.selection.offset().left) - f;
                    (b = (b = b < a ? c - f : b) < 40 ? c - f : b) <= 0 && (b = a),
                        this.search.width(Math.floor(b))
                },
                getVal: function() {
                    var a;
                    return this.select ? null === (a = this.select.val()) ? [] : a : s(a = this.opts.element.val(), this.opts.separator, this.opts.transformVal)
                },
                setVal: function(b) {
                    var c, d;
                    this.select ? this.select.val(b) : (c = [],
                        d = {},
                        a(b).each(function() {
                            this in d || (c.push(this),
                                d[this] = 0)
                        }),
                        this.opts.element.val(0 === c.length ? "" : c.join(this.opts.separator)))
                },
                buildChangeDetails: function(a, b) {
                    for (var b = b.slice(0), a = a.slice(0), c = 0; c < b.length; c++)
                        for (var d = 0; d < a.length; d++)
                            if (r(this.opts.id(b[c]), this.opts.id(a[d]))) {
                                b.splice(c, 1),
                                    c--,
                                    a.splice(d, 1);
                                break
                            }
                    return {
                        added: b,
                        removed: a
                    }
                },
                val: function(c, d) {
                    var e, f = this;
                    if (0 === arguments.length)
                        return this.getVal();
                    if ((e = this.data()).length || (e = []),
                    !c && 0 !== c)
                        return this.opts.element.val(""),
                            this.updateSelection([]),
                            this.clearSearch(),
                            void (d && this.triggerChange({
                                added: this.data(),
                                removed: e
                            }));
                    if (this.setVal(c),
                        this.select)
                        this.opts.initSelection(this.select, this.bind(this.updateSelection)),
                        d && this.triggerChange(this.buildChangeDetails(e, this.data()));
                    else {
                        if (this.opts.initSelection === b)
                            throw new Error("val() cannot be called if initSelection() is not defined");
                        this.opts.initSelection(this.opts.element, function(b) {
                            var c = a.map(b, f.id);
                            f.setVal(c),
                                f.updateSelection(b),
                                f.clearSearch(),
                            d && f.triggerChange(f.buildChangeDetails(e, f.data()))
                        })
                    }
                    this.clearSearch()
                },
                onSortStart: function() {
                    if (this.select)
                        throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                    this.search.width(0),
                        this.searchContainer.hide()
                },
                onSortEnd: function() {
                    var b = []
                        , c = this;
                    this.searchContainer.show(),
                        this.searchContainer.appendTo(this.searchContainer.parent()),
                        this.resizeSearch(),
                        this.selection.find(".select2-search-choice").each(function() {
                            b.push(c.opts.id(a(this).data("select2-data")))
                        }),
                        this.setVal(b),
                        this.triggerChange()
                },
                data: function(b, c) {
                    var e, f, d = this;
                    return 0 === arguments.length ? this.selection.children(".select2-search-choice").map(function() {
                        return a(this).data("select2-data")
                    }).get() : (f = this.data(),
                        e = a.map(b = b || [], function(a) {
                            return d.opts.id(a)
                        }),
                        this.setVal(e),
                        this.updateSelection(b),
                        this.clearSearch(),
                        void (c && this.triggerChange(this.buildChangeDetails(f, this.data()))))
                }
            }),
            a.fn.select2 = function() {
                var e, d, g, h, c = Array.prototype.slice.call(arguments, 0), i = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "disable", "readonly", "positionDropdown", "data", "search"], j = ["opened", "isFocused", "container", "dropdown"], k = ["val", "data"], l = {
                    search: "externalSearch"
                };
                return this.each(function() {
                    if (0 === c.length || "object" == typeof c[0])
                        (d = 0 === c.length ? {} : a.extend({}, c[0])).element = a(this),
                            "select" === d.element.get(0).tagName.toLowerCase() ? h = d.element.prop("multiple") : (h = d.multiple || !1,
                            "tags"in d && (d.multiple = h = !0)),
                            (e = new (h ? window.Select2.class.multi : window.Select2.class.single)).init(d);
                    else {
                        if ("string" != typeof c[0])
                            throw "Invalid arguments to select2 plugin: " + c;
                        if (p(c[0], i) < 0)
                            throw "Unknown method: " + c[0];
                        if (g = b,
                        (e = a(this).data("select2")) !== b)
                            return d = c[0],
                                g = "container" === d ? e.container : "dropdown" === d ? e.dropdown : e[d = l[d] ? l[d] : d].apply(e, c.slice(1)),
                            !(0 <= p(c[0], j) || 0 <= p(c[0], k) && 1 == c.length) && void 0
                    }
                }),
                    g === b ? this : g
            }
            ,
            a.fn.select2.defaults = {
                debug: !1,
                width: "copy",
                loadMorePadding: 0,
                closeOnSelect: !0,
                openOnEnter: !0,
                containerCss: {},
                dropdownCss: {},
                containerCssClass: "",
                dropdownCssClass: "",
                formatResult: function(a, b, c, d) {
                    var e = [];
                    return E(this.text(a), c.term, e, d),
                        e.join("")
                },
                transformVal: function(b) {
                    return a.trim(b)
                },
                formatSelection: function(a, c, d) {
                    return a ? d(this.text(a)) : b
                },
                sortResults: function(a, b, c) {
                    return a
                },
                formatResultCssClass: function(a) {
                    return a.css
                },
                formatSelectionCssClass: function(a, c) {
                    return b
                },
                minimumResultsForSearch: 0,
                minimumInputLength: 0,
                maximumInputLength: null,
                maximumSelectionSize: 0,
                id: function(a) {
                    return a == b ? null : a.id
                },
                text: function(b) {
                    return b && this.data && this.data.text ? a.isFunction(this.data.text) ? this.data.text(b) : b[this.data.text] : b.text
                },
                matcher: function(a, b) {
                    return 0 <= o("" + b).toUpperCase().indexOf(o("" + a).toUpperCase())
                },
                separator: ",",
                tokenSeparators: [],
                tokenizer: function(a, c, d, e) {
                    var h, i, j, k, l, f = a, g = !1;
                    if (!e.createSearchChoice || !e.tokenSeparators || e.tokenSeparators.length < 1)
                        return b;
                    for (; ; ) {
                        for (i = -1,
                                 j = 0,
                                 k = e.tokenSeparators.length; j < k && (l = e.tokenSeparators[j],
                            !(0 <= (i = a.indexOf(l)))); j++)
                            ;
                        if (i < 0)
                            break;
                        if (h = a.substring(0, i),
                            a = a.substring(i + l.length),
                        0 < h.length && ((h = e.createSearchChoice.call(this, h, c)) !== b && null !== h && e.id(h) !== b && null !== e.id(h))) {
                            for (g = !1,
                                     j = 0,
                                     k = c.length; j < k; j++)
                                if (r(e.id(h), e.id(c[j]))) {
                                    g = !0;
                                    break
                                }
                            g || d(h)
                        }
                    }
                    return f !== a ? a : void 0
                },
                escapeMarkup: F,
                blurOnChange: !1,
                selectOnBlur: !1,
                adaptContainerCssClass: function(a) {
                    return a
                },
                adaptDropdownCssClass: function(a) {
                    return null
                },
                nextSearchTerm: function(a, c) {
                    return b
                },
                searchInputPlaceholder: "",
                createSearchChoicePosition: "top",
                shouldFocusInput: function(a) {
                    return !(("ontouchstart"in window || 0 < navigator.msMaxTouchPoints) && a.opts.minimumResultsForSearch < 0)
                }
            },
            a.fn.select2.locales = [],
            a.fn.select2.locales.en = {
                formatMatches: function(a) {
                    return 1 === a ? "One result is available, press enter to select it." : a + " results are available, use up and down arrow keys to navigate."
                },
                formatNoMatches: function() {
                    return "No matches found"
                },
                formatAjaxError: function(a, b, c) {
                    return "Loading failed"
                },
                formatInputTooShort: function(a, b) {
                    b -= a.length;
                    return "Please enter " + b + " or more character" + (1 == b ? "" : "s")
                },
                formatInputTooLong: function(a, b) {
                    a = a.length - b;
                    return "Please delete " + a + " character" + (1 == a ? "" : "s")
                },
                formatSelectionTooBig: function(a) {
                    return "You can only select " + a + " item" + (1 == a ? "" : "s")
                },
                formatLoadMore: function(a) {
                    return "Loading more results…"
                },
                formatSearching: function() {
                    return "Searching…"
                }
            },
            a.extend(a.fn.select2.defaults, a.fn.select2.locales.en),
            a.fn.select2.ajaxDefaults = {
                transport: a.ajax,
                params: {
                    type: "GET",
                    cache: !1,
                    dataType: "json"
                }
            },
            window.Select2 = {
                query: {
                    ajax: G,
                    local: H,
                    tags: I
                },
                util: {
                    debounce: w,
                    markMatch: E,
                    escapeMarkup: F,
                    stripDiacritics: o
                },
                class: {
                    abstract: c,
                    single: d,
                    multi: e
                }
            })
    }(jQuery),
    !function(a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
    }(function(a) {
        a.extend(a.fn, {
            validate: function(b) {
                var c;
                {
                    if (this.length)
                        return (c = a.data(this[0], "validator")) || (this.attr("novalidate", "novalidate"),
                            c = new a.validator(b,this[0]),
                            a.data(this[0], "validator", c),
                        c.settings.onsubmit && (this.on("click.validate", ":submit", function(b) {
                            c.settings.submitHandler && (c.submitButton = b.target),
                            a(this).hasClass("cancel") && (c.cancelSubmit = !0),
                            void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0)
                        }),
                            this.on("submit.validate", function(b) {
                                function d() {
                                    var d, e;
                                    return !c.settings.submitHandler || (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),
                                        e = c.settings.submitHandler.call(c, c.currentForm, b),
                                    c.submitButton && d.remove(),
                                    void 0 !== e && e)
                                }
                                return c.settings.debug && b.preventDefault(),
                                    c.cancelSubmit ? (c.cancelSubmit = !1,
                                        d()) : c.form() ? c.pendingRequest ? !(c.formSubmitted = !0) : d() : (c.focusInvalid(),
                                        !1)
                            })),
                            c);
                    b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
                }
            },
            valid: function() {
                var b, c, d;
                return a(this[0]).is("form") ? b = this.validate().form() : (d = [],
                    b = !0,
                    c = a(this[0].form).validate(),
                    this.each(function() {
                        b = c.element(this) && b,
                            d = d.concat(c.errorList)
                    }),
                    c.errorList = d),
                    b
            },
            rules: function(b, c) {
                var d, e, f, h, i, j = this[0];
                if (b)
                    switch (d = a.data(j.form, "validator").settings,
                        e = d.rules,
                        f = a.validator.staticRules(j),
                        b) {
                        case "add":
                            a.extend(f, a.validator.normalizeRule(c)),
                                delete f.messages,
                                e[j.name] = f,
                            c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                            break;
                        case "remove":
                            return c ? (i = {},
                                a.each(c.split(/\s/), function(b, c) {
                                    i[c] = f[c],
                                        delete f[c],
                                    "required" === c && a(j).removeAttr("aria-required")
                                }),
                                i) : (delete e[j.name],
                                f)
                    }
                return (b = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j)).required && (h = b.required,
                    delete b.required,
                    b = a.extend({
                        required: h
                    }, b),
                    a(j).attr("aria-required", "true")),
                b.remote && (h = b.remote,
                    delete b.remote,
                    b = a.extend(b, {
                        remote: h
                    })),
                    b
            }
        }),
            a.extend(a.expr[":"], {
                blank: function(b) {
                    return !a.trim("" + a(b).val())
                },
                filled: function(b) {
                    return !!a.trim("" + a(b).val())
                },
                unchecked: function(b) {
                    return !a(b).prop("checked")
                }
            }),
            a.validator = function(b, c) {
                this.settings = a.extend(!0, {}, a.validator.defaults, b),
                    this.currentForm = c,
                    this.init()
            }
            ,
            a.validator.format = function(b, c) {
                return 1 === arguments.length ? function() {
                        var c = a.makeArray(arguments);
                        return c.unshift(b),
                            a.validator.format.apply(this, c)
                    }
                    : ((c = 2 < arguments.length && c.constructor !== Array ? a.makeArray(arguments).slice(1) : c).constructor !== Array && (c = [c]),
                        a.each(c, function(a, c) {
                            b = b.replace(new RegExp("\\{" + a + "\\}","g"), function() {
                                return c
                            })
                        }),
                        b)
            }
            ,
            a.extend(a.validator, {
                defaults: {
                    messages: {},
                    groups: {},
                    rules: {},
                    errorClass: "error",
                    validClass: "valid",
                    errorElement: "label",
                    focusCleanup: !1,
                    focusInvalid: !0,
                    errorContainer: a([]),
                    errorLabelContainer: a([]),
                    onsubmit: !0,
                    ignore: ":hidden",
                    ignoreTitle: !1,
                    onfocusin: function(a) {
                        this.lastActive = a,
                        this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass),
                            this.hideThese(this.errorsFor(a)))
                    },
                    onfocusout: function(a) {
                        this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
                    },
                    onkeyup: function(b, c) {
                        9 === c.which && "" === this.elementValue(b) || -1 !== a.inArray(c.keyCode, [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]) || (b.name in this.submitted || b === this.lastElement) && this.element(b)
                    },
                    onclick: function(a) {
                        a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
                    },
                    highlight: function(b, c, d) {
                        ("radio" === b.type ? this.findByName(b.name) : a(b)).addClass(c).removeClass(d)
                    },
                    unhighlight: function(b, c, d) {
                        ("radio" === b.type ? this.findByName(b.name) : a(b)).removeClass(c).addClass(d)
                    }
                },
                setDefaults: function(b) {
                    a.extend(a.validator.defaults, b)
                },
                messages: {
                    required: "This field is required.",
                    remote: "Please fix this field.",
                    email: "Please enter a valid email address.",
                    url: "Please enter a valid URL.",
                    date: "Please enter a valid date.",
                    dateISO: "Please enter a valid date ( ISO ).",
                    number: "Please enter a valid number.",
                    digits: "Please enter only digits.",
                    creditcard: "Please enter a valid credit card number.",
                    equalTo: "Please enter the same value again.",
                    maxlength: a.validator.format("Please enter no more than {0} characters."),
                    minlength: a.validator.format("Please enter at least {0} characters."),
                    rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
                    range: a.validator.format("Please enter a value between {0} and {1}."),
                    max: a.validator.format("Please enter a value less than or equal to {0}."),
                    min: a.validator.format("Please enter a value greater than or equal to {0}.")
                },
                autoCreateRanges: !1,
                prototype: {
                    init: function() {
                        function b(b) {
                            var c = a.data(this.form, "validator")
                                , d = "on" + b.type.replace(/^validate/, "")
                                , e = c.settings;
                            e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b)
                        }
                        this.labelContainer = a(this.settings.errorLabelContainer),
                            this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm),
                            this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer),
                            this.submitted = {},
                            this.valueCache = {},
                            this.pendingRequest = 0,
                            this.pending = {},
                            this.invalid = {},
                            this.reset();
                        var c, d = this.groups = {};
                        a.each(this.settings.groups, function(b, c) {
                            "string" == typeof c && (c = c.split(/\s/)),
                                a.each(c, function(a, c) {
                                    d[c] = b
                                })
                        }),
                            c = this.settings.rules,
                            a.each(c, function(b, d) {
                                c[b] = a.validator.normalizeRule(d)
                            }),
                            a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b),
                        this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler),
                            a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
                    },
                    form: function() {
                        return this.checkForm(),
                            a.extend(this.submitted, this.errorMap),
                            this.invalid = a.extend({}, this.errorMap),
                        this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]),
                            this.showErrors(),
                            this.valid()
                    },
                    checkForm: function() {
                        this.prepareForm();
                        for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++)
                            this.check(b[a]);
                        return this.valid()
                    },
                    element: function(b) {
                        var c = this.clean(b)
                            , d = this.validationTargetFor(c)
                            , e = !0;
                        return void 0 === (this.lastElement = d) ? delete this.invalid[c.name] : (this.prepareElement(d),
                            this.currentElements = a(d),
                            (e = !1 !== this.check(d)) ? delete this.invalid[d.name] : this.invalid[d.name] = !0),
                            a(b).attr("aria-invalid", !e),
                        this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)),
                            this.showErrors(),
                            e
                    },
                    showErrors: function(b) {
                        if (b) {
                            for (var c in a.extend(this.errorMap, b),
                                this.errorList = [],
                                b)
                                this.errorList.push({
                                    message: b[c],
                                    element: this.findByName(c)[0]
                                });
                            this.successList = a.grep(this.successList, function(a) {
                                return !(a.name in b)
                            })
                        }
                        this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                    },
                    resetForm: function() {
                        a.fn.resetForm && a(this.currentForm).resetForm(),
                            this.submitted = {},
                            this.lastElement = null,
                            this.prepareForm(),
                            this.hideErrors();
                        var b, c = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                        if (this.settings.unhighlight)
                            for (b = 0; c[b]; b++)
                                this.settings.unhighlight.call(this, c[b], this.settings.errorClass, "");
                        else
                            c.removeClass(this.settings.errorClass)
                    },
                    numberOfInvalids: function() {
                        return this.objectLength(this.invalid)
                    },
                    objectLength: function(a) {
                        var b, c = 0;
                        for (b in a)
                            c++;
                        return c
                    },
                    hideErrors: function() {
                        this.hideThese(this.toHide)
                    },
                    hideThese: function(a) {
                        a.not(this.containers).text(""),
                            this.addWrapper(a).hide()
                    },
                    valid: function() {
                        return 0 === this.size()
                    },
                    size: function() {
                        return this.errorList.length
                    },
                    focusInvalid: function() {
                        if (this.settings.focusInvalid)
                            try {
                                a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                            } catch (b) {}
                    },
                    findLastActive: function() {
                        var b = this.lastActive;
                        return b && 1 === a.grep(this.errorList, function(a) {
                            return a.element.name === b.name
                        }).length && b
                    },
                    elements: function() {
                        var b = this
                            , c = {};
                        return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                            return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this),
                            !(this.name in c || !b.objectLength(a(this).rules())) && (c[this.name] = !0)
                        })
                    },
                    clean: function(b) {
                        return a(b)[0]
                    },
                    errors: function() {
                        var b = this.settings.errorClass.split(" ").join(".");
                        return a(this.settings.errorElement + "." + b, this.errorContext)
                    },
                    reset: function() {
                        this.successList = [],
                            this.errorList = [],
                            this.errorMap = {},
                            this.toShow = a([]),
                            this.toHide = a([]),
                            this.currentElements = a([])
                    },
                    prepareForm: function() {
                        this.reset(),
                            this.toHide = this.errors().add(this.containers)
                    },
                    prepareElement: function(a) {
                        this.reset(),
                            this.toHide = this.errorsFor(a)
                    },
                    elementValue: function(b) {
                        var d = a(b)
                            , e = b.type;
                        return "radio" === e || "checkbox" === e ? this.findByName(b.name).filter(":checked").val() : "number" === e && void 0 !== b.validity ? !b.validity.badInput && d.val() : "string" == typeof (e = d.val()) ? e.replace(/\r/g, "") : e
                    },
                    check: function(b) {
                        b = this.validationTargetFor(this.clean(b));
                        var c, d, e, f = a(b).rules(), g = a.map(f, function(a, b) {
                            return b
                        }).length, h = !1, i = this.elementValue(b);
                        for (d in f) {
                            e = {
                                method: d,
                                parameters: f[d]
                            };
                            try {
                                if ("dependency-mismatch" === (c = a.validator.methods[d].call(this, i, b, e.parameters)) && 1 === g) {
                                    h = !0;
                                    continue
                                }
                                if (h = !1,
                                "pending" === c)
                                    return void (this.toHide = this.toHide.not(this.errorsFor(b)));
                                if (!c)
                                    return this.formatAndAdd(b, e),
                                        !1
                            } catch (j) {
                                throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j),
                                j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."),
                                    j
                            }
                        }
                        if (!h)
                            return this.objectLength(f) && this.successList.push(b),
                                !0
                    },
                    customDataMessage: function(b, c) {
                        return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg")
                    },
                    customMessage: function(a, b) {
                        a = this.settings.messages[a];
                        return a && (a.constructor === String ? a : a[b])
                    },
                    findDefined: function() {
                        for (var a = 0; a < arguments.length; a++)
                            if (void 0 !== arguments[a])
                                return arguments[a]
                    },
                    defaultMessage: function(b, c) {
                        return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>")
                    },
                    formatAndAdd: function(b, c) {
                        var d = this.defaultMessage(b, c.method)
                            , e = /\$?\{(\d+)\}/g;
                        "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)),
                            this.errorList.push({
                                message: d,
                                element: b,
                                method: c.method
                            }),
                            this.errorMap[b.name] = d,
                            this.submitted[b.name] = d
                    },
                    addWrapper: function(a) {
                        return a = this.settings.wrapper ? a.add(a.parent(this.settings.wrapper)) : a
                    },
                    defaultShowErrors: function() {
                        for (var b, c, a = 0; this.errorList[a]; a++)
                            c = this.errorList[a],
                            this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass),
                                this.showLabel(c.element, c.message);
                        if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)),
                            this.settings.success)
                            for (a = 0; this.successList[a]; a++)
                                this.showLabel(this.successList[a]);
                        if (this.settings.unhighlight)
                            for (a = 0,
                                     b = this.validElements(); b[a]; a++)
                                this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                        this.toHide = this.toHide.not(this.toShow),
                            this.hideErrors(),
                            this.addWrapper(this.toShow).show()
                    },
                    validElements: function() {
                        return this.currentElements.not(this.invalidElements())
                    },
                    invalidElements: function() {
                        return a(this.errorList).map(function() {
                            return this.element
                        })
                    },
                    showLabel: function(b, c) {
                        var e, d, g = this.errorsFor(b), h = this.idOrName(b), i = a(b).attr("aria-describedby");
                        g.length ? (g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),
                            g.html(c)) : (d = g = a("<" + this.settings.errorElement + ">").attr("id", h + "-error").addClass(this.settings.errorClass).html(c || ""),
                        this.settings.wrapper && (d = g.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()),
                            this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b),
                            g.is("label") ? g.attr("for", h) : 0 === g.parents("label[for='" + h + "']").length && (d = g.attr("id").replace(/(:|\.|\[|\]|\$)/g, "\\$1"),
                                i ? i.match(new RegExp("\\b" + d + "\\b")) || (i += " " + d) : i = d,
                                a(b).attr("aria-describedby", i),
                            (e = this.groups[b.name]) && a.each(this.groups, function(b, c) {
                                c === e && a("[name='" + b + "']", this.currentForm).attr("aria-describedby", g.attr("id"))
                            }))),
                        !c && this.settings.success && (g.text(""),
                            "string" == typeof this.settings.success ? g.addClass(this.settings.success) : this.settings.success(g, b)),
                            this.toShow = this.toShow.add(g)
                    },
                    errorsFor: function(b) {
                        var c = this.idOrName(b)
                            , b = a(b).attr("aria-describedby")
                            , c = "label[for='" + c + "'], label[for='" + c + "'] *";
                        return b && (c = c + ", #" + b.replace(/\s+/g, ", #")),
                            this.errors().filter(c)
                    },
                    idOrName: function(a) {
                        return this.groups[a.name] || !this.checkable(a) && a.id || a.name
                    },
                    validationTargetFor: function(b) {
                        return this.checkable(b) && (b = this.findByName(b.name)),
                            a(b).not(this.settings.ignore)[0]
                    },
                    checkable: function(a) {
                        return /radio|checkbox/i.test(a.type)
                    },
                    findByName: function(b) {
                        return a(this.currentForm).find("[name='" + b + "']")
                    },
                    getLength: function(b, c) {
                        switch (c.nodeName.toLowerCase()) {
                            case "select":
                                return a("option:selected", c).length;
                            case "input":
                                if (this.checkable(c))
                                    return this.findByName(c.name).filter(":checked").length
                        }
                        return b.length
                    },
                    depend: function(a, b) {
                        return !this.dependTypes[typeof a] || this.dependTypes[typeof a](a, b)
                    },
                    dependTypes: {
                        boolean: function(a) {
                            return a
                        },
                        string: function(b, c) {
                            return !!a(b, c.form).length
                        },
                        function: function(a, b) {
                            return a(b)
                        }
                    },
                    optional: function(b) {
                        var c = this.elementValue(b);
                        return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
                    },
                    startRequest: function(a) {
                        this.pending[a.name] || (this.pendingRequest++,
                            this.pending[a.name] = !0)
                    },
                    stopRequest: function(b, c) {
                        this.pendingRequest--,
                        this.pendingRequest < 0 && (this.pendingRequest = 0),
                            delete this.pending[b.name],
                            c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(),
                                this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]),
                                this.formSubmitted = !1)
                    },
                    previousValue: function(b) {
                        return a.data(b, "previousValue") || a.data(b, "previousValue", {
                            old: null,
                            valid: !0,
                            message: this.defaultMessage(b, "remote")
                        })
                    },
                    destroy: function() {
                        this.resetForm(),
                            a(this.currentForm).off(".validate").removeData("validator")
                    }
                },
                classRuleSettings: {
                    required: {
                        required: !0
                    },
                    email: {
                        email: !0
                    },
                    url: {
                        url: !0
                    },
                    date: {
                        date: !0
                    },
                    dateISO: {
                        dateISO: !0
                    },
                    number: {
                        number: !0
                    },
                    digits: {
                        digits: !0
                    },
                    creditcard: {
                        creditcard: !0
                    }
                },
                addClassRules: function(b, c) {
                    b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
                },
                classRules: function(b) {
                    var c = {}
                        , b = a(b).attr("class");
                    return b && a.each(b.split(" "), function() {
                        this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
                    }),
                        c
                },
                normalizeAttributeRule: function(a, b, c, d) {
                    /min|max/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d),
                    isNaN(d) && (d = void 0)),
                        d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0)
                },
                attributeRules: function(b) {
                    var c, d, e = {}, f = a(b), g = b.getAttribute("type");
                    for (c in a.validator.methods)
                        d = "required" === c ? (d = b.getAttribute(c),
                        "" === d && (d = !0),
                            !!d) : f.attr(c),
                            this.normalizeAttributeRule(e, g, c, d);
                    return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength,
                        e
                },
                dataRules: function(b) {
                    var c, d, e = {}, f = a(b), g = b.getAttribute("type");
                    for (c in a.validator.methods)
                        d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()),
                            this.normalizeAttributeRule(e, g, c, d);
                    return e
                },
                staticRules: function(b) {
                    var c = {}
                        , d = a.data(b.form, "validator");
                    return c = d.settings.rules ? a.validator.normalizeRule(d.settings.rules[b.name]) || {} : c
                },
                normalizeRules: function(b, c) {
                    return a.each(b, function(d, e) {
                        if (!1 === e)
                            delete b[d];
                        else if (e.param || e.depends) {
                            var f = !0;
                            switch (typeof e.depends) {
                                case "string":
                                    f = !!a(e.depends, c.form).length;
                                    break;
                                case "function":
                                    f = e.depends.call(c, c)
                            }
                            f ? b[d] = void 0 === e.param || e.param : delete b[d]
                        }
                    }),
                        a.each(b, function(d, e) {
                            b[d] = a.isFunction(e) ? e(c) : e
                        }),
                        a.each(["minlength", "maxlength"], function() {
                            b[this] && (b[this] = Number(b[this]))
                        }),
                        a.each(["rangelength", "range"], function() {
                            var c;
                            b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/),
                                b[this] = [Number(c[0]), Number(c[1])]))
                        }),
                    a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max],
                        delete b.min,
                        delete b.max),
                    null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength],
                        delete b.minlength,
                        delete b.maxlength)),
                        b
                },
                normalizeRule: function(b) {
                    var c;
                    return "string" == typeof b && (c = {},
                        a.each(b.split(/\s/), function() {
                            c[this] = !0
                        }),
                        b = c),
                        b
                },
                addMethod: function(b, c, d) {
                    a.validator.methods[b] = c,
                        a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b],
                    c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
                },
                methods: {
                    required: function(b, c, d) {
                        return this.depend(d, c) ? "select" === c.nodeName.toLowerCase() ? (d = a(c).val()) && 0 < d.length : this.checkable(c) ? 0 < this.getLength(b, c) : 0 < b.length : "dependency-mismatch"
                    },
                    email: function(a, b) {
                        return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)
                    },
                    url: function(a, b) {
                        return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)
                    },
                    date: function(a, b) {
                        return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString())
                    },
                    dateISO: function(a, b) {
                        return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)
                    },
                    number: function(a, b) {
                        return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
                    },
                    digits: function(a, b) {
                        return this.optional(b) || /^\d+$/.test(a)
                    },
                    creditcard: function(a, b) {
                        if (this.optional(b))
                            return "dependency-mismatch";
                        if (/[^0-9 \-]+/.test(a))
                            return !1;
                        var c, d, e = 0, f = 0, g = !1;
                        if ((a = a.replace(/\D/g, "")).length < 13 || 19 < a.length)
                            return !1;
                        for (c = a.length - 1; 0 <= c; c--)
                            d = a.charAt(c),
                                f = parseInt(d, 10),
                            g && 9 < (f *= 2) && (f -= 9),
                                e += f,
                                g = !g;
                        return e % 10 == 0
                    },
                    minlength: function(b, c, d) {
                        b = a.isArray(b) ? b.length : this.getLength(b, c);
                        return this.optional(c) || d <= b
                    },
                    maxlength: function(b, c, d) {
                        b = a.isArray(b) ? b.length : this.getLength(b, c);
                        return this.optional(c) || b <= d
                    },
                    rangelength: function(b, c, d) {
                        b = a.isArray(b) ? b.length : this.getLength(b, c);
                        return this.optional(c) || b >= d[0] && b <= d[1]
                    },
                    min: function(a, b, c) {
                        return this.optional(b) || c <= a
                    },
                    max: function(a, b, c) {
                        return this.optional(b) || a <= c
                    },
                    range: function(a, b, c) {
                        return this.optional(b) || a >= c[0] && a <= c[1]
                    },
                    equalTo: function(b, c, d) {
                        d = a(d);
                        return this.settings.onfocusout && d.off(".validate-equalTo").on("blur.validate-equalTo", function() {
                            a(c).valid()
                        }),
                        b === d.val()
                    },
                    remote: function(b, c, d) {
                        if (this.optional(c))
                            return "dependency-mismatch";
                        var e, f, g = this.previousValue(c);
                        return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}),
                            g.originalMessage = this.settings.messages[c.name].remote,
                            this.settings.messages[c.name].remote = g.message,
                            d = "string" == typeof d ? {
                                url: d
                            } : d,
                            g.old === b ? g.valid : (g.old = b,
                                (e = this).startRequest(c),
                                (f = {})[c.name] = b,
                                a.ajax(a.extend(!0, {
                                    mode: "abort",
                                    port: "validate" + c.name,
                                    dataType: "json",
                                    data: f,
                                    context: e.currentForm,
                                    success: function(d) {
                                        var i, j = !0 === d || "true" === d;
                                        e.settings.messages[c.name].remote = g.originalMessage,
                                            j ? (i = e.formSubmitted,
                                                e.prepareElement(c),
                                                e.formSubmitted = i,
                                                e.successList.push(c),
                                                delete e.invalid[c.name],
                                                e.showErrors()) : (i = {},
                                                d = d || e.defaultMessage(c, "remote"),
                                                i[c.name] = g.message = a.isFunction(d) ? d(b) : d,
                                                e.invalid[c.name] = !0,
                                                e.showErrors(i)),
                                            g.valid = j,
                                            e.stopRequest(c, j)
                                    }
                                }, d)),
                                "pending")
                    }
                }
            });
        var b, c = {};
        a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, d) {
            var e = a.port;
            "abort" === a.mode && (c[e] && c[e].abort(),
                c[e] = d)
        }) : (b = a.ajax,
                a.ajax = function(d) {
                    var e = ("mode"in d ? d : a.ajaxSettings).mode
                        , f = ("port"in d ? d : a.ajaxSettings).port;
                    return "abort" === e ? (c[f] && c[f].abort(),
                        c[f] = b.apply(this, arguments),
                        c[f]) : b.apply(this, arguments)
                }
        )
    }),
    function() {
        "use strict";
        function e() {}
        function t(e, t) {
            for (var n = e.length; n--; )
                if (e[n].listener === t)
                    return n;
            return -1
        }
        function n(e) {
            return function() {
                return this[e].apply(this, arguments)
            }
        }
        var i = e.prototype
            , r = this
            , s = r.EventEmitter;
        i.getListeners = function(e) {
            var t, n, i = this._getEvents();
            if ("object" == typeof e)
                for (n in t = {},
                    i)
                    i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]);
            else
                t = i[e] || (i[e] = []);
            return t
        }
            ,
            i.flattenListeners = function(e) {
                for (var n = [], t = 0; t < e.length; t += 1)
                    n.push(e[t].listener);
                return n
            }
            ,
            i.getListenersAsObject = function(e) {
                var t, n = this.getListeners(e);
                return n instanceof Array && ((t = {})[e] = n),
                t || n
            }
            ,
            i.addListener = function(e, n) {
                var i, r = this.getListenersAsObject(e), s = "object" == typeof n;
                for (i in r)
                    r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(s ? n : {
                        listener: n,
                        once: !1
                    });
                return this
            }
            ,
            i.on = n("addListener"),
            i.addOnceListener = function(e, t) {
                return this.addListener(e, {
                    listener: t,
                    once: !0
                })
            }
            ,
            i.once = n("addOnceListener"),
            i.defineEvent = function(e) {
                return this.getListeners(e),
                    this
            }
            ,
            i.defineEvents = function(e) {
                for (var t = 0; t < e.length; t += 1)
                    this.defineEvent(e[t]);
                return this
            }
            ,
            i.removeListener = function(e, n) {
                var i, r, s = this.getListenersAsObject(e);
                for (r in s)
                    s.hasOwnProperty(r) && (i = t(s[r], n),
                    -1 !== i && s[r].splice(i, 1));
                return this
            }
            ,
            i.off = n("removeListener"),
            i.addListeners = function(e, t) {
                return this.manipulateListeners(!1, e, t)
            }
            ,
            i.removeListeners = function(e, t) {
                return this.manipulateListeners(!0, e, t)
            }
            ,
            i.manipulateListeners = function(e, t, n) {
                var i, r, s = e ? this.removeListener : this.addListener, o = e ? this.removeListeners : this.addListeners;
                if ("object" != typeof t || t instanceof RegExp)
                    for (i = n.length; i--; )
                        s.call(this, t, n[i]);
                else
                    for (i in t)
                        t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? s : o).call(this, i, r);
                return this
            }
            ,
            i.removeEvent = function(e) {
                var t, n = typeof e, i = this._getEvents();
                if ("string" == n)
                    delete i[e];
                else if ("object" == n)
                    for (t in i)
                        i.hasOwnProperty(t) && e.test(t) && delete i[t];
                else
                    delete this._events;
                return this
            }
            ,
            i.removeAllListeners = n("removeEvent"),
            i.emitEvent = function(e, t) {
                var n, i, r, s, o = this.getListenersAsObject(e);
                for (r in o)
                    if (o.hasOwnProperty(r))
                        for (i = o[r].length; i--; )
                            n = o[r][i],
                            !0 === n.once && this.removeListener(e, n.listener),
                                s = n.listener.apply(this, t || []),
                            s === this._getOnceReturnValue() && this.removeListener(e, n.listener);
                return this
            }
            ,
            i.trigger = n("emitEvent"),
            i.emit = function(e) {
                var t = Array.prototype.slice.call(arguments, 1);
                return this.emitEvent(e, t)
            }
            ,
            i.setOnceReturnValue = function(e) {
                return this._onceReturnValue = e,
                    this
            }
            ,
            i._getOnceReturnValue = function() {
                return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
            }
            ,
            i._getEvents = function() {
                return this._events || (this._events = {})
            }
            ,
            e.noConflict = function() {
                return r.EventEmitter = s,
                    e
            }
            ,
            "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
                return e
            }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
    }
        .call(this),
    function(e) {
        function t(t) {
            var n = e.event;
            return n.target = n.target || n.srcElement || t,
                n
        }
        var n = document.documentElement
            , i = function() {}
            , r = (n.addEventListener ? i = function(e, t, n) {
                    e.addEventListener(t, n, !1)
                }
                : n.attachEvent && (i = function(e, n, i) {
                    e[n + i] = i.handleEvent ? function() {
                            var n = t(e);
                            i.handleEvent.call(i, n)
                        }
                        : function() {
                            var n = t(e);
                            i.call(e, n)
                        }
                        ,
                        e.attachEvent("on" + n, e[n + i])
                }
            ),
                function() {}
        )
            , n = (n.removeEventListener ? r = function(e, t, n) {
                e.removeEventListener(t, n, !1)
            }
            : n.detachEvent && (r = function(e, t, n) {
                e.detachEvent("on" + t, e[t + n]);
                try {
                    delete e[t + n]
                } catch (i) {
                    e[t + n] = void 0
                }
            }
        ),
            {
                bind: i,
                unbind: r
            });
        "function" == typeof define && define.amd ? define("eventie/eventie", n) : e.eventie = n
    }(this),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(n, i) {
            return t(e, n, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
    }(window, function(e, t, n) {
        function i(e, t) {
            for (var n in t)
                e[n] = t[n];
            return e
        }
        function s(e) {
            var t = [];
            if (function(e) {
                return "[object Array]" == f.call(e)
            }(e))
                t = e;
            else if ("number" == typeof e.length)
                for (var n = 0; n < e.length; n++)
                    t.push(e[n]);
            else
                t.push(e);
            return t
        }
        function o(e, t, n) {
            if (!(this instanceof o))
                return new o(e,t,n);
            "string" == typeof e && (e = document.querySelectorAll(e)),
                this.elements = s(e),
                this.options = i({}, this.options),
                "function" == typeof t ? n = t : i(this.options, t),
            n && this.on("always", n),
                this.getImages(),
            u && (this.jqDeferred = new u.Deferred);
            var r = this;
            setTimeout(function() {
                r.check()
            })
        }
        function h(e) {
            this.img = e
        }
        function a(e, t) {
            this.url = e,
                this.element = t,
                this.img = new Image
        }
        var u = e.jQuery
            , c = e.console
            , f = Object.prototype.toString
            , d = ((o.prototype = new t).options = {},
            o.prototype.getImages = function() {
                this.images = [];
                for (var e = 0; e < this.elements.length; e++) {
                    var t = this.elements[e];
                    this.addElementImages(t)
                }
            }
            ,
            o.prototype.addElementImages = function(e) {
                "IMG" == e.nodeName && this.addImage(e),
                !0 === this.options.background && this.addElementBackgroundImages(e);
                var t = e.nodeType;
                if (t && d[t]) {
                    for (var n = e.querySelectorAll("img"), i = 0; i < n.length; i++) {
                        var r = n[i];
                        this.addImage(r)
                    }
                    if ("string" == typeof this.options.background)
                        for (var s = e.querySelectorAll(this.options.background), i = 0; i < s.length; i++) {
                            var o = s[i];
                            this.addElementBackgroundImages(o)
                        }
                }
            }
            ,
            {
                1: !0,
                9: !0,
                11: !0
            })
            , m = (o.prototype.addElementBackgroundImages = function(e) {
                for (var t = m(e), n = /url\(['"]*([^'"\)]+)['"]*\)/gi, i = n.exec(t.backgroundImage); null !== i; ) {
                    var r = i && i[1];
                    r && this.addBackground(r, e),
                        i = n.exec(t.backgroundImage)
                }
            }
                ,
            e.getComputedStyle || function(e) {
                return e.currentStyle
            }
        );
        return o.prototype.addImage = function(e) {
            e = new h(e);
            this.images.push(e)
        }
            ,
            o.prototype.addBackground = function(e, t) {
                e = new a(e,t);
                this.images.push(e)
            }
            ,
            o.prototype.check = function() {
                function e(e, n, i) {
                    setTimeout(function() {
                        t.progress(e, n, i)
                    })
                }
                var t = this;
                if (this.progressedCount = 0,
                    this.hasAnyBroken = !1,
                    this.images.length)
                    for (var n = 0; n < this.images.length; n++) {
                        var i = this.images[n];
                        i.once("progress", e),
                            i.check()
                    }
                else
                    this.complete()
            }
            ,
            o.prototype.progress = function(e, t, n) {
                this.progressedCount++,
                    this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded,
                    this.emit("progress", this, e, t),
                this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e),
                this.progressedCount == this.images.length && this.complete(),
                this.options.debug && c && c.log("progress: " + n, e, t)
            }
            ,
            o.prototype.complete = function() {
                var e = this.hasAnyBroken ? "fail" : "done";
                this.isComplete = !0,
                    this.emit(e, this),
                    this.emit("always", this),
                this.jqDeferred && (e = this.hasAnyBroken ? "reject" : "resolve",
                    this.jqDeferred[e](this))
            }
            ,
            (h.prototype = new t).check = function() {
                return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
                    n.bind(this.proxyImage, "load", this),
                    n.bind(this.proxyImage, "error", this),
                    n.bind(this.img, "load", this),
                    n.bind(this.img, "error", this),
                    void (this.proxyImage.src = this.img.src))
            }
            ,
            h.prototype.getIsImageComplete = function() {
                return this.img.complete && void 0 !== this.img.naturalWidth
            }
            ,
            h.prototype.confirm = function(e, t) {
                this.isLoaded = e,
                    this.emit("progress", this, this.img, t)
            }
            ,
            h.prototype.handleEvent = function(e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
            }
            ,
            h.prototype.onload = function() {
                this.confirm(!0, "onload"),
                    this.unbindEvents()
            }
            ,
            h.prototype.onerror = function() {
                this.confirm(!1, "onerror"),
                    this.unbindEvents()
            }
            ,
            h.prototype.unbindEvents = function() {
                n.unbind(this.proxyImage, "load", this),
                    n.unbind(this.proxyImage, "error", this),
                    n.unbind(this.img, "load", this),
                    n.unbind(this.img, "error", this)
            }
            ,
            (a.prototype = new h).check = function() {
                n.bind(this.img, "load", this),
                    n.bind(this.img, "error", this),
                    this.img.src = this.url,
                this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
                    this.unbindEvents())
            }
            ,
            a.prototype.unbindEvents = function() {
                n.unbind(this.img, "load", this),
                    n.unbind(this.img, "error", this)
            }
            ,
            a.prototype.confirm = function(e, t) {
                this.isLoaded = e,
                    this.emit("progress", this, this.element, t)
            }
            ,
            (o.makeJQueryPlugin = function(t) {
                    (t = t || e.jQuery) && ((u = t).fn.imagesLoaded = function(e, t) {
                            return new o(this,e,t).jqDeferred.promise(u(this))
                        }
                    )
                }
            )(),
            o
    }),
    !function(root, doc, factory) {
        "function" == typeof define && define.amd ? define(["jquery"], function($) {
            return factory($, root, doc),
                $.mobile
        }) : factory(root.jQuery, root, doc)
    }(this, document, function(jQuery, window, document, undefined) {
        var $, heldCall, curr, diff, handler, lastCall;
        ($ = jQuery).event.special.throttledresize = {
            setup: function() {
                $(this).bind("resize", handler)
            },
            teardown: function() {
                $(this).unbind("resize", handler)
            }
        },
            handler = function() {
                curr = (new Date).getTime(),
                    250 <= (diff = curr - lastCall) ? (lastCall = curr,
                        $(this).trigger("throttledresize")) : (heldCall && clearTimeout(heldCall),
                        heldCall = setTimeout(handler, 250 - diff))
            }
            ,
            lastCall = 0,
            function($, document) {
                $.event.hasOwnProperty("props") || ($.event.props = "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "));
                var threshold, i, dataPropertyName = "virtualMouseBindings", touchTargetPropertyName = "virtualTouchID", virtualEventNames = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "), touchEventProps = "clientX clientY pageX pageY screenX screenY".split(" "), mouseHookProps = $.event.mouseHooks ? $.event.mouseHooks.props : [], mouseEventProps = $.event.props.concat(mouseHookProps), activeDocHandlers = {}, resetTimerID = 0, startX = 0, startY = 0, didScroll = !1, clickBlockList = [], blockMouseTriggers = !1, blockTouchTriggers = !1, eventCaptureSupported = "addEventListener"in document, $document = $(document), nextTouchID = 1, lastTouchID = 0;
                function getNativeEvent(event) {
                    for (; event && void 0 !== event.originalEvent; )
                        event = event.originalEvent;
                    return event
                }
                function getVirtualBindingFlags(element) {
                    for (var b, k, flags = {}; element; ) {
                        for (k in b = $.data(element, dataPropertyName))
                            b[k] && (flags[k] = flags.hasVirtualBinding = !0);
                        element = element.parentNode
                    }
                    return flags
                }
                function disableTouchBindings() {
                    blockTouchTriggers = !0
                }
                function disableMouseBindings() {
                    blockTouchTriggers = !1
                }
                function startResetTimer() {
                    clearResetTimer(),
                        resetTimerID = setTimeout(function() {
                            lastTouchID = resetTimerID = 0,
                                clickBlockList.length = 0,
                                blockMouseTriggers = !1,
                                disableTouchBindings()
                        }, $.vmouse.resetTimerDuration)
                }
                function clearResetTimer() {
                    resetTimerID && (clearTimeout(resetTimerID),
                        resetTimerID = 0)
                }
                function triggerVirtualEvent(eventType, event, flags) {
                    var ve;
                    return (flags && flags[eventType] || !flags && function(element, eventType) {
                        for (var b; element; ) {
                            if ((b = $.data(element, dataPropertyName)) && (!eventType || b[eventType]))
                                return element;
                            element = element.parentNode
                        }
                    }(event.target, eventType)) && (ve = function(event, eventType) {
                        var oe, props, prop, touch, i, j, len, t = event.type;
                        if ((event = $.Event(event)).type = eventType,
                            oe = event.originalEvent,
                            props = $.event.props,
                        -1 < t.search(/^(mouse|click)/) && (props = mouseEventProps),
                            oe)
                            for (i = props.length; i; )
                                event[prop = props[--i]] = oe[prop];
                        if (-1 < t.search(/mouse(down|up)|click/) && !event.which && (event.which = 1),
                        -1 !== t.search(/^touch/) && (t = (eventType = getNativeEvent(oe)).touches,
                            eventType = eventType.changedTouches,
                            touch = t && t.length ? t[0] : eventType && eventType.length ? eventType[0] : void 0))
                            for (j = 0,
                                     len = touchEventProps.length; j < len; j++)
                                event[prop = touchEventProps[j]] = touch[prop];
                        return event
                    }(event, eventType),
                        $(event.target).trigger(ve)),
                        ve
                }
                function mouseEventCallback(event) {
                    var touchID = $.data(event.target, touchTargetPropertyName);
                    blockMouseTriggers || lastTouchID && lastTouchID === touchID || (touchID = triggerVirtualEvent("v" + event.type, event)) && (touchID.isDefaultPrevented() && event.preventDefault(),
                    touchID.isPropagationStopped() && event.stopPropagation(),
                    touchID.isImmediatePropagationStopped() && event.stopImmediatePropagation())
                }
                function handleTouchStart(event) {
                    var flags, touches = getNativeEvent(event).touches;
                    touches && 1 === touches.length && (flags = getVirtualBindingFlags(touches = event.target)).hasVirtualBinding && (lastTouchID = nextTouchID++,
                        $.data(touches, touchTargetPropertyName, lastTouchID),
                        clearResetTimer(),
                        disableMouseBindings(),
                        didScroll = !1,
                        touches = getNativeEvent(event).touches[0],
                        startX = touches.pageX,
                        startY = touches.pageY,
                        triggerVirtualEvent("vmouseover", event, flags),
                        triggerVirtualEvent("vmousedown", event, flags))
                }
                function handleScroll(event) {
                    blockTouchTriggers || (didScroll || triggerVirtualEvent("vmousecancel", event, getVirtualBindingFlags(event.target)),
                        didScroll = !0,
                        startResetTimer())
                }
                function handleTouchMove(event) {
                    var t, didCancel, moveThreshold, flags;
                    blockTouchTriggers || (t = getNativeEvent(event).touches[0],
                        didCancel = didScroll,
                        moveThreshold = $.vmouse.moveDistanceThreshold,
                        flags = getVirtualBindingFlags(event.target),
                    (didScroll = didScroll || Math.abs(t.pageX - startX) > moveThreshold || Math.abs(t.pageY - startY) > moveThreshold) && !didCancel && triggerVirtualEvent("vmousecancel", event, flags),
                        triggerVirtualEvent("vmousemove", event, flags),
                        startResetTimer())
                }
                function handleTouchEnd(event) {
                    var flags, ve;
                    blockTouchTriggers || (disableTouchBindings(),
                        triggerVirtualEvent("vmouseup", event, flags = getVirtualBindingFlags(event.target)),
                    didScroll || (ve = triggerVirtualEvent("vclick", event, flags)) && ve.isDefaultPrevented() && (ve = getNativeEvent(event).changedTouches[0],
                        clickBlockList.push({
                            touchID: lastTouchID,
                            x: ve.clientX,
                            y: ve.clientY
                        }),
                        blockMouseTriggers = !0),
                        triggerVirtualEvent("vmouseout", event, flags),
                        didScroll = !1,
                        startResetTimer())
                }
                function hasVirtualBindings(ele) {
                    var k, bindings = $.data(ele, dataPropertyName);
                    if (bindings)
                        for (k in bindings)
                            if (bindings[k])
                                return 1
                }
                function dummyMouseHandler() {}
                for ($.vmouse = {
                    moveDistanceThreshold: 10,
                    clickDistanceThreshold: 10,
                    resetTimerDuration: 1500
                },
                         i = 0; i < virtualEventNames.length; i++)
                    $.event.special[virtualEventNames[i]] = function(eventType) {
                        var realType = eventType.substr(1);
                        return {
                            setup: function() {
                                hasVirtualBindings(this) || $.data(this, dataPropertyName, {}),
                                    $.data(this, dataPropertyName)[eventType] = !0,
                                    activeDocHandlers[eventType] = (activeDocHandlers[eventType] || 0) + 1,
                                1 === activeDocHandlers[eventType] && $document.bind(realType, mouseEventCallback),
                                    $(this).bind(realType, dummyMouseHandler),
                                eventCaptureSupported && (activeDocHandlers.touchstart = (activeDocHandlers.touchstart || 0) + 1,
                                1 === activeDocHandlers.touchstart && $document.bind("touchstart", handleTouchStart).bind("touchend", handleTouchEnd).bind("touchmove", handleTouchMove).bind("scroll", handleScroll))
                            },
                            teardown: function() {
                                --activeDocHandlers[eventType],
                                activeDocHandlers[eventType] || $document.unbind(realType, mouseEventCallback),
                                eventCaptureSupported && (--activeDocHandlers.touchstart,
                                activeDocHandlers.touchstart || $document.unbind("touchstart", handleTouchStart).unbind("touchmove", handleTouchMove).unbind("touchend", handleTouchEnd).unbind("scroll", handleScroll));
                                var $this = $(this)
                                    , bindings = $.data(this, dataPropertyName);
                                bindings && (bindings[eventType] = !1),
                                    $this.unbind(realType, dummyMouseHandler),
                                hasVirtualBindings(this) || $this.removeData(dataPropertyName)
                            }
                        }
                    }(virtualEventNames[i]);
                eventCaptureSupported && document.addEventListener("click", function(e) {
                    var x, y, ele, i, o, cnt = clickBlockList.length, target = e.target;
                    if (cnt)
                        for (x = e.clientX,
                                 y = e.clientY,
                                 threshold = $.vmouse.clickDistanceThreshold,
                                 ele = target; ele; ) {
                            for (i = 0; i < cnt; i++)
                                if (o = clickBlockList[i],
                                ele === target && Math.abs(o.x - x) < threshold && Math.abs(o.y - y) < threshold || $.data(ele, touchTargetPropertyName) === o.touchID)
                                    return e.preventDefault(),
                                        void e.stopPropagation();
                            ele = ele.parentNode
                        }
                }, !0)
            }(jQuery, document),
            jQuery.mobile = {},
            function($) {
                var support = {
                    touch: "ontouchend"in document
                };
                $.mobile.support = $.mobile.support || {},
                    $.extend($.support, support),
                    $.extend($.mobile.support, support)
            }(jQuery),
            function($, window, undefined) {
                var $document = $(document)
                    , supportTouch = $.mobile.support.touch
                    , touchStartEvent = supportTouch ? "touchstart" : "mousedown"
                    , touchStopEvent = supportTouch ? "touchend" : "mouseup"
                    , touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
                function triggerCustomEvent(obj, eventType, event, bubble) {
                    var originalType = event.type;
                    event.type = eventType,
                        bubble ? $.event.trigger(event, undefined, obj) : $.event.dispatch.call(obj, event),
                        event.type = originalType
                }
                $.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(i, name) {
                    $.fn[name] = function(fn) {
                        return fn ? this.bind(name, fn) : this.trigger(name)
                    }
                        ,
                    $.attrFn && ($.attrFn[name] = !0)
                }),
                    $.event.special.scrollstart = {
                        enabled: !0,
                        setup: function() {
                            var scrolling, timer, thisObject = this;
                            function trigger(event, state) {
                                triggerCustomEvent(thisObject, (scrolling = state) ? "scrollstart" : "scrollstop", event)
                            }
                            $(thisObject).bind("touchmove scroll", function(event) {
                                $.event.special.scrollstart.enabled && (scrolling || trigger(event, !0),
                                    clearTimeout(timer),
                                    timer = setTimeout(function() {
                                        trigger(event, !1)
                                    }, 50))
                            })
                        },
                        teardown: function() {
                            $(this).unbind("touchmove scroll")
                        }
                    },
                    $.event.special.tap = {
                        tapholdThreshold: 750,
                        emitTapOnTaphold: !0,
                        setup: function() {
                            var thisObject = this
                                , $this = $(thisObject)
                                , isTaphold = !1;
                            $this.bind("vmousedown", function(event) {
                                if (isTaphold = !1,
                                event.which && 1 !== event.which)
                                    return !1;
                                var timer, origTarget = event.target;
                                function clearTapTimer() {
                                    clearTimeout(timer)
                                }
                                function clearTapHandlers() {
                                    clearTapTimer(),
                                        $this.unbind("vclick", clickHandler).unbind("vmouseup", clearTapTimer),
                                        $document.unbind("vmousecancel", clearTapHandlers)
                                }
                                function clickHandler(event) {
                                    clearTapHandlers(),
                                        isTaphold || origTarget !== event.target ? isTaphold && event.preventDefault() : triggerCustomEvent(thisObject, "tap", event)
                                }
                                $this.bind("vmouseup", clearTapTimer).bind("vclick", clickHandler),
                                    $document.bind("vmousecancel", clearTapHandlers),
                                    timer = setTimeout(function() {
                                        $.event.special.tap.emitTapOnTaphold || (isTaphold = !0),
                                            triggerCustomEvent(thisObject, "taphold", $.Event("taphold", {
                                                target: origTarget
                                            }))
                                    }, $.event.special.tap.tapholdThreshold)
                            })
                        },
                        teardown: function() {
                            $(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"),
                                $document.unbind("vmousecancel")
                        }
                    },
                    $.event.special.swipe = {
                        scrollSupressionThreshold: 30,
                        durationThreshold: 1e3,
                        horizontalDistanceThreshold: 30,
                        verticalDistanceThreshold: 30,
                        getLocation: function(event) {
                            var winPageX = window.pageXOffset
                                , winPageY = window.pageYOffset
                                , x = event.clientX
                                , y = event.clientY;
                            return 0 === event.pageY && Math.floor(y) > Math.floor(event.pageY) || 0 === event.pageX && Math.floor(x) > Math.floor(event.pageX) ? (x -= winPageX,
                                y -= winPageY) : (y < event.pageY - winPageY || x < event.pageX - winPageX) && (x = event.pageX - winPageX,
                                y = event.pageY - winPageY),
                                {
                                    x: x,
                                    y: y
                                }
                        },
                        start: function(event) {
                            var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event
                                , data = $.event.special.swipe.getLocation(data);
                            return {
                                time: (new Date).getTime(),
                                coords: [data.x, data.y],
                                origin: $(event.target)
                            }
                        },
                        stop: function(event) {
                            event = event.originalEvent.touches ? event.originalEvent.touches[0] : event,
                                event = $.event.special.swipe.getLocation(event);
                            return {
                                time: (new Date).getTime(),
                                coords: [event.x, event.y]
                            }
                        },
                        handleSwipe: function(start, stop, thisObject, origTarget) {
                            var direction;
                            return stop.time - start.time < $.event.special.swipe.durationThreshold && Math.abs(start.coords[0] - stop.coords[0]) > $.event.special.swipe.horizontalDistanceThreshold && Math.abs(start.coords[1] - stop.coords[1]) < $.event.special.swipe.verticalDistanceThreshold && (direction = start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight",
                                triggerCustomEvent(thisObject, "swipe", $.Event("swipe", {
                                    target: origTarget,
                                    swipestart: start,
                                    swipestop: stop
                                }), !0),
                                triggerCustomEvent(thisObject, direction, $.Event(direction, {
                                    target: origTarget,
                                    swipestart: start,
                                    swipestop: stop
                                }), !0),
                                !0)
                        },
                        eventInProgress: !1,
                        setup: function() {
                            var thisObject = this
                                , $this = $(thisObject)
                                , context = {}
                                , events = $.data(this, "mobile-events");
                            events || $.data(this, "mobile-events", events = {
                                length: 0
                            }),
                                events.length++,
                                (events.swipe = context).start = function(event) {
                                    var stop, start, origTarget, emitted;
                                    $.event.special.swipe.eventInProgress || ($.event.special.swipe.eventInProgress = !0,
                                        start = $.event.special.swipe.start(event),
                                        origTarget = event.target,
                                        emitted = !1,
                                        context.move = function(event) {
                                            start && !event.isDefaultPrevented() && (stop = $.event.special.swipe.stop(event),
                                            emitted || (emitted = $.event.special.swipe.handleSwipe(start, stop, thisObject, origTarget)) && ($.event.special.swipe.eventInProgress = !1),
                                            Math.abs(start.coords[0] - stop.coords[0]) > $.event.special.swipe.scrollSupressionThreshold && event.preventDefault())
                                        }
                                        ,
                                        context.stop = function() {
                                            emitted = !0,
                                                $.event.special.swipe.eventInProgress = !1,
                                                $document.off(touchMoveEvent, context.move),
                                                context.move = null
                                        }
                                        ,
                                        $document.on(touchMoveEvent, context.move).one(touchStopEvent, context.stop))
                                }
                                ,
                                $this.on(touchStartEvent, context.start)
                        },
                        teardown: function() {
                            var context, events = $.data(this, "mobile-events");
                            events && (context = events.swipe,
                                delete events.swipe,
                                events.length--,
                            0 === events.length && $.removeData(this, "mobile-events")),
                            context && (context.start && $(this).off(touchStartEvent, context.start),
                            context.move && $document.off(touchMoveEvent, context.move),
                            context.stop && $document.off(touchStopEvent, context.stop))
                        }
                    },
                    $.each({
                        scrollstop: "scrollstart",
                        taphold: "tap",
                        swipeleft: "swipe.left",
                        swiperight: "swipe.right"
                    }, function(event, sourceEvent) {
                        $.event.special[event] = {
                            setup: function() {
                                $(this).bind(sourceEvent, $.noop)
                            },
                            teardown: function() {
                                $(this).unbind(sourceEvent)
                            }
                        }
                    })
            }(jQuery, this)
    }),
    !function($) {
        $.fn.identify = function() {
            if (void 0 === $(this).attr("id")) {
                for (var r = Math.ceil(1e4 * Math.random()), tn = $(this).get(0).tagName.toLowerCase(); 0 < $("#" + tn + "-" + r).length; )
                    r = Math.ceil(1e4 * Math.random());
                $(this).attr("id", tn + "-" + r)
            }
            return $(this).attr("id")
        }
    }(jQuery),
    !function($) {
        var timer;
        $.mb = {
            isArray: function(v) {
                return v instanceof Array
            },
            inArray: function(needle, haystack) {
                for (var i = 0, j = haystack.length; i < j; ++i)
                    if (haystack[i] == needle)
                        return !0;
                return !1
            },
            isNumeric: function(v) {
                return !isNaN(parseFloat(v)) && isFinite(v)
            },
            isEmail: function(email) {
                return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(email)
            },
            formatCurrency: function(num, no_cents, symbol, symbol_last) {
                return symbol = symbol || "$",
                    num = (num + "").replace(/[^0-9\.\-]+/g, ""),
                    num = isNaN(num) || "" === num || null === num ? 0 : num,
                    num = no_cents ? Math.round(num) : parseFloat(num).toFixed(2),
                    symbol_last ? $.mb.commafyNumber(num) + symbol : symbol + $.mb.commafyNumber(num)
            },
            fromCurrency: function(cur) {
                return parseFloat(cur.replace(/[^0-9\.\-]+/g, ""))
            },
            formatPercentage: function(num) {
                return num = (num + "").replace(/[^0-9\.\-]+/g, ""),
                    num = isNaN(num) || "" === num || null === num ? 0 : num,
                    num = 100 * $.mb.fromPercentage(num),
                    num = Math.round(1e4 * num) / 1e4,
                $.mb.commafyNumber(num) + "%"
            },
            fromPercentage: function(cur) {
                return -1 < (cur + "").indexOf("%") ? parseFloat(cur.replace(/[^0-9\.\-]+/g, "")) / 100 : 2 <= (cur = parseFloat((cur + "").replace(/[^0-9\.\-]+/g, ""))) ? cur / 100 : cur
            },
            commafyNumber: function(num) {
                var dec = "";
                if (999 < num) {
                    -1 < (num += "").indexOf(".") && (dec = num.substring(num.indexOf(".")),
                        num = num.substring(0, num.length - dec.length));
                    for (var end = num.substring(num.length - 3), commafy = num.substring(0, num.length - 3); 0 < commafy.length; )
                        commafy = 2 < commafy.length ? (end = commafy.substring(commafy.length - 3) + "," + end,
                            commafy.substring(0, commafy.length - 3)) : (end = commafy + "," + end,
                            "");
                    num = end
                }
                return num + "" + dec
            },
            formatString: function(string, arguments) {
                let str = string.toString();
                for (var key in arguments)
                    str = str.replace(new RegExp("\\{" + key + "\\}","gi"), arguments[key]);
                return str
            },
            unserialize: function(params, nocoerce) {
                if ("" === params || null == params)
                    return {};
                var coerce = !nocoerce
                    , obj = {}
                    , coerce_types = {
                    true: !0,
                    false: !1,
                    null: null
                };
                return $.each(params.replace(/\+/g, " ").split("&"), function(j, v) {
                    var val, v = v.split("="), key = decodeURIComponent(v[0]), cur = obj, i = 0, keys = key.split("]["), keys_last = keys.length - 1, keys_last = /\[/.test(keys[0]) && /\]$/.test(keys[keys_last]) ? (keys[keys_last] = keys[keys_last].replace(/\]$/, ""),
                    (keys = keys.shift().split("[").concat(keys)).length - 1) : 0;
                    if (2 === v.length)
                        if (val = decodeURIComponent(v[1]),
                        coerce && (val = val && !isNaN(val) ? +val : "undefined" === val ? void 0 : void 0 !== coerce_types[val] ? coerce_types[val] : val),
                            keys_last)
                            for (; i <= keys_last; i++)
                                cur = cur[key = "" === keys[i] ? cur.length : keys[i]] = i < keys_last ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) : val;
                        else
                            $.isArray(obj[key]) ? obj[key].push(val) : void 0 !== obj[key] ? obj[key] = [obj[key], val] : obj[key] = val;
                    else
                        key && (obj[key] = coerce ? void 0 : "")
                }),
                    obj
            },
            reserialize: function(obj) {
                return $.param(obj)
            },
            notifyPanel: function(form, type, message, remove) {
                $(form).find(".form-message").slideUp(200, function() {
                    $(this).css("opacity", "0")
                });
                var container, notification, msg = $(form).find(".form-message." + type);
                return 1 == msg.length ? (msg.html(message),
                    msg.slideDown(200, function() {
                        $(this).css("opacity", 1),
                            $(window).trigger("throttledresize")
                    }),
                remove && setTimeout(function() {
                    msg.slideUp(200, function() {
                        $(this).css("opacity", 0),
                            $(window).trigger("throttledresize")
                    })
                }, 3e3),
                    msg) : (container = $(form).find(".form-message-container"),
                    (notification = $('<div class="form-message"></div>').addClass(type).css("opacity", 0)).html(message),
                    container.length ? container.append(notification) : $(form).prepend(notification),
                    notification.slideDown(200, function() {
                        $(this).css("opacity", 1),
                            $(window).trigger("throttledresize")
                    }),
                remove && setTimeout(function() {
                    notification.slideUp(200, function() {
                        $(this).css("opacity", 0)
                    }),
                        $(window).trigger("throttledresize")
                }, 3e3),
                    notification)
            },
            relocate: function(map, url, new_window) {
                var base, loc = "", host = window.location.protocol + "//" + window.location.hostname, loc = null == url || 0 == url.length ? (loc = window.location.href).substring(host.length + 1) : url = "/" != url[0] && 0 < (base = $("head base")).length ? (url = base.attr("href") + url).substring(host.length + 1) : url, qs = [];
                $.each(map, function(key, value) {
                    if (value instanceof Object)
                        for (var x in value)
                            qs.push(key + "[" + x + "]=" + value[x]);
                    else
                        qs.push(key + "=" + value)
                }),
                0 < loc.indexOf("#") && (loc = loc.substring(0, loc.indexOf("#"))),
                    new_window ? window.open("/" + loc + (0 < qs.length ? (-1 < loc.indexOf("?") ? "&" : "?") + qs.join("&") : "")) : window.location = "/" + loc + (0 < qs.length ? (-1 < loc.indexOf("?") ? "&" : "?") + qs.join("&") : "")
            },
            escape: function(html) {
                return $("<div>").html(html).text()
            },
            countdown: (timer = {},
                    function(callback, time, name) {
                        void 0 === timer[name] && (timer[name] = 0),
                            clearTimeout(timer[name]),
                            timer[name] = setTimeout(callback, time)
                    }
            ),
            optionsFromData: function(el, options) {
                var x, ret_options = $.extend({}, options);
                for (x in ret_options)
                    if (ret_options.hasOwnProperty(x)) {
                        var val = null;
                        if (void 0 !== el.data(x.toLowerCase()) ? val = el.data(x.toLowerCase()) : void 0 !== el.data(x.replace(/([A-Z])/g, "-$1").toLowerCase()) && (val = el.data(x.replace(/([A-Z])/g, "-$1").toLowerCase())),
                        null !== val)
                            switch (typeof ret_options[x]) {
                                case "boolean":
                                    ret_options[x] = "string" == typeof val && ("true" == val || "1" == val) || val;
                                    break;
                                case "number":
                                    ret_options[x] = "number" == typeof val ? val : parseFloat(val);
                                    break;
                                default:
                                    ret_options[x] = val
                            }
                    }
                return ret_options
            },
            decode: function(val) {
                var type = typeof val;
                if ("string" == type)
                    return decodeURIComponent(val);
                if ("object" != type)
                    return val;
                for (x in val)
                    val.hasOwnProperty(x) && (val[x] = $.mb.decode(val[x]));
                return val
            },
            setCookie: function(name, value, days, cookie_domain) {
                var date, expires = "", domain = "";
                days && ((date = new Date).setTime(date.getTime() + 24 * days * 60 * 60 * 1e3),
                    expires = ";expires=" + date.toGMTString()),
                cookie_domain && (domain = ";domain=" + cookie_domain),
                    "https:" == window.location.protocol ? domain += ";secure" : domain += ";SameSite=Lax",
                    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/" + domain
            },
            getCookie: function(name, default_value) {
                for (var cname = name + "=", ca = document.cookie.split(";"), i = 0, j = ca.length; i < j; i++) {
                    var c = $.trim(ca[i]);
                    if (0 == c.indexOf(cname))
                        return decodeURIComponent(c.substring(cname.length, c.length))
                }
                return default_value
            },
            pushHistory: function(url, title, stateObject, skip_back) {
                null == title && (title = ""),
                null == stateObject && (stateObject = {}),
                window.history && (skip_back ? window.history.replaceState && window.history.replaceState(stateObject, title, url) : window.history.pushState && window.history.pushState(stateObject, title, url)),
                    $(window).trigger("historychange", {
                        url: url,
                        title: title,
                        stateObject: stateObject
                    })
            },
            getTimezoneOffset: function() {
                return (new Date).getTimezoneOffset()
            },
            getTimezoneDST: function() {
                var today = new Date
                    , jan = new Date(today.getFullYear(),0,1)
                    , jul = new Date(today.getFullYear(),6,1);
                return today.getTimezoneOffset() < Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
            },
            markText: function(element, search, options) {
                var tag = (options = options || {}).tag || "span"
                    , regex = RegExp(search, "gi")
                    , replacement = "<" + tag + ">$&</" + tag + ">";
                element.contents().each(function() {
                    this.nodeType === Node.TEXT_NODE ? $(this).replaceWith((this.textContent || this.innerText).replace(regex, replacement)) : options.ignoreChildNodes || $.mb.markText($(this), search, options)
                })
            },
            key: {
                TAB: 9,
                ENTER: 13,
                ESC: 27,
                SPACE: 32,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                HOME: 36,
                END: 35,
                BACKSPACE: 8,
                DELETE: 46,
                isArrow: function(k) {
                    switch (k = k.which || k) {
                        case $.mb.key.LEFT:
                        case $.mb.key.RIGHT:
                        case $.mb.key.UP:
                        case $.mb.key.DOWN:
                            return !0
                    }
                    return !1
                },
                isControl: function(e) {
                    switch (e.which) {
                        case $.mb.key.SHIFT:
                        case $.mb.key.CTRL:
                        case $.mb.key.ALT:
                            return !0
                    }
                    return e.metaKey
                },
                isFunctionKey: function(k) {
                    return 112 <= (k = k.which || k) && k <= 123
                }
            },
            simpleHash: function(input) {
                var hash = 0;
                if (0 == input.length)
                    return hash;
                for (var i = 0, j = input.length; i < j; ++i)
                    hash = (hash << 5) - hash + input.charCodeAt(i),
                        hash &= hash;
                return hash
            },
            urlBase64ToUint8Array: function(base64String) {
                for (var base64String = (base64String + "=".repeat((4 - base64String.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"), rawData = window.atob(base64String), outputArray = new Uint8Array(rawData.length), i = 0; i < rawData.length; ++i)
                    outputArray[i] = rawData.charCodeAt(i);
                return outputArray
            }
        }
    }(jQuery),
    !function($) {
        function resize(data) {
            var x, class_assigned = !1, ok_bp = null, last_bp = data.container.data("mbbreakpoint"), new_bp = null, width = data.container.width();
            for (x in data.options.breakPoints)
                data.options.breakPoints.hasOwnProperty(x) && (x <= width ? ok_bp = x : class_assigned || null == ok_bp || (data.container.addClass(data.options.breakPoints[ok_bp]),
                    new_bp = ok_bp,
                    class_assigned = !0),
                    data.container.removeClass(data.options.breakPoints[x]));
            class_assigned || null == ok_bp || (data.container.addClass(data.options.breakPoints[ok_bp]),
                new_bp = ok_bp),
            new_bp != last_bp && (data.container.data("mbbreakpoint", new_bp),
                data.container.trigger("breakpoint_changed"))
        }
        $.fn.mbBreakPoints = function(options) {
            return this.length && (options = $.extend({}, $.fn.mbBreakPoints.default_options, options),
                $(this).each(function() {
                    var data;
                    (data = {
                        container: $(this),
                        options: options
                    }).container.data("bp_initialized") || (data.options = $.mb.optionsFromData(data.container, data.options),
                        $(window).on(data.options.resizeEvent, function() {
                            resize(data)
                        }),
                        data.container.on("breakpointresize", function() {
                            resize(data)
                        }),
                        data.container.data("bp_initialized", !0))
                })),
                this
        }
            ,
            $.fn.mbBreakPoints.default_options = {
                resizeEvent: "throttledresize.mb.breakpoints",
                breakPoints: {}
            }
    }(jQuery),
    !function($) {
        $.fn.mbUpdate = function(options) {
            return this.length && (options = $.extend({}, $.fn.mbUpdate.default_options, options),
                $(this).each(function() {
                    !function(el, options) {
                        void 0 === el.data("action") ? console.log("Warning: cannot register automatic updates on an element with no data-action attribute.") : (void 0 === el.data("filter") && el.data("filter", options.filter),
                        void 0 === el.data("accept") && el.data("accept", options.accept),
                        void 0 === el.data("replace") && el.data("replace", options.replace),
                        void 0 === el.data("clean") && el.data("clean", options.clean),
                        1 != el.data("mbupdatesinitialized") && (el.on("update.mb.update", function(e) {
                            options.direct && e.target != this || ($(this).trigger("refreshfilter"),
                                function(el, options) {
                                    var filter_data = $.extend({}, $.mb.unserialize(el.data("filter")))
                                        , pre_hash = (el.addClass(options.loadingClass),
                                    $.mb.simpleHash(el.data("action") + "?" + $.mb.reserialize(filter_data)) + el.data("accept"));

                                    //--------------- modified from original hickman.com site ---------------
                                    if ( !show_quantity && el.data("action").indexOf("quantity-adjust") >= 0 ) {
                                        return false;
                                    }
                                    //-----------------------------------------------------------------------

                                    el.data("updatehash", pre_hash),
                                        $.ajax({
                                            url: el.data("action"),
                                            type: "get",
                                            data: filter_data,
                                            dataType: el.data("accept"),
                                            xhrFields: options.xhrFields,
                                            complete: function(hash) {
                                                return function(jxr) {
                                                    el.data("updatehash") == hash && (el.removeClass(options.loadingClass),
                                                        function(el, jxr) {
                                                            if (el.data("replace"))
                                                                switch (el.data("accept")) {
                                                                    case "json":
                                                                        el.html(jxr.responseJSON.payload);
                                                                        break;
                                                                    case "html":
                                                                    case "text":
                                                                        el.html(jxr.responseText)
                                                                }
                                                            el.trigger("updated", jxr)
                                                        }(el, jxr))
                                                }
                                            }(pre_hash)
                                        })
                                }($(this), options))
                        }),
                            el.on("refreshfilter.mb.update", function() {
                                var el, el_id, filter_data;
                                el = $(this),
                                    el_id = el.identify(),
                                    filter_data = $.extend({}, $.mb.unserialize(el.data("filter"))),
                                    $('form[data-filterfor~="' + el_id + '"]').each(function() {
                                        if (el.data("clean")) {
                                            var x, fixed_x, fdata = $(this).serializeJSON();
                                            for (x in fdata)
                                                fdata.hasOwnProperty(x) && (-1 !== x.indexOf("[]") && x.indexOf("[]") === x.length - 2 ? (fixed_x = x.substr(0, x.indexOf("[]")),
                                                    delete filter_data[fixed_x],
                                                    delete filter_data[x],
                                                    $.mb.isArray(fdata[x]) ? 1 === fdata[x].length && -1 < fdata[x][0].indexOf(",") ? fdata[fixed_x] = fdata[x][0].split(",") : 0 < fdata[x].length && (fdata[fixed_x] = fdata[x]) : fdata[fixed_x] = fdata[x].split(","),
                                                    delete fdata[x]) : "" == fdata[x] ? (delete fdata[x],
                                                    delete filter_data[x]) : -1 !== x.indexOf(":lowerlike") && (fdata[x] = "%" + fdata[x] + "%"));
                                            filter_data = $.extend(filter_data, fdata)
                                        } else
                                            filter_data = $.extend(filter_data, $(this).serializeJSON())
                                    }),
                                    el.data("filter", $.mb.reserialize(filter_data))
                            }),
                        el.attr("defer") && el.trigger("update")),
                            el.data("mbupdatesinitialized", !0))
                    }($(this), options)
                })),
                this
        }
            ,
            $.fn.mbUpdate.default_options = {
                loadingClass: "busy",
                filter: "",
                accept: "json",
                replace: !1,
                clean: !1,
                direct: !1,
                xhrFields: {}
            }
    }(jQuery),
    !function($) {
        $.fn.mbRegisterUpdate = function(targets) {
            return 0 < targets.length && $(this).on("updated.mb", function() {
                targets.trigger("update")
            }),
                this
        }
    }(jQuery),
    !function($) {
        $.fn.serializeJSON = function() {
            var json = {};
            return jQuery.map($(this).serializeArray(), function(n, i) {
                -1 < n.name.indexOf("[]") ? (json[n.name]instanceof Array || (json[n.name] = []),
                    json[n.name].push(n.value)) : json[n.name] = n.value
            }),
                json
        }
    }(jQuery),
    !function($) {
        function category_format(cat) {
            var originalOption = cat.element;
            return '<span class="category-select-swatch" style="background-color:#' + $(originalOption).data("color") + ';"></span>' + cat.text
        }
        function get_datetime_options(el) {
            var dtp_options = {
                timeFormat: "h:mmtt",
                showOtherMonths: !0,
                constrainInput: !1
            };
            return el.data("min") && (dtp_options.minDate = el.data("min")),
            el.data("max") && (dtp_options.maxDate = el.data("max")),
            el.data("dateformat") && (dtp_options.dateFormat = el.data("dateformat")),
            el.data("timeformat") && (dtp_options.timeFormat = el.data("timeformat")),
            el.data("showothermonths") && (dtp_options.showOtherMonths = el.data("showothermonths")),
                dtp_options
        }
        function resize_button_input_groups(data) {
            data.form.find(".input-button-group").each(function() {
                var input = $(this).find("input").css("padding-right", "")
                    , width = parseInt(input.css("padding-right"));
                $(this).children("button,.btn-group").each(function() {
                    $(this).show(),
                        width += $(this).outerWidth()
                }),
                    input.css("padding-right", width)
            })
        }
        function validate_form(data) {
            var valid = data.form.valid();
            return data.form.find("textarea.required:visible").each(function() {
                "" == $.trim($(this).val().replace(/<br>|&nbsp;/g, "")) && (valid = !1)
            }),
                data.form.data("valid", valid),
                valid
        }
        $.fn.mbForm = function(opt) {
            return this.length && $(this).each(function() {
                var options = $.extend({}, $.fn.mbForm.default_options, opt);
                !function(data) {
                    var valid_rules;
                    data.options = $.mb.optionsFromData(data.form, data.options),
                    data.form.data("initialized") || (valid_rules = $.extend(data.options.validationRules, {
                        password_confirm: {
                            equalTo: "#" + data.form.identify() + ' input[name="password"]'
                        }
                    }),
                        data.form.validate({
                            rules: valid_rules,
                            ignore: ":hidden:not(.select2ajax)",
                            errorElement: data.options.errorElement,
                            showErrors: function(errorMap, errorList) {
                                data.form.find(".label." + data.options.errorClass).removeClass(data.options.errorClass);
                                for (var i = 0, j = errorList.length; i < j; ++i)
                                    $(errorList[i].element).parents(".label").addClass(data.options.errorClass);
                                this.defaultShowErrors(),
                                0 < errorList.length && data.form.trigger("founderror"),
                                    data.form.trigger("validated")
                            }
                        }),
                        data.form.on("submit.mb.form", function(event) {
                            var ff;
                            return data.form.data("filterfor") ? (ff = data.form.data("filterfor"),
                                $("#" + ff.split(" ").join(", #")).each(function() {
                                    var target = $(this)
                                        , filter = $.mb.unserialize(target.data("filter"));
                                    filter.offset && (filter.offset = 0,
                                        target.data("filter", $.mb.reserialize(filter))),
                                        target.trigger("update")
                                }),
                                data.form.trigger("searchsubmit"),
                                !1) : data.options.ajax ? (data.options.autoValidate && !validate_form(data) || function(data) {
                                data.form.trigger("presubmit");
                                var ignored_elements = data.form.find(data.options.ignoreSelector + ":enabled").attr("disabled", "disabled")
                                    , type = data.form.attr("method").toLowerCase()
                                    , form_data = (function(data) {
                                    data.form.find(data.options.rteSelector).length && tinyMCE.triggerSave()
                                }(data),
                                    {})
                                    , content_type = !1;
                                form_data = "post" == type ? new FormData(data.form.get(0)) : "delete" == type ? (content_type = "application/json",
                                    JSON.stringify(data.form.serializeJSON())) : data.form.serializeJSON();
                                data.form.find(".select2ajax[data-multiple], select.select2[multiple]").each(function() {
                                    var name = $(this).attr("name")
                                        , s2m_value = $(this).val();
                                    if ("object" == typeof s2m_value)
                                        form_data[name] = s2m_value;
                                    else if ("]" == name.substr(name.length - 1) && null != form_data.get(name))
                                        if ("post" == type) {
                                            var values = form_data.get(name).split(",")
                                                , found = !1;
                                            form_data.delete(name);
                                            for (var i = 0; i < values.length; i++)
                                                values[i].length && (form_data.append(name, values[i]),
                                                    found = !0);
                                            found || form_data.set(name, [])
                                        } else
                                            form_data[name] = form_data[name].split(",")
                                }),
                                    ignored_elements.removeAttr("disabled");
                                var disabled_elements = data.form.find("input:enabled, textarea:enabled, select:enabled").attr("disabled", "disabled")
                                    , disabled_submit = data.form.find('[type="submit"]').attr("disabled", "disabled")
                                    , ignored_elements = (disabled_submit.each(function() {
                                    !1 !== $(this).data("saving") && (void 0 === $(this).data("saving") && $(this).data("saving", "Saving..."),
                                    void 0 === $(this).data("saved") && ("input" == $(this)[0].tagName ? $(this).data("saved", $(this).val()) : $(this).data("richsaved") ? $(this).data("saved", $($(this).html())) : $(this).data("saved", $(this).html())),
                                        "input" == $(this)[0].tagName ? $(this).val($(this).data("saving")) : $(this).data("richsaving") ? $(this).html($($(this).data("saving"))) : $(this).html($(this).data("saving")))
                                }),
                                    data.form.find(data.options.notificationSelector).each(function() {
                                        $(this).trigger("click")
                                    }),
                                    data.form.find(data.options.errorElement + "." + data.options.errorClass).remove(),
                                    data.form.find("." + data.options.hasErrorClass).removeClass(data.options.hasErrorClass),
                                    {});
                                data.options.acceptHTML && (ignored_elements.Accept = "text/html");
                                $.ajax({
                                    url: data.form.attr("action"),
                                    type: data.form.attr("method"),
                                    data: form_data,
                                    processData: "post" != type,
                                    contentType: content_type,
                                    headers: ignored_elements,
                                    xhrFields: data.options.xhrFields,
                                    xhr: function() {
                                        var xhr = new window.XMLHttpRequest;
                                        return data.options.uploadMeter && 0 < data.form.find('input[type="file"]').length && ($.mb.notifyPanel(data.form, "info", '<div class="file-upload meter"><span class="progress-bar" role="progressbar" style="width:0"></span></div>', !1),
                                            xhr.upload.addEventListener("progress", function(e) {
                                                e.lengthComputable && (e = e.loaded / e.total,
                                                    data.form.find(".file-upload .progress-bar").css("width", Math.round(100 * e) + "%"))
                                            }, !1)),
                                            xhr
                                    },
                                    complete: function(jxr) {
                                        var response_data = {}
                                            , response_data = data.options.acceptHTML || !jxr.hasOwnProperty("responseJSON") ? jxr.responseText : jxr.responseJSON
                                            , status = jxr.status;
                                        disabled_elements.removeAttr("disabled"),
                                            disabled_submit.removeAttr("disabled").each(function() {
                                                !1 !== $(this).data("saving") && ("input" == $(this)[0].tagName ? $(this).val($(this).data("saved")) : $(this).html($(this).data("saved")))
                                            }),
                                            data.form.find(".file-upload .progress-bar").css("width", "100%").addClass("done"),
                                            function(data, response_data, status, raw) {
                                                var success = 200 <= status && status < 300;
                                                if (success) {
                                                    if (data.options.reload)
                                                        return window.location.reload();
                                                    data.options.reset == status && data.form.trigger("smartreset"),
                                                    data.options.modalClose && 0 < data.form.parents(".ui-dialog-content").length && $.fn.dialog && data.form.parents(".ui-dialog-content").dialog("close")
                                                } else {
                                                    if (void 0 !== response_data && void 0 !== response_data.payload) {
                                                        var x, tabs = $();
                                                        for (x in response_data.payload) {
                                                            var input = data.form.find('[name="' + x + '"]:not([type="hidden"])').eq(0);
                                                            input.is("textarea") || "checkbox" === input.attr("type") || "radio" === input.attr("type") ? input.closest(".label").append("<" + data.options.errorElement + ' class="' + data.options.errorClass + '">' + response_data.payload[x] + "</" + data.options.errorElement + ">") : input.addClass(data.options.errorClass).after("<" + data.options.errorElement + ' class="' + data.options.errorClass + '">' + response_data.payload[x] + "</" + data.options.errorElement + ">"),
                                                            input.parents(".tab") && (tabs = tabs.add(input.parents(".tab")))
                                                        }
                                                        0 < tabs.length && tabs.first().trigger("activate")
                                                    }
                                                    data.form.trigger("founderror")
                                                }
                                                void 0 !== response_data && void 0 !== response_data.message && data.options.notify && $.mb.notifyPanel(data.form, success ? "success" : "error", response_data.message, data.options.removeNotifications && success);
                                                data.form.trigger("updated", [raw]),
                                                success && !1 !== data.options.redirect && (window.location = data.form.data("redirect"))
                                            }(data, response_data, status, jxr)
                                    }
                                })
                            }(data),
                                !1) : !data.options.uploader && (data.options.autoValidate && !validate_form(data) ? (event.stopImmediatePropagation(),
                                !1) : (data.form.trigger("presubmit"),
                                !0))
                        }),
                        data.form.on("validate.mb.form", function() {
                            validate_form(data)
                        }),
                        data.form.on("smartreset.mb.form", function() {
                            !function(data) {
                                data.form.find(":input").not(":button, :submit, :reset, :hidden, :checkbox, :radio, .sticky").val("").removeAttr("selected"),
                                    data.form.find(":checkbox").not(".sticky").removeAttr("checked"),
                                    data.form.find(data.options.notificationSelector + ":not(.sticky)").remove(),
                                    data.form.find(data.options.errorElement + "." + data.options.errorClass + ":not(.sticky)").remove(),
                                    data.form.find(data.options.errorClass + ":not(.sticky)").removeClass(data.options.errorClass),
                                    data.form.find("textarea:visible:enabled:not(.sticky)").val(""),
                                    data.form.find(".label.select-icon label:not(.sticky)").removeClass("selected"),
                                    data.form.parents("." + data.options.populatedClass + ":not(.sticky)").removeClass(data.options.populatedClass),
                                    data.form.find(data.options.rteSelector + ":not(.sticky)").html(""),
                                $.fn.select2 && data.form.find("input.select2ajax:not(.sticky)").select2("data", "");
                                data.form.find("input.suggest:not(.sticky)").trigger("reset"),
                                    data.form.find(".repeatable:not(.sticky)").trigger("reset");
                                var rel = data.form.find(".colorpicker-input:not(.sticky)").data("related-selector");
                                $(rel).attr("style", ""),
                                $.fn.select2 && data.form.find(data.options.changeSelector).not(".sticky").each(function() {
                                    $(this).select2("val", "")
                                });
                                $.fn.datepicker && (data.form.find(".datepicker-to:not(.sticky)").datepicker("option", "minDate", null),
                                    data.form.find(".datepicker-from:not(.sticky)").datepicker("option", "maxDate", null));
                                $.fn.timepicker && (data.form.find(".datetimepicker-to:not(.sticky)").datetimepicker("option", "minDate", null),
                                    data.form.find(".datetimepicker-from:not(.sticky)").datetimepicker("option", "maxDate", null));
                                data.form.find("[data-default-value]:not(.sticky)").each(function() {
                                    var input = $(this)
                                        , value = input.data("default-value");
                                    $.fn.select2 && input.data("select2") ? input.select2("val", value) : input.val(value)
                                })
                            }(data)
                        }),
                        data.form.data("valid", !1),
                    void 0 !== data.form.data("related") && data.form.mbRegisterUpdate($("#" + data.form.data("related").split(",").join(", #"))),
                    $.fn.select2 && function(data) {
                        data.form.find("select.select2:not(.category-select)").each(function() {
                            var params = {};
                            $(this).data("allowclear") && (params.allowClear = !0,
                                null != $(this).data("placeholder") ? params.placeholder = $(this).data("placeholder") : params.placeholder = "Select..."),
                                $(this).select2(params)
                        }),
                            data.form.find("select.select2.category-select").each(function() {
                                var s2, selected;
                                s2 = $(this),
                                    selected = [],
                                    s2.find("*[data-locked],:selected").each(function() {
                                        var val = $(this).attr("value")
                                            , label = $(this).html()
                                            , is_locked = $(this).data("locked");
                                        selected.push({
                                            id: val,
                                            text: label,
                                            locked: is_locked
                                        })
                                    }),
                                    s2.select2({
                                        formatResult: category_format,
                                        formatSelection: category_format,
                                        escapeMarkup: function(m) {
                                            return m
                                        }
                                    }),
                                    s2.select2("data", selected)
                            }),
                            data.form.find("input.keywords").each(function() {
                                !function(s2) {
                                    var keyword_options = {
                                        initSelection: function(el, callback) {
                                            var data;
                                            0 < $.trim(el.val()).length ? (data = [],
                                                $(el.val().split(",")).each(function() {
                                                    var val = $.trim(this);
                                                    data.push({
                                                        id: val,
                                                        text: val
                                                    })
                                                }),
                                                callback(data)) : callback([])
                                        },
                                        tokenSeparators: [","],
                                        multiple: !0,
                                        escapeMarkup: function(m) {
                                            return m
                                        },
                                        tags: !0
                                    };
                                    s2.data("maxlength") && (keyword_options.maximumSelectionSize = s2.data("maxlength"));
                                    {
                                        var schema, field;
                                        s2.data("classkey") ? (keyword_options.createSearchChoice = function(term, data) {
                                                if (0 === $(data).filter(function() {
                                                    return 0 == this.text.localeCompare(term)
                                                }).length)
                                                    return {
                                                        id: term,
                                                        text: term
                                                    }
                                            }
                                                ,
                                                schema = "",
                                            s2.data("schema") && (schema = "/" + s2.data("schema")),
                                                field = "name",
                                            s2.data("field") && (field = s2.data("field")),
                                                keyword_options.ajax = {
                                                    url: "rest/" + el.data("classkey") + schema,
                                                    dataType: "json",
                                                    cache: !0,
                                                    data: function(term, page) {
                                                        var filter = {};
                                                        return (filter = s2.data("filter") ? $.mb.unserialize(s2.data("filter")) : filter)[field + ":lowerlike"] = term + "%",
                                                        filter.limit || (filter.limit = 10),
                                                            filter
                                                    },
                                                    results: function(data, page) {
                                                        for (var res = [], i = 0, j = data.payload.length; i < j; i++)
                                                            res.push({
                                                                id: data.payload[i][field],
                                                                text: data.payload[i][field] + ""
                                                            });
                                                        return {
                                                            results: res
                                                        }
                                                    }
                                                },
                                                keyword_options.escapeMarkup = function(m) {
                                                    return m
                                                }
                                        ) : keyword_options.formatSearching = function() {
                                            return ""
                                        }
                                    }
                                    s2.select2(keyword_options)
                                }($(this))
                            }),
                            data.form.find("input.select2ajax").mbS2Ajax()
                    }(data),
                    $.fn.colorpicker && function(data) {
                        data.form.find(".colorpicker-input").each(function() {
                            $(this).colorpicker({
                                colorFormat: "#HEX"
                            });
                            var rule, rel = $(this).data("related-selector");
                            null != rel && (rule = null != $(this).data("rule") ? $(this).data("rule") : "color",
                                $(this).on("change", function() {
                                    $(rel).css(rule, $(this).val())
                                }))
                        })
                    }(data),
                    $.fn.datepicker && function(data) {
                        data.form.find(".datepicker").each(function() {
                            $(this).datepicker(get_datetime_options($(this)))
                        }),
                            data.form.find(".datepicker-from").each(function() {
                                var dtp_options = get_datetime_options($(this));
                                dtp_options.onClose = function(dateText) {
                                    var startDateTextBox = $(this)
                                        , endDateTextBox = $(this).parents(".form-cols").find(".datepicker-to");
                                    "" != endDateTextBox.val() ? (startDateTextBox = startDateTextBox.datepicker("getDate"),
                                    endDateTextBox.datepicker("getDate") < startDateTextBox && endDateTextBox.datepicker("setDate", startDateTextBox)) : endDateTextBox.val(dateText)
                                }
                                    ,
                                    dtp_options.onSelect = function(selectedDateTime) {
                                        var startDateTextBox = $(this);
                                        $(this).parents(".form-cols").find(".datepicker-to").datepicker("option", "minDate", startDateTextBox.datepicker("getDate"))
                                    }
                                    ,
                                    $(this).datepicker(dtp_options)
                            }),
                            data.form.find(".datepicker-to").each(function() {
                                var dtp_options = get_datetime_options($(this));
                                dtp_options.onClose = function(dateText) {
                                    var testStartDate, startDateTextBox = $(this).parents(".form-cols").find(".datepicker-from"), endDateTextBox = $(this);
                                    "" != startDateTextBox.val() ? (testStartDate = startDateTextBox.datepicker("getDate"),
                                    (endDateTextBox = endDateTextBox.datepicker("getDate")) < testStartDate && startDateTextBox.datepicker("setDate", endDateTextBox)) : startDateTextBox.val(dateText)
                                }
                                    ,
                                    dtp_options.onSelect = function(selectedDateTime) {
                                        var endDateTextBox = $(this);
                                        $(this).parents(".form-cols").find(".datepicker-from").datepicker("option", "maxDate", endDateTextBox.datepicker("getDate"))
                                    }
                                    ,
                                    $(this).datepicker(dtp_options)
                            }),
                        $.fn.datetimepicker && (data.form.find(".datetimepicker").each(function() {
                            $(this).datetimepicker(get_datetime_options($(this)))
                        }),
                            data.form.find(".datetimepicker-from").each(function() {
                                var dtp_options = get_datetime_options($(this));
                                dtp_options.onClose = function(dateText) {
                                    var startDateTextBox = $(this)
                                        , endDateTextBox = $(this).parents(".form-cols").find(".datetimepicker-to");
                                    "" != endDateTextBox.val() ? (startDateTextBox = startDateTextBox.datetimepicker("getDate"),
                                    endDateTextBox.datetimepicker("getDate") < startDateTextBox && endDateTextBox.datetimepicker("setDate", startDateTextBox)) : endDateTextBox.val(dateText)
                                }
                                    ,
                                    dtp_options.onSelect = function(selectedDateTime) {
                                        var startDateTextBox = $(this);
                                        $(this).parents(".form-cols").find(".datetimepicker-to").datetimepicker("option", "minDate", startDateTextBox.datetimepicker("getDate"))
                                    }
                                    ,
                                    $(this).datetimepicker(dtp_options)
                            }),
                            data.form.find(".datetimepicker-to").each(function() {
                                var dtp_options = get_datetime_options($(this));
                                dtp_options.onClose = function(dateText) {
                                    var testStartDate, startDateTextBox = $(this).parents(".form-cols").find(".datetimepicker-from"), endDateTextBox = $(this);
                                    "" != startDateTextBox.val() ? (testStartDate = startDateTextBox.datetimepicker("getDate"),
                                    (endDateTextBox = endDateTextBox.datetimepicker("getDate")) < testStartDate && startDateTextBox.datetimepicker("setDate", endDateTextBox)) : startDateTextBox.val(dateText)
                                }
                                    ,
                                    dtp_options.onSelect = function(selectedDateTime) {
                                        var endDateTextBox = $(this);
                                        $(this).parents(".form-cols").find(".datetimepicker-from").datetimepicker("option", "maxDate", endDateTextBox.datetimepicker("getDate"))
                                    }
                                    ,
                                    $(this).datetimepicker(dtp_options)
                            }),
                            data.form.find(".timepicker").each(function() {
                                $(this).timepicker(get_datetime_options($(this)))
                            }))
                    }(data),
                    null != $.fn.tinymce && (tinymce.baseURL = data.options.tinyMCEBase,
                        function(data) {
                            data = data.form.find(data.options.rteSelector);
                            data.length && data.each(function() {
                                var input = $(this)
                                    , modal = $(this).parents(".modal")
                                    , replace_pane = $(this).parents(".replace-pane")
                                    , init_class = "mb-form-tinymce-initialized"
                                    , options = input.data();
                                options.setup = function(editor) {
                                    editor.on("change", function() {
                                        editor.save()
                                    })
                                }
                                    ,
                                    modal.length && !$(this).is(":visible") ? modal.on("open.mb.modal", function() {
                                        input.hasClass(init_class) || (input.tinymce(options),
                                            input.addClass(init_class))
                                    }) : replace_pane.length && !$(this).is(":visible") ? replace_pane.on("replaced", function() {
                                        input.hasClass(init_class) || (input.tinymce(options),
                                            input.addClass(init_class))
                                    }) : input.hasClass(init_class) || (input.tinymce(options),
                                        input.addClass(init_class))
                            })
                        }(data)),
                    $.fn.iButton && function(data) {
                        data.form.find(".ibutton").iButton(),
                        data.form.hasClass("switch-form") && data.form.find('input[type="checkbox"]').on("change.mb.form", function() {
                            $(this).is(":checked") ? $(this).parents("form").find(".checkbox-value").val("1") : $(this).parents("form").find(".checkbox-value").val("0"),
                                data.form.submit()
                        })
                    }(data),
                    $.fn.slider && function(data) {
                        data.form.find(".slider").each(function() {
                            var el = data.form.find('[name="' + $(this).data("input") + '"]')
                                , min = el.data("min") ? el.data("min") : 0
                                , max = el.data("max") ? el.data("max") : 100
                                , step = el.data("step") ? el.data("step") : 1
                                , prefix = el.data("prefix") ? el.data("prefix") : ""
                                , postfix = el.data("postfix") ? el.data("postfix") : ""
                                , min = {
                                min: min,
                                max: max,
                                step: step,
                                slide: function(event, ui) {
                                    el.val(prefix + ui.value + postfix)
                                }
                            };
                            "" != el.val() && (min.value = el.val()),
                                $(this).slider(min),
                                el.val(prefix + $(this).slider("option", "value") + postfix)
                        })
                    }(data),
                        function(data) {
                            data.form.find(".label.select-icon label").on("click", function() {
                                $(this).find('input[type="radio"]').prop("checked") && (data.form.find(".label.select-icon label").removeClass("selected"),
                                    $(this).addClass("selected"))
                            })
                        }(data),
                    $.fn.mbSuggest && data.form.find("input.suggest").mbSuggest(),
                    $.fn.mbRepeatableInput && data.form.find(".repeatable").mbRepeatableInput(),
                    $.fn.mbMultiLingualInput && data.form.find(".multi-lingual-container").mbMultiLingualInput(),
                        $(window).on("throttledresize", function() {
                            resize_button_input_groups(data)
                        }),
                        resize_button_input_groups(data),
                        $(this).mbRegisterUpdate(data.options.relatedTables),
                        data.form.attr("data-initialized", 1),
                        data.form.trigger("initialized.mb.form"))
                }({
                    form: $(this),
                    options: options
                })
            }),
                this
        }
            ,
            $.fn.mbForm.default_options = {
                errorElement: "span",
                autoValidate: !0,
                relatedTables: [],
                validationRules: {},
                ajax: !0,
                uploader: !1,
                acceptHTML: !1,
                reset: 201,
                notify: !0,
                redirect: !1,
                reload: !1,
                modalClose: !0,
                uploadMeter: !0,
                removeNotifications: !0,
                tinyMCEBase: "/js/tinymce",
                errorClass: "error",
                hasErrorClass: "has-error",
                populatedClass: "populated",
                rteSelector: ".mb-richtext",
                changeSelector: "select.select2, select.keywords, select.select2ajax, select.select2multiple",
                ignoreSelector: ".ignore",
                notificationSelector: ".notification",
                xhrFields: {},
                timezones: [{
                    label: "EST",
                    value: "-0400"
                }, {
                    label: "CST",
                    value: "-0500"
                }, {
                    label: "MST",
                    value: "-0600"
                }, {
                    label: "PST",
                    value: "-0700"
                }]
            }
    }(jQuery),
    !function($) {
        $.fn.mbS2Ajax = function(opt) {
            return this.length && (opt = $.extend({}, $.fn.mbS2Ajax.default_options, opt),
                this.each(function() {
                    !function(data) {
                        var s2 = data.container
                            , schema = ""
                            , url = "";
                        s2.data("schema") && (schema = "/" + s2.data("schema"));
                        url = null == s2.data("action") ? "rest/" + s2.data("classkey") + schema : s2.data("action") + schema;
                        s2.data("url", url),
                            s2.select2({
                                multiple: s2.data("multiple"),
                                allowClear: !!s2.data("allowclear"),
                                placeholder: s2.data("placeholder") ? s2.data("placeholder") : "Select...",
                                ajax: {
                                    url: function(el) {
                                        return function() {
                                            return el.data("url")
                                        }
                                    }(s2),
                                    data: function(term, page) {
                                        var filter = $.mb.unserialize(s2.data("filter"))
                                            , def = {};
                                        return def[s2.data("displayfield") + ":lowerlike"] = "%" + term + "%",
                                            $.extend(def, filter)
                                    },
                                    results: function(data, page) {
                                        for (var res = [], i = 0, j = data.payload.length; i < j; i++)
                                            res.push({
                                                id: data.payload[i][s2.data("valuefield")],
                                                text: data.payload[i][s2.data("displayfield")] + "",
                                                payload: data.payload[i]
                                            });
                                        return {
                                            results: res
                                        }
                                    }
                                },
                                initSelection: function(element, callback) {
                                    function complete(jxr) {
                                        var data = jxr.responseJSON
                                            , result = {};
                                        if ($.isArray(data.payload))
                                            for (var result = [], i = 0, j = data.payload.length; i < j; i++)
                                                result.push({
                                                    id: data.payload[i][s2.data("valuefield")],
                                                    text: data.payload[i][s2.data("displayfield")] + "",
                                                    payload: data.payload[i]
                                                });
                                        else
                                            result.id = data.payload[s2.data("valuefield")],
                                                result.text = data.payload[s2.data("displayfield")] + "",
                                                result.payload = data.payload;
                                        callback(result)
                                    }
                                    var req_data, element = $(element).val();
                                    s2.data("strval") ? s2.data("strdisp") ? s2.select2("data", {
                                        id: s2.data("strval"),
                                        text: s2.data("strdisp")
                                    }) : s2.select2("data", {
                                        id: s2.data("strval"),
                                        text: s2.data("strval")
                                    }) : "" !== element && (s2.data("multiple") || null != s2.data("action") ? (element = element.split(","),
                                        (req_data = {})[s2.data("valuefield")] = element,
                                        $.ajax({
                                            type: "get",
                                            data: req_data,
                                            url: url,
                                            xhrFields: $.fn.mbForm.default_options.xhrFields,
                                            complete: complete
                                        })) : $.ajax({
                                        type: "get",
                                        url: "rest/" + s2.data("classkey") + "/" + element + schema,
                                        xhrFields: $.fn.mbForm.default_options.xhrFields,
                                        complete: complete
                                    }))
                                },
                                escapeMarkup: function(m) {
                                    return m
                                }
                            })
                    }({
                        container: $(this),
                        options: opt
                    })
                })),
                this
        }
            ,
            $.fn.mbS2Ajax.default_options = {}
    }(jQuery),
    !function($) {
        function action(action, data) {
            var hash = "";
            return -1 < action.indexOf("#") && (hash = action.substr(action.indexOf("#")),
                action = action.substr(0, action.indexOf("#"))),
            0 == (action = action.split("/"))[action.length - 1].length && (action.length = action.length - 1),
                2 < action.length ? $.mb.isNumeric(action[2]) ? action[2] = data.id : action.splice(2, 0, data.id) : action.push(data.id),
            action.join("/") + hash
        }
        function simple(input, data) {
            void 0 === data[input.attr("name")] || "off" == input.attr("autocomplete") || input.data("nopopulate") || (input.hasClass("currency") ? input.val($.mb.formatCurrency(data[input.attr("name")])) : input.hasClass("mb-richtext") ? input.val(data[input.attr("name")]) : input.hasClass("select-boolean") ? input.val(!0 === data[input.attr("name")] ? 1 : 0) : input.val($.mb.escape(data[input.attr("name")])))
        }
        function datepicker(input, data) {
            data = data[input.attr("name")];
            null != data && null != data.date && input.datepicker("setDate", $.datepicker.parseDate("yy-mm-dd", data.date))
        }
        function datetimepicker(input, data) {
            data = data[input.attr("name")];
            null != data && null != data.date && input.datetimepicker("setDate", $.datepicker.parseDateTime("yy-mm-dd", "HH:mm:ss.lc", data.date))
        }
        function timepicker(input, data) {
            data = data[input.attr("name")];
            null != data && null != data.date && input.timepicker("setDate", $.datepicker.parseTime("HH:mm:ss.l", data.date))
        }
        function checkbox(input, data) {
            var name = input.attr("name").replace("[]", "");
            if (void 0 !== data[name]) {
                var ar = data[name];
                if ($.mb.isArray(ar))
                    for (var i = 0, j = ar.length; i < j; ++i)
                        (void 0 === ar[i].id ? ar[i] : ar[i].id) == input.val() && input.prop("checked", !0).change();
                else
                    input.prop("checked", (void 0 === ar.id ? ar : ar.id) == input.val()).change()
            }
        }
        function radiobutton(input, data) {
            data = data[input.attr("name")];
            input.prop("checked", void 0 !== data && (void 0 === data.id ? data : data.id) == input.val()).change()
        }
        function richtext(input) {
            $.fn.cleditor && input.cleditor().get(0).updateFrame()
        }
        function staticfield(element, data, options) {
            options = element.attr("id").substr(options.staticFieldID.length);
            void 0 !== data[options] && (element.hasClass("currency") ? element.html($.mb.formatCurrency(data[options])) : element.html(data[options]))
        }
        function category(sel, data) {
            var filter;
            $.fn.select2 && (filter = null != sel.data("filter") ? $.mb.unserialize(sel.data("filter")) : {},
                $.ajax({
                    type: "get",
                    url: "rest/category/" + data.id + "/select",
                    data: filter,
                    xhrFields: $.fn.mbForm.default_options.xhrFields,
                    complete: function(jxr) {
                        var data = {};
                        eval("data = " + jxr.responseText),
                        void 0 !== data.payload && sel.select2("data", data.payload).change()
                    }
                }))
        }
        function select2multiple(sel, data) {
            var name;
            $.fn.select2 && null != data[name = sel.attr("name").replace("[]", "")] && sel.select2("data", data[name]).change()
        }
        function select2ajax(sel, data) {
            var name;
            $.fn.select2 && null != data[name = sel.attr("name")] && sel.select2("val", data[name]).change()
        }
        $.fn.mbFormPopulate = function(data, opt) {
            var options = {
                staticSelector: ".form-text.static",
                staticFieldID: "static-field-",
                populatedClass: "populated",
                parentSelector: ".edit",
                changeSelector: ".select2, .keywords, .select2ajax, .select2multiple, .select2ajax, .slider",
                categorySelector: "select.select2.category-select",
                editorSelector: ".cleditor",
                dateSelector: ".datepicker",
                dateTimeSelector: ".datetimepicker",
                timeSelector: ".timepicker"
            };
            return $.extend(options, opt),
                $(this).each(function() {
                    var form = $(this);
                    form.trigger("smartreset"),
                    void 0 !== data.id && form.attr("action", action(form.attr("action"), data)),
                        form.find('input[type="text"], input[type="hidden"], select, textarea').each(function() {
                            simple($(this), data)
                        }),
                        form.find("input[type=checkbox]").each(function() {
                            checkbox($(this), data)
                        }),
                        form.find("input[type=radio]").each(function() {
                            radiobutton($(this), data)
                        }),
                        form.find(options.editorSelector).each(function() {
                            richtext($(this))
                        }),
                        form.find(options.staticSelector).each(function() {
                            staticfield($(this), data, options)
                        }),
                        form.find(options.dateSelector).each(function() {
                            datepicker($(this), data)
                        }),
                        form.find(options.dateTimeSelector).each(function() {
                            datetimepicker($(this), data)
                        }),
                        form.find(options.timeSelector).each(function() {
                            timepicker($(this), data)
                        }),
                        form.find(options.changeSelector).change(),
                        form.find('.select2[multiple="multiple"]').each(function() {
                            select2multiple($(this), data)
                        }),
                        form.find(".select2ajax").each(function() {
                            select2ajax($(this), data)
                        }),
                        form.find(options.categorySelector).each(function() {
                            category($(this), data)
                        }),
                        form.parents(options.parentSelector).addClass(options.populatedClass),
                        form.find("input.suggest").trigger("update")
                }),
                this
        }
    }(jQuery),
    !function($) {
        function get_cookie_key(data) {
            return data.options.cookie_prefix + data.form.identify()
        }
        $.fn.mbFormPreserve = function(opt) {
            return this.length && $(this).each(function() {
                var data, options = $.extend({}, $.fn.mbFormPreserve.default_options, opt);
                (data = {
                    form: $(this),
                    options: options
                }).form.data("preservation_initialized") || (data.form.on("change", "[name]", function() {
                    !function(data) {
                        var fdata = data.form.serializeJSON();
                        data.form.find('[data-noremember="1"]').each(function() {
                            delete fdata[$(this).attr("name")]
                        }),
                            $.mb.setCookie(get_cookie_key(data), JSON.stringify(fdata), data.options.cookie_days)
                    }(data)
                }),
                    options = JSON.parse($.mb.getCookie(get_cookie_key(data), "{}")),
                    data.form.mbFormPopulate(options, data.options.populate_options),
                    data.form.data("preservation_initilized", !0))
            }),
                this
        }
            ,
            $.fn.mbFormPreserve.default_options = {
                cookie_prefix: "mbfp_",
                cookie_days: !1,
                populate_options: {}
            }
    }(jQuery),
    !function($) {
        function goto_step(data, index) {
            return data.current != index && (index < data.current || -1 < data.current && valid_step(data, data.step_content.find(".step:eq(" + data.current + ")"))) && (!(data.current < index && 0 < data.step_content.find(".step:lt(" + index + "):gt(" + data.current + "):not(.done)").length) && (switch_steps(data, index, !0),
                1))
        }
        function switch_steps(data, index, animate) {
            var step, li, t, s;
            data.current == index || data.moving || (-1 < data.current && data.step_content.find(".step:eq(" + data.current + ")").trigger("deactivated"),
                data.current = index,
                step = data.step_content.find(".step:eq(" + index + ")"),
                t = (li = data.step_menu.find("li:eq(" + index + ")")).position().top,
                index == data.totalSteps - 1 ? data.next_button.text(data.options.finalStep) : data.next_button.text(data.options.intSteps),
                animate ? (data.moving = !0,
                    data.step_menu.find("li.current").removeClass("current"),
                    li.addClass("current"),
                    data.step_window.animate({
                        height: step.outerHeight(!1)
                    }, data.options.duration),
                data.options.sizeMenu && data.menu_window.animate({
                    height: step.outerHeight(!1)
                }, data.options.duration),
                    data.step_content.animate({
                        top: 0 - step.position().top
                    }, data.options.duration),
                    data.step_menu.find("li.current"),
                    data.step_highlight.animate({
                        top: t,
                        height: li.outerHeight(!0)
                    }, {
                        duration: data.options.duration,
                        complete: (s = step,
                                function() {
                                    data.moving = !1,
                                        s.trigger("activated"),
                                        fix_height(data)
                                }
                        )
                    }),
                data.options.autoScroll && null != $.scrollTo && fix_scroll(data)) : (data.step_menu.find("li.current").removeClass("current"),
                    li.addClass("current"),
                    data.step_window.css({
                        height: step.outerHeight(!1)
                    }),
                data.options.sizeMenu && data.menu_window.css({
                    height: step.outerHeight(!1)
                }),
                    data.step_content.css({
                        top: 0 - step.position().top
                    }),
                    data.step_menu.find("li.current"),
                    data.step_highlight.css({
                        top: t,
                        height: li.outerHeight(!0)
                    }),
                    step.trigger("activated")),
                data.step_form_header.text(li.data("title") ? li.data("title") : li.text()),
            li.data("copyicon") && data.step_form_header.prepend(li.find("i").clone()))
        }
        function fix_scroll(data) {
            $.scrollTo(data.step_window.offset().top - data.options.scrollOffset, 300)
        }
        function valid_step(data, step) {
            var valid = !0;
            return (step = $(step)).addClass("done"),
                step.find(".label span.error").remove(),
                step.find(".error").removeClass("error"),
                step.find(".label.required > input[type=text], .label input[type=text].required, .label.required > textarea, .label textarea.required, .label.required > select, .label select.required, .label.required > input.select2ajax").each(function() {
                    var input = $(this)
                        , label = input.closest(".label");
                    (input.is(":visible") || input.hasClass("select2ajax") && label.is(":visible")) && input.is(":enabled") && 0 == $.trim(input.val()).length && (input.addClass("error").after('<span class="error">This field is required.</span>'),
                        label.addClass("error"),
                        valid = !1)
                }),
                step.find(".label.required > input[type=checkbox]:not(:checked):enabled:visible, .label input[type=checkbox].required:not(:checked):enabled:visible").each(function() {
                    var input = $(this)
                        , label = input.closest(".label");
                    input.addClass("error").after('<span class="error">This field is required.</span>'),
                        label.addClass("error"),
                        valid = !1
                }),
                step.find(".label.numeric > input[type=text], .label input[type=text].numeric").each(function() {
                    var input = $(this)
                        , val = $.trim(input.val());
                    input.closest(".label").is(":visible") && input.is(":enabled") && 0 < val.length && !$.mb.isNumeric(val) && ($(this).addClass("error").after('<span class="error">This field should be a number.</span>'),
                        $(this).closest(".label").addClass("error"),
                        valid = !1)
                }),
                step.find(".label.email > input[type=text], .label input[type=text].email").each(function() {
                    var val = $.trim($(this).val());
                    $(this).is(":visible:enabled") && 0 < val.length && !$.mb.isEmail(val) && ($(this).addClass("error").after('<span class="error">Please enter a valid email address.</span>'),
                        $(this).closest(".label").addClass("error"),
                        valid = !1)
                }),
            valid || step.removeClass("done"),
                step.trigger("stepvalidate"),
                fix_height(data),
                step.hasClass("done")
        }
        function fix_height(data) {
            data.step_menu.find("li.current").each(function() {
                var li = $(this)
                    , index = li.data("stepindex")
                    , index = data.step_content.find(".step:eq(" + index + ")");
                data.step_window.css({
                    height: index.outerHeight(!1)
                }),
                data.options.sizeMenu && data.menu_window.css({
                    height: index.outerHeight(!1)
                }),
                    data.step_window.scrollTop(0),
                    data.step_content.css({
                        top: 0 - index.position().top
                    }),
                    data.step_highlight.css({
                        top: li.position().top,
                        height: li.outerHeight(!0)
                    })
            })
        }
        $.fn.mbStepForm = function(opt) {
            var options;
            return this.length && (options = $.extend({}, $.fn.mbStepForm.default_options, opt),
                $(this).each(function() {
                    var data, el_options = $.mb.optionsFromData($(this), options);
                    (data = {
                        container: $(this),
                        options: el_options
                    }).container.data("stepforminitialized") || (data.step_menu = data.container.find(".steps ol"),
                        data.step_window = data.container.find(".step-window"),
                        data.menu_window = data.container.find(".steps .menu-window"),
                        data.step_content = data.step_window.find(".step-content"),
                        data.form = data.container.find("form"),
                        data.current = -1,
                        data.moving = !1,
                        data.main_url = "",
                        data.main_url_qs = "",
                        data.totalSteps = data.step_menu.find("li").length,
                        data.next_button = data.container.find("button.next-step"),
                        data.step_form_header = data.container.find(".step-form-header"),
                        data.step_menu.after($('<div class="step-highlight"></div>')),
                        data.step_highlight = data.container.find(".step-highlight"),
                        data.next_button.on("click", function() {
                            !function(data) {
                                {
                                    if (data.moving)
                                        return;
                                    var step;
                                    if (data.current != data.totalSteps - 1)
                                        return data.options.handleHistory ? (step = data.step_content.find(".step:eq(" + (data.current + 1) + ")"),
                                        valid_step(data, data.step_content.find(".step:eq(" + data.current + ")")) && $.mb.pushHistory(data.main_url + "/" + step.data("alias") + data.main_url_qs)) : goto_step(data, data.current + 1);
                                    data.step_menu.find("li").removeClass("done"),
                                        data.step_content.find(".step").each(function(index) {
                                            if (!valid_step(data, this))
                                                return switch_steps(data, index),
                                                    !1;
                                            data.step_menu.find("li:eq(" + index + ")").addClass("done")
                                        }),
                                    null != data.options.onsub && data.options.onsub.apply(data.container, data.options.onsub_args) && data.form.trigger("submit")
                                }
                            }(data)
                        }),
                        data.step_menu.find("li").each(function(index) {
                            $(this).data("stepindex", index),
                            data.step_menu.data("autonumber") && $(this).prepend("<strong>Step " + (index + 1) + "</strong>")
                        }),
                        data.step_content.find(".step").each(function(index) {
                            $(this).data("stepindex", index),
                            data.step_menu.data("autonumber") && $(this).find(".step-header").prepend("<strong>Step " + (index + 1) + "</strong>")
                        }),
                        data.step_menu.on("click", "li", function() {
                            var step;
                            data.options.handleHistory ? 0 == $(this).data("stepindex") ? $.mb.pushHistory(data.main_url + data.main_url_qs) : (step = data.step_content.find(".step:eq(" + $(this).data("stepindex") + ")"),
                                $.mb.pushHistory(data.main_url + "/" + step.data("alias") + data.main_url_qs)) : goto_step(data, $(this).data("stepindex"))
                        }),
                        data.step_content.on("keydown", ".notab", function(event) {
                            event.which != $.mb.key.TAB || event.shiftKey || event.preventDefault()
                        }),
                        data.step_content.on("keydown", ".notabup", function(event) {
                            event.which == $.mb.key.TAB && event.shiftKey && event.preventDefault()
                        }),
                        data.step_content.on("goto", ".step", function() {
                            data.options.handleHistory ? 0 == $(this).data("stepindex") ? $.mb.pushHistory(data.main_url + data.main_url_qs) : $.mb.pushHistory(data.main_url + "/" + $(this).data("alias") + data.main_url_qs) : goto_step(data, $(this).data("stepindex"))
                        }),
                        data.options.handleHistory ? $(window).on("historychange.mb.stepform", function(e, url_data) {
                            !function(data, url) {
                                var qs = ""
                                    , url_a = url.split("?");
                                1 < url_a.length && (url = url_a.shift(),
                                    qs = "?" + url_a.join("?"));
                                data.main_url_qs = qs,
                                0 < url.length && "/" === url[url.length - 1] && (url = url.substr(0, url.length - 1));
                                url_a = url.split("/"),
                                    qs = url_a.pop();
                                0 < qs.length ? 0 < (qs = data.container.find('.step[data-alias="' + qs + '"]')).length ? (data.main_url = url_a.join("/"),
                                0 < data.main_url.length && "/" !== data.main_url[0] && (data.main_url = "/" + data.main_url),
                                goto_step(data, qs.data("stepindex")) || $.mb.pushHistory(data.main_url + data.main_url_qs, "", {}, !0)) : (data.main_url = url,
                                0 < data.main_url.length && "/" !== data.main_url[0] && (data.main_url = "/" + data.main_url),
                                    switch_steps(data, 0, !0)) : (data.main_url = url_a.join("/"),
                                0 < data.main_url.length && "/" !== data.main_url[0] && (data.main_url = "/" + data.main_url),
                                    switch_steps(data, 0, !0))
                            }(data, url_data.url)
                        }) : switch_steps(data, 0, !1),
                        data.container.on("fix", function() {
                            fix_height(data)
                        }).on("fixscroll", function() {
                            fix_scroll(data)
                        }),
                        $(window).on("throttledresize", function() {
                            fix_height(data)
                        }),
                        data.container.data("stepforminitialized", !0))
                })),
                this
        }
            ,
            $.fn.mbStepForm.default_options = {
                duration: 400,
                autoScroll: !0,
                scrollOffset: 60,
                handleHistory: !1,
                onsub: function() {
                    return !0
                },
                onsub_args: [],
                intSteps: "Next Step",
                finalStep: "Submit",
                sizeMenu: !1,
                minwidth: 650
            }
    }(jQuery),
    !function(f) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], f) : "undefined" != typeof module && module.exports ? module.exports = f(require("jquery")) : f(jQuery)
    }(function($) {
        "use strict";
        function n(a) {
            return !a.nodeName || -1 !== $.inArray(a.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])
        }
        function h(a) {
            return $.isFunction(a) || $.isPlainObject(a) ? a : {
                top: a,
                left: a
            }
        }
        var p = $.scrollTo = function(a, d, b) {
                return $(window).scrollTo(a, d, b)
            }
        ;
        return p.defaults = {
            axis: "xy",
            duration: 0,
            limit: !0
        },
            $.fn.scrollTo = function(a, d, b) {
                "object" == typeof d && (b = d,
                    d = 0),
                "function" == typeof b && (b = {
                    onAfter: b
                }),
                "max" === a && (a = 9e9),
                    b = $.extend({}, p.defaults, b),
                    d = d || b.duration;
                var u = b.queue && 1 < b.axis.length;
                return u && (d /= 2),
                    b.offset = h(b.offset),
                    b.over = h(b.over),
                    this.each(function() {
                        function k(a) {
                            var k = $.extend({}, b, {
                                queue: !0,
                                duration: d,
                                complete: a && function() {
                                    a.call(q, e, b)
                                }
                            });
                            r.animate(f, k)
                        }
                        if (null !== a) {
                            var t, l = n(this), q = l ? this.contentWindow || window : this, r = $(q), e = a, f = {};
                            switch (typeof e) {
                                case "number":
                                case "string":
                                    if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)) {
                                        e = h(e);
                                        break
                                    }
                                    e = l ? $(e) : $(e, q);
                                case "object":
                                    if (0 === e.length)
                                        return;
                                    (e.is || e.style) && (t = (e = $(e)).offset())
                            }
                            var v = $.isFunction(b.offset) && b.offset(q, e) || b.offset;
                            $.each(b.axis.split(""), function(a, c) {
                                var d = "x" === c ? "Left" : "Top"
                                    , m = d.toLowerCase()
                                    , g = "scroll" + d
                                    , h = r[g]()
                                    , n = p.max(q, c);
                                t ? (f[g] = t[m] + (l ? 0 : h - r.offset()[m]),
                                b.margin && (f[g] -= parseInt(e.css("margin" + d), 10) || 0,
                                    f[g] -= parseInt(e.css("border" + d + "Width"), 10) || 0),
                                    f[g] += v[m] || 0,
                                b.over[m] && (f[g] += e["x" === c ? "width" : "height"]() * b.over[m])) : (d = e[m],
                                    f[g] = d.slice && "%" === d.slice(-1) ? parseFloat(d) / 100 * n : d),
                                b.limit && /^\d+$/.test(f[g]) && (f[g] = f[g] <= 0 ? 0 : Math.min(f[g], n)),
                                !a && 1 < b.axis.length && (h === f[g] ? f = {} : u && (k(b.onAfterFirst),
                                    f = {}))
                            }),
                                k(b.onAfter)
                        }
                    })
            }
            ,
            p.max = function(a, d) {
                var h = "scroll" + (d = "x" === d ? "Width" : "Height");
                if (!n(a))
                    return a[h] - $(a)[d.toLowerCase()]();
                var d = "client" + d
                    , l = (a = a.ownerDocument || a.document).documentElement
                    , a = a.body;
                return Math.max(l[h], a[h]) - Math.min(l[d], a[d])
            }
            ,
            $.Tween.propHooks.scrollLeft = $.Tween.propHooks.scrollTop = {
                get: function(a) {
                    return $(a.elem)[a.prop]()
                },
                set: function(a) {
                    var d = this.get(a);
                    if (a.options.interrupt && a._last && a._last !== d)
                        return $(a.elem).stop();
                    var b = Math.round(a.now);
                    d !== b && ($(a.elem)[a.prop](b),
                        a._last = this.get(a))
                }
            },
            p
    }),
    !function($) {
        function refresh_sizes(data) {
            data.unwound_roll.find(".roll-label-row").remove(),
                data.unwound_roll.find(".roll-label").remove(),
                data.container.find(".roll-label-caption").remove(),
                "Continuous" === data.options.shape ? data.roll_width = data.options.label_width : data.roll_width = (data.options.label_width + 2 * data.options.gap_lr) * data.options.labels_per_row;
            var in_diagram_height = data.options.outside_diameter * data.options.roll_perspective + data.roll_width;
            if ("Continuous" === data.options.shape)
                data.visible_labels = 0,
                    data.pixels_per_inch = data.container.width() / (3 * data.options.outside_diameter);
            else {
                let visible_labels = data.options.minimum_visible_labels
                    , in_diagram_width = data.options.outside_diameter / 2 + (data.options.label_length + data.options.gap_tb) * visible_labels;
                if (in_diagram_height / in_diagram_width > data.options.diagram_ratio_min) {
                    for (; in_diagram_height / in_diagram_width > data.options.diagram_ratio_min; )
                        in_diagram_width = data.options.outside_diameter / 2 + (data.options.label_length + data.options.gap_tb) * ++visible_labels;
                    visible_labels--,
                        in_diagram_width = data.options.outside_diameter / 2 + (data.options.label_length + data.options.gap_tb) * visible_labels
                }
                data.visible_labels = visible_labels,
                    data.pixels_per_inch = (data.container.width() - 2) / in_diagram_width
            }
            var tr_width = data.options.outside_diameter * data.pixels_per_inch
                , tr_height = tr_width * data.options.roll_perspective
                , dh_width = (data.top_of_roll.css({
                width: tr_width,
                height: tr_height
            }),
            data.options.core_size * data.pixels_per_inch)
                , dh_height = dh_width * data.options.roll_perspective;
            data.donut_hole.css({
                width: dh_width,
                height: dh_height,
                "margin-top": -1 * dh_height / 2,
                "margin-left": -1 * dh_width / 2
            }),
                data.sides.css({
                    width: tr_width,
                    height: data.roll_width * data.pixels_per_inch + 4,
                    top: tr_height / 2
                }),
                data.bottom_of_roll.css({
                    top: data.roll_width * data.pixels_per_inch + 4,
                    width: tr_width,
                    height: tr_height
                }),
                data.unwound_roll.css({
                    width: data.container.width() - tr_width / 2 - 2,
                    height: data.roll_width * data.pixels_per_inch,
                    top: tr_height,
                    left: tr_width / 2
                }),
                data.container.css("height", tr_height + data.roll_width * data.pixels_per_inch + 100),
                function(data) {
                    if ("Continuous" !== data.options.shape) {
                        let label = ""
                            , label_row = ""
                            , full_length = (data.options.label_length + data.options.gap_tb) * data.pixels_per_inch;
                        var full_width = (data.options.label_width + 2 * data.options.gap_lr) * data.pixels_per_inch
                            , gap_lr_pixels = data.options.gap_lr * data.pixels_per_inch
                            , gap_tb_pixels = data.options.gap_tb * data.pixels_per_inch;
                        data.options.perforations && (full_length += 1);
                        let i = 0
                            , j = data.visible_labels;
                        for (; i < j; ++i) {
                            (label_row = $('<div class="roll-label-row"></div>')).css({
                                width: data.options.label_length * data.pixels_per_inch,
                                top: 0,
                                right: gap_tb_pixels + i * full_length
                            }),
                            data.options.perforations && label_row.append($('<div class="perf-line"></div>').css({
                                height: data.roll_width * data.pixels_per_inch,
                                "margin-left": gap_tb_pixels / 2 * -1 - 1
                            }));
                            let k = 0
                                , m = data.options.labels_per_row;
                            for (; k < m; ++k)
                                (label = $('<div class="roll-label"></div>')).css({
                                    height: data.options.label_width * data.pixels_per_inch,
                                    width: data.options.label_length * data.pixels_per_inch,
                                    top: gap_lr_pixels + k * full_width,
                                    right: 0
                                }),
                                    "Rounded Corners" === data.options.shape || "Rectangle" === data.options.shape ? label.css("border-radius", data.options.corner_radius * data.pixels_per_inch) : label.css("border-radius", "50%"),
                                    label_row.append(label);
                            data.unwound_roll.append(label_row)
                        }
                    }
                }(data),
                function(data) {
                    data.captions.html("");
                    const outside = $('<div class="outside-diameter"><span>' + $.mb.formatString(data.options.lang.hlc_inches, {
                        value: data.options.outside_diameter
                    }) + " " + data.options.lang.hlc_sf_printer_outside.toLowerCase() + "</span></div>")
                        , core = $('<div class="core-diameter"><span>' + $.mb.formatString(data.options.lang.hlc_inches, {
                        value: data.options.core_size
                    }) + " " + data.options.lang.hlc_sf_printer_core.toLowerCase() + "</span></div>");
                    if (outside.css({
                        top: -25,
                        width: data.options.outside_diameter * data.pixels_per_inch + 2,
                        height: data.options.outside_diameter * data.pixels_per_inch * data.options.roll_perspective / 2 + 25
                    }),
                        core.css({
                            top: -5,
                            left: (data.options.outside_diameter - data.options.core_size) / 2 * data.pixels_per_inch + 2,
                            width: data.options.core_size * data.pixels_per_inch - 2,
                            height: (data.options.outside_diameter - data.options.core_size) / 2 * data.options.roll_perspective * data.pixels_per_inch + data.options.core_size * data.pixels_per_inch * data.options.roll_perspective / 2 + 5
                        }),
                        data.captions.append(outside),
                        data.captions.append(core),
                    "Continuous" === data.options.shape)
                        data.captions.append($('<div class="roll-width"><span>' + $.mb.formatString(data.options.lang.hlc_inches, {
                            value: data.options.label_width
                        }) + " " + data.options.lang.hlc_sf_size_wide + "</span></div>").css({
                            right: -10,
                            width: 10,
                            height: data.options.label_width * data.pixels_per_inch + 4,
                            top: data.options.outside_diameter * data.pixels_per_inch * data.options.roll_perspective + 2
                        }));
                    else {
                        let length = data.options.label_length * data.pixels_per_inch;
                        var width = data.options.label_width * data.pixels_per_inch
                            , gap_tb = data.options.gap_tb * data.pixels_per_inch
                            , gap_lr = data.options.gap_lr * data.pixels_per_inch;
                        "Circle" === data.options.shape && (length = width);
                        let l_cr = data.options.corner_radius
                            , w_cr = data.options.corner_radius;
                        "Circle" !== data.options.shape && "Oval" !== data.options.shape || (l_cr = data.options.label_length / 2,
                            w_cr = data.options.label_width / 2),
                            l_cr *= data.pixels_per_inch,
                            w_cr *= data.pixels_per_inch,
                            data.captions.append($('<div class="label-length"><span>' + $.mb.formatString(data.options.lang.hlc_inches, {
                                value: data.options.label_length
                            }) + " " + data.options.lang.hlc_sf_size_long + "</span></div>").css({
                                right: data.options.gap_tb * data.pixels_per_inch + 2,
                                width: length,
                                height: 30 + gap_lr + w_cr,
                                top: data.options.outside_diameter * data.pixels_per_inch * data.options.roll_perspective - 30
                            })),
                        3 < gap_tb && data.captions.append($('<div class="gap"><span>' + $.mb.formatString(data.options.lang.hlc_inches, {
                            value: data.options.gap_tb
                        }) + " " + data.options.lang.hlc_sf_size_gap.toLowerCase() + "</span></div>").css({
                            right: gap_tb + length + 1,
                            width: gap_tb + (data.options.perforations ? 1 : 0),
                            height: gap_lr + w_cr + 10 + 2,
                            top: data.options.outside_diameter * data.pixels_per_inch * data.options.roll_perspective + data.options.labels_per_row * (width + 2 * gap_lr) - w_cr - gap_lr
                        })),
                            data.captions.append($('<div class="label-width"><span>' + $.mb.formatString(data.options.lang.hlc_inches, {
                                value: data.options.label_width
                            }) + " " + data.options.lang.hlc_sf_size_wide + "</span></div>").css({
                                right: -10,
                                width: 12 + gap_tb + l_cr,
                                height: width,
                                top: data.options.outside_diameter * data.pixels_per_inch * data.options.roll_perspective + gap_lr + 4
                            })),
                        2 < gap_lr && data.captions.append($('<div class="margin"><span><label>' + $.mb.formatString(data.options.lang.hlc_inches, {
                            value: data.options.gap_lr
                        }) + " " + data.options.lang.hlc_sf_size_margin.toLowerCase() + "</label></span></div>").css({
                            left: data.options.outside_diameter * data.pixels_per_inch / 2 - 10,
                            width: 12 + gap_tb + l_cr,
                            height: gap_lr,
                            top: data.options.outside_diameter * data.pixels_per_inch * data.options.roll_perspective + 4
                        }))
                    }
                }(data)
        }
        $.fn.hblRollLabelDiagram = function(opt) {
            return this.length && $(this).each(function() {
                var data, options = $.extend({}, $.fn.hblRollLabelDiagram.default_options, opt);
                (data = {
                    container: $(this),
                    options: options
                }).container.data("rldinitialized") ? data.container.trigger("rs_refresh") : (data.options = $.mb.optionsFromData(data.container, data.options),
                    data.container.html('<div class="rd-container"><div class="top-of-roll"><div class="donut-hole"></div></div><div class="sides"></div><div class="bottom-of-roll"></div><div class="unwound-roll"></div><div class="captions"></div></div>'),
                    data.rd_container = data.container.find(".rd-container"),
                    data.top_of_roll = data.container.find(".top-of-roll"),
                    data.donut_hole = data.container.find(".donut-hole"),
                    data.sides = data.container.find(".sides"),
                    data.bottom_of_roll = data.container.find(".bottom-of-roll"),
                    data.unwound_roll = data.container.find(".unwound-roll"),
                    data.captions = data.container.find(".captions"),
                    data.container.on("rs_refresh", function() {
                        data.options = $.mb.optionsFromData(data.container, data.options),
                            refresh_sizes(data)
                    }),
                    refresh_sizes(data),
                    data.container.data("rldinitialized", !0))
            }),
                this
        }
            ,
            $.fn.hblRollLabelDiagram.default_options = {
                min_label_width: 50,
                max_label_width: 200,
                minimum_visible_labels: 2,
                min_roll_height: 50,
                roll_perspective: .25,
                diagram_ratio_min: .3,
                core_size: 3,
                outside_diameter: 8,
                label_width: 2,
                label_length: 3,
                shape: "Rounded Corners",
                corner_radius: .125,
                perforations: !1,
                gap_lr: .125,
                gap_tb: .125,
                labels_per_row: 1,
                lang: {
                    hlc_inches: ['{value}"', "{value}"],
                    hlc_feet: ["{value}'", "{value}"],
                    hlc_sf_printer_core: "Core",
                    hlc_sf_printer_outside: "Outside Diameter",
                    hlc_sf_size_wide: "wide",
                    hlc_sf_size_long: "long",
                    hlc_sf_size_gap: "Gap",
                    hlc_sf_size_margin: "Margin"
                }
            }
    }(jQuery),
    !function($) {
        function scrollto_top(data) {
            var header;
            data.options.autoScroll && (header = $("header.page_header"),
                data = data.container.find(".block-container").offset().top,
            "fixed" === header.css("position") && (data -= header.outerHeight()),
                $(window).scrollTo(data, 200))
        }
        function show_printer_list(data) {
            data.printer_data.id = data.step_printer.find('[name="order_item_data[printer][id]"]').select2("val"),
                data.product_filter.printer_id = data.printer_data.id,
                delete data.printer_data.custom,
                data.step_printer.find(".printer-setup .printer-search").addClass("active"),
                data.step_printer.find(".printer-setup .custom-printer").removeClass("active"),
                data.step_printer.find("input.use-custom-printer").val(0),
                $(window).trigger("throttledresize")
        }
        function set_printer_manufacturer(data, manufacturer, update_printer_grid) {
            const printer_selector = data.step_printer.find('[name="order_item_data[printer][id]"]').select2("val", "");
            var printer_filter = $.mb.reserialize(get_printer_filter(data));
            data.step_printer.find(".printer-grid:not(.your-printers)").data("filter", printer_filter),
            0 < data.step_printer.find(".manufacturer-grid-container").length && (manufacturer.hasOwnProperty("id") ? update_printer_grid && (data.step_printer.find(".manufacturer-grid-container").removeClass("active"),
                data.step_printer.find(".printer-grid:not(.your-printers)").html("").addClass("active").trigger("update")) : (data.step_printer.find(".manufacturer-grid-container").addClass("active"),
                data.step_printer.find(".printer-grid:not(.your-printers)").removeClass("active"))),
                printer_selector.data("filter", printer_filter),
                $(window).trigger("throttledresize"),
                fix_height(data)
        }
        function set_printer(data, printer, goto) {
            data.hasOwnProperty("printer_filter") || (data.printer_filter = {});
            const diameter_selector = data.step_printer.find('[name="diameter"]')
                , type_selector = data.step_printer.find('[name="type"]');
            let next = !1;
            if (printer.hasOwnProperty("id")) {
                let man_selector = data.step_printer.find('[name="printer_manufacturer"]')
                    , od = (data.product_filter.type = printer.type,
                    data.product_filter.core_size = printer.core_size,
                    printer.outside_diameter)
                    , diameter_val = (printer.outside_diameter_2 > printer.outside_diameter && (od = printer.outside_diameter_2),
                    diameter_selector.select2("val"))
                    , od_val = "";
                var man_name;
                0 < diameter_val.length && (diameter_val = diameter_val.split("x"),
                    od_val = parseInt(diameter_val[1])),
                    0 < od_val && (od_val === printer.outside_diameter || od_val === printer.outside_diameter_2) ? od = od_val : diameter_selector.select2("val", printer.core_size + "x" + od),
                    data.product_filter.outside_diameter = od,
                    diameter_selector.select2("val", data.product_filter.core_size + "x" + od),
                    data.step_printer.find(".printer-grid .printer.selected").removeClass("selected"),
                    data.step_printer.find('.printer-grid .printer[data-id="' + printer.id + '"]').addClass("selected"),
                0 < man_selector.length && printer.manufacturer_id && man_selector.select2("val") != printer.manufacturer_id && (man_name = data.step_printer.find('.manufacturer-grid .manufacturer[data-id="' + printer.manufacturer_id + '"]').find(".pgrid-title").text(),
                    man_selector.select2("data", {
                        id: printer.manufacturer_id,
                        text: man_name,
                        payload: {
                            id: printer.manufacturer_id,
                            name: man_name
                        }
                    }, !1)),
                data.step_printer.find(".printer-grid:not(.your-printers)").hasClass("active") || data.step_printer.find(".printer-grid:not(.your-printers)").data("filter", $.mb.reserialize(get_printer_filter(data))).html("").addClass("active").trigger("update"),
                    data.step_printer.find(".manufacturer-grid-container").removeClass("active"),
                    data.printer_data = printer,
                    data.product_filter.printer_id = printer.id,
                printer.hasOwnProperty("matrix_preference") && (data.printer_data.matrix_preference = printer.matrix_preference),
                    next = !0
            } else
                data.step_printer.find(".printer-grid .printer.selected").removeClass("selected"),
                    diameter_selector.select2("val", ""),
                0 < type_selector.length && type_selector.select2("val", ""),
                    delete data.printer_data.id,
                    delete data.product_filter.core_size,
                    delete data.product_filter.outside_diameter,
                    delete data.product_filter.type,
                    data.step_printer.find(".printer-grid:not(.your-printers)").data("filter", $.mb.reserialize(get_printer_filter(data))).addClass("active").trigger("update");
            type_selector.select2("val", data.product_filter.type),
            data.product_filter.hasOwnProperty("size_data") && data.product_filter.size_data.shape && show_grid(data),
                data.step_shape_dirty = !0,
                data.step_material_dirty = !0,
                data.step_quantity_dirty = !0,
                data.step_shape.removeClass("done"),
                data.step_material.removeClass("done"),
                data.step_quantity.removeClass("done"),
            goto && (next ? data.step_shape.trigger("goto") : fix_height(data))
        }
        function set_printing_process(data, process) {
            data.product_filter.type && process === data.product_filter.type || update_printer_value(data, !0),
                process ? data.product_filter.type = process : delete data.product_filter.type
        }
        function update_printer_value(data, trigger) {
            const man_grid = data.step_printer.find(".manufacturer-grid")
                , pgrid = data.step_printer.find(".printer-grid:not(.your-printers)");
            var man_filter = $.mb.reserialize(get_manufacturer_filter(data))
                , printer_filter = $.mb.reserialize(get_printer_filter(data));
            data.step_printer.find('[name="printer_manufacturer"]').data("filter", man_filter),
                data.step_printer.find('[name="order_item_data[printer][id]"]').data("filter", printer_filter),
            trigger && (man_grid.closest(".manufacturer-grid-container").hasClass("active") ? man_grid.data("filter", man_filter) : pgrid.data("filter", printer_filter)).trigger("update")
        }
        function get_manufacturer_filter(data) {
            const pmsel = data.step_printer.find('[name="printer_manufacturer"]')
                , filter = {
                "order-by": "name",
                "name:not": "Custom"
            };
            filter["id:not"] = pmsel.data("customman");
            let diameter = data.step_printer.find('[name="diameter"]').select2("val")
                , core = !1
                , outside = !1;
            0 < diameter.length && (diameter = diameter.split("x"),
                core = diameter[0],
                outside = diameter[1]);
            const type_sel = data.step_printer.find('[name="type"]');
            let type = "Inkjet";
            return 0 < type_sel.length && (type = type_sel.select2("val")),
            core && (filter.core_size = core),
            outside && (filter.outside = outside),
            type && (filter.type = type),
            0 < data.account && (filter.account_id = data.account),
                filter
        }
        function get_printer_filter(data) {
            const filter = {
                "order-by": "model"
            };
            let man = !1
                , diameter = (0 < data.step_printer.find('[name="printer_manufacturer"]').length && (man = data.step_printer.find('[name="printer_manufacturer"]').select2("val")),
                data.step_printer.find('[name="diameter"]').select2("val"))
                , core = !1
                , outside = !1;
            0 < diameter.length && (diameter = diameter.split("x"),
                core = diameter[0],
                outside = diameter[1]);
            const type_sel = data.step_printer.find('[name="type"]');
            let type = "Inkjet";
            return 0 < type_sel.length && (type = type_sel.select2("val")),
            man && (filter.manufacturer_id = man),
            core && (filter.core_size = core),
            outside && (filter.outside = outside),
            type && (filter.type = type),
            0 < data.account && (filter.accounts_account_id = data.account),
                filter
        }
        function update_custom_printer(data) {
            delete data.printer_data.id,
                delete data.product_filter.printer_id;
            let diameter = data.step_printer.find('[name="order_item_data[printer][diameter]"]').select2("val")
                , core = ""
                , outside = "";
            0 < diameter.length && (diameter = diameter.split("x"),
                core = diameter[0],
                outside = diameter[1]),
                data.printer_data.custom = {
                    manufacturer: data.step_printer.find('[name="order_item_data[printer][custom_manufacturer_name]"]').val(),
                    model: data.step_printer.find('[name="order_item_data[printer][model]"]').val(),
                    core_size: core,
                    outside_diameter: outside,
                    type: data.step_printer.find('[name="order_item_data[printer][type]"]').select2("val")
                },
                data.product_filter.core_size = data.printer_data.custom.core_size,
                data.product_filter.outside_diameter = data.printer_data.custom.outside_diameter,
                data.product_filter.type = data.printer_data.custom.type,
                data.step_shape_dirty = !0,
                data.step_material_dirty = !0,
                data.step_quantity_dirty = !0,
                data.step_shape.removeClass("done"),
                data.step_material.removeClass("done"),
                data.step_quantity.removeClass("done")
        }
        function preload_printer(data) {
            data.step_printer.data("printer_info") && !data.initial_printer_loaded && data.manufacturer_grid_loaded && data.printer_step_activated && (data.initial_printer_loaded = !0,
                $.ajax({
                    url: data.step_printer.data("printer_info"),
                    type: "get",
                    xhrFields: {
                        withCredentials: !0
                    },
                    complete: function(jxr) {
                        200 === jxr.status && (jxr = JSON.parse(jxr.responseText).payload,
                            set_printer_manufacturer(data, jxr.manufacturer, !1),
                            data.step_printer.find('[name="order_item_data[printer][id]"]').select2("data", {
                                id: jxr.id,
                                text: jxr.model,
                                payload: jxr
                            }),
                            set_printer(data, jxr, !0))
                    }
                }))
        }
        function update_printer_step_summary(data) {
            const summary = [];
            let valid = !0
                , machine = "";
            if (data.step_printer.find(".printer-search").hasClass("active")) {
                const printer_sel = data.step_printer.find('[name="order_item_data[printer][id]"]');
                printer_sel.select2("val") && (machine = 0 < data.step_printer.find('[name="printer_manufacturer"]').length ? data.step_printer.find('[name="printer_manufacturer"]').select2("data").text + " " + printer_sel.select2("data").text : data.printer_data.manufacturer.name + " " + data.printer_data.model)
            } else {
                var man, model;
                data.printer_data.custom && (man = $.trim(data.printer_data.custom.manufacturer),
                    model = $.trim(data.printer_data.custom.model),
                man && model && (machine = man + " " + model))
            }
            return data.product_filter.type ? summary.push("<strong>" + data.options.lang.hlc_sf_printer_process + ":</strong> " + ("Laser" === data.product_filter.type ? data.options.lang.hlc_sf_printer_process_laser : data.options.lang.hlc_sf_printer_process_inkjet)) : 0 < data.step_printer.find('[name="type"]').length ? valid = !1 : (summary.push("<strong>" + data.options.lang.hlc_sf_printer_process + ":</strong> " + data.options.lang.hlc_sf_printer_process_inkjet),
                data.product_filter.type = "Inkjet"),
                machine ? summary.push("<strong>" + data.options.lang.hlc_sf_printer + ":</strong> " + machine) : valid = !1,
                data.product_filter.core_size ? summary.push("<strong>" + data.options.lang.hlc_sf_printer_core + ":</strong> " + $.mb.formatString(data.options.lang.hlc_inches, {
                    value: data.product_filter.core_size
                })) : valid = !1,
                data.product_filter.outside_diameter ? summary.push("<strong>" + data.options.lang.hlc_sf_printer_outside + ":</strong> " + $.mb.formatString(data.options.lang.hlc_inches, {
                    value: data.product_filter.outside_diameter
                })) : valid = !1,
                data.container.find(".step-nav-printer .step-summary").html(summary.join("<br>")),
                fix_height(data),
                valid
        }
        function set_shape(data, shape) {
            delete data.product_filter.size_data,
                delete data.product_filter.labels_per_row,
                data.product_filter.size_data = {
                    shape: shape
                },
                data.step_shape.find(".size-choose-fixed-height").addClass("show-grid").removeClass("show-diagram"),
                data.step_shape.find(".sub-step.size").addClass("active"),
                data.step_shape.find(".sub-step.custom").removeClass("active");
            const width_sel = data.step_shape.find('[name="label_width"]')
                , length_sel = data.step_shape.find('[name="label_length"]')
                , header = ((width_sel.data("lastsearch") ? width_sel.val(width_sel.data("lastsearch")) : width_sel.val("")).prop("disabled", !1),
                (length_sel.data("lastsearch") ? length_sel.val(length_sel.data("lastsearch")) : length_sel.val("")).prop("disabled", !1),
                show_grid(data),
                $("header.page_header"));
            let offset = data.step_shape.find(".sub-step.size").offset().top;
            "fixed" === header.css("position") && (offset -= header.outerHeight()),
            data.options.autoScroll && $(window).scrollTo(offset, 200)
        }
        function get_size_filter(data) {
            const filter = data.product_filter;
            filter.shape = data.product_filter.size_data.shape,
            data.hasOwnProperty("printer_data") && data.printer_data.hasOwnProperty("id") && data.printer_data.id && (filter.printer_id = data.printer_data.id);
            var width = data.step_shape.find('[name="label_width"]').val()
                , width = (delete filter.label_width,
            width && (filter.label_width = width),
                data.step_shape.find('[name="label_length"]').val());
            return delete filter.label_length,
            width && (filter.label_length = width),
            0 < data.account && (filter.accounts_account_id = data.account),
                filter
        }
        function show_grid(data) {
            delete data.product_filter.size_id,
                data.product_filter.size_data = {
                    shape: data.product_filter.size_data.shape
                },
                data.step_shape.find(".size-choose-fixed-height").addClass("show-grid").removeClass("show-diagram"),
                data.step_shape.find(".size-grid").html("").data("filter", $.mb.reserialize(get_size_filter(data))).trigger("update"),
                update_size_step_summary(data),
                fix_height(data)
        }
        function update_label_customizations(data, customization_data) {
            if ("Continuous" === data.product_filter.size_data.shape)
                data.step_shape.find(".label-customizations").hide();
            else {
                data.step_shape.find(".label-customizations").show();
                const lpr = data.step_shape.find(".label-customizations .labels-per-row input")
                    , perfs = (customization_data.hasOwnProperty("min_up") && lpr.attr("min", customization_data.min_up),
                customization_data.hasOwnProperty("max_up") && lpr.attr("max", customization_data.max_up),
                customization_data.hasOwnProperty("min_up") && customization_data.hasOwnProperty("max_up") && lpr.prop("disabled", customization_data.min_up === customization_data.max_up),
                customization_data.hasOwnProperty("labels_per_row") && (lpr.val(customization_data.labels_per_row),
                    data.product_filter.labels_per_row = customization_data.labels_per_row,
                    $.ajax({
                        url: data.container.data("apiurl") + "/roll_label_size/label_range",
                        data: {
                            core_size: data.product_filter.core_size,
                            outside_diameter: data.product_filter.outside_diameter,
                            shape: data.product_filter.size_data.shape,
                            label_length: data.product_filter.size_data.label_length,
                            gap_tb: data.product_filter.size_data.gap_tb,
                            labels_per_row: data.product_filter.labels_per_row
                        },
                        type: "get",
                        xhrFields: {
                            withCredentials: !0
                        },
                        complete: function(lpr) {
                            return function(jxr) {
                                200 === jxr.status && lpr === data.product_filter.labels_per_row && ((jxr = JSON.parse(jxr.responseText).payload).min === jxr.max ? data.step_shape.find(".label-stats .label-range").html(jxr.min) : data.step_shape.find(".label-stats .label-range").html(jxr.min + " - " + jxr.max))
                            }
                        }(data.product_filter.labels_per_row)
                    })),
                    data.step_shape.find(".label-customizations .perforations select"))
                    , timing = (customization_data.hasOwnProperty("custom") && perfs.prop("disabled", !customization_data.custom || "Continuous" === data.product_filter.size_data.shape),
                customization_data.hasOwnProperty("perforations") && (perfs.val(customization_data.perforations),
                    data.product_filter.size_data.perforations = customization_data.perforations,
                    $.ajax({
                        url: data.container.data("apiurl") + "/roll_label_size/tooling_estimate",
                        data: {
                            shape: data.product_filter.size_data.shape,
                            label_width: data.product_filter.size_data.label_width,
                            label_length: data.product_filter.size_data.label_length,
                            perforations: data.product_filter.size_data.perforations
                        },
                        type: "get",
                        xhrFields: {
                            withCredentials: !0
                        },
                        complete: (perf = data.product_filter.perforations,
                                function(jxr) {
                                    200 === jxr.status && perf === data.product_filter.perforations && (jxr = JSON.parse(jxr.responseText).payload,
                                        data.step_shape.find(".label-stats .tooling-charge").html(jxr.tooling_charge),
                                        data.step_shape.find(".label-stats .tooling-waive").html(jxr.tooling_waive_quantity))
                                }
                        )
                    })),
                    data.step_shape.find(".label-customizations .timing-marks select"));
                let timing_marks = timing.val();
                customization_data.hasOwnProperty("timing_required") ? (timing_marks = customization_data.timing_required,
                    timing.prop("disabled", customization_data.timing_required)) : customization_data.hasOwnProperty("timing_marks") && (timing_marks = customization_data.timing_marks),
                    timing.val(timing_marks ? "1" : "");
                const matrix = data.step_shape.find(".label-customizations .matrix select");
                var printer_preference = data.printer_data.hasOwnProperty("matrix_preference") && data.printer_data.matrix_preference;
                let matrix_val = !!timing_marks && printer_preference;
                printer_preference = "Continuous" === data.product_filter.size_data.shape || !timing_marks || printer_preference;
                !printer_preference && customization_data.hasOwnProperty("matrix") && (matrix_val = customization_data.matrix),
                    matrix.prop("disabled", printer_preference).val(matrix_val ? "1" : ""),
                    data.product_filter.timing_marks = timing_marks,
                    data.product_filter.matrix = matrix_val
            }
            var perf
        }
        function update_size_step_summary(data) {
            const summary = [];
            let valid = !0;
            if (data.product_filter.size_data) {
                if (data.product_filter.size_data.shape) {
                    let translated_shape = data.options.lang.hlc_sf_shape_rounded;
                    "Rectangle" === data.product_filter.size_data.shape ? translated_shape = data.options.lang.hlc_sf_shape_square : "Circle" === data.product_filter.size_data.shape ? translated_shape = data.options.lang.hlc_sf_shape_circle : "Oval" === data.product_filter.size_data.shape ? translated_shape = data.options.lang.hlc_sf_shape_oval : "Continuous" === data.product_filter.size_data.shape ? translated_shape = data.options.lang.hlc_sf_shape_continuous : "Custom" === data.product_filter.size_data.shape && (translated_shape = data.options.lang.hlc_sf_shape_custom),
                        summary.push("<strong>" + data.options.lang.hlc_sf_shape + ":</strong> " + translated_shape)
                } else
                    valid = !1;
                "Continuous" === data.product_filter.size_data.shape || "Circle" === data.product_filter.size_data.shape ? data.product_filter.size_data.label_width ? summary.push("<strong>" + data.options.lang.hlc_sf_size + ":</strong> " + $.mb.formatString(data.options.lang.hlc_inches, {
                    value: data.product_filter.size_data.label_width
                })) : valid = !1 : data.product_filter.size_data.label_width && data.product_filter.size_data.label_length ? summary.push("<strong>" + data.options.lang.hlc_sf_size + ":</strong> " + $.mb.formatString(data.options.lang.hlc_inches, {
                    value: data.product_filter.size_data.label_width
                }) + " x " + $.mb.formatString(data.options.lang.hlc_inches, {
                    value: data.product_filter.size_data.label_length
                })) : valid = !1,
                    "Continuous" === data.product_filter.size_data.shape || data.product_filter.labels_per_row ? 1 < data.product_filter.labels_per_row && "Continuous" !== data.product_filter.size_data.shape && summary.push("<strong>" + data.options.lang.hlc_sf_size_lpr + ":</strong> " + data.product_filter.labels_per_row + " " + data.options.lang.hlc_sf_size_across) : valid = !1,
                data.product_filter.size_data.corner_radius && summary.push("<strong>" + data.options.lang.hlc_sf_size_corners + ":</strong> " + $.mb.formatString(data.options.lang.hlc_inches, {
                    value: data.product_filter.size_data.corner_radius
                })),
                data.product_filter.size_data.gap_tb && summary.push("<strong>" + data.options.lang.hlc_sf_size_gap_long + ":</strong> " + $.mb.formatString(data.options.lang.hlc_inches, {
                    value: data.product_filter.size_data.gap_tb
                })),
                data.product_filter.size_data.gap_lr && summary.push("<strong>" + data.options.lang.hlc_sf_size_margin_long + ":</strong> " + $.mb.formatString(data.options.lang.hlc_inches, {
                    value: data.product_filter.size_data.gap_lr
                })),
                data.product_filter.size_data.perforations && summary.push("<strong>" + data.options.hlc_sf_size_perf_perforated + "</strong>")
            } else
                valid = !1;
            return data.container.find(".step-nav-shape .step-summary").html(summary.join("<br>")),
                fix_height(data),
            valid && (data.step_shape_dirty = !1),
                valid
        }
        function reset_shape(data, goto) {
            data.step_shape.find(".label-shapes button.active").removeClass("active"),
                data.step_shape.find(".sub-step.size").removeClass("active"),
                data.step_shape.find(".size-choose-fixed-height").addClass("show-grid").removeClass("show-diagram"),
                data.step_shape.find('[name="label_width"]').val(""),
                data.step_shape.find('[name="label_length"]').val(""),
                delete data.product_filter.size_data,
                delete data.product_filter.size_id,
                update_size_step_summary(data),
            goto && (reset_material(data, !1),
                data.step_shape.trigger("goto"))
        }
        function filter_sort_materials(data) {
            data.step_material.find(".hlc-label-material").removeClass("hidden");
            const finish = data.step_material.find('select[name="lm_filter_finish"]');
            0 < finish.length && "" !== finish.val() && data.step_material.find('.hlc-label-material[data-finish!="' + finish.val() + '"]').addClass("hidden");
            var type = data.step_material.find('select[name="lm_filter_type"]').val();
            -1 < type && data.step_material.find('.hlc-label-material[data-type!="' + type + '"]').addClass("hidden");
            const eco = data.step_material.find('input[name="lm_filter_eco"]');
            eco.prop("checked") && data.step_material.find('.hlc-label-material[data-eco!="1"]').addClass("hidden");
            type = data.step_material.find('select[name="lm_sort"]').val();
            const set = data.step_material.find(".hlc-label-material:not(.hidden)").get()
                , hidden_set = data.step_material.find(".hlc-label-material.hidden").get();
            "popularity" === type ? set.sort(function(a, b) {
                a = $(a).data("popularity"),
                    b = $(b).data("popularity");
                return a < b ? 1 : b < a ? -1 : 0
            }) : "name" === type ? set.sort(function(a, b) {
                return $(a).data("name").toLowerCase().localeCompare($(b).data("name").toLowerCase())
            }) : "price" === type ? set.sort(function(a, b) {
                a = $(a).data("price"),
                    b = $(b).data("price");
                return b < a ? 1 : a < b ? -1 : 0
            }) : set.sort(function(a, b) {
                var a_sort = $(a).data("sort_order")
                    , b_sort = $(b).data("sort_order");
                return b_sort < a_sort ? 1 : a_sort < b_sort ? -1 : $(a).data("name").toLowerCase().localeCompare($(b).data("name").toLowerCase())
            });
            let i = 0
                , j = set.length;
            for (; i < j; ++i)
                set[i].parentNode.appendChild(set[i]);
            let n = 0
                , m = hidden_set.length;
            for (; n < m; ++n)
                hidden_set[n].parentNode.appendChild(hidden_set[n]);
            fix_height(data)
        }
        function hide_material_details(data) {
            data.step_material.find(".show-material-details").removeClass("show-material-details"),
                data.step_material.find(".hlc-lm-overlay").remove(),
                data.step_material.find(".sub-step.material").removeAttr("style"),
                fix_height(data)
        }
        function update_material_step_summary(data) {
            let valid = !0;
            var title;
            return data.product_filter.label_material_id ? (title = data.step_material.find('.hlc-label-material[data-id="' + data.product_filter.label_material_id + '"] .hlc-material-name span').text(),
                data.container.find(".step-nav-material .step-summary").html("<strong>" + data.options.lang.hlc_sf_material + ":</strong> " + title)) : (data.container.find(".step-nav-material .step-summary").html(""),
                valid = !1),
            data.product_id || (valid = !1),
                fix_height(data),
            valid && (data.step_material_dirty = !1),
                valid
        }
        function reset_material(data, goto) {
            data.step_material.find(".material-selector.selected").removeClass("selected"),
                delete data.product_filter.label_material_id,
                delete data.product_id,
                update_material_step_summary(data),
            goto && data.step_material.trigger("goto")
        }
        function update_quantity_info(data) {
            data.step_quantity.find(".sub-step.quantity-information").data("filter", $.mb.reserialize(get_product_info_filter(data))).html("").trigger("update")
        }

        //---------------- overloading the original hickman function ----------------
        function update_quantity_info(data) {
            data.step_quantity.find(".sub-step.quantity-information").data("filter", $.mb.reserialize(get_product_info_filter(data)));
            data.step_quantity.find(".sub-step.quantity-information").trigger("update");

            // show get-a-quote button
            $(".get-a-quote").removeClass('visually-hidden');
        }
        //---------------------------------------------------------------------------

        function update_total_price(data) {
            const quantity_sel = data.step_quantity.find('[name="quantity"]');
            let quantity = quantity_sel.val()
                , unit_price = (quantity < quantity_sel.data("min") && (quantity = quantity_sel.data("min")),
                data.step_quantity.find(".quantity-pricing .price-block").removeClass("selected"),
                0)
                , current_qty = 0
                , block = null;
            data.step_quantity.find(".quantity-pricing .price-block:not(.price-key)").each(function() {
                var block_qty = $(this).data("quantity");
                (0 === unit_price || block_qty > current_qty && block_qty <= quantity) && (unit_price = $(this).data("price"),
                    current_qty = block_qty,
                    block = $(this))
            });
            var total = unit_price * quantity;
            block && block.addClass("selected"),
                data.step_quantity.find(".total").html($.mb.formatCurrency(total))
        }
        function get_product_info_filter(data) {
            const filter = data.product_filter;
            return filter.quantity = data.step_quantity.find('[name="quantity"]').val(),
            data.product_filter.printer_id && (filter.printer_id = data.product_filter.printer_id),
                filter
        }
        function fix_height(data) {
            data.container.trigger("fix")
        }
        $.fn.hblLabelStepForm = function(opt) {
            return this.length && $(this).each(function() {
                let options = $.extend({}, $.fn.hblLabelStepForm.default_options, opt);
                var container;
                $.ajax({
                    url: $(this).data("apiurl") + "/translate/" + $(this).data("lang"),
                    type: "get",
                    xhrFields: {
                        withCredentials: !0
                    },
                    data: $.fn.hblRollLabelDiagram.default_options.lang,
                    complete: function(jxr) {
                        200 === jxr.status && ($.fn.hblRollLabelDiagram.default_options.lang = JSON.parse(jxr.responseText).payload)
                    }
                }),
                    $.ajax({
                        url: $(this).data("apiurl") + "/translate/" + $(this).data("lang"),
                        type: "get",
                        xhrFields: {
                            withCredentials: !0
                        },
                        data: options.lang,
                        complete: (container = $(this),
                                function(jxr) {
                                    var data;
                                    200 === jxr.status && (options.lang = JSON.parse(jxr.responseText).payload,
                                        (data = {
                                            container: container,
                                            options: options
                                        }).container.mbStepForm({
                                            intSteps: data.options.lang.hlc_sf_next_title,
                                            finalStep: data.options.lang.hlc_sf_cart_action,
                                            autoScroll: !1,
                                            onsub: function(args) {
                                                return function(data, step_form) {
                                                    data.step_printer.find(".printer-setup .custom-printer").hasClass("active") ? data.product_filter.printer_data = data.printer_data.custom : delete data.product_filter.printer_data;
                                                    data.product_filter.quantity = data.step_quantity.find('[name="quantity"]').val();
                                                    const ajax_props = {
                                                        url: step_form.find("form").attr("action"),
                                                        type: "post",
                                                        xhrFields: {
                                                            withCredentials: !0
                                                        },
                                                        data: data.product_filter,
                                                        complete: function(jxr) {
                                                            201 === jxr.status && (window.location = "/cart")
                                                        }
                                                    };
                                                    step_form.find("form").data("nonce") && (ajax_props.beforeSend = function(xhr) {
                                                            xhr.setRequestHeader("X-WP-Nonce", step_form.find("form").data("nonce"))
                                                        }
                                                    );
                                                    $.ajax(ajax_props)
                                                }(data, $(this)),
                                                    !1
                                            }
                                        }),
                                        data.s2_change_events = "select2-selected select2:select select2-removed select2:removed",
                                        data.container.find(".mb-update").each(function() {
                                            $(this).mbUpdate({
                                                replace: !0,
                                                accept: "html" === $(this).data("accept") ? "html" : "json"
                                            })
                                        }),
                                        data.product_filter = {
                                            size_data: {}
                                        },
                                        data.account = data.container.data("account"),
                                        data.step_printer = data.container.find(".step.printer"),
                                        data.step_shape = data.container.find(".step.shape"),
                                        data.step_material = data.container.find(".step.material"),
                                        data.step_quantity = data.container.find(".step.quantity"),
                                        data.step_shape_dirty = !0,
                                        data.step_material_dirty = !0,
                                        data.step_quantity_dirty = !0,
                                        data.next = data.container.find(".status-bar .next"),
                                        data.prev = data.container.find(".status-bar .previous"),
                                    0 < data.step_printer.length && function(data) {
                                        data.printer_data = {},
                                            data.initial_printer_loaded = !1,
                                            data.printer_step_activated = !1,
                                            data.manufacturer_grid_loaded = !1;
                                        var man_filter = $.mb.reserialize(get_manufacturer_filter(data))
                                            , man_filter = (data.step_printer.find('[name="printer_manufacturer"]').data("filter", man_filter),
                                            $.mb.reserialize(get_printer_filter(data)));
                                        data.step_printer.find('[name="order_item_data[printer][id]"]').data("filter", man_filter),
                                            data.step_printer.on("activated", function() {
                                                data.prev.hide(),
                                                    data.next.show(),
                                                    data.step_printer.find(".printer-search .printer-form label.label span.form-label").each(function() {
                                                        $(this).find("span.reset").remove(),
                                                            $(this).append('<span class="reset">Reset</span>')
                                                    }),
                                                    data.next.find(".btn").html(data.options.lang.hlc_sf_step_size),
                                                    data.printer_step_activated = !0,
                                                    preload_printer(data)
                                            }).on("click", ".printing-process button[data-value]", function() {
                                                $(this).hasClass("active") || (data.step_printer.find(".printing-process button.active").removeClass("active"),
                                                    $(this).addClass("active"),
                                                    set_printing_process(data)),
                                                    update_printer_step_summary(data)
                                            }).on("click", ".printer-search .show-custom-printer", function() {
                                                !function(data) {
                                                    delete data.printer_data.id;
                                                    const man = data.step_printer.find("input.custom-printer-manufacturer")
                                                        , model = data.step_printer.find("input.custom-printer-model")
                                                        , diameter = data.step_printer.find("input.custom-printer-diameter")
                                                        , type = data.step_printer.find("input.custom-printer-type")
                                                        , man_selector = data.step_printer.find('[name="printer_manufacturer"]')
                                                        , printer_selector = data.step_printer.find('[name="order_item_data[printer][id]"]');
                                                    man_selector.select2("val") ? man.val(man_selector.select2("data").text) : man.val("");
                                                    printer_selector.select2("val") ? model.val(printer_selector.select2("data").text) : model.val("");
                                                    diameter.val(data.step_printer.find('[name="diameter"]').select2("val"));
                                                    const type_sel = data.step_printer.find('[name="type"]');
                                                    0 < type_sel.length ? type.val(type_sel.select2("val")) : type.val("Inkjet");
                                                    update_custom_printer(data),
                                                        data.step_printer.find(".printer-setup .printer-search").removeClass("active"),
                                                        data.step_printer.find(".printer-setup .custom-printer").addClass("active"),
                                                        data.step_printer.find("input.use-custom-printer").val(1),
                                                        $(window).trigger("throttledresize")
                                                }(data),
                                                    update_printer_step_summary(data)
                                            }).on("click", ".custom-printer .show-printer-list", function() {
                                                show_printer_list(data),
                                                    update_printer_step_summary(data)
                                            }).on("change", '[name="printer_manufacturer"]', function() {
                                                var manufacturer = $(this).select2("data");
                                                set_printer_manufacturer(data, manufacturer && manufacturer.hasOwnProperty("payload") ? manufacturer.payload : {}, !0),
                                                    update_printer_step_summary(data)
                                            }).on("change", '[name="order_item_data[printer][id]"]', function() {
                                                let printer = $(this).select2("data");
                                                set_printer(data, printer && printer.hasOwnProperty("payload") ? printer.payload : {}, !0),
                                                    update_printer_step_summary(data)
                                            }).on("change", '[name="diameter"]', function() {
                                                var diameter = $(this).select2("val")
                                                    , core_size = ""
                                                    , outside_diameter = "";
                                                0 < diameter.length && (core_size = (diameter = diameter.split("x"))[0],
                                                    outside_diameter = diameter[1]),
                                                    function(data, core_size) {
                                                        data.product_filter.core_size && core_size == data.product_filter.core_size || update_printer_value(data, !1);
                                                        core_size ? data.printer_data.hasOwnProperty("core_size") && data.printer_data.core_size != core_size || (data.product_filter.core_size = core_size) : delete data.product_filter.core_size
                                                    }(data, core_size),
                                                    function(data, outside_diameter) {
                                                        data.product_filter.outside_diameter && outside_diameter == data.product_filter.outside_diameter || update_printer_value(data, !0);
                                                        outside_diameter ? data.printer_data.hasOwnProperty("outside_diameter") && data.printer_data.outside_diameter != outside_diameter && data.printer_data.outside_diameter_2 != outside_diameter || (data.product_filter.outside_diameter = outside_diameter) : delete data.product_filter.outside_diameter
                                                    }(data, outside_diameter),
                                                    update_printer_step_summary(data)
                                            }).on("change", '[name="type"]', function() {
                                                var process = $(this).select2("val");
                                                set_printing_process(data, process),
                                                    update_printer_step_summary(data)
                                            }).on("change keyup", '.custom-printer input[type="text"], .custom-printer-diameter, .custom-printer-type', function() {
                                                update_custom_printer(data),
                                                    update_printer_step_summary(data)
                                            }).on("click", ".manufacturer-grid .manufacturer", function() {
                                                data.step_printer.find('[name="printer_manufacturer"]').select2("data", {
                                                    id: $(this).data("id"),
                                                    text: $(this).find(".pgrid-title").text(),
                                                    payload: {
                                                        id: $(this).data("id"),
                                                        name: $(this).find(".pgrid-title").text()
                                                    }
                                                }, !0)
                                            }).on("click", ".printer-grid .printer", function() {
                                                data.step_printer.find('[name="order_item_data[printer][id]"]').select2("data", {
                                                    id: $(this).data("id"),
                                                    text: $(this).find(".pgrid-title").text(),
                                                    payload: {
                                                        id: $(this).data("id"),
                                                        model: $(this).find(".pgrid-title").text(),
                                                        manufacturer_id: $(this).data("manufacturer_id"),
                                                        core_size: $(this).data("core_size"),
                                                        outside_diameter: $(this).data("outside_diameter"),
                                                        outside_diameter_2: $(this).data("outside_diameter_2"),
                                                        matrix_preference: $(this).data("matrix_preference"),
                                                        type: $(this).data("type"),
                                                        manufacturer: {
                                                            id: $(this).data("manufacturer_id"),
                                                            name: $(this).find(".pgrid-subtitle").text()
                                                        }
                                                    }
                                                }, !0)
                                            }).on("updated", ".manufacturer-grid", function(e, jxr) {
                                                200 === jxr.status && (0 === JSON.parse(jxr.responseText).meta.total && data.step_printer.find(".manufacturer-grid").html("<p><em>" + $.mb.formatString(data.options.lang.hlc_sf_printer_no_results, {
                                                    custom: '<span class="show-custom-printer">' + data.options.lang.hlc_sf_printer_enter_custom + "</span>"
                                                }) + "</em></p>"),
                                                    data.manufacturer_grid_loaded = !0,
                                                    preload_printer(data))
                                            }).on("updated", ".printer-grid", function(e, jxr) {
                                                var selected_printer = data.step_printer.find('[name="order_item_data[printer][id]"]').select2("val");
                                                selected_printer && $(this).find('[data-id="' + selected_printer + '"]').addClass("selected"),
                                                200 === jxr.status && 0 === JSON.parse(jxr.responseText).meta.total && data.step_printer.find(".printer-grid:not(.your-printers)").html("<p><em>" + $.mb.formatString(data.options.lang.hlc_sf_printer_no_results, {
                                                    custom: '<span class="show-custom-printer">' + data.options.lang.hlc_sf_printer_enter_custom + "</span>"
                                                }) + "</em></p>")
                                            }).on("updated", ".your-printers", function(e, jxr) {
                                                0 === JSON.parse(jxr.responseText).meta.total && (jxr = "Laser" === data.product_filter.type ? data.options.lang.hlc_sf_printer_process_laser : data.options.lang.hlc_sf_printer_process_inkjet,
                                                    $(this).html("<p><em>" + $.mb.formatString(data.options.lang.hlc_sf_printer_no_saved, {
                                                        type: jxr
                                                    }) + "</em></p>"))
                                            }).on("click", ".form-label .reset", function() {
                                                $(this).closest(".label").find(".select2ajax, .select2").select2("data", null).select2("val", null).trigger("change"),
                                                    data.step_printer.find('[name="order_item_data[printer][id]"]').data("filter", $.mb.reserialize(get_printer_filter(data))),
                                                    $(window).trigger("throttledresize"),
                                                    fix_height(data)
                                            }).on("stepvalidate", function() {
                                                update_printer_step_summary(data) || $(this).removeClass("done")
                                            }),
                                            data.step_printer.find(".printer-step-grid").mbBreakPoints({
                                                breakPoints: {
                                                    0: "colset-1",
                                                    300: "colset-2",
                                                    500: "colset-3",
                                                    700: "colset-4",
                                                    900: "colset-5"
                                                }
                                            }),
                                            0 < data.step_printer.find(".manufacturer-grid").length ? (data.step_printer.find(".manufacturer-grid").data("filter", $.mb.reserialize(get_manufacturer_filter(data))).html("").trigger("update").closest(".manufacturer-grid-container").addClass("active"),
                                                data.step_printer.find(".printer-grid:not(.your-printers)").html("").removeClass("active")) : data.step_printer.find(".printer-grid:not(.your-printers)").data("filter", $.mb.reserialize(get_printer_filter(data))).html("").addClass("active").trigger("update");
                                        show_printer_list(data);
                                        const yp = data.step_printer.find(".your-printers");
                                        if (0 < yp.length) {
                                            const yp_filter = $.mb.unserialize(yp.data("filter"));
                                            yp_filter.type = "Inkjet",
                                                yp.data("filter", $.mb.reserialize(yp_filter)),
                                                yp.trigger("update")
                                        }
                                        data.step_printer.find("input.custom-printer-type").val(data.product_filter.type),
                                            fix_height(data),
                                            data.step_printer.find(".printer-setup").addClass("active"),
                                            data.step_printer.find(".printer-setup .custom-printer").removeClass("no-list"),
                                            update_printer_step_summary(data),
                                            $(window).on("throttledresize", function() {
                                                $(".pgrid-image").each(function() {
                                                    $(this).css({
                                                        height: $(this).css("width")
                                                    })
                                                })
                                            })
                                    }(data),
                                        function(data) {
                                            data.step_shape.on("activated", function() {
                                                data.step_shape_dirty && data.product_filter.hasOwnProperty("size_data") && data.product_filter.size_data.shape && show_grid(data),
                                                    data.prev.show(),
                                                    data.next.show(),
                                                    data.prev.find(".btn").html(data.options.lang.hlc_sf_step_printer).off("click").on("click", function() {
                                                        data.step_printer.trigger("goto")
                                                    }),
                                                    data.next.find(".btn").html(data.options.lang.hlc_sf_step_material)
                                            }).on("click", ".label-shapes button", function() {
                                                !function(data, shape_button) {
                                                    shape_button.hasClass("active") || (data.step_shape.find(".label-shapes button.active").removeClass("active"),
                                                        shape_button.addClass("active"),
                                                        shape_button.hasClass("custom") ? (data.step_shape.find(".sub-step.size").removeClass("active"),
                                                            data.step_shape.find(".sub-step.custom").addClass("active"),
                                                            fix_height(data)) : ("Circle" !== (shape_button = shape_button.data("value")) && "Continuous" !== shape_button || (data.step_shape.find('[name="label_width"]').val("").data("lastsearch", ""),
                                                            data.step_shape.find('[name="label_length"]').val("").data("lastsearch", "")),
                                                            set_shape(data, shape_button),
                                                            "Circle" === shape_button ? (data.step_shape.find(".label.width").val("").hide(),
                                                                data.step_shape.find(".label.length").show(),
                                                                data.step_shape.find(".label.height").show()) : "Continuous" === shape_button ? (data.step_shape.find(".label.width").show(),
                                                                data.step_shape.find(".label.length").val("").hide(),
                                                                data.step_shape.find(".label.height").val("").hide()) : (data.step_shape.find(".label.width").show(),
                                                                data.step_shape.find(".label.length").show(),
                                                                data.step_shape.find(".label.height").show())))
                                                }(data, $(this))
                                            }).on("change keyup", '.size-choose [name="label_width"], .size-choose [name="label_length"]', function() {
                                                $(this).data("lastsearch", $(this).val()),
                                                    $.mb.countdown(function() {
                                                        !function(data) {
                                                            data.step_shape.find(".size-choose-fixed-height").hasClass("show-grid") && data.step_shape.find(".size-grid").data("filter", $.mb.reserialize(get_size_filter(data))).trigger("update")
                                                        }(data)
                                                    }, 300, "sizedimensionsearch")
                                            }).on("mouseover", ".size-grid .rp-size", function() {
                                                !function(data, size) {
                                                    data.step_shape.find(".size-grid-tooltip").html(size.find(".tool-tip").html())
                                                }(data, $(this))
                                            }).on("mouseout", ".size-grid .rp-size", function() {
                                                !function(data) {
                                                    data.step_shape.find(".size-grid-tooltip").html(data.options.lang.hlc_sf_size_instructions)
                                                }(data, $(this))
                                            }).on("click", ".size-grid .rp-size", function() {
                                                !function(data, size) {
                                                    data.product_filter.size_id = size.data("size_id"),
                                                        data.product_filter.size_data = {
                                                            shape: size.data("shape"),
                                                            label_width: size.data("label_width"),
                                                            label_length: size.data("label_length"),
                                                            gap_tb: size.data("gap_tb"),
                                                            gap_lr: size.data("gap_lr"),
                                                            perforations: size.data("perforations"),
                                                            corner_radius: size.data("corner_radius")
                                                        },
                                                        data.product_filter.labels_per_row = size.data("labels_per_row"),
                                                        data.product_filter.label_material_id = null,
                                                        data.step_material_dirty = !0,
                                                        data.step_quantity_dirty = !0,
                                                        data.step_material.removeClass("done"),
                                                        data.step_quantity.removeClass("done"),
                                                        data.step_shape.find('[name="label_width"]').val(size.data("label_width")).prop("disabled", !0),
                                                        data.step_shape.find('[name="label_length"]').val(size.data("label_length")).prop("disabled", !0),
                                                        update_size_step_summary(data)
                                                }(data, $(this)),
                                                    function(data, size) {
                                                        data.step_shape.find(".size-choose-fixed-height").removeClass("show-grid").addClass("show-diagram"),
                                                            data.step_shape.find(".roll-diagram").data({
                                                                core_size: data.product_filter.core_size,
                                                                outside_diameter: data.product_filter.outside_diameter,
                                                                label_width: data.product_filter.size_data.label_width,
                                                                label_length: data.product_filter.size_data.label_length,
                                                                shape: data.product_filter.size_data.shape,
                                                                corner_radius: data.product_filter.size_data.corner_radius,
                                                                perforations: data.product_filter.size_data.perforations,
                                                                gap_lr: data.product_filter.size_data.gap_lr,
                                                                gap_tb: data.product_filter.size_data.gap_tb,
                                                                labels_per_row: data.product_filter.labels_per_row
                                                            }).hblRollLabelDiagram();
                                                        const label_stats = data.step_shape.find(".label-stats");
                                                        label_stats.html(size.find(".tool-tip").html()),
                                                            update_label_customizations(data, {
                                                                custom: size.hasClass("custom"),
                                                                min_up: size.data("min_up"),
                                                                max_up: size.data("max_up"),
                                                                labels_per_row: size.data("labels_per_row"),
                                                                perforations: size.data("perforations"),
                                                                timing_required: size.data("timing_required")
                                                            }),
                                                            update_size_step_summary(data),
                                                            fix_height(data)
                                                    }(data, $(this))
                                            }).on("click", ".size-diagram button.close-diagram", function() {
                                                set_shape(data, data.product_filter.size_data.shape)
                                            }).on("click", ".size-diagram button.next-diagram", function() {
                                                data.next.find(".btn").trigger("click")
                                            }).on("click", ".reset-input", function() {
                                                $(this).closest(".label").find("input").val("").trigger("change")
                                            }).on("update", ".size-grid", function() {
                                                $(this).html('<div class="hl-loading"><div></div><div></div><div></div><div></div></div>')
                                            }).on("updated", ".size-grid", function(e, jxr) {
                                                200 === jxr.status && 0 === JSON.parse(jxr.responseText).payload.length && data.step_shape.find(".size-grid").html('<p class="no-sizes"><em>' + data.options.lang.hlc_sf_printer_bad_size + "</em></p>")
                                            }).on("change keyup", ".label-customizations .labels-per-row input", function() {
                                                data.step_shape.find(".roll-diagram").data("labels_per_row", $(this).val()).trigger("rs_refresh"),
                                                    update_label_customizations(data, {
                                                        labels_per_row: $(this).val()
                                                    }),
                                                    data.product_filter.label_material_id = null,
                                                    data.step_material_dirty = !0,
                                                    data.step_quantity_dirty = !0,
                                                    update_size_step_summary(data)
                                            }).on("change", ".label-customizations .perforations select", function() {
                                                data.step_shape.find(".roll-diagram").data("perforations", $(this).val()).trigger("rs_refresh"),
                                                    update_label_customizations(data, {
                                                        perforations: $(this).val()
                                                    }),
                                                    data.product_filter.label_material_id = null,
                                                    data.step_material_dirty = !0,
                                                    data.step_quantity_dirty = !0,
                                                    update_size_step_summary(data)
                                            }).on("change keyup", ".label-customizations .matrix select", function() {
                                                update_label_customizations(data, {
                                                    matrix: $(this).val()
                                                }),
                                                    data.product_filter.label_material_id = null,
                                                    data.step_material_dirty = !0,
                                                    data.step_quantity_dirty = !0,
                                                    update_size_step_summary(data)
                                            }).on("change keyup", ".label-customizations .timing-marks select", function() {
                                                update_label_customizations(data, {
                                                    timing_marks: $(this).val()
                                                }),
                                                    data.product_filter.label_material_id = null,
                                                    data.step_material_dirty = !0,
                                                    data.step_quantity_dirty = !0,
                                                    update_size_step_summary(data)
                                            }).on("stepvalidate", function() {
                                                update_size_step_summary(data) || $(this).removeClass("done")
                                            }),
                                                data.step_shape.find(".label-shapes").mbBreakPoints({
                                                    breakPoints: {
                                                        0: "colset-1",
                                                        300: "colset-2",
                                                        500: "colset-3",
                                                        600: "colset-4",
                                                        700: "colset-5",
                                                        800: "colset-6"
                                                    }
                                                }),
                                                data.step_shape.find(".size-grid").mbBreakPoints({
                                                    breakPoints: {
                                                        0: "colset-1",
                                                        250: "colset-2",
                                                        450: "colset-3",
                                                        650: "colset-4",
                                                        850: "colset-5"
                                                    }
                                                })
                                        }(data),
                                        function(data) {
                                            data.step_material.on("activated", function() {
                                                data.step_material_dirty && !function(data) {
                                                    const mat_list = data.step_material.find(".material-list")
                                                        , mat_filter = $.mb.unserialize(mat_list.data("filter"));
                                                    mat_filter.product_filter = data.product_filter,
                                                        mat_list.data("filter", $.mb.reserialize(mat_filter)).html("").trigger("update"),
                                                        data.step_material.find(".material-details").removeClass("active")
                                                }(data),
                                                    data.prev.show(),
                                                    data.next.show(),
                                                    data.prev.find(".btn").html(data.options.lang.hlc_sf_step_size).off("click").on("click", function() {
                                                        data.step_shape.trigger("goto")
                                                    }),
                                                    data.next.find(".btn").html(data.options.lang.hlc_sf_step_quantity),
                                                    hide_material_details(data)
                                            }).on("change", ".hlc-lm-form select", function() {
                                                filter_sort_materials(data)
                                            }).on("click", '.hlc-lm-form input[type="checkbox"]', function() {
                                                filter_sort_materials(data)
                                            }).on("click", ".material-list button, .material-list .hlc-material-image", function() {
                                                !function(data, material, product) {
                                                    data.product_filter.label_material_id = material,
                                                        data.product_id = product,
                                                        data.step_material.find(".material-selector.selected").removeClass("selected"),
                                                        data.step_material.find(".material-selector.material-" + material).addClass("selected"),
                                                        data.step_quantity_dirty = !0,
                                                        data.step_quantity.removeClass("done"),
                                                        update_material_step_summary(data)
                                                }(data, $(this).data("id"), $(this).data("id")),
                                                    data.step_quantity.trigger("goto")
                                            }).on("click", ".hlc-material-show-details", function() {
                                                !function(data, material) {
                                                    data.step_material.find(".show-material-details").removeClass("show-material-details"),
                                                        material.addClass("show-material-details");
                                                    const sub_step = data.step_material.find(".sub-step.material").removeAttr("style")
                                                        , details = material.find(".hlc-material-details").removeAttr("style")
                                                        , total_grid_height = (sub_step.append('<div class="hlc-lm-overlay">'),
                                                        sub_step.outerHeight())
                                                        , detail_height = details.outerHeight()
                                                        , material_offset = material.position().top;
                                                    total_grid_height < detail_height ? (details.css({
                                                        top: 0
                                                    }),
                                                        sub_step.css({
                                                            height: detail_height
                                                        })) : total_grid_height - material_offset < detail_height ? details.css({
                                                        bottom: 0
                                                    }) : details.css({
                                                        top: material_offset
                                                    });
                                                    fix_height(data)
                                                }(data, $(this).closest(".hlc-label-material"))
                                            }).on("click", ".hlc-material-hide-details, .hlc-lm-overlay", function() {
                                                hide_material_details(data)
                                            }).on("stepvalidate", function() {
                                                update_material_step_summary(data) || $(this).removeClass("done")
                                            }).on("updated", ".material-list", function() {
                                                scrollto_top(data)
                                            }),
                                                data.step_material.find(".material-list").mbBreakPoints({
                                                    breakPoints: {
                                                        0: "colset-1",
                                                        300: "colset-2",
                                                        600: "colset-3",
                                                        800: "colset-4"
                                                    }
                                                }),
                                                data.step_material.find(".hlc-lm-form").mbBreakPoints({
                                                    breakPoints: {
                                                        0: "hlc-lm-form-stacked",
                                                        500: "hlc-lm-form-split",
                                                        800: "hlc-lm-form-horizontal"
                                                    }
                                                })
                                        }(data),
                                        function(data) {
                                            data.step_quantity.on("activated", function() {
                                                data.step_quantity_dirty && (!function(data) {
                                                    data.step_quantity.find(".sub-step.product-information").data("filter", $.mb.reserialize(get_product_info_filter(data))).html("").trigger("update")
                                                }(data),
                                                    update_quantity_info(data)),
                                                    data.prev.show(),
                                                    data.next.show(),
                                                    data.prev.find(".btn").html(data.options.lang.hlc_sf_step_material).off("click").on("click", function() {
                                                        data.step_material.trigger("goto")
                                                    }),
                                                    data.next.find(".btn").html(data.options.lang.hlc_sf_cart_action)
                                            }).on("change", '[name="order_item_data[timing_required]"]', function() {
                                                !function(data, selector) {
                                                    const timing_indicator = data.step_quantity.find(".product-information li .timing-marks");
                                                    "1" === selector.val() ? (timing_indicator.html(data.options.lang.hlc_yes),
                                                    timing_indicator.data("required") || (data.product_filter.timing_marks = 1,
                                                        update_quantity_info(data))) : "0" === selector.val() ? timing_indicator.data("required") || (timing_indicator.html(data.options.lang.hlc_no),
                                                        data.product_filter.timing_marks = 0,
                                                        update_quantity_info(data)) : timing_indicator.data("required") || (timing_indicator.html(data.options.lang.hlc_no),
                                                        delete data.product_filter.timing_marks,
                                                        update_quantity_info(data))
                                                }(data, $(this))
                                            }).on("change keyup", '[name="quantity"]', function() {
                                                update_total_price(data)
                                            }).on("change", '[name="quantity"]', function() {
                                                !function(data) {
                                                    const quantity_sel = data.step_quantity.find('[name="quantity"]')
                                                        , quantity = quantity_sel.val();
                                                    quantity < quantity_sel.data("min") && quantity_sel.val(quantity_sel.data("min"))
                                                }(data),
                                                    update_total_price(data)
                                            }).on("click", ".totals .next", function() {
                                                data.container.find(".status-bar .btn.next-step").trigger("click")
                                            }).on("updated", ".sub-step.quantity-information", function() {
                                                data.step_quantity.find(".price-blocks").mbBreakPoints({
                                                    breakPoints: {
                                                        0: "colset-1",
                                                        500: "colset-8"
                                                    }
                                                }),
                                                    data.step_quantity.find('.quantity input[type="text"]').focus(),
                                                    update_total_price(data)
                                            })
                                        }(data),
                                        data.container.on("updated", function() {
                                            data.container.imagesLoaded().always(function() {
                                                fix_height(data)
                                            }),
                                                fix_height(data)
                                        }).on("click", ".custom-roll-label-inquiry", function() {
                                            var query_data = {}
                                                , site_url = (data.product_filter.hasOwnProperty("printer_id") ? query_data.printer_id = data.product_filter.printer_id : data.hasOwnProperty("printer_data") && data.printer_data.hasOwnProperty("custom") && (query_data.printer_manufacturer_name = data.printer_data.custom.manufacturer,
                                                query_data.printer_model = data.printer_data.custom.model,
                                                query_data.core_size = data.printer_data.custom.core_size,
                                                query_data.outside_diameter = data.printer_data.custom.outside_diameter),
                                            data.product_filter.hasOwnProperty("type") && (query_data.type = data.product_filter.type),
                                            data.product_filter.size_data.hasOwnProperty("shape") && (query_data.shape = data.product_filter.size_data.shape),
                                            location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : ""));
                                            $.mb.relocate(query_data, site_url + "/custom-roll-label-inquiry", !1)
                                        }).on("activated", ".step", function() {
                                            scrollto_top(data)
                                        }),
                                        data.container.find(".steps li.step-nav-printer .reset-step").on("click", function(e) {
                                            !function(data, goto) {
                                                data.hasOwnProperty("printer_filter") || (data.printer_filter = {});
                                                data.step_printer.find('[name="diameter"]').select2("val", ""),
                                                    data.step_printer.find('[name="printer_manufacturer"]').select2("val", ""),
                                                    delete data.product_filter.core_size,
                                                    delete data.product_filter.outside_diameter,
                                                    set_printer_manufacturer(data, {}, !0),
                                                    update_printer_step_summary(data),
                                                goto && (reset_shape(data, !1),
                                                    reset_material(data, !1),
                                                    data.step_printer.trigger("goto"),
                                                    $(window).trigger("throttledresize"))
                                            }(data, !0),
                                                e.stopPropagation()
                                        }),
                                        data.container.find(".steps li.step-nav-shape .reset-step").on("click", function(e) {
                                            reset_shape(data, !0),
                                                e.stopPropagation()
                                        }),
                                        data.container.find(".steps li.step-nav-material .reset-step").on("click", function(e) {
                                            reset_material(data, !0),
                                                e.stopPropagation()
                                        }),
                                        data.container.imagesLoaded().always(function() {
                                            fix_height(data)
                                        }),
                                        (data.step_printer || data.step_shape).trigger("goto"))
                                }
                        )
                    })
            }),
                this
        }
            ,
            $.fn.hblLabelStepForm.default_options = {
                autoScroll: !0,
                lang: {
                    hlc_yes: "Yes",
                    hlc_no: "No",
                    hlc_inches: ['{value}"', "{value}"],
                    hlc_feet: ["{value}'", "{value}"],
                    hlc_sf_next_title: "Continue not translated",
                    hlc_sf_next_action: "Next Step",
                    hlc_sf_cart_action: "Add to Cart",
                    hlc_sf_reset: "Reset",
                    hlc_sf_step_printer: "Printer Settings",
                    hlc_sf_printer_process_inkjet: "Inkjet",
                    hlc_sf_printer_process_laser: "Laser",
                    hlc_sf_printer_no_results: ["We couldn't find any printers that matched your search parameters. If you think we're missing a printer, you can {custom} and continue placing your order.", "{custom}"],
                    hlc_sf_printer_enter_custom: "enter a custom printer",
                    hlc_sf_printer_no_saved: ["You haven't saved any {type} printers yet.", "{type}"],
                    hlc_sf_printer_process: "Process",
                    hlc_sf_printer: "Printer",
                    hlc_sf_printer_core: "Core",
                    hlc_sf_printer_outside: "Outside Diameter",
                    hlc_sf_printer_bad_size: "Your current printer won't support labels of this size. If you have any questions about what size labels your printer can support, or you have any other questions, please give us a call.",
                    hlc_sf_step_size: "Shape & Size",
                    hlc_sf_shape: "Shape",
                    hlc_sf_size: "Size",
                    hlc_sf_size_instructions: "Click or hover over a size on the right for more details.",
                    hlc_sf_size_lpr: "Labels per Row",
                    hlc_sf_size_across: "across",
                    hlc_sf_size_corners: "Corners",
                    hlc_sf_size_gap_long: "Gap (top / bottom)",
                    hlc_sf_size_margin_long: "Margin (left / right)",
                    hlc_sf_size_perf_perforated: "Perforated",
                    hlc_sf_shape_square: "Rectangle",
                    hlc_sf_shape_circle: "Circle",
                    hlc_sf_shape_oval: "Oval",
                    hlc_sf_shape_continuous: "Continuous",
                    hlc_sf_shape_rounded: "Rounded Corners",
                    hlc_sf_shape_custom: "Custom",
                    hlc_sf_step_material: "Label Material",
                    hlc_sf_material: "Material",
                    hlc_sf_step_quantity: "Quantity & Pricing"
                }
            }
    }(jQuery),
    !function($) {
        $.fn.hblDistQuote = function() {
            return this.length && $(this).each(function() {
                ({
                    container: $(this)
                }).container.on("input change keyup", '[name="quantity"]', function() {
                    {
                        var block = $(this).closest(".diameter-block");
                        block.find(".form-message-container .message").remove();
                        const quantity = block.find('[name="quantity"]').val();
                        let quantity_level = 0
                            , unit_price = 0;
                        return block.find("tbody tr.current").removeClass("current"),
                            void (0 < quantity ? (block.find("tbody tr").each(function() {
                                var row_quantity = $(this).data("quantity");
                                (0 === quantity_level || row_quantity <= quantity && row_quantity > quantity_level) && (quantity_level = row_quantity,
                                    unit_price = $(this).data("price"))
                            }),
                                block.find(".label .total").html($.mb.formatCurrency(quantity * unit_price)),
                                block.find('tbody tr[data-quantity="' + quantity_level + '"]').addClass("current")) : block.find(".label .total").html(""))
                    }
                }).on("submit", function(event) {
                    event.stopImmediatePropagation();
                    {
                        var form = $(this);
                        form.find(".form-message-container .message").remove();
                        let quantity = form.find('[name="quantity"]').val()
                            , quote_id = form.find('[name="roll_label_quote_id"]').val()
                            , ajax_props = {
                            url: form.attr("action"),
                            type: "post",
                            xhrFields: {
                                withCredentials: !0
                            },
                            data: {
                                roll_label_quote_id: quote_id,
                                quantity: quantity,
                                core_size: form.find('[name="core_size"]').val(),
                                outside_diameter: form.find('[name="outside_diameter"]').val()
                            },
                            complete: function(jxr) {
                                201 === jxr.status ? window.location = JSON.parse(jxr.responseText).payload.redirect : void 0 !== jxr.responseJSON.message && form.find(".form-message-container").html('<div class="message error">' + jxr.responseJSON.message + "</div>")
                            }
                        };
                        form.data("nonce") && (ajax_props.beforeSend = function(xhr) {
                                xhr.setRequestHeader("X-WP-Nonce", form.data("nonce"))
                            }
                        ),
                            0 < quantity ? $.ajax(ajax_props) : form.find(".form-message-container").html('<div class="message error">Please enter a quantity.</div>')
                    }
                    return !1
                })
            }),
                this
        }
    }(jQuery),
    !function($) {
        function history_change() {
            var host = window.location.protocol + "//" + window.location.hostname
                , host = window.location.href.substring(host.length + 1);
            $(window).trigger("historychange", {
                url: host,
                title: "",
                stateObject: {}
            })
        }
        function form_setup() {
            $("#hlc-roll-label-step-form form.mb-form:not(.kestrel-form-initialized)").mbForm(),
                $("#hlc-roll-label-step-form form.form-columns:not(.kestrel-form-initialized)").mbBreakPoints({
                    breakPoints: {
                        0: "col-1",
                        300: "col-2",
                        500: "col-3",
                        700: "col-4",
                        900: "col-5"
                    }
                }),
                $("#hlc-roll-label-step-form form .form-columns:not(.kestrel-form-initialized)").mbBreakPoints({
                    breakPoints: {
                        0: "col-1",
                        300: "col-2",
                        500: "col-3",
                        700: "col-4",
                        900: "col-5"
                    }
                }),
                $("#hlc-roll-label-step-form .mb-form-columns:not(.kestrel-form-initialized)").mbBreakPoints({
                    breakPoints: {
                        0: "colset-1",
                        300: "colset-2",
                        500: "colset-3",
                        700: "colset-4",
                        900: "colset-5"
                    }
                }),
                $("#hlc-roll-label-step-form form.mb-form:not(.kestrel-form-initialized), #hlc-roll-label-step-form .mb-form-columns:not(.kestrel-form-initialized)").addClass("kestrel-form-initialized")
        }
        $.fn.mbUpdate.default_options.xhrFields = {
            withCredentials: !0
        },
            $.fn.mbForm.default_options.xhrFields = {
                withCredentials: !0
            },
            $.fn.hblLabelStepForm.default_options.autoScroll = !1,
            $(document).ready(function() {
                var body = $("body");
                form_setup(),
                    body.on("updated.mb", function() {
                        form_setup(),
                            $(window).trigger("throttledresize")
                    }),
                    body.imagesLoaded().done(function() {
                        $(window).trigger("throttledresize")
                    }),
                    $("#hlc-roll-label-step-form .mb-data").on("updated.mb", function() {
                        0 < $(this).find("img").length && $(this).imagesLoaded().done(function() {
                            $(window).trigger("throttledresize")
                        }),
                            form_setup(),
                            $(window).trigger("throttledresize")
                    }),
                    $("#hlc-roll-label-step-form").mbBreakPoints({
                        breakPoints: {
                            0: "mobile",
                            500: "wide-steps",
                            850: "left-steps",
                            1200: "left-steps-wide"
                        }
                    }).hblLabelStepForm(),
                    $("#hlc-roll-label-step-form .product-grid").mbBreakPoints({
                        breakPoints: {
                            0: "colset-1",
                            300: "colset-2",
                            500: "colset-3",
                            700: "colset-4",
                            900: "colset-5"
                        }
                    }),
                    $(".quote-add-to-cart").hblDistQuote(),
                    $.mb.setCookie("timezone_offset", $.mb.getTimezoneOffset()),
                    $.mb.setCookie("timezone_dst", $.mb.getTimezoneDST()),
                    $(window).trigger("throttledresize"),
                    history_change()
            }),
            window.onpopstate = function(e) {
                history_change()
            }
    }(jQuery);
//# sourceMappingURL=dist.min.js.map
