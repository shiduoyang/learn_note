const events = require("events");
const util = require('util');

/**
 * 由于deferred逻辑较为简单，合并进promise中
 * @param {*} func  function : (resolve:function,reject function)
 */
function Promise(func) {
    events.EventEmitter.call(this);
    func(data => {
        this.emit('success', data);
    }, error => {
        this.emit('error', error);
    });
    return this;
}
util.inherits(Promise, events.EventEmitter);
Promise.prototype.then = function (fulfilledHandle, errorHandle) {
    if (typeof fulfilledHandle == 'function') {
        this.once('success', fulfilledHandle);
    }
    if (typeof errorHandle == 'function') {
        this.once('error', errorHandle);
    }
    return this;
}

/**
 * test
 */
{
    new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve('done') : reject(new Error('temp error'));
        }, 1000);
    }).then(
        result => {
            console.log(result);
        }, err => {
            console.log(`error occured:${err}`);
        }
    );

    (async () => {
        let result = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1);
            }, 1000);
        })
        console.log(result);
    })();
}
