const rewire = require('rewire');
const f2 = require('./f2');
console.log(f2.d);
/**
 * rewire除了像require一样对原始文件进行头尾包装，还注入了部分代码
 */
const f21 = rewire('./f2');
console.log(f21.__get__('b'));
const f2Rewiew = require('./f2-rewiew');
console.log(f2Rewiew.__get__('a')); 