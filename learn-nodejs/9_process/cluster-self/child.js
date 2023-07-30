const http = require("http");

let server= http.createServer((req, res) => {
    res.end('hello im child server:' + process.pid);
});

process.on('exit', () => {
    console.log(`process pid :${process.pid}  exit`);
});

process.on('message', (message, handle) => { 
    if (message == 'server') {
        handle.on('connection', (socket) => {
            server.emit('connection', socket); 
        });
    }
});

process.on('uncaughtException', (err) => {
    console.log(`uncaughtException:`, err);
    process.send({ act: 'suicide' });
    server.close(() => {
        process.exit();
    });
})