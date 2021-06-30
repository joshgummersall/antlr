var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../../node_modules/antlr4/src/antlr4/Utils.js
var require_Utils = __commonJS({
  "../../node_modules/antlr4/src/antlr4/Utils.js"(exports2, module2) {
    function arrayToString(a) {
      return Array.isArray(a) ? "[" + a.join(", ") + "]" : "null";
    }
    String.prototype.seed = String.prototype.seed || Math.round(Math.random() * Math.pow(2, 32));
    String.prototype.hashCode = function() {
      const key = this.toString();
      let h1b, k1;
      const remainder = key.length & 3;
      const bytes = key.length - remainder;
      let h1 = String.prototype.seed;
      const c1 = 3432918353;
      const c2 = 461845907;
      let i = 0;
      while (i < bytes) {
        k1 = key.charCodeAt(i) & 255 | (key.charCodeAt(++i) & 255) << 8 | (key.charCodeAt(++i) & 255) << 16 | (key.charCodeAt(++i) & 255) << 24;
        ++i;
        k1 = (k1 & 65535) * c1 + (((k1 >>> 16) * c1 & 65535) << 16) & 4294967295;
        k1 = k1 << 15 | k1 >>> 17;
        k1 = (k1 & 65535) * c2 + (((k1 >>> 16) * c2 & 65535) << 16) & 4294967295;
        h1 ^= k1;
        h1 = h1 << 13 | h1 >>> 19;
        h1b = (h1 & 65535) * 5 + (((h1 >>> 16) * 5 & 65535) << 16) & 4294967295;
        h1 = (h1b & 65535) + 27492 + (((h1b >>> 16) + 58964 & 65535) << 16);
      }
      k1 = 0;
      switch (remainder) {
        case 3:
          k1 ^= (key.charCodeAt(i + 2) & 255) << 16;
        case 2:
          k1 ^= (key.charCodeAt(i + 1) & 255) << 8;
        case 1:
          k1 ^= key.charCodeAt(i) & 255;
          k1 = (k1 & 65535) * c1 + (((k1 >>> 16) * c1 & 65535) << 16) & 4294967295;
          k1 = k1 << 15 | k1 >>> 17;
          k1 = (k1 & 65535) * c2 + (((k1 >>> 16) * c2 & 65535) << 16) & 4294967295;
          h1 ^= k1;
      }
      h1 ^= key.length;
      h1 ^= h1 >>> 16;
      h1 = (h1 & 65535) * 2246822507 + (((h1 >>> 16) * 2246822507 & 65535) << 16) & 4294967295;
      h1 ^= h1 >>> 13;
      h1 = (h1 & 65535) * 3266489909 + (((h1 >>> 16) * 3266489909 & 65535) << 16) & 4294967295;
      h1 ^= h1 >>> 16;
      return h1 >>> 0;
    };
    function standardEqualsFunction(a, b) {
      return a ? a.equals(b) : a == b;
    }
    function standardHashCodeFunction(a) {
      return a ? a.hashCode() : -1;
    }
    var Set = class {
      constructor(hashFunction, equalsFunction) {
        this.data = {};
        this.hashFunction = hashFunction || standardHashCodeFunction;
        this.equalsFunction = equalsFunction || standardEqualsFunction;
      }
      add(value) {
        const hash = this.hashFunction(value);
        const key = "hash_" + hash;
        if (key in this.data) {
          const values = this.data[key];
          for (let i = 0; i < values.length; i++) {
            if (this.equalsFunction(value, values[i])) {
              return values[i];
            }
          }
          values.push(value);
          return value;
        } else {
          this.data[key] = [value];
          return value;
        }
      }
      contains(value) {
        return this.get(value) != null;
      }
      get(value) {
        const hash = this.hashFunction(value);
        const key = "hash_" + hash;
        if (key in this.data) {
          const values = this.data[key];
          for (let i = 0; i < values.length; i++) {
            if (this.equalsFunction(value, values[i])) {
              return values[i];
            }
          }
        }
        return null;
      }
      values() {
        let l = [];
        for (const key in this.data) {
          if (key.indexOf("hash_") === 0) {
            l = l.concat(this.data[key]);
          }
        }
        return l;
      }
      toString() {
        return arrayToString(this.values());
      }
      get length() {
        let l = 0;
        for (const key in this.data) {
          if (key.indexOf("hash_") === 0) {
            l = l + this.data[key].length;
          }
        }
        return l;
      }
    };
    var BitSet = class {
      constructor() {
        this.data = [];
      }
      add(value) {
        this.data[value] = true;
      }
      or(set) {
        const bits = this;
        Object.keys(set.data).map(function(alt) {
          bits.add(alt);
        });
      }
      remove(value) {
        delete this.data[value];
      }
      contains(value) {
        return this.data[value] === true;
      }
      values() {
        return Object.keys(this.data);
      }
      minValue() {
        return Math.min.apply(null, this.values());
      }
      hashCode() {
        const hash = new Hash2();
        hash.update(this.values());
        return hash.finish();
      }
      equals(other) {
        if (!(other instanceof BitSet)) {
          return false;
        }
        return this.hashCode() === other.hashCode();
      }
      toString() {
        return "{" + this.values().join(", ") + "}";
      }
      get length() {
        return this.values().length;
      }
    };
    var Map = class {
      constructor(hashFunction, equalsFunction) {
        this.data = {};
        this.hashFunction = hashFunction || standardHashCodeFunction;
        this.equalsFunction = equalsFunction || standardEqualsFunction;
      }
      put(key, value) {
        const hashKey = "hash_" + this.hashFunction(key);
        if (hashKey in this.data) {
          const entries = this.data[hashKey];
          for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            if (this.equalsFunction(key, entry.key)) {
              const oldValue = entry.value;
              entry.value = value;
              return oldValue;
            }
          }
          entries.push({ key, value });
          return value;
        } else {
          this.data[hashKey] = [{ key, value }];
          return value;
        }
      }
      containsKey(key) {
        const hashKey = "hash_" + this.hashFunction(key);
        if (hashKey in this.data) {
          const entries = this.data[hashKey];
          for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            if (this.equalsFunction(key, entry.key))
              return true;
          }
        }
        return false;
      }
      get(key) {
        const hashKey = "hash_" + this.hashFunction(key);
        if (hashKey in this.data) {
          const entries = this.data[hashKey];
          for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            if (this.equalsFunction(key, entry.key))
              return entry.value;
          }
        }
        return null;
      }
      entries() {
        let l = [];
        for (const key in this.data) {
          if (key.indexOf("hash_") === 0) {
            l = l.concat(this.data[key]);
          }
        }
        return l;
      }
      getKeys() {
        return this.entries().map(function(e) {
          return e.key;
        });
      }
      getValues() {
        return this.entries().map(function(e) {
          return e.value;
        });
      }
      toString() {
        const ss = this.entries().map(function(entry) {
          return "{" + entry.key + ":" + entry.value + "}";
        });
        return "[" + ss.join(", ") + "]";
      }
      get length() {
        let l = 0;
        for (const hashKey in this.data) {
          if (hashKey.indexOf("hash_") === 0) {
            l = l + this.data[hashKey].length;
          }
        }
        return l;
      }
    };
    var AltDict = class {
      constructor() {
        this.data = {};
      }
      get(key) {
        key = "k-" + key;
        if (key in this.data) {
          return this.data[key];
        } else {
          return null;
        }
      }
      put(key, value) {
        key = "k-" + key;
        this.data[key] = value;
      }
      values() {
        const data = this.data;
        const keys = Object.keys(this.data);
        return keys.map(function(key) {
          return data[key];
        });
      }
    };
    var DoubleDict = class {
      constructor(defaultMapCtor) {
        this.defaultMapCtor = defaultMapCtor || Map;
        this.cacheMap = new this.defaultMapCtor();
      }
      get(a, b) {
        const d = this.cacheMap.get(a) || null;
        return d === null ? null : d.get(b) || null;
      }
      set(a, b, o) {
        let d = this.cacheMap.get(a) || null;
        if (d === null) {
          d = new this.defaultMapCtor();
          this.cacheMap.put(a, d);
        }
        d.put(b, o);
      }
    };
    var Hash2 = class {
      constructor() {
        this.count = 0;
        this.hash = 0;
      }
      update() {
        for (let i = 0; i < arguments.length; i++) {
          const value = arguments[i];
          if (value == null)
            continue;
          if (Array.isArray(value))
            this.update.apply(this, value);
          else {
            let k = 0;
            switch (typeof value) {
              case "undefined":
              case "function":
                continue;
              case "number":
              case "boolean":
                k = value;
                break;
              case "string":
                k = value.hashCode();
                break;
              default:
                if (value.updateHashCode)
                  value.updateHashCode(this);
                else
                  console.log("No updateHashCode for " + value.toString());
                continue;
            }
            k = k * 3432918353;
            k = k << 15 | k >>> 32 - 15;
            k = k * 461845907;
            this.count = this.count + 1;
            let hash = this.hash ^ k;
            hash = hash << 13 | hash >>> 32 - 13;
            hash = hash * 5 + 3864292196;
            this.hash = hash;
          }
        }
      }
      finish() {
        let hash = this.hash ^ this.count * 4;
        hash = hash ^ hash >>> 16;
        hash = hash * 2246822507;
        hash = hash ^ hash >>> 13;
        hash = hash * 3266489909;
        hash = hash ^ hash >>> 16;
        return hash;
      }
    };
    function hashStuff() {
      const hash = new Hash2();
      hash.update.apply(hash, arguments);
      return hash.finish();
    }
    function escapeWhitespace(s, escapeSpaces) {
      s = s.replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
      if (escapeSpaces) {
        s = s.replace(/ /g, "\xB7");
      }
      return s;
    }
    function titleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
      });
    }
    function equalArrays(a, b) {
      if (!Array.isArray(a) || !Array.isArray(b))
        return false;
      if (a === b)
        return true;
      if (a.length !== b.length)
        return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i] === b[i])
          continue;
        if (!a[i].equals || !a[i].equals(b[i]))
          return false;
      }
      return true;
    }
    module2.exports = {
      Hash: Hash2,
      Set,
      Map,
      BitSet,
      AltDict,
      DoubleDict,
      hashStuff,
      escapeWhitespace,
      arrayToString,
      titleCase,
      equalArrays
    };
  }
});

// ../../node_modules/antlr4/src/antlr4/Token.js
var require_Token = __commonJS({
  "../../node_modules/antlr4/src/antlr4/Token.js"(exports2, module2) {
    var Token = class {
      constructor() {
        this.source = null;
        this.type = null;
        this.channel = null;
        this.start = null;
        this.stop = null;
        this.tokenIndex = null;
        this.line = null;
        this.column = null;
        this._text = null;
      }
      getTokenSource() {
        return this.source[0];
      }
      getInputStream() {
        return this.source[1];
      }
      get text() {
        return this._text;
      }
      set text(text) {
        this._text = text;
      }
    };
    Token.INVALID_TYPE = 0;
    Token.EPSILON = -2;
    Token.MIN_USER_TOKEN_TYPE = 1;
    Token.EOF = -1;
    Token.DEFAULT_CHANNEL = 0;
    Token.HIDDEN_CHANNEL = 1;
    var CommonToken = class extends Token {
      constructor(source, type, channel, start, stop) {
        super();
        this.source = source !== void 0 ? source : CommonToken.EMPTY_SOURCE;
        this.type = type !== void 0 ? type : null;
        this.channel = channel !== void 0 ? channel : Token.DEFAULT_CHANNEL;
        this.start = start !== void 0 ? start : -1;
        this.stop = stop !== void 0 ? stop : -1;
        this.tokenIndex = -1;
        if (this.source[0] !== null) {
          this.line = source[0].line;
          this.column = source[0].column;
        } else {
          this.column = -1;
        }
      }
      clone() {
        const t = new CommonToken(this.source, this.type, this.channel, this.start, this.stop);
        t.tokenIndex = this.tokenIndex;
        t.line = this.line;
        t.column = this.column;
        t.text = this.text;
        return t;
      }
      toString() {
        let txt = this.text;
        if (txt !== null) {
          txt = txt.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
        } else {
          txt = "<no text>";
        }
        return "[@" + this.tokenIndex + "," + this.start + ":" + this.stop + "='" + txt + "',<" + this.type + ">" + (this.channel > 0 ? ",channel=" + this.channel : "") + "," + this.line + ":" + this.column + "]";
      }
      get text() {
        if (this._text !== null) {
          return this._text;
        }
        const input = this.getInputStream();
        if (input === null) {
          return null;
        }
        const n = input.size;
        if (this.start < n && this.stop < n) {
          return input.getText(this.start, this.stop);
        } else {
          return "<EOF>";
        }
      }
      set text(text) {
        this._text = text;
      }
    };
    CommonToken.EMPTY_SOURCE = [null, null];
    module2.exports = {
      Token,
      CommonToken
    };
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/ATNState.js
var require_ATNState = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/ATNState.js"(exports2, module2) {
    var ATNState = class {
      constructor() {
        this.atn = null;
        this.stateNumber = ATNState.INVALID_STATE_NUMBER;
        this.stateType = null;
        this.ruleIndex = 0;
        this.epsilonOnlyTransitions = false;
        this.transitions = [];
        this.nextTokenWithinRule = null;
      }
      toString() {
        return this.stateNumber;
      }
      equals(other) {
        if (other instanceof ATNState) {
          return this.stateNumber === other.stateNumber;
        } else {
          return false;
        }
      }
      isNonGreedyExitState() {
        return false;
      }
      addTransition(trans, index) {
        if (index === void 0) {
          index = -1;
        }
        if (this.transitions.length === 0) {
          this.epsilonOnlyTransitions = trans.isEpsilon;
        } else if (this.epsilonOnlyTransitions !== trans.isEpsilon) {
          this.epsilonOnlyTransitions = false;
        }
        if (index === -1) {
          this.transitions.push(trans);
        } else {
          this.transitions.splice(index, 1, trans);
        }
      }
    };
    ATNState.INVALID_TYPE = 0;
    ATNState.BASIC = 1;
    ATNState.RULE_START = 2;
    ATNState.BLOCK_START = 3;
    ATNState.PLUS_BLOCK_START = 4;
    ATNState.STAR_BLOCK_START = 5;
    ATNState.TOKEN_START = 6;
    ATNState.RULE_STOP = 7;
    ATNState.BLOCK_END = 8;
    ATNState.STAR_LOOP_BACK = 9;
    ATNState.STAR_LOOP_ENTRY = 10;
    ATNState.PLUS_LOOP_BACK = 11;
    ATNState.LOOP_END = 12;
    ATNState.serializationNames = [
      "INVALID",
      "BASIC",
      "RULE_START",
      "BLOCK_START",
      "PLUS_BLOCK_START",
      "STAR_BLOCK_START",
      "TOKEN_START",
      "RULE_STOP",
      "BLOCK_END",
      "STAR_LOOP_BACK",
      "STAR_LOOP_ENTRY",
      "PLUS_LOOP_BACK",
      "LOOP_END"
    ];
    ATNState.INVALID_STATE_NUMBER = -1;
    var BasicState = class extends ATNState {
      constructor() {
        super();
        this.stateType = ATNState.BASIC;
      }
    };
    var DecisionState = class extends ATNState {
      constructor() {
        super();
        this.decision = -1;
        this.nonGreedy = false;
        return this;
      }
    };
    var BlockStartState = class extends DecisionState {
      constructor() {
        super();
        this.endState = null;
        return this;
      }
    };
    var BasicBlockStartState = class extends BlockStartState {
      constructor() {
        super();
        this.stateType = ATNState.BLOCK_START;
        return this;
      }
    };
    var BlockEndState = class extends ATNState {
      constructor() {
        super();
        this.stateType = ATNState.BLOCK_END;
        this.startState = null;
        return this;
      }
    };
    var RuleStopState = class extends ATNState {
      constructor() {
        super();
        this.stateType = ATNState.RULE_STOP;
        return this;
      }
    };
    var RuleStartState = class extends ATNState {
      constructor() {
        super();
        this.stateType = ATNState.RULE_START;
        this.stopState = null;
        this.isPrecedenceRule = false;
        return this;
      }
    };
    var PlusLoopbackState = class extends DecisionState {
      constructor() {
        super();
        this.stateType = ATNState.PLUS_LOOP_BACK;
        return this;
      }
    };
    var PlusBlockStartState = class extends BlockStartState {
      constructor() {
        super();
        this.stateType = ATNState.PLUS_BLOCK_START;
        this.loopBackState = null;
        return this;
      }
    };
    var StarBlockStartState = class extends BlockStartState {
      constructor() {
        super();
        this.stateType = ATNState.STAR_BLOCK_START;
        return this;
      }
    };
    var StarLoopbackState = class extends ATNState {
      constructor() {
        super();
        this.stateType = ATNState.STAR_LOOP_BACK;
        return this;
      }
    };
    var StarLoopEntryState = class extends DecisionState {
      constructor() {
        super();
        this.stateType = ATNState.STAR_LOOP_ENTRY;
        this.loopBackState = null;
        this.isPrecedenceDecision = null;
        return this;
      }
    };
    var LoopEndState = class extends ATNState {
      constructor() {
        super();
        this.stateType = ATNState.LOOP_END;
        this.loopBackState = null;
        return this;
      }
    };
    var TokensStartState = class extends DecisionState {
      constructor() {
        super();
        this.stateType = ATNState.TOKEN_START;
        return this;
      }
    };
    module2.exports = {
      ATNState,
      BasicState,
      DecisionState,
      BlockStartState,
      BlockEndState,
      LoopEndState,
      RuleStartState,
      RuleStopState,
      TokensStartState,
      PlusLoopbackState,
      StarLoopbackState,
      StarLoopEntryState,
      PlusBlockStartState,
      StarBlockStartState,
      BasicBlockStartState
    };
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/SemanticContext.js
var require_SemanticContext = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/SemanticContext.js"(exports2, module2) {
    var { Set, Hash: Hash2, equalArrays } = require_Utils();
    var SemanticContext = class {
      hashCode() {
        const hash = new Hash2();
        this.updateHashCode(hash);
        return hash.finish();
      }
      evaluate(parser, outerContext) {
      }
      evalPrecedence(parser, outerContext) {
        return this;
      }
      static andContext(a, b) {
        if (a === null || a === SemanticContext.NONE) {
          return b;
        }
        if (b === null || b === SemanticContext.NONE) {
          return a;
        }
        const result = new AND(a, b);
        if (result.opnds.length === 1) {
          return result.opnds[0];
        } else {
          return result;
        }
      }
      static orContext(a, b) {
        if (a === null) {
          return b;
        }
        if (b === null) {
          return a;
        }
        if (a === SemanticContext.NONE || b === SemanticContext.NONE) {
          return SemanticContext.NONE;
        }
        const result = new OR(a, b);
        if (result.opnds.length === 1) {
          return result.opnds[0];
        } else {
          return result;
        }
      }
    };
    var Predicate = class extends SemanticContext {
      constructor(ruleIndex, predIndex, isCtxDependent) {
        super();
        this.ruleIndex = ruleIndex === void 0 ? -1 : ruleIndex;
        this.predIndex = predIndex === void 0 ? -1 : predIndex;
        this.isCtxDependent = isCtxDependent === void 0 ? false : isCtxDependent;
      }
      evaluate(parser, outerContext) {
        const localctx = this.isCtxDependent ? outerContext : null;
        return parser.sempred(localctx, this.ruleIndex, this.predIndex);
      }
      updateHashCode(hash) {
        hash.update(this.ruleIndex, this.predIndex, this.isCtxDependent);
      }
      equals(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof Predicate)) {
          return false;
        } else {
          return this.ruleIndex === other.ruleIndex && this.predIndex === other.predIndex && this.isCtxDependent === other.isCtxDependent;
        }
      }
      toString() {
        return "{" + this.ruleIndex + ":" + this.predIndex + "}?";
      }
    };
    SemanticContext.NONE = new Predicate();
    var PrecedencePredicate = class extends SemanticContext {
      constructor(precedence) {
        super();
        this.precedence = precedence === void 0 ? 0 : precedence;
      }
      evaluate(parser, outerContext) {
        return parser.precpred(outerContext, this.precedence);
      }
      evalPrecedence(parser, outerContext) {
        if (parser.precpred(outerContext, this.precedence)) {
          return SemanticContext.NONE;
        } else {
          return null;
        }
      }
      compareTo(other) {
        return this.precedence - other.precedence;
      }
      updateHashCode(hash) {
        hash.update(this.precedence);
      }
      equals(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof PrecedencePredicate)) {
          return false;
        } else {
          return this.precedence === other.precedence;
        }
      }
      toString() {
        return "{" + this.precedence + ">=prec}?";
      }
      static filterPrecedencePredicates(set) {
        const result = [];
        set.values().map(function(context) {
          if (context instanceof PrecedencePredicate) {
            result.push(context);
          }
        });
        return result;
      }
    };
    var AND = class extends SemanticContext {
      constructor(a, b) {
        super();
        const operands = new Set();
        if (a instanceof AND) {
          a.opnds.map(function(o) {
            operands.add(o);
          });
        } else {
          operands.add(a);
        }
        if (b instanceof AND) {
          b.opnds.map(function(o) {
            operands.add(o);
          });
        } else {
          operands.add(b);
        }
        const precedencePredicates = PrecedencePredicate.filterPrecedencePredicates(operands);
        if (precedencePredicates.length > 0) {
          let reduced = null;
          precedencePredicates.map(function(p) {
            if (reduced === null || p.precedence < reduced.precedence) {
              reduced = p;
            }
          });
          operands.add(reduced);
        }
        this.opnds = Array.from(operands.values());
      }
      equals(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof AND)) {
          return false;
        } else {
          return equalArrays(this.opnds, other.opnds);
        }
      }
      updateHashCode(hash) {
        hash.update(this.opnds, "AND");
      }
      evaluate(parser, outerContext) {
        for (let i = 0; i < this.opnds.length; i++) {
          if (!this.opnds[i].evaluate(parser, outerContext)) {
            return false;
          }
        }
        return true;
      }
      evalPrecedence(parser, outerContext) {
        let differs = false;
        const operands = [];
        for (let i = 0; i < this.opnds.length; i++) {
          const context = this.opnds[i];
          const evaluated = context.evalPrecedence(parser, outerContext);
          differs |= evaluated !== context;
          if (evaluated === null) {
            return null;
          } else if (evaluated !== SemanticContext.NONE) {
            operands.push(evaluated);
          }
        }
        if (!differs) {
          return this;
        }
        if (operands.length === 0) {
          return SemanticContext.NONE;
        }
        let result = null;
        operands.map(function(o) {
          result = result === null ? o : SemanticContext.andContext(result, o);
        });
        return result;
      }
      toString() {
        const s = this.opnds.map((o) => o.toString());
        return (s.length > 3 ? s.slice(3) : s).join("&&");
      }
    };
    var OR = class extends SemanticContext {
      constructor(a, b) {
        super();
        const operands = new Set();
        if (a instanceof OR) {
          a.opnds.map(function(o) {
            operands.add(o);
          });
        } else {
          operands.add(a);
        }
        if (b instanceof OR) {
          b.opnds.map(function(o) {
            operands.add(o);
          });
        } else {
          operands.add(b);
        }
        const precedencePredicates = PrecedencePredicate.filterPrecedencePredicates(operands);
        if (precedencePredicates.length > 0) {
          const s = precedencePredicates.sort(function(a2, b2) {
            return a2.compareTo(b2);
          });
          const reduced = s[s.length - 1];
          operands.add(reduced);
        }
        this.opnds = Array.from(operands.values());
      }
      equals(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof OR)) {
          return false;
        } else {
          return equalArrays(this.opnds, other.opnds);
        }
      }
      updateHashCode(hash) {
        hash.update(this.opnds, "OR");
      }
      evaluate(parser, outerContext) {
        for (let i = 0; i < this.opnds.length; i++) {
          if (this.opnds[i].evaluate(parser, outerContext)) {
            return true;
          }
        }
        return false;
      }
      evalPrecedence(parser, outerContext) {
        let differs = false;
        const operands = [];
        for (let i = 0; i < this.opnds.length; i++) {
          const context = this.opnds[i];
          const evaluated = context.evalPrecedence(parser, outerContext);
          differs |= evaluated !== context;
          if (evaluated === SemanticContext.NONE) {
            return SemanticContext.NONE;
          } else if (evaluated !== null) {
            operands.push(evaluated);
          }
        }
        if (!differs) {
          return this;
        }
        if (operands.length === 0) {
          return null;
        }
        const result = null;
        operands.map(function(o) {
          return result === null ? o : SemanticContext.orContext(result, o);
        });
        return result;
      }
      toString() {
        const s = this.opnds.map((o) => o.toString());
        return (s.length > 3 ? s.slice(3) : s).join("||");
      }
    };
    module2.exports = {
      SemanticContext,
      PrecedencePredicate,
      Predicate
    };
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/ATNConfig.js
var require_ATNConfig = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/ATNConfig.js"(exports2, module2) {
    var { DecisionState } = require_ATNState();
    var { SemanticContext } = require_SemanticContext();
    var { Hash: Hash2 } = require_Utils();
    function checkParams(params, isCfg) {
      if (params === null) {
        const result = { state: null, alt: null, context: null, semanticContext: null };
        if (isCfg) {
          result.reachesIntoOuterContext = 0;
        }
        return result;
      } else {
        const props = {};
        props.state = params.state || null;
        props.alt = params.alt === void 0 ? null : params.alt;
        props.context = params.context || null;
        props.semanticContext = params.semanticContext || null;
        if (isCfg) {
          props.reachesIntoOuterContext = params.reachesIntoOuterContext || 0;
          props.precedenceFilterSuppressed = params.precedenceFilterSuppressed || false;
        }
        return props;
      }
    }
    var ATNConfig = class {
      constructor(params, config) {
        this.checkContext(params, config);
        params = checkParams(params);
        config = checkParams(config, true);
        this.state = params.state !== null ? params.state : config.state;
        this.alt = params.alt !== null ? params.alt : config.alt;
        this.context = params.context !== null ? params.context : config.context;
        this.semanticContext = params.semanticContext !== null ? params.semanticContext : config.semanticContext !== null ? config.semanticContext : SemanticContext.NONE;
        this.reachesIntoOuterContext = config.reachesIntoOuterContext;
        this.precedenceFilterSuppressed = config.precedenceFilterSuppressed;
      }
      checkContext(params, config) {
        if ((params.context === null || params.context === void 0) && (config === null || config.context === null || config.context === void 0)) {
          this.context = null;
        }
      }
      hashCode() {
        const hash = new Hash2();
        this.updateHashCode(hash);
        return hash.finish();
      }
      updateHashCode(hash) {
        hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext);
      }
      equals(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof ATNConfig)) {
          return false;
        } else {
          return this.state.stateNumber === other.state.stateNumber && this.alt === other.alt && (this.context === null ? other.context === null : this.context.equals(other.context)) && this.semanticContext.equals(other.semanticContext) && this.precedenceFilterSuppressed === other.precedenceFilterSuppressed;
        }
      }
      hashCodeForConfigSet() {
        const hash = new Hash2();
        hash.update(this.state.stateNumber, this.alt, this.semanticContext);
        return hash.finish();
      }
      equalsForConfigSet(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof ATNConfig)) {
          return false;
        } else {
          return this.state.stateNumber === other.state.stateNumber && this.alt === other.alt && this.semanticContext.equals(other.semanticContext);
        }
      }
      toString() {
        return "(" + this.state + "," + this.alt + (this.context !== null ? ",[" + this.context.toString() + "]" : "") + (this.semanticContext !== SemanticContext.NONE ? "," + this.semanticContext.toString() : "") + (this.reachesIntoOuterContext > 0 ? ",up=" + this.reachesIntoOuterContext : "") + ")";
      }
    };
    var LexerATNConfig = class extends ATNConfig {
      constructor(params, config) {
        super(params, config);
        const lexerActionExecutor = params.lexerActionExecutor || null;
        this.lexerActionExecutor = lexerActionExecutor || (config !== null ? config.lexerActionExecutor : null);
        this.passedThroughNonGreedyDecision = config !== null ? this.checkNonGreedyDecision(config, this.state) : false;
        this.hashCodeForConfigSet = LexerATNConfig.prototype.hashCode;
        this.equalsForConfigSet = LexerATNConfig.prototype.equals;
        return this;
      }
      updateHashCode(hash) {
        hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext, this.passedThroughNonGreedyDecision, this.lexerActionExecutor);
      }
      equals(other) {
        return this === other || other instanceof LexerATNConfig && this.passedThroughNonGreedyDecision === other.passedThroughNonGreedyDecision && (this.lexerActionExecutor ? this.lexerActionExecutor.equals(other.lexerActionExecutor) : !other.lexerActionExecutor) && super.equals(other);
      }
      checkNonGreedyDecision(source, target) {
        return source.passedThroughNonGreedyDecision || target instanceof DecisionState && target.nonGreedy;
      }
    };
    module2.exports.ATNConfig = ATNConfig;
    module2.exports.LexerATNConfig = LexerATNConfig;
  }
});

