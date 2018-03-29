const path = require('path');
const hello_test_ducenand = require('hello_test_ducenand');
//包结构

//完全符合CommonJS规范的包目录应该包含如下：
//package.json 包描述文件
//bin 用于存放可执行二进制文件目录
//lib 用于存放javascript代码目录
//doc 用于存放文档的目录。
//test 用于存放单元测试用例的代码



//全局安装 npm install express -g
console.log(process.execPath);
//推算出通过全局模式安装的所有模块包目录
console.log(path.resolve(process.execPath, '..', '..', 'lib', 'node_modules'));

//从本地安装
// 对于一些没有发布的NPM上的包，或因网络无法直接安装的包，可以通过下载到本地然后再安装。
//需要指明package.json文件所在的位置即可

// npm install <tarball url>
// npm install <tarball file>
// npm install <folder>

// 从非官方源安装
// 通过镜像源安装在执行命令时，添加 --registry=http://registry.url即可
// npm install underscore --registry=http://registry.url
// 也可以指定默认源
// npm config set registry http://registry.url

// NPM钩子命令
/** "scripts": {
        "preinstall": "preinstall.js",
        "install": "install.js",
        "uninstall": "uninstall.js",
        "test": "test.js"
}*/

// 在以上字段中执行npm install <package>时，preinstall 指向的脚本将会被加载执行，然后install指向的脚本文件会被执行，在执行npm uninstall <package>时，uninstall指向的脚本 当执行npm test时，将会运行test指向的脚本。


//发布包

// 1、创建好发布的文件
//hello.js
//package.json
// 2、注册包仓库账号
// npm adduser
// Username:(ducenand)
// Email:(ducen666@gmail.com)
// 3、上传包
// npm publish <folder>
// 4、安装包
// npm install hello_test_ducenand
console.log(hello_test_ducenand.sayHello());
// 5、管理包权限
// 可以使用npm owner命令帮助你管理包的所有者
// $ npm owner ls eventproxy
// npm http GET https://registry.npmjs.org/eventproxy
// npm http 200 https://registry.npmjs.org/eventproxy ducenand <ducen666@gmail.com>
// 使用这个命令，也可以添加包的拥有者，删除一个包的拥有者
// npm owner ls <package name>
// npm owner add <user> <package name>
// npm owner rm <user> <package name>

// 6、分析包
// npm ls
// ├── hello_test_ducenand@1.0.0
// └── math@0.0.3









