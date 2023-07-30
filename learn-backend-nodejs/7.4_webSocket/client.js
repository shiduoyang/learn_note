const WebSocket = require("ws");
var socket = new WebSocket('ws://127.0.0.1:9944');
socket.onopen = function () {
    console.log('socket open');
    socket.send("你好，我是客户端");
}
socket.onmessage = function (event) {
    console.log(event.data);
}