// ../../node_modules/antlr4/src/antlr4/IntervalSet.js
var require_IntervalSet = __commonJS({
  "../../node_modules/antlr4/src/antlr4/IntervalSet.js"(exports2, module2) {
    var { Token } = require_Token();
    var Interval = class {
      constructor(start, stop) {
        this.start = start;
        this.stop = stop;
      }
      contains(item) {
        return item >= this.start && item < this.stop;
      }
      toString() {
        if (this.start === this.stop - 1) {
          return this.start.toString();
        } else {
          return this.start.toString() + ".." + (this.stop - 1).toString();
        }
      }
      get length() {
        return this.stop - this.start;
      }
    };
    var IntervalSet = class {
      constructor() {
        this.intervals = null;
        this.readOnly = false;
      }
      first(v) {
        if (this.intervals === null || this.intervals.length === 0) {
          return Token.INVALID_TYPE;
        } else {
          return this.intervals[0].start;
        }
      }
      addOne(v) {
        this.addInterval(new Interval(v, v + 1));
      }
      addRange(l, h) {
        this.addInterval(new Interval(l, h + 1));
      }
      addInterval(toAdd) {
        if (this.intervals === null) {
          this.intervals = [];
          this.intervals.push(toAdd);
        } else {
          for (let pos = 0; pos < this.intervals.length; pos++) {
            const existing = this.intervals[pos];
            if (toAdd.stop < existing.start) {
              this.intervals.splice(pos, 0, toAdd);
              return;
            } else if (toAdd.stop === existing.start) {
              this.intervals[pos].start = toAdd.start;
              return;
            } else if (toAdd.start <= existing.stop) {
              this.intervals[pos] = new Interval(Math.min(existing.start, toAdd.start), Math.max(existing.stop, toAdd.stop));
              this.reduce(pos);
              return;
            }
          }
          this.intervals.push(toAdd);
        }
      }
      addSet(other) {
        if (other.intervals !== null) {
          other.intervals.forEach((toAdd) => this.addInterval(toAdd), this);
        }
        return this;
      }
      reduce(pos) {
        if (pos < this.intervals.length - 1) {
          const current = this.intervals[pos];
          const next = this.intervals[pos + 1];
          if (current.stop >= next.stop) {
            this.intervals.splice(pos + 1, 1);
            this.reduce(pos);
          } else if (current.stop >= next.start) {
            this.intervals[pos] = new Interval(current.start, next.stop);
            this.intervals.splice(pos + 1, 1);
          }
        }
      }
      complement(start, stop) {
        const result = new IntervalSet();
        result.addInterval(new Interval(start, stop + 1));
        if (this.intervals !== null)
          this.intervals.forEach((toRemove) => result.removeRange(toRemove));
        return result;
      }
      contains(item) {
        if (this.intervals === null) {
          return false;
        } else {
          for (let k = 0; k < this.intervals.length; k++) {
            if (this.intervals[k].contains(item)) {
              return true;
            }
          }
          return false;
        }
      }
      removeRange(toRemove) {
        if (toRemove.start === toRemove.stop - 1) {
          this.removeOne(toRemove.start);
        } else if (this.intervals !== null) {
          let pos = 0;
          for (let n = 0; n < this.intervals.length; n++) {
            const existing = this.intervals[pos];
            if (toRemove.stop <= existing.start) {
              return;
            } else if (toRemove.start > existing.start && toRemove.stop < existing.stop) {
              this.intervals[pos] = new Interval(existing.start, toRemove.start);
              const x = new Interval(toRemove.stop, existing.stop);
              this.intervals.splice(pos, 0, x);
              return;
            } else if (toRemove.start <= existing.start && toRemove.stop >= existing.stop) {
              this.intervals.splice(pos, 1);
              pos = pos - 1;
            } else if (toRemove.start < existing.stop) {
              this.intervals[pos] = new Interval(existing.start, toRemove.start);
            } else if (toRemove.stop < existing.stop) {
              this.intervals[pos] = new Interval(toRemove.stop, existing.stop);
            }
            pos += 1;
          }
        }
      }
      removeOne(value) {
        if (this.intervals !== null) {
          for (let i = 0; i < this.intervals.length; i++) {
            const existing = this.intervals[i];
            if (value < existing.start) {
              return;
            } else if (value === existing.start && value === existing.stop - 1) {
              this.intervals.splice(i, 1);
              return;
            } else if (value === existing.start) {
              this.intervals[i] = new Interval(existing.start + 1, existing.stop);
              return;
            } else if (value === existing.stop - 1) {
              this.intervals[i] = new Interval(existing.start, existing.stop - 1);
              return;
            } else if (value < existing.stop - 1) {
              const replace = new Interval(existing.start, value);
              existing.start = value + 1;
              this.intervals.splice(i, 0, replace);
              return;
            }
          }
        }
      }
      toString(literalNames, symbolicNames, elemsAreChar) {
        literalNames = literalNames || null;
        symbolicNames = symbolicNames || null;
        elemsAreChar = elemsAreChar || false;
        if (this.intervals === null) {
          return "{}";
        } else if (literalNames !== null || symbolicNames !== null) {
          return this.toTokenString(literalNames, symbolicNames);
        } else if (elemsAreChar) {
          return this.toCharString();
        } else {
          return this.toIndexString();
        }
      }
      toCharString() {
        const names = [];
        for (let i = 0; i < this.intervals.length; i++) {
          const existing = this.intervals[i];
          if (existing.stop === existing.start + 1) {
            if (existing.start === Token.EOF) {
              names.push("<EOF>");
            } else {
              names.push("'" + String.fromCharCode(existing.start) + "'");
            }
          } else {
            names.push("'" + String.fromCharCode(existing.start) + "'..'" + String.fromCharCode(existing.stop - 1) + "'");
          }
        }
        if (names.length > 1) {
          return "{" + names.join(", ") + "}";
        } else {
          return names[0];
        }
      }
      toIndexString() {
        const names = [];
        for (let i = 0; i < this.intervals.length; i++) {
          const existing = this.intervals[i];
          if (existing.stop === existing.start + 1) {
            if (existing.start === Token.EOF) {
              names.push("<EOF>");
            } else {
              names.push(existing.start.toString());
            }
          } else {
            names.push(existing.start.toString() + ".." + (existing.stop - 1).toString());
          }
        }
        if (names.length > 1) {
          return "{" + names.join(", ") + "}";
        } else {
          return names[0];
        }
      }
      toTokenString(literalNames, symbolicNames) {
        const names = [];
        for (let i = 0; i < this.intervals.length; i++) {
          const existing = this.intervals[i];
          for (let j = existing.start; j < existing.stop; j++) {
            names.push(this.elementName(literalNames, symbolicNames, j));
          }
        }
        if (names.length > 1) {
          return "{" + names.join(", ") + "}";
        } else {
          return names[0];
        }
      }
      elementName(literalNames, symbolicNames, token) {
        if (token === Token.EOF) {
          return "<EOF>";
        } else if (token === Token.EPSILON) {
          return "<EPSILON>";
        } else {
          return literalNames[token] || symbolicNames[token];
        }
      }
      get length() {
        return this.intervals.map((interval) => interval.length).reduce((acc, val) => acc + val);
      }
    };
    module2.exports = {
      Interval,
      IntervalSet
    };
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/Transition.js
var require_Transition = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/Transition.js"(exports2, module2) {
    var { Token } = require_Token();
    var { IntervalSet } = require_IntervalSet();
    var { Predicate, PrecedencePredicate } = require_SemanticContext();
    var Transition = class {
      constructor(target) {
        if (target === void 0 || target === null) {
          throw "target cannot be null.";
        }
        this.target = target;
        this.isEpsilon = false;
        this.label = null;
      }
    };
    Transition.EPSILON = 1;
    Transition.RANGE = 2;
    Transition.RULE = 3;
    Transition.PREDICATE = 4;
    Transition.ATOM = 5;
    Transition.ACTION = 6;
    Transition.SET = 7;
    Transition.NOT_SET = 8;
    Transition.WILDCARD = 9;
    Transition.PRECEDENCE = 10;
    Transition.serializationNames = [
      "INVALID",
      "EPSILON",
      "RANGE",
      "RULE",
      "PREDICATE",
      "ATOM",
      "ACTION",
      "SET",
      "NOT_SET",
      "WILDCARD",
      "PRECEDENCE"
    ];
    Transition.serializationTypes = {
      EpsilonTransition: Transition.EPSILON,
      RangeTransition: Transition.RANGE,
      RuleTransition: Transition.RULE,
      PredicateTransition: Transition.PREDICATE,
      AtomTransition: Transition.ATOM,
      ActionTransition: Transition.ACTION,
      SetTransition: Transition.SET,
      NotSetTransition: Transition.NOT_SET,
      WildcardTransition: Transition.WILDCARD,
      PrecedencePredicateTransition: Transition.PRECEDENCE
    };
    var AtomTransition2 = class extends Transition {
      constructor(target, label) {
        super(target);
        this.label_ = label;
        this.label = this.makeLabel();
        this.serializationType = Transition.ATOM;
      }
      makeLabel() {
        const s = new IntervalSet();
        s.addOne(this.label_);
        return s;
      }
      matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return this.label_ === symbol;
      }
      toString() {
        return this.label_;
      }
    };
    var RuleTransition = class extends Transition {
      constructor(ruleStart, ruleIndex, precedence, followState) {
        super(ruleStart);
        this.ruleIndex = ruleIndex;
        this.precedence = precedence;
        this.followState = followState;
        this.serializationType = Transition.RULE;
        this.isEpsilon = true;
      }
      matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
      }
    };
    var EpsilonTransition = class extends Transition {
      constructor(target, outermostPrecedenceReturn) {
        super(target);
        this.serializationType = Transition.EPSILON;
        this.isEpsilon = true;
        this.outermostPrecedenceReturn = outermostPrecedenceReturn;
      }
      matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
      }
      toString() {
        return "epsilon";
      }
    };
    var RangeTransition = class extends Transition {
      constructor(target, start, stop) {
        super(target);
        this.serializationType = Transition.RANGE;
        this.start = start;
        this.stop = stop;
        this.label = this.makeLabel();
      }
      makeLabel() {
        const s = new IntervalSet();
        s.addRange(this.start, this.stop);
        return s;
      }
      matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return symbol >= this.start && symbol <= this.stop;
      }
      toString() {
        return "'" + String.fromCharCode(this.start) + "'..'" + String.fromCharCode(this.stop) + "'";
      }
    };
    var AbstractPredicateTransition = class extends Transition {
      constructor(target) {
        super(target);
      }
    };
    var PredicateTransition = class extends AbstractPredicateTransition {
      constructor(target, ruleIndex, predIndex, isCtxDependent) {
        super(target);
        this.serializationType = Transition.PREDICATE;
        this.ruleIndex = ruleIndex;
        this.predIndex = predIndex;
        this.isCtxDependent = isCtxDependent;
        this.isEpsilon = true;
      }
      matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
      }
      getPredicate() {
        return new Predicate(this.ruleIndex, this.predIndex, this.isCtxDependent);
      }
      toString() {
        return "pred_" + this.ruleIndex + ":" + this.predIndex;
      }
    };
    var ActionTransition = class extends Transition {
      constructor(target, ruleIndex, actionIndex, isCtxDependent) {
        super(target);
        this.serializationType = Transition.ACTION;
        this.ruleIndex = ruleIndex;
        this.actionIndex = actionIndex === void 0 ? -1 : actionIndex;
        this.isCtxDependent = isCtxDependent === void 0 ? false : isCtxDependent;
        this.isEpsilon = true;
      }
      matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
      }
      toString() {
        return "action_" + this.ruleIndex + ":" + this.actionIndex;
      }
    };
    var SetTransition = class extends Transition {
      constructor(target, set) {
        super(target);
        this.serializationType = Transition.SET;
        if (set !== void 0 && set !== null) {
          this.label = set;
        } else {
          this.label = new IntervalSet();
          this.label.addOne(Token.INVALID_TYPE);
        }
      }
      matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return this.label.contains(symbol);
      }
      toString() {
        return this.label.toString();
      }
    };
    var NotSetTransition = class extends SetTransition {
      constructor(target, set) {
        super(target, set);
        this.serializationType = Transition.NOT_SET;
      }
      matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return symbol >= minVocabSymbol && symbol <= maxVocabSymbol && !super.matches(symbol, minVocabSymbol, maxVocabSymbol);
      }
      toString() {
        return "~" + super.toString();
      }
    };
    var WildcardTransition = class extends Transition {
      constructor(target) {
        super(target);
        this.serializationType = Transition.WILDCARD;
      }
      matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return symbol >= minVocabSymbol && symbol <= maxVocabSymbol;
      }
      toString() {
        return ".";
      }
    };
    var PrecedencePredicateTransition = class extends AbstractPredicateTransition {
      constructor(target, precedence) {
        super(target);
        this.serializationType = Transition.PRECEDENCE;
        this.precedence = precedence;
        this.isEpsilon = true;
      }
      matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
      }
      getPredicate() {
        return new PrecedencePredicate(this.precedence);
      }
      toString() {
        return this.precedence + " >= _p";
      }
    };
    module2.exports = {
      Transition,
      AtomTransition: AtomTransition2,
      SetTransition,
      NotSetTransition,
      RuleTransition,
      ActionTransition,
      EpsilonTransition,
      RangeTransition,
      WildcardTransition,
      PredicateTransition,
      PrecedencePredicateTransition,
      AbstractPredicateTransition
    };
  }
});

// ../../node_modules/antlr4/src/antlr4/tree/Tree.js
var require_Tree = __commonJS({
  "../../node_modules/antlr4/src/antlr4/tree/Tree.js"(exports2, module2) {
    var { Token } = require_Token();
    var { Interval } = require_IntervalSet();
    var INVALID_INTERVAL = new Interval(-1, -2);
    var Tree = class {
    };
    var SyntaxTree = class extends Tree {
      constructor() {
        super();
      }
    };
    var ParseTree = class extends SyntaxTree {
      constructor() {
        super();
      }
    };
    var RuleNode = class extends ParseTree {
      constructor() {
        super();
      }
      getRuleContext() {
        throw new Error("missing interface implementation");
      }
    };
    var TerminalNode = class extends ParseTree {
      constructor() {
        super();
      }
    };
    var ErrorNode = class extends TerminalNode {
      constructor() {
        super();
      }
    };
    var ParseTreeVisitor = class {
      visit(ctx) {
        if (Array.isArray(ctx)) {
          return ctx.map(function(child) {
            return child.accept(this);
          }, this);
        } else {
          return ctx.accept(this);
        }
      }
      visitChildren(ctx) {
        if (ctx.children) {
          return this.visit(ctx.children);
        } else {
          return null;
        }
      }
      visitTerminal(node) {
      }
      visitErrorNode(node) {
      }
    };
    var ParseTreeListener = class {
      visitTerminal(node) {
      }
      visitErrorNode(node) {
      }
      enterEveryRule(node) {
      }
      exitEveryRule(node) {
      }
    };
    var TerminalNodeImpl = class extends TerminalNode {
      constructor(symbol) {
        super();
        this.parentCtx = null;
        this.symbol = symbol;
      }
      getChild(i) {
        return null;
      }
      getSymbol() {
        return this.symbol;
      }
      getParent() {
        return this.parentCtx;
      }
      getPayload() {
        return this.symbol;
      }
      getSourceInterval() {
        if (this.symbol === null) {
          return INVALID_INTERVAL;
        }
        const tokenIndex = this.symbol.tokenIndex;
        return new Interval(tokenIndex, tokenIndex);
      }
      getChildCount() {
        return 0;
      }
      accept(visitor) {
        return visitor.visitTerminal(this);
      }
      getText() {
        return this.symbol.text;
      }
      toString() {
        if (this.symbol.type === Token.EOF) {
          return "<EOF>";
        } else {
          return this.symbol.text;
        }
      }
    };
    var ErrorNodeImpl = class extends TerminalNodeImpl {
      constructor(token) {
        super(token);
      }
      isErrorNode() {
        return true;
      }
      accept(visitor) {
        return visitor.visitErrorNode(this);
      }
    };
    var ParseTreeWalker = class {
      walk(listener, t) {
        const errorNode = t instanceof ErrorNode || t.isErrorNode !== void 0 && t.isErrorNode();
        if (errorNode) {
          listener.visitErrorNode(t);
        } else if (t instanceof TerminalNode) {
          listener.visitTerminal(t);
        } else {
          this.enterRule(listener, t);
          for (let i = 0; i < t.getChildCount(); i++) {
            const child = t.getChild(i);
            this.walk(listener, child);
          }
          this.exitRule(listener, t);
        }
      }
      enterRule(listener, r) {
        const ctx = r.getRuleContext();
        listener.enterEveryRule(ctx);
        ctx.enterRule(listener);
      }
      exitRule(listener, r) {
        const ctx = r.getRuleContext();
        ctx.exitRule(listener);
        listener.exitEveryRule(ctx);
      }
    };
    ParseTreeWalker.DEFAULT = new ParseTreeWalker();
    module2.exports = {
      RuleNode,
      ErrorNode,
      TerminalNode,
      ErrorNodeImpl,
      TerminalNodeImpl,
      ParseTreeListener,
      ParseTreeVisitor,
      ParseTreeWalker,
      INVALID_INTERVAL
    };
  }
});

// ../../node_modules/antlr4/src/antlr4/tree/Trees.js
var require_Trees = __commonJS({
  "../../node_modules/antlr4/src/antlr4/tree/Trees.js"(exports2, module2) {
    var Utils = require_Utils();
    var { Token } = require_Token();
    var { ErrorNode, TerminalNode, RuleNode } = require_Tree();
    var Trees = {
      toStringTree: function(tree, ruleNames, recog) {
        ruleNames = ruleNames || null;
        recog = recog || null;
        if (recog !== null) {
          ruleNames = recog.ruleNames;
        }
        let s = Trees.getNodeText(tree, ruleNames);
        s = Utils.escapeWhitespace(s, false);
        const c = tree.getChildCount();
        if (c === 0) {
          return s;
        }
        let res = "(" + s + " ";
        if (c > 0) {
          s = Trees.toStringTree(tree.getChild(0), ruleNames);
          res = res.concat(s);
        }
        for (let i = 1; i < c; i++) {
          s = Trees.toStringTree(tree.getChild(i), ruleNames);
          res = res.concat(" " + s);
        }
        res = res.concat(")");
        return res;
      },
      getNodeText: function(t, ruleNames, recog) {
        ruleNames = ruleNames || null;
        recog = recog || null;
        if (recog !== null) {
          ruleNames = recog.ruleNames;
        }
        if (ruleNames !== null) {
          if (t instanceof RuleNode) {
            const context = t.getRuleContext();
            const altNumber = context.getAltNumber();
            if (altNumber != 0) {
              return ruleNames[t.ruleIndex] + ":" + altNumber;
            }
            return ruleNames[t.ruleIndex];
          } else if (t instanceof ErrorNode) {
            return t.toString();
          } else if (t instanceof TerminalNode) {
            if (t.symbol !== null) {
              return t.symbol.text;
            }
          }
        }
        const payload = t.getPayload();
        if (payload instanceof Token) {
          return payload.text;
        }
        return t.getPayload().toString();
      },
      getChildren: function(t) {
        const list = [];
        for (let i = 0; i < t.getChildCount(); i++) {
          list.push(t.getChild(i));
        }
        return list;
      },
      getAncestors: function(t) {
        let ancestors = [];
        t = t.getParent();
        while (t !== null) {
          ancestors = [t].concat(ancestors);
          t = t.getParent();
        }
        return ancestors;
      },
      findAllTokenNodes: function(t, ttype) {
        return Trees.findAllNodes(t, ttype, true);
      },
      findAllRuleNodes: function(t, ruleIndex) {
        return Trees.findAllNodes(t, ruleIndex, false);
      },
      findAllNodes: function(t, index, findTokens) {
        const nodes = [];
        Trees._findAllNodes(t, index, findTokens, nodes);
        return nodes;
      },
      _findAllNodes: function(t, index, findTokens, nodes) {
        if (findTokens && t instanceof TerminalNode) {
          if (t.symbol.type === index) {
            nodes.push(t);
          }
        } else if (!findTokens && t instanceof RuleNode) {
          if (t.ruleIndex === index) {
            nodes.push(t);
          }
        }
        for (let i = 0; i < t.getChildCount(); i++) {
          Trees._findAllNodes(t.getChild(i), index, findTokens, nodes);
        }
      },
      descendants: function(t) {
        let nodes = [t];
        for (let i = 0; i < t.getChildCount(); i++) {
          nodes = nodes.concat(Trees.descendants(t.getChild(i)));
        }
        return nodes;
      }
    };
    module2.exports = Trees;
  }
});

// ../../node_modules/antlr4/src/antlr4/RuleContext.js
var require_RuleContext = __commonJS({
  "../../node_modules/antlr4/src/antlr4/RuleContext.js"(exports2, module2) {
    var { RuleNode } = require_Tree();
    var { INVALID_INTERVAL } = require_Tree();
    var Trees = require_Trees();
    var RuleContext = class extends RuleNode {
      constructor(parent, invokingState) {
        super();
        this.parentCtx = parent || null;
        this.invokingState = invokingState || -1;
      }
      depth() {
        let n = 0;
        let p = this;
        while (p !== null) {
          p = p.parentCtx;
          n += 1;
        }
        return n;
      }
      isEmpty() {
        return this.invokingState === -1;
      }
      getSourceInterval() {
        return INVALID_INTERVAL;
      }
      getRuleContext() {
        return this;
      }
      getPayload() {
        return this;
      }
      getText() {
        if (this.getChildCount() === 0) {
          return "";
        } else {
          return this.children.map(function(child) {
            return child.getText();
          }).join("");
        }
      }
      getAltNumber() {
        return 0;
      }
      setAltNumber(altNumber) {
      }
      getChild(i) {
        return null;
      }
      getChildCount() {
        return 0;
      }
      accept(visitor) {
        return visitor.visitChildren(this);
      }
      toStringTree(ruleNames, recog) {
        return Trees.toStringTree(this, ruleNames, recog);
      }
      toString(ruleNames, stop) {
        ruleNames = ruleNames || null;
        stop = stop || null;
        let p = this;
        let s = "[";
        while (p !== null && p !== stop) {
          if (ruleNames === null) {
            if (!p.isEmpty()) {
              s += p.invokingState;
            }
          } else {
            const ri = p.ruleIndex;
            const ruleName = ri >= 0 && ri < ruleNames.length ? ruleNames[ri] : "" + ri;
            s += ruleName;
          }
          if (p.parentCtx !== null && (ruleNames !== null || !p.parentCtx.isEmpty())) {
            s += " ";
          }
          p = p.parentCtx;
        }
        s += "]";
        return s;
      }
    };
    module2.exports = RuleContext;
  }
});

// ../../node_modules/antlr4/src/antlr4/PredictionContext.js
var require_PredictionContext = __commonJS({
  "../../node_modules/antlr4/src/antlr4/PredictionContext.js"(exports2, module2) {
    var RuleContext = require_RuleContext();
    var { Hash: Hash2, Map, equalArrays } = require_Utils();
    var PredictionContext = class {
      constructor(cachedHashCode) {
        this.cachedHashCode = cachedHashCode;
      }
      isEmpty() {
        return this === PredictionContext.EMPTY;
      }
      hasEmptyPath() {
        return this.getReturnState(this.length - 1) === PredictionContext.EMPTY_RETURN_STATE;
      }
      hashCode() {
        return this.cachedHashCode;
      }
      updateHashCode(hash) {
        hash.update(this.cachedHashCode);
      }
    };
    PredictionContext.EMPTY = null;
    PredictionContext.EMPTY_RETURN_STATE = 2147483647;
    PredictionContext.globalNodeCount = 1;
    PredictionContext.id = PredictionContext.globalNodeCount;
    var PredictionContextCache = class {
      constructor() {
        this.cache = new Map();
      }
      add(ctx) {
        if (ctx === PredictionContext.EMPTY) {
          return PredictionContext.EMPTY;
        }
        const existing = this.cache.get(ctx) || null;
        if (existing !== null) {
          return existing;
        }
        this.cache.put(ctx, ctx);
        return ctx;
      }
      get(ctx) {
        return this.cache.get(ctx) || null;
      }
      get length() {
        return this.cache.length;
      }
    };
    var SingletonPredictionContext = class extends PredictionContext {
      constructor(parent, returnState) {
        let hashCode = 0;
        const hash = new Hash2();
        if (parent !== null) {
          hash.update(parent, returnState);
        } else {
          hash.update(1);
        }
        hashCode = hash.finish();
        super(hashCode);
        this.parentCtx = parent;
        this.returnState = returnState;
      }
      getParent(index) {
        return this.parentCtx;
      }
      getReturnState(index) {
        return this.returnState;
      }
      equals(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof SingletonPredictionContext)) {
          return false;
        } else if (this.hashCode() !== other.hashCode()) {
          return false;
        } else {
          if (this.returnState !== other.returnState)
            return false;
          else if (this.parentCtx == null)
            return other.parentCtx == null;
          else
            return this.parentCtx.equals(other.parentCtx);
        }
      }
      toString() {
        const up = this.parentCtx === null ? "" : this.parentCtx.toString();
        if (up.length === 0) {
          if (this.returnState === PredictionContext.EMPTY_RETURN_STATE) {
            return "$";
          } else {
            return "" + this.returnState;
          }
        } else {
          return "" + this.returnState + " " + up;
        }
      }
      get length() {
        return 1;
      }
      static create(parent, returnState) {
        if (returnState === PredictionContext.EMPTY_RETURN_STATE && parent === null) {
          return PredictionContext.EMPTY;
        } else {
          return new SingletonPredictionContext(parent, returnState);
        }
      }
    };
    var EmptyPredictionContext = class extends SingletonPredictionContext {
      constructor() {
        super(null, PredictionContext.EMPTY_RETURN_STATE);
      }
      isEmpty() {
        return true;
      }
      getParent(index) {
        return null;
      }
      getReturnState(index) {
        return this.returnState;
      }
      equals(other) {
        return this === other;
      }
      toString() {
        return "$";
      }
    };
    PredictionContext.EMPTY = new EmptyPredictionContext();
    var ArrayPredictionContext = class extends PredictionContext {
      constructor(parents, returnStates) {
        const h = new Hash2();
        h.update(parents, returnStates);
        const hashCode = h.finish();
        super(hashCode);
        this.parents = parents;
        this.returnStates = returnStates;
        return this;
      }
      isEmpty() {
        return this.returnStates[0] === PredictionContext.EMPTY_RETURN_STATE;
      }
      getParent(index) {
        return this.parents[index];
      }
      getReturnState(index) {
        return this.returnStates[index];
      }
      equals(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof ArrayPredictionContext)) {
          return false;
        } else if (this.hashCode() !== other.hashCode()) {
          return false;
        } else {
          return equalArrays(this.returnStates, other.returnStates) && equalArrays(this.parents, other.parents);
        }
      }
      toString() {
        if (this.isEmpty()) {
          return "[]";
        } else {
          let s = "[";
          for (let i = 0; i < this.returnStates.length; i++) {
            if (i > 0) {
              s = s + ", ";
            }
            if (this.returnStates[i] === PredictionContext.EMPTY_RETURN_STATE) {
              s = s + "$";
              continue;
            }
            s = s + this.returnStates[i];
            if (this.parents[i] !== null) {
              s = s + " " + this.parents[i];
            } else {
              s = s + "null";
            }
          }
          return s + "]";
        }
      }
      get length() {
        return this.returnStates.length;
      }
    };
    function predictionContextFromRuleContext(atn, outerContext) {
      if (outerContext === void 0 || outerContext === null) {
        outerContext = RuleContext.EMPTY;
      }
      if (outerContext.parentCtx === null || outerContext === RuleContext.EMPTY) {
        return PredictionContext.EMPTY;
      }
      const parent = predictionContextFromRuleContext(atn, outerContext.parentCtx);
      const state = atn.states[outerContext.invokingState];
      const transition = state.transitions[0];
      return SingletonPredictionContext.create(parent, transition.followState.stateNumber);
    }
    function merge(a, b, rootIsWildcard, mergeCache) {
      if (a === b) {
        return a;
      }
      if (a instanceof SingletonPredictionContext && b instanceof SingletonPredictionContext) {
        return mergeSingletons(a, b, rootIsWildcard, mergeCache);
      }
      if (rootIsWildcard) {
        if (a instanceof EmptyPredictionContext) {
          return a;
        }
        if (b instanceof EmptyPredictionContext) {
          return b;
        }
      }
      if (a instanceof SingletonPredictionContext) {
        a = new ArrayPredictionContext([a.getParent()], [a.returnState]);
      }
      if (b instanceof SingletonPredictionContext) {
        b = new ArrayPredictionContext([b.getParent()], [b.returnState]);
      }
      return mergeArrays(a, b, rootIsWildcard, mergeCache);
    }
    function mergeSingletons(a, b, rootIsWildcard, mergeCache) {
      if (mergeCache !== null) {
        let previous = mergeCache.get(a, b);
        if (previous !== null) {
          return previous;
        }
        previous = mergeCache.get(b, a);
        if (previous !== null) {
          return previous;
        }
      }
      const rootMerge = mergeRoot(a, b, rootIsWildcard);
      if (rootMerge !== null) {
        if (mergeCache !== null) {
          mergeCache.set(a, b, rootMerge);
        }
        return rootMerge;
      }
      if (a.returnState === b.returnState) {
        const parent = merge(a.parentCtx, b.parentCtx, rootIsWildcard, mergeCache);
        if (parent === a.parentCtx) {
          return a;
        }
        if (parent === b.parentCtx) {
          return b;
        }
        const spc = SingletonPredictionContext.create(parent, a.returnState);
        if (mergeCache !== null) {
          mergeCache.set(a, b, spc);
        }
        return spc;
      } else {
        let singleParent = null;
        if (a === b || a.parentCtx !== null && a.parentCtx === b.parentCtx) {
          singleParent = a.parentCtx;
        }
        if (singleParent !== null) {
          const payloads2 = [a.returnState, b.returnState];
          if (a.returnState > b.returnState) {
            payloads2[0] = b.returnState;
            payloads2[1] = a.returnState;
          }
          const parents2 = [singleParent, singleParent];
          const apc = new ArrayPredictionContext(parents2, payloads2);
          if (mergeCache !== null) {
            mergeCache.set(a, b, apc);
          }
          return apc;
        }
        const payloads = [a.returnState, b.returnState];
        let parents = [a.parentCtx, b.parentCtx];
        if (a.returnState > b.returnState) {
          payloads[0] = b.returnState;
          payloads[1] = a.returnState;
          parents = [b.parentCtx, a.parentCtx];
        }
        const a_ = new ArrayPredictionContext(parents, payloads);
        if (mergeCache !== null) {
          mergeCache.set(a, b, a_);
        }
        return a_;
      }
    }
    function mergeRoot(a, b, rootIsWildcard) {
      if (rootIsWildcard) {
        if (a === PredictionContext.EMPTY) {
          return PredictionContext.EMPTY;
        }
        if (b === PredictionContext.EMPTY) {
          return PredictionContext.EMPTY;
        }
      } else {
        if (a === PredictionContext.EMPTY && b === PredictionContext.EMPTY) {
          return PredictionContext.EMPTY;
        } else if (a === PredictionContext.EMPTY) {
          const payloads = [
            b.returnState,
            PredictionContext.EMPTY_RETURN_STATE
          ];
          const parents = [b.parentCtx, null];
          return new ArrayPredictionContext(parents, payloads);
        } else if (b === PredictionContext.EMPTY) {
          const payloads = [a.returnState, PredictionContext.EMPTY_RETURN_STATE];
          const parents = [a.parentCtx, null];
          return new ArrayPredictionContext(parents, payloads);
        }
      }
      return null;
    }
    function mergeArrays(a, b, rootIsWildcard, mergeCache) {
      if (mergeCache !== null) {
        let previous = mergeCache.get(a, b);
        if (previous !== null) {
          return previous;
        }
        previous = mergeCache.get(b, a);
        if (previous !== null) {
          return previous;
        }
      }
      let i = 0;
      let j = 0;
      let k = 0;
      let mergedReturnStates = [];
      let mergedParents = [];
      while (i < a.returnStates.length && j < b.returnStates.length) {
        const a_parent = a.parents[i];
        const b_parent = b.parents[j];
        if (a.returnStates[i] === b.returnStates[j]) {
          const payload = a.returnStates[i];
          const bothDollars = payload === PredictionContext.EMPTY_RETURN_STATE && a_parent === null && b_parent === null;
          const ax_ax = a_parent !== null && b_parent !== null && a_parent === b_parent;
          if (bothDollars || ax_ax) {
            mergedParents[k] = a_parent;
            mergedReturnStates[k] = payload;
          } else {
            mergedParents[k] = merge(a_parent, b_parent, rootIsWildcard, mergeCache);
            mergedReturnStates[k] = payload;
          }
          i += 1;
          j += 1;
        } else if (a.returnStates[i] < b.returnStates[j]) {
          mergedParents[k] = a_parent;
          mergedReturnStates[k] = a.returnStates[i];
          i += 1;
        } else {
          mergedParents[k] = b_parent;
          mergedReturnStates[k] = b.returnStates[j];
          j += 1;
        }
        k += 1;
      }
      if (i < a.returnStates.length) {
        for (let p = i; p < a.returnStates.length; p++) {
          mergedParents[k] = a.parents[p];
          mergedReturnStates[k] = a.returnStates[p];
          k += 1;
        }
      } else {
        for (let p = j; p < b.returnStates.length; p++) {
          mergedParents[k] = b.parents[p];
          mergedReturnStates[k] = b.returnStates[p];
          k += 1;
        }
      }
      if (k < mergedParents.length) {
        if (k === 1) {
          const a_ = SingletonPredictionContext.create(mergedParents[0], mergedReturnStates[0]);
          if (mergeCache !== null) {
            mergeCache.set(a, b, a_);
          }
          return a_;
        }
        mergedParents = mergedParents.slice(0, k);
        mergedReturnStates = mergedReturnStates.slice(0, k);
      }
      const M = new ArrayPredictionContext(mergedParents, mergedReturnStates);
      if (M === a) {
        if (mergeCache !== null) {
          mergeCache.set(a, b, a);
        }
        return a;
      }
      if (M === b) {
        if (mergeCache !== null) {
          mergeCache.set(a, b, b);
        }
        return b;
      }
      combineCommonParents(mergedParents);
      if (mergeCache !== null) {
        mergeCache.set(a, b, M);
      }
      return M;
    }
    function combineCommonParents(parents) {
      const uniqueParents = new Map();
      for (let p = 0; p < parents.length; p++) {
        const parent = parents[p];
        if (!uniqueParents.containsKey(parent)) {
          uniqueParents.put(parent, parent);
        }
      }
      for (let q = 0; q < parents.length; q++) {
        parents[q] = uniqueParents.get(parents[q]);
      }
    }
    function getCachedPredictionContext(context, contextCache, visited) {
      if (context.isEmpty()) {
        return context;
      }
      let existing = visited.get(context) || null;
      if (existing !== null) {
        return existing;
      }
      existing = contextCache.get(context);
      if (existing !== null) {
        visited.put(context, existing);
        return existing;
      }
      let changed = false;
      let parents = [];
      for (let i = 0; i < parents.length; i++) {
        const parent = getCachedPredictionContext(context.getParent(i), contextCache, visited);
        if (changed || parent !== context.getParent(i)) {
          if (!changed) {
            parents = [];
            for (let j = 0; j < context.length; j++) {
              parents[j] = context.getParent(j);
            }
            changed = true;
          }
          parents[i] = parent;
        }
      }
      if (!changed) {
        contextCache.add(context);
        visited.put(context, context);
        return context;
      }
      let updated = null;
      if (parents.length === 0) {
        updated = PredictionContext.EMPTY;
      } else if (parents.length === 1) {
        updated = SingletonPredictionContext.create(parents[0], context.getReturnState(0));
      } else {
        updated = new ArrayPredictionContext(parents, context.returnStates);
      }
      contextCache.add(updated);
      visited.put(updated, updated);
      visited.put(context, updated);
      return updated;
    }
    module2.exports = {
      merge,
      PredictionContext,
      PredictionContextCache,
      SingletonPredictionContext,
      predictionContextFromRuleContext,
      getCachedPredictionContext
    };
  }
});

