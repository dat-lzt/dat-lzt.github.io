const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清理/dist文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        })
    ],
    //建立本地服务器，使浏览器自动刷新
    devServer: {
        contentBase: './dist',
        port: '8080',
        host: 'localhost',
        // hot: true //热模块（浏览器无需刷新页面即可呈现出相应的变化。）
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
            include: path.resolve(__dirname, 'src')
        }]
    }
}