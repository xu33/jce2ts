"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/@jridgewell/set-array/dist/set-array.umd.js
var require_set_array_umd = __commonJS({
  "node_modules/@jridgewell/set-array/dist/set-array.umd.js"(exports2, module2) {
    (function(global, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.setArray = {}));
    })(exports2, function(exports3) {
      "use strict";
      exports3.get = void 0;
      exports3.put = void 0;
      exports3.pop = void 0;
      class SetArray {
        constructor() {
          this._indexes = { __proto__: null };
          this.array = [];
        }
      }
      (() => {
        exports3.get = (strarr, key) => strarr._indexes[key];
        exports3.put = (strarr, key) => {
          const index = exports3.get(strarr, key);
          if (index !== void 0)
            return index;
          const { array, _indexes: indexes } = strarr;
          return indexes[key] = array.push(key) - 1;
        };
        exports3.pop = (strarr) => {
          const { array, _indexes: indexes } = strarr;
          if (array.length === 0)
            return;
          const last = array.pop();
          indexes[last] = void 0;
        };
      })();
      exports3.SetArray = SetArray;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  }
});

// node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.umd.js
var require_sourcemap_codec_umd = __commonJS({
  "node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.umd.js"(exports2, module2) {
    (function(global, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.sourcemapCodec = {}));
    })(exports2, function(exports3) {
      "use strict";
      const comma = ",".charCodeAt(0);
      const semicolon = ";".charCodeAt(0);
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      const intToChar = new Uint8Array(64);
      const charToInt = new Uint8Array(128);
      for (let i = 0; i < chars.length; i++) {
        const c = chars.charCodeAt(i);
        intToChar[i] = c;
        charToInt[c] = i;
      }
      const td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? {
        decode(buf) {
          const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
          return out.toString();
        }
      } : {
        decode(buf) {
          let out = "";
          for (let i = 0; i < buf.length; i++) {
            out += String.fromCharCode(buf[i]);
          }
          return out;
        }
      };
      function decode(mappings) {
        const state = new Int32Array(5);
        const decoded = [];
        let index = 0;
        do {
          const semi = indexOf(mappings, index);
          const line = [];
          let sorted = true;
          let lastCol = 0;
          state[0] = 0;
          for (let i = index; i < semi; i++) {
            let seg;
            i = decodeInteger(mappings, i, state, 0);
            const col = state[0];
            if (col < lastCol)
              sorted = false;
            lastCol = col;
            if (hasMoreVlq(mappings, i, semi)) {
              i = decodeInteger(mappings, i, state, 1);
              i = decodeInteger(mappings, i, state, 2);
              i = decodeInteger(mappings, i, state, 3);
              if (hasMoreVlq(mappings, i, semi)) {
                i = decodeInteger(mappings, i, state, 4);
                seg = [col, state[1], state[2], state[3], state[4]];
              } else {
                seg = [col, state[1], state[2], state[3]];
              }
            } else {
              seg = [col];
            }
            line.push(seg);
          }
          if (!sorted)
            sort(line);
          decoded.push(line);
          index = semi + 1;
        } while (index <= mappings.length);
        return decoded;
      }
      function indexOf(mappings, index) {
        const idx = mappings.indexOf(";", index);
        return idx === -1 ? mappings.length : idx;
      }
      function decodeInteger(mappings, pos, state, j) {
        let value = 0;
        let shift = 0;
        let integer = 0;
        do {
          const c = mappings.charCodeAt(pos++);
          integer = charToInt[c];
          value |= (integer & 31) << shift;
          shift += 5;
        } while (integer & 32);
        const shouldNegate = value & 1;
        value >>>= 1;
        if (shouldNegate) {
          value = -2147483648 | -value;
        }
        state[j] += value;
        return pos;
      }
      function hasMoreVlq(mappings, i, length) {
        if (i >= length)
          return false;
        return mappings.charCodeAt(i) !== comma;
      }
      function sort(line) {
        line.sort(sortComparator);
      }
      function sortComparator(a, b) {
        return a[0] - b[0];
      }
      function encode(decoded) {
        const state = new Int32Array(5);
        const bufLength = 1024 * 16;
        const subLength = bufLength - 36;
        const buf = new Uint8Array(bufLength);
        const sub = buf.subarray(0, subLength);
        let pos = 0;
        let out = "";
        for (let i = 0; i < decoded.length; i++) {
          const line = decoded[i];
          if (i > 0) {
            if (pos === bufLength) {
              out += td.decode(buf);
              pos = 0;
            }
            buf[pos++] = semicolon;
          }
          if (line.length === 0)
            continue;
          state[0] = 0;
          for (let j = 0; j < line.length; j++) {
            const segment = line[j];
            if (pos > subLength) {
              out += td.decode(sub);
              buf.copyWithin(0, subLength, pos);
              pos -= subLength;
            }
            if (j > 0)
              buf[pos++] = comma;
            pos = encodeInteger(buf, pos, state, segment, 0);
            if (segment.length === 1)
              continue;
            pos = encodeInteger(buf, pos, state, segment, 1);
            pos = encodeInteger(buf, pos, state, segment, 2);
            pos = encodeInteger(buf, pos, state, segment, 3);
            if (segment.length === 4)
              continue;
            pos = encodeInteger(buf, pos, state, segment, 4);
          }
        }
        return out + td.decode(buf.subarray(0, pos));
      }
      function encodeInteger(buf, pos, state, segment, j) {
        const next = segment[j];
        let num = next - state[j];
        state[j] = next;
        num = num < 0 ? -num << 1 | 1 : num << 1;
        do {
          let clamped = num & 31;
          num >>>= 5;
          if (num > 0)
            clamped |= 32;
          buf[pos++] = intToChar[clamped];
        } while (num > 0);
        return pos;
      }
      exports3.decode = decode;
      exports3.encode = encode;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  }
});

// node_modules/@jridgewell/resolve-uri/dist/resolve-uri.umd.js
var require_resolve_uri_umd = __commonJS({
  "node_modules/@jridgewell/resolve-uri/dist/resolve-uri.umd.js"(exports2, module2) {
    (function(global, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.resolveURI = factory());
    })(exports2, function() {
      "use strict";
      const schemeRegex = /^[\w+.-]+:\/\//;
      const urlRegex = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/;
      const fileRegex = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
      var UrlType;
      (function(UrlType2) {
        UrlType2[UrlType2["Empty"] = 1] = "Empty";
        UrlType2[UrlType2["Hash"] = 2] = "Hash";
        UrlType2[UrlType2["Query"] = 3] = "Query";
        UrlType2[UrlType2["RelativePath"] = 4] = "RelativePath";
        UrlType2[UrlType2["AbsolutePath"] = 5] = "AbsolutePath";
        UrlType2[UrlType2["SchemeRelative"] = 6] = "SchemeRelative";
        UrlType2[UrlType2["Absolute"] = 7] = "Absolute";
      })(UrlType || (UrlType = {}));
      function isAbsoluteUrl(input) {
        return schemeRegex.test(input);
      }
      function isSchemeRelativeUrl(input) {
        return input.startsWith("//");
      }
      function isAbsolutePath(input) {
        return input.startsWith("/");
      }
      function isFileUrl(input) {
        return input.startsWith("file:");
      }
      function isRelative(input) {
        return /^[.?#]/.test(input);
      }
      function parseAbsoluteUrl(input) {
        const match = urlRegex.exec(input);
        return makeUrl(match[1], match[2] || "", match[3], match[4] || "", match[5] || "/", match[6] || "", match[7] || "");
      }
      function parseFileUrl(input) {
        const match = fileRegex.exec(input);
        const path2 = match[2];
        return makeUrl("file:", "", match[1] || "", "", isAbsolutePath(path2) ? path2 : "/" + path2, match[3] || "", match[4] || "");
      }
      function makeUrl(scheme, user, host, port, path2, query, hash) {
        return {
          scheme,
          user,
          host,
          port,
          path: path2,
          query,
          hash,
          type: UrlType.Absolute
        };
      }
      function parseUrl(input) {
        if (isSchemeRelativeUrl(input)) {
          const url2 = parseAbsoluteUrl("http:" + input);
          url2.scheme = "";
          url2.type = UrlType.SchemeRelative;
          return url2;
        }
        if (isAbsolutePath(input)) {
          const url2 = parseAbsoluteUrl("http://foo.com" + input);
          url2.scheme = "";
          url2.host = "";
          url2.type = UrlType.AbsolutePath;
          return url2;
        }
        if (isFileUrl(input))
          return parseFileUrl(input);
        if (isAbsoluteUrl(input))
          return parseAbsoluteUrl(input);
        const url = parseAbsoluteUrl("http://foo.com/" + input);
        url.scheme = "";
        url.host = "";
        url.type = input ? input.startsWith("?") ? UrlType.Query : input.startsWith("#") ? UrlType.Hash : UrlType.RelativePath : UrlType.Empty;
        return url;
      }
      function stripPathFilename(path2) {
        if (path2.endsWith("/.."))
          return path2;
        const index = path2.lastIndexOf("/");
        return path2.slice(0, index + 1);
      }
      function mergePaths(url, base) {
        normalizePath(base, base.type);
        if (url.path === "/") {
          url.path = base.path;
        } else {
          url.path = stripPathFilename(base.path) + url.path;
        }
      }
      function normalizePath(url, type) {
        const rel = type <= UrlType.RelativePath;
        const pieces = url.path.split("/");
        let pointer = 1;
        let positive = 0;
        let addTrailingSlash = false;
        for (let i = 1; i < pieces.length; i++) {
          const piece = pieces[i];
          if (!piece) {
            addTrailingSlash = true;
            continue;
          }
          addTrailingSlash = false;
          if (piece === ".")
            continue;
          if (piece === "..") {
            if (positive) {
              addTrailingSlash = true;
              positive--;
              pointer--;
            } else if (rel) {
              pieces[pointer++] = piece;
            }
            continue;
          }
          pieces[pointer++] = piece;
          positive++;
        }
        let path2 = "";
        for (let i = 1; i < pointer; i++) {
          path2 += "/" + pieces[i];
        }
        if (!path2 || addTrailingSlash && !path2.endsWith("/..")) {
          path2 += "/";
        }
        url.path = path2;
      }
      function resolve(input, base) {
        if (!input && !base)
          return "";
        const url = parseUrl(input);
        let inputType = url.type;
        if (base && inputType !== UrlType.Absolute) {
          const baseUrl = parseUrl(base);
          const baseType = baseUrl.type;
          switch (inputType) {
            case UrlType.Empty:
              url.hash = baseUrl.hash;
            case UrlType.Hash:
              url.query = baseUrl.query;
            case UrlType.Query:
            case UrlType.RelativePath:
              mergePaths(url, baseUrl);
            case UrlType.AbsolutePath:
              url.user = baseUrl.user;
              url.host = baseUrl.host;
              url.port = baseUrl.port;
            case UrlType.SchemeRelative:
              url.scheme = baseUrl.scheme;
          }
          if (baseType > inputType)
            inputType = baseType;
        }
        normalizePath(url, inputType);
        const queryHash = url.query + url.hash;
        switch (inputType) {
          case UrlType.Hash:
          case UrlType.Query:
            return queryHash;
          case UrlType.RelativePath: {
            const path2 = url.path.slice(1);
            if (!path2)
              return queryHash || ".";
            if (isRelative(base || input) && !isRelative(path2)) {
              return "./" + path2 + queryHash;
            }
            return path2 + queryHash;
          }
          case UrlType.AbsolutePath:
            return url.path + queryHash;
          default:
            return url.scheme + "//" + url.user + url.host + url.port + url.path + queryHash;
        }
      }
      return resolve;
    });
  }
});

// node_modules/@jridgewell/trace-mapping/dist/trace-mapping.umd.js
var require_trace_mapping_umd = __commonJS({
  "node_modules/@jridgewell/trace-mapping/dist/trace-mapping.umd.js"(exports2, module2) {
    (function(global, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2, require_sourcemap_codec_umd(), require_resolve_uri_umd()) : typeof define === "function" && define.amd ? define(["exports", "@jridgewell/sourcemap-codec", "@jridgewell/resolve-uri"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.traceMapping = {}, global.sourcemapCodec, global.resolveURI));
    })(exports2, function(exports3, sourcemapCodec, resolveUri) {
      "use strict";
      function _interopDefaultLegacy(e) {
        return e && typeof e === "object" && "default" in e ? e : { "default": e };
      }
      var resolveUri__default = /* @__PURE__ */ _interopDefaultLegacy(resolveUri);
      function resolve(input, base) {
        if (base && !base.endsWith("/"))
          base += "/";
        return resolveUri__default["default"](input, base);
      }
      function stripFilename(path2) {
        if (!path2)
          return "";
        const index = path2.lastIndexOf("/");
        return path2.slice(0, index + 1);
      }
      const COLUMN = 0;
      const SOURCES_INDEX = 1;
      const SOURCE_LINE = 2;
      const SOURCE_COLUMN = 3;
      const NAMES_INDEX = 4;
      const REV_GENERATED_LINE = 1;
      const REV_GENERATED_COLUMN = 2;
      function maybeSort(mappings, owned) {
        const unsortedIndex = nextUnsortedSegmentLine(mappings, 0);
        if (unsortedIndex === mappings.length)
          return mappings;
        if (!owned)
          mappings = mappings.slice();
        for (let i = unsortedIndex; i < mappings.length; i = nextUnsortedSegmentLine(mappings, i + 1)) {
          mappings[i] = sortSegments(mappings[i], owned);
        }
        return mappings;
      }
      function nextUnsortedSegmentLine(mappings, start) {
        for (let i = start; i < mappings.length; i++) {
          if (!isSorted(mappings[i]))
            return i;
        }
        return mappings.length;
      }
      function isSorted(line) {
        for (let j = 1; j < line.length; j++) {
          if (line[j][COLUMN] < line[j - 1][COLUMN]) {
            return false;
          }
        }
        return true;
      }
      function sortSegments(line, owned) {
        if (!owned)
          line = line.slice();
        return line.sort(sortComparator);
      }
      function sortComparator(a, b) {
        return a[COLUMN] - b[COLUMN];
      }
      let found = false;
      function binarySearch(haystack, needle, low, high) {
        while (low <= high) {
          const mid = low + (high - low >> 1);
          const cmp = haystack[mid][COLUMN] - needle;
          if (cmp === 0) {
            found = true;
            return mid;
          }
          if (cmp < 0) {
            low = mid + 1;
          } else {
            high = mid - 1;
          }
        }
        found = false;
        return low - 1;
      }
      function upperBound(haystack, needle, index) {
        for (let i = index + 1; i < haystack.length; index = i++) {
          if (haystack[i][COLUMN] !== needle)
            break;
        }
        return index;
      }
      function lowerBound(haystack, needle, index) {
        for (let i = index - 1; i >= 0; index = i--) {
          if (haystack[i][COLUMN] !== needle)
            break;
        }
        return index;
      }
      function memoizedState() {
        return {
          lastKey: -1,
          lastNeedle: -1,
          lastIndex: -1
        };
      }
      function memoizedBinarySearch(haystack, needle, state, key) {
        const { lastKey, lastNeedle, lastIndex } = state;
        let low = 0;
        let high = haystack.length - 1;
        if (key === lastKey) {
          if (needle === lastNeedle) {
            found = lastIndex !== -1 && haystack[lastIndex][COLUMN] === needle;
            return lastIndex;
          }
          if (needle >= lastNeedle) {
            low = lastIndex === -1 ? 0 : lastIndex;
          } else {
            high = lastIndex;
          }
        }
        state.lastKey = key;
        state.lastNeedle = needle;
        return state.lastIndex = binarySearch(haystack, needle, low, high);
      }
      function buildBySources(decoded, memos) {
        const sources = memos.map(buildNullArray);
        for (let i = 0; i < decoded.length; i++) {
          const line = decoded[i];
          for (let j = 0; j < line.length; j++) {
            const seg = line[j];
            if (seg.length === 1)
              continue;
            const sourceIndex = seg[SOURCES_INDEX];
            const sourceLine = seg[SOURCE_LINE];
            const sourceColumn = seg[SOURCE_COLUMN];
            const originalSource = sources[sourceIndex];
            const originalLine = originalSource[sourceLine] || (originalSource[sourceLine] = []);
            const memo = memos[sourceIndex];
            const index = upperBound(originalLine, sourceColumn, memoizedBinarySearch(originalLine, sourceColumn, memo, sourceLine));
            insert(originalLine, memo.lastIndex = index + 1, [sourceColumn, i, seg[COLUMN]]);
          }
        }
        return sources;
      }
      function insert(array, index, value) {
        for (let i = array.length; i > index; i--) {
          array[i] = array[i - 1];
        }
        array[index] = value;
      }
      function buildNullArray() {
        return { __proto__: null };
      }
      const AnyMap = function(map, mapUrl) {
        const parsed = typeof map === "string" ? JSON.parse(map) : map;
        if (!("sections" in parsed))
          return new TraceMap(parsed, mapUrl);
        const mappings = [];
        const sources = [];
        const sourcesContent = [];
        const names = [];
        recurse(parsed, mapUrl, mappings, sources, sourcesContent, names, 0, 0, Infinity, Infinity);
        const joined = {
          version: 3,
          file: parsed.file,
          names,
          sources,
          sourcesContent,
          mappings
        };
        return exports3.presortedDecodedMap(joined);
      };
      function recurse(input, mapUrl, mappings, sources, sourcesContent, names, lineOffset, columnOffset, stopLine, stopColumn) {
        const { sections } = input;
        for (let i = 0; i < sections.length; i++) {
          const { map, offset } = sections[i];
          let sl = stopLine;
          let sc = stopColumn;
          if (i + 1 < sections.length) {
            const nextOffset = sections[i + 1].offset;
            sl = Math.min(stopLine, lineOffset + nextOffset.line);
            if (sl === stopLine) {
              sc = Math.min(stopColumn, columnOffset + nextOffset.column);
            } else if (sl < stopLine) {
              sc = columnOffset + nextOffset.column;
            }
          }
          addSection(map, mapUrl, mappings, sources, sourcesContent, names, lineOffset + offset.line, columnOffset + offset.column, sl, sc);
        }
      }
      function addSection(input, mapUrl, mappings, sources, sourcesContent, names, lineOffset, columnOffset, stopLine, stopColumn) {
        if ("sections" in input)
          return recurse(...arguments);
        const map = new TraceMap(input, mapUrl);
        const sourcesOffset = sources.length;
        const namesOffset = names.length;
        const decoded = exports3.decodedMappings(map);
        const { resolvedSources, sourcesContent: contents } = map;
        append(sources, resolvedSources);
        append(names, map.names);
        if (contents)
          append(sourcesContent, contents);
        else
          for (let i = 0; i < resolvedSources.length; i++)
            sourcesContent.push(null);
        for (let i = 0; i < decoded.length; i++) {
          const lineI = lineOffset + i;
          if (lineI > stopLine)
            return;
          const out = getLine(mappings, lineI);
          const cOffset = i === 0 ? columnOffset : 0;
          const line = decoded[i];
          for (let j = 0; j < line.length; j++) {
            const seg = line[j];
            const column = cOffset + seg[COLUMN];
            if (lineI === stopLine && column >= stopColumn)
              return;
            if (seg.length === 1) {
              out.push([column]);
              continue;
            }
            const sourcesIndex = sourcesOffset + seg[SOURCES_INDEX];
            const sourceLine = seg[SOURCE_LINE];
            const sourceColumn = seg[SOURCE_COLUMN];
            out.push(seg.length === 4 ? [column, sourcesIndex, sourceLine, sourceColumn] : [column, sourcesIndex, sourceLine, sourceColumn, namesOffset + seg[NAMES_INDEX]]);
          }
        }
      }
      function append(arr, other) {
        for (let i = 0; i < other.length; i++)
          arr.push(other[i]);
      }
      function getLine(arr, index) {
        for (let i = arr.length; i <= index; i++)
          arr[i] = [];
        return arr[index];
      }
      const LINE_GTR_ZERO = "`line` must be greater than 0 (lines start at line 1)";
      const COL_GTR_EQ_ZERO = "`column` must be greater than or equal to 0 (columns start at column 0)";
      const LEAST_UPPER_BOUND = -1;
      const GREATEST_LOWER_BOUND = 1;
      exports3.encodedMappings = void 0;
      exports3.decodedMappings = void 0;
      exports3.traceSegment = void 0;
      exports3.originalPositionFor = void 0;
      exports3.generatedPositionFor = void 0;
      exports3.eachMapping = void 0;
      exports3.sourceContentFor = void 0;
      exports3.presortedDecodedMap = void 0;
      exports3.decodedMap = void 0;
      exports3.encodedMap = void 0;
      class TraceMap {
        constructor(map, mapUrl) {
          const isString = typeof map === "string";
          if (!isString && map._decodedMemo)
            return map;
          const parsed = isString ? JSON.parse(map) : map;
          const { version, file, names, sourceRoot, sources, sourcesContent } = parsed;
          this.version = version;
          this.file = file;
          this.names = names;
          this.sourceRoot = sourceRoot;
          this.sources = sources;
          this.sourcesContent = sourcesContent;
          const from = resolve(sourceRoot || "", stripFilename(mapUrl));
          this.resolvedSources = sources.map((s) => resolve(s || "", from));
          const { mappings } = parsed;
          if (typeof mappings === "string") {
            this._encoded = mappings;
            this._decoded = void 0;
          } else {
            this._encoded = void 0;
            this._decoded = maybeSort(mappings, isString);
          }
          this._decodedMemo = memoizedState();
          this._bySources = void 0;
          this._bySourceMemos = void 0;
        }
      }
      (() => {
        exports3.encodedMappings = (map) => {
          var _a;
          return (_a = map._encoded) !== null && _a !== void 0 ? _a : map._encoded = sourcemapCodec.encode(map._decoded);
        };
        exports3.decodedMappings = (map) => {
          return map._decoded || (map._decoded = sourcemapCodec.decode(map._encoded));
        };
        exports3.traceSegment = (map, line, column) => {
          const decoded = exports3.decodedMappings(map);
          if (line >= decoded.length)
            return null;
          return traceSegmentInternal(decoded[line], map._decodedMemo, line, column, GREATEST_LOWER_BOUND);
        };
        exports3.originalPositionFor = (map, { line, column, bias }) => {
          line--;
          if (line < 0)
            throw new Error(LINE_GTR_ZERO);
          if (column < 0)
            throw new Error(COL_GTR_EQ_ZERO);
          const decoded = exports3.decodedMappings(map);
          if (line >= decoded.length)
            return OMapping(null, null, null, null);
          const segment = traceSegmentInternal(decoded[line], map._decodedMemo, line, column, bias || GREATEST_LOWER_BOUND);
          if (segment == null)
            return OMapping(null, null, null, null);
          if (segment.length == 1)
            return OMapping(null, null, null, null);
          const { names, resolvedSources } = map;
          return OMapping(resolvedSources[segment[SOURCES_INDEX]], segment[SOURCE_LINE] + 1, segment[SOURCE_COLUMN], segment.length === 5 ? names[segment[NAMES_INDEX]] : null);
        };
        exports3.generatedPositionFor = (map, { source, line, column, bias }) => {
          line--;
          if (line < 0)
            throw new Error(LINE_GTR_ZERO);
          if (column < 0)
            throw new Error(COL_GTR_EQ_ZERO);
          const { sources, resolvedSources } = map;
          let sourceIndex = sources.indexOf(source);
          if (sourceIndex === -1)
            sourceIndex = resolvedSources.indexOf(source);
          if (sourceIndex === -1)
            return GMapping(null, null);
          const generated = map._bySources || (map._bySources = buildBySources(exports3.decodedMappings(map), map._bySourceMemos = sources.map(memoizedState)));
          const memos = map._bySourceMemos;
          const segments = generated[sourceIndex][line];
          if (segments == null)
            return GMapping(null, null);
          const segment = traceSegmentInternal(segments, memos[sourceIndex], line, column, bias || GREATEST_LOWER_BOUND);
          if (segment == null)
            return GMapping(null, null);
          return GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]);
        };
        exports3.eachMapping = (map, cb) => {
          const decoded = exports3.decodedMappings(map);
          const { names, resolvedSources } = map;
          for (let i = 0; i < decoded.length; i++) {
            const line = decoded[i];
            for (let j = 0; j < line.length; j++) {
              const seg = line[j];
              const generatedLine = i + 1;
              const generatedColumn = seg[0];
              let source = null;
              let originalLine = null;
              let originalColumn = null;
              let name = null;
              if (seg.length !== 1) {
                source = resolvedSources[seg[1]];
                originalLine = seg[2] + 1;
                originalColumn = seg[3];
              }
              if (seg.length === 5)
                name = names[seg[4]];
              cb({
                generatedLine,
                generatedColumn,
                source,
                originalLine,
                originalColumn,
                name
              });
            }
          }
        };
        exports3.sourceContentFor = (map, source) => {
          const { sources, resolvedSources, sourcesContent } = map;
          if (sourcesContent == null)
            return null;
          let index = sources.indexOf(source);
          if (index === -1)
            index = resolvedSources.indexOf(source);
          return index === -1 ? null : sourcesContent[index];
        };
        exports3.presortedDecodedMap = (map, mapUrl) => {
          const tracer = new TraceMap(clone(map, []), mapUrl);
          tracer._decoded = map.mappings;
          return tracer;
        };
        exports3.decodedMap = (map) => {
          return clone(map, exports3.decodedMappings(map));
        };
        exports3.encodedMap = (map) => {
          return clone(map, exports3.encodedMappings(map));
        };
      })();
      function clone(map, mappings) {
        return {
          version: map.version,
          file: map.file,
          names: map.names,
          sourceRoot: map.sourceRoot,
          sources: map.sources,
          sourcesContent: map.sourcesContent,
          mappings
        };
      }
      function OMapping(source, line, column, name) {
        return { source, line, column, name };
      }
      function GMapping(line, column) {
        return { line, column };
      }
      function traceSegmentInternal(segments, memo, line, column, bias) {
        let index = memoizedBinarySearch(segments, column, memo, line);
        if (found) {
          index = (bias === LEAST_UPPER_BOUND ? upperBound : lowerBound)(segments, column, index);
        } else if (bias === LEAST_UPPER_BOUND)
          index++;
        if (index === -1 || index === segments.length)
          return null;
        return segments[index];
      }
      exports3.AnyMap = AnyMap;
      exports3.GREATEST_LOWER_BOUND = GREATEST_LOWER_BOUND;
      exports3.LEAST_UPPER_BOUND = LEAST_UPPER_BOUND;
      exports3.TraceMap = TraceMap;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  }
});

// node_modules/@jridgewell/gen-mapping/dist/gen-mapping.umd.js
var require_gen_mapping_umd = __commonJS({
  "node_modules/@jridgewell/gen-mapping/dist/gen-mapping.umd.js"(exports2, module2) {
    (function(global, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2, require_set_array_umd(), require_sourcemap_codec_umd(), require_trace_mapping_umd()) : typeof define === "function" && define.amd ? define(["exports", "@jridgewell/set-array", "@jridgewell/sourcemap-codec", "@jridgewell/trace-mapping"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.genMapping = {}, global.setArray, global.sourcemapCodec, global.traceMapping));
    })(exports2, function(exports3, setArray, sourcemapCodec, traceMapping) {
      "use strict";
      const COLUMN = 0;
      const SOURCES_INDEX = 1;
      const SOURCE_LINE = 2;
      const SOURCE_COLUMN = 3;
      const NAMES_INDEX = 4;
      const NO_NAME = -1;
      exports3.addSegment = void 0;
      exports3.addMapping = void 0;
      exports3.maybeAddSegment = void 0;
      exports3.maybeAddMapping = void 0;
      exports3.setSourceContent = void 0;
      exports3.toDecodedMap = void 0;
      exports3.toEncodedMap = void 0;
      exports3.fromMap = void 0;
      exports3.allMappings = void 0;
      let addSegmentInternal;
      class GenMapping {
        constructor({ file, sourceRoot } = {}) {
          this._names = new setArray.SetArray();
          this._sources = new setArray.SetArray();
          this._sourcesContent = [];
          this._mappings = [];
          this.file = file;
          this.sourceRoot = sourceRoot;
        }
      }
      (() => {
        exports3.addSegment = (map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) => {
          return addSegmentInternal(false, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content);
        };
        exports3.maybeAddSegment = (map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) => {
          return addSegmentInternal(true, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content);
        };
        exports3.addMapping = (map, mapping) => {
          return addMappingInternal(false, map, mapping);
        };
        exports3.maybeAddMapping = (map, mapping) => {
          return addMappingInternal(true, map, mapping);
        };
        exports3.setSourceContent = (map, source, content) => {
          const { _sources: sources, _sourcesContent: sourcesContent } = map;
          sourcesContent[setArray.put(sources, source)] = content;
        };
        exports3.toDecodedMap = (map) => {
          const { file, sourceRoot, _mappings: mappings, _sources: sources, _sourcesContent: sourcesContent, _names: names } = map;
          removeEmptyFinalLines(mappings);
          return {
            version: 3,
            file: file || void 0,
            names: names.array,
            sourceRoot: sourceRoot || void 0,
            sources: sources.array,
            sourcesContent,
            mappings
          };
        };
        exports3.toEncodedMap = (map) => {
          const decoded = exports3.toDecodedMap(map);
          return Object.assign(Object.assign({}, decoded), { mappings: sourcemapCodec.encode(decoded.mappings) });
        };
        exports3.allMappings = (map) => {
          const out = [];
          const { _mappings: mappings, _sources: sources, _names: names } = map;
          for (let i = 0; i < mappings.length; i++) {
            const line = mappings[i];
            for (let j = 0; j < line.length; j++) {
              const seg = line[j];
              const generated = { line: i + 1, column: seg[COLUMN] };
              let source = void 0;
              let original = void 0;
              let name = void 0;
              if (seg.length !== 1) {
                source = sources.array[seg[SOURCES_INDEX]];
                original = { line: seg[SOURCE_LINE] + 1, column: seg[SOURCE_COLUMN] };
                if (seg.length === 5)
                  name = names.array[seg[NAMES_INDEX]];
              }
              out.push({ generated, source, original, name });
            }
          }
          return out;
        };
        exports3.fromMap = (input) => {
          const map = new traceMapping.TraceMap(input);
          const gen = new GenMapping({ file: map.file, sourceRoot: map.sourceRoot });
          putAll(gen._names, map.names);
          putAll(gen._sources, map.sources);
          gen._sourcesContent = map.sourcesContent || map.sources.map(() => null);
          gen._mappings = traceMapping.decodedMappings(map);
          return gen;
        };
        addSegmentInternal = (skipable, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) => {
          const { _mappings: mappings, _sources: sources, _sourcesContent: sourcesContent, _names: names } = map;
          const line = getLine(mappings, genLine);
          const index = getColumnIndex(line, genColumn);
          if (!source) {
            if (skipable && skipSourceless(line, index))
              return;
            return insert(line, index, [genColumn]);
          }
          const sourcesIndex = setArray.put(sources, source);
          const namesIndex = name ? setArray.put(names, name) : NO_NAME;
          if (sourcesIndex === sourcesContent.length)
            sourcesContent[sourcesIndex] = content !== null && content !== void 0 ? content : null;
          if (skipable && skipSource(line, index, sourcesIndex, sourceLine, sourceColumn, namesIndex)) {
            return;
          }
          return insert(line, index, name ? [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex] : [genColumn, sourcesIndex, sourceLine, sourceColumn]);
        };
      })();
      function getLine(mappings, index) {
        for (let i = mappings.length; i <= index; i++) {
          mappings[i] = [];
        }
        return mappings[index];
      }
      function getColumnIndex(line, genColumn) {
        let index = line.length;
        for (let i = index - 1; i >= 0; index = i--) {
          const current = line[i];
          if (genColumn >= current[COLUMN])
            break;
        }
        return index;
      }
      function insert(array, index, value) {
        for (let i = array.length; i > index; i--) {
          array[i] = array[i - 1];
        }
        array[index] = value;
      }
      function removeEmptyFinalLines(mappings) {
        const { length } = mappings;
        let len = length;
        for (let i = len - 1; i >= 0; len = i, i--) {
          if (mappings[i].length > 0)
            break;
        }
        if (len < length)
          mappings.length = len;
      }
      function putAll(strarr, array) {
        for (let i = 0; i < array.length; i++)
          setArray.put(strarr, array[i]);
      }
      function skipSourceless(line, index) {
        if (index === 0)
          return true;
        const prev = line[index - 1];
        return prev.length === 1;
      }
      function skipSource(line, index, sourcesIndex, sourceLine, sourceColumn, namesIndex) {
        if (index === 0)
          return false;
        const prev = line[index - 1];
        if (prev.length === 1)
          return false;
        return sourcesIndex === prev[SOURCES_INDEX] && sourceLine === prev[SOURCE_LINE] && sourceColumn === prev[SOURCE_COLUMN] && namesIndex === (prev.length === 5 ? prev[NAMES_INDEX] : NO_NAME);
      }
      function addMappingInternal(skipable, map, mapping) {
        const { generated, source, original, name, content } = mapping;
        if (!source) {
          return addSegmentInternal(skipable, map, generated.line - 1, generated.column, null, null, null, null, null);
        }
        const s = source;
        return addSegmentInternal(skipable, map, generated.line - 1, generated.column, s, original.line - 1, original.column, name, content);
      }
      exports3.GenMapping = GenMapping;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  }
});

// node_modules/@babel/generator/lib/source-map.js
var require_source_map = __commonJS({
  "node_modules/@babel/generator/lib/source-map.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _genMapping = require_gen_mapping_umd();
    var SourceMap = class {
      constructor(opts, code) {
        var _opts$sourceFileName;
        this._map = void 0;
        this._rawMappings = void 0;
        this._sourceFileName = void 0;
        this._lastGenLine = 0;
        this._lastSourceLine = 0;
        this._lastSourceColumn = 0;
        const map = this._map = new _genMapping.GenMapping({
          sourceRoot: opts.sourceRoot
        });
        this._sourceFileName = (_opts$sourceFileName = opts.sourceFileName) == null ? void 0 : _opts$sourceFileName.replace(/\\/g, "/");
        this._rawMappings = void 0;
        if (typeof code === "string") {
          (0, _genMapping.setSourceContent)(map, this._sourceFileName, code);
        } else if (typeof code === "object") {
          Object.keys(code).forEach((sourceFileName) => {
            (0, _genMapping.setSourceContent)(map, sourceFileName.replace(/\\/g, "/"), code[sourceFileName]);
          });
        }
      }
      get() {
        return (0, _genMapping.toEncodedMap)(this._map);
      }
      getDecoded() {
        return (0, _genMapping.toDecodedMap)(this._map);
      }
      getRawMappings() {
        return this._rawMappings || (this._rawMappings = (0, _genMapping.allMappings)(this._map));
      }
      mark(generated, line, column, identifierName, filename) {
        this._rawMappings = void 0;
        (0, _genMapping.maybeAddMapping)(this._map, {
          name: identifierName,
          generated,
          source: line == null ? void 0 : (filename == null ? void 0 : filename.replace(/\\/g, "/")) || this._sourceFileName,
          original: line == null ? void 0 : {
            line,
            column
          }
        });
      }
    };
    exports2.default = SourceMap;
  }
});

// node_modules/@babel/generator/lib/buffer.js
var require_buffer = __commonJS({
  "node_modules/@babel/generator/lib/buffer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    function SourcePos() {
      return {
        identifierName: void 0,
        line: void 0,
        column: void 0,
        filename: void 0
      };
    }
    var Buffer2 = class {
      constructor(map) {
        this._map = null;
        this._buf = "";
        this._str = "";
        this._appendCount = 0;
        this._last = 0;
        this._queue = [];
        this._queueCursor = 0;
        this._position = {
          line: 1,
          column: 0
        };
        this._sourcePosition = SourcePos();
        this._disallowedPop = {
          identifierName: void 0,
          line: void 0,
          column: void 0,
          filename: void 0,
          objectReusable: true
        };
        this._map = map;
        this._allocQueue();
      }
      _allocQueue() {
        const queue = this._queue;
        for (let i = 0; i < 16; i++) {
          queue.push({
            char: 0,
            repeat: 1,
            line: void 0,
            column: void 0,
            identifierName: void 0,
            filename: ""
          });
        }
      }
      _pushQueue(char, repeat, line, column, identifierName, filename) {
        const cursor = this._queueCursor;
        if (cursor === this._queue.length) {
          this._allocQueue();
        }
        const item = this._queue[cursor];
        item.char = char;
        item.repeat = repeat;
        item.line = line;
        item.column = column;
        item.identifierName = identifierName;
        item.filename = filename;
        this._queueCursor++;
      }
      _popQueue() {
        if (this._queueCursor === 0) {
          throw new Error("Cannot pop from empty queue");
        }
        return this._queue[--this._queueCursor];
      }
      get() {
        this._flush();
        const map = this._map;
        const result = {
          code: (this._buf + this._str).trimRight(),
          decodedMap: map == null ? void 0 : map.getDecoded(),
          get map() {
            const resultMap = map ? map.get() : null;
            result.map = resultMap;
            return resultMap;
          },
          set map(value) {
            Object.defineProperty(result, "map", {
              value,
              writable: true
            });
          },
          get rawMappings() {
            const mappings = map == null ? void 0 : map.getRawMappings();
            result.rawMappings = mappings;
            return mappings;
          },
          set rawMappings(value) {
            Object.defineProperty(result, "rawMappings", {
              value,
              writable: true
            });
          }
        };
        return result;
      }
      append(str, maybeNewline) {
        this._flush();
        this._append(str, this._sourcePosition, maybeNewline);
      }
      appendChar(char) {
        this._flush();
        this._appendChar(char, 1, this._sourcePosition);
      }
      queue(char) {
        if (char === 10) {
          while (this._queueCursor !== 0) {
            const char2 = this._queue[this._queueCursor - 1].char;
            if (char2 !== 32 && char2 !== 9) {
              break;
            }
            this._queueCursor--;
          }
        }
        const sourcePosition = this._sourcePosition;
        this._pushQueue(char, 1, sourcePosition.line, sourcePosition.column, sourcePosition.identifierName, sourcePosition.filename);
      }
      queueIndentation(char, repeat) {
        this._pushQueue(char, repeat, void 0, void 0, void 0, void 0);
      }
      _flush() {
        const queueCursor = this._queueCursor;
        const queue = this._queue;
        for (let i = 0; i < queueCursor; i++) {
          const item = queue[i];
          this._appendChar(item.char, item.repeat, item);
        }
        this._queueCursor = 0;
      }
      _appendChar(char, repeat, sourcePos) {
        this._last = char;
        this._str += repeat > 1 ? String.fromCharCode(char).repeat(repeat) : String.fromCharCode(char);
        if (char !== 10) {
          this._mark(sourcePos.line, sourcePos.column, sourcePos.identifierName, sourcePos.filename);
          this._position.column += repeat;
        } else {
          this._position.line++;
          this._position.column = 0;
        }
      }
      _append(str, sourcePos, maybeNewline) {
        const len = str.length;
        this._last = str.charCodeAt(len - 1);
        if (++this._appendCount > 4096) {
          +this._str;
          this._buf += this._str;
          this._str = str;
          this._appendCount = 0;
        } else {
          this._str += str;
        }
        if (!maybeNewline && !this._map) {
          this._position.column += len;
          return;
        }
        const {
          column,
          identifierName,
          filename
        } = sourcePos;
        let line = sourcePos.line;
        let i = str.indexOf("\n");
        let last = 0;
        if (i !== 0) {
          this._mark(line, column, identifierName, filename);
        }
        while (i !== -1) {
          this._position.line++;
          this._position.column = 0;
          last = i + 1;
          if (last < str.length) {
            this._mark(++line, 0, identifierName, filename);
          }
          i = str.indexOf("\n", last);
        }
        this._position.column += str.length - last;
      }
      _mark(line, column, identifierName, filename) {
        var _this$_map;
        (_this$_map = this._map) == null ? void 0 : _this$_map.mark(this._position, line, column, identifierName, filename);
      }
      removeTrailingNewline() {
        const queueCursor = this._queueCursor;
        if (queueCursor !== 0 && this._queue[queueCursor - 1].char === 10) {
          this._queueCursor--;
        }
      }
      removeLastSemicolon() {
        const queueCursor = this._queueCursor;
        if (queueCursor !== 0 && this._queue[queueCursor - 1].char === 59) {
          this._queueCursor--;
        }
      }
      getLastChar() {
        const queueCursor = this._queueCursor;
        return queueCursor !== 0 ? this._queue[queueCursor - 1].char : this._last;
      }
      endsWithCharAndNewline() {
        const queue = this._queue;
        const queueCursor = this._queueCursor;
        if (queueCursor !== 0) {
          const lastCp = queue[queueCursor - 1].char;
          if (lastCp !== 10)
            return;
          if (queueCursor > 1) {
            return queue[queueCursor - 2].char;
          } else {
            return this._last;
          }
        }
      }
      hasContent() {
        return this._queueCursor !== 0 || !!this._last;
      }
      exactSource(loc, cb) {
        if (!this._map)
          return cb();
        this.source("start", loc);
        cb();
        this.source("end", loc);
        this._disallowPop("start", loc);
      }
      source(prop, loc) {
        if (!loc)
          return;
        this._normalizePosition(prop, loc, this._sourcePosition);
      }
      withSource(prop, loc, cb) {
        if (!this._map)
          return cb();
        const originalLine = this._sourcePosition.line;
        const originalColumn = this._sourcePosition.column;
        const originalFilename = this._sourcePosition.filename;
        const originalIdentifierName = this._sourcePosition.identifierName;
        this.source(prop, loc);
        cb();
        if (this._disallowedPop.objectReusable || this._disallowedPop.line !== originalLine || this._disallowedPop.column !== originalColumn || this._disallowedPop.filename !== originalFilename) {
          this._sourcePosition.line = originalLine;
          this._sourcePosition.column = originalColumn;
          this._sourcePosition.filename = originalFilename;
          this._sourcePosition.identifierName = originalIdentifierName;
          this._disallowedPop.objectReusable = true;
        }
      }
      _disallowPop(prop, loc) {
        if (!loc)
          return;
        const disallowedPop = this._disallowedPop;
        this._normalizePosition(prop, loc, disallowedPop);
        disallowedPop.objectReusable = false;
      }
      _normalizePosition(prop, loc, targetObj) {
        const pos = loc[prop];
        targetObj.identifierName = prop === "start" && loc.identifierName || void 0;
        if (pos) {
          targetObj.line = pos.line;
          targetObj.column = pos.column;
          targetObj.filename = loc.filename;
        } else {
          targetObj.line = null;
          targetObj.column = null;
          targetObj.filename = null;
        }
      }
      getCurrentColumn() {
        const queue = this._queue;
        let lastIndex = -1;
        let len = 0;
        for (let i = 0; i < this._queueCursor; i++) {
          const item = queue[i];
          if (item.char === 10) {
            lastIndex = i;
            len += item.repeat;
          }
        }
        return lastIndex === -1 ? this._position.column + len : len - 1 - lastIndex;
      }
      getCurrentLine() {
        let count = 0;
        const queue = this._queue;
        for (let i = 0; i < this._queueCursor; i++) {
          if (queue[i].char === 10) {
            count++;
          }
        }
        return this._position.line + count;
      }
    };
    exports2.default = Buffer2;
  }
});

// node_modules/@babel/types/lib/utils/shallowEqual.js
var require_shallowEqual = __commonJS({
  "node_modules/@babel/types/lib/utils/shallowEqual.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = shallowEqual;
    function shallowEqual(actual, expected) {
      const keys = Object.keys(expected);
      for (const key of keys) {
        if (actual[key] !== expected[key]) {
          return false;
        }
      }
      return true;
    }
  }
});

// node_modules/@babel/types/lib/validators/generated/index.js
var require_generated = __commonJS({
  "node_modules/@babel/types/lib/validators/generated/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.isAccessor = isAccessor;
    exports2.isAnyTypeAnnotation = isAnyTypeAnnotation;
    exports2.isArgumentPlaceholder = isArgumentPlaceholder;
    exports2.isArrayExpression = isArrayExpression;
    exports2.isArrayPattern = isArrayPattern;
    exports2.isArrayTypeAnnotation = isArrayTypeAnnotation;
    exports2.isArrowFunctionExpression = isArrowFunctionExpression;
    exports2.isAssignmentExpression = isAssignmentExpression;
    exports2.isAssignmentPattern = isAssignmentPattern;
    exports2.isAwaitExpression = isAwaitExpression;
    exports2.isBigIntLiteral = isBigIntLiteral;
    exports2.isBinary = isBinary;
    exports2.isBinaryExpression = isBinaryExpression;
    exports2.isBindExpression = isBindExpression;
    exports2.isBlock = isBlock;
    exports2.isBlockParent = isBlockParent;
    exports2.isBlockStatement = isBlockStatement;
    exports2.isBooleanLiteral = isBooleanLiteral;
    exports2.isBooleanLiteralTypeAnnotation = isBooleanLiteralTypeAnnotation;
    exports2.isBooleanTypeAnnotation = isBooleanTypeAnnotation;
    exports2.isBreakStatement = isBreakStatement;
    exports2.isCallExpression = isCallExpression;
    exports2.isCatchClause = isCatchClause;
    exports2.isClass = isClass;
    exports2.isClassAccessorProperty = isClassAccessorProperty;
    exports2.isClassBody = isClassBody;
    exports2.isClassDeclaration = isClassDeclaration;
    exports2.isClassExpression = isClassExpression;
    exports2.isClassImplements = isClassImplements;
    exports2.isClassMethod = isClassMethod;
    exports2.isClassPrivateMethod = isClassPrivateMethod;
    exports2.isClassPrivateProperty = isClassPrivateProperty;
    exports2.isClassProperty = isClassProperty;
    exports2.isCompletionStatement = isCompletionStatement;
    exports2.isConditional = isConditional;
    exports2.isConditionalExpression = isConditionalExpression;
    exports2.isContinueStatement = isContinueStatement;
    exports2.isDebuggerStatement = isDebuggerStatement;
    exports2.isDecimalLiteral = isDecimalLiteral;
    exports2.isDeclaration = isDeclaration;
    exports2.isDeclareClass = isDeclareClass;
    exports2.isDeclareExportAllDeclaration = isDeclareExportAllDeclaration;
    exports2.isDeclareExportDeclaration = isDeclareExportDeclaration;
    exports2.isDeclareFunction = isDeclareFunction;
    exports2.isDeclareInterface = isDeclareInterface;
    exports2.isDeclareModule = isDeclareModule;
    exports2.isDeclareModuleExports = isDeclareModuleExports;
    exports2.isDeclareOpaqueType = isDeclareOpaqueType;
    exports2.isDeclareTypeAlias = isDeclareTypeAlias;
    exports2.isDeclareVariable = isDeclareVariable;
    exports2.isDeclaredPredicate = isDeclaredPredicate;
    exports2.isDecorator = isDecorator;
    exports2.isDirective = isDirective;
    exports2.isDirectiveLiteral = isDirectiveLiteral;
    exports2.isDoExpression = isDoExpression;
    exports2.isDoWhileStatement = isDoWhileStatement;
    exports2.isEmptyStatement = isEmptyStatement;
    exports2.isEmptyTypeAnnotation = isEmptyTypeAnnotation;
    exports2.isEnumBody = isEnumBody;
    exports2.isEnumBooleanBody = isEnumBooleanBody;
    exports2.isEnumBooleanMember = isEnumBooleanMember;
    exports2.isEnumDeclaration = isEnumDeclaration;
    exports2.isEnumDefaultedMember = isEnumDefaultedMember;
    exports2.isEnumMember = isEnumMember;
    exports2.isEnumNumberBody = isEnumNumberBody;
    exports2.isEnumNumberMember = isEnumNumberMember;
    exports2.isEnumStringBody = isEnumStringBody;
    exports2.isEnumStringMember = isEnumStringMember;
    exports2.isEnumSymbolBody = isEnumSymbolBody;
    exports2.isExistsTypeAnnotation = isExistsTypeAnnotation;
    exports2.isExportAllDeclaration = isExportAllDeclaration;
    exports2.isExportDeclaration = isExportDeclaration;
    exports2.isExportDefaultDeclaration = isExportDefaultDeclaration;
    exports2.isExportDefaultSpecifier = isExportDefaultSpecifier;
    exports2.isExportNamedDeclaration = isExportNamedDeclaration;
    exports2.isExportNamespaceSpecifier = isExportNamespaceSpecifier;
    exports2.isExportSpecifier = isExportSpecifier;
    exports2.isExpression = isExpression;
    exports2.isExpressionStatement = isExpressionStatement;
    exports2.isExpressionWrapper = isExpressionWrapper;
    exports2.isFile = isFile;
    exports2.isFlow = isFlow;
    exports2.isFlowBaseAnnotation = isFlowBaseAnnotation;
    exports2.isFlowDeclaration = isFlowDeclaration;
    exports2.isFlowPredicate = isFlowPredicate;
    exports2.isFlowType = isFlowType;
    exports2.isFor = isFor;
    exports2.isForInStatement = isForInStatement;
    exports2.isForOfStatement = isForOfStatement;
    exports2.isForStatement = isForStatement;
    exports2.isForXStatement = isForXStatement;
    exports2.isFunction = isFunction;
    exports2.isFunctionDeclaration = isFunctionDeclaration;
    exports2.isFunctionExpression = isFunctionExpression;
    exports2.isFunctionParent = isFunctionParent;
    exports2.isFunctionTypeAnnotation = isFunctionTypeAnnotation;
    exports2.isFunctionTypeParam = isFunctionTypeParam;
    exports2.isGenericTypeAnnotation = isGenericTypeAnnotation;
    exports2.isIdentifier = isIdentifier;
    exports2.isIfStatement = isIfStatement;
    exports2.isImmutable = isImmutable;
    exports2.isImport = isImport;
    exports2.isImportAttribute = isImportAttribute;
    exports2.isImportDeclaration = isImportDeclaration;
    exports2.isImportDefaultSpecifier = isImportDefaultSpecifier;
    exports2.isImportNamespaceSpecifier = isImportNamespaceSpecifier;
    exports2.isImportSpecifier = isImportSpecifier;
    exports2.isIndexedAccessType = isIndexedAccessType;
    exports2.isInferredPredicate = isInferredPredicate;
    exports2.isInterfaceDeclaration = isInterfaceDeclaration;
    exports2.isInterfaceExtends = isInterfaceExtends;
    exports2.isInterfaceTypeAnnotation = isInterfaceTypeAnnotation;
    exports2.isInterpreterDirective = isInterpreterDirective;
    exports2.isIntersectionTypeAnnotation = isIntersectionTypeAnnotation;
    exports2.isJSX = isJSX;
    exports2.isJSXAttribute = isJSXAttribute;
    exports2.isJSXClosingElement = isJSXClosingElement;
    exports2.isJSXClosingFragment = isJSXClosingFragment;
    exports2.isJSXElement = isJSXElement;
    exports2.isJSXEmptyExpression = isJSXEmptyExpression;
    exports2.isJSXExpressionContainer = isJSXExpressionContainer;
    exports2.isJSXFragment = isJSXFragment;
    exports2.isJSXIdentifier = isJSXIdentifier;
    exports2.isJSXMemberExpression = isJSXMemberExpression;
    exports2.isJSXNamespacedName = isJSXNamespacedName;
    exports2.isJSXOpeningElement = isJSXOpeningElement;
    exports2.isJSXOpeningFragment = isJSXOpeningFragment;
    exports2.isJSXSpreadAttribute = isJSXSpreadAttribute;
    exports2.isJSXSpreadChild = isJSXSpreadChild;
    exports2.isJSXText = isJSXText;
    exports2.isLVal = isLVal;
    exports2.isLabeledStatement = isLabeledStatement;
    exports2.isLiteral = isLiteral;
    exports2.isLogicalExpression = isLogicalExpression;
    exports2.isLoop = isLoop;
    exports2.isMemberExpression = isMemberExpression;
    exports2.isMetaProperty = isMetaProperty;
    exports2.isMethod = isMethod;
    exports2.isMiscellaneous = isMiscellaneous;
    exports2.isMixedTypeAnnotation = isMixedTypeAnnotation;
    exports2.isModuleDeclaration = isModuleDeclaration;
    exports2.isModuleExpression = isModuleExpression;
    exports2.isModuleSpecifier = isModuleSpecifier;
    exports2.isNewExpression = isNewExpression;
    exports2.isNoop = isNoop;
    exports2.isNullLiteral = isNullLiteral;
    exports2.isNullLiteralTypeAnnotation = isNullLiteralTypeAnnotation;
    exports2.isNullableTypeAnnotation = isNullableTypeAnnotation;
    exports2.isNumberLiteral = isNumberLiteral;
    exports2.isNumberLiteralTypeAnnotation = isNumberLiteralTypeAnnotation;
    exports2.isNumberTypeAnnotation = isNumberTypeAnnotation;
    exports2.isNumericLiteral = isNumericLiteral;
    exports2.isObjectExpression = isObjectExpression;
    exports2.isObjectMember = isObjectMember;
    exports2.isObjectMethod = isObjectMethod;
    exports2.isObjectPattern = isObjectPattern;
    exports2.isObjectProperty = isObjectProperty;
    exports2.isObjectTypeAnnotation = isObjectTypeAnnotation;
    exports2.isObjectTypeCallProperty = isObjectTypeCallProperty;
    exports2.isObjectTypeIndexer = isObjectTypeIndexer;
    exports2.isObjectTypeInternalSlot = isObjectTypeInternalSlot;
    exports2.isObjectTypeProperty = isObjectTypeProperty;
    exports2.isObjectTypeSpreadProperty = isObjectTypeSpreadProperty;
    exports2.isOpaqueType = isOpaqueType;
    exports2.isOptionalCallExpression = isOptionalCallExpression;
    exports2.isOptionalIndexedAccessType = isOptionalIndexedAccessType;
    exports2.isOptionalMemberExpression = isOptionalMemberExpression;
    exports2.isParenthesizedExpression = isParenthesizedExpression;
    exports2.isPattern = isPattern;
    exports2.isPatternLike = isPatternLike;
    exports2.isPipelineBareFunction = isPipelineBareFunction;
    exports2.isPipelinePrimaryTopicReference = isPipelinePrimaryTopicReference;
    exports2.isPipelineTopicExpression = isPipelineTopicExpression;
    exports2.isPlaceholder = isPlaceholder;
    exports2.isPrivate = isPrivate;
    exports2.isPrivateName = isPrivateName;
    exports2.isProgram = isProgram;
    exports2.isProperty = isProperty;
    exports2.isPureish = isPureish;
    exports2.isQualifiedTypeIdentifier = isQualifiedTypeIdentifier;
    exports2.isRecordExpression = isRecordExpression;
    exports2.isRegExpLiteral = isRegExpLiteral;
    exports2.isRegexLiteral = isRegexLiteral;
    exports2.isRestElement = isRestElement;
    exports2.isRestProperty = isRestProperty;
    exports2.isReturnStatement = isReturnStatement;
    exports2.isScopable = isScopable;
    exports2.isSequenceExpression = isSequenceExpression;
    exports2.isSpreadElement = isSpreadElement;
    exports2.isSpreadProperty = isSpreadProperty;
    exports2.isStandardized = isStandardized;
    exports2.isStatement = isStatement;
    exports2.isStaticBlock = isStaticBlock;
    exports2.isStringLiteral = isStringLiteral;
    exports2.isStringLiteralTypeAnnotation = isStringLiteralTypeAnnotation;
    exports2.isStringTypeAnnotation = isStringTypeAnnotation;
    exports2.isSuper = isSuper;
    exports2.isSwitchCase = isSwitchCase;
    exports2.isSwitchStatement = isSwitchStatement;
    exports2.isSymbolTypeAnnotation = isSymbolTypeAnnotation;
    exports2.isTSAnyKeyword = isTSAnyKeyword;
    exports2.isTSArrayType = isTSArrayType;
    exports2.isTSAsExpression = isTSAsExpression;
    exports2.isTSBaseType = isTSBaseType;
    exports2.isTSBigIntKeyword = isTSBigIntKeyword;
    exports2.isTSBooleanKeyword = isTSBooleanKeyword;
    exports2.isTSCallSignatureDeclaration = isTSCallSignatureDeclaration;
    exports2.isTSConditionalType = isTSConditionalType;
    exports2.isTSConstructSignatureDeclaration = isTSConstructSignatureDeclaration;
    exports2.isTSConstructorType = isTSConstructorType;
    exports2.isTSDeclareFunction = isTSDeclareFunction;
    exports2.isTSDeclareMethod = isTSDeclareMethod;
    exports2.isTSEntityName = isTSEntityName;
    exports2.isTSEnumDeclaration = isTSEnumDeclaration;
    exports2.isTSEnumMember = isTSEnumMember;
    exports2.isTSExportAssignment = isTSExportAssignment;
    exports2.isTSExpressionWithTypeArguments = isTSExpressionWithTypeArguments;
    exports2.isTSExternalModuleReference = isTSExternalModuleReference;
    exports2.isTSFunctionType = isTSFunctionType;
    exports2.isTSImportEqualsDeclaration = isTSImportEqualsDeclaration;
    exports2.isTSImportType = isTSImportType;
    exports2.isTSIndexSignature = isTSIndexSignature;
    exports2.isTSIndexedAccessType = isTSIndexedAccessType;
    exports2.isTSInferType = isTSInferType;
    exports2.isTSInstantiationExpression = isTSInstantiationExpression;
    exports2.isTSInterfaceBody = isTSInterfaceBody;
    exports2.isTSInterfaceDeclaration = isTSInterfaceDeclaration;
    exports2.isTSIntersectionType = isTSIntersectionType;
    exports2.isTSIntrinsicKeyword = isTSIntrinsicKeyword;
    exports2.isTSLiteralType = isTSLiteralType;
    exports2.isTSMappedType = isTSMappedType;
    exports2.isTSMethodSignature = isTSMethodSignature;
    exports2.isTSModuleBlock = isTSModuleBlock;
    exports2.isTSModuleDeclaration = isTSModuleDeclaration;
    exports2.isTSNamedTupleMember = isTSNamedTupleMember;
    exports2.isTSNamespaceExportDeclaration = isTSNamespaceExportDeclaration;
    exports2.isTSNeverKeyword = isTSNeverKeyword;
    exports2.isTSNonNullExpression = isTSNonNullExpression;
    exports2.isTSNullKeyword = isTSNullKeyword;
    exports2.isTSNumberKeyword = isTSNumberKeyword;
    exports2.isTSObjectKeyword = isTSObjectKeyword;
    exports2.isTSOptionalType = isTSOptionalType;
    exports2.isTSParameterProperty = isTSParameterProperty;
    exports2.isTSParenthesizedType = isTSParenthesizedType;
    exports2.isTSPropertySignature = isTSPropertySignature;
    exports2.isTSQualifiedName = isTSQualifiedName;
    exports2.isTSRestType = isTSRestType;
    exports2.isTSStringKeyword = isTSStringKeyword;
    exports2.isTSSymbolKeyword = isTSSymbolKeyword;
    exports2.isTSThisType = isTSThisType;
    exports2.isTSTupleType = isTSTupleType;
    exports2.isTSType = isTSType;
    exports2.isTSTypeAliasDeclaration = isTSTypeAliasDeclaration;
    exports2.isTSTypeAnnotation = isTSTypeAnnotation;
    exports2.isTSTypeAssertion = isTSTypeAssertion;
    exports2.isTSTypeElement = isTSTypeElement;
    exports2.isTSTypeLiteral = isTSTypeLiteral;
    exports2.isTSTypeOperator = isTSTypeOperator;
    exports2.isTSTypeParameter = isTSTypeParameter;
    exports2.isTSTypeParameterDeclaration = isTSTypeParameterDeclaration;
    exports2.isTSTypeParameterInstantiation = isTSTypeParameterInstantiation;
    exports2.isTSTypePredicate = isTSTypePredicate;
    exports2.isTSTypeQuery = isTSTypeQuery;
    exports2.isTSTypeReference = isTSTypeReference;
    exports2.isTSUndefinedKeyword = isTSUndefinedKeyword;
    exports2.isTSUnionType = isTSUnionType;
    exports2.isTSUnknownKeyword = isTSUnknownKeyword;
    exports2.isTSVoidKeyword = isTSVoidKeyword;
    exports2.isTaggedTemplateExpression = isTaggedTemplateExpression;
    exports2.isTemplateElement = isTemplateElement;
    exports2.isTemplateLiteral = isTemplateLiteral;
    exports2.isTerminatorless = isTerminatorless;
    exports2.isThisExpression = isThisExpression;
    exports2.isThisTypeAnnotation = isThisTypeAnnotation;
    exports2.isThrowStatement = isThrowStatement;
    exports2.isTopicReference = isTopicReference;
    exports2.isTryStatement = isTryStatement;
    exports2.isTupleExpression = isTupleExpression;
    exports2.isTupleTypeAnnotation = isTupleTypeAnnotation;
    exports2.isTypeAlias = isTypeAlias;
    exports2.isTypeAnnotation = isTypeAnnotation;
    exports2.isTypeCastExpression = isTypeCastExpression;
    exports2.isTypeParameter = isTypeParameter;
    exports2.isTypeParameterDeclaration = isTypeParameterDeclaration;
    exports2.isTypeParameterInstantiation = isTypeParameterInstantiation;
    exports2.isTypeScript = isTypeScript;
    exports2.isTypeofTypeAnnotation = isTypeofTypeAnnotation;
    exports2.isUnaryExpression = isUnaryExpression;
    exports2.isUnaryLike = isUnaryLike;
    exports2.isUnionTypeAnnotation = isUnionTypeAnnotation;
    exports2.isUpdateExpression = isUpdateExpression;
    exports2.isUserWhitespacable = isUserWhitespacable;
    exports2.isV8IntrinsicIdentifier = isV8IntrinsicIdentifier;
    exports2.isVariableDeclaration = isVariableDeclaration;
    exports2.isVariableDeclarator = isVariableDeclarator;
    exports2.isVariance = isVariance;
    exports2.isVoidTypeAnnotation = isVoidTypeAnnotation;
    exports2.isWhile = isWhile;
    exports2.isWhileStatement = isWhileStatement;
    exports2.isWithStatement = isWithStatement;
    exports2.isYieldExpression = isYieldExpression;
    var _shallowEqual = require_shallowEqual();
    function isArrayExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ArrayExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isAssignmentExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "AssignmentExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isBinaryExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "BinaryExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isInterpreterDirective(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "InterpreterDirective") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDirective(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "Directive") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDirectiveLiteral(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DirectiveLiteral") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isBlockStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "BlockStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isBreakStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "BreakStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isCallExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "CallExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isCatchClause(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "CatchClause") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isConditionalExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ConditionalExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isContinueStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ContinueStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDebuggerStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DebuggerStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDoWhileStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DoWhileStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isEmptyStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "EmptyStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isExpressionStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ExpressionStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isFile(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "File") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isForInStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ForInStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isForStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ForStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isFunctionDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "FunctionDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isFunctionExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "FunctionExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isIdentifier(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "Identifier") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isIfStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "IfStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isLabeledStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "LabeledStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isStringLiteral(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "StringLiteral") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isNumericLiteral(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "NumericLiteral") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isNullLiteral(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "NullLiteral") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isBooleanLiteral(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "BooleanLiteral") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isRegExpLiteral(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "RegExpLiteral") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isLogicalExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "LogicalExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isMemberExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "MemberExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isNewExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "NewExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isProgram(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "Program") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isObjectExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ObjectExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isObjectMethod(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ObjectMethod") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isObjectProperty(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ObjectProperty") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isRestElement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "RestElement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isReturnStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ReturnStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isSequenceExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "SequenceExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isParenthesizedExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ParenthesizedExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isSwitchCase(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "SwitchCase") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isSwitchStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "SwitchStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isThisExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ThisExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isThrowStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ThrowStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTryStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TryStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isUnaryExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "UnaryExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isUpdateExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "UpdateExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isVariableDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "VariableDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isVariableDeclarator(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "VariableDeclarator") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isWhileStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "WhileStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isWithStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "WithStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isAssignmentPattern(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "AssignmentPattern") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isArrayPattern(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ArrayPattern") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isArrowFunctionExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ArrowFunctionExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isClassBody(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ClassBody") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isClassExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ClassExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isClassDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ClassDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isExportAllDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ExportAllDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isExportDefaultDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ExportDefaultDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isExportNamedDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ExportNamedDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isExportSpecifier(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ExportSpecifier") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isForOfStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ForOfStatement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isImportDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ImportDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isImportDefaultSpecifier(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ImportDefaultSpecifier") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isImportNamespaceSpecifier(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ImportNamespaceSpecifier") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isImportSpecifier(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ImportSpecifier") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isMetaProperty(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "MetaProperty") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isClassMethod(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ClassMethod") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isObjectPattern(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ObjectPattern") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isSpreadElement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "SpreadElement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isSuper(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "Super") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTaggedTemplateExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TaggedTemplateExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTemplateElement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TemplateElement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTemplateLiteral(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TemplateLiteral") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isYieldExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "YieldExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isAwaitExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "AwaitExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isImport(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "Import") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isBigIntLiteral(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "BigIntLiteral") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isExportNamespaceSpecifier(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ExportNamespaceSpecifier") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isOptionalMemberExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "OptionalMemberExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isOptionalCallExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "OptionalCallExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isClassProperty(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ClassProperty") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isClassAccessorProperty(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ClassAccessorProperty") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isClassPrivateProperty(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ClassPrivateProperty") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isClassPrivateMethod(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ClassPrivateMethod") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isPrivateName(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "PrivateName") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isStaticBlock(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "StaticBlock") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isAnyTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "AnyTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isArrayTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ArrayTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isBooleanTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "BooleanTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isBooleanLiteralTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "BooleanLiteralTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isNullLiteralTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "NullLiteralTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isClassImplements(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ClassImplements") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDeclareClass(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DeclareClass") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDeclareFunction(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DeclareFunction") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDeclareInterface(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DeclareInterface") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDeclareModule(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DeclareModule") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDeclareModuleExports(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DeclareModuleExports") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDeclareTypeAlias(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DeclareTypeAlias") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDeclareOpaqueType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DeclareOpaqueType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDeclareVariable(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DeclareVariable") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDeclareExportDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DeclareExportDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDeclareExportAllDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DeclareExportAllDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDeclaredPredicate(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DeclaredPredicate") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isExistsTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ExistsTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isFunctionTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "FunctionTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isFunctionTypeParam(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "FunctionTypeParam") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isGenericTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "GenericTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isInferredPredicate(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "InferredPredicate") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isInterfaceExtends(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "InterfaceExtends") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isInterfaceDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "InterfaceDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isInterfaceTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "InterfaceTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isIntersectionTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "IntersectionTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isMixedTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "MixedTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isEmptyTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "EmptyTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isNullableTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "NullableTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isNumberLiteralTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "NumberLiteralTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isNumberTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "NumberTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isObjectTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ObjectTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isObjectTypeInternalSlot(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ObjectTypeInternalSlot") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isObjectTypeCallProperty(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ObjectTypeCallProperty") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isObjectTypeIndexer(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ObjectTypeIndexer") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isObjectTypeProperty(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ObjectTypeProperty") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isObjectTypeSpreadProperty(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ObjectTypeSpreadProperty") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isOpaqueType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "OpaqueType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isQualifiedTypeIdentifier(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "QualifiedTypeIdentifier") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isStringLiteralTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "StringLiteralTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isStringTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "StringTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isSymbolTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "SymbolTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isThisTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ThisTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTupleTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TupleTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTypeofTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TypeofTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTypeAlias(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TypeAlias") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTypeCastExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TypeCastExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTypeParameter(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TypeParameter") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTypeParameterDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TypeParameterDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTypeParameterInstantiation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TypeParameterInstantiation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isUnionTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "UnionTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isVariance(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "Variance") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isVoidTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "VoidTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isEnumDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "EnumDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isEnumBooleanBody(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "EnumBooleanBody") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isEnumNumberBody(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "EnumNumberBody") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isEnumStringBody(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "EnumStringBody") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isEnumSymbolBody(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "EnumSymbolBody") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isEnumBooleanMember(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "EnumBooleanMember") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isEnumNumberMember(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "EnumNumberMember") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isEnumStringMember(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "EnumStringMember") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isEnumDefaultedMember(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "EnumDefaultedMember") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isIndexedAccessType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "IndexedAccessType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isOptionalIndexedAccessType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "OptionalIndexedAccessType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXAttribute(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXAttribute") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXClosingElement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXClosingElement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXElement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXElement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXEmptyExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXEmptyExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXExpressionContainer(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXExpressionContainer") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXSpreadChild(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXSpreadChild") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXIdentifier(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXIdentifier") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXMemberExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXMemberExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXNamespacedName(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXNamespacedName") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXOpeningElement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXOpeningElement") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXSpreadAttribute(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXSpreadAttribute") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXText(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXText") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXFragment(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXFragment") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXOpeningFragment(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXOpeningFragment") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSXClosingFragment(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "JSXClosingFragment") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isNoop(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "Noop") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isPlaceholder(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "Placeholder") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isV8IntrinsicIdentifier(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "V8IntrinsicIdentifier") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isArgumentPlaceholder(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ArgumentPlaceholder") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isBindExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "BindExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isImportAttribute(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ImportAttribute") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDecorator(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "Decorator") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDoExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DoExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isExportDefaultSpecifier(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ExportDefaultSpecifier") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isRecordExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "RecordExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTupleExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TupleExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDecimalLiteral(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "DecimalLiteral") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isModuleExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "ModuleExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTopicReference(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TopicReference") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isPipelineTopicExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "PipelineTopicExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isPipelineBareFunction(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "PipelineBareFunction") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isPipelinePrimaryTopicReference(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "PipelinePrimaryTopicReference") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSParameterProperty(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSParameterProperty") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSDeclareFunction(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSDeclareFunction") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSDeclareMethod(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSDeclareMethod") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSQualifiedName(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSQualifiedName") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSCallSignatureDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSCallSignatureDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSConstructSignatureDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSConstructSignatureDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSPropertySignature(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSPropertySignature") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSMethodSignature(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSMethodSignature") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSIndexSignature(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSIndexSignature") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSAnyKeyword(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSAnyKeyword") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSBooleanKeyword(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSBooleanKeyword") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSBigIntKeyword(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSBigIntKeyword") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSIntrinsicKeyword(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSIntrinsicKeyword") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSNeverKeyword(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSNeverKeyword") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSNullKeyword(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSNullKeyword") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSNumberKeyword(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSNumberKeyword") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSObjectKeyword(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSObjectKeyword") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSStringKeyword(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSStringKeyword") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSSymbolKeyword(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSSymbolKeyword") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSUndefinedKeyword(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSUndefinedKeyword") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSUnknownKeyword(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSUnknownKeyword") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSVoidKeyword(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSVoidKeyword") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSThisType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSThisType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSFunctionType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSFunctionType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSConstructorType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSConstructorType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSTypeReference(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSTypeReference") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSTypePredicate(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSTypePredicate") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSTypeQuery(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSTypeQuery") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSTypeLiteral(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSTypeLiteral") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSArrayType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSArrayType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSTupleType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSTupleType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSOptionalType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSOptionalType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSRestType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSRestType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSNamedTupleMember(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSNamedTupleMember") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSUnionType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSUnionType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSIntersectionType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSIntersectionType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSConditionalType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSConditionalType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSInferType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSInferType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSParenthesizedType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSParenthesizedType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSTypeOperator(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSTypeOperator") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSIndexedAccessType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSIndexedAccessType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSMappedType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSMappedType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSLiteralType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSLiteralType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSExpressionWithTypeArguments(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSExpressionWithTypeArguments") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSInterfaceDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSInterfaceDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSInterfaceBody(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSInterfaceBody") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSTypeAliasDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSTypeAliasDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSInstantiationExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSInstantiationExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSAsExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSAsExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSTypeAssertion(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSTypeAssertion") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSEnumDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSEnumDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSEnumMember(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSEnumMember") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSModuleDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSModuleDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSModuleBlock(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSModuleBlock") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSImportType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSImportType") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSImportEqualsDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSImportEqualsDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSExternalModuleReference(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSExternalModuleReference") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSNonNullExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSNonNullExpression") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSExportAssignment(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSExportAssignment") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSNamespaceExportDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSNamespaceExportDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSTypeAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSTypeAnnotation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSTypeParameterInstantiation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSTypeParameterInstantiation") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSTypeParameterDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSTypeParameterDeclaration") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSTypeParameter(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "TSTypeParameter") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isStandardized(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ArrayExpression" === nodeType || "AssignmentExpression" === nodeType || "BinaryExpression" === nodeType || "InterpreterDirective" === nodeType || "Directive" === nodeType || "DirectiveLiteral" === nodeType || "BlockStatement" === nodeType || "BreakStatement" === nodeType || "CallExpression" === nodeType || "CatchClause" === nodeType || "ConditionalExpression" === nodeType || "ContinueStatement" === nodeType || "DebuggerStatement" === nodeType || "DoWhileStatement" === nodeType || "EmptyStatement" === nodeType || "ExpressionStatement" === nodeType || "File" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "Identifier" === nodeType || "IfStatement" === nodeType || "LabeledStatement" === nodeType || "StringLiteral" === nodeType || "NumericLiteral" === nodeType || "NullLiteral" === nodeType || "BooleanLiteral" === nodeType || "RegExpLiteral" === nodeType || "LogicalExpression" === nodeType || "MemberExpression" === nodeType || "NewExpression" === nodeType || "Program" === nodeType || "ObjectExpression" === nodeType || "ObjectMethod" === nodeType || "ObjectProperty" === nodeType || "RestElement" === nodeType || "ReturnStatement" === nodeType || "SequenceExpression" === nodeType || "ParenthesizedExpression" === nodeType || "SwitchCase" === nodeType || "SwitchStatement" === nodeType || "ThisExpression" === nodeType || "ThrowStatement" === nodeType || "TryStatement" === nodeType || "UnaryExpression" === nodeType || "UpdateExpression" === nodeType || "VariableDeclaration" === nodeType || "VariableDeclarator" === nodeType || "WhileStatement" === nodeType || "WithStatement" === nodeType || "AssignmentPattern" === nodeType || "ArrayPattern" === nodeType || "ArrowFunctionExpression" === nodeType || "ClassBody" === nodeType || "ClassExpression" === nodeType || "ClassDeclaration" === nodeType || "ExportAllDeclaration" === nodeType || "ExportDefaultDeclaration" === nodeType || "ExportNamedDeclaration" === nodeType || "ExportSpecifier" === nodeType || "ForOfStatement" === nodeType || "ImportDeclaration" === nodeType || "ImportDefaultSpecifier" === nodeType || "ImportNamespaceSpecifier" === nodeType || "ImportSpecifier" === nodeType || "MetaProperty" === nodeType || "ClassMethod" === nodeType || "ObjectPattern" === nodeType || "SpreadElement" === nodeType || "Super" === nodeType || "TaggedTemplateExpression" === nodeType || "TemplateElement" === nodeType || "TemplateLiteral" === nodeType || "YieldExpression" === nodeType || "AwaitExpression" === nodeType || "Import" === nodeType || "BigIntLiteral" === nodeType || "ExportNamespaceSpecifier" === nodeType || "OptionalMemberExpression" === nodeType || "OptionalCallExpression" === nodeType || "ClassProperty" === nodeType || "ClassAccessorProperty" === nodeType || "ClassPrivateProperty" === nodeType || "ClassPrivateMethod" === nodeType || "PrivateName" === nodeType || "StaticBlock" === nodeType || nodeType === "Placeholder" && ("Identifier" === node.expectedNode || "StringLiteral" === node.expectedNode || "BlockStatement" === node.expectedNode || "ClassBody" === node.expectedNode)) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isExpression(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ArrayExpression" === nodeType || "AssignmentExpression" === nodeType || "BinaryExpression" === nodeType || "CallExpression" === nodeType || "ConditionalExpression" === nodeType || "FunctionExpression" === nodeType || "Identifier" === nodeType || "StringLiteral" === nodeType || "NumericLiteral" === nodeType || "NullLiteral" === nodeType || "BooleanLiteral" === nodeType || "RegExpLiteral" === nodeType || "LogicalExpression" === nodeType || "MemberExpression" === nodeType || "NewExpression" === nodeType || "ObjectExpression" === nodeType || "SequenceExpression" === nodeType || "ParenthesizedExpression" === nodeType || "ThisExpression" === nodeType || "UnaryExpression" === nodeType || "UpdateExpression" === nodeType || "ArrowFunctionExpression" === nodeType || "ClassExpression" === nodeType || "MetaProperty" === nodeType || "Super" === nodeType || "TaggedTemplateExpression" === nodeType || "TemplateLiteral" === nodeType || "YieldExpression" === nodeType || "AwaitExpression" === nodeType || "Import" === nodeType || "BigIntLiteral" === nodeType || "OptionalMemberExpression" === nodeType || "OptionalCallExpression" === nodeType || "TypeCastExpression" === nodeType || "JSXElement" === nodeType || "JSXFragment" === nodeType || "BindExpression" === nodeType || "DoExpression" === nodeType || "RecordExpression" === nodeType || "TupleExpression" === nodeType || "DecimalLiteral" === nodeType || "ModuleExpression" === nodeType || "TopicReference" === nodeType || "PipelineTopicExpression" === nodeType || "PipelineBareFunction" === nodeType || "PipelinePrimaryTopicReference" === nodeType || "TSInstantiationExpression" === nodeType || "TSAsExpression" === nodeType || "TSTypeAssertion" === nodeType || "TSNonNullExpression" === nodeType || nodeType === "Placeholder" && ("Expression" === node.expectedNode || "Identifier" === node.expectedNode || "StringLiteral" === node.expectedNode)) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isBinary(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("BinaryExpression" === nodeType || "LogicalExpression" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isScopable(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("BlockStatement" === nodeType || "CatchClause" === nodeType || "DoWhileStatement" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "Program" === nodeType || "ObjectMethod" === nodeType || "SwitchStatement" === nodeType || "WhileStatement" === nodeType || "ArrowFunctionExpression" === nodeType || "ClassExpression" === nodeType || "ClassDeclaration" === nodeType || "ForOfStatement" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType || "StaticBlock" === nodeType || "TSModuleBlock" === nodeType || nodeType === "Placeholder" && "BlockStatement" === node.expectedNode) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isBlockParent(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("BlockStatement" === nodeType || "CatchClause" === nodeType || "DoWhileStatement" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "Program" === nodeType || "ObjectMethod" === nodeType || "SwitchStatement" === nodeType || "WhileStatement" === nodeType || "ArrowFunctionExpression" === nodeType || "ForOfStatement" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType || "StaticBlock" === nodeType || "TSModuleBlock" === nodeType || nodeType === "Placeholder" && "BlockStatement" === node.expectedNode) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isBlock(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("BlockStatement" === nodeType || "Program" === nodeType || "TSModuleBlock" === nodeType || nodeType === "Placeholder" && "BlockStatement" === node.expectedNode) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("BlockStatement" === nodeType || "BreakStatement" === nodeType || "ContinueStatement" === nodeType || "DebuggerStatement" === nodeType || "DoWhileStatement" === nodeType || "EmptyStatement" === nodeType || "ExpressionStatement" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "FunctionDeclaration" === nodeType || "IfStatement" === nodeType || "LabeledStatement" === nodeType || "ReturnStatement" === nodeType || "SwitchStatement" === nodeType || "ThrowStatement" === nodeType || "TryStatement" === nodeType || "VariableDeclaration" === nodeType || "WhileStatement" === nodeType || "WithStatement" === nodeType || "ClassDeclaration" === nodeType || "ExportAllDeclaration" === nodeType || "ExportDefaultDeclaration" === nodeType || "ExportNamedDeclaration" === nodeType || "ForOfStatement" === nodeType || "ImportDeclaration" === nodeType || "DeclareClass" === nodeType || "DeclareFunction" === nodeType || "DeclareInterface" === nodeType || "DeclareModule" === nodeType || "DeclareModuleExports" === nodeType || "DeclareTypeAlias" === nodeType || "DeclareOpaqueType" === nodeType || "DeclareVariable" === nodeType || "DeclareExportDeclaration" === nodeType || "DeclareExportAllDeclaration" === nodeType || "InterfaceDeclaration" === nodeType || "OpaqueType" === nodeType || "TypeAlias" === nodeType || "EnumDeclaration" === nodeType || "TSDeclareFunction" === nodeType || "TSInterfaceDeclaration" === nodeType || "TSTypeAliasDeclaration" === nodeType || "TSEnumDeclaration" === nodeType || "TSModuleDeclaration" === nodeType || "TSImportEqualsDeclaration" === nodeType || "TSExportAssignment" === nodeType || "TSNamespaceExportDeclaration" === nodeType || nodeType === "Placeholder" && ("Statement" === node.expectedNode || "Declaration" === node.expectedNode || "BlockStatement" === node.expectedNode)) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTerminatorless(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("BreakStatement" === nodeType || "ContinueStatement" === nodeType || "ReturnStatement" === nodeType || "ThrowStatement" === nodeType || "YieldExpression" === nodeType || "AwaitExpression" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isCompletionStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("BreakStatement" === nodeType || "ContinueStatement" === nodeType || "ReturnStatement" === nodeType || "ThrowStatement" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isConditional(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ConditionalExpression" === nodeType || "IfStatement" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isLoop(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("DoWhileStatement" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "WhileStatement" === nodeType || "ForOfStatement" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isWhile(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("DoWhileStatement" === nodeType || "WhileStatement" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isExpressionWrapper(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ExpressionStatement" === nodeType || "ParenthesizedExpression" === nodeType || "TypeCastExpression" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isFor(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ForInStatement" === nodeType || "ForStatement" === nodeType || "ForOfStatement" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isForXStatement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ForInStatement" === nodeType || "ForOfStatement" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isFunction(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "ObjectMethod" === nodeType || "ArrowFunctionExpression" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isFunctionParent(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "ObjectMethod" === nodeType || "ArrowFunctionExpression" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType || "StaticBlock" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isPureish(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "StringLiteral" === nodeType || "NumericLiteral" === nodeType || "NullLiteral" === nodeType || "BooleanLiteral" === nodeType || "RegExpLiteral" === nodeType || "ArrowFunctionExpression" === nodeType || "BigIntLiteral" === nodeType || "DecimalLiteral" === nodeType || nodeType === "Placeholder" && "StringLiteral" === node.expectedNode) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("FunctionDeclaration" === nodeType || "VariableDeclaration" === nodeType || "ClassDeclaration" === nodeType || "ExportAllDeclaration" === nodeType || "ExportDefaultDeclaration" === nodeType || "ExportNamedDeclaration" === nodeType || "ImportDeclaration" === nodeType || "DeclareClass" === nodeType || "DeclareFunction" === nodeType || "DeclareInterface" === nodeType || "DeclareModule" === nodeType || "DeclareModuleExports" === nodeType || "DeclareTypeAlias" === nodeType || "DeclareOpaqueType" === nodeType || "DeclareVariable" === nodeType || "DeclareExportDeclaration" === nodeType || "DeclareExportAllDeclaration" === nodeType || "InterfaceDeclaration" === nodeType || "OpaqueType" === nodeType || "TypeAlias" === nodeType || "EnumDeclaration" === nodeType || "TSDeclareFunction" === nodeType || "TSInterfaceDeclaration" === nodeType || "TSTypeAliasDeclaration" === nodeType || "TSEnumDeclaration" === nodeType || "TSModuleDeclaration" === nodeType || nodeType === "Placeholder" && "Declaration" === node.expectedNode) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isPatternLike(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("Identifier" === nodeType || "RestElement" === nodeType || "AssignmentPattern" === nodeType || "ArrayPattern" === nodeType || "ObjectPattern" === nodeType || "TSAsExpression" === nodeType || "TSTypeAssertion" === nodeType || "TSNonNullExpression" === nodeType || nodeType === "Placeholder" && ("Pattern" === node.expectedNode || "Identifier" === node.expectedNode)) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isLVal(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("Identifier" === nodeType || "MemberExpression" === nodeType || "RestElement" === nodeType || "AssignmentPattern" === nodeType || "ArrayPattern" === nodeType || "ObjectPattern" === nodeType || "TSParameterProperty" === nodeType || "TSAsExpression" === nodeType || "TSTypeAssertion" === nodeType || "TSNonNullExpression" === nodeType || nodeType === "Placeholder" && ("Pattern" === node.expectedNode || "Identifier" === node.expectedNode)) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSEntityName(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("Identifier" === nodeType || "TSQualifiedName" === nodeType || nodeType === "Placeholder" && "Identifier" === node.expectedNode) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isLiteral(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("StringLiteral" === nodeType || "NumericLiteral" === nodeType || "NullLiteral" === nodeType || "BooleanLiteral" === nodeType || "RegExpLiteral" === nodeType || "TemplateLiteral" === nodeType || "BigIntLiteral" === nodeType || "DecimalLiteral" === nodeType || nodeType === "Placeholder" && "StringLiteral" === node.expectedNode) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isImmutable(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("StringLiteral" === nodeType || "NumericLiteral" === nodeType || "NullLiteral" === nodeType || "BooleanLiteral" === nodeType || "BigIntLiteral" === nodeType || "JSXAttribute" === nodeType || "JSXClosingElement" === nodeType || "JSXElement" === nodeType || "JSXExpressionContainer" === nodeType || "JSXSpreadChild" === nodeType || "JSXOpeningElement" === nodeType || "JSXText" === nodeType || "JSXFragment" === nodeType || "JSXOpeningFragment" === nodeType || "JSXClosingFragment" === nodeType || "DecimalLiteral" === nodeType || nodeType === "Placeholder" && "StringLiteral" === node.expectedNode) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isUserWhitespacable(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ObjectMethod" === nodeType || "ObjectProperty" === nodeType || "ObjectTypeInternalSlot" === nodeType || "ObjectTypeCallProperty" === nodeType || "ObjectTypeIndexer" === nodeType || "ObjectTypeProperty" === nodeType || "ObjectTypeSpreadProperty" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isMethod(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ObjectMethod" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isObjectMember(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ObjectMethod" === nodeType || "ObjectProperty" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isProperty(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ObjectProperty" === nodeType || "ClassProperty" === nodeType || "ClassAccessorProperty" === nodeType || "ClassPrivateProperty" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isUnaryLike(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("UnaryExpression" === nodeType || "SpreadElement" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isPattern(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("AssignmentPattern" === nodeType || "ArrayPattern" === nodeType || "ObjectPattern" === nodeType || nodeType === "Placeholder" && "Pattern" === node.expectedNode) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isClass(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ClassExpression" === nodeType || "ClassDeclaration" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isModuleDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ExportAllDeclaration" === nodeType || "ExportDefaultDeclaration" === nodeType || "ExportNamedDeclaration" === nodeType || "ImportDeclaration" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isExportDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ExportAllDeclaration" === nodeType || "ExportDefaultDeclaration" === nodeType || "ExportNamedDeclaration" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isModuleSpecifier(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ExportSpecifier" === nodeType || "ImportDefaultSpecifier" === nodeType || "ImportNamespaceSpecifier" === nodeType || "ImportSpecifier" === nodeType || "ExportNamespaceSpecifier" === nodeType || "ExportDefaultSpecifier" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isAccessor(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ClassAccessorProperty" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isPrivate(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("ClassPrivateProperty" === nodeType || "ClassPrivateMethod" === nodeType || "PrivateName" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isFlow(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("AnyTypeAnnotation" === nodeType || "ArrayTypeAnnotation" === nodeType || "BooleanTypeAnnotation" === nodeType || "BooleanLiteralTypeAnnotation" === nodeType || "NullLiteralTypeAnnotation" === nodeType || "ClassImplements" === nodeType || "DeclareClass" === nodeType || "DeclareFunction" === nodeType || "DeclareInterface" === nodeType || "DeclareModule" === nodeType || "DeclareModuleExports" === nodeType || "DeclareTypeAlias" === nodeType || "DeclareOpaqueType" === nodeType || "DeclareVariable" === nodeType || "DeclareExportDeclaration" === nodeType || "DeclareExportAllDeclaration" === nodeType || "DeclaredPredicate" === nodeType || "ExistsTypeAnnotation" === nodeType || "FunctionTypeAnnotation" === nodeType || "FunctionTypeParam" === nodeType || "GenericTypeAnnotation" === nodeType || "InferredPredicate" === nodeType || "InterfaceExtends" === nodeType || "InterfaceDeclaration" === nodeType || "InterfaceTypeAnnotation" === nodeType || "IntersectionTypeAnnotation" === nodeType || "MixedTypeAnnotation" === nodeType || "EmptyTypeAnnotation" === nodeType || "NullableTypeAnnotation" === nodeType || "NumberLiteralTypeAnnotation" === nodeType || "NumberTypeAnnotation" === nodeType || "ObjectTypeAnnotation" === nodeType || "ObjectTypeInternalSlot" === nodeType || "ObjectTypeCallProperty" === nodeType || "ObjectTypeIndexer" === nodeType || "ObjectTypeProperty" === nodeType || "ObjectTypeSpreadProperty" === nodeType || "OpaqueType" === nodeType || "QualifiedTypeIdentifier" === nodeType || "StringLiteralTypeAnnotation" === nodeType || "StringTypeAnnotation" === nodeType || "SymbolTypeAnnotation" === nodeType || "ThisTypeAnnotation" === nodeType || "TupleTypeAnnotation" === nodeType || "TypeofTypeAnnotation" === nodeType || "TypeAlias" === nodeType || "TypeAnnotation" === nodeType || "TypeCastExpression" === nodeType || "TypeParameter" === nodeType || "TypeParameterDeclaration" === nodeType || "TypeParameterInstantiation" === nodeType || "UnionTypeAnnotation" === nodeType || "Variance" === nodeType || "VoidTypeAnnotation" === nodeType || "EnumDeclaration" === nodeType || "EnumBooleanBody" === nodeType || "EnumNumberBody" === nodeType || "EnumStringBody" === nodeType || "EnumSymbolBody" === nodeType || "EnumBooleanMember" === nodeType || "EnumNumberMember" === nodeType || "EnumStringMember" === nodeType || "EnumDefaultedMember" === nodeType || "IndexedAccessType" === nodeType || "OptionalIndexedAccessType" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isFlowType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("AnyTypeAnnotation" === nodeType || "ArrayTypeAnnotation" === nodeType || "BooleanTypeAnnotation" === nodeType || "BooleanLiteralTypeAnnotation" === nodeType || "NullLiteralTypeAnnotation" === nodeType || "ExistsTypeAnnotation" === nodeType || "FunctionTypeAnnotation" === nodeType || "GenericTypeAnnotation" === nodeType || "InterfaceTypeAnnotation" === nodeType || "IntersectionTypeAnnotation" === nodeType || "MixedTypeAnnotation" === nodeType || "EmptyTypeAnnotation" === nodeType || "NullableTypeAnnotation" === nodeType || "NumberLiteralTypeAnnotation" === nodeType || "NumberTypeAnnotation" === nodeType || "ObjectTypeAnnotation" === nodeType || "StringLiteralTypeAnnotation" === nodeType || "StringTypeAnnotation" === nodeType || "SymbolTypeAnnotation" === nodeType || "ThisTypeAnnotation" === nodeType || "TupleTypeAnnotation" === nodeType || "TypeofTypeAnnotation" === nodeType || "UnionTypeAnnotation" === nodeType || "VoidTypeAnnotation" === nodeType || "IndexedAccessType" === nodeType || "OptionalIndexedAccessType" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isFlowBaseAnnotation(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("AnyTypeAnnotation" === nodeType || "BooleanTypeAnnotation" === nodeType || "NullLiteralTypeAnnotation" === nodeType || "MixedTypeAnnotation" === nodeType || "EmptyTypeAnnotation" === nodeType || "NumberTypeAnnotation" === nodeType || "StringTypeAnnotation" === nodeType || "SymbolTypeAnnotation" === nodeType || "ThisTypeAnnotation" === nodeType || "VoidTypeAnnotation" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isFlowDeclaration(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("DeclareClass" === nodeType || "DeclareFunction" === nodeType || "DeclareInterface" === nodeType || "DeclareModule" === nodeType || "DeclareModuleExports" === nodeType || "DeclareTypeAlias" === nodeType || "DeclareOpaqueType" === nodeType || "DeclareVariable" === nodeType || "DeclareExportDeclaration" === nodeType || "DeclareExportAllDeclaration" === nodeType || "InterfaceDeclaration" === nodeType || "OpaqueType" === nodeType || "TypeAlias" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isFlowPredicate(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("DeclaredPredicate" === nodeType || "InferredPredicate" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isEnumBody(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("EnumBooleanBody" === nodeType || "EnumNumberBody" === nodeType || "EnumStringBody" === nodeType || "EnumSymbolBody" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isEnumMember(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("EnumBooleanMember" === nodeType || "EnumNumberMember" === nodeType || "EnumStringMember" === nodeType || "EnumDefaultedMember" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isJSX(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("JSXAttribute" === nodeType || "JSXClosingElement" === nodeType || "JSXElement" === nodeType || "JSXEmptyExpression" === nodeType || "JSXExpressionContainer" === nodeType || "JSXSpreadChild" === nodeType || "JSXIdentifier" === nodeType || "JSXMemberExpression" === nodeType || "JSXNamespacedName" === nodeType || "JSXOpeningElement" === nodeType || "JSXSpreadAttribute" === nodeType || "JSXText" === nodeType || "JSXFragment" === nodeType || "JSXOpeningFragment" === nodeType || "JSXClosingFragment" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isMiscellaneous(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("Noop" === nodeType || "Placeholder" === nodeType || "V8IntrinsicIdentifier" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTypeScript(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("TSParameterProperty" === nodeType || "TSDeclareFunction" === nodeType || "TSDeclareMethod" === nodeType || "TSQualifiedName" === nodeType || "TSCallSignatureDeclaration" === nodeType || "TSConstructSignatureDeclaration" === nodeType || "TSPropertySignature" === nodeType || "TSMethodSignature" === nodeType || "TSIndexSignature" === nodeType || "TSAnyKeyword" === nodeType || "TSBooleanKeyword" === nodeType || "TSBigIntKeyword" === nodeType || "TSIntrinsicKeyword" === nodeType || "TSNeverKeyword" === nodeType || "TSNullKeyword" === nodeType || "TSNumberKeyword" === nodeType || "TSObjectKeyword" === nodeType || "TSStringKeyword" === nodeType || "TSSymbolKeyword" === nodeType || "TSUndefinedKeyword" === nodeType || "TSUnknownKeyword" === nodeType || "TSVoidKeyword" === nodeType || "TSThisType" === nodeType || "TSFunctionType" === nodeType || "TSConstructorType" === nodeType || "TSTypeReference" === nodeType || "TSTypePredicate" === nodeType || "TSTypeQuery" === nodeType || "TSTypeLiteral" === nodeType || "TSArrayType" === nodeType || "TSTupleType" === nodeType || "TSOptionalType" === nodeType || "TSRestType" === nodeType || "TSNamedTupleMember" === nodeType || "TSUnionType" === nodeType || "TSIntersectionType" === nodeType || "TSConditionalType" === nodeType || "TSInferType" === nodeType || "TSParenthesizedType" === nodeType || "TSTypeOperator" === nodeType || "TSIndexedAccessType" === nodeType || "TSMappedType" === nodeType || "TSLiteralType" === nodeType || "TSExpressionWithTypeArguments" === nodeType || "TSInterfaceDeclaration" === nodeType || "TSInterfaceBody" === nodeType || "TSTypeAliasDeclaration" === nodeType || "TSInstantiationExpression" === nodeType || "TSAsExpression" === nodeType || "TSTypeAssertion" === nodeType || "TSEnumDeclaration" === nodeType || "TSEnumMember" === nodeType || "TSModuleDeclaration" === nodeType || "TSModuleBlock" === nodeType || "TSImportType" === nodeType || "TSImportEqualsDeclaration" === nodeType || "TSExternalModuleReference" === nodeType || "TSNonNullExpression" === nodeType || "TSExportAssignment" === nodeType || "TSNamespaceExportDeclaration" === nodeType || "TSTypeAnnotation" === nodeType || "TSTypeParameterInstantiation" === nodeType || "TSTypeParameterDeclaration" === nodeType || "TSTypeParameter" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSTypeElement(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("TSCallSignatureDeclaration" === nodeType || "TSConstructSignatureDeclaration" === nodeType || "TSPropertySignature" === nodeType || "TSMethodSignature" === nodeType || "TSIndexSignature" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("TSAnyKeyword" === nodeType || "TSBooleanKeyword" === nodeType || "TSBigIntKeyword" === nodeType || "TSIntrinsicKeyword" === nodeType || "TSNeverKeyword" === nodeType || "TSNullKeyword" === nodeType || "TSNumberKeyword" === nodeType || "TSObjectKeyword" === nodeType || "TSStringKeyword" === nodeType || "TSSymbolKeyword" === nodeType || "TSUndefinedKeyword" === nodeType || "TSUnknownKeyword" === nodeType || "TSVoidKeyword" === nodeType || "TSThisType" === nodeType || "TSFunctionType" === nodeType || "TSConstructorType" === nodeType || "TSTypeReference" === nodeType || "TSTypePredicate" === nodeType || "TSTypeQuery" === nodeType || "TSTypeLiteral" === nodeType || "TSArrayType" === nodeType || "TSTupleType" === nodeType || "TSOptionalType" === nodeType || "TSRestType" === nodeType || "TSUnionType" === nodeType || "TSIntersectionType" === nodeType || "TSConditionalType" === nodeType || "TSInferType" === nodeType || "TSParenthesizedType" === nodeType || "TSTypeOperator" === nodeType || "TSIndexedAccessType" === nodeType || "TSMappedType" === nodeType || "TSLiteralType" === nodeType || "TSExpressionWithTypeArguments" === nodeType || "TSImportType" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isTSBaseType(node, opts) {
      if (!node)
        return false;
      const nodeType = node.type;
      if ("TSAnyKeyword" === nodeType || "TSBooleanKeyword" === nodeType || "TSBigIntKeyword" === nodeType || "TSIntrinsicKeyword" === nodeType || "TSNeverKeyword" === nodeType || "TSNullKeyword" === nodeType || "TSNumberKeyword" === nodeType || "TSObjectKeyword" === nodeType || "TSStringKeyword" === nodeType || "TSSymbolKeyword" === nodeType || "TSUndefinedKeyword" === nodeType || "TSUnknownKeyword" === nodeType || "TSVoidKeyword" === nodeType || "TSThisType" === nodeType || "TSLiteralType" === nodeType) {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isNumberLiteral(node, opts) {
      console.trace("The node type NumberLiteral has been renamed to NumericLiteral");
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "NumberLiteral") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isRegexLiteral(node, opts) {
      console.trace("The node type RegexLiteral has been renamed to RegExpLiteral");
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "RegexLiteral") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isRestProperty(node, opts) {
      console.trace("The node type RestProperty has been renamed to RestElement");
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "RestProperty") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
    function isSpreadProperty(node, opts) {
      console.trace("The node type SpreadProperty has been renamed to SpreadElement");
      if (!node)
        return false;
      const nodeType = node.type;
      if (nodeType === "SpreadProperty") {
        if (typeof opts === "undefined") {
          return true;
        } else {
          return (0, _shallowEqual.default)(node, opts);
        }
      }
      return false;
    }
  }
});

// node_modules/@babel/types/lib/validators/matchesPattern.js
var require_matchesPattern = __commonJS({
  "node_modules/@babel/types/lib/validators/matchesPattern.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = matchesPattern;
    var _generated = require_generated();
    function matchesPattern(member, match, allowPartial) {
      if (!(0, _generated.isMemberExpression)(member))
        return false;
      const parts = Array.isArray(match) ? match : match.split(".");
      const nodes = [];
      let node;
      for (node = member; (0, _generated.isMemberExpression)(node); node = node.object) {
        nodes.push(node.property);
      }
      nodes.push(node);
      if (nodes.length < parts.length)
        return false;
      if (!allowPartial && nodes.length > parts.length)
        return false;
      for (let i = 0, j = nodes.length - 1; i < parts.length; i++, j--) {
        const node2 = nodes[j];
        let value;
        if ((0, _generated.isIdentifier)(node2)) {
          value = node2.name;
        } else if ((0, _generated.isStringLiteral)(node2)) {
          value = node2.value;
        } else if ((0, _generated.isThisExpression)(node2)) {
          value = "this";
        } else {
          return false;
        }
        if (parts[i] !== value)
          return false;
      }
      return true;
    }
  }
});

// node_modules/@babel/types/lib/validators/buildMatchMemberExpression.js
var require_buildMatchMemberExpression = __commonJS({
  "node_modules/@babel/types/lib/validators/buildMatchMemberExpression.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = buildMatchMemberExpression;
    var _matchesPattern = require_matchesPattern();
    function buildMatchMemberExpression(match, allowPartial) {
      const parts = match.split(".");
      return (member) => (0, _matchesPattern.default)(member, parts, allowPartial);
    }
  }
});

// node_modules/@babel/types/lib/validators/react/isReactComponent.js
var require_isReactComponent = __commonJS({
  "node_modules/@babel/types/lib/validators/react/isReactComponent.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _buildMatchMemberExpression = require_buildMatchMemberExpression();
    var isReactComponent = (0, _buildMatchMemberExpression.default)("React.Component");
    var _default = isReactComponent;
    exports2.default = _default;
  }
});

// node_modules/@babel/types/lib/validators/react/isCompatTag.js
var require_isCompatTag = __commonJS({
  "node_modules/@babel/types/lib/validators/react/isCompatTag.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isCompatTag;
    function isCompatTag(tagName) {
      return !!tagName && /^[a-z]/.test(tagName);
    }
  }
});

// node_modules/to-fast-properties/index.js
var require_to_fast_properties = __commonJS({
  "node_modules/to-fast-properties/index.js"(exports2, module2) {
    "use strict";
    var fastProto = null;
    function FastObject(o) {
      if (fastProto !== null && typeof fastProto.property) {
        const result = fastProto;
        fastProto = FastObject.prototype = null;
        return result;
      }
      fastProto = FastObject.prototype = o == null ? /* @__PURE__ */ Object.create(null) : o;
      return new FastObject();
    }
    FastObject();
    module2.exports = function toFastproperties(o) {
      return FastObject(o);
    };
  }
});

// node_modules/@babel/types/lib/validators/isType.js
var require_isType = __commonJS({
  "node_modules/@babel/types/lib/validators/isType.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isType;
    var _definitions = require_definitions();
    function isType(nodeType, targetType) {
      if (nodeType === targetType)
        return true;
      if (_definitions.ALIAS_KEYS[targetType])
        return false;
      const aliases = _definitions.FLIPPED_ALIAS_KEYS[targetType];
      if (aliases) {
        if (aliases[0] === nodeType)
          return true;
        for (const alias of aliases) {
          if (nodeType === alias)
            return true;
        }
      }
      return false;
    }
  }
});

// node_modules/@babel/types/lib/validators/isPlaceholderType.js
var require_isPlaceholderType = __commonJS({
  "node_modules/@babel/types/lib/validators/isPlaceholderType.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isPlaceholderType;
    var _definitions = require_definitions();
    function isPlaceholderType(placeholderType, targetType) {
      if (placeholderType === targetType)
        return true;
      const aliases = _definitions.PLACEHOLDERS_ALIAS[placeholderType];
      if (aliases) {
        for (const alias of aliases) {
          if (targetType === alias)
            return true;
        }
      }
      return false;
    }
  }
});

// node_modules/@babel/types/lib/validators/is.js
var require_is = __commonJS({
  "node_modules/@babel/types/lib/validators/is.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = is;
    var _shallowEqual = require_shallowEqual();
    var _isType = require_isType();
    var _isPlaceholderType = require_isPlaceholderType();
    var _definitions = require_definitions();
    function is(type, node, opts) {
      if (!node)
        return false;
      const matches = (0, _isType.default)(node.type, type);
      if (!matches) {
        if (!opts && node.type === "Placeholder" && type in _definitions.FLIPPED_ALIAS_KEYS) {
          return (0, _isPlaceholderType.default)(node.expectedNode, type);
        }
        return false;
      }
      if (typeof opts === "undefined") {
        return true;
      } else {
        return (0, _shallowEqual.default)(node, opts);
      }
    }
  }
});

// node_modules/@babel/helper-validator-identifier/lib/identifier.js
var require_identifier = __commonJS({
  "node_modules/@babel/helper-validator-identifier/lib/identifier.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.isIdentifierChar = isIdentifierChar;
    exports2.isIdentifierName = isIdentifierName;
    exports2.isIdentifierStart = isIdentifierStart;
    var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
    var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F";
    var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
    var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
    var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938, 6, 4191];
    var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
    function isInAstralSet(code, set) {
      let pos = 65536;
      for (let i = 0, length = set.length; i < length; i += 2) {
        pos += set[i];
        if (pos > code)
          return false;
        pos += set[i + 1];
        if (pos >= code)
          return true;
      }
      return false;
    }
    function isIdentifierStart(code) {
      if (code < 65)
        return code === 36;
      if (code <= 90)
        return true;
      if (code < 97)
        return code === 95;
      if (code <= 122)
        return true;
      if (code <= 65535) {
        return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
      }
      return isInAstralSet(code, astralIdentifierStartCodes);
    }
    function isIdentifierChar(code) {
      if (code < 48)
        return code === 36;
      if (code < 58)
        return true;
      if (code < 65)
        return false;
      if (code <= 90)
        return true;
      if (code < 97)
        return code === 95;
      if (code <= 122)
        return true;
      if (code <= 65535) {
        return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
      }
      return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
    }
    function isIdentifierName(name) {
      let isFirst = true;
      for (let i = 0; i < name.length; i++) {
        let cp = name.charCodeAt(i);
        if ((cp & 64512) === 55296 && i + 1 < name.length) {
          const trail = name.charCodeAt(++i);
          if ((trail & 64512) === 56320) {
            cp = 65536 + ((cp & 1023) << 10) + (trail & 1023);
          }
        }
        if (isFirst) {
          isFirst = false;
          if (!isIdentifierStart(cp)) {
            return false;
          }
        } else if (!isIdentifierChar(cp)) {
          return false;
        }
      }
      return !isFirst;
    }
  }
});

// node_modules/@babel/helper-validator-identifier/lib/keyword.js
var require_keyword = __commonJS({
  "node_modules/@babel/helper-validator-identifier/lib/keyword.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.isKeyword = isKeyword;
    exports2.isReservedWord = isReservedWord;
    exports2.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord;
    exports2.isStrictBindReservedWord = isStrictBindReservedWord;
    exports2.isStrictReservedWord = isStrictReservedWord;
    var reservedWords = {
      keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"],
      strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"],
      strictBind: ["eval", "arguments"]
    };
    var keywords = new Set(reservedWords.keyword);
    var reservedWordsStrictSet = new Set(reservedWords.strict);
    var reservedWordsStrictBindSet = new Set(reservedWords.strictBind);
    function isReservedWord(word, inModule) {
      return inModule && word === "await" || word === "enum";
    }
    function isStrictReservedWord(word, inModule) {
      return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
    }
    function isStrictBindOnlyReservedWord(word) {
      return reservedWordsStrictBindSet.has(word);
    }
    function isStrictBindReservedWord(word, inModule) {
      return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
    }
    function isKeyword(word) {
      return keywords.has(word);
    }
  }
});

// node_modules/@babel/helper-validator-identifier/lib/index.js
var require_lib = __commonJS({
  "node_modules/@babel/helper-validator-identifier/lib/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "isIdentifierChar", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierChar;
      }
    });
    Object.defineProperty(exports2, "isIdentifierName", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierName;
      }
    });
    Object.defineProperty(exports2, "isIdentifierStart", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierStart;
      }
    });
    Object.defineProperty(exports2, "isKeyword", {
      enumerable: true,
      get: function() {
        return _keyword.isKeyword;
      }
    });
    Object.defineProperty(exports2, "isReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isReservedWord;
      }
    });
    Object.defineProperty(exports2, "isStrictBindOnlyReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictBindOnlyReservedWord;
      }
    });
    Object.defineProperty(exports2, "isStrictBindReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictBindReservedWord;
      }
    });
    Object.defineProperty(exports2, "isStrictReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictReservedWord;
      }
    });
    var _identifier = require_identifier();
    var _keyword = require_keyword();
  }
});

// node_modules/@babel/types/lib/validators/isValidIdentifier.js
var require_isValidIdentifier = __commonJS({
  "node_modules/@babel/types/lib/validators/isValidIdentifier.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isValidIdentifier;
    var _helperValidatorIdentifier = require_lib();
    function isValidIdentifier(name, reserved = true) {
      if (typeof name !== "string")
        return false;
      if (reserved) {
        if ((0, _helperValidatorIdentifier.isKeyword)(name) || (0, _helperValidatorIdentifier.isStrictReservedWord)(name, true)) {
          return false;
        }
      }
      return (0, _helperValidatorIdentifier.isIdentifierName)(name);
    }
  }
});

// node_modules/@babel/helper-string-parser/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/@babel/helper-string-parser/lib/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.readCodePoint = readCodePoint;
    exports2.readInt = readInt;
    exports2.readStringContents = readStringContents;
    var _isDigit = function isDigit(code) {
      return code >= 48 && code <= 57;
    };
    var forbiddenNumericSeparatorSiblings = {
      decBinOct: /* @__PURE__ */ new Set([46, 66, 69, 79, 95, 98, 101, 111]),
      hex: /* @__PURE__ */ new Set([46, 88, 95, 120])
    };
    var isAllowedNumericSeparatorSibling = {
      bin: (ch) => ch === 48 || ch === 49,
      oct: (ch) => ch >= 48 && ch <= 55,
      dec: (ch) => ch >= 48 && ch <= 57,
      hex: (ch) => ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102
    };
    function readStringContents(type, input, pos, lineStart, curLine, errors) {
      const initialPos = pos;
      const initialLineStart = lineStart;
      const initialCurLine = curLine;
      let out = "";
      let containsInvalid = false;
      let chunkStart = pos;
      const {
        length
      } = input;
      for (; ; ) {
        if (pos >= length) {
          errors.unterminated(initialPos, initialLineStart, initialCurLine);
          out += input.slice(chunkStart, pos);
          break;
        }
        const ch = input.charCodeAt(pos);
        if (isStringEnd(type, ch, input, pos)) {
          out += input.slice(chunkStart, pos);
          break;
        }
        if (ch === 92) {
          out += input.slice(chunkStart, pos);
          let escaped;
          ({
            ch: escaped,
            pos,
            lineStart,
            curLine
          } = readEscapedChar(input, pos, lineStart, curLine, type === "template", errors));
          if (escaped === null) {
            containsInvalid = true;
          } else {
            out += escaped;
          }
          chunkStart = pos;
        } else if (ch === 8232 || ch === 8233) {
          ++pos;
          ++curLine;
          lineStart = pos;
        } else if (ch === 10 || ch === 13) {
          if (type === "template") {
            out += input.slice(chunkStart, pos) + "\n";
            ++pos;
            if (ch === 13 && input.charCodeAt(pos) === 10) {
              ++pos;
            }
            ++curLine;
            chunkStart = lineStart = pos;
          } else {
            errors.unterminated(initialPos, initialLineStart, initialCurLine);
          }
        } else {
          ++pos;
        }
      }
      return {
        pos,
        str: out,
        containsInvalid,
        lineStart,
        curLine
      };
    }
    function isStringEnd(type, ch, input, pos) {
      if (type === "template") {
        return ch === 96 || ch === 36 && input.charCodeAt(pos + 1) === 123;
      }
      return ch === (type === "double" ? 34 : 39);
    }
    function readEscapedChar(input, pos, lineStart, curLine, inTemplate, errors) {
      const throwOnInvalid = !inTemplate;
      pos++;
      const res = (ch2) => ({
        pos,
        ch: ch2,
        lineStart,
        curLine
      });
      const ch = input.charCodeAt(pos++);
      switch (ch) {
        case 110:
          return res("\n");
        case 114:
          return res("\r");
        case 120: {
          let code;
          ({
            code,
            pos
          } = readHexChar(input, pos, lineStart, curLine, 2, false, throwOnInvalid, errors));
          return res(code === null ? null : String.fromCharCode(code));
        }
        case 117: {
          let code;
          ({
            code,
            pos
          } = readCodePoint(input, pos, lineStart, curLine, throwOnInvalid, errors));
          return res(code === null ? null : String.fromCodePoint(code));
        }
        case 116:
          return res("	");
        case 98:
          return res("\b");
        case 118:
          return res("\v");
        case 102:
          return res("\f");
        case 13:
          if (input.charCodeAt(pos) === 10) {
            ++pos;
          }
        case 10:
          lineStart = pos;
          ++curLine;
        case 8232:
        case 8233:
          return res("");
        case 56:
        case 57:
          if (inTemplate) {
            return res(null);
          } else {
            errors.strictNumericEscape(pos - 1, lineStart, curLine);
          }
        default:
          if (ch >= 48 && ch <= 55) {
            const startPos = pos - 1;
            const match = input.slice(startPos, pos + 2).match(/^[0-7]+/);
            let octalStr = match[0];
            let octal = parseInt(octalStr, 8);
            if (octal > 255) {
              octalStr = octalStr.slice(0, -1);
              octal = parseInt(octalStr, 8);
            }
            pos += octalStr.length - 1;
            const next = input.charCodeAt(pos);
            if (octalStr !== "0" || next === 56 || next === 57) {
              if (inTemplate) {
                return res(null);
              } else {
                errors.strictNumericEscape(startPos, lineStart, curLine);
              }
            }
            return res(String.fromCharCode(octal));
          }
          return res(String.fromCharCode(ch));
      }
    }
    function readHexChar(input, pos, lineStart, curLine, len, forceLen, throwOnInvalid, errors) {
      const initialPos = pos;
      let n;
      ({
        n,
        pos
      } = readInt(input, pos, lineStart, curLine, 16, len, forceLen, false, errors));
      if (n === null) {
        if (throwOnInvalid) {
          errors.invalidEscapeSequence(initialPos, lineStart, curLine);
        } else {
          pos = initialPos - 1;
        }
      }
      return {
        code: n,
        pos
      };
    }
    function readInt(input, pos, lineStart, curLine, radix, len, forceLen, allowNumSeparator, errors) {
      const start = pos;
      const forbiddenSiblings = radix === 16 ? forbiddenNumericSeparatorSiblings.hex : forbiddenNumericSeparatorSiblings.decBinOct;
      const isAllowedSibling = radix === 16 ? isAllowedNumericSeparatorSibling.hex : radix === 10 ? isAllowedNumericSeparatorSibling.dec : radix === 8 ? isAllowedNumericSeparatorSibling.oct : isAllowedNumericSeparatorSibling.bin;
      let invalid = false;
      let total = 0;
      for (let i = 0, e = len == null ? Infinity : len; i < e; ++i) {
        const code = input.charCodeAt(pos);
        let val;
        if (code === 95 && allowNumSeparator !== "bail") {
          const prev = input.charCodeAt(pos - 1);
          const next = input.charCodeAt(pos + 1);
          if (!allowNumSeparator) {
            errors.numericSeparatorInEscapeSequence(pos, lineStart, curLine);
          } else if (Number.isNaN(next) || !isAllowedSibling(next) || forbiddenSiblings.has(prev) || forbiddenSiblings.has(next)) {
            errors.unexpectedNumericSeparator(pos, lineStart, curLine);
          }
          ++pos;
          continue;
        }
        if (code >= 97) {
          val = code - 97 + 10;
        } else if (code >= 65) {
          val = code - 65 + 10;
        } else if (_isDigit(code)) {
          val = code - 48;
        } else {
          val = Infinity;
        }
        if (val >= radix) {
          if (val <= 9 && errors.invalidDigit(pos, lineStart, curLine, radix)) {
            val = 0;
          } else if (forceLen) {
            val = 0;
            invalid = true;
          } else {
            break;
          }
        }
        ++pos;
        total = total * radix + val;
      }
      if (pos === start || len != null && pos - start !== len || invalid) {
        return {
          n: null,
          pos
        };
      }
      return {
        n: total,
        pos
      };
    }
    function readCodePoint(input, pos, lineStart, curLine, throwOnInvalid, errors) {
      const ch = input.charCodeAt(pos);
      let code;
      if (ch === 123) {
        ++pos;
        ({
          code,
          pos
        } = readHexChar(input, pos, lineStart, curLine, input.indexOf("}", pos) - pos, true, throwOnInvalid, errors));
        ++pos;
        if (code !== null && code > 1114111) {
          if (throwOnInvalid) {
            errors.invalidCodePoint(pos, lineStart, curLine);
          } else {
            return {
              code: null,
              pos
            };
          }
        }
      } else {
        ({
          code,
          pos
        } = readHexChar(input, pos, lineStart, curLine, 4, false, throwOnInvalid, errors));
      }
      return {
        code,
        pos
      };
    }
  }
});

// node_modules/@babel/types/lib/constants/index.js
var require_constants = __commonJS({
  "node_modules/@babel/types/lib/constants/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.UPDATE_OPERATORS = exports2.UNARY_OPERATORS = exports2.STRING_UNARY_OPERATORS = exports2.STATEMENT_OR_BLOCK_KEYS = exports2.NUMBER_UNARY_OPERATORS = exports2.NUMBER_BINARY_OPERATORS = exports2.NOT_LOCAL_BINDING = exports2.LOGICAL_OPERATORS = exports2.INHERIT_KEYS = exports2.FOR_INIT_KEYS = exports2.FLATTENABLE_KEYS = exports2.EQUALITY_BINARY_OPERATORS = exports2.COMPARISON_BINARY_OPERATORS = exports2.COMMENT_KEYS = exports2.BOOLEAN_UNARY_OPERATORS = exports2.BOOLEAN_NUMBER_BINARY_OPERATORS = exports2.BOOLEAN_BINARY_OPERATORS = exports2.BLOCK_SCOPED_SYMBOL = exports2.BINARY_OPERATORS = exports2.ASSIGNMENT_OPERATORS = void 0;
    var STATEMENT_OR_BLOCK_KEYS = ["consequent", "body", "alternate"];
    exports2.STATEMENT_OR_BLOCK_KEYS = STATEMENT_OR_BLOCK_KEYS;
    var FLATTENABLE_KEYS = ["body", "expressions"];
    exports2.FLATTENABLE_KEYS = FLATTENABLE_KEYS;
    var FOR_INIT_KEYS = ["left", "init"];
    exports2.FOR_INIT_KEYS = FOR_INIT_KEYS;
    var COMMENT_KEYS = ["leadingComments", "trailingComments", "innerComments"];
    exports2.COMMENT_KEYS = COMMENT_KEYS;
    var LOGICAL_OPERATORS = ["||", "&&", "??"];
    exports2.LOGICAL_OPERATORS = LOGICAL_OPERATORS;
    var UPDATE_OPERATORS = ["++", "--"];
    exports2.UPDATE_OPERATORS = UPDATE_OPERATORS;
    var BOOLEAN_NUMBER_BINARY_OPERATORS = [">", "<", ">=", "<="];
    exports2.BOOLEAN_NUMBER_BINARY_OPERATORS = BOOLEAN_NUMBER_BINARY_OPERATORS;
    var EQUALITY_BINARY_OPERATORS = ["==", "===", "!=", "!=="];
    exports2.EQUALITY_BINARY_OPERATORS = EQUALITY_BINARY_OPERATORS;
    var COMPARISON_BINARY_OPERATORS = [...EQUALITY_BINARY_OPERATORS, "in", "instanceof"];
    exports2.COMPARISON_BINARY_OPERATORS = COMPARISON_BINARY_OPERATORS;
    var BOOLEAN_BINARY_OPERATORS = [...COMPARISON_BINARY_OPERATORS, ...BOOLEAN_NUMBER_BINARY_OPERATORS];
    exports2.BOOLEAN_BINARY_OPERATORS = BOOLEAN_BINARY_OPERATORS;
    var NUMBER_BINARY_OPERATORS = ["-", "/", "%", "*", "**", "&", "|", ">>", ">>>", "<<", "^"];
    exports2.NUMBER_BINARY_OPERATORS = NUMBER_BINARY_OPERATORS;
    var BINARY_OPERATORS = ["+", ...NUMBER_BINARY_OPERATORS, ...BOOLEAN_BINARY_OPERATORS, "|>"];
    exports2.BINARY_OPERATORS = BINARY_OPERATORS;
    var ASSIGNMENT_OPERATORS = ["=", "+=", ...NUMBER_BINARY_OPERATORS.map((op) => op + "="), ...LOGICAL_OPERATORS.map((op) => op + "=")];
    exports2.ASSIGNMENT_OPERATORS = ASSIGNMENT_OPERATORS;
    var BOOLEAN_UNARY_OPERATORS = ["delete", "!"];
    exports2.BOOLEAN_UNARY_OPERATORS = BOOLEAN_UNARY_OPERATORS;
    var NUMBER_UNARY_OPERATORS = ["+", "-", "~"];
    exports2.NUMBER_UNARY_OPERATORS = NUMBER_UNARY_OPERATORS;
    var STRING_UNARY_OPERATORS = ["typeof"];
    exports2.STRING_UNARY_OPERATORS = STRING_UNARY_OPERATORS;
    var UNARY_OPERATORS = ["void", "throw", ...BOOLEAN_UNARY_OPERATORS, ...NUMBER_UNARY_OPERATORS, ...STRING_UNARY_OPERATORS];
    exports2.UNARY_OPERATORS = UNARY_OPERATORS;
    var INHERIT_KEYS = {
      optional: ["typeAnnotation", "typeParameters", "returnType"],
      force: ["start", "loc", "end"]
    };
    exports2.INHERIT_KEYS = INHERIT_KEYS;
    var BLOCK_SCOPED_SYMBOL = Symbol.for("var used to be block scoped");
    exports2.BLOCK_SCOPED_SYMBOL = BLOCK_SCOPED_SYMBOL;
    var NOT_LOCAL_BINDING = Symbol.for("should not be considered a local binding");
    exports2.NOT_LOCAL_BINDING = NOT_LOCAL_BINDING;
  }
});

// node_modules/@babel/types/lib/definitions/utils.js
var require_utils = __commonJS({
  "node_modules/@babel/types/lib/definitions/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.VISITOR_KEYS = exports2.NODE_PARENT_VALIDATIONS = exports2.NODE_FIELDS = exports2.FLIPPED_ALIAS_KEYS = exports2.DEPRECATED_KEYS = exports2.BUILDER_KEYS = exports2.ALIAS_KEYS = void 0;
    exports2.arrayOf = arrayOf;
    exports2.arrayOfType = arrayOfType;
    exports2.assertEach = assertEach;
    exports2.assertNodeOrValueType = assertNodeOrValueType;
    exports2.assertNodeType = assertNodeType;
    exports2.assertOneOf = assertOneOf;
    exports2.assertOptionalChainStart = assertOptionalChainStart;
    exports2.assertShape = assertShape;
    exports2.assertValueType = assertValueType;
    exports2.chain = chain;
    exports2.default = defineType;
    exports2.defineAliasedType = defineAliasedType;
    exports2.typeIs = typeIs;
    exports2.validate = validate;
    exports2.validateArrayOfType = validateArrayOfType;
    exports2.validateOptional = validateOptional;
    exports2.validateOptionalType = validateOptionalType;
    exports2.validateType = validateType;
    var _is = require_is();
    var _validate = require_validate();
    var VISITOR_KEYS = {};
    exports2.VISITOR_KEYS = VISITOR_KEYS;
    var ALIAS_KEYS = {};
    exports2.ALIAS_KEYS = ALIAS_KEYS;
    var FLIPPED_ALIAS_KEYS = {};
    exports2.FLIPPED_ALIAS_KEYS = FLIPPED_ALIAS_KEYS;
    var NODE_FIELDS = {};
    exports2.NODE_FIELDS = NODE_FIELDS;
    var BUILDER_KEYS = {};
    exports2.BUILDER_KEYS = BUILDER_KEYS;
    var DEPRECATED_KEYS = {};
    exports2.DEPRECATED_KEYS = DEPRECATED_KEYS;
    var NODE_PARENT_VALIDATIONS = {};
    exports2.NODE_PARENT_VALIDATIONS = NODE_PARENT_VALIDATIONS;
    function getType(val) {
      if (Array.isArray(val)) {
        return "array";
      } else if (val === null) {
        return "null";
      } else {
        return typeof val;
      }
    }
    function validate(validate2) {
      return {
        validate: validate2
      };
    }
    function typeIs(typeName) {
      return typeof typeName === "string" ? assertNodeType(typeName) : assertNodeType(...typeName);
    }
    function validateType(typeName) {
      return validate(typeIs(typeName));
    }
    function validateOptional(validate2) {
      return {
        validate: validate2,
        optional: true
      };
    }
    function validateOptionalType(typeName) {
      return {
        validate: typeIs(typeName),
        optional: true
      };
    }
    function arrayOf(elementType) {
      return chain(assertValueType("array"), assertEach(elementType));
    }
    function arrayOfType(typeName) {
      return arrayOf(typeIs(typeName));
    }
    function validateArrayOfType(typeName) {
      return validate(arrayOfType(typeName));
    }
    function assertEach(callback) {
      function validator(node, key, val) {
        if (!Array.isArray(val))
          return;
        for (let i = 0; i < val.length; i++) {
          const subkey = `${key}[${i}]`;
          const v = val[i];
          callback(node, subkey, v);
          if (process.env.BABEL_TYPES_8_BREAKING)
            (0, _validate.validateChild)(node, subkey, v);
        }
      }
      validator.each = callback;
      return validator;
    }
    function assertOneOf(...values) {
      function validate2(node, key, val) {
        if (values.indexOf(val) < 0) {
          throw new TypeError(`Property ${key} expected value to be one of ${JSON.stringify(values)} but got ${JSON.stringify(val)}`);
        }
      }
      validate2.oneOf = values;
      return validate2;
    }
    function assertNodeType(...types) {
      function validate2(node, key, val) {
        for (const type of types) {
          if ((0, _is.default)(type, val)) {
            (0, _validate.validateChild)(node, key, val);
            return;
          }
        }
        throw new TypeError(`Property ${key} of ${node.type} expected node to be of a type ${JSON.stringify(types)} but instead got ${JSON.stringify(val == null ? void 0 : val.type)}`);
      }
      validate2.oneOfNodeTypes = types;
      return validate2;
    }
    function assertNodeOrValueType(...types) {
      function validate2(node, key, val) {
        for (const type of types) {
          if (getType(val) === type || (0, _is.default)(type, val)) {
            (0, _validate.validateChild)(node, key, val);
            return;
          }
        }
        throw new TypeError(`Property ${key} of ${node.type} expected node to be of a type ${JSON.stringify(types)} but instead got ${JSON.stringify(val == null ? void 0 : val.type)}`);
      }
      validate2.oneOfNodeOrValueTypes = types;
      return validate2;
    }
    function assertValueType(type) {
      function validate2(node, key, val) {
        const valid = getType(val) === type;
        if (!valid) {
          throw new TypeError(`Property ${key} expected type of ${type} but got ${getType(val)}`);
        }
      }
      validate2.type = type;
      return validate2;
    }
    function assertShape(shape) {
      function validate2(node, key, val) {
        const errors = [];
        for (const property of Object.keys(shape)) {
          try {
            (0, _validate.validateField)(node, property, val[property], shape[property]);
          } catch (error) {
            if (error instanceof TypeError) {
              errors.push(error.message);
              continue;
            }
            throw error;
          }
        }
        if (errors.length) {
          throw new TypeError(`Property ${key} of ${node.type} expected to have the following:
${errors.join("\n")}`);
        }
      }
      validate2.shapeOf = shape;
      return validate2;
    }
    function assertOptionalChainStart() {
      function validate2(node) {
        var _current;
        let current = node;
        while (node) {
          const {
            type
          } = current;
          if (type === "OptionalCallExpression") {
            if (current.optional)
              return;
            current = current.callee;
            continue;
          }
          if (type === "OptionalMemberExpression") {
            if (current.optional)
              return;
            current = current.object;
            continue;
          }
          break;
        }
        throw new TypeError(`Non-optional ${node.type} must chain from an optional OptionalMemberExpression or OptionalCallExpression. Found chain from ${(_current = current) == null ? void 0 : _current.type}`);
      }
      return validate2;
    }
    function chain(...fns) {
      function validate2(...args2) {
        for (const fn of fns) {
          fn(...args2);
        }
      }
      validate2.chainOf = fns;
      if (fns.length >= 2 && "type" in fns[0] && fns[0].type === "array" && !("each" in fns[1])) {
        throw new Error(`An assertValueType("array") validator can only be followed by an assertEach(...) validator.`);
      }
      return validate2;
    }
    var validTypeOpts = ["aliases", "builder", "deprecatedAlias", "fields", "inherits", "visitor", "validate"];
    var validFieldKeys = ["default", "optional", "validate"];
    function defineAliasedType(...aliases) {
      return (type, opts = {}) => {
        let defined = opts.aliases;
        if (!defined) {
          var _store$opts$inherits$, _defined;
          if (opts.inherits)
            defined = (_store$opts$inherits$ = store[opts.inherits].aliases) == null ? void 0 : _store$opts$inherits$.slice();
          (_defined = defined) != null ? _defined : defined = [];
          opts.aliases = defined;
        }
        const additional = aliases.filter((a) => !defined.includes(a));
        defined.unshift(...additional);
        return defineType(type, opts);
      };
    }
    function defineType(type, opts = {}) {
      const inherits = opts.inherits && store[opts.inherits] || {};
      let fields = opts.fields;
      if (!fields) {
        fields = {};
        if (inherits.fields) {
          const keys = Object.getOwnPropertyNames(inherits.fields);
          for (const key of keys) {
            const field = inherits.fields[key];
            const def = field.default;
            if (Array.isArray(def) ? def.length > 0 : def && typeof def === "object") {
              throw new Error("field defaults can only be primitives or empty arrays currently");
            }
            fields[key] = {
              default: Array.isArray(def) ? [] : def,
              optional: field.optional,
              validate: field.validate
            };
          }
        }
      }
      const visitor = opts.visitor || inherits.visitor || [];
      const aliases = opts.aliases || inherits.aliases || [];
      const builder = opts.builder || inherits.builder || opts.visitor || [];
      for (const k of Object.keys(opts)) {
        if (validTypeOpts.indexOf(k) === -1) {
          throw new Error(`Unknown type option "${k}" on ${type}`);
        }
      }
      if (opts.deprecatedAlias) {
        DEPRECATED_KEYS[opts.deprecatedAlias] = type;
      }
      for (const key of visitor.concat(builder)) {
        fields[key] = fields[key] || {};
      }
      for (const key of Object.keys(fields)) {
        const field = fields[key];
        if (field.default !== void 0 && builder.indexOf(key) === -1) {
          field.optional = true;
        }
        if (field.default === void 0) {
          field.default = null;
        } else if (!field.validate && field.default != null) {
          field.validate = assertValueType(getType(field.default));
        }
        for (const k of Object.keys(field)) {
          if (validFieldKeys.indexOf(k) === -1) {
            throw new Error(`Unknown field key "${k}" on ${type}.${key}`);
          }
        }
      }
      VISITOR_KEYS[type] = opts.visitor = visitor;
      BUILDER_KEYS[type] = opts.builder = builder;
      NODE_FIELDS[type] = opts.fields = fields;
      ALIAS_KEYS[type] = opts.aliases = aliases;
      aliases.forEach((alias) => {
        FLIPPED_ALIAS_KEYS[alias] = FLIPPED_ALIAS_KEYS[alias] || [];
        FLIPPED_ALIAS_KEYS[alias].push(type);
      });
      if (opts.validate) {
        NODE_PARENT_VALIDATIONS[type] = opts.validate;
      }
      store[type] = opts;
    }
    var store = {};
  }
});

// node_modules/@babel/types/lib/definitions/core.js
var require_core = __commonJS({
  "node_modules/@babel/types/lib/definitions/core.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.patternLikeCommon = exports2.functionTypeAnnotationCommon = exports2.functionDeclarationCommon = exports2.functionCommon = exports2.classMethodOrPropertyCommon = exports2.classMethodOrDeclareMethodCommon = void 0;
    var _is = require_is();
    var _isValidIdentifier = require_isValidIdentifier();
    var _helperValidatorIdentifier = require_lib();
    var _helperStringParser = require_lib2();
    var _constants = require_constants();
    var _utils = require_utils();
    var defineType = (0, _utils.defineAliasedType)("Standardized");
    defineType("ArrayExpression", {
      fields: {
        elements: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeOrValueType)("null", "Expression", "SpreadElement"))),
          default: !process.env.BABEL_TYPES_8_BREAKING ? [] : void 0
        }
      },
      visitor: ["elements"],
      aliases: ["Expression"]
    });
    defineType("AssignmentExpression", {
      fields: {
        operator: {
          validate: function() {
            if (!process.env.BABEL_TYPES_8_BREAKING) {
              return (0, _utils.assertValueType)("string");
            }
            const identifier = (0, _utils.assertOneOf)(..._constants.ASSIGNMENT_OPERATORS);
            const pattern = (0, _utils.assertOneOf)("=");
            return function(node, key, val) {
              const validator = (0, _is.default)("Pattern", node.left) ? pattern : identifier;
              validator(node, key, val);
            };
          }()
        },
        left: {
          validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("LVal") : (0, _utils.assertNodeType)("Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern", "TSAsExpression", "TSTypeAssertion", "TSNonNullExpression")
        },
        right: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      },
      builder: ["operator", "left", "right"],
      visitor: ["left", "right"],
      aliases: ["Expression"]
    });
    defineType("BinaryExpression", {
      builder: ["operator", "left", "right"],
      fields: {
        operator: {
          validate: (0, _utils.assertOneOf)(..._constants.BINARY_OPERATORS)
        },
        left: {
          validate: function() {
            const expression = (0, _utils.assertNodeType)("Expression");
            const inOp = (0, _utils.assertNodeType)("Expression", "PrivateName");
            const validator = Object.assign(function(node, key, val) {
              const validator2 = node.operator === "in" ? inOp : expression;
              validator2(node, key, val);
            }, {
              oneOfNodeTypes: ["Expression", "PrivateName"]
            });
            return validator;
          }()
        },
        right: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      },
      visitor: ["left", "right"],
      aliases: ["Binary", "Expression"]
    });
    defineType("InterpreterDirective", {
      builder: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("string")
        }
      }
    });
    defineType("Directive", {
      visitor: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertNodeType)("DirectiveLiteral")
        }
      }
    });
    defineType("DirectiveLiteral", {
      builder: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("string")
        }
      }
    });
    defineType("BlockStatement", {
      builder: ["body", "directives"],
      visitor: ["directives", "body"],
      fields: {
        directives: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Directive"))),
          default: []
        },
        body: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Statement")))
        }
      },
      aliases: ["Scopable", "BlockParent", "Block", "Statement"]
    });
    defineType("BreakStatement", {
      visitor: ["label"],
      fields: {
        label: {
          validate: (0, _utils.assertNodeType)("Identifier"),
          optional: true
        }
      },
      aliases: ["Statement", "Terminatorless", "CompletionStatement"]
    });
    defineType("CallExpression", {
      visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
      builder: ["callee", "arguments"],
      aliases: ["Expression"],
      fields: Object.assign({
        callee: {
          validate: (0, _utils.assertNodeType)("Expression", "Super", "V8IntrinsicIdentifier")
        },
        arguments: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression", "SpreadElement", "JSXNamespacedName", "ArgumentPlaceholder")))
        }
      }, !process.env.BABEL_TYPES_8_BREAKING ? {
        optional: {
          validate: (0, _utils.assertOneOf)(true, false),
          optional: true
        }
      } : {}, {
        typeArguments: {
          validate: (0, _utils.assertNodeType)("TypeParameterInstantiation"),
          optional: true
        },
        typeParameters: {
          validate: (0, _utils.assertNodeType)("TSTypeParameterInstantiation"),
          optional: true
        }
      })
    });
    defineType("CatchClause", {
      visitor: ["param", "body"],
      fields: {
        param: {
          validate: (0, _utils.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern"),
          optional: true
        },
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement")
        }
      },
      aliases: ["Scopable", "BlockParent"]
    });
    defineType("ConditionalExpression", {
      visitor: ["test", "consequent", "alternate"],
      fields: {
        test: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        consequent: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        alternate: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      },
      aliases: ["Expression", "Conditional"]
    });
    defineType("ContinueStatement", {
      visitor: ["label"],
      fields: {
        label: {
          validate: (0, _utils.assertNodeType)("Identifier"),
          optional: true
        }
      },
      aliases: ["Statement", "Terminatorless", "CompletionStatement"]
    });
    defineType("DebuggerStatement", {
      aliases: ["Statement"]
    });
    defineType("DoWhileStatement", {
      visitor: ["test", "body"],
      fields: {
        test: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        body: {
          validate: (0, _utils.assertNodeType)("Statement")
        }
      },
      aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
    });
    defineType("EmptyStatement", {
      aliases: ["Statement"]
    });
    defineType("ExpressionStatement", {
      visitor: ["expression"],
      fields: {
        expression: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      },
      aliases: ["Statement", "ExpressionWrapper"]
    });
    defineType("File", {
      builder: ["program", "comments", "tokens"],
      visitor: ["program"],
      fields: {
        program: {
          validate: (0, _utils.assertNodeType)("Program")
        },
        comments: {
          validate: !process.env.BABEL_TYPES_8_BREAKING ? Object.assign(() => {
          }, {
            each: {
              oneOfNodeTypes: ["CommentBlock", "CommentLine"]
            }
          }) : (0, _utils.assertEach)((0, _utils.assertNodeType)("CommentBlock", "CommentLine")),
          optional: true
        },
        tokens: {
          validate: (0, _utils.assertEach)(Object.assign(() => {
          }, {
            type: "any"
          })),
          optional: true
        }
      }
    });
    defineType("ForInStatement", {
      visitor: ["left", "right", "body"],
      aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
      fields: {
        left: {
          validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("VariableDeclaration", "LVal") : (0, _utils.assertNodeType)("VariableDeclaration", "Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern", "TSAsExpression", "TSTypeAssertion", "TSNonNullExpression")
        },
        right: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        body: {
          validate: (0, _utils.assertNodeType)("Statement")
        }
      }
    });
    defineType("ForStatement", {
      visitor: ["init", "test", "update", "body"],
      aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop"],
      fields: {
        init: {
          validate: (0, _utils.assertNodeType)("VariableDeclaration", "Expression"),
          optional: true
        },
        test: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        },
        update: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        },
        body: {
          validate: (0, _utils.assertNodeType)("Statement")
        }
      }
    });
    var functionCommon = () => ({
      params: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Identifier", "Pattern", "RestElement")))
      },
      generator: {
        default: false
      },
      async: {
        default: false
      }
    });
    exports2.functionCommon = functionCommon;
    var functionTypeAnnotationCommon = () => ({
      returnType: {
        validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
        optional: true
      },
      typeParameters: {
        validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
        optional: true
      }
    });
    exports2.functionTypeAnnotationCommon = functionTypeAnnotationCommon;
    var functionDeclarationCommon = () => Object.assign({}, functionCommon(), {
      declare: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: true
      },
      id: {
        validate: (0, _utils.assertNodeType)("Identifier"),
        optional: true
      }
    });
    exports2.functionDeclarationCommon = functionDeclarationCommon;
    defineType("FunctionDeclaration", {
      builder: ["id", "params", "body", "generator", "async"],
      visitor: ["id", "params", "body", "returnType", "typeParameters"],
      fields: Object.assign({}, functionDeclarationCommon(), functionTypeAnnotationCommon(), {
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement")
        },
        predicate: {
          validate: (0, _utils.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
          optional: true
        }
      }),
      aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Statement", "Pureish", "Declaration"],
      validate: function() {
        if (!process.env.BABEL_TYPES_8_BREAKING)
          return () => {
          };
        const identifier = (0, _utils.assertNodeType)("Identifier");
        return function(parent, key, node) {
          if (!(0, _is.default)("ExportDefaultDeclaration", parent)) {
            identifier(node, "id", node.id);
          }
        };
      }()
    });
    defineType("FunctionExpression", {
      inherits: "FunctionDeclaration",
      aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish"],
      fields: Object.assign({}, functionCommon(), functionTypeAnnotationCommon(), {
        id: {
          validate: (0, _utils.assertNodeType)("Identifier"),
          optional: true
        },
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement")
        },
        predicate: {
          validate: (0, _utils.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
          optional: true
        }
      })
    });
    var patternLikeCommon = () => ({
      typeAnnotation: {
        validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
        optional: true
      },
      decorators: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
        optional: true
      }
    });
    exports2.patternLikeCommon = patternLikeCommon;
    defineType("Identifier", {
      builder: ["name"],
      visitor: ["typeAnnotation", "decorators"],
      aliases: ["Expression", "PatternLike", "LVal", "TSEntityName"],
      fields: Object.assign({}, patternLikeCommon(), {
        name: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), Object.assign(function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING)
              return;
            if (!(0, _isValidIdentifier.default)(val, false)) {
              throw new TypeError(`"${val}" is not a valid identifier name`);
            }
          }, {
            type: "string"
          }))
        },
        optional: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        }
      }),
      validate(parent, key, node) {
        if (!process.env.BABEL_TYPES_8_BREAKING)
          return;
        const match = /\.(\w+)$/.exec(key);
        if (!match)
          return;
        const [, parentKey] = match;
        const nonComp = {
          computed: false
        };
        if (parentKey === "property") {
          if ((0, _is.default)("MemberExpression", parent, nonComp))
            return;
          if ((0, _is.default)("OptionalMemberExpression", parent, nonComp))
            return;
        } else if (parentKey === "key") {
          if ((0, _is.default)("Property", parent, nonComp))
            return;
          if ((0, _is.default)("Method", parent, nonComp))
            return;
        } else if (parentKey === "exported") {
          if ((0, _is.default)("ExportSpecifier", parent))
            return;
        } else if (parentKey === "imported") {
          if ((0, _is.default)("ImportSpecifier", parent, {
            imported: node
          }))
            return;
        } else if (parentKey === "meta") {
          if ((0, _is.default)("MetaProperty", parent, {
            meta: node
          }))
            return;
        }
        if (((0, _helperValidatorIdentifier.isKeyword)(node.name) || (0, _helperValidatorIdentifier.isReservedWord)(node.name, false)) && node.name !== "this") {
          throw new TypeError(`"${node.name}" is not a valid identifier`);
        }
      }
    });
    defineType("IfStatement", {
      visitor: ["test", "consequent", "alternate"],
      aliases: ["Statement", "Conditional"],
      fields: {
        test: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        consequent: {
          validate: (0, _utils.assertNodeType)("Statement")
        },
        alternate: {
          optional: true,
          validate: (0, _utils.assertNodeType)("Statement")
        }
      }
    });
    defineType("LabeledStatement", {
      visitor: ["label", "body"],
      aliases: ["Statement"],
      fields: {
        label: {
          validate: (0, _utils.assertNodeType)("Identifier")
        },
        body: {
          validate: (0, _utils.assertNodeType)("Statement")
        }
      }
    });
    defineType("StringLiteral", {
      builder: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("string")
        }
      },
      aliases: ["Expression", "Pureish", "Literal", "Immutable"]
    });
    defineType("NumericLiteral", {
      builder: ["value"],
      deprecatedAlias: "NumberLiteral",
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("number")
        }
      },
      aliases: ["Expression", "Pureish", "Literal", "Immutable"]
    });
    defineType("NullLiteral", {
      aliases: ["Expression", "Pureish", "Literal", "Immutable"]
    });
    defineType("BooleanLiteral", {
      builder: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("boolean")
        }
      },
      aliases: ["Expression", "Pureish", "Literal", "Immutable"]
    });
    defineType("RegExpLiteral", {
      builder: ["pattern", "flags"],
      deprecatedAlias: "RegexLiteral",
      aliases: ["Expression", "Pureish", "Literal"],
      fields: {
        pattern: {
          validate: (0, _utils.assertValueType)("string")
        },
        flags: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), Object.assign(function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING)
              return;
            const invalid = /[^gimsuy]/.exec(val);
            if (invalid) {
              throw new TypeError(`"${invalid[0]}" is not a valid RegExp flag`);
            }
          }, {
            type: "string"
          })),
          default: ""
        }
      }
    });
    defineType("LogicalExpression", {
      builder: ["operator", "left", "right"],
      visitor: ["left", "right"],
      aliases: ["Binary", "Expression"],
      fields: {
        operator: {
          validate: (0, _utils.assertOneOf)(..._constants.LOGICAL_OPERATORS)
        },
        left: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        right: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("MemberExpression", {
      builder: ["object", "property", "computed", ...!process.env.BABEL_TYPES_8_BREAKING ? ["optional"] : []],
      visitor: ["object", "property"],
      aliases: ["Expression", "LVal"],
      fields: Object.assign({
        object: {
          validate: (0, _utils.assertNodeType)("Expression", "Super")
        },
        property: {
          validate: function() {
            const normal = (0, _utils.assertNodeType)("Identifier", "PrivateName");
            const computed = (0, _utils.assertNodeType)("Expression");
            const validator = function(node, key, val) {
              const validator2 = node.computed ? computed : normal;
              validator2(node, key, val);
            };
            validator.oneOfNodeTypes = ["Expression", "Identifier", "PrivateName"];
            return validator;
          }()
        },
        computed: {
          default: false
        }
      }, !process.env.BABEL_TYPES_8_BREAKING ? {
        optional: {
          validate: (0, _utils.assertOneOf)(true, false),
          optional: true
        }
      } : {})
    });
    defineType("NewExpression", {
      inherits: "CallExpression"
    });
    defineType("Program", {
      visitor: ["directives", "body"],
      builder: ["body", "directives", "sourceType", "interpreter"],
      fields: {
        sourceFile: {
          validate: (0, _utils.assertValueType)("string")
        },
        sourceType: {
          validate: (0, _utils.assertOneOf)("script", "module"),
          default: "script"
        },
        interpreter: {
          validate: (0, _utils.assertNodeType)("InterpreterDirective"),
          default: null,
          optional: true
        },
        directives: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Directive"))),
          default: []
        },
        body: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Statement")))
        }
      },
      aliases: ["Scopable", "BlockParent", "Block"]
    });
    defineType("ObjectExpression", {
      visitor: ["properties"],
      aliases: ["Expression"],
      fields: {
        properties: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ObjectMethod", "ObjectProperty", "SpreadElement")))
        }
      }
    });
    defineType("ObjectMethod", {
      builder: ["kind", "key", "params", "body", "computed", "generator", "async"],
      fields: Object.assign({}, functionCommon(), functionTypeAnnotationCommon(), {
        kind: Object.assign({
          validate: (0, _utils.assertOneOf)("method", "get", "set")
        }, !process.env.BABEL_TYPES_8_BREAKING ? {
          default: "method"
        } : {}),
        computed: {
          default: false
        },
        key: {
          validate: function() {
            const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral");
            const computed = (0, _utils.assertNodeType)("Expression");
            const validator = function(node, key, val) {
              const validator2 = node.computed ? computed : normal;
              validator2(node, key, val);
            };
            validator.oneOfNodeTypes = ["Expression", "Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral"];
            return validator;
          }()
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        },
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement")
        }
      }),
      visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
      aliases: ["UserWhitespacable", "Function", "Scopable", "BlockParent", "FunctionParent", "Method", "ObjectMember"]
    });
    defineType("ObjectProperty", {
      builder: ["key", "value", "computed", "shorthand", ...!process.env.BABEL_TYPES_8_BREAKING ? ["decorators"] : []],
      fields: {
        computed: {
          default: false
        },
        key: {
          validate: function() {
            const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "DecimalLiteral", "PrivateName");
            const computed = (0, _utils.assertNodeType)("Expression");
            const validator = Object.assign(function(node, key, val) {
              const validator2 = node.computed ? computed : normal;
              validator2(node, key, val);
            }, {
              oneOfNodeTypes: ["Expression", "Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "DecimalLiteral", "PrivateName"]
            });
            return validator;
          }()
        },
        value: {
          validate: (0, _utils.assertNodeType)("Expression", "PatternLike")
        },
        shorthand: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("boolean"), Object.assign(function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING)
              return;
            if (val && node.computed) {
              throw new TypeError("Property shorthand of ObjectProperty cannot be true if computed is true");
            }
          }, {
            type: "boolean"
          }), function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING)
              return;
            if (val && !(0, _is.default)("Identifier", node.key)) {
              throw new TypeError("Property shorthand of ObjectProperty cannot be true if key is not an Identifier");
            }
          }),
          default: false
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        }
      },
      visitor: ["key", "value", "decorators"],
      aliases: ["UserWhitespacable", "Property", "ObjectMember"],
      validate: function() {
        const pattern = (0, _utils.assertNodeType)("Identifier", "Pattern", "TSAsExpression", "TSNonNullExpression", "TSTypeAssertion");
        const expression = (0, _utils.assertNodeType)("Expression");
        return function(parent, key, node) {
          if (!process.env.BABEL_TYPES_8_BREAKING)
            return;
          const validator = (0, _is.default)("ObjectPattern", parent) ? pattern : expression;
          validator(node, "value", node.value);
        };
      }()
    });
    defineType("RestElement", {
      visitor: ["argument", "typeAnnotation"],
      builder: ["argument"],
      aliases: ["LVal", "PatternLike"],
      deprecatedAlias: "RestProperty",
      fields: Object.assign({}, patternLikeCommon(), {
        argument: {
          validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("LVal") : (0, _utils.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern", "MemberExpression", "TSAsExpression", "TSTypeAssertion", "TSNonNullExpression")
        },
        optional: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        }
      }),
      validate(parent, key) {
        if (!process.env.BABEL_TYPES_8_BREAKING)
          return;
        const match = /(\w+)\[(\d+)\]/.exec(key);
        if (!match)
          throw new Error("Internal Babel error: malformed key.");
        const [, listKey, index] = match;
        if (parent[listKey].length > +index + 1) {
          throw new TypeError(`RestElement must be last element of ${listKey}`);
        }
      }
    });
    defineType("ReturnStatement", {
      visitor: ["argument"],
      aliases: ["Statement", "Terminatorless", "CompletionStatement"],
      fields: {
        argument: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        }
      }
    });
    defineType("SequenceExpression", {
      visitor: ["expressions"],
      fields: {
        expressions: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression")))
        }
      },
      aliases: ["Expression"]
    });
    defineType("ParenthesizedExpression", {
      visitor: ["expression"],
      aliases: ["Expression", "ExpressionWrapper"],
      fields: {
        expression: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("SwitchCase", {
      visitor: ["test", "consequent"],
      fields: {
        test: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        },
        consequent: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Statement")))
        }
      }
    });
    defineType("SwitchStatement", {
      visitor: ["discriminant", "cases"],
      aliases: ["Statement", "BlockParent", "Scopable"],
      fields: {
        discriminant: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        cases: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("SwitchCase")))
        }
      }
    });
    defineType("ThisExpression", {
      aliases: ["Expression"]
    });
    defineType("ThrowStatement", {
      visitor: ["argument"],
      aliases: ["Statement", "Terminatorless", "CompletionStatement"],
      fields: {
        argument: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("TryStatement", {
      visitor: ["block", "handler", "finalizer"],
      aliases: ["Statement"],
      fields: {
        block: {
          validate: (0, _utils.chain)((0, _utils.assertNodeType)("BlockStatement"), Object.assign(function(node) {
            if (!process.env.BABEL_TYPES_8_BREAKING)
              return;
            if (!node.handler && !node.finalizer) {
              throw new TypeError("TryStatement expects either a handler or finalizer, or both");
            }
          }, {
            oneOfNodeTypes: ["BlockStatement"]
          }))
        },
        handler: {
          optional: true,
          validate: (0, _utils.assertNodeType)("CatchClause")
        },
        finalizer: {
          optional: true,
          validate: (0, _utils.assertNodeType)("BlockStatement")
        }
      }
    });
    defineType("UnaryExpression", {
      builder: ["operator", "argument", "prefix"],
      fields: {
        prefix: {
          default: true
        },
        argument: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        operator: {
          validate: (0, _utils.assertOneOf)(..._constants.UNARY_OPERATORS)
        }
      },
      visitor: ["argument"],
      aliases: ["UnaryLike", "Expression"]
    });
    defineType("UpdateExpression", {
      builder: ["operator", "argument", "prefix"],
      fields: {
        prefix: {
          default: false
        },
        argument: {
          validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("Expression") : (0, _utils.assertNodeType)("Identifier", "MemberExpression")
        },
        operator: {
          validate: (0, _utils.assertOneOf)(..._constants.UPDATE_OPERATORS)
        }
      },
      visitor: ["argument"],
      aliases: ["Expression"]
    });
    defineType("VariableDeclaration", {
      builder: ["kind", "declarations"],
      visitor: ["declarations"],
      aliases: ["Statement", "Declaration"],
      fields: {
        declare: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        kind: {
          validate: (0, _utils.assertOneOf)("var", "let", "const")
        },
        declarations: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("VariableDeclarator")))
        }
      },
      validate(parent, key, node) {
        if (!process.env.BABEL_TYPES_8_BREAKING)
          return;
        if (!(0, _is.default)("ForXStatement", parent, {
          left: node
        }))
          return;
        if (node.declarations.length !== 1) {
          throw new TypeError(`Exactly one VariableDeclarator is required in the VariableDeclaration of a ${parent.type}`);
        }
      }
    });
    defineType("VariableDeclarator", {
      visitor: ["id", "init"],
      fields: {
        id: {
          validate: function() {
            if (!process.env.BABEL_TYPES_8_BREAKING) {
              return (0, _utils.assertNodeType)("LVal");
            }
            const normal = (0, _utils.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern");
            const without = (0, _utils.assertNodeType)("Identifier");
            return function(node, key, val) {
              const validator = node.init ? normal : without;
              validator(node, key, val);
            };
          }()
        },
        definite: {
          optional: true,
          validate: (0, _utils.assertValueType)("boolean")
        },
        init: {
          optional: true,
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("WhileStatement", {
      visitor: ["test", "body"],
      aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"],
      fields: {
        test: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        body: {
          validate: (0, _utils.assertNodeType)("Statement")
        }
      }
    });
    defineType("WithStatement", {
      visitor: ["object", "body"],
      aliases: ["Statement"],
      fields: {
        object: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        body: {
          validate: (0, _utils.assertNodeType)("Statement")
        }
      }
    });
    defineType("AssignmentPattern", {
      visitor: ["left", "right", "decorators"],
      builder: ["left", "right"],
      aliases: ["Pattern", "PatternLike", "LVal"],
      fields: Object.assign({}, patternLikeCommon(), {
        left: {
          validate: (0, _utils.assertNodeType)("Identifier", "ObjectPattern", "ArrayPattern", "MemberExpression", "TSAsExpression", "TSTypeAssertion", "TSNonNullExpression")
        },
        right: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        }
      })
    });
    defineType("ArrayPattern", {
      visitor: ["elements", "typeAnnotation"],
      builder: ["elements"],
      aliases: ["Pattern", "PatternLike", "LVal"],
      fields: Object.assign({}, patternLikeCommon(), {
        elements: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeOrValueType)("null", "PatternLike", "LVal")))
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        },
        optional: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        }
      })
    });
    defineType("ArrowFunctionExpression", {
      builder: ["params", "body", "async"],
      visitor: ["params", "body", "returnType", "typeParameters"],
      aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish"],
      fields: Object.assign({}, functionCommon(), functionTypeAnnotationCommon(), {
        expression: {
          validate: (0, _utils.assertValueType)("boolean")
        },
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement", "Expression")
        },
        predicate: {
          validate: (0, _utils.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
          optional: true
        }
      })
    });
    defineType("ClassBody", {
      visitor: ["body"],
      fields: {
        body: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ClassMethod", "ClassPrivateMethod", "ClassProperty", "ClassPrivateProperty", "ClassAccessorProperty", "TSDeclareMethod", "TSIndexSignature", "StaticBlock")))
        }
      }
    });
    defineType("ClassExpression", {
      builder: ["id", "superClass", "body", "decorators"],
      visitor: ["id", "body", "superClass", "mixins", "typeParameters", "superTypeParameters", "implements", "decorators"],
      aliases: ["Scopable", "Class", "Expression"],
      fields: {
        id: {
          validate: (0, _utils.assertNodeType)("Identifier"),
          optional: true
        },
        typeParameters: {
          validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
          optional: true
        },
        body: {
          validate: (0, _utils.assertNodeType)("ClassBody")
        },
        superClass: {
          optional: true,
          validate: (0, _utils.assertNodeType)("Expression")
        },
        superTypeParameters: {
          validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
          optional: true
        },
        implements: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSExpressionWithTypeArguments", "ClassImplements"))),
          optional: true
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        },
        mixins: {
          validate: (0, _utils.assertNodeType)("InterfaceExtends"),
          optional: true
        }
      }
    });
    defineType("ClassDeclaration", {
      inherits: "ClassExpression",
      aliases: ["Scopable", "Class", "Statement", "Declaration"],
      fields: {
        id: {
          validate: (0, _utils.assertNodeType)("Identifier")
        },
        typeParameters: {
          validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
          optional: true
        },
        body: {
          validate: (0, _utils.assertNodeType)("ClassBody")
        },
        superClass: {
          optional: true,
          validate: (0, _utils.assertNodeType)("Expression")
        },
        superTypeParameters: {
          validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
          optional: true
        },
        implements: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSExpressionWithTypeArguments", "ClassImplements"))),
          optional: true
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        },
        mixins: {
          validate: (0, _utils.assertNodeType)("InterfaceExtends"),
          optional: true
        },
        declare: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        abstract: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        }
      },
      validate: function() {
        const identifier = (0, _utils.assertNodeType)("Identifier");
        return function(parent, key, node) {
          if (!process.env.BABEL_TYPES_8_BREAKING)
            return;
          if (!(0, _is.default)("ExportDefaultDeclaration", parent)) {
            identifier(node, "id", node.id);
          }
        };
      }()
    });
    defineType("ExportAllDeclaration", {
      visitor: ["source"],
      aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
      fields: {
        source: {
          validate: (0, _utils.assertNodeType)("StringLiteral")
        },
        exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("type", "value")),
        assertions: {
          optional: true,
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
        }
      }
    });
    defineType("ExportDefaultDeclaration", {
      visitor: ["declaration"],
      aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
      fields: {
        declaration: {
          validate: (0, _utils.assertNodeType)("TSDeclareFunction", "FunctionDeclaration", "ClassDeclaration", "Expression")
        },
        exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("value"))
      }
    });
    defineType("ExportNamedDeclaration", {
      visitor: ["declaration", "specifiers", "source"],
      aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
      fields: {
        declaration: {
          optional: true,
          validate: (0, _utils.chain)((0, _utils.assertNodeType)("Declaration"), Object.assign(function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING)
              return;
            if (val && node.specifiers.length) {
              throw new TypeError("Only declaration or specifiers is allowed on ExportNamedDeclaration");
            }
          }, {
            oneOfNodeTypes: ["Declaration"]
          }), function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING)
              return;
            if (val && node.source) {
              throw new TypeError("Cannot export a declaration from a source");
            }
          })
        },
        assertions: {
          optional: true,
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
        },
        specifiers: {
          default: [],
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)(function() {
            const sourced = (0, _utils.assertNodeType)("ExportSpecifier", "ExportDefaultSpecifier", "ExportNamespaceSpecifier");
            const sourceless = (0, _utils.assertNodeType)("ExportSpecifier");
            if (!process.env.BABEL_TYPES_8_BREAKING)
              return sourced;
            return function(node, key, val) {
              const validator = node.source ? sourced : sourceless;
              validator(node, key, val);
            };
          }()))
        },
        source: {
          validate: (0, _utils.assertNodeType)("StringLiteral"),
          optional: true
        },
        exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("type", "value"))
      }
    });
    defineType("ExportSpecifier", {
      visitor: ["local", "exported"],
      aliases: ["ModuleSpecifier"],
      fields: {
        local: {
          validate: (0, _utils.assertNodeType)("Identifier")
        },
        exported: {
          validate: (0, _utils.assertNodeType)("Identifier", "StringLiteral")
        },
        exportKind: {
          validate: (0, _utils.assertOneOf)("type", "value"),
          optional: true
        }
      }
    });
    defineType("ForOfStatement", {
      visitor: ["left", "right", "body"],
      builder: ["left", "right", "body", "await"],
      aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
      fields: {
        left: {
          validate: function() {
            if (!process.env.BABEL_TYPES_8_BREAKING) {
              return (0, _utils.assertNodeType)("VariableDeclaration", "LVal");
            }
            const declaration = (0, _utils.assertNodeType)("VariableDeclaration");
            const lval = (0, _utils.assertNodeType)("Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern", "TSAsExpression", "TSTypeAssertion", "TSNonNullExpression");
            return function(node, key, val) {
              if ((0, _is.default)("VariableDeclaration", val)) {
                declaration(node, key, val);
              } else {
                lval(node, key, val);
              }
            };
          }()
        },
        right: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        body: {
          validate: (0, _utils.assertNodeType)("Statement")
        },
        await: {
          default: false
        }
      }
    });
    defineType("ImportDeclaration", {
      visitor: ["specifiers", "source"],
      aliases: ["Statement", "Declaration", "ModuleDeclaration"],
      fields: {
        assertions: {
          optional: true,
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
        },
        specifiers: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportSpecifier", "ImportDefaultSpecifier", "ImportNamespaceSpecifier")))
        },
        source: {
          validate: (0, _utils.assertNodeType)("StringLiteral")
        },
        importKind: {
          validate: (0, _utils.assertOneOf)("type", "typeof", "value"),
          optional: true
        }
      }
    });
    defineType("ImportDefaultSpecifier", {
      visitor: ["local"],
      aliases: ["ModuleSpecifier"],
      fields: {
        local: {
          validate: (0, _utils.assertNodeType)("Identifier")
        }
      }
    });
    defineType("ImportNamespaceSpecifier", {
      visitor: ["local"],
      aliases: ["ModuleSpecifier"],
      fields: {
        local: {
          validate: (0, _utils.assertNodeType)("Identifier")
        }
      }
    });
    defineType("ImportSpecifier", {
      visitor: ["local", "imported"],
      aliases: ["ModuleSpecifier"],
      fields: {
        local: {
          validate: (0, _utils.assertNodeType)("Identifier")
        },
        imported: {
          validate: (0, _utils.assertNodeType)("Identifier", "StringLiteral")
        },
        importKind: {
          validate: (0, _utils.assertOneOf)("type", "typeof", "value"),
          optional: true
        }
      }
    });
    defineType("MetaProperty", {
      visitor: ["meta", "property"],
      aliases: ["Expression"],
      fields: {
        meta: {
          validate: (0, _utils.chain)((0, _utils.assertNodeType)("Identifier"), Object.assign(function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING)
              return;
            let property;
            switch (val.name) {
              case "function":
                property = "sent";
                break;
              case "new":
                property = "target";
                break;
              case "import":
                property = "meta";
                break;
            }
            if (!(0, _is.default)("Identifier", node.property, {
              name: property
            })) {
              throw new TypeError("Unrecognised MetaProperty");
            }
          }, {
            oneOfNodeTypes: ["Identifier"]
          }))
        },
        property: {
          validate: (0, _utils.assertNodeType)("Identifier")
        }
      }
    });
    var classMethodOrPropertyCommon = () => ({
      abstract: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: true
      },
      accessibility: {
        validate: (0, _utils.assertOneOf)("public", "private", "protected"),
        optional: true
      },
      static: {
        default: false
      },
      override: {
        default: false
      },
      computed: {
        default: false
      },
      optional: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: true
      },
      key: {
        validate: (0, _utils.chain)(function() {
          const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral");
          const computed = (0, _utils.assertNodeType)("Expression");
          return function(node, key, val) {
            const validator = node.computed ? computed : normal;
            validator(node, key, val);
          };
        }(), (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "Expression"))
      }
    });
    exports2.classMethodOrPropertyCommon = classMethodOrPropertyCommon;
    var classMethodOrDeclareMethodCommon = () => Object.assign({}, functionCommon(), classMethodOrPropertyCommon(), {
      params: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Identifier", "Pattern", "RestElement", "TSParameterProperty")))
      },
      kind: {
        validate: (0, _utils.assertOneOf)("get", "set", "method", "constructor"),
        default: "method"
      },
      access: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), (0, _utils.assertOneOf)("public", "private", "protected")),
        optional: true
      },
      decorators: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
        optional: true
      }
    });
    exports2.classMethodOrDeclareMethodCommon = classMethodOrDeclareMethodCommon;
    defineType("ClassMethod", {
      aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method"],
      builder: ["kind", "key", "params", "body", "computed", "static", "generator", "async"],
      visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
      fields: Object.assign({}, classMethodOrDeclareMethodCommon(), functionTypeAnnotationCommon(), {
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement")
        }
      })
    });
    defineType("ObjectPattern", {
      visitor: ["properties", "typeAnnotation", "decorators"],
      builder: ["properties"],
      aliases: ["Pattern", "PatternLike", "LVal"],
      fields: Object.assign({}, patternLikeCommon(), {
        properties: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("RestElement", "ObjectProperty")))
        }
      })
    });
    defineType("SpreadElement", {
      visitor: ["argument"],
      aliases: ["UnaryLike"],
      deprecatedAlias: "SpreadProperty",
      fields: {
        argument: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("Super", {
      aliases: ["Expression"]
    });
    defineType("TaggedTemplateExpression", {
      visitor: ["tag", "quasi", "typeParameters"],
      builder: ["tag", "quasi"],
      aliases: ["Expression"],
      fields: {
        tag: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        quasi: {
          validate: (0, _utils.assertNodeType)("TemplateLiteral")
        },
        typeParameters: {
          validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
          optional: true
        }
      }
    });
    defineType("TemplateElement", {
      builder: ["value", "tail"],
      fields: {
        value: {
          validate: (0, _utils.chain)((0, _utils.assertShape)({
            raw: {
              validate: (0, _utils.assertValueType)("string")
            },
            cooked: {
              validate: (0, _utils.assertValueType)("string"),
              optional: true
            }
          }), function templateElementCookedValidator(node) {
            const raw = node.value.raw;
            let str, containsInvalid, unterminatedCalled = false;
            try {
              const error = () => {
                throw new Error();
              };
              ({
                str,
                containsInvalid
              } = (0, _helperStringParser.readStringContents)("template", raw, 0, 0, 0, {
                unterminated() {
                  unterminatedCalled = true;
                },
                strictNumericEscape: error,
                invalidEscapeSequence: error,
                numericSeparatorInEscapeSequence: error,
                unexpectedNumericSeparator: error,
                invalidDigit: error,
                invalidCodePoint: error
              }));
            } catch (_unused) {
              unterminatedCalled = true;
              containsInvalid = true;
            }
            if (!unterminatedCalled)
              throw new Error("Invalid raw");
            node.value.cooked = containsInvalid ? null : str;
          })
        },
        tail: {
          default: false
        }
      }
    });
    defineType("TemplateLiteral", {
      visitor: ["quasis", "expressions"],
      aliases: ["Expression", "Literal"],
      fields: {
        quasis: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TemplateElement")))
        },
        expressions: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression", "TSType")), function(node, key, val) {
            if (node.quasis.length !== val.length + 1) {
              throw new TypeError(`Number of ${node.type} quasis should be exactly one more than the number of expressions.
Expected ${val.length + 1} quasis but got ${node.quasis.length}`);
            }
          })
        }
      }
    });
    defineType("YieldExpression", {
      builder: ["argument", "delegate"],
      visitor: ["argument"],
      aliases: ["Expression", "Terminatorless"],
      fields: {
        delegate: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("boolean"), Object.assign(function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING)
              return;
            if (val && !node.argument) {
              throw new TypeError("Property delegate of YieldExpression cannot be true if there is no argument");
            }
          }, {
            type: "boolean"
          })),
          default: false
        },
        argument: {
          optional: true,
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("AwaitExpression", {
      builder: ["argument"],
      visitor: ["argument"],
      aliases: ["Expression", "Terminatorless"],
      fields: {
        argument: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("Import", {
      aliases: ["Expression"]
    });
    defineType("BigIntLiteral", {
      builder: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("string")
        }
      },
      aliases: ["Expression", "Pureish", "Literal", "Immutable"]
    });
    defineType("ExportNamespaceSpecifier", {
      visitor: ["exported"],
      aliases: ["ModuleSpecifier"],
      fields: {
        exported: {
          validate: (0, _utils.assertNodeType)("Identifier")
        }
      }
    });
    defineType("OptionalMemberExpression", {
      builder: ["object", "property", "computed", "optional"],
      visitor: ["object", "property"],
      aliases: ["Expression"],
      fields: {
        object: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        property: {
          validate: function() {
            const normal = (0, _utils.assertNodeType)("Identifier");
            const computed = (0, _utils.assertNodeType)("Expression");
            const validator = Object.assign(function(node, key, val) {
              const validator2 = node.computed ? computed : normal;
              validator2(node, key, val);
            }, {
              oneOfNodeTypes: ["Expression", "Identifier"]
            });
            return validator;
          }()
        },
        computed: {
          default: false
        },
        optional: {
          validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertValueType)("boolean") : (0, _utils.chain)((0, _utils.assertValueType)("boolean"), (0, _utils.assertOptionalChainStart)())
        }
      }
    });
    defineType("OptionalCallExpression", {
      visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
      builder: ["callee", "arguments", "optional"],
      aliases: ["Expression"],
      fields: {
        callee: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        arguments: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression", "SpreadElement", "JSXNamespacedName", "ArgumentPlaceholder")))
        },
        optional: {
          validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertValueType)("boolean") : (0, _utils.chain)((0, _utils.assertValueType)("boolean"), (0, _utils.assertOptionalChainStart)())
        },
        typeArguments: {
          validate: (0, _utils.assertNodeType)("TypeParameterInstantiation"),
          optional: true
        },
        typeParameters: {
          validate: (0, _utils.assertNodeType)("TSTypeParameterInstantiation"),
          optional: true
        }
      }
    });
    defineType("ClassProperty", {
      visitor: ["key", "value", "typeAnnotation", "decorators"],
      builder: ["key", "value", "typeAnnotation", "decorators", "computed", "static"],
      aliases: ["Property"],
      fields: Object.assign({}, classMethodOrPropertyCommon(), {
        value: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        },
        definite: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        typeAnnotation: {
          validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
          optional: true
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        },
        readonly: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        declare: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        variance: {
          validate: (0, _utils.assertNodeType)("Variance"),
          optional: true
        }
      })
    });
    defineType("ClassAccessorProperty", {
      visitor: ["key", "value", "typeAnnotation", "decorators"],
      builder: ["key", "value", "typeAnnotation", "decorators", "computed", "static"],
      aliases: ["Property", "Accessor"],
      fields: Object.assign({}, classMethodOrPropertyCommon(), {
        key: {
          validate: (0, _utils.chain)(function() {
            const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "PrivateName");
            const computed = (0, _utils.assertNodeType)("Expression");
            return function(node, key, val) {
              const validator = node.computed ? computed : normal;
              validator(node, key, val);
            };
          }(), (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "Expression", "PrivateName"))
        },
        value: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        },
        definite: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        typeAnnotation: {
          validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
          optional: true
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        },
        readonly: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        declare: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        variance: {
          validate: (0, _utils.assertNodeType)("Variance"),
          optional: true
        }
      })
    });
    defineType("ClassPrivateProperty", {
      visitor: ["key", "value", "decorators", "typeAnnotation"],
      builder: ["key", "value", "decorators", "static"],
      aliases: ["Property", "Private"],
      fields: {
        key: {
          validate: (0, _utils.assertNodeType)("PrivateName")
        },
        value: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        },
        typeAnnotation: {
          validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
          optional: true
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        },
        static: {
          validate: (0, _utils.assertValueType)("boolean"),
          default: false
        },
        readonly: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        definite: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        variance: {
          validate: (0, _utils.assertNodeType)("Variance"),
          optional: true
        }
      }
    });
    defineType("ClassPrivateMethod", {
      builder: ["kind", "key", "params", "body", "static"],
      visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
      aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method", "Private"],
      fields: Object.assign({}, classMethodOrDeclareMethodCommon(), functionTypeAnnotationCommon(), {
        kind: {
          validate: (0, _utils.assertOneOf)("get", "set", "method"),
          default: "method"
        },
        key: {
          validate: (0, _utils.assertNodeType)("PrivateName")
        },
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement")
        }
      })
    });
    defineType("PrivateName", {
      visitor: ["id"],
      aliases: ["Private"],
      fields: {
        id: {
          validate: (0, _utils.assertNodeType)("Identifier")
        }
      }
    });
    defineType("StaticBlock", {
      visitor: ["body"],
      fields: {
        body: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Statement")))
        }
      },
      aliases: ["Scopable", "BlockParent", "FunctionParent"]
    });
  }
});

// node_modules/@babel/types/lib/definitions/flow.js
var require_flow = __commonJS({
  "node_modules/@babel/types/lib/definitions/flow.js"() {
    "use strict";
    var _utils = require_utils();
    var defineType = (0, _utils.defineAliasedType)("Flow");
    var defineInterfaceishType = (name) => {
      defineType(name, {
        builder: ["id", "typeParameters", "extends", "body"],
        visitor: ["id", "typeParameters", "extends", "mixins", "implements", "body"],
        aliases: ["FlowDeclaration", "Statement", "Declaration"],
        fields: {
          id: (0, _utils.validateType)("Identifier"),
          typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
          extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends")),
          mixins: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends")),
          implements: (0, _utils.validateOptional)((0, _utils.arrayOfType)("ClassImplements")),
          body: (0, _utils.validateType)("ObjectTypeAnnotation")
        }
      });
    };
    defineType("AnyTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("ArrayTypeAnnotation", {
      visitor: ["elementType"],
      aliases: ["FlowType"],
      fields: {
        elementType: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("BooleanTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("BooleanLiteralTypeAnnotation", {
      builder: ["value"],
      aliases: ["FlowType"],
      fields: {
        value: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("NullLiteralTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("ClassImplements", {
      visitor: ["id", "typeParameters"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
      }
    });
    defineInterfaceishType("DeclareClass");
    defineType("DeclareFunction", {
      visitor: ["id"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        predicate: (0, _utils.validateOptionalType)("DeclaredPredicate")
      }
    });
    defineInterfaceishType("DeclareInterface");
    defineType("DeclareModule", {
      builder: ["id", "body", "kind"],
      visitor: ["id", "body"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: (0, _utils.validateType)(["Identifier", "StringLiteral"]),
        body: (0, _utils.validateType)("BlockStatement"),
        kind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("CommonJS", "ES"))
      }
    });
    defineType("DeclareModuleExports", {
      visitor: ["typeAnnotation"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        typeAnnotation: (0, _utils.validateType)("TypeAnnotation")
      }
    });
    defineType("DeclareTypeAlias", {
      visitor: ["id", "typeParameters", "right"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
        right: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("DeclareOpaqueType", {
      visitor: ["id", "typeParameters", "supertype"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
        supertype: (0, _utils.validateOptionalType)("FlowType"),
        impltype: (0, _utils.validateOptionalType)("FlowType")
      }
    });
    defineType("DeclareVariable", {
      visitor: ["id"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: (0, _utils.validateType)("Identifier")
      }
    });
    defineType("DeclareExportDeclaration", {
      visitor: ["declaration", "specifiers", "source"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        declaration: (0, _utils.validateOptionalType)("Flow"),
        specifiers: (0, _utils.validateOptional)((0, _utils.arrayOfType)(["ExportSpecifier", "ExportNamespaceSpecifier"])),
        source: (0, _utils.validateOptionalType)("StringLiteral"),
        default: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("DeclareExportAllDeclaration", {
      visitor: ["source"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        source: (0, _utils.validateType)("StringLiteral"),
        exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("type", "value"))
      }
    });
    defineType("DeclaredPredicate", {
      visitor: ["value"],
      aliases: ["FlowPredicate"],
      fields: {
        value: (0, _utils.validateType)("Flow")
      }
    });
    defineType("ExistsTypeAnnotation", {
      aliases: ["FlowType"]
    });
    defineType("FunctionTypeAnnotation", {
      visitor: ["typeParameters", "params", "rest", "returnType"],
      aliases: ["FlowType"],
      fields: {
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
        params: (0, _utils.validate)((0, _utils.arrayOfType)("FunctionTypeParam")),
        rest: (0, _utils.validateOptionalType)("FunctionTypeParam"),
        this: (0, _utils.validateOptionalType)("FunctionTypeParam"),
        returnType: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("FunctionTypeParam", {
      visitor: ["name", "typeAnnotation"],
      fields: {
        name: (0, _utils.validateOptionalType)("Identifier"),
        typeAnnotation: (0, _utils.validateType)("FlowType"),
        optional: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("GenericTypeAnnotation", {
      visitor: ["id", "typeParameters"],
      aliases: ["FlowType"],
      fields: {
        id: (0, _utils.validateType)(["Identifier", "QualifiedTypeIdentifier"]),
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
      }
    });
    defineType("InferredPredicate", {
      aliases: ["FlowPredicate"]
    });
    defineType("InterfaceExtends", {
      visitor: ["id", "typeParameters"],
      fields: {
        id: (0, _utils.validateType)(["Identifier", "QualifiedTypeIdentifier"]),
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
      }
    });
    defineInterfaceishType("InterfaceDeclaration");
    defineType("InterfaceTypeAnnotation", {
      visitor: ["extends", "body"],
      aliases: ["FlowType"],
      fields: {
        extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends")),
        body: (0, _utils.validateType)("ObjectTypeAnnotation")
      }
    });
    defineType("IntersectionTypeAnnotation", {
      visitor: ["types"],
      aliases: ["FlowType"],
      fields: {
        types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
      }
    });
    defineType("MixedTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("EmptyTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("NullableTypeAnnotation", {
      visitor: ["typeAnnotation"],
      aliases: ["FlowType"],
      fields: {
        typeAnnotation: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("NumberLiteralTypeAnnotation", {
      builder: ["value"],
      aliases: ["FlowType"],
      fields: {
        value: (0, _utils.validate)((0, _utils.assertValueType)("number"))
      }
    });
    defineType("NumberTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("ObjectTypeAnnotation", {
      visitor: ["properties", "indexers", "callProperties", "internalSlots"],
      aliases: ["FlowType"],
      builder: ["properties", "indexers", "callProperties", "internalSlots", "exact"],
      fields: {
        properties: (0, _utils.validate)((0, _utils.arrayOfType)(["ObjectTypeProperty", "ObjectTypeSpreadProperty"])),
        indexers: {
          validate: (0, _utils.arrayOfType)("ObjectTypeIndexer"),
          optional: true,
          default: []
        },
        callProperties: {
          validate: (0, _utils.arrayOfType)("ObjectTypeCallProperty"),
          optional: true,
          default: []
        },
        internalSlots: {
          validate: (0, _utils.arrayOfType)("ObjectTypeInternalSlot"),
          optional: true,
          default: []
        },
        exact: {
          validate: (0, _utils.assertValueType)("boolean"),
          default: false
        },
        inexact: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("ObjectTypeInternalSlot", {
      visitor: ["id", "value", "optional", "static", "method"],
      aliases: ["UserWhitespacable"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        value: (0, _utils.validateType)("FlowType"),
        optional: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        method: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("ObjectTypeCallProperty", {
      visitor: ["value"],
      aliases: ["UserWhitespacable"],
      fields: {
        value: (0, _utils.validateType)("FlowType"),
        static: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("ObjectTypeIndexer", {
      visitor: ["id", "key", "value", "variance"],
      aliases: ["UserWhitespacable"],
      fields: {
        id: (0, _utils.validateOptionalType)("Identifier"),
        key: (0, _utils.validateType)("FlowType"),
        value: (0, _utils.validateType)("FlowType"),
        static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        variance: (0, _utils.validateOptionalType)("Variance")
      }
    });
    defineType("ObjectTypeProperty", {
      visitor: ["key", "value", "variance"],
      aliases: ["UserWhitespacable"],
      fields: {
        key: (0, _utils.validateType)(["Identifier", "StringLiteral"]),
        value: (0, _utils.validateType)("FlowType"),
        kind: (0, _utils.validate)((0, _utils.assertOneOf)("init", "get", "set")),
        static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        proto: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        optional: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        variance: (0, _utils.validateOptionalType)("Variance"),
        method: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("ObjectTypeSpreadProperty", {
      visitor: ["argument"],
      aliases: ["UserWhitespacable"],
      fields: {
        argument: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("OpaqueType", {
      visitor: ["id", "typeParameters", "supertype", "impltype"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
        supertype: (0, _utils.validateOptionalType)("FlowType"),
        impltype: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("QualifiedTypeIdentifier", {
      visitor: ["id", "qualification"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        qualification: (0, _utils.validateType)(["Identifier", "QualifiedTypeIdentifier"])
      }
    });
    defineType("StringLiteralTypeAnnotation", {
      builder: ["value"],
      aliases: ["FlowType"],
      fields: {
        value: (0, _utils.validate)((0, _utils.assertValueType)("string"))
      }
    });
    defineType("StringTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("SymbolTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("ThisTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("TupleTypeAnnotation", {
      visitor: ["types"],
      aliases: ["FlowType"],
      fields: {
        types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
      }
    });
    defineType("TypeofTypeAnnotation", {
      visitor: ["argument"],
      aliases: ["FlowType"],
      fields: {
        argument: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("TypeAlias", {
      visitor: ["id", "typeParameters", "right"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
        right: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("TypeAnnotation", {
      visitor: ["typeAnnotation"],
      fields: {
        typeAnnotation: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("TypeCastExpression", {
      visitor: ["expression", "typeAnnotation"],
      aliases: ["ExpressionWrapper", "Expression"],
      fields: {
        expression: (0, _utils.validateType)("Expression"),
        typeAnnotation: (0, _utils.validateType)("TypeAnnotation")
      }
    });
    defineType("TypeParameter", {
      visitor: ["bound", "default", "variance"],
      fields: {
        name: (0, _utils.validate)((0, _utils.assertValueType)("string")),
        bound: (0, _utils.validateOptionalType)("TypeAnnotation"),
        default: (0, _utils.validateOptionalType)("FlowType"),
        variance: (0, _utils.validateOptionalType)("Variance")
      }
    });
    defineType("TypeParameterDeclaration", {
      visitor: ["params"],
      fields: {
        params: (0, _utils.validate)((0, _utils.arrayOfType)("TypeParameter"))
      }
    });
    defineType("TypeParameterInstantiation", {
      visitor: ["params"],
      fields: {
        params: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
      }
    });
    defineType("UnionTypeAnnotation", {
      visitor: ["types"],
      aliases: ["FlowType"],
      fields: {
        types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
      }
    });
    defineType("Variance", {
      builder: ["kind"],
      fields: {
        kind: (0, _utils.validate)((0, _utils.assertOneOf)("minus", "plus"))
      }
    });
    defineType("VoidTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("EnumDeclaration", {
      aliases: ["Statement", "Declaration"],
      visitor: ["id", "body"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        body: (0, _utils.validateType)(["EnumBooleanBody", "EnumNumberBody", "EnumStringBody", "EnumSymbolBody"])
      }
    });
    defineType("EnumBooleanBody", {
      aliases: ["EnumBody"],
      visitor: ["members"],
      fields: {
        explicitType: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        members: (0, _utils.validateArrayOfType)("EnumBooleanMember"),
        hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("EnumNumberBody", {
      aliases: ["EnumBody"],
      visitor: ["members"],
      fields: {
        explicitType: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        members: (0, _utils.validateArrayOfType)("EnumNumberMember"),
        hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("EnumStringBody", {
      aliases: ["EnumBody"],
      visitor: ["members"],
      fields: {
        explicitType: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        members: (0, _utils.validateArrayOfType)(["EnumStringMember", "EnumDefaultedMember"]),
        hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("EnumSymbolBody", {
      aliases: ["EnumBody"],
      visitor: ["members"],
      fields: {
        members: (0, _utils.validateArrayOfType)("EnumDefaultedMember"),
        hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("EnumBooleanMember", {
      aliases: ["EnumMember"],
      visitor: ["id"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        init: (0, _utils.validateType)("BooleanLiteral")
      }
    });
    defineType("EnumNumberMember", {
      aliases: ["EnumMember"],
      visitor: ["id", "init"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        init: (0, _utils.validateType)("NumericLiteral")
      }
    });
    defineType("EnumStringMember", {
      aliases: ["EnumMember"],
      visitor: ["id", "init"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        init: (0, _utils.validateType)("StringLiteral")
      }
    });
    defineType("EnumDefaultedMember", {
      aliases: ["EnumMember"],
      visitor: ["id"],
      fields: {
        id: (0, _utils.validateType)("Identifier")
      }
    });
    defineType("IndexedAccessType", {
      visitor: ["objectType", "indexType"],
      aliases: ["FlowType"],
      fields: {
        objectType: (0, _utils.validateType)("FlowType"),
        indexType: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("OptionalIndexedAccessType", {
      visitor: ["objectType", "indexType"],
      aliases: ["FlowType"],
      fields: {
        objectType: (0, _utils.validateType)("FlowType"),
        indexType: (0, _utils.validateType)("FlowType"),
        optional: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
  }
});

// node_modules/@babel/types/lib/definitions/jsx.js
var require_jsx = __commonJS({
  "node_modules/@babel/types/lib/definitions/jsx.js"() {
    "use strict";
    var _utils = require_utils();
    var defineType = (0, _utils.defineAliasedType)("JSX");
    defineType("JSXAttribute", {
      visitor: ["name", "value"],
      aliases: ["Immutable"],
      fields: {
        name: {
          validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXNamespacedName")
        },
        value: {
          optional: true,
          validate: (0, _utils.assertNodeType)("JSXElement", "JSXFragment", "StringLiteral", "JSXExpressionContainer")
        }
      }
    });
    defineType("JSXClosingElement", {
      visitor: ["name"],
      aliases: ["Immutable"],
      fields: {
        name: {
          validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXMemberExpression", "JSXNamespacedName")
        }
      }
    });
    defineType("JSXElement", {
      builder: ["openingElement", "closingElement", "children", "selfClosing"],
      visitor: ["openingElement", "children", "closingElement"],
      aliases: ["Immutable", "Expression"],
      fields: Object.assign({
        openingElement: {
          validate: (0, _utils.assertNodeType)("JSXOpeningElement")
        },
        closingElement: {
          optional: true,
          validate: (0, _utils.assertNodeType)("JSXClosingElement")
        },
        children: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement", "JSXFragment")))
        }
      }, {
        selfClosing: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        }
      })
    });
    defineType("JSXEmptyExpression", {});
    defineType("JSXExpressionContainer", {
      visitor: ["expression"],
      aliases: ["Immutable"],
      fields: {
        expression: {
          validate: (0, _utils.assertNodeType)("Expression", "JSXEmptyExpression")
        }
      }
    });
    defineType("JSXSpreadChild", {
      visitor: ["expression"],
      aliases: ["Immutable"],
      fields: {
        expression: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("JSXIdentifier", {
      builder: ["name"],
      fields: {
        name: {
          validate: (0, _utils.assertValueType)("string")
        }
      }
    });
    defineType("JSXMemberExpression", {
      visitor: ["object", "property"],
      fields: {
        object: {
          validate: (0, _utils.assertNodeType)("JSXMemberExpression", "JSXIdentifier")
        },
        property: {
          validate: (0, _utils.assertNodeType)("JSXIdentifier")
        }
      }
    });
    defineType("JSXNamespacedName", {
      visitor: ["namespace", "name"],
      fields: {
        namespace: {
          validate: (0, _utils.assertNodeType)("JSXIdentifier")
        },
        name: {
          validate: (0, _utils.assertNodeType)("JSXIdentifier")
        }
      }
    });
    defineType("JSXOpeningElement", {
      builder: ["name", "attributes", "selfClosing"],
      visitor: ["name", "attributes"],
      aliases: ["Immutable"],
      fields: {
        name: {
          validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXMemberExpression", "JSXNamespacedName")
        },
        selfClosing: {
          default: false
        },
        attributes: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("JSXAttribute", "JSXSpreadAttribute")))
        },
        typeParameters: {
          validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
          optional: true
        }
      }
    });
    defineType("JSXSpreadAttribute", {
      visitor: ["argument"],
      fields: {
        argument: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("JSXText", {
      aliases: ["Immutable"],
      builder: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("string")
        }
      }
    });
    defineType("JSXFragment", {
      builder: ["openingFragment", "closingFragment", "children"],
      visitor: ["openingFragment", "children", "closingFragment"],
      aliases: ["Immutable", "Expression"],
      fields: {
        openingFragment: {
          validate: (0, _utils.assertNodeType)("JSXOpeningFragment")
        },
        closingFragment: {
          validate: (0, _utils.assertNodeType)("JSXClosingFragment")
        },
        children: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement", "JSXFragment")))
        }
      }
    });
    defineType("JSXOpeningFragment", {
      aliases: ["Immutable"]
    });
    defineType("JSXClosingFragment", {
      aliases: ["Immutable"]
    });
  }
});

// node_modules/@babel/types/lib/definitions/placeholders.js
var require_placeholders = __commonJS({
  "node_modules/@babel/types/lib/definitions/placeholders.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.PLACEHOLDERS_FLIPPED_ALIAS = exports2.PLACEHOLDERS_ALIAS = exports2.PLACEHOLDERS = void 0;
    var _utils = require_utils();
    var PLACEHOLDERS = ["Identifier", "StringLiteral", "Expression", "Statement", "Declaration", "BlockStatement", "ClassBody", "Pattern"];
    exports2.PLACEHOLDERS = PLACEHOLDERS;
    var PLACEHOLDERS_ALIAS = {
      Declaration: ["Statement"],
      Pattern: ["PatternLike", "LVal"]
    };
    exports2.PLACEHOLDERS_ALIAS = PLACEHOLDERS_ALIAS;
    for (const type of PLACEHOLDERS) {
      const alias = _utils.ALIAS_KEYS[type];
      if (alias != null && alias.length)
        PLACEHOLDERS_ALIAS[type] = alias;
    }
    var PLACEHOLDERS_FLIPPED_ALIAS = {};
    exports2.PLACEHOLDERS_FLIPPED_ALIAS = PLACEHOLDERS_FLIPPED_ALIAS;
    Object.keys(PLACEHOLDERS_ALIAS).forEach((type) => {
      PLACEHOLDERS_ALIAS[type].forEach((alias) => {
        if (!Object.hasOwnProperty.call(PLACEHOLDERS_FLIPPED_ALIAS, alias)) {
          PLACEHOLDERS_FLIPPED_ALIAS[alias] = [];
        }
        PLACEHOLDERS_FLIPPED_ALIAS[alias].push(type);
      });
    });
  }
});

// node_modules/@babel/types/lib/definitions/misc.js
var require_misc = __commonJS({
  "node_modules/@babel/types/lib/definitions/misc.js"() {
    "use strict";
    var _utils = require_utils();
    var _placeholders = require_placeholders();
    var defineType = (0, _utils.defineAliasedType)("Miscellaneous");
    {
      defineType("Noop", {
        visitor: []
      });
    }
    defineType("Placeholder", {
      visitor: [],
      builder: ["expectedNode", "name"],
      fields: {
        name: {
          validate: (0, _utils.assertNodeType)("Identifier")
        },
        expectedNode: {
          validate: (0, _utils.assertOneOf)(..._placeholders.PLACEHOLDERS)
        }
      }
    });
    defineType("V8IntrinsicIdentifier", {
      builder: ["name"],
      fields: {
        name: {
          validate: (0, _utils.assertValueType)("string")
        }
      }
    });
  }
});

// node_modules/@babel/types/lib/definitions/experimental.js
var require_experimental = __commonJS({
  "node_modules/@babel/types/lib/definitions/experimental.js"() {
    "use strict";
    var _utils = require_utils();
    (0, _utils.default)("ArgumentPlaceholder", {});
    (0, _utils.default)("BindExpression", {
      visitor: ["object", "callee"],
      aliases: ["Expression"],
      fields: !process.env.BABEL_TYPES_8_BREAKING ? {
        object: {
          validate: Object.assign(() => {
          }, {
            oneOfNodeTypes: ["Expression"]
          })
        },
        callee: {
          validate: Object.assign(() => {
          }, {
            oneOfNodeTypes: ["Expression"]
          })
        }
      } : {
        object: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        callee: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    (0, _utils.default)("ImportAttribute", {
      visitor: ["key", "value"],
      fields: {
        key: {
          validate: (0, _utils.assertNodeType)("Identifier", "StringLiteral")
        },
        value: {
          validate: (0, _utils.assertNodeType)("StringLiteral")
        }
      }
    });
    (0, _utils.default)("Decorator", {
      visitor: ["expression"],
      fields: {
        expression: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    (0, _utils.default)("DoExpression", {
      visitor: ["body"],
      builder: ["body", "async"],
      aliases: ["Expression"],
      fields: {
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement")
        },
        async: {
          validate: (0, _utils.assertValueType)("boolean"),
          default: false
        }
      }
    });
    (0, _utils.default)("ExportDefaultSpecifier", {
      visitor: ["exported"],
      aliases: ["ModuleSpecifier"],
      fields: {
        exported: {
          validate: (0, _utils.assertNodeType)("Identifier")
        }
      }
    });
    (0, _utils.default)("RecordExpression", {
      visitor: ["properties"],
      aliases: ["Expression"],
      fields: {
        properties: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ObjectProperty", "SpreadElement")))
        }
      }
    });
    (0, _utils.default)("TupleExpression", {
      fields: {
        elements: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression", "SpreadElement"))),
          default: []
        }
      },
      visitor: ["elements"],
      aliases: ["Expression"]
    });
    (0, _utils.default)("DecimalLiteral", {
      builder: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("string")
        }
      },
      aliases: ["Expression", "Pureish", "Literal", "Immutable"]
    });
    (0, _utils.default)("ModuleExpression", {
      visitor: ["body"],
      fields: {
        body: {
          validate: (0, _utils.assertNodeType)("Program")
        }
      },
      aliases: ["Expression"]
    });
    (0, _utils.default)("TopicReference", {
      aliases: ["Expression"]
    });
    (0, _utils.default)("PipelineTopicExpression", {
      builder: ["expression"],
      visitor: ["expression"],
      fields: {
        expression: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      },
      aliases: ["Expression"]
    });
    (0, _utils.default)("PipelineBareFunction", {
      builder: ["callee"],
      visitor: ["callee"],
      fields: {
        callee: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      },
      aliases: ["Expression"]
    });
    (0, _utils.default)("PipelinePrimaryTopicReference", {
      aliases: ["Expression"]
    });
  }
});

// node_modules/@babel/types/lib/definitions/typescript.js
var require_typescript = __commonJS({
  "node_modules/@babel/types/lib/definitions/typescript.js"() {
    "use strict";
    var _utils = require_utils();
    var _core = require_core();
    var _is = require_is();
    var defineType = (0, _utils.defineAliasedType)("TypeScript");
    var bool = (0, _utils.assertValueType)("boolean");
    var tSFunctionTypeAnnotationCommon = () => ({
      returnType: {
        validate: (0, _utils.assertNodeType)("TSTypeAnnotation", "Noop"),
        optional: true
      },
      typeParameters: {
        validate: (0, _utils.assertNodeType)("TSTypeParameterDeclaration", "Noop"),
        optional: true
      }
    });
    defineType("TSParameterProperty", {
      aliases: ["LVal"],
      visitor: ["parameter"],
      fields: {
        accessibility: {
          validate: (0, _utils.assertOneOf)("public", "private", "protected"),
          optional: true
        },
        readonly: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        parameter: {
          validate: (0, _utils.assertNodeType)("Identifier", "AssignmentPattern")
        },
        override: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        }
      }
    });
    defineType("TSDeclareFunction", {
      aliases: ["Statement", "Declaration"],
      visitor: ["id", "typeParameters", "params", "returnType"],
      fields: Object.assign({}, (0, _core.functionDeclarationCommon)(), tSFunctionTypeAnnotationCommon())
    });
    defineType("TSDeclareMethod", {
      visitor: ["decorators", "key", "typeParameters", "params", "returnType"],
      fields: Object.assign({}, (0, _core.classMethodOrDeclareMethodCommon)(), tSFunctionTypeAnnotationCommon())
    });
    defineType("TSQualifiedName", {
      aliases: ["TSEntityName"],
      visitor: ["left", "right"],
      fields: {
        left: (0, _utils.validateType)("TSEntityName"),
        right: (0, _utils.validateType)("Identifier")
      }
    });
    var signatureDeclarationCommon = () => ({
      typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
      ["parameters"]: (0, _utils.validateArrayOfType)(["Identifier", "RestElement"]),
      ["typeAnnotation"]: (0, _utils.validateOptionalType)("TSTypeAnnotation")
    });
    var callConstructSignatureDeclaration = {
      aliases: ["TSTypeElement"],
      visitor: ["typeParameters", "parameters", "typeAnnotation"],
      fields: signatureDeclarationCommon()
    };
    defineType("TSCallSignatureDeclaration", callConstructSignatureDeclaration);
    defineType("TSConstructSignatureDeclaration", callConstructSignatureDeclaration);
    var namedTypeElementCommon = () => ({
      key: (0, _utils.validateType)("Expression"),
      computed: {
        default: false
      },
      optional: (0, _utils.validateOptional)(bool)
    });
    defineType("TSPropertySignature", {
      aliases: ["TSTypeElement"],
      visitor: ["key", "typeAnnotation", "initializer"],
      fields: Object.assign({}, namedTypeElementCommon(), {
        readonly: (0, _utils.validateOptional)(bool),
        typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation"),
        initializer: (0, _utils.validateOptionalType)("Expression"),
        kind: {
          validate: (0, _utils.assertOneOf)("get", "set")
        }
      })
    });
    defineType("TSMethodSignature", {
      aliases: ["TSTypeElement"],
      visitor: ["key", "typeParameters", "parameters", "typeAnnotation"],
      fields: Object.assign({}, signatureDeclarationCommon(), namedTypeElementCommon(), {
        kind: {
          validate: (0, _utils.assertOneOf)("method", "get", "set")
        }
      })
    });
    defineType("TSIndexSignature", {
      aliases: ["TSTypeElement"],
      visitor: ["parameters", "typeAnnotation"],
      fields: {
        readonly: (0, _utils.validateOptional)(bool),
        static: (0, _utils.validateOptional)(bool),
        parameters: (0, _utils.validateArrayOfType)("Identifier"),
        typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation")
      }
    });
    var tsKeywordTypes = ["TSAnyKeyword", "TSBooleanKeyword", "TSBigIntKeyword", "TSIntrinsicKeyword", "TSNeverKeyword", "TSNullKeyword", "TSNumberKeyword", "TSObjectKeyword", "TSStringKeyword", "TSSymbolKeyword", "TSUndefinedKeyword", "TSUnknownKeyword", "TSVoidKeyword"];
    for (const type of tsKeywordTypes) {
      defineType(type, {
        aliases: ["TSType", "TSBaseType"],
        visitor: [],
        fields: {}
      });
    }
    defineType("TSThisType", {
      aliases: ["TSType", "TSBaseType"],
      visitor: [],
      fields: {}
    });
    var fnOrCtrBase = {
      aliases: ["TSType"],
      visitor: ["typeParameters", "parameters", "typeAnnotation"]
    };
    defineType("TSFunctionType", Object.assign({}, fnOrCtrBase, {
      fields: signatureDeclarationCommon()
    }));
    defineType("TSConstructorType", Object.assign({}, fnOrCtrBase, {
      fields: Object.assign({}, signatureDeclarationCommon(), {
        abstract: (0, _utils.validateOptional)(bool)
      })
    }));
    defineType("TSTypeReference", {
      aliases: ["TSType"],
      visitor: ["typeName", "typeParameters"],
      fields: {
        typeName: (0, _utils.validateType)("TSEntityName"),
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
      }
    });
    defineType("TSTypePredicate", {
      aliases: ["TSType"],
      visitor: ["parameterName", "typeAnnotation"],
      builder: ["parameterName", "typeAnnotation", "asserts"],
      fields: {
        parameterName: (0, _utils.validateType)(["Identifier", "TSThisType"]),
        typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation"),
        asserts: (0, _utils.validateOptional)(bool)
      }
    });
    defineType("TSTypeQuery", {
      aliases: ["TSType"],
      visitor: ["exprName", "typeParameters"],
      fields: {
        exprName: (0, _utils.validateType)(["TSEntityName", "TSImportType"]),
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
      }
    });
    defineType("TSTypeLiteral", {
      aliases: ["TSType"],
      visitor: ["members"],
      fields: {
        members: (0, _utils.validateArrayOfType)("TSTypeElement")
      }
    });
    defineType("TSArrayType", {
      aliases: ["TSType"],
      visitor: ["elementType"],
      fields: {
        elementType: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSTupleType", {
      aliases: ["TSType"],
      visitor: ["elementTypes"],
      fields: {
        elementTypes: (0, _utils.validateArrayOfType)(["TSType", "TSNamedTupleMember"])
      }
    });
    defineType("TSOptionalType", {
      aliases: ["TSType"],
      visitor: ["typeAnnotation"],
      fields: {
        typeAnnotation: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSRestType", {
      aliases: ["TSType"],
      visitor: ["typeAnnotation"],
      fields: {
        typeAnnotation: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSNamedTupleMember", {
      visitor: ["label", "elementType"],
      builder: ["label", "elementType", "optional"],
      fields: {
        label: (0, _utils.validateType)("Identifier"),
        optional: {
          validate: bool,
          default: false
        },
        elementType: (0, _utils.validateType)("TSType")
      }
    });
    var unionOrIntersection = {
      aliases: ["TSType"],
      visitor: ["types"],
      fields: {
        types: (0, _utils.validateArrayOfType)("TSType")
      }
    };
    defineType("TSUnionType", unionOrIntersection);
    defineType("TSIntersectionType", unionOrIntersection);
    defineType("TSConditionalType", {
      aliases: ["TSType"],
      visitor: ["checkType", "extendsType", "trueType", "falseType"],
      fields: {
        checkType: (0, _utils.validateType)("TSType"),
        extendsType: (0, _utils.validateType)("TSType"),
        trueType: (0, _utils.validateType)("TSType"),
        falseType: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSInferType", {
      aliases: ["TSType"],
      visitor: ["typeParameter"],
      fields: {
        typeParameter: (0, _utils.validateType)("TSTypeParameter")
      }
    });
    defineType("TSParenthesizedType", {
      aliases: ["TSType"],
      visitor: ["typeAnnotation"],
      fields: {
        typeAnnotation: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSTypeOperator", {
      aliases: ["TSType"],
      visitor: ["typeAnnotation"],
      fields: {
        operator: (0, _utils.validate)((0, _utils.assertValueType)("string")),
        typeAnnotation: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSIndexedAccessType", {
      aliases: ["TSType"],
      visitor: ["objectType", "indexType"],
      fields: {
        objectType: (0, _utils.validateType)("TSType"),
        indexType: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSMappedType", {
      aliases: ["TSType"],
      visitor: ["typeParameter", "typeAnnotation", "nameType"],
      fields: {
        readonly: (0, _utils.validateOptional)((0, _utils.assertOneOf)(true, false, "+", "-")),
        typeParameter: (0, _utils.validateType)("TSTypeParameter"),
        optional: (0, _utils.validateOptional)((0, _utils.assertOneOf)(true, false, "+", "-")),
        typeAnnotation: (0, _utils.validateOptionalType)("TSType"),
        nameType: (0, _utils.validateOptionalType)("TSType")
      }
    });
    defineType("TSLiteralType", {
      aliases: ["TSType", "TSBaseType"],
      visitor: ["literal"],
      fields: {
        literal: {
          validate: function() {
            const unaryExpression = (0, _utils.assertNodeType)("NumericLiteral", "BigIntLiteral");
            const unaryOperator = (0, _utils.assertOneOf)("-");
            const literal = (0, _utils.assertNodeType)("NumericLiteral", "StringLiteral", "BooleanLiteral", "BigIntLiteral", "TemplateLiteral");
            function validator(parent, key, node) {
              if ((0, _is.default)("UnaryExpression", node)) {
                unaryOperator(node, "operator", node.operator);
                unaryExpression(node, "argument", node.argument);
              } else {
                literal(parent, key, node);
              }
            }
            validator.oneOfNodeTypes = ["NumericLiteral", "StringLiteral", "BooleanLiteral", "BigIntLiteral", "TemplateLiteral", "UnaryExpression"];
            return validator;
          }()
        }
      }
    });
    defineType("TSExpressionWithTypeArguments", {
      aliases: ["TSType"],
      visitor: ["expression", "typeParameters"],
      fields: {
        expression: (0, _utils.validateType)("TSEntityName"),
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
      }
    });
    defineType("TSInterfaceDeclaration", {
      aliases: ["Statement", "Declaration"],
      visitor: ["id", "typeParameters", "extends", "body"],
      fields: {
        declare: (0, _utils.validateOptional)(bool),
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
        extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("TSExpressionWithTypeArguments")),
        body: (0, _utils.validateType)("TSInterfaceBody")
      }
    });
    defineType("TSInterfaceBody", {
      visitor: ["body"],
      fields: {
        body: (0, _utils.validateArrayOfType)("TSTypeElement")
      }
    });
    defineType("TSTypeAliasDeclaration", {
      aliases: ["Statement", "Declaration"],
      visitor: ["id", "typeParameters", "typeAnnotation"],
      fields: {
        declare: (0, _utils.validateOptional)(bool),
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
        typeAnnotation: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSInstantiationExpression", {
      aliases: ["Expression"],
      visitor: ["expression", "typeParameters"],
      fields: {
        expression: (0, _utils.validateType)("Expression"),
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
      }
    });
    defineType("TSAsExpression", {
      aliases: ["Expression", "LVal", "PatternLike"],
      visitor: ["expression", "typeAnnotation"],
      fields: {
        expression: (0, _utils.validateType)("Expression"),
        typeAnnotation: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSTypeAssertion", {
      aliases: ["Expression", "LVal", "PatternLike"],
      visitor: ["typeAnnotation", "expression"],
      fields: {
        typeAnnotation: (0, _utils.validateType)("TSType"),
        expression: (0, _utils.validateType)("Expression")
      }
    });
    defineType("TSEnumDeclaration", {
      aliases: ["Statement", "Declaration"],
      visitor: ["id", "members"],
      fields: {
        declare: (0, _utils.validateOptional)(bool),
        const: (0, _utils.validateOptional)(bool),
        id: (0, _utils.validateType)("Identifier"),
        members: (0, _utils.validateArrayOfType)("TSEnumMember"),
        initializer: (0, _utils.validateOptionalType)("Expression")
      }
    });
    defineType("TSEnumMember", {
      visitor: ["id", "initializer"],
      fields: {
        id: (0, _utils.validateType)(["Identifier", "StringLiteral"]),
        initializer: (0, _utils.validateOptionalType)("Expression")
      }
    });
    defineType("TSModuleDeclaration", {
      aliases: ["Statement", "Declaration"],
      visitor: ["id", "body"],
      fields: {
        declare: (0, _utils.validateOptional)(bool),
        global: (0, _utils.validateOptional)(bool),
        id: (0, _utils.validateType)(["Identifier", "StringLiteral"]),
        body: (0, _utils.validateType)(["TSModuleBlock", "TSModuleDeclaration"])
      }
    });
    defineType("TSModuleBlock", {
      aliases: ["Scopable", "Block", "BlockParent"],
      visitor: ["body"],
      fields: {
        body: (0, _utils.validateArrayOfType)("Statement")
      }
    });
    defineType("TSImportType", {
      aliases: ["TSType"],
      visitor: ["argument", "qualifier", "typeParameters"],
      fields: {
        argument: (0, _utils.validateType)("StringLiteral"),
        qualifier: (0, _utils.validateOptionalType)("TSEntityName"),
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
      }
    });
    defineType("TSImportEqualsDeclaration", {
      aliases: ["Statement"],
      visitor: ["id", "moduleReference"],
      fields: {
        isExport: (0, _utils.validate)(bool),
        id: (0, _utils.validateType)("Identifier"),
        moduleReference: (0, _utils.validateType)(["TSEntityName", "TSExternalModuleReference"]),
        importKind: {
          validate: (0, _utils.assertOneOf)("type", "value"),
          optional: true
        }
      }
    });
    defineType("TSExternalModuleReference", {
      visitor: ["expression"],
      fields: {
        expression: (0, _utils.validateType)("StringLiteral")
      }
    });
    defineType("TSNonNullExpression", {
      aliases: ["Expression", "LVal", "PatternLike"],
      visitor: ["expression"],
      fields: {
        expression: (0, _utils.validateType)("Expression")
      }
    });
    defineType("TSExportAssignment", {
      aliases: ["Statement"],
      visitor: ["expression"],
      fields: {
        expression: (0, _utils.validateType)("Expression")
      }
    });
    defineType("TSNamespaceExportDeclaration", {
      aliases: ["Statement"],
      visitor: ["id"],
      fields: {
        id: (0, _utils.validateType)("Identifier")
      }
    });
    defineType("TSTypeAnnotation", {
      visitor: ["typeAnnotation"],
      fields: {
        typeAnnotation: {
          validate: (0, _utils.assertNodeType)("TSType")
        }
      }
    });
    defineType("TSTypeParameterInstantiation", {
      visitor: ["params"],
      fields: {
        params: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSType")))
        }
      }
    });
    defineType("TSTypeParameterDeclaration", {
      visitor: ["params"],
      fields: {
        params: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSTypeParameter")))
        }
      }
    });
    defineType("TSTypeParameter", {
      builder: ["constraint", "default", "name"],
      visitor: ["constraint", "default"],
      fields: {
        name: {
          validate: (0, _utils.assertValueType)("string")
        },
        in: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        out: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        constraint: {
          validate: (0, _utils.assertNodeType)("TSType"),
          optional: true
        },
        default: {
          validate: (0, _utils.assertNodeType)("TSType"),
          optional: true
        }
      }
    });
  }
});

// node_modules/@babel/types/lib/definitions/index.js
var require_definitions = __commonJS({
  "node_modules/@babel/types/lib/definitions/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "ALIAS_KEYS", {
      enumerable: true,
      get: function() {
        return _utils.ALIAS_KEYS;
      }
    });
    Object.defineProperty(exports2, "BUILDER_KEYS", {
      enumerable: true,
      get: function() {
        return _utils.BUILDER_KEYS;
      }
    });
    Object.defineProperty(exports2, "DEPRECATED_KEYS", {
      enumerable: true,
      get: function() {
        return _utils.DEPRECATED_KEYS;
      }
    });
    Object.defineProperty(exports2, "FLIPPED_ALIAS_KEYS", {
      enumerable: true,
      get: function() {
        return _utils.FLIPPED_ALIAS_KEYS;
      }
    });
    Object.defineProperty(exports2, "NODE_FIELDS", {
      enumerable: true,
      get: function() {
        return _utils.NODE_FIELDS;
      }
    });
    Object.defineProperty(exports2, "NODE_PARENT_VALIDATIONS", {
      enumerable: true,
      get: function() {
        return _utils.NODE_PARENT_VALIDATIONS;
      }
    });
    Object.defineProperty(exports2, "PLACEHOLDERS", {
      enumerable: true,
      get: function() {
        return _placeholders.PLACEHOLDERS;
      }
    });
    Object.defineProperty(exports2, "PLACEHOLDERS_ALIAS", {
      enumerable: true,
      get: function() {
        return _placeholders.PLACEHOLDERS_ALIAS;
      }
    });
    Object.defineProperty(exports2, "PLACEHOLDERS_FLIPPED_ALIAS", {
      enumerable: true,
      get: function() {
        return _placeholders.PLACEHOLDERS_FLIPPED_ALIAS;
      }
    });
    exports2.TYPES = void 0;
    Object.defineProperty(exports2, "VISITOR_KEYS", {
      enumerable: true,
      get: function() {
        return _utils.VISITOR_KEYS;
      }
    });
    var _toFastProperties = require_to_fast_properties();
    require_core();
    require_flow();
    require_jsx();
    require_misc();
    require_experimental();
    require_typescript();
    var _utils = require_utils();
    var _placeholders = require_placeholders();
    _toFastProperties(_utils.VISITOR_KEYS);
    _toFastProperties(_utils.ALIAS_KEYS);
    _toFastProperties(_utils.FLIPPED_ALIAS_KEYS);
    _toFastProperties(_utils.NODE_FIELDS);
    _toFastProperties(_utils.BUILDER_KEYS);
    _toFastProperties(_utils.DEPRECATED_KEYS);
    _toFastProperties(_placeholders.PLACEHOLDERS_ALIAS);
    _toFastProperties(_placeholders.PLACEHOLDERS_FLIPPED_ALIAS);
    var TYPES = [].concat(Object.keys(_utils.VISITOR_KEYS), Object.keys(_utils.FLIPPED_ALIAS_KEYS), Object.keys(_utils.DEPRECATED_KEYS));
    exports2.TYPES = TYPES;
  }
});

// node_modules/@babel/types/lib/validators/validate.js
var require_validate = __commonJS({
  "node_modules/@babel/types/lib/validators/validate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = validate;
    exports2.validateChild = validateChild;
    exports2.validateField = validateField;
    var _definitions = require_definitions();
    function validate(node, key, val) {
      if (!node)
        return;
      const fields = _definitions.NODE_FIELDS[node.type];
      if (!fields)
        return;
      const field = fields[key];
      validateField(node, key, val, field);
      validateChild(node, key, val);
    }
    function validateField(node, key, val, field) {
      if (!(field != null && field.validate))
        return;
      if (field.optional && val == null)
        return;
      field.validate(node, key, val);
    }
    function validateChild(node, key, val) {
      if (val == null)
        return;
      const validate2 = _definitions.NODE_PARENT_VALIDATIONS[val.type];
      if (!validate2)
        return;
      validate2(node, key, val);
    }
  }
});

// node_modules/@babel/types/lib/builders/validateNode.js
var require_validateNode = __commonJS({
  "node_modules/@babel/types/lib/builders/validateNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = validateNode;
    var _validate = require_validate();
    var _ = require_lib3();
    function validateNode(node) {
      const keys = _.BUILDER_KEYS[node.type];
      for (const key of keys) {
        (0, _validate.default)(node, key, node[key]);
      }
      return node;
    }
  }
});

// node_modules/@babel/types/lib/builders/generated/index.js
var require_generated2 = __commonJS({
  "node_modules/@babel/types/lib/builders/generated/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.anyTypeAnnotation = anyTypeAnnotation;
    exports2.argumentPlaceholder = argumentPlaceholder;
    exports2.arrayExpression = arrayExpression;
    exports2.arrayPattern = arrayPattern;
    exports2.arrayTypeAnnotation = arrayTypeAnnotation;
    exports2.arrowFunctionExpression = arrowFunctionExpression;
    exports2.assignmentExpression = assignmentExpression;
    exports2.assignmentPattern = assignmentPattern;
    exports2.awaitExpression = awaitExpression;
    exports2.bigIntLiteral = bigIntLiteral;
    exports2.binaryExpression = binaryExpression;
    exports2.bindExpression = bindExpression;
    exports2.blockStatement = blockStatement;
    exports2.booleanLiteral = booleanLiteral;
    exports2.booleanLiteralTypeAnnotation = booleanLiteralTypeAnnotation;
    exports2.booleanTypeAnnotation = booleanTypeAnnotation;
    exports2.breakStatement = breakStatement;
    exports2.callExpression = callExpression;
    exports2.catchClause = catchClause;
    exports2.classAccessorProperty = classAccessorProperty;
    exports2.classBody = classBody;
    exports2.classDeclaration = classDeclaration;
    exports2.classExpression = classExpression;
    exports2.classImplements = classImplements;
    exports2.classMethod = classMethod;
    exports2.classPrivateMethod = classPrivateMethod;
    exports2.classPrivateProperty = classPrivateProperty;
    exports2.classProperty = classProperty;
    exports2.conditionalExpression = conditionalExpression;
    exports2.continueStatement = continueStatement;
    exports2.debuggerStatement = debuggerStatement;
    exports2.decimalLiteral = decimalLiteral;
    exports2.declareClass = declareClass;
    exports2.declareExportAllDeclaration = declareExportAllDeclaration;
    exports2.declareExportDeclaration = declareExportDeclaration;
    exports2.declareFunction = declareFunction;
    exports2.declareInterface = declareInterface;
    exports2.declareModule = declareModule;
    exports2.declareModuleExports = declareModuleExports;
    exports2.declareOpaqueType = declareOpaqueType;
    exports2.declareTypeAlias = declareTypeAlias;
    exports2.declareVariable = declareVariable;
    exports2.declaredPredicate = declaredPredicate;
    exports2.decorator = decorator;
    exports2.directive = directive;
    exports2.directiveLiteral = directiveLiteral;
    exports2.doExpression = doExpression;
    exports2.doWhileStatement = doWhileStatement;
    exports2.emptyStatement = emptyStatement;
    exports2.emptyTypeAnnotation = emptyTypeAnnotation;
    exports2.enumBooleanBody = enumBooleanBody;
    exports2.enumBooleanMember = enumBooleanMember;
    exports2.enumDeclaration = enumDeclaration;
    exports2.enumDefaultedMember = enumDefaultedMember;
    exports2.enumNumberBody = enumNumberBody;
    exports2.enumNumberMember = enumNumberMember;
    exports2.enumStringBody = enumStringBody;
    exports2.enumStringMember = enumStringMember;
    exports2.enumSymbolBody = enumSymbolBody;
    exports2.existsTypeAnnotation = existsTypeAnnotation;
    exports2.exportAllDeclaration = exportAllDeclaration;
    exports2.exportDefaultDeclaration = exportDefaultDeclaration;
    exports2.exportDefaultSpecifier = exportDefaultSpecifier;
    exports2.exportNamedDeclaration = exportNamedDeclaration;
    exports2.exportNamespaceSpecifier = exportNamespaceSpecifier;
    exports2.exportSpecifier = exportSpecifier;
    exports2.expressionStatement = expressionStatement;
    exports2.file = file;
    exports2.forInStatement = forInStatement;
    exports2.forOfStatement = forOfStatement;
    exports2.forStatement = forStatement;
    exports2.functionDeclaration = functionDeclaration;
    exports2.functionExpression = functionExpression;
    exports2.functionTypeAnnotation = functionTypeAnnotation;
    exports2.functionTypeParam = functionTypeParam;
    exports2.genericTypeAnnotation = genericTypeAnnotation;
    exports2.identifier = identifier;
    exports2.ifStatement = ifStatement;
    exports2.import = _import;
    exports2.importAttribute = importAttribute;
    exports2.importDeclaration = importDeclaration;
    exports2.importDefaultSpecifier = importDefaultSpecifier;
    exports2.importNamespaceSpecifier = importNamespaceSpecifier;
    exports2.importSpecifier = importSpecifier;
    exports2.indexedAccessType = indexedAccessType;
    exports2.inferredPredicate = inferredPredicate;
    exports2.interfaceDeclaration = interfaceDeclaration;
    exports2.interfaceExtends = interfaceExtends;
    exports2.interfaceTypeAnnotation = interfaceTypeAnnotation;
    exports2.interpreterDirective = interpreterDirective;
    exports2.intersectionTypeAnnotation = intersectionTypeAnnotation;
    exports2.jSXAttribute = exports2.jsxAttribute = jsxAttribute;
    exports2.jSXClosingElement = exports2.jsxClosingElement = jsxClosingElement;
    exports2.jSXClosingFragment = exports2.jsxClosingFragment = jsxClosingFragment;
    exports2.jSXElement = exports2.jsxElement = jsxElement;
    exports2.jSXEmptyExpression = exports2.jsxEmptyExpression = jsxEmptyExpression;
    exports2.jSXExpressionContainer = exports2.jsxExpressionContainer = jsxExpressionContainer;
    exports2.jSXFragment = exports2.jsxFragment = jsxFragment;
    exports2.jSXIdentifier = exports2.jsxIdentifier = jsxIdentifier;
    exports2.jSXMemberExpression = exports2.jsxMemberExpression = jsxMemberExpression;
    exports2.jSXNamespacedName = exports2.jsxNamespacedName = jsxNamespacedName;
    exports2.jSXOpeningElement = exports2.jsxOpeningElement = jsxOpeningElement;
    exports2.jSXOpeningFragment = exports2.jsxOpeningFragment = jsxOpeningFragment;
    exports2.jSXSpreadAttribute = exports2.jsxSpreadAttribute = jsxSpreadAttribute;
    exports2.jSXSpreadChild = exports2.jsxSpreadChild = jsxSpreadChild;
    exports2.jSXText = exports2.jsxText = jsxText;
    exports2.labeledStatement = labeledStatement;
    exports2.logicalExpression = logicalExpression;
    exports2.memberExpression = memberExpression;
    exports2.metaProperty = metaProperty;
    exports2.mixedTypeAnnotation = mixedTypeAnnotation;
    exports2.moduleExpression = moduleExpression;
    exports2.newExpression = newExpression;
    exports2.noop = noop;
    exports2.nullLiteral = nullLiteral;
    exports2.nullLiteralTypeAnnotation = nullLiteralTypeAnnotation;
    exports2.nullableTypeAnnotation = nullableTypeAnnotation;
    exports2.numberLiteral = NumberLiteral;
    exports2.numberLiteralTypeAnnotation = numberLiteralTypeAnnotation;
    exports2.numberTypeAnnotation = numberTypeAnnotation;
    exports2.numericLiteral = numericLiteral;
    exports2.objectExpression = objectExpression;
    exports2.objectMethod = objectMethod;
    exports2.objectPattern = objectPattern;
    exports2.objectProperty = objectProperty;
    exports2.objectTypeAnnotation = objectTypeAnnotation;
    exports2.objectTypeCallProperty = objectTypeCallProperty;
    exports2.objectTypeIndexer = objectTypeIndexer;
    exports2.objectTypeInternalSlot = objectTypeInternalSlot;
    exports2.objectTypeProperty = objectTypeProperty;
    exports2.objectTypeSpreadProperty = objectTypeSpreadProperty;
    exports2.opaqueType = opaqueType;
    exports2.optionalCallExpression = optionalCallExpression;
    exports2.optionalIndexedAccessType = optionalIndexedAccessType;
    exports2.optionalMemberExpression = optionalMemberExpression;
    exports2.parenthesizedExpression = parenthesizedExpression;
    exports2.pipelineBareFunction = pipelineBareFunction;
    exports2.pipelinePrimaryTopicReference = pipelinePrimaryTopicReference;
    exports2.pipelineTopicExpression = pipelineTopicExpression;
    exports2.placeholder = placeholder;
    exports2.privateName = privateName;
    exports2.program = program;
    exports2.qualifiedTypeIdentifier = qualifiedTypeIdentifier;
    exports2.recordExpression = recordExpression;
    exports2.regExpLiteral = regExpLiteral;
    exports2.regexLiteral = RegexLiteral;
    exports2.restElement = restElement;
    exports2.restProperty = RestProperty;
    exports2.returnStatement = returnStatement;
    exports2.sequenceExpression = sequenceExpression;
    exports2.spreadElement = spreadElement;
    exports2.spreadProperty = SpreadProperty;
    exports2.staticBlock = staticBlock;
    exports2.stringLiteral = stringLiteral;
    exports2.stringLiteralTypeAnnotation = stringLiteralTypeAnnotation;
    exports2.stringTypeAnnotation = stringTypeAnnotation;
    exports2.super = _super;
    exports2.switchCase = switchCase;
    exports2.switchStatement = switchStatement;
    exports2.symbolTypeAnnotation = symbolTypeAnnotation;
    exports2.taggedTemplateExpression = taggedTemplateExpression;
    exports2.templateElement = templateElement;
    exports2.templateLiteral = templateLiteral;
    exports2.thisExpression = thisExpression;
    exports2.thisTypeAnnotation = thisTypeAnnotation;
    exports2.throwStatement = throwStatement;
    exports2.topicReference = topicReference;
    exports2.tryStatement = tryStatement;
    exports2.tSAnyKeyword = exports2.tsAnyKeyword = tsAnyKeyword;
    exports2.tSArrayType = exports2.tsArrayType = tsArrayType;
    exports2.tSAsExpression = exports2.tsAsExpression = tsAsExpression;
    exports2.tSBigIntKeyword = exports2.tsBigIntKeyword = tsBigIntKeyword;
    exports2.tSBooleanKeyword = exports2.tsBooleanKeyword = tsBooleanKeyword;
    exports2.tSCallSignatureDeclaration = exports2.tsCallSignatureDeclaration = tsCallSignatureDeclaration;
    exports2.tSConditionalType = exports2.tsConditionalType = tsConditionalType;
    exports2.tSConstructSignatureDeclaration = exports2.tsConstructSignatureDeclaration = tsConstructSignatureDeclaration;
    exports2.tSConstructorType = exports2.tsConstructorType = tsConstructorType;
    exports2.tSDeclareFunction = exports2.tsDeclareFunction = tsDeclareFunction;
    exports2.tSDeclareMethod = exports2.tsDeclareMethod = tsDeclareMethod;
    exports2.tSEnumDeclaration = exports2.tsEnumDeclaration = tsEnumDeclaration;
    exports2.tSEnumMember = exports2.tsEnumMember = tsEnumMember;
    exports2.tSExportAssignment = exports2.tsExportAssignment = tsExportAssignment;
    exports2.tSExpressionWithTypeArguments = exports2.tsExpressionWithTypeArguments = tsExpressionWithTypeArguments;
    exports2.tSExternalModuleReference = exports2.tsExternalModuleReference = tsExternalModuleReference;
    exports2.tSFunctionType = exports2.tsFunctionType = tsFunctionType;
    exports2.tSImportEqualsDeclaration = exports2.tsImportEqualsDeclaration = tsImportEqualsDeclaration;
    exports2.tSImportType = exports2.tsImportType = tsImportType;
    exports2.tSIndexSignature = exports2.tsIndexSignature = tsIndexSignature;
    exports2.tSIndexedAccessType = exports2.tsIndexedAccessType = tsIndexedAccessType;
    exports2.tSInferType = exports2.tsInferType = tsInferType;
    exports2.tSInstantiationExpression = exports2.tsInstantiationExpression = tsInstantiationExpression;
    exports2.tSInterfaceBody = exports2.tsInterfaceBody = tsInterfaceBody;
    exports2.tSInterfaceDeclaration = exports2.tsInterfaceDeclaration = tsInterfaceDeclaration;
    exports2.tSIntersectionType = exports2.tsIntersectionType = tsIntersectionType;
    exports2.tSIntrinsicKeyword = exports2.tsIntrinsicKeyword = tsIntrinsicKeyword;
    exports2.tSLiteralType = exports2.tsLiteralType = tsLiteralType;
    exports2.tSMappedType = exports2.tsMappedType = tsMappedType;
    exports2.tSMethodSignature = exports2.tsMethodSignature = tsMethodSignature;
    exports2.tSModuleBlock = exports2.tsModuleBlock = tsModuleBlock;
    exports2.tSModuleDeclaration = exports2.tsModuleDeclaration = tsModuleDeclaration;
    exports2.tSNamedTupleMember = exports2.tsNamedTupleMember = tsNamedTupleMember;
    exports2.tSNamespaceExportDeclaration = exports2.tsNamespaceExportDeclaration = tsNamespaceExportDeclaration;
    exports2.tSNeverKeyword = exports2.tsNeverKeyword = tsNeverKeyword;
    exports2.tSNonNullExpression = exports2.tsNonNullExpression = tsNonNullExpression;
    exports2.tSNullKeyword = exports2.tsNullKeyword = tsNullKeyword;
    exports2.tSNumberKeyword = exports2.tsNumberKeyword = tsNumberKeyword;
    exports2.tSObjectKeyword = exports2.tsObjectKeyword = tsObjectKeyword;
    exports2.tSOptionalType = exports2.tsOptionalType = tsOptionalType;
    exports2.tSParameterProperty = exports2.tsParameterProperty = tsParameterProperty;
    exports2.tSParenthesizedType = exports2.tsParenthesizedType = tsParenthesizedType;
    exports2.tSPropertySignature = exports2.tsPropertySignature = tsPropertySignature;
    exports2.tSQualifiedName = exports2.tsQualifiedName = tsQualifiedName;
    exports2.tSRestType = exports2.tsRestType = tsRestType;
    exports2.tSStringKeyword = exports2.tsStringKeyword = tsStringKeyword;
    exports2.tSSymbolKeyword = exports2.tsSymbolKeyword = tsSymbolKeyword;
    exports2.tSThisType = exports2.tsThisType = tsThisType;
    exports2.tSTupleType = exports2.tsTupleType = tsTupleType;
    exports2.tSTypeAliasDeclaration = exports2.tsTypeAliasDeclaration = tsTypeAliasDeclaration;
    exports2.tSTypeAnnotation = exports2.tsTypeAnnotation = tsTypeAnnotation;
    exports2.tSTypeAssertion = exports2.tsTypeAssertion = tsTypeAssertion;
    exports2.tSTypeLiteral = exports2.tsTypeLiteral = tsTypeLiteral;
    exports2.tSTypeOperator = exports2.tsTypeOperator = tsTypeOperator;
    exports2.tSTypeParameter = exports2.tsTypeParameter = tsTypeParameter;
    exports2.tSTypeParameterDeclaration = exports2.tsTypeParameterDeclaration = tsTypeParameterDeclaration;
    exports2.tSTypeParameterInstantiation = exports2.tsTypeParameterInstantiation = tsTypeParameterInstantiation;
    exports2.tSTypePredicate = exports2.tsTypePredicate = tsTypePredicate;
    exports2.tSTypeQuery = exports2.tsTypeQuery = tsTypeQuery;
    exports2.tSTypeReference = exports2.tsTypeReference = tsTypeReference;
    exports2.tSUndefinedKeyword = exports2.tsUndefinedKeyword = tsUndefinedKeyword;
    exports2.tSUnionType = exports2.tsUnionType = tsUnionType;
    exports2.tSUnknownKeyword = exports2.tsUnknownKeyword = tsUnknownKeyword;
    exports2.tSVoidKeyword = exports2.tsVoidKeyword = tsVoidKeyword;
    exports2.tupleExpression = tupleExpression;
    exports2.tupleTypeAnnotation = tupleTypeAnnotation;
    exports2.typeAlias = typeAlias;
    exports2.typeAnnotation = typeAnnotation;
    exports2.typeCastExpression = typeCastExpression;
    exports2.typeParameter = typeParameter;
    exports2.typeParameterDeclaration = typeParameterDeclaration;
    exports2.typeParameterInstantiation = typeParameterInstantiation;
    exports2.typeofTypeAnnotation = typeofTypeAnnotation;
    exports2.unaryExpression = unaryExpression;
    exports2.unionTypeAnnotation = unionTypeAnnotation;
    exports2.updateExpression = updateExpression;
    exports2.v8IntrinsicIdentifier = v8IntrinsicIdentifier;
    exports2.variableDeclaration = variableDeclaration;
    exports2.variableDeclarator = variableDeclarator;
    exports2.variance = variance;
    exports2.voidTypeAnnotation = voidTypeAnnotation;
    exports2.whileStatement = whileStatement;
    exports2.withStatement = withStatement;
    exports2.yieldExpression = yieldExpression;
    var _validateNode = require_validateNode();
    function arrayExpression(elements = []) {
      return (0, _validateNode.default)({
        type: "ArrayExpression",
        elements
      });
    }
    function assignmentExpression(operator, left, right) {
      return (0, _validateNode.default)({
        type: "AssignmentExpression",
        operator,
        left,
        right
      });
    }
    function binaryExpression(operator, left, right) {
      return (0, _validateNode.default)({
        type: "BinaryExpression",
        operator,
        left,
        right
      });
    }
    function interpreterDirective(value) {
      return (0, _validateNode.default)({
        type: "InterpreterDirective",
        value
      });
    }
    function directive(value) {
      return (0, _validateNode.default)({
        type: "Directive",
        value
      });
    }
    function directiveLiteral(value) {
      return (0, _validateNode.default)({
        type: "DirectiveLiteral",
        value
      });
    }
    function blockStatement(body, directives = []) {
      return (0, _validateNode.default)({
        type: "BlockStatement",
        body,
        directives
      });
    }
    function breakStatement(label = null) {
      return (0, _validateNode.default)({
        type: "BreakStatement",
        label
      });
    }
    function callExpression(callee, _arguments) {
      return (0, _validateNode.default)({
        type: "CallExpression",
        callee,
        arguments: _arguments
      });
    }
    function catchClause(param = null, body) {
      return (0, _validateNode.default)({
        type: "CatchClause",
        param,
        body
      });
    }
    function conditionalExpression(test, consequent, alternate) {
      return (0, _validateNode.default)({
        type: "ConditionalExpression",
        test,
        consequent,
        alternate
      });
    }
    function continueStatement(label = null) {
      return (0, _validateNode.default)({
        type: "ContinueStatement",
        label
      });
    }
    function debuggerStatement() {
      return {
        type: "DebuggerStatement"
      };
    }
    function doWhileStatement(test, body) {
      return (0, _validateNode.default)({
        type: "DoWhileStatement",
        test,
        body
      });
    }
    function emptyStatement() {
      return {
        type: "EmptyStatement"
      };
    }
    function expressionStatement(expression) {
      return (0, _validateNode.default)({
        type: "ExpressionStatement",
        expression
      });
    }
    function file(program2, comments = null, tokens = null) {
      return (0, _validateNode.default)({
        type: "File",
        program: program2,
        comments,
        tokens
      });
    }
    function forInStatement(left, right, body) {
      return (0, _validateNode.default)({
        type: "ForInStatement",
        left,
        right,
        body
      });
    }
    function forStatement(init = null, test = null, update = null, body) {
      return (0, _validateNode.default)({
        type: "ForStatement",
        init,
        test,
        update,
        body
      });
    }
    function functionDeclaration(id = null, params, body, generator = false, async = false) {
      return (0, _validateNode.default)({
        type: "FunctionDeclaration",
        id,
        params,
        body,
        generator,
        async
      });
    }
    function functionExpression(id = null, params, body, generator = false, async = false) {
      return (0, _validateNode.default)({
        type: "FunctionExpression",
        id,
        params,
        body,
        generator,
        async
      });
    }
    function identifier(name) {
      return (0, _validateNode.default)({
        type: "Identifier",
        name
      });
    }
    function ifStatement(test, consequent, alternate = null) {
      return (0, _validateNode.default)({
        type: "IfStatement",
        test,
        consequent,
        alternate
      });
    }
    function labeledStatement(label, body) {
      return (0, _validateNode.default)({
        type: "LabeledStatement",
        label,
        body
      });
    }
    function stringLiteral(value) {
      return (0, _validateNode.default)({
        type: "StringLiteral",
        value
      });
    }
    function numericLiteral(value) {
      return (0, _validateNode.default)({
        type: "NumericLiteral",
        value
      });
    }
    function nullLiteral() {
      return {
        type: "NullLiteral"
      };
    }
    function booleanLiteral(value) {
      return (0, _validateNode.default)({
        type: "BooleanLiteral",
        value
      });
    }
    function regExpLiteral(pattern, flags = "") {
      return (0, _validateNode.default)({
        type: "RegExpLiteral",
        pattern,
        flags
      });
    }
    function logicalExpression(operator, left, right) {
      return (0, _validateNode.default)({
        type: "LogicalExpression",
        operator,
        left,
        right
      });
    }
    function memberExpression(object, property, computed = false, optional = null) {
      return (0, _validateNode.default)({
        type: "MemberExpression",
        object,
        property,
        computed,
        optional
      });
    }
    function newExpression(callee, _arguments) {
      return (0, _validateNode.default)({
        type: "NewExpression",
        callee,
        arguments: _arguments
      });
    }
    function program(body, directives = [], sourceType = "script", interpreter = null) {
      return (0, _validateNode.default)({
        type: "Program",
        body,
        directives,
        sourceType,
        interpreter,
        sourceFile: null
      });
    }
    function objectExpression(properties) {
      return (0, _validateNode.default)({
        type: "ObjectExpression",
        properties
      });
    }
    function objectMethod(kind = "method", key, params, body, computed = false, generator = false, async = false) {
      return (0, _validateNode.default)({
        type: "ObjectMethod",
        kind,
        key,
        params,
        body,
        computed,
        generator,
        async
      });
    }
    function objectProperty(key, value, computed = false, shorthand = false, decorators = null) {
      return (0, _validateNode.default)({
        type: "ObjectProperty",
        key,
        value,
        computed,
        shorthand,
        decorators
      });
    }
    function restElement(argument) {
      return (0, _validateNode.default)({
        type: "RestElement",
        argument
      });
    }
    function returnStatement(argument = null) {
      return (0, _validateNode.default)({
        type: "ReturnStatement",
        argument
      });
    }
    function sequenceExpression(expressions) {
      return (0, _validateNode.default)({
        type: "SequenceExpression",
        expressions
      });
    }
    function parenthesizedExpression(expression) {
      return (0, _validateNode.default)({
        type: "ParenthesizedExpression",
        expression
      });
    }
    function switchCase(test = null, consequent) {
      return (0, _validateNode.default)({
        type: "SwitchCase",
        test,
        consequent
      });
    }
    function switchStatement(discriminant, cases) {
      return (0, _validateNode.default)({
        type: "SwitchStatement",
        discriminant,
        cases
      });
    }
    function thisExpression() {
      return {
        type: "ThisExpression"
      };
    }
    function throwStatement(argument) {
      return (0, _validateNode.default)({
        type: "ThrowStatement",
        argument
      });
    }
    function tryStatement(block, handler = null, finalizer = null) {
      return (0, _validateNode.default)({
        type: "TryStatement",
        block,
        handler,
        finalizer
      });
    }
    function unaryExpression(operator, argument, prefix = true) {
      return (0, _validateNode.default)({
        type: "UnaryExpression",
        operator,
        argument,
        prefix
      });
    }
    function updateExpression(operator, argument, prefix = false) {
      return (0, _validateNode.default)({
        type: "UpdateExpression",
        operator,
        argument,
        prefix
      });
    }
    function variableDeclaration(kind, declarations) {
      return (0, _validateNode.default)({
        type: "VariableDeclaration",
        kind,
        declarations
      });
    }
    function variableDeclarator(id, init = null) {
      return (0, _validateNode.default)({
        type: "VariableDeclarator",
        id,
        init
      });
    }
    function whileStatement(test, body) {
      return (0, _validateNode.default)({
        type: "WhileStatement",
        test,
        body
      });
    }
    function withStatement(object, body) {
      return (0, _validateNode.default)({
        type: "WithStatement",
        object,
        body
      });
    }
    function assignmentPattern(left, right) {
      return (0, _validateNode.default)({
        type: "AssignmentPattern",
        left,
        right
      });
    }
    function arrayPattern(elements) {
      return (0, _validateNode.default)({
        type: "ArrayPattern",
        elements
      });
    }
    function arrowFunctionExpression(params, body, async = false) {
      return (0, _validateNode.default)({
        type: "ArrowFunctionExpression",
        params,
        body,
        async,
        expression: null
      });
    }
    function classBody(body) {
      return (0, _validateNode.default)({
        type: "ClassBody",
        body
      });
    }
    function classExpression(id = null, superClass = null, body, decorators = null) {
      return (0, _validateNode.default)({
        type: "ClassExpression",
        id,
        superClass,
        body,
        decorators
      });
    }
    function classDeclaration(id, superClass = null, body, decorators = null) {
      return (0, _validateNode.default)({
        type: "ClassDeclaration",
        id,
        superClass,
        body,
        decorators
      });
    }
    function exportAllDeclaration(source) {
      return (0, _validateNode.default)({
        type: "ExportAllDeclaration",
        source
      });
    }
    function exportDefaultDeclaration(declaration) {
      return (0, _validateNode.default)({
        type: "ExportDefaultDeclaration",
        declaration
      });
    }
    function exportNamedDeclaration(declaration = null, specifiers = [], source = null) {
      return (0, _validateNode.default)({
        type: "ExportNamedDeclaration",
        declaration,
        specifiers,
        source
      });
    }
    function exportSpecifier(local, exported) {
      return (0, _validateNode.default)({
        type: "ExportSpecifier",
        local,
        exported
      });
    }
    function forOfStatement(left, right, body, _await = false) {
      return (0, _validateNode.default)({
        type: "ForOfStatement",
        left,
        right,
        body,
        await: _await
      });
    }
    function importDeclaration(specifiers, source) {
      return (0, _validateNode.default)({
        type: "ImportDeclaration",
        specifiers,
        source
      });
    }
    function importDefaultSpecifier(local) {
      return (0, _validateNode.default)({
        type: "ImportDefaultSpecifier",
        local
      });
    }
    function importNamespaceSpecifier(local) {
      return (0, _validateNode.default)({
        type: "ImportNamespaceSpecifier",
        local
      });
    }
    function importSpecifier(local, imported) {
      return (0, _validateNode.default)({
        type: "ImportSpecifier",
        local,
        imported
      });
    }
    function metaProperty(meta, property) {
      return (0, _validateNode.default)({
        type: "MetaProperty",
        meta,
        property
      });
    }
    function classMethod(kind = "method", key, params, body, computed = false, _static = false, generator = false, async = false) {
      return (0, _validateNode.default)({
        type: "ClassMethod",
        kind,
        key,
        params,
        body,
        computed,
        static: _static,
        generator,
        async
      });
    }
    function objectPattern(properties) {
      return (0, _validateNode.default)({
        type: "ObjectPattern",
        properties
      });
    }
    function spreadElement(argument) {
      return (0, _validateNode.default)({
        type: "SpreadElement",
        argument
      });
    }
    function _super() {
      return {
        type: "Super"
      };
    }
    function taggedTemplateExpression(tag, quasi) {
      return (0, _validateNode.default)({
        type: "TaggedTemplateExpression",
        tag,
        quasi
      });
    }
    function templateElement(value, tail = false) {
      return (0, _validateNode.default)({
        type: "TemplateElement",
        value,
        tail
      });
    }
    function templateLiteral(quasis, expressions) {
      return (0, _validateNode.default)({
        type: "TemplateLiteral",
        quasis,
        expressions
      });
    }
    function yieldExpression(argument = null, delegate = false) {
      return (0, _validateNode.default)({
        type: "YieldExpression",
        argument,
        delegate
      });
    }
    function awaitExpression(argument) {
      return (0, _validateNode.default)({
        type: "AwaitExpression",
        argument
      });
    }
    function _import() {
      return {
        type: "Import"
      };
    }
    function bigIntLiteral(value) {
      return (0, _validateNode.default)({
        type: "BigIntLiteral",
        value
      });
    }
    function exportNamespaceSpecifier(exported) {
      return (0, _validateNode.default)({
        type: "ExportNamespaceSpecifier",
        exported
      });
    }
    function optionalMemberExpression(object, property, computed = false, optional) {
      return (0, _validateNode.default)({
        type: "OptionalMemberExpression",
        object,
        property,
        computed,
        optional
      });
    }
    function optionalCallExpression(callee, _arguments, optional) {
      return (0, _validateNode.default)({
        type: "OptionalCallExpression",
        callee,
        arguments: _arguments,
        optional
      });
    }
    function classProperty(key, value = null, typeAnnotation2 = null, decorators = null, computed = false, _static = false) {
      return (0, _validateNode.default)({
        type: "ClassProperty",
        key,
        value,
        typeAnnotation: typeAnnotation2,
        decorators,
        computed,
        static: _static
      });
    }
    function classAccessorProperty(key, value = null, typeAnnotation2 = null, decorators = null, computed = false, _static = false) {
      return (0, _validateNode.default)({
        type: "ClassAccessorProperty",
        key,
        value,
        typeAnnotation: typeAnnotation2,
        decorators,
        computed,
        static: _static
      });
    }
    function classPrivateProperty(key, value = null, decorators = null, _static = false) {
      return (0, _validateNode.default)({
        type: "ClassPrivateProperty",
        key,
        value,
        decorators,
        static: _static
      });
    }
    function classPrivateMethod(kind = "method", key, params, body, _static = false) {
      return (0, _validateNode.default)({
        type: "ClassPrivateMethod",
        kind,
        key,
        params,
        body,
        static: _static
      });
    }
    function privateName(id) {
      return (0, _validateNode.default)({
        type: "PrivateName",
        id
      });
    }
    function staticBlock(body) {
      return (0, _validateNode.default)({
        type: "StaticBlock",
        body
      });
    }
    function anyTypeAnnotation() {
      return {
        type: "AnyTypeAnnotation"
      };
    }
    function arrayTypeAnnotation(elementType) {
      return (0, _validateNode.default)({
        type: "ArrayTypeAnnotation",
        elementType
      });
    }
    function booleanTypeAnnotation() {
      return {
        type: "BooleanTypeAnnotation"
      };
    }
    function booleanLiteralTypeAnnotation(value) {
      return (0, _validateNode.default)({
        type: "BooleanLiteralTypeAnnotation",
        value
      });
    }
    function nullLiteralTypeAnnotation() {
      return {
        type: "NullLiteralTypeAnnotation"
      };
    }
    function classImplements(id, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "ClassImplements",
        id,
        typeParameters
      });
    }
    function declareClass(id, typeParameters = null, _extends = null, body) {
      return (0, _validateNode.default)({
        type: "DeclareClass",
        id,
        typeParameters,
        extends: _extends,
        body
      });
    }
    function declareFunction(id) {
      return (0, _validateNode.default)({
        type: "DeclareFunction",
        id
      });
    }
    function declareInterface(id, typeParameters = null, _extends = null, body) {
      return (0, _validateNode.default)({
        type: "DeclareInterface",
        id,
        typeParameters,
        extends: _extends,
        body
      });
    }
    function declareModule(id, body, kind = null) {
      return (0, _validateNode.default)({
        type: "DeclareModule",
        id,
        body,
        kind
      });
    }
    function declareModuleExports(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "DeclareModuleExports",
        typeAnnotation: typeAnnotation2
      });
    }
    function declareTypeAlias(id, typeParameters = null, right) {
      return (0, _validateNode.default)({
        type: "DeclareTypeAlias",
        id,
        typeParameters,
        right
      });
    }
    function declareOpaqueType(id, typeParameters = null, supertype = null) {
      return (0, _validateNode.default)({
        type: "DeclareOpaqueType",
        id,
        typeParameters,
        supertype
      });
    }
    function declareVariable(id) {
      return (0, _validateNode.default)({
        type: "DeclareVariable",
        id
      });
    }
    function declareExportDeclaration(declaration = null, specifiers = null, source = null) {
      return (0, _validateNode.default)({
        type: "DeclareExportDeclaration",
        declaration,
        specifiers,
        source
      });
    }
    function declareExportAllDeclaration(source) {
      return (0, _validateNode.default)({
        type: "DeclareExportAllDeclaration",
        source
      });
    }
    function declaredPredicate(value) {
      return (0, _validateNode.default)({
        type: "DeclaredPredicate",
        value
      });
    }
    function existsTypeAnnotation() {
      return {
        type: "ExistsTypeAnnotation"
      };
    }
    function functionTypeAnnotation(typeParameters = null, params, rest = null, returnType) {
      return (0, _validateNode.default)({
        type: "FunctionTypeAnnotation",
        typeParameters,
        params,
        rest,
        returnType
      });
    }
    function functionTypeParam(name = null, typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "FunctionTypeParam",
        name,
        typeAnnotation: typeAnnotation2
      });
    }
    function genericTypeAnnotation(id, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "GenericTypeAnnotation",
        id,
        typeParameters
      });
    }
    function inferredPredicate() {
      return {
        type: "InferredPredicate"
      };
    }
    function interfaceExtends(id, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "InterfaceExtends",
        id,
        typeParameters
      });
    }
    function interfaceDeclaration(id, typeParameters = null, _extends = null, body) {
      return (0, _validateNode.default)({
        type: "InterfaceDeclaration",
        id,
        typeParameters,
        extends: _extends,
        body
      });
    }
    function interfaceTypeAnnotation(_extends = null, body) {
      return (0, _validateNode.default)({
        type: "InterfaceTypeAnnotation",
        extends: _extends,
        body
      });
    }
    function intersectionTypeAnnotation(types) {
      return (0, _validateNode.default)({
        type: "IntersectionTypeAnnotation",
        types
      });
    }
    function mixedTypeAnnotation() {
      return {
        type: "MixedTypeAnnotation"
      };
    }
    function emptyTypeAnnotation() {
      return {
        type: "EmptyTypeAnnotation"
      };
    }
    function nullableTypeAnnotation(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "NullableTypeAnnotation",
        typeAnnotation: typeAnnotation2
      });
    }
    function numberLiteralTypeAnnotation(value) {
      return (0, _validateNode.default)({
        type: "NumberLiteralTypeAnnotation",
        value
      });
    }
    function numberTypeAnnotation() {
      return {
        type: "NumberTypeAnnotation"
      };
    }
    function objectTypeAnnotation(properties, indexers = [], callProperties = [], internalSlots = [], exact = false) {
      return (0, _validateNode.default)({
        type: "ObjectTypeAnnotation",
        properties,
        indexers,
        callProperties,
        internalSlots,
        exact
      });
    }
    function objectTypeInternalSlot(id, value, optional, _static, method) {
      return (0, _validateNode.default)({
        type: "ObjectTypeInternalSlot",
        id,
        value,
        optional,
        static: _static,
        method
      });
    }
    function objectTypeCallProperty(value) {
      return (0, _validateNode.default)({
        type: "ObjectTypeCallProperty",
        value,
        static: null
      });
    }
    function objectTypeIndexer(id = null, key, value, variance2 = null) {
      return (0, _validateNode.default)({
        type: "ObjectTypeIndexer",
        id,
        key,
        value,
        variance: variance2,
        static: null
      });
    }
    function objectTypeProperty(key, value, variance2 = null) {
      return (0, _validateNode.default)({
        type: "ObjectTypeProperty",
        key,
        value,
        variance: variance2,
        kind: null,
        method: null,
        optional: null,
        proto: null,
        static: null
      });
    }
    function objectTypeSpreadProperty(argument) {
      return (0, _validateNode.default)({
        type: "ObjectTypeSpreadProperty",
        argument
      });
    }
    function opaqueType(id, typeParameters = null, supertype = null, impltype) {
      return (0, _validateNode.default)({
        type: "OpaqueType",
        id,
        typeParameters,
        supertype,
        impltype
      });
    }
    function qualifiedTypeIdentifier(id, qualification) {
      return (0, _validateNode.default)({
        type: "QualifiedTypeIdentifier",
        id,
        qualification
      });
    }
    function stringLiteralTypeAnnotation(value) {
      return (0, _validateNode.default)({
        type: "StringLiteralTypeAnnotation",
        value
      });
    }
    function stringTypeAnnotation() {
      return {
        type: "StringTypeAnnotation"
      };
    }
    function symbolTypeAnnotation() {
      return {
        type: "SymbolTypeAnnotation"
      };
    }
    function thisTypeAnnotation() {
      return {
        type: "ThisTypeAnnotation"
      };
    }
    function tupleTypeAnnotation(types) {
      return (0, _validateNode.default)({
        type: "TupleTypeAnnotation",
        types
      });
    }
    function typeofTypeAnnotation(argument) {
      return (0, _validateNode.default)({
        type: "TypeofTypeAnnotation",
        argument
      });
    }
    function typeAlias(id, typeParameters = null, right) {
      return (0, _validateNode.default)({
        type: "TypeAlias",
        id,
        typeParameters,
        right
      });
    }
    function typeAnnotation(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TypeAnnotation",
        typeAnnotation: typeAnnotation2
      });
    }
    function typeCastExpression(expression, typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TypeCastExpression",
        expression,
        typeAnnotation: typeAnnotation2
      });
    }
    function typeParameter(bound = null, _default = null, variance2 = null) {
      return (0, _validateNode.default)({
        type: "TypeParameter",
        bound,
        default: _default,
        variance: variance2,
        name: null
      });
    }
    function typeParameterDeclaration(params) {
      return (0, _validateNode.default)({
        type: "TypeParameterDeclaration",
        params
      });
    }
    function typeParameterInstantiation(params) {
      return (0, _validateNode.default)({
        type: "TypeParameterInstantiation",
        params
      });
    }
    function unionTypeAnnotation(types) {
      return (0, _validateNode.default)({
        type: "UnionTypeAnnotation",
        types
      });
    }
    function variance(kind) {
      return (0, _validateNode.default)({
        type: "Variance",
        kind
      });
    }
    function voidTypeAnnotation() {
      return {
        type: "VoidTypeAnnotation"
      };
    }
    function enumDeclaration(id, body) {
      return (0, _validateNode.default)({
        type: "EnumDeclaration",
        id,
        body
      });
    }
    function enumBooleanBody(members) {
      return (0, _validateNode.default)({
        type: "EnumBooleanBody",
        members,
        explicitType: null,
        hasUnknownMembers: null
      });
    }
    function enumNumberBody(members) {
      return (0, _validateNode.default)({
        type: "EnumNumberBody",
        members,
        explicitType: null,
        hasUnknownMembers: null
      });
    }
    function enumStringBody(members) {
      return (0, _validateNode.default)({
        type: "EnumStringBody",
        members,
        explicitType: null,
        hasUnknownMembers: null
      });
    }
    function enumSymbolBody(members) {
      return (0, _validateNode.default)({
        type: "EnumSymbolBody",
        members,
        hasUnknownMembers: null
      });
    }
    function enumBooleanMember(id) {
      return (0, _validateNode.default)({
        type: "EnumBooleanMember",
        id,
        init: null
      });
    }
    function enumNumberMember(id, init) {
      return (0, _validateNode.default)({
        type: "EnumNumberMember",
        id,
        init
      });
    }
    function enumStringMember(id, init) {
      return (0, _validateNode.default)({
        type: "EnumStringMember",
        id,
        init
      });
    }
    function enumDefaultedMember(id) {
      return (0, _validateNode.default)({
        type: "EnumDefaultedMember",
        id
      });
    }
    function indexedAccessType(objectType, indexType) {
      return (0, _validateNode.default)({
        type: "IndexedAccessType",
        objectType,
        indexType
      });
    }
    function optionalIndexedAccessType(objectType, indexType) {
      return (0, _validateNode.default)({
        type: "OptionalIndexedAccessType",
        objectType,
        indexType,
        optional: null
      });
    }
    function jsxAttribute(name, value = null) {
      return (0, _validateNode.default)({
        type: "JSXAttribute",
        name,
        value
      });
    }
    function jsxClosingElement(name) {
      return (0, _validateNode.default)({
        type: "JSXClosingElement",
        name
      });
    }
    function jsxElement(openingElement, closingElement = null, children, selfClosing = null) {
      return (0, _validateNode.default)({
        type: "JSXElement",
        openingElement,
        closingElement,
        children,
        selfClosing
      });
    }
    function jsxEmptyExpression() {
      return {
        type: "JSXEmptyExpression"
      };
    }
    function jsxExpressionContainer(expression) {
      return (0, _validateNode.default)({
        type: "JSXExpressionContainer",
        expression
      });
    }
    function jsxSpreadChild(expression) {
      return (0, _validateNode.default)({
        type: "JSXSpreadChild",
        expression
      });
    }
    function jsxIdentifier(name) {
      return (0, _validateNode.default)({
        type: "JSXIdentifier",
        name
      });
    }
    function jsxMemberExpression(object, property) {
      return (0, _validateNode.default)({
        type: "JSXMemberExpression",
        object,
        property
      });
    }
    function jsxNamespacedName(namespace, name) {
      return (0, _validateNode.default)({
        type: "JSXNamespacedName",
        namespace,
        name
      });
    }
    function jsxOpeningElement(name, attributes, selfClosing = false) {
      return (0, _validateNode.default)({
        type: "JSXOpeningElement",
        name,
        attributes,
        selfClosing
      });
    }
    function jsxSpreadAttribute(argument) {
      return (0, _validateNode.default)({
        type: "JSXSpreadAttribute",
        argument
      });
    }
    function jsxText(value) {
      return (0, _validateNode.default)({
        type: "JSXText",
        value
      });
    }
    function jsxFragment(openingFragment, closingFragment, children) {
      return (0, _validateNode.default)({
        type: "JSXFragment",
        openingFragment,
        closingFragment,
        children
      });
    }
    function jsxOpeningFragment() {
      return {
        type: "JSXOpeningFragment"
      };
    }
    function jsxClosingFragment() {
      return {
        type: "JSXClosingFragment"
      };
    }
    function noop() {
      return {
        type: "Noop"
      };
    }
    function placeholder(expectedNode, name) {
      return (0, _validateNode.default)({
        type: "Placeholder",
        expectedNode,
        name
      });
    }
    function v8IntrinsicIdentifier(name) {
      return (0, _validateNode.default)({
        type: "V8IntrinsicIdentifier",
        name
      });
    }
    function argumentPlaceholder() {
      return {
        type: "ArgumentPlaceholder"
      };
    }
    function bindExpression(object, callee) {
      return (0, _validateNode.default)({
        type: "BindExpression",
        object,
        callee
      });
    }
    function importAttribute(key, value) {
      return (0, _validateNode.default)({
        type: "ImportAttribute",
        key,
        value
      });
    }
    function decorator(expression) {
      return (0, _validateNode.default)({
        type: "Decorator",
        expression
      });
    }
    function doExpression(body, async = false) {
      return (0, _validateNode.default)({
        type: "DoExpression",
        body,
        async
      });
    }
    function exportDefaultSpecifier(exported) {
      return (0, _validateNode.default)({
        type: "ExportDefaultSpecifier",
        exported
      });
    }
    function recordExpression(properties) {
      return (0, _validateNode.default)({
        type: "RecordExpression",
        properties
      });
    }
    function tupleExpression(elements = []) {
      return (0, _validateNode.default)({
        type: "TupleExpression",
        elements
      });
    }
    function decimalLiteral(value) {
      return (0, _validateNode.default)({
        type: "DecimalLiteral",
        value
      });
    }
    function moduleExpression(body) {
      return (0, _validateNode.default)({
        type: "ModuleExpression",
        body
      });
    }
    function topicReference() {
      return {
        type: "TopicReference"
      };
    }
    function pipelineTopicExpression(expression) {
      return (0, _validateNode.default)({
        type: "PipelineTopicExpression",
        expression
      });
    }
    function pipelineBareFunction(callee) {
      return (0, _validateNode.default)({
        type: "PipelineBareFunction",
        callee
      });
    }
    function pipelinePrimaryTopicReference() {
      return {
        type: "PipelinePrimaryTopicReference"
      };
    }
    function tsParameterProperty(parameter) {
      return (0, _validateNode.default)({
        type: "TSParameterProperty",
        parameter
      });
    }
    function tsDeclareFunction(id = null, typeParameters = null, params, returnType = null) {
      return (0, _validateNode.default)({
        type: "TSDeclareFunction",
        id,
        typeParameters,
        params,
        returnType
      });
    }
    function tsDeclareMethod(decorators = null, key, typeParameters = null, params, returnType = null) {
      return (0, _validateNode.default)({
        type: "TSDeclareMethod",
        decorators,
        key,
        typeParameters,
        params,
        returnType
      });
    }
    function tsQualifiedName(left, right) {
      return (0, _validateNode.default)({
        type: "TSQualifiedName",
        left,
        right
      });
    }
    function tsCallSignatureDeclaration(typeParameters = null, parameters, typeAnnotation2 = null) {
      return (0, _validateNode.default)({
        type: "TSCallSignatureDeclaration",
        typeParameters,
        parameters,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsConstructSignatureDeclaration(typeParameters = null, parameters, typeAnnotation2 = null) {
      return (0, _validateNode.default)({
        type: "TSConstructSignatureDeclaration",
        typeParameters,
        parameters,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsPropertySignature(key, typeAnnotation2 = null, initializer = null) {
      return (0, _validateNode.default)({
        type: "TSPropertySignature",
        key,
        typeAnnotation: typeAnnotation2,
        initializer,
        kind: null
      });
    }
    function tsMethodSignature(key, typeParameters = null, parameters, typeAnnotation2 = null) {
      return (0, _validateNode.default)({
        type: "TSMethodSignature",
        key,
        typeParameters,
        parameters,
        typeAnnotation: typeAnnotation2,
        kind: null
      });
    }
    function tsIndexSignature(parameters, typeAnnotation2 = null) {
      return (0, _validateNode.default)({
        type: "TSIndexSignature",
        parameters,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsAnyKeyword() {
      return {
        type: "TSAnyKeyword"
      };
    }
    function tsBooleanKeyword() {
      return {
        type: "TSBooleanKeyword"
      };
    }
    function tsBigIntKeyword() {
      return {
        type: "TSBigIntKeyword"
      };
    }
    function tsIntrinsicKeyword() {
      return {
        type: "TSIntrinsicKeyword"
      };
    }
    function tsNeverKeyword() {
      return {
        type: "TSNeverKeyword"
      };
    }
    function tsNullKeyword() {
      return {
        type: "TSNullKeyword"
      };
    }
    function tsNumberKeyword() {
      return {
        type: "TSNumberKeyword"
      };
    }
    function tsObjectKeyword() {
      return {
        type: "TSObjectKeyword"
      };
    }
    function tsStringKeyword() {
      return {
        type: "TSStringKeyword"
      };
    }
    function tsSymbolKeyword() {
      return {
        type: "TSSymbolKeyword"
      };
    }
    function tsUndefinedKeyword() {
      return {
        type: "TSUndefinedKeyword"
      };
    }
    function tsUnknownKeyword() {
      return {
        type: "TSUnknownKeyword"
      };
    }
    function tsVoidKeyword() {
      return {
        type: "TSVoidKeyword"
      };
    }
    function tsThisType() {
      return {
        type: "TSThisType"
      };
    }
    function tsFunctionType(typeParameters = null, parameters, typeAnnotation2 = null) {
      return (0, _validateNode.default)({
        type: "TSFunctionType",
        typeParameters,
        parameters,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsConstructorType(typeParameters = null, parameters, typeAnnotation2 = null) {
      return (0, _validateNode.default)({
        type: "TSConstructorType",
        typeParameters,
        parameters,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsTypeReference(typeName, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "TSTypeReference",
        typeName,
        typeParameters
      });
    }
    function tsTypePredicate(parameterName, typeAnnotation2 = null, asserts = null) {
      return (0, _validateNode.default)({
        type: "TSTypePredicate",
        parameterName,
        typeAnnotation: typeAnnotation2,
        asserts
      });
    }
    function tsTypeQuery(exprName, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "TSTypeQuery",
        exprName,
        typeParameters
      });
    }
    function tsTypeLiteral(members) {
      return (0, _validateNode.default)({
        type: "TSTypeLiteral",
        members
      });
    }
    function tsArrayType(elementType) {
      return (0, _validateNode.default)({
        type: "TSArrayType",
        elementType
      });
    }
    function tsTupleType(elementTypes) {
      return (0, _validateNode.default)({
        type: "TSTupleType",
        elementTypes
      });
    }
    function tsOptionalType(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSOptionalType",
        typeAnnotation: typeAnnotation2
      });
    }
    function tsRestType(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSRestType",
        typeAnnotation: typeAnnotation2
      });
    }
    function tsNamedTupleMember(label, elementType, optional = false) {
      return (0, _validateNode.default)({
        type: "TSNamedTupleMember",
        label,
        elementType,
        optional
      });
    }
    function tsUnionType(types) {
      return (0, _validateNode.default)({
        type: "TSUnionType",
        types
      });
    }
    function tsIntersectionType(types) {
      return (0, _validateNode.default)({
        type: "TSIntersectionType",
        types
      });
    }
    function tsConditionalType(checkType, extendsType, trueType, falseType) {
      return (0, _validateNode.default)({
        type: "TSConditionalType",
        checkType,
        extendsType,
        trueType,
        falseType
      });
    }
    function tsInferType(typeParameter2) {
      return (0, _validateNode.default)({
        type: "TSInferType",
        typeParameter: typeParameter2
      });
    }
    function tsParenthesizedType(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSParenthesizedType",
        typeAnnotation: typeAnnotation2
      });
    }
    function tsTypeOperator(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSTypeOperator",
        typeAnnotation: typeAnnotation2,
        operator: null
      });
    }
    function tsIndexedAccessType(objectType, indexType) {
      return (0, _validateNode.default)({
        type: "TSIndexedAccessType",
        objectType,
        indexType
      });
    }
    function tsMappedType(typeParameter2, typeAnnotation2 = null, nameType = null) {
      return (0, _validateNode.default)({
        type: "TSMappedType",
        typeParameter: typeParameter2,
        typeAnnotation: typeAnnotation2,
        nameType
      });
    }
    function tsLiteralType(literal) {
      return (0, _validateNode.default)({
        type: "TSLiteralType",
        literal
      });
    }
    function tsExpressionWithTypeArguments(expression, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "TSExpressionWithTypeArguments",
        expression,
        typeParameters
      });
    }
    function tsInterfaceDeclaration(id, typeParameters = null, _extends = null, body) {
      return (0, _validateNode.default)({
        type: "TSInterfaceDeclaration",
        id,
        typeParameters,
        extends: _extends,
        body
      });
    }
    function tsInterfaceBody(body) {
      return (0, _validateNode.default)({
        type: "TSInterfaceBody",
        body
      });
    }
    function tsTypeAliasDeclaration(id, typeParameters = null, typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSTypeAliasDeclaration",
        id,
        typeParameters,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsInstantiationExpression(expression, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "TSInstantiationExpression",
        expression,
        typeParameters
      });
    }
    function tsAsExpression(expression, typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSAsExpression",
        expression,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsTypeAssertion(typeAnnotation2, expression) {
      return (0, _validateNode.default)({
        type: "TSTypeAssertion",
        typeAnnotation: typeAnnotation2,
        expression
      });
    }
    function tsEnumDeclaration(id, members) {
      return (0, _validateNode.default)({
        type: "TSEnumDeclaration",
        id,
        members
      });
    }
    function tsEnumMember(id, initializer = null) {
      return (0, _validateNode.default)({
        type: "TSEnumMember",
        id,
        initializer
      });
    }
    function tsModuleDeclaration(id, body) {
      return (0, _validateNode.default)({
        type: "TSModuleDeclaration",
        id,
        body
      });
    }
    function tsModuleBlock(body) {
      return (0, _validateNode.default)({
        type: "TSModuleBlock",
        body
      });
    }
    function tsImportType(argument, qualifier = null, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "TSImportType",
        argument,
        qualifier,
        typeParameters
      });
    }
    function tsImportEqualsDeclaration(id, moduleReference) {
      return (0, _validateNode.default)({
        type: "TSImportEqualsDeclaration",
        id,
        moduleReference,
        isExport: null
      });
    }
    function tsExternalModuleReference(expression) {
      return (0, _validateNode.default)({
        type: "TSExternalModuleReference",
        expression
      });
    }
    function tsNonNullExpression(expression) {
      return (0, _validateNode.default)({
        type: "TSNonNullExpression",
        expression
      });
    }
    function tsExportAssignment(expression) {
      return (0, _validateNode.default)({
        type: "TSExportAssignment",
        expression
      });
    }
    function tsNamespaceExportDeclaration(id) {
      return (0, _validateNode.default)({
        type: "TSNamespaceExportDeclaration",
        id
      });
    }
    function tsTypeAnnotation(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSTypeAnnotation",
        typeAnnotation: typeAnnotation2
      });
    }
    function tsTypeParameterInstantiation(params) {
      return (0, _validateNode.default)({
        type: "TSTypeParameterInstantiation",
        params
      });
    }
    function tsTypeParameterDeclaration(params) {
      return (0, _validateNode.default)({
        type: "TSTypeParameterDeclaration",
        params
      });
    }
    function tsTypeParameter(constraint = null, _default = null, name) {
      return (0, _validateNode.default)({
        type: "TSTypeParameter",
        constraint,
        default: _default,
        name
      });
    }
    function NumberLiteral(value) {
      console.trace("The node type NumberLiteral has been renamed to NumericLiteral");
      return numericLiteral(value);
    }
    function RegexLiteral(pattern, flags = "") {
      console.trace("The node type RegexLiteral has been renamed to RegExpLiteral");
      return regExpLiteral(pattern, flags);
    }
    function RestProperty(argument) {
      console.trace("The node type RestProperty has been renamed to RestElement");
      return restElement(argument);
    }
    function SpreadProperty(argument) {
      console.trace("The node type SpreadProperty has been renamed to SpreadElement");
      return spreadElement(argument);
    }
  }
});

// node_modules/@babel/types/lib/utils/react/cleanJSXElementLiteralChild.js
var require_cleanJSXElementLiteralChild = __commonJS({
  "node_modules/@babel/types/lib/utils/react/cleanJSXElementLiteralChild.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = cleanJSXElementLiteralChild;
    var _generated = require_generated2();
    function cleanJSXElementLiteralChild(child, args2) {
      const lines = child.value.split(/\r\n|\n|\r/);
      let lastNonEmptyLine = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/[^ \t]/)) {
          lastNonEmptyLine = i;
        }
      }
      let str = "";
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isFirstLine = i === 0;
        const isLastLine = i === lines.length - 1;
        const isLastNonEmptyLine = i === lastNonEmptyLine;
        let trimmedLine = line.replace(/\t/g, " ");
        if (!isFirstLine) {
          trimmedLine = trimmedLine.replace(/^[ ]+/, "");
        }
        if (!isLastLine) {
          trimmedLine = trimmedLine.replace(/[ ]+$/, "");
        }
        if (trimmedLine) {
          if (!isLastNonEmptyLine) {
            trimmedLine += " ";
          }
          str += trimmedLine;
        }
      }
      if (str)
        args2.push((0, _generated.stringLiteral)(str));
    }
  }
});

// node_modules/@babel/types/lib/builders/react/buildChildren.js
var require_buildChildren = __commonJS({
  "node_modules/@babel/types/lib/builders/react/buildChildren.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = buildChildren;
    var _generated = require_generated();
    var _cleanJSXElementLiteralChild = require_cleanJSXElementLiteralChild();
    function buildChildren(node) {
      const elements = [];
      for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];
        if ((0, _generated.isJSXText)(child)) {
          (0, _cleanJSXElementLiteralChild.default)(child, elements);
          continue;
        }
        if ((0, _generated.isJSXExpressionContainer)(child))
          child = child.expression;
        if ((0, _generated.isJSXEmptyExpression)(child))
          continue;
        elements.push(child);
      }
      return elements;
    }
  }
});

// node_modules/@babel/types/lib/validators/isNode.js
var require_isNode = __commonJS({
  "node_modules/@babel/types/lib/validators/isNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isNode;
    var _definitions = require_definitions();
    function isNode(node) {
      return !!(node && _definitions.VISITOR_KEYS[node.type]);
    }
  }
});

// node_modules/@babel/types/lib/asserts/assertNode.js
var require_assertNode = __commonJS({
  "node_modules/@babel/types/lib/asserts/assertNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = assertNode;
    var _isNode = require_isNode();
    function assertNode(node) {
      if (!(0, _isNode.default)(node)) {
        var _node$type;
        const type = (_node$type = node == null ? void 0 : node.type) != null ? _node$type : JSON.stringify(node);
        throw new TypeError(`Not a valid node of type "${type}"`);
      }
    }
  }
});

// node_modules/@babel/types/lib/asserts/generated/index.js
var require_generated3 = __commonJS({
  "node_modules/@babel/types/lib/asserts/generated/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.assertAccessor = assertAccessor;
    exports2.assertAnyTypeAnnotation = assertAnyTypeAnnotation;
    exports2.assertArgumentPlaceholder = assertArgumentPlaceholder;
    exports2.assertArrayExpression = assertArrayExpression;
    exports2.assertArrayPattern = assertArrayPattern;
    exports2.assertArrayTypeAnnotation = assertArrayTypeAnnotation;
    exports2.assertArrowFunctionExpression = assertArrowFunctionExpression;
    exports2.assertAssignmentExpression = assertAssignmentExpression;
    exports2.assertAssignmentPattern = assertAssignmentPattern;
    exports2.assertAwaitExpression = assertAwaitExpression;
    exports2.assertBigIntLiteral = assertBigIntLiteral;
    exports2.assertBinary = assertBinary;
    exports2.assertBinaryExpression = assertBinaryExpression;
    exports2.assertBindExpression = assertBindExpression;
    exports2.assertBlock = assertBlock;
    exports2.assertBlockParent = assertBlockParent;
    exports2.assertBlockStatement = assertBlockStatement;
    exports2.assertBooleanLiteral = assertBooleanLiteral;
    exports2.assertBooleanLiteralTypeAnnotation = assertBooleanLiteralTypeAnnotation;
    exports2.assertBooleanTypeAnnotation = assertBooleanTypeAnnotation;
    exports2.assertBreakStatement = assertBreakStatement;
    exports2.assertCallExpression = assertCallExpression;
    exports2.assertCatchClause = assertCatchClause;
    exports2.assertClass = assertClass;
    exports2.assertClassAccessorProperty = assertClassAccessorProperty;
    exports2.assertClassBody = assertClassBody;
    exports2.assertClassDeclaration = assertClassDeclaration;
    exports2.assertClassExpression = assertClassExpression;
    exports2.assertClassImplements = assertClassImplements;
    exports2.assertClassMethod = assertClassMethod;
    exports2.assertClassPrivateMethod = assertClassPrivateMethod;
    exports2.assertClassPrivateProperty = assertClassPrivateProperty;
    exports2.assertClassProperty = assertClassProperty;
    exports2.assertCompletionStatement = assertCompletionStatement;
    exports2.assertConditional = assertConditional;
    exports2.assertConditionalExpression = assertConditionalExpression;
    exports2.assertContinueStatement = assertContinueStatement;
    exports2.assertDebuggerStatement = assertDebuggerStatement;
    exports2.assertDecimalLiteral = assertDecimalLiteral;
    exports2.assertDeclaration = assertDeclaration;
    exports2.assertDeclareClass = assertDeclareClass;
    exports2.assertDeclareExportAllDeclaration = assertDeclareExportAllDeclaration;
    exports2.assertDeclareExportDeclaration = assertDeclareExportDeclaration;
    exports2.assertDeclareFunction = assertDeclareFunction;
    exports2.assertDeclareInterface = assertDeclareInterface;
    exports2.assertDeclareModule = assertDeclareModule;
    exports2.assertDeclareModuleExports = assertDeclareModuleExports;
    exports2.assertDeclareOpaqueType = assertDeclareOpaqueType;
    exports2.assertDeclareTypeAlias = assertDeclareTypeAlias;
    exports2.assertDeclareVariable = assertDeclareVariable;
    exports2.assertDeclaredPredicate = assertDeclaredPredicate;
    exports2.assertDecorator = assertDecorator;
    exports2.assertDirective = assertDirective;
    exports2.assertDirectiveLiteral = assertDirectiveLiteral;
    exports2.assertDoExpression = assertDoExpression;
    exports2.assertDoWhileStatement = assertDoWhileStatement;
    exports2.assertEmptyStatement = assertEmptyStatement;
    exports2.assertEmptyTypeAnnotation = assertEmptyTypeAnnotation;
    exports2.assertEnumBody = assertEnumBody;
    exports2.assertEnumBooleanBody = assertEnumBooleanBody;
    exports2.assertEnumBooleanMember = assertEnumBooleanMember;
    exports2.assertEnumDeclaration = assertEnumDeclaration;
    exports2.assertEnumDefaultedMember = assertEnumDefaultedMember;
    exports2.assertEnumMember = assertEnumMember;
    exports2.assertEnumNumberBody = assertEnumNumberBody;
    exports2.assertEnumNumberMember = assertEnumNumberMember;
    exports2.assertEnumStringBody = assertEnumStringBody;
    exports2.assertEnumStringMember = assertEnumStringMember;
    exports2.assertEnumSymbolBody = assertEnumSymbolBody;
    exports2.assertExistsTypeAnnotation = assertExistsTypeAnnotation;
    exports2.assertExportAllDeclaration = assertExportAllDeclaration;
    exports2.assertExportDeclaration = assertExportDeclaration;
    exports2.assertExportDefaultDeclaration = assertExportDefaultDeclaration;
    exports2.assertExportDefaultSpecifier = assertExportDefaultSpecifier;
    exports2.assertExportNamedDeclaration = assertExportNamedDeclaration;
    exports2.assertExportNamespaceSpecifier = assertExportNamespaceSpecifier;
    exports2.assertExportSpecifier = assertExportSpecifier;
    exports2.assertExpression = assertExpression;
    exports2.assertExpressionStatement = assertExpressionStatement;
    exports2.assertExpressionWrapper = assertExpressionWrapper;
    exports2.assertFile = assertFile;
    exports2.assertFlow = assertFlow;
    exports2.assertFlowBaseAnnotation = assertFlowBaseAnnotation;
    exports2.assertFlowDeclaration = assertFlowDeclaration;
    exports2.assertFlowPredicate = assertFlowPredicate;
    exports2.assertFlowType = assertFlowType;
    exports2.assertFor = assertFor;
    exports2.assertForInStatement = assertForInStatement;
    exports2.assertForOfStatement = assertForOfStatement;
    exports2.assertForStatement = assertForStatement;
    exports2.assertForXStatement = assertForXStatement;
    exports2.assertFunction = assertFunction;
    exports2.assertFunctionDeclaration = assertFunctionDeclaration;
    exports2.assertFunctionExpression = assertFunctionExpression;
    exports2.assertFunctionParent = assertFunctionParent;
    exports2.assertFunctionTypeAnnotation = assertFunctionTypeAnnotation;
    exports2.assertFunctionTypeParam = assertFunctionTypeParam;
    exports2.assertGenericTypeAnnotation = assertGenericTypeAnnotation;
    exports2.assertIdentifier = assertIdentifier;
    exports2.assertIfStatement = assertIfStatement;
    exports2.assertImmutable = assertImmutable;
    exports2.assertImport = assertImport;
    exports2.assertImportAttribute = assertImportAttribute;
    exports2.assertImportDeclaration = assertImportDeclaration;
    exports2.assertImportDefaultSpecifier = assertImportDefaultSpecifier;
    exports2.assertImportNamespaceSpecifier = assertImportNamespaceSpecifier;
    exports2.assertImportSpecifier = assertImportSpecifier;
    exports2.assertIndexedAccessType = assertIndexedAccessType;
    exports2.assertInferredPredicate = assertInferredPredicate;
    exports2.assertInterfaceDeclaration = assertInterfaceDeclaration;
    exports2.assertInterfaceExtends = assertInterfaceExtends;
    exports2.assertInterfaceTypeAnnotation = assertInterfaceTypeAnnotation;
    exports2.assertInterpreterDirective = assertInterpreterDirective;
    exports2.assertIntersectionTypeAnnotation = assertIntersectionTypeAnnotation;
    exports2.assertJSX = assertJSX;
    exports2.assertJSXAttribute = assertJSXAttribute;
    exports2.assertJSXClosingElement = assertJSXClosingElement;
    exports2.assertJSXClosingFragment = assertJSXClosingFragment;
    exports2.assertJSXElement = assertJSXElement;
    exports2.assertJSXEmptyExpression = assertJSXEmptyExpression;
    exports2.assertJSXExpressionContainer = assertJSXExpressionContainer;
    exports2.assertJSXFragment = assertJSXFragment;
    exports2.assertJSXIdentifier = assertJSXIdentifier;
    exports2.assertJSXMemberExpression = assertJSXMemberExpression;
    exports2.assertJSXNamespacedName = assertJSXNamespacedName;
    exports2.assertJSXOpeningElement = assertJSXOpeningElement;
    exports2.assertJSXOpeningFragment = assertJSXOpeningFragment;
    exports2.assertJSXSpreadAttribute = assertJSXSpreadAttribute;
    exports2.assertJSXSpreadChild = assertJSXSpreadChild;
    exports2.assertJSXText = assertJSXText;
    exports2.assertLVal = assertLVal;
    exports2.assertLabeledStatement = assertLabeledStatement;
    exports2.assertLiteral = assertLiteral;
    exports2.assertLogicalExpression = assertLogicalExpression;
    exports2.assertLoop = assertLoop;
    exports2.assertMemberExpression = assertMemberExpression;
    exports2.assertMetaProperty = assertMetaProperty;
    exports2.assertMethod = assertMethod;
    exports2.assertMiscellaneous = assertMiscellaneous;
    exports2.assertMixedTypeAnnotation = assertMixedTypeAnnotation;
    exports2.assertModuleDeclaration = assertModuleDeclaration;
    exports2.assertModuleExpression = assertModuleExpression;
    exports2.assertModuleSpecifier = assertModuleSpecifier;
    exports2.assertNewExpression = assertNewExpression;
    exports2.assertNoop = assertNoop;
    exports2.assertNullLiteral = assertNullLiteral;
    exports2.assertNullLiteralTypeAnnotation = assertNullLiteralTypeAnnotation;
    exports2.assertNullableTypeAnnotation = assertNullableTypeAnnotation;
    exports2.assertNumberLiteral = assertNumberLiteral;
    exports2.assertNumberLiteralTypeAnnotation = assertNumberLiteralTypeAnnotation;
    exports2.assertNumberTypeAnnotation = assertNumberTypeAnnotation;
    exports2.assertNumericLiteral = assertNumericLiteral;
    exports2.assertObjectExpression = assertObjectExpression;
    exports2.assertObjectMember = assertObjectMember;
    exports2.assertObjectMethod = assertObjectMethod;
    exports2.assertObjectPattern = assertObjectPattern;
    exports2.assertObjectProperty = assertObjectProperty;
    exports2.assertObjectTypeAnnotation = assertObjectTypeAnnotation;
    exports2.assertObjectTypeCallProperty = assertObjectTypeCallProperty;
    exports2.assertObjectTypeIndexer = assertObjectTypeIndexer;
    exports2.assertObjectTypeInternalSlot = assertObjectTypeInternalSlot;
    exports2.assertObjectTypeProperty = assertObjectTypeProperty;
    exports2.assertObjectTypeSpreadProperty = assertObjectTypeSpreadProperty;
    exports2.assertOpaqueType = assertOpaqueType;
    exports2.assertOptionalCallExpression = assertOptionalCallExpression;
    exports2.assertOptionalIndexedAccessType = assertOptionalIndexedAccessType;
    exports2.assertOptionalMemberExpression = assertOptionalMemberExpression;
    exports2.assertParenthesizedExpression = assertParenthesizedExpression;
    exports2.assertPattern = assertPattern;
    exports2.assertPatternLike = assertPatternLike;
    exports2.assertPipelineBareFunction = assertPipelineBareFunction;
    exports2.assertPipelinePrimaryTopicReference = assertPipelinePrimaryTopicReference;
    exports2.assertPipelineTopicExpression = assertPipelineTopicExpression;
    exports2.assertPlaceholder = assertPlaceholder;
    exports2.assertPrivate = assertPrivate;
    exports2.assertPrivateName = assertPrivateName;
    exports2.assertProgram = assertProgram;
    exports2.assertProperty = assertProperty;
    exports2.assertPureish = assertPureish;
    exports2.assertQualifiedTypeIdentifier = assertQualifiedTypeIdentifier;
    exports2.assertRecordExpression = assertRecordExpression;
    exports2.assertRegExpLiteral = assertRegExpLiteral;
    exports2.assertRegexLiteral = assertRegexLiteral;
    exports2.assertRestElement = assertRestElement;
    exports2.assertRestProperty = assertRestProperty;
    exports2.assertReturnStatement = assertReturnStatement;
    exports2.assertScopable = assertScopable;
    exports2.assertSequenceExpression = assertSequenceExpression;
    exports2.assertSpreadElement = assertSpreadElement;
    exports2.assertSpreadProperty = assertSpreadProperty;
    exports2.assertStandardized = assertStandardized;
    exports2.assertStatement = assertStatement;
    exports2.assertStaticBlock = assertStaticBlock;
    exports2.assertStringLiteral = assertStringLiteral;
    exports2.assertStringLiteralTypeAnnotation = assertStringLiteralTypeAnnotation;
    exports2.assertStringTypeAnnotation = assertStringTypeAnnotation;
    exports2.assertSuper = assertSuper;
    exports2.assertSwitchCase = assertSwitchCase;
    exports2.assertSwitchStatement = assertSwitchStatement;
    exports2.assertSymbolTypeAnnotation = assertSymbolTypeAnnotation;
    exports2.assertTSAnyKeyword = assertTSAnyKeyword;
    exports2.assertTSArrayType = assertTSArrayType;
    exports2.assertTSAsExpression = assertTSAsExpression;
    exports2.assertTSBaseType = assertTSBaseType;
    exports2.assertTSBigIntKeyword = assertTSBigIntKeyword;
    exports2.assertTSBooleanKeyword = assertTSBooleanKeyword;
    exports2.assertTSCallSignatureDeclaration = assertTSCallSignatureDeclaration;
    exports2.assertTSConditionalType = assertTSConditionalType;
    exports2.assertTSConstructSignatureDeclaration = assertTSConstructSignatureDeclaration;
    exports2.assertTSConstructorType = assertTSConstructorType;
    exports2.assertTSDeclareFunction = assertTSDeclareFunction;
    exports2.assertTSDeclareMethod = assertTSDeclareMethod;
    exports2.assertTSEntityName = assertTSEntityName;
    exports2.assertTSEnumDeclaration = assertTSEnumDeclaration;
    exports2.assertTSEnumMember = assertTSEnumMember;
    exports2.assertTSExportAssignment = assertTSExportAssignment;
    exports2.assertTSExpressionWithTypeArguments = assertTSExpressionWithTypeArguments;
    exports2.assertTSExternalModuleReference = assertTSExternalModuleReference;
    exports2.assertTSFunctionType = assertTSFunctionType;
    exports2.assertTSImportEqualsDeclaration = assertTSImportEqualsDeclaration;
    exports2.assertTSImportType = assertTSImportType;
    exports2.assertTSIndexSignature = assertTSIndexSignature;
    exports2.assertTSIndexedAccessType = assertTSIndexedAccessType;
    exports2.assertTSInferType = assertTSInferType;
    exports2.assertTSInstantiationExpression = assertTSInstantiationExpression;
    exports2.assertTSInterfaceBody = assertTSInterfaceBody;
    exports2.assertTSInterfaceDeclaration = assertTSInterfaceDeclaration;
    exports2.assertTSIntersectionType = assertTSIntersectionType;
    exports2.assertTSIntrinsicKeyword = assertTSIntrinsicKeyword;
    exports2.assertTSLiteralType = assertTSLiteralType;
    exports2.assertTSMappedType = assertTSMappedType;
    exports2.assertTSMethodSignature = assertTSMethodSignature;
    exports2.assertTSModuleBlock = assertTSModuleBlock;
    exports2.assertTSModuleDeclaration = assertTSModuleDeclaration;
    exports2.assertTSNamedTupleMember = assertTSNamedTupleMember;
    exports2.assertTSNamespaceExportDeclaration = assertTSNamespaceExportDeclaration;
    exports2.assertTSNeverKeyword = assertTSNeverKeyword;
    exports2.assertTSNonNullExpression = assertTSNonNullExpression;
    exports2.assertTSNullKeyword = assertTSNullKeyword;
    exports2.assertTSNumberKeyword = assertTSNumberKeyword;
    exports2.assertTSObjectKeyword = assertTSObjectKeyword;
    exports2.assertTSOptionalType = assertTSOptionalType;
    exports2.assertTSParameterProperty = assertTSParameterProperty;
    exports2.assertTSParenthesizedType = assertTSParenthesizedType;
    exports2.assertTSPropertySignature = assertTSPropertySignature;
    exports2.assertTSQualifiedName = assertTSQualifiedName;
    exports2.assertTSRestType = assertTSRestType;
    exports2.assertTSStringKeyword = assertTSStringKeyword;
    exports2.assertTSSymbolKeyword = assertTSSymbolKeyword;
    exports2.assertTSThisType = assertTSThisType;
    exports2.assertTSTupleType = assertTSTupleType;
    exports2.assertTSType = assertTSType;
    exports2.assertTSTypeAliasDeclaration = assertTSTypeAliasDeclaration;
    exports2.assertTSTypeAnnotation = assertTSTypeAnnotation;
    exports2.assertTSTypeAssertion = assertTSTypeAssertion;
    exports2.assertTSTypeElement = assertTSTypeElement;
    exports2.assertTSTypeLiteral = assertTSTypeLiteral;
    exports2.assertTSTypeOperator = assertTSTypeOperator;
    exports2.assertTSTypeParameter = assertTSTypeParameter;
    exports2.assertTSTypeParameterDeclaration = assertTSTypeParameterDeclaration;
    exports2.assertTSTypeParameterInstantiation = assertTSTypeParameterInstantiation;
    exports2.assertTSTypePredicate = assertTSTypePredicate;
    exports2.assertTSTypeQuery = assertTSTypeQuery;
    exports2.assertTSTypeReference = assertTSTypeReference;
    exports2.assertTSUndefinedKeyword = assertTSUndefinedKeyword;
    exports2.assertTSUnionType = assertTSUnionType;
    exports2.assertTSUnknownKeyword = assertTSUnknownKeyword;
    exports2.assertTSVoidKeyword = assertTSVoidKeyword;
    exports2.assertTaggedTemplateExpression = assertTaggedTemplateExpression;
    exports2.assertTemplateElement = assertTemplateElement;
    exports2.assertTemplateLiteral = assertTemplateLiteral;
    exports2.assertTerminatorless = assertTerminatorless;
    exports2.assertThisExpression = assertThisExpression;
    exports2.assertThisTypeAnnotation = assertThisTypeAnnotation;
    exports2.assertThrowStatement = assertThrowStatement;
    exports2.assertTopicReference = assertTopicReference;
    exports2.assertTryStatement = assertTryStatement;
    exports2.assertTupleExpression = assertTupleExpression;
    exports2.assertTupleTypeAnnotation = assertTupleTypeAnnotation;
    exports2.assertTypeAlias = assertTypeAlias;
    exports2.assertTypeAnnotation = assertTypeAnnotation;
    exports2.assertTypeCastExpression = assertTypeCastExpression;
    exports2.assertTypeParameter = assertTypeParameter;
    exports2.assertTypeParameterDeclaration = assertTypeParameterDeclaration;
    exports2.assertTypeParameterInstantiation = assertTypeParameterInstantiation;
    exports2.assertTypeScript = assertTypeScript;
    exports2.assertTypeofTypeAnnotation = assertTypeofTypeAnnotation;
    exports2.assertUnaryExpression = assertUnaryExpression;
    exports2.assertUnaryLike = assertUnaryLike;
    exports2.assertUnionTypeAnnotation = assertUnionTypeAnnotation;
    exports2.assertUpdateExpression = assertUpdateExpression;
    exports2.assertUserWhitespacable = assertUserWhitespacable;
    exports2.assertV8IntrinsicIdentifier = assertV8IntrinsicIdentifier;
    exports2.assertVariableDeclaration = assertVariableDeclaration;
    exports2.assertVariableDeclarator = assertVariableDeclarator;
    exports2.assertVariance = assertVariance;
    exports2.assertVoidTypeAnnotation = assertVoidTypeAnnotation;
    exports2.assertWhile = assertWhile;
    exports2.assertWhileStatement = assertWhileStatement;
    exports2.assertWithStatement = assertWithStatement;
    exports2.assertYieldExpression = assertYieldExpression;
    var _is = require_is();
    function assert(type, node, opts) {
      if (!(0, _is.default)(type, node, opts)) {
        throw new Error(`Expected type "${type}" with option ${JSON.stringify(opts)}, but instead got "${node.type}".`);
      }
    }
    function assertArrayExpression(node, opts) {
      assert("ArrayExpression", node, opts);
    }
    function assertAssignmentExpression(node, opts) {
      assert("AssignmentExpression", node, opts);
    }
    function assertBinaryExpression(node, opts) {
      assert("BinaryExpression", node, opts);
    }
    function assertInterpreterDirective(node, opts) {
      assert("InterpreterDirective", node, opts);
    }
    function assertDirective(node, opts) {
      assert("Directive", node, opts);
    }
    function assertDirectiveLiteral(node, opts) {
      assert("DirectiveLiteral", node, opts);
    }
    function assertBlockStatement(node, opts) {
      assert("BlockStatement", node, opts);
    }
    function assertBreakStatement(node, opts) {
      assert("BreakStatement", node, opts);
    }
    function assertCallExpression(node, opts) {
      assert("CallExpression", node, opts);
    }
    function assertCatchClause(node, opts) {
      assert("CatchClause", node, opts);
    }
    function assertConditionalExpression(node, opts) {
      assert("ConditionalExpression", node, opts);
    }
    function assertContinueStatement(node, opts) {
      assert("ContinueStatement", node, opts);
    }
    function assertDebuggerStatement(node, opts) {
      assert("DebuggerStatement", node, opts);
    }
    function assertDoWhileStatement(node, opts) {
      assert("DoWhileStatement", node, opts);
    }
    function assertEmptyStatement(node, opts) {
      assert("EmptyStatement", node, opts);
    }
    function assertExpressionStatement(node, opts) {
      assert("ExpressionStatement", node, opts);
    }
    function assertFile(node, opts) {
      assert("File", node, opts);
    }
    function assertForInStatement(node, opts) {
      assert("ForInStatement", node, opts);
    }
    function assertForStatement(node, opts) {
      assert("ForStatement", node, opts);
    }
    function assertFunctionDeclaration(node, opts) {
      assert("FunctionDeclaration", node, opts);
    }
    function assertFunctionExpression(node, opts) {
      assert("FunctionExpression", node, opts);
    }
    function assertIdentifier(node, opts) {
      assert("Identifier", node, opts);
    }
    function assertIfStatement(node, opts) {
      assert("IfStatement", node, opts);
    }
    function assertLabeledStatement(node, opts) {
      assert("LabeledStatement", node, opts);
    }
    function assertStringLiteral(node, opts) {
      assert("StringLiteral", node, opts);
    }
    function assertNumericLiteral(node, opts) {
      assert("NumericLiteral", node, opts);
    }
    function assertNullLiteral(node, opts) {
      assert("NullLiteral", node, opts);
    }
    function assertBooleanLiteral(node, opts) {
      assert("BooleanLiteral", node, opts);
    }
    function assertRegExpLiteral(node, opts) {
      assert("RegExpLiteral", node, opts);
    }
    function assertLogicalExpression(node, opts) {
      assert("LogicalExpression", node, opts);
    }
    function assertMemberExpression(node, opts) {
      assert("MemberExpression", node, opts);
    }
    function assertNewExpression(node, opts) {
      assert("NewExpression", node, opts);
    }
    function assertProgram(node, opts) {
      assert("Program", node, opts);
    }
    function assertObjectExpression(node, opts) {
      assert("ObjectExpression", node, opts);
    }
    function assertObjectMethod(node, opts) {
      assert("ObjectMethod", node, opts);
    }
    function assertObjectProperty(node, opts) {
      assert("ObjectProperty", node, opts);
    }
    function assertRestElement(node, opts) {
      assert("RestElement", node, opts);
    }
    function assertReturnStatement(node, opts) {
      assert("ReturnStatement", node, opts);
    }
    function assertSequenceExpression(node, opts) {
      assert("SequenceExpression", node, opts);
    }
    function assertParenthesizedExpression(node, opts) {
      assert("ParenthesizedExpression", node, opts);
    }
    function assertSwitchCase(node, opts) {
      assert("SwitchCase", node, opts);
    }
    function assertSwitchStatement(node, opts) {
      assert("SwitchStatement", node, opts);
    }
    function assertThisExpression(node, opts) {
      assert("ThisExpression", node, opts);
    }
    function assertThrowStatement(node, opts) {
      assert("ThrowStatement", node, opts);
    }
    function assertTryStatement(node, opts) {
      assert("TryStatement", node, opts);
    }
    function assertUnaryExpression(node, opts) {
      assert("UnaryExpression", node, opts);
    }
    function assertUpdateExpression(node, opts) {
      assert("UpdateExpression", node, opts);
    }
    function assertVariableDeclaration(node, opts) {
      assert("VariableDeclaration", node, opts);
    }
    function assertVariableDeclarator(node, opts) {
      assert("VariableDeclarator", node, opts);
    }
    function assertWhileStatement(node, opts) {
      assert("WhileStatement", node, opts);
    }
    function assertWithStatement(node, opts) {
      assert("WithStatement", node, opts);
    }
    function assertAssignmentPattern(node, opts) {
      assert("AssignmentPattern", node, opts);
    }
    function assertArrayPattern(node, opts) {
      assert("ArrayPattern", node, opts);
    }
    function assertArrowFunctionExpression(node, opts) {
      assert("ArrowFunctionExpression", node, opts);
    }
    function assertClassBody(node, opts) {
      assert("ClassBody", node, opts);
    }
    function assertClassExpression(node, opts) {
      assert("ClassExpression", node, opts);
    }
    function assertClassDeclaration(node, opts) {
      assert("ClassDeclaration", node, opts);
    }
    function assertExportAllDeclaration(node, opts) {
      assert("ExportAllDeclaration", node, opts);
    }
    function assertExportDefaultDeclaration(node, opts) {
      assert("ExportDefaultDeclaration", node, opts);
    }
    function assertExportNamedDeclaration(node, opts) {
      assert("ExportNamedDeclaration", node, opts);
    }
    function assertExportSpecifier(node, opts) {
      assert("ExportSpecifier", node, opts);
    }
    function assertForOfStatement(node, opts) {
      assert("ForOfStatement", node, opts);
    }
    function assertImportDeclaration(node, opts) {
      assert("ImportDeclaration", node, opts);
    }
    function assertImportDefaultSpecifier(node, opts) {
      assert("ImportDefaultSpecifier", node, opts);
    }
    function assertImportNamespaceSpecifier(node, opts) {
      assert("ImportNamespaceSpecifier", node, opts);
    }
    function assertImportSpecifier(node, opts) {
      assert("ImportSpecifier", node, opts);
    }
    function assertMetaProperty(node, opts) {
      assert("MetaProperty", node, opts);
    }
    function assertClassMethod(node, opts) {
      assert("ClassMethod", node, opts);
    }
    function assertObjectPattern(node, opts) {
      assert("ObjectPattern", node, opts);
    }
    function assertSpreadElement(node, opts) {
      assert("SpreadElement", node, opts);
    }
    function assertSuper(node, opts) {
      assert("Super", node, opts);
    }
    function assertTaggedTemplateExpression(node, opts) {
      assert("TaggedTemplateExpression", node, opts);
    }
    function assertTemplateElement(node, opts) {
      assert("TemplateElement", node, opts);
    }
    function assertTemplateLiteral(node, opts) {
      assert("TemplateLiteral", node, opts);
    }
    function assertYieldExpression(node, opts) {
      assert("YieldExpression", node, opts);
    }
    function assertAwaitExpression(node, opts) {
      assert("AwaitExpression", node, opts);
    }
    function assertImport(node, opts) {
      assert("Import", node, opts);
    }
    function assertBigIntLiteral(node, opts) {
      assert("BigIntLiteral", node, opts);
    }
    function assertExportNamespaceSpecifier(node, opts) {
      assert("ExportNamespaceSpecifier", node, opts);
    }
    function assertOptionalMemberExpression(node, opts) {
      assert("OptionalMemberExpression", node, opts);
    }
    function assertOptionalCallExpression(node, opts) {
      assert("OptionalCallExpression", node, opts);
    }
    function assertClassProperty(node, opts) {
      assert("ClassProperty", node, opts);
    }
    function assertClassAccessorProperty(node, opts) {
      assert("ClassAccessorProperty", node, opts);
    }
    function assertClassPrivateProperty(node, opts) {
      assert("ClassPrivateProperty", node, opts);
    }
    function assertClassPrivateMethod(node, opts) {
      assert("ClassPrivateMethod", node, opts);
    }
    function assertPrivateName(node, opts) {
      assert("PrivateName", node, opts);
    }
    function assertStaticBlock(node, opts) {
      assert("StaticBlock", node, opts);
    }
    function assertAnyTypeAnnotation(node, opts) {
      assert("AnyTypeAnnotation", node, opts);
    }
    function assertArrayTypeAnnotation(node, opts) {
      assert("ArrayTypeAnnotation", node, opts);
    }
    function assertBooleanTypeAnnotation(node, opts) {
      assert("BooleanTypeAnnotation", node, opts);
    }
    function assertBooleanLiteralTypeAnnotation(node, opts) {
      assert("BooleanLiteralTypeAnnotation", node, opts);
    }
    function assertNullLiteralTypeAnnotation(node, opts) {
      assert("NullLiteralTypeAnnotation", node, opts);
    }
    function assertClassImplements(node, opts) {
      assert("ClassImplements", node, opts);
    }
    function assertDeclareClass(node, opts) {
      assert("DeclareClass", node, opts);
    }
    function assertDeclareFunction(node, opts) {
      assert("DeclareFunction", node, opts);
    }
    function assertDeclareInterface(node, opts) {
      assert("DeclareInterface", node, opts);
    }
    function assertDeclareModule(node, opts) {
      assert("DeclareModule", node, opts);
    }
    function assertDeclareModuleExports(node, opts) {
      assert("DeclareModuleExports", node, opts);
    }
    function assertDeclareTypeAlias(node, opts) {
      assert("DeclareTypeAlias", node, opts);
    }
    function assertDeclareOpaqueType(node, opts) {
      assert("DeclareOpaqueType", node, opts);
    }
    function assertDeclareVariable(node, opts) {
      assert("DeclareVariable", node, opts);
    }
    function assertDeclareExportDeclaration(node, opts) {
      assert("DeclareExportDeclaration", node, opts);
    }
    function assertDeclareExportAllDeclaration(node, opts) {
      assert("DeclareExportAllDeclaration", node, opts);
    }
    function assertDeclaredPredicate(node, opts) {
      assert("DeclaredPredicate", node, opts);
    }
    function assertExistsTypeAnnotation(node, opts) {
      assert("ExistsTypeAnnotation", node, opts);
    }
    function assertFunctionTypeAnnotation(node, opts) {
      assert("FunctionTypeAnnotation", node, opts);
    }
    function assertFunctionTypeParam(node, opts) {
      assert("FunctionTypeParam", node, opts);
    }
    function assertGenericTypeAnnotation(node, opts) {
      assert("GenericTypeAnnotation", node, opts);
    }
    function assertInferredPredicate(node, opts) {
      assert("InferredPredicate", node, opts);
    }
    function assertInterfaceExtends(node, opts) {
      assert("InterfaceExtends", node, opts);
    }
    function assertInterfaceDeclaration(node, opts) {
      assert("InterfaceDeclaration", node, opts);
    }
    function assertInterfaceTypeAnnotation(node, opts) {
      assert("InterfaceTypeAnnotation", node, opts);
    }
    function assertIntersectionTypeAnnotation(node, opts) {
      assert("IntersectionTypeAnnotation", node, opts);
    }
    function assertMixedTypeAnnotation(node, opts) {
      assert("MixedTypeAnnotation", node, opts);
    }
    function assertEmptyTypeAnnotation(node, opts) {
      assert("EmptyTypeAnnotation", node, opts);
    }
    function assertNullableTypeAnnotation(node, opts) {
      assert("NullableTypeAnnotation", node, opts);
    }
    function assertNumberLiteralTypeAnnotation(node, opts) {
      assert("NumberLiteralTypeAnnotation", node, opts);
    }
    function assertNumberTypeAnnotation(node, opts) {
      assert("NumberTypeAnnotation", node, opts);
    }
    function assertObjectTypeAnnotation(node, opts) {
      assert("ObjectTypeAnnotation", node, opts);
    }
    function assertObjectTypeInternalSlot(node, opts) {
      assert("ObjectTypeInternalSlot", node, opts);
    }
    function assertObjectTypeCallProperty(node, opts) {
      assert("ObjectTypeCallProperty", node, opts);
    }
    function assertObjectTypeIndexer(node, opts) {
      assert("ObjectTypeIndexer", node, opts);
    }
    function assertObjectTypeProperty(node, opts) {
      assert("ObjectTypeProperty", node, opts);
    }
    function assertObjectTypeSpreadProperty(node, opts) {
      assert("ObjectTypeSpreadProperty", node, opts);
    }
    function assertOpaqueType(node, opts) {
      assert("OpaqueType", node, opts);
    }
    function assertQualifiedTypeIdentifier(node, opts) {
      assert("QualifiedTypeIdentifier", node, opts);
    }
    function assertStringLiteralTypeAnnotation(node, opts) {
      assert("StringLiteralTypeAnnotation", node, opts);
    }
    function assertStringTypeAnnotation(node, opts) {
      assert("StringTypeAnnotation", node, opts);
    }
    function assertSymbolTypeAnnotation(node, opts) {
      assert("SymbolTypeAnnotation", node, opts);
    }
    function assertThisTypeAnnotation(node, opts) {
      assert("ThisTypeAnnotation", node, opts);
    }
    function assertTupleTypeAnnotation(node, opts) {
      assert("TupleTypeAnnotation", node, opts);
    }
    function assertTypeofTypeAnnotation(node, opts) {
      assert("TypeofTypeAnnotation", node, opts);
    }
    function assertTypeAlias(node, opts) {
      assert("TypeAlias", node, opts);
    }
    function assertTypeAnnotation(node, opts) {
      assert("TypeAnnotation", node, opts);
    }
    function assertTypeCastExpression(node, opts) {
      assert("TypeCastExpression", node, opts);
    }
    function assertTypeParameter(node, opts) {
      assert("TypeParameter", node, opts);
    }
    function assertTypeParameterDeclaration(node, opts) {
      assert("TypeParameterDeclaration", node, opts);
    }
    function assertTypeParameterInstantiation(node, opts) {
      assert("TypeParameterInstantiation", node, opts);
    }
    function assertUnionTypeAnnotation(node, opts) {
      assert("UnionTypeAnnotation", node, opts);
    }
    function assertVariance(node, opts) {
      assert("Variance", node, opts);
    }
    function assertVoidTypeAnnotation(node, opts) {
      assert("VoidTypeAnnotation", node, opts);
    }
    function assertEnumDeclaration(node, opts) {
      assert("EnumDeclaration", node, opts);
    }
    function assertEnumBooleanBody(node, opts) {
      assert("EnumBooleanBody", node, opts);
    }
    function assertEnumNumberBody(node, opts) {
      assert("EnumNumberBody", node, opts);
    }
    function assertEnumStringBody(node, opts) {
      assert("EnumStringBody", node, opts);
    }
    function assertEnumSymbolBody(node, opts) {
      assert("EnumSymbolBody", node, opts);
    }
    function assertEnumBooleanMember(node, opts) {
      assert("EnumBooleanMember", node, opts);
    }
    function assertEnumNumberMember(node, opts) {
      assert("EnumNumberMember", node, opts);
    }
    function assertEnumStringMember(node, opts) {
      assert("EnumStringMember", node, opts);
    }
    function assertEnumDefaultedMember(node, opts) {
      assert("EnumDefaultedMember", node, opts);
    }
    function assertIndexedAccessType(node, opts) {
      assert("IndexedAccessType", node, opts);
    }
    function assertOptionalIndexedAccessType(node, opts) {
      assert("OptionalIndexedAccessType", node, opts);
    }
    function assertJSXAttribute(node, opts) {
      assert("JSXAttribute", node, opts);
    }
    function assertJSXClosingElement(node, opts) {
      assert("JSXClosingElement", node, opts);
    }
    function assertJSXElement(node, opts) {
      assert("JSXElement", node, opts);
    }
    function assertJSXEmptyExpression(node, opts) {
      assert("JSXEmptyExpression", node, opts);
    }
    function assertJSXExpressionContainer(node, opts) {
      assert("JSXExpressionContainer", node, opts);
    }
    function assertJSXSpreadChild(node, opts) {
      assert("JSXSpreadChild", node, opts);
    }
    function assertJSXIdentifier(node, opts) {
      assert("JSXIdentifier", node, opts);
    }
    function assertJSXMemberExpression(node, opts) {
      assert("JSXMemberExpression", node, opts);
    }
    function assertJSXNamespacedName(node, opts) {
      assert("JSXNamespacedName", node, opts);
    }
    function assertJSXOpeningElement(node, opts) {
      assert("JSXOpeningElement", node, opts);
    }
    function assertJSXSpreadAttribute(node, opts) {
      assert("JSXSpreadAttribute", node, opts);
    }
    function assertJSXText(node, opts) {
      assert("JSXText", node, opts);
    }
    function assertJSXFragment(node, opts) {
      assert("JSXFragment", node, opts);
    }
    function assertJSXOpeningFragment(node, opts) {
      assert("JSXOpeningFragment", node, opts);
    }
    function assertJSXClosingFragment(node, opts) {
      assert("JSXClosingFragment", node, opts);
    }
    function assertNoop(node, opts) {
      assert("Noop", node, opts);
    }
    function assertPlaceholder(node, opts) {
      assert("Placeholder", node, opts);
    }
    function assertV8IntrinsicIdentifier(node, opts) {
      assert("V8IntrinsicIdentifier", node, opts);
    }
    function assertArgumentPlaceholder(node, opts) {
      assert("ArgumentPlaceholder", node, opts);
    }
    function assertBindExpression(node, opts) {
      assert("BindExpression", node, opts);
    }
    function assertImportAttribute(node, opts) {
      assert("ImportAttribute", node, opts);
    }
    function assertDecorator(node, opts) {
      assert("Decorator", node, opts);
    }
    function assertDoExpression(node, opts) {
      assert("DoExpression", node, opts);
    }
    function assertExportDefaultSpecifier(node, opts) {
      assert("ExportDefaultSpecifier", node, opts);
    }
    function assertRecordExpression(node, opts) {
      assert("RecordExpression", node, opts);
    }
    function assertTupleExpression(node, opts) {
      assert("TupleExpression", node, opts);
    }
    function assertDecimalLiteral(node, opts) {
      assert("DecimalLiteral", node, opts);
    }
    function assertModuleExpression(node, opts) {
      assert("ModuleExpression", node, opts);
    }
    function assertTopicReference(node, opts) {
      assert("TopicReference", node, opts);
    }
    function assertPipelineTopicExpression(node, opts) {
      assert("PipelineTopicExpression", node, opts);
    }
    function assertPipelineBareFunction(node, opts) {
      assert("PipelineBareFunction", node, opts);
    }
    function assertPipelinePrimaryTopicReference(node, opts) {
      assert("PipelinePrimaryTopicReference", node, opts);
    }
    function assertTSParameterProperty(node, opts) {
      assert("TSParameterProperty", node, opts);
    }
    function assertTSDeclareFunction(node, opts) {
      assert("TSDeclareFunction", node, opts);
    }
    function assertTSDeclareMethod(node, opts) {
      assert("TSDeclareMethod", node, opts);
    }
    function assertTSQualifiedName(node, opts) {
      assert("TSQualifiedName", node, opts);
    }
    function assertTSCallSignatureDeclaration(node, opts) {
      assert("TSCallSignatureDeclaration", node, opts);
    }
    function assertTSConstructSignatureDeclaration(node, opts) {
      assert("TSConstructSignatureDeclaration", node, opts);
    }
    function assertTSPropertySignature(node, opts) {
      assert("TSPropertySignature", node, opts);
    }
    function assertTSMethodSignature(node, opts) {
      assert("TSMethodSignature", node, opts);
    }
    function assertTSIndexSignature(node, opts) {
      assert("TSIndexSignature", node, opts);
    }
    function assertTSAnyKeyword(node, opts) {
      assert("TSAnyKeyword", node, opts);
    }
    function assertTSBooleanKeyword(node, opts) {
      assert("TSBooleanKeyword", node, opts);
    }
    function assertTSBigIntKeyword(node, opts) {
      assert("TSBigIntKeyword", node, opts);
    }
    function assertTSIntrinsicKeyword(node, opts) {
      assert("TSIntrinsicKeyword", node, opts);
    }
    function assertTSNeverKeyword(node, opts) {
      assert("TSNeverKeyword", node, opts);
    }
    function assertTSNullKeyword(node, opts) {
      assert("TSNullKeyword", node, opts);
    }
    function assertTSNumberKeyword(node, opts) {
      assert("TSNumberKeyword", node, opts);
    }
    function assertTSObjectKeyword(node, opts) {
      assert("TSObjectKeyword", node, opts);
    }
    function assertTSStringKeyword(node, opts) {
      assert("TSStringKeyword", node, opts);
    }
    function assertTSSymbolKeyword(node, opts) {
      assert("TSSymbolKeyword", node, opts);
    }
    function assertTSUndefinedKeyword(node, opts) {
      assert("TSUndefinedKeyword", node, opts);
    }
    function assertTSUnknownKeyword(node, opts) {
      assert("TSUnknownKeyword", node, opts);
    }
    function assertTSVoidKeyword(node, opts) {
      assert("TSVoidKeyword", node, opts);
    }
    function assertTSThisType(node, opts) {
      assert("TSThisType", node, opts);
    }
    function assertTSFunctionType(node, opts) {
      assert("TSFunctionType", node, opts);
    }
    function assertTSConstructorType(node, opts) {
      assert("TSConstructorType", node, opts);
    }
    function assertTSTypeReference(node, opts) {
      assert("TSTypeReference", node, opts);
    }
    function assertTSTypePredicate(node, opts) {
      assert("TSTypePredicate", node, opts);
    }
    function assertTSTypeQuery(node, opts) {
      assert("TSTypeQuery", node, opts);
    }
    function assertTSTypeLiteral(node, opts) {
      assert("TSTypeLiteral", node, opts);
    }
    function assertTSArrayType(node, opts) {
      assert("TSArrayType", node, opts);
    }
    function assertTSTupleType(node, opts) {
      assert("TSTupleType", node, opts);
    }
    function assertTSOptionalType(node, opts) {
      assert("TSOptionalType", node, opts);
    }
    function assertTSRestType(node, opts) {
      assert("TSRestType", node, opts);
    }
    function assertTSNamedTupleMember(node, opts) {
      assert("TSNamedTupleMember", node, opts);
    }
    function assertTSUnionType(node, opts) {
      assert("TSUnionType", node, opts);
    }
    function assertTSIntersectionType(node, opts) {
      assert("TSIntersectionType", node, opts);
    }
    function assertTSConditionalType(node, opts) {
      assert("TSConditionalType", node, opts);
    }
    function assertTSInferType(node, opts) {
      assert("TSInferType", node, opts);
    }
    function assertTSParenthesizedType(node, opts) {
      assert("TSParenthesizedType", node, opts);
    }
    function assertTSTypeOperator(node, opts) {
      assert("TSTypeOperator", node, opts);
    }
    function assertTSIndexedAccessType(node, opts) {
      assert("TSIndexedAccessType", node, opts);
    }
    function assertTSMappedType(node, opts) {
      assert("TSMappedType", node, opts);
    }
    function assertTSLiteralType(node, opts) {
      assert("TSLiteralType", node, opts);
    }
    function assertTSExpressionWithTypeArguments(node, opts) {
      assert("TSExpressionWithTypeArguments", node, opts);
    }
    function assertTSInterfaceDeclaration(node, opts) {
      assert("TSInterfaceDeclaration", node, opts);
    }
    function assertTSInterfaceBody(node, opts) {
      assert("TSInterfaceBody", node, opts);
    }
    function assertTSTypeAliasDeclaration(node, opts) {
      assert("TSTypeAliasDeclaration", node, opts);
    }
    function assertTSInstantiationExpression(node, opts) {
      assert("TSInstantiationExpression", node, opts);
    }
    function assertTSAsExpression(node, opts) {
      assert("TSAsExpression", node, opts);
    }
    function assertTSTypeAssertion(node, opts) {
      assert("TSTypeAssertion", node, opts);
    }
    function assertTSEnumDeclaration(node, opts) {
      assert("TSEnumDeclaration", node, opts);
    }
    function assertTSEnumMember(node, opts) {
      assert("TSEnumMember", node, opts);
    }
    function assertTSModuleDeclaration(node, opts) {
      assert("TSModuleDeclaration", node, opts);
    }
    function assertTSModuleBlock(node, opts) {
      assert("TSModuleBlock", node, opts);
    }
    function assertTSImportType(node, opts) {
      assert("TSImportType", node, opts);
    }
    function assertTSImportEqualsDeclaration(node, opts) {
      assert("TSImportEqualsDeclaration", node, opts);
    }
    function assertTSExternalModuleReference(node, opts) {
      assert("TSExternalModuleReference", node, opts);
    }
    function assertTSNonNullExpression(node, opts) {
      assert("TSNonNullExpression", node, opts);
    }
    function assertTSExportAssignment(node, opts) {
      assert("TSExportAssignment", node, opts);
    }
    function assertTSNamespaceExportDeclaration(node, opts) {
      assert("TSNamespaceExportDeclaration", node, opts);
    }
    function assertTSTypeAnnotation(node, opts) {
      assert("TSTypeAnnotation", node, opts);
    }
    function assertTSTypeParameterInstantiation(node, opts) {
      assert("TSTypeParameterInstantiation", node, opts);
    }
    function assertTSTypeParameterDeclaration(node, opts) {
      assert("TSTypeParameterDeclaration", node, opts);
    }
    function assertTSTypeParameter(node, opts) {
      assert("TSTypeParameter", node, opts);
    }
    function assertStandardized(node, opts) {
      assert("Standardized", node, opts);
    }
    function assertExpression(node, opts) {
      assert("Expression", node, opts);
    }
    function assertBinary(node, opts) {
      assert("Binary", node, opts);
    }
    function assertScopable(node, opts) {
      assert("Scopable", node, opts);
    }
    function assertBlockParent(node, opts) {
      assert("BlockParent", node, opts);
    }
    function assertBlock(node, opts) {
      assert("Block", node, opts);
    }
    function assertStatement(node, opts) {
      assert("Statement", node, opts);
    }
    function assertTerminatorless(node, opts) {
      assert("Terminatorless", node, opts);
    }
    function assertCompletionStatement(node, opts) {
      assert("CompletionStatement", node, opts);
    }
    function assertConditional(node, opts) {
      assert("Conditional", node, opts);
    }
    function assertLoop(node, opts) {
      assert("Loop", node, opts);
    }
    function assertWhile(node, opts) {
      assert("While", node, opts);
    }
    function assertExpressionWrapper(node, opts) {
      assert("ExpressionWrapper", node, opts);
    }
    function assertFor(node, opts) {
      assert("For", node, opts);
    }
    function assertForXStatement(node, opts) {
      assert("ForXStatement", node, opts);
    }
    function assertFunction(node, opts) {
      assert("Function", node, opts);
    }
    function assertFunctionParent(node, opts) {
      assert("FunctionParent", node, opts);
    }
    function assertPureish(node, opts) {
      assert("Pureish", node, opts);
    }
    function assertDeclaration(node, opts) {
      assert("Declaration", node, opts);
    }
    function assertPatternLike(node, opts) {
      assert("PatternLike", node, opts);
    }
    function assertLVal(node, opts) {
      assert("LVal", node, opts);
    }
    function assertTSEntityName(node, opts) {
      assert("TSEntityName", node, opts);
    }
    function assertLiteral(node, opts) {
      assert("Literal", node, opts);
    }
    function assertImmutable(node, opts) {
      assert("Immutable", node, opts);
    }
    function assertUserWhitespacable(node, opts) {
      assert("UserWhitespacable", node, opts);
    }
    function assertMethod(node, opts) {
      assert("Method", node, opts);
    }
    function assertObjectMember(node, opts) {
      assert("ObjectMember", node, opts);
    }
    function assertProperty(node, opts) {
      assert("Property", node, opts);
    }
    function assertUnaryLike(node, opts) {
      assert("UnaryLike", node, opts);
    }
    function assertPattern(node, opts) {
      assert("Pattern", node, opts);
    }
    function assertClass(node, opts) {
      assert("Class", node, opts);
    }
    function assertModuleDeclaration(node, opts) {
      assert("ModuleDeclaration", node, opts);
    }
    function assertExportDeclaration(node, opts) {
      assert("ExportDeclaration", node, opts);
    }
    function assertModuleSpecifier(node, opts) {
      assert("ModuleSpecifier", node, opts);
    }
    function assertAccessor(node, opts) {
      assert("Accessor", node, opts);
    }
    function assertPrivate(node, opts) {
      assert("Private", node, opts);
    }
    function assertFlow(node, opts) {
      assert("Flow", node, opts);
    }
    function assertFlowType(node, opts) {
      assert("FlowType", node, opts);
    }
    function assertFlowBaseAnnotation(node, opts) {
      assert("FlowBaseAnnotation", node, opts);
    }
    function assertFlowDeclaration(node, opts) {
      assert("FlowDeclaration", node, opts);
    }
    function assertFlowPredicate(node, opts) {
      assert("FlowPredicate", node, opts);
    }
    function assertEnumBody(node, opts) {
      assert("EnumBody", node, opts);
    }
    function assertEnumMember(node, opts) {
      assert("EnumMember", node, opts);
    }
    function assertJSX(node, opts) {
      assert("JSX", node, opts);
    }
    function assertMiscellaneous(node, opts) {
      assert("Miscellaneous", node, opts);
    }
    function assertTypeScript(node, opts) {
      assert("TypeScript", node, opts);
    }
    function assertTSTypeElement(node, opts) {
      assert("TSTypeElement", node, opts);
    }
    function assertTSType(node, opts) {
      assert("TSType", node, opts);
    }
    function assertTSBaseType(node, opts) {
      assert("TSBaseType", node, opts);
    }
    function assertNumberLiteral(node, opts) {
      console.trace("The node type NumberLiteral has been renamed to NumericLiteral");
      assert("NumberLiteral", node, opts);
    }
    function assertRegexLiteral(node, opts) {
      console.trace("The node type RegexLiteral has been renamed to RegExpLiteral");
      assert("RegexLiteral", node, opts);
    }
    function assertRestProperty(node, opts) {
      console.trace("The node type RestProperty has been renamed to RestElement");
      assert("RestProperty", node, opts);
    }
    function assertSpreadProperty(node, opts) {
      console.trace("The node type SpreadProperty has been renamed to SpreadElement");
      assert("SpreadProperty", node, opts);
    }
  }
});

// node_modules/@babel/types/lib/builders/flow/createTypeAnnotationBasedOnTypeof.js
var require_createTypeAnnotationBasedOnTypeof = __commonJS({
  "node_modules/@babel/types/lib/builders/flow/createTypeAnnotationBasedOnTypeof.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _generated = require_generated2();
    var _default = createTypeAnnotationBasedOnTypeof;
    exports2.default = _default;
    function createTypeAnnotationBasedOnTypeof(type) {
      switch (type) {
        case "string":
          return (0, _generated.stringTypeAnnotation)();
        case "number":
          return (0, _generated.numberTypeAnnotation)();
        case "undefined":
          return (0, _generated.voidTypeAnnotation)();
        case "boolean":
          return (0, _generated.booleanTypeAnnotation)();
        case "function":
          return (0, _generated.genericTypeAnnotation)((0, _generated.identifier)("Function"));
        case "object":
          return (0, _generated.genericTypeAnnotation)((0, _generated.identifier)("Object"));
        case "symbol":
          return (0, _generated.genericTypeAnnotation)((0, _generated.identifier)("Symbol"));
        case "bigint":
          return (0, _generated.anyTypeAnnotation)();
      }
      throw new Error("Invalid typeof value: " + type);
    }
  }
});

// node_modules/@babel/types/lib/modifications/flow/removeTypeDuplicates.js
var require_removeTypeDuplicates = __commonJS({
  "node_modules/@babel/types/lib/modifications/flow/removeTypeDuplicates.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = removeTypeDuplicates;
    var _generated = require_generated();
    function getQualifiedName(node) {
      return (0, _generated.isIdentifier)(node) ? node.name : `${node.id.name}.${getQualifiedName(node.qualification)}`;
    }
    function removeTypeDuplicates(nodes) {
      const generics = /* @__PURE__ */ new Map();
      const bases = /* @__PURE__ */ new Map();
      const typeGroups = /* @__PURE__ */ new Set();
      const types = [];
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!node)
          continue;
        if (types.indexOf(node) >= 0) {
          continue;
        }
        if ((0, _generated.isAnyTypeAnnotation)(node)) {
          return [node];
        }
        if ((0, _generated.isFlowBaseAnnotation)(node)) {
          bases.set(node.type, node);
          continue;
        }
        if ((0, _generated.isUnionTypeAnnotation)(node)) {
          if (!typeGroups.has(node.types)) {
            nodes = nodes.concat(node.types);
            typeGroups.add(node.types);
          }
          continue;
        }
        if ((0, _generated.isGenericTypeAnnotation)(node)) {
          const name = getQualifiedName(node.id);
          if (generics.has(name)) {
            let existing = generics.get(name);
            if (existing.typeParameters) {
              if (node.typeParameters) {
                existing.typeParameters.params = removeTypeDuplicates(existing.typeParameters.params.concat(node.typeParameters.params));
              }
            } else {
              existing = node.typeParameters;
            }
          } else {
            generics.set(name, node);
          }
          continue;
        }
        types.push(node);
      }
      for (const [, baseType] of bases) {
        types.push(baseType);
      }
      for (const [, genericName] of generics) {
        types.push(genericName);
      }
      return types;
    }
  }
});

// node_modules/@babel/types/lib/builders/flow/createFlowUnionType.js
var require_createFlowUnionType = __commonJS({
  "node_modules/@babel/types/lib/builders/flow/createFlowUnionType.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = createFlowUnionType;
    var _generated = require_generated2();
    var _removeTypeDuplicates = require_removeTypeDuplicates();
    function createFlowUnionType(types) {
      const flattened = (0, _removeTypeDuplicates.default)(types);
      if (flattened.length === 1) {
        return flattened[0];
      } else {
        return (0, _generated.unionTypeAnnotation)(flattened);
      }
    }
  }
});

// node_modules/@babel/types/lib/modifications/typescript/removeTypeDuplicates.js
var require_removeTypeDuplicates2 = __commonJS({
  "node_modules/@babel/types/lib/modifications/typescript/removeTypeDuplicates.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = removeTypeDuplicates;
    var _generated = require_generated();
    function getQualifiedName(node) {
      return (0, _generated.isIdentifier)(node) ? node.name : `${node.right.name}.${getQualifiedName(node.left)}`;
    }
    function removeTypeDuplicates(nodes) {
      const generics = /* @__PURE__ */ new Map();
      const bases = /* @__PURE__ */ new Map();
      const typeGroups = /* @__PURE__ */ new Set();
      const types = [];
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!node)
          continue;
        if (types.indexOf(node) >= 0) {
          continue;
        }
        if ((0, _generated.isTSAnyKeyword)(node)) {
          return [node];
        }
        if ((0, _generated.isTSBaseType)(node)) {
          bases.set(node.type, node);
          continue;
        }
        if ((0, _generated.isTSUnionType)(node)) {
          if (!typeGroups.has(node.types)) {
            nodes.push(...node.types);
            typeGroups.add(node.types);
          }
          continue;
        }
        if ((0, _generated.isTSTypeReference)(node) && node.typeParameters) {
          const name = getQualifiedName(node.typeName);
          if (generics.has(name)) {
            let existing = generics.get(name);
            if (existing.typeParameters) {
              if (node.typeParameters) {
                existing.typeParameters.params = removeTypeDuplicates(existing.typeParameters.params.concat(node.typeParameters.params));
              }
            } else {
              existing = node.typeParameters;
            }
          } else {
            generics.set(name, node);
          }
          continue;
        }
        types.push(node);
      }
      for (const [, baseType] of bases) {
        types.push(baseType);
      }
      for (const [, genericName] of generics) {
        types.push(genericName);
      }
      return types;
    }
  }
});

// node_modules/@babel/types/lib/builders/typescript/createTSUnionType.js
var require_createTSUnionType = __commonJS({
  "node_modules/@babel/types/lib/builders/typescript/createTSUnionType.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = createTSUnionType;
    var _generated = require_generated2();
    var _removeTypeDuplicates = require_removeTypeDuplicates2();
    var _index = require_generated();
    function createTSUnionType(typeAnnotations) {
      const types = typeAnnotations.map((type) => {
        return (0, _index.isTSTypeAnnotation)(type) ? type.typeAnnotation : type;
      });
      const flattened = (0, _removeTypeDuplicates.default)(types);
      if (flattened.length === 1) {
        return flattened[0];
      } else {
        return (0, _generated.tsUnionType)(flattened);
      }
    }
  }
});

// node_modules/@babel/types/lib/builders/generated/uppercase.js
var require_uppercase = __commonJS({
  "node_modules/@babel/types/lib/builders/generated/uppercase.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "AnyTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.anyTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "ArgumentPlaceholder", {
      enumerable: true,
      get: function() {
        return _index.argumentPlaceholder;
      }
    });
    Object.defineProperty(exports2, "ArrayExpression", {
      enumerable: true,
      get: function() {
        return _index.arrayExpression;
      }
    });
    Object.defineProperty(exports2, "ArrayPattern", {
      enumerable: true,
      get: function() {
        return _index.arrayPattern;
      }
    });
    Object.defineProperty(exports2, "ArrayTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.arrayTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "ArrowFunctionExpression", {
      enumerable: true,
      get: function() {
        return _index.arrowFunctionExpression;
      }
    });
    Object.defineProperty(exports2, "AssignmentExpression", {
      enumerable: true,
      get: function() {
        return _index.assignmentExpression;
      }
    });
    Object.defineProperty(exports2, "AssignmentPattern", {
      enumerable: true,
      get: function() {
        return _index.assignmentPattern;
      }
    });
    Object.defineProperty(exports2, "AwaitExpression", {
      enumerable: true,
      get: function() {
        return _index.awaitExpression;
      }
    });
    Object.defineProperty(exports2, "BigIntLiteral", {
      enumerable: true,
      get: function() {
        return _index.bigIntLiteral;
      }
    });
    Object.defineProperty(exports2, "BinaryExpression", {
      enumerable: true,
      get: function() {
        return _index.binaryExpression;
      }
    });
    Object.defineProperty(exports2, "BindExpression", {
      enumerable: true,
      get: function() {
        return _index.bindExpression;
      }
    });
    Object.defineProperty(exports2, "BlockStatement", {
      enumerable: true,
      get: function() {
        return _index.blockStatement;
      }
    });
    Object.defineProperty(exports2, "BooleanLiteral", {
      enumerable: true,
      get: function() {
        return _index.booleanLiteral;
      }
    });
    Object.defineProperty(exports2, "BooleanLiteralTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.booleanLiteralTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "BooleanTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.booleanTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "BreakStatement", {
      enumerable: true,
      get: function() {
        return _index.breakStatement;
      }
    });
    Object.defineProperty(exports2, "CallExpression", {
      enumerable: true,
      get: function() {
        return _index.callExpression;
      }
    });
    Object.defineProperty(exports2, "CatchClause", {
      enumerable: true,
      get: function() {
        return _index.catchClause;
      }
    });
    Object.defineProperty(exports2, "ClassAccessorProperty", {
      enumerable: true,
      get: function() {
        return _index.classAccessorProperty;
      }
    });
    Object.defineProperty(exports2, "ClassBody", {
      enumerable: true,
      get: function() {
        return _index.classBody;
      }
    });
    Object.defineProperty(exports2, "ClassDeclaration", {
      enumerable: true,
      get: function() {
        return _index.classDeclaration;
      }
    });
    Object.defineProperty(exports2, "ClassExpression", {
      enumerable: true,
      get: function() {
        return _index.classExpression;
      }
    });
    Object.defineProperty(exports2, "ClassImplements", {
      enumerable: true,
      get: function() {
        return _index.classImplements;
      }
    });
    Object.defineProperty(exports2, "ClassMethod", {
      enumerable: true,
      get: function() {
        return _index.classMethod;
      }
    });
    Object.defineProperty(exports2, "ClassPrivateMethod", {
      enumerable: true,
      get: function() {
        return _index.classPrivateMethod;
      }
    });
    Object.defineProperty(exports2, "ClassPrivateProperty", {
      enumerable: true,
      get: function() {
        return _index.classPrivateProperty;
      }
    });
    Object.defineProperty(exports2, "ClassProperty", {
      enumerable: true,
      get: function() {
        return _index.classProperty;
      }
    });
    Object.defineProperty(exports2, "ConditionalExpression", {
      enumerable: true,
      get: function() {
        return _index.conditionalExpression;
      }
    });
    Object.defineProperty(exports2, "ContinueStatement", {
      enumerable: true,
      get: function() {
        return _index.continueStatement;
      }
    });
    Object.defineProperty(exports2, "DebuggerStatement", {
      enumerable: true,
      get: function() {
        return _index.debuggerStatement;
      }
    });
    Object.defineProperty(exports2, "DecimalLiteral", {
      enumerable: true,
      get: function() {
        return _index.decimalLiteral;
      }
    });
    Object.defineProperty(exports2, "DeclareClass", {
      enumerable: true,
      get: function() {
        return _index.declareClass;
      }
    });
    Object.defineProperty(exports2, "DeclareExportAllDeclaration", {
      enumerable: true,
      get: function() {
        return _index.declareExportAllDeclaration;
      }
    });
    Object.defineProperty(exports2, "DeclareExportDeclaration", {
      enumerable: true,
      get: function() {
        return _index.declareExportDeclaration;
      }
    });
    Object.defineProperty(exports2, "DeclareFunction", {
      enumerable: true,
      get: function() {
        return _index.declareFunction;
      }
    });
    Object.defineProperty(exports2, "DeclareInterface", {
      enumerable: true,
      get: function() {
        return _index.declareInterface;
      }
    });
    Object.defineProperty(exports2, "DeclareModule", {
      enumerable: true,
      get: function() {
        return _index.declareModule;
      }
    });
    Object.defineProperty(exports2, "DeclareModuleExports", {
      enumerable: true,
      get: function() {
        return _index.declareModuleExports;
      }
    });
    Object.defineProperty(exports2, "DeclareOpaqueType", {
      enumerable: true,
      get: function() {
        return _index.declareOpaqueType;
      }
    });
    Object.defineProperty(exports2, "DeclareTypeAlias", {
      enumerable: true,
      get: function() {
        return _index.declareTypeAlias;
      }
    });
    Object.defineProperty(exports2, "DeclareVariable", {
      enumerable: true,
      get: function() {
        return _index.declareVariable;
      }
    });
    Object.defineProperty(exports2, "DeclaredPredicate", {
      enumerable: true,
      get: function() {
        return _index.declaredPredicate;
      }
    });
    Object.defineProperty(exports2, "Decorator", {
      enumerable: true,
      get: function() {
        return _index.decorator;
      }
    });
    Object.defineProperty(exports2, "Directive", {
      enumerable: true,
      get: function() {
        return _index.directive;
      }
    });
    Object.defineProperty(exports2, "DirectiveLiteral", {
      enumerable: true,
      get: function() {
        return _index.directiveLiteral;
      }
    });
    Object.defineProperty(exports2, "DoExpression", {
      enumerable: true,
      get: function() {
        return _index.doExpression;
      }
    });
    Object.defineProperty(exports2, "DoWhileStatement", {
      enumerable: true,
      get: function() {
        return _index.doWhileStatement;
      }
    });
    Object.defineProperty(exports2, "EmptyStatement", {
      enumerable: true,
      get: function() {
        return _index.emptyStatement;
      }
    });
    Object.defineProperty(exports2, "EmptyTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.emptyTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "EnumBooleanBody", {
      enumerable: true,
      get: function() {
        return _index.enumBooleanBody;
      }
    });
    Object.defineProperty(exports2, "EnumBooleanMember", {
      enumerable: true,
      get: function() {
        return _index.enumBooleanMember;
      }
    });
    Object.defineProperty(exports2, "EnumDeclaration", {
      enumerable: true,
      get: function() {
        return _index.enumDeclaration;
      }
    });
    Object.defineProperty(exports2, "EnumDefaultedMember", {
      enumerable: true,
      get: function() {
        return _index.enumDefaultedMember;
      }
    });
    Object.defineProperty(exports2, "EnumNumberBody", {
      enumerable: true,
      get: function() {
        return _index.enumNumberBody;
      }
    });
    Object.defineProperty(exports2, "EnumNumberMember", {
      enumerable: true,
      get: function() {
        return _index.enumNumberMember;
      }
    });
    Object.defineProperty(exports2, "EnumStringBody", {
      enumerable: true,
      get: function() {
        return _index.enumStringBody;
      }
    });
    Object.defineProperty(exports2, "EnumStringMember", {
      enumerable: true,
      get: function() {
        return _index.enumStringMember;
      }
    });
    Object.defineProperty(exports2, "EnumSymbolBody", {
      enumerable: true,
      get: function() {
        return _index.enumSymbolBody;
      }
    });
    Object.defineProperty(exports2, "ExistsTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.existsTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "ExportAllDeclaration", {
      enumerable: true,
      get: function() {
        return _index.exportAllDeclaration;
      }
    });
    Object.defineProperty(exports2, "ExportDefaultDeclaration", {
      enumerable: true,
      get: function() {
        return _index.exportDefaultDeclaration;
      }
    });
    Object.defineProperty(exports2, "ExportDefaultSpecifier", {
      enumerable: true,
      get: function() {
        return _index.exportDefaultSpecifier;
      }
    });
    Object.defineProperty(exports2, "ExportNamedDeclaration", {
      enumerable: true,
      get: function() {
        return _index.exportNamedDeclaration;
      }
    });
    Object.defineProperty(exports2, "ExportNamespaceSpecifier", {
      enumerable: true,
      get: function() {
        return _index.exportNamespaceSpecifier;
      }
    });
    Object.defineProperty(exports2, "ExportSpecifier", {
      enumerable: true,
      get: function() {
        return _index.exportSpecifier;
      }
    });
    Object.defineProperty(exports2, "ExpressionStatement", {
      enumerable: true,
      get: function() {
        return _index.expressionStatement;
      }
    });
    Object.defineProperty(exports2, "File", {
      enumerable: true,
      get: function() {
        return _index.file;
      }
    });
    Object.defineProperty(exports2, "ForInStatement", {
      enumerable: true,
      get: function() {
        return _index.forInStatement;
      }
    });
    Object.defineProperty(exports2, "ForOfStatement", {
      enumerable: true,
      get: function() {
        return _index.forOfStatement;
      }
    });
    Object.defineProperty(exports2, "ForStatement", {
      enumerable: true,
      get: function() {
        return _index.forStatement;
      }
    });
    Object.defineProperty(exports2, "FunctionDeclaration", {
      enumerable: true,
      get: function() {
        return _index.functionDeclaration;
      }
    });
    Object.defineProperty(exports2, "FunctionExpression", {
      enumerable: true,
      get: function() {
        return _index.functionExpression;
      }
    });
    Object.defineProperty(exports2, "FunctionTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.functionTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "FunctionTypeParam", {
      enumerable: true,
      get: function() {
        return _index.functionTypeParam;
      }
    });
    Object.defineProperty(exports2, "GenericTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.genericTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "Identifier", {
      enumerable: true,
      get: function() {
        return _index.identifier;
      }
    });
    Object.defineProperty(exports2, "IfStatement", {
      enumerable: true,
      get: function() {
        return _index.ifStatement;
      }
    });
    Object.defineProperty(exports2, "Import", {
      enumerable: true,
      get: function() {
        return _index.import;
      }
    });
    Object.defineProperty(exports2, "ImportAttribute", {
      enumerable: true,
      get: function() {
        return _index.importAttribute;
      }
    });
    Object.defineProperty(exports2, "ImportDeclaration", {
      enumerable: true,
      get: function() {
        return _index.importDeclaration;
      }
    });
    Object.defineProperty(exports2, "ImportDefaultSpecifier", {
      enumerable: true,
      get: function() {
        return _index.importDefaultSpecifier;
      }
    });
    Object.defineProperty(exports2, "ImportNamespaceSpecifier", {
      enumerable: true,
      get: function() {
        return _index.importNamespaceSpecifier;
      }
    });
    Object.defineProperty(exports2, "ImportSpecifier", {
      enumerable: true,
      get: function() {
        return _index.importSpecifier;
      }
    });
    Object.defineProperty(exports2, "IndexedAccessType", {
      enumerable: true,
      get: function() {
        return _index.indexedAccessType;
      }
    });
    Object.defineProperty(exports2, "InferredPredicate", {
      enumerable: true,
      get: function() {
        return _index.inferredPredicate;
      }
    });
    Object.defineProperty(exports2, "InterfaceDeclaration", {
      enumerable: true,
      get: function() {
        return _index.interfaceDeclaration;
      }
    });
    Object.defineProperty(exports2, "InterfaceExtends", {
      enumerable: true,
      get: function() {
        return _index.interfaceExtends;
      }
    });
    Object.defineProperty(exports2, "InterfaceTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.interfaceTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "InterpreterDirective", {
      enumerable: true,
      get: function() {
        return _index.interpreterDirective;
      }
    });
    Object.defineProperty(exports2, "IntersectionTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.intersectionTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "JSXAttribute", {
      enumerable: true,
      get: function() {
        return _index.jsxAttribute;
      }
    });
    Object.defineProperty(exports2, "JSXClosingElement", {
      enumerable: true,
      get: function() {
        return _index.jsxClosingElement;
      }
    });
    Object.defineProperty(exports2, "JSXClosingFragment", {
      enumerable: true,
      get: function() {
        return _index.jsxClosingFragment;
      }
    });
    Object.defineProperty(exports2, "JSXElement", {
      enumerable: true,
      get: function() {
        return _index.jsxElement;
      }
    });
    Object.defineProperty(exports2, "JSXEmptyExpression", {
      enumerable: true,
      get: function() {
        return _index.jsxEmptyExpression;
      }
    });
    Object.defineProperty(exports2, "JSXExpressionContainer", {
      enumerable: true,
      get: function() {
        return _index.jsxExpressionContainer;
      }
    });
    Object.defineProperty(exports2, "JSXFragment", {
      enumerable: true,
      get: function() {
        return _index.jsxFragment;
      }
    });
    Object.defineProperty(exports2, "JSXIdentifier", {
      enumerable: true,
      get: function() {
        return _index.jsxIdentifier;
      }
    });
    Object.defineProperty(exports2, "JSXMemberExpression", {
      enumerable: true,
      get: function() {
        return _index.jsxMemberExpression;
      }
    });
    Object.defineProperty(exports2, "JSXNamespacedName", {
      enumerable: true,
      get: function() {
        return _index.jsxNamespacedName;
      }
    });
    Object.defineProperty(exports2, "JSXOpeningElement", {
      enumerable: true,
      get: function() {
        return _index.jsxOpeningElement;
      }
    });
    Object.defineProperty(exports2, "JSXOpeningFragment", {
      enumerable: true,
      get: function() {
        return _index.jsxOpeningFragment;
      }
    });
    Object.defineProperty(exports2, "JSXSpreadAttribute", {
      enumerable: true,
      get: function() {
        return _index.jsxSpreadAttribute;
      }
    });
    Object.defineProperty(exports2, "JSXSpreadChild", {
      enumerable: true,
      get: function() {
        return _index.jsxSpreadChild;
      }
    });
    Object.defineProperty(exports2, "JSXText", {
      enumerable: true,
      get: function() {
        return _index.jsxText;
      }
    });
    Object.defineProperty(exports2, "LabeledStatement", {
      enumerable: true,
      get: function() {
        return _index.labeledStatement;
      }
    });
    Object.defineProperty(exports2, "LogicalExpression", {
      enumerable: true,
      get: function() {
        return _index.logicalExpression;
      }
    });
    Object.defineProperty(exports2, "MemberExpression", {
      enumerable: true,
      get: function() {
        return _index.memberExpression;
      }
    });
    Object.defineProperty(exports2, "MetaProperty", {
      enumerable: true,
      get: function() {
        return _index.metaProperty;
      }
    });
    Object.defineProperty(exports2, "MixedTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.mixedTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "ModuleExpression", {
      enumerable: true,
      get: function() {
        return _index.moduleExpression;
      }
    });
    Object.defineProperty(exports2, "NewExpression", {
      enumerable: true,
      get: function() {
        return _index.newExpression;
      }
    });
    Object.defineProperty(exports2, "Noop", {
      enumerable: true,
      get: function() {
        return _index.noop;
      }
    });
    Object.defineProperty(exports2, "NullLiteral", {
      enumerable: true,
      get: function() {
        return _index.nullLiteral;
      }
    });
    Object.defineProperty(exports2, "NullLiteralTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.nullLiteralTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "NullableTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.nullableTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "NumberLiteral", {
      enumerable: true,
      get: function() {
        return _index.numberLiteral;
      }
    });
    Object.defineProperty(exports2, "NumberLiteralTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.numberLiteralTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "NumberTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.numberTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "NumericLiteral", {
      enumerable: true,
      get: function() {
        return _index.numericLiteral;
      }
    });
    Object.defineProperty(exports2, "ObjectExpression", {
      enumerable: true,
      get: function() {
        return _index.objectExpression;
      }
    });
    Object.defineProperty(exports2, "ObjectMethod", {
      enumerable: true,
      get: function() {
        return _index.objectMethod;
      }
    });
    Object.defineProperty(exports2, "ObjectPattern", {
      enumerable: true,
      get: function() {
        return _index.objectPattern;
      }
    });
    Object.defineProperty(exports2, "ObjectProperty", {
      enumerable: true,
      get: function() {
        return _index.objectProperty;
      }
    });
    Object.defineProperty(exports2, "ObjectTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.objectTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "ObjectTypeCallProperty", {
      enumerable: true,
      get: function() {
        return _index.objectTypeCallProperty;
      }
    });
    Object.defineProperty(exports2, "ObjectTypeIndexer", {
      enumerable: true,
      get: function() {
        return _index.objectTypeIndexer;
      }
    });
    Object.defineProperty(exports2, "ObjectTypeInternalSlot", {
      enumerable: true,
      get: function() {
        return _index.objectTypeInternalSlot;
      }
    });
    Object.defineProperty(exports2, "ObjectTypeProperty", {
      enumerable: true,
      get: function() {
        return _index.objectTypeProperty;
      }
    });
    Object.defineProperty(exports2, "ObjectTypeSpreadProperty", {
      enumerable: true,
      get: function() {
        return _index.objectTypeSpreadProperty;
      }
    });
    Object.defineProperty(exports2, "OpaqueType", {
      enumerable: true,
      get: function() {
        return _index.opaqueType;
      }
    });
    Object.defineProperty(exports2, "OptionalCallExpression", {
      enumerable: true,
      get: function() {
        return _index.optionalCallExpression;
      }
    });
    Object.defineProperty(exports2, "OptionalIndexedAccessType", {
      enumerable: true,
      get: function() {
        return _index.optionalIndexedAccessType;
      }
    });
    Object.defineProperty(exports2, "OptionalMemberExpression", {
      enumerable: true,
      get: function() {
        return _index.optionalMemberExpression;
      }
    });
    Object.defineProperty(exports2, "ParenthesizedExpression", {
      enumerable: true,
      get: function() {
        return _index.parenthesizedExpression;
      }
    });
    Object.defineProperty(exports2, "PipelineBareFunction", {
      enumerable: true,
      get: function() {
        return _index.pipelineBareFunction;
      }
    });
    Object.defineProperty(exports2, "PipelinePrimaryTopicReference", {
      enumerable: true,
      get: function() {
        return _index.pipelinePrimaryTopicReference;
      }
    });
    Object.defineProperty(exports2, "PipelineTopicExpression", {
      enumerable: true,
      get: function() {
        return _index.pipelineTopicExpression;
      }
    });
    Object.defineProperty(exports2, "Placeholder", {
      enumerable: true,
      get: function() {
        return _index.placeholder;
      }
    });
    Object.defineProperty(exports2, "PrivateName", {
      enumerable: true,
      get: function() {
        return _index.privateName;
      }
    });
    Object.defineProperty(exports2, "Program", {
      enumerable: true,
      get: function() {
        return _index.program;
      }
    });
    Object.defineProperty(exports2, "QualifiedTypeIdentifier", {
      enumerable: true,
      get: function() {
        return _index.qualifiedTypeIdentifier;
      }
    });
    Object.defineProperty(exports2, "RecordExpression", {
      enumerable: true,
      get: function() {
        return _index.recordExpression;
      }
    });
    Object.defineProperty(exports2, "RegExpLiteral", {
      enumerable: true,
      get: function() {
        return _index.regExpLiteral;
      }
    });
    Object.defineProperty(exports2, "RegexLiteral", {
      enumerable: true,
      get: function() {
        return _index.regexLiteral;
      }
    });
    Object.defineProperty(exports2, "RestElement", {
      enumerable: true,
      get: function() {
        return _index.restElement;
      }
    });
    Object.defineProperty(exports2, "RestProperty", {
      enumerable: true,
      get: function() {
        return _index.restProperty;
      }
    });
    Object.defineProperty(exports2, "ReturnStatement", {
      enumerable: true,
      get: function() {
        return _index.returnStatement;
      }
    });
    Object.defineProperty(exports2, "SequenceExpression", {
      enumerable: true,
      get: function() {
        return _index.sequenceExpression;
      }
    });
    Object.defineProperty(exports2, "SpreadElement", {
      enumerable: true,
      get: function() {
        return _index.spreadElement;
      }
    });
    Object.defineProperty(exports2, "SpreadProperty", {
      enumerable: true,
      get: function() {
        return _index.spreadProperty;
      }
    });
    Object.defineProperty(exports2, "StaticBlock", {
      enumerable: true,
      get: function() {
        return _index.staticBlock;
      }
    });
    Object.defineProperty(exports2, "StringLiteral", {
      enumerable: true,
      get: function() {
        return _index.stringLiteral;
      }
    });
    Object.defineProperty(exports2, "StringLiteralTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.stringLiteralTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "StringTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.stringTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "Super", {
      enumerable: true,
      get: function() {
        return _index.super;
      }
    });
    Object.defineProperty(exports2, "SwitchCase", {
      enumerable: true,
      get: function() {
        return _index.switchCase;
      }
    });
    Object.defineProperty(exports2, "SwitchStatement", {
      enumerable: true,
      get: function() {
        return _index.switchStatement;
      }
    });
    Object.defineProperty(exports2, "SymbolTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.symbolTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "TSAnyKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsAnyKeyword;
      }
    });
    Object.defineProperty(exports2, "TSArrayType", {
      enumerable: true,
      get: function() {
        return _index.tsArrayType;
      }
    });
    Object.defineProperty(exports2, "TSAsExpression", {
      enumerable: true,
      get: function() {
        return _index.tsAsExpression;
      }
    });
    Object.defineProperty(exports2, "TSBigIntKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsBigIntKeyword;
      }
    });
    Object.defineProperty(exports2, "TSBooleanKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsBooleanKeyword;
      }
    });
    Object.defineProperty(exports2, "TSCallSignatureDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsCallSignatureDeclaration;
      }
    });
    Object.defineProperty(exports2, "TSConditionalType", {
      enumerable: true,
      get: function() {
        return _index.tsConditionalType;
      }
    });
    Object.defineProperty(exports2, "TSConstructSignatureDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsConstructSignatureDeclaration;
      }
    });
    Object.defineProperty(exports2, "TSConstructorType", {
      enumerable: true,
      get: function() {
        return _index.tsConstructorType;
      }
    });
    Object.defineProperty(exports2, "TSDeclareFunction", {
      enumerable: true,
      get: function() {
        return _index.tsDeclareFunction;
      }
    });
    Object.defineProperty(exports2, "TSDeclareMethod", {
      enumerable: true,
      get: function() {
        return _index.tsDeclareMethod;
      }
    });
    Object.defineProperty(exports2, "TSEnumDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsEnumDeclaration;
      }
    });
    Object.defineProperty(exports2, "TSEnumMember", {
      enumerable: true,
      get: function() {
        return _index.tsEnumMember;
      }
    });
    Object.defineProperty(exports2, "TSExportAssignment", {
      enumerable: true,
      get: function() {
        return _index.tsExportAssignment;
      }
    });
    Object.defineProperty(exports2, "TSExpressionWithTypeArguments", {
      enumerable: true,
      get: function() {
        return _index.tsExpressionWithTypeArguments;
      }
    });
    Object.defineProperty(exports2, "TSExternalModuleReference", {
      enumerable: true,
      get: function() {
        return _index.tsExternalModuleReference;
      }
    });
    Object.defineProperty(exports2, "TSFunctionType", {
      enumerable: true,
      get: function() {
        return _index.tsFunctionType;
      }
    });
    Object.defineProperty(exports2, "TSImportEqualsDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsImportEqualsDeclaration;
      }
    });
    Object.defineProperty(exports2, "TSImportType", {
      enumerable: true,
      get: function() {
        return _index.tsImportType;
      }
    });
    Object.defineProperty(exports2, "TSIndexSignature", {
      enumerable: true,
      get: function() {
        return _index.tsIndexSignature;
      }
    });
    Object.defineProperty(exports2, "TSIndexedAccessType", {
      enumerable: true,
      get: function() {
        return _index.tsIndexedAccessType;
      }
    });
    Object.defineProperty(exports2, "TSInferType", {
      enumerable: true,
      get: function() {
        return _index.tsInferType;
      }
    });
    Object.defineProperty(exports2, "TSInstantiationExpression", {
      enumerable: true,
      get: function() {
        return _index.tsInstantiationExpression;
      }
    });
    Object.defineProperty(exports2, "TSInterfaceBody", {
      enumerable: true,
      get: function() {
        return _index.tsInterfaceBody;
      }
    });
    Object.defineProperty(exports2, "TSInterfaceDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsInterfaceDeclaration;
      }
    });
    Object.defineProperty(exports2, "TSIntersectionType", {
      enumerable: true,
      get: function() {
        return _index.tsIntersectionType;
      }
    });
    Object.defineProperty(exports2, "TSIntrinsicKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsIntrinsicKeyword;
      }
    });
    Object.defineProperty(exports2, "TSLiteralType", {
      enumerable: true,
      get: function() {
        return _index.tsLiteralType;
      }
    });
    Object.defineProperty(exports2, "TSMappedType", {
      enumerable: true,
      get: function() {
        return _index.tsMappedType;
      }
    });
    Object.defineProperty(exports2, "TSMethodSignature", {
      enumerable: true,
      get: function() {
        return _index.tsMethodSignature;
      }
    });
    Object.defineProperty(exports2, "TSModuleBlock", {
      enumerable: true,
      get: function() {
        return _index.tsModuleBlock;
      }
    });
    Object.defineProperty(exports2, "TSModuleDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsModuleDeclaration;
      }
    });
    Object.defineProperty(exports2, "TSNamedTupleMember", {
      enumerable: true,
      get: function() {
        return _index.tsNamedTupleMember;
      }
    });
    Object.defineProperty(exports2, "TSNamespaceExportDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsNamespaceExportDeclaration;
      }
    });
    Object.defineProperty(exports2, "TSNeverKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsNeverKeyword;
      }
    });
    Object.defineProperty(exports2, "TSNonNullExpression", {
      enumerable: true,
      get: function() {
        return _index.tsNonNullExpression;
      }
    });
    Object.defineProperty(exports2, "TSNullKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsNullKeyword;
      }
    });
    Object.defineProperty(exports2, "TSNumberKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsNumberKeyword;
      }
    });
    Object.defineProperty(exports2, "TSObjectKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsObjectKeyword;
      }
    });
    Object.defineProperty(exports2, "TSOptionalType", {
      enumerable: true,
      get: function() {
        return _index.tsOptionalType;
      }
    });
    Object.defineProperty(exports2, "TSParameterProperty", {
      enumerable: true,
      get: function() {
        return _index.tsParameterProperty;
      }
    });
    Object.defineProperty(exports2, "TSParenthesizedType", {
      enumerable: true,
      get: function() {
        return _index.tsParenthesizedType;
      }
    });
    Object.defineProperty(exports2, "TSPropertySignature", {
      enumerable: true,
      get: function() {
        return _index.tsPropertySignature;
      }
    });
    Object.defineProperty(exports2, "TSQualifiedName", {
      enumerable: true,
      get: function() {
        return _index.tsQualifiedName;
      }
    });
    Object.defineProperty(exports2, "TSRestType", {
      enumerable: true,
      get: function() {
        return _index.tsRestType;
      }
    });
    Object.defineProperty(exports2, "TSStringKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsStringKeyword;
      }
    });
    Object.defineProperty(exports2, "TSSymbolKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsSymbolKeyword;
      }
    });
    Object.defineProperty(exports2, "TSThisType", {
      enumerable: true,
      get: function() {
        return _index.tsThisType;
      }
    });
    Object.defineProperty(exports2, "TSTupleType", {
      enumerable: true,
      get: function() {
        return _index.tsTupleType;
      }
    });
    Object.defineProperty(exports2, "TSTypeAliasDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsTypeAliasDeclaration;
      }
    });
    Object.defineProperty(exports2, "TSTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.tsTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "TSTypeAssertion", {
      enumerable: true,
      get: function() {
        return _index.tsTypeAssertion;
      }
    });
    Object.defineProperty(exports2, "TSTypeLiteral", {
      enumerable: true,
      get: function() {
        return _index.tsTypeLiteral;
      }
    });
    Object.defineProperty(exports2, "TSTypeOperator", {
      enumerable: true,
      get: function() {
        return _index.tsTypeOperator;
      }
    });
    Object.defineProperty(exports2, "TSTypeParameter", {
      enumerable: true,
      get: function() {
        return _index.tsTypeParameter;
      }
    });
    Object.defineProperty(exports2, "TSTypeParameterDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsTypeParameterDeclaration;
      }
    });
    Object.defineProperty(exports2, "TSTypeParameterInstantiation", {
      enumerable: true,
      get: function() {
        return _index.tsTypeParameterInstantiation;
      }
    });
    Object.defineProperty(exports2, "TSTypePredicate", {
      enumerable: true,
      get: function() {
        return _index.tsTypePredicate;
      }
    });
    Object.defineProperty(exports2, "TSTypeQuery", {
      enumerable: true,
      get: function() {
        return _index.tsTypeQuery;
      }
    });
    Object.defineProperty(exports2, "TSTypeReference", {
      enumerable: true,
      get: function() {
        return _index.tsTypeReference;
      }
    });
    Object.defineProperty(exports2, "TSUndefinedKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsUndefinedKeyword;
      }
    });
    Object.defineProperty(exports2, "TSUnionType", {
      enumerable: true,
      get: function() {
        return _index.tsUnionType;
      }
    });
    Object.defineProperty(exports2, "TSUnknownKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsUnknownKeyword;
      }
    });
    Object.defineProperty(exports2, "TSVoidKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsVoidKeyword;
      }
    });
    Object.defineProperty(exports2, "TaggedTemplateExpression", {
      enumerable: true,
      get: function() {
        return _index.taggedTemplateExpression;
      }
    });
    Object.defineProperty(exports2, "TemplateElement", {
      enumerable: true,
      get: function() {
        return _index.templateElement;
      }
    });
    Object.defineProperty(exports2, "TemplateLiteral", {
      enumerable: true,
      get: function() {
        return _index.templateLiteral;
      }
    });
    Object.defineProperty(exports2, "ThisExpression", {
      enumerable: true,
      get: function() {
        return _index.thisExpression;
      }
    });
    Object.defineProperty(exports2, "ThisTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.thisTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "ThrowStatement", {
      enumerable: true,
      get: function() {
        return _index.throwStatement;
      }
    });
    Object.defineProperty(exports2, "TopicReference", {
      enumerable: true,
      get: function() {
        return _index.topicReference;
      }
    });
    Object.defineProperty(exports2, "TryStatement", {
      enumerable: true,
      get: function() {
        return _index.tryStatement;
      }
    });
    Object.defineProperty(exports2, "TupleExpression", {
      enumerable: true,
      get: function() {
        return _index.tupleExpression;
      }
    });
    Object.defineProperty(exports2, "TupleTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.tupleTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "TypeAlias", {
      enumerable: true,
      get: function() {
        return _index.typeAlias;
      }
    });
    Object.defineProperty(exports2, "TypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.typeAnnotation;
      }
    });
    Object.defineProperty(exports2, "TypeCastExpression", {
      enumerable: true,
      get: function() {
        return _index.typeCastExpression;
      }
    });
    Object.defineProperty(exports2, "TypeParameter", {
      enumerable: true,
      get: function() {
        return _index.typeParameter;
      }
    });
    Object.defineProperty(exports2, "TypeParameterDeclaration", {
      enumerable: true,
      get: function() {
        return _index.typeParameterDeclaration;
      }
    });
    Object.defineProperty(exports2, "TypeParameterInstantiation", {
      enumerable: true,
      get: function() {
        return _index.typeParameterInstantiation;
      }
    });
    Object.defineProperty(exports2, "TypeofTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.typeofTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "UnaryExpression", {
      enumerable: true,
      get: function() {
        return _index.unaryExpression;
      }
    });
    Object.defineProperty(exports2, "UnionTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.unionTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "UpdateExpression", {
      enumerable: true,
      get: function() {
        return _index.updateExpression;
      }
    });
    Object.defineProperty(exports2, "V8IntrinsicIdentifier", {
      enumerable: true,
      get: function() {
        return _index.v8IntrinsicIdentifier;
      }
    });
    Object.defineProperty(exports2, "VariableDeclaration", {
      enumerable: true,
      get: function() {
        return _index.variableDeclaration;
      }
    });
    Object.defineProperty(exports2, "VariableDeclarator", {
      enumerable: true,
      get: function() {
        return _index.variableDeclarator;
      }
    });
    Object.defineProperty(exports2, "Variance", {
      enumerable: true,
      get: function() {
        return _index.variance;
      }
    });
    Object.defineProperty(exports2, "VoidTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.voidTypeAnnotation;
      }
    });
    Object.defineProperty(exports2, "WhileStatement", {
      enumerable: true,
      get: function() {
        return _index.whileStatement;
      }
    });
    Object.defineProperty(exports2, "WithStatement", {
      enumerable: true,
      get: function() {
        return _index.withStatement;
      }
    });
    Object.defineProperty(exports2, "YieldExpression", {
      enumerable: true,
      get: function() {
        return _index.yieldExpression;
      }
    });
    var _index = require_generated2();
  }
});

// node_modules/@babel/types/lib/clone/cloneNode.js
var require_cloneNode = __commonJS({
  "node_modules/@babel/types/lib/clone/cloneNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = cloneNode;
    var _definitions = require_definitions();
    var _generated = require_generated();
    var has = Function.call.bind(Object.prototype.hasOwnProperty);
    function cloneIfNode(obj, deep, withoutLoc, commentsCache) {
      if (obj && typeof obj.type === "string") {
        return cloneNodeInternal(obj, deep, withoutLoc, commentsCache);
      }
      return obj;
    }
    function cloneIfNodeOrArray(obj, deep, withoutLoc, commentsCache) {
      if (Array.isArray(obj)) {
        return obj.map((node) => cloneIfNode(node, deep, withoutLoc, commentsCache));
      }
      return cloneIfNode(obj, deep, withoutLoc, commentsCache);
    }
    function cloneNode(node, deep = true, withoutLoc = false) {
      return cloneNodeInternal(node, deep, withoutLoc, /* @__PURE__ */ new Map());
    }
    function cloneNodeInternal(node, deep = true, withoutLoc = false, commentsCache) {
      if (!node)
        return node;
      const {
        type
      } = node;
      const newNode = {
        type: node.type
      };
      if ((0, _generated.isIdentifier)(node)) {
        newNode.name = node.name;
        if (has(node, "optional") && typeof node.optional === "boolean") {
          newNode.optional = node.optional;
        }
        if (has(node, "typeAnnotation")) {
          newNode.typeAnnotation = deep ? cloneIfNodeOrArray(node.typeAnnotation, true, withoutLoc, commentsCache) : node.typeAnnotation;
        }
      } else if (!has(_definitions.NODE_FIELDS, type)) {
        throw new Error(`Unknown node type: "${type}"`);
      } else {
        for (const field of Object.keys(_definitions.NODE_FIELDS[type])) {
          if (has(node, field)) {
            if (deep) {
              newNode[field] = (0, _generated.isFile)(node) && field === "comments" ? maybeCloneComments(node.comments, deep, withoutLoc, commentsCache) : cloneIfNodeOrArray(node[field], true, withoutLoc, commentsCache);
            } else {
              newNode[field] = node[field];
            }
          }
        }
      }
      if (has(node, "loc")) {
        if (withoutLoc) {
          newNode.loc = null;
        } else {
          newNode.loc = node.loc;
        }
      }
      if (has(node, "leadingComments")) {
        newNode.leadingComments = maybeCloneComments(node.leadingComments, deep, withoutLoc, commentsCache);
      }
      if (has(node, "innerComments")) {
        newNode.innerComments = maybeCloneComments(node.innerComments, deep, withoutLoc, commentsCache);
      }
      if (has(node, "trailingComments")) {
        newNode.trailingComments = maybeCloneComments(node.trailingComments, deep, withoutLoc, commentsCache);
      }
      if (has(node, "extra")) {
        newNode.extra = Object.assign({}, node.extra);
      }
      return newNode;
    }
    function maybeCloneComments(comments, deep, withoutLoc, commentsCache) {
      if (!comments || !deep) {
        return comments;
      }
      return comments.map((comment) => {
        const cache = commentsCache.get(comment);
        if (cache)
          return cache;
        const {
          type,
          value,
          loc
        } = comment;
        const ret = {
          type,
          value,
          loc
        };
        if (withoutLoc) {
          ret.loc = null;
        }
        commentsCache.set(comment, ret);
        return ret;
      });
    }
  }
});

// node_modules/@babel/types/lib/clone/clone.js
var require_clone = __commonJS({
  "node_modules/@babel/types/lib/clone/clone.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = clone;
    var _cloneNode = require_cloneNode();
    function clone(node) {
      return (0, _cloneNode.default)(node, false);
    }
  }
});

// node_modules/@babel/types/lib/clone/cloneDeep.js
var require_cloneDeep = __commonJS({
  "node_modules/@babel/types/lib/clone/cloneDeep.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = cloneDeep;
    var _cloneNode = require_cloneNode();
    function cloneDeep(node) {
      return (0, _cloneNode.default)(node);
    }
  }
});

// node_modules/@babel/types/lib/clone/cloneDeepWithoutLoc.js
var require_cloneDeepWithoutLoc = __commonJS({
  "node_modules/@babel/types/lib/clone/cloneDeepWithoutLoc.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = cloneDeepWithoutLoc;
    var _cloneNode = require_cloneNode();
    function cloneDeepWithoutLoc(node) {
      return (0, _cloneNode.default)(node, true, true);
    }
  }
});

// node_modules/@babel/types/lib/clone/cloneWithoutLoc.js
var require_cloneWithoutLoc = __commonJS({
  "node_modules/@babel/types/lib/clone/cloneWithoutLoc.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = cloneWithoutLoc;
    var _cloneNode = require_cloneNode();
    function cloneWithoutLoc(node) {
      return (0, _cloneNode.default)(node, false, true);
    }
  }
});

// node_modules/@babel/types/lib/comments/addComments.js
var require_addComments = __commonJS({
  "node_modules/@babel/types/lib/comments/addComments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = addComments;
    function addComments(node, type, comments) {
      if (!comments || !node)
        return node;
      const key = `${type}Comments`;
      if (node[key]) {
        if (type === "leading") {
          node[key] = comments.concat(node[key]);
        } else {
          node[key].push(...comments);
        }
      } else {
        node[key] = comments;
      }
      return node;
    }
  }
});

// node_modules/@babel/types/lib/comments/addComment.js
var require_addComment = __commonJS({
  "node_modules/@babel/types/lib/comments/addComment.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = addComment;
    var _addComments = require_addComments();
    function addComment(node, type, content, line) {
      return (0, _addComments.default)(node, type, [{
        type: line ? "CommentLine" : "CommentBlock",
        value: content
      }]);
    }
  }
});

// node_modules/@babel/types/lib/utils/inherit.js
var require_inherit = __commonJS({
  "node_modules/@babel/types/lib/utils/inherit.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = inherit;
    function inherit(key, child, parent) {
      if (child && parent) {
        child[key] = Array.from(new Set([].concat(child[key], parent[key]).filter(Boolean)));
      }
    }
  }
});

// node_modules/@babel/types/lib/comments/inheritInnerComments.js
var require_inheritInnerComments = __commonJS({
  "node_modules/@babel/types/lib/comments/inheritInnerComments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = inheritInnerComments;
    var _inherit = require_inherit();
    function inheritInnerComments(child, parent) {
      (0, _inherit.default)("innerComments", child, parent);
    }
  }
});

// node_modules/@babel/types/lib/comments/inheritLeadingComments.js
var require_inheritLeadingComments = __commonJS({
  "node_modules/@babel/types/lib/comments/inheritLeadingComments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = inheritLeadingComments;
    var _inherit = require_inherit();
    function inheritLeadingComments(child, parent) {
      (0, _inherit.default)("leadingComments", child, parent);
    }
  }
});

// node_modules/@babel/types/lib/comments/inheritTrailingComments.js
var require_inheritTrailingComments = __commonJS({
  "node_modules/@babel/types/lib/comments/inheritTrailingComments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = inheritTrailingComments;
    var _inherit = require_inherit();
    function inheritTrailingComments(child, parent) {
      (0, _inherit.default)("trailingComments", child, parent);
    }
  }
});

// node_modules/@babel/types/lib/comments/inheritsComments.js
var require_inheritsComments = __commonJS({
  "node_modules/@babel/types/lib/comments/inheritsComments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = inheritsComments;
    var _inheritTrailingComments = require_inheritTrailingComments();
    var _inheritLeadingComments = require_inheritLeadingComments();
    var _inheritInnerComments = require_inheritInnerComments();
    function inheritsComments(child, parent) {
      (0, _inheritTrailingComments.default)(child, parent);
      (0, _inheritLeadingComments.default)(child, parent);
      (0, _inheritInnerComments.default)(child, parent);
      return child;
    }
  }
});

// node_modules/@babel/types/lib/comments/removeComments.js
var require_removeComments = __commonJS({
  "node_modules/@babel/types/lib/comments/removeComments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = removeComments;
    var _constants = require_constants();
    function removeComments(node) {
      _constants.COMMENT_KEYS.forEach((key) => {
        node[key] = null;
      });
      return node;
    }
  }
});

// node_modules/@babel/types/lib/constants/generated/index.js
var require_generated4 = __commonJS({
  "node_modules/@babel/types/lib/constants/generated/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.WHILE_TYPES = exports2.USERWHITESPACABLE_TYPES = exports2.UNARYLIKE_TYPES = exports2.TYPESCRIPT_TYPES = exports2.TSTYPE_TYPES = exports2.TSTYPEELEMENT_TYPES = exports2.TSENTITYNAME_TYPES = exports2.TSBASETYPE_TYPES = exports2.TERMINATORLESS_TYPES = exports2.STATEMENT_TYPES = exports2.STANDARDIZED_TYPES = exports2.SCOPABLE_TYPES = exports2.PUREISH_TYPES = exports2.PROPERTY_TYPES = exports2.PRIVATE_TYPES = exports2.PATTERN_TYPES = exports2.PATTERNLIKE_TYPES = exports2.OBJECTMEMBER_TYPES = exports2.MODULESPECIFIER_TYPES = exports2.MODULEDECLARATION_TYPES = exports2.MISCELLANEOUS_TYPES = exports2.METHOD_TYPES = exports2.LVAL_TYPES = exports2.LOOP_TYPES = exports2.LITERAL_TYPES = exports2.JSX_TYPES = exports2.IMMUTABLE_TYPES = exports2.FUNCTION_TYPES = exports2.FUNCTIONPARENT_TYPES = exports2.FOR_TYPES = exports2.FORXSTATEMENT_TYPES = exports2.FLOW_TYPES = exports2.FLOWTYPE_TYPES = exports2.FLOWPREDICATE_TYPES = exports2.FLOWDECLARATION_TYPES = exports2.FLOWBASEANNOTATION_TYPES = exports2.EXPRESSION_TYPES = exports2.EXPRESSIONWRAPPER_TYPES = exports2.EXPORTDECLARATION_TYPES = exports2.ENUMMEMBER_TYPES = exports2.ENUMBODY_TYPES = exports2.DECLARATION_TYPES = exports2.CONDITIONAL_TYPES = exports2.COMPLETIONSTATEMENT_TYPES = exports2.CLASS_TYPES = exports2.BLOCK_TYPES = exports2.BLOCKPARENT_TYPES = exports2.BINARY_TYPES = exports2.ACCESSOR_TYPES = void 0;
    var _definitions = require_definitions();
    var STANDARDIZED_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Standardized"];
    exports2.STANDARDIZED_TYPES = STANDARDIZED_TYPES;
    var EXPRESSION_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Expression"];
    exports2.EXPRESSION_TYPES = EXPRESSION_TYPES;
    var BINARY_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Binary"];
    exports2.BINARY_TYPES = BINARY_TYPES;
    var SCOPABLE_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Scopable"];
    exports2.SCOPABLE_TYPES = SCOPABLE_TYPES;
    var BLOCKPARENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS["BlockParent"];
    exports2.BLOCKPARENT_TYPES = BLOCKPARENT_TYPES;
    var BLOCK_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Block"];
    exports2.BLOCK_TYPES = BLOCK_TYPES;
    var STATEMENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Statement"];
    exports2.STATEMENT_TYPES = STATEMENT_TYPES;
    var TERMINATORLESS_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Terminatorless"];
    exports2.TERMINATORLESS_TYPES = TERMINATORLESS_TYPES;
    var COMPLETIONSTATEMENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS["CompletionStatement"];
    exports2.COMPLETIONSTATEMENT_TYPES = COMPLETIONSTATEMENT_TYPES;
    var CONDITIONAL_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Conditional"];
    exports2.CONDITIONAL_TYPES = CONDITIONAL_TYPES;
    var LOOP_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Loop"];
    exports2.LOOP_TYPES = LOOP_TYPES;
    var WHILE_TYPES = _definitions.FLIPPED_ALIAS_KEYS["While"];
    exports2.WHILE_TYPES = WHILE_TYPES;
    var EXPRESSIONWRAPPER_TYPES = _definitions.FLIPPED_ALIAS_KEYS["ExpressionWrapper"];
    exports2.EXPRESSIONWRAPPER_TYPES = EXPRESSIONWRAPPER_TYPES;
    var FOR_TYPES = _definitions.FLIPPED_ALIAS_KEYS["For"];
    exports2.FOR_TYPES = FOR_TYPES;
    var FORXSTATEMENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS["ForXStatement"];
    exports2.FORXSTATEMENT_TYPES = FORXSTATEMENT_TYPES;
    var FUNCTION_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Function"];
    exports2.FUNCTION_TYPES = FUNCTION_TYPES;
    var FUNCTIONPARENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS["FunctionParent"];
    exports2.FUNCTIONPARENT_TYPES = FUNCTIONPARENT_TYPES;
    var PUREISH_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Pureish"];
    exports2.PUREISH_TYPES = PUREISH_TYPES;
    var DECLARATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Declaration"];
    exports2.DECLARATION_TYPES = DECLARATION_TYPES;
    var PATTERNLIKE_TYPES = _definitions.FLIPPED_ALIAS_KEYS["PatternLike"];
    exports2.PATTERNLIKE_TYPES = PATTERNLIKE_TYPES;
    var LVAL_TYPES = _definitions.FLIPPED_ALIAS_KEYS["LVal"];
    exports2.LVAL_TYPES = LVAL_TYPES;
    var TSENTITYNAME_TYPES = _definitions.FLIPPED_ALIAS_KEYS["TSEntityName"];
    exports2.TSENTITYNAME_TYPES = TSENTITYNAME_TYPES;
    var LITERAL_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Literal"];
    exports2.LITERAL_TYPES = LITERAL_TYPES;
    var IMMUTABLE_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Immutable"];
    exports2.IMMUTABLE_TYPES = IMMUTABLE_TYPES;
    var USERWHITESPACABLE_TYPES = _definitions.FLIPPED_ALIAS_KEYS["UserWhitespacable"];
    exports2.USERWHITESPACABLE_TYPES = USERWHITESPACABLE_TYPES;
    var METHOD_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Method"];
    exports2.METHOD_TYPES = METHOD_TYPES;
    var OBJECTMEMBER_TYPES = _definitions.FLIPPED_ALIAS_KEYS["ObjectMember"];
    exports2.OBJECTMEMBER_TYPES = OBJECTMEMBER_TYPES;
    var PROPERTY_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Property"];
    exports2.PROPERTY_TYPES = PROPERTY_TYPES;
    var UNARYLIKE_TYPES = _definitions.FLIPPED_ALIAS_KEYS["UnaryLike"];
    exports2.UNARYLIKE_TYPES = UNARYLIKE_TYPES;
    var PATTERN_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Pattern"];
    exports2.PATTERN_TYPES = PATTERN_TYPES;
    var CLASS_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Class"];
    exports2.CLASS_TYPES = CLASS_TYPES;
    var MODULEDECLARATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS["ModuleDeclaration"];
    exports2.MODULEDECLARATION_TYPES = MODULEDECLARATION_TYPES;
    var EXPORTDECLARATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS["ExportDeclaration"];
    exports2.EXPORTDECLARATION_TYPES = EXPORTDECLARATION_TYPES;
    var MODULESPECIFIER_TYPES = _definitions.FLIPPED_ALIAS_KEYS["ModuleSpecifier"];
    exports2.MODULESPECIFIER_TYPES = MODULESPECIFIER_TYPES;
    var ACCESSOR_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Accessor"];
    exports2.ACCESSOR_TYPES = ACCESSOR_TYPES;
    var PRIVATE_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Private"];
    exports2.PRIVATE_TYPES = PRIVATE_TYPES;
    var FLOW_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Flow"];
    exports2.FLOW_TYPES = FLOW_TYPES;
    var FLOWTYPE_TYPES = _definitions.FLIPPED_ALIAS_KEYS["FlowType"];
    exports2.FLOWTYPE_TYPES = FLOWTYPE_TYPES;
    var FLOWBASEANNOTATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS["FlowBaseAnnotation"];
    exports2.FLOWBASEANNOTATION_TYPES = FLOWBASEANNOTATION_TYPES;
    var FLOWDECLARATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS["FlowDeclaration"];
    exports2.FLOWDECLARATION_TYPES = FLOWDECLARATION_TYPES;
    var FLOWPREDICATE_TYPES = _definitions.FLIPPED_ALIAS_KEYS["FlowPredicate"];
    exports2.FLOWPREDICATE_TYPES = FLOWPREDICATE_TYPES;
    var ENUMBODY_TYPES = _definitions.FLIPPED_ALIAS_KEYS["EnumBody"];
    exports2.ENUMBODY_TYPES = ENUMBODY_TYPES;
    var ENUMMEMBER_TYPES = _definitions.FLIPPED_ALIAS_KEYS["EnumMember"];
    exports2.ENUMMEMBER_TYPES = ENUMMEMBER_TYPES;
    var JSX_TYPES = _definitions.FLIPPED_ALIAS_KEYS["JSX"];
    exports2.JSX_TYPES = JSX_TYPES;
    var MISCELLANEOUS_TYPES = _definitions.FLIPPED_ALIAS_KEYS["Miscellaneous"];
    exports2.MISCELLANEOUS_TYPES = MISCELLANEOUS_TYPES;
    var TYPESCRIPT_TYPES = _definitions.FLIPPED_ALIAS_KEYS["TypeScript"];
    exports2.TYPESCRIPT_TYPES = TYPESCRIPT_TYPES;
    var TSTYPEELEMENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS["TSTypeElement"];
    exports2.TSTYPEELEMENT_TYPES = TSTYPEELEMENT_TYPES;
    var TSTYPE_TYPES = _definitions.FLIPPED_ALIAS_KEYS["TSType"];
    exports2.TSTYPE_TYPES = TSTYPE_TYPES;
    var TSBASETYPE_TYPES = _definitions.FLIPPED_ALIAS_KEYS["TSBaseType"];
    exports2.TSBASETYPE_TYPES = TSBASETYPE_TYPES;
  }
});

// node_modules/@babel/types/lib/converters/toBlock.js
var require_toBlock = __commonJS({
  "node_modules/@babel/types/lib/converters/toBlock.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = toBlock;
    var _generated = require_generated();
    var _generated2 = require_generated2();
    function toBlock(node, parent) {
      if ((0, _generated.isBlockStatement)(node)) {
        return node;
      }
      let blockNodes = [];
      if ((0, _generated.isEmptyStatement)(node)) {
        blockNodes = [];
      } else {
        if (!(0, _generated.isStatement)(node)) {
          if ((0, _generated.isFunction)(parent)) {
            node = (0, _generated2.returnStatement)(node);
          } else {
            node = (0, _generated2.expressionStatement)(node);
          }
        }
        blockNodes = [node];
      }
      return (0, _generated2.blockStatement)(blockNodes);
    }
  }
});

// node_modules/@babel/types/lib/converters/ensureBlock.js
var require_ensureBlock = __commonJS({
  "node_modules/@babel/types/lib/converters/ensureBlock.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = ensureBlock;
    var _toBlock = require_toBlock();
    function ensureBlock(node, key = "body") {
      const result = (0, _toBlock.default)(node[key], node);
      node[key] = result;
      return result;
    }
  }
});

// node_modules/@babel/types/lib/converters/toIdentifier.js
var require_toIdentifier = __commonJS({
  "node_modules/@babel/types/lib/converters/toIdentifier.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = toIdentifier;
    var _isValidIdentifier = require_isValidIdentifier();
    var _helperValidatorIdentifier = require_lib();
    function toIdentifier(input) {
      input = input + "";
      let name = "";
      for (const c of input) {
        name += (0, _helperValidatorIdentifier.isIdentifierChar)(c.codePointAt(0)) ? c : "-";
      }
      name = name.replace(/^[-0-9]+/, "");
      name = name.replace(/[-\s]+(.)?/g, function(match, c) {
        return c ? c.toUpperCase() : "";
      });
      if (!(0, _isValidIdentifier.default)(name)) {
        name = `_${name}`;
      }
      return name || "_";
    }
  }
});

// node_modules/@babel/types/lib/converters/toBindingIdentifierName.js
var require_toBindingIdentifierName = __commonJS({
  "node_modules/@babel/types/lib/converters/toBindingIdentifierName.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = toBindingIdentifierName;
    var _toIdentifier = require_toIdentifier();
    function toBindingIdentifierName(name) {
      name = (0, _toIdentifier.default)(name);
      if (name === "eval" || name === "arguments")
        name = "_" + name;
      return name;
    }
  }
});

// node_modules/@babel/types/lib/converters/toComputedKey.js
var require_toComputedKey = __commonJS({
  "node_modules/@babel/types/lib/converters/toComputedKey.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = toComputedKey;
    var _generated = require_generated();
    var _generated2 = require_generated2();
    function toComputedKey(node, key = node.key || node.property) {
      if (!node.computed && (0, _generated.isIdentifier)(key))
        key = (0, _generated2.stringLiteral)(key.name);
      return key;
    }
  }
});

// node_modules/@babel/types/lib/converters/toExpression.js
var require_toExpression = __commonJS({
  "node_modules/@babel/types/lib/converters/toExpression.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _generated = require_generated();
    var _default = toExpression;
    exports2.default = _default;
    function toExpression(node) {
      if ((0, _generated.isExpressionStatement)(node)) {
        node = node.expression;
      }
      if ((0, _generated.isExpression)(node)) {
        return node;
      }
      if ((0, _generated.isClass)(node)) {
        node.type = "ClassExpression";
      } else if ((0, _generated.isFunction)(node)) {
        node.type = "FunctionExpression";
      }
      if (!(0, _generated.isExpression)(node)) {
        throw new Error(`cannot turn ${node.type} to an expression`);
      }
      return node;
    }
  }
});

// node_modules/@babel/types/lib/traverse/traverseFast.js
var require_traverseFast = __commonJS({
  "node_modules/@babel/types/lib/traverse/traverseFast.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = traverseFast;
    var _definitions = require_definitions();
    function traverseFast(node, enter, opts) {
      if (!node)
        return;
      const keys = _definitions.VISITOR_KEYS[node.type];
      if (!keys)
        return;
      opts = opts || {};
      enter(node, opts);
      for (const key of keys) {
        const subNode = node[key];
        if (Array.isArray(subNode)) {
          for (const node2 of subNode) {
            traverseFast(node2, enter, opts);
          }
        } else {
          traverseFast(subNode, enter, opts);
        }
      }
    }
  }
});

// node_modules/@babel/types/lib/modifications/removeProperties.js
var require_removeProperties = __commonJS({
  "node_modules/@babel/types/lib/modifications/removeProperties.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = removeProperties;
    var _constants = require_constants();
    var CLEAR_KEYS = ["tokens", "start", "end", "loc", "raw", "rawValue"];
    var CLEAR_KEYS_PLUS_COMMENTS = [..._constants.COMMENT_KEYS, "comments", ...CLEAR_KEYS];
    function removeProperties(node, opts = {}) {
      const map = opts.preserveComments ? CLEAR_KEYS : CLEAR_KEYS_PLUS_COMMENTS;
      for (const key of map) {
        if (node[key] != null)
          node[key] = void 0;
      }
      for (const key of Object.keys(node)) {
        if (key[0] === "_" && node[key] != null)
          node[key] = void 0;
      }
      const symbols = Object.getOwnPropertySymbols(node);
      for (const sym of symbols) {
        node[sym] = null;
      }
    }
  }
});

// node_modules/@babel/types/lib/modifications/removePropertiesDeep.js
var require_removePropertiesDeep = __commonJS({
  "node_modules/@babel/types/lib/modifications/removePropertiesDeep.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = removePropertiesDeep;
    var _traverseFast = require_traverseFast();
    var _removeProperties = require_removeProperties();
    function removePropertiesDeep(tree, opts) {
      (0, _traverseFast.default)(tree, _removeProperties.default, opts);
      return tree;
    }
  }
});

// node_modules/@babel/types/lib/converters/toKeyAlias.js
var require_toKeyAlias = __commonJS({
  "node_modules/@babel/types/lib/converters/toKeyAlias.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = toKeyAlias;
    var _generated = require_generated();
    var _cloneNode = require_cloneNode();
    var _removePropertiesDeep = require_removePropertiesDeep();
    function toKeyAlias(node, key = node.key) {
      let alias;
      if (node.kind === "method") {
        return toKeyAlias.increment() + "";
      } else if ((0, _generated.isIdentifier)(key)) {
        alias = key.name;
      } else if ((0, _generated.isStringLiteral)(key)) {
        alias = JSON.stringify(key.value);
      } else {
        alias = JSON.stringify((0, _removePropertiesDeep.default)((0, _cloneNode.default)(key)));
      }
      if (node.computed) {
        alias = `[${alias}]`;
      }
      if (node.static) {
        alias = `static:${alias}`;
      }
      return alias;
    }
    toKeyAlias.uid = 0;
    toKeyAlias.increment = function() {
      if (toKeyAlias.uid >= Number.MAX_SAFE_INTEGER) {
        return toKeyAlias.uid = 0;
      } else {
        return toKeyAlias.uid++;
      }
    };
  }
});

// node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js
var require_getBindingIdentifiers = __commonJS({
  "node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = getBindingIdentifiers;
    var _generated = require_generated();
    function getBindingIdentifiers(node, duplicates, outerOnly) {
      const search = [].concat(node);
      const ids = /* @__PURE__ */ Object.create(null);
      while (search.length) {
        const id = search.shift();
        if (!id)
          continue;
        const keys = getBindingIdentifiers.keys[id.type];
        if ((0, _generated.isIdentifier)(id)) {
          if (duplicates) {
            const _ids = ids[id.name] = ids[id.name] || [];
            _ids.push(id);
          } else {
            ids[id.name] = id;
          }
          continue;
        }
        if ((0, _generated.isExportDeclaration)(id) && !(0, _generated.isExportAllDeclaration)(id)) {
          if ((0, _generated.isDeclaration)(id.declaration)) {
            search.push(id.declaration);
          }
          continue;
        }
        if (outerOnly) {
          if ((0, _generated.isFunctionDeclaration)(id)) {
            search.push(id.id);
            continue;
          }
          if ((0, _generated.isFunctionExpression)(id)) {
            continue;
          }
        }
        if (keys) {
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const nodes = id[key];
            if (nodes) {
              Array.isArray(nodes) ? search.push(...nodes) : search.push(nodes);
            }
          }
        }
      }
      return ids;
    }
    getBindingIdentifiers.keys = {
      DeclareClass: ["id"],
      DeclareFunction: ["id"],
      DeclareModule: ["id"],
      DeclareVariable: ["id"],
      DeclareInterface: ["id"],
      DeclareTypeAlias: ["id"],
      DeclareOpaqueType: ["id"],
      InterfaceDeclaration: ["id"],
      TypeAlias: ["id"],
      OpaqueType: ["id"],
      CatchClause: ["param"],
      LabeledStatement: ["label"],
      UnaryExpression: ["argument"],
      AssignmentExpression: ["left"],
      ImportSpecifier: ["local"],
      ImportNamespaceSpecifier: ["local"],
      ImportDefaultSpecifier: ["local"],
      ImportDeclaration: ["specifiers"],
      ExportSpecifier: ["exported"],
      ExportNamespaceSpecifier: ["exported"],
      ExportDefaultSpecifier: ["exported"],
      FunctionDeclaration: ["id", "params"],
      FunctionExpression: ["id", "params"],
      ArrowFunctionExpression: ["params"],
      ObjectMethod: ["params"],
      ClassMethod: ["params"],
      ClassPrivateMethod: ["params"],
      ForInStatement: ["left"],
      ForOfStatement: ["left"],
      ClassDeclaration: ["id"],
      ClassExpression: ["id"],
      RestElement: ["argument"],
      UpdateExpression: ["argument"],
      ObjectProperty: ["value"],
      AssignmentPattern: ["left"],
      ArrayPattern: ["elements"],
      ObjectPattern: ["properties"],
      VariableDeclaration: ["declarations"],
      VariableDeclarator: ["id"]
    };
  }
});

// node_modules/@babel/types/lib/converters/gatherSequenceExpressions.js
var require_gatherSequenceExpressions = __commonJS({
  "node_modules/@babel/types/lib/converters/gatherSequenceExpressions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = gatherSequenceExpressions;
    var _getBindingIdentifiers = require_getBindingIdentifiers();
    var _generated = require_generated();
    var _generated2 = require_generated2();
    var _cloneNode = require_cloneNode();
    function gatherSequenceExpressions(nodes, scope, declars) {
      const exprs = [];
      let ensureLastUndefined = true;
      for (const node of nodes) {
        if (!(0, _generated.isEmptyStatement)(node)) {
          ensureLastUndefined = false;
        }
        if ((0, _generated.isExpression)(node)) {
          exprs.push(node);
        } else if ((0, _generated.isExpressionStatement)(node)) {
          exprs.push(node.expression);
        } else if ((0, _generated.isVariableDeclaration)(node)) {
          if (node.kind !== "var")
            return;
          for (const declar of node.declarations) {
            const bindings = (0, _getBindingIdentifiers.default)(declar);
            for (const key of Object.keys(bindings)) {
              declars.push({
                kind: node.kind,
                id: (0, _cloneNode.default)(bindings[key])
              });
            }
            if (declar.init) {
              exprs.push((0, _generated2.assignmentExpression)("=", declar.id, declar.init));
            }
          }
          ensureLastUndefined = true;
        } else if ((0, _generated.isIfStatement)(node)) {
          const consequent = node.consequent ? gatherSequenceExpressions([node.consequent], scope, declars) : scope.buildUndefinedNode();
          const alternate = node.alternate ? gatherSequenceExpressions([node.alternate], scope, declars) : scope.buildUndefinedNode();
          if (!consequent || !alternate)
            return;
          exprs.push((0, _generated2.conditionalExpression)(node.test, consequent, alternate));
        } else if ((0, _generated.isBlockStatement)(node)) {
          const body = gatherSequenceExpressions(node.body, scope, declars);
          if (!body)
            return;
          exprs.push(body);
        } else if ((0, _generated.isEmptyStatement)(node)) {
          if (nodes.indexOf(node) === 0) {
            ensureLastUndefined = true;
          }
        } else {
          return;
        }
      }
      if (ensureLastUndefined) {
        exprs.push(scope.buildUndefinedNode());
      }
      if (exprs.length === 1) {
        return exprs[0];
      } else {
        return (0, _generated2.sequenceExpression)(exprs);
      }
    }
  }
});

// node_modules/@babel/types/lib/converters/toSequenceExpression.js
var require_toSequenceExpression = __commonJS({
  "node_modules/@babel/types/lib/converters/toSequenceExpression.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = toSequenceExpression;
    var _gatherSequenceExpressions = require_gatherSequenceExpressions();
    function toSequenceExpression(nodes, scope) {
      if (!(nodes != null && nodes.length))
        return;
      const declars = [];
      const result = (0, _gatherSequenceExpressions.default)(nodes, scope, declars);
      if (!result)
        return;
      for (const declar of declars) {
        scope.push(declar);
      }
      return result;
    }
  }
});

// node_modules/@babel/types/lib/converters/toStatement.js
var require_toStatement = __commonJS({
  "node_modules/@babel/types/lib/converters/toStatement.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _generated = require_generated();
    var _generated2 = require_generated2();
    var _default = toStatement;
    exports2.default = _default;
    function toStatement(node, ignore) {
      if ((0, _generated.isStatement)(node)) {
        return node;
      }
      let mustHaveId = false;
      let newType;
      if ((0, _generated.isClass)(node)) {
        mustHaveId = true;
        newType = "ClassDeclaration";
      } else if ((0, _generated.isFunction)(node)) {
        mustHaveId = true;
        newType = "FunctionDeclaration";
      } else if ((0, _generated.isAssignmentExpression)(node)) {
        return (0, _generated2.expressionStatement)(node);
      }
      if (mustHaveId && !node.id) {
        newType = false;
      }
      if (!newType) {
        if (ignore) {
          return false;
        } else {
          throw new Error(`cannot turn ${node.type} to a statement`);
        }
      }
      node.type = newType;
      return node;
    }
  }
});

// node_modules/@babel/types/lib/converters/valueToNode.js
var require_valueToNode = __commonJS({
  "node_modules/@babel/types/lib/converters/valueToNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _isValidIdentifier = require_isValidIdentifier();
    var _generated = require_generated2();
    var _default = valueToNode;
    exports2.default = _default;
    var objectToString = Function.call.bind(Object.prototype.toString);
    function isRegExp(value) {
      return objectToString(value) === "[object RegExp]";
    }
    function isPlainObject(value) {
      if (typeof value !== "object" || value === null || Object.prototype.toString.call(value) !== "[object Object]") {
        return false;
      }
      const proto = Object.getPrototypeOf(value);
      return proto === null || Object.getPrototypeOf(proto) === null;
    }
    function valueToNode(value) {
      if (value === void 0) {
        return (0, _generated.identifier)("undefined");
      }
      if (value === true || value === false) {
        return (0, _generated.booleanLiteral)(value);
      }
      if (value === null) {
        return (0, _generated.nullLiteral)();
      }
      if (typeof value === "string") {
        return (0, _generated.stringLiteral)(value);
      }
      if (typeof value === "number") {
        let result;
        if (Number.isFinite(value)) {
          result = (0, _generated.numericLiteral)(Math.abs(value));
        } else {
          let numerator;
          if (Number.isNaN(value)) {
            numerator = (0, _generated.numericLiteral)(0);
          } else {
            numerator = (0, _generated.numericLiteral)(1);
          }
          result = (0, _generated.binaryExpression)("/", numerator, (0, _generated.numericLiteral)(0));
        }
        if (value < 0 || Object.is(value, -0)) {
          result = (0, _generated.unaryExpression)("-", result);
        }
        return result;
      }
      if (isRegExp(value)) {
        const pattern = value.source;
        const flags = value.toString().match(/\/([a-z]+|)$/)[1];
        return (0, _generated.regExpLiteral)(pattern, flags);
      }
      if (Array.isArray(value)) {
        return (0, _generated.arrayExpression)(value.map(valueToNode));
      }
      if (isPlainObject(value)) {
        const props = [];
        for (const key of Object.keys(value)) {
          let nodeKey;
          if ((0, _isValidIdentifier.default)(key)) {
            nodeKey = (0, _generated.identifier)(key);
          } else {
            nodeKey = (0, _generated.stringLiteral)(key);
          }
          props.push((0, _generated.objectProperty)(nodeKey, valueToNode(value[key])));
        }
        return (0, _generated.objectExpression)(props);
      }
      throw new Error("don't know how to turn this value into a node");
    }
  }
});

// node_modules/@babel/types/lib/modifications/appendToMemberExpression.js
var require_appendToMemberExpression = __commonJS({
  "node_modules/@babel/types/lib/modifications/appendToMemberExpression.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = appendToMemberExpression;
    var _generated = require_generated2();
    function appendToMemberExpression(member, append, computed = false) {
      member.object = (0, _generated.memberExpression)(member.object, member.property, member.computed);
      member.property = append;
      member.computed = !!computed;
      return member;
    }
  }
});

// node_modules/@babel/types/lib/modifications/inherits.js
var require_inherits = __commonJS({
  "node_modules/@babel/types/lib/modifications/inherits.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = inherits;
    var _constants = require_constants();
    var _inheritsComments = require_inheritsComments();
    function inherits(child, parent) {
      if (!child || !parent)
        return child;
      for (const key of _constants.INHERIT_KEYS.optional) {
        if (child[key] == null) {
          child[key] = parent[key];
        }
      }
      for (const key of Object.keys(parent)) {
        if (key[0] === "_" && key !== "__clone") {
          child[key] = parent[key];
        }
      }
      for (const key of _constants.INHERIT_KEYS.force) {
        child[key] = parent[key];
      }
      (0, _inheritsComments.default)(child, parent);
      return child;
    }
  }
});

// node_modules/@babel/types/lib/modifications/prependToMemberExpression.js
var require_prependToMemberExpression = __commonJS({
  "node_modules/@babel/types/lib/modifications/prependToMemberExpression.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = prependToMemberExpression;
    var _generated = require_generated2();
    var _ = require_lib3();
    function prependToMemberExpression(member, prepend) {
      if ((0, _.isSuper)(member.object)) {
        throw new Error("Cannot prepend node to super property access (`super.foo`).");
      }
      member.object = (0, _generated.memberExpression)(prepend, member.object);
      return member;
    }
  }
});

// node_modules/@babel/types/lib/retrievers/getOuterBindingIdentifiers.js
var require_getOuterBindingIdentifiers = __commonJS({
  "node_modules/@babel/types/lib/retrievers/getOuterBindingIdentifiers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _getBindingIdentifiers = require_getBindingIdentifiers();
    var _default = getOuterBindingIdentifiers;
    exports2.default = _default;
    function getOuterBindingIdentifiers(node, duplicates) {
      return (0, _getBindingIdentifiers.default)(node, duplicates, true);
    }
  }
});

// node_modules/@babel/types/lib/traverse/traverse.js
var require_traverse = __commonJS({
  "node_modules/@babel/types/lib/traverse/traverse.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = traverse;
    var _definitions = require_definitions();
    function traverse(node, handlers, state) {
      if (typeof handlers === "function") {
        handlers = {
          enter: handlers
        };
      }
      const {
        enter,
        exit
      } = handlers;
      traverseSimpleImpl(node, enter, exit, state, []);
    }
    function traverseSimpleImpl(node, enter, exit, state, ancestors) {
      const keys = _definitions.VISITOR_KEYS[node.type];
      if (!keys)
        return;
      if (enter)
        enter(node, ancestors, state);
      for (const key of keys) {
        const subNode = node[key];
        if (Array.isArray(subNode)) {
          for (let i = 0; i < subNode.length; i++) {
            const child = subNode[i];
            if (!child)
              continue;
            ancestors.push({
              node,
              key,
              index: i
            });
            traverseSimpleImpl(child, enter, exit, state, ancestors);
            ancestors.pop();
          }
        } else if (subNode) {
          ancestors.push({
            node,
            key
          });
          traverseSimpleImpl(subNode, enter, exit, state, ancestors);
          ancestors.pop();
        }
      }
      if (exit)
        exit(node, ancestors, state);
    }
  }
});

// node_modules/@babel/types/lib/validators/isBinding.js
var require_isBinding = __commonJS({
  "node_modules/@babel/types/lib/validators/isBinding.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isBinding;
    var _getBindingIdentifiers = require_getBindingIdentifiers();
    function isBinding(node, parent, grandparent) {
      if (grandparent && node.type === "Identifier" && parent.type === "ObjectProperty" && grandparent.type === "ObjectExpression") {
        return false;
      }
      const keys = _getBindingIdentifiers.default.keys[parent.type];
      if (keys) {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const val = parent[key];
          if (Array.isArray(val)) {
            if (val.indexOf(node) >= 0)
              return true;
          } else {
            if (val === node)
              return true;
          }
        }
      }
      return false;
    }
  }
});

// node_modules/@babel/types/lib/validators/isLet.js
var require_isLet = __commonJS({
  "node_modules/@babel/types/lib/validators/isLet.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isLet;
    var _generated = require_generated();
    var _constants = require_constants();
    function isLet(node) {
      return (0, _generated.isVariableDeclaration)(node) && (node.kind !== "var" || node[_constants.BLOCK_SCOPED_SYMBOL]);
    }
  }
});

// node_modules/@babel/types/lib/validators/isBlockScoped.js
var require_isBlockScoped = __commonJS({
  "node_modules/@babel/types/lib/validators/isBlockScoped.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isBlockScoped;
    var _generated = require_generated();
    var _isLet = require_isLet();
    function isBlockScoped(node) {
      return (0, _generated.isFunctionDeclaration)(node) || (0, _generated.isClassDeclaration)(node) || (0, _isLet.default)(node);
    }
  }
});

// node_modules/@babel/types/lib/validators/isImmutable.js
var require_isImmutable = __commonJS({
  "node_modules/@babel/types/lib/validators/isImmutable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isImmutable;
    var _isType = require_isType();
    var _generated = require_generated();
    function isImmutable(node) {
      if ((0, _isType.default)(node.type, "Immutable"))
        return true;
      if ((0, _generated.isIdentifier)(node)) {
        if (node.name === "undefined") {
          return true;
        } else {
          return false;
        }
      }
      return false;
    }
  }
});

// node_modules/@babel/types/lib/validators/isNodesEquivalent.js
var require_isNodesEquivalent = __commonJS({
  "node_modules/@babel/types/lib/validators/isNodesEquivalent.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isNodesEquivalent;
    var _definitions = require_definitions();
    function isNodesEquivalent(a, b) {
      if (typeof a !== "object" || typeof b !== "object" || a == null || b == null) {
        return a === b;
      }
      if (a.type !== b.type) {
        return false;
      }
      const fields = Object.keys(_definitions.NODE_FIELDS[a.type] || a.type);
      const visitorKeys = _definitions.VISITOR_KEYS[a.type];
      for (const field of fields) {
        const val_a = a[field];
        const val_b = b[field];
        if (typeof val_a !== typeof val_b) {
          return false;
        }
        if (val_a == null && val_b == null) {
          continue;
        } else if (val_a == null || val_b == null) {
          return false;
        }
        if (Array.isArray(val_a)) {
          if (!Array.isArray(val_b)) {
            return false;
          }
          if (val_a.length !== val_b.length) {
            return false;
          }
          for (let i = 0; i < val_a.length; i++) {
            if (!isNodesEquivalent(val_a[i], val_b[i])) {
              return false;
            }
          }
          continue;
        }
        if (typeof val_a === "object" && !(visitorKeys != null && visitorKeys.includes(field))) {
          for (const key of Object.keys(val_a)) {
            if (val_a[key] !== val_b[key]) {
              return false;
            }
          }
          continue;
        }
        if (!isNodesEquivalent(val_a, val_b)) {
          return false;
        }
      }
      return true;
    }
  }
});

// node_modules/@babel/types/lib/validators/isReferenced.js
var require_isReferenced = __commonJS({
  "node_modules/@babel/types/lib/validators/isReferenced.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isReferenced;
    function isReferenced(node, parent, grandparent) {
      switch (parent.type) {
        case "MemberExpression":
        case "OptionalMemberExpression":
          if (parent.property === node) {
            return !!parent.computed;
          }
          return parent.object === node;
        case "JSXMemberExpression":
          return parent.object === node;
        case "VariableDeclarator":
          return parent.init === node;
        case "ArrowFunctionExpression":
          return parent.body === node;
        case "PrivateName":
          return false;
        case "ClassMethod":
        case "ClassPrivateMethod":
        case "ObjectMethod":
          if (parent.key === node) {
            return !!parent.computed;
          }
          return false;
        case "ObjectProperty":
          if (parent.key === node) {
            return !!parent.computed;
          }
          return !grandparent || grandparent.type !== "ObjectPattern";
        case "ClassProperty":
        case "ClassAccessorProperty":
          if (parent.key === node) {
            return !!parent.computed;
          }
          return true;
        case "ClassPrivateProperty":
          return parent.key !== node;
        case "ClassDeclaration":
        case "ClassExpression":
          return parent.superClass === node;
        case "AssignmentExpression":
          return parent.right === node;
        case "AssignmentPattern":
          return parent.right === node;
        case "LabeledStatement":
          return false;
        case "CatchClause":
          return false;
        case "RestElement":
          return false;
        case "BreakStatement":
        case "ContinueStatement":
          return false;
        case "FunctionDeclaration":
        case "FunctionExpression":
          return false;
        case "ExportNamespaceSpecifier":
        case "ExportDefaultSpecifier":
          return false;
        case "ExportSpecifier":
          if (grandparent != null && grandparent.source) {
            return false;
          }
          return parent.local === node;
        case "ImportDefaultSpecifier":
        case "ImportNamespaceSpecifier":
        case "ImportSpecifier":
          return false;
        case "ImportAttribute":
          return false;
        case "JSXAttribute":
          return false;
        case "ObjectPattern":
        case "ArrayPattern":
          return false;
        case "MetaProperty":
          return false;
        case "ObjectTypeProperty":
          return parent.key !== node;
        case "TSEnumMember":
          return parent.id !== node;
        case "TSPropertySignature":
          if (parent.key === node) {
            return !!parent.computed;
          }
          return true;
      }
      return true;
    }
  }
});

// node_modules/@babel/types/lib/validators/isScope.js
var require_isScope = __commonJS({
  "node_modules/@babel/types/lib/validators/isScope.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isScope;
    var _generated = require_generated();
    function isScope(node, parent) {
      if ((0, _generated.isBlockStatement)(node) && ((0, _generated.isFunction)(parent) || (0, _generated.isCatchClause)(parent))) {
        return false;
      }
      if ((0, _generated.isPattern)(node) && ((0, _generated.isFunction)(parent) || (0, _generated.isCatchClause)(parent))) {
        return true;
      }
      return (0, _generated.isScopable)(node);
    }
  }
});

// node_modules/@babel/types/lib/validators/isSpecifierDefault.js
var require_isSpecifierDefault = __commonJS({
  "node_modules/@babel/types/lib/validators/isSpecifierDefault.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isSpecifierDefault;
    var _generated = require_generated();
    function isSpecifierDefault(specifier) {
      return (0, _generated.isImportDefaultSpecifier)(specifier) || (0, _generated.isIdentifier)(specifier.imported || specifier.exported, {
        name: "default"
      });
    }
  }
});

// node_modules/@babel/types/lib/validators/isValidES3Identifier.js
var require_isValidES3Identifier = __commonJS({
  "node_modules/@babel/types/lib/validators/isValidES3Identifier.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isValidES3Identifier;
    var _isValidIdentifier = require_isValidIdentifier();
    var RESERVED_WORDS_ES3_ONLY = /* @__PURE__ */ new Set(["abstract", "boolean", "byte", "char", "double", "enum", "final", "float", "goto", "implements", "int", "interface", "long", "native", "package", "private", "protected", "public", "short", "static", "synchronized", "throws", "transient", "volatile"]);
    function isValidES3Identifier(name) {
      return (0, _isValidIdentifier.default)(name) && !RESERVED_WORDS_ES3_ONLY.has(name);
    }
  }
});

// node_modules/@babel/types/lib/validators/isVar.js
var require_isVar = __commonJS({
  "node_modules/@babel/types/lib/validators/isVar.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isVar;
    var _generated = require_generated();
    var _constants = require_constants();
    function isVar(node) {
      return (0, _generated.isVariableDeclaration)(node, {
        kind: "var"
      }) && !node[_constants.BLOCK_SCOPED_SYMBOL];
    }
  }
});

// node_modules/@babel/types/lib/ast-types/generated/index.js
var require_generated5 = __commonJS({
  "node_modules/@babel/types/lib/ast-types/generated/index.js"() {
  }
});

// node_modules/@babel/types/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/@babel/types/lib/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _exportNames = {
      react: true,
      assertNode: true,
      createTypeAnnotationBasedOnTypeof: true,
      createUnionTypeAnnotation: true,
      createFlowUnionType: true,
      createTSUnionType: true,
      cloneNode: true,
      clone: true,
      cloneDeep: true,
      cloneDeepWithoutLoc: true,
      cloneWithoutLoc: true,
      addComment: true,
      addComments: true,
      inheritInnerComments: true,
      inheritLeadingComments: true,
      inheritsComments: true,
      inheritTrailingComments: true,
      removeComments: true,
      ensureBlock: true,
      toBindingIdentifierName: true,
      toBlock: true,
      toComputedKey: true,
      toExpression: true,
      toIdentifier: true,
      toKeyAlias: true,
      toSequenceExpression: true,
      toStatement: true,
      valueToNode: true,
      appendToMemberExpression: true,
      inherits: true,
      prependToMemberExpression: true,
      removeProperties: true,
      removePropertiesDeep: true,
      removeTypeDuplicates: true,
      getBindingIdentifiers: true,
      getOuterBindingIdentifiers: true,
      traverse: true,
      traverseFast: true,
      shallowEqual: true,
      is: true,
      isBinding: true,
      isBlockScoped: true,
      isImmutable: true,
      isLet: true,
      isNode: true,
      isNodesEquivalent: true,
      isPlaceholderType: true,
      isReferenced: true,
      isScope: true,
      isSpecifierDefault: true,
      isType: true,
      isValidES3Identifier: true,
      isValidIdentifier: true,
      isVar: true,
      matchesPattern: true,
      validate: true,
      buildMatchMemberExpression: true
    };
    Object.defineProperty(exports2, "addComment", {
      enumerable: true,
      get: function() {
        return _addComment.default;
      }
    });
    Object.defineProperty(exports2, "addComments", {
      enumerable: true,
      get: function() {
        return _addComments.default;
      }
    });
    Object.defineProperty(exports2, "appendToMemberExpression", {
      enumerable: true,
      get: function() {
        return _appendToMemberExpression.default;
      }
    });
    Object.defineProperty(exports2, "assertNode", {
      enumerable: true,
      get: function() {
        return _assertNode.default;
      }
    });
    Object.defineProperty(exports2, "buildMatchMemberExpression", {
      enumerable: true,
      get: function() {
        return _buildMatchMemberExpression.default;
      }
    });
    Object.defineProperty(exports2, "clone", {
      enumerable: true,
      get: function() {
        return _clone.default;
      }
    });
    Object.defineProperty(exports2, "cloneDeep", {
      enumerable: true,
      get: function() {
        return _cloneDeep.default;
      }
    });
    Object.defineProperty(exports2, "cloneDeepWithoutLoc", {
      enumerable: true,
      get: function() {
        return _cloneDeepWithoutLoc.default;
      }
    });
    Object.defineProperty(exports2, "cloneNode", {
      enumerable: true,
      get: function() {
        return _cloneNode.default;
      }
    });
    Object.defineProperty(exports2, "cloneWithoutLoc", {
      enumerable: true,
      get: function() {
        return _cloneWithoutLoc.default;
      }
    });
    Object.defineProperty(exports2, "createFlowUnionType", {
      enumerable: true,
      get: function() {
        return _createFlowUnionType.default;
      }
    });
    Object.defineProperty(exports2, "createTSUnionType", {
      enumerable: true,
      get: function() {
        return _createTSUnionType.default;
      }
    });
    Object.defineProperty(exports2, "createTypeAnnotationBasedOnTypeof", {
      enumerable: true,
      get: function() {
        return _createTypeAnnotationBasedOnTypeof.default;
      }
    });
    Object.defineProperty(exports2, "createUnionTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _createFlowUnionType.default;
      }
    });
    Object.defineProperty(exports2, "ensureBlock", {
      enumerable: true,
      get: function() {
        return _ensureBlock.default;
      }
    });
    Object.defineProperty(exports2, "getBindingIdentifiers", {
      enumerable: true,
      get: function() {
        return _getBindingIdentifiers.default;
      }
    });
    Object.defineProperty(exports2, "getOuterBindingIdentifiers", {
      enumerable: true,
      get: function() {
        return _getOuterBindingIdentifiers.default;
      }
    });
    Object.defineProperty(exports2, "inheritInnerComments", {
      enumerable: true,
      get: function() {
        return _inheritInnerComments.default;
      }
    });
    Object.defineProperty(exports2, "inheritLeadingComments", {
      enumerable: true,
      get: function() {
        return _inheritLeadingComments.default;
      }
    });
    Object.defineProperty(exports2, "inheritTrailingComments", {
      enumerable: true,
      get: function() {
        return _inheritTrailingComments.default;
      }
    });
    Object.defineProperty(exports2, "inherits", {
      enumerable: true,
      get: function() {
        return _inherits.default;
      }
    });
    Object.defineProperty(exports2, "inheritsComments", {
      enumerable: true,
      get: function() {
        return _inheritsComments.default;
      }
    });
    Object.defineProperty(exports2, "is", {
      enumerable: true,
      get: function() {
        return _is.default;
      }
    });
    Object.defineProperty(exports2, "isBinding", {
      enumerable: true,
      get: function() {
        return _isBinding.default;
      }
    });
    Object.defineProperty(exports2, "isBlockScoped", {
      enumerable: true,
      get: function() {
        return _isBlockScoped.default;
      }
    });
    Object.defineProperty(exports2, "isImmutable", {
      enumerable: true,
      get: function() {
        return _isImmutable.default;
      }
    });
    Object.defineProperty(exports2, "isLet", {
      enumerable: true,
      get: function() {
        return _isLet.default;
      }
    });
    Object.defineProperty(exports2, "isNode", {
      enumerable: true,
      get: function() {
        return _isNode.default;
      }
    });
    Object.defineProperty(exports2, "isNodesEquivalent", {
      enumerable: true,
      get: function() {
        return _isNodesEquivalent.default;
      }
    });
    Object.defineProperty(exports2, "isPlaceholderType", {
      enumerable: true,
      get: function() {
        return _isPlaceholderType.default;
      }
    });
    Object.defineProperty(exports2, "isReferenced", {
      enumerable: true,
      get: function() {
        return _isReferenced.default;
      }
    });
    Object.defineProperty(exports2, "isScope", {
      enumerable: true,
      get: function() {
        return _isScope.default;
      }
    });
    Object.defineProperty(exports2, "isSpecifierDefault", {
      enumerable: true,
      get: function() {
        return _isSpecifierDefault.default;
      }
    });
    Object.defineProperty(exports2, "isType", {
      enumerable: true,
      get: function() {
        return _isType.default;
      }
    });
    Object.defineProperty(exports2, "isValidES3Identifier", {
      enumerable: true,
      get: function() {
        return _isValidES3Identifier.default;
      }
    });
    Object.defineProperty(exports2, "isValidIdentifier", {
      enumerable: true,
      get: function() {
        return _isValidIdentifier.default;
      }
    });
    Object.defineProperty(exports2, "isVar", {
      enumerable: true,
      get: function() {
        return _isVar.default;
      }
    });
    Object.defineProperty(exports2, "matchesPattern", {
      enumerable: true,
      get: function() {
        return _matchesPattern.default;
      }
    });
    Object.defineProperty(exports2, "prependToMemberExpression", {
      enumerable: true,
      get: function() {
        return _prependToMemberExpression.default;
      }
    });
    exports2.react = void 0;
    Object.defineProperty(exports2, "removeComments", {
      enumerable: true,
      get: function() {
        return _removeComments.default;
      }
    });
    Object.defineProperty(exports2, "removeProperties", {
      enumerable: true,
      get: function() {
        return _removeProperties.default;
      }
    });
    Object.defineProperty(exports2, "removePropertiesDeep", {
      enumerable: true,
      get: function() {
        return _removePropertiesDeep.default;
      }
    });
    Object.defineProperty(exports2, "removeTypeDuplicates", {
      enumerable: true,
      get: function() {
        return _removeTypeDuplicates.default;
      }
    });
    Object.defineProperty(exports2, "shallowEqual", {
      enumerable: true,
      get: function() {
        return _shallowEqual.default;
      }
    });
    Object.defineProperty(exports2, "toBindingIdentifierName", {
      enumerable: true,
      get: function() {
        return _toBindingIdentifierName.default;
      }
    });
    Object.defineProperty(exports2, "toBlock", {
      enumerable: true,
      get: function() {
        return _toBlock.default;
      }
    });
    Object.defineProperty(exports2, "toComputedKey", {
      enumerable: true,
      get: function() {
        return _toComputedKey.default;
      }
    });
    Object.defineProperty(exports2, "toExpression", {
      enumerable: true,
      get: function() {
        return _toExpression.default;
      }
    });
    Object.defineProperty(exports2, "toIdentifier", {
      enumerable: true,
      get: function() {
        return _toIdentifier.default;
      }
    });
    Object.defineProperty(exports2, "toKeyAlias", {
      enumerable: true,
      get: function() {
        return _toKeyAlias.default;
      }
    });
    Object.defineProperty(exports2, "toSequenceExpression", {
      enumerable: true,
      get: function() {
        return _toSequenceExpression.default;
      }
    });
    Object.defineProperty(exports2, "toStatement", {
      enumerable: true,
      get: function() {
        return _toStatement.default;
      }
    });
    Object.defineProperty(exports2, "traverse", {
      enumerable: true,
      get: function() {
        return _traverse.default;
      }
    });
    Object.defineProperty(exports2, "traverseFast", {
      enumerable: true,
      get: function() {
        return _traverseFast.default;
      }
    });
    Object.defineProperty(exports2, "validate", {
      enumerable: true,
      get: function() {
        return _validate.default;
      }
    });
    Object.defineProperty(exports2, "valueToNode", {
      enumerable: true,
      get: function() {
        return _valueToNode.default;
      }
    });
    var _isReactComponent = require_isReactComponent();
    var _isCompatTag = require_isCompatTag();
    var _buildChildren = require_buildChildren();
    var _assertNode = require_assertNode();
    var _generated = require_generated3();
    Object.keys(_generated).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports2 && exports2[key] === _generated[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _generated[key];
        }
      });
    });
    var _createTypeAnnotationBasedOnTypeof = require_createTypeAnnotationBasedOnTypeof();
    var _createFlowUnionType = require_createFlowUnionType();
    var _createTSUnionType = require_createTSUnionType();
    var _generated2 = require_generated2();
    Object.keys(_generated2).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports2 && exports2[key] === _generated2[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _generated2[key];
        }
      });
    });
    var _uppercase = require_uppercase();
    Object.keys(_uppercase).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports2 && exports2[key] === _uppercase[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _uppercase[key];
        }
      });
    });
    var _cloneNode = require_cloneNode();
    var _clone = require_clone();
    var _cloneDeep = require_cloneDeep();
    var _cloneDeepWithoutLoc = require_cloneDeepWithoutLoc();
    var _cloneWithoutLoc = require_cloneWithoutLoc();
    var _addComment = require_addComment();
    var _addComments = require_addComments();
    var _inheritInnerComments = require_inheritInnerComments();
    var _inheritLeadingComments = require_inheritLeadingComments();
    var _inheritsComments = require_inheritsComments();
    var _inheritTrailingComments = require_inheritTrailingComments();
    var _removeComments = require_removeComments();
    var _generated3 = require_generated4();
    Object.keys(_generated3).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports2 && exports2[key] === _generated3[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _generated3[key];
        }
      });
    });
    var _constants = require_constants();
    Object.keys(_constants).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports2 && exports2[key] === _constants[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _constants[key];
        }
      });
    });
    var _ensureBlock = require_ensureBlock();
    var _toBindingIdentifierName = require_toBindingIdentifierName();
    var _toBlock = require_toBlock();
    var _toComputedKey = require_toComputedKey();
    var _toExpression = require_toExpression();
    var _toIdentifier = require_toIdentifier();
    var _toKeyAlias = require_toKeyAlias();
    var _toSequenceExpression = require_toSequenceExpression();
    var _toStatement = require_toStatement();
    var _valueToNode = require_valueToNode();
    var _definitions = require_definitions();
    Object.keys(_definitions).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports2 && exports2[key] === _definitions[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _definitions[key];
        }
      });
    });
    var _appendToMemberExpression = require_appendToMemberExpression();
    var _inherits = require_inherits();
    var _prependToMemberExpression = require_prependToMemberExpression();
    var _removeProperties = require_removeProperties();
    var _removePropertiesDeep = require_removePropertiesDeep();
    var _removeTypeDuplicates = require_removeTypeDuplicates();
    var _getBindingIdentifiers = require_getBindingIdentifiers();
    var _getOuterBindingIdentifiers = require_getOuterBindingIdentifiers();
    var _traverse = require_traverse();
    Object.keys(_traverse).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports2 && exports2[key] === _traverse[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _traverse[key];
        }
      });
    });
    var _traverseFast = require_traverseFast();
    var _shallowEqual = require_shallowEqual();
    var _is = require_is();
    var _isBinding = require_isBinding();
    var _isBlockScoped = require_isBlockScoped();
    var _isImmutable = require_isImmutable();
    var _isLet = require_isLet();
    var _isNode = require_isNode();
    var _isNodesEquivalent = require_isNodesEquivalent();
    var _isPlaceholderType = require_isPlaceholderType();
    var _isReferenced = require_isReferenced();
    var _isScope = require_isScope();
    var _isSpecifierDefault = require_isSpecifierDefault();
    var _isType = require_isType();
    var _isValidES3Identifier = require_isValidES3Identifier();
    var _isValidIdentifier = require_isValidIdentifier();
    var _isVar = require_isVar();
    var _matchesPattern = require_matchesPattern();
    var _validate = require_validate();
    var _buildMatchMemberExpression = require_buildMatchMemberExpression();
    var _generated4 = require_generated();
    Object.keys(_generated4).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports2 && exports2[key] === _generated4[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _generated4[key];
        }
      });
    });
    var _generated5 = require_generated5();
    Object.keys(_generated5).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports2 && exports2[key] === _generated5[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _generated5[key];
        }
      });
    });
    var react = {
      isReactComponent: _isReactComponent.default,
      isCompatTag: _isCompatTag.default,
      buildChildren: _buildChildren.default
    };
    exports2.react = react;
  }
});

// node_modules/@babel/generator/lib/node/whitespace.js
var require_whitespace = __commonJS({
  "node_modules/@babel/generator/lib/node/whitespace.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.nodes = void 0;
    var _t = require_lib3();
    var {
      FLIPPED_ALIAS_KEYS,
      isArrayExpression,
      isAssignmentExpression,
      isBinary,
      isBlockStatement,
      isCallExpression,
      isFunction,
      isIdentifier,
      isLiteral,
      isMemberExpression,
      isObjectExpression,
      isOptionalCallExpression,
      isOptionalMemberExpression,
      isStringLiteral
    } = _t;
    function crawlInternal(node, state) {
      if (!node)
        return state;
      if (isMemberExpression(node) || isOptionalMemberExpression(node)) {
        crawlInternal(node.object, state);
        if (node.computed)
          crawlInternal(node.property, state);
      } else if (isBinary(node) || isAssignmentExpression(node)) {
        crawlInternal(node.left, state);
        crawlInternal(node.right, state);
      } else if (isCallExpression(node) || isOptionalCallExpression(node)) {
        state.hasCall = true;
        crawlInternal(node.callee, state);
      } else if (isFunction(node)) {
        state.hasFunction = true;
      } else if (isIdentifier(node)) {
        state.hasHelper = state.hasHelper || node.callee && isHelper(node.callee);
      }
      return state;
    }
    function crawl(node) {
      return crawlInternal(node, {
        hasCall: false,
        hasFunction: false,
        hasHelper: false
      });
    }
    function isHelper(node) {
      if (!node)
        return false;
      if (isMemberExpression(node)) {
        return isHelper(node.object) || isHelper(node.property);
      } else if (isIdentifier(node)) {
        return node.name === "require" || node.name.charCodeAt(0) === 95;
      } else if (isCallExpression(node)) {
        return isHelper(node.callee);
      } else if (isBinary(node) || isAssignmentExpression(node)) {
        return isIdentifier(node.left) && isHelper(node.left) || isHelper(node.right);
      } else {
        return false;
      }
    }
    function isType(node) {
      return isLiteral(node) || isObjectExpression(node) || isArrayExpression(node) || isIdentifier(node) || isMemberExpression(node);
    }
    var nodes = {
      AssignmentExpression(node) {
        const state = crawl(node.right);
        if (state.hasCall && state.hasHelper || state.hasFunction) {
          return state.hasFunction ? 1 | 2 : 2;
        }
      },
      SwitchCase(node, parent) {
        return (!!node.consequent.length || parent.cases[0] === node ? 1 : 0) | (!node.consequent.length && parent.cases[parent.cases.length - 1] === node ? 2 : 0);
      },
      LogicalExpression(node) {
        if (isFunction(node.left) || isFunction(node.right)) {
          return 2;
        }
      },
      Literal(node) {
        if (isStringLiteral(node) && node.value === "use strict") {
          return 2;
        }
      },
      CallExpression(node) {
        if (isFunction(node.callee) || isHelper(node)) {
          return 1 | 2;
        }
      },
      OptionalCallExpression(node) {
        if (isFunction(node.callee)) {
          return 1 | 2;
        }
      },
      VariableDeclaration(node) {
        for (let i = 0; i < node.declarations.length; i++) {
          const declar = node.declarations[i];
          let enabled = isHelper(declar.id) && !isType(declar.init);
          if (!enabled && declar.init) {
            const state = crawl(declar.init);
            enabled = isHelper(declar.init) && state.hasCall || state.hasFunction;
          }
          if (enabled) {
            return 1 | 2;
          }
        }
      },
      IfStatement(node) {
        if (isBlockStatement(node.consequent)) {
          return 1 | 2;
        }
      }
    };
    exports2.nodes = nodes;
    nodes.ObjectProperty = nodes.ObjectTypeProperty = nodes.ObjectMethod = function(node, parent) {
      if (parent.properties[0] === node) {
        return 1;
      }
    };
    nodes.ObjectTypeCallProperty = function(node, parent) {
      var _parent$properties;
      if (parent.callProperties[0] === node && !((_parent$properties = parent.properties) != null && _parent$properties.length)) {
        return 1;
      }
    };
    nodes.ObjectTypeIndexer = function(node, parent) {
      var _parent$properties2, _parent$callPropertie;
      if (parent.indexers[0] === node && !((_parent$properties2 = parent.properties) != null && _parent$properties2.length) && !((_parent$callPropertie = parent.callProperties) != null && _parent$callPropertie.length)) {
        return 1;
      }
    };
    nodes.ObjectTypeInternalSlot = function(node, parent) {
      var _parent$properties3, _parent$callPropertie2, _parent$indexers;
      if (parent.internalSlots[0] === node && !((_parent$properties3 = parent.properties) != null && _parent$properties3.length) && !((_parent$callPropertie2 = parent.callProperties) != null && _parent$callPropertie2.length) && !((_parent$indexers = parent.indexers) != null && _parent$indexers.length)) {
        return 1;
      }
    };
    [["Function", true], ["Class", true], ["Loop", true], ["LabeledStatement", true], ["SwitchStatement", true], ["TryStatement", true]].forEach(function([type, amounts]) {
      [type].concat(FLIPPED_ALIAS_KEYS[type] || []).forEach(function(type2) {
        const ret = amounts ? 1 | 2 : 0;
        nodes[type2] = () => ret;
      });
    });
  }
});

// node_modules/@babel/generator/lib/node/parentheses.js
var require_parentheses = __commonJS({
  "node_modules/@babel/generator/lib/node/parentheses.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.ArrowFunctionExpression = ArrowFunctionExpression;
    exports2.AssignmentExpression = AssignmentExpression;
    exports2.Binary = Binary;
    exports2.BinaryExpression = BinaryExpression;
    exports2.ClassExpression = ClassExpression;
    exports2.ConditionalExpression = ConditionalExpression;
    exports2.DoExpression = DoExpression;
    exports2.FunctionExpression = FunctionExpression;
    exports2.FunctionTypeAnnotation = FunctionTypeAnnotation;
    exports2.Identifier = Identifier;
    exports2.LogicalExpression = LogicalExpression;
    exports2.NullableTypeAnnotation = NullableTypeAnnotation;
    exports2.ObjectExpression = ObjectExpression;
    exports2.OptionalIndexedAccessType = OptionalIndexedAccessType;
    exports2.OptionalCallExpression = exports2.OptionalMemberExpression = OptionalMemberExpression;
    exports2.SequenceExpression = SequenceExpression;
    exports2.TSAsExpression = TSAsExpression;
    exports2.TSInferType = TSInferType;
    exports2.TSInstantiationExpression = TSInstantiationExpression;
    exports2.TSTypeAssertion = TSTypeAssertion;
    exports2.TSIntersectionType = exports2.TSUnionType = TSUnionType;
    exports2.UnaryLike = UnaryLike;
    exports2.IntersectionTypeAnnotation = exports2.UnionTypeAnnotation = UnionTypeAnnotation;
    exports2.UpdateExpression = UpdateExpression;
    exports2.AwaitExpression = exports2.YieldExpression = YieldExpression;
    var _t = require_lib3();
    var {
      isArrayTypeAnnotation,
      isArrowFunctionExpression,
      isAssignmentExpression,
      isAwaitExpression,
      isBinary,
      isBinaryExpression,
      isUpdateExpression,
      isCallExpression,
      isClass,
      isClassExpression,
      isConditional,
      isConditionalExpression,
      isExportDeclaration,
      isExportDefaultDeclaration,
      isExpressionStatement,
      isFor,
      isForInStatement,
      isForOfStatement,
      isForStatement,
      isFunctionExpression,
      isIfStatement,
      isIndexedAccessType,
      isIntersectionTypeAnnotation,
      isLogicalExpression,
      isMemberExpression,
      isNewExpression,
      isNullableTypeAnnotation,
      isObjectPattern,
      isOptionalCallExpression,
      isOptionalMemberExpression,
      isReturnStatement,
      isSequenceExpression,
      isSwitchStatement,
      isTSArrayType,
      isTSAsExpression,
      isTSInstantiationExpression,
      isTSIntersectionType,
      isTSNonNullExpression,
      isTSOptionalType,
      isTSRestType,
      isTSTypeAssertion,
      isTSUnionType,
      isTaggedTemplateExpression,
      isThrowStatement,
      isTypeAnnotation,
      isUnaryLike,
      isUnionTypeAnnotation,
      isVariableDeclarator,
      isWhileStatement,
      isYieldExpression
    } = _t;
    var PRECEDENCE = {
      "||": 0,
      "??": 0,
      "|>": 0,
      "&&": 1,
      "|": 2,
      "^": 3,
      "&": 4,
      "==": 5,
      "===": 5,
      "!=": 5,
      "!==": 5,
      "<": 6,
      ">": 6,
      "<=": 6,
      ">=": 6,
      in: 6,
      instanceof: 6,
      ">>": 7,
      "<<": 7,
      ">>>": 7,
      "+": 8,
      "-": 8,
      "*": 9,
      "/": 9,
      "%": 9,
      "**": 10
    };
    var isClassExtendsClause = (node, parent) => isClass(parent, {
      superClass: node
    });
    var hasPostfixPart = (node, parent) => (isMemberExpression(parent) || isOptionalMemberExpression(parent)) && parent.object === node || (isCallExpression(parent) || isOptionalCallExpression(parent) || isNewExpression(parent)) && parent.callee === node || isTaggedTemplateExpression(parent) && parent.tag === node || isTSNonNullExpression(parent);
    function NullableTypeAnnotation(node, parent) {
      return isArrayTypeAnnotation(parent);
    }
    function FunctionTypeAnnotation(node, parent, printStack) {
      if (printStack.length < 3)
        return;
      return isUnionTypeAnnotation(parent) || isIntersectionTypeAnnotation(parent) || isArrayTypeAnnotation(parent) || isTypeAnnotation(parent) && isArrowFunctionExpression(printStack[printStack.length - 3]);
    }
    function UpdateExpression(node, parent) {
      return hasPostfixPart(node, parent) || isClassExtendsClause(node, parent);
    }
    function ObjectExpression(node, parent, printStack) {
      return isFirstInContext(printStack, 1 | 2);
    }
    function DoExpression(node, parent, printStack) {
      return !node.async && isFirstInContext(printStack, 1);
    }
    function Binary(node, parent) {
      if (node.operator === "**" && isBinaryExpression(parent, {
        operator: "**"
      })) {
        return parent.left === node;
      }
      if (isClassExtendsClause(node, parent)) {
        return true;
      }
      if (hasPostfixPart(node, parent) || isUnaryLike(parent) || isAwaitExpression(parent)) {
        return true;
      }
      if (isBinary(parent)) {
        const parentOp = parent.operator;
        const parentPos = PRECEDENCE[parentOp];
        const nodeOp = node.operator;
        const nodePos = PRECEDENCE[nodeOp];
        if (parentPos === nodePos && parent.right === node && !isLogicalExpression(parent) || parentPos > nodePos) {
          return true;
        }
      }
    }
    function UnionTypeAnnotation(node, parent) {
      return isArrayTypeAnnotation(parent) || isNullableTypeAnnotation(parent) || isIntersectionTypeAnnotation(parent) || isUnionTypeAnnotation(parent);
    }
    function OptionalIndexedAccessType(node, parent) {
      return isIndexedAccessType(parent, {
        objectType: node
      });
    }
    function TSAsExpression() {
      return true;
    }
    function TSTypeAssertion() {
      return true;
    }
    function TSUnionType(node, parent) {
      return isTSArrayType(parent) || isTSOptionalType(parent) || isTSIntersectionType(parent) || isTSUnionType(parent) || isTSRestType(parent);
    }
    function TSInferType(node, parent) {
      return isTSArrayType(parent) || isTSOptionalType(parent);
    }
    function TSInstantiationExpression(node, parent) {
      return (isCallExpression(parent) || isOptionalCallExpression(parent) || isNewExpression(parent) || isTSInstantiationExpression(parent)) && !!parent.typeParameters;
    }
    function BinaryExpression(node, parent) {
      return node.operator === "in" && (isVariableDeclarator(parent) || isFor(parent));
    }
    function SequenceExpression(node, parent) {
      if (isForStatement(parent) || isThrowStatement(parent) || isReturnStatement(parent) || isIfStatement(parent) && parent.test === node || isWhileStatement(parent) && parent.test === node || isForInStatement(parent) && parent.right === node || isSwitchStatement(parent) && parent.discriminant === node || isExpressionStatement(parent) && parent.expression === node) {
        return false;
      }
      return true;
    }
    function YieldExpression(node, parent) {
      return isBinary(parent) || isUnaryLike(parent) || hasPostfixPart(node, parent) || isAwaitExpression(parent) && isYieldExpression(node) || isConditionalExpression(parent) && node === parent.test || isClassExtendsClause(node, parent);
    }
    function ClassExpression(node, parent, printStack) {
      return isFirstInContext(printStack, 1 | 4);
    }
    function UnaryLike(node, parent) {
      return hasPostfixPart(node, parent) || isBinaryExpression(parent, {
        operator: "**",
        left: node
      }) || isClassExtendsClause(node, parent);
    }
    function FunctionExpression(node, parent, printStack) {
      return isFirstInContext(printStack, 1 | 4);
    }
    function ArrowFunctionExpression(node, parent) {
      return isExportDeclaration(parent) || ConditionalExpression(node, parent);
    }
    function ConditionalExpression(node, parent) {
      if (isUnaryLike(parent) || isBinary(parent) || isConditionalExpression(parent, {
        test: node
      }) || isAwaitExpression(parent) || isTSTypeAssertion(parent) || isTSAsExpression(parent)) {
        return true;
      }
      return UnaryLike(node, parent);
    }
    function OptionalMemberExpression(node, parent) {
      return isCallExpression(parent, {
        callee: node
      }) || isMemberExpression(parent, {
        object: node
      });
    }
    function AssignmentExpression(node, parent) {
      if (isObjectPattern(node.left)) {
        return true;
      } else {
        return ConditionalExpression(node, parent);
      }
    }
    function LogicalExpression(node, parent) {
      switch (node.operator) {
        case "||":
          if (!isLogicalExpression(parent))
            return false;
          return parent.operator === "??" || parent.operator === "&&";
        case "&&":
          return isLogicalExpression(parent, {
            operator: "??"
          });
        case "??":
          return isLogicalExpression(parent) && parent.operator !== "??";
      }
    }
    function Identifier(node, parent, printStack) {
      var _node$extra;
      if ((_node$extra = node.extra) != null && _node$extra.parenthesized && isAssignmentExpression(parent, {
        left: node
      }) && (isFunctionExpression(parent.right) || isClassExpression(parent.right)) && parent.right.id == null) {
        return true;
      }
      if (node.name === "let") {
        const isFollowedByBracket = isMemberExpression(parent, {
          object: node,
          computed: true
        }) || isOptionalMemberExpression(parent, {
          object: node,
          computed: true,
          optional: false
        });
        return isFirstInContext(printStack, isFollowedByBracket ? 1 | 8 | 16 | 32 : 32);
      }
      return node.name === "async" && isForOfStatement(parent) && node === parent.left;
    }
    function isFirstInContext(printStack, checkParam) {
      const expressionStatement = checkParam & 1;
      const arrowBody = checkParam & 2;
      const exportDefault = checkParam & 4;
      const forHead = checkParam & 8;
      const forInHead = checkParam & 16;
      const forOfHead = checkParam & 32;
      let i = printStack.length - 1;
      if (i <= 0)
        return;
      let node = printStack[i];
      i--;
      let parent = printStack[i];
      while (i >= 0) {
        if (expressionStatement && isExpressionStatement(parent, {
          expression: node
        }) || exportDefault && isExportDefaultDeclaration(parent, {
          declaration: node
        }) || arrowBody && isArrowFunctionExpression(parent, {
          body: node
        }) || forHead && isForStatement(parent, {
          init: node
        }) || forInHead && isForInStatement(parent, {
          left: node
        }) || forOfHead && isForOfStatement(parent, {
          left: node
        })) {
          return true;
        }
        if (i > 0 && (hasPostfixPart(node, parent) && !isNewExpression(parent) || isSequenceExpression(parent) && parent.expressions[0] === node || isUpdateExpression(parent) && !parent.prefix || isConditional(parent, {
          test: node
        }) || isBinary(parent, {
          left: node
        }) || isAssignmentExpression(parent, {
          left: node
        }))) {
          node = parent;
          i--;
          parent = printStack[i];
        } else {
          return false;
        }
      }
      return false;
    }
  }
});

// node_modules/@babel/generator/lib/node/index.js
var require_node = __commonJS({
  "node_modules/@babel/generator/lib/node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.needsParens = needsParens;
    exports2.needsWhitespace = needsWhitespace;
    exports2.needsWhitespaceAfter = needsWhitespaceAfter;
    exports2.needsWhitespaceBefore = needsWhitespaceBefore;
    var whitespace = require_whitespace();
    var parens = require_parentheses();
    var _t = require_lib3();
    var {
      FLIPPED_ALIAS_KEYS,
      isCallExpression,
      isExpressionStatement,
      isMemberExpression,
      isNewExpression
    } = _t;
    function expandAliases(obj) {
      const newObj = {};
      function add(type, func) {
        const fn = newObj[type];
        newObj[type] = fn ? function(node, parent, stack) {
          const result = fn(node, parent, stack);
          return result == null ? func(node, parent, stack) : result;
        } : func;
      }
      for (const type of Object.keys(obj)) {
        const aliases = FLIPPED_ALIAS_KEYS[type];
        if (aliases) {
          for (const alias of aliases) {
            add(alias, obj[type]);
          }
        } else {
          add(type, obj[type]);
        }
      }
      return newObj;
    }
    var expandedParens = expandAliases(parens);
    var expandedWhitespaceNodes = expandAliases(whitespace.nodes);
    function find(obj, node, parent, printStack) {
      const fn = obj[node.type];
      return fn ? fn(node, parent, printStack) : null;
    }
    function isOrHasCallExpression(node) {
      if (isCallExpression(node)) {
        return true;
      }
      return isMemberExpression(node) && isOrHasCallExpression(node.object);
    }
    function needsWhitespace(node, parent, type) {
      if (!node)
        return false;
      if (isExpressionStatement(node)) {
        node = node.expression;
      }
      const flag = find(expandedWhitespaceNodes, node, parent);
      if (typeof flag === "number") {
        return (flag & type) !== 0;
      }
      return false;
    }
    function needsWhitespaceBefore(node, parent) {
      return needsWhitespace(node, parent, 1);
    }
    function needsWhitespaceAfter(node, parent) {
      return needsWhitespace(node, parent, 2);
    }
    function needsParens(node, parent, printStack) {
      if (!parent)
        return false;
      if (isNewExpression(parent) && parent.callee === node) {
        if (isOrHasCallExpression(node))
          return true;
      }
      return find(expandedParens, node, parent, printStack);
    }
  }
});

// node_modules/@babel/generator/lib/generators/template-literals.js
var require_template_literals = __commonJS({
  "node_modules/@babel/generator/lib/generators/template-literals.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.TaggedTemplateExpression = TaggedTemplateExpression;
    exports2.TemplateElement = TemplateElement;
    exports2.TemplateLiteral = TemplateLiteral;
    function TaggedTemplateExpression(node) {
      this.print(node.tag, node);
      this.print(node.typeParameters, node);
      this.print(node.quasi, node);
    }
    function TemplateElement(node, parent) {
      const isFirst = parent.quasis[0] === node;
      const isLast = parent.quasis[parent.quasis.length - 1] === node;
      const value = (isFirst ? "`" : "}") + node.value.raw + (isLast ? "`" : "${");
      this.token(value, true);
    }
    function TemplateLiteral(node) {
      const quasis = node.quasis;
      for (let i = 0; i < quasis.length; i++) {
        this.print(quasis[i], node);
        if (i + 1 < quasis.length) {
          this.print(node.expressions[i], node);
        }
      }
    }
  }
});

// node_modules/@babel/generator/lib/generators/expressions.js
var require_expressions = __commonJS({
  "node_modules/@babel/generator/lib/generators/expressions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.LogicalExpression = exports2.BinaryExpression = exports2.AssignmentExpression = AssignmentExpression;
    exports2.AssignmentPattern = AssignmentPattern;
    exports2.AwaitExpression = AwaitExpression;
    exports2.BindExpression = BindExpression;
    exports2.CallExpression = CallExpression;
    exports2.ConditionalExpression = ConditionalExpression;
    exports2.Decorator = Decorator;
    exports2.DoExpression = DoExpression;
    exports2.EmptyStatement = EmptyStatement;
    exports2.ExpressionStatement = ExpressionStatement;
    exports2.Import = Import;
    exports2.MemberExpression = MemberExpression;
    exports2.MetaProperty = MetaProperty;
    exports2.ModuleExpression = ModuleExpression;
    exports2.NewExpression = NewExpression;
    exports2.OptionalCallExpression = OptionalCallExpression;
    exports2.OptionalMemberExpression = OptionalMemberExpression;
    exports2.ParenthesizedExpression = ParenthesizedExpression;
    exports2.PrivateName = PrivateName;
    exports2.SequenceExpression = SequenceExpression;
    exports2.Super = Super;
    exports2.ThisExpression = ThisExpression;
    exports2.UnaryExpression = UnaryExpression;
    exports2.UpdateExpression = UpdateExpression;
    exports2.V8IntrinsicIdentifier = V8IntrinsicIdentifier;
    exports2.YieldExpression = YieldExpression;
    var _t = require_lib3();
    var n = require_node();
    var {
      isCallExpression,
      isLiteral,
      isMemberExpression,
      isNewExpression
    } = _t;
    function UnaryExpression(node) {
      if (node.operator === "void" || node.operator === "delete" || node.operator === "typeof" || node.operator === "throw") {
        this.word(node.operator);
        this.space();
      } else {
        this.token(node.operator);
      }
      this.print(node.argument, node);
    }
    function DoExpression(node) {
      if (node.async) {
        this.word("async");
        this.space();
      }
      this.word("do");
      this.space();
      this.print(node.body, node);
    }
    function ParenthesizedExpression(node) {
      this.tokenChar(40);
      this.print(node.expression, node);
      this.tokenChar(41);
    }
    function UpdateExpression(node) {
      if (node.prefix) {
        this.token(node.operator);
        this.print(node.argument, node);
      } else {
        this.printTerminatorless(node.argument, node, true);
        this.token(node.operator);
      }
    }
    function ConditionalExpression(node) {
      this.print(node.test, node);
      this.space();
      this.tokenChar(63);
      this.space();
      this.print(node.consequent, node);
      this.space();
      this.tokenChar(58);
      this.space();
      this.print(node.alternate, node);
    }
    function NewExpression(node, parent) {
      this.word("new");
      this.space();
      this.print(node.callee, node);
      if (this.format.minified && node.arguments.length === 0 && !node.optional && !isCallExpression(parent, {
        callee: node
      }) && !isMemberExpression(parent) && !isNewExpression(parent)) {
        return;
      }
      this.print(node.typeArguments, node);
      this.print(node.typeParameters, node);
      if (node.optional) {
        this.token("?.");
      }
      this.tokenChar(40);
      this.printList(node.arguments, node);
      this.tokenChar(41);
    }
    function SequenceExpression(node) {
      this.printList(node.expressions, node);
    }
    function ThisExpression() {
      this.word("this");
    }
    function Super() {
      this.word("super");
    }
    function isDecoratorMemberExpression(node) {
      switch (node.type) {
        case "Identifier":
          return true;
        case "MemberExpression":
          return !node.computed && node.property.type === "Identifier" && isDecoratorMemberExpression(node.object);
        default:
          return false;
      }
    }
    function shouldParenthesizeDecoratorExpression(node) {
      if (node.type === "ParenthesizedExpression") {
        return false;
      }
      return !isDecoratorMemberExpression(node.type === "CallExpression" ? node.callee : node);
    }
    function Decorator(node) {
      this.tokenChar(64);
      const {
        expression
      } = node;
      if (shouldParenthesizeDecoratorExpression(expression)) {
        this.tokenChar(40);
        this.print(expression, node);
        this.tokenChar(41);
      } else {
        this.print(expression, node);
      }
      this.newline();
    }
    function OptionalMemberExpression(node) {
      this.print(node.object, node);
      if (!node.computed && isMemberExpression(node.property)) {
        throw new TypeError("Got a MemberExpression for MemberExpression property");
      }
      let computed = node.computed;
      if (isLiteral(node.property) && typeof node.property.value === "number") {
        computed = true;
      }
      if (node.optional) {
        this.token("?.");
      }
      if (computed) {
        this.tokenChar(91);
        this.print(node.property, node);
        this.tokenChar(93);
      } else {
        if (!node.optional) {
          this.tokenChar(46);
        }
        this.print(node.property, node);
      }
    }
    function OptionalCallExpression(node) {
      this.print(node.callee, node);
      this.print(node.typeArguments, node);
      this.print(node.typeParameters, node);
      if (node.optional) {
        this.token("?.");
      }
      this.tokenChar(40);
      this.printList(node.arguments, node);
      this.tokenChar(41);
    }
    function CallExpression(node) {
      this.print(node.callee, node);
      this.print(node.typeArguments, node);
      this.print(node.typeParameters, node);
      this.tokenChar(40);
      this.printList(node.arguments, node);
      this.tokenChar(41);
    }
    function Import() {
      this.word("import");
    }
    function AwaitExpression(node) {
      this.word("await");
      if (node.argument) {
        this.space();
        this.printTerminatorless(node.argument, node, false);
      }
    }
    function YieldExpression(node) {
      this.word("yield");
      if (node.delegate) {
        this.tokenChar(42);
      }
      if (node.argument) {
        this.space();
        this.printTerminatorless(node.argument, node, false);
      }
    }
    function EmptyStatement() {
      this.semicolon(true);
    }
    function ExpressionStatement(node) {
      this.print(node.expression, node);
      this.semicolon();
    }
    function AssignmentPattern(node) {
      this.print(node.left, node);
      if (node.left.optional)
        this.tokenChar(63);
      this.print(node.left.typeAnnotation, node);
      this.space();
      this.tokenChar(61);
      this.space();
      this.print(node.right, node);
    }
    function AssignmentExpression(node, parent) {
      const parens = this.inForStatementInitCounter && node.operator === "in" && !n.needsParens(node, parent);
      if (parens) {
        this.tokenChar(40);
      }
      this.print(node.left, node);
      this.space();
      if (node.operator === "in" || node.operator === "instanceof") {
        this.word(node.operator);
      } else {
        this.token(node.operator);
      }
      this.space();
      this.print(node.right, node);
      if (parens) {
        this.tokenChar(41);
      }
    }
    function BindExpression(node) {
      this.print(node.object, node);
      this.token("::");
      this.print(node.callee, node);
    }
    function MemberExpression(node) {
      this.print(node.object, node);
      if (!node.computed && isMemberExpression(node.property)) {
        throw new TypeError("Got a MemberExpression for MemberExpression property");
      }
      let computed = node.computed;
      if (isLiteral(node.property) && typeof node.property.value === "number") {
        computed = true;
      }
      if (computed) {
        this.tokenChar(91);
        this.print(node.property, node);
        this.tokenChar(93);
      } else {
        this.tokenChar(46);
        this.print(node.property, node);
      }
    }
    function MetaProperty(node) {
      this.print(node.meta, node);
      this.tokenChar(46);
      this.print(node.property, node);
    }
    function PrivateName(node) {
      this.tokenChar(35);
      this.print(node.id, node);
    }
    function V8IntrinsicIdentifier(node) {
      this.tokenChar(37);
      this.word(node.name);
    }
    function ModuleExpression(node) {
      this.word("module");
      this.space();
      this.tokenChar(123);
      if (node.body.body.length === 0) {
        this.tokenChar(125);
      } else {
        this.newline();
        this.printSequence(node.body.body, node, {
          indent: true
        });
        this.rightBrace();
      }
    }
  }
});

// node_modules/@babel/generator/lib/generators/statements.js
var require_statements = __commonJS({
  "node_modules/@babel/generator/lib/generators/statements.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.BreakStatement = BreakStatement;
    exports2.CatchClause = CatchClause;
    exports2.ContinueStatement = ContinueStatement;
    exports2.DebuggerStatement = DebuggerStatement;
    exports2.DoWhileStatement = DoWhileStatement;
    exports2.ForOfStatement = exports2.ForInStatement = void 0;
    exports2.ForStatement = ForStatement;
    exports2.IfStatement = IfStatement;
    exports2.LabeledStatement = LabeledStatement;
    exports2.ReturnStatement = ReturnStatement;
    exports2.SwitchCase = SwitchCase;
    exports2.SwitchStatement = SwitchStatement;
    exports2.ThrowStatement = ThrowStatement;
    exports2.TryStatement = TryStatement;
    exports2.VariableDeclaration = VariableDeclaration;
    exports2.VariableDeclarator = VariableDeclarator;
    exports2.WhileStatement = WhileStatement;
    exports2.WithStatement = WithStatement;
    var _t = require_lib3();
    var {
      isFor,
      isForStatement,
      isIfStatement,
      isStatement
    } = _t;
    function WithStatement(node) {
      this.word("with");
      this.space();
      this.tokenChar(40);
      this.print(node.object, node);
      this.tokenChar(41);
      this.printBlock(node);
    }
    function IfStatement(node) {
      this.word("if");
      this.space();
      this.tokenChar(40);
      this.print(node.test, node);
      this.tokenChar(41);
      this.space();
      const needsBlock = node.alternate && isIfStatement(getLastStatement(node.consequent));
      if (needsBlock) {
        this.tokenChar(123);
        this.newline();
        this.indent();
      }
      this.printAndIndentOnComments(node.consequent, node);
      if (needsBlock) {
        this.dedent();
        this.newline();
        this.tokenChar(125);
      }
      if (node.alternate) {
        if (this.endsWith(125))
          this.space();
        this.word("else");
        this.space();
        this.printAndIndentOnComments(node.alternate, node);
      }
    }
    function getLastStatement(statement) {
      const {
        body
      } = statement;
      if (isStatement(body) === false) {
        return statement;
      }
      return getLastStatement(body);
    }
    function ForStatement(node) {
      this.word("for");
      this.space();
      this.tokenChar(40);
      this.inForStatementInitCounter++;
      this.print(node.init, node);
      this.inForStatementInitCounter--;
      this.tokenChar(59);
      if (node.test) {
        this.space();
        this.print(node.test, node);
      }
      this.tokenChar(59);
      if (node.update) {
        this.space();
        this.print(node.update, node);
      }
      this.tokenChar(41);
      this.printBlock(node);
    }
    function WhileStatement(node) {
      this.word("while");
      this.space();
      this.tokenChar(40);
      this.print(node.test, node);
      this.tokenChar(41);
      this.printBlock(node);
    }
    function ForXStatement(node) {
      this.word("for");
      this.space();
      const isForOf = node.type === "ForOfStatement";
      if (isForOf && node.await) {
        this.word("await");
        this.space();
      }
      this.tokenChar(40);
      this.print(node.left, node);
      this.space();
      this.word(isForOf ? "of" : "in");
      this.space();
      this.print(node.right, node);
      this.tokenChar(41);
      this.printBlock(node);
    }
    var ForInStatement = ForXStatement;
    exports2.ForInStatement = ForInStatement;
    var ForOfStatement = ForXStatement;
    exports2.ForOfStatement = ForOfStatement;
    function DoWhileStatement(node) {
      this.word("do");
      this.space();
      this.print(node.body, node);
      this.space();
      this.word("while");
      this.space();
      this.tokenChar(40);
      this.print(node.test, node);
      this.tokenChar(41);
      this.semicolon();
    }
    function printStatementAfterKeyword(printer, node, parent, isLabel) {
      if (node) {
        printer.space();
        printer.printTerminatorless(node, parent, isLabel);
      }
      printer.semicolon();
    }
    function BreakStatement(node) {
      this.word("break");
      printStatementAfterKeyword(this, node.label, node, true);
    }
    function ContinueStatement(node) {
      this.word("continue");
      printStatementAfterKeyword(this, node.label, node, true);
    }
    function ReturnStatement(node) {
      this.word("return");
      printStatementAfterKeyword(this, node.argument, node, false);
    }
    function ThrowStatement(node) {
      this.word("throw");
      printStatementAfterKeyword(this, node.argument, node, false);
    }
    function LabeledStatement(node) {
      this.print(node.label, node);
      this.tokenChar(58);
      this.space();
      this.print(node.body, node);
    }
    function TryStatement(node) {
      this.word("try");
      this.space();
      this.print(node.block, node);
      this.space();
      if (node.handlers) {
        this.print(node.handlers[0], node);
      } else {
        this.print(node.handler, node);
      }
      if (node.finalizer) {
        this.space();
        this.word("finally");
        this.space();
        this.print(node.finalizer, node);
      }
    }
    function CatchClause(node) {
      this.word("catch");
      this.space();
      if (node.param) {
        this.tokenChar(40);
        this.print(node.param, node);
        this.print(node.param.typeAnnotation, node);
        this.tokenChar(41);
        this.space();
      }
      this.print(node.body, node);
    }
    function SwitchStatement(node) {
      this.word("switch");
      this.space();
      this.tokenChar(40);
      this.print(node.discriminant, node);
      this.tokenChar(41);
      this.space();
      this.tokenChar(123);
      this.printSequence(node.cases, node, {
        indent: true,
        addNewlines(leading, cas) {
          if (!leading && node.cases[node.cases.length - 1] === cas)
            return -1;
        }
      });
      this.tokenChar(125);
    }
    function SwitchCase(node) {
      if (node.test) {
        this.word("case");
        this.space();
        this.print(node.test, node);
        this.tokenChar(58);
      } else {
        this.word("default");
        this.tokenChar(58);
      }
      if (node.consequent.length) {
        this.newline();
        this.printSequence(node.consequent, node, {
          indent: true
        });
      }
    }
    function DebuggerStatement() {
      this.word("debugger");
      this.semicolon();
    }
    function variableDeclarationIndent() {
      this.tokenChar(44);
      this.newline();
      if (this.endsWith(10)) {
        for (let i = 0; i < 4; i++)
          this.space(true);
      }
    }
    function constDeclarationIndent() {
      this.tokenChar(44);
      this.newline();
      if (this.endsWith(10)) {
        for (let i = 0; i < 6; i++)
          this.space(true);
      }
    }
    function VariableDeclaration(node, parent) {
      if (node.declare) {
        this.word("declare");
        this.space();
      }
      this.word(node.kind);
      this.space();
      let hasInits = false;
      if (!isFor(parent)) {
        for (const declar of node.declarations) {
          if (declar.init) {
            hasInits = true;
          }
        }
      }
      let separator;
      if (hasInits) {
        separator = node.kind === "const" ? constDeclarationIndent : variableDeclarationIndent;
      }
      this.printList(node.declarations, node, {
        separator
      });
      if (isFor(parent)) {
        if (isForStatement(parent)) {
          if (parent.init === node)
            return;
        } else {
          if (parent.left === node)
            return;
        }
      }
      this.semicolon();
    }
    function VariableDeclarator(node) {
      this.print(node.id, node);
      if (node.definite)
        this.tokenChar(33);
      this.print(node.id.typeAnnotation, node);
      if (node.init) {
        this.space();
        this.tokenChar(61);
        this.space();
        this.print(node.init, node);
      }
    }
  }
});

// node_modules/@babel/generator/lib/generators/classes.js
var require_classes = __commonJS({
  "node_modules/@babel/generator/lib/generators/classes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.ClassAccessorProperty = ClassAccessorProperty;
    exports2.ClassBody = ClassBody;
    exports2.ClassExpression = exports2.ClassDeclaration = ClassDeclaration;
    exports2.ClassMethod = ClassMethod;
    exports2.ClassPrivateMethod = ClassPrivateMethod;
    exports2.ClassPrivateProperty = ClassPrivateProperty;
    exports2.ClassProperty = ClassProperty;
    exports2.StaticBlock = StaticBlock;
    exports2._classMethodHead = _classMethodHead;
    var _t = require_lib3();
    var {
      isExportDefaultDeclaration,
      isExportNamedDeclaration
    } = _t;
    function ClassDeclaration(node, parent) {
      {
        if (!this.format.decoratorsBeforeExport || !isExportDefaultDeclaration(parent) && !isExportNamedDeclaration(parent)) {
          this.printJoin(node.decorators, node);
        }
      }
      if (node.declare) {
        this.word("declare");
        this.space();
      }
      if (node.abstract) {
        this.word("abstract");
        this.space();
      }
      this.word("class");
      this.printInnerComments(node);
      if (node.id) {
        this.space();
        this.print(node.id, node);
      }
      this.print(node.typeParameters, node);
      if (node.superClass) {
        this.space();
        this.word("extends");
        this.space();
        this.print(node.superClass, node);
        this.print(node.superTypeParameters, node);
      }
      if (node.implements) {
        this.space();
        this.word("implements");
        this.space();
        this.printList(node.implements, node);
      }
      this.space();
      this.print(node.body, node);
    }
    function ClassBody(node) {
      this.tokenChar(123);
      this.printInnerComments(node);
      if (node.body.length === 0) {
        this.tokenChar(125);
      } else {
        this.newline();
        this.indent();
        this.printSequence(node.body, node);
        this.dedent();
        if (!this.endsWith(10))
          this.newline();
        this.rightBrace();
      }
    }
    function ClassProperty(node) {
      this.printJoin(node.decorators, node);
      this.source("end", node.key.loc);
      this.tsPrintClassMemberModifiers(node);
      if (node.computed) {
        this.tokenChar(91);
        this.print(node.key, node);
        this.tokenChar(93);
      } else {
        this._variance(node);
        this.print(node.key, node);
      }
      if (node.optional) {
        this.tokenChar(63);
      }
      if (node.definite) {
        this.tokenChar(33);
      }
      this.print(node.typeAnnotation, node);
      if (node.value) {
        this.space();
        this.tokenChar(61);
        this.space();
        this.print(node.value, node);
      }
      this.semicolon();
    }
    function ClassAccessorProperty(node) {
      this.printJoin(node.decorators, node);
      this.source("end", node.key.loc);
      this.tsPrintClassMemberModifiers(node);
      this.word("accessor");
      this.printInnerComments(node);
      this.space();
      if (node.computed) {
        this.tokenChar(91);
        this.print(node.key, node);
        this.tokenChar(93);
      } else {
        this._variance(node);
        this.print(node.key, node);
      }
      if (node.optional) {
        this.tokenChar(63);
      }
      if (node.definite) {
        this.tokenChar(33);
      }
      this.print(node.typeAnnotation, node);
      if (node.value) {
        this.space();
        this.tokenChar(61);
        this.space();
        this.print(node.value, node);
      }
      this.semicolon();
    }
    function ClassPrivateProperty(node) {
      this.printJoin(node.decorators, node);
      if (node.static) {
        this.word("static");
        this.space();
      }
      this.print(node.key, node);
      this.print(node.typeAnnotation, node);
      if (node.value) {
        this.space();
        this.tokenChar(61);
        this.space();
        this.print(node.value, node);
      }
      this.semicolon();
    }
    function ClassMethod(node) {
      this._classMethodHead(node);
      this.space();
      this.print(node.body, node);
    }
    function ClassPrivateMethod(node) {
      this._classMethodHead(node);
      this.space();
      this.print(node.body, node);
    }
    function _classMethodHead(node) {
      this.printJoin(node.decorators, node);
      this.source("end", node.key.loc);
      this.tsPrintClassMemberModifiers(node);
      this._methodHead(node);
    }
    function StaticBlock(node) {
      this.word("static");
      this.space();
      this.tokenChar(123);
      if (node.body.length === 0) {
        this.tokenChar(125);
      } else {
        this.newline();
        this.printSequence(node.body, node, {
          indent: true
        });
        this.rightBrace();
      }
    }
  }
});

// node_modules/@babel/generator/lib/generators/methods.js
var require_methods = __commonJS({
  "node_modules/@babel/generator/lib/generators/methods.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.ArrowFunctionExpression = ArrowFunctionExpression;
    exports2.FunctionDeclaration = exports2.FunctionExpression = FunctionExpression;
    exports2._functionHead = _functionHead;
    exports2._methodHead = _methodHead;
    exports2._param = _param;
    exports2._parameters = _parameters;
    exports2._params = _params;
    exports2._predicate = _predicate;
    var _t = require_lib3();
    var {
      isIdentifier
    } = _t;
    function _params(node) {
      this.print(node.typeParameters, node);
      this.tokenChar(40);
      this._parameters(node.params, node);
      this.tokenChar(41);
      this.print(node.returnType, node, node.type === "ArrowFunctionExpression");
    }
    function _parameters(parameters, parent) {
      for (let i = 0; i < parameters.length; i++) {
        this._param(parameters[i], parent);
        if (i < parameters.length - 1) {
          this.tokenChar(44);
          this.space();
        }
      }
    }
    function _param(parameter, parent) {
      this.printJoin(parameter.decorators, parameter);
      this.print(parameter, parent);
      if (parameter.optional) {
        this.tokenChar(63);
      }
      this.print(parameter.typeAnnotation, parameter);
    }
    function _methodHead(node) {
      const kind = node.kind;
      const key = node.key;
      if (kind === "get" || kind === "set") {
        this.word(kind);
        this.space();
      }
      if (node.async) {
        this._catchUp("start", key.loc);
        this.word("async");
        this.space();
      }
      if (kind === "method" || kind === "init") {
        if (node.generator) {
          this.tokenChar(42);
        }
      }
      if (node.computed) {
        this.tokenChar(91);
        this.print(key, node);
        this.tokenChar(93);
      } else {
        this.print(key, node);
      }
      if (node.optional) {
        this.tokenChar(63);
      }
      this._params(node);
    }
    function _predicate(node) {
      if (node.predicate) {
        if (!node.returnType) {
          this.tokenChar(58);
        }
        this.space();
        this.print(node.predicate, node);
      }
    }
    function _functionHead(node) {
      if (node.async) {
        this.word("async");
        this.space();
      }
      this.word("function");
      if (node.generator)
        this.tokenChar(42);
      this.printInnerComments(node);
      this.space();
      if (node.id) {
        this.print(node.id, node);
      }
      this._params(node);
      if (node.type !== "TSDeclareFunction") {
        this._predicate(node);
      }
    }
    function FunctionExpression(node) {
      this._functionHead(node);
      this.space();
      this.print(node.body, node);
    }
    function ArrowFunctionExpression(node) {
      if (node.async) {
        this.word("async");
        this.space();
      }
      const firstParam = node.params[0];
      if (!this.format.retainLines && !this.format.auxiliaryCommentBefore && !this.format.auxiliaryCommentAfter && node.params.length === 1 && isIdentifier(firstParam) && !hasTypesOrComments(node, firstParam)) {
        this.print(firstParam, node);
      } else {
        this._params(node);
      }
      this._predicate(node);
      this.space();
      this.token("=>");
      this.space();
      this.print(node.body, node);
    }
    function hasTypesOrComments(node, param) {
      var _param$leadingComment, _param$trailingCommen;
      return !!(node.typeParameters || node.returnType || node.predicate || param.typeAnnotation || param.optional || (_param$leadingComment = param.leadingComments) != null && _param$leadingComment.length || (_param$trailingCommen = param.trailingComments) != null && _param$trailingCommen.length);
    }
  }
});

// node_modules/@babel/generator/lib/generators/modules.js
var require_modules = __commonJS({
  "node_modules/@babel/generator/lib/generators/modules.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.ExportAllDeclaration = ExportAllDeclaration;
    exports2.ExportDefaultDeclaration = ExportDefaultDeclaration;
    exports2.ExportDefaultSpecifier = ExportDefaultSpecifier;
    exports2.ExportNamedDeclaration = ExportNamedDeclaration;
    exports2.ExportNamespaceSpecifier = ExportNamespaceSpecifier;
    exports2.ExportSpecifier = ExportSpecifier;
    exports2.ImportAttribute = ImportAttribute;
    exports2.ImportDeclaration = ImportDeclaration;
    exports2.ImportDefaultSpecifier = ImportDefaultSpecifier;
    exports2.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
    exports2.ImportSpecifier = ImportSpecifier;
    var _t = require_lib3();
    var {
      isClassDeclaration,
      isExportDefaultSpecifier,
      isExportNamespaceSpecifier,
      isImportDefaultSpecifier,
      isImportNamespaceSpecifier,
      isStatement
    } = _t;
    function ImportSpecifier(node) {
      if (node.importKind === "type" || node.importKind === "typeof") {
        this.word(node.importKind);
        this.space();
      }
      this.print(node.imported, node);
      if (node.local && node.local.name !== node.imported.name) {
        this.space();
        this.word("as");
        this.space();
        this.print(node.local, node);
      }
    }
    function ImportDefaultSpecifier(node) {
      this.print(node.local, node);
    }
    function ExportDefaultSpecifier(node) {
      this.print(node.exported, node);
    }
    function ExportSpecifier(node) {
      if (node.exportKind === "type") {
        this.word("type");
        this.space();
      }
      this.print(node.local, node);
      if (node.exported && node.local.name !== node.exported.name) {
        this.space();
        this.word("as");
        this.space();
        this.print(node.exported, node);
      }
    }
    function ExportNamespaceSpecifier(node) {
      this.tokenChar(42);
      this.space();
      this.word("as");
      this.space();
      this.print(node.exported, node);
    }
    function ExportAllDeclaration(node) {
      this.word("export");
      this.space();
      if (node.exportKind === "type") {
        this.word("type");
        this.space();
      }
      this.tokenChar(42);
      this.space();
      this.word("from");
      this.space();
      this.print(node.source, node);
      this.printAssertions(node);
      this.semicolon();
    }
    function ExportNamedDeclaration(node) {
      {
        if (this.format.decoratorsBeforeExport && isClassDeclaration(node.declaration)) {
          this.printJoin(node.declaration.decorators, node);
        }
      }
      this.word("export");
      this.space();
      if (node.declaration) {
        const declar = node.declaration;
        this.print(declar, node);
        if (!isStatement(declar))
          this.semicolon();
      } else {
        if (node.exportKind === "type") {
          this.word("type");
          this.space();
        }
        const specifiers = node.specifiers.slice(0);
        let hasSpecial = false;
        for (; ; ) {
          const first = specifiers[0];
          if (isExportDefaultSpecifier(first) || isExportNamespaceSpecifier(first)) {
            hasSpecial = true;
            this.print(specifiers.shift(), node);
            if (specifiers.length) {
              this.tokenChar(44);
              this.space();
            }
          } else {
            break;
          }
        }
        if (specifiers.length || !specifiers.length && !hasSpecial) {
          this.tokenChar(123);
          if (specifiers.length) {
            this.space();
            this.printList(specifiers, node);
            this.space();
          }
          this.tokenChar(125);
        }
        if (node.source) {
          this.space();
          this.word("from");
          this.space();
          this.print(node.source, node);
          this.printAssertions(node);
        }
        this.semicolon();
      }
    }
    function ExportDefaultDeclaration(node) {
      {
        if (this.format.decoratorsBeforeExport && isClassDeclaration(node.declaration)) {
          this.printJoin(node.declaration.decorators, node);
        }
      }
      this.word("export");
      this.space();
      this.word("default");
      this.space();
      const declar = node.declaration;
      this.print(declar, node);
      if (!isStatement(declar))
        this.semicolon();
    }
    function ImportDeclaration(node) {
      this.word("import");
      this.space();
      const isTypeKind = node.importKind === "type" || node.importKind === "typeof";
      if (isTypeKind) {
        this.word(node.importKind);
        this.space();
      }
      const specifiers = node.specifiers.slice(0);
      const hasSpecifiers = !!specifiers.length;
      while (hasSpecifiers) {
        const first = specifiers[0];
        if (isImportDefaultSpecifier(first) || isImportNamespaceSpecifier(first)) {
          this.print(specifiers.shift(), node);
          if (specifiers.length) {
            this.tokenChar(44);
            this.space();
          }
        } else {
          break;
        }
      }
      if (specifiers.length) {
        this.tokenChar(123);
        this.space();
        this.printList(specifiers, node);
        this.space();
        this.tokenChar(125);
      } else if (isTypeKind && !hasSpecifiers) {
        this.tokenChar(123);
        this.tokenChar(125);
      }
      if (hasSpecifiers || isTypeKind) {
        this.space();
        this.word("from");
        this.space();
      }
      this.print(node.source, node);
      this.printAssertions(node);
      {
        var _node$attributes;
        if ((_node$attributes = node.attributes) != null && _node$attributes.length) {
          this.space();
          this.word("with");
          this.space();
          this.printList(node.attributes, node);
        }
      }
      this.semicolon();
    }
    function ImportAttribute(node) {
      this.print(node.key);
      this.tokenChar(58);
      this.space();
      this.print(node.value);
    }
    function ImportNamespaceSpecifier(node) {
      this.tokenChar(42);
      this.space();
      this.word("as");
      this.space();
      this.print(node.local, node);
    }
  }
});

// node_modules/jsesc/jsesc.js
var require_jsesc = __commonJS({
  "node_modules/jsesc/jsesc.js"(exports2, module2) {
    "use strict";
    var object = {};
    var hasOwnProperty = object.hasOwnProperty;
    var forOwn = (object2, callback) => {
      for (const key in object2) {
        if (hasOwnProperty.call(object2, key)) {
          callback(key, object2[key]);
        }
      }
    };
    var extend = (destination, source) => {
      if (!source) {
        return destination;
      }
      forOwn(source, (key, value) => {
        destination[key] = value;
      });
      return destination;
    };
    var forEach = (array, callback) => {
      const length = array.length;
      let index = -1;
      while (++index < length) {
        callback(array[index]);
      }
    };
    var toString = object.toString;
    var isArray = Array.isArray;
    var isBuffer = Buffer.isBuffer;
    var isObject = (value) => {
      return toString.call(value) == "[object Object]";
    };
    var isString = (value) => {
      return typeof value == "string" || toString.call(value) == "[object String]";
    };
    var isNumber = (value) => {
      return typeof value == "number" || toString.call(value) == "[object Number]";
    };
    var isFunction = (value) => {
      return typeof value == "function";
    };
    var isMap = (value) => {
      return toString.call(value) == "[object Map]";
    };
    var isSet = (value) => {
      return toString.call(value) == "[object Set]";
    };
    var singleEscapes = {
      '"': '\\"',
      "'": "\\'",
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t"
    };
    var regexSingleEscape = /["'\\\b\f\n\r\t]/;
    var regexDigit = /[0-9]/;
    var regexWhitelist = /[ !#-&\(-\[\]-_a-~]/;
    var jsesc = (argument, options) => {
      const increaseIndentation = () => {
        oldIndent = indent;
        ++options.indentLevel;
        indent = options.indent.repeat(options.indentLevel);
      };
      const defaults = {
        "escapeEverything": false,
        "minimal": false,
        "isScriptContext": false,
        "quotes": "single",
        "wrap": false,
        "es6": false,
        "json": false,
        "compact": true,
        "lowercaseHex": false,
        "numbers": "decimal",
        "indent": "	",
        "indentLevel": 0,
        "__inline1__": false,
        "__inline2__": false
      };
      const json = options && options.json;
      if (json) {
        defaults.quotes = "double";
        defaults.wrap = true;
      }
      options = extend(defaults, options);
      if (options.quotes != "single" && options.quotes != "double" && options.quotes != "backtick") {
        options.quotes = "single";
      }
      const quote = options.quotes == "double" ? '"' : options.quotes == "backtick" ? "`" : "'";
      const compact = options.compact;
      const lowercaseHex = options.lowercaseHex;
      let indent = options.indent.repeat(options.indentLevel);
      let oldIndent = "";
      const inline1 = options.__inline1__;
      const inline2 = options.__inline2__;
      const newLine = compact ? "" : "\n";
      let result;
      let isEmpty = true;
      const useBinNumbers = options.numbers == "binary";
      const useOctNumbers = options.numbers == "octal";
      const useDecNumbers = options.numbers == "decimal";
      const useHexNumbers = options.numbers == "hexadecimal";
      if (json && argument && isFunction(argument.toJSON)) {
        argument = argument.toJSON();
      }
      if (!isString(argument)) {
        if (isMap(argument)) {
          if (argument.size == 0) {
            return "new Map()";
          }
          if (!compact) {
            options.__inline1__ = true;
            options.__inline2__ = false;
          }
          return "new Map(" + jsesc(Array.from(argument), options) + ")";
        }
        if (isSet(argument)) {
          if (argument.size == 0) {
            return "new Set()";
          }
          return "new Set(" + jsesc(Array.from(argument), options) + ")";
        }
        if (isBuffer(argument)) {
          if (argument.length == 0) {
            return "Buffer.from([])";
          }
          return "Buffer.from(" + jsesc(Array.from(argument), options) + ")";
        }
        if (isArray(argument)) {
          result = [];
          options.wrap = true;
          if (inline1) {
            options.__inline1__ = false;
            options.__inline2__ = true;
          }
          if (!inline2) {
            increaseIndentation();
          }
          forEach(argument, (value) => {
            isEmpty = false;
            if (inline2) {
              options.__inline2__ = false;
            }
            result.push(
              (compact || inline2 ? "" : indent) + jsesc(value, options)
            );
          });
          if (isEmpty) {
            return "[]";
          }
          if (inline2) {
            return "[" + result.join(", ") + "]";
          }
          return "[" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "]";
        } else if (isNumber(argument)) {
          if (json) {
            return JSON.stringify(argument);
          }
          if (useDecNumbers) {
            return String(argument);
          }
          if (useHexNumbers) {
            let hexadecimal = argument.toString(16);
            if (!lowercaseHex) {
              hexadecimal = hexadecimal.toUpperCase();
            }
            return "0x" + hexadecimal;
          }
          if (useBinNumbers) {
            return "0b" + argument.toString(2);
          }
          if (useOctNumbers) {
            return "0o" + argument.toString(8);
          }
        } else if (!isObject(argument)) {
          if (json) {
            return JSON.stringify(argument) || "null";
          }
          return String(argument);
        } else {
          result = [];
          options.wrap = true;
          increaseIndentation();
          forOwn(argument, (key, value) => {
            isEmpty = false;
            result.push(
              (compact ? "" : indent) + jsesc(key, options) + ":" + (compact ? "" : " ") + jsesc(value, options)
            );
          });
          if (isEmpty) {
            return "{}";
          }
          return "{" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "}";
        }
      }
      const string = argument;
      let index = -1;
      const length = string.length;
      result = "";
      while (++index < length) {
        const character = string.charAt(index);
        if (options.es6) {
          const first = string.charCodeAt(index);
          if (first >= 55296 && first <= 56319 && length > index + 1) {
            const second = string.charCodeAt(index + 1);
            if (second >= 56320 && second <= 57343) {
              const codePoint = (first - 55296) * 1024 + second - 56320 + 65536;
              let hexadecimal2 = codePoint.toString(16);
              if (!lowercaseHex) {
                hexadecimal2 = hexadecimal2.toUpperCase();
              }
              result += "\\u{" + hexadecimal2 + "}";
              ++index;
              continue;
            }
          }
        }
        if (!options.escapeEverything) {
          if (regexWhitelist.test(character)) {
            result += character;
            continue;
          }
          if (character == '"') {
            result += quote == character ? '\\"' : character;
            continue;
          }
          if (character == "`") {
            result += quote == character ? "\\`" : character;
            continue;
          }
          if (character == "'") {
            result += quote == character ? "\\'" : character;
            continue;
          }
        }
        if (character == "\0" && !json && !regexDigit.test(string.charAt(index + 1))) {
          result += "\\0";
          continue;
        }
        if (regexSingleEscape.test(character)) {
          result += singleEscapes[character];
          continue;
        }
        const charCode = character.charCodeAt(0);
        if (options.minimal && charCode != 8232 && charCode != 8233) {
          result += character;
          continue;
        }
        let hexadecimal = charCode.toString(16);
        if (!lowercaseHex) {
          hexadecimal = hexadecimal.toUpperCase();
        }
        const longhand = hexadecimal.length > 2 || json;
        const escaped = "\\" + (longhand ? "u" : "x") + ("0000" + hexadecimal).slice(longhand ? -4 : -2);
        result += escaped;
        continue;
      }
      if (options.wrap) {
        result = quote + result + quote;
      }
      if (quote == "`") {
        result = result.replace(/\$\{/g, "\\${");
      }
      if (options.isScriptContext) {
        return result.replace(/<\/(script|style)/gi, "<\\/$1").replace(/<!--/g, json ? "\\u003C!--" : "\\x3C!--");
      }
      return result;
    };
    jsesc.version = "2.5.2";
    module2.exports = jsesc;
  }
});

// node_modules/@babel/generator/lib/generators/types.js
var require_types = __commonJS({
  "node_modules/@babel/generator/lib/generators/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.ArgumentPlaceholder = ArgumentPlaceholder;
    exports2.ArrayPattern = exports2.ArrayExpression = ArrayExpression;
    exports2.BigIntLiteral = BigIntLiteral;
    exports2.BooleanLiteral = BooleanLiteral;
    exports2.DecimalLiteral = DecimalLiteral;
    exports2.Identifier = Identifier;
    exports2.NullLiteral = NullLiteral;
    exports2.NumericLiteral = NumericLiteral;
    exports2.ObjectPattern = exports2.ObjectExpression = ObjectExpression;
    exports2.ObjectMethod = ObjectMethod;
    exports2.ObjectProperty = ObjectProperty;
    exports2.PipelineBareFunction = PipelineBareFunction;
    exports2.PipelinePrimaryTopicReference = PipelinePrimaryTopicReference;
    exports2.PipelineTopicExpression = PipelineTopicExpression;
    exports2.RecordExpression = RecordExpression;
    exports2.RegExpLiteral = RegExpLiteral;
    exports2.SpreadElement = exports2.RestElement = RestElement;
    exports2.StringLiteral = StringLiteral;
    exports2.TopicReference = TopicReference;
    exports2.TupleExpression = TupleExpression;
    var _t = require_lib3();
    var _jsesc = require_jsesc();
    var {
      isAssignmentPattern,
      isIdentifier
    } = _t;
    function Identifier(node) {
      this.exactSource(node.loc, () => {
        this.word(node.name);
      });
    }
    function ArgumentPlaceholder() {
      this.tokenChar(63);
    }
    function RestElement(node) {
      this.token("...");
      this.print(node.argument, node);
    }
    function ObjectExpression(node) {
      const props = node.properties;
      this.tokenChar(123);
      this.printInnerComments(node);
      if (props.length) {
        this.space();
        this.printList(props, node, {
          indent: true,
          statement: true
        });
        this.space();
      }
      this.tokenChar(125);
    }
    function ObjectMethod(node) {
      this.printJoin(node.decorators, node);
      this._methodHead(node);
      this.space();
      this.print(node.body, node);
    }
    function ObjectProperty(node) {
      this.printJoin(node.decorators, node);
      if (node.computed) {
        this.tokenChar(91);
        this.print(node.key, node);
        this.tokenChar(93);
      } else {
        if (isAssignmentPattern(node.value) && isIdentifier(node.key) && node.key.name === node.value.left.name) {
          this.print(node.value, node);
          return;
        }
        this.print(node.key, node);
        if (node.shorthand && isIdentifier(node.key) && isIdentifier(node.value) && node.key.name === node.value.name) {
          return;
        }
      }
      this.tokenChar(58);
      this.space();
      this.print(node.value, node);
    }
    function ArrayExpression(node) {
      const elems = node.elements;
      const len = elems.length;
      this.tokenChar(91);
      this.printInnerComments(node);
      for (let i = 0; i < elems.length; i++) {
        const elem = elems[i];
        if (elem) {
          if (i > 0)
            this.space();
          this.print(elem, node);
          if (i < len - 1)
            this.tokenChar(44);
        } else {
          this.tokenChar(44);
        }
      }
      this.tokenChar(93);
    }
    function RecordExpression(node) {
      const props = node.properties;
      let startToken;
      let endToken;
      if (this.format.recordAndTupleSyntaxType === "bar") {
        startToken = "{|";
        endToken = "|}";
      } else if (this.format.recordAndTupleSyntaxType !== "hash" && this.format.recordAndTupleSyntaxType != null) {
        throw new Error(`The "recordAndTupleSyntaxType" generator option must be "bar" or "hash" (${JSON.stringify(this.format.recordAndTupleSyntaxType)} received).`);
      } else {
        startToken = "#{";
        endToken = "}";
      }
      this.token(startToken);
      this.printInnerComments(node);
      if (props.length) {
        this.space();
        this.printList(props, node, {
          indent: true,
          statement: true
        });
        this.space();
      }
      this.token(endToken);
    }
    function TupleExpression(node) {
      const elems = node.elements;
      const len = elems.length;
      let startToken;
      let endToken;
      if (this.format.recordAndTupleSyntaxType === "bar") {
        startToken = "[|";
        endToken = "|]";
      } else if (this.format.recordAndTupleSyntaxType === "hash") {
        startToken = "#[";
        endToken = "]";
      } else {
        throw new Error(`${this.format.recordAndTupleSyntaxType} is not a valid recordAndTuple syntax type`);
      }
      this.token(startToken);
      this.printInnerComments(node);
      for (let i = 0; i < elems.length; i++) {
        const elem = elems[i];
        if (elem) {
          if (i > 0)
            this.space();
          this.print(elem, node);
          if (i < len - 1)
            this.tokenChar(44);
        }
      }
      this.token(endToken);
    }
    function RegExpLiteral(node) {
      this.word(`/${node.pattern}/${node.flags}`);
    }
    function BooleanLiteral(node) {
      this.word(node.value ? "true" : "false");
    }
    function NullLiteral() {
      this.word("null");
    }
    function NumericLiteral(node) {
      const raw = this.getPossibleRaw(node);
      const opts = this.format.jsescOption;
      const value = node.value + "";
      if (opts.numbers) {
        this.number(_jsesc(node.value, opts));
      } else if (raw == null) {
        this.number(value);
      } else if (this.format.minified) {
        this.number(raw.length < value.length ? raw : value);
      } else {
        this.number(raw);
      }
    }
    function StringLiteral(node) {
      const raw = this.getPossibleRaw(node);
      if (!this.format.minified && raw !== void 0) {
        this.token(raw);
        return;
      }
      const val = _jsesc(node.value, Object.assign(this.format.jsescOption, this.format.jsonCompatibleStrings && {
        json: true
      }));
      return this.token(val);
    }
    function BigIntLiteral(node) {
      const raw = this.getPossibleRaw(node);
      if (!this.format.minified && raw !== void 0) {
        this.word(raw);
        return;
      }
      this.word(node.value + "n");
    }
    function DecimalLiteral(node) {
      const raw = this.getPossibleRaw(node);
      if (!this.format.minified && raw !== void 0) {
        this.word(raw);
        return;
      }
      this.word(node.value + "m");
    }
    var validTopicTokenSet = /* @__PURE__ */ new Set(["^^", "@@", "^", "%", "#"]);
    function TopicReference() {
      const {
        topicToken
      } = this.format;
      if (validTopicTokenSet.has(topicToken)) {
        this.token(topicToken);
      } else {
        const givenTopicTokenJSON = JSON.stringify(topicToken);
        const validTopics = Array.from(validTopicTokenSet, (v) => JSON.stringify(v));
        throw new Error(`The "topicToken" generator option must be one of ${validTopics.join(", ")} (${givenTopicTokenJSON} received instead).`);
      }
    }
    function PipelineTopicExpression(node) {
      this.print(node.expression, node);
    }
    function PipelineBareFunction(node) {
      this.print(node.callee, node);
    }
    function PipelinePrimaryTopicReference() {
      this.tokenChar(35);
    }
  }
});

// node_modules/@babel/generator/lib/generators/flow.js
var require_flow2 = __commonJS({
  "node_modules/@babel/generator/lib/generators/flow.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.AnyTypeAnnotation = AnyTypeAnnotation;
    exports2.ArrayTypeAnnotation = ArrayTypeAnnotation;
    exports2.BooleanLiteralTypeAnnotation = BooleanLiteralTypeAnnotation;
    exports2.BooleanTypeAnnotation = BooleanTypeAnnotation;
    exports2.DeclareClass = DeclareClass;
    exports2.DeclareExportAllDeclaration = DeclareExportAllDeclaration;
    exports2.DeclareExportDeclaration = DeclareExportDeclaration;
    exports2.DeclareFunction = DeclareFunction;
    exports2.DeclareInterface = DeclareInterface;
    exports2.DeclareModule = DeclareModule;
    exports2.DeclareModuleExports = DeclareModuleExports;
    exports2.DeclareOpaqueType = DeclareOpaqueType;
    exports2.DeclareTypeAlias = DeclareTypeAlias;
    exports2.DeclareVariable = DeclareVariable;
    exports2.DeclaredPredicate = DeclaredPredicate;
    exports2.EmptyTypeAnnotation = EmptyTypeAnnotation;
    exports2.EnumBooleanBody = EnumBooleanBody;
    exports2.EnumBooleanMember = EnumBooleanMember;
    exports2.EnumDeclaration = EnumDeclaration;
    exports2.EnumDefaultedMember = EnumDefaultedMember;
    exports2.EnumNumberBody = EnumNumberBody;
    exports2.EnumNumberMember = EnumNumberMember;
    exports2.EnumStringBody = EnumStringBody;
    exports2.EnumStringMember = EnumStringMember;
    exports2.EnumSymbolBody = EnumSymbolBody;
    exports2.ExistsTypeAnnotation = ExistsTypeAnnotation;
    exports2.FunctionTypeAnnotation = FunctionTypeAnnotation;
    exports2.FunctionTypeParam = FunctionTypeParam;
    exports2.IndexedAccessType = IndexedAccessType;
    exports2.InferredPredicate = InferredPredicate;
    exports2.InterfaceDeclaration = InterfaceDeclaration;
    exports2.GenericTypeAnnotation = exports2.ClassImplements = exports2.InterfaceExtends = InterfaceExtends;
    exports2.InterfaceTypeAnnotation = InterfaceTypeAnnotation;
    exports2.IntersectionTypeAnnotation = IntersectionTypeAnnotation;
    exports2.MixedTypeAnnotation = MixedTypeAnnotation;
    exports2.NullLiteralTypeAnnotation = NullLiteralTypeAnnotation;
    exports2.NullableTypeAnnotation = NullableTypeAnnotation;
    Object.defineProperty(exports2, "NumberLiteralTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _types2.NumericLiteral;
      }
    });
    exports2.NumberTypeAnnotation = NumberTypeAnnotation;
    exports2.ObjectTypeAnnotation = ObjectTypeAnnotation;
    exports2.ObjectTypeCallProperty = ObjectTypeCallProperty;
    exports2.ObjectTypeIndexer = ObjectTypeIndexer;
    exports2.ObjectTypeInternalSlot = ObjectTypeInternalSlot;
    exports2.ObjectTypeProperty = ObjectTypeProperty;
    exports2.ObjectTypeSpreadProperty = ObjectTypeSpreadProperty;
    exports2.OpaqueType = OpaqueType;
    exports2.OptionalIndexedAccessType = OptionalIndexedAccessType;
    exports2.QualifiedTypeIdentifier = QualifiedTypeIdentifier;
    Object.defineProperty(exports2, "StringLiteralTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _types2.StringLiteral;
      }
    });
    exports2.StringTypeAnnotation = StringTypeAnnotation;
    exports2.SymbolTypeAnnotation = SymbolTypeAnnotation;
    exports2.ThisTypeAnnotation = ThisTypeAnnotation;
    exports2.TupleTypeAnnotation = TupleTypeAnnotation;
    exports2.TypeAlias = TypeAlias;
    exports2.TypeAnnotation = TypeAnnotation;
    exports2.TypeCastExpression = TypeCastExpression;
    exports2.TypeParameter = TypeParameter;
    exports2.TypeParameterDeclaration = exports2.TypeParameterInstantiation = TypeParameterInstantiation;
    exports2.TypeofTypeAnnotation = TypeofTypeAnnotation;
    exports2.UnionTypeAnnotation = UnionTypeAnnotation;
    exports2.Variance = Variance;
    exports2.VoidTypeAnnotation = VoidTypeAnnotation;
    exports2._interfaceish = _interfaceish;
    exports2._variance = _variance;
    var _t = require_lib3();
    var _modules = require_modules();
    var _types2 = require_types();
    var {
      isDeclareExportDeclaration,
      isStatement
    } = _t;
    function AnyTypeAnnotation() {
      this.word("any");
    }
    function ArrayTypeAnnotation(node) {
      this.print(node.elementType, node, true);
      this.tokenChar(91);
      this.tokenChar(93);
    }
    function BooleanTypeAnnotation() {
      this.word("boolean");
    }
    function BooleanLiteralTypeAnnotation(node) {
      this.word(node.value ? "true" : "false");
    }
    function NullLiteralTypeAnnotation() {
      this.word("null");
    }
    function DeclareClass(node, parent) {
      if (!isDeclareExportDeclaration(parent)) {
        this.word("declare");
        this.space();
      }
      this.word("class");
      this.space();
      this._interfaceish(node);
    }
    function DeclareFunction(node, parent) {
      if (!isDeclareExportDeclaration(parent)) {
        this.word("declare");
        this.space();
      }
      this.word("function");
      this.space();
      this.print(node.id, node);
      this.print(node.id.typeAnnotation.typeAnnotation, node);
      if (node.predicate) {
        this.space();
        this.print(node.predicate, node);
      }
      this.semicolon();
    }
    function InferredPredicate() {
      this.tokenChar(37);
      this.word("checks");
    }
    function DeclaredPredicate(node) {
      this.tokenChar(37);
      this.word("checks");
      this.tokenChar(40);
      this.print(node.value, node);
      this.tokenChar(41);
    }
    function DeclareInterface(node) {
      this.word("declare");
      this.space();
      this.InterfaceDeclaration(node);
    }
    function DeclareModule(node) {
      this.word("declare");
      this.space();
      this.word("module");
      this.space();
      this.print(node.id, node);
      this.space();
      this.print(node.body, node);
    }
    function DeclareModuleExports(node) {
      this.word("declare");
      this.space();
      this.word("module");
      this.tokenChar(46);
      this.word("exports");
      this.print(node.typeAnnotation, node);
    }
    function DeclareTypeAlias(node) {
      this.word("declare");
      this.space();
      this.TypeAlias(node);
    }
    function DeclareOpaqueType(node, parent) {
      if (!isDeclareExportDeclaration(parent)) {
        this.word("declare");
        this.space();
      }
      this.OpaqueType(node);
    }
    function DeclareVariable(node, parent) {
      if (!isDeclareExportDeclaration(parent)) {
        this.word("declare");
        this.space();
      }
      this.word("var");
      this.space();
      this.print(node.id, node);
      this.print(node.id.typeAnnotation, node);
      this.semicolon();
    }
    function DeclareExportDeclaration(node) {
      this.word("declare");
      this.space();
      this.word("export");
      this.space();
      if (node.default) {
        this.word("default");
        this.space();
      }
      FlowExportDeclaration.call(this, node);
    }
    function DeclareExportAllDeclaration(node) {
      this.word("declare");
      this.space();
      _modules.ExportAllDeclaration.call(this, node);
    }
    function EnumDeclaration(node) {
      const {
        id,
        body
      } = node;
      this.word("enum");
      this.space();
      this.print(id, node);
      this.print(body, node);
    }
    function enumExplicitType(context, name, hasExplicitType) {
      if (hasExplicitType) {
        context.space();
        context.word("of");
        context.space();
        context.word(name);
      }
      context.space();
    }
    function enumBody(context, node) {
      const {
        members
      } = node;
      context.token("{");
      context.indent();
      context.newline();
      for (const member of members) {
        context.print(member, node);
        context.newline();
      }
      if (node.hasUnknownMembers) {
        context.token("...");
        context.newline();
      }
      context.dedent();
      context.token("}");
    }
    function EnumBooleanBody(node) {
      const {
        explicitType
      } = node;
      enumExplicitType(this, "boolean", explicitType);
      enumBody(this, node);
    }
    function EnumNumberBody(node) {
      const {
        explicitType
      } = node;
      enumExplicitType(this, "number", explicitType);
      enumBody(this, node);
    }
    function EnumStringBody(node) {
      const {
        explicitType
      } = node;
      enumExplicitType(this, "string", explicitType);
      enumBody(this, node);
    }
    function EnumSymbolBody(node) {
      enumExplicitType(this, "symbol", true);
      enumBody(this, node);
    }
    function EnumDefaultedMember(node) {
      const {
        id
      } = node;
      this.print(id, node);
      this.tokenChar(44);
    }
    function enumInitializedMember(context, node) {
      const {
        id,
        init
      } = node;
      context.print(id, node);
      context.space();
      context.token("=");
      context.space();
      context.print(init, node);
      context.token(",");
    }
    function EnumBooleanMember(node) {
      enumInitializedMember(this, node);
    }
    function EnumNumberMember(node) {
      enumInitializedMember(this, node);
    }
    function EnumStringMember(node) {
      enumInitializedMember(this, node);
    }
    function FlowExportDeclaration(node) {
      if (node.declaration) {
        const declar = node.declaration;
        this.print(declar, node);
        if (!isStatement(declar))
          this.semicolon();
      } else {
        this.tokenChar(123);
        if (node.specifiers.length) {
          this.space();
          this.printList(node.specifiers, node);
          this.space();
        }
        this.tokenChar(125);
        if (node.source) {
          this.space();
          this.word("from");
          this.space();
          this.print(node.source, node);
        }
        this.semicolon();
      }
    }
    function ExistsTypeAnnotation() {
      this.tokenChar(42);
    }
    function FunctionTypeAnnotation(node, parent) {
      this.print(node.typeParameters, node);
      this.tokenChar(40);
      if (node.this) {
        this.word("this");
        this.tokenChar(58);
        this.space();
        this.print(node.this.typeAnnotation, node);
        if (node.params.length || node.rest) {
          this.tokenChar(44);
          this.space();
        }
      }
      this.printList(node.params, node);
      if (node.rest) {
        if (node.params.length) {
          this.tokenChar(44);
          this.space();
        }
        this.token("...");
        this.print(node.rest, node);
      }
      this.tokenChar(41);
      if (parent && (parent.type === "ObjectTypeCallProperty" || parent.type === "DeclareFunction" || parent.type === "ObjectTypeProperty" && parent.method)) {
        this.tokenChar(58);
      } else {
        this.space();
        this.token("=>");
      }
      this.space();
      this.print(node.returnType, node);
    }
    function FunctionTypeParam(node) {
      this.print(node.name, node);
      if (node.optional)
        this.tokenChar(63);
      if (node.name) {
        this.tokenChar(58);
        this.space();
      }
      this.print(node.typeAnnotation, node);
    }
    function InterfaceExtends(node) {
      this.print(node.id, node);
      this.print(node.typeParameters, node, true);
    }
    function _interfaceish(node) {
      var _node$extends;
      this.print(node.id, node);
      this.print(node.typeParameters, node);
      if ((_node$extends = node.extends) != null && _node$extends.length) {
        this.space();
        this.word("extends");
        this.space();
        this.printList(node.extends, node);
      }
      if (node.mixins && node.mixins.length) {
        this.space();
        this.word("mixins");
        this.space();
        this.printList(node.mixins, node);
      }
      if (node.implements && node.implements.length) {
        this.space();
        this.word("implements");
        this.space();
        this.printList(node.implements, node);
      }
      this.space();
      this.print(node.body, node);
    }
    function _variance(node) {
      if (node.variance) {
        if (node.variance.kind === "plus") {
          this.tokenChar(43);
        } else if (node.variance.kind === "minus") {
          this.tokenChar(45);
        }
      }
    }
    function InterfaceDeclaration(node) {
      this.word("interface");
      this.space();
      this._interfaceish(node);
    }
    function andSeparator() {
      this.space();
      this.tokenChar(38);
      this.space();
    }
    function InterfaceTypeAnnotation(node) {
      this.word("interface");
      if (node.extends && node.extends.length) {
        this.space();
        this.word("extends");
        this.space();
        this.printList(node.extends, node);
      }
      this.space();
      this.print(node.body, node);
    }
    function IntersectionTypeAnnotation(node) {
      this.printJoin(node.types, node, {
        separator: andSeparator
      });
    }
    function MixedTypeAnnotation() {
      this.word("mixed");
    }
    function EmptyTypeAnnotation() {
      this.word("empty");
    }
    function NullableTypeAnnotation(node) {
      this.tokenChar(63);
      this.print(node.typeAnnotation, node);
    }
    function NumberTypeAnnotation() {
      this.word("number");
    }
    function StringTypeAnnotation() {
      this.word("string");
    }
    function ThisTypeAnnotation() {
      this.word("this");
    }
    function TupleTypeAnnotation(node) {
      this.tokenChar(91);
      this.printList(node.types, node);
      this.tokenChar(93);
    }
    function TypeofTypeAnnotation(node) {
      this.word("typeof");
      this.space();
      this.print(node.argument, node);
    }
    function TypeAlias(node) {
      this.word("type");
      this.space();
      this.print(node.id, node);
      this.print(node.typeParameters, node);
      this.space();
      this.tokenChar(61);
      this.space();
      this.print(node.right, node);
      this.semicolon();
    }
    function TypeAnnotation(node) {
      this.tokenChar(58);
      this.space();
      if (node.optional)
        this.tokenChar(63);
      this.print(node.typeAnnotation, node);
    }
    function TypeParameterInstantiation(node) {
      this.tokenChar(60);
      this.printList(node.params, node, {});
      this.tokenChar(62);
    }
    function TypeParameter(node) {
      this._variance(node);
      this.word(node.name);
      if (node.bound) {
        this.print(node.bound, node);
      }
      if (node.default) {
        this.space();
        this.tokenChar(61);
        this.space();
        this.print(node.default, node);
      }
    }
    function OpaqueType(node) {
      this.word("opaque");
      this.space();
      this.word("type");
      this.space();
      this.print(node.id, node);
      this.print(node.typeParameters, node);
      if (node.supertype) {
        this.tokenChar(58);
        this.space();
        this.print(node.supertype, node);
      }
      if (node.impltype) {
        this.space();
        this.tokenChar(61);
        this.space();
        this.print(node.impltype, node);
      }
      this.semicolon();
    }
    function ObjectTypeAnnotation(node) {
      if (node.exact) {
        this.token("{|");
      } else {
        this.tokenChar(123);
      }
      const props = [...node.properties, ...node.callProperties || [], ...node.indexers || [], ...node.internalSlots || []];
      if (props.length) {
        this.space();
        this.printJoin(props, node, {
          addNewlines(leading) {
            if (leading && !props[0])
              return 1;
          },
          indent: true,
          statement: true,
          iterator: () => {
            if (props.length !== 1 || node.inexact) {
              this.tokenChar(44);
              this.space();
            }
          }
        });
        this.space();
      }
      if (node.inexact) {
        this.indent();
        this.token("...");
        if (props.length) {
          this.newline();
        }
        this.dedent();
      }
      if (node.exact) {
        this.token("|}");
      } else {
        this.tokenChar(125);
      }
    }
    function ObjectTypeInternalSlot(node) {
      if (node.static) {
        this.word("static");
        this.space();
      }
      this.tokenChar(91);
      this.tokenChar(91);
      this.print(node.id, node);
      this.tokenChar(93);
      this.tokenChar(93);
      if (node.optional)
        this.tokenChar(63);
      if (!node.method) {
        this.tokenChar(58);
        this.space();
      }
      this.print(node.value, node);
    }
    function ObjectTypeCallProperty(node) {
      if (node.static) {
        this.word("static");
        this.space();
      }
      this.print(node.value, node);
    }
    function ObjectTypeIndexer(node) {
      if (node.static) {
        this.word("static");
        this.space();
      }
      this._variance(node);
      this.tokenChar(91);
      if (node.id) {
        this.print(node.id, node);
        this.tokenChar(58);
        this.space();
      }
      this.print(node.key, node);
      this.tokenChar(93);
      this.tokenChar(58);
      this.space();
      this.print(node.value, node);
    }
    function ObjectTypeProperty(node) {
      if (node.proto) {
        this.word("proto");
        this.space();
      }
      if (node.static) {
        this.word("static");
        this.space();
      }
      if (node.kind === "get" || node.kind === "set") {
        this.word(node.kind);
        this.space();
      }
      this._variance(node);
      this.print(node.key, node);
      if (node.optional)
        this.tokenChar(63);
      if (!node.method) {
        this.tokenChar(58);
        this.space();
      }
      this.print(node.value, node);
    }
    function ObjectTypeSpreadProperty(node) {
      this.token("...");
      this.print(node.argument, node);
    }
    function QualifiedTypeIdentifier(node) {
      this.print(node.qualification, node);
      this.tokenChar(46);
      this.print(node.id, node);
    }
    function SymbolTypeAnnotation() {
      this.word("symbol");
    }
    function orSeparator() {
      this.space();
      this.tokenChar(124);
      this.space();
    }
    function UnionTypeAnnotation(node) {
      this.printJoin(node.types, node, {
        separator: orSeparator
      });
    }
    function TypeCastExpression(node) {
      this.tokenChar(40);
      this.print(node.expression, node);
      this.print(node.typeAnnotation, node);
      this.tokenChar(41);
    }
    function Variance(node) {
      if (node.kind === "plus") {
        this.tokenChar(43);
      } else {
        this.tokenChar(45);
      }
    }
    function VoidTypeAnnotation() {
      this.word("void");
    }
    function IndexedAccessType(node) {
      this.print(node.objectType, node, true);
      this.tokenChar(91);
      this.print(node.indexType, node);
      this.tokenChar(93);
    }
    function OptionalIndexedAccessType(node) {
      this.print(node.objectType, node);
      if (node.optional) {
        this.token("?.");
      }
      this.tokenChar(91);
      this.print(node.indexType, node);
      this.tokenChar(93);
    }
  }
});

// node_modules/@babel/generator/lib/generators/base.js
var require_base = __commonJS({
  "node_modules/@babel/generator/lib/generators/base.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.BlockStatement = BlockStatement;
    exports2.Directive = Directive;
    exports2.DirectiveLiteral = DirectiveLiteral;
    exports2.File = File;
    exports2.InterpreterDirective = InterpreterDirective;
    exports2.Placeholder = Placeholder;
    exports2.Program = Program;
    function File(node) {
      if (node.program) {
        this.print(node.program.interpreter, node);
      }
      this.print(node.program, node);
    }
    function Program(node) {
      this.printInnerComments(node, false);
      this.printSequence(node.directives, node);
      if (node.directives && node.directives.length)
        this.newline();
      this.printSequence(node.body, node);
    }
    function BlockStatement(node) {
      var _node$directives;
      this.tokenChar(123);
      this.printInnerComments(node);
      const hasDirectives = (_node$directives = node.directives) == null ? void 0 : _node$directives.length;
      if (node.body.length || hasDirectives) {
        this.newline();
        this.printSequence(node.directives, node, {
          indent: true
        });
        if (hasDirectives)
          this.newline();
        this.printSequence(node.body, node, {
          indent: true
        });
        this.removeTrailingNewline();
        this.source("end", node.loc);
        if (!this.endsWith(10))
          this.newline();
        this.rightBrace();
      } else {
        this.source("end", node.loc);
        this.tokenChar(125);
      }
    }
    function Directive(node) {
      this.print(node.value, node);
      this.semicolon();
    }
    var unescapedSingleQuoteRE = /(?:^|[^\\])(?:\\\\)*'/;
    var unescapedDoubleQuoteRE = /(?:^|[^\\])(?:\\\\)*"/;
    function DirectiveLiteral(node) {
      const raw = this.getPossibleRaw(node);
      if (!this.format.minified && raw !== void 0) {
        this.token(raw);
        return;
      }
      const {
        value
      } = node;
      if (!unescapedDoubleQuoteRE.test(value)) {
        this.token(`"${value}"`);
      } else if (!unescapedSingleQuoteRE.test(value)) {
        this.token(`'${value}'`);
      } else {
        throw new Error("Malformed AST: it is not possible to print a directive containing both unescaped single and double quotes.");
      }
    }
    function InterpreterDirective(node) {
      this.token(`#!${node.value}
`, true);
    }
    function Placeholder(node) {
      this.token("%%");
      this.print(node.name);
      this.token("%%");
      if (node.expectedNode === "Statement") {
        this.semicolon();
      }
    }
  }
});

// node_modules/@babel/generator/lib/generators/jsx.js
var require_jsx2 = __commonJS({
  "node_modules/@babel/generator/lib/generators/jsx.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.JSXAttribute = JSXAttribute;
    exports2.JSXClosingElement = JSXClosingElement;
    exports2.JSXClosingFragment = JSXClosingFragment;
    exports2.JSXElement = JSXElement;
    exports2.JSXEmptyExpression = JSXEmptyExpression;
    exports2.JSXExpressionContainer = JSXExpressionContainer;
    exports2.JSXFragment = JSXFragment;
    exports2.JSXIdentifier = JSXIdentifier;
    exports2.JSXMemberExpression = JSXMemberExpression;
    exports2.JSXNamespacedName = JSXNamespacedName;
    exports2.JSXOpeningElement = JSXOpeningElement;
    exports2.JSXOpeningFragment = JSXOpeningFragment;
    exports2.JSXSpreadAttribute = JSXSpreadAttribute;
    exports2.JSXSpreadChild = JSXSpreadChild;
    exports2.JSXText = JSXText;
    function JSXAttribute(node) {
      this.print(node.name, node);
      if (node.value) {
        this.tokenChar(61);
        this.print(node.value, node);
      }
    }
    function JSXIdentifier(node) {
      this.word(node.name);
    }
    function JSXNamespacedName(node) {
      this.print(node.namespace, node);
      this.tokenChar(58);
      this.print(node.name, node);
    }
    function JSXMemberExpression(node) {
      this.print(node.object, node);
      this.tokenChar(46);
      this.print(node.property, node);
    }
    function JSXSpreadAttribute(node) {
      this.tokenChar(123);
      this.token("...");
      this.print(node.argument, node);
      this.tokenChar(125);
    }
    function JSXExpressionContainer(node) {
      this.tokenChar(123);
      this.print(node.expression, node);
      this.tokenChar(125);
    }
    function JSXSpreadChild(node) {
      this.tokenChar(123);
      this.token("...");
      this.print(node.expression, node);
      this.tokenChar(125);
    }
    function JSXText(node) {
      const raw = this.getPossibleRaw(node);
      if (raw !== void 0) {
        this.token(raw, true);
      } else {
        this.token(node.value, true);
      }
    }
    function JSXElement(node) {
      const open = node.openingElement;
      this.print(open, node);
      if (open.selfClosing)
        return;
      this.indent();
      for (const child of node.children) {
        this.print(child, node);
      }
      this.dedent();
      this.print(node.closingElement, node);
    }
    function spaceSeparator() {
      this.space();
    }
    function JSXOpeningElement(node) {
      this.tokenChar(60);
      this.print(node.name, node);
      this.print(node.typeParameters, node);
      if (node.attributes.length > 0) {
        this.space();
        this.printJoin(node.attributes, node, {
          separator: spaceSeparator
        });
      }
      if (node.selfClosing) {
        this.space();
        this.token("/>");
      } else {
        this.tokenChar(62);
      }
    }
    function JSXClosingElement(node) {
      this.token("</");
      this.print(node.name, node);
      this.tokenChar(62);
    }
    function JSXEmptyExpression(node) {
      this.printInnerComments(node);
    }
    function JSXFragment(node) {
      this.print(node.openingFragment, node);
      this.indent();
      for (const child of node.children) {
        this.print(child, node);
      }
      this.dedent();
      this.print(node.closingFragment, node);
    }
    function JSXOpeningFragment() {
      this.tokenChar(60);
      this.tokenChar(62);
    }
    function JSXClosingFragment() {
      this.token("</");
      this.tokenChar(62);
    }
  }
});

// node_modules/@babel/generator/lib/generators/typescript.js
var require_typescript2 = __commonJS({
  "node_modules/@babel/generator/lib/generators/typescript.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.TSAnyKeyword = TSAnyKeyword;
    exports2.TSArrayType = TSArrayType;
    exports2.TSAsExpression = TSAsExpression;
    exports2.TSBigIntKeyword = TSBigIntKeyword;
    exports2.TSBooleanKeyword = TSBooleanKeyword;
    exports2.TSCallSignatureDeclaration = TSCallSignatureDeclaration;
    exports2.TSConditionalType = TSConditionalType;
    exports2.TSConstructSignatureDeclaration = TSConstructSignatureDeclaration;
    exports2.TSConstructorType = TSConstructorType;
    exports2.TSDeclareFunction = TSDeclareFunction;
    exports2.TSDeclareMethod = TSDeclareMethod;
    exports2.TSEnumDeclaration = TSEnumDeclaration;
    exports2.TSEnumMember = TSEnumMember;
    exports2.TSExportAssignment = TSExportAssignment;
    exports2.TSExpressionWithTypeArguments = TSExpressionWithTypeArguments;
    exports2.TSExternalModuleReference = TSExternalModuleReference;
    exports2.TSFunctionType = TSFunctionType;
    exports2.TSImportEqualsDeclaration = TSImportEqualsDeclaration;
    exports2.TSImportType = TSImportType;
    exports2.TSIndexSignature = TSIndexSignature;
    exports2.TSIndexedAccessType = TSIndexedAccessType;
    exports2.TSInferType = TSInferType;
    exports2.TSInstantiationExpression = TSInstantiationExpression;
    exports2.TSInterfaceBody = TSInterfaceBody;
    exports2.TSInterfaceDeclaration = TSInterfaceDeclaration;
    exports2.TSIntersectionType = TSIntersectionType;
    exports2.TSIntrinsicKeyword = TSIntrinsicKeyword;
    exports2.TSLiteralType = TSLiteralType;
    exports2.TSMappedType = TSMappedType;
    exports2.TSMethodSignature = TSMethodSignature;
    exports2.TSModuleBlock = TSModuleBlock;
    exports2.TSModuleDeclaration = TSModuleDeclaration;
    exports2.TSNamedTupleMember = TSNamedTupleMember;
    exports2.TSNamespaceExportDeclaration = TSNamespaceExportDeclaration;
    exports2.TSNeverKeyword = TSNeverKeyword;
    exports2.TSNonNullExpression = TSNonNullExpression;
    exports2.TSNullKeyword = TSNullKeyword;
    exports2.TSNumberKeyword = TSNumberKeyword;
    exports2.TSObjectKeyword = TSObjectKeyword;
    exports2.TSOptionalType = TSOptionalType;
    exports2.TSParameterProperty = TSParameterProperty;
    exports2.TSParenthesizedType = TSParenthesizedType;
    exports2.TSPropertySignature = TSPropertySignature;
    exports2.TSQualifiedName = TSQualifiedName;
    exports2.TSRestType = TSRestType;
    exports2.TSStringKeyword = TSStringKeyword;
    exports2.TSSymbolKeyword = TSSymbolKeyword;
    exports2.TSThisType = TSThisType;
    exports2.TSTupleType = TSTupleType;
    exports2.TSTypeAliasDeclaration = TSTypeAliasDeclaration;
    exports2.TSTypeAnnotation = TSTypeAnnotation;
    exports2.TSTypeAssertion = TSTypeAssertion;
    exports2.TSTypeLiteral = TSTypeLiteral;
    exports2.TSTypeOperator = TSTypeOperator;
    exports2.TSTypeParameter = TSTypeParameter;
    exports2.TSTypeParameterDeclaration = exports2.TSTypeParameterInstantiation = TSTypeParameterInstantiation;
    exports2.TSTypePredicate = TSTypePredicate;
    exports2.TSTypeQuery = TSTypeQuery;
    exports2.TSTypeReference = TSTypeReference;
    exports2.TSUndefinedKeyword = TSUndefinedKeyword;
    exports2.TSUnionType = TSUnionType;
    exports2.TSUnknownKeyword = TSUnknownKeyword;
    exports2.TSVoidKeyword = TSVoidKeyword;
    exports2.tsPrintClassMemberModifiers = tsPrintClassMemberModifiers;
    exports2.tsPrintFunctionOrConstructorType = tsPrintFunctionOrConstructorType;
    exports2.tsPrintPropertyOrMethodName = tsPrintPropertyOrMethodName;
    exports2.tsPrintSignatureDeclarationBase = tsPrintSignatureDeclarationBase;
    exports2.tsPrintTypeLiteralOrInterfaceBody = tsPrintTypeLiteralOrInterfaceBody;
    function TSTypeAnnotation(node) {
      this.tokenChar(58);
      this.space();
      if (node.optional)
        this.tokenChar(63);
      this.print(node.typeAnnotation, node);
    }
    function TSTypeParameterInstantiation(node, parent) {
      this.tokenChar(60);
      this.printList(node.params, node, {});
      if (parent.type === "ArrowFunctionExpression" && node.params.length === 1) {
        this.tokenChar(44);
      }
      this.tokenChar(62);
    }
    function TSTypeParameter(node) {
      if (node.in) {
        this.word("in");
        this.space();
      }
      if (node.out) {
        this.word("out");
        this.space();
      }
      this.word(node.name);
      if (node.constraint) {
        this.space();
        this.word("extends");
        this.space();
        this.print(node.constraint, node);
      }
      if (node.default) {
        this.space();
        this.tokenChar(61);
        this.space();
        this.print(node.default, node);
      }
    }
    function TSParameterProperty(node) {
      if (node.accessibility) {
        this.word(node.accessibility);
        this.space();
      }
      if (node.readonly) {
        this.word("readonly");
        this.space();
      }
      this._param(node.parameter);
    }
    function TSDeclareFunction(node) {
      if (node.declare) {
        this.word("declare");
        this.space();
      }
      this._functionHead(node);
      this.tokenChar(59);
    }
    function TSDeclareMethod(node) {
      this._classMethodHead(node);
      this.tokenChar(59);
    }
    function TSQualifiedName(node) {
      this.print(node.left, node);
      this.tokenChar(46);
      this.print(node.right, node);
    }
    function TSCallSignatureDeclaration(node) {
      this.tsPrintSignatureDeclarationBase(node);
      this.tokenChar(59);
    }
    function TSConstructSignatureDeclaration(node) {
      this.word("new");
      this.space();
      this.tsPrintSignatureDeclarationBase(node);
      this.tokenChar(59);
    }
    function TSPropertySignature(node) {
      const {
        readonly,
        initializer
      } = node;
      if (readonly) {
        this.word("readonly");
        this.space();
      }
      this.tsPrintPropertyOrMethodName(node);
      this.print(node.typeAnnotation, node);
      if (initializer) {
        this.space();
        this.tokenChar(61);
        this.space();
        this.print(initializer, node);
      }
      this.tokenChar(59);
    }
    function tsPrintPropertyOrMethodName(node) {
      if (node.computed) {
        this.tokenChar(91);
      }
      this.print(node.key, node);
      if (node.computed) {
        this.tokenChar(93);
      }
      if (node.optional) {
        this.tokenChar(63);
      }
    }
    function TSMethodSignature(node) {
      const {
        kind
      } = node;
      if (kind === "set" || kind === "get") {
        this.word(kind);
        this.space();
      }
      this.tsPrintPropertyOrMethodName(node);
      this.tsPrintSignatureDeclarationBase(node);
      this.tokenChar(59);
    }
    function TSIndexSignature(node) {
      const {
        readonly,
        static: isStatic
      } = node;
      if (isStatic) {
        this.word("static");
        this.space();
      }
      if (readonly) {
        this.word("readonly");
        this.space();
      }
      this.tokenChar(91);
      this._parameters(node.parameters, node);
      this.tokenChar(93);
      this.print(node.typeAnnotation, node);
      this.tokenChar(59);
    }
    function TSAnyKeyword() {
      this.word("any");
    }
    function TSBigIntKeyword() {
      this.word("bigint");
    }
    function TSUnknownKeyword() {
      this.word("unknown");
    }
    function TSNumberKeyword() {
      this.word("number");
    }
    function TSObjectKeyword() {
      this.word("object");
    }
    function TSBooleanKeyword() {
      this.word("boolean");
    }
    function TSStringKeyword() {
      this.word("string");
    }
    function TSSymbolKeyword() {
      this.word("symbol");
    }
    function TSVoidKeyword() {
      this.word("void");
    }
    function TSUndefinedKeyword() {
      this.word("undefined");
    }
    function TSNullKeyword() {
      this.word("null");
    }
    function TSNeverKeyword() {
      this.word("never");
    }
    function TSIntrinsicKeyword() {
      this.word("intrinsic");
    }
    function TSThisType() {
      this.word("this");
    }
    function TSFunctionType(node) {
      this.tsPrintFunctionOrConstructorType(node);
    }
    function TSConstructorType(node) {
      if (node.abstract) {
        this.word("abstract");
        this.space();
      }
      this.word("new");
      this.space();
      this.tsPrintFunctionOrConstructorType(node);
    }
    function tsPrintFunctionOrConstructorType(node) {
      const {
        typeParameters
      } = node;
      const parameters = node.parameters;
      this.print(typeParameters, node);
      this.tokenChar(40);
      this._parameters(parameters, node);
      this.tokenChar(41);
      this.space();
      this.token("=>");
      this.space();
      const returnType = node.typeAnnotation;
      this.print(returnType.typeAnnotation, node);
    }
    function TSTypeReference(node) {
      this.print(node.typeName, node, true);
      this.print(node.typeParameters, node, true);
    }
    function TSTypePredicate(node) {
      if (node.asserts) {
        this.word("asserts");
        this.space();
      }
      this.print(node.parameterName);
      if (node.typeAnnotation) {
        this.space();
        this.word("is");
        this.space();
        this.print(node.typeAnnotation.typeAnnotation);
      }
    }
    function TSTypeQuery(node) {
      this.word("typeof");
      this.space();
      this.print(node.exprName);
      if (node.typeParameters) {
        this.print(node.typeParameters, node);
      }
    }
    function TSTypeLiteral(node) {
      this.tsPrintTypeLiteralOrInterfaceBody(node.members, node);
    }
    function tsPrintTypeLiteralOrInterfaceBody(members, node) {
      tsPrintBraced(this, members, node);
    }
    function tsPrintBraced(printer, members, node) {
      printer.token("{");
      if (members.length) {
        printer.indent();
        printer.newline();
        for (const member of members) {
          printer.print(member, node);
          printer.newline();
        }
        printer.dedent();
        printer.rightBrace();
      } else {
        printer.token("}");
      }
    }
    function TSArrayType(node) {
      this.print(node.elementType, node, true);
      this.token("[]");
    }
    function TSTupleType(node) {
      this.tokenChar(91);
      this.printList(node.elementTypes, node);
      this.tokenChar(93);
    }
    function TSOptionalType(node) {
      this.print(node.typeAnnotation, node);
      this.tokenChar(63);
    }
    function TSRestType(node) {
      this.token("...");
      this.print(node.typeAnnotation, node);
    }
    function TSNamedTupleMember(node) {
      this.print(node.label, node);
      if (node.optional)
        this.tokenChar(63);
      this.tokenChar(58);
      this.space();
      this.print(node.elementType, node);
    }
    function TSUnionType(node) {
      tsPrintUnionOrIntersectionType(this, node, "|");
    }
    function TSIntersectionType(node) {
      tsPrintUnionOrIntersectionType(this, node, "&");
    }
    function tsPrintUnionOrIntersectionType(printer, node, sep) {
      printer.printJoin(node.types, node, {
        separator() {
          this.space();
          this.token(sep);
          this.space();
        }
      });
    }
    function TSConditionalType(node) {
      this.print(node.checkType);
      this.space();
      this.word("extends");
      this.space();
      this.print(node.extendsType);
      this.space();
      this.tokenChar(63);
      this.space();
      this.print(node.trueType);
      this.space();
      this.tokenChar(58);
      this.space();
      this.print(node.falseType);
    }
    function TSInferType(node) {
      this.token("infer");
      this.space();
      this.print(node.typeParameter);
    }
    function TSParenthesizedType(node) {
      this.tokenChar(40);
      this.print(node.typeAnnotation, node);
      this.tokenChar(41);
    }
    function TSTypeOperator(node) {
      this.word(node.operator);
      this.space();
      this.print(node.typeAnnotation, node);
    }
    function TSIndexedAccessType(node) {
      this.print(node.objectType, node, true);
      this.tokenChar(91);
      this.print(node.indexType, node);
      this.tokenChar(93);
    }
    function TSMappedType(node) {
      const {
        nameType,
        optional,
        readonly,
        typeParameter
      } = node;
      this.tokenChar(123);
      this.space();
      if (readonly) {
        tokenIfPlusMinus(this, readonly);
        this.word("readonly");
        this.space();
      }
      this.tokenChar(91);
      this.word(typeParameter.name);
      this.space();
      this.word("in");
      this.space();
      this.print(typeParameter.constraint, typeParameter);
      if (nameType) {
        this.space();
        this.word("as");
        this.space();
        this.print(nameType, node);
      }
      this.tokenChar(93);
      if (optional) {
        tokenIfPlusMinus(this, optional);
        this.tokenChar(63);
      }
      this.tokenChar(58);
      this.space();
      this.print(node.typeAnnotation, node);
      this.space();
      this.tokenChar(125);
    }
    function tokenIfPlusMinus(self2, tok) {
      if (tok !== true) {
        self2.token(tok);
      }
    }
    function TSLiteralType(node) {
      this.print(node.literal, node);
    }
    function TSExpressionWithTypeArguments(node) {
      this.print(node.expression, node);
      this.print(node.typeParameters, node);
    }
    function TSInterfaceDeclaration(node) {
      const {
        declare,
        id,
        typeParameters,
        extends: extendz,
        body
      } = node;
      if (declare) {
        this.word("declare");
        this.space();
      }
      this.word("interface");
      this.space();
      this.print(id, node);
      this.print(typeParameters, node);
      if (extendz != null && extendz.length) {
        this.space();
        this.word("extends");
        this.space();
        this.printList(extendz, node);
      }
      this.space();
      this.print(body, node);
    }
    function TSInterfaceBody(node) {
      this.tsPrintTypeLiteralOrInterfaceBody(node.body, node);
    }
    function TSTypeAliasDeclaration(node) {
      const {
        declare,
        id,
        typeParameters,
        typeAnnotation
      } = node;
      if (declare) {
        this.word("declare");
        this.space();
      }
      this.word("type");
      this.space();
      this.print(id, node);
      this.print(typeParameters, node);
      this.space();
      this.tokenChar(61);
      this.space();
      this.print(typeAnnotation, node);
      this.tokenChar(59);
    }
    function TSAsExpression(node) {
      const {
        expression,
        typeAnnotation
      } = node;
      this.print(expression, node);
      this.space();
      this.word("as");
      this.space();
      this.print(typeAnnotation, node);
    }
    function TSTypeAssertion(node) {
      const {
        typeAnnotation,
        expression
      } = node;
      this.tokenChar(60);
      this.print(typeAnnotation, node);
      this.tokenChar(62);
      this.space();
      this.print(expression, node);
    }
    function TSInstantiationExpression(node) {
      this.print(node.expression, node);
      this.print(node.typeParameters, node);
    }
    function TSEnumDeclaration(node) {
      const {
        declare,
        const: isConst,
        id,
        members
      } = node;
      if (declare) {
        this.word("declare");
        this.space();
      }
      if (isConst) {
        this.word("const");
        this.space();
      }
      this.word("enum");
      this.space();
      this.print(id, node);
      this.space();
      tsPrintBraced(this, members, node);
    }
    function TSEnumMember(node) {
      const {
        id,
        initializer
      } = node;
      this.print(id, node);
      if (initializer) {
        this.space();
        this.tokenChar(61);
        this.space();
        this.print(initializer, node);
      }
      this.tokenChar(44);
    }
    function TSModuleDeclaration(node) {
      const {
        declare,
        id
      } = node;
      if (declare) {
        this.word("declare");
        this.space();
      }
      if (!node.global) {
        this.word(id.type === "Identifier" ? "namespace" : "module");
        this.space();
      }
      this.print(id, node);
      if (!node.body) {
        this.tokenChar(59);
        return;
      }
      let body = node.body;
      while (body.type === "TSModuleDeclaration") {
        this.tokenChar(46);
        this.print(body.id, body);
        body = body.body;
      }
      this.space();
      this.print(body, node);
    }
    function TSModuleBlock(node) {
      tsPrintBraced(this, node.body, node);
    }
    function TSImportType(node) {
      const {
        argument,
        qualifier,
        typeParameters
      } = node;
      this.word("import");
      this.tokenChar(40);
      this.print(argument, node);
      this.tokenChar(41);
      if (qualifier) {
        this.tokenChar(46);
        this.print(qualifier, node);
      }
      if (typeParameters) {
        this.print(typeParameters, node);
      }
    }
    function TSImportEqualsDeclaration(node) {
      const {
        isExport,
        id,
        moduleReference
      } = node;
      if (isExport) {
        this.word("export");
        this.space();
      }
      this.word("import");
      this.space();
      this.print(id, node);
      this.space();
      this.tokenChar(61);
      this.space();
      this.print(moduleReference, node);
      this.tokenChar(59);
    }
    function TSExternalModuleReference(node) {
      this.token("require(");
      this.print(node.expression, node);
      this.tokenChar(41);
    }
    function TSNonNullExpression(node) {
      this.print(node.expression, node);
      this.tokenChar(33);
    }
    function TSExportAssignment(node) {
      this.word("export");
      this.space();
      this.tokenChar(61);
      this.space();
      this.print(node.expression, node);
      this.tokenChar(59);
    }
    function TSNamespaceExportDeclaration(node) {
      this.word("export");
      this.space();
      this.word("as");
      this.space();
      this.word("namespace");
      this.space();
      this.print(node.id, node);
    }
    function tsPrintSignatureDeclarationBase(node) {
      const {
        typeParameters
      } = node;
      const parameters = node.parameters;
      this.print(typeParameters, node);
      this.tokenChar(40);
      this._parameters(parameters, node);
      this.tokenChar(41);
      const returnType = node.typeAnnotation;
      this.print(returnType, node);
    }
    function tsPrintClassMemberModifiers(node) {
      const isField = node.type === "ClassAccessorProperty" || node.type === "ClassProperty";
      if (isField && node.declare) {
        this.word("declare");
        this.space();
      }
      if (node.accessibility) {
        this.word(node.accessibility);
        this.space();
      }
      if (node.static) {
        this.word("static");
        this.space();
      }
      if (node.override) {
        this.word("override");
        this.space();
      }
      if (node.abstract) {
        this.word("abstract");
        this.space();
      }
      if (isField && node.readonly) {
        this.word("readonly");
        this.space();
      }
    }
  }
});

// node_modules/@babel/generator/lib/generators/index.js
var require_generators = __commonJS({
  "node_modules/@babel/generator/lib/generators/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _templateLiterals = require_template_literals();
    Object.keys(_templateLiterals).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports2 && exports2[key] === _templateLiterals[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _templateLiterals[key];
        }
      });
    });
    var _expressions = require_expressions();
    Object.keys(_expressions).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports2 && exports2[key] === _expressions[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _expressions[key];
        }
      });
    });
    var _statements = require_statements();
    Object.keys(_statements).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports2 && exports2[key] === _statements[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _statements[key];
        }
      });
    });
    var _classes = require_classes();
    Object.keys(_classes).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports2 && exports2[key] === _classes[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _classes[key];
        }
      });
    });
    var _methods = require_methods();
    Object.keys(_methods).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports2 && exports2[key] === _methods[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _methods[key];
        }
      });
    });
    var _modules = require_modules();
    Object.keys(_modules).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports2 && exports2[key] === _modules[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _modules[key];
        }
      });
    });
    var _types = require_types();
    Object.keys(_types).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports2 && exports2[key] === _types[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _types[key];
        }
      });
    });
    var _flow = require_flow2();
    Object.keys(_flow).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports2 && exports2[key] === _flow[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _flow[key];
        }
      });
    });
    var _base = require_base();
    Object.keys(_base).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports2 && exports2[key] === _base[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _base[key];
        }
      });
    });
    var _jsx = require_jsx2();
    Object.keys(_jsx).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports2 && exports2[key] === _jsx[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _jsx[key];
        }
      });
    });
    var _typescript = require_typescript2();
    Object.keys(_typescript).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports2 && exports2[key] === _typescript[key])
        return;
      Object.defineProperty(exports2, key, {
        enumerable: true,
        get: function() {
          return _typescript[key];
        }
      });
    });
  }
});

// node_modules/@babel/generator/lib/printer.js
var require_printer = __commonJS({
  "node_modules/@babel/generator/lib/printer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _buffer = require_buffer();
    var n = require_node();
    var generatorFunctions = require_generators();
    var SCIENTIFIC_NOTATION = /e/i;
    var ZERO_DECIMAL_INTEGER = /\.0+$/;
    var NON_DECIMAL_LITERAL = /^0[box]/;
    var PURE_ANNOTATION_RE = /^\s*[@#]__PURE__\s*$/;
    var {
      needsParens,
      needsWhitespaceAfter,
      needsWhitespaceBefore
    } = n;
    var Printer = class {
      constructor(format, map) {
        this.inForStatementInitCounter = 0;
        this._printStack = [];
        this._indent = 0;
        this._indentChar = 0;
        this._indentRepeat = 0;
        this._insideAux = false;
        this._parenPushNewlineState = null;
        this._noLineTerminator = false;
        this._printAuxAfterOnNextUserNode = false;
        this._printedComments = /* @__PURE__ */ new Set();
        this._endsWithInteger = false;
        this._endsWithWord = false;
        this.format = format;
        this._buf = new _buffer.default(map);
        this._indentChar = format.indent.style.charCodeAt(0);
        this._indentRepeat = format.indent.style.length;
      }
      generate(ast) {
        this.print(ast);
        this._maybeAddAuxComment();
        return this._buf.get();
      }
      indent() {
        if (this.format.compact || this.format.concise)
          return;
        this._indent++;
      }
      dedent() {
        if (this.format.compact || this.format.concise)
          return;
        this._indent--;
      }
      semicolon(force = false) {
        this._maybeAddAuxComment();
        if (force) {
          this._appendChar(59);
        } else {
          this._queue(59);
        }
      }
      rightBrace() {
        if (this.format.minified) {
          this._buf.removeLastSemicolon();
        }
        this.tokenChar(125);
      }
      space(force = false) {
        if (this.format.compact)
          return;
        if (force) {
          this._space();
        } else if (this._buf.hasContent()) {
          const lastCp = this.getLastChar();
          if (lastCp !== 32 && lastCp !== 10) {
            this._space();
          }
        }
      }
      word(str) {
        if (this._endsWithWord || str.charCodeAt(0) === 47 && this.endsWith(47)) {
          this._space();
        }
        this._maybeAddAuxComment();
        this._append(str, false);
        this._endsWithWord = true;
      }
      number(str) {
        this.word(str);
        this._endsWithInteger = Number.isInteger(+str) && !NON_DECIMAL_LITERAL.test(str) && !SCIENTIFIC_NOTATION.test(str) && !ZERO_DECIMAL_INTEGER.test(str) && str.charCodeAt(str.length - 1) !== 46;
      }
      token(str, maybeNewline = false) {
        const lastChar = this.getLastChar();
        const strFirst = str.charCodeAt(0);
        if (lastChar === 33 && str === "--" || strFirst === 43 && lastChar === 43 || strFirst === 45 && lastChar === 45 || strFirst === 46 && this._endsWithInteger) {
          this._space();
        }
        this._maybeAddAuxComment();
        this._append(str, maybeNewline);
      }
      tokenChar(char) {
        const lastChar = this.getLastChar();
        if (char === 43 && lastChar === 43 || char === 45 && lastChar === 45 || char === 46 && this._endsWithInteger) {
          this._space();
        }
        this._maybeAddAuxComment();
        this._appendChar(char);
      }
      newline(i = 1) {
        if (this.format.retainLines || this.format.compact)
          return;
        if (this.format.concise) {
          this.space();
          return;
        }
        const charBeforeNewline = this.endsWithCharAndNewline();
        if (charBeforeNewline === 10)
          return;
        if (charBeforeNewline === 123 || charBeforeNewline === 58) {
          i--;
        }
        if (i <= 0)
          return;
        for (let j = 0; j < i; j++) {
          this._newline();
        }
      }
      endsWith(char) {
        return this.getLastChar() === char;
      }
      getLastChar() {
        return this._buf.getLastChar();
      }
      endsWithCharAndNewline() {
        return this._buf.endsWithCharAndNewline();
      }
      removeTrailingNewline() {
        this._buf.removeTrailingNewline();
      }
      exactSource(loc, cb) {
        this._catchUp("start", loc);
        this._buf.exactSource(loc, cb);
      }
      source(prop, loc) {
        this._catchUp(prop, loc);
        this._buf.source(prop, loc);
      }
      withSource(prop, loc, cb) {
        this._catchUp(prop, loc);
        this._buf.withSource(prop, loc, cb);
      }
      _space() {
        this._queue(32);
      }
      _newline() {
        this._queue(10);
      }
      _append(str, maybeNewline) {
        this._maybeAddParen(str);
        this._maybeIndent(str.charCodeAt(0));
        this._buf.append(str, maybeNewline);
        this._endsWithWord = false;
        this._endsWithInteger = false;
      }
      _appendChar(char) {
        this._maybeAddParenChar(char);
        this._maybeIndent(char);
        this._buf.appendChar(char);
        this._endsWithWord = false;
        this._endsWithInteger = false;
      }
      _queue(char) {
        this._maybeAddParenChar(char);
        this._maybeIndent(char);
        this._buf.queue(char);
        this._endsWithWord = false;
        this._endsWithInteger = false;
      }
      _maybeIndent(firstChar) {
        if (this._indent && firstChar !== 10 && this.endsWith(10)) {
          this._buf.queueIndentation(this._indentChar, this._getIndent());
        }
      }
      _maybeAddParenChar(char) {
        const parenPushNewlineState = this._parenPushNewlineState;
        if (!parenPushNewlineState)
          return;
        if (char === 32) {
          return;
        }
        if (char !== 10) {
          this._parenPushNewlineState = null;
          return;
        }
        this.tokenChar(40);
        this.indent();
        parenPushNewlineState.printed = true;
      }
      _maybeAddParen(str) {
        const parenPushNewlineState = this._parenPushNewlineState;
        if (!parenPushNewlineState)
          return;
        const len = str.length;
        let i;
        for (i = 0; i < len && str.charCodeAt(i) === 32; i++)
          continue;
        if (i === len) {
          return;
        }
        const cha = str.charCodeAt(i);
        if (cha !== 10) {
          if (cha !== 47 || i + 1 === len) {
            this._parenPushNewlineState = null;
            return;
          }
          const chaPost = str.charCodeAt(i + 1);
          if (chaPost === 42) {
            if (PURE_ANNOTATION_RE.test(str.slice(i + 2, len - 2))) {
              return;
            }
          } else if (chaPost !== 47) {
            this._parenPushNewlineState = null;
            return;
          }
        }
        this.tokenChar(40);
        this.indent();
        parenPushNewlineState.printed = true;
      }
      _catchUp(prop, loc) {
        if (!this.format.retainLines)
          return;
        const pos = loc ? loc[prop] : null;
        if ((pos == null ? void 0 : pos.line) != null) {
          const count = pos.line - this._buf.getCurrentLine();
          for (let i = 0; i < count; i++) {
            this._newline();
          }
        }
      }
      _getIndent() {
        return this._indentRepeat * this._indent;
      }
      printTerminatorless(node, parent, isLabel) {
        if (isLabel) {
          this._noLineTerminator = true;
          this.print(node, parent);
          this._noLineTerminator = false;
        } else {
          const terminatorState = {
            printed: false
          };
          this._parenPushNewlineState = terminatorState;
          this.print(node, parent);
          if (terminatorState.printed) {
            this.dedent();
            this.newline();
            this.tokenChar(41);
          }
        }
      }
      print(node, parent, noLineTerminator) {
        if (!node)
          return;
        const nodeType = node.type;
        const format = this.format;
        const oldConcise = format.concise;
        if (node._compact) {
          format.concise = true;
        }
        const printMethod = this[nodeType];
        if (printMethod === void 0) {
          throw new ReferenceError(`unknown node of type ${JSON.stringify(nodeType)} with constructor ${JSON.stringify(node.constructor.name)}`);
        }
        this._printStack.push(node);
        const oldInAux = this._insideAux;
        this._insideAux = node.loc == void 0;
        this._maybeAddAuxComment(this._insideAux && !oldInAux);
        let shouldPrintParens;
        if (format.retainFunctionParens && nodeType === "FunctionExpression" && node.extra && node.extra.parenthesized) {
          shouldPrintParens = true;
        } else {
          shouldPrintParens = needsParens(node, parent, this._printStack);
        }
        if (shouldPrintParens)
          this.tokenChar(40);
        this._printLeadingComments(node);
        const loc = nodeType === "Program" || nodeType === "File" ? null : node.loc;
        this.withSource("start", loc, printMethod.bind(this, node, parent));
        if (noLineTerminator && !this._noLineTerminator) {
          this._noLineTerminator = true;
          this._printTrailingComments(node);
          this._noLineTerminator = false;
        } else {
          this._printTrailingComments(node);
        }
        if (shouldPrintParens)
          this.tokenChar(41);
        this._printStack.pop();
        format.concise = oldConcise;
        this._insideAux = oldInAux;
      }
      _maybeAddAuxComment(enteredPositionlessNode) {
        if (enteredPositionlessNode)
          this._printAuxBeforeComment();
        if (!this._insideAux)
          this._printAuxAfterComment();
      }
      _printAuxBeforeComment() {
        if (this._printAuxAfterOnNextUserNode)
          return;
        this._printAuxAfterOnNextUserNode = true;
        const comment = this.format.auxiliaryCommentBefore;
        if (comment) {
          this._printComment({
            type: "CommentBlock",
            value: comment
          });
        }
      }
      _printAuxAfterComment() {
        if (!this._printAuxAfterOnNextUserNode)
          return;
        this._printAuxAfterOnNextUserNode = false;
        const comment = this.format.auxiliaryCommentAfter;
        if (comment) {
          this._printComment({
            type: "CommentBlock",
            value: comment
          });
        }
      }
      getPossibleRaw(node) {
        const extra = node.extra;
        if (extra && extra.raw != null && extra.rawValue != null && node.value === extra.rawValue) {
          return extra.raw;
        }
      }
      printJoin(nodes, parent, opts = {}) {
        if (!(nodes != null && nodes.length))
          return;
        if (opts.indent)
          this.indent();
        const newlineOpts = {
          addNewlines: opts.addNewlines
        };
        const len = nodes.length;
        for (let i = 0; i < len; i++) {
          const node = nodes[i];
          if (!node)
            continue;
          if (opts.statement)
            this._printNewline(true, node, parent, newlineOpts);
          this.print(node, parent);
          if (opts.iterator) {
            opts.iterator(node, i);
          }
          if (opts.separator && i < len - 1) {
            opts.separator.call(this);
          }
          if (opts.statement)
            this._printNewline(false, node, parent, newlineOpts);
        }
        if (opts.indent)
          this.dedent();
      }
      printAndIndentOnComments(node, parent) {
        const indent = node.leadingComments && node.leadingComments.length > 0;
        if (indent)
          this.indent();
        this.print(node, parent);
        if (indent)
          this.dedent();
      }
      printBlock(parent) {
        const node = parent.body;
        if (node.type !== "EmptyStatement") {
          this.space();
        }
        this.print(node, parent);
      }
      _printTrailingComments(node) {
        this._printComments(this._getComments(false, node));
      }
      _printLeadingComments(node) {
        this._printComments(this._getComments(true, node), true);
      }
      printInnerComments(node, indent = true) {
        var _node$innerComments;
        if (!((_node$innerComments = node.innerComments) != null && _node$innerComments.length))
          return;
        if (indent)
          this.indent();
        this._printComments(node.innerComments);
        if (indent)
          this.dedent();
      }
      printSequence(nodes, parent, opts = {}) {
        opts.statement = true;
        return this.printJoin(nodes, parent, opts);
      }
      printList(items, parent, opts = {}) {
        if (opts.separator == null) {
          opts.separator = commaSeparator;
        }
        return this.printJoin(items, parent, opts);
      }
      _printNewline(leading, node, parent, opts) {
        if (this.format.retainLines || this.format.compact)
          return;
        if (this.format.concise) {
          this.space();
          return;
        }
        let lines = 0;
        if (this._buf.hasContent()) {
          if (!leading)
            lines++;
          if (opts.addNewlines)
            lines += opts.addNewlines(leading, node) || 0;
          const needs = leading ? needsWhitespaceBefore : needsWhitespaceAfter;
          if (needs(node, parent))
            lines++;
        }
        this.newline(Math.min(2, lines));
      }
      _getComments(leading, node) {
        return node && (leading ? node.leadingComments : node.trailingComments) || null;
      }
      _printComment(comment, skipNewLines) {
        if (comment.ignore)
          return;
        if (this._printedComments.has(comment))
          return;
        if (!this.format.shouldPrintComment(comment.value))
          return;
        this._printedComments.add(comment);
        const isBlockComment = comment.type === "CommentBlock";
        const printNewLines = isBlockComment && !skipNewLines && !this._noLineTerminator;
        if (printNewLines && this._buf.hasContent())
          this.newline(1);
        const lastCharCode = this.getLastChar();
        if (lastCharCode !== 91 && lastCharCode !== 123) {
          this.space();
        }
        let val;
        let maybeNewline = false;
        if (isBlockComment) {
          val = `/*${comment.value}*/`;
          if (this.format.indent.adjustMultilineComment) {
            var _comment$loc;
            const offset = (_comment$loc = comment.loc) == null ? void 0 : _comment$loc.start.column;
            if (offset) {
              const newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
              val = val.replace(newlineRegex, "\n");
            }
            const indentSize = Math.max(this._getIndent(), this.format.retainLines ? 0 : this._buf.getCurrentColumn());
            val = val.replace(/\n(?!$)/g, `
${" ".repeat(indentSize)}`);
            maybeNewline = true;
          }
        } else if (!this._noLineTerminator) {
          val = `//${comment.value}
`;
          maybeNewline = true;
        } else {
          val = `/*${comment.value}*/`;
        }
        if (this.endsWith(47))
          this._space();
        this.withSource("start", comment.loc, this._append.bind(this, val, maybeNewline));
        if (printNewLines)
          this.newline(1);
      }
      _printComments(comments, inlinePureAnnotation) {
        if (!(comments != null && comments.length))
          return;
        if (inlinePureAnnotation && comments.length === 1 && PURE_ANNOTATION_RE.test(comments[0].value)) {
          this._printComment(comments[0], this._buf.hasContent() && !this.endsWith(10));
        } else {
          for (const comment of comments) {
            this._printComment(comment);
          }
        }
      }
      printAssertions(node) {
        var _node$assertions;
        if ((_node$assertions = node.assertions) != null && _node$assertions.length) {
          this.space();
          this.word("assert");
          this.space();
          this.tokenChar(123);
          this.space();
          this.printList(node.assertions, node);
          this.space();
          this.tokenChar(125);
        }
      }
    };
    Object.assign(Printer.prototype, generatorFunctions);
    {
      Printer.prototype.Noop = function Noop() {
      };
    }
    var _default = Printer;
    exports2.default = _default;
    function commaSeparator() {
      this.tokenChar(44);
      this.space();
    }
  }
});

// node_modules/@babel/generator/lib/index.js
var require_lib4 = __commonJS({
  "node_modules/@babel/generator/lib/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.CodeGenerator = void 0;
    exports2.default = generate2;
    var _sourceMap = require_source_map();
    var _printer = require_printer();
    var Generator = class extends _printer.default {
      constructor(ast, opts = {}, code) {
        const format = normalizeOptions(code, opts);
        const map = opts.sourceMaps ? new _sourceMap.default(opts, code) : null;
        super(format, map);
        this.ast = void 0;
        this.ast = ast;
      }
      generate() {
        return super.generate(this.ast);
      }
    };
    function normalizeOptions(code, opts) {
      const format = {
        auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
        auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
        shouldPrintComment: opts.shouldPrintComment,
        retainLines: opts.retainLines,
        retainFunctionParens: opts.retainFunctionParens,
        comments: opts.comments == null || opts.comments,
        compact: opts.compact,
        minified: opts.minified,
        concise: opts.concise,
        indent: {
          adjustMultilineComment: true,
          style: "  ",
          base: 0
        },
        jsescOption: Object.assign({
          quotes: "double",
          wrap: true,
          minimal: false
        }, opts.jsescOption),
        recordAndTupleSyntaxType: opts.recordAndTupleSyntaxType,
        topicToken: opts.topicToken
      };
      {
        format.decoratorsBeforeExport = !!opts.decoratorsBeforeExport;
        format.jsonCompatibleStrings = opts.jsonCompatibleStrings;
      }
      if (format.minified) {
        format.compact = true;
        format.shouldPrintComment = format.shouldPrintComment || (() => format.comments);
      } else {
        format.shouldPrintComment = format.shouldPrintComment || ((value) => format.comments || value.includes("@license") || value.includes("@preserve"));
      }
      if (format.compact === "auto") {
        format.compact = code.length > 5e5;
        if (format.compact) {
          console.error(`[BABEL] Note: The code generator has deoptimised the styling of ${opts.filename} as it exceeds the max of ${"500KB"}.`);
        }
      }
      if (format.compact) {
        format.indent.adjustMultilineComment = false;
      }
      return format;
    }
    var CodeGenerator = class {
      constructor(ast, opts, code) {
        this._generator = void 0;
        this._generator = new Generator(ast, opts, code);
      }
      generate() {
        return this._generator.generate();
      }
    };
    exports2.CodeGenerator = CodeGenerator;
    function generate2(ast, opts, code) {
      const gen = new Generator(ast, opts, code);
      return gen.generate();
    }
  }
});

// jce.js
var require_jce = __commonJS({
  "jce.js"(exports2, module2) {
    "use strict";
    var jce = function() {
      var o = function(k, v, o2, l) {
        for (o2 = o2 || {}, l = k.length; l--; o2[k[l]] = v)
          ;
        return o2;
      }, $V0 = [8, 10], $V1 = [1, 20], $V2 = [1, 19], $V3 = [1, 18], $V4 = [1, 14], $V5 = [14, 21, 25, 33, 45], $V6 = [1, 30], $V7 = [1, 29], $V8 = [1, 31], $V9 = [1, 32], $Va = [11, 29, 42], $Vb = [1, 47], $Vc = [1, 50], $Vd = [1, 54], $Ve = [14, 30], $Vf = [11, 14], $Vg = [11, 14, 29], $Vh = [1, 71], $Vi = [1, 70], $Vj = [1, 72], $Vk = [1, 73], $Vl = [11, 14, 15, 29], $Vm = [11, 39, 40, 43, 50, 53], $Vn = [11, 29, 39, 40, 43, 50, 53];
      var parser2 = {
        trace: function trace() {
        },
        yy: {},
        symbols_: { "error": 2, "jce": 3, "deplist": 4, "expressions": 5, "EOF": 6, "dep": 7, "INCLUDE": 8, "STRING_LITERAL": 9, "MODULE": 10, "IDENTIFIER": 11, "LEFT": 12, "structlist": 13, "RIGHT": 14, "SEMI": 15, "interface": 16, "def": 17, "struct": 18, "enum": 19, "statement": 20, "CONST": 21, "t": 22, "EQUAL": 23, "value": 24, "ENUM": 25, "enumitems": 26, "enumitem": 27, "enumitemDef": 28, "COMMA": 29, "NUMBER": 30, "HEX": 31, "UMINUS": 32, "STRUCT": 33, "itemlist": 34, "items": 35, "item": 36, "REQUIRED": 37, "propertyName": 38, "TYPE": 39, "VECTOR": 40, "OPEN": 41, "CLOSE": 42, "MAP": 43, "DOUBLE_COLON": 44, "INTERFACE": 45, "methodlist": 46, "method": 47, "LEFT_QUOTE": 48, "args": 49, "RIGHT_QUOTE": 50, "argc": 51, "arg": 52, "OUT": 53, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 6: "EOF", 8: "INCLUDE", 9: "STRING_LITERAL", 10: "MODULE", 11: "IDENTIFIER", 12: "LEFT", 14: "RIGHT", 15: "SEMI", 21: "CONST", 23: "EQUAL", 25: "ENUM", 29: "COMMA", 30: "NUMBER", 31: "HEX", 32: "UMINUS", 33: "STRUCT", 37: "REQUIRED", 39: "TYPE", 40: "VECTOR", 41: "OPEN", 42: "CLOSE", 43: "MAP", 44: "DOUBLE_COLON", 45: "INTERFACE", 48: "LEFT_QUOTE", 50: "RIGHT_QUOTE", 53: "OUT" },
        productions_: [0, [3, 3], [4, 0], [4, 2], [7, 2], [5, 6], [5, 7], [5, 6], [13, 1], [13, 2], [17, 1], [17, 1], [17, 1], [20, 6], [19, 6], [26, 1], [26, 2], [27, 1], [27, 2], [28, 1], [28, 3], [24, 1], [24, 1], [24, 1], [24, 2], [18, 3], [34, 4], [35, 1], [35, 2], [36, 5], [38, 1], [38, 4], [38, 3], [38, 3], [38, 3], [22, 1], [22, 1], [22, 4], [22, 6], [22, 3], [16, 6], [46, 1], [46, 2], [47, 6], [49, 0], [49, 2], [51, 2], [51, 1], [52, 2], [52, 3]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
          var $0 = $$.length - 1;
          switch (yystate) {
            case 1:
              return {
                deps: $$[$0 - 2],
                module: $$[$0 - 1]
              };
              break;
            case 2:
            case 44:
              this.$ = [];
              break;
            case 3:
            case 9:
              this.$ = $$[$0 - 1].concat($$[$0]);
              break;
            case 4:
              {
                const fileName = $$[$0].replace(/^"/, "").replace(/"$/, "");
                this.$ = [fileName];
              }
              break;
            case 5:
              this.$ = t2.tsModuleDeclaration(
                t2.identifier($$[$0 - 4]),
                t2.tsModuleBlock($$[$0 - 2])
              );
              break;
            case 6:
              $$[$0 - 3].push($$[$0 - 2]);
              this.$ = t2.tsModuleDeclaration(
                t2.identifier($$[$0 - 5]),
                t2.tsModuleBlock($$[$0 - 3])
              );
              break;
            case 7:
              this.$ = t2.tsModuleDeclaration(
                t2.identifier($$[$0 - 4]),
                t2.tsModuleBlock([$$[$0 - 2]])
              );
              break;
            case 8:
            case 15:
            case 27:
            case 41:
              this.$ = [$$[$0]];
              break;
            case 10:
            case 11:
            case 12:
            case 17:
            case 47:
              this.$ = $$[$0];
              break;
            case 13:
              {
                const id = t2.identifier($$[$0 - 3]);
                const init = $$[$0 - 1];
                this.$ = t2.variableDeclaration("const", [t2.variableDeclarator(id, init)]);
              }
              break;
            case 14:
              {
                this.$ = t2.tsEnumDeclaration(
                  t2.identifier($$[$0 - 4]),
                  $$[$0 - 2]
                );
              }
              break;
            case 16:
              this.$ = $$[$0 - 1].concat($$[$0]);
              break;
            case 18:
            case 46:
              this.$ = $$[$0 - 1];
              break;
            case 19:
              this.$ = t2.tsEnumMember(t2.identifier($$[$0]));
              break;
            case 20:
              {
                const value = Number($$[$0]);
                this.$ = t2.tsEnumMember(t2.identifier($$[$0 - 2]), $$[$0]);
              }
              break;
            case 21:
              {
                this.$ = t2.numericLiteral(Number($$[$0]));
              }
              break;
            case 22:
              {
                const s = String($$[$0]).replace(/^"/, "").replace(/"$/, "");
                this.$ = t2.stringLiteral(s);
              }
              break;
            case 23:
              this.$ = t2.numericLiteral(Number($$[$0]));
              break;
            case 24:
              {
                const value = -Number($$[$0]);
                this.$ = t2.numericLiteral(value);
              }
              break;
            case 25:
              this.$ = t2.tsInterfaceDeclaration(
                t2.identifier($$[$0 - 1]),
                void 0,
                void 0,
                t2.tsInterfaceBody($$[$0])
              );
              break;
            case 26:
            case 32:
            case 33:
            case 34:
              this.$ = $$[$0 - 2];
              break;
            case 28:
              this.$ = $$[$0 - 1].concat($$[$0]);
              break;
            case 29:
              {
                const node = t2.tsPropertySignature(
                  t2.identifier($$[$0 - 1]),
                  t2.tsTypeAnnotation($$[$0 - 2])
                );
                if ($$[$0 - 3] === "optional") {
                  node.optional = true;
                }
                this.$ = node;
              }
              break;
            case 30:
              this.$ = $$[$0];
              break;
            case 31:
              this.$ = $$[$0 - 3];
              break;
            case 35:
              if ($$[$0] === "bool") {
                this.$ = t2.tsBooleanKeyword();
              } else if ($$[$0] === "int") {
                this.$ = t2.tsNumberKeyword();
              } else {
                this.$ = t2.tsStringKeyword();
              }
              break;
            case 36:
              this.$ = t2.tsTypeReference(t2.identifier($$[$0]));
              break;
            case 37:
              this.$ = t2.tsTypeReference(
                t2.identifier("Array"),
                t2.tsTypeParameterInstantiation([
                  $$[$0 - 1]
                ])
              );
              break;
            case 38:
              if ($$[$0 - 3].type === "TSTypeReference") {
                this.$ = t2.tsTypeReference(
                  t2.identifier("Map"),
                  t2.tsTypeParameterInstantiation([
                    $$[$0 - 3],
                    $$[$0 - 1]
                  ])
                );
              } else {
                this.$ = t2.tsTypeReference(
                  t2.identifier("Record"),
                  t2.tsTypeParameterInstantiation([
                    $$[$0 - 3],
                    $$[$0 - 1]
                  ])
                );
              }
              break;
            case 39:
              const left = t2.identifier($$[$0 - 2]);
              const right = t2.identifier($$[$0]);
              this.$ = t2.tsTypeReference(t2.tsQualifiedName(left, right));
              break;
            case 40:
              this.$ = t2.tsInterfaceDeclaration(
                t2.identifier($$[$0 - 4]),
                void 0,
                void 0,
                t2.tsInterfaceBody($$[$0 - 2])
              );
              break;
            case 42:
              this.$ = $$[$0].concat($$[$0 - 1]);
              break;
            case 43:
              {
                const typeParameters = null;
                const inputArgs = $$[$0 - 2].filter((o2) => o2.out === false);
                const parameters = inputArgs.map((o2) => {
                  const p = t2.identifier(o2.name);
                  p.typeAnnotation = t2.tsTypeAnnotation(o2.type);
                  return p;
                });
                const out = $$[$0 - 2].find((o2) => o2.out === true);
                let typeAnnotation;
                if (out) {
                  typeAnnotation = t2.tsTypeAnnotation(out.type);
                } else {
                  typeAnnotation = t2.tsTypeAnnotation(t2.tsTypeReference(t2.identifier("void")));
                }
                this.$ = t2.tsPropertySignature(
                  t2.identifier($$[$0 - 4]),
                  t2.tsTypeAnnotation(
                    t2.tsFunctionType(
                      typeParameters,
                      parameters,
                      typeAnnotation
                    )
                  )
                );
              }
              break;
            case 45:
              this.$ = $$[$0 - 1].concat($$[$0]);
              break;
            case 48:
              this.$ = {
                name: $$[$0],
                type: $$[$0 - 1],
                out: false
              };
              break;
            case 49:
              this.$ = {
                name: $$[$0],
                type: t2.tsTypeReference(t2.identifier("Promise"), t2.tsTypeParameterInstantiation([$$[$0 - 1]])),
                out: true
              };
              break;
          }
        },
        table: [o($V0, [2, 2], { 3: 1, 4: 2 }), { 1: [3] }, { 5: 3, 7: 4, 8: [1, 6], 10: [1, 5] }, { 6: [1, 7] }, o($V0, [2, 3]), { 11: [1, 8] }, { 9: [1, 9] }, { 1: [2, 1] }, { 12: [1, 10] }, o($V0, [2, 4]), { 13: 11, 16: 12, 17: 13, 18: 15, 19: 16, 20: 17, 21: $V1, 25: $V2, 33: $V3, 45: $V4 }, { 14: [1, 21], 16: 22, 17: 23, 18: 15, 19: 16, 20: 17, 21: $V1, 25: $V2, 33: $V3, 45: $V4 }, { 14: [1, 24] }, o($V5, [2, 8]), { 11: [1, 25] }, o($V5, [2, 10]), o($V5, [2, 11]), o($V5, [2, 12]), { 11: [1, 26] }, { 11: [1, 27] }, { 11: $V6, 22: 28, 39: $V7, 40: $V8, 43: $V9 }, { 15: [1, 33] }, { 14: [1, 34] }, o($V5, [2, 9]), { 15: [1, 35] }, { 12: [1, 36] }, { 12: [1, 38], 34: 37 }, { 12: [1, 39] }, { 11: [1, 40] }, o($Va, [2, 35]), o($Va, [2, 36], { 44: [1, 41] }), { 41: [1, 42] }, { 41: [1, 43] }, { 6: [2, 5] }, { 15: [1, 44] }, { 6: [2, 7] }, { 39: $Vb, 46: 45, 47: 46 }, o($V5, [2, 25]), { 30: $Vc, 35: 48, 36: 49 }, { 11: $Vd, 26: 51, 27: 52, 28: 53 }, { 23: [1, 55] }, { 11: [1, 56] }, { 11: $V6, 22: 57, 39: $V7, 40: $V8, 43: $V9 }, { 11: $V6, 22: 58, 39: $V7, 40: $V8, 43: $V9 }, { 6: [2, 6] }, { 14: [1, 59] }, { 14: [2, 41], 39: $Vb, 46: 60, 47: 46 }, { 11: [1, 61] }, { 14: [1, 62], 30: $Vc, 36: 63 }, o($Ve, [2, 27]), { 37: [1, 64] }, { 11: $Vd, 14: [1, 65], 27: 66, 28: 53 }, o($Vf, [2, 15]), o($Vf, [2, 17], { 29: [1, 67] }), o($Vg, [2, 19], { 23: [1, 68] }), { 9: $Vh, 24: 69, 30: $Vi, 31: $Vj, 32: $Vk }, o($Va, [2, 39]), { 42: [1, 74] }, { 29: [1, 75] }, { 15: [1, 76] }, { 14: [2, 42] }, { 48: [1, 77] }, { 15: [1, 78] }, o($Ve, [2, 28]), { 11: $V6, 22: 79, 39: $V7, 40: $V8, 43: $V9 }, { 15: [1, 80] }, o($Vf, [2, 16]), o($Vf, [2, 18]), { 9: $Vh, 24: 81, 30: $Vi, 31: $Vj, 32: $Vk }, { 15: [1, 82] }, o($Vl, [2, 21]), o($Vl, [2, 22]), o($Vl, [2, 23]), { 30: [1, 83] }, o($Va, [2, 37]), { 11: $V6, 22: 84, 39: $V7, 40: $V8, 43: $V9 }, { 14: [2, 40] }, o($Vm, [2, 44], { 49: 85 }), o($V5, [2, 26]), { 11: [1, 87], 38: 86 }, o($V5, [2, 14]), o($Vg, [2, 20]), o($V5, [2, 13]), o($Vl, [2, 24]), { 42: [1, 88] }, { 11: $V6, 22: 92, 39: $V7, 40: $V8, 43: $V9, 50: [1, 89], 51: 90, 52: 91, 53: [1, 93] }, { 15: [1, 94] }, { 15: [2, 30], 23: [1, 95] }, o($Va, [2, 38]), { 15: [1, 96] }, o($Vm, [2, 45]), o($Vm, [2, 47], { 29: [1, 97] }), { 11: [1, 98] }, { 11: $V6, 22: 99, 39: $V7, 40: $V8, 43: $V9 }, o($Ve, [2, 29]), { 9: [1, 103], 11: [1, 102], 30: [1, 101], 32: [1, 100] }, o([14, 39], [2, 43]), o($Vm, [2, 46]), o($Vn, [2, 48]), { 11: [1, 104] }, { 30: [1, 105] }, { 15: [2, 32] }, { 15: [2, 33] }, { 15: [2, 34] }, o($Vn, [2, 49]), { 15: [2, 31] }],
        defaultActions: { 7: [2, 1], 33: [2, 5], 35: [2, 7], 44: [2, 6], 60: [2, 42], 76: [2, 40], 101: [2, 32], 102: [2, 33], 103: [2, 34], 105: [2, 31] },
        parseError: function parseError(str, hash) {
          if (hash.recoverable) {
            this.trace(str);
          } else {
            var error = new Error(str);
            error.hash = hash;
            throw error;
          }
        },
        parse: function parse(input) {
          var self2 = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
          var args2 = lstack.slice.call(arguments, 1);
          var lexer2 = Object.create(this.lexer);
          var sharedState = { yy: {} };
          for (var k in this.yy) {
            if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
              sharedState.yy[k] = this.yy[k];
            }
          }
          lexer2.setInput(input, sharedState.yy);
          sharedState.yy.lexer = lexer2;
          sharedState.yy.parser = this;
          if (typeof lexer2.yylloc == "undefined") {
            lexer2.yylloc = {};
          }
          var yyloc = lexer2.yylloc;
          lstack.push(yyloc);
          var ranges = lexer2.options && lexer2.options.ranges;
          if (typeof sharedState.yy.parseError === "function") {
            this.parseError = sharedState.yy.parseError;
          } else {
            this.parseError = Object.getPrototypeOf(this).parseError;
          }
          function popStack(n) {
            stack.length = stack.length - 2 * n;
            vstack.length = vstack.length - n;
            lstack.length = lstack.length - n;
          }
          _token_stack:
            var lex = function() {
              var token;
              token = lexer2.lex() || EOF;
              if (typeof token !== "number") {
                token = self2.symbols_[token] || token;
              }
              return token;
            };
          var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
          while (true) {
            state = stack[stack.length - 1];
            if (this.defaultActions[state]) {
              action = this.defaultActions[state];
            } else {
              if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
              }
              action = table[state] && table[state][symbol];
            }
            if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              expected = [];
              for (p in table[state]) {
                if (this.terminals_[p] && p > TERROR) {
                  expected.push("'" + this.terminals_[p] + "'");
                }
              }
              if (lexer2.showPosition) {
                errStr = "Parse error on line " + (yylineno + 1) + ":\n" + lexer2.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
              } else {
                errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
              }
              this.parseError(errStr, {
                text: lexer2.match,
                token: this.terminals_[symbol] || symbol,
                line: lexer2.yylineno,
                loc: yyloc,
                expected
              });
            }
            if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
            }
            switch (action[0]) {
              case 1:
                stack.push(symbol);
                vstack.push(lexer2.yytext);
                lstack.push(lexer2.yylloc);
                stack.push(action[1]);
                symbol = null;
                if (!preErrorSymbol) {
                  yyleng = lexer2.yyleng;
                  yytext = lexer2.yytext;
                  yylineno = lexer2.yylineno;
                  yyloc = lexer2.yylloc;
                  if (recovering > 0) {
                    recovering--;
                  }
                } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null;
                }
                break;
              case 2:
                len = this.productions_[action[1]][1];
                yyval.$ = vstack[vstack.length - len];
                yyval._$ = {
                  first_line: lstack[lstack.length - (len || 1)].first_line,
                  last_line: lstack[lstack.length - 1].last_line,
                  first_column: lstack[lstack.length - (len || 1)].first_column,
                  last_column: lstack[lstack.length - 1].last_column
                };
                if (ranges) {
                  yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                  ];
                }
                r = this.performAction.apply(yyval, [
                  yytext,
                  yyleng,
                  yylineno,
                  sharedState.yy,
                  action[1],
                  vstack,
                  lstack
                ].concat(args2));
                if (typeof r !== "undefined") {
                  return r;
                }
                if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
                }
                stack.push(this.productions_[action[1]][0]);
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                stack.push(newState);
                break;
              case 3:
                return true;
            }
          }
          return true;
        }
      };
      const t2 = require_lib3();
      var lexer = function() {
        var lexer2 = {
          EOF: 1,
          parseError: function parseError(str, hash) {
            if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
            } else {
              throw new Error(str);
            }
          },
          setInput: function(input, yy) {
            this.yy = yy || this.yy || {};
            this._input = input;
            this._more = this._backtrack = this.done = false;
            this.yylineno = this.yyleng = 0;
            this.yytext = this.matched = this.match = "";
            this.conditionStack = ["INITIAL"];
            this.yylloc = {
              first_line: 1,
              first_column: 0,
              last_line: 1,
              last_column: 0
            };
            if (this.options.ranges) {
              this.yylloc.range = [0, 0];
            }
            this.offset = 0;
            return this;
          },
          input: function() {
            var ch = this._input[0];
            this.yytext += ch;
            this.yyleng++;
            this.offset++;
            this.match += ch;
            this.matched += ch;
            var lines = ch.match(/(?:\r\n?|\n).*/g);
            if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
            } else {
              this.yylloc.last_column++;
            }
            if (this.options.ranges) {
              this.yylloc.range[1]++;
            }
            this._input = this._input.slice(1);
            return ch;
          },
          unput: function(ch) {
            var len = ch.length;
            var lines = ch.split(/(?:\r\n?|\n)/g);
            this._input = ch + this._input;
            this.yytext = this.yytext.substr(0, this.yytext.length - len);
            this.offset -= len;
            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1);
            this.matched = this.matched.substr(0, this.matched.length - 1);
            if (lines.length - 1) {
              this.yylineno -= lines.length - 1;
            }
            var r = this.yylloc.range;
            this.yylloc = {
              first_line: this.yylloc.first_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.first_column,
              last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
            };
            if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len];
            }
            this.yyleng = this.yytext.length;
            return this;
          },
          more: function() {
            this._more = true;
            return this;
          },
          reject: function() {
            if (this.options.backtrack_lexer) {
              this._backtrack = true;
            } else {
              return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
              });
            }
            return this;
          },
          less: function(n) {
            this.unput(this.match.slice(n));
          },
          pastInput: function() {
            var past = this.matched.substr(0, this.matched.length - this.match.length);
            return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
          },
          upcomingInput: function() {
            var next = this.match;
            if (next.length < 20) {
              next += this._input.substr(0, 20 - next.length);
            }
            return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
          },
          showPosition: function() {
            var pre = this.pastInput();
            var c = new Array(pre.length + 1).join("-");
            return pre + this.upcomingInput() + "\n" + c + "^";
          },
          test_match: function(match, indexed_rule) {
            var token, lines, backup;
            if (this.options.backtrack_lexer) {
              backup = {
                yylineno: this.yylineno,
                yylloc: {
                  first_line: this.yylloc.first_line,
                  last_line: this.last_line,
                  first_column: this.yylloc.first_column,
                  last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
              };
              if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
              }
            }
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) {
              this.yylineno += lines.length;
            }
            this.yylloc = {
              first_line: this.yylloc.last_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.last_column,
              last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
            };
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
              this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._backtrack = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
            if (this.done && this._input) {
              this.done = false;
            }
            if (token) {
              return token;
            } else if (this._backtrack) {
              for (var k in backup) {
                this[k] = backup[k];
              }
              return false;
            }
            return false;
          },
          next: function() {
            if (this.done) {
              return this.EOF;
            }
            if (!this._input) {
              this.done = true;
            }
            var token, match, tempMatch, index;
            if (!this._more) {
              this.yytext = "";
              this.match = "";
            }
            var rules = this._currentRules();
            for (var i = 0; i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                  token = this.test_match(tempMatch, rules[i]);
                  if (token !== false) {
                    return token;
                  } else if (this._backtrack) {
                    match = false;
                    continue;
                  } else {
                    return false;
                  }
                } else if (!this.options.flex) {
                  break;
                }
              }
            }
            if (match) {
              token = this.test_match(match, rules[index]);
              if (token !== false) {
                return token;
              }
              return false;
            }
            if (this._input === "") {
              return this.EOF;
            } else {
              return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
              });
            }
          },
          lex: function lex() {
            var r = this.next();
            if (r) {
              return r;
            } else {
              return this.lex();
            }
          },
          begin: function begin(condition) {
            this.conditionStack.push(condition);
          },
          popState: function popState() {
            var n = this.conditionStack.length - 1;
            if (n > 0) {
              return this.conditionStack.pop();
            } else {
              return this.conditionStack[0];
            }
          },
          _currentRules: function _currentRules() {
            if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
              return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
            } else {
              return this.conditions["INITIAL"].rules;
            }
          },
          topState: function topState(n) {
            n = this.conditionStack.length - 1 - Math.abs(n || 0);
            if (n >= 0) {
              return this.conditionStack[n];
            } else {
              return "INITIAL";
            }
          },
          pushState: function pushState(condition) {
            this.begin(condition);
          },
          stateStackSize: function stateStackSize() {
            return this.conditionStack.length;
          },
          options: {},
          performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
            var YYSTATE = YY_START;
            switch ($avoiding_name_collisions) {
              case 0:
                break;
              case 1:
                break;
              case 2:
                break;
              case 3:
                break;
              case 4:
                return "INCLUDE";
                break;
              case 5:
                return "JCE";
                break;
              case 6:
                return 6;
                break;
              case 7:
                return "STRING_LITERAL";
                break;
              case 8:
                return "QUOTE";
                break;
              case 9:
                return "MODULE";
                break;
              case 10:
                return "STRUCT";
                break;
              case 11:
                return "ENUM";
                break;
              case 12:
                return "INTERFACE";
                break;
              case 13:
                return "OPEN";
                break;
              case 14:
                return "CLOSE";
                break;
              case 15:
                return "LEFT";
                break;
              case 16:
                return "RIGHT";
                break;
              case 17:
                return "KEY_OPEN";
                break;
              case 18:
                return "KEY_CLOSE";
                break;
              case 19:
                return "LEFT_QUOTE";
                break;
              case 20:
                return "RIGHT_QUOTE";
                break;
              case 21:
                return "REQUIRED";
                break;
              case 22:
                return "OUT";
                break;
              case 23:
                return 39;
                break;
              case 24:
                return "TYPE";
                break;
              case 25:
                return "TYPE";
                break;
              case 26:
                return "TYPE";
                break;
              case 27:
                return "TYPE";
                break;
              case 28:
                return "TYPE";
                break;
              case 29:
                return "TYPE";
                break;
              case 30:
                return "TYPE";
                break;
              case 31:
                return "TYPE";
                break;
              case 32:
                return "TYPE";
                break;
              case 33:
                return "TYPE";
                break;
              case 34:
                return "TYPE";
                break;
              case 35:
                return "VECTOR";
                break;
              case 36:
                return "MAP";
                break;
              case 37:
                return "CONST";
                break;
              case 38:
                return "IDENTIFIER";
                break;
              case 39:
                return "SEMI";
                break;
              case 40:
                return "COMMA";
                break;
              case 41:
                return "DOUBLE_COLON";
                break;
              case 42:
                return "EQUAL";
                break;
              case 43:
                return "UMINUS";
                break;
              case 44:
                return "NUMBER";
                break;
              case 45:
                return "HEX";
                break;
              case 46:
                return "EOF";
                break;
            }
          },
          rules: [/^(?:\s+)/, /^(?:\/\/(.*))/, /^(?:[/][*][^*]*[*]+([^*/][^*]*[*]+)*[/])/, /^(?:key\[[^\]]*\];)/, /^(?:#include\b)/, /^(?:\.jce\b)/, /^(?:$)/, /^(?:"(\\.|[^"\\])*")/, /^(?:")/, /^(?:module\b)/, /^(?:struct\b)/, /^(?:enum\b)/, /^(?:interface\b)/, /^(?:<)/, /^(?:>)/, /^(?:\{)/, /^(?:\})/, /^(?:\[)/, /^(?:\])/, /^(?:\()/, /^(?:\))/, /^(?:(require|optional))/, /^(?:out\b)/, /^(?:string\b)/, /^(?:byte\b)/, /^(?:short\b)/, /^(?:bool\b)/, /^(?:int\b)/, /^(?:float\b)/, /^(?:long\b)/, /^(?:double\b)/, /^(?:signed\s+int\b)/, /^(?:unsigned\s+int\b)/, /^(?:unsigned\s+short\b)/, /^(?:unsigned\\s\+byte\b)/, /^(?:vector\b)/, /^(?:map\b)/, /^(?:const\b)/, /^(?:[a-zA-Z_$][a-zA-Z_$0-9]*)/, /^(?:;)/, /^(?:,)/, /^(?:::)/, /^(?:=)/, /^(?:-)/, /^(?:[0-9]+(\.[0-9]+)?f?\b)/, /^(?:0[xX][0-9a-fA-F]+)/, /^(?:$)/],
          conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], "inclusive": true } }
        };
        return lexer2;
      }();
      parser2.lexer = lexer;
      function Parser() {
        this.yy = {};
      }
      Parser.prototype = parser2;
      parser2.Parser = Parser;
      return new Parser();
    }();
    if (typeof require !== "undefined" && typeof exports2 !== "undefined") {
      exports2.parser = jce;
      exports2.Parser = jce.Parser;
      exports2.parse = function() {
        return jce.parse.apply(jce, arguments);
      };
      exports2.main = function commonjsMain(args2) {
        if (!args2[1]) {
          console.log("Usage: " + args2[0] + " FILE");
          process.exit(1);
        }
        var source = require("fs").readFileSync(require("path").normalize(args2[1]), "utf8");
        return exports2.parser.parse(source);
      };
      if (typeof module2 !== "undefined" && require.main === module2) {
        exports2.main(process.argv.slice(1));
      }
    }
  }
});

// parse.js
var generate = require_lib4().default;
var t = require_lib3();
var parser = require_jce().parser;
var fs = require("fs");
var path = require("path");
var args = process.argv.slice(2);
if (args.length <= 0) {
  console.log("Invaild arguments.");
  return;
}
var entryFileName = args[0];
var bookKeeping = [];
function parseRecursion(fileName) {
  bookKeeping.push(fileName);
  const { name, dir } = path.parse(fileName);
  const outputName = name + ".spec.ts";
  const content = fs.readFileSync(fileName, {
    encoding: "utf-8"
  });
  const output = parser.parse(content);
  const deps = output.deps;
  if (deps?.length) {
    for (let i = 0; i < deps.length; i++) {
      const depFileName = path.join(dir, deps[i]);
      if (!bookKeeping.includes(depFileName)) {
        parseRecursion(depFileName);
      }
    }
  }
  const topLevelDeclaration = t.tsModuleDeclaration(
    t.identifier("global"),
    t.tsModuleBlock([output.module])
  );
  topLevelDeclaration.declare = true;
  topLevelDeclaration.global = true;
  const exportNamedDeclaration = t.exportNamedDeclaration();
  const program = t.program([topLevelDeclaration, exportNamedDeclaration]);
  const ast = generate(program);
  const dst = path.join(dir, outputName);
  fs.writeFile(dst, ast.code, {}, (err) => {
    if (err) {
      console.log("error write file");
    } else {
      console.log(`Generate ${dst} success!`);
    }
  });
}
parseRecursion(entryFileName);