// ../../node_modules/antlr4/src/antlr4/LL1Analyzer.js
var require_LL1Analyzer = __commonJS({
  "../../node_modules/antlr4/src/antlr4/LL1Analyzer.js"(exports2, module2) {
    var { Set, BitSet } = require_Utils();
    var { Token } = require_Token();
    var { ATNConfig } = require_ATNConfig();
    var { IntervalSet } = require_IntervalSet();
    var { RuleStopState } = require_ATNState();
    var { RuleTransition, NotSetTransition, WildcardTransition, AbstractPredicateTransition } = require_Transition();
    var { predictionContextFromRuleContext, PredictionContext, SingletonPredictionContext } = require_PredictionContext();
    var LL1Analyzer = class {
      constructor(atn) {
        this.atn = atn;
      }
      getDecisionLookahead(s) {
        if (s === null) {
          return null;
        }
        const count = s.transitions.length;
        const look = [];
        for (let alt = 0; alt < count; alt++) {
          look[alt] = new IntervalSet();
          const lookBusy = new Set();
          const seeThruPreds = false;
          this._LOOK(s.transition(alt).target, null, PredictionContext.EMPTY, look[alt], lookBusy, new BitSet(), seeThruPreds, false);
          if (look[alt].length === 0 || look[alt].contains(LL1Analyzer.HIT_PRED)) {
            look[alt] = null;
          }
        }
        return look;
      }
      LOOK(s, stopState, ctx) {
        const r = new IntervalSet();
        const seeThruPreds = true;
        ctx = ctx || null;
        const lookContext = ctx !== null ? predictionContextFromRuleContext(s.atn, ctx) : null;
        this._LOOK(s, stopState, lookContext, r, new Set(), new BitSet(), seeThruPreds, true);
        return r;
      }
      _LOOK(s, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF) {
        const c = new ATNConfig({ state: s, alt: 0, context: ctx }, null);
        if (lookBusy.contains(c)) {
          return;
        }
        lookBusy.add(c);
        if (s === stopState) {
          if (ctx === null) {
            look.addOne(Token.EPSILON);
            return;
          } else if (ctx.isEmpty() && addEOF) {
            look.addOne(Token.EOF);
            return;
          }
        }
        if (s instanceof RuleStopState) {
          if (ctx === null) {
            look.addOne(Token.EPSILON);
            return;
          } else if (ctx.isEmpty() && addEOF) {
            look.addOne(Token.EOF);
            return;
          }
          if (ctx !== PredictionContext.EMPTY) {
            const removed = calledRuleStack.contains(s.ruleIndex);
            try {
              calledRuleStack.remove(s.ruleIndex);
              for (let i = 0; i < ctx.length; i++) {
                const returnState = this.atn.states[ctx.getReturnState(i)];
                this._LOOK(returnState, stopState, ctx.getParent(i), look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
              }
            } finally {
              if (removed) {
                calledRuleStack.add(s.ruleIndex);
              }
            }
            return;
          }
        }
        for (let j = 0; j < s.transitions.length; j++) {
          const t = s.transitions[j];
          if (t.constructor === RuleTransition) {
            if (calledRuleStack.contains(t.target.ruleIndex)) {
              continue;
            }
            const newContext = SingletonPredictionContext.create(ctx, t.followState.stateNumber);
            try {
              calledRuleStack.add(t.target.ruleIndex);
              this._LOOK(t.target, stopState, newContext, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
            } finally {
              calledRuleStack.remove(t.target.ruleIndex);
            }
          } else if (t instanceof AbstractPredicateTransition) {
            if (seeThruPreds) {
              this._LOOK(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
            } else {
              look.addOne(LL1Analyzer.HIT_PRED);
            }
          } else if (t.isEpsilon) {
            this._LOOK(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
          } else if (t.constructor === WildcardTransition) {
            look.addRange(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
          } else {
            let set = t.label;
            if (set !== null) {
              if (t instanceof NotSetTransition) {
                set = set.complement(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
              }
              look.addSet(set);
            }
          }
        }
      }
    };
    LL1Analyzer.HIT_PRED = Token.INVALID_TYPE;
    module2.exports = LL1Analyzer;
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/ATN.js
var require_ATN = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/ATN.js"(exports2, module2) {
    var LL1Analyzer = require_LL1Analyzer();
    var { IntervalSet } = require_IntervalSet();
    var { Token } = require_Token();
    var ATN = class {
      constructor(grammarType, maxTokenType) {
        this.grammarType = grammarType;
        this.maxTokenType = maxTokenType;
        this.states = [];
        this.decisionToState = [];
        this.ruleToStartState = [];
        this.ruleToStopState = null;
        this.modeNameToStartState = {};
        this.ruleToTokenType = null;
        this.lexerActions = null;
        this.modeToStartState = [];
      }
      nextTokensInContext(s, ctx) {
        const anal = new LL1Analyzer(this);
        return anal.LOOK(s, null, ctx);
      }
      nextTokensNoContext(s) {
        if (s.nextTokenWithinRule !== null) {
          return s.nextTokenWithinRule;
        }
        s.nextTokenWithinRule = this.nextTokensInContext(s, null);
        s.nextTokenWithinRule.readOnly = true;
        return s.nextTokenWithinRule;
      }
      nextTokens(s, ctx) {
        if (ctx === void 0) {
          return this.nextTokensNoContext(s);
        } else {
          return this.nextTokensInContext(s, ctx);
        }
      }
      addState(state) {
        if (state !== null) {
          state.atn = this;
          state.stateNumber = this.states.length;
        }
        this.states.push(state);
      }
      removeState(state) {
        this.states[state.stateNumber] = null;
      }
      defineDecisionState(s) {
        this.decisionToState.push(s);
        s.decision = this.decisionToState.length - 1;
        return s.decision;
      }
      getDecisionState(decision) {
        if (this.decisionToState.length === 0) {
          return null;
        } else {
          return this.decisionToState[decision];
        }
      }
      getExpectedTokens(stateNumber, ctx) {
        if (stateNumber < 0 || stateNumber >= this.states.length) {
          throw "Invalid state number.";
        }
        const s = this.states[stateNumber];
        let following = this.nextTokens(s);
        if (!following.contains(Token.EPSILON)) {
          return following;
        }
        const expected = new IntervalSet();
        expected.addSet(following);
        expected.removeOne(Token.EPSILON);
        while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
          const invokingState = this.states[ctx.invokingState];
          const rt = invokingState.transitions[0];
          following = this.nextTokens(rt.followState);
          expected.addSet(following);
          expected.removeOne(Token.EPSILON);
          ctx = ctx.parentCtx;
        }
        if (following.contains(Token.EPSILON)) {
          expected.addOne(Token.EOF);
        }
        return expected;
      }
    };
    ATN.INVALID_ALT_NUMBER = 0;
    module2.exports = ATN;
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/ATNType.js
var require_ATNType = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/ATNType.js"(exports2, module2) {
    module2.exports = {
      LEXER: 0,
      PARSER: 1
    };
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/ATNDeserializationOptions.js
var require_ATNDeserializationOptions = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/ATNDeserializationOptions.js"(exports2, module2) {
    var ATNDeserializationOptions = class {
      constructor(copyFrom) {
        if (copyFrom === void 0) {
          copyFrom = null;
        }
        this.readOnly = false;
        this.verifyATN = copyFrom === null ? true : copyFrom.verifyATN;
        this.generateRuleBypassTransitions = copyFrom === null ? false : copyFrom.generateRuleBypassTransitions;
      }
    };
    ATNDeserializationOptions.defaultOptions = new ATNDeserializationOptions();
    ATNDeserializationOptions.defaultOptions.readOnly = true;
    module2.exports = ATNDeserializationOptions;
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/LexerAction.js
var require_LexerAction = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/LexerAction.js"(exports2, module2) {
    var LexerActionType = {
      CHANNEL: 0,
      CUSTOM: 1,
      MODE: 2,
      MORE: 3,
      POP_MODE: 4,
      PUSH_MODE: 5,
      SKIP: 6,
      TYPE: 7
    };
    var LexerAction = class {
      constructor(action) {
        this.actionType = action;
        this.isPositionDependent = false;
      }
      hashCode() {
        const hash = new Hash();
        this.updateHashCode(hash);
        return hash.finish();
      }
      updateHashCode(hash) {
        hash.update(this.actionType);
      }
      equals(other) {
        return this === other;
      }
    };
    var LexerSkipAction = class extends LexerAction {
      constructor() {
        super(LexerActionType.SKIP);
      }
      execute(lexer) {
        lexer.skip();
      }
      toString() {
        return "skip";
      }
    };
    LexerSkipAction.INSTANCE = new LexerSkipAction();
    var LexerTypeAction = class extends LexerAction {
      constructor(type) {
        super(LexerActionType.TYPE);
        this.type = type;
      }
      execute(lexer) {
        lexer.type = this.type;
      }
      updateHashCode(hash) {
        hash.update(this.actionType, this.type);
      }
      equals(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof LexerTypeAction)) {
          return false;
        } else {
          return this.type === other.type;
        }
      }
      toString() {
        return "type(" + this.type + ")";
      }
    };
    var LexerPushModeAction = class extends LexerAction {
      constructor(mode) {
        super(LexerActionType.PUSH_MODE);
        this.mode = mode;
      }
      execute(lexer) {
        lexer.pushMode(this.mode);
      }
      updateHashCode(hash) {
        hash.update(this.actionType, this.mode);
      }
      equals(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof LexerPushModeAction)) {
          return false;
        } else {
          return this.mode === other.mode;
        }
      }
      toString() {
        return "pushMode(" + this.mode + ")";
      }
    };
    var LexerPopModeAction = class extends LexerAction {
      constructor() {
        super(LexerActionType.POP_MODE);
      }
      execute(lexer) {
        lexer.popMode();
      }
      toString() {
        return "popMode";
      }
    };
    LexerPopModeAction.INSTANCE = new LexerPopModeAction();
    var LexerMoreAction = class extends LexerAction {
      constructor() {
        super(LexerActionType.MORE);
      }
      execute(lexer) {
        lexer.more();
      }
      toString() {
        return "more";
      }
    };
    LexerMoreAction.INSTANCE = new LexerMoreAction();
    var LexerModeAction = class extends LexerAction {
      constructor(mode) {
        super(LexerActionType.MODE);
        this.mode = mode;
      }
      execute(lexer) {
        lexer.mode(this.mode);
      }
      updateHashCode(hash) {
        hash.update(this.actionType, this.mode);
      }
      equals(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof LexerModeAction)) {
          return false;
        } else {
          return this.mode === other.mode;
        }
      }
      toString() {
        return "mode(" + this.mode + ")";
      }
    };
    var LexerCustomAction = class extends LexerAction {
      constructor(ruleIndex, actionIndex) {
        super(LexerActionType.CUSTOM);
        this.ruleIndex = ruleIndex;
        this.actionIndex = actionIndex;
        this.isPositionDependent = true;
      }
      execute(lexer) {
        lexer.action(null, this.ruleIndex, this.actionIndex);
      }
      updateHashCode(hash) {
        hash.update(this.actionType, this.ruleIndex, this.actionIndex);
      }
      equals(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof LexerCustomAction)) {
          return false;
        } else {
          return this.ruleIndex === other.ruleIndex && this.actionIndex === other.actionIndex;
        }
      }
    };
    var LexerChannelAction = class extends LexerAction {
      constructor(channel) {
        super(LexerActionType.CHANNEL);
        this.channel = channel;
      }
      execute(lexer) {
        lexer._channel = this.channel;
      }
      updateHashCode(hash) {
        hash.update(this.actionType, this.channel);
      }
      equals(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof LexerChannelAction)) {
          return false;
        } else {
          return this.channel === other.channel;
        }
      }
      toString() {
        return "channel(" + this.channel + ")";
      }
    };
    var LexerIndexedCustomAction = class extends LexerAction {
      constructor(offset, action) {
        super(action.actionType);
        this.offset = offset;
        this.action = action;
        this.isPositionDependent = true;
      }
      execute(lexer) {
        this.action.execute(lexer);
      }
      updateHashCode(hash) {
        hash.update(this.actionType, this.offset, this.action);
      }
      equals(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof LexerIndexedCustomAction)) {
          return false;
        } else {
          return this.offset === other.offset && this.action === other.action;
        }
      }
    };
    module2.exports = {
      LexerActionType,
      LexerSkipAction,
      LexerChannelAction,
      LexerCustomAction,
      LexerIndexedCustomAction,
      LexerMoreAction,
      LexerTypeAction,
      LexerPushModeAction,
      LexerPopModeAction,
      LexerModeAction
    };
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/ATNDeserializer.js
var require_ATNDeserializer = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/ATNDeserializer.js"(exports2, module2) {
    var { Token } = require_Token();
    var ATN = require_ATN();
    var ATNType = require_ATNType();
    var {
      ATNState,
      BasicState,
      DecisionState,
      BlockStartState,
      BlockEndState,
      LoopEndState,
      RuleStartState,
      RuleStopState,
      TokensStartState,
      PlusLoopbackState,
      StarLoopbackState,
      StarLoopEntryState,
      PlusBlockStartState,
      StarBlockStartState,
      BasicBlockStartState
    } = require_ATNState();
    var {
      Transition,
      AtomTransition: AtomTransition2,
      SetTransition,
      NotSetTransition,
      RuleTransition,
      RangeTransition,
      ActionTransition,
      EpsilonTransition,
      WildcardTransition,
      PredicateTransition,
      PrecedencePredicateTransition
    } = require_Transition();
    var { IntervalSet } = require_IntervalSet();
    var ATNDeserializationOptions = require_ATNDeserializationOptions();
    var {
      LexerActionType,
      LexerSkipAction,
      LexerChannelAction,
      LexerCustomAction,
      LexerMoreAction,
      LexerTypeAction,
      LexerPushModeAction,
      LexerPopModeAction,
      LexerModeAction
    } = require_LexerAction();
    var BASE_SERIALIZED_UUID = "AADB8D7E-AEEF-4415-AD2B-8204D6CF042E";
    var ADDED_UNICODE_SMP = "59627784-3BE5-417A-B9EB-8131A7286089";
    var SUPPORTED_UUIDS = [BASE_SERIALIZED_UUID, ADDED_UNICODE_SMP];
    var SERIALIZED_VERSION = 3;
    var SERIALIZED_UUID = ADDED_UNICODE_SMP;
    function initArray(length, value) {
      const tmp = [];
      tmp[length - 1] = value;
      return tmp.map(function(i) {
        return value;
      });
    }
    var ATNDeserializer = class {
      constructor(options) {
        if (options === void 0 || options === null) {
          options = ATNDeserializationOptions.defaultOptions;
        }
        this.deserializationOptions = options;
        this.stateFactories = null;
        this.actionFactories = null;
      }
      isFeatureSupported(feature, actualUuid) {
        const idx1 = SUPPORTED_UUIDS.indexOf(feature);
        if (idx1 < 0) {
          return false;
        }
        const idx2 = SUPPORTED_UUIDS.indexOf(actualUuid);
        return idx2 >= idx1;
      }
      deserialize(data) {
        this.reset(data);
        this.checkVersion();
        this.checkUUID();
        const atn = this.readATN();
        this.readStates(atn);
        this.readRules(atn);
        this.readModes(atn);
        const sets = [];
        this.readSets(atn, sets, this.readInt.bind(this));
        if (this.isFeatureSupported(ADDED_UNICODE_SMP, this.uuid)) {
          this.readSets(atn, sets, this.readInt32.bind(this));
        }
        this.readEdges(atn, sets);
        this.readDecisions(atn);
        this.readLexerActions(atn);
        this.markPrecedenceDecisions(atn);
        this.verifyATN(atn);
        if (this.deserializationOptions.generateRuleBypassTransitions && atn.grammarType === ATNType.PARSER) {
          this.generateRuleBypassTransitions(atn);
          this.verifyATN(atn);
        }
        return atn;
      }
      reset(data) {
        const adjust = function(c) {
          const v = c.charCodeAt(0);
          return v > 1 ? v - 2 : v + 65534;
        };
        const temp = data.split("").map(adjust);
        temp[0] = data.charCodeAt(0);
        this.data = temp;
        this.pos = 0;
      }
      checkVersion() {
        const version = this.readInt();
        if (version !== SERIALIZED_VERSION) {
          throw "Could not deserialize ATN with version " + version + " (expected " + SERIALIZED_VERSION + ").";
        }
      }
      checkUUID() {
        const uuid = this.readUUID();
        if (SUPPORTED_UUIDS.indexOf(uuid) < 0) {
          throw "Could not deserialize ATN with UUID: " + uuid + " (expected " + SERIALIZED_UUID + " or a legacy UUID).", uuid, SERIALIZED_UUID;
        }
        this.uuid = uuid;
      }
      readATN() {
        const grammarType = this.readInt();
        const maxTokenType = this.readInt();
        return new ATN(grammarType, maxTokenType);
      }
      readStates(atn) {
        let j, pair, stateNumber;
        const loopBackStateNumbers = [];
        const endStateNumbers = [];
        const nstates = this.readInt();
        for (let i = 0; i < nstates; i++) {
          const stype = this.readInt();
          if (stype === ATNState.INVALID_TYPE) {
            atn.addState(null);
            continue;
          }
          let ruleIndex = this.readInt();
          if (ruleIndex === 65535) {
            ruleIndex = -1;
          }
          const s = this.stateFactory(stype, ruleIndex);
          if (stype === ATNState.LOOP_END) {
            const loopBackStateNumber = this.readInt();
            loopBackStateNumbers.push([s, loopBackStateNumber]);
          } else if (s instanceof BlockStartState) {
            const endStateNumber = this.readInt();
            endStateNumbers.push([s, endStateNumber]);
          }
          atn.addState(s);
        }
        for (j = 0; j < loopBackStateNumbers.length; j++) {
          pair = loopBackStateNumbers[j];
          pair[0].loopBackState = atn.states[pair[1]];
        }
        for (j = 0; j < endStateNumbers.length; j++) {
          pair = endStateNumbers[j];
          pair[0].endState = atn.states[pair[1]];
        }
        let numNonGreedyStates = this.readInt();
        for (j = 0; j < numNonGreedyStates; j++) {
          stateNumber = this.readInt();
          atn.states[stateNumber].nonGreedy = true;
        }
        let numPrecedenceStates = this.readInt();
        for (j = 0; j < numPrecedenceStates; j++) {
          stateNumber = this.readInt();
          atn.states[stateNumber].isPrecedenceRule = true;
        }
      }
      readRules(atn) {
        let i;
        const nrules = this.readInt();
        if (atn.grammarType === ATNType.LEXER) {
          atn.ruleToTokenType = initArray(nrules, 0);
        }
        atn.ruleToStartState = initArray(nrules, 0);
        for (i = 0; i < nrules; i++) {
          const s = this.readInt();
          atn.ruleToStartState[i] = atn.states[s];
          if (atn.grammarType === ATNType.LEXER) {
            let tokenType = this.readInt();
            if (tokenType === 65535) {
              tokenType = Token.EOF;
            }
            atn.ruleToTokenType[i] = tokenType;
          }
        }
        atn.ruleToStopState = initArray(nrules, 0);
        for (i = 0; i < atn.states.length; i++) {
          const state = atn.states[i];
          if (!(state instanceof RuleStopState)) {
            continue;
          }
          atn.ruleToStopState[state.ruleIndex] = state;
          atn.ruleToStartState[state.ruleIndex].stopState = state;
        }
      }
      readModes(atn) {
        const nmodes = this.readInt();
        for (let i = 0; i < nmodes; i++) {
          let s = this.readInt();
          atn.modeToStartState.push(atn.states[s]);
        }
      }
      readSets(atn, sets, readUnicode) {
        const m = this.readInt();
        for (let i = 0; i < m; i++) {
          const iset = new IntervalSet();
          sets.push(iset);
          const n = this.readInt();
          const containsEof = this.readInt();
          if (containsEof !== 0) {
            iset.addOne(-1);
          }
          for (let j = 0; j < n; j++) {
            const i1 = readUnicode();
            const i2 = readUnicode();
            iset.addRange(i1, i2);
          }
        }
      }
      readEdges(atn, sets) {
        let i, j, state, trans, target;
        const nedges = this.readInt();
        for (i = 0; i < nedges; i++) {
          const src = this.readInt();
          const trg = this.readInt();
          const ttype = this.readInt();
          const arg1 = this.readInt();
          const arg2 = this.readInt();
          const arg3 = this.readInt();
          trans = this.edgeFactory(atn, ttype, src, trg, arg1, arg2, arg3, sets);
          const srcState = atn.states[src];
          srcState.addTransition(trans);
        }
        for (i = 0; i < atn.states.length; i++) {
          state = atn.states[i];
          for (j = 0; j < state.transitions.length; j++) {
            const t = state.transitions[j];
            if (!(t instanceof RuleTransition)) {
              continue;
            }
            let outermostPrecedenceReturn = -1;
            if (atn.ruleToStartState[t.target.ruleIndex].isPrecedenceRule) {
              if (t.precedence === 0) {
                outermostPrecedenceReturn = t.target.ruleIndex;
              }
            }
            trans = new EpsilonTransition(t.followState, outermostPrecedenceReturn);
            atn.ruleToStopState[t.target.ruleIndex].addTransition(trans);
          }
        }
        for (i = 0; i < atn.states.length; i++) {
          state = atn.states[i];
          if (state instanceof BlockStartState) {
            if (state.endState === null) {
              throw "IllegalState";
            }
            if (state.endState.startState !== null) {
              throw "IllegalState";
            }
            state.endState.startState = state;
          }
          if (state instanceof PlusLoopbackState) {
            for (j = 0; j < state.transitions.length; j++) {
              target = state.transitions[j].target;
              if (target instanceof PlusBlockStartState) {
                target.loopBackState = state;
              }
            }
          } else if (state instanceof StarLoopbackState) {
            for (j = 0; j < state.transitions.length; j++) {
              target = state.transitions[j].target;
              if (target instanceof StarLoopEntryState) {
                target.loopBackState = state;
              }
            }
          }
        }
      }
      readDecisions(atn) {
        const ndecisions = this.readInt();
        for (let i = 0; i < ndecisions; i++) {
          const s = this.readInt();
          const decState = atn.states[s];
          atn.decisionToState.push(decState);
          decState.decision = i;
        }
      }
      readLexerActions(atn) {
        if (atn.grammarType === ATNType.LEXER) {
          const count = this.readInt();
          atn.lexerActions = initArray(count, null);
          for (let i = 0; i < count; i++) {
            const actionType = this.readInt();
            let data1 = this.readInt();
            if (data1 === 65535) {
              data1 = -1;
            }
            let data2 = this.readInt();
            if (data2 === 65535) {
              data2 = -1;
            }
            atn.lexerActions[i] = this.lexerActionFactory(actionType, data1, data2);
          }
        }
      }
      generateRuleBypassTransitions(atn) {
        let i;
        const count = atn.ruleToStartState.length;
        for (i = 0; i < count; i++) {
          atn.ruleToTokenType[i] = atn.maxTokenType + i + 1;
        }
        for (i = 0; i < count; i++) {
          this.generateRuleBypassTransition(atn, i);
        }
      }
      generateRuleBypassTransition(atn, idx) {
        let i, state;
        const bypassStart = new BasicBlockStartState();
        bypassStart.ruleIndex = idx;
        atn.addState(bypassStart);
        const bypassStop = new BlockEndState();
        bypassStop.ruleIndex = idx;
        atn.addState(bypassStop);
        bypassStart.endState = bypassStop;
        atn.defineDecisionState(bypassStart);
        bypassStop.startState = bypassStart;
        let excludeTransition = null;
        let endState = null;
        if (atn.ruleToStartState[idx].isPrecedenceRule) {
          endState = null;
          for (i = 0; i < atn.states.length; i++) {
            state = atn.states[i];
            if (this.stateIsEndStateFor(state, idx)) {
              endState = state;
              excludeTransition = state.loopBackState.transitions[0];
              break;
            }
          }
          if (excludeTransition === null) {
            throw "Couldn't identify final state of the precedence rule prefix section.";
          }
        } else {
          endState = atn.ruleToStopState[idx];
        }
        for (i = 0; i < atn.states.length; i++) {
          state = atn.states[i];
          for (let j = 0; j < state.transitions.length; j++) {
            const transition = state.transitions[j];
            if (transition === excludeTransition) {
              continue;
            }
            if (transition.target === endState) {
              transition.target = bypassStop;
            }
          }
        }
        const ruleToStartState = atn.ruleToStartState[idx];
        const count = ruleToStartState.transitions.length;
        while (count > 0) {
          bypassStart.addTransition(ruleToStartState.transitions[count - 1]);
          ruleToStartState.transitions = ruleToStartState.transitions.slice(-1);
        }
        atn.ruleToStartState[idx].addTransition(new EpsilonTransition(bypassStart));
        bypassStop.addTransition(new EpsilonTransition(endState));
        const matchState = new BasicState();
        atn.addState(matchState);
        matchState.addTransition(new AtomTransition2(bypassStop, atn.ruleToTokenType[idx]));
        bypassStart.addTransition(new EpsilonTransition(matchState));
      }
      stateIsEndStateFor(state, idx) {
        if (state.ruleIndex !== idx) {
          return null;
        }
        if (!(state instanceof StarLoopEntryState)) {
          return null;
        }
        const maybeLoopEndState = state.transitions[state.transitions.length - 1].target;
        if (!(maybeLoopEndState instanceof LoopEndState)) {
          return null;
        }
        if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState) {
          return state;
        } else {
          return null;
        }
      }
      markPrecedenceDecisions(atn) {
        for (let i = 0; i < atn.states.length; i++) {
          const state = atn.states[i];
          if (!(state instanceof StarLoopEntryState)) {
            continue;
          }
          if (atn.ruleToStartState[state.ruleIndex].isPrecedenceRule) {
            const maybeLoopEndState = state.transitions[state.transitions.length - 1].target;
            if (maybeLoopEndState instanceof LoopEndState) {
              if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState) {
                state.isPrecedenceDecision = true;
              }
            }
          }
        }
      }
      verifyATN(atn) {
        if (!this.deserializationOptions.verifyATN) {
          return;
        }
        for (let i = 0; i < atn.states.length; i++) {
          const state = atn.states[i];
          if (state === null) {
            continue;
          }
          this.checkCondition(state.epsilonOnlyTransitions || state.transitions.length <= 1);
          if (state instanceof PlusBlockStartState) {
            this.checkCondition(state.loopBackState !== null);
          } else if (state instanceof StarLoopEntryState) {
            this.checkCondition(state.loopBackState !== null);
            this.checkCondition(state.transitions.length === 2);
            if (state.transitions[0].target instanceof StarBlockStartState) {
              this.checkCondition(state.transitions[1].target instanceof LoopEndState);
              this.checkCondition(!state.nonGreedy);
            } else if (state.transitions[0].target instanceof LoopEndState) {
              this.checkCondition(state.transitions[1].target instanceof StarBlockStartState);
              this.checkCondition(state.nonGreedy);
            } else {
              throw "IllegalState";
            }
          } else if (state instanceof StarLoopbackState) {
            this.checkCondition(state.transitions.length === 1);
            this.checkCondition(state.transitions[0].target instanceof StarLoopEntryState);
          } else if (state instanceof LoopEndState) {
            this.checkCondition(state.loopBackState !== null);
          } else if (state instanceof RuleStartState) {
            this.checkCondition(state.stopState !== null);
          } else if (state instanceof BlockStartState) {
            this.checkCondition(state.endState !== null);
          } else if (state instanceof BlockEndState) {
            this.checkCondition(state.startState !== null);
          } else if (state instanceof DecisionState) {
            this.checkCondition(state.transitions.length <= 1 || state.decision >= 0);
          } else {
            this.checkCondition(state.transitions.length <= 1 || state instanceof RuleStopState);
          }
        }
      }
      checkCondition(condition, message) {
        if (!condition) {
          if (message === void 0 || message === null) {
            message = "IllegalState";
          }
          throw message;
        }
      }
      readInt() {
        return this.data[this.pos++];
      }
      readInt32() {
        const low = this.readInt();
        const high = this.readInt();
        return low | high << 16;
      }
      readLong() {
        const low = this.readInt32();
        const high = this.readInt32();
        return low & 4294967295 | high << 32;
      }
      readUUID() {
        const bb = [];
        for (let i = 7; i >= 0; i--) {
          const int = this.readInt();
          bb[2 * i + 1] = int & 255;
          bb[2 * i] = int >> 8 & 255;
        }
        return byteToHex[bb[0]] + byteToHex[bb[1]] + byteToHex[bb[2]] + byteToHex[bb[3]] + "-" + byteToHex[bb[4]] + byteToHex[bb[5]] + "-" + byteToHex[bb[6]] + byteToHex[bb[7]] + "-" + byteToHex[bb[8]] + byteToHex[bb[9]] + "-" + byteToHex[bb[10]] + byteToHex[bb[11]] + byteToHex[bb[12]] + byteToHex[bb[13]] + byteToHex[bb[14]] + byteToHex[bb[15]];
      }
      edgeFactory(atn, type, src, trg, arg1, arg2, arg3, sets) {
        const target = atn.states[trg];
        switch (type) {
          case Transition.EPSILON:
            return new EpsilonTransition(target);
          case Transition.RANGE:
            return arg3 !== 0 ? new RangeTransition(target, Token.EOF, arg2) : new RangeTransition(target, arg1, arg2);
          case Transition.RULE:
            return new RuleTransition(atn.states[arg1], arg2, arg3, target);
          case Transition.PREDICATE:
            return new PredicateTransition(target, arg1, arg2, arg3 !== 0);
          case Transition.PRECEDENCE:
            return new PrecedencePredicateTransition(target, arg1);
          case Transition.ATOM:
            return arg3 !== 0 ? new AtomTransition2(target, Token.EOF) : new AtomTransition2(target, arg1);
          case Transition.ACTION:
            return new ActionTransition(target, arg1, arg2, arg3 !== 0);
          case Transition.SET:
            return new SetTransition(target, sets[arg1]);
          case Transition.NOT_SET:
            return new NotSetTransition(target, sets[arg1]);
          case Transition.WILDCARD:
            return new WildcardTransition(target);
          default:
            throw "The specified transition type: " + type + " is not valid.";
        }
      }
      stateFactory(type, ruleIndex) {
        if (this.stateFactories === null) {
          const sf = [];
          sf[ATNState.INVALID_TYPE] = null;
          sf[ATNState.BASIC] = () => new BasicState();
          sf[ATNState.RULE_START] = () => new RuleStartState();
          sf[ATNState.BLOCK_START] = () => new BasicBlockStartState();
          sf[ATNState.PLUS_BLOCK_START] = () => new PlusBlockStartState();
          sf[ATNState.STAR_BLOCK_START] = () => new StarBlockStartState();
          sf[ATNState.TOKEN_START] = () => new TokensStartState();
          sf[ATNState.RULE_STOP] = () => new RuleStopState();
          sf[ATNState.BLOCK_END] = () => new BlockEndState();
          sf[ATNState.STAR_LOOP_BACK] = () => new StarLoopbackState();
          sf[ATNState.STAR_LOOP_ENTRY] = () => new StarLoopEntryState();
          sf[ATNState.PLUS_LOOP_BACK] = () => new PlusLoopbackState();
          sf[ATNState.LOOP_END] = () => new LoopEndState();
          this.stateFactories = sf;
        }
        if (type > this.stateFactories.length || this.stateFactories[type] === null) {
          throw "The specified state type " + type + " is not valid.";
        } else {
          const s = this.stateFactories[type]();
          if (s !== null) {
            s.ruleIndex = ruleIndex;
            return s;
          }
        }
      }
      lexerActionFactory(type, data1, data2) {
        if (this.actionFactories === null) {
          const af = [];
          af[LexerActionType.CHANNEL] = (data12, data22) => new LexerChannelAction(data12);
          af[LexerActionType.CUSTOM] = (data12, data22) => new LexerCustomAction(data12, data22);
          af[LexerActionType.MODE] = (data12, data22) => new LexerModeAction(data12);
          af[LexerActionType.MORE] = (data12, data22) => LexerMoreAction.INSTANCE;
          af[LexerActionType.POP_MODE] = (data12, data22) => LexerPopModeAction.INSTANCE;
          af[LexerActionType.PUSH_MODE] = (data12, data22) => new LexerPushModeAction(data12);
          af[LexerActionType.SKIP] = (data12, data22) => LexerSkipAction.INSTANCE;
          af[LexerActionType.TYPE] = (data12, data22) => new LexerTypeAction(data12);
          this.actionFactories = af;
        }
        if (type > this.actionFactories.length || this.actionFactories[type] === null) {
          throw "The specified lexer action type " + type + " is not valid.";
        } else {
          return this.actionFactories[type](data1, data2);
        }
      }
    };
    function createByteToHex() {
      const bth = [];
      for (let i = 0; i < 256; i++) {
        bth[i] = (i + 256).toString(16).substr(1).toUpperCase();
      }
      return bth;
    }
    var byteToHex = createByteToHex();
    module2.exports = ATNDeserializer;
  }
});

