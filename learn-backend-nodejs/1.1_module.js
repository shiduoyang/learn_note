console.log(require.extensions);// .js:func .json:func jnode:func
console.log(require.extensions[".js"]);


/**
 * 编译过程中，node对获取对JavaScript文件内容进行了头尾包装。
 * 这样，在各个模块文件间进行了作用域隔离。
 * 包装以后对代码会通过vm原生模块对runinthiscontext()方法执行，类似eval,只是具有明确上下文，不污染全局，返回一个具体对function对象。
 * 在执行以后，模块的exports属性被返回给调用方。
 */
(function (exports, require, module, __filename, __dirname) { 
    exports.func1 = function () {
        console.log(`this is func1`);
    }
})