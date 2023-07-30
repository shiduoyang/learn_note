const http = require("http");

function startGetRequest() {
    var req = http.request({ hostname: '127.0.0.1', port: 9600, path:'/path1', method: 'GET' }, (res) => {
        let statusCode = res.statusCode;
        console.log(`statusCode:${statusCode}`);
        let headers = res.headers;
        console.log(`headers:${JSON.stringify(headers)}`);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk)
        })
    });
    req.end();
}

function startPostRequest() {
    let req = http.request({ hostname: '127.0.0.1', port: 9600, path:'/url2', method: 'POST' }, (res) => {
        let statusCode = res.statusCode;
        console.log(`statusCode:${statusCode}`);
        let headers = res.headers;
        console.log(`headers:${JSON.stringify(headers)}`);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
        })
    });
    let data = { a: 1 }
    req.write(new Buffer(JSON.stringify(data), 'utf8'), () => {
        console.log('向报文体中写入数据')
    })
    req.end();
}

startGetRequest();
// startPostRequest();

/**
 * curl -v http:127.0.0.1:9600
 * 来查看这次网络通信的所有报文信息，豹纹信息分为几个部分：
 * 第一部分是三次握手
 * 第二部分是客户端向服务器请求报文
 * 第三部分是服务器发送响应内容
 * 第四部分是结束会话的信息
 * 从报文信息中可以看出http的特点：基于响应式的，以一问一答的方式
 * */

// * Rebuilt URL to: http:127.0.0.1:9600/
// * Port number ended with '.'
// * Closing connection -1
// curl: (3) Port number ended with '.'
// wudideMacBook-Pro:7.3_http.js temp$ curl -v http://127.0.0.1:9600


// * Rebuilt URL to: http://127.0.0.1:9600/
// *   Trying 127.0.0.1...
// * TCP_NODELAY set
// * Connected to 127.0.0.1 (127.0.0.1) port 9600 (#0)
// tcp三次握手


// > GET / HTTP/1.1
// > Host: 127.0.0.1:9600
// > User-Agent: curl/7.54.0
// > Accept: */*
// > 
// 完成握手后，客户端向服务器发送请求报文


// < HTTP/1.1 200 OK
// < Content-Type: text/json
// < Date: Thu, 06 Jun 2019 10:07:19 GMT
// < Connection: keep-alive
// < Transfer-Encoding: chunked
// < 
// 服务器端完成处理后，向客户端发送响应内容，包括响应头和响应体


// * Connection #0 to host 127.0.0.1 left intact
// 结束会话的信息。