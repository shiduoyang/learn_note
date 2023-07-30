const fork = require("child_process").fork;
var numCpus = require('os').cpus().length;
for (var i = 0; i < numCpus; i++){
    fork('./worker.js')
}
/**
 * master-worker 模式，又称为主从模式。
 * 主进程不负责具体的业务处理，而是负责调度或管理工作进程，它是趋向于稳定的。
 * 工作进程负责具体的业务处理。
 */