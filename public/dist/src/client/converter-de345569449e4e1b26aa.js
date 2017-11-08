/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 112);
/******/ })
/************************************************************************/
/******/ ({

/***/ 112:
/*!************************************************!*\
  !*** ./app/javascript/src/client/converter.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n  };\n}();\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\n/* global localStorage document screen window */\nvar SIZE_REFERENCE = 60;\n\nvar Converter = function () {\n  function Converter(screenSize) {\n    _classCallCheck(this, Converter);\n\n    this.screenSize = screenSize;\n    this.scalingFactor = getScalingFactor(screenSize);\n  }\n\n  _createClass(Converter, [{\n    key: \"toDevicePixel\",\n    value: function toDevicePixel(value) {\n      return value / this.scalingFactor;\n    }\n  }, {\n    key: \"toAbsPixel\",\n    value: function toAbsPixel(value) {\n      return value * this.scalingFactor;\n    }\n  }, {\n    key: \"convertClickPos\",\n    value: function convertClickPos(transform, evt) {\n      return {\n        position: {\n          x: this.toAbsPixel(evt.clientX) + transform.x,\n          y: this.toAbsPixel(evt.clientY) + transform.y\n        },\n        originalEvent: evt\n      };\n    }\n  }, {\n    key: \"convertTouchPos\",\n    value: function convertTouchPos(transform, evt) {\n      var event = {\n        position: [],\n        originalEvent: evt\n      };\n\n      for (var i = 0; i < evt.changedTouches.length; i++) {\n        var currTouched = evt.changedTouches[i];\n\n        event.position.push({\n          x: this.toAbsPixel(currTouched.clientX) + transform.x,\n          y: this.toAbsPixel(currTouched.clientY) + transform.y\n        });\n      }\n\n      return event;\n    }\n  }]);\n\n  return Converter;\n}();\n\nfunction getScalingFactor(screenSize) {\n  var diagonalPixel = Math.sqrt(Math.pow(screen.height, 2) + Math.pow(screen.width, 2));\n  var diagonalScreenCM = screenSize * 2.54;\n  var pixelPerCentimeter = diagonalPixel / diagonalScreenCM;\n\n  return SIZE_REFERENCE / pixelPerCentimeter;\n}\n\nexports.default = Converter;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTEyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL2phdmFzY3JpcHQvc3JjL2NsaWVudC9jb252ZXJ0ZXIuanM/YzYyZSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7ZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO2lmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfXJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtyZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbi8qIGdsb2JhbCBsb2NhbFN0b3JhZ2UgZG9jdW1lbnQgc2NyZWVuIHdpbmRvdyAqL1xudmFyIFNJWkVfUkVGRVJFTkNFID0gNjA7XG5cbnZhciBDb252ZXJ0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENvbnZlcnRlcihzY3JlZW5TaXplKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbnZlcnRlcik7XG5cbiAgICB0aGlzLnNjcmVlblNpemUgPSBzY3JlZW5TaXplO1xuICAgIHRoaXMuc2NhbGluZ0ZhY3RvciA9IGdldFNjYWxpbmdGYWN0b3Ioc2NyZWVuU2l6ZSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQ29udmVydGVyLCBbe1xuICAgIGtleTogXCJ0b0RldmljZVBpeGVsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvRGV2aWNlUGl4ZWwodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSAvIHRoaXMuc2NhbGluZ0ZhY3RvcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidG9BYnNQaXhlbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b0Fic1BpeGVsKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgKiB0aGlzLnNjYWxpbmdGYWN0b3I7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbnZlcnRDbGlja1Bvc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb252ZXJ0Q2xpY2tQb3ModHJhbnNmb3JtLCBldnQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgeDogdGhpcy50b0Fic1BpeGVsKGV2dC5jbGllbnRYKSArIHRyYW5zZm9ybS54LFxuICAgICAgICAgIHk6IHRoaXMudG9BYnNQaXhlbChldnQuY2xpZW50WSkgKyB0cmFuc2Zvcm0ueVxuICAgICAgICB9LFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnRcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbnZlcnRUb3VjaFBvc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb252ZXJ0VG91Y2hQb3ModHJhbnNmb3JtLCBldnQpIHtcbiAgICAgIHZhciBldmVudCA9IHtcbiAgICAgICAgcG9zaXRpb246IFtdLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnRcbiAgICAgIH07XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZ0LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjdXJyVG91Y2hlZCA9IGV2dC5jaGFuZ2VkVG91Y2hlc1tpXTtcblxuICAgICAgICBldmVudC5wb3NpdGlvbi5wdXNoKHtcbiAgICAgICAgICB4OiB0aGlzLnRvQWJzUGl4ZWwoY3VyclRvdWNoZWQuY2xpZW50WCkgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgICB5OiB0aGlzLnRvQWJzUGl4ZWwoY3VyclRvdWNoZWQuY2xpZW50WSkgKyB0cmFuc2Zvcm0ueVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBDb252ZXJ0ZXI7XG59KCk7XG5cbmZ1bmN0aW9uIGdldFNjYWxpbmdGYWN0b3Ioc2NyZWVuU2l6ZSkge1xuICB2YXIgZGlhZ29uYWxQaXhlbCA9IE1hdGguc3FydChNYXRoLnBvdyhzY3JlZW4uaGVpZ2h0LCAyKSArIE1hdGgucG93KHNjcmVlbi53aWR0aCwgMikpO1xuICB2YXIgZGlhZ29uYWxTY3JlZW5DTSA9IHNjcmVlblNpemUgKiAyLjU0O1xuICB2YXIgcGl4ZWxQZXJDZW50aW1ldGVyID0gZGlhZ29uYWxQaXhlbCAvIGRpYWdvbmFsU2NyZWVuQ007XG5cbiAgcmV0dXJuIFNJWkVfUkVGRVJFTkNFIC8gcGl4ZWxQZXJDZW50aW1ldGVyO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBDb252ZXJ0ZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvamF2YXNjcmlwdC9zcmMvY2xpZW50L2NvbnZlcnRlci5qc1xuLy8gbW9kdWxlIGlkID0gMTEyXG4vLyBtb2R1bGUgY2h1bmtzID0gNiA3IDE1Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///112\n");

/***/ })

/******/ });