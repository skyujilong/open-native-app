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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ua = navigator.userAgent.toLowerCase();
var isChrome = /(chrome|crios)\/([\d.]*)/.test(ua);
// var isBaidu = /baidu/i.test(ua);
var ios8up = /version\/(\d+)(:?.+)mobile(:?.+)safari(:?.+)$/i.test(ua) && RegExp.$1 > 8 || /cpu\s*iphone\s*os\s*(\d+)/i.test(ua) && RegExp.$1 > 8;
//CPU iPhone OS 11_0 like Mac OS X
var isUC = /UCBrowser/i.test(ua);
var isQQ = /MQQBrowser/i.test(ua);
var isSafari = !isUC && !isChrome && (/([\w.]*) safari/).test(ua);
var isIos = (/like mac os x/i).test(ua);
var isHuaWei = /huawei/i.test(ua);
var isAndroid = (!isIos) && ((/android/).test(ua) || (/xiaomi/).test(ua));
var isRuning = false;
var isWX = /MicroMessenger/i.test(ua);
var defalutDelayTime = 1.5 * 1000;
var errorIde; //普通错误setTimeout id
/**
 * 失败异常处理
 */
function errorCbHandler(errorCb, delayTime) {
    //uc现在打不开了
    if(isUC){
        isRuning = false;
        errorCb();
    }else if (isSafari) {
        //ios8 以上后台setInterval 确定会被 滞后执行，
        //但是android因为是多线程的所以貌似不行的  uc浏览器也有同样的问题
        //android 浏览器 测试uc
        //总计倒计时2s
        //ios 会弹出来一个确认对话框，因此 多加500 延迟
        var count = Math.floor((delayTime + 500) / 10);
        var tmpCount = count;
        var currentTime = new Date().getTime();
        var ios8UpIde = setInterval(function() {
            count--;
            if (count === 0) {
                clearInterval(ios8UpIde);
                if (new Date().getTime() - currentTime < (tmpCount * 10 + 500)) {
                    errorCb();
                }
                isRuning = false;
            }
        }, 10);
    } else {
        errorIde = setTimeout(function() {
            isRuning = false;
            if (!document.hidden) {
                errorCb();
            }
        }, delayTime);
    }
}

module.exports = {
    open: function (url, wxCb, errorCb, delayTime) {

        if (!delayTime) {
            delayTime = defalutDelayTime;
        }
        if (!url) {
            throw new Error('need scheme url');
        }
        if (!errorCb) {
            throw new Error('need error callback');
        }
        if (!wxCb){
            throw new Error('need wxCb callback');
        }

        if (Object.prototype.toString.call(errorCb) !== '[object Function]') {
            throw new Error('errorCb must be a function!');
        }
        if (isWX) {
            var code = '';
            code = isIos ? 'ios' : 'android';
            wxCb(code);
            return;
        }
        if (isRuning) {
            return;
        }
        isRuning = true;

        errorCbHandler(errorCb, delayTime);

        function changeVisibility() {
            if (document.hidden) {
                //执行成功
                clearTimeout(errorIde);
                isRuning = false;
            }
        }
        if (!isSafari && !isUC) {
            //非safari 与uc 用visibilitychange事件
            document.removeEventListener('visibilitychange', changeVisibility, false);
            document.removeEventListener('-webkit-visibilitychange', changeVisibility, false);
            document.addEventListener('visibilitychange', changeVisibility, false);
            document.addEventListener('-webkit-visibilitychange', changeVisibility, false);
        }


        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.style.height='0';
        iframe.style.overflow='hidden';
        iframe.frameborder='none';
        try{
            if ((isSafari && ios8up) || isChrome || isHuaWei) {
                location.href = url;
            }else{
                iframe.src = ["javascript:document.write(\"<html><head></head><body><script>location.href=",
                    url, ""].join("';</script></body></html>\"");
            }
        }catch(e){
        }
        document.body.appendChild(iframe);
    }
}


/***/ })
/******/ ]);
});