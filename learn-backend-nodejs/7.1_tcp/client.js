var net = require('net');
var client = net.createConnection({ host:'127.0.0.1', port: 8970 }, () => { 
    console.log('client connected');
    client.write('你好，我是客户端');
});

client.on("data", bufferData => { 
    let strValue = bufferData.toString('utf8');
    console.log(`client get data:${strValue}`);
})

client.on('end', () => { 
    console.log('client disconnected');
})