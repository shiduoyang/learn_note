const child = require("child_process").fork('child.js')
var server = require('net').createServer();

server.on("connection", function (socket) {
    socket.end('handleed by parent \n');
})

server.listen(8337, '127.0.0.1', function () {
    console.log(`server listen : 8337`)
    child.send('server', server);
});

/**
 * 每次连接，可能被父进程处理，也可能被主进程处理，
 * 这是在tcp层面发生的事情
 */