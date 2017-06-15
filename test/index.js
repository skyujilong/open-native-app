(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["openApp"] = factory();
	else
		root["openApp"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* no static exports found */
/* all exports used */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar ua = navigator.userAgent.toLowerCase();\r\nvar platform = navigator.platform.toLowerCase();\r\nvar isChrome = /(chrome|crios)\\/([\\d.]*)/.test(ua);\r\nvar isBaidu = /baidu/i.test(ua);\r\nvar ios8up = /version\\/(\\d+)(:?.+)mobile(:?.+)safari(:?.+)$/i.test(ua) && RegExp.$1 > 8;\r\n\r\nmodule.exports = {\r\n    open: function(url) {\r\n        if (isChrome && !isBaidu || ios8up) {\r\n            var openWin =  window.open(url, \"_self\", \"height=1,width=1,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no\");\r\n            var openIde = setInterval(function(){\r\n                if('object' == typeof i){\r\n                    clearInterval(openIde);\r\n                    openIde.close();\r\n                }\r\n            },10);\r\n        } else {\r\n            var iframe = document.createElement('iframe');\r\n            iframe.style.display = 'none';\r\n            iframe.src = url;\r\n            document.body.appendChild(iframe);\r\n        }\r\n    }\r\n}\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxudmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG52YXIgcGxhdGZvcm0gPSBuYXZpZ2F0b3IucGxhdGZvcm0udG9Mb3dlckNhc2UoKTtcclxudmFyIGlzQ2hyb21lID0gLyhjaHJvbWV8Y3Jpb3MpXFwvKFtcXGQuXSopLy50ZXN0KHVhKTtcclxudmFyIGlzQmFpZHUgPSAvYmFpZHUvaS50ZXN0KHVhKTtcclxudmFyIGlvczh1cCA9IC92ZXJzaW9uXFwvKFxcZCspKDo/LispbW9iaWxlKDo/Lispc2FmYXJpKDo/LispJC9pLnRlc3QodWEpICYmIFJlZ0V4cC4kMSA+IDg7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG9wZW46IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICAgIGlmIChpc0Nocm9tZSAmJiAhaXNCYWlkdSB8fCBpb3M4dXApIHtcclxuICAgICAgICAgICAgdmFyIG9wZW5XaW4gPSAgd2luZG93Lm9wZW4odXJsLCBcIl9zZWxmXCIsIFwiaGVpZ2h0PTEsd2lkdGg9MSx0b3A9MCxsZWZ0PTAsdG9vbGJhcj1ubyxtZW51YmFyPW5vLHNjcm9sbGJhcnM9bm8sIHJlc2l6YWJsZT1ubyxsb2NhdGlvbj1ub1wiKTtcclxuICAgICAgICAgICAgdmFyIG9wZW5JZGUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYoJ29iamVjdCcgPT0gdHlwZW9mIGkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwob3BlbklkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbklkZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LDEwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcbiAgICAgICAgICAgIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBpZnJhbWUuc3JjID0gdXJsO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ })
/******/ ]);
});