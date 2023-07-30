var http = require('http');
var server = http.createServer((req, res) => {
    console.log(`handled by child`);
    res.end('hello ,im server');
});

process.on('message', (message, tcpServer) => {
    console.log(`child get message :${message}`);
    if (message == 'server') {
        tcpServer.on('connection', function (socket) {
            server.emit('connection', socket);
        });
        tcpServer.on('error', (err) => {
            console.log(err);
        })
    }
});