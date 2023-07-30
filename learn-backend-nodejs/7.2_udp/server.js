/**
 * UDP又称用户数据包协议，与tcp一样同属于网络传输层。
 */
{
    var dgram = require('dgram');
    var socket = dgram.createSocket('udp4');
}



/**
 * UDP server
 */
{
    var dgram = require('dgram');
    /**
     * dgram.createSocket是一个eventemitter实例，具备一下自定义事件：
     * message
     * listeningn
     * close
     * error
     */
    var server = dgram.createSocket('udp4');
    server.on('message', (msg, rinfo) => {
        console.log(`server got :${msg} from ${rinfo.address}:${rinfo.port}`);
    });
    server.on('listening', () => { 
        var address = server.address();
        console.log(`server listening :${address.address}:${address.port}`);
    })
    server.on("error", (err) => { 
        console.log(`error :${err}`)
    })
    server.bind('7999');//套接字将接收所有网卡上7999的信息，绑定完成后，触发listening事件
}