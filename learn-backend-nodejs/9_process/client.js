const http = require('http');
var req = http.request({ hostname: '127.0.0.1', port: 9908, method: 'GET' }, (res) => {
    let statusCode = res.statusCode;
    console.log(`statusCode:${statusCode}`);
    let headers = res.headers;
    console.log(`headers:${JSON.stringify(headers)}`);
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log(chunk)
    })
});
req.end();