// ../../node_modules/antlr4/src/antlr4/error/ErrorListener.js
var require_ErrorListener = __commonJS({
  "../../node_modules/antlr4/src/antlr4/error/ErrorListener.js"(exports2, module2) {
    var ErrorListener = class {
      syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
      }
      reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
      }
      reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
      }
      reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
      }
    };
    var ConsoleErrorListener = class extends ErrorListener {
      constructor() {
        super();
      }
      syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        console.error("line " + line + ":" + column + " " + msg);
      }
    };
    ConsoleErrorListener.INSTANCE = new ConsoleErrorListener();
    var ProxyErrorListener = class extends ErrorListener {
      constructor(delegates) {
        super();
        if (delegates === null) {
          throw "delegates";
        }
        this.delegates = delegates;
        return this;
      }
      syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        this.delegates.map((d) => d.syntaxError(recognizer, offendingSymbol, line, column, msg, e));
      }
      reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
        this.delegates.map((d) => d.reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs));
      }
      reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
        this.delegates.map((d) => d.reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs));
      }
      reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
        this.delegates.map((d) => d.reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs));
      }
    };
    module2.exports = { ErrorListener, ConsoleErrorListener, ProxyErrorListener };
  }
});

// ../../node_modules/antlr4/src/antlr4/Recognizer.js
var require_Recognizer = __commonJS({
  "../../node_modules/antlr4/src/antlr4/Recognizer.js"(exports2, module2) {
    var { Token } = require_Token();
    var { ConsoleErrorListener } = require_ErrorListener();
    var { ProxyErrorListener } = require_ErrorListener();
    var Recognizer = class {
      constructor() {
        this._listeners = [ConsoleErrorListener.INSTANCE];
        this._interp = null;
        this._stateNumber = -1;
      }
      checkVersion(toolVersion) {
        const runtimeVersion = "4.9.2";
        if (runtimeVersion !== toolVersion) {
          console.log("ANTLR runtime and generated code versions disagree: " + runtimeVersion + "!=" + toolVersion);
        }
      }
      addErrorListener(listener) {
        this._listeners.push(listener);
      }
      removeErrorListeners() {
        this._listeners = [];
      }
      getTokenTypeMap() {
        const tokenNames = this.getTokenNames();
        if (tokenNames === null) {
          throw "The current recognizer does not provide a list of token names.";
        }
        let result = this.tokenTypeMapCache[tokenNames];
        if (result === void 0) {
          result = tokenNames.reduce(function(o, k, i) {
            o[k] = i;
          });
          result.EOF = Token.EOF;
          this.tokenTypeMapCache[tokenNames] = result;
        }
        return result;
      }
      getRuleIndexMap() {
        const ruleNames = this.ruleNames;
        if (ruleNames === null) {
          throw "The current recognizer does not provide a list of rule names.";
        }
        let result = this.ruleIndexMapCache[ruleNames];
        if (result === void 0) {
          result = ruleNames.reduce(function(o, k, i) {
            o[k] = i;
          });
          this.ruleIndexMapCache[ruleNames] = result;
        }
        return result;
      }
      getTokenType(tokenName) {
        const ttype = this.getTokenTypeMap()[tokenName];
        if (ttype !== void 0) {
          return ttype;
        } else {
          return Token.INVALID_TYPE;
        }
      }
      getErrorHeader(e) {
        const line = e.getOffendingToken().line;
        const column = e.getOffendingToken().column;
        return "line " + line + ":" + column;
      }
      getTokenErrorDisplay(t) {
        if (t === null) {
          return "<no token>";
        }
        let s = t.text;
        if (s === null) {
          if (t.type === Token.EOF) {
            s = "<EOF>";
          } else {
            s = "<" + t.type + ">";
          }
        }
        s = s.replace("\n", "\\n").replace("\r", "\\r").replace("	", "\\t");
        return "'" + s + "'";
      }
      getErrorListenerDispatch() {
        return new ProxyErrorListener(this._listeners);
      }
      sempred(localctx, ruleIndex, actionIndex) {
        return true;
      }
      precpred(localctx, precedence) {
        return true;
      }
      get state() {
        return this._stateNumber;
      }
      set state(state) {
        this._stateNumber = state;
      }
    };
    Recognizer.tokenTypeMapCache = {};
    Recognizer.ruleIndexMapCache = {};
    module2.exports = Recognizer;
  }
});

// ../../node_modules/antlr4/src/antlr4/CommonTokenFactory.js
var require_CommonTokenFactory = __commonJS({
  "../../node_modules/antlr4/src/antlr4/CommonTokenFactory.js"(exports2, module2) {
    var CommonToken = require_Token().CommonToken;
    var TokenFactory = class {
    };
    var CommonTokenFactory = class extends TokenFactory {
      constructor(copyText) {
        super();
        this.copyText = copyText === void 0 ? false : copyText;
      }
      create(source, type, text, channel, start, stop, line, column) {
        const t = new CommonToken(source, type, channel, start, stop);
        t.line = line;
        t.column = column;
        if (text !== null) {
          t.text = text;
        } else if (this.copyText && source[1] !== null) {
          t.text = source[1].getText(start, stop);
        }
        return t;
      }
      createThin(type, text) {
        const t = new CommonToken(null, type);
        t.text = text;
        return t;
      }
    };
    CommonTokenFactory.DEFAULT = new CommonTokenFactory();
    module2.exports = CommonTokenFactory;
  }
});

// ../../node_modules/antlr4/src/antlr4/error/Errors.js
var require_Errors = __commonJS({
  "../../node_modules/antlr4/src/antlr4/error/Errors.js"(exports2, module2) {
    var { PredicateTransition } = require_Transition();
    var { Interval } = require_IntervalSet().Interval;
    var RecognitionException = class extends Error {
      constructor(params) {
        super(params.message);
        if (!!Error.captureStackTrace) {
          Error.captureStackTrace(this, RecognitionException);
        } else {
          var stack = new Error().stack;
        }
        this.message = params.message;
        this.recognizer = params.recognizer;
        this.input = params.input;
        this.ctx = params.ctx;
        this.offendingToken = null;
        this.offendingState = -1;
        if (this.recognizer !== null) {
          this.offendingState = this.recognizer.state;
        }
      }
      getExpectedTokens() {
        if (this.recognizer !== null) {
          return this.recognizer.atn.getExpectedTokens(this.offendingState, this.ctx);
        } else {
          return null;
        }
      }
      toString() {
        return this.message;
      }
    };
    var LexerNoViableAltException = class extends RecognitionException {
      constructor(lexer, input, startIndex, deadEndConfigs) {
        super({ message: "", recognizer: lexer, input, ctx: null });
        this.startIndex = startIndex;
        this.deadEndConfigs = deadEndConfigs;
      }
      toString() {
        let symbol = "";
        if (this.startIndex >= 0 && this.startIndex < this.input.size) {
          symbol = this.input.getText(new Interval(this.startIndex, this.startIndex));
        }
        return "LexerNoViableAltException" + symbol;
      }
    };
    var NoViableAltException = class extends RecognitionException {
      constructor(recognizer, input, startToken, offendingToken, deadEndConfigs, ctx) {
        ctx = ctx || recognizer._ctx;
        offendingToken = offendingToken || recognizer.getCurrentToken();
        startToken = startToken || recognizer.getCurrentToken();
        input = input || recognizer.getInputStream();
        super({ message: "", recognizer, input, ctx });
        this.deadEndConfigs = deadEndConfigs;
        this.startToken = startToken;
        this.offendingToken = offendingToken;
      }
    };
    var InputMismatchException = class extends RecognitionException {
      constructor(recognizer) {
        super({ message: "", recognizer, input: recognizer.getInputStream(), ctx: recognizer._ctx });
        this.offendingToken = recognizer.getCurrentToken();
      }
    };
    function formatMessage(predicate, message) {
      if (message !== null) {
        return message;
      } else {
        return "failed predicate: {" + predicate + "}?";
      }
    }
    var FailedPredicateException = class extends RecognitionException {
      constructor(recognizer, predicate, message) {
        super({
          message: formatMessage(predicate, message || null),
          recognizer,
          input: recognizer.getInputStream(),
          ctx: recognizer._ctx
        });
        const s = recognizer._interp.atn.states[recognizer.state];
        const trans = s.transitions[0];
        if (trans instanceof PredicateTransition) {
          this.ruleIndex = trans.ruleIndex;
          this.predicateIndex = trans.predIndex;
        } else {
          this.ruleIndex = 0;
          this.predicateIndex = 0;
        }
        this.predicate = predicate;
        this.offendingToken = recognizer.getCurrentToken();
      }
    };
    var ParseCancellationException = class extends Error {
      constructor() {
        super();
        Error.captureStackTrace(this, ParseCancellationException);
      }
    };
    module2.exports = {
      RecognitionException,
      NoViableAltException,
      LexerNoViableAltException,
      InputMismatchException,
      FailedPredicateException,
      ParseCancellationException
    };
  }
});

// ../../node_modules/antlr4/src/antlr4/Lexer.js
var require_Lexer = __commonJS({
  "../../node_modules/antlr4/src/antlr4/Lexer.js"(exports2, module2) {
    var { Token } = require_Token();
    var Recognizer = require_Recognizer();
    var CommonTokenFactory = require_CommonTokenFactory();
    var { RecognitionException } = require_Errors();
    var { LexerNoViableAltException } = require_Errors();
    var Lexer = class extends Recognizer {
      constructor(input) {
        super();
        this._input = input;
        this._factory = CommonTokenFactory.DEFAULT;
        this._tokenFactorySourcePair = [this, input];
        this._interp = null;
        this._token = null;
        this._tokenStartCharIndex = -1;
        this._tokenStartLine = -1;
        this._tokenStartColumn = -1;
        this._hitEOF = false;
        this._channel = Token.DEFAULT_CHANNEL;
        this._type = Token.INVALID_TYPE;
        this._modeStack = [];
        this._mode = Lexer.DEFAULT_MODE;
        this._text = null;
      }
      reset() {
        if (this._input !== null) {
          this._input.seek(0);
        }
        this._token = null;
        this._type = Token.INVALID_TYPE;
        this._channel = Token.DEFAULT_CHANNEL;
        this._tokenStartCharIndex = -1;
        this._tokenStartColumn = -1;
        this._tokenStartLine = -1;
        this._text = null;
        this._hitEOF = false;
        this._mode = Lexer.DEFAULT_MODE;
        this._modeStack = [];
        this._interp.reset();
      }
      nextToken() {
        if (this._input === null) {
          throw "nextToken requires a non-null input stream.";
        }
        const tokenStartMarker = this._input.mark();
        try {
          while (true) {
            if (this._hitEOF) {
              this.emitEOF();
              return this._token;
            }
            this._token = null;
            this._channel = Token.DEFAULT_CHANNEL;
            this._tokenStartCharIndex = this._input.index;
            this._tokenStartColumn = this._interp.column;
            this._tokenStartLine = this._interp.line;
            this._text = null;
            let continueOuter = false;
            while (true) {
              this._type = Token.INVALID_TYPE;
              let ttype = Lexer.SKIP;
              try {
                ttype = this._interp.match(this._input, this._mode);
              } catch (e) {
                if (e instanceof RecognitionException) {
                  this.notifyListeners(e);
                  this.recover(e);
                } else {
                  console.log(e.stack);
                  throw e;
                }
              }
              if (this._input.LA(1) === Token.EOF) {
                this._hitEOF = true;
              }
              if (this._type === Token.INVALID_TYPE) {
                this._type = ttype;
              }
              if (this._type === Lexer.SKIP) {
                continueOuter = true;
                break;
              }
              if (this._type !== Lexer.MORE) {
                break;
              }
            }
            if (continueOuter) {
              continue;
            }
            if (this._token === null) {
              this.emit();
            }
            return this._token;
          }
        } finally {
          this._input.release(tokenStartMarker);
        }
      }
      skip() {
        this._type = Lexer.SKIP;
      }
      more() {
        this._type = Lexer.MORE;
      }
      mode(m) {
        this._mode = m;
      }
      pushMode(m) {
        if (this._interp.debug) {
          console.log("pushMode " + m);
        }
        this._modeStack.push(this._mode);
        this.mode(m);
      }
      popMode() {
        if (this._modeStack.length === 0) {
          throw "Empty Stack";
        }
        if (this._interp.debug) {
          console.log("popMode back to " + this._modeStack.slice(0, -1));
        }
        this.mode(this._modeStack.pop());
        return this._mode;
      }
      emitToken(token) {
        this._token = token;
      }
      emit() {
        const t = this._factory.create(this._tokenFactorySourcePair, this._type, this._text, this._channel, this._tokenStartCharIndex, this.getCharIndex() - 1, this._tokenStartLine, this._tokenStartColumn);
        this.emitToken(t);
        return t;
      }
      emitEOF() {
        const cpos = this.column;
        const lpos = this.line;
        const eof = this._factory.create(this._tokenFactorySourcePair, Token.EOF, null, Token.DEFAULT_CHANNEL, this._input.index, this._input.index - 1, lpos, cpos);
        this.emitToken(eof);
        return eof;
      }
      getCharIndex() {
        return this._input.index;
      }
      getAllTokens() {
        const tokens = [];
        let t = this.nextToken();
        while (t.type !== Token.EOF) {
          tokens.push(t);
          t = this.nextToken();
        }
        return tokens;
      }
      notifyListeners(e) {
        const start = this._tokenStartCharIndex;
        const stop = this._input.index;
        const text = this._input.getText(start, stop);
        const msg = "token recognition error at: '" + this.getErrorDisplay(text) + "'";
        const listener = this.getErrorListenerDispatch();
        listener.syntaxError(this, null, this._tokenStartLine, this._tokenStartColumn, msg, e);
      }
      getErrorDisplay(s) {
        const d = [];
        for (let i = 0; i < s.length; i++) {
          d.push(s[i]);
        }
        return d.join("");
      }
      getErrorDisplayForChar(c) {
        if (c.charCodeAt(0) === Token.EOF) {
          return "<EOF>";
        } else if (c === "\n") {
          return "\\n";
        } else if (c === "	") {
          return "\\t";
        } else if (c === "\r") {
          return "\\r";
        } else {
          return c;
        }
      }
      getCharErrorDisplay(c) {
        return "'" + this.getErrorDisplayForChar(c) + "'";
      }
      recover(re) {
        if (this._input.LA(1) !== Token.EOF) {
          if (re instanceof LexerNoViableAltException) {
            this._interp.consume(this._input);
          } else {
            this._input.consume();
          }
        }
      }
      get inputStream() {
        return this._input;
      }
      set inputStream(input) {
        this._input = null;
        this._tokenFactorySourcePair = [this, this._input];
        this.reset();
        this._input = input;
        this._tokenFactorySourcePair = [this, this._input];
      }
      get sourceName() {
        return this._input.sourceName;
      }
      get type() {
        return this.type;
      }
      set type(type) {
        this._type = type;
      }
      get line() {
        return this._interp.line;
      }
      set line(line) {
        this._interp.line = line;
      }
      get column() {
        return this._interp.column;
      }
      set column(column) {
        this._interp.column = column;
      }
      get text() {
        if (this._text !== null) {
          return this._text;
        } else {
          return this._interp.getText(this._input);
        }
      }
      set text(text) {
        this._text = text;
      }
    };
    Lexer.DEFAULT_MODE = 0;
    Lexer.MORE = -2;
    Lexer.SKIP = -3;
    Lexer.DEFAULT_TOKEN_CHANNEL = Token.DEFAULT_CHANNEL;
    Lexer.HIDDEN = Token.HIDDEN_CHANNEL;
    Lexer.MIN_CHAR_VALUE = 0;
    Lexer.MAX_CHAR_VALUE = 1114111;
    module2.exports = Lexer;
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/ATNConfigSet.js
var require_ATNConfigSet = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/ATNConfigSet.js"(exports2, module2) {
    var ATN = require_ATN();
    var Utils = require_Utils();
    var { SemanticContext } = require_SemanticContext();
    var { merge } = require_PredictionContext();
    function hashATNConfig(c) {
      return c.hashCodeForConfigSet();
    }
    function equalATNConfigs(a, b) {
      if (a === b) {
        return true;
      } else if (a === null || b === null) {
        return false;
      } else
        return a.equalsForConfigSet(b);
    }
    var ATNConfigSet = class {
      constructor(fullCtx) {
        this.configLookup = new Utils.Set(hashATNConfig, equalATNConfigs);
        this.fullCtx = fullCtx === void 0 ? true : fullCtx;
        this.readOnly = false;
        this.configs = [];
        this.uniqueAlt = 0;
        this.conflictingAlts = null;
        this.hasSemanticContext = false;
        this.dipsIntoOuterContext = false;
        this.cachedHashCode = -1;
      }
      add(config, mergeCache) {
        if (mergeCache === void 0) {
          mergeCache = null;
        }
        if (this.readOnly) {
          throw "This set is readonly";
        }
        if (config.semanticContext !== SemanticContext.NONE) {
          this.hasSemanticContext = true;
        }
        if (config.reachesIntoOuterContext > 0) {
          this.dipsIntoOuterContext = true;
        }
        const existing = this.configLookup.add(config);
        if (existing === config) {
          this.cachedHashCode = -1;
          this.configs.push(config);
          return true;
        }
        const rootIsWildcard = !this.fullCtx;
        const merged = merge(existing.context, config.context, rootIsWildcard, mergeCache);
        existing.reachesIntoOuterContext = Math.max(existing.reachesIntoOuterContext, config.reachesIntoOuterContext);
        if (config.precedenceFilterSuppressed) {
          existing.precedenceFilterSuppressed = true;
        }
        existing.context = merged;
        return true;
      }
      getStates() {
        const states = new Utils.Set();
        for (let i = 0; i < this.configs.length; i++) {
          states.add(this.configs[i].state);
        }
        return states;
      }
      getPredicates() {
        const preds = [];
        for (let i = 0; i < this.configs.length; i++) {
          const c = this.configs[i].semanticContext;
          if (c !== SemanticContext.NONE) {
            preds.push(c.semanticContext);
          }
        }
        return preds;
      }
      optimizeConfigs(interpreter) {
        if (this.readOnly) {
          throw "This set is readonly";
        }
        if (this.configLookup.length === 0) {
          return;
        }
        for (let i = 0; i < this.configs.length; i++) {
          const config = this.configs[i];
          config.context = interpreter.getCachedContext(config.context);
        }
      }
      addAll(coll) {
        for (let i = 0; i < coll.length; i++) {
          this.add(coll[i]);
        }
        return false;
      }
      equals(other) {
        return this === other || other instanceof ATNConfigSet && Utils.equalArrays(this.configs, other.configs) && this.fullCtx === other.fullCtx && this.uniqueAlt === other.uniqueAlt && this.conflictingAlts === other.conflictingAlts && this.hasSemanticContext === other.hasSemanticContext && this.dipsIntoOuterContext === other.dipsIntoOuterContext;
      }
      hashCode() {
        const hash = new Utils.Hash();
        hash.update(this.configs);
        return hash.finish();
      }
      updateHashCode(hash) {
        if (this.readOnly) {
          if (this.cachedHashCode === -1) {
            this.cachedHashCode = this.hashCode();
          }
          hash.update(this.cachedHashCode);
        } else {
          hash.update(this.hashCode());
        }
      }
      isEmpty() {
        return this.configs.length === 0;
      }
      contains(item) {
        if (this.configLookup === null) {
          throw "This method is not implemented for readonly sets.";
        }
        return this.configLookup.contains(item);
      }
      containsFast(item) {
        if (this.configLookup === null) {
          throw "This method is not implemented for readonly sets.";
        }
        return this.configLookup.containsFast(item);
      }
      clear() {
        if (this.readOnly) {
          throw "This set is readonly";
        }
        this.configs = [];
        this.cachedHashCode = -1;
        this.configLookup = new Utils.Set();
      }
      setReadonly(readOnly) {
        this.readOnly = readOnly;
        if (readOnly) {
          this.configLookup = null;
        }
      }
      toString() {
        return Utils.arrayToString(this.configs) + (this.hasSemanticContext ? ",hasSemanticContext=" + this.hasSemanticContext : "") + (this.uniqueAlt !== ATN.INVALID_ALT_NUMBER ? ",uniqueAlt=" + this.uniqueAlt : "") + (this.conflictingAlts !== null ? ",conflictingAlts=" + this.conflictingAlts : "") + (this.dipsIntoOuterContext ? ",dipsIntoOuterContext" : "");
      }
      get items() {
        return this.configs;
      }
      get length() {
        return this.configs.length;
      }
    };
    var OrderedATNConfigSet = class extends ATNConfigSet {
      constructor() {
        super();
        this.configLookup = new Utils.Set();
      }
    };
    module2.exports = {
      ATNConfigSet,
      OrderedATNConfigSet
    };
  }
});

