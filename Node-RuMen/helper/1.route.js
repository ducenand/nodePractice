const util = require('util');
const path = require('path');
const fs = require('fs');
const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);
const Handlebars = require('handlebars');
const config = require('../conf/1.conf');
const mime = require('../helper/1.mime')
const compress = require('../helper/1.compress');
const range = require('../helper/1.range');

const tplPath = path.join(__dirname, '../template/1.tpl.html');
const source = fs.readFileSync(tplPath, 'utf8');
const template = Handlebars.compile(source);

module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            const contentType = mime(filePath);

            res.setHeader("Content-Type", contentType);
            let rs;
            const {code, start, end} = range(stats.size, req, res);
            if (code === 200) {
                res.statusCode = 200;
                rs = fs.createReadStream(filePath)
            } else {
                res.statusCode = 206;
                rs = fs.createReadStream(filePath, {start, end});
            }

            if (filePath.match(config.compress)) {
                rs = compress(rs, req, res);
            }
            rs.pipe(res);

        } else if (stats.isDirectory()) {

            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            const dir = path.relative(config.root, filePath)
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files: files.map(file => {
                    return {
                        file,
                        icon: mime(file)
                    }
                })
            };
            res.end(template(data));

        }
    } catch (ex) {
        console.error(ex);
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end(`${filePath} is not a directory or file\n ${ex.toString()}`);

    }

};