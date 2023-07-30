var cp = require('child_process');
var n = cp.fork(__dirname + '/child.js');

n.on('message', function (m) {
    console.log('parent got message:' + JSON.stringify(m));
});

n.send({ hello: 'world' });

/**
 * 父子进程之间会创建ipc通道，通过ipc通道，父子进程之间能通过message 和send（）传递消息。
 * IPC:inter-process combination 进程间通信。
 * node 实现ipc通道的是管道技术（由libuv提供），只是一个抽象层面的称呼。
 * 
 * 父进程在创建子进程之前，会创建ipc通道并监听它，然后才真正创建子进程。并通过环境变量（node_channel_fd）告诉
 * 子进程这个ipc通道的文件描述符。子进程在启动的过程中，根据文件描述符，去连接这个已经存在的ipc通道，从而完成父子进程
 * 之间的连接。
 */