// ../../node_modules/antlr4/src/antlr4/dfa/DFAState.js
var require_DFAState = __commonJS({
  "../../node_modules/antlr4/src/antlr4/dfa/DFAState.js"(exports2, module2) {
    var { ATNConfigSet } = require_ATNConfigSet();
    var { Hash: Hash2, Set } = require_Utils();
    var PredPrediction = class {
      constructor(pred, alt) {
        this.alt = alt;
        this.pred = pred;
      }
      toString() {
        return "(" + this.pred + ", " + this.alt + ")";
      }
    };
    var DFAState = class {
      constructor(stateNumber, configs) {
        if (stateNumber === null) {
          stateNumber = -1;
        }
        if (configs === null) {
          configs = new ATNConfigSet();
        }
        this.stateNumber = stateNumber;
        this.configs = configs;
        this.edges = null;
        this.isAcceptState = false;
        this.prediction = 0;
        this.lexerActionExecutor = null;
        this.requiresFullContext = false;
        this.predicates = null;
        return this;
      }
      getAltSet() {
        const alts = new Set();
        if (this.configs !== null) {
          for (let i = 0; i < this.configs.length; i++) {
            const c = this.configs[i];
            alts.add(c.alt);
          }
        }
        if (alts.length === 0) {
          return null;
        } else {
          return alts;
        }
      }
      equals(other) {
        return this === other || other instanceof DFAState && this.configs.equals(other.configs);
      }
      toString() {
        let s = "" + this.stateNumber + ":" + this.configs;
        if (this.isAcceptState) {
          s = s + "=>";
          if (this.predicates !== null)
            s = s + this.predicates;
          else
            s = s + this.prediction;
        }
        return s;
      }
      hashCode() {
        const hash = new Hash2();
        hash.update(this.configs);
        return hash.finish();
      }
    };
    module2.exports = { DFAState, PredPrediction };
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/ATNSimulator.js
var require_ATNSimulator = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/ATNSimulator.js"(exports2, module2) {
    var { DFAState } = require_DFAState();
    var { ATNConfigSet } = require_ATNConfigSet();
    var { getCachedPredictionContext } = require_PredictionContext();
    var { Map } = require_Utils();
    var ATNSimulator = class {
      constructor(atn, sharedContextCache) {
        this.atn = atn;
        this.sharedContextCache = sharedContextCache;
        return this;
      }
      getCachedContext(context) {
        if (this.sharedContextCache === null) {
          return context;
        }
        const visited = new Map();
        return getCachedPredictionContext(context, this.sharedContextCache, visited);
      }
    };
    ATNSimulator.ERROR = new DFAState(2147483647, new ATNConfigSet());
    module2.exports = ATNSimulator;
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/LexerActionExecutor.js
var require_LexerActionExecutor = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/LexerActionExecutor.js"(exports2, module2) {
    var { hashStuff } = require_Utils();
    var { LexerIndexedCustomAction } = require_LexerAction();
    var LexerActionExecutor = class {
      constructor(lexerActions) {
        this.lexerActions = lexerActions === null ? [] : lexerActions;
        this.cachedHashCode = hashStuff(lexerActions);
        return this;
      }
      fixOffsetBeforeMatch(offset) {
        let updatedLexerActions = null;
        for (let i = 0; i < this.lexerActions.length; i++) {
          if (this.lexerActions[i].isPositionDependent && !(this.lexerActions[i] instanceof LexerIndexedCustomAction)) {
            if (updatedLexerActions === null) {
              updatedLexerActions = this.lexerActions.concat([]);
            }
            updatedLexerActions[i] = new LexerIndexedCustomAction(offset, this.lexerActions[i]);
          }
        }
        if (updatedLexerActions === null) {
          return this;
        } else {
          return new LexerActionExecutor(updatedLexerActions);
        }
      }
      execute(lexer, input, startIndex) {
        let requiresSeek = false;
        const stopIndex = input.index;
        try {
          for (let i = 0; i < this.lexerActions.length; i++) {
            let lexerAction = this.lexerActions[i];
            if (lexerAction instanceof LexerIndexedCustomAction) {
              const offset = lexerAction.offset;
              input.seek(startIndex + offset);
              lexerAction = lexerAction.action;
              requiresSeek = startIndex + offset !== stopIndex;
            } else if (lexerAction.isPositionDependent) {
              input.seek(stopIndex);
              requiresSeek = false;
            }
            lexerAction.execute(lexer);
          }
        } finally {
          if (requiresSeek) {
            input.seek(stopIndex);
          }
        }
      }
      hashCode() {
        return this.cachedHashCode;
      }
      updateHashCode(hash) {
        hash.update(this.cachedHashCode);
      }
      equals(other) {
        if (this === other) {
          return true;
        } else if (!(other instanceof LexerActionExecutor)) {
          return false;
        } else if (this.cachedHashCode != other.cachedHashCode) {
          return false;
        } else if (this.lexerActions.length != other.lexerActions.length) {
          return false;
        } else {
          const numActions = this.lexerActions.length;
          for (let idx = 0; idx < numActions; ++idx) {
            if (!this.lexerActions[idx].equals(other.lexerActions[idx])) {
              return false;
            }
          }
          return true;
        }
      }
      static append(lexerActionExecutor, lexerAction) {
        if (lexerActionExecutor === null) {
          return new LexerActionExecutor([lexerAction]);
        }
        const lexerActions = lexerActionExecutor.lexerActions.concat([lexerAction]);
        return new LexerActionExecutor(lexerActions);
      }
    };
    module2.exports = LexerActionExecutor;
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/LexerATNSimulator.js
var require_LexerATNSimulator = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/LexerATNSimulator.js"(exports2, module2) {
    var { Token } = require_Token();
    var Lexer = require_Lexer();
    var ATN = require_ATN();
    var ATNSimulator = require_ATNSimulator();
    var { DFAState } = require_DFAState();
    var { OrderedATNConfigSet } = require_ATNConfigSet();
    var { PredictionContext } = require_PredictionContext();
    var { SingletonPredictionContext } = require_PredictionContext();
    var { RuleStopState } = require_ATNState();
    var { LexerATNConfig } = require_ATNConfig();
    var { Transition } = require_Transition();
    var LexerActionExecutor = require_LexerActionExecutor();
    var { LexerNoViableAltException } = require_Errors();
    function resetSimState(sim) {
      sim.index = -1;
      sim.line = 0;
      sim.column = -1;
      sim.dfaState = null;
    }
    var SimState = class {
      constructor() {
        resetSimState(this);
      }
      reset() {
        resetSimState(this);
      }
    };
    var LexerATNSimulator = class extends ATNSimulator {
      constructor(recog, atn, decisionToDFA, sharedContextCache) {
        super(atn, sharedContextCache);
        this.decisionToDFA = decisionToDFA;
        this.recog = recog;
        this.startIndex = -1;
        this.line = 1;
        this.column = 0;
        this.mode = Lexer.DEFAULT_MODE;
        this.prevAccept = new SimState();
      }
      copyState(simulator) {
        this.column = simulator.column;
        this.line = simulator.line;
        this.mode = simulator.mode;
        this.startIndex = simulator.startIndex;
      }
      match(input, mode) {
        this.match_calls += 1;
        this.mode = mode;
        const mark = input.mark();
        try {
          this.startIndex = input.index;
          this.prevAccept.reset();
          const dfa = this.decisionToDFA[mode];
          if (dfa.s0 === null) {
            return this.matchATN(input);
          } else {
            return this.execATN(input, dfa.s0);
          }
        } finally {
          input.release(mark);
        }
      }
      reset() {
        this.prevAccept.reset();
        this.startIndex = -1;
        this.line = 1;
        this.column = 0;
        this.mode = Lexer.DEFAULT_MODE;
      }
      matchATN(input) {
        const startState = this.atn.modeToStartState[this.mode];
        if (LexerATNSimulator.debug) {
          console.log("matchATN mode " + this.mode + " start: " + startState);
        }
        const old_mode = this.mode;
        const s0_closure = this.computeStartState(input, startState);
        const suppressEdge = s0_closure.hasSemanticContext;
        s0_closure.hasSemanticContext = false;
        const next = this.addDFAState(s0_closure);
        if (!suppressEdge) {
          this.decisionToDFA[this.mode].s0 = next;
        }
        const predict = this.execATN(input, next);
        if (LexerATNSimulator.debug) {
          console.log("DFA after matchATN: " + this.decisionToDFA[old_mode].toLexerString());
        }
        return predict;
      }
      execATN(input, ds0) {
        if (LexerATNSimulator.debug) {
          console.log("start state closure=" + ds0.configs);
        }
        if (ds0.isAcceptState) {
          this.captureSimState(this.prevAccept, input, ds0);
        }
        let t = input.LA(1);
        let s = ds0;
        while (true) {
          if (LexerATNSimulator.debug) {
            console.log("execATN loop starting closure: " + s.configs);
          }
          let target = this.getExistingTargetState(s, t);
          if (target === null) {
            target = this.computeTargetState(input, s, t);
          }
          if (target === ATNSimulator.ERROR) {
            break;
          }
          if (t !== Token.EOF) {
            this.consume(input);
          }
          if (target.isAcceptState) {
            this.captureSimState(this.prevAccept, input, target);
            if (t === Token.EOF) {
              break;
            }
          }
          t = input.LA(1);
          s = target;
        }
        return this.failOrAccept(this.prevAccept, input, s.configs, t);
      }
      getExistingTargetState(s, t) {
        if (s.edges === null || t < LexerATNSimulator.MIN_DFA_EDGE || t > LexerATNSimulator.MAX_DFA_EDGE) {
          return null;
        }
        let target = s.edges[t - LexerATNSimulator.MIN_DFA_EDGE];
        if (target === void 0) {
          target = null;
        }
        if (LexerATNSimulator.debug && target !== null) {
          console.log("reuse state " + s.stateNumber + " edge to " + target.stateNumber);
        }
        return target;
      }
      computeTargetState(input, s, t) {
        const reach = new OrderedATNConfigSet();
        this.getReachableConfigSet(input, s.configs, reach, t);
        if (reach.items.length === 0) {
          if (!reach.hasSemanticContext) {
            this.addDFAEdge(s, t, ATNSimulator.ERROR);
          }
          return ATNSimulator.ERROR;
        }
        return this.addDFAEdge(s, t, null, reach);
      }
      failOrAccept(prevAccept, input, reach, t) {
        if (this.prevAccept.dfaState !== null) {
          const lexerActionExecutor = prevAccept.dfaState.lexerActionExecutor;
          this.accept(input, lexerActionExecutor, this.startIndex, prevAccept.index, prevAccept.line, prevAccept.column);
          return prevAccept.dfaState.prediction;
        } else {
          if (t === Token.EOF && input.index === this.startIndex) {
            return Token.EOF;
          }
          throw new LexerNoViableAltException(this.recog, input, this.startIndex, reach);
        }
      }
      getReachableConfigSet(input, closure, reach, t) {
        let skipAlt = ATN.INVALID_ALT_NUMBER;
        for (let i = 0; i < closure.items.length; i++) {
          const cfg = closure.items[i];
          const currentAltReachedAcceptState = cfg.alt === skipAlt;
          if (currentAltReachedAcceptState && cfg.passedThroughNonGreedyDecision) {
            continue;
          }
          if (LexerATNSimulator.debug) {
            console.log("testing %s at %s\n", this.getTokenName(t), cfg.toString(this.recog, true));
          }
          for (let j = 0; j < cfg.state.transitions.length; j++) {
            const trans = cfg.state.transitions[j];
            const target = this.getReachableTarget(trans, t);
            if (target !== null) {
              let lexerActionExecutor = cfg.lexerActionExecutor;
              if (lexerActionExecutor !== null) {
                lexerActionExecutor = lexerActionExecutor.fixOffsetBeforeMatch(input.index - this.startIndex);
              }
              const treatEofAsEpsilon = t === Token.EOF;
              const config = new LexerATNConfig({ state: target, lexerActionExecutor }, cfg);
              if (this.closure(input, config, reach, currentAltReachedAcceptState, true, treatEofAsEpsilon)) {
                skipAlt = cfg.alt;
              }
            }
          }
        }
      }
      accept(input, lexerActionExecutor, startIndex, index, line, charPos) {
        if (LexerATNSimulator.debug) {
          console.log("ACTION %s\n", lexerActionExecutor);
        }
        input.seek(index);
        this.line = line;
        this.column = charPos;
        if (lexerActionExecutor !== null && this.recog !== null) {
          lexerActionExecutor.execute(this.recog, input, startIndex);
        }
      }
      getReachableTarget(trans, t) {
        if (trans.matches(t, 0, Lexer.MAX_CHAR_VALUE)) {
          return trans.target;
        } else {
          return null;
        }
      }
      computeStartState(input, p) {
        const initialContext = PredictionContext.EMPTY;
        const configs = new OrderedATNConfigSet();
        for (let i = 0; i < p.transitions.length; i++) {
          const target = p.transitions[i].target;
          const cfg = new LexerATNConfig({ state: target, alt: i + 1, context: initialContext }, null);
          this.closure(input, cfg, configs, false, false, false);
        }
        return configs;
      }
      closure(input, config, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon) {
        let cfg = null;
        if (LexerATNSimulator.debug) {
          console.log("closure(" + config.toString(this.recog, true) + ")");
        }
        if (config.state instanceof RuleStopState) {
          if (LexerATNSimulator.debug) {
            if (this.recog !== null) {
              console.log("closure at %s rule stop %s\n", this.recog.ruleNames[config.state.ruleIndex], config);
            } else {
              console.log("closure at rule stop %s\n", config);
            }
          }
          if (config.context === null || config.context.hasEmptyPath()) {
            if (config.context === null || config.context.isEmpty()) {
              configs.add(config);
              return true;
            } else {
              configs.add(new LexerATNConfig({ state: config.state, context: PredictionContext.EMPTY }, config));
              currentAltReachedAcceptState = true;
            }
          }
          if (config.context !== null && !config.context.isEmpty()) {
            for (let i = 0; i < config.context.length; i++) {
              if (config.context.getReturnState(i) !== PredictionContext.EMPTY_RETURN_STATE) {
                const newContext = config.context.getParent(i);
                const returnState = this.atn.states[config.context.getReturnState(i)];
                cfg = new LexerATNConfig({ state: returnState, context: newContext }, config);
                currentAltReachedAcceptState = this.closure(input, cfg, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon);
              }
            }
          }
          return currentAltReachedAcceptState;
        }
        if (!config.state.epsilonOnlyTransitions) {
          if (!currentAltReachedAcceptState || !config.passedThroughNonGreedyDecision) {
            configs.add(config);
          }
        }
        for (let j = 0; j < config.state.transitions.length; j++) {
          const trans = config.state.transitions[j];
          cfg = this.getEpsilonTarget(input, config, trans, configs, speculative, treatEofAsEpsilon);
          if (cfg !== null) {
            currentAltReachedAcceptState = this.closure(input, cfg, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon);
          }
        }
        return currentAltReachedAcceptState;
      }
      getEpsilonTarget(input, config, trans, configs, speculative, treatEofAsEpsilon) {
        let cfg = null;
        if (trans.serializationType === Transition.RULE) {
          const newContext = SingletonPredictionContext.create(config.context, trans.followState.stateNumber);
          cfg = new LexerATNConfig({ state: trans.target, context: newContext }, config);
        } else if (trans.serializationType === Transition.PRECEDENCE) {
          throw "Precedence predicates are not supported in lexers.";
        } else if (trans.serializationType === Transition.PREDICATE) {
          if (LexerATNSimulator.debug) {
            console.log("EVAL rule " + trans.ruleIndex + ":" + trans.predIndex);
          }
          configs.hasSemanticContext = true;
          if (this.evaluatePredicate(input, trans.ruleIndex, trans.predIndex, speculative)) {
            cfg = new LexerATNConfig({ state: trans.target }, config);
          }
        } else if (trans.serializationType === Transition.ACTION) {
          if (config.context === null || config.context.hasEmptyPath()) {
            const lexerActionExecutor = LexerActionExecutor.append(config.lexerActionExecutor, this.atn.lexerActions[trans.actionIndex]);
            cfg = new LexerATNConfig({ state: trans.target, lexerActionExecutor }, config);
          } else {
            cfg = new LexerATNConfig({ state: trans.target }, config);
          }
        } else if (trans.serializationType === Transition.EPSILON) {
          cfg = new LexerATNConfig({ state: trans.target }, config);
        } else if (trans.serializationType === Transition.ATOM || trans.serializationType === Transition.RANGE || trans.serializationType === Transition.SET) {
          if (treatEofAsEpsilon) {
            if (trans.matches(Token.EOF, 0, Lexer.MAX_CHAR_VALUE)) {
              cfg = new LexerATNConfig({ state: trans.target }, config);
            }
          }
        }
        return cfg;
      }
      evaluatePredicate(input, ruleIndex, predIndex, speculative) {
        if (this.recog === null) {
          return true;
        }
        if (!speculative) {
          return this.recog.sempred(null, ruleIndex, predIndex);
        }
        const savedcolumn = this.column;
        const savedLine = this.line;
        const index = input.index;
        const marker = input.mark();
        try {
          this.consume(input);
          return this.recog.sempred(null, ruleIndex, predIndex);
        } finally {
          this.column = savedcolumn;
          this.line = savedLine;
          input.seek(index);
          input.release(marker);
        }
      }
      captureSimState(settings, input, dfaState) {
        settings.index = input.index;
        settings.line = this.line;
        settings.column = this.column;
        settings.dfaState = dfaState;
      }
      addDFAEdge(from_, tk, to, cfgs) {
        if (to === void 0) {
          to = null;
        }
        if (cfgs === void 0) {
          cfgs = null;
        }
        if (to === null && cfgs !== null) {
          const suppressEdge = cfgs.hasSemanticContext;
          cfgs.hasSemanticContext = false;
          to = this.addDFAState(cfgs);
          if (suppressEdge) {
            return to;
          }
        }
        if (tk < LexerATNSimulator.MIN_DFA_EDGE || tk > LexerATNSimulator.MAX_DFA_EDGE) {
          return to;
        }
        if (LexerATNSimulator.debug) {
          console.log("EDGE " + from_ + " -> " + to + " upon " + tk);
        }
        if (from_.edges === null) {
          from_.edges = [];
        }
        from_.edges[tk - LexerATNSimulator.MIN_DFA_EDGE] = to;
        return to;
      }
      addDFAState(configs) {
        const proposed = new DFAState(null, configs);
        let firstConfigWithRuleStopState = null;
        for (let i = 0; i < configs.items.length; i++) {
          const cfg = configs.items[i];
          if (cfg.state instanceof RuleStopState) {
            firstConfigWithRuleStopState = cfg;
            break;
          }
        }
        if (firstConfigWithRuleStopState !== null) {
          proposed.isAcceptState = true;
          proposed.lexerActionExecutor = firstConfigWithRuleStopState.lexerActionExecutor;
          proposed.prediction = this.atn.ruleToTokenType[firstConfigWithRuleStopState.state.ruleIndex];
        }
        const dfa = this.decisionToDFA[this.mode];
        const existing = dfa.states.get(proposed);
        if (existing !== null) {
          return existing;
        }
        const newState = proposed;
        newState.stateNumber = dfa.states.length;
        configs.setReadonly(true);
        newState.configs = configs;
        dfa.states.add(newState);
        return newState;
      }
      getDFA(mode) {
        return this.decisionToDFA[mode];
      }
      getText(input) {
        return input.getText(this.startIndex, input.index - 1);
      }
      consume(input) {
        const curChar = input.LA(1);
        if (curChar === "\n".charCodeAt(0)) {
          this.line += 1;
          this.column = 0;
        } else {
          this.column += 1;
        }
        input.consume();
      }
      getTokenName(tt) {
        if (tt === -1) {
          return "EOF";
        } else {
          return "'" + String.fromCharCode(tt) + "'";
        }
      }
    };
    LexerATNSimulator.debug = false;
    LexerATNSimulator.dfa_debug = false;
    LexerATNSimulator.MIN_DFA_EDGE = 0;
    LexerATNSimulator.MAX_DFA_EDGE = 127;
    LexerATNSimulator.match_calls = 0;
    module2.exports = LexerATNSimulator;
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/PredictionMode.js
var require_PredictionMode = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/PredictionMode.js"(exports2, module2) {
    var { Map, BitSet, AltDict, hashStuff } = require_Utils();
    var ATN = require_ATN();
    var { RuleStopState } = require_ATNState();
    var { ATNConfigSet } = require_ATNConfigSet();
    var { ATNConfig } = require_ATNConfig();
    var { SemanticContext } = require_SemanticContext();
    var PredictionMode = {
      SLL: 0,
      LL: 1,
      LL_EXACT_AMBIG_DETECTION: 2,
      hasSLLConflictTerminatingPrediction: function(mode, configs) {
        if (PredictionMode.allConfigsInRuleStopStates(configs)) {
          return true;
        }
        if (mode === PredictionMode.SLL) {
          if (configs.hasSemanticContext) {
            const dup = new ATNConfigSet();
            for (let i = 0; i < configs.items.length; i++) {
              let c = configs.items[i];
              c = new ATNConfig({ semanticContext: SemanticContext.NONE }, c);
              dup.add(c);
            }
            configs = dup;
          }
        }
        const altsets = PredictionMode.getConflictingAltSubsets(configs);
        return PredictionMode.hasConflictingAltSet(altsets) && !PredictionMode.hasStateAssociatedWithOneAlt(configs);
      },
      hasConfigInRuleStopState: function(configs) {
        for (let i = 0; i < configs.items.length; i++) {
          const c = configs.items[i];
          if (c.state instanceof RuleStopState) {
            return true;
          }
        }
        return false;
      },
      allConfigsInRuleStopStates: function(configs) {
        for (let i = 0; i < configs.items.length; i++) {
          const c = configs.items[i];
          if (!(c.state instanceof RuleStopState)) {
            return false;
          }
        }
        return true;
      },
      resolvesToJustOneViableAlt: function(altsets) {
        return PredictionMode.getSingleViableAlt(altsets);
      },
      allSubsetsConflict: function(altsets) {
        return !PredictionMode.hasNonConflictingAltSet(altsets);
      },
      hasNonConflictingAltSet: function(altsets) {
        for (let i = 0; i < altsets.length; i++) {
          const alts = altsets[i];
          if (alts.length === 1) {
            return true;
          }
        }
        return false;
      },
      hasConflictingAltSet: function(altsets) {
        for (let i = 0; i < altsets.length; i++) {
          const alts = altsets[i];
          if (alts.length > 1) {
            return true;
          }
        }
        return false;
      },
      allSubsetsEqual: function(altsets) {
        let first = null;
        for (let i = 0; i < altsets.length; i++) {
          const alts = altsets[i];
          if (first === null) {
            first = alts;
          } else if (alts !== first) {
            return false;
          }
        }
        return true;
      },
      getUniqueAlt: function(altsets) {
        const all = PredictionMode.getAlts(altsets);
        if (all.length === 1) {
          return all.minValue();
        } else {
          return ATN.INVALID_ALT_NUMBER;
        }
      },
      getAlts: function(altsets) {
        const all = new BitSet();
        altsets.map(function(alts) {
          all.or(alts);
        });
        return all;
      },
      getConflictingAltSubsets: function(configs) {
        const configToAlts = new Map();
        configToAlts.hashFunction = function(cfg) {
          hashStuff(cfg.state.stateNumber, cfg.context);
        };
        configToAlts.equalsFunction = function(c1, c2) {
          return c1.state.stateNumber === c2.state.stateNumber && c1.context.equals(c2.context);
        };
        configs.items.map(function(cfg) {
          let alts = configToAlts.get(cfg);
          if (alts === null) {
            alts = new BitSet();
            configToAlts.put(cfg, alts);
          }
          alts.add(cfg.alt);
        });
        return configToAlts.getValues();
      },
      getStateToAltMap: function(configs) {
        const m = new AltDict();
        configs.items.map(function(c) {
          let alts = m.get(c.state);
          if (alts === null) {
            alts = new BitSet();
            m.put(c.state, alts);
          }
          alts.add(c.alt);
        });
        return m;
      },
      hasStateAssociatedWithOneAlt: function(configs) {
        const values = PredictionMode.getStateToAltMap(configs).values();
        for (let i = 0; i < values.length; i++) {
          if (values[i].length === 1) {
            return true;
          }
        }
        return false;
      },
      getSingleViableAlt: function(altsets) {
        let result = null;
        for (let i = 0; i < altsets.length; i++) {
          const alts = altsets[i];
          const minAlt = alts.minValue();
          if (result === null) {
            result = minAlt;
          } else if (result !== minAlt) {
            return ATN.INVALID_ALT_NUMBER;
          }
        }
        return result;
      }
    };
    module2.exports = PredictionMode;
  }
});

