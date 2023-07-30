process.on('message', function (m) {
    console.log('child got message:' + JSON.stringify(m));
})
process.send({ foo: 'bar' });