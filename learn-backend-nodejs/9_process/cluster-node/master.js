const cluster = require('cluster');
// cluster.setupMaster({
//     exec: 'worker.js'
// })
let cpus = require("os").cpus();
let http = require("http");
// for (let i = 0; i < cpus.length; i++){
//     cluster.fork();
// }
if (cluster.isMaster) {
    for (let i = 0; i < cpus.length; i++){
        cluster.fork();
    }
} else {
    let server = http.createServer((req, res) => {
        res.end('hello im server' + process.pid);
    })
    server.listen(8976, () => {
        console.log(`server start ,pid:${process.pid}`);
    });
}