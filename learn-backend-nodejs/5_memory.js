/**
 * 5章内存机制
 * 内存控制正是在海量请求和长时间运行的前提下进行探讨的。
 */

/**
 * 5.1v8的垃圾回收机制与内存机制
 * 5.1.1 node与v8
 * 5.1.2 v8的内存限制 
 *       64位 32 位分别限制为1.4g 0.7g ，原因是垃圾回收机制完成一次需要的时间。v8做1.5g小的垃圾回收需要50毫秒以上，非增量式垃圾回收甚至
 *       需要1秒以上。这是引起JavaScript线程暂停执行的时间。
 * 5.1.3 v8的对象分配
 * 5.1.4 v8的垃圾回收机制
 *       内存分代,按代采用合适的回收算法
 *       scavenge算法，from to； from存活对象复制到to；from清空；角色互换。 适用于新生代。
 *       分代式垃圾回收前提下，from复制到to时先进行检查，如经历过一次回收||to利用率>25%，则移动到老生代空间，如果没有，复制到to。   
 *       
 *       mark-sweep&mark-compact 
 *       mark-sweep：标记活着的对象，清除没有标记的。（引起内存碎片）
 *       mark-compact：标记整理，标记活着的，清除没有标记的，向同一端移动。移动完成后，清除剩余内存。
 *       v8当老生代内存足够时，采用mark-sweep,因速度快；内存不足时，采用mark-compact；
 *       
 * 全停顿和增量标记。
 *        
 * 5.1.5 查看垃圾回收日志
 *      node --trace_gc -e "var a = [];for (var i = 0; i < 1000000; i++) a.push(new Array(100));" > gc.log
 *      node --trace_gc xxx.js
 *      
 *      查看执行时的性能分析数据，其中包含了垃圾回收执行时占用的时间，基本不具有可读性。可使用v8的linux-tick-processor工具查看，可
 *      在node源码 deps/v8/tools
 *      node --prof -e "var a = [];for (var i = 0; i < 1000000; i++) a.push(new Array(100));"
 *      node --prof xxx.js 
 */
{
    /**
     * 5.1.1
     */
    console.log(process.memoryUsage());

    Date.now();
}



/**
 * 5.2高效使用内存
 * 作用域
 * 闭包 （实现外部作用域访问内部作用域中变量的方法叫做闭包），这得益于高阶函数的特性：函数可以作为参数或者返回值。
 * 
 * 小结：在正常的JavaScript中，无法立即回收的内存有闭包和全局变量应用这两种情况。由于v8的内存限制，要十分小心此类变量是否无限制的增加，因为
 * 它会导致老生代中的对象增多。
 */
{

}

/**
 * 5.3内存指标
 * 5.3.1 查看内存使用情况
 * 5.3.2 堆外内存  堆中的内存用量总是小于进程的常驻内存用量，这意味着node中的内存使用并非都是通过v8分配的。不是通过v8分配的内存称为堆外内存。
 * 
 * 小结：node的内存构成主要由通过v8进行分配的部分和node 自行分配的部分。受v8的垃圾回收限制的主要是v8的堆内存。
 */

/**
 * 5.4内存泄露
 * 内存泄漏的实质：该回收的对象没有被回收，常驻老生代
 * 通常原因：
 * 缓存
 * 队列消费不及时
 * 作用域未释放
 * 5.4.1 慎将内存当缓存，防止无限制增长。
 *       1: 内存限制策略 
 *              如： 键超过阈值，以某方式进行淘汰（先进先出 lru）
 *       2: 缓存的解决方案
 *              考虑的问题：
 *              1：控制缓存大小
 *              2：进程间不能共享内存，多进程如有重复缓存数据，造成资源浪费
 *          比较好的解决方案是采用进程外的缓存。redis memcached
 * 5.4.2 关注队列状态
 *      队列堆积，内存上涨
 *      表层解决方案是采用消费速度更高的技术
 *      深度解决方案是监控队列的长度，一旦堆积，应当通过监控系统产生报警并通知相关人员。
 */

 /**
  * 5.5内存泄漏排查
  * v8-profiler
  * node-heapdump
  * nnode-mtrace
  * dtrace
  * node-memwatch
  */