const fork = require("child_process").fork;
const server = require("net").createServer();
const numCpus = require('os').cpus().length;
server.listen(9980);

const serverObj = {};
function forkServer() {
    let childPorcess = fork('child.js');
    childPorcess.on('exit', (code, signal) => {
        console.log(`child process exit ,childId:${childPorcess.pid},code:${code},signal:${signal}`);
        delete serverObj[childPorcess.pid];
        forkServer();
    });
    serverObj[childPorcess.pid] = childPorcess;
    childPorcess.send('server', server);
    console.log(`create childProcess , pid:${childPorcess.pid} , childProcessPids:${JSON.stringify(Object.keys(serverObj))}`);
}

for (let i = 0; i < numCpus; i++){
    forkServer();
}

process.on('exit', () => {
    console.log(`process.master exit `);
    for (let pid in serverObj) {
        serverObj[pid].kill();
        console.log(`send kill msg to chldpid:${pid}`);
    }
})

function randomTimes() {
    return Math.random() * 3000 + 2000;
}

setTimeout(function killOneChildProcess() {
    let serverPids = Object.keys(serverObj);
    let pidTarget = serverPids[0];
    console.log(`kill one child , pids:${JSON.stringify(serverPids)}, pidTarget:${pidTarget}`);
    serverObj[pidTarget].kill();
    setTimeout(killOneChildProcess, randomTimes());
}, randomTimes());

setTimeout(() => {
    process.exit();
}, 15000);