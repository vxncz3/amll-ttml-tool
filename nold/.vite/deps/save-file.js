import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// node_modules/file-saver/dist/FileSaver.min.js
var require_FileSaver_min = __commonJS({
  "node_modules/file-saver/dist/FileSaver.min.js"(exports, module) {
    (function(a, b) {
      if ("function" == typeof define && define.amd) define([], b);
      else if ("undefined" != typeof exports) b();
      else {
        b(), a.FileSaver = { exports: {} }.exports;
      }
    })(exports, function() {
      "use strict";
      function b(a2, b2) {
        return "undefined" == typeof b2 ? b2 = { autoBom: false } : "object" != typeof b2 && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
      }
      function c(a2, b2, c2) {
        var d2 = new XMLHttpRequest();
        d2.open("GET", a2), d2.responseType = "blob", d2.onload = function() {
          g(d2.response, b2, c2);
        }, d2.onerror = function() {
          console.error("could not download file");
        }, d2.send();
      }
      function d(a2) {
        var b2 = new XMLHttpRequest();
        b2.open("HEAD", a2, false);
        try {
          b2.send();
        } catch (a3) {
        }
        return 200 <= b2.status && 299 >= b2.status;
      }
      function e(a2) {
        try {
          a2.dispatchEvent(new MouseEvent("click"));
        } catch (c2) {
          var b2 = document.createEvent("MouseEvents");
          b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
        }
      }
      var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {
      } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h) {
        var i = f.URL || f.webkitURL, j = document.createElement("a");
        g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", "string" == typeof b2 ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
          i.revokeObjectURL(j.href);
        }, 4e4), setTimeout(function() {
          e(j);
        }, 0));
      } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h) {
        if (g2 = g2 || f2.name || "download", "string" != typeof f2) navigator.msSaveOrOpenBlob(b(f2, h), g2);
        else if (d(f2)) c(f2, g2, h);
        else {
          var i = document.createElement("a");
          i.href = f2, i.target = "_blank", setTimeout(function() {
            e(i);
          });
        }
      } : function(b2, d2, e2, g2) {
        if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), "string" == typeof b2) return c(b2, d2, e2);
        var h = "application/octet-stream" === b2.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
        if ((j || h && i || a) && "undefined" != typeof FileReader) {
          var k = new FileReader();
          k.onloadend = function() {
            var a2 = k.result;
            a2 = j ? a2 : a2.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a2 : location = a2, g2 = null;
          }, k.readAsDataURL(b2);
        } else {
          var l = f.URL || f.webkitURL, m = l.createObjectURL(b2);
          g2 ? g2.location = m : location.href = m, g2 = null, setTimeout(function() {
            l.revokeObjectURL(m);
          }, 4e4);
        }
      });
      f.saveAs = g.saveAs = g, "undefined" != typeof module && (module.exports = g);
    });
  }
});

// node_modules/atob-lite/atob-browser.js
var require_atob_browser = __commonJS({
  "node_modules/atob-lite/atob-browser.js"(exports, module) {
    module.exports = function _atob(str) {
      return atob(str);
    };
  }
});

// node_modules/is-base64/is-base64.js
var require_is_base64 = __commonJS({
  "node_modules/is-base64/is-base64.js"(exports, module) {
    (function(root) {
      "use strict";
      function isBase64(v, opts) {
        if (v instanceof Boolean || typeof v === "boolean") {
          return false;
        }
        if (!(opts instanceof Object)) {
          opts = {};
        }
        if (opts.hasOwnProperty("allowBlank") && !opts.allowBlank && v === "") {
          return false;
        }
        var regex = "(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?";
        if (opts.mime) {
          regex = "(data:\\w+\\/[a-zA-Z\\+\\-\\.]+;base64,)?" + regex;
        }
        if (opts.paddingRequired === false) {
          regex = "(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?";
        }
        return new RegExp("^" + regex + "$", "gi").test(v);
      }
      if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
          exports = module.exports = isBase64;
        }
        exports.isBase64 = isBase64;
      } else if (typeof define === "function" && define.amd) {
        define([], function() {
          return isBase64;
        });
      } else {
        root.isBase64 = isBase64;
      }
    })(exports);
  }
});

