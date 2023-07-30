const http = require("http");

/**
 * http:构建在tcp之上，属于应用层协议
 * http是基于请求响应式的，以一问一答的方式实现服务，虽然基于tcp会话，但本身并无会话的特点。
 * 相应结束后，http服务器可能会讲当前的连接用于下一个请求，或者关闭连接。值得注意的是，报头是在报文体发送之前发送的，一旦开始了数据的发送，
 * weitehear,setheader将不再生效。
 * 无论服务器端在处理逻辑时是否发生异常，务必在结束时调用res.end结束请求，否则客户端将一只处于等待的状态。
 * 
 * 服务器是一个eventemitter实例，自定义事件：
 * 
 * connection：在开始http请求和响应前，客户端和服务器需要建立底层的tcp连接，这个连接可能因为开启了keep-alive,可以在多次请求响应间使用，
 * 这个连接建立时，服务器触发一次connection事件
 * 
 * request：建议tcp连接后，http模块底层将在数据流中抽象出http请求和http响应，当请求数据发送到服务器端，在解析出http请求头后，将会触发该事件。
 * 在res.end后，tcp连接可能将用于下一次的请求响应。
 * 
 * close：
 * checkcontinue:发送较大数据时使用
 * connect：客户端发起connect请求时触发，而发起http请求通常在http代理时出现；如果不坚挺该事件，发起该请求的连接将会关闭。
 * upgrade:
 * clientError
 */
let httpServer = http.createServer();

httpServer.on("connection", (socket) => { 
    console.log(`tcp连接建立：${JSON.stringify(socket.address())}`);
})

httpServer.on("request", (req, res) => { 
    console.log(`httpserver 收到请求`);
    let url = req.url;
    console.log(`path:${url}`);
    let method = req.method;
    console.log(`method:${method}`);

    let buffers = [];
    req.on('data', (chunk) => {
        buffers.push(chunk);
    }).on('end', () => {
        var buffer = Buffer.concat(buffers).toString('utf8');
        if (buffer && buffer.length) {
            let body = JSON.parse(buffer);
            console.log(`收到报文体:${JSON.stringify(body)}`);
        }
        res.writeHead(200, { 'Content-Type': 'text/json' });
        let result = { b: 2 };
        res.end(new Buffer(JSON.stringify(result), 'utf8'));
    })
})

httpServer.on('close', () => { 
    console.log('on close');
})

httpServer.listen(9600, '127.0.0.1', () => {
    console.log(`server start ,port: 9600`);
});