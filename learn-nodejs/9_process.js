/**
 * 9.1服务模型变迁
 * 石器时代：同步
 * 青铜时代：复制进程
 * 白银时代：多线程
 * 黄金时代：事件驱动
 */

/**
 * 9.2多线程架构
 * 9.2.1 创建子进程 child_process模块
 * spawn（其余三种都是spawn的延伸）
 * exec
 * execFile
 * fork
 * 9.2.2进程间通信：
 * 基于libuv的ipc通道，
 */
{
    var cp = require('child_process');
    cp.spawn('node', ['temp.js']);//执行命令()
    cp.exec('node temp.js', (error,stdout,stderror) => {
        console.log(`exec done , error:${error}, stdout:${stdout},stderror:${stderror},`);
    });
    // cp.execFile('./temp.js', (error, stdout, stderror) => {
    //     console.log(`execFile done , error:${error}, stdout:${stdout},stderror:${stderror},`);
    // });
    cp.fork('./temp.js');
}

/**
 * 9.2.3句柄传递
 * 句柄是一种可以用来标识资源的引用，它的内部包含了指向对象的文件描述符。文件描述符是一个整数值
 * 并非任意类型的句柄都能在进程之间传递，除非它有完整的发送和还原的过程。
 * 
 * 1:父进程 发送
 * 2:send方法将消息组装成两个对象，一个参数是handle,一个是message :
 * { cmd : 'NODE_HANDLE},type:'net.Server', msg: message} , 将对象stringfy序列化后，发送到ipc通道
 * 3:子进程收到父进程的消息后，parse解析还原为对象后，触发message时间将消息体传递给应用层使用。 
 * 
 * 
 * 多个应用监听相同端口时，文件描述符同一时间只能被某个进程所用。
, * 
 */


/**
 * 9.3集群稳定
 * 进程事件
 * 自动重启
 * 负载均衡
 * 状态共享：第三方数据存储 主动通知
 *  
 */
{
    
}

/**
 * 9.4 cluster模块
 */
 
 /**
  * 小结：
  * 通过child_process 模块可以大幅度提高node 的稳定性，但是一旦主进程出现问题，所有子进程豆浆失去管理。在node的进程管理之外，还需要监听进程数量
  * 或监听日志的方式确保整个系统的稳定性，即使主进程出错退出，也能及时得到监控警报。
  */