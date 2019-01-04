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
eval("\nvar ua = navigator.userAgent.toLowerCase();\nvar isChrome = /(chrome|crios)\\/([\\d.]*)/.test(ua);\n// var isBaidu = /baidu/i.test(ua);\nvar ios8up = /version\\/(\\d+)(:?.+)mobile(:?.+)safari(:?.+)$/i.test(ua) && RegExp.$1 > 8 || /cpu\\s*iphone\\s*os\\s*(\\d+)/i.test(ua) && RegExp.$1 > 8;\n//CPU iPhone OS 11_0 like Mac OS X\nvar isUC = /UCBrowser/i.test(ua);\nvar isQQ = /MQQBrowser/i.test(ua);\nvar isQQApp = /qbwebviewtype\\/1/i.test(ua);\nvar isSafari = !isUC && !isChrome && (/([\\w.]*) safari/).test(ua);\nvar isIos = (/like mac os x/i).test(ua);\nvar isHuaWei = /huawei/i.test(ua);\nvar isAndroid = (!isIos) && ((/android/).test(ua) || (/xiaomi/).test(ua));\nvar isRuning = false;\nvar isWX = /MicroMessenger/i.test(ua);\nvar defalutDelayTime = 1.5 * 1000;\nvar errorIde; //普通错误setTimeout id\n/**\n * 失败异常处理\n */\nfunction errorCbHandler(errorCb, delayTime) {\n    //uc现在打不开了\n    if(isUC){\n        isRuning = false;\n        errorCb();\n    }else if (isSafari) {\n        //ios8 以上后台setInterval 确定会被 滞后执行，\n        //但是android因为是多线程的所以貌似不行的  uc浏览器也有同样的问题\n        //android 浏览器 测试uc\n        //总计倒计时2s\n        //ios 会弹出来一个确认对话框，因此 多加500 延迟\n        var count = Math.floor((delayTime + 500) / 10);\n        var tmpCount = count;\n        var currentTime = new Date().getTime();\n        var ios8UpIde = setInterval(function() {\n            count--;\n            if (count === 0) {\n                clearInterval(ios8UpIde);\n                if (new Date().getTime() - currentTime < (tmpCount * 10 + 500)) {\n                    errorCb();\n                }\n                isRuning = false;\n            }\n        }, 10);\n    } else {\n        errorIde = setTimeout(function() {\n            isRuning = false;\n            if (!document.hidden) {\n                errorCb();\n            }\n        }, delayTime);\n    }\n}\n\nmodule.exports = {\n    open: function (url, wxCb, errorCb, delayTime) {\n\n        if (!delayTime) {\n            delayTime = defalutDelayTime;\n        }\n        if (!url) {\n            throw new Error('need scheme url');\n        }\n        if (!errorCb) {\n            throw new Error('need error callback');\n        }\n        if (!wxCb){\n            throw new Error('need wxCb callback');\n        }\n\n        if (Object.prototype.toString.call(errorCb) !== '[object Function]') {\n            throw new Error('errorCb must be a function!');\n        }\n        if (isWX) {\n            var code = '';\n            code = isIos ? 'ios' : 'android';\n            wxCb(code);\n            return;\n        }\n        if (isRuning) {\n            return;\n        }\n        isRuning = true;\n\n        errorCbHandler(errorCb, delayTime);\n\n        function changeVisibility() {\n            if (document.hidden) {\n                //执行成功\n                clearTimeout(errorIde);\n                isRuning = false;\n            }\n        }\n        if (!isSafari && !isUC) {\n            //非safari 与uc 用visibilitychange事件\n            document.removeEventListener('visibilitychange', changeVisibility, false);\n            document.removeEventListener('-webkit-visibilitychange', changeVisibility, false);\n            document.addEventListener('visibilitychange', changeVisibility, false);\n            document.addEventListener('-webkit-visibilitychange', changeVisibility, false);\n        }\n\n\n        var iframe = document.createElement('iframe');\n        iframe.style.display = 'none';\n        iframe.style.height='0';\n        iframe.style.overflow='hidden';\n        iframe.frameborder='none';\n        // try{\n        //     if ((isSafari && ios8up) || isChrome || isHuaWei || (isQQApp && isIos)) {\n        //         alert('qq!!!');\n        //         location.href = url;\n        //     }else{\n        iframe.src=[\n            'javascript:document.write(\\'',\n                '<html><body>',\n                    '<a href=\"',url,'\">open</a>',\n                    '<script>',\n                        'document.querySelector(\"a\").dispatchEvent(new MouseEvent(\"click\"));',    \n                    ,'<\\/script>',\n                    // '<script>location.href=\"',url,'\"<\\/script>',    \n                ,'</body></html>',\n            '\\')'\n        ].join('');\n            // }\n        // }catch(e){\n        //     alert(e);\n        // }\n        // alert('3333333');\n        document.body.appendChild(iframe);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbnZhciBpc0Nocm9tZSA9IC8oY2hyb21lfGNyaW9zKVxcLyhbXFxkLl0qKS8udGVzdCh1YSk7XG4vLyB2YXIgaXNCYWlkdSA9IC9iYWlkdS9pLnRlc3QodWEpO1xudmFyIGlvczh1cCA9IC92ZXJzaW9uXFwvKFxcZCspKDo/LispbW9iaWxlKDo/Lispc2FmYXJpKDo/LispJC9pLnRlc3QodWEpICYmIFJlZ0V4cC4kMSA+IDggfHwgL2NwdVxccyppcGhvbmVcXHMqb3NcXHMqKFxcZCspL2kudGVzdCh1YSkgJiYgUmVnRXhwLiQxID4gODtcbi8vQ1BVIGlQaG9uZSBPUyAxMV8wIGxpa2UgTWFjIE9TIFhcbnZhciBpc1VDID0gL1VDQnJvd3Nlci9pLnRlc3QodWEpO1xudmFyIGlzUVEgPSAvTVFRQnJvd3Nlci9pLnRlc3QodWEpO1xudmFyIGlzUVFBcHAgPSAvcWJ3ZWJ2aWV3dHlwZVxcLzEvaS50ZXN0KHVhKTtcbnZhciBpc1NhZmFyaSA9ICFpc1VDICYmICFpc0Nocm9tZSAmJiAoLyhbXFx3Ll0qKSBzYWZhcmkvKS50ZXN0KHVhKTtcbnZhciBpc0lvcyA9ICgvbGlrZSBtYWMgb3MgeC9pKS50ZXN0KHVhKTtcbnZhciBpc0h1YVdlaSA9IC9odWF3ZWkvaS50ZXN0KHVhKTtcbnZhciBpc0FuZHJvaWQgPSAoIWlzSW9zKSAmJiAoKC9hbmRyb2lkLykudGVzdCh1YSkgfHwgKC94aWFvbWkvKS50ZXN0KHVhKSk7XG52YXIgaXNSdW5pbmcgPSBmYWxzZTtcbnZhciBpc1dYID0gL01pY3JvTWVzc2VuZ2VyL2kudGVzdCh1YSk7XG52YXIgZGVmYWx1dERlbGF5VGltZSA9IDEuNSAqIDEwMDA7XG52YXIgZXJyb3JJZGU7IC8v5pmu6YCa6ZSZ6K+vc2V0VGltZW91dCBpZFxuLyoqXG4gKiDlpLHotKXlvILluLjlpITnkIZcbiAqL1xuZnVuY3Rpb24gZXJyb3JDYkhhbmRsZXIoZXJyb3JDYiwgZGVsYXlUaW1lKSB7XG4gICAgLy91Y+eOsOWcqOaJk+S4jeW8gOS6hlxuICAgIGlmKGlzVUMpe1xuICAgICAgICBpc1J1bmluZyA9IGZhbHNlO1xuICAgICAgICBlcnJvckNiKCk7XG4gICAgfWVsc2UgaWYgKGlzU2FmYXJpKSB7XG4gICAgICAgIC8vaW9zOCDku6XkuIrlkI7lj7BzZXRJbnRlcnZhbCDnoa7lrprkvJrooqsg5rue5ZCO5omn6KGM77yMXG4gICAgICAgIC8v5L2G5pivYW5kcm9pZOWboOS4uuaYr+Wkmue6v+eoi+eahOaJgOS7peiyjOS8vOS4jeihjOeahCAgdWPmtY/op4jlmajkuZ/mnInlkIzmoLfnmoTpl67pophcbiAgICAgICAgLy9hbmRyb2lkIOa1j+iniOWZqCDmtYvor5V1Y1xuICAgICAgICAvL+aAu+iuoeWAkuiuoeaXtjJzXG4gICAgICAgIC8vaW9zIOS8muW8ueWHuuadpeS4gOS4quehruiupOWvueivneahhu+8jOWboOatpCDlpJrliqA1MDAg5bu26L+fXG4gICAgICAgIHZhciBjb3VudCA9IE1hdGguZmxvb3IoKGRlbGF5VGltZSArIDUwMCkgLyAxMCk7XG4gICAgICAgIHZhciB0bXBDb3VudCA9IGNvdW50O1xuICAgICAgICB2YXIgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIGlvczhVcElkZSA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY291bnQtLTtcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW9zOFVwSWRlKTtcbiAgICAgICAgICAgICAgICBpZiAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBjdXJyZW50VGltZSA8ICh0bXBDb3VudCAqIDEwICsgNTAwKSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvckNiKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlzUnVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvcklkZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpc1J1bmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgICBlcnJvckNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGRlbGF5VGltZSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBvcGVuOiBmdW5jdGlvbiAodXJsLCB3eENiLCBlcnJvckNiLCBkZWxheVRpbWUpIHtcblxuICAgICAgICBpZiAoIWRlbGF5VGltZSkge1xuICAgICAgICAgICAgZGVsYXlUaW1lID0gZGVmYWx1dERlbGF5VGltZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCduZWVkIHNjaGVtZSB1cmwnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWVycm9yQ2IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbmVlZCBlcnJvciBjYWxsYmFjaycpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghd3hDYil7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25lZWQgd3hDYiBjYWxsYmFjaycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlcnJvckNiKSAhPT0gJ1tvYmplY3QgRnVuY3Rpb25dJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdlcnJvckNiIG11c3QgYmUgYSBmdW5jdGlvbiEnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNXWCkge1xuICAgICAgICAgICAgdmFyIGNvZGUgPSAnJztcbiAgICAgICAgICAgIGNvZGUgPSBpc0lvcyA/ICdpb3MnIDogJ2FuZHJvaWQnO1xuICAgICAgICAgICAgd3hDYihjb2RlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSdW5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpc1J1bmluZyA9IHRydWU7XG5cbiAgICAgICAgZXJyb3JDYkhhbmRsZXIoZXJyb3JDYiwgZGVsYXlUaW1lKTtcblxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VWaXNpYmlsaXR5KCkge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICAgICAgICAgIC8v5omn6KGM5oiQ5YqfXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGVycm9ySWRlKTtcbiAgICAgICAgICAgICAgICBpc1J1bmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghaXNTYWZhcmkgJiYgIWlzVUMpIHtcbiAgICAgICAgICAgIC8v6Z2ec2FmYXJpIOS4jnVjIOeUqHZpc2liaWxpdHljaGFuZ2Xkuovku7ZcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBjaGFuZ2VWaXNpYmlsaXR5LCBmYWxzZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCctd2Via2l0LXZpc2liaWxpdHljaGFuZ2UnLCBjaGFuZ2VWaXNpYmlsaXR5LCBmYWxzZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgY2hhbmdlVmlzaWJpbGl0eSwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignLXdlYmtpdC12aXNpYmlsaXR5Y2hhbmdlJywgY2hhbmdlVmlzaWJpbGl0eSwgZmFsc2UpO1xuICAgICAgICB9XG5cblxuICAgICAgICB2YXIgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0PScwJztcbiAgICAgICAgaWZyYW1lLnN0eWxlLm92ZXJmbG93PSdoaWRkZW4nO1xuICAgICAgICBpZnJhbWUuZnJhbWVib3JkZXI9J25vbmUnO1xuICAgICAgICAvLyB0cnl7XG4gICAgICAgIC8vICAgICBpZiAoKGlzU2FmYXJpICYmIGlvczh1cCkgfHwgaXNDaHJvbWUgfHwgaXNIdWFXZWkgfHwgKGlzUVFBcHAgJiYgaXNJb3MpKSB7XG4gICAgICAgIC8vICAgICAgICAgYWxlcnQoJ3FxISEhJyk7XG4gICAgICAgIC8vICAgICAgICAgbG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICAgICAgLy8gICAgIH1lbHNle1xuICAgICAgICBpZnJhbWUuc3JjPVtcbiAgICAgICAgICAgICdqYXZhc2NyaXB0OmRvY3VtZW50LndyaXRlKFxcJycsXG4gICAgICAgICAgICAgICAgJzxodG1sPjxib2R5PicsXG4gICAgICAgICAgICAgICAgICAgICc8YSBocmVmPVwiJyx1cmwsJ1wiPm9wZW48L2E+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxzY3JpcHQ+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYVwiKS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIikpOycsICAgIFxuICAgICAgICAgICAgICAgICAgICAsJzxcXC9zY3JpcHQ+JyxcbiAgICAgICAgICAgICAgICAgICAgLy8gJzxzY3JpcHQ+bG9jYXRpb24uaHJlZj1cIicsdXJsLCdcIjxcXC9zY3JpcHQ+JywgICAgXG4gICAgICAgICAgICAgICAgLCc8L2JvZHk+PC9odG1sPicsXG4gICAgICAgICAgICAnXFwnKSdcbiAgICAgICAgXS5qb2luKCcnKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgLy8gfWNhdGNoKGUpe1xuICAgICAgICAvLyAgICAgYWxlcnQoZSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gYWxlcnQoJzMzMzMzMzMnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);
});