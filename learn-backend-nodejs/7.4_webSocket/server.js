/**
 * websocket协议与node之间的配合堪称完美。理由：
 * 1:websocket客户端基于事件的编程模型于node中自定义事件相差无几
 * 2:websocket实现了客户端于服务器端的长连接，而node事件驱动的方式十分擅长于大量的客户端保持高并发连接。
 * 除此之外，websocket于传统http有如下好处：
 * 1:客户端于服务器只建立一个tcp连接，可以使用更少的连接
 * 2:websocket服务器端可以推送数据到客户端，远比http请求响应模式更灵活，更高效
 * 3:有更轻量级的协议头，减少数据传送量
 * 
 * 相比于http，websocket更接近于传输层协议，它并没有在http的基础上模拟服务器端的推送，而是在tcp上定义独立的协议。让人迷惑的部分是websocket
 * 的握手部分是由http完成的，使人觉得它可能是基于http实现的。
 * websocket 主要有两个部分：握手和数据传输。
 */

const WebsocketServer = require("ws").Server;
const server = new WebsocketServer({ port: 9944 });
server.on('connection', ws => {
    console.log(`client connected ,`);
    ws.on('message', data => {
        console.log(data);
        ws.send("你好，我是服务器 9944");
    });
    ws.on('close', ws => {
        console.log(`客户端连接断开`);
    });
    ws.on('error', err => { 
        console.error(err);
    });
});
server.on('error', err => {
    console.error(err);
});
server.on('listening', () => {
    console.log(`start server: 9944`);
})

