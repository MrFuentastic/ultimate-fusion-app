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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/*!**********************************************!*\
  !*** ./app/javascript/src/server/actions.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar TYPE = {\n  CLIENT_ACTION: 'CLIENT_ACTION',\n  CONNECT: 'CONNECT',\n  DISCONNECT: 'DISCONNECT',\n  RECONNECT: 'RECONNECT',\n  LEAVE_CLUSTER: 'LEAVE_CLUSTER',\n  SWIPE: 'SWIPE',\n  NEXT_STATE: 'NEXT_STATE',\n  CHANGED: 'CHANGED'\n};\n\nfunction connect(id, _ref) {\n  var size = _ref.size;\n\n  return {\n    type: TYPE.CONNECT,\n    data: { id: id, size: size }\n  };\n}\n\nfunction swipe(id, _ref2) {\n  var position = _ref2.position,\n      direction = _ref2.direction;\n\n  return {\n    type: TYPE.SWIPE,\n    data: { id: id, position: position, direction: direction }\n  };\n}\n\nfunction leaveCluster(id) {\n  return {\n    type: TYPE.LEAVE_CLUSTER,\n    data: { id: id }\n  };\n}\n\nfunction disconnect(id) {\n  return {\n    type: TYPE.DISCONNECT,\n    data: { id: id }\n  };\n}\n\nfunction reconnect(id, _ref3) {\n  var size = _ref3.size;\n\n  return {\n    type: TYPE.RECONNECT,\n    data: { id: id, size: size }\n  };\n}\n\nfunction clientAction(id, _ref4) {\n  var type = _ref4.type,\n      data = _ref4.data;\n\n  return {\n    type: TYPE.CLIENT_ACTION,\n    data: { id: id, type: type, data: data }\n  };\n}\n\nfunction nextState() {\n  return {\n    type: TYPE.NEXT_STATE,\n    data: {}\n  };\n}\n\nmodule.exports = {\n  TYPE: TYPE,\n  connect: connect,\n  swipe: swipe,\n  leaveCluster: leaveCluster,\n  disconnect: disconnect,\n  reconnect: reconnect,\n  clientAction: clientAction,\n  nextState: nextState\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvamF2YXNjcmlwdC9zcmMvc2VydmVyL2FjdGlvbnMuanM/NDM2YSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBUWVBFID0ge1xuICBDTElFTlRfQUNUSU9OOiAnQ0xJRU5UX0FDVElPTicsXG4gIENPTk5FQ1Q6ICdDT05ORUNUJyxcbiAgRElTQ09OTkVDVDogJ0RJU0NPTk5FQ1QnLFxuICBSRUNPTk5FQ1Q6ICdSRUNPTk5FQ1QnLFxuICBMRUFWRV9DTFVTVEVSOiAnTEVBVkVfQ0xVU1RFUicsXG4gIFNXSVBFOiAnU1dJUEUnLFxuICBORVhUX1NUQVRFOiAnTkVYVF9TVEFURScsXG4gIENIQU5HRUQ6ICdDSEFOR0VEJ1xufTtcblxuZnVuY3Rpb24gY29ubmVjdChpZCwgX3JlZikge1xuICB2YXIgc2l6ZSA9IF9yZWYuc2l6ZTtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6IFRZUEUuQ09OTkVDVCxcbiAgICBkYXRhOiB7IGlkOiBpZCwgc2l6ZTogc2l6ZSB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN3aXBlKGlkLCBfcmVmMikge1xuICB2YXIgcG9zaXRpb24gPSBfcmVmMi5wb3NpdGlvbixcbiAgICAgIGRpcmVjdGlvbiA9IF9yZWYyLmRpcmVjdGlvbjtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6IFRZUEUuU1dJUEUsXG4gICAgZGF0YTogeyBpZDogaWQsIHBvc2l0aW9uOiBwb3NpdGlvbiwgZGlyZWN0aW9uOiBkaXJlY3Rpb24gfVxuICB9O1xufVxuXG5mdW5jdGlvbiBsZWF2ZUNsdXN0ZXIoaWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBUWVBFLkxFQVZFX0NMVVNURVIsXG4gICAgZGF0YTogeyBpZDogaWQgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBkaXNjb25uZWN0KGlkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogVFlQRS5ESVNDT05ORUNULFxuICAgIGRhdGE6IHsgaWQ6IGlkIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVjb25uZWN0KGlkLCBfcmVmMykge1xuICB2YXIgc2l6ZSA9IF9yZWYzLnNpemU7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBUWVBFLlJFQ09OTkVDVCxcbiAgICBkYXRhOiB7IGlkOiBpZCwgc2l6ZTogc2l6ZSB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNsaWVudEFjdGlvbihpZCwgX3JlZjQpIHtcbiAgdmFyIHR5cGUgPSBfcmVmNC50eXBlLFxuICAgICAgZGF0YSA9IF9yZWY0LmRhdGE7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBUWVBFLkNMSUVOVF9BQ1RJT04sXG4gICAgZGF0YTogeyBpZDogaWQsIHR5cGU6IHR5cGUsIGRhdGE6IGRhdGEgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBuZXh0U3RhdGUoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogVFlQRS5ORVhUX1NUQVRFLFxuICAgIGRhdGE6IHt9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBUWVBFOiBUWVBFLFxuICBjb25uZWN0OiBjb25uZWN0LFxuICBzd2lwZTogc3dpcGUsXG4gIGxlYXZlQ2x1c3RlcjogbGVhdmVDbHVzdGVyLFxuICBkaXNjb25uZWN0OiBkaXNjb25uZWN0LFxuICByZWNvbm5lY3Q6IHJlY29ubmVjdCxcbiAgY2xpZW50QWN0aW9uOiBjbGllbnRBY3Rpb24sXG4gIG5leHRTdGF0ZTogbmV4dFN0YXRlXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2phdmFzY3JpcHQvc3JjL3NlcnZlci9hY3Rpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNSAxMiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///13\n");

/***/ })

/******/ });