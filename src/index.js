'use strict';
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
