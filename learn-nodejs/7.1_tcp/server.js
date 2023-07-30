var net = require('net');

/**
 * 对于通过net.createServer创建的服务器，它是一个eventemitter实例，它的自定义事件主要有以下几种：
 * listening 
 * connection
 * close
 * error
 * 在node中，tcp针对网络中的小数据包有一定的优化策略，nagle算法。nagle算法要求缓冲区的数据达到一定数量或者一定事件后才将其发出。数据有可能被延迟发送。
 */
var server = net.createServer();

server.on('connection', socket => { 
    //新的连接
    socket.on('data', bufferData => {
        console.log(`server get data:${bufferData.toString('utf8')}`);
        socket.write('你好,我是服务器');
    });
    socket.on('end', () => {
        console.log(`socket连接断开`);
    });
});

server.listen(8970, () => { 
    console.log(`server start`);
})
