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
eval("\nvar ua = navigator.userAgent.toLowerCase();\nvar isChrome = /(chrome|crios)\\/([\\d.]*)/.test(ua);\n// var isBaidu = /baidu/i.test(ua);\nvar ios8up = /version\\/(\\d+)(:?.+)mobile(:?.+)safari(:?.+)$/i.test(ua) && RegExp.$1 > 8 || /cpu\\s*iphone\\s*os\\s*(\\d+)/i.test(ua) && RegExp.$1 > 8;\n//CPU iPhone OS 11_0 like Mac OS X\nvar isUC = /UCBrowser/i.test(ua);\nvar isQQ = /MQQBrowser/i.test(ua);\nvar isSafari = !isUC && !isChrome && (/([\\w.]*) safari/).test(ua);\nvar isIos = (/like mac os x/i).test(ua);\n\nvar isAndroid = (!isIos) && ((/android/).test(ua) || (/xiaomi/).test(ua));\nvar isRuning = false;\nvar isWX = /MicroMessenger/i.test(ua);\nvar defalutDelayTime = 1.5 * 1000;\nvar errorIde; //普通错误setTimeout id\n/**\n * 失败异常处理\n */\nfunction errorCbHandler(errorCb, delayTime) {\n    //uc现在打不开了\n    if(isUC){\n        isRuning = false;\n        errorCb();\n    }else if (isSafari) {\n        //ios8 以上后台setInterval 确定会被 滞后执行，\n        //但是android因为是多线程的所以貌似不行的  uc浏览器也有同样的问题\n        //android 浏览器 测试uc\n        //总计倒计时2s\n        //ios 会弹出来一个确认对话框，因此 多加500 延迟\n        var count = Math.floor((delayTime + 500) / 10);\n        var tmpCount = count;\n        var currentTime = new Date().getTime();\n        var ios8UpIde = setInterval(function() {\n            count--;\n            if (count === 0) {\n                clearInterval(ios8UpIde);\n                if (new Date().getTime() - currentTime < (tmpCount * 10 + 500)) {\n                    errorCb();\n                }\n                isRuning = false;\n            }\n        }, 10);\n    } else {\n        errorIde = setTimeout(function() {\n            isRuning = false;\n            if (!document.hidden) {\n                errorCb();\n            }\n        }, delayTime);\n    }\n}\n\nmodule.exports = {\n    open: function (url, wxCb, errorCb, delayTime) {\n\n        if (!delayTime) {\n            delayTime = defalutDelayTime;\n        }\n        if (!url) {\n            throw new Error('need scheme url');\n        }\n        if (!errorCb) {\n            throw new Error('need error callback');\n        }\n        if (!wxCb){\n            throw new Error('need wxCb callback');\n        }\n\n        if (Object.prototype.toString.call(errorCb) !== '[object Function]') {\n            throw new Error('errorCb must be a function!');\n        }\n        if (isWX) {\n            var code = '';\n            code = isIos ? 'ios' : 'android';\n            wxCb(code);\n            return;\n        }\n        if (isRuning) {\n            return;\n        }\n        isRuning = true;\n\n        errorCbHandler(errorCb, delayTime);\n\n        function changeVisibility() {\n            if (document.hidden) {\n                //执行成功\n                clearTimeout(errorIde);\n                isRuning = false;\n            }\n        }\n        if (!isSafari && !isUC) {\n            //非safari 与uc 用visibilitychange事件\n            document.removeEventListener('visibilitychange', changeVisibility, false);\n            document.removeEventListener('-webkit-visibilitychange', changeVisibility, false);\n            document.addEventListener('visibilitychange', changeVisibility, false);\n            document.addEventListener('-webkit-visibilitychange', changeVisibility, false);\n        }\n\n\n        var iframe = document.createElement('iframe');\n        iframe.style.display = 'none';\n        iframe.style.height='0';\n        iframe.style.overflow='hidden';\n        iframe.frameborder='none';\n        try{\n            if ((isSafari && ios8up) || isChrome) {\n                location.href = url;\n            }else{\n                iframe.src = [\"javascript:document.write(\\\"<html><head></head><body><script>location.href=\",\n                    url, \"\"].join(\"';</script></body></html>\\\"\");\n            }\n        }catch(e){\n        }\n        document.body.appendChild(iframe);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbnZhciBpc0Nocm9tZSA9IC8oY2hyb21lfGNyaW9zKVxcLyhbXFxkLl0qKS8udGVzdCh1YSk7XG4vLyB2YXIgaXNCYWlkdSA9IC9iYWlkdS9pLnRlc3QodWEpO1xudmFyIGlvczh1cCA9IC92ZXJzaW9uXFwvKFxcZCspKDo/LispbW9iaWxlKDo/Lispc2FmYXJpKDo/LispJC9pLnRlc3QodWEpICYmIFJlZ0V4cC4kMSA+IDggfHwgL2NwdVxccyppcGhvbmVcXHMqb3NcXHMqKFxcZCspL2kudGVzdCh1YSkgJiYgUmVnRXhwLiQxID4gODtcbi8vQ1BVIGlQaG9uZSBPUyAxMV8wIGxpa2UgTWFjIE9TIFhcbnZhciBpc1VDID0gL1VDQnJvd3Nlci9pLnRlc3QodWEpO1xudmFyIGlzUVEgPSAvTVFRQnJvd3Nlci9pLnRlc3QodWEpO1xudmFyIGlzU2FmYXJpID0gIWlzVUMgJiYgIWlzQ2hyb21lICYmICgvKFtcXHcuXSopIHNhZmFyaS8pLnRlc3QodWEpO1xudmFyIGlzSW9zID0gKC9saWtlIG1hYyBvcyB4L2kpLnRlc3QodWEpO1xuXG52YXIgaXNBbmRyb2lkID0gKCFpc0lvcykgJiYgKCgvYW5kcm9pZC8pLnRlc3QodWEpIHx8ICgveGlhb21pLykudGVzdCh1YSkpO1xudmFyIGlzUnVuaW5nID0gZmFsc2U7XG52YXIgaXNXWCA9IC9NaWNyb01lc3Nlbmdlci9pLnRlc3QodWEpO1xudmFyIGRlZmFsdXREZWxheVRpbWUgPSAxLjUgKiAxMDAwO1xudmFyIGVycm9ySWRlOyAvL+aZrumAmumUmeivr3NldFRpbWVvdXQgaWRcbi8qKlxuICog5aSx6LSl5byC5bi45aSE55CGXG4gKi9cbmZ1bmN0aW9uIGVycm9yQ2JIYW5kbGVyKGVycm9yQ2IsIGRlbGF5VGltZSkge1xuICAgIC8vdWPnjrDlnKjmiZPkuI3lvIDkuoZcbiAgICBpZihpc1VDKXtcbiAgICAgICAgaXNSdW5pbmcgPSBmYWxzZTtcbiAgICAgICAgZXJyb3JDYigpO1xuICAgIH1lbHNlIGlmIChpc1NhZmFyaSkge1xuICAgICAgICAvL2lvczgg5Lul5LiK5ZCO5Y+wc2V0SW50ZXJ2YWwg56Gu5a6a5Lya6KKrIOa7nuWQjuaJp+ihjO+8jFxuICAgICAgICAvL+S9huaYr2FuZHJvaWTlm6DkuLrmmK/lpJrnur/nqIvnmoTmiYDku6XosozkvLzkuI3ooYznmoQgIHVj5rWP6KeI5Zmo5Lmf5pyJ5ZCM5qC355qE6Zeu6aKYXG4gICAgICAgIC8vYW5kcm9pZCDmtY/op4jlmagg5rWL6K+VdWNcbiAgICAgICAgLy/mgLvorqHlgJLorqHml7Yyc1xuICAgICAgICAvL2lvcyDkvJrlvLnlh7rmnaXkuIDkuKrnoa7orqTlr7nor53moYbvvIzlm6DmraQg5aSa5YqgNTAwIOW7tui/n1xuICAgICAgICB2YXIgY291bnQgPSBNYXRoLmZsb29yKChkZWxheVRpbWUgKyA1MDApIC8gMTApO1xuICAgICAgICB2YXIgdG1wQ291bnQgPSBjb3VudDtcbiAgICAgICAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHZhciBpb3M4VXBJZGUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvdW50LS07XG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGlvczhVcElkZSk7XG4gICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gY3VycmVudFRpbWUgPCAodG1wQ291bnQgKiAxMCArIDUwMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JDYigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpc1J1bmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3JJZGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXNSdW5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JDYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBkZWxheVRpbWUpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgb3BlbjogZnVuY3Rpb24gKHVybCwgd3hDYiwgZXJyb3JDYiwgZGVsYXlUaW1lKSB7XG5cbiAgICAgICAgaWYgKCFkZWxheVRpbWUpIHtcbiAgICAgICAgICAgIGRlbGF5VGltZSA9IGRlZmFsdXREZWxheVRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbmVlZCBzY2hlbWUgdXJsJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlcnJvckNiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25lZWQgZXJyb3IgY2FsbGJhY2snKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXd4Q2Ipe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCduZWVkIHd4Q2IgY2FsbGJhY2snKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZXJyb3JDYikgIT09ICdbb2JqZWN0IEZ1bmN0aW9uXScpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZXJyb3JDYiBtdXN0IGJlIGEgZnVuY3Rpb24hJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzV1gpIHtcbiAgICAgICAgICAgIHZhciBjb2RlID0gJyc7XG4gICAgICAgICAgICBjb2RlID0gaXNJb3MgPyAnaW9zJyA6ICdhbmRyb2lkJztcbiAgICAgICAgICAgIHd4Q2IoY29kZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUnVuaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaXNSdW5pbmcgPSB0cnVlO1xuXG4gICAgICAgIGVycm9yQ2JIYW5kbGVyKGVycm9yQ2IsIGRlbGF5VGltZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlVmlzaWJpbGl0eSgpIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAvL+aJp+ihjOaIkOWKn1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChlcnJvcklkZSk7XG4gICAgICAgICAgICAgICAgaXNSdW5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzU2FmYXJpICYmICFpc1VDKSB7XG4gICAgICAgICAgICAvL+mdnnNhZmFyaSDkuI51YyDnlKh2aXNpYmlsaXR5Y2hhbmdl5LqL5Lu2XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgY2hhbmdlVmlzaWJpbGl0eSwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignLXdlYmtpdC12aXNpYmlsaXR5Y2hhbmdlJywgY2hhbmdlVmlzaWJpbGl0eSwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIGNoYW5nZVZpc2liaWxpdHksIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJy13ZWJraXQtdmlzaWJpbGl0eWNoYW5nZScsIGNoYW5nZVZpc2liaWxpdHksIGZhbHNlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgaWZyYW1lLnN0eWxlLmhlaWdodD0nMCc7XG4gICAgICAgIGlmcmFtZS5zdHlsZS5vdmVyZmxvdz0naGlkZGVuJztcbiAgICAgICAgaWZyYW1lLmZyYW1lYm9yZGVyPSdub25lJztcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgaWYgKChpc1NhZmFyaSAmJiBpb3M4dXApIHx8IGlzQ2hyb21lKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmcmFtZS5zcmMgPSBbXCJqYXZhc2NyaXB0OmRvY3VtZW50LndyaXRlKFxcXCI8aHRtbD48aGVhZD48L2hlYWQ+PGJvZHk+PHNjcmlwdD5sb2NhdGlvbi5ocmVmPVwiLFxuICAgICAgICAgICAgICAgICAgICB1cmwsIFwiXCJdLmpvaW4oXCInOzwvc2NyaXB0PjwvYm9keT48L2h0bWw+XFxcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);
});