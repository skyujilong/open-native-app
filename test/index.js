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
eval("\nvar ua = navigator.userAgent.toLowerCase();\nvar isChrome = /(chrome|crios)\\/([\\d.]*)/.test(ua);\n// var isBaidu = /baidu/i.test(ua);\nvar ios8up = /version\\/(\\d+)(:?.+)mobile(:?.+)safari(:?.+)$/i.test(ua) && RegExp.$1 > 8;\nvar isUC = /UCBrowser/i.test(ua);\nvar isQQ = /MQQBrowser/i.test(ua);\nvar isSafari = !isUC && !isChrome && (/([\\w.]*) safari/).test(ua);\nvar isIos = (/like mac os x/i).test(ua);\n\nvar isAndroid = (!isIos) && ((/android/).test(ua) || (/xiaomi/).test(ua));\nvar isRuning = false;\nvar isWX = /MicroMessenger/i.test(ua);\nvar defalutDelayTime = 1.5 * 1000;\nvar errorIde; //普通错误setTimeout id\n/**\n * 失败异常处理\n */\nfunction errorCbHandler(errorCb, delayTime) {\n    //uc现在打不开了\n    if(isUC){\n        isRuning = false;\n        errorCb();\n    }else if (isSafari) {\n        //ios8 以上后台setInterval 确定会被 滞后执行，\n        //但是android因为是多线程的所以貌似不行的  uc浏览器也有同样的问题\n        //android 浏览器 测试uc\n        //总计倒计时2s\n        //ios 会弹出来一个确认对话框，因此 多加500 延迟\n        var count = Math.floor((delayTime + 500) / 10);\n        var tmpCount = count;\n        var currentTime = new Date().getTime();\n        var ios8UpIde = setInterval(function() {\n            count--;\n            if (count === 0) {\n                clearInterval(ios8UpIde);\n                if (new Date().getTime() - currentTime < (tmpCount * 10 + 500)) {\n                    errorCb();\n                }\n                isRuning = false;\n            }\n        }, 10);\n    } else {\n        errorIde = setTimeout(function() {\n            isRuning = false;\n            if (openIde) {\n                clearInterval(openIde);\n            }\n            if (!document.hidden) {\n                errorCb();\n            }\n        }, delayTime);\n    }\n}\n\nmodule.exports = {\n    open: function (url, wxCb, errorCb, delayTime) {\n\n        if (!delayTime) {\n            delayTime = defalutDelayTime;\n        }\n        if (!url) {\n            throw new Error('need scheme url');\n        }\n        if (!errorCb) {\n            throw new Error('need error callback');\n        }\n        if (!wxCb){\n            throw new Error('need wxCb callback');\n        }\n\n        if (Object.prototype.toString.call(errorCb) !== '[object Function]') {\n            throw new Error('errorCb must be a function!');\n        }\n        if (isWX) {\n            var code = '';\n            code = isIos ? 'ios' : 'android';\n            wxCb(code);\n            return;\n        }\n        if (isRuning) {\n            return;\n        }\n        isRuning = true;\n\n        errorCbHandler(errorCb, delayTime);\n\n        function changeVisibility() {\n            if (document.hidden) {\n                //执行成功\n                clearTimeout(errorIde);\n                isRuning = false;\n            }\n        }\n        if (!isSafari && !isUC) {\n            //非safari 与uc 用visibilitychange事件\n            document.removeEventListener('visibilitychange', changeVisibility, false);\n            document.removeEventListener('-webkit-visibilitychange', changeVisibility, false);\n            document.addEventListener('visibilitychange', changeVisibility, false);\n            document.addEventListener('-webkit-visibilitychange', changeVisibility, false);\n        }\n\n        let iframe = document.createElement('iframe');\n        iframe.style.display = 'none';\n        iframe.style.height='0';\n        iframe.style.overflow='hidden';\n        iframe.frameborder='none';\n        try{\n            iframe.src = `javascript:document.write(\"<html><head></head><body><script>location.href='${url}';</script></body></html>\")`;\n        }catch(e){\n            \n        }\n        document.body.appendChild(iframe);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbnZhciBpc0Nocm9tZSA9IC8oY2hyb21lfGNyaW9zKVxcLyhbXFxkLl0qKS8udGVzdCh1YSk7XG4vLyB2YXIgaXNCYWlkdSA9IC9iYWlkdS9pLnRlc3QodWEpO1xudmFyIGlvczh1cCA9IC92ZXJzaW9uXFwvKFxcZCspKDo/LispbW9iaWxlKDo/Lispc2FmYXJpKDo/LispJC9pLnRlc3QodWEpICYmIFJlZ0V4cC4kMSA+IDg7XG52YXIgaXNVQyA9IC9VQ0Jyb3dzZXIvaS50ZXN0KHVhKTtcbnZhciBpc1FRID0gL01RUUJyb3dzZXIvaS50ZXN0KHVhKTtcbnZhciBpc1NhZmFyaSA9ICFpc1VDICYmICFpc0Nocm9tZSAmJiAoLyhbXFx3Ll0qKSBzYWZhcmkvKS50ZXN0KHVhKTtcbnZhciBpc0lvcyA9ICgvbGlrZSBtYWMgb3MgeC9pKS50ZXN0KHVhKTtcblxudmFyIGlzQW5kcm9pZCA9ICghaXNJb3MpICYmICgoL2FuZHJvaWQvKS50ZXN0KHVhKSB8fCAoL3hpYW9taS8pLnRlc3QodWEpKTtcbnZhciBpc1J1bmluZyA9IGZhbHNlO1xudmFyIGlzV1ggPSAvTWljcm9NZXNzZW5nZXIvaS50ZXN0KHVhKTtcbnZhciBkZWZhbHV0RGVsYXlUaW1lID0gMS41ICogMTAwMDtcbnZhciBlcnJvcklkZTsgLy/mma7pgJrplJnor69zZXRUaW1lb3V0IGlkXG4vKipcbiAqIOWksei0peW8guW4uOWkhOeQhlxuICovXG5mdW5jdGlvbiBlcnJvckNiSGFuZGxlcihlcnJvckNiLCBkZWxheVRpbWUpIHtcbiAgICAvL3Vj546w5Zyo5omT5LiN5byA5LqGXG4gICAgaWYoaXNVQyl7XG4gICAgICAgIGlzUnVuaW5nID0gZmFsc2U7XG4gICAgICAgIGVycm9yQ2IoKTtcbiAgICB9ZWxzZSBpZiAoaXNTYWZhcmkpIHtcbiAgICAgICAgLy9pb3M4IOS7peS4iuWQjuWPsHNldEludGVydmFsIOehruWumuS8muiiqyDmu57lkI7miafooYzvvIxcbiAgICAgICAgLy/kvYbmmK9hbmRyb2lk5Zug5Li65piv5aSa57q/56iL55qE5omA5Lul6LKM5Ly85LiN6KGM55qEICB1Y+a1j+iniOWZqOS5n+acieWQjOagt+eahOmXrumimFxuICAgICAgICAvL2FuZHJvaWQg5rWP6KeI5ZmoIOa1i+ivlXVjXG4gICAgICAgIC8v5oC76K6h5YCS6K6h5pe2MnNcbiAgICAgICAgLy9pb3Mg5Lya5by55Ye65p2l5LiA5Liq56Gu6K6k5a+56K+d5qGG77yM5Zug5q2kIOWkmuWKoDUwMCDlu7bov59cbiAgICAgICAgdmFyIGNvdW50ID0gTWF0aC5mbG9vcigoZGVsYXlUaW1lICsgNTAwKSAvIDEwKTtcbiAgICAgICAgdmFyIHRtcENvdW50ID0gY291bnQ7XG4gICAgICAgIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgaW9zOFVwSWRlID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb3VudC0tO1xuICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpb3M4VXBJZGUpO1xuICAgICAgICAgICAgICAgIGlmIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGN1cnJlbnRUaW1lIDwgKHRtcENvdW50ICogMTAgKyA1MDApKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yQ2IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaXNSdW5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9ySWRlID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlzUnVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAob3BlbklkZSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwob3BlbklkZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICAgICAgICAgIGVycm9yQ2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZGVsYXlUaW1lKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG9wZW46IGZ1bmN0aW9uICh1cmwsIHd4Q2IsIGVycm9yQ2IsIGRlbGF5VGltZSkge1xuXG4gICAgICAgIGlmICghZGVsYXlUaW1lKSB7XG4gICAgICAgICAgICBkZWxheVRpbWUgPSBkZWZhbHV0RGVsYXlUaW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25lZWQgc2NoZW1lIHVybCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZXJyb3JDYikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCduZWVkIGVycm9yIGNhbGxiYWNrJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF3eENiKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbmVlZCB3eENiIGNhbGxiYWNrJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVycm9yQ2IpICE9PSAnW29iamVjdCBGdW5jdGlvbl0nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Vycm9yQ2IgbXVzdCBiZSBhIGZ1bmN0aW9uIScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1dYKSB7XG4gICAgICAgICAgICB2YXIgY29kZSA9ICcnO1xuICAgICAgICAgICAgY29kZSA9IGlzSW9zID8gJ2lvcycgOiAnYW5kcm9pZCc7XG4gICAgICAgICAgICB3eENiKGNvZGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1J1bmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlzUnVuaW5nID0gdHJ1ZTtcblxuICAgICAgICBlcnJvckNiSGFuZGxlcihlcnJvckNiLCBkZWxheVRpbWUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZVZpc2liaWxpdHkoKSB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgLy/miafooYzmiJDlip9cbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZXJyb3JJZGUpO1xuICAgICAgICAgICAgICAgIGlzUnVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1NhZmFyaSAmJiAhaXNVQykge1xuICAgICAgICAgICAgLy/pnZ5zYWZhcmkg5LiOdWMg55SodmlzaWJpbGl0eWNoYW5nZeS6i+S7tlxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIGNoYW5nZVZpc2liaWxpdHksIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJy13ZWJraXQtdmlzaWJpbGl0eWNoYW5nZScsIGNoYW5nZVZpc2liaWxpdHksIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBjaGFuZ2VWaXNpYmlsaXR5LCBmYWxzZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCctd2Via2l0LXZpc2liaWxpdHljaGFuZ2UnLCBjaGFuZ2VWaXNpYmlsaXR5LCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0PScwJztcbiAgICAgICAgaWZyYW1lLnN0eWxlLm92ZXJmbG93PSdoaWRkZW4nO1xuICAgICAgICBpZnJhbWUuZnJhbWVib3JkZXI9J25vbmUnO1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBpZnJhbWUuc3JjID0gYGphdmFzY3JpcHQ6ZG9jdW1lbnQud3JpdGUoXCI8aHRtbD48aGVhZD48L2hlYWQ+PGJvZHk+PHNjcmlwdD5sb2NhdGlvbi5ocmVmPScke3VybH0nOzwvc2NyaXB0PjwvYm9keT48L2h0bWw+XCIpYDtcbiAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);
});