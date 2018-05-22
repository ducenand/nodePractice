// 6.1.1Buffer的结构
// 是一个典型的Javascript与C++结合的模块  Buffer属于堆外内存。Buffer在全局对象global中。


// 6.1.2Buffer对象

// Buffer对象类似数组，它的元素为16进制的两位数，即0到255的数值。
/**
 var str = "node.js";
 var buf = new Buffer(str, 'utf-8');
 console.log(buf);
 // => <Buffer 6e 6f 64 65 2e 6a 73>
 */

// 6.2.3 Buffer不支持的编码类型
const buf = new Buffer('你好');
// console.log(buf.toString('utf8',0,1));
// console.log(Buffer.isEncoding('gbk'));

// 对于不支持的编码类型转换，可以借助iconv 和 iconv-lite。
// iconv-lite采用纯Javascript实现，iconv通过C++调用libiconv库完成。前者比后者更轻量

const iconvLite = require('iconv-lite');
// var str = iconvLite.decode(buf, 'win1251');

const Iconv = require('iconv').Iconv;

// const _iconv = new Iconv('UTF-8','ASCII');

// var _iconv = new Iconv('UTF-8', 'ASCII//IGNORE');
// iconv.convert('ça va'); // returns "a va"
// var _iconv = new Iconv('UTF-8', 'ASCII//TRANSLIT');
// iconv.convert('ça va'); // "ca va"
// var _iconv = new Iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE');
// iconv.convert('ça va  '); // "ca va "

// var str = _iconv.convert('ça va');
// console.log(str);

//iconv-lite无法装换的内容如果是多字节，会输出�；如果是单字节则输出？。iconv则是三级降级策略，会尝试翻译无法装换的内容。

// 6.3 Buffer的拼接

const fs = require('fs');
const rs = fs.createReadStream('NodeApi.md',{highWaterMark: 11});
/**
rs.setEncoding('utf8');//窗前明月光，疑是地上霜。
let data = '';
rs.on("data", function (chunk) {
    data += chunk;
});

rs.on("end", function () {
    console.log(data);//窗前明��光，疑���地上霜。
});
*/

// 6.3.3 正确拼接Buffer
/**
let chunks = [];
let size = 0;
rs.on('data', function (chunk) {
    chunks.push(chunk);
    size += chunk.length;
});
rs.on('end', function () {
    let buf = Buffer.concat(chunks, size);
    let str = iconvLite.decode(buf, 'utf8');
    console.log(str);
});
*/
// 6.4  Buffer 与性能


























