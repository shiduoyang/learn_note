/**
 * 6: buffer
 * buffer是一个像array一样的对象，但它主要用于操作字节.
 * buffer是二进制数据，与字符串之间存在编码关系。
 * buffer 性能相关代码由c++实现，非性能相关由JavaScript实现。由于由c++申请内存，属于堆外内存。
 * buffer 内存由c++申请，由JavaScript非配内存。内存管理机制：slab
 * 
 * 小结：
 * 真正内存由node 在c++层面提供，JavaScript层面使用它。当进行小而频繁的buffer操作时，采用slab的机制进行预先申请和事后分配，使得JavaScript到
 * 操作系统之间不必有过多的内存申请方面的系统调用。对大块的buffer而言，则直接食用c++层面提供的内存，而无需细腻的分配操作。
 */
{
    /**
     * 正确拼接buffer的方式： 用一个数组来存储用到的所有buffer ,并记录总长度，最后用buffer.concat方法来合并。
     */
    const iconv = require('iconv-lite');
    var chunks = [];
    var size = 0;
    for (let i = 0; i < 100; i++){
        let chunk = new Buffer(`哈${i}`,'utf8');
        chunks.push(chunk);
        size += chunk.length;
    }
    var buf = Buffer.concat(chunks, size);
    var str = iconv.decode(buf, 'utf8');
    console.log(str);
}