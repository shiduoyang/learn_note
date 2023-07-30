var dgram = require("dgram");

var message = new Buffer('你好，我是客户端');
var client = dgram.createSocket('udp4');

/**
 * 这些参数分别为发送的buffer,buffer的偏移，butter长度，目标端口，目标地址，回调函数。
 * 与tcp的write相比，参数多，但更灵活，可以发送给网络上但多个服务器端。而tcp如果要发送数据给另一个服务器端，需要重新通过套接字构造新的
 * 连接。
 */
client.send(message, 0, message.length, 7999, (err, bytes) => { 
    client.close();
})