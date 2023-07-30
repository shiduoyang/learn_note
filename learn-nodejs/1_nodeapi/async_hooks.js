const async_hooks = require('async_hooks');
const fs = require('fs');

// console.log(`global.asyncId:`, async_hooks.executionAsyncId());
// console.log(`global.triggerAsyncId:`, async_hooks.triggerAsyncId());
// fs.open('./assert.js', 'r', (err, fd) => {
//     console.log(`fs.open.asyncId:${async_hooks.executionAsyncId()}`);
//     console.log(`fs.open.triggerAsyncId:${async_hooks.triggerAsyncId()}`);
// });


let asynchook = async_hooks.createHook({
    init: function (asyncId, type, triggerAsyncId, resource) {
        //console.log是一个异步调用，如果我们在asynchook函数中再调用console.log，那么将再次出发相应的hook事件，造成死循环
        //引用，所以我们在次函数中必须使用同步打印日志方式来追踪
        fs.appendFileSync(1, `${asyncId} init, triggetAsyncId:${triggerAsyncId}\n`);
    },
    before: function (asyncId) {
        fs.appendFileSync(1, `${asyncId} before callback\n`);
    },
    after: function (asyncId) {
        fs.appendFileSync(1, `${asyncId} after callback\n`);
    },
    destory: function (options) {
        fs.appendFileSync(1, `${JSON.stringify(options)} destory\n`);
    },
    promiseResolve: function (asyncId) {
        fs.appendFileSync(1, `${asyncId} promiseResolve\n`);        
    }
}).enable();//开启钩子功能

// Promise.resolve(1729).then(() => {
//     console.log(`asyncId:${async_hooks.executionAsyncId()} troggerOd${async_hooks.triggerAsyncId()}`);
// });

// new Promise((resolve) => {
//     resolve(true);
// }).then(a => {
//     // console.log(a); 
// });
console.log(1);
console.log(2);
console.log(3);