// node_modules/string-to-arraybuffer/index.js
var require_string_to_arraybuffer = __commonJS({
  "node_modules/string-to-arraybuffer/index.js"(exports, module) {
    "use strict";
    var atob2 = require_atob_browser();
    var isBase64 = require_is_base64();
    module.exports = function stringToArrayBuffer(arg) {
      if (typeof arg !== "string") throw Error("Argument should be a string");
      if (/^data\:/i.test(arg)) return decode(arg);
      if (isBase64(arg)) arg = atob2(arg);
      return str2ab(arg);
    };
    function str2ab(str) {
      var array = new Uint8Array(str.length);
      for (var i = 0; i < str.length; i++) {
        array[i] = str.charCodeAt(i);
      }
      return array.buffer;
    }
    function decode(uri) {
      uri = uri.replace(/\r?\n/g, "");
      var firstComma = uri.indexOf(",");
      if (-1 === firstComma || firstComma <= 4) throw new TypeError("malformed data-URI");
      var meta = uri.substring(5, firstComma).split(";");
      var base64 = false;
      var charset = "US-ASCII";
      for (var i = 0; i < meta.length; i++) {
        if ("base64" == meta[i]) {
          base64 = true;
        } else if (0 == meta[i].indexOf("charset=")) {
          charset = meta[i].substring(8);
        }
      }
      var data = unescape(uri.substring(firstComma + 1));
      if (base64) data = atob2(data);
      var abuf = str2ab(data);
      abuf.type = meta[0] || "text/plain";
      abuf.charset = charset;
      return abuf;
    }
  }
});

// node_modules/dtype/index.js
var require_dtype = __commonJS({
  "node_modules/dtype/index.js"(exports, module) {
    module.exports = function(dtype) {
      switch (dtype) {
        case "int8":
          return Int8Array;
        case "int16":
          return Int16Array;
        case "int32":
          return Int32Array;
        case "uint8":
          return Uint8Array;
        case "uint16":
          return Uint16Array;
        case "uint32":
          return Uint32Array;
        case "float32":
          return Float32Array;
        case "float64":
          return Float64Array;
        case "array":
          return Array;
        case "uint8_clamped":
          return Uint8ClampedArray;
      }
    };
  }
});

// node_modules/flatten-vertex-data/index.js
var require_flatten_vertex_data = __commonJS({
  "node_modules/flatten-vertex-data/index.js"(exports, module) {
    var dtype = require_dtype();
    module.exports = flattenVertexData;
    function flattenVertexData(data, output, offset) {
      if (!data) throw new TypeError("must specify data as first parameter");
      offset = +(offset || 0) | 0;
      if (Array.isArray(data) && (data[0] && typeof data[0][0] === "number")) {
        var dim = data[0].length;
        var length = data.length * dim;
        var i, j, k, l;
        if (!output || typeof output === "string") {
          output = new (dtype(output || "float32"))(length + offset);
        }
        var dstLength = output.length - offset;
        if (length !== dstLength) {
          throw new Error("source length " + length + " (" + dim + "x" + data.length + ") does not match destination length " + dstLength);
        }
        for (i = 0, k = offset; i < data.length; i++) {
          for (j = 0; j < dim; j++) {
            output[k++] = data[i][j] === null ? NaN : data[i][j];
          }
        }
      } else {
        if (!output || typeof output === "string") {
          var Ctor = dtype(output || "float32");
          if (Array.isArray(data) || output === "array") {
            output = new Ctor(data.length + offset);
            for (i = 0, k = offset, l = output.length; k < l; k++, i++) {
              output[k] = data[i] === null ? NaN : data[i];
            }
          } else {
            if (offset === 0) {
              output = new Ctor(data);
            } else {
              output = new Ctor(data.length + offset);
              output.set(data, offset);
            }
          }
        } else {
          output.set(data, offset);
        }
      }
      return output;
    }
  }
});

// node_modules/to-array-buffer/index.js
var require_to_array_buffer = __commonJS({
  "node_modules/to-array-buffer/index.js"(exports, module) {
    "use strict";
    var str2ab = require_string_to_arraybuffer();
    var flat = require_flatten_vertex_data();
    module.exports = function toArrayBuffer(arg) {
      if (!arg) return null;
      if (arg instanceof ArrayBuffer) return arg;
      if (typeof arg === "string") {
        return str2ab(arg);
      }
      if (ArrayBuffer.isView(arg)) {
        if (arg.byteOffset) {
          return arg.buffer.slice(arg.byteOffset, arg.byteOffset + arg.byteLength);
        }
        return arg.buffer;
      }
      if (arg.buffer || arg.data || arg._data) {
        var result = toArrayBuffer(arg.buffer || arg.data || arg._data);
        return result;
      }
      if (Array.isArray(arg)) {
        for (var i = 0; i < arg.length; i++) {
          if (arg[i].length != null) {
            arg = flat(arg);
            break;
          }
        }
      }
      var result = new Uint8Array(arg);
      if (!result.length) return null;
      return result.buffer;
    };
  }
});

