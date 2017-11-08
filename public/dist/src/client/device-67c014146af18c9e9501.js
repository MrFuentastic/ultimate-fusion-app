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
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
/******/ })
/************************************************************************/
/******/ ({

/***/ 57:
/*!*********************************************!*\
  !*** ./app/javascript/src/client/device.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/* global localStorage prompt document */\n\nvar DEVICE_SIZE_KEY = 'SWIP_DEVICE_SIZE';\n\nfunction requestSize() {\n  var storedSize = parseFloat(localStorage.getItem(DEVICE_SIZE_KEY));\n\n  if (!Number.isNaN(storedSize)) {\n    return storedSize;\n  }\n\n  /* eslint-disable no-alert */\n  var inputSize = parseFloat(prompt('Please enter the device size in \"(inch): '));\n  /* eslint-enable no-alert */\n\n  if (!Number.isNaN(inputSize)) {\n    localStorage.setItem(DEVICE_SIZE_KEY, inputSize);\n  }\n\n  return inputSize;\n}\n\nfunction requestFullscreen(element) {\n  if (element.requestFullscreen) {\n    element.requestFullscreen();\n  } else if (element.mozRequestFullScreen) {\n    element.mozRequestFullScreen();\n  } else if (element.webkitRequestFullscreen) {\n    element.webkitRequestFullscreen();\n  } else if (element.msRequestFullscreen) {\n    element.msRequestFullscreen();\n  }\n}\n\nfunction hasFullscreenSupport() {\n  var element = document.documentElement;\n\n  return element.requestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen || element.msRequestFullscreen;\n}\n\nexports.default = {\n  requestSize: requestSize,\n  requestFullscreen: requestFullscreen,\n  hasFullscreenSupport: hasFullscreenSupport\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTcuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvamF2YXNjcmlwdC9zcmMvY2xpZW50L2RldmljZS5qcz8yMjFhIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8qIGdsb2JhbCBsb2NhbFN0b3JhZ2UgcHJvbXB0IGRvY3VtZW50ICovXG5cbnZhciBERVZJQ0VfU0laRV9LRVkgPSAnU1dJUF9ERVZJQ0VfU0laRSc7XG5cbmZ1bmN0aW9uIHJlcXVlc3RTaXplKCkge1xuICB2YXIgc3RvcmVkU2l6ZSA9IHBhcnNlRmxvYXQobG9jYWxTdG9yYWdlLmdldEl0ZW0oREVWSUNFX1NJWkVfS0VZKSk7XG5cbiAgaWYgKCFOdW1iZXIuaXNOYU4oc3RvcmVkU2l6ZSkpIHtcbiAgICByZXR1cm4gc3RvcmVkU2l6ZTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWFsZXJ0ICovXG4gIHZhciBpbnB1dFNpemUgPSBwYXJzZUZsb2F0KHByb21wdCgnUGxlYXNlIGVudGVyIHRoZSBkZXZpY2Ugc2l6ZSBpbiBcIihpbmNoKTogJykpO1xuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWFsZXJ0ICovXG5cbiAgaWYgKCFOdW1iZXIuaXNOYU4oaW5wdXRTaXplKSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKERFVklDRV9TSVpFX0tFWSwgaW5wdXRTaXplKTtcbiAgfVxuXG4gIHJldHVybiBpbnB1dFNpemU7XG59XG5cbmZ1bmN0aW9uIHJlcXVlc3RGdWxsc2NyZWVuKGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICBlbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gIH0gZWxzZSBpZiAoZWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgIGVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgfSBlbHNlIGlmIChlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICB9IGVsc2UgaWYgKGVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgIGVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhc0Z1bGxzY3JlZW5TdXBwb3J0KCkge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICByZXR1cm4gZWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbiB8fCBlbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuIHx8IGVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4gfHwgZWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIHJlcXVlc3RTaXplOiByZXF1ZXN0U2l6ZSxcbiAgcmVxdWVzdEZ1bGxzY3JlZW46IHJlcXVlc3RGdWxsc2NyZWVuLFxuICBoYXNGdWxsc2NyZWVuU3VwcG9ydDogaGFzRnVsbHNjcmVlblN1cHBvcnRcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvamF2YXNjcmlwdC9zcmMvY2xpZW50L2RldmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSA2IDcgMTQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///57\n");

/***/ })

/******/ });