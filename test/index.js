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
eval("\nvar ua = navigator.userAgent.toLowerCase();\nvar isChrome = /(chrome|crios)\\/([\\d.]*)/.test(ua);\n// var isBaidu = /baidu/i.test(ua);\nvar ios8up = /version\\/(\\d+)(:?.+)mobile(:?.+)safari(:?.+)$/i.test(ua) && RegExp.$1 > 8 || /cpu\\s*iphone\\s*os\\s*(\\d+)/i.test(ua) && RegExp.$1 > 8;\n//CPU iPhone OS 11_0 like Mac OS X\nvar isUC = /UCBrowser/i.test(ua);\nvar isQQ = /MQQBrowser/i.test(ua);\nvar isQQApp = /qbwebviewtype\\/1/i.test(ua);\nvar isSafari = !isUC && !isChrome && (/([\\w.]*) safari/).test(ua);\nvar isIos = (/like mac os x/i).test(ua);\nvar isHuaWei = /huawei|honorkiw/i.test(ua);\nvar isXiaoMiBrowser = /xiaomi\\/miuibrowser/i.test(ua);\nvar isAndroid = (!isIos) && ((/android/).test(ua) || (/xiaomi/).test(ua));\nvar isRuning = false;\nvar isWX = /MicroMessenger/i.test(ua);\n\nvar isVivo = /vivo/i.test(ua);\nvar defalutDelayTime = 1.5 * 1000;\nvar errorIde; //普通错误setTimeout id\n/**\n * 失败异常处理\n */\nfunction errorCbHandler(errorCb, delayTime) {\n    //uc现在打不开了\n    if(isUC){\n        isRuning = false;\n        errorCb();\n    }else if (isSafari) {\n        //ios8 以上后台setInterval 确定会被 滞后执行，\n        //但是android因为是多线程的所以貌似不行的  uc浏览器也有同样的问题\n        //android 浏览器 测试uc\n        //总计倒计时2s\n        //ios 会弹出来一个确认对话框，因此 多加1000 延迟\n        var count = Math.floor((delayTime + 1000) / 10);\n        var tmpCount = count;\n        var currentTime = new Date().getTime();\n        var ios8UpIde = setInterval(function() {\n            count--;\n            if (count === 0) {\n                clearInterval(ios8UpIde);\n                if (new Date().getTime() - currentTime < (tmpCount * 10 + 500)) {\n                    errorCb();\n                }\n                isRuning = false;\n            }\n        }, 10);\n    } else {\n        errorIde = setTimeout(function() {\n            isRuning = false;\n            if (!document.hidden) {\n                errorCb();\n            }\n        }, delayTime);\n    }\n}\n\nmodule.exports = {\n    open: function (url, wxCb, errorCb, delayTime) {\n        if (!delayTime) {\n            delayTime = defalutDelayTime;\n        }\n        if (!url) {\n            throw new Error('need scheme url');\n        }\n        if (!errorCb) {\n            throw new Error('need error callback');\n        }\n        if (!wxCb){\n            throw new Error('need wxCb callback');\n        }\n\n        if (Object.prototype.toString.call(errorCb) !== '[object Function]') {\n            throw new Error('errorCb must be a function!');\n        }\n        if (isWX) {\n            var code = '';\n            code = isIos ? 'ios' : 'android';\n            wxCb(code);\n            return;\n        }\n        if (isRuning) {\n            return;\n        }\n        isRuning = true;\n\n        errorCbHandler(errorCb, delayTime);\n\n        function changeVisibility() {\n            if (document.hidden) {\n                //执行成功\n                clearTimeout(errorIde);\n                isRuning = false;\n            }\n        }\n        if (!isSafari && !isUC) {\n            //非safari 与uc 用visibilitychange事件\n            document.removeEventListener('visibilitychange', changeVisibility, false);\n            document.removeEventListener('-webkit-visibilitychange', changeVisibility, false);\n            document.addEventListener('visibilitychange', changeVisibility, false);\n            document.addEventListener('-webkit-visibilitychange', changeVisibility, false);\n        }\n        // chrome都直接在当前页面直接调用\n        if ((isSafari || isHuaWei || isVivo || isChrome) && !isQQApp) {\n            location.href = url;\n        }else{\n            var iframe = document.createElement('iframe');\n            iframe.style.display = 'none';\n            iframe.style.height='0';\n            iframe.style.overflow='hidden';\n            iframe.frameborder='none';\n            iframe.src=[\n                'javascript:document.write(\\'',\n                    '<html><body>',\n                        '<a href=\"',url,'\">open</a>',\n                        '<script>',\n                            'document.querySelector(\"a\").dispatchEvent(new MouseEvent(\"click\"));',    \n                        ,'<\\/script>',\n                        // '<script>location.href=\"',url,'\"<\\/script>',    \n                    ,'</body></html>',\n                '\\')'\n            ].join('');\n            document.body.appendChild(iframe);\n        }\n\n        \n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbnZhciBpc0Nocm9tZSA9IC8oY2hyb21lfGNyaW9zKVxcLyhbXFxkLl0qKS8udGVzdCh1YSk7XG4vLyB2YXIgaXNCYWlkdSA9IC9iYWlkdS9pLnRlc3QodWEpO1xudmFyIGlvczh1cCA9IC92ZXJzaW9uXFwvKFxcZCspKDo/LispbW9iaWxlKDo/Lispc2FmYXJpKDo/LispJC9pLnRlc3QodWEpICYmIFJlZ0V4cC4kMSA+IDggfHwgL2NwdVxccyppcGhvbmVcXHMqb3NcXHMqKFxcZCspL2kudGVzdCh1YSkgJiYgUmVnRXhwLiQxID4gODtcbi8vQ1BVIGlQaG9uZSBPUyAxMV8wIGxpa2UgTWFjIE9TIFhcbnZhciBpc1VDID0gL1VDQnJvd3Nlci9pLnRlc3QodWEpO1xudmFyIGlzUVEgPSAvTVFRQnJvd3Nlci9pLnRlc3QodWEpO1xudmFyIGlzUVFBcHAgPSAvcWJ3ZWJ2aWV3dHlwZVxcLzEvaS50ZXN0KHVhKTtcbnZhciBpc1NhZmFyaSA9ICFpc1VDICYmICFpc0Nocm9tZSAmJiAoLyhbXFx3Ll0qKSBzYWZhcmkvKS50ZXN0KHVhKTtcbnZhciBpc0lvcyA9ICgvbGlrZSBtYWMgb3MgeC9pKS50ZXN0KHVhKTtcbnZhciBpc0h1YVdlaSA9IC9odWF3ZWl8aG9ub3JraXcvaS50ZXN0KHVhKTtcbnZhciBpc1hpYW9NaUJyb3dzZXIgPSAveGlhb21pXFwvbWl1aWJyb3dzZXIvaS50ZXN0KHVhKTtcbnZhciBpc0FuZHJvaWQgPSAoIWlzSW9zKSAmJiAoKC9hbmRyb2lkLykudGVzdCh1YSkgfHwgKC94aWFvbWkvKS50ZXN0KHVhKSk7XG52YXIgaXNSdW5pbmcgPSBmYWxzZTtcbnZhciBpc1dYID0gL01pY3JvTWVzc2VuZ2VyL2kudGVzdCh1YSk7XG5cbnZhciBpc1Zpdm8gPSAvdml2by9pLnRlc3QodWEpO1xudmFyIGRlZmFsdXREZWxheVRpbWUgPSAxLjUgKiAxMDAwO1xudmFyIGVycm9ySWRlOyAvL+aZrumAmumUmeivr3NldFRpbWVvdXQgaWRcbi8qKlxuICog5aSx6LSl5byC5bi45aSE55CGXG4gKi9cbmZ1bmN0aW9uIGVycm9yQ2JIYW5kbGVyKGVycm9yQ2IsIGRlbGF5VGltZSkge1xuICAgIC8vdWPnjrDlnKjmiZPkuI3lvIDkuoZcbiAgICBpZihpc1VDKXtcbiAgICAgICAgaXNSdW5pbmcgPSBmYWxzZTtcbiAgICAgICAgZXJyb3JDYigpO1xuICAgIH1lbHNlIGlmIChpc1NhZmFyaSkge1xuICAgICAgICAvL2lvczgg5Lul5LiK5ZCO5Y+wc2V0SW50ZXJ2YWwg56Gu5a6a5Lya6KKrIOa7nuWQjuaJp+ihjO+8jFxuICAgICAgICAvL+S9huaYr2FuZHJvaWTlm6DkuLrmmK/lpJrnur/nqIvnmoTmiYDku6XosozkvLzkuI3ooYznmoQgIHVj5rWP6KeI5Zmo5Lmf5pyJ5ZCM5qC355qE6Zeu6aKYXG4gICAgICAgIC8vYW5kcm9pZCDmtY/op4jlmagg5rWL6K+VdWNcbiAgICAgICAgLy/mgLvorqHlgJLorqHml7Yyc1xuICAgICAgICAvL2lvcyDkvJrlvLnlh7rmnaXkuIDkuKrnoa7orqTlr7nor53moYbvvIzlm6DmraQg5aSa5YqgMTAwMCDlu7bov59cbiAgICAgICAgdmFyIGNvdW50ID0gTWF0aC5mbG9vcigoZGVsYXlUaW1lICsgMTAwMCkgLyAxMCk7XG4gICAgICAgIHZhciB0bXBDb3VudCA9IGNvdW50O1xuICAgICAgICB2YXIgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIGlvczhVcElkZSA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY291bnQtLTtcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW9zOFVwSWRlKTtcbiAgICAgICAgICAgICAgICBpZiAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBjdXJyZW50VGltZSA8ICh0bXBDb3VudCAqIDEwICsgNTAwKSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvckNiKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlzUnVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvcklkZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpc1J1bmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgICBlcnJvckNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGRlbGF5VGltZSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBvcGVuOiBmdW5jdGlvbiAodXJsLCB3eENiLCBlcnJvckNiLCBkZWxheVRpbWUpIHtcbiAgICAgICAgaWYgKCFkZWxheVRpbWUpIHtcbiAgICAgICAgICAgIGRlbGF5VGltZSA9IGRlZmFsdXREZWxheVRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbmVlZCBzY2hlbWUgdXJsJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlcnJvckNiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25lZWQgZXJyb3IgY2FsbGJhY2snKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXd4Q2Ipe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCduZWVkIHd4Q2IgY2FsbGJhY2snKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZXJyb3JDYikgIT09ICdbb2JqZWN0IEZ1bmN0aW9uXScpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZXJyb3JDYiBtdXN0IGJlIGEgZnVuY3Rpb24hJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzV1gpIHtcbiAgICAgICAgICAgIHZhciBjb2RlID0gJyc7XG4gICAgICAgICAgICBjb2RlID0gaXNJb3MgPyAnaW9zJyA6ICdhbmRyb2lkJztcbiAgICAgICAgICAgIHd4Q2IoY29kZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUnVuaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaXNSdW5pbmcgPSB0cnVlO1xuXG4gICAgICAgIGVycm9yQ2JIYW5kbGVyKGVycm9yQ2IsIGRlbGF5VGltZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlVmlzaWJpbGl0eSgpIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAvL+aJp+ihjOaIkOWKn1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChlcnJvcklkZSk7XG4gICAgICAgICAgICAgICAgaXNSdW5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzU2FmYXJpICYmICFpc1VDKSB7XG4gICAgICAgICAgICAvL+mdnnNhZmFyaSDkuI51YyDnlKh2aXNpYmlsaXR5Y2hhbmdl5LqL5Lu2XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgY2hhbmdlVmlzaWJpbGl0eSwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignLXdlYmtpdC12aXNpYmlsaXR5Y2hhbmdlJywgY2hhbmdlVmlzaWJpbGl0eSwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIGNoYW5nZVZpc2liaWxpdHksIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJy13ZWJraXQtdmlzaWJpbGl0eWNoYW5nZScsIGNoYW5nZVZpc2liaWxpdHksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjaHJvbWXpg73nm7TmjqXlnKjlvZPliY3pobXpnaLnm7TmjqXosIPnlKhcbiAgICAgICAgaWYgKChpc1NhZmFyaSB8fCBpc0h1YVdlaSB8fCBpc1Zpdm8gfHwgaXNDaHJvbWUpICYmICFpc1FRQXBwKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgaWZyYW1lLnN0eWxlLmhlaWdodD0nMCc7XG4gICAgICAgICAgICBpZnJhbWUuc3R5bGUub3ZlcmZsb3c9J2hpZGRlbic7XG4gICAgICAgICAgICBpZnJhbWUuZnJhbWVib3JkZXI9J25vbmUnO1xuICAgICAgICAgICAgaWZyYW1lLnNyYz1bXG4gICAgICAgICAgICAgICAgJ2phdmFzY3JpcHQ6ZG9jdW1lbnQud3JpdGUoXFwnJyxcbiAgICAgICAgICAgICAgICAgICAgJzxodG1sPjxib2R5PicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGEgaHJlZj1cIicsdXJsLCdcIj5vcGVuPC9hPicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNjcmlwdD4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYVwiKS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIikpOycsICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLCc8XFwvc2NyaXB0PicsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAnPHNjcmlwdD5sb2NhdGlvbi5ocmVmPVwiJyx1cmwsJ1wiPFxcL3NjcmlwdD4nLCAgICBcbiAgICAgICAgICAgICAgICAgICAgLCc8L2JvZHk+PC9odG1sPicsXG4gICAgICAgICAgICAgICAgJ1xcJyknXG4gICAgICAgICAgICBdLmpvaW4oJycpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);
});