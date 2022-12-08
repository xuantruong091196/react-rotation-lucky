import React from 'react';

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

var LuckyWheelComponent = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(LuckyWheelComponent, _React$Component);
  function LuckyWheelComponent(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.myLucky = React.createRef();
    _this.lucky = undefined;
    return _this;
  }
  var _proto = LuckyWheelComponent.prototype;
  _proto.componentDidMount = function componentDidMount() {
    if (this.lucky) {
      return;
    }
    this.myLucky.current.setAttribute('package', "react-rotation-lucky@v1.1.0");
    try {
      var _this$props, _this$props2;
      this.initLucky();
      (this === null || this === void 0 ? void 0 : (_this$props = this.props) === null || _this$props === void 0 ? void 0 : _this$props.onSuccess) && ((_this$props2 = this.props) === null || _this$props2 === void 0 ? void 0 : _this$props2.onSuccess());
    } catch (err) {
      var _this$props3, _this$props4;
      (this === null || this === void 0 ? void 0 : (_this$props3 = this.props) === null || _this$props3 === void 0 ? void 0 : _this$props3.onError) && (this === null || this === void 0 ? void 0 : (_this$props4 = this.props) === null || _this$props4 === void 0 ? void 0 : _this$props4.onError(err));
    } finally {
      var _this$props5, _this$props6;
      ((_this$props5 = this.props) === null || _this$props5 === void 0 ? void 0 : _this$props5.onFinally) && (this === null || this === void 0 ? void 0 : (_this$props6 = this.props) === null || _this$props6 === void 0 ? void 0 : _this$props6.onFinally());
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
    var _this2 = this;
    this.lucky = new LuckyWheel({
      flag: 'WEB',
      divElement: this.myLucky.current
    }, _extends({}, this.props, {
      start: function start() {
        var _this2$props;
        _this2.props.onStart && (_this2$props = _this2.props).onStart.apply(_this2$props, arguments);
      },
      end: function end() {
        var _this2$props2;
        _this2.props.onEnd && (_this2$props2 = _this2.props).onEnd.apply(_this2$props2, arguments);
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
