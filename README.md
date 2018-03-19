# nodePractice
node实战操作

## 一、Anydoorwhere
18/03/07
静态资源服务器
> 包括浏览器缓存、压缩、range请求

### anydoorwhere
Tiny NodeJs Static Web Server.

### 安装

```
npm i -g anydoorwhere
```
### 使用方法

```
anydoorwhere # 把当前文件夹作为静态资源服务器根目录

anydoorwhere -p  8080 # 设置端口号为 8080

anydoorwhere -h localhost # 设置host  为localhost 

anydoorwhere -d /usr # 设置根目录为 /usr

```
## 二、WebpackTest
webpack构建工具练习

[查看中文文档请点击](https://doc.webpack-china.org/)

[webpack 选项介绍](https://doc.webpack-china.org/configuration/)

#### less-loader使用

[点击查看更多](https://doc.webpack-china.org/loaders/less-loader/#src/components/Sidebar/Sidebar.jsx)

webpack4使用到extract-text-webpack-plugin(提取出css文件),直接使用
```
module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, './src/script')
                ],
                loader: 'babel-loader',

            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })

            }
        ]
    },
    plugins: [
        extractLess
    ]
```
```
npm install extract-text-webpack-plugin --save-dev
```
安装会报错
```
(node:39976) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
```
解决方法下载时添加@next
```
npm install extract-text-webpack-plugin@next --save-dev
```
#### externals
[了解更多点击](https://doc.webpack-china.org/configuration/externals/#src/components/Sidebar/Sidebar.jsx)

externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法
```
# 和module同级
externals:{
    'react':'React',
    'react-dom':'ReactDOM'
}
```

#### CommonsChunkPlugin
CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，这个文件包括多个入口 chunk 的公共模块。通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存到缓存中供后续使用。这个带来速度上的提升，因为浏览器会迅速将公共的代码从缓存中取出来，而不是每次访问一个新页面时，再去加载一个更大的文件。

> 使用
```
entry: {
    index: "./src/script/index.js",
    vendor: ['react','react-dom'] //添加合并文件
}

//  =====

plugins: [
        extractLess,
        // 4.0已经废弃 改为下面的optimization用法
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ["vendor"]
        // })
    ],
    optimization:{ //使用提取
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    }

```

#### Tree Shaking（uglifyjs-webpack-plugin）
[了解跟多请点击](https://doc.webpack-china.org/guides/tree-shaking/#src/components/Sidebar/Sidebar.jsx)

tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup。


## 三、测试
[![Build Status](https://travis-ci.org/ducenand/nodePractice.svg?branch=master)](https://travis-ci.org/ducenand/nodePractice)
[![codecov](https://codecov.io/gh/ducenand/nodePractice/branch/master/graph/badge.svg)](https://codecov.io/gh/ducenand/nodePractice)

#### nodejs断言 assert
[更多 assert Api点击查看](http://nodejs.cn/api/assert.html)

```
const assert = require('assert');
const {add,mul} = require('../src/math');

// 最原始的测试方法
if(add(2,3)===5){
     console.log('0k');
}else{
console.log('error');
}

//node assert测试
assert.equal(add(2,3),5,'错误');

```

第三方类库 chai 

[点击查看更多详情](http://www.chaijs.com/)

```javascript
const {should,expect,assert} = require('chai');
should();
add(2,3).should.equal(5);
expect(add(2,3)).to.equal(5);
assert.equal(add(2,3),5);
```

#### Mocha

[了解更多请点击](https://mochajs.org/)

```javascript
//mocha.js
const {should, expect, assert} = require('chai');
const {add, mul ,cover} = require('../src/math');


describe('#math', () => {
    describe('add', () => {
        it('should return 5 when 2 + 3',()=>{
            expect(add(2,3),5);
        });
        // it.only 只执行这一个
        // it.skip 跳过这个执行
        it('should return -1 when 2 + -3',()=>{
            expect(add(2,-3),-1);
        });
    });
    describe('mul', () => {
        it('should return 6 when 2 * 3',()=>{
            expect(mul(2,3),6);
        })
    });

    describe('cover',()=>{
        it('should return 1 when cover(2,1)',()=>{
           expect(cover(2,1)).to.equal(1);
        });
        it('should return 1 when cover(1,2)',()=>{
            expect(cover(1,2)).to.equal(1);
        });

        it('should return 12 when cover(2,2)',()=>{
            expect(cover(2,2)).to.equal(12);
        });
    })
});
```
```javascript
// math.js
function min(a, b) {
    const c = 3;
    return (b + a) * c;
}

module.exports = {
    add: (...args) => {
        return args.reduce((prev, curr) => {
            return prev + curr;
        })
    },
    mul: (...args) => {
        return args.reduce((prev, curr) => {
            return prev * curr;
        })
    },
    cover: (a, b) => {
        if (a > b) {
            return a - b;
        } else if (a < b) {
            return b - a;
        } else {
            return min(a, b);
        }

    }

};
```


> 运行

```
npm test
```
#### 测试 覆盖率 istanbul
[了解更多请点击](https://github.com/gotwarlost/istanbul)

> 运行

![image](http://qiniu.ducen.cn/node-testing/QQ20180316-135128.png)

```
npm run cover
```

> 运行结果

![image](http://qiniu.ducen.cn/node-testing/istanbul.png)

#### 持续集成

> 定义

持续集成是一种软件开发流程，有两个特征。
- 频繁地将代码集成到主干
- 每次集成都通过自动化的构建来验证

> 好处

- 尽早发现错误
- 防止分支大幅偏离主干



[travis持续集成网站配置](https://travis-ci.org/)

[codecov覆盖率图标生成](https://codecov.io/)

[github各种图标集合](https://github.com/dwyl/repo-badges)
```
# .travis.yml 文件
language: node_js
node_js:
  - "8"
  - "9"
brancher:
  only:
    - "dev"
    - "master"
install:
  - "npm install --prefix ./Testing"
  - "npm install -g codecov"
script:
  - "npm run cover --prefix ./Testing"
  - "codecov"
```

#### Benchmark.js 性能测试

[查看更多请点击](https://benchmarkjs.com/)

[线上性能测试](https://jsperf.com/)


#### UI测试

##### Jest
##### webdriver