// ../../node_modules/antlr4/src/antlr4/ParserRuleContext.js
var require_ParserRuleContext = __commonJS({
  "../../node_modules/antlr4/src/antlr4/ParserRuleContext.js"(exports2, module2) {
    var RuleContext = require_RuleContext();
    var Tree = require_Tree();
    var INVALID_INTERVAL = Tree.INVALID_INTERVAL;
    var TerminalNode = Tree.TerminalNode;
    var TerminalNodeImpl = Tree.TerminalNodeImpl;
    var ErrorNodeImpl = Tree.ErrorNodeImpl;
    var Interval = require_IntervalSet().Interval;
    var ParserRuleContext = class extends RuleContext {
      constructor(parent, invokingStateNumber) {
        parent = parent || null;
        invokingStateNumber = invokingStateNumber || null;
        super(parent, invokingStateNumber);
        this.ruleIndex = -1;
        this.children = null;
        this.start = null;
        this.stop = null;
        this.exception = null;
      }
      copyFrom(ctx) {
        this.parentCtx = ctx.parentCtx;
        this.invokingState = ctx.invokingState;
        this.children = null;
        this.start = ctx.start;
        this.stop = ctx.stop;
        if (ctx.children) {
          this.children = [];
          ctx.children.map(function(child) {
            if (child instanceof ErrorNodeImpl) {
              this.children.push(child);
              child.parentCtx = this;
            }
          }, this);
        }
      }
      enterRule(listener) {
      }
      exitRule(listener) {
      }
      addChild(child) {
        if (this.children === null) {
          this.children = [];
        }
        this.children.push(child);
        return child;
      }
      removeLastChild() {
        if (this.children !== null) {
          this.children.pop();
        }
      }
      addTokenNode(token) {
        const node = new TerminalNodeImpl(token);
        this.addChild(node);
        node.parentCtx = this;
        return node;
      }
      addErrorNode(badToken) {
        const node = new ErrorNodeImpl(badToken);
        this.addChild(node);
        node.parentCtx = this;
        return node;
      }
      getChild(i, type) {
        type = type || null;
        if (this.children === null || i < 0 || i >= this.children.length) {
          return null;
        }
        if (type === null) {
          return this.children[i];
        } else {
          for (let j = 0; j < this.children.length; j++) {
            const child = this.children[j];
            if (child instanceof type) {
              if (i === 0) {
                return child;
              } else {
                i -= 1;
              }
            }
          }
          return null;
        }
      }
      getToken(ttype, i) {
        if (this.children === null || i < 0 || i >= this.children.length) {
          return null;
        }
        for (let j = 0; j < this.children.length; j++) {
          const child = this.children[j];
          if (child instanceof TerminalNode) {
            if (child.symbol.type === ttype) {
              if (i === 0) {
                return child;
              } else {
                i -= 1;
              }
            }
          }
        }
        return null;
      }
      getTokens(ttype) {
        if (this.children === null) {
          return [];
        } else {
          const tokens = [];
          for (let j = 0; j < this.children.length; j++) {
            const child = this.children[j];
            if (child instanceof TerminalNode) {
              if (child.symbol.type === ttype) {
                tokens.push(child);
              }
            }
          }
          return tokens;
        }
      }
      getTypedRuleContext(ctxType, i) {
        return this.getChild(i, ctxType);
      }
      getTypedRuleContexts(ctxType) {
        if (this.children === null) {
          return [];
        } else {
          const contexts = [];
          for (let j = 0; j < this.children.length; j++) {
            const child = this.children[j];
            if (child instanceof ctxType) {
              contexts.push(child);
            }
          }
          return contexts;
        }
      }
      getChildCount() {
        if (this.children === null) {
          return 0;
        } else {
          return this.children.length;
        }
      }
      getSourceInterval() {
        if (this.start === null || this.stop === null) {
          return INVALID_INTERVAL;
        } else {
          return new Interval(this.start.tokenIndex, this.stop.tokenIndex);
        }
      }
    };
    RuleContext.EMPTY = new ParserRuleContext();
    module2.exports = ParserRuleContext;
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/ParserATNSimulator.js
var require_ParserATNSimulator = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/ParserATNSimulator.js"(exports2, module2) {
    var Utils = require_Utils();
    var { Set, BitSet, DoubleDict } = Utils;
    var ATN = require_ATN();
    var { ATNState, RuleStopState } = require_ATNState();
    var { ATNConfig } = require_ATNConfig();
    var { ATNConfigSet } = require_ATNConfigSet();
    var { Token } = require_Token();
    var { DFAState, PredPrediction } = require_DFAState();
    var ATNSimulator = require_ATNSimulator();
    var PredictionMode = require_PredictionMode();
    var RuleContext = require_RuleContext();
    var ParserRuleContext = require_ParserRuleContext();
    var { SemanticContext } = require_SemanticContext();
    var { PredictionContext } = require_PredictionContext();
    var { Interval } = require_IntervalSet();
    var { Transition, SetTransition, NotSetTransition, RuleTransition, ActionTransition } = require_Transition();
    var { NoViableAltException } = require_Errors();
    var { SingletonPredictionContext, predictionContextFromRuleContext } = require_PredictionContext();
    var ParserATNSimulator = class extends ATNSimulator {
      constructor(parser, atn, decisionToDFA, sharedContextCache) {
        super(atn, sharedContextCache);
        this.parser = parser;
        this.decisionToDFA = decisionToDFA;
        this.predictionMode = PredictionMode.LL;
        this._input = null;
        this._startIndex = 0;
        this._outerContext = null;
        this._dfa = null;
        this.mergeCache = null;
        this.debug = false;
        this.debug_closure = false;
        this.debug_add = false;
        this.debug_list_atn_decisions = false;
        this.dfa_debug = false;
        this.retry_debug = false;
      }
      reset() {
      }
      adaptivePredict(input, decision, outerContext) {
        if (this.debug || this.debug_list_atn_decisions) {
          console.log("adaptivePredict decision " + decision + " exec LA(1)==" + this.getLookaheadName(input) + " line " + input.LT(1).line + ":" + input.LT(1).column);
        }
        this._input = input;
        this._startIndex = input.index;
        this._outerContext = outerContext;
        const dfa = this.decisionToDFA[decision];
        this._dfa = dfa;
        const m = input.mark();
        const index = input.index;
        try {
          let s0;
          if (dfa.precedenceDfa) {
            s0 = dfa.getPrecedenceStartState(this.parser.getPrecedence());
          } else {
            s0 = dfa.s0;
          }
          if (s0 === null) {
            if (outerContext === null) {
              outerContext = RuleContext.EMPTY;
            }
            if (this.debug || this.debug_list_atn_decisions) {
              console.log("predictATN decision " + dfa.decision + " exec LA(1)==" + this.getLookaheadName(input) + ", outerContext=" + outerContext.toString(this.parser.ruleNames));
            }
            const fullCtx = false;
            let s0_closure = this.computeStartState(dfa.atnStartState, RuleContext.EMPTY, fullCtx);
            if (dfa.precedenceDfa) {
              dfa.s0.configs = s0_closure;
              s0_closure = this.applyPrecedenceFilter(s0_closure);
              s0 = this.addDFAState(dfa, new DFAState(null, s0_closure));
              dfa.setPrecedenceStartState(this.parser.getPrecedence(), s0);
            } else {
              s0 = this.addDFAState(dfa, new DFAState(null, s0_closure));
              dfa.s0 = s0;
            }
          }
          const alt = this.execATN(dfa, s0, input, index, outerContext);
          if (this.debug) {
            console.log("DFA after predictATN: " + dfa.toString(this.parser.literalNames));
          }
          return alt;
        } finally {
          this._dfa = null;
          this.mergeCache = null;
          input.seek(index);
          input.release(m);
        }
      }
      execATN(dfa, s0, input, startIndex, outerContext) {
        if (this.debug || this.debug_list_atn_decisions) {
          console.log("execATN decision " + dfa.decision + " exec LA(1)==" + this.getLookaheadName(input) + " line " + input.LT(1).line + ":" + input.LT(1).column);
        }
        let alt;
        let previousD = s0;
        if (this.debug) {
          console.log("s0 = " + s0);
        }
        let t = input.LA(1);
        while (true) {
          let D = this.getExistingTargetState(previousD, t);
          if (D === null) {
            D = this.computeTargetState(dfa, previousD, t);
          }
          if (D === ATNSimulator.ERROR) {
            const e = this.noViableAlt(input, outerContext, previousD.configs, startIndex);
            input.seek(startIndex);
            alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previousD.configs, outerContext);
            if (alt !== ATN.INVALID_ALT_NUMBER) {
              return alt;
            } else {
              throw e;
            }
          }
          if (D.requiresFullContext && this.predictionMode !== PredictionMode.SLL) {
            let conflictingAlts = null;
            if (D.predicates !== null) {
              if (this.debug) {
                console.log("DFA state has preds in DFA sim LL failover");
              }
              const conflictIndex = input.index;
              if (conflictIndex !== startIndex) {
                input.seek(startIndex);
              }
              conflictingAlts = this.evalSemanticContext(D.predicates, outerContext, true);
              if (conflictingAlts.length === 1) {
                if (this.debug) {
                  console.log("Full LL avoided");
                }
                return conflictingAlts.minValue();
              }
              if (conflictIndex !== startIndex) {
                input.seek(conflictIndex);
              }
            }
            if (this.dfa_debug) {
              console.log("ctx sensitive state " + outerContext + " in " + D);
            }
            const fullCtx = true;
            const s0_closure = this.computeStartState(dfa.atnStartState, outerContext, fullCtx);
            this.reportAttemptingFullContext(dfa, conflictingAlts, D.configs, startIndex, input.index);
            alt = this.execATNWithFullContext(dfa, D, s0_closure, input, startIndex, outerContext);
            return alt;
          }
          if (D.isAcceptState) {
            if (D.predicates === null) {
              return D.prediction;
            }
            const stopIndex = input.index;
            input.seek(startIndex);
            const alts = this.evalSemanticContext(D.predicates, outerContext, true);
            if (alts.length === 0) {
              throw this.noViableAlt(input, outerContext, D.configs, startIndex);
            } else if (alts.length === 1) {
              return alts.minValue();
            } else {
              this.reportAmbiguity(dfa, D, startIndex, stopIndex, false, alts, D.configs);
              return alts.minValue();
            }
          }
          previousD = D;
          if (t !== Token.EOF) {
            input.consume();
            t = input.LA(1);
          }
        }
      }
      getExistingTargetState(previousD, t) {
        const edges = previousD.edges;
        if (edges === null) {
          return null;
        } else {
          return edges[t + 1] || null;
        }
      }
      computeTargetState(dfa, previousD, t) {
        const reach = this.computeReachSet(previousD.configs, t, false);
        if (reach === null) {
          this.addDFAEdge(dfa, previousD, t, ATNSimulator.ERROR);
          return ATNSimulator.ERROR;
        }
        let D = new DFAState(null, reach);
        const predictedAlt = this.getUniqueAlt(reach);
        if (this.debug) {
          const altSubSets = PredictionMode.getConflictingAltSubsets(reach);
          console.log("SLL altSubSets=" + Utils.arrayToString(altSubSets) + ", previous=" + previousD.configs + ", configs=" + reach + ", predict=" + predictedAlt + ", allSubsetsConflict=" + PredictionMode.allSubsetsConflict(altSubSets) + ", conflictingAlts=" + this.getConflictingAlts(reach));
        }
        if (predictedAlt !== ATN.INVALID_ALT_NUMBER) {
          D.isAcceptState = true;
          D.configs.uniqueAlt = predictedAlt;
          D.prediction = predictedAlt;
        } else if (PredictionMode.hasSLLConflictTerminatingPrediction(this.predictionMode, reach)) {
          D.configs.conflictingAlts = this.getConflictingAlts(reach);
          D.requiresFullContext = true;
          D.isAcceptState = true;
          D.prediction = D.configs.conflictingAlts.minValue();
        }
        if (D.isAcceptState && D.configs.hasSemanticContext) {
          this.predicateDFAState(D, this.atn.getDecisionState(dfa.decision));
          if (D.predicates !== null) {
            D.prediction = ATN.INVALID_ALT_NUMBER;
          }
        }
        D = this.addDFAEdge(dfa, previousD, t, D);
        return D;
      }
      predicateDFAState(dfaState, decisionState) {
        const nalts = decisionState.transitions.length;
        const altsToCollectPredsFrom = this.getConflictingAltsOrUniqueAlt(dfaState.configs);
        const altToPred = this.getPredsForAmbigAlts(altsToCollectPredsFrom, dfaState.configs, nalts);
        if (altToPred !== null) {
          dfaState.predicates = this.getPredicatePredictions(altsToCollectPredsFrom, altToPred);
          dfaState.prediction = ATN.INVALID_ALT_NUMBER;
        } else {
          dfaState.prediction = altsToCollectPredsFrom.minValue();
        }
      }
      execATNWithFullContext(dfa, D, s0, input, startIndex, outerContext) {
        if (this.debug || this.debug_list_atn_decisions) {
          console.log("execATNWithFullContext " + s0);
        }
        const fullCtx = true;
        let foundExactAmbig = false;
        let reach;
        let previous = s0;
        input.seek(startIndex);
        let t = input.LA(1);
        let predictedAlt = -1;
        while (true) {
          reach = this.computeReachSet(previous, t, fullCtx);
          if (reach === null) {
            const e = this.noViableAlt(input, outerContext, previous, startIndex);
            input.seek(startIndex);
            const alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previous, outerContext);
            if (alt !== ATN.INVALID_ALT_NUMBER) {
              return alt;
            } else {
              throw e;
            }
          }
          const altSubSets = PredictionMode.getConflictingAltSubsets(reach);
          if (this.debug) {
            console.log("LL altSubSets=" + altSubSets + ", predict=" + PredictionMode.getUniqueAlt(altSubSets) + ", resolvesToJustOneViableAlt=" + PredictionMode.resolvesToJustOneViableAlt(altSubSets));
          }
          reach.uniqueAlt = this.getUniqueAlt(reach);
          if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
            predictedAlt = reach.uniqueAlt;
            break;
          } else if (this.predictionMode !== PredictionMode.LL_EXACT_AMBIG_DETECTION) {
            predictedAlt = PredictionMode.resolvesToJustOneViableAlt(altSubSets);
            if (predictedAlt !== ATN.INVALID_ALT_NUMBER) {
              break;
            }
          } else {
            if (PredictionMode.allSubsetsConflict(altSubSets) && PredictionMode.allSubsetsEqual(altSubSets)) {
              foundExactAmbig = true;
              predictedAlt = PredictionMode.getSingleViableAlt(altSubSets);
              break;
            }
          }
          previous = reach;
          if (t !== Token.EOF) {
            input.consume();
            t = input.LA(1);
          }
        }
        if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
          this.reportContextSensitivity(dfa, predictedAlt, reach, startIndex, input.index);
          return predictedAlt;
        }
        this.reportAmbiguity(dfa, D, startIndex, input.index, foundExactAmbig, null, reach);
        return predictedAlt;
      }
      computeReachSet(closure, t, fullCtx) {
        if (this.debug) {
          console.log("in computeReachSet, starting closure: " + closure);
        }
        if (this.mergeCache === null) {
          this.mergeCache = new DoubleDict();
        }
        const intermediate = new ATNConfigSet(fullCtx);
        let skippedStopStates = null;
        for (let i = 0; i < closure.items.length; i++) {
          const c = closure.items[i];
          if (this.debug) {
            console.log("testing " + this.getTokenName(t) + " at " + c);
          }
          if (c.state instanceof RuleStopState) {
            if (fullCtx || t === Token.EOF) {
              if (skippedStopStates === null) {
                skippedStopStates = [];
              }
              skippedStopStates.push(c);
              if (this.debug_add) {
                console.log("added " + c + " to skippedStopStates");
              }
            }
            continue;
          }
          for (let j = 0; j < c.state.transitions.length; j++) {
            const trans = c.state.transitions[j];
            const target = this.getReachableTarget(trans, t);
            if (target !== null) {
              const cfg = new ATNConfig({ state: target }, c);
              intermediate.add(cfg, this.mergeCache);
              if (this.debug_add) {
                console.log("added " + cfg + " to intermediate");
              }
            }
          }
        }
        let reach = null;
        if (skippedStopStates === null && t !== Token.EOF) {
          if (intermediate.items.length === 1) {
            reach = intermediate;
          } else if (this.getUniqueAlt(intermediate) !== ATN.INVALID_ALT_NUMBER) {
            reach = intermediate;
          }
        }
        if (reach === null) {
          reach = new ATNConfigSet(fullCtx);
          const closureBusy = new Set();
          const treatEofAsEpsilon = t === Token.EOF;
          for (let k = 0; k < intermediate.items.length; k++) {
            this.closure(intermediate.items[k], reach, closureBusy, false, fullCtx, treatEofAsEpsilon);
          }
        }
        if (t === Token.EOF) {
          reach = this.removeAllConfigsNotInRuleStopState(reach, reach === intermediate);
        }
        if (skippedStopStates !== null && (!fullCtx || !PredictionMode.hasConfigInRuleStopState(reach))) {
          for (let l = 0; l < skippedStopStates.length; l++) {
            reach.add(skippedStopStates[l], this.mergeCache);
          }
        }
        if (reach.items.length === 0) {
          return null;
        } else {
          return reach;
        }
      }
      removeAllConfigsNotInRuleStopState(configs, lookToEndOfRule) {
        if (PredictionMode.allConfigsInRuleStopStates(configs)) {
          return configs;
        }
        const result = new ATNConfigSet(configs.fullCtx);
        for (let i = 0; i < configs.items.length; i++) {
          const config = configs.items[i];
          if (config.state instanceof RuleStopState) {
            result.add(config, this.mergeCache);
            continue;
          }
          if (lookToEndOfRule && config.state.epsilonOnlyTransitions) {
            const nextTokens = this.atn.nextTokens(config.state);
            if (nextTokens.contains(Token.EPSILON)) {
              const endOfRuleState = this.atn.ruleToStopState[config.state.ruleIndex];
              result.add(new ATNConfig({ state: endOfRuleState }, config), this.mergeCache);
            }
          }
        }
        return result;
      }
      computeStartState(p, ctx, fullCtx) {
        const initialContext = predictionContextFromRuleContext(this.atn, ctx);
        const configs = new ATNConfigSet(fullCtx);
        for (let i = 0; i < p.transitions.length; i++) {
          const target = p.transitions[i].target;
          const c = new ATNConfig({ state: target, alt: i + 1, context: initialContext }, null);
          const closureBusy = new Set();
          this.closure(c, configs, closureBusy, true, fullCtx, false);
        }
        return configs;
      }
      applyPrecedenceFilter(configs) {
        let config;
        const statesFromAlt1 = [];
        const configSet = new ATNConfigSet(configs.fullCtx);
        for (let i = 0; i < configs.items.length; i++) {
          config = configs.items[i];
          if (config.alt !== 1) {
            continue;
          }
          const updatedContext = config.semanticContext.evalPrecedence(this.parser, this._outerContext);
          if (updatedContext === null) {
            continue;
          }
          statesFromAlt1[config.state.stateNumber] = config.context;
          if (updatedContext !== config.semanticContext) {
            configSet.add(new ATNConfig({ semanticContext: updatedContext }, config), this.mergeCache);
          } else {
            configSet.add(config, this.mergeCache);
          }
        }
        for (let i = 0; i < configs.items.length; i++) {
          config = configs.items[i];
          if (config.alt === 1) {
            continue;
          }
          if (!config.precedenceFilterSuppressed) {
            const context = statesFromAlt1[config.state.stateNumber] || null;
            if (context !== null && context.equals(config.context)) {
              continue;
            }
          }
          configSet.add(config, this.mergeCache);
        }
        return configSet;
      }
      getReachableTarget(trans, ttype) {
        if (trans.matches(ttype, 0, this.atn.maxTokenType)) {
          return trans.target;
        } else {
          return null;
        }
      }
      getPredsForAmbigAlts(ambigAlts, configs, nalts) {
        let altToPred = [];
        for (let i = 0; i < configs.items.length; i++) {
          const c = configs.items[i];
          if (ambigAlts.contains(c.alt)) {
            altToPred[c.alt] = SemanticContext.orContext(altToPred[c.alt] || null, c.semanticContext);
          }
        }
        let nPredAlts = 0;
        for (let i = 1; i < nalts + 1; i++) {
          const pred = altToPred[i] || null;
          if (pred === null) {
            altToPred[i] = SemanticContext.NONE;
          } else if (pred !== SemanticContext.NONE) {
            nPredAlts += 1;
          }
        }
        if (nPredAlts === 0) {
          altToPred = null;
        }
        if (this.debug) {
          console.log("getPredsForAmbigAlts result " + Utils.arrayToString(altToPred));
        }
        return altToPred;
      }
      getPredicatePredictions(ambigAlts, altToPred) {
        const pairs = [];
        let containsPredicate = false;
        for (let i = 1; i < altToPred.length; i++) {
          const pred = altToPred[i];
          if (ambigAlts !== null && ambigAlts.contains(i)) {
            pairs.push(new PredPrediction(pred, i));
          }
          if (pred !== SemanticContext.NONE) {
            containsPredicate = true;
          }
        }
        if (!containsPredicate) {
          return null;
        }
        return pairs;
      }
      getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(configs, outerContext) {
        const cfgs = this.splitAccordingToSemanticValidity(configs, outerContext);
        const semValidConfigs = cfgs[0];
        const semInvalidConfigs = cfgs[1];
        let alt = this.getAltThatFinishedDecisionEntryRule(semValidConfigs);
        if (alt !== ATN.INVALID_ALT_NUMBER) {
          return alt;
        }
        if (semInvalidConfigs.items.length > 0) {
          alt = this.getAltThatFinishedDecisionEntryRule(semInvalidConfigs);
          if (alt !== ATN.INVALID_ALT_NUMBER) {
            return alt;
          }
        }
        return ATN.INVALID_ALT_NUMBER;
      }
      getAltThatFinishedDecisionEntryRule(configs) {
        const alts = [];
        for (let i = 0; i < configs.items.length; i++) {
          const c = configs.items[i];
          if (c.reachesIntoOuterContext > 0 || c.state instanceof RuleStopState && c.context.hasEmptyPath()) {
            if (alts.indexOf(c.alt) < 0) {
              alts.push(c.alt);
            }
          }
        }
        if (alts.length === 0) {
          return ATN.INVALID_ALT_NUMBER;
        } else {
          return Math.min.apply(null, alts);
        }
      }
      splitAccordingToSemanticValidity(configs, outerContext) {
        const succeeded = new ATNConfigSet(configs.fullCtx);
        const failed = new ATNConfigSet(configs.fullCtx);
        for (let i = 0; i < configs.items.length; i++) {
          const c = configs.items[i];
          if (c.semanticContext !== SemanticContext.NONE) {
            const predicateEvaluationResult = c.semanticContext.evaluate(this.parser, outerContext);
            if (predicateEvaluationResult) {
              succeeded.add(c);
            } else {
              failed.add(c);
            }
          } else {
            succeeded.add(c);
          }
        }
        return [succeeded, failed];
      }
      evalSemanticContext(predPredictions, outerContext, complete) {
        const predictions = new BitSet();
        for (let i = 0; i < predPredictions.length; i++) {
          const pair = predPredictions[i];
          if (pair.pred === SemanticContext.NONE) {
            predictions.add(pair.alt);
            if (!complete) {
              break;
            }
            continue;
          }
          const predicateEvaluationResult = pair.pred.evaluate(this.parser, outerContext);
          if (this.debug || this.dfa_debug) {
            console.log("eval pred " + pair + "=" + predicateEvaluationResult);
          }
          if (predicateEvaluationResult) {
            if (this.debug || this.dfa_debug) {
              console.log("PREDICT " + pair.alt);
            }
            predictions.add(pair.alt);
            if (!complete) {
              break;
            }
          }
        }
        return predictions;
      }
      closure(config, configs, closureBusy, collectPredicates, fullCtx, treatEofAsEpsilon) {
        const initialDepth = 0;
        this.closureCheckingStopState(config, configs, closureBusy, collectPredicates, fullCtx, initialDepth, treatEofAsEpsilon);
      }
      closureCheckingStopState(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
        if (this.debug || this.debug_closure) {
          console.log("closure(" + config.toString(this.parser, true) + ")");
          if (config.reachesIntoOuterContext > 50) {
            throw "problem";
          }
        }
        if (config.state instanceof RuleStopState) {
          if (!config.context.isEmpty()) {
            for (let i = 0; i < config.context.length; i++) {
              if (config.context.getReturnState(i) === PredictionContext.EMPTY_RETURN_STATE) {
                if (fullCtx) {
                  configs.add(new ATNConfig({ state: config.state, context: PredictionContext.EMPTY }, config), this.mergeCache);
                  continue;
                } else {
                  if (this.debug) {
                    console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
                  }
                  this.closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon);
                }
                continue;
              }
              const returnState = this.atn.states[config.context.getReturnState(i)];
              const newContext = config.context.getParent(i);
              const parms = { state: returnState, alt: config.alt, context: newContext, semanticContext: config.semanticContext };
              const c = new ATNConfig(parms, null);
              c.reachesIntoOuterContext = config.reachesIntoOuterContext;
              this.closureCheckingStopState(c, configs, closureBusy, collectPredicates, fullCtx, depth - 1, treatEofAsEpsilon);
            }
            return;
          } else if (fullCtx) {
            configs.add(config, this.mergeCache);
            return;
          } else {
            if (this.debug) {
              console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
            }
          }
        }
        this.closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon);
      }
      closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
        const p = config.state;
        if (!p.epsilonOnlyTransitions) {
          configs.add(config, this.mergeCache);
        }
        for (let i = 0; i < p.transitions.length; i++) {
          if (i === 0 && this.canDropLoopEntryEdgeInLeftRecursiveRule(config))
            continue;
          const t = p.transitions[i];
          const continueCollecting = collectPredicates && !(t instanceof ActionTransition);
          const c = this.getEpsilonTarget(config, t, continueCollecting, depth === 0, fullCtx, treatEofAsEpsilon);
          if (c !== null) {
            let newDepth = depth;
            if (config.state instanceof RuleStopState) {
              if (this._dfa !== null && this._dfa.precedenceDfa) {
                if (t.outermostPrecedenceReturn === this._dfa.atnStartState.ruleIndex) {
                  c.precedenceFilterSuppressed = true;
                }
              }
              c.reachesIntoOuterContext += 1;
              if (closureBusy.add(c) !== c) {
                continue;
              }
              configs.dipsIntoOuterContext = true;
              newDepth -= 1;
              if (this.debug) {
                console.log("dips into outer ctx: " + c);
              }
            } else {
              if (!t.isEpsilon && closureBusy.add(c) !== c) {
                continue;
              }
              if (t instanceof RuleTransition) {
                if (newDepth >= 0) {
                  newDepth += 1;
                }
              }
            }
            this.closureCheckingStopState(c, configs, closureBusy, continueCollecting, fullCtx, newDepth, treatEofAsEpsilon);
          }
        }
      }
      canDropLoopEntryEdgeInLeftRecursiveRule(config) {
        const p = config.state;
        if (p.stateType !== ATNState.STAR_LOOP_ENTRY)
          return false;
        if (p.stateType !== ATNState.STAR_LOOP_ENTRY || !p.isPrecedenceDecision || config.context.isEmpty() || config.context.hasEmptyPath())
          return false;
        const numCtxs = config.context.length;
        for (let i = 0; i < numCtxs; i++) {
          const returnState = this.atn.states[config.context.getReturnState(i)];
          if (returnState.ruleIndex !== p.ruleIndex)
            return false;
        }
        const decisionStartState = p.transitions[0].target;
        const blockEndStateNum = decisionStartState.endState.stateNumber;
        const blockEndState = this.atn.states[blockEndStateNum];
        for (let i = 0; i < numCtxs; i++) {
          const returnStateNumber = config.context.getReturnState(i);
          const returnState = this.atn.states[returnStateNumber];
          if (returnState.transitions.length !== 1 || !returnState.transitions[0].isEpsilon)
            return false;
          const returnStateTarget = returnState.transitions[0].target;
          if (returnState.stateType === ATNState.BLOCK_END && returnStateTarget === p)
            continue;
          if (returnState === blockEndState)
            continue;
          if (returnStateTarget === blockEndState)
            continue;
          if (returnStateTarget.stateType === ATNState.BLOCK_END && returnStateTarget.transitions.length === 1 && returnStateTarget.transitions[0].isEpsilon && returnStateTarget.transitions[0].target === p)
            continue;
          return false;
        }
        return true;
      }
      getRuleName(index) {
        if (this.parser !== null && index >= 0) {
          return this.parser.ruleNames[index];
        } else {
          return "<rule " + index + ">";
        }
      }
      getEpsilonTarget(config, t, collectPredicates, inContext, fullCtx, treatEofAsEpsilon) {
        switch (t.serializationType) {
          case Transition.RULE:
            return this.ruleTransition(config, t);
          case Transition.PRECEDENCE:
            return this.precedenceTransition(config, t, collectPredicates, inContext, fullCtx);
          case Transition.PREDICATE:
            return this.predTransition(config, t, collectPredicates, inContext, fullCtx);
          case Transition.ACTION:
            return this.actionTransition(config, t);
          case Transition.EPSILON:
            return new ATNConfig({ state: t.target }, config);
          case Transition.ATOM:
          case Transition.RANGE:
          case Transition.SET:
            if (treatEofAsEpsilon) {
              if (t.matches(Token.EOF, 0, 1)) {
                return new ATNConfig({ state: t.target }, config);
              }
            }
            return null;
          default:
            return null;
        }
      }
      actionTransition(config, t) {
        if (this.debug) {
          const index = t.actionIndex === -1 ? 65535 : t.actionIndex;
          console.log("ACTION edge " + t.ruleIndex + ":" + index);
        }
        return new ATNConfig({ state: t.target }, config);
      }
      precedenceTransition(config, pt, collectPredicates, inContext, fullCtx) {
        if (this.debug) {
          console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.precedence + ">=_p, ctx dependent=true");
          if (this.parser !== null) {
            console.log("context surrounding pred is " + Utils.arrayToString(this.parser.getRuleInvocationStack()));
          }
        }
        let c = null;
        if (collectPredicates && inContext) {
          if (fullCtx) {
            const currentPosition = this._input.index;
            this._input.seek(this._startIndex);
            const predSucceeds = pt.getPredicate().evaluate(this.parser, this._outerContext);
            this._input.seek(currentPosition);
            if (predSucceeds) {
              c = new ATNConfig({ state: pt.target }, config);
            }
          } else {
            const newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
            c = new ATNConfig({ state: pt.target, semanticContext: newSemCtx }, config);
          }
        } else {
          c = new ATNConfig({ state: pt.target }, config);
        }
        if (this.debug) {
          console.log("config from pred transition=" + c);
        }
        return c;
      }
      predTransition(config, pt, collectPredicates, inContext, fullCtx) {
        if (this.debug) {
          console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.ruleIndex + ":" + pt.predIndex + ", ctx dependent=" + pt.isCtxDependent);
          if (this.parser !== null) {
            console.log("context surrounding pred is " + Utils.arrayToString(this.parser.getRuleInvocationStack()));
          }
        }
        let c = null;
        if (collectPredicates && (pt.isCtxDependent && inContext || !pt.isCtxDependent)) {
          if (fullCtx) {
            const currentPosition = this._input.index;
            this._input.seek(this._startIndex);
            const predSucceeds = pt.getPredicate().evaluate(this.parser, this._outerContext);
            this._input.seek(currentPosition);
            if (predSucceeds) {
              c = new ATNConfig({ state: pt.target }, config);
            }
          } else {
            const newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
            c = new ATNConfig({ state: pt.target, semanticContext: newSemCtx }, config);
          }
        } else {
          c = new ATNConfig({ state: pt.target }, config);
        }
        if (this.debug) {
          console.log("config from pred transition=" + c);
        }
        return c;
      }
      ruleTransition(config, t) {
        if (this.debug) {
          console.log("CALL rule " + this.getRuleName(t.target.ruleIndex) + ", ctx=" + config.context);
        }
        const returnState = t.followState;
        const newContext = SingletonPredictionContext.create(config.context, returnState.stateNumber);
        return new ATNConfig({ state: t.target, context: newContext }, config);
      }
      getConflictingAlts(configs) {
        const altsets = PredictionMode.getConflictingAltSubsets(configs);
        return PredictionMode.getAlts(altsets);
      }
      getConflictingAltsOrUniqueAlt(configs) {
        let conflictingAlts = null;
        if (configs.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
          conflictingAlts = new BitSet();
          conflictingAlts.add(configs.uniqueAlt);
        } else {
          conflictingAlts = configs.conflictingAlts;
        }
        return conflictingAlts;
      }
      getTokenName(t) {
        if (t === Token.EOF) {
          return "EOF";
        }
        if (this.parser !== null && this.parser.literalNames !== null) {
          if (t >= this.parser.literalNames.length && t >= this.parser.symbolicNames.length) {
            console.log("" + t + " ttype out of range: " + this.parser.literalNames);
            console.log("" + this.parser.getInputStream().getTokens());
          } else {
            const name = this.parser.literalNames[t] || this.parser.symbolicNames[t];
            return name + "<" + t + ">";
          }
        }
        return "" + t;
      }
      getLookaheadName(input) {
        return this.getTokenName(input.LA(1));
      }
      dumpDeadEndConfigs(nvae) {
        console.log("dead end configs: ");
        const decs = nvae.getDeadEndConfigs();
        for (let i = 0; i < decs.length; i++) {
          const c = decs[i];
          let trans = "no edges";
          if (c.state.transitions.length > 0) {
            const t = c.state.transitions[0];
            if (t instanceof AtomTransition) {
              trans = "Atom " + this.getTokenName(t.label);
            } else if (t instanceof SetTransition) {
              const neg = t instanceof NotSetTransition;
              trans = (neg ? "~" : "") + "Set " + t.set;
            }
          }
          console.error(c.toString(this.parser, true) + ":" + trans);
        }
      }
      noViableAlt(input, outerContext, configs, startIndex) {
        return new NoViableAltException(this.parser, input, input.get(startIndex), input.LT(1), configs, outerContext);
      }
      getUniqueAlt(configs) {
        let alt = ATN.INVALID_ALT_NUMBER;
        for (let i = 0; i < configs.items.length; i++) {
          const c = configs.items[i];
          if (alt === ATN.INVALID_ALT_NUMBER) {
            alt = c.alt;
          } else if (c.alt !== alt) {
            return ATN.INVALID_ALT_NUMBER;
          }
        }
        return alt;
      }
      addDFAEdge(dfa, from_, t, to) {
        if (this.debug) {
          console.log("EDGE " + from_ + " -> " + to + " upon " + this.getTokenName(t));
        }
        if (to === null) {
          return null;
        }
        to = this.addDFAState(dfa, to);
        if (from_ === null || t < -1 || t > this.atn.maxTokenType) {
          return to;
        }
        if (from_.edges === null) {
          from_.edges = [];
        }
        from_.edges[t + 1] = to;
        if (this.debug) {
          const literalNames = this.parser === null ? null : this.parser.literalNames;
          const symbolicNames = this.parser === null ? null : this.parser.symbolicNames;
          console.log("DFA=\n" + dfa.toString(literalNames, symbolicNames));
        }
        return to;
      }
      addDFAState(dfa, D) {
        if (D === ATNSimulator.ERROR) {
          return D;
        }
        const existing = dfa.states.get(D);
        if (existing !== null) {
          return existing;
        }
        D.stateNumber = dfa.states.length;
        if (!D.configs.readOnly) {
          D.configs.optimizeConfigs(this);
          D.configs.setReadonly(true);
        }
        dfa.states.add(D);
        if (this.debug) {
          console.log("adding new DFA state: " + D);
        }
        return D;
      }
      reportAttemptingFullContext(dfa, conflictingAlts, configs, startIndex, stopIndex) {
        if (this.debug || this.retry_debug) {
          const interval = new Interval(startIndex, stopIndex + 1);
          console.log("reportAttemptingFullContext decision=" + dfa.decision + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
        }
        if (this.parser !== null) {
          this.parser.getErrorListenerDispatch().reportAttemptingFullContext(this.parser, dfa, startIndex, stopIndex, conflictingAlts, configs);
        }
      }
      reportContextSensitivity(dfa, prediction, configs, startIndex, stopIndex) {
        if (this.debug || this.retry_debug) {
          const interval = new Interval(startIndex, stopIndex + 1);
          console.log("reportContextSensitivity decision=" + dfa.decision + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
        }
        if (this.parser !== null) {
          this.parser.getErrorListenerDispatch().reportContextSensitivity(this.parser, dfa, startIndex, stopIndex, prediction, configs);
        }
      }
      reportAmbiguity(dfa, D, startIndex, stopIndex, exact, ambigAlts, configs) {
        if (this.debug || this.retry_debug) {
          const interval = new Interval(startIndex, stopIndex + 1);
          console.log("reportAmbiguity " + ambigAlts + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
        }
        if (this.parser !== null) {
          this.parser.getErrorListenerDispatch().reportAmbiguity(this.parser, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
        }
      }
    };
    module2.exports = ParserATNSimulator;
  }
});

