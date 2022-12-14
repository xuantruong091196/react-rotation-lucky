import React from 'react';
import axios from 'axios';
import AdmZip from 'adm-zip';
import arrayBufferToBuffer from 'arraybuffer-to-buffer';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function value(valueToFind, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if (len === 0) {
        return false;
      }
      var n = fromIndex | 0;
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      function sameValueZero(x, y) {
        return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
      }
      while (k < len) {
        if (sameValueZero(o[k], valueToFind)) {
          return true;
        }
        k++;
      }
      return false;
    }
  });
}
if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {

    if (typeof start !== 'number') {
      start = 0;
    }
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function value(predicate) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var thisArg = arguments[1];
      var k = 0;
      while (k < len) {
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        k++;
      }
      return void 0;
    }
  });
}

var isExpectType = function isExpectType(param) {
  for (var _len = arguments.length, types = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    types[_key - 1] = arguments[_key];
  }
  return types.some(function (type) {
    return Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type;
  });
};
var has = function has(data, key) {
  return Object.prototype.hasOwnProperty.call(data, key);
};
var removeEnter = function removeEnter(str) {
  return [].filter.call(str, function (s) {
    return s !== '\n';
  }).join('');
};
var getNumber = function getNumber(num) {
  if (num === null) return 0;
  if (typeof num === 'object') return NaN;
  if (typeof num === 'number') return num;
  if (typeof num === 'string') {
    if (num[num.length - 1] === '%') {
      return Number(num.slice(0, -1)) / 100;
    }
    return Number(num);
  }
  return NaN;
};
var hasBackground = function hasBackground(color) {
  if (typeof color !== 'string') return false;
  color = color.toLocaleLowerCase().trim();
  if (color === 'transparent') return false;
  if (/^rgba/.test(color)) {
    var alpha = /([^\s,]+)\)$/.exec(color);
    if (getNumber(alpha) === 0) return false;
  }
  return true;
};
var throttle = function throttle(fn, wait) {
  if (wait === void 0) {
    wait = 300;
  }
  var timeId = null;
  return function () {
    var _this = this;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (timeId) return;
    timeId = setTimeout(function () {
      fn.apply(_this, args);
      clearTimeout(timeId);
      timeId = null;
    }, wait);
  };
};
var computeRange = function computeRange(rangeArr) {
  var ascendingArr = [];
  var sum = rangeArr.map(function (num) {
    return Number(num);
  }).reduce(function (prev, curr) {
    if (curr > 0) {
      var res = prev + curr;
      ascendingArr.push(res);
      return res;
    } else {
      ascendingArr.push(NaN);
      return prev;
    }
  }, 0);
  var random = Math.random() * sum;
  return ascendingArr.findIndex(function (num) {
    return random <= num;
  });
};
var splitText = function splitText(ctx, text, getWidth, lineClamp) {
  if (lineClamp === void 0) {
    lineClamp = Infinity;
  }
  if (lineClamp <= 0) lineClamp = Infinity;
  var str = '';
  var lines = [];
  var EndWidth = ctx.measureText('...').width;
  for (var i = 0; i < text.length; i++) {
    str += text[i];
    var currWidth = ctx.measureText(str).width;
    var maxWidth = getWidth(lines);
    if (lineClamp === lines.length + 1) currWidth += EndWidth;
    if (maxWidth < 0) return lines;
    if (currWidth > maxWidth) {
      lines.push(str.slice(0, -1));
      str = text[i];
    }
    if (lineClamp === lines.length) {
      lines[lines.length - 1] += '...';
      return lines;
    }
  }
  if (str) lines.push(str);
  if (!lines.length) lines.push(text);
  return lines;
};

var Dep = /*#__PURE__*/function () {
  function Dep() {
    this.subs = [];
  }
  var _proto = Dep.prototype;
  _proto.addSub = function addSub(sub) {
    if (!this.subs.includes(sub)) {
      this.subs.push(sub);
    }
  };
  _proto.notify = function notify() {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  };
  return Dep;
}();

var hasProto = ('__proto__' in {});
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
function parsePath(path) {
  path += '.';
  var segments = [],
    segment = '';
  for (var i = 0; i < path.length; i++) {
    var curr = path[i];
    if (/\[|\./.test(curr)) {
      segments.push(segment);
      segment = '';
    } else if (/\W/.test(curr)) {
      continue;
    } else {
      segment += curr;
    }
  }
  return function (data) {
    return segments.reduce(function (data, key) {
      return data[key];
    }, data);
  };
}
function traverse(value) {
  var dfs = function dfs(data) {
    if (!isExpectType(data, 'array', 'object')) return;
    Object.keys(data).forEach(function (key) {
      var value = data[key];
      dfs(value);
    });
  };
  dfs(value);
}

var oldArrayProto = Array.prototype;
var newArrayProto = Object.create(oldArrayProto);
var methods = ['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse'];
methods.forEach(function (method) {
  newArrayProto[method] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var res = oldArrayProto[method].apply(this, args);
    var luckyOb = this['__luckyOb__'];
    if (['push', 'unshift', 'splice'].includes(method)) luckyOb.walk(this);
    luckyOb.dep.notify();
    return res;
  };
});

