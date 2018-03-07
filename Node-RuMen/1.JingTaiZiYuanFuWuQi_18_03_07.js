const http = require('http');
const path = require('path');
const fs = require('fs');
const conf = require('1.conf.js');
const server = http.createServer((req, res) => {
    const filePath = path.join(conf.root, req.url);
    fs.stat(filePath, (err, stats) => {

    })

});

server.listen(conf.port, conf.hostname, () => {
    const adr = `http://${conf.hostname}:${conf.port}`;
    console.log(`Server started at ${adr}`);

})