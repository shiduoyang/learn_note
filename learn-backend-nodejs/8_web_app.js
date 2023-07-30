/**
 * 对于一个web应用而言，可能有如下需求：
 * 请求方法的判断
 * url的路径解析
 * url种查询字符串解析
 * cookie解析
 * basic表单的解析
 * 任意格式文件的上传处理
 * session的需求
 */

/**
 * 8.3路由解析
 * 8.3.3 restful （representational state transfer）表现层状态转化。设计哲学主要是将
 * 服务器端提供的内容实体看作一个资源
 */

 /**
  * 8.4中间件
  */
{
    var querystring = function (req, res, next) {
        console.log('im querystring middleaware');
        next();
    }

    let app = {};
    app.use = function (path) {
        var handle = {
            //第一个参数作为路径
            path: pathRegexp(path),
            //其他的都是处理单元
            stack: Array.prototype.slice.call(arguments, 1)
        }
        routes.call.push(handle);
    }
    app.use('/user/:username', querystring, cookie, session, function (req, res) {
        
    });

    var match = function(pathname, routes){
        for (var i = 0; i < routes.length; i++){
            var route = routes[i];
            var reg = route.path.regexp;
            var matched = reg.exec(pathname);
            if (matched) {
                //将中间件数组交给handle处理
                handle(req, res, route.stack);
                return true;
            }
        }
        return false;
    }   
    var handle = function(req, res, stack){
        var next = function () {
            var middleaware = stack.shift();
            if (middleaware) {
                middleaware(req, res, next);
            }
        };
        next();
    }
}
 