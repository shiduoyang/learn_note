var cp = require("child_process");
var child1 = cp.fork('child.js');
var child2 = cp.fork('child.js');

var server = require('net').createServer();
server.listen(8777, '127.0.0.1', function () {
    child1.send(`server`, server);
    child2.send('server', server);
    server.close();
})