// node_modules/simple-mime/simple-mime.js
var require_simple_mime = __commonJS({
  "node_modules/simple-mime/simple-mime.js"(exports, module) {
    var types;
    module.exports = function setup(defaultMime) {
      return function getMime(path) {
        path = path.toLowerCase().trim();
        var index = path.lastIndexOf("/");
        if (index >= 0) {
          path = path.substr(index + 1);
        }
        index = path.lastIndexOf(".");
        if (index >= 0) {
          path = path.substr(index + 1);
        }
        return types[path] || defaultMime;
      };
    };
    types = {
      "3gp": "video/3gpp",
      a: "application/octet-stream",
      ai: "application/postscript",
      aif: "audio/x-aiff",
      aiff: "audio/x-aiff",
      asc: "application/pgp-signature",
      asf: "video/x-ms-asf",
      asm: "text/x-asm",
      asx: "video/x-ms-asf",
      atom: "application/atom+xml",
      au: "audio/basic",
      avi: "video/x-msvideo",
      bat: "application/x-msdownload",
      bin: "application/octet-stream",
      bmp: "image/bmp",
      bz2: "application/x-bzip2",
      c: "text/x-csrc",
      cab: "application/vnd.ms-cab-compressed",
      can: "application/candor",
      cc: "text/x-c++src",
      chm: "application/vnd.ms-htmlhelp",
      "class": "application/octet-stream",
      com: "application/x-msdownload",
      conf: "text/plain",
      cpp: "text/x-c",
      crt: "application/x-x509-ca-cert",
      css: "text/css",
      csv: "text/csv",
      cxx: "text/x-c",
      deb: "application/x-debian-package",
      der: "application/x-x509-ca-cert",
      diff: "text/x-diff",
      djv: "image/vnd.djvu",
      djvu: "image/vnd.djvu",
      dll: "application/x-msdownload",
      dmg: "application/octet-stream",
      doc: "application/msword",
      dot: "application/msword",
      dtd: "application/xml-dtd",
      dvi: "application/x-dvi",
      ear: "application/java-archive",
      eml: "message/rfc822",
      eps: "application/postscript",
      exe: "application/x-msdownload",
      f: "text/x-fortran",
      f77: "text/x-fortran",
      f90: "text/x-fortran",
      flv: "video/x-flv",
      "for": "text/x-fortran",
      gem: "application/octet-stream",
      gemspec: "text/x-script.ruby",
      gif: "image/gif",
      gyp: "text/x-script.python",
      gypi: "text/x-script.python",
      gz: "application/x-gzip",
      h: "text/x-chdr",
      hh: "text/x-c++hdr",
      htm: "text/html",
      html: "text/html",
      ico: "image/vnd.microsoft.icon",
      ics: "text/calendar",
      ifb: "text/calendar",
      iso: "application/octet-stream",
      jar: "application/java-archive",
      java: "text/x-java-source",
      jnlp: "application/x-java-jnlp-file",
      jpeg: "image/jpeg",
      jpg: "image/jpeg",
      js: "application/javascript",
      json: "application/json",
      less: "text/css",
      log: "text/plain",
      lua: "text/x-script.lua",
      luac: "application/x-bytecode.lua",
      makefile: "text/x-makefile",
      m3u: "audio/x-mpegurl",
      m4v: "video/mp4",
      man: "text/troff",
      manifest: "text/cache-manifest",
      markdown: "text/x-markdown",
      mathml: "application/mathml+xml",
      mbox: "application/mbox",
      mdoc: "text/troff",
      md: "text/x-markdown",
      me: "text/troff",
      mid: "audio/midi",
      midi: "audio/midi",
      mime: "message/rfc822",
      mml: "application/mathml+xml",
      mng: "video/x-mng",
      mov: "video/quicktime",
      mp3: "audio/mpeg",
      mp4: "video/mp4",
      mp4v: "video/mp4",
      mpeg: "video/mpeg",
      mpg: "video/mpeg",
      ms: "text/troff",
      msi: "application/x-msdownload",
      odp: "application/vnd.oasis.opendocument.presentation",
      ods: "application/vnd.oasis.opendocument.spreadsheet",
      odt: "application/vnd.oasis.opendocument.text",
      ogg: "application/ogg",
      p: "text/x-pascal",
      pas: "text/x-pascal",
      pbm: "image/x-portable-bitmap",
      pdf: "application/pdf",
      pem: "application/x-x509-ca-cert",
      pgm: "image/x-portable-graymap",
      pgp: "application/pgp-encrypted",
      pkg: "application/octet-stream",
      pl: "text/x-script.perl",
      pm: "text/x-script.perl-module",
      png: "image/png",
      pnm: "image/x-portable-anymap",
      ppm: "image/x-portable-pixmap",
      pps: "application/vnd.ms-powerpoint",
      ppt: "application/vnd.ms-powerpoint",
      ps: "application/postscript",
      psd: "image/vnd.adobe.photoshop",
      py: "text/x-script.python",
      qt: "video/quicktime",
      ra: "audio/x-pn-realaudio",
      rake: "text/x-script.ruby",
      ram: "audio/x-pn-realaudio",
      rar: "application/x-rar-compressed",
      rb: "text/x-script.ruby",
      rdf: "application/rdf+xml",
      roff: "text/troff",
      rpm: "application/x-redhat-package-manager",
      rss: "application/rss+xml",
      rtf: "application/rtf",
      ru: "text/x-script.ruby",
      s: "text/x-asm",
      sgm: "text/sgml",
      sgml: "text/sgml",
      sh: "application/x-sh",
      sig: "application/pgp-signature",
      snd: "audio/basic",
      so: "application/octet-stream",
      svg: "image/svg+xml",
      svgz: "image/svg+xml",
      swf: "application/x-shockwave-flash",
      t: "text/troff",
      tar: "application/x-tar",
      tbz: "application/x-bzip-compressed-tar",
      tci: "application/x-topcloud",
      tcl: "application/x-tcl",
      tex: "application/x-tex",
      texi: "application/x-texinfo",
      texinfo: "application/x-texinfo",
      text: "text/plain",
      tif: "image/tiff",
      tiff: "image/tiff",
      torrent: "application/x-bittorrent",
      tr: "text/troff",
      ttf: "application/x-font-ttf",
      txt: "text/plain",
      vcf: "text/x-vcard",
      vcs: "text/x-vcalendar",
      vrml: "model/vrml",
      war: "application/java-archive",
      wav: "audio/x-wav",
      webapp: "application/x-web-app-manifest+json",
      webm: "video/webm",
      wma: "audio/x-ms-wma",
      wmv: "video/x-ms-wmv",
      wmx: "video/x-ms-wmx",
      wrl: "model/vrml",
      wsdl: "application/wsdl+xml",
      xbm: "image/x-xbitmap",
      xhtml: "application/xhtml+xml",
      xls: "application/vnd.ms-excel",
      xml: "application/xml",
      xpm: "image/x-xpixmap",
      xsl: "application/xml",
      xslt: "application/xslt+xml",
      yaml: "text/yaml",
      yml: "text/yaml",
      zip: "application/zip"
    };
  }
});

