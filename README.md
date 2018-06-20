# openApp

web浏览器，通过，scheme协议方式打开app

## api

```javascript
//cmd   support umd（支持umd格式） 在浏览器直接引入的全局模式下，全局对象为openApp
var openApp = require('open-native-app');
openApp.open('sinablog://blog.sina.com.cn?from=sinacn&jumptype=adetail&articleid=7ffe016f0102x21w&bloguid=2147352943',function(code){
    switch (code){
        case 'ios':
        break;
        case 'android':
        break;
    }
    console.log('in wx will call this callback.');
},function(){
    console.log('error');
}, 2000);

/**
 * openApp.open(url,errorCb,delay)
 * url: scheme url to open url （打开app的请求地址）
 * errorCb: error callback【eg，user not install your app】 （错误的回调函数）
 * delay: timeout delay，if timeout and not call app, will call errorCb.（超时时间，单位毫秒，如果超时，同时没有呼起app，将会调用errorCb函数。注意在ios上因为会弹出让用户选择是否打开app的弹窗，如果长时间没有操作，或者点击不打开，在时间超时的时候也会调用errorCb函数。
 */


// in link script mod Global variable (在全局外链引入的情况下，暴露全局变量为 openApp)
openApp.open(....)

```

## browser support

not support android 4.4 below

uc 11+
qq 7+
ios 9 and ios 10
chrome ?
wx will call wxCb function
