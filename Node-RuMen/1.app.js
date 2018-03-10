const http = require('http');
const path = require('path');
const chalk = require('chalk');
const conf = require('./conf/1.conf');
const route = require('./helper/1.route');

class Server{

    constructor (config) {
        this.conf = Object.assign({},conf,config);
    }

    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url);
            route(req,res,filePath,this.conf);

        });

        server.listen(this.conf.port, this.conf.hostname, () => {
            const adr = `http://${this.conf.hostname}:${this.conf.port}`;
            console.log(`Server started at ${chalk.blue(adr)}`);
        });
    }

}


module.exports = Server;