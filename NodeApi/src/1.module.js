const fs = require('fs');

//查看可引入文件扩展名
// console.log(require.extensions);
//{ '.js': [Function], '.json': [Function], '.node': [Function] }

// var Math = require('math');

// console.log(Math.add(3,4));
// node在编译的过程中,Node对获取的Javascript文件进行了头尾包装如下：
/**
(function (exports, require, module, __filename, __dirname) {
    var Math = require('math');
    exports.area = function (radius) {
        return Math.PI*radius*radius;
    }

});
*/

// console.log(module);
// console.log(__filename,__dirname);
// 所以我们能在文件中直接使用require,__dirname等。

//核心模块分两块编写，javascript编写和C/C++编写

//1、javascript核心模块编译后的文件可以用下面方法查看；
// console.log(process.binding('natives'));
//fs.writeFile('binding.js',JSON.stringify(process.binding('natives')));
//编译后的模块缓存到NativeModule._cache对象上。文件模块则缓存到Module._cache对象上。



//2、纯c/c++编写的部分同意称为内建模块，通常不被用户直接调用。Node的buffer、crypto、evals、fs、os等模块都是部分通过c/c++编写的。

//console.log(process);

function req(moduleName) {
    let content = fs.readFileSync(moduleName,'utf8');
    console.log(content);
    let fn = new Function('exports','module','require','__dirname','__filename',content + '\n return module.exports');
    let module = {
      exports:{}
    };

    return fn(module.exports,module,req,__dirname,__filename);
}

let str = req('./1.common.js');

console.log(str);


