'use strict';
var ua = navigator.userAgent.toLowerCase();
var platform = navigator.platform.toLowerCase();
var isChrome = /(chrome|crios)\/([\d.]*)/.test(ua);
var isBaidu = /baidu/i.test(ua);
var ios8up = /version\/(\d+)(:?.+)mobile(:?.+)safari(:?.+)$/i.test(ua) && RegExp.$1 > 8;

module.exports = {
    open: function(url) {
        if (isChrome && !isBaidu || ios8up) {
            var openWin =  window.open(url, "_self", "height=1,width=1,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no");
            var openIde = setInterval(function(){
                if('object' == typeof i){
                    clearInterval(openIde);
                    openIde.close();
                }
            },10);
        } else {
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = url;
            document.body.appendChild(iframe);
        }
    }
}
