var http = require("http");
var server = http.createServer(function (req, res) {
    res.end('hello ,im server ' + process.pid);
})

process.on('message', (n, tcp) => { 
    if (n === 'server') {
        tcp.on('connection', (socket) => {
            server.emit('connection', socket);
        });
    }
})