var Observer = /*#__PURE__*/function () {
  function Observer(value) {
    this.dep = new Dep();
    def(value, '__luckyOb__', this);
    if (Array.isArray(value)) {
      if (hasProto) {
        value['__proto__'] = newArrayProto;
      } else {
        Object.getOwnPropertyNames(newArrayProto).forEach(function (key) {
          def(value, key, newArrayProto[key]);
        });
      }
    }
    this.walk(value);
  }
  var _proto = Observer.prototype;
  _proto.walk = function walk(data) {
    Object.keys(data).forEach(function (key) {
      defineReactive(data, key, data[key]);
    });
  };
  return Observer;
}();
function observe(data) {
  if (!data || typeof data !== 'object') return;
  var luckyOb;
  if ('__luckyOb__' in data) {
    luckyOb = data['__luckyOb__'];
  } else {
    luckyOb = new Observer(data);
  }
  return luckyOb;
}
function defineReactive(data, key, val) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(data, key);
  if (property && property.configurable === false) {
    return;
  }
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = data[key];
  }
  var childOb = observe(val);
  Object.defineProperty(data, key, {
    get: function get() {
      var value = getter ? getter.call(data) : val;
      if (Dep.target) {
        dep.addSub(Dep.target);
        if (childOb) {
          childOb.dep.addSub(Dep.target);
        }
      }
      return value;
    },
    set: function set(newVal) {
      if (newVal === val) return;
      val = newVal;
      if (getter && !setter) return;
      if (setter) {
        setter.call(data, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

var uid = 0;
var Watcher = /*#__PURE__*/function () {
  function Watcher($lucky, expr, cb, options) {
    if (options === void 0) {
      options = {};
    }
    this.id = uid++;
    this.$lucky = $lucky;
    this.expr = expr;
    this.deep = !!options.deep;
    if (typeof expr === 'function') {
      this.getter = expr;
    } else {
      this.getter = parsePath(expr);
    }
    this.cb = cb;
    this.value = this.get();
  }
  var _proto = Watcher.prototype;
  _proto.get = function get() {
    Dep.target = this;
    var value = this.getter.call(this.$lucky, this.$lucky);
    if (this.deep) {
      traverse(value);
    }
    Dep.target = null;
    return value;
  };
  _proto.update = function update() {
    var newVal = this.get();
    var oldVal = this.value;
    this.value = newVal;
    this.cb.call(this.$lucky, newVal, oldVal);
  };
  return Watcher;
}();

var Lucky = /*#__PURE__*/function () {
  function Lucky(config, data) {
    var _this = this;
    this.htmlFontSize = 16;
    this.rAF = function () {};
    this.boxWidth = 0;
    this.boxHeight = 0;
    if (typeof config === 'string') config = {
      el: config
    };else if (config.nodeType === 1) config = {
      el: '',
      divElement: config
    };
    config = config;
    this.config = config;
    this.data = data;
    if (!config.flag) config.flag = 'WEB';
    if (config.el) config.divElement = document.querySelector(config.el);
    if (config.divElement) {
      config.canvasElement = document.createElement('canvas');
      config.divElement.appendChild(config.canvasElement);
    }
    if (config.canvasElement) {
      config.ctx = config.canvasElement.getContext('2d');
      config.canvasElement.setAttribute('package', "react-rotation-lucky-v1.1");
      config.canvasElement.addEventListener('click', function (e) {
        return _this.handleClick(e);
      });
    }
    this.ctx = config.ctx;
    this.initWindowFunction();
    if (!this.config.ctx) {
      console.error('CanvasContext2D');
    }
    if (window && typeof window.addEventListener === 'function') {
      window.addEventListener('resize', throttle(function () {
        return _this.resize();
      }, 300));
    }
    if (window && typeof window.MutationObserver === 'function') {
      new window.MutationObserver(function () {
        _this.resize();
      }).observe(document.documentElement, {
        attributes: true
      });
    }
  }
  var _proto = Lucky.prototype;
  _proto.resize = function resize() {
    var _this$config$beforeRe, _this$config;
    (_this$config$beforeRe = (_this$config = this.config).beforeResize) === null || _this$config$beforeRe === void 0 ? void 0 : _this$config$beforeRe.call(_this$config);
    this.setHTMLFontSize();
    this.setDpr();
    this.resetWidthAndHeight();
    this.zoomCanvas();
  };
  _proto.initLucky = function initLucky() {
    this.resize();
    if (!this.boxWidth || !this.boxHeight) {
      return console.error('This is not a valid');
    }
  };
  _proto.handleClick = function handleClick(_e) {};
  _proto.setHTMLFontSize = function setHTMLFontSize() {
    if (!window) return;
    this.htmlFontSize = +window.getComputedStyle(document.documentElement).fontSize.slice(0, -2);
  };
  _proto.clearCanvas = function clearCanvas() {
    var _ref = [this.boxWidth, this.boxHeight],
      width = _ref[0],
      height = _ref[1];
    this.ctx.clearRect(-width, -height, width * 2, height * 2);
  };
  _proto.setDpr = function setDpr() {
    var config = this.config;
    if (config.dpr) ; else if (window) {
      window['dpr'] = config.dpr = window.devicePixelRatio || 1;
    } else if (!config.dpr) {
      console.error(config, 'Error to set dpr');
    }
  };
  _proto.resetWidthAndHeight = function resetWidthAndHeight() {
    var config = this.config,
      data = this.data;
    var boxWidth = 0,
      boxHeight = 0;
    if (config.divElement) {
      boxWidth = config.divElement.offsetWidth;
      boxHeight = config.divElement.offsetHeight;
    }
    this.boxWidth = this.getLength(data.width || config['width']) || boxWidth;
    this.boxHeight = this.getLength(data.height || config['height']) || boxHeight;
    if (config.divElement) {
      config.divElement.style.overflow = 'hidden';
      config.divElement.style.width = this.boxWidth + 'px';
      config.divElement.style.height = this.boxHeight + 'px';
    }
  };
  _proto.zoomCanvas = function zoomCanvas() {
    var config = this.config,
      ctx = this.ctx;
    var canvasElement = config.canvasElement,
      dpr = config.dpr;
    var width = this.boxWidth * dpr,
      height = this.boxHeight * dpr;
    if (!canvasElement) return;
    canvasElement.width = width;
    canvasElement.height = height;
    canvasElement.style.width = width + "px";
    canvasElement.style.height = height + "px";
    canvasElement.style['transform-origin'] = 'left top';
    canvasElement.style.transform = "scale(" + 1 / dpr + ")";
    ctx.scale(dpr, dpr);
  };
  _proto.initWindowFunction = function initWindowFunction() {
    var config = this.config;
    if (window) {
      this.rAF = window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'] || function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
      config.setTimeout = window.setTimeout;
      config.setInterval = window.setInterval;
      config.clearTimeout = window.clearTimeout;
      config.clearInterval = window.clearInterval;
      return;
    }
    if (config.rAF) {
      this.rAF = config.rAF;
    } else if (config.setTimeout) {
      var timeout = config.setTimeout;
      this.rAF = function (callback) {
        return timeout(callback, 16.7);
      };
    } else {
      this.rAF = function (callback) {
        return setTimeout(callback, 16.7);
      };
    }
  };
  _proto.isWeb = function isWeb() {
    return ['WEB', 'UNI-H5', 'TARO-H5'].includes(this.config.flag);
  };
  _proto.loadImg = function loadImg(src, info, resolveName) {
    var _this2 = this;
    if (resolveName === void 0) {
      resolveName = '$resolve';
    }
    return new Promise(function (resolve, reject) {
      if (!src) reject("=> '" + info.src + "' don't exist");
      if (_this2.config.flag === 'WEB') {
        var imgObj = new Image();
        imgObj['crossorigin'] = 'anonymous';
        imgObj.onload = function () {
          return resolve(imgObj);
        };
        imgObj.onerror = function () {
          return reject("=> '" + info.src + "' don't exist");
        };
        imgObj.src = src;
      } else {
        info[resolveName] = resolve;
        info['$reject'] = reject;
        return;
      }
    });
  };
  _proto.drawImage = function drawImage(ctx, imgObj) {
    var _getContext, _ref2;
    for (var _len = arguments.length, rectInfo = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rectInfo[_key - 2] = arguments[_key];
    }
    var drawImg;
    var _this$config2 = this.config,
      flag = _this$config2.flag,
      dpr = _this$config2.dpr;
    if (['WEB', 'MP-WX'].includes(flag)) {
      drawImg = imgObj;
    } else if (['UNI-H5', 'UNI-MP', 'TARO-H5', 'TARO-MP'].includes(flag)) {
      drawImg = imgObj.path;
    } else {
      return console.error('create flag, Pls check to the params!');
    }
    var miniProgramOffCtx = (_getContext = (_ref2 = drawImg['canvas'] || drawImg).getContext) === null || _getContext === void 0 ? void 0 : _getContext.call(_ref2, '2d');
    if (miniProgramOffCtx && !this.isWeb()) {
      rectInfo = rectInfo.map(function (val) {
        return val * dpr;
      });
      var temp = miniProgramOffCtx.getImageData.apply(miniProgramOffCtx, rectInfo.slice(0, 4));
      ctx.putImageData.apply(ctx, [temp].concat(rectInfo.slice(1, 6)));
    } else {
      if (rectInfo.length === 8) {
        rectInfo = rectInfo.map(function (val, index) {
          return index < 4 ? val * dpr : val;
        });
      }
      try {
        ctx.drawImage.apply(ctx, [drawImg].concat(rectInfo));
      } catch (err) {}
    }
  };
  _proto.computedWidthAndHeight = function computedWidthAndHeight(imgObj, imgInfo, maxWidth, maxHeight) {
    if (!imgInfo.width && !imgInfo.height) {
      return [imgObj.width, imgObj.height];
    } else if (imgInfo.width && !imgInfo.height) {
      var trueWidth = this.getLength(imgInfo.width, maxWidth);
      return [trueWidth, imgObj.height * (trueWidth / imgObj.width)];
    } else if (!imgInfo.width && imgInfo.height) {
      var trueHeight = this.getLength(imgInfo.height, maxHeight);
      return [imgObj.width * (trueHeight / imgObj.height), trueHeight];
    }
    return [this.getLength(imgInfo.width, maxWidth), this.getLength(imgInfo.height, maxHeight)];
  };
  _proto.changeUnits = function changeUnits(value, denominator) {
    var _this3 = this;
    if (denominator === void 0) {
      denominator = 1;
    }
    var config = this.config;
    return Number(value.replace(/^([-]*[0-9.]*)([a-z%]*)$/, function (_val, num, unit) {
      var handleCssUnit = {
        '%': function _(n) {
          return n * (denominator / 100);
        },
        px: function px(n) {
          return n * 1;
        },
        rem: function rem(n) {
          return n * _this3.htmlFontSize;
        },
        vw: function vw(n) {
          return n / 100 * window.innerWidth;
        }
      }[unit];
      if (handleCssUnit) return handleCssUnit(num);
      var otherHandleCssUnit = config.handleCssUnit || config['unitFunc'];
      return otherHandleCssUnit ? otherHandleCssUnit(num, unit) : num;
    }));
  };
  _proto.getLength = function getLength(length, maxLength) {
    if (isExpectType(length, 'number')) return length;
    if (isExpectType(length, 'string')) return this.changeUnits(length, maxLength);
    return 0;
  };
  _proto.getOffsetX = function getOffsetX(width, maxWidth) {
    if (maxWidth === void 0) {
      maxWidth = 0;
    }
    return (maxWidth - width) / 2;
  };
  _proto.getOffscreenCanvas = function getOffscreenCanvas(width, height) {
    if (!has(this, '_offscreenCanvas')) {
      if (window && window.document && this.config.flag === 'WEB') {
        this['_offscreenCanvas'] = document.createElement('canvas');
      } else {
        this['_offscreenCanvas'] = this.config['offscreenCanvas'];
      }
      if (!this['_offscreenCanvas']) return console.error(' Canvas do not support!');
    }
    var dpr = this.config.dpr;
    var _offscreenCanvas = this['_offscreenCanvas'];
    _offscreenCanvas.width = (width || 300) * dpr;
    _offscreenCanvas.height = (height || 150) * dpr;
    var _ctx = _offscreenCanvas.getContext('2d');
    _ctx.clearRect(0, 0, width, height);
    _ctx.scale(dpr, dpr);
    _ctx['dpr'] = dpr;
    return {
      _offscreenCanvas: _offscreenCanvas,
      _ctx: _ctx
    };
  };
  _proto.$set = function $set(data, key, value) {
    if (!data || typeof data !== 'object') return;
    defineReactive(data, key, value);
  };
  _proto.$computed = function $computed(data, key, callback) {
    var _this4 = this;
    Object.defineProperty(data, key, {
      get: function get() {
        return callback.call(_this4);
      }
    });
  };
  _proto.$watch = function $watch(expr, handler, watchOpt) {
    if (watchOpt === void 0) {
      watchOpt = {};
    }
    if (typeof handler === 'object') {
      watchOpt = handler;
      handler = watchOpt.handler;
    }
    var watcher = new Watcher(this, expr, handler, watchOpt);
    if (watchOpt.immediate) {
      handler.call(this, watcher.value);
    }
    return function unWatchFn() {};
  };
  return Lucky;
}();

var getAngle = function getAngle(deg) {
  return Math.PI / 180 * deg;
};
var getArcPointerByDeg = function getArcPointerByDeg(deg, r) {
  return [+(Math.cos(deg) * r).toFixed(8), +(Math.sin(deg) * r).toFixed(8)];
};
var fanShapedByArc = function fanShapedByArc(ctx, _minRadius, maxRadius, start, end, gutter) {
  ctx.beginPath();
  var maxGutter = getAngle(90 / Math.PI / maxRadius * gutter);
  var maxStart = start + maxGutter;
  var maxEnd = end - maxGutter;
  ctx.arc(0, 0, maxRadius, maxStart, maxEnd, false);
  ctx.lineTo.apply(ctx, getArcPointerByDeg((start + end) / 2, gutter / 2 / Math.abs(Math.sin((start - end) / 2))));
  ctx.closePath();
};

var quad = {
  easeIn: function easeIn(t, b, c, d) {
    if (t >= d) t = d;
    return c * (t /= d) * t + b;
  },
  easeOut: function easeOut(t, b, c, d) {
    if (t >= d) t = d;
    return -c * (t /= d) * (t - 2) + b;
  }
};

var LuckyWheel = /*#__PURE__*/function (_Lucky) {
  _inheritsLoose(LuckyWheel, _Lucky);
  function LuckyWheel(config, data) {
    var _config$beforeCreate;
    var _this;
    _this = _Lucky.call(this, config, {
      width: data.width,
      height: data.height
    }) || this;
    _this.blocks = [];
    _this.prizes = [];
    _this.buttons = [];
    _this.defaultConfig = {};
    _this.defaultStyle = {};
    _this._defaultConfig = {};
    _this._defaultStyle = {};
    _this.Radius = 0;
    _this.prizeRadius = 0;
    _this.prizeDeg = 0;
    _this.prizeAng = 0;
    _this.rotateDeg = 0;
    _this.maxBtnRadius = 0;
    _this.startTime = 0;
    _this.endTime = 0;
    _this.stopDeg = 0;
    _this.endDeg = 0;
    _this.FPS = 16.6;
    _this.step = 0;
    _this.ImageCache = new Map();
    _this.initData(data);
    _this.initWatch();
    _this.initComputed();
    (_config$beforeCreate = config.beforeCreate) === null || _config$beforeCreate === void 0 ? void 0 : _config$beforeCreate.call(_assertThisInitialized(_this));
    _this.init();
    return _this;
  }
  var _proto = LuckyWheel.prototype;
  _proto.resize = function resize() {
    var _this$config$afterRes, _this$config;
    _Lucky.prototype.resize.call(this);
    this.Radius = Math.min(this.boxWidth, this.boxHeight) / 2;
    this.ctx.translate(this.Radius, this.Radius);
    this.draw();
    (_this$config$afterRes = (_this$config = this.config).afterResize) === null || _this$config$afterRes === void 0 ? void 0 : _this$config$afterRes.call(_this$config);
  };
  _proto.initLucky = function initLucky() {
    this.Radius = 0;
    this.prizeRadius = 0;
    this.prizeDeg = 0;
    this.prizeAng = 0;
    this.rotateDeg = 0;
    this.maxBtnRadius = 0;
    this.startTime = 0;
    this.endTime = 0;
    this.stopDeg = 0;
    this.endDeg = 0;
    this.FPS = 16.6;
    this.prizeFlag = -1;
    this.step = 0;
    _Lucky.prototype.initLucky.call(this);
  };
  _proto.initData = function initData(data) {
    this.$set(this, 'width', data.width);
    this.$set(this, 'height', data.height);
    this.$set(this, 'blocks', data.blocks || []);
    this.$set(this, 'prizes', data.prizes || []);
    this.$set(this, 'buttons', data.buttons || []);
    this.$set(this, 'defaultConfig', data.defaultConfig || {});
    this.$set(this, 'defaultStyle', data.defaultStyle || {});
    this.$set(this, 'startCallback', data.start);
    this.$set(this, 'endCallback', data.end);
  };
  _proto.initComputed = function initComputed() {
    var _this2 = this;
    this.$computed(this, '_defaultConfig', function () {
      var config = _extends({
        gutter: '0px',
        offsetDegree: 0,
        speed: 20,
        speedFunction: 'quad',
        accelerationTime: 2500,
        decelerationTime: 2500,
        stopRange: 0
      }, _this2.defaultConfig);
      return config;
    });
    this.$computed(this, '_defaultStyle', function () {
      var style = _extends({
        fontSize: '18px',
        fontColor: '#000',
        fontStyle: 'sans-serif',
        fontWeight: '400',
        background: 'rgba(0,0,0,0)',
        wordWrap: true,
        lengthLimit: '90%'
      }, _this2.defaultStyle);
      return style;
    });
  };
  _proto.initWatch = function initWatch() {
    var _this3 = this;
    this.$watch('width', function (newVal) {
      _this3.data.width = newVal;
      _this3.resize();
    });
    this.$watch('height', function (newVal) {
      _this3.data.height = newVal;
      _this3.resize();
    });
    this.$watch('blocks', function (_newData) {
      _this3.initImageCache();
    }, {
      deep: true
    });
    this.$watch('prizes', function (_newData) {
      _this3.initImageCache();
    }, {
      deep: true
    });
    this.$watch('buttons', function (_newData) {
      _this3.initImageCache();
    }, {
      deep: true
    });
    this.$watch('defaultConfig', function () {
      return _this3.draw();
    }, {
      deep: true
    });
    this.$watch('defaultStyle', function () {
      return _this3.draw();
    }, {
      deep: true
    });
    this.$watch('startCallback', function () {
      return _this3.init();
    });
    this.$watch('endCallback', function () {
      return _this3.init();
    });
  };
  _proto.init = function init() {
    try {
      var _config$beforeInit;
      var _this5 = this;
      _this5.initLucky();
      var config = _this5.config;
      (_config$beforeInit = config.beforeInit) === null || _config$beforeInit === void 0 ? void 0 : _config$beforeInit.call(_this5);
      _this5.draw();
      _this5.draw();
      return Promise.resolve(_this5.initImageCache()).then(function () {
        var _config$afterInit;
        (_config$afterInit = config.afterInit) === null || _config$afterInit === void 0 ? void 0 : _config$afterInit.call(_this5);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.initImageCache = function initImageCache() {
    var _this6 = this;
    return new Promise(function (resolve) {
      var willUpdateImgs = {
        blocks: _this6.blocks.map(function (block) {
          return block.imgs;
        }),
        prizes: _this6.prizes.map(function (prize) {
          return prize.imgs;
        }),
        buttons: _this6.buttons.map(function (btn) {
          return btn.imgs;
        })
      };
      Object.keys(willUpdateImgs).forEach(function (imgName) {
        var willUpdate = willUpdateImgs[imgName];
        var allPromise = [];
        willUpdate && willUpdate.forEach(function (imgs, cellIndex) {
          imgs && imgs.forEach(function (_imgInfo, imgIndex) {
            allPromise.push(_this6.loadAndCacheImg(imgName, cellIndex, imgIndex));
          });
        });
        Promise.all(allPromise).then(function () {
          _this6.draw();
          resolve();
        });
      });
    });
  };
  _proto.handleClick = function handleClick(e) {
    var _this$startCallback;
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(0, 0, this.maxBtnRadius, 0, Math.PI * 2, false);
    if (!ctx.isPointInPath(e.offsetX, e.offsetY)) return;
    if (this.step !== 0) return;
    (_this$startCallback = this.startCallback) === null || _this$startCallback === void 0 ? void 0 : _this$startCallback.call(this, e);
  };
  _proto.loadAndCacheImg = function loadAndCacheImg(cellName, cellIndex, imgIndex) {
    try {
      var _this8 = this;
      return Promise.resolve(new Promise(function (resolve, reject) {
        var cell = _this8[cellName][cellIndex];
        if (!cell || !cell.imgs) return;
        var imgInfo = cell.imgs[imgIndex];
        if (!imgInfo) return;
        _this8.loadImg(imgInfo.src, imgInfo).then(function (currImg) {
          try {
            var _temp3 = function _temp3() {
              _this8.ImageCache.set(imgInfo['src'], currImg);
              resolve();
            };
            var _temp4 = function () {
              if (typeof imgInfo.formatter === 'function') {
                return Promise.resolve(Promise.resolve(imgInfo.formatter.call(_this8, currImg))).then(function (_Promise$resolve) {
                  currImg = _Promise$resolve;
                });
              }
            }();
            return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
          } catch (e) {
            return Promise.reject(e);
          }
        })["catch"](function (err) {
          console.error(cellName + "[" + cellIndex + "].imgs[" + imgIndex + "] " + err);
          reject();
        });
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.drawBlock = function drawBlock(radius, block, _blockIndex) {
    var _this9 = this;
    var ctx = this.ctx;
    if (hasBackground(block.background)) {
      ctx.beginPath();
      ctx.fillStyle = block.background;
      ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
      ctx.fill();
    }
    block.imgs && block.imgs.forEach(function (imgInfo, _imgIndex) {
      var blockImg = _this9.ImageCache.get(imgInfo.src);
      if (!blockImg) return;
      var _this9$computedWidthA = _this9.computedWidthAndHeight(blockImg, imgInfo, radius * 2, radius * 2),
        trueWidth = _this9$computedWidthA[0],
        trueHeight = _this9$computedWidthA[1];
      var xAxis = _this9.getOffsetX(trueWidth) + _this9.getLength(imgInfo.left, radius * 2),
        yAxis = _this9.getLength(imgInfo.top, radius * 2) - radius;
      ctx.save();
      imgInfo.rotate && ctx.rotate(getAngle(_this9.rotateDeg));
      _this9.drawImage(ctx, blockImg, xAxis, yAxis, trueWidth, trueHeight);
      ctx.restore();
    });
  };
  _proto.draw = function draw() {
    var _config$beforeDraw,
      _this10 = this,
      _config$afterDraw;
    var config = this.config,
      ctx = this.ctx,
      _defaultConfig = this._defaultConfig,
      _defaultStyle = this._defaultStyle;
    (_config$beforeDraw = config.beforeDraw) === null || _config$beforeDraw === void 0 ? void 0 : _config$beforeDraw.call(this, ctx);
    ctx.clearRect(-this.Radius, -this.Radius, this.Radius * 2, this.Radius * 2);
    this.prizeRadius = this.blocks.reduce(function (radius, block, blockIndex) {
      _this10.drawBlock(radius, block, blockIndex);
      return radius - _this10.getLength(block.padding && block.padding.split(' ')[0]);
    }, this.Radius);
    this.prizeDeg = 360 / this.prizes.length;
    this.prizeAng = getAngle(this.prizeDeg);
    var shortSide = this.prizeRadius * Math.sin(this.prizeAng / 2) * 2;
    var start = getAngle(this.rotateDeg - 90 + this.prizeDeg / 2 + _defaultConfig.offsetDegree);
    var getFontX = function getFontX(font, line) {
      return _this10.getOffsetX(ctx.measureText(line).width) + _this10.getLength(font.left, shortSide);
    };
    var getFontY = function getFontY(font, height, lineIndex) {
      var lineHeight = font.lineHeight || _defaultStyle.lineHeight || font.fontSize || _defaultStyle.fontSize;
      return _this10.getLength(font.top, height) + (lineIndex + 1) * _this10.getLength(lineHeight);
    };
    ctx.save();
    this.prizes.forEach(function (prize, prizeIndex) {
      var currMiddleDeg = start + prizeIndex * _this10.prizeAng;
      var prizeHeight = _this10.prizeRadius - _this10.maxBtnRadius;
      var background = prize.background || _defaultStyle.background;
      if (hasBackground(background)) {
        ctx.fillStyle = background;
        fanShapedByArc(ctx, _this10.maxBtnRadius, _this10.prizeRadius, currMiddleDeg - _this10.prizeAng / 2, currMiddleDeg + _this10.prizeAng / 2, _this10.getLength(_defaultConfig.gutter));
        ctx.fill();
      }
      var x = Math.cos(currMiddleDeg) * _this10.prizeRadius;
      var y = Math.sin(currMiddleDeg) * _this10.prizeRadius;
      ctx.translate(x, y);
      ctx.rotate(currMiddleDeg + getAngle(90));
      prize.imgs && prize.imgs.forEach(function (imgInfo, _imgIndex) {
        var prizeImg = _this10.ImageCache.get(imgInfo.src);
        if (!prizeImg) return;
        var _this10$computedWidth = _this10.computedWidthAndHeight(prizeImg, imgInfo, _this10.prizeAng * _this10.prizeRadius, prizeHeight),
          trueWidth = _this10$computedWidth[0],
          trueHeight = _this10$computedWidth[1];
        var _ref = [_this10.getOffsetX(trueWidth) + _this10.getLength(imgInfo.left, shortSide), _this10.getLength(imgInfo.top, prizeHeight)],
          xAxis = _ref[0],
          yAxis = _ref[1];
        _this10.drawImage(ctx, prizeImg, xAxis, yAxis, trueWidth, trueHeight);
      });
      prize.fonts && prize.fonts.forEach(function (font) {
        var fontColor = font.fontColor || _defaultStyle.fontColor;
        var fontWeight = font.fontWeight || _defaultStyle.fontWeight;
        var fontSize = _this10.getLength(font.fontSize || _defaultStyle.fontSize);
        var fontStyle = font.fontStyle || _defaultStyle.fontStyle;
        var wordWrap = has(font, 'wordWrap') ? font.wordWrap : _defaultStyle.wordWrap;
        var lengthLimit = font.lengthLimit || _defaultStyle.lengthLimit;
        var lineClamp = font.lineClamp || _defaultStyle.lineClamp;
        ctx.fillStyle = fontColor;
        ctx.font = fontWeight + " " + (fontSize >> 0) + "px " + fontStyle;
        var lines = [],
          text = String(font.text);
        if (wordWrap) {
          lines = splitText(ctx, removeEnter(text), function (lines) {
            var adjacentSide = _this10.prizeRadius - getFontY(font, prizeHeight, lines.length);
            var shortSide = adjacentSide * Math.tan(_this10.prizeAng / 2);
            var maxWidth = shortSide * 2 - _this10.getLength(_defaultConfig.gutter);
            return _this10.getLength(lengthLimit, maxWidth);
          }, lineClamp);
        } else {
          lines = text.split('\n');
        }
        lines.filter(function (line) {
          return !!line;
        }).forEach(function (line, lineIndex) {
          ctx.fillText(line, getFontX(font, line), getFontY(font, prizeHeight, lineIndex));
        });
      });
      ctx.rotate(getAngle(360) - currMiddleDeg - getAngle(90));
      ctx.translate(-x, -y);
    });
    ctx.restore();
    this.buttons.forEach(function (btn, _btnIndex) {
      var radius = _this10.getLength(btn.radius, _this10.prizeRadius);
      _this10.maxBtnRadius = Math.max(_this10.maxBtnRadius, radius);
      if (hasBackground(btn.background)) {
        ctx.beginPath();
        ctx.fillStyle = btn.background;
        ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
        ctx.fill();
      }
      if (btn.pointer && hasBackground(btn.background)) {
        ctx.beginPath();
        ctx.fillStyle = btn.background;
        ctx.moveTo(-radius, 0);
        ctx.lineTo(radius, 0);
        ctx.lineTo(0, -radius * 2);
        ctx.closePath();
        ctx.fill();
      }
      btn.imgs && btn.imgs.forEach(function (imgInfo, _imgIndex) {
        var btnImg = _this10.ImageCache.get(imgInfo.src);
        if (!btnImg) return;
        var _this10$computedWidth2 = _this10.computedWidthAndHeight(btnImg, imgInfo, radius * 2, radius * 2),
          trueWidth = _this10$computedWidth2[0],
          trueHeight = _this10$computedWidth2[1];
        var _ref2 = [_this10.getOffsetX(trueWidth) + _this10.getLength(imgInfo.left, radius), _this10.getLength(imgInfo.top, radius)],
          xAxis = _ref2[0],
          yAxis = _ref2[1];
        _this10.drawImage(ctx, btnImg, xAxis, yAxis, trueWidth, trueHeight);
      });
      btn.fonts && btn.fonts.forEach(function (font) {
        var fontColor = font.fontColor || _defaultStyle.fontColor;
        var fontWeight = font.fontWeight || _defaultStyle.fontWeight;
        var fontSize = _this10.getLength(font.fontSize || _defaultStyle.fontSize);
        var fontStyle = font.fontStyle || _defaultStyle.fontStyle;
        ctx.fillStyle = fontColor;
        ctx.font = fontWeight + " " + (fontSize >> 0) + "px " + fontStyle;
        String(font.text).split('\n').forEach(function (line, lineIndex) {
          ctx.fillText(line, getFontX(font, line), getFontY(font, radius, lineIndex));
          ctx.textAlign = font.textAlign;
        });
      });
    });
    (_config$afterDraw = config.afterDraw) === null || _config$afterDraw === void 0 ? void 0 : _config$afterDraw.call(this, ctx);
  };
  _proto.carveOnGunwaleOfAMovingBoat = function carveOnGunwaleOfAMovingBoat() {
    var _defaultConfig = this._defaultConfig,
      prizeFlag = this.prizeFlag,
      prizeDeg = this.prizeDeg,
      rotateDeg = this.rotateDeg;
    this.endTime = Date.now();
    var stopDeg = this.stopDeg = rotateDeg;
    var speed = _defaultConfig.speed;
    var stopRange = (Math.random() * prizeDeg - prizeDeg / 2) * this.getLength(_defaultConfig.stopRange);
    var i = 0,
      prevSpeed = 0,
      prevDeg = 0;
    while (++i) {
      var endDeg = 360 * i - prizeFlag * prizeDeg - rotateDeg - _defaultConfig.offsetDegree + stopRange - prizeDeg / 2;
      var currSpeed = quad.easeOut(this.FPS, stopDeg, endDeg, _defaultConfig.decelerationTime) - stopDeg;
      if (currSpeed > speed) {
        this.endDeg = speed - prevSpeed > currSpeed - speed ? endDeg : prevDeg;
        break;
      }
      prevDeg = endDeg;
      prevSpeed = currSpeed;
    }
  };
  _proto.play = function play() {
    var _this$config$afterSta, _this$config2;
    if (this.step !== 0) return;
    this.startTime = Date.now();
    this.prizeFlag = void 0;
    this.step = 1;
    (_this$config$afterSta = (_this$config2 = this.config).afterStart) === null || _this$config$afterSta === void 0 ? void 0 : _this$config$afterSta.call(_this$config2);
    this.run();
  };
  _proto.stop = function stop(index) {
    if (this.step === 0 || this.step === 3) return;
    if (!index && index !== 0) {
      var rangeArr = this.prizes.map(function (item) {
        return item.range;
      });
      index = computeRange(rangeArr);
    }
    if (index < 0) {
      this.step = 0;
      this.prizeFlag = -1;
    } else {
      this.step = 2;
      this.prizeFlag = index % this.prizes.length;
    }
  };
  _proto.run = function run(num) {
    if (num === void 0) {
      num = 0;
    }
    var rAF = this.rAF,
      step = this.step,
      prizeFlag = this.prizeFlag,
      _defaultConfig = this._defaultConfig;
    var accelerationTime = _defaultConfig.accelerationTime,
      decelerationTime = _defaultConfig.decelerationTime,
      speed = _defaultConfig.speed;
    if (step === 0) {
      var _this$endCallback;
      (_this$endCallback = this.endCallback) === null || _this$endCallback === void 0 ? void 0 : _this$endCallback.call(this, this.prizes.find(function (_prize, index) {
        return index === prizeFlag;
      }) || {});
      return;
    }
    if (prizeFlag === -1) return;
    if (step === 3 && !this.endDeg) this.carveOnGunwaleOfAMovingBoat();
    var startInterval = Date.now() - this.startTime;
    var endInterval = Date.now() - this.endTime;
    var rotateDeg = this.rotateDeg;
    if (step === 1 || startInterval < accelerationTime) {
      this.FPS = startInterval / num;
      var currSpeed = quad.easeIn(startInterval, 0, speed, accelerationTime);
      if (currSpeed === speed) {
        this.step = 2;
      }
      rotateDeg = rotateDeg + currSpeed % 360;
    } else if (step === 2) {
      rotateDeg = rotateDeg + speed % 360;
      if (prizeFlag !== void 0 && prizeFlag >= 0) {
        this.step = 3;
        this.stopDeg = 0;
        this.endDeg = 0;
      }
    } else if (step === 3) {
      rotateDeg = quad.easeOut(endInterval, this.stopDeg, this.endDeg, decelerationTime);
      if (endInterval >= decelerationTime) {
        this.step = 0;
      }
    } else {
      this.stop(-1);
    }
    this.rotateDeg = rotateDeg;
    this.draw();
    rAF(this.run.bind(this, num + 1));
  };
  _proto.conversionAxis = function conversionAxis(x, y) {
    var config = this.config;
    return [x / config.dpr - this.Radius, y / config.dpr - this.Radius];
  };
  return LuckyWheel;
}(Lucky);

/* eslint complexity: [2, 18], max-statements: [2, 33] */
var shams = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

var origSymbol = typeof Symbol !== 'undefined' && Symbol;


var hasSymbols = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return shams();
};

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

var implementation = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

var functionBind = Function.prototype.bind || implementation;

var src = functionBind.call(Function.call, Object.prototype.hasOwnProperty);

var undefined$1;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols$1 = hasSymbols();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols$1 ? getProto([][Symbol.iterator]()) : undefined$1,
	'%AsyncFromSyncIteratorPrototype%': undefined$1,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols$1 ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
	'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$1 ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$1 ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols$1 ? getProto(''[Symbol.iterator]()) : undefined$1,
	'%Symbol%': hasSymbols$1 ? Symbol : undefined$1,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};



var $concat = functionBind.call(Function.call, Array.prototype.concat);
var $spliceApply = functionBind.call(Function.apply, Array.prototype.splice);
var $replace = functionBind.call(Function.call, String.prototype.replace);
var $strSlice = functionBind.call(Function.call, String.prototype.slice);
var $exec = functionBind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (src(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (src(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

var getIntrinsic = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (src(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined$1;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = src(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var callBind = createCommonjsModule(function (module) {




var $apply = getIntrinsic('%Function.prototype.apply%');
var $call = getIntrinsic('%Function.prototype.call%');
var $reflectApply = getIntrinsic('%Reflect.apply%', true) || functionBind.call($call, $apply);

var $gOPD = getIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = getIntrinsic('%Object.defineProperty%', true);
var $max = getIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(functionBind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(functionBind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}
});

var $indexOf = callBind(getIntrinsic('String.prototype.indexOf'));

var callBound = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = getIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

var _nodeResolve_empty = {};

var _nodeResolve_empty$1 = {
  __proto__: null,
  'default': _nodeResolve_empty
};

var utilInspect = getCjsExportFromNamespace(_nodeResolve_empty$1);

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var $match = String.prototype.match;
var $slice = String.prototype.slice;
var $replace$1 = String.prototype.replace;
var $toUpperCase = String.prototype.toUpperCase;
var $toLowerCase = String.prototype.toLowerCase;
var $test = RegExp.prototype.test;
var $concat$1 = Array.prototype.concat;
var $join = Array.prototype.join;
var $arrSlice = Array.prototype.slice;
var $floor = Math.floor;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
// ie, `has-tostringtag/shams
var toStringTag = typeof Symbol === 'function' && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? 'object' : 'symbol')
    ? Symbol.toStringTag
    : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;

var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
    [].__proto__ === Array.prototype // eslint-disable-line no-proto
        ? function (O) {
            return O.__proto__; // eslint-disable-line no-proto
        }
        : null
);

function addNumericSeparator(num, str) {
    if (
        num === Infinity
        || num === -Infinity
        || num !== num
        || (num && num > -1000 && num < 1000)
        || $test.call(/e/, str)
    ) {
        return str;
    }
    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof num === 'number') {
        var int = num < 0 ? -$floor(-num) : $floor(num); // trunc(num)
        if (int !== num) {
            var intStr = String(int);
            var dec = $slice.call(str, intStr.length + 1);
            return $replace$1.call(intStr, sepRegex, '$&_') + '.' + $replace$1.call($replace$1.call(dec, /([0-9]{3})/g, '$&_'), /_$/, '');
        }
    }
    return $replace$1.call(str, sepRegex, '$&_');
}


var inspectCustom = utilInspect.custom;
var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;

var objectInspect = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has$1(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (
        has$1(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
            : opts.maxStringLength !== null
        )
    ) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has$1(opts, 'customInspect') ? opts.customInspect : true;
    if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
        throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
    }

    if (
        has$1(opts, 'indent')
        && opts.indent !== null
        && opts.indent !== '\t'
        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
    ) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    }
    if (has$1(opts, 'numericSeparator') && typeof opts.numericSeparator !== 'boolean') {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    }
    var numericSeparator = opts.numericSeparator;

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
    }
    if (typeof obj === 'bigint') {
        var bigIntStr = String(obj) + 'n';
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return isArray(obj) ? '[Array]' : '[Object]';
    }

    var indent = getIndent(opts, depth);

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from, noIndent) {
        if (from) {
            seen = $arrSlice.call(seen);
            seen.push(from);
        }
        if (noIndent) {
            var newOpts = {
                depth: opts.depth
            };
            if (has$1(opts, 'quoteStyle')) {
                newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function' && !isRegExp(obj)) { // in older engines, regexes are callable
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + $join.call(keys, ', ') + ' }' : '');
    }
    if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace$1.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + $toLowerCase.call(String(obj.nodeName)) + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) { return '[]'; }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
            return '[' + indentedJoin(xs, indent) + ']';
        }
        return '[ ' + $join.call(xs, ', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!('cause' in Error.prototype) && 'cause' in obj && !isEnumerable.call(obj, 'cause')) {
            return '{ [' + String(obj) + '] ' + $join.call($concat$1.call('[cause]: ' + inspect(obj.cause), parts), ', ') + ' }';
        }
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + $join.call(parts, ', ') + ' }';
    }
    if (typeof obj === 'object' && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function' && utilInspect) {
            return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function (value, key) {
            mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isWeakRef(obj)) {
        return weakCollectionOf('WeakRef');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? '' : 'null prototype';
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr$1(obj), 8, -1) : protoTag ? 'Object' : '';
        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
        var tag = constructorTag + (stringTag || protoTag ? '[' + $join.call($concat$1.call([], stringTag || [], protoTag || []), ': ') + '] ' : '');
        if (ys.length === 0) { return tag + '{}'; }
        if (indent) {
            return tag + '{' + indentedJoin(ys, indent) + '}';
        }
        return tag + '{ ' + $join.call(ys, ', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return $replace$1.call(String(s), /"/g, '&quot;');
}

function isArray(obj) { return toStr$1(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isDate(obj) { return toStr$1(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isRegExp(obj) { return toStr$1(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isError(obj) { return toStr$1(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isString(obj) { return toStr$1(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isNumber(obj) { return toStr$1(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isBoolean(obj) { return toStr$1(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
function isSymbol(obj) {
    if (hasShammedSymbols) {
        return obj && typeof obj === 'object' && obj instanceof Symbol;
    }
    if (typeof obj === 'symbol') {
        return true;
    }
    if (!obj || typeof obj !== 'object' || !symToString) {
        return false;
    }
    try {
        symToString.call(obj);
        return true;
    } catch (e) {}
    return false;
}

function isBigInt(obj) {
    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
        return false;
    }
    try {
        bigIntValueOf.call(obj);
        return true;
    } catch (e) {}
    return false;
}

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has$1(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr$1(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakRefDeref.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
    }
    // eslint-disable-next-line no-control-regex
    var s = $replace$1.call($replace$1.call(str, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b',
        9: 't',
        10: 'n',
        12: 'f',
        13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + $toUpperCase.call(n.toString(16));
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ', ');
    return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], '\n') >= 0) {
            return false;
        }
    }
    return true;
}

function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === '\t') {
        baseIndent = '\t';
    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), ' ');
    } else {
        return null;
    }
    return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
    };
}

function indentedJoin(xs, indent) {
    if (xs.length === 0) { return ''; }
    var lineJoiner = '\n' + indent.prev + indent.base;
    return lineJoiner + $join.call(xs, ',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has$1(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
            symMap['$' + syms[k]] = syms[k];
        }
    }

    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has$1(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
            continue; // eslint-disable-line no-restricted-syntax, no-continue
        } else if ($test.call(/[^\w$]/, key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    if (typeof gOPS === 'function') {
        for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
            }
        }
    }
    return xs;
}

var $TypeError$1 = getIntrinsic('%TypeError%');
var $WeakMap = getIntrinsic('%WeakMap%', true);
var $Map = getIntrinsic('%Map%', true);

var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);
var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $mapGet = callBound('Map.prototype.get', true);
var $mapSet = callBound('Map.prototype.set', true);
var $mapHas = callBound('Map.prototype.has', true);

/*
 * This function traverses the list returning the node corresponding to the
 * given key.
 *
 * That node is also moved to the head of the list, so that if it's accessed
 * again we don't need to traverse the whole list. By doing so, all the recently
 * used nodes can be accessed relatively quickly.
 */
var listGetNode = function (list, key) { // eslint-disable-line consistent-return
	for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
		if (curr.key === key) {
			prev.next = curr.next;
			curr.next = list.next;
			list.next = curr; // eslint-disable-line no-param-reassign
			return curr;
		}
	}
};

var listGet = function (objects, key) {
	var node = listGetNode(objects, key);
	return node && node.value;
};
var listSet = function (objects, key, value) {
	var node = listGetNode(objects, key);
	if (node) {
		node.value = value;
	} else {
		// Prepend the new node to the beginning of the list
		objects.next = { // eslint-disable-line no-param-reassign
			key: key,
			next: objects.next,
			value: value
		};
	}
};
var listHas = function (objects, key) {
	return !!listGetNode(objects, key);
};

var sideChannel = function getSideChannel() {
	var $wm;
	var $m;
	var $o;
	var channel = {
		assert: function (key) {
			if (!channel.has(key)) {
				throw new $TypeError$1('Side channel does not contain ' + objectInspect(key));
			}
		},
		get: function (key) { // eslint-disable-line consistent-return
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapGet($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapGet($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listGet($o, key);
				}
			}
		},
		has: function (key) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapHas($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapHas($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listHas($o, key);
				}
			}
			return false;
		},
		set: function (key, value) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if (!$wm) {
					$wm = new $WeakMap();
				}
				$weakMapSet($wm, key, value);
			} else if ($Map) {
				if (!$m) {
					$m = new $Map();
				}
				$mapSet($m, key, value);
			} else {
				if (!$o) {
					/*
					 * Initialize the linked list as an empty node, so that we don't have
					 * to special-case handling of the first node: we can always refer to
					 * it as (previous node).next, instead of something like (list).head
					 */
					$o = { key: {}, next: null };
				}
				listSet($o, key, value);
			}
		}
	};
	return channel;
};

var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

var formats = {
    'default': Format.RFC3986,
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return String(value);
        }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
};

var has$2 = Object.prototype.hasOwnProperty;
var isArray$1 = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray$1(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray$1(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has$2.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray$1(target) && !isArray$1(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray$1(target) && isArray$1(source)) {
        source.forEach(function (item, i) {
            if (has$2.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has$2.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset, kind, format) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
            || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        /* eslint operator-linebreak: [2, "before"] */
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp$1 = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
    if (isArray$1(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};

var utils = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp$1,
    maybeMap: maybeMap,
    merge: merge
};

var has$3 = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray$2 = Array.isArray;
var split = String.prototype.split;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray$2(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats['default'];
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var sentinel = {};

var stringify = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    commaRoundTrip,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    format,
    formatter,
    encodeValuesOnly,
    charset,
    sideChannel$1
) {
    var obj = object;

    var tmpSc = sideChannel$1;
    var step = 0;
    var findFlag = false;
    while ((tmpSc = tmpSc.get(sentinel)) !== void undefined && !findFlag) {
        // Where object last appeared in the ref tree
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== 'undefined') {
            if (pos === step) {
                throw new RangeError('Cyclic object value');
            } else {
                findFlag = true; // Break while
            }
        }
        if (typeof tmpSc.get(sentinel) === 'undefined') {
            step = 0;
        }
    }

    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray$2(obj)) {
        obj = utils.maybeMap(obj, function (value) {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        });
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
            if (generateArrayPrefix === 'comma' && encodeValuesOnly) {
                var valuesArray = split.call(String(obj), ',');
                var valuesJoined = '';
                for (var i = 0; i < valuesArray.length; ++i) {
                    valuesJoined += (i === 0 ? '' : ',') + formatter(encoder(valuesArray[i], defaults.encoder, charset, 'value', format));
                }
                return [formatter(keyValue) + (commaRoundTrip && isArray$2(obj) && valuesArray.length === 1 ? '[]' : '') + '=' + valuesJoined];
            }
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (generateArrayPrefix === 'comma' && isArray$2(obj)) {
        // we need to join elements in
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : void undefined }];
    } else if (isArray$2(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    var adjustedPrefix = commaRoundTrip && isArray$2(obj) && obj.length === 1 ? prefix + '[]' : prefix;

    for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === 'object' && typeof key.value !== 'undefined' ? key.value : obj[key];

        if (skipNulls && value === null) {
            continue;
        }

        var keyPrefix = isArray$2(obj)
            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(adjustedPrefix, key) : adjustedPrefix
            : adjustedPrefix + (allowDots ? '.' + key : '[' + key + ']');

        sideChannel$1.set(object, step);
        var valueSideChannel = sideChannel();
        valueSideChannel.set(sentinel, sideChannel$1);
        pushToArray(values, stringify(
            value,
            keyPrefix,
            generateArrayPrefix,
            commaRoundTrip,
            strictNullHandling,
            skipNulls,
            encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel
        ));
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && typeof opts.encoder !== 'undefined' && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has$3.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray$2(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        format: format,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

var stringify_1 = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray$2(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
    if (opts && 'commaRoundTrip' in opts && typeof opts.commaRoundTrip !== 'boolean') {
        throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
    }
    var commaRoundTrip = generateArrayPrefix === 'comma' && opts && opts.commaRoundTrip;

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    var sideChannel$1 = sideChannel();
    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            commaRoundTrip,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel$1
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};

var has$4 = Object.prototype.hasOwnProperty;
var isArray$3 = Array.isArray;

var defaults$1 = {
    allowDots: false,
    allowPrototypes: false,
    allowSparse: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults$1.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults$1.decoder, charset, 'key');
            val = utils.maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults$1.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray$3(val) ? [val] : val;
        }

        if (has$4.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else if (cleanRoot !== '__proto__') {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has$4.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has$4.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults$1;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults$1.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults$1.allowPrototypes,
        allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults$1.allowSparse,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults$1.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults$1.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults$1.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults$1.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults$1.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults$1.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults$1.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults$1.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
    };
};

var parse = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    if (options.allowSparse === true) {
        return obj;
    }

    return utils.compact(obj);
};

var lib = {
    formats: formats,
    parse: parse,
    stringify: stringify_1
};

var getAndUnZip = function getAndUnZip(url) {
  return Promise.resolve(get(url)).then(function (zipFileBuffer) {
    var buffer = arrayBufferToBuffer(zipFileBuffer);
    var zip = new AdmZip(buffer);
    var entries = zip.getEntries();
    var zipFiles = [];
    for (var _iterator = _createForOfIteratorHelperLoose(entries), _step; !(_step = _iterator()).done;) {
      var zipEntry = _step.value;
      zipFiles.push({
        src: convertUint8ArrayToBuffer(zipEntry.getData()),
        name: zipEntry.entryName
      });
    }
    return zipFiles;
  });
};
var get = function get(url) {
  try {
    return Promise.resolve(axios.get(url, {
      responseType: 'arraybuffer'
    })).then(function (_ref) {
      var data = _ref.data;
      return data;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var request = axios.create();
var api = function api(options, arrayFormat, accessToken, url) {
  var _extends2;
  if (!options.noAuthentication) {
    if (accessToken) {
      options.headers = _extends({}, options.headers, {
        Authorization: "Bearer " + accessToken
      });
    } else {
      return null;
    }
  }
  options.headers = _extends({}, options.headers, (_extends2 = {}, _extends2['Client-Key'] = process.env.NEXT_PUBLIC_APPLICATION_CLIENT_KEY, _extends2['Accept-Language'] = 'vi', _extends2));
  return request(_extends({
    baseURL: url
  }, options, {
    paramsSerializer: function paramsSerializer(params) {
      return lib.stringify(params, {
        arrayFormat: arrayFormat || 'comma'
      });
    },
    headers: _extends({}, options.headers)
  }));
};
var convertUint8ArrayToBuffer = function convertUint8ArrayToBuffer(array) {
  return URL.createObjectURL(new Blob([array], {
    type: 'image/png'
  }));
};

var LuckyWheelComponent = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(LuckyWheelComponent, _React$Component);
  function LuckyWheelComponent(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.myLucky = React.createRef();
    _this.lucky = undefined;
    _this.state = {
      dataWheel: {},
      listDataImage: []
    };
    return _this;
  }
  var _proto = LuckyWheelComponent.prototype;
  _proto.handleGetWheelData = function handleGetWheelData() {
    try {
      var _this3 = this;
      var _temp2 = _catch(function () {
        return Promise.resolve(api({
          method: 'get',
          url: _this3.props.urlApi
        }, 'comma', _this3.props.authToken)).then(function (response) {
          if (response) {
            var _response$data, _response$data$data, _response$data2, _response$data2$data, _response$data2$data$;
            _this3.setState({
              dataWheel: response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : (_response$data$data = _response$data.data) === null || _response$data$data === void 0 ? void 0 : _response$data$data.lucky_circle_data
            });
            getAndUnZip(response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : (_response$data2$data = _response$data2.data) === null || _response$data2$data === void 0 ? void 0 : (_response$data2$data$ = _response$data2$data.lucky_circle_data) === null || _response$data2$data$ === void 0 ? void 0 : _response$data2$data$.file_zip).then(function (results) {
              return _this3.setState({
                listDataImage: results
              });
            })["catch"](function (_err) {});
          }
        });
      }, function () {});
      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.componentDidMount = function componentDidMount() {
    if (this.lucky) {
      return;
    }
    this.myLucky.current.setAttribute('package', "react-rotation-lucky@v1.1.0");
    try {
      var _this$props3, _this$props4;
      this.initLucky();
      (this === null || this === void 0 ? void 0 : (_this$props3 = this.props) === null || _this$props3 === void 0 ? void 0 : _this$props3.onSuccess) && ((_this$props4 = this.props) === null || _this$props4 === void 0 ? void 0 : _this$props4.onSuccess());
    } catch (err) {
      var _this$props5, _this$props6;
      (this === null || this === void 0 ? void 0 : (_this$props5 = this.props) === null || _this$props5 === void 0 ? void 0 : _this$props5.onError) && (this === null || this === void 0 ? void 0 : (_this$props6 = this.props) === null || _this$props6 === void 0 ? void 0 : _this$props6.onError(err));
    } finally {
      var _this$props7, _this$props8;
      ((_this$props7 = this.props) === null || _this$props7 === void 0 ? void 0 : _this$props7.onFinally) && (this === null || this === void 0 ? void 0 : (_this$props8 = this.props) === null || _this$props8 === void 0 ? void 0 : _this$props8.onFinally());
    }
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (!this.lucky) return;
    if (this.props.width !== prevProps.width) {
      this.lucky.width = this.props.width;
    }
    if (this.props.height !== prevProps.height) {
      this.lucky.height = this.props.height;
    }
    if (this.props.blocks !== prevProps.blocks) {
      this.lucky.blocks = this.props.blocks;
    }
    if (this.props.prizes !== prevProps.prizes) {
      this.lucky.prizes = this.props.prizes;
    }
    if (this.props.buttons !== prevProps.buttons) {
      this.lucky.buttons = this.props.buttons;
    }
  };
  _proto.initLucky = function initLucky() {
    var _this$state$dataWheel,
      _this$state$dataWheel2,
      _this4 = this,
      _this$state$dataWheel3,
      _this$state$dataWheel4,
      _this$state$dataWheel5,
      _this$state$dataWheel6,
      _this$state$dataWheel7,
      _this$state$dataWheel8,
      _this$state$dataWheel9,
      _this$state$dataWheel10,
      _this$state$dataWheel11,
      _this$state$dataWheel12,
      _this$state$dataWheel13,
      _this$state$dataWheel14,
      _this$props9,
      _this$props10;
    var prizes = (_this$state$dataWheel = this.state.dataWheel) === null || _this$state$dataWheel === void 0 ? void 0 : (_this$state$dataWheel2 = _this$state$dataWheel.items) === null || _this$state$dataWheel2 === void 0 ? void 0 : _this$state$dataWheel2.map(function (item) {
      var _this4$state$listData, _this4$state, _this4$state$listData2, _this4$state$listData3;
      return {
        background: item.color_bg,
        imgs: [{
          src: ((_this4$state$listData = _this4.state.listDataImage) === null || _this4$state$listData === void 0 ? void 0 : _this4$state$listData.length) > 0 && ((_this4$state = _this4.state) === null || _this4$state === void 0 ? void 0 : (_this4$state$listData2 = _this4$state.listDataImage) === null || _this4$state$listData2 === void 0 ? void 0 : (_this4$state$listData3 = _this4$state$listData2.find(function (image) {
            return (image === null || image === void 0 ? void 0 : image.name.split('.')[0]) === (item === null || item === void 0 ? void 0 : item.image);
          })) === null || _this4$state$listData3 === void 0 ? void 0 : _this4$state$listData3.src),
          width: '40px',
          height: '40px',
          top: '10%',
          id: item === null || item === void 0 ? void 0 : item.id
        }]
      };
    });
    var buttons = [{
      radius: '40%',
      background: ((_this$state$dataWheel3 = this.state.dataWheel) === null || _this$state$dataWheel3 === void 0 ? void 0 : (_this$state$dataWheel4 = _this$state$dataWheel3.turn_button) === null || _this$state$dataWheel4 === void 0 ? void 0 : _this$state$dataWheel4.background) || '',
      fonts: [{
        fontSize: (_this$state$dataWheel5 = this.state.dataWheel) === null || _this$state$dataWheel5 === void 0 ? void 0 : (_this$state$dataWheel6 = _this$state$dataWheel5.turn_button) === null || _this$state$dataWheel6 === void 0 ? void 0 : _this$state$dataWheel6.font_size,
        fontWeight: (_this$state$dataWheel7 = this.state.dataWheel) === null || _this$state$dataWheel7 === void 0 ? void 0 : (_this$state$dataWheel8 = _this$state$dataWheel7.turn_button) === null || _this$state$dataWheel8 === void 0 ? void 0 : _this$state$dataWheel8.font_weight,
        fontColor: (_this$state$dataWheel9 = this.state.dataWheel) === null || _this$state$dataWheel9 === void 0 ? void 0 : (_this$state$dataWheel10 = _this$state$dataWheel9.turn_button) === null || _this$state$dataWheel10 === void 0 ? void 0 : _this$state$dataWheel10.color_text,
        text: (_this$state$dataWheel11 = this.state.dataWheel) === null || _this$state$dataWheel11 === void 0 ? void 0 : (_this$state$dataWheel12 = _this$state$dataWheel11.turn_button) === null || _this$state$dataWheel12 === void 0 ? void 0 : _this$state$dataWheel12.text
      }]
    }, {
      radius: '50px',
      background: '#d64737'
    }, {
      radius: '45px',
      background: '#fff'
    }, {
      radius: '41px',
      background: '#f6c66f',
      pointer: true
    }, {
      radius: '35px',
      background: '#ffdea0',
      fonts: [{
        text: (_this$state$dataWheel13 = this.state.dataWheel) === null || _this$state$dataWheel13 === void 0 ? void 0 : (_this$state$dataWheel14 = _this$state$dataWheel13.turn_button) === null || _this$state$dataWheel14 === void 0 ? void 0 : _this$state$dataWheel14.text,
        fontSize: '18px',
        top: -15
      }]
    }];
    this.lucky = new LuckyWheel({
      flag: 'WEB',
      divElement: this.myLucky.current
    }, _extends({}, this.props, {
      prizes: (this === null || this === void 0 ? void 0 : (_this$props9 = this.props) === null || _this$props9 === void 0 ? void 0 : _this$props9.prizes) || prizes,
      buttons: ((_this$props10 = this.props) === null || _this$props10 === void 0 ? void 0 : _this$props10.buttons) || buttons,
      start: function start() {
        var _this4$props;
        _this4.props.onStart && (_this4$props = _this4.props).onStart.apply(_this4$props, arguments);
      },
      end: function end() {
        var _this4$props2;
        _this4.props.onEnd && (_this4$props2 = _this4.props).onEnd.apply(_this4$props2, arguments);
      }
    }));
  };
  _proto.init = function init() {
    var _this$lucky;
    (_this$lucky = this.lucky).init.apply(_this$lucky, arguments);
  };
  _proto.play = function play() {
    var _this$lucky2;
    (_this$lucky2 = this.lucky).play.apply(_this$lucky2, arguments);
  };
  _proto.stop = function stop() {
    var _this$lucky3;
    (_this$lucky3 = this.lucky).stop.apply(_this$lucky3, arguments);
  };
  _proto.render = function render() {
    return React.createElement("div", {
      ref: this.myLucky
    });
  };
  return LuckyWheelComponent;
}(React.Component);
LuckyWheel.defaultProps = {
  width: '',
  height: '',
  prizes: [],
  blocks: [],
  buttons: [],
  defaultStyle: {},
  defaultConfig: {}
};

export default LuckyWheelComponent;
//# sourceMappingURL=index.modern.js.map