// ../../node_modules/antlr4/src/antlr4/atn/index.js
var require_atn = __commonJS({
  "../../node_modules/antlr4/src/antlr4/atn/index.js"(exports2) {
    exports2.ATN = require_ATN();
    exports2.ATNDeserializer = require_ATNDeserializer();
    exports2.LexerATNSimulator = require_LexerATNSimulator();
    exports2.ParserATNSimulator = require_ParserATNSimulator();
    exports2.PredictionMode = require_PredictionMode();
  }
});

// ../../node_modules/antlr4/src/antlr4/polyfills/codepointat.js
var require_codepointat = __commonJS({
  "../../node_modules/antlr4/src/antlr4/polyfills/codepointat.js"() {
    if (!String.prototype.codePointAt) {
      (function() {
        "use strict";
        var defineProperty = function() {
          let result;
          try {
            const object = {};
            const $defineProperty = Object.defineProperty;
            result = $defineProperty(object, object, object) && $defineProperty;
          } catch (error) {
          }
          return result;
        }();
        const codePointAt = function(position) {
          if (this == null) {
            throw TypeError();
          }
          const string = String(this);
          const size = string.length;
          let index = position ? Number(position) : 0;
          if (index !== index) {
            index = 0;
          }
          if (index < 0 || index >= size) {
            return void 0;
          }
          const first = string.charCodeAt(index);
          let second;
          if (first >= 55296 && first <= 56319 && size > index + 1) {
            second = string.charCodeAt(index + 1);
            if (second >= 56320 && second <= 57343) {
              return (first - 55296) * 1024 + second - 56320 + 65536;
            }
          }
          return first;
        };
        if (defineProperty) {
          defineProperty(String.prototype, "codePointAt", {
            "value": codePointAt,
            "configurable": true,
            "writable": true
          });
        } else {
          String.prototype.codePointAt = codePointAt;
        }
      })();
    }
  }
});

// ../../node_modules/antlr4/src/antlr4/dfa/DFASerializer.js
var require_DFASerializer = __commonJS({
  "../../node_modules/antlr4/src/antlr4/dfa/DFASerializer.js"(exports2, module2) {
    var DFASerializer = class {
      constructor(dfa, literalNames, symbolicNames) {
        this.dfa = dfa;
        this.literalNames = literalNames || [];
        this.symbolicNames = symbolicNames || [];
      }
      toString() {
        if (this.dfa.s0 === null) {
          return null;
        }
        let buf = "";
        const states = this.dfa.sortedStates();
        for (let i = 0; i < states.length; i++) {
          const s = states[i];
          if (s.edges !== null) {
            const n = s.edges.length;
            for (let j = 0; j < n; j++) {
              const t = s.edges[j] || null;
              if (t !== null && t.stateNumber !== 2147483647) {
                buf = buf.concat(this.getStateString(s));
                buf = buf.concat("-");
                buf = buf.concat(this.getEdgeLabel(j));
                buf = buf.concat("->");
                buf = buf.concat(this.getStateString(t));
                buf = buf.concat("\n");
              }
            }
          }
        }
        return buf.length === 0 ? null : buf;
      }
      getEdgeLabel(i) {
        if (i === 0) {
          return "EOF";
        } else if (this.literalNames !== null || this.symbolicNames !== null) {
          return this.literalNames[i - 1] || this.symbolicNames[i - 1];
        } else {
          return String.fromCharCode(i - 1);
        }
      }
      getStateString(s) {
        const baseStateStr = (s.isAcceptState ? ":" : "") + "s" + s.stateNumber + (s.requiresFullContext ? "^" : "");
        if (s.isAcceptState) {
          if (s.predicates !== null) {
            return baseStateStr + "=>" + s.predicates.toString();
          } else {
            return baseStateStr + "=>" + s.prediction.toString();
          }
        } else {
          return baseStateStr;
        }
      }
    };
    var LexerDFASerializer = class extends DFASerializer {
      constructor(dfa) {
        super(dfa, null);
      }
      getEdgeLabel(i) {
        return "'" + String.fromCharCode(i) + "'";
      }
    };
    module2.exports = { DFASerializer, LexerDFASerializer };
  }
});

// ../../node_modules/antlr4/src/antlr4/dfa/DFA.js
var require_DFA = __commonJS({
  "../../node_modules/antlr4/src/antlr4/dfa/DFA.js"(exports2, module2) {
    var { Set } = require_Utils();
    var { DFAState } = require_DFAState();
    var { StarLoopEntryState } = require_ATNState();
    var { ATNConfigSet } = require_ATNConfigSet();
    var { DFASerializer } = require_DFASerializer();
    var { LexerDFASerializer } = require_DFASerializer();
    var DFA = class {
      constructor(atnStartState, decision) {
        if (decision === void 0) {
          decision = 0;
        }
        this.atnStartState = atnStartState;
        this.decision = decision;
        this._states = new Set();
        this.s0 = null;
        this.precedenceDfa = false;
        if (atnStartState instanceof StarLoopEntryState) {
          if (atnStartState.isPrecedenceDecision) {
            this.precedenceDfa = true;
            const precedenceState = new DFAState(null, new ATNConfigSet());
            precedenceState.edges = [];
            precedenceState.isAcceptState = false;
            precedenceState.requiresFullContext = false;
            this.s0 = precedenceState;
          }
        }
      }
      getPrecedenceStartState(precedence) {
        if (!this.precedenceDfa) {
          throw "Only precedence DFAs may contain a precedence start state.";
        }
        if (precedence < 0 || precedence >= this.s0.edges.length) {
          return null;
        }
        return this.s0.edges[precedence] || null;
      }
      setPrecedenceStartState(precedence, startState) {
        if (!this.precedenceDfa) {
          throw "Only precedence DFAs may contain a precedence start state.";
        }
        if (precedence < 0) {
          return;
        }
        this.s0.edges[precedence] = startState;
      }
      setPrecedenceDfa(precedenceDfa) {
        if (this.precedenceDfa !== precedenceDfa) {
          this._states = new Set();
          if (precedenceDfa) {
            const precedenceState = new DFAState(null, new ATNConfigSet());
            precedenceState.edges = [];
            precedenceState.isAcceptState = false;
            precedenceState.requiresFullContext = false;
            this.s0 = precedenceState;
          } else {
            this.s0 = null;
          }
          this.precedenceDfa = precedenceDfa;
        }
      }
      sortedStates() {
        const list = this._states.values();
        return list.sort(function(a, b) {
          return a.stateNumber - b.stateNumber;
        });
      }
      toString(literalNames, symbolicNames) {
        literalNames = literalNames || null;
        symbolicNames = symbolicNames || null;
        if (this.s0 === null) {
          return "";
        }
        const serializer = new DFASerializer(this, literalNames, symbolicNames);
        return serializer.toString();
      }
      toLexerString() {
        if (this.s0 === null) {
          return "";
        }
        const serializer = new LexerDFASerializer(this);
        return serializer.toString();
      }
      get states() {
        return this._states;
      }
    };
    module2.exports = DFA;
  }
});

// ../../node_modules/antlr4/src/antlr4/dfa/index.js
var require_dfa = __commonJS({
  "../../node_modules/antlr4/src/antlr4/dfa/index.js"(exports2) {
    exports2.DFA = require_DFA();
    exports2.DFASerializer = require_DFASerializer().DFASerializer;
    exports2.LexerDFASerializer = require_DFASerializer().LexerDFASerializer;
    exports2.PredPrediction = require_DFAState().PredPrediction;
  }
});

// ../../node_modules/antlr4/src/antlr4/polyfills/fromcodepoint.js
var require_fromcodepoint = __commonJS({
  "../../node_modules/antlr4/src/antlr4/polyfills/fromcodepoint.js"() {
    if (!String.fromCodePoint) {
      (function() {
        const defineProperty = function() {
          let result;
          try {
            const object = {};
            const $defineProperty = Object.defineProperty;
            result = $defineProperty(object, object, object) && $defineProperty;
          } catch (error) {
          }
          return result;
        }();
        const stringFromCharCode = String.fromCharCode;
        const floor = Math.floor;
        const fromCodePoint = function(_) {
          const MAX_SIZE = 16384;
          const codeUnits = [];
          let highSurrogate;
          let lowSurrogate;
          let index = -1;
          const length = arguments.length;
          if (!length) {
            return "";
          }
          let result = "";
          while (++index < length) {
            let codePoint = Number(arguments[index]);
            if (!isFinite(codePoint) || codePoint < 0 || codePoint > 1114111 || floor(codePoint) !== codePoint) {
              throw RangeError("Invalid code point: " + codePoint);
            }
            if (codePoint <= 65535) {
              codeUnits.push(codePoint);
            } else {
              codePoint -= 65536;
              highSurrogate = (codePoint >> 10) + 55296;
              lowSurrogate = codePoint % 1024 + 56320;
              codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 === length || codeUnits.length > MAX_SIZE) {
              result += stringFromCharCode.apply(null, codeUnits);
              codeUnits.length = 0;
            }
          }
          return result;
        };
        if (defineProperty) {
          defineProperty(String, "fromCodePoint", {
            "value": fromCodePoint,
            "configurable": true,
            "writable": true
          });
        } else {
          String.fromCodePoint = fromCodePoint;
        }
      })();
    }
  }
});

// ../../node_modules/antlr4/src/antlr4/tree/index.js
var require_tree = __commonJS({
  "../../node_modules/antlr4/src/antlr4/tree/index.js"(exports2, module2) {
    var Tree = require_Tree();
    var Trees = require_Trees();
    module2.exports = { ...Tree, Trees };
  }
});

// ../../node_modules/antlr4/src/antlr4/error/DiagnosticErrorListener.js
var require_DiagnosticErrorListener = __commonJS({
  "../../node_modules/antlr4/src/antlr4/error/DiagnosticErrorListener.js"(exports2, module2) {
    var { BitSet } = require_Utils();
    var { ErrorListener } = require_ErrorListener();
    var { Interval } = require_IntervalSet();
    var DiagnosticErrorListener = class extends ErrorListener {
      constructor(exactOnly) {
        super();
        exactOnly = exactOnly || true;
        this.exactOnly = exactOnly;
      }
      reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
        if (this.exactOnly && !exact) {
          return;
        }
        const msg = "reportAmbiguity d=" + this.getDecisionDescription(recognizer, dfa) + ": ambigAlts=" + this.getConflictingAlts(ambigAlts, configs) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
        recognizer.notifyErrorListeners(msg);
      }
      reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
        const msg = "reportAttemptingFullContext d=" + this.getDecisionDescription(recognizer, dfa) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
        recognizer.notifyErrorListeners(msg);
      }
      reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
        const msg = "reportContextSensitivity d=" + this.getDecisionDescription(recognizer, dfa) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
        recognizer.notifyErrorListeners(msg);
      }
      getDecisionDescription(recognizer, dfa) {
        const decision = dfa.decision;
        const ruleIndex = dfa.atnStartState.ruleIndex;
        const ruleNames = recognizer.ruleNames;
        if (ruleIndex < 0 || ruleIndex >= ruleNames.length) {
          return "" + decision;
        }
        const ruleName = ruleNames[ruleIndex] || null;
        if (ruleName === null || ruleName.length === 0) {
          return "" + decision;
        }
        return `${decision} (${ruleName})`;
      }
      getConflictingAlts(reportedAlts, configs) {
        if (reportedAlts !== null) {
          return reportedAlts;
        }
        const result = new BitSet();
        for (let i = 0; i < configs.items.length; i++) {
          result.add(configs.items[i].alt);
        }
        return `{${result.values().join(", ")}}`;
      }
    };
    module2.exports = DiagnosticErrorListener;
  }
});

// ../../node_modules/antlr4/src/antlr4/error/ErrorStrategy.js
var require_ErrorStrategy = __commonJS({
  "../../node_modules/antlr4/src/antlr4/error/ErrorStrategy.js"(exports2, module2) {
    var { Token } = require_Token();
    var { NoViableAltException, InputMismatchException, FailedPredicateException, ParseCancellationException } = require_Errors();
    var { ATNState } = require_ATNState();
    var { Interval, IntervalSet } = require_IntervalSet();
    var ErrorStrategy = class {
      reset(recognizer) {
      }
      recoverInline(recognizer) {
      }
      recover(recognizer, e) {
      }
      sync(recognizer) {
      }
      inErrorRecoveryMode(recognizer) {
      }
      reportError(recognizer) {
      }
    };
    var DefaultErrorStrategy = class extends ErrorStrategy {
      constructor() {
        super();
        this.errorRecoveryMode = false;
        this.lastErrorIndex = -1;
        this.lastErrorStates = null;
        this.nextTokensContext = null;
        this.nextTokenState = 0;
      }
      reset(recognizer) {
        this.endErrorCondition(recognizer);
      }
      beginErrorCondition(recognizer) {
        this.errorRecoveryMode = true;
      }
      inErrorRecoveryMode(recognizer) {
        return this.errorRecoveryMode;
      }
      endErrorCondition(recognizer) {
        this.errorRecoveryMode = false;
        this.lastErrorStates = null;
        this.lastErrorIndex = -1;
      }
      reportMatch(recognizer) {
        this.endErrorCondition(recognizer);
      }
      reportError(recognizer, e) {
        if (this.inErrorRecoveryMode(recognizer)) {
          return;
        }
        this.beginErrorCondition(recognizer);
        if (e instanceof NoViableAltException) {
          this.reportNoViableAlternative(recognizer, e);
        } else if (e instanceof InputMismatchException) {
          this.reportInputMismatch(recognizer, e);
        } else if (e instanceof FailedPredicateException) {
          this.reportFailedPredicate(recognizer, e);
        } else {
          console.log("unknown recognition error type: " + e.constructor.name);
          console.log(e.stack);
          recognizer.notifyErrorListeners(e.getOffendingToken(), e.getMessage(), e);
        }
      }
      recover(recognizer, e) {
        if (this.lastErrorIndex === recognizer.getInputStream().index && this.lastErrorStates !== null && this.lastErrorStates.indexOf(recognizer.state) >= 0) {
          recognizer.consume();
        }
        this.lastErrorIndex = recognizer._input.index;
        if (this.lastErrorStates === null) {
          this.lastErrorStates = [];
        }
        this.lastErrorStates.push(recognizer.state);
        const followSet = this.getErrorRecoverySet(recognizer);
        this.consumeUntil(recognizer, followSet);
      }
      sync(recognizer) {
        if (this.inErrorRecoveryMode(recognizer)) {
          return;
        }
        const s = recognizer._interp.atn.states[recognizer.state];
        const la = recognizer.getTokenStream().LA(1);
        const nextTokens = recognizer.atn.nextTokens(s);
        if (nextTokens.contains(la)) {
          this.nextTokensContext = null;
          this.nextTokenState = ATNState.INVALID_STATE_NUMBER;
          return;
        } else if (nextTokens.contains(Token.EPSILON)) {
          if (this.nextTokensContext === null) {
            this.nextTokensContext = recognizer._ctx;
            this.nextTokensState = recognizer._stateNumber;
          }
          return;
        }
        switch (s.stateType) {
          case ATNState.BLOCK_START:
          case ATNState.STAR_BLOCK_START:
          case ATNState.PLUS_BLOCK_START:
          case ATNState.STAR_LOOP_ENTRY:
            if (this.singleTokenDeletion(recognizer) !== null) {
              return;
            } else {
              throw new InputMismatchException(recognizer);
            }
          case ATNState.PLUS_LOOP_BACK:
          case ATNState.STAR_LOOP_BACK:
            this.reportUnwantedToken(recognizer);
            const expecting = new IntervalSet();
            expecting.addSet(recognizer.getExpectedTokens());
            const whatFollowsLoopIterationOrRule = expecting.addSet(this.getErrorRecoverySet(recognizer));
            this.consumeUntil(recognizer, whatFollowsLoopIterationOrRule);
            break;
          default:
        }
      }
      reportNoViableAlternative(recognizer, e) {
        const tokens = recognizer.getTokenStream();
        let input;
        if (tokens !== null) {
          if (e.startToken.type === Token.EOF) {
            input = "<EOF>";
          } else {
            input = tokens.getText(new Interval(e.startToken.tokenIndex, e.offendingToken.tokenIndex));
          }
        } else {
          input = "<unknown input>";
        }
        const msg = "no viable alternative at input " + this.escapeWSAndQuote(input);
        recognizer.notifyErrorListeners(msg, e.offendingToken, e);
      }
      reportInputMismatch(recognizer, e) {
        const msg = "mismatched input " + this.getTokenErrorDisplay(e.offendingToken) + " expecting " + e.getExpectedTokens().toString(recognizer.literalNames, recognizer.symbolicNames);
        recognizer.notifyErrorListeners(msg, e.offendingToken, e);
      }
      reportFailedPredicate(recognizer, e) {
        const ruleName = recognizer.ruleNames[recognizer._ctx.ruleIndex];
        const msg = "rule " + ruleName + " " + e.message;
        recognizer.notifyErrorListeners(msg, e.offendingToken, e);
      }
      reportUnwantedToken(recognizer) {
        if (this.inErrorRecoveryMode(recognizer)) {
          return;
        }
        this.beginErrorCondition(recognizer);
        const t = recognizer.getCurrentToken();
        const tokenName = this.getTokenErrorDisplay(t);
        const expecting = this.getExpectedTokens(recognizer);
        const msg = "extraneous input " + tokenName + " expecting " + expecting.toString(recognizer.literalNames, recognizer.symbolicNames);
        recognizer.notifyErrorListeners(msg, t, null);
      }
      reportMissingToken(recognizer) {
        if (this.inErrorRecoveryMode(recognizer)) {
          return;
        }
        this.beginErrorCondition(recognizer);
        const t = recognizer.getCurrentToken();
        const expecting = this.getExpectedTokens(recognizer);
        const msg = "missing " + expecting.toString(recognizer.literalNames, recognizer.symbolicNames) + " at " + this.getTokenErrorDisplay(t);
        recognizer.notifyErrorListeners(msg, t, null);
      }
      recoverInline(recognizer) {
        const matchedSymbol = this.singleTokenDeletion(recognizer);
        if (matchedSymbol !== null) {
          recognizer.consume();
          return matchedSymbol;
        }
        if (this.singleTokenInsertion(recognizer)) {
          return this.getMissingSymbol(recognizer);
        }
        throw new InputMismatchException(recognizer);
      }
      singleTokenInsertion(recognizer) {
        const currentSymbolType = recognizer.getTokenStream().LA(1);
        const atn = recognizer._interp.atn;
        const currentState = atn.states[recognizer.state];
        const next = currentState.transitions[0].target;
        const expectingAtLL2 = atn.nextTokens(next, recognizer._ctx);
        if (expectingAtLL2.contains(currentSymbolType)) {
          this.reportMissingToken(recognizer);
          return true;
        } else {
          return false;
        }
      }
      singleTokenDeletion(recognizer) {
        const nextTokenType = recognizer.getTokenStream().LA(2);
        const expecting = this.getExpectedTokens(recognizer);
        if (expecting.contains(nextTokenType)) {
          this.reportUnwantedToken(recognizer);
          recognizer.consume();
          const matchedSymbol = recognizer.getCurrentToken();
          this.reportMatch(recognizer);
          return matchedSymbol;
        } else {
          return null;
        }
      }
      getMissingSymbol(recognizer) {
        const currentSymbol = recognizer.getCurrentToken();
        const expecting = this.getExpectedTokens(recognizer);
        const expectedTokenType = expecting.first();
        let tokenText;
        if (expectedTokenType === Token.EOF) {
          tokenText = "<missing EOF>";
        } else {
          tokenText = "<missing " + recognizer.literalNames[expectedTokenType] + ">";
        }
        let current = currentSymbol;
        const lookback = recognizer.getTokenStream().LT(-1);
        if (current.type === Token.EOF && lookback !== null) {
          current = lookback;
        }
        return recognizer.getTokenFactory().create(current.source, expectedTokenType, tokenText, Token.DEFAULT_CHANNEL, -1, -1, current.line, current.column);
      }
      getExpectedTokens(recognizer) {
        return recognizer.getExpectedTokens();
      }
      getTokenErrorDisplay(t) {
        if (t === null) {
          return "<no token>";
        }
        let s = t.text;
        if (s === null) {
          if (t.type === Token.EOF) {
            s = "<EOF>";
          } else {
            s = "<" + t.type + ">";
          }
        }
        return this.escapeWSAndQuote(s);
      }
      escapeWSAndQuote(s) {
        s = s.replace(/\n/g, "\\n");
        s = s.replace(/\r/g, "\\r");
        s = s.replace(/\t/g, "\\t");
        return "'" + s + "'";
      }
      getErrorRecoverySet(recognizer) {
        const atn = recognizer._interp.atn;
        let ctx = recognizer._ctx;
        const recoverSet = new IntervalSet();
        while (ctx !== null && ctx.invokingState >= 0) {
          const invokingState = atn.states[ctx.invokingState];
          const rt = invokingState.transitions[0];
          const follow = atn.nextTokens(rt.followState);
          recoverSet.addSet(follow);
          ctx = ctx.parentCtx;
        }
        recoverSet.removeOne(Token.EPSILON);
        return recoverSet;
      }
      consumeUntil(recognizer, set) {
        let ttype = recognizer.getTokenStream().LA(1);
        while (ttype !== Token.EOF && !set.contains(ttype)) {
          recognizer.consume();
          ttype = recognizer.getTokenStream().LA(1);
        }
      }
    };
    var BailErrorStrategy = class extends DefaultErrorStrategy {
      constructor() {
        super();
      }
      recover(recognizer, e) {
        let context = recognizer._ctx;
        while (context !== null) {
          context.exception = e;
          context = context.parentCtx;
        }
        throw new ParseCancellationException(e);
      }
      recoverInline(recognizer) {
        this.recover(recognizer, new InputMismatchException(recognizer));
      }
      sync(recognizer) {
      }
    };
    module2.exports = { BailErrorStrategy, DefaultErrorStrategy };
  }
});

// ../../node_modules/antlr4/src/antlr4/error/index.js
var require_error = __commonJS({
  "../../node_modules/antlr4/src/antlr4/error/index.js"(exports2, module2) {
    module2.exports.RecognitionException = require_Errors().RecognitionException;
    module2.exports.NoViableAltException = require_Errors().NoViableAltException;
    module2.exports.LexerNoViableAltException = require_Errors().LexerNoViableAltException;
    module2.exports.InputMismatchException = require_Errors().InputMismatchException;
    module2.exports.FailedPredicateException = require_Errors().FailedPredicateException;
    module2.exports.DiagnosticErrorListener = require_DiagnosticErrorListener();
    module2.exports.BailErrorStrategy = require_ErrorStrategy().BailErrorStrategy;
    module2.exports.DefaultErrorStrategy = require_ErrorStrategy().DefaultErrorStrategy;
    module2.exports.ErrorListener = require_ErrorListener().ErrorListener;
  }
});

// ../../node_modules/antlr4/src/antlr4/InputStream.js
var require_InputStream = __commonJS({
  "../../node_modules/antlr4/src/antlr4/InputStream.js"(exports2, module2) {
    var { Token } = require_Token();
    require_codepointat();
    require_fromcodepoint();
    var InputStream = class {
      constructor(data, decodeToUnicodeCodePoints) {
        this.name = "<empty>";
        this.strdata = data;
        this.decodeToUnicodeCodePoints = decodeToUnicodeCodePoints || false;
        this._index = 0;
        this.data = [];
        if (this.decodeToUnicodeCodePoints) {
          for (let i = 0; i < this.strdata.length; ) {
            const codePoint = this.strdata.codePointAt(i);
            this.data.push(codePoint);
            i += codePoint <= 65535 ? 1 : 2;
          }
        } else {
          for (let i = 0; i < this.strdata.length; i++) {
            const codeUnit = this.strdata.charCodeAt(i);
            this.data.push(codeUnit);
          }
        }
        this._size = this.data.length;
      }
      reset() {
        this._index = 0;
      }
      consume() {
        if (this._index >= this._size) {
          throw "cannot consume EOF";
        }
        this._index += 1;
      }
      LA(offset) {
        if (offset === 0) {
          return 0;
        }
        if (offset < 0) {
          offset += 1;
        }
        const pos = this._index + offset - 1;
        if (pos < 0 || pos >= this._size) {
          return Token.EOF;
        }
        return this.data[pos];
      }
      LT(offset) {
        return this.LA(offset);
      }
      mark() {
        return -1;
      }
      release(marker) {
      }
      seek(_index) {
        if (_index <= this._index) {
          this._index = _index;
          return;
        }
        this._index = Math.min(_index, this._size);
      }
      getText(start, stop) {
        if (stop >= this._size) {
          stop = this._size - 1;
        }
        if (start >= this._size) {
          return "";
        } else {
          if (this.decodeToUnicodeCodePoints) {
            let result = "";
            for (let i = start; i <= stop; i++) {
              result += String.fromCodePoint(this.data[i]);
            }
            return result;
          } else {
            return this.strdata.slice(start, stop + 1);
          }
        }
      }
      toString() {
        return this.strdata;
      }
      get index() {
        return this._index;
      }
      get size() {
        return this._size;
      }
    };
    module2.exports = InputStream;
  }
});

// ../../node_modules/antlr4/src/antlr4/CharStreams.js
var require_CharStreams = __commonJS({
  "../../node_modules/antlr4/src/antlr4/CharStreams.js"(exports2, module2) {
    var InputStream = require_InputStream();
    var fs = require("fs");
    var CharStreams = {
      fromString: function(str) {
        return new InputStream(str, true);
      },
      fromBlob: function(blob, encoding, onLoad, onError) {
        const reader = new window.FileReader();
        reader.onload = function(e) {
          const is = new InputStream(e.target.result, true);
          onLoad(is);
        };
        reader.onerror = onError;
        reader.readAsText(blob, encoding);
      },
      fromBuffer: function(buffer, encoding) {
        return new InputStream(buffer.toString(encoding), true);
      },
      fromPath: function(path, encoding, callback) {
        fs.readFile(path, encoding, function(err, data) {
          let is = null;
          if (data !== null) {
            is = new InputStream(data, true);
          }
          callback(err, is);
        });
      },
      fromPathSync: function(path, encoding) {
        const data = fs.readFileSync(path, encoding);
        return new InputStream(data, true);
      }
    };
    module2.exports = CharStreams;
  }
});

// ../../node_modules/antlr4/src/antlr4/FileStream.js
var require_FileStream = __commonJS({
  "../../node_modules/antlr4/src/antlr4/FileStream.js"(exports2, module2) {
    var InputStream = require_InputStream();
    var fs = require("fs");
    var FileStream = class extends InputStream {
      constructor(fileName, decodeToUnicodeCodePoints) {
        const data = fs.readFileSync(fileName, "utf8");
        super(data, decodeToUnicodeCodePoints);
        this.fileName = fileName;
      }
    };
    module2.exports = FileStream;
  }
});

