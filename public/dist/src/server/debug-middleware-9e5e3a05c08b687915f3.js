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
/******/ 	return __webpack_require__(__webpack_require__.s = 56);
/******/ })
/************************************************************************/
/******/ ({

/***/ 56:
/*!*******************************************************!*\
  !*** ./app/javascript/src/server/debug-middleware.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar MAX_LOG_SIZE = 25;\n\nvar log = [];\n\nfunction debugMiddleware(_ref) {\n  var getState = _ref.getState;\n\n  return function (next) {\n    return function (action) {\n      var result = void 0;\n      var prevState = getState();\n\n      try {\n        result = next(action);\n      } catch (e) {\n        console.log('=============================');\n        console.log(JSON.stringify(addToLog(log, { nextState: getState(), prevState: prevState, action: action })));\n        console.log('=============================');\n        console.log(e.message);\n        console.log(e.stack);\n        console.log('=============================');\n\n        process.exit();\n      }\n\n      var nextState = getState();\n\n      log = addToLog(log, { action: action, prevState: prevState, nextState: nextState });\n\n      return result;\n    };\n  };\n}\n\nfunction addToLog(l, entry) {\n  return [entry].concat(l).slice(0, MAX_LOG_SIZE);\n}\n\nmodule.exports = debugMiddleware;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTYuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvamF2YXNjcmlwdC9zcmMvc2VydmVyL2RlYnVnLW1pZGRsZXdhcmUuanM/M2FhNiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBNQVhfTE9HX1NJWkUgPSAyNTtcblxudmFyIGxvZyA9IFtdO1xuXG5mdW5jdGlvbiBkZWJ1Z01pZGRsZXdhcmUoX3JlZikge1xuICB2YXIgZ2V0U3RhdGUgPSBfcmVmLmdldFN0YXRlO1xuXG4gIHJldHVybiBmdW5jdGlvbiAobmV4dCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gdm9pZCAwO1xuICAgICAgdmFyIHByZXZTdGF0ZSA9IGdldFN0YXRlKCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IG5leHQoYWN0aW9uKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJz09PT09PT09PT09PT09PT09PT09PT09PT09PT09Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFkZFRvTG9nKGxvZywgeyBuZXh0U3RhdGU6IGdldFN0YXRlKCksIHByZXZTdGF0ZTogcHJldlN0YXRlLCBhY3Rpb246IGFjdGlvbiB9KSkpO1xuICAgICAgICBjb25zb2xlLmxvZygnPT09PT09PT09PT09PT09PT09PT09PT09PT09PT0nKTtcbiAgICAgICAgY29uc29sZS5sb2coZS5tZXNzYWdlKTtcbiAgICAgICAgY29uc29sZS5sb2coZS5zdGFjayk7XG4gICAgICAgIGNvbnNvbGUubG9nKCc9PT09PT09PT09PT09PT09PT09PT09PT09PT09PScpO1xuXG4gICAgICAgIHByb2Nlc3MuZXhpdCgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbmV4dFN0YXRlID0gZ2V0U3RhdGUoKTtcblxuICAgICAgbG9nID0gYWRkVG9Mb2cobG9nLCB7IGFjdGlvbjogYWN0aW9uLCBwcmV2U3RhdGU6IHByZXZTdGF0ZSwgbmV4dFN0YXRlOiBuZXh0U3RhdGUgfSk7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYWRkVG9Mb2cobCwgZW50cnkpIHtcbiAgcmV0dXJuIFtlbnRyeV0uY29uY2F0KGwpLnNsaWNlKDAsIE1BWF9MT0dfU0laRSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVidWdNaWRkbGV3YXJlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2phdmFzY3JpcHQvc3JjL3NlcnZlci9kZWJ1Zy1taWRkbGV3YXJlLmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAzIDExIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///56\n");

/***/ })

/******/ });