// Buffer 用于读取或操作二进制数据流
// V8堆外部的固定大小的原始内存分配
// Buffer大小在创建时确定，且无法更改

//长度为10，且用0填充的buffer
const buf1 = Buffer.alloc(10);
//长度为10，且用1填充的buffer
const buf2 = Buffer.alloc(10, 1);
//长度为10，且未初始化的Buffer
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);
console.log(`buf3.after alloc:${JSON.stringify(buf3)}`);
buf3.fill(0);
console.log(`buf3.after fill:${JSON.stringify(buf3)}`);

//创建一个包含[0x1,0x2,0x3]的buffer
const buf4 = Buffer.from([1, 2, 3]);
console.log(`buf4.after from:${JSON.stringify(buf4)}`);

//创建一个包含UTF8字节[0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('test');
console.log(`buf5.after from:${JSON.stringify(buf5)}`);

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
console.log(`buf6.after from:${JSON.stringify(buf6)}`);

// Buffer.alloUnsafe和Buffer.allocUnsafeSlow不安全的原因
// 分配的内存片段是未初始化的，速度非常快但可能包含敏感的旧数据

//Buffer与字符编码
const buf7 = Buffer.from('hello world', 'ascii');
console.log(buf7.toString('hex'));
console.log(buf7.toString('base64'));

// Buffer#slice会在Buffer上创建而不拷贝
const arr8 = [1, 2, 3, 4, 5];
arr8.slice(0, 2)[0] = 6;
console.log(`arr8[0]:${arr8[0]}`);
const buf8 = Buffer.from([1, 2, 3, 4, 5]);
buf8.slice(0, 2)[0] = 6;
console.log(`buf8[0]:${buf8[0]}`);

// API LIST

// new Buffer 废弃

/**
 * Buffer.alloc(size[,fill[,encoding]])
 * Allocates a new buffer of {size} octets
 * fill with specified character
 *  */ 
const buf9 = Buffer.alloc(5);
console.log(`buf9:${JSON.stringify(buf9)}`);

/**
 * Buffer.allocUnsafe(size)
 * 创建的buffer，底层内存是未初始化的
 */
const buf10 = Buffer.allocUnsafe(5);
console.log(`buf10:${JSON.stringify(buf10)}`);

/**
 * Buffer.allocUnsafeSlow(size)
 * 创建非内存池的buffer实例并拷贝相关的比特位出来
 */
const buf11 = Buffer.allocUnsafeSlow(10);
console.log(`buf11:${JSON.stringify(buf11)}`);

const bufferModel = require('buffer');

// 单个Buffer实例允许的最大内存
console.log(bufferModel.constants.MAX_LENGTH);

//单个string实例允许的最大长度
console.log(bufferModel.constants.MAX_STRING_LENGTH);
