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
eval("\r\nvar ua = navigator.userAgent.toLowerCase();\r\nvar platform = navigator.platform.toLowerCase();\r\nvar isChrome = /(chrome|crios)\\/([\\d.]*)/.test(ua);\r\nvar isBaidu = /baidu/i.test(ua);\r\nvar ios8up = /version\\/(\\d+)(:?.+)mobile(:?.+)safari(:?.+)$/i.test(ua) && RegExp.$1 > 8;\r\nvar isRuning = false;\r\nvar defalutDelayTime = 1.5 * 1000;\r\nmodule.exports = {\r\n    open: function(url, errorCb, delayTime) {\r\n        if(!delayTime){\r\n            delayTime = defalutDelayTime;\r\n        }\r\n        if(!url){\r\n            throw new Error('need scheme url');\r\n        }\r\n        if(!errorCb){\r\n            throw new Error('need error callback');\r\n        }\r\n        if(Object.prototype.toString.call(errorCb) !== '[object Function]'){\r\n            throw new Error('errorCb must be a function!');\r\n        }\r\n\r\n        if (isRuning) {\r\n            return;\r\n        }\r\n        isRuning = true;\r\n        var errorIde = setTimeout(function() {\r\n            isRuning = false;\r\n            errorCb();\r\n        }, delayTime);\r\n\r\n        function changeVisibility() {\r\n            if (document.hidden) {\r\n                //执行成功\r\n                clearTimeout(errorIde);\r\n                isRuning = false;\r\n            }\r\n        }\r\n        document.removeEventListener('visibilitychange', changeVisibility, false);\r\n        document.removeEventListener('-webkit-visibilitychange', changeVisibility, false);\r\n        document.addEventListener('visibilitychange', changeVisibility, false);\r\n        document.addEventListener('-webkit-visibilitychange', changeVisibility, false);\r\n\r\n        if (isChrome && !isBaidu || ios8up) {\r\n            var openWin = window.open(url, \"_self\", \"height=1,width=1,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no\");\r\n            var openIde = setInterval(function() {\r\n                if ('object' == typeof i) {\r\n                    clearInterval(openIde);\r\n                    openIde.close();\r\n                }\r\n            }, 10);\r\n        } else {\r\n            var iframe = document.createElement('iframe');\r\n            iframe.style.display = 'none';\r\n            iframe.src = url;\r\n            document.body.appendChild(iframe);\r\n        }\r\n    }\r\n}\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxudmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG52YXIgcGxhdGZvcm0gPSBuYXZpZ2F0b3IucGxhdGZvcm0udG9Mb3dlckNhc2UoKTtcclxudmFyIGlzQ2hyb21lID0gLyhjaHJvbWV8Y3Jpb3MpXFwvKFtcXGQuXSopLy50ZXN0KHVhKTtcclxudmFyIGlzQmFpZHUgPSAvYmFpZHUvaS50ZXN0KHVhKTtcclxudmFyIGlvczh1cCA9IC92ZXJzaW9uXFwvKFxcZCspKDo/LispbW9iaWxlKDo/Lispc2FmYXJpKDo/LispJC9pLnRlc3QodWEpICYmIFJlZ0V4cC4kMSA+IDg7XHJcbnZhciBpc1J1bmluZyA9IGZhbHNlO1xyXG52YXIgZGVmYWx1dERlbGF5VGltZSA9IDEuNSAqIDEwMDA7XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgb3BlbjogZnVuY3Rpb24odXJsLCBlcnJvckNiLCBkZWxheVRpbWUpIHtcclxuICAgICAgICBpZighZGVsYXlUaW1lKXtcclxuICAgICAgICAgICAgZGVsYXlUaW1lID0gZGVmYWx1dERlbGF5VGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXVybCl7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbmVlZCBzY2hlbWUgdXJsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFlcnJvckNiKXtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCduZWVkIGVycm9yIGNhbGxiYWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlcnJvckNiKSAhPT0gJ1tvYmplY3QgRnVuY3Rpb25dJyl7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZXJyb3JDYiBtdXN0IGJlIGEgZnVuY3Rpb24hJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNSdW5pbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpc1J1bmluZyA9IHRydWU7XHJcbiAgICAgICAgdmFyIGVycm9ySWRlID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaXNSdW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3JDYigpO1xyXG4gICAgICAgIH0sIGRlbGF5VGltZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZVZpc2liaWxpdHkoKSB7XHJcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcclxuICAgICAgICAgICAgICAgIC8v5omn6KGM5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZXJyb3JJZGUpO1xyXG4gICAgICAgICAgICAgICAgaXNSdW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgY2hhbmdlVmlzaWJpbGl0eSwgZmFsc2UpO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJy13ZWJraXQtdmlzaWJpbGl0eWNoYW5nZScsIGNoYW5nZVZpc2liaWxpdHksIGZhbHNlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgY2hhbmdlVmlzaWJpbGl0eSwgZmFsc2UpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJy13ZWJraXQtdmlzaWJpbGl0eWNoYW5nZScsIGNoYW5nZVZpc2liaWxpdHksIGZhbHNlKTtcclxuXHJcbiAgICAgICAgaWYgKGlzQ2hyb21lICYmICFpc0JhaWR1IHx8IGlvczh1cCkge1xyXG4gICAgICAgICAgICB2YXIgb3BlbldpbiA9IHdpbmRvdy5vcGVuKHVybCwgXCJfc2VsZlwiLCBcImhlaWdodD0xLHdpZHRoPTEsdG9wPTAsbGVmdD0wLHRvb2xiYXI9bm8sbWVudWJhcj1ubyxzY3JvbGxiYXJzPW5vLCByZXNpemFibGU9bm8sbG9jYXRpb249bm9cIik7XHJcbiAgICAgICAgICAgIHZhciBvcGVuSWRlID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJ29iamVjdCcgPT0gdHlwZW9mIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKG9wZW5JZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5JZGUuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuICAgICAgICAgICAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGlmcmFtZS5zcmMgPSB1cmw7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ })
/******/ ]);
});