// node_modules/is-blob/index.js
var require_is_blob = __commonJS({
  "node_modules/is-blob/index.js"(exports, module) {
    "use strict";
    var toString = Object.prototype.toString;
    module.exports = function(x) {
      return x instanceof Blob || toString.call(x) === "[object Blob]";
    };
  }
});

// node_modules/save-file/src/to-blob.js
var require_to_blob = __commonJS({
  "node_modules/save-file/src/to-blob.js"(exports, module) {
    "use strict";
    var ab = require_to_array_buffer();
    var getMimeType = require_simple_mime()("application/octect-stream");
    var isBlob = require_is_blob();
    module.exports = function toBlob(data, filename) {
      if (!isBlob(data) && !(data instanceof File)) {
        data = ab(data);
        var mime = getMimeType(filename || "");
        data = new Blob([data], { type: mime });
      }
      return data;
    };
  }
});

// node_modules/save-file/browser.js
var require_browser = __commonJS({
  "node_modules/save-file/browser.js"(exports, module) {
    var saveAs = require_FileSaver_min().saveAs;
    var toBlob = require_to_blob();
    var planned = null;
    module.exports = save;
    module.exports.save = save;
    module.exports.saveSync = saveSync;
    function save(data, filename) {
      if (typeof data === "string") {
        if (typeof filename !== "string" || filename.length > data.length) {
          var x = filename;
          filename = data;
          data = x;
        }
      }
      var blob = toBlob(data, filename);
      if (planned) {
        return planned.then(function() {
          planned = save(data, filename);
          return planned;
        });
      } else {
        planned = new Promise(function(ok, nok) {
          saveAs(blob, filename);
          window.addEventListener("focus", function resolve() {
            planned = null;
            window.removeEventListener("focus", resolve);
            ok();
          });
        });
        return planned;
      }
    }
    function saveSync(data, filename) {
      return saveAs(toBlob(data, filename), filename);
    }
  }
});
export default require_browser();
//# sourceMappingURL=save-file.js.map
