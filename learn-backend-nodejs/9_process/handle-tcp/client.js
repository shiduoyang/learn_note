var socket = require('net').createConnection({
    port: 8337,
    host: '127.0.0.1',
}, function () {
    console.log('tcp linked ');
});
socket.write('hello im client');

socket.on("data", (dataBuff) => {
    let data = dataBuff.toString('utf8');
    console.log(`tcp client got data:${data}`);
})

socket.on('error', (err) => { 
    console.log(`tcp client error:${err}`);
})
