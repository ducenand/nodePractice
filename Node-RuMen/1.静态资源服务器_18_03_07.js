const http = require('http');
const path = require('path');
const chalk = require('chalk');
const conf = require('./conf/1.conf');
const route = require('./helper/1.route');
const server = http.createServer((req, res) => {
    const filePath = path.join(conf.root, req.url);
    route(req,res,filePath);

});

server.listen(conf.port, conf.hostname, () => {
    const adr = `http://${conf.hostname}:${conf.port}`;
    console.log(`Server started at ${chalk.blue(adr)}`);
});