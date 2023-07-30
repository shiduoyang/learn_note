/**
 * 单元测试
 * 
 * 1:单元测试：
 * 单元测试主要包含断言。测试框架、测试用例、测试覆盖率、mock、持续集成等几个方面。
 * 由于node特殊性： 异步代码测试和私有方法测试。
 * 2:性能测试
 * 2.1 基准测试
 * 2.2 压力测试
 * 2.3 基准测试驱动开发
 * 2.4测试数据于业务数据的转换
 */

{
    /**
     * 压力测试 $ ab -c 20 -t 3 http://127.0.0.1:8976/
     *  This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
        Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
        Licensed to The Apache Software Foundation, http://www.apache.org/

        Benchmarking 127.0.0.1 (be patient)
        socket: Too many open files (24)
        wudideMacBook-Pro:~ temp$ ab -c 20 -t 3 http://127.0.0.1:8976/
        This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
        Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
        Licensed to The Apache Software Foundation, http://www.apache.org/

        Benchmarking 127.0.0.1 (be patient)
        Completed 5000 requests
        Completed 10000 requests
        Completed 15000 requests
        Finished 15953 requests


        Server Software:
        Server Hostname:        127.0.0.1
        Server Port:            8976

        Document Path:          /               #文档路径
        Document Length:        20 bytes        #文档长度，报文大小

        Concurrency Level:      20              #并发级别
        Time taken for tests:   4.604 seconds   #完成所有测试的事件
        Complete requests:      15953           #共完成请求数量
        Failed requests:        0               #请求失败次数
        Total transferred:      1515535 bytes   #所有的报文大小
        HTML transferred:       319060 bytes    #仅http报文的正文大小
        Requests per second:    3465.12 [#/sec] (mean)                              #服务器每秒能处理多少请求
        Time per request:       5.772 [ms] (mean)                                   #用户平均等待时间
        Time per request:       0.289 [ms] (mean, across all concurrent requests)   #服务器平均请求处理时间
        Transfer rate:          321.47 [Kbytes/sec] received                        #传输率（传输的大小/传输时间），这个值受网卡的带宽限制

        Connection Times (ms)                                                       #连接时间
                    min  mean[+/-sd] median   max
        Connect:        0    1   0.6      1      15
        Processing:     0    3   1.4      2      17
        Waiting:        0    2   1.2      2      17
        Total:          1    3   1.3      3      19

        Percentage of the requests served within a certain time (ms)                #请求的响应时间分布
        50%      3
        66%      3
        75%      4
        80%      4
        90%      5
        95%      5
        98%      6
        99%      7
        100%     19 (longest request)
     * 
     * 
     * 
     */

}


{
    /**
     * 总结：
     * 测试是应用或者系统最重要的质量保证手段。
     * 单元测试能保证项目每个局部的正确性
     * 性能测试
     */
}