/**
 * 4.3 异步编程解决方案
 * 异步编程带来的一些问题：
 * 1:异常处理
 * 2:函数嵌套过深
 * 3:阻塞代码
 * 4:多线程编程
 * 5:异步转同步
 * 异步编程解决方案（并列三种）
 * 1: 事件发布、订阅模式
 * 2: Promise/Deerred模式
 * 3: 流程控制库
 */



/**
 * 4.3.1 事件发布、订阅模式
 * 订阅事件是一个高阶函数的引用。事件发布/订阅模式可以时间一个事件与多个回调函数的关联，这些回调函数又被称为事件侦听器。
 * 事件侦听器也是一种钩子机制，利用钩子到处内部数据或状态给外部的调用者。
 * 1:继承events模块
 * 2:利用事件队列解决雪崩问题
 * 3:多异步之间的协作方案
 */
const events = require("events");//发布订阅模式的简单实现，
const util = require('util');

{
    /**
     * 继承events模块
     */
    function Stream() {
        events.EventEmitter.call(this);
    }

    util.inherits(Stream, events.EventEmitter);
}


{
    /**
     * 事件队列来解决雪崩问题。
     * 新来的请求
     */
    var proxy = new events.EventEmitter();
    var status = 'ready';
    var select = function(callback){
        proxy.once('selected',callback);
        if (status == `ready`) {
            status = 'pending';
            setTimeout(() => {
                proxy.emit('selected', 1);
                status = 'ready';
            }, 1000);
        }
    }

}

{
    /**
     * 多异步之间的协作方案 多对一
     */
    console.log(`多异步之间的协作方案 多对一 以count为哨兵`)
    let count = 0;
    let result = {};
    let done = function (k, v) {
        result[k] = v;
        console.log(`k:${k},v:${v}`);
        count++;
        if (count === 3) {
            console.log(`done,result:${JSON.stringify(result)}`);
        }
    }
    setTimeout(() => {
        done(`a`, 1);
    }, 500);
    setTimeout(() => {
        done(`b`, 2);
    }, 600);
    setTimeout(() => {
        done('c', 3);
    }, 700);

    /**
     * 用偏函数来处理哨兵变量和第三方函数的关系 多对一
     */
    let after = function (times, callback) {
        let count = 0;
        let result = {};
        return function (k, v) {
            result[k] = v;
            console.log(`k:${k},v:${v}`);
            count++;
            if (count === times) {
                console.log(`after done,result:${JSON.stringify(result)}`);
                callback(result);
            }
        }
    }
    let funcAfter = after(3, result => { 
        console.log(`funcAfter done,result:${JSON.stringify(result)}`);
    })

    setTimeout(() => {
        funcAfter('d', 1);
    }, 1000);
    setTimeout(() => {
        funcAfter('e', 2);
    }, 1100); setTimeout(() => {
        funcAfter('f', 3);
    }, 1200);

    /**
     * 多对多  发布订阅模式
     * 以偏函数完成多对一的收敛，以事件订阅/发布模式完成一对多的发散。
     * */
    var emitter = new events.EventEmitter();
    var doneEmitter = after(2, (result) => {
        console.log(`doneEmitter done, result:${JSON.stringify(result)}`);
    })
    emitter.on('done', doneEmitter);
    emitter.on('done', (result) => { 
        console.log(`other func,result:${JSON.stringify(result)}`);
    })

    setTimeout(() => {
        emitter.emit('done', 'g', 1);
    }, 2000);
    setTimeout(() => {
        emitter.emit('done', 'h', 2);
    }, 2100);
}

/**
 * 4.3.2 Promise/Deferred模式
 * 使用事件的方式时，执行流程需要被预先设定。
 * promise/deferred 模式是一种先执行异步调用，延迟传递处理的模式。
 * 1: promise/A
 */
{
    /**
     * promise/A的提议：一个promise对象只要具备then方法即可，但是对于then方法，有一下要求：
     *  接受完成态、错误态的回调方法。
     *  可选的支持progress事件回调作为第三个方法
     *  then方法只接受function对象，其余对象将被忽略
     *  then方法继续返回promise对象，已实现链式调用
     *  then(fulfilledHandle,errorHandle,progressHandle)
     * 通过继承node的events模块来完成一个简单的实现。
     * 
     */
    let Promise = function () {
        events.EventEmitter.call(this);
    }
    util.inherits(Promise, events.EventEmitter);
    /**
     * then方法将回调函数存放起来。
     */
    Promise.prototype.then = function (fulfilledHandle, errorHandle, progressHandle) {
        if (typeof fulfilledHandle == 'function') {
            //利用once方法，保证回调只执行一次
            this.once('success', fulfilledHandle);
        }
        if (typeof errorHandle == 'function') {
            this.once('error', errorHandle);
        }
        if (typeof progressHandle == 'function') {
            this.on('progress', progressHandle);
        }
        return this;
    }
    /**
     * Deffer对象触发执行回调函数
     * 即延迟对象。
     * deferred主要用于内部，用于维护异步模型的状态
     * promise 主要用于外部，通过then方法暴露给外部以添加自定义逻辑
     */
    var Deferred = function () {
        this.state = 'unfulfilled';
        this.promise = new Promise();
    }
    Deferred.prototype.resolve = function (obj) {
        this.state = 'fulfilled';
        this.promise.emit('success', obj);
    }
    Deferred.prototype.reject = function (err) {
        this.state = 'failed';
        this.promise.emit('error', err);
    }
    Deferred.prototype.progress = function (data) {
        this.promise.emit('progress', data);
    }

    // let myDeffered = new Deferred();
    // setTimeout(() => {
    //     myDeffered.resolve({ a: 1 });
    // }, 3000);

    var promisefy = function (res) {
        var deferred = new Deferred();
        var result = '';
        res.on('data', chunk => { 
            result += chunk;
            deferred.progress(chunk);
        })
        res.on('end', function () {
            deferred.resolve(result)
        })
        res.on('error', function (err) {
            deferred.reject(err);
        })
        return deferred.promise;
    }
    promisefy(res).then(() => {
        console.log(`done`)
    }, (err) => {
        console.log(err);
    }, (chunk) => {
        console.log(chunk);
    });



    /**
     * 实现链式调用
     */
    var DeferredLinked = function () {
        this.promise = new Promise();
    }
    DeferredLinked.prototype.resolve = function (obj) {
        
    }
}

/**
 * 4.3.3流程控制库
 * 尾出发与next
 * async
 * step
 * wind
 */

/**
 * 流程控制小结
 * 对比集中方案的区别：
 * 事件发布/订阅模式相对算是一种比较原始的方式；
 * promise/deferred模式贡献了一个非常不错的异步任务模型的抽象。
 * 而上述的流程控制方案与promise/deferred模式的思路不同，promise/deferred的重头在于封装异步的调用部分，流程控制库则显得没有模式，将
 * 处理重点放在回调函数的注入上。
 * 从自由度来说，async，step这类流程库要相对灵活的多
 * 除了async step wind 等方案外，还有一类通过源代码变异的方案来实现流程控制的简化，streamline是典型的例子。
 */

