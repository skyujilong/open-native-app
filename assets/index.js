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
var platform = navigator.platform.toLowerCase();
var isChrome = /(chrome|crios)\/([\d.]*)/.test(ua);
var isBaidu = /baidu/i.test(ua);
var ios8up = /version\/(\d+)(:?.+)mobile(:?.+)safari(:?.+)$/i.test(ua) && RegExp.$1 > 8;
var isRuning = false;
var defalutDelayTime = 1.5 * 1000;
module.exports = {
    open: function(url, errorCb, delayTime) {
        if(!delayTime){
            delayTime = defalutDelayTime;
        }
        if(!url){
            throw new Error('need scheme url');
        }
        if(!errorCb){
            throw new Error('need error callback');
        }
        if(Object.prototype.toString.call(errorCb) !== '[object Function]'){
            throw new Error('errorCb must be a function!');
        }

        if (isRuning) {
            return;
        }
        isRuning = true;
        var errorIde = setTimeout(function() {
            isRuning = false;
            errorCb();
        }, delayTime);

        function changeVisibility() {
            if (document.hidden) {
                //执行成功
                clearTimeout(errorIde);
                isRuning = false;
            }
        }
        document.removeEventListener('visibilitychange', changeVisibility, false);
        document.removeEventListener('-webkit-visibilitychange', changeVisibility, false);
        document.addEventListener('visibilitychange', changeVisibility, false);
        document.addEventListener('-webkit-visibilitychange', changeVisibility, false);

        if (isChrome && !isBaidu || ios8up) {
            var openWin = window.open(url, "_self", "height=1,width=1,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no");
            var openIde = setInterval(function() {
                if ('object' == typeof i) {
                    clearInterval(openIde);
                    openIde.close();
                }
            }, 10);
        } else {
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = url;
            document.body.appendChild(iframe);
        }
    }
}


/***/ })
/******/ ]);
});