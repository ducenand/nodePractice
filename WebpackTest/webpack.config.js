const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const extractLess = new ExtractTextPlugin({
    filename: "../style/[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: {
        index: "./src/script/index.js",
        vendor: ['react','react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'build/script'),
        filename: '[name].js'
    },
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
        extractLess,
        new UglifyJSPlugin()
        // 4.0已经废弃 改为下面的optimization用法
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ["vendor"]
        // })
    ],
    optimization:{
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
    // externals:{
    //     'react':'React',
    //     'react-dom':'ReactDOM'
    // }
};