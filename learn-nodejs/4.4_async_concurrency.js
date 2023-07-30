/**
 * 尽管要压榨底层系统的性能，但还是要给予一定的过载保护，以防止过犹不及。
 */

 /**
  * 4.4.1bagpipe的解决方案
  * 通过一个队列来控制并发量
  * 通过当前活跃（指调用发起但为执行回调）的异步调用量小于限定值，从队列中取出执行。
  * 如果活跃调用达到限定值，调用暂时存放在队列中
  * 每个异步调用结束时，从队列中取出新的异步调用执行。
  */
{
    let asyncFunc = function () {
        return new Promise((res, rej) => { 
            setTimeout(() => {
                res(1);
            }, 1000);
        })
    }
    const Bagpipe = require("bagpipe");
    var bagpipe = new Bagpipe(10);
    for (var i = 0; i < 100; i++){
        bagpipe.push(asyncFunc, function () {
            console.log(`done ${i}`);
        })
    }
    bagpipe.on('full', (length) => { 
        console.log(`达到最大并发数，当前队列长度：${length}`);
    })
}
 

/**
 * 4.4.2 async
 */
{
    const async = require('async');
    console.log(`async test`);
    async.parallelLimit([
        function (callback) {
            callback(null, 0);
        },
        function (callback) {
            callback(null, 1);
        }
    ], 1, (err, results) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(results);
    })
    
    console.log('async.queue');
    var q = async.queue((callback) => {
        setTimeout(() => {
            callback(null);
        }, 1000);
    }, 4);
    q.drain = function () {
        console.log(`done`);
    }
    for (let i = 0; i < 1000; i++){
        q.push(() => { 
            console.log(`${i} done`);
        })
    }
}