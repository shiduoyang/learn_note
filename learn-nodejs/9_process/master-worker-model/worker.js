let portTarget = Math.floor(Math.random() * 1000) + 8000;

var http = require('http');
http.createServer((req, res) => {
    res.end('hello im server');
}).listen(portTarget, '127.0.0.1', () => {
    console.log(`server port: ${portTarget}`);
});