// ../../node_modules/antlr4/src/antlr4/BufferedTokenStream.js
var require_BufferedTokenStream = __commonJS({
  "../../node_modules/antlr4/src/antlr4/BufferedTokenStream.js"(exports2, module2) {
    var { Token } = require_Token();
    var Lexer = require_Lexer();
    var { Interval } = require_IntervalSet();
    var TokenStream = class {
    };
    var BufferedTokenStream = class extends TokenStream {
      constructor(tokenSource) {
        super();
        this.tokenSource = tokenSource;
        this.tokens = [];
        this.index = -1;
        this.fetchedEOF = false;
      }
      mark() {
        return 0;
      }
      release(marker) {
      }
      reset() {
        this.seek(0);
      }
      seek(index) {
        this.lazyInit();
        this.index = this.adjustSeekIndex(index);
      }
      get(index) {
        this.lazyInit();
        return this.tokens[index];
      }
      consume() {
        let skipEofCheck = false;
        if (this.index >= 0) {
          if (this.fetchedEOF) {
            skipEofCheck = this.index < this.tokens.length - 1;
          } else {
            skipEofCheck = this.index < this.tokens.length;
          }
        } else {
          skipEofCheck = false;
        }
        if (!skipEofCheck && this.LA(1) === Token.EOF) {
          throw "cannot consume EOF";
        }
        if (this.sync(this.index + 1)) {
          this.index = this.adjustSeekIndex(this.index + 1);
        }
      }
      sync(i) {
        const n = i - this.tokens.length + 1;
        if (n > 0) {
          const fetched = this.fetch(n);
          return fetched >= n;
        }
        return true;
      }
      fetch(n) {
        if (this.fetchedEOF) {
          return 0;
        }
        for (let i = 0; i < n; i++) {
          const t = this.tokenSource.nextToken();
          t.tokenIndex = this.tokens.length;
          this.tokens.push(t);
          if (t.type === Token.EOF) {
            this.fetchedEOF = true;
            return i + 1;
          }
        }
        return n;
      }
      getTokens(start, stop, types) {
        if (types === void 0) {
          types = null;
        }
        if (start < 0 || stop < 0) {
          return null;
        }
        this.lazyInit();
        const subset = [];
        if (stop >= this.tokens.length) {
          stop = this.tokens.length - 1;
        }
        for (let i = start; i < stop; i++) {
          const t = this.tokens[i];
          if (t.type === Token.EOF) {
            break;
          }
          if (types === null || types.contains(t.type)) {
            subset.push(t);
          }
        }
        return subset;
      }
      LA(i) {
        return this.LT(i).type;
      }
      LB(k) {
        if (this.index - k < 0) {
          return null;
        }
        return this.tokens[this.index - k];
      }
      LT(k) {
        this.lazyInit();
        if (k === 0) {
          return null;
        }
        if (k < 0) {
          return this.LB(-k);
        }
        const i = this.index + k - 1;
        this.sync(i);
        if (i >= this.tokens.length) {
          return this.tokens[this.tokens.length - 1];
        }
        return this.tokens[i];
      }
      adjustSeekIndex(i) {
        return i;
      }
      lazyInit() {
        if (this.index === -1) {
          this.setup();
        }
      }
      setup() {
        this.sync(0);
        this.index = this.adjustSeekIndex(0);
      }
      setTokenSource(tokenSource) {
        this.tokenSource = tokenSource;
        this.tokens = [];
        this.index = -1;
        this.fetchedEOF = false;
      }
      nextTokenOnChannel(i, channel) {
        this.sync(i);
        if (i >= this.tokens.length) {
          return -1;
        }
        let token = this.tokens[i];
        while (token.channel !== this.channel) {
          if (token.type === Token.EOF) {
            return -1;
          }
          i += 1;
          this.sync(i);
          token = this.tokens[i];
        }
        return i;
      }
      previousTokenOnChannel(i, channel) {
        while (i >= 0 && this.tokens[i].channel !== channel) {
          i -= 1;
        }
        return i;
      }
      getHiddenTokensToRight(tokenIndex, channel) {
        if (channel === void 0) {
          channel = -1;
        }
        this.lazyInit();
        if (tokenIndex < 0 || tokenIndex >= this.tokens.length) {
          throw "" + tokenIndex + " not in 0.." + this.tokens.length - 1;
        }
        const nextOnChannel = this.nextTokenOnChannel(tokenIndex + 1, Lexer.DEFAULT_TOKEN_CHANNEL);
        const from_ = tokenIndex + 1;
        const to = nextOnChannel === -1 ? this.tokens.length - 1 : nextOnChannel;
        return this.filterForChannel(from_, to, channel);
      }
      getHiddenTokensToLeft(tokenIndex, channel) {
        if (channel === void 0) {
          channel = -1;
        }
        this.lazyInit();
        if (tokenIndex < 0 || tokenIndex >= this.tokens.length) {
          throw "" + tokenIndex + " not in 0.." + this.tokens.length - 1;
        }
        const prevOnChannel = this.previousTokenOnChannel(tokenIndex - 1, Lexer.DEFAULT_TOKEN_CHANNEL);
        if (prevOnChannel === tokenIndex - 1) {
          return null;
        }
        const from_ = prevOnChannel + 1;
        const to = tokenIndex - 1;
        return this.filterForChannel(from_, to, channel);
      }
      filterForChannel(left, right, channel) {
        const hidden = [];
        for (let i = left; i < right + 1; i++) {
          const t = this.tokens[i];
          if (channel === -1) {
            if (t.channel !== Lexer.DEFAULT_TOKEN_CHANNEL) {
              hidden.push(t);
            }
          } else if (t.channel === channel) {
            hidden.push(t);
          }
        }
        if (hidden.length === 0) {
          return null;
        }
        return hidden;
      }
      getSourceName() {
        return this.tokenSource.getSourceName();
      }
      getText(interval) {
        this.lazyInit();
        this.fill();
        if (interval === void 0 || interval === null) {
          interval = new Interval(0, this.tokens.length - 1);
        }
        let start = interval.start;
        if (start instanceof Token) {
          start = start.tokenIndex;
        }
        let stop = interval.stop;
        if (stop instanceof Token) {
          stop = stop.tokenIndex;
        }
        if (start === null || stop === null || start < 0 || stop < 0) {
          return "";
        }
        if (stop >= this.tokens.length) {
          stop = this.tokens.length - 1;
        }
        let s = "";
        for (let i = start; i < stop + 1; i++) {
          const t = this.tokens[i];
          if (t.type === Token.EOF) {
            break;
          }
          s = s + t.text;
        }
        return s;
      }
      fill() {
        this.lazyInit();
        while (this.fetch(1e3) === 1e3) {
          continue;
        }
      }
    };
    module2.exports = BufferedTokenStream;
  }
});

// ../../node_modules/antlr4/src/antlr4/CommonTokenStream.js
var require_CommonTokenStream = __commonJS({
  "../../node_modules/antlr4/src/antlr4/CommonTokenStream.js"(exports2, module2) {
    var Token = require_Token().Token;
    var BufferedTokenStream = require_BufferedTokenStream();
    var CommonTokenStream = class extends BufferedTokenStream {
      constructor(lexer, channel) {
        super(lexer);
        this.channel = channel === void 0 ? Token.DEFAULT_CHANNEL : channel;
      }
      adjustSeekIndex(i) {
        return this.nextTokenOnChannel(i, this.channel);
      }
      LB(k) {
        if (k === 0 || this.index - k < 0) {
          return null;
        }
        let i = this.index;
        let n = 1;
        while (n <= k) {
          i = this.previousTokenOnChannel(i - 1, this.channel);
          n += 1;
        }
        if (i < 0) {
          return null;
        }
        return this.tokens[i];
      }
      LT(k) {
        this.lazyInit();
        if (k === 0) {
          return null;
        }
        if (k < 0) {
          return this.LB(-k);
        }
        let i = this.index;
        let n = 1;
        while (n < k) {
          if (this.sync(i + 1)) {
            i = this.nextTokenOnChannel(i + 1, this.channel);
          }
          n += 1;
        }
        return this.tokens[i];
      }
      getNumberOfOnChannelTokens() {
        let n = 0;
        this.fill();
        for (let i = 0; i < this.tokens.length; i++) {
          const t = this.tokens[i];
          if (t.channel === this.channel) {
            n += 1;
          }
          if (t.type === Token.EOF) {
            break;
          }
        }
        return n;
      }
    };
    module2.exports = CommonTokenStream;
  }
});

// ../../node_modules/antlr4/src/antlr4/Parser.js
var require_Parser = __commonJS({
  "../../node_modules/antlr4/src/antlr4/Parser.js"(exports2, module2) {
    var { Token } = require_Token();
    var { ParseTreeListener, TerminalNode, ErrorNode } = require_Tree();
    var Recognizer = require_Recognizer();
    var { DefaultErrorStrategy } = require_ErrorStrategy();
    var ATNDeserializer = require_ATNDeserializer();
    var ATNDeserializationOptions = require_ATNDeserializationOptions();
    var Lexer = require_Lexer();
    var TraceListener = class extends ParseTreeListener {
      constructor(parser) {
        super();
        this.parser = parser;
      }
      enterEveryRule(ctx) {
        console.log("enter   " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
      }
      visitTerminal(node) {
        console.log("consume " + node.symbol + " rule " + this.parser.ruleNames[this.parser._ctx.ruleIndex]);
      }
      exitEveryRule(ctx) {
        console.log("exit    " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
      }
    };
    var Parser = class extends Recognizer {
      constructor(input) {
        super();
        this._input = null;
        this._errHandler = new DefaultErrorStrategy();
        this._precedenceStack = [];
        this._precedenceStack.push(0);
        this._ctx = null;
        this.buildParseTrees = true;
        this._tracer = null;
        this._parseListeners = null;
        this._syntaxErrors = 0;
        this.setInputStream(input);
      }
      reset() {
        if (this._input !== null) {
          this._input.seek(0);
        }
        this._errHandler.reset(this);
        this._ctx = null;
        this._syntaxErrors = 0;
        this.setTrace(false);
        this._precedenceStack = [];
        this._precedenceStack.push(0);
        if (this._interp !== null) {
          this._interp.reset();
        }
      }
      match(ttype) {
        let t = this.getCurrentToken();
        if (t.type === ttype) {
          this._errHandler.reportMatch(this);
          this.consume();
        } else {
          t = this._errHandler.recoverInline(this);
          if (this.buildParseTrees && t.tokenIndex === -1) {
            this._ctx.addErrorNode(t);
          }
        }
        return t;
      }
      matchWildcard() {
        let t = this.getCurrentToken();
        if (t.type > 0) {
          this._errHandler.reportMatch(this);
          this.consume();
        } else {
          t = this._errHandler.recoverInline(this);
          if (this._buildParseTrees && t.tokenIndex === -1) {
            this._ctx.addErrorNode(t);
          }
        }
        return t;
      }
      getParseListeners() {
        return this._parseListeners || [];
      }
      addParseListener(listener) {
        if (listener === null) {
          throw "listener";
        }
        if (this._parseListeners === null) {
          this._parseListeners = [];
        }
        this._parseListeners.push(listener);
      }
      removeParseListener(listener) {
        if (this._parseListeners !== null) {
          const idx = this._parseListeners.indexOf(listener);
          if (idx >= 0) {
            this._parseListeners.splice(idx, 1);
          }
          if (this._parseListeners.length === 0) {
            this._parseListeners = null;
          }
        }
      }
      removeParseListeners() {
        this._parseListeners = null;
      }
      triggerEnterRuleEvent() {
        if (this._parseListeners !== null) {
          const ctx = this._ctx;
          this._parseListeners.map(function(listener) {
            listener.enterEveryRule(ctx);
            ctx.enterRule(listener);
          });
        }
      }
      triggerExitRuleEvent() {
        if (this._parseListeners !== null) {
          const ctx = this._ctx;
          this._parseListeners.slice(0).reverse().map(function(listener) {
            ctx.exitRule(listener);
            listener.exitEveryRule(ctx);
          });
        }
      }
      getTokenFactory() {
        return this._input.tokenSource._factory;
      }
      setTokenFactory(factory) {
        this._input.tokenSource._factory = factory;
      }
      getATNWithBypassAlts() {
        const serializedAtn = this.getSerializedATN();
        if (serializedAtn === null) {
          throw "The current parser does not support an ATN with bypass alternatives.";
        }
        let result = this.bypassAltsAtnCache[serializedAtn];
        if (result === null) {
          const deserializationOptions = new ATNDeserializationOptions();
          deserializationOptions.generateRuleBypassTransitions = true;
          result = new ATNDeserializer(deserializationOptions).deserialize(serializedAtn);
          this.bypassAltsAtnCache[serializedAtn] = result;
        }
        return result;
      }
      compileParseTreePattern(pattern, patternRuleIndex, lexer) {
        lexer = lexer || null;
        if (lexer === null) {
          if (this.getTokenStream() !== null) {
            const tokenSource = this.getTokenStream().tokenSource;
            if (tokenSource instanceof Lexer) {
              lexer = tokenSource;
            }
          }
        }
        if (lexer === null) {
          throw "Parser can't discover a lexer to use";
        }
        const m = new ParseTreePatternMatcher(lexer, this);
        return m.compile(pattern, patternRuleIndex);
      }
      getInputStream() {
        return this.getTokenStream();
      }
      setInputStream(input) {
        this.setTokenStream(input);
      }
      getTokenStream() {
        return this._input;
      }
      setTokenStream(input) {
        this._input = null;
        this.reset();
        this._input = input;
      }
      getCurrentToken() {
        return this._input.LT(1);
      }
      notifyErrorListeners(msg, offendingToken, err) {
        offendingToken = offendingToken || null;
        err = err || null;
        if (offendingToken === null) {
          offendingToken = this.getCurrentToken();
        }
        this._syntaxErrors += 1;
        const line = offendingToken.line;
        const column = offendingToken.column;
        const listener = this.getErrorListenerDispatch();
        listener.syntaxError(this, offendingToken, line, column, msg, err);
      }
      consume() {
        const o = this.getCurrentToken();
        if (o.type !== Token.EOF) {
          this.getInputStream().consume();
        }
        const hasListener = this._parseListeners !== null && this._parseListeners.length > 0;
        if (this.buildParseTrees || hasListener) {
          let node;
          if (this._errHandler.inErrorRecoveryMode(this)) {
            node = this._ctx.addErrorNode(o);
          } else {
            node = this._ctx.addTokenNode(o);
          }
          node.invokingState = this.state;
          if (hasListener) {
            this._parseListeners.map(function(listener) {
              if (node instanceof ErrorNode || node.isErrorNode !== void 0 && node.isErrorNode()) {
                listener.visitErrorNode(node);
              } else if (node instanceof TerminalNode) {
                listener.visitTerminal(node);
              }
            });
          }
        }
        return o;
      }
      addContextToParseTree() {
        if (this._ctx.parentCtx !== null) {
          this._ctx.parentCtx.addChild(this._ctx);
        }
      }
      enterRule(localctx, state, ruleIndex) {
        this.state = state;
        this._ctx = localctx;
        this._ctx.start = this._input.LT(1);
        if (this.buildParseTrees) {
          this.addContextToParseTree();
        }
        if (this._parseListeners !== null) {
          this.triggerEnterRuleEvent();
        }
      }
      exitRule() {
        this._ctx.stop = this._input.LT(-1);
        if (this._parseListeners !== null) {
          this.triggerExitRuleEvent();
        }
        this.state = this._ctx.invokingState;
        this._ctx = this._ctx.parentCtx;
      }
      enterOuterAlt(localctx, altNum) {
        localctx.setAltNumber(altNum);
        if (this.buildParseTrees && this._ctx !== localctx) {
          if (this._ctx.parentCtx !== null) {
            this._ctx.parentCtx.removeLastChild();
            this._ctx.parentCtx.addChild(localctx);
          }
        }
        this._ctx = localctx;
      }
      getPrecedence() {
        if (this._precedenceStack.length === 0) {
          return -1;
        } else {
          return this._precedenceStack[this._precedenceStack.length - 1];
        }
      }
      enterRecursionRule(localctx, state, ruleIndex, precedence) {
        this.state = state;
        this._precedenceStack.push(precedence);
        this._ctx = localctx;
        this._ctx.start = this._input.LT(1);
        if (this._parseListeners !== null) {
          this.triggerEnterRuleEvent();
        }
      }
      pushNewRecursionContext(localctx, state, ruleIndex) {
        const previous = this._ctx;
        previous.parentCtx = localctx;
        previous.invokingState = state;
        previous.stop = this._input.LT(-1);
        this._ctx = localctx;
        this._ctx.start = previous.start;
        if (this.buildParseTrees) {
          this._ctx.addChild(previous);
        }
        if (this._parseListeners !== null) {
          this.triggerEnterRuleEvent();
        }
      }
      unrollRecursionContexts(parentCtx) {
        this._precedenceStack.pop();
        this._ctx.stop = this._input.LT(-1);
        const retCtx = this._ctx;
        if (this._parseListeners !== null) {
          while (this._ctx !== parentCtx) {
            this.triggerExitRuleEvent();
            this._ctx = this._ctx.parentCtx;
          }
        } else {
          this._ctx = parentCtx;
        }
        retCtx.parentCtx = parentCtx;
        if (this.buildParseTrees && parentCtx !== null) {
          parentCtx.addChild(retCtx);
        }
      }
      getInvokingContext(ruleIndex) {
        let ctx = this._ctx;
        while (ctx !== null) {
          if (ctx.ruleIndex === ruleIndex) {
            return ctx;
          }
          ctx = ctx.parentCtx;
        }
        return null;
      }
      precpred(localctx, precedence) {
        return precedence >= this._precedenceStack[this._precedenceStack.length - 1];
      }
      inContext(context) {
        return false;
      }
      isExpectedToken(symbol) {
        const atn = this._interp.atn;
        let ctx = this._ctx;
        const s = atn.states[this.state];
        let following = atn.nextTokens(s);
        if (following.contains(symbol)) {
          return true;
        }
        if (!following.contains(Token.EPSILON)) {
          return false;
        }
        while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
          const invokingState = atn.states[ctx.invokingState];
          const rt = invokingState.transitions[0];
          following = atn.nextTokens(rt.followState);
          if (following.contains(symbol)) {
            return true;
          }
          ctx = ctx.parentCtx;
        }
        if (following.contains(Token.EPSILON) && symbol === Token.EOF) {
          return true;
        } else {
          return false;
        }
      }
      getExpectedTokens() {
        return this._interp.atn.getExpectedTokens(this.state, this._ctx);
      }
      getExpectedTokensWithinCurrentRule() {
        const atn = this._interp.atn;
        const s = atn.states[this.state];
        return atn.nextTokens(s);
      }
      getRuleIndex(ruleName) {
        const ruleIndex = this.getRuleIndexMap()[ruleName];
        if (ruleIndex !== null) {
          return ruleIndex;
        } else {
          return -1;
        }
      }
      getRuleInvocationStack(p) {
        p = p || null;
        if (p === null) {
          p = this._ctx;
        }
        const stack = [];
        while (p !== null) {
          const ruleIndex = p.ruleIndex;
          if (ruleIndex < 0) {
            stack.push("n/a");
          } else {
            stack.push(this.ruleNames[ruleIndex]);
          }
          p = p.parentCtx;
        }
        return stack;
      }
      getDFAStrings() {
        return this._interp.decisionToDFA.toString();
      }
      dumpDFA() {
        let seenOne = false;
        for (let i = 0; i < this._interp.decisionToDFA.length; i++) {
          const dfa = this._interp.decisionToDFA[i];
          if (dfa.states.length > 0) {
            if (seenOne) {
              console.log();
            }
            this.printer.println("Decision " + dfa.decision + ":");
            this.printer.print(dfa.toString(this.literalNames, this.symbolicNames));
            seenOne = true;
          }
        }
      }
      getSourceName() {
        return this._input.sourceName;
      }
      setTrace(trace) {
        if (!trace) {
          this.removeParseListener(this._tracer);
          this._tracer = null;
        } else {
          if (this._tracer !== null) {
            this.removeParseListener(this._tracer);
          }
          this._tracer = new TraceListener(this);
          this.addParseListener(this._tracer);
        }
      }
    };
    Parser.bypassAltsAtnCache = {};
    module2.exports = Parser;
  }
});

// ../../node_modules/antlr4/src/antlr4/index.js
var require_antlr4 = __commonJS({
  "../../node_modules/antlr4/src/antlr4/index.js"(exports2) {
    exports2.atn = require_atn();
    exports2.codepointat = require_codepointat();
    exports2.dfa = require_dfa();
    exports2.fromcodepoint = require_fromcodepoint();
    exports2.tree = require_tree();
    exports2.error = require_error();
    exports2.Token = require_Token().Token;
    exports2.CharStreams = require_CharStreams();
    exports2.CommonToken = require_Token().CommonToken;
    exports2.InputStream = require_InputStream();
    exports2.FileStream = require_FileStream();
    exports2.CommonTokenStream = require_CommonTokenStream();
    exports2.Lexer = require_Lexer();
    exports2.Parser = require_Parser();
    var pc = require_PredictionContext();
    exports2.PredictionContextCache = pc.PredictionContextCache;
    exports2.ParserRuleContext = require_ParserRuleContext();
    exports2.Interval = require_IntervalSet().Interval;
    exports2.IntervalSet = require_IntervalSet().IntervalSet;
    exports2.Utils = require_Utils();
    exports2.LL1Analyzer = require_LL1Analyzer().LL1Analyzer;
  }
});

// lib/generated/src/CalculatorLexer.js
var require_CalculatorLexer = __commonJS({
  "lib/generated/src/CalculatorLexer.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var antlr4_12 = __importDefault2(require_antlr4());
    var serializedATN = [
      "\u608B\uA72A\u8133\uB9ED\u417C\u3BE7\u7786",
      "\u5964\x07\b		",
      "			",
      "",
      "\n\r",
      "\x07\x07	",
      "\v\x07",
      "\x07",
      "	\v",
      "\r",
      "\x07	",
      "\v\r\x07-",
      "\x07/",
      "\x07,",
      "\b\x071",
      "\n2;",
      "",
      "\f",
      ""
    ].join("");
    var atn = new antlr4_12.default.atn.ATNDeserializer().deserialize(serializedATN);
    var decisionsToDFA = atn.decisionToState.map((ds, index) => new antlr4_12.default.dfa.DFA(ds, index));
    var CalculatorLexer = class extends antlr4_12.default.Lexer {
      constructor(input) {
        super(input);
        this._interp = new antlr4_12.default.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4_12.default.PredictionContextCache());
      }
      get atn() {
        return atn;
      }
    };
    exports2.default = CalculatorLexer;
    CalculatorLexer.grammarFileName = "Calculator.g4";
    CalculatorLexer.channelNames = ["DEFAULT_TOKEN_CHANNEL", "HIDDEN"];
    CalculatorLexer.modeNames = ["DEFAULT_MODE"];
    CalculatorLexer.literalNames = [null, "'+'", "'-'", "'*'", "'/'"];
    CalculatorLexer.symbolicNames = [null, null, null, null, null, "INT"];
    CalculatorLexer.ruleNames = ["T__0", "T__1", "T__2", "T__3", "INT"];
    CalculatorLexer.EOF = antlr4_12.default.Token.EOF;
    CalculatorLexer.T__0 = 1;
    CalculatorLexer.T__1 = 2;
    CalculatorLexer.T__2 = 3;
    CalculatorLexer.T__3 = 4;
    CalculatorLexer.INT = 5;
  }
});

// lib/generated/src/CalculatorListener.js
var require_CalculatorListener = __commonJS({
  "lib/generated/src/CalculatorListener.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var antlr4_12 = __importDefault2(require_antlr4());
    var CalculatorListener = class extends antlr4_12.default.tree.ParseTreeListener {
      enterAddSubExpr(ctx) {
      }
      exitAddSubExpr(ctx) {
      }
      enterMultDivExpr(ctx) {
      }
      exitMultDivExpr(ctx) {
      }
    };
    exports2.default = CalculatorListener;
  }
});

// lib/generated/src/CalculatorParser.js
var require_CalculatorParser = __commonJS({
  "lib/generated/src/CalculatorParser.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var antlr4_12 = __importDefault2(require_antlr4());
    var CalculatorListener_js_1 = __importDefault2(require_CalculatorListener());
    var serializedATN = [
      "\u608B\uA72A\u8133\uB9ED\u417C\u3BE7\u7786",
      "\u5964\x07		",
      "\x07\n\n\f",
      "\r\v\x07",
      "\n\f\v",
      "",
      "",
      "\v\x07\b	",
      "\b\n	\x07",
      "\n\r\v	\v\f",
      "\f\r\v",
      "\x07\x07	",
      "\x07\x07",
      "",
      "",
      "\v"
    ].join("");
    var atn = new antlr4_12.default.atn.ATNDeserializer().deserialize(serializedATN);
    var decisionsToDFA = atn.decisionToState.map((ds, index) => new antlr4_12.default.dfa.DFA(ds, index));
    var sharedContextCache = new antlr4_12.default.PredictionContextCache();
    var CalculatorParser = class extends antlr4_12.default.Parser {
      constructor(input) {
        super(input);
        this._interp = new antlr4_12.default.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = CalculatorParser.ruleNames;
        this.literalNames = CalculatorParser.literalNames;
        this.symbolicNames = CalculatorParser.symbolicNames;
      }
      get atn() {
        return atn;
      }
      addSubExpr() {
        let localctx = new AddSubExprContext(this, this._ctx, this.state);
        this.enterRule(localctx, 0, CalculatorParser.RULE_addSubExpr);
        var _la = 0;
        try {
          this.enterOuterAlt(localctx, 1);
          this.state = 4;
          this.multDivExpr();
          this.state = 9;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          while (_la === CalculatorParser.T__0 || _la === CalculatorParser.T__1) {
            this.state = 5;
            _la = this._input.LA(1);
            if (!(_la === CalculatorParser.T__0 || _la === CalculatorParser.T__1)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 6;
            this.multDivExpr();
            this.state = 11;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
          }
        } catch (re) {
          if (re instanceof antlr4_12.default.error.RecognitionException) {
            localctx.exception = re;
            this._errHandler.reportError(this, re);
            this._errHandler.recover(this, re);
          } else {
            throw re;
          }
        } finally {
          this.exitRule();
        }
        return localctx;
      }
      multDivExpr() {
        let localctx = new MultDivExprContext(this, this._ctx, this.state);
        this.enterRule(localctx, 2, CalculatorParser.RULE_multDivExpr);
        var _la = 0;
        try {
          this.enterOuterAlt(localctx, 1);
          this.state = 12;
          this.match(CalculatorParser.INT);
          this.state = 17;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          while (_la === CalculatorParser.T__2 || _la === CalculatorParser.T__3) {
            this.state = 13;
            _la = this._input.LA(1);
            if (!(_la === CalculatorParser.T__2 || _la === CalculatorParser.T__3)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 14;
            this.match(CalculatorParser.INT);
            this.state = 19;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
          }
        } catch (re) {
          if (re instanceof antlr4_12.default.error.RecognitionException) {
            localctx.exception = re;
            this._errHandler.reportError(this, re);
            this._errHandler.recover(this, re);
          } else {
            throw re;
          }
        } finally {
          this.exitRule();
        }
        return localctx;
      }
    };
    exports2.default = CalculatorParser;
    CalculatorParser.grammarFileName = "Calculator.g4";
    CalculatorParser.literalNames = [null, "'+'", "'-'", "'*'", "'/'"];
    CalculatorParser.symbolicNames = [null, null, null, null, null, "INT"];
    CalculatorParser.ruleNames = ["addSubExpr", "multDivExpr"];
    CalculatorParser.EOF = antlr4_12.default.Token.EOF;
    CalculatorParser.T__0 = 1;
    CalculatorParser.T__1 = 2;
    CalculatorParser.T__2 = 3;
    CalculatorParser.T__3 = 4;
    CalculatorParser.INT = 5;
    CalculatorParser.RULE_addSubExpr = 0;
    CalculatorParser.RULE_multDivExpr = 1;
    var AddSubExprContext = class extends antlr4_12.default.ParserRuleContext {
      constructor(parser, parent, invokingState) {
        if (parent === void 0) {
          parent = null;
        }
        if (invokingState === void 0 || invokingState === null) {
          invokingState = -1;
        }
        super(parent, invokingState);
        this.multDivExpr = function(i) {
          if (i === void 0) {
            i = null;
          }
          if (i === null) {
            return this.getTypedRuleContexts(MultDivExprContext);
          } else {
            return this.getTypedRuleContext(MultDivExprContext, i);
          }
        };
        this.parser = parser;
        this.ruleIndex = CalculatorParser.RULE_addSubExpr;
      }
      enterRule(listener) {
        if (listener instanceof CalculatorListener_js_1.default) {
          listener.enterAddSubExpr(this);
        }
      }
      exitRule(listener) {
        if (listener instanceof CalculatorListener_js_1.default) {
          listener.exitAddSubExpr(this);
        }
      }
    };
    var MultDivExprContext = class extends antlr4_12.default.ParserRuleContext {
      constructor(parser, parent, invokingState) {
        if (parent === void 0) {
          parent = null;
        }
        if (invokingState === void 0 || invokingState === null) {
          invokingState = -1;
        }
        super(parent, invokingState);
        this.INT = function(i) {
          if (i === void 0) {
            i = null;
          }
          if (i === null) {
            return this.getTokens(CalculatorParser.INT);
          } else {
            return this.getToken(CalculatorParser.INT, i);
          }
        };
        this.parser = parser;
        this.ruleIndex = CalculatorParser.RULE_multDivExpr;
      }
      enterRule(listener) {
        if (listener instanceof CalculatorListener_js_1.default) {
          listener.enterMultDivExpr(this);
        }
      }
      exitRule(listener) {
        if (listener instanceof CalculatorListener_js_1.default) {
          listener.exitMultDivExpr(this);
        }
      }
    };
    CalculatorParser.AddSubExprContext = AddSubExprContext;
    CalculatorParser.MultDivExprContext = MultDivExprContext;
  }
});

// lib/index.js
"use strict";
var __importDefault = exports && exports.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorParser = exports.CalculatorListener = exports.CalculatorLexer = exports.antlr4 = void 0;
var CalculatorLexer_1 = __importDefault(require_CalculatorLexer());
exports.CalculatorLexer = CalculatorLexer_1.default;
var CalculatorListener_1 = __importDefault(require_CalculatorListener());
exports.CalculatorListener = CalculatorListener_1.default;
var CalculatorParser_1 = __importDefault(require_CalculatorParser());
exports.CalculatorParser = CalculatorParser_1.default;
var antlr4_1 = __importDefault(require_antlr4());
exports.antlr4 = antlr4_1.default;
/*! https://mths.be/codepointat v0.2.0 by @mathias */
/*! https://mths.be/fromcodepoint v0.2.1 by @mathias */
