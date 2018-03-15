# nodePractice
node实战操作

## 一、nodePractice/Anydoorwhere/1.app.js
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











