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
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
/******/ })
/************************************************************************/
/******/ ({

/***/ 58:
/*!*********************************************!*\
  !*** ./app/javascript/src/client/sensor.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/* global window screen */\n\nvar MIN_SWIPE_DIST = 5;\nvar MOTION_TOLERANCE = 15;\nvar startPoints = {};\n\nfunction onSwipe(element, callback) {\n  element.addEventListener('touchmove', touchMoveHandler);\n\n  element.addEventListener('touchstart', touchStartHandler);\n\n  element.addEventListener('touchend', function (evt) {\n    return touchEndHandler(evt, callback);\n  });\n}\n\nfunction touchStartHandler(evt) {\n  Array.prototype.slice.apply(evt.changedTouches).forEach(function (touch) {\n    startPoints[touch.identifier] = {\n      x: touch.clientX,\n      y: touch.clientY\n    };\n  });\n}\n\nfunction touchMoveHandler(evt) {\n  evt.preventDefault();\n}\n\nfunction touchEndHandler(evt, callback) {\n  Array.prototype.slice.apply(evt.changedTouches).forEach(function (touch) {\n    var start = startPoints[touch.identifier];\n    var end = {\n      x: touch.clientX,\n      y: touch.clientY\n    };\n\n    var diffX = Math.abs(end.x - start.x);\n    var diffY = Math.abs(end.y - start.y);\n\n    var vertBorder = window.innerHeight / 10;\n    var horBorder = window.innerWidth / 10;\n\n    if (diffX > diffY && diffX > MIN_SWIPE_DIST) {\n      if (end.x < start.x && end.x <= horBorder) {\n        callback({ direction: 'LEFT', position: { x: 0, y: end.y } });\n      } else if (end.x > start.x && end.x >= window.innerWidth - horBorder) {\n        callback({ direction: 'RIGHT', position: { x: window.innerWidth, y: end.y } });\n      }\n    } else if (diffY > diffX && diffY > MIN_SWIPE_DIST) {\n      if (end.y < start.y && end.y <= vertBorder) {\n        callback({ direction: 'UP', position: { x: end.x, y: 0 } });\n      } else if (end.y > start.y && end.y >= window.innerHeight - vertBorder) {\n        callback({ direction: 'DOWN', position: { x: end.x, y: window.innerHeight } });\n      }\n    }\n  });\n}\n\nfunction onMove(callback) {\n  window.addEventListener('devicemotion', function (evt) {\n    var x = evt.acceleration.x;\n    var y = evt.acceleration.y;\n    var z = evt.acceleration.z;\n\n    var max = Math.max(z, x, y);\n\n    if (max > MOTION_TOLERANCE) {\n      callback();\n    }\n  });\n}\n\nfunction onChangeOrientation(callback) {\n  var prevBeta = null;\n  var prevGamma = null;\n\n  window.addEventListener('deviceorientation', function (evt) {\n    var beta = Math.round(evt.beta);\n    var gamma = Math.round(evt.gamma);\n\n    if (beta !== prevBeta || gamma !== prevGamma) {\n      var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;\n      var rotation = getRotation({ orientation: orientation, beta: beta, gamma: gamma });\n\n      callback({ rotation: rotation });\n    }\n\n    prevBeta = beta;\n    prevGamma = gamma;\n  });\n}\n\nfunction getRotation(_ref) {\n  var orientation = _ref.orientation,\n      beta = _ref.beta,\n      gamma = _ref.gamma;\n\n  switch (orientation.type) {\n    case 'portrait-primary':\n      return { x: gamma, y: beta };\n\n    case 'portrait-secondary':\n      return { x: gamma, y: beta };\n\n    case 'landscape-primary':\n      return { x: beta, y: -gamma };\n\n    case 'landscape-secondary':\n      return { x: -beta, y: gamma };\n\n    default:\n      return { x: 0, y: 0 };\n  }\n}\n\nexports.default = {\n  onSwipe: onSwipe,\n  onMove: onMove,\n  onChangeOrientation: onChangeOrientation\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvamF2YXNjcmlwdC9zcmMvY2xpZW50L3NlbnNvci5qcz84MTViIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8qIGdsb2JhbCB3aW5kb3cgc2NyZWVuICovXG5cbnZhciBNSU5fU1dJUEVfRElTVCA9IDU7XG52YXIgTU9USU9OX1RPTEVSQU5DRSA9IDE1O1xudmFyIHN0YXJ0UG9pbnRzID0ge307XG5cbmZ1bmN0aW9uIG9uU3dpcGUoZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaE1vdmVIYW5kbGVyKTtcblxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaFN0YXJ0SGFuZGxlcik7XG5cbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uIChldnQpIHtcbiAgICByZXR1cm4gdG91Y2hFbmRIYW5kbGVyKGV2dCwgY2FsbGJhY2spO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdG91Y2hTdGFydEhhbmRsZXIoZXZ0KSB7XG4gIEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShldnQuY2hhbmdlZFRvdWNoZXMpLmZvckVhY2goZnVuY3Rpb24gKHRvdWNoKSB7XG4gICAgc3RhcnRQb2ludHNbdG91Y2guaWRlbnRpZmllcl0gPSB7XG4gICAgICB4OiB0b3VjaC5jbGllbnRYLFxuICAgICAgeTogdG91Y2guY2xpZW50WVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB0b3VjaE1vdmVIYW5kbGVyKGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gdG91Y2hFbmRIYW5kbGVyKGV2dCwgY2FsbGJhY2spIHtcbiAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGV2dC5jaGFuZ2VkVG91Y2hlcykuZm9yRWFjaChmdW5jdGlvbiAodG91Y2gpIHtcbiAgICB2YXIgc3RhcnQgPSBzdGFydFBvaW50c1t0b3VjaC5pZGVudGlmaWVyXTtcbiAgICB2YXIgZW5kID0ge1xuICAgICAgeDogdG91Y2guY2xpZW50WCxcbiAgICAgIHk6IHRvdWNoLmNsaWVudFlcbiAgICB9O1xuXG4gICAgdmFyIGRpZmZYID0gTWF0aC5hYnMoZW5kLnggLSBzdGFydC54KTtcbiAgICB2YXIgZGlmZlkgPSBNYXRoLmFicyhlbmQueSAtIHN0YXJ0LnkpO1xuXG4gICAgdmFyIHZlcnRCb3JkZXIgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAxMDtcbiAgICB2YXIgaG9yQm9yZGVyID0gd2luZG93LmlubmVyV2lkdGggLyAxMDtcblxuICAgIGlmIChkaWZmWCA+IGRpZmZZICYmIGRpZmZYID4gTUlOX1NXSVBFX0RJU1QpIHtcbiAgICAgIGlmIChlbmQueCA8IHN0YXJ0LnggJiYgZW5kLnggPD0gaG9yQm9yZGVyKSB7XG4gICAgICAgIGNhbGxiYWNrKHsgZGlyZWN0aW9uOiAnTEVGVCcsIHBvc2l0aW9uOiB7IHg6IDAsIHk6IGVuZC55IH0gfSk7XG4gICAgICB9IGVsc2UgaWYgKGVuZC54ID4gc3RhcnQueCAmJiBlbmQueCA+PSB3aW5kb3cuaW5uZXJXaWR0aCAtIGhvckJvcmRlcikge1xuICAgICAgICBjYWxsYmFjayh7IGRpcmVjdGlvbjogJ1JJR0hUJywgcG9zaXRpb246IHsgeDogd2luZG93LmlubmVyV2lkdGgsIHk6IGVuZC55IH0gfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkaWZmWSA+IGRpZmZYICYmIGRpZmZZID4gTUlOX1NXSVBFX0RJU1QpIHtcbiAgICAgIGlmIChlbmQueSA8IHN0YXJ0LnkgJiYgZW5kLnkgPD0gdmVydEJvcmRlcikge1xuICAgICAgICBjYWxsYmFjayh7IGRpcmVjdGlvbjogJ1VQJywgcG9zaXRpb246IHsgeDogZW5kLngsIHk6IDAgfSB9KTtcbiAgICAgIH0gZWxzZSBpZiAoZW5kLnkgPiBzdGFydC55ICYmIGVuZC55ID49IHdpbmRvdy5pbm5lckhlaWdodCAtIHZlcnRCb3JkZXIpIHtcbiAgICAgICAgY2FsbGJhY2soeyBkaXJlY3Rpb246ICdET1dOJywgcG9zaXRpb246IHsgeDogZW5kLngsIHk6IHdpbmRvdy5pbm5lckhlaWdodCB9IH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uTW92ZShjYWxsYmFjaykge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlbW90aW9uJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIHZhciB4ID0gZXZ0LmFjY2VsZXJhdGlvbi54O1xuICAgIHZhciB5ID0gZXZ0LmFjY2VsZXJhdGlvbi55O1xuICAgIHZhciB6ID0gZXZ0LmFjY2VsZXJhdGlvbi56O1xuXG4gICAgdmFyIG1heCA9IE1hdGgubWF4KHosIHgsIHkpO1xuXG4gICAgaWYgKG1heCA+IE1PVElPTl9UT0xFUkFOQ0UpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gb25DaGFuZ2VPcmllbnRhdGlvbihjYWxsYmFjaykge1xuICB2YXIgcHJldkJldGEgPSBudWxsO1xuICB2YXIgcHJldkdhbW1hID0gbnVsbDtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgdmFyIGJldGEgPSBNYXRoLnJvdW5kKGV2dC5iZXRhKTtcbiAgICB2YXIgZ2FtbWEgPSBNYXRoLnJvdW5kKGV2dC5nYW1tYSk7XG5cbiAgICBpZiAoYmV0YSAhPT0gcHJldkJldGEgfHwgZ2FtbWEgIT09IHByZXZHYW1tYSkge1xuICAgICAgdmFyIG9yaWVudGF0aW9uID0gc2NyZWVuLm9yaWVudGF0aW9uIHx8IHNjcmVlbi5tb3pPcmllbnRhdGlvbiB8fCBzY3JlZW4ubXNPcmllbnRhdGlvbjtcbiAgICAgIHZhciByb3RhdGlvbiA9IGdldFJvdGF0aW9uKHsgb3JpZW50YXRpb246IG9yaWVudGF0aW9uLCBiZXRhOiBiZXRhLCBnYW1tYTogZ2FtbWEgfSk7XG5cbiAgICAgIGNhbGxiYWNrKHsgcm90YXRpb246IHJvdGF0aW9uIH0pO1xuICAgIH1cblxuICAgIHByZXZCZXRhID0gYmV0YTtcbiAgICBwcmV2R2FtbWEgPSBnYW1tYTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFJvdGF0aW9uKF9yZWYpIHtcbiAgdmFyIG9yaWVudGF0aW9uID0gX3JlZi5vcmllbnRhdGlvbixcbiAgICAgIGJldGEgPSBfcmVmLmJldGEsXG4gICAgICBnYW1tYSA9IF9yZWYuZ2FtbWE7XG5cbiAgc3dpdGNoIChvcmllbnRhdGlvbi50eXBlKSB7XG4gICAgY2FzZSAncG9ydHJhaXQtcHJpbWFyeSc6XG4gICAgICByZXR1cm4geyB4OiBnYW1tYSwgeTogYmV0YSB9O1xuXG4gICAgY2FzZSAncG9ydHJhaXQtc2Vjb25kYXJ5JzpcbiAgICAgIHJldHVybiB7IHg6IGdhbW1hLCB5OiBiZXRhIH07XG5cbiAgICBjYXNlICdsYW5kc2NhcGUtcHJpbWFyeSc6XG4gICAgICByZXR1cm4geyB4OiBiZXRhLCB5OiAtZ2FtbWEgfTtcblxuICAgIGNhc2UgJ2xhbmRzY2FwZS1zZWNvbmRhcnknOlxuICAgICAgcmV0dXJuIHsgeDogLWJldGEsIHk6IGdhbW1hIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHsgeDogMCwgeTogMCB9O1xuICB9XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgb25Td2lwZTogb25Td2lwZSxcbiAgb25Nb3ZlOiBvbk1vdmUsXG4gIG9uQ2hhbmdlT3JpZW50YXRpb246IG9uQ2hhbmdlT3JpZW50YXRpb25cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvamF2YXNjcmlwdC9zcmMvY2xpZW50L3NlbnNvci5qc1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSA2IDcgMTMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///58\n");

/***/ })

/******/ });