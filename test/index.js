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
eval("\r\nvar ua = navigator.userAgent.toLowerCase();\r\nvar isChrome = /(chrome|crios)\\/([\\d.]*)/.test(ua);\r\nvar isBaidu = /baidu/i.test(ua);\r\nvar ios8up = /version\\/(\\d+)(:?.+)mobile(:?.+)safari(:?.+)$/i.test(ua) && RegExp.$1 > 8;\r\nvar isUC = /UCBrowser/i.test(ua);\r\nvar isQQ = /MQQBrowser/i.test(ua);\r\nvar isSafari = !isUC && !isChrome && (/([\\w.]*) safari/).test(ua);\r\nvar isIos = (/like mac os x/i).test(ua);\r\n\r\nvar isAndroid = (!isIos) && ((/android/).test(ua) || (/xiaomi/).test(ua));\r\nvar isRuning = false;\r\nvar isWX = /MicroMessenger/i.test(ua);\r\nvar defalutDelayTime = 1.5 * 1000;\r\nvar errorIde; //普通错误setTimeout id\r\nvar openIde; //window.open的setInterval id\r\n/**\n * 失败异常处理\n */\r\nfunction errorCbHandler(errorCb, delayTime) {\r\n    if (isSafari || (isUC && isIos)) {\r\n        //ios8 以上后台setInterval 确定会被 滞后执行，\r\n        //但是android因为是多线程的所以貌似不行的  uc浏览器也有同样的问题\r\n        //android 浏览器 测试uc\r\n        //总计倒计时2s\r\n        //ios 会弹出来一个确认对话框，因此 多加500 延迟\r\n        var count = Math.floor((delayTime + 500) / 10);\r\n        var tmpCount = count;\r\n        var currentTime = new Date().getTime();\r\n        var ios8UpIde = setInterval(function() {\r\n            count--;\r\n            if (count === 0) {\r\n                clearInterval(ios8UpIde);\r\n                if (new Date().getTime() - currentTime < (tmpCount * 10 + 500)) {\r\n                    errorCb();\r\n                }\r\n                isRuning = false;\r\n            }\r\n        }, 10);\r\n    } else {\r\n        errorIde = setTimeout(function() {\r\n            isRuning = false;\r\n            if (openIde) {\r\n                clearInterval(openIde);\r\n            }\r\n            if (!document.hidden) {\r\n                errorCb();\r\n            }\r\n        }, delayTime);\r\n    }\r\n}\r\n\r\nmodule.exports = {\r\n    open: function(url, errorCb, delayTime) {\r\n\r\n        if (!delayTime) {\r\n            delayTime = defalutDelayTime;\r\n        }\r\n        if (!url) {\r\n            throw new Error('need scheme url');\r\n        }\r\n        if (!errorCb) {\r\n            throw new Error('need error callback');\r\n        }\r\n        if (Object.prototype.toString.call(errorCb) !== '[object Function]') {\r\n            throw new Error('errorCb must be a function!');\r\n        }\r\n        if(isWX){\r\n            errorCb();\r\n        }\r\n        if (isRuning) {\r\n            return;\r\n        }\r\n        isRuning = true;\r\n\r\n        errorCbHandler(errorCb, delayTime);\r\n\r\n        function changeVisibility() {\r\n            if (document.hidden) {\r\n                //执行成功\r\n                clearTimeout(errorIde);\r\n                isRuning = false;\r\n            }\r\n        }\r\n        if (!isSafari && !isUC) {\r\n            //非safari 与uc 用visibilitychange事件\r\n            document.removeEventListener('visibilitychange', changeVisibility, false);\r\n            document.removeEventListener('-webkit-visibilitychange', changeVisibility, false);\r\n            document.addEventListener('visibilitychange', changeVisibility, false);\r\n            document.addEventListener('-webkit-visibilitychange', changeVisibility, false);\r\n        }\r\n\r\n        if ((isChrome && !isBaidu && !isQQ) || ios8up ) {\r\n            var openWin = window.open(url, \"_self\", \"height=1,width=1,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no\");\r\n            openIde = setInterval(function() {\r\n                if ('object' == typeof openWin) {\r\n                    clearInterval(openIde);\r\n                    openWin.close();\r\n                }\r\n            }, 10);\r\n        } else {\r\n            var iframe = document.createElement('iframe');\r\n            iframe.style.display = 'none';\r\n            iframe.src = url;\r\n            document.body.appendChild(iframe);\r\n        }\r\n    }\r\n}\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxudmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG52YXIgaXNDaHJvbWUgPSAvKGNocm9tZXxjcmlvcylcXC8oW1xcZC5dKikvLnRlc3QodWEpO1xyXG52YXIgaXNCYWlkdSA9IC9iYWlkdS9pLnRlc3QodWEpO1xyXG52YXIgaW9zOHVwID0gL3ZlcnNpb25cXC8oXFxkKykoOj8uKyltb2JpbGUoOj8uKylzYWZhcmkoOj8uKykkL2kudGVzdCh1YSkgJiYgUmVnRXhwLiQxID4gODtcclxudmFyIGlzVUMgPSAvVUNCcm93c2VyL2kudGVzdCh1YSk7XHJcbnZhciBpc1FRID0gL01RUUJyb3dzZXIvaS50ZXN0KHVhKTtcclxudmFyIGlzU2FmYXJpID0gIWlzVUMgJiYgIWlzQ2hyb21lICYmICgvKFtcXHcuXSopIHNhZmFyaS8pLnRlc3QodWEpO1xyXG52YXIgaXNJb3MgPSAoL2xpa2UgbWFjIG9zIHgvaSkudGVzdCh1YSk7XHJcblxyXG52YXIgaXNBbmRyb2lkID0gKCFpc0lvcykgJiYgKCgvYW5kcm9pZC8pLnRlc3QodWEpIHx8ICgveGlhb21pLykudGVzdCh1YSkpO1xyXG52YXIgaXNSdW5pbmcgPSBmYWxzZTtcclxudmFyIGlzV1ggPSAvTWljcm9NZXNzZW5nZXIvaS50ZXN0KHVhKTtcclxudmFyIGRlZmFsdXREZWxheVRpbWUgPSAxLjUgKiAxMDAwO1xyXG52YXIgZXJyb3JJZGU7IC8v5pmu6YCa6ZSZ6K+vc2V0VGltZW91dCBpZFxyXG52YXIgb3BlbklkZTsgLy93aW5kb3cub3BlbueahHNldEludGVydmFsIGlkXHJcbi8qKlxuICog5aSx6LSl5byC5bi45aSE55CGXG4gKi9cclxuZnVuY3Rpb24gZXJyb3JDYkhhbmRsZXIoZXJyb3JDYiwgZGVsYXlUaW1lKSB7XHJcbiAgICBpZiAoaXNTYWZhcmkgfHwgKGlzVUMgJiYgaXNJb3MpKSB7XHJcbiAgICAgICAgLy9pb3M4IOS7peS4iuWQjuWPsHNldEludGVydmFsIOehruWumuS8muiiqyDmu57lkI7miafooYzvvIxcclxuICAgICAgICAvL+S9huaYr2FuZHJvaWTlm6DkuLrmmK/lpJrnur/nqIvnmoTmiYDku6XosozkvLzkuI3ooYznmoQgIHVj5rWP6KeI5Zmo5Lmf5pyJ5ZCM5qC355qE6Zeu6aKYXHJcbiAgICAgICAgLy9hbmRyb2lkIOa1j+iniOWZqCDmtYvor5V1Y1xyXG4gICAgICAgIC8v5oC76K6h5YCS6K6h5pe2MnNcclxuICAgICAgICAvL2lvcyDkvJrlvLnlh7rmnaXkuIDkuKrnoa7orqTlr7nor53moYbvvIzlm6DmraQg5aSa5YqgNTAwIOW7tui/n1xyXG4gICAgICAgIHZhciBjb3VudCA9IE1hdGguZmxvb3IoKGRlbGF5VGltZSArIDUwMCkgLyAxMCk7XHJcbiAgICAgICAgdmFyIHRtcENvdW50ID0gY291bnQ7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdmFyIGlvczhVcElkZSA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb3VudC0tO1xyXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW9zOFVwSWRlKTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGN1cnJlbnRUaW1lIDwgKHRtcENvdW50ICogMTAgKyA1MDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JDYigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXNSdW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXJyb3JJZGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpc1J1bmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAob3BlbklkZSkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChvcGVuSWRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmhpZGRlbikge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JDYigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZGVsYXlUaW1lKTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBvcGVuOiBmdW5jdGlvbih1cmwsIGVycm9yQ2IsIGRlbGF5VGltZSkge1xyXG5cclxuICAgICAgICBpZiAoIWRlbGF5VGltZSkge1xyXG4gICAgICAgICAgICBkZWxheVRpbWUgPSBkZWZhbHV0RGVsYXlUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXVybCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25lZWQgc2NoZW1lIHVybCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWVycm9yQ2IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCduZWVkIGVycm9yIGNhbGxiYWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZXJyb3JDYikgIT09ICdbb2JqZWN0IEZ1bmN0aW9uXScpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdlcnJvckNiIG11c3QgYmUgYSBmdW5jdGlvbiEnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNXWCl7XHJcbiAgICAgICAgICAgIGVycm9yQ2IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzUnVuaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXNSdW5pbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICBlcnJvckNiSGFuZGxlcihlcnJvckNiLCBkZWxheVRpbWUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VWaXNpYmlsaXR5KCkge1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuaGlkZGVuKSB7XHJcbiAgICAgICAgICAgICAgICAvL+aJp+ihjOaIkOWKn1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGVycm9ySWRlKTtcclxuICAgICAgICAgICAgICAgIGlzUnVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1NhZmFyaSAmJiAhaXNVQykge1xyXG4gICAgICAgICAgICAvL+mdnnNhZmFyaSDkuI51YyDnlKh2aXNpYmlsaXR5Y2hhbmdl5LqL5Lu2XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBjaGFuZ2VWaXNpYmlsaXR5LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJy13ZWJraXQtdmlzaWJpbGl0eWNoYW5nZScsIGNoYW5nZVZpc2liaWxpdHksIGZhbHNlKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIGNoYW5nZVZpc2liaWxpdHksIGZhbHNlKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignLXdlYmtpdC12aXNpYmlsaXR5Y2hhbmdlJywgY2hhbmdlVmlzaWJpbGl0eSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKChpc0Nocm9tZSAmJiAhaXNCYWlkdSAmJiAhaXNRUSkgfHwgaW9zOHVwICkge1xyXG4gICAgICAgICAgICB2YXIgb3BlbldpbiA9IHdpbmRvdy5vcGVuKHVybCwgXCJfc2VsZlwiLCBcImhlaWdodD0xLHdpZHRoPTEsdG9wPTAsbGVmdD0wLHRvb2xiYXI9bm8sbWVudWJhcj1ubyxzY3JvbGxiYXJzPW5vLCByZXNpemFibGU9bm8sbG9jYXRpb249bm9cIik7XHJcbiAgICAgICAgICAgIG9wZW5JZGUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICgnb2JqZWN0JyA9PSB0eXBlb2Ygb3Blbldpbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwob3BlbklkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3Blbldpbi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xyXG4gICAgICAgICAgICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgaWZyYW1lLnNyYyA9IHVybDtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ })
/******/ ]);
});