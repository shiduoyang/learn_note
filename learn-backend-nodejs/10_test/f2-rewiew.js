/**
 * rewiew注入代码
 */
exports.__set__ = function (name, value) {
    eval(name + '=' + value.toString());
}
exports.__get__ = function (name) {
    return eval(name);
}
//结束

let a = 1;
let b = 2;
let c = 3;
exports.d = 4;