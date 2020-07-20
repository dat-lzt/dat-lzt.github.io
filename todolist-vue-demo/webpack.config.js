const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './todos.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './todos.html')
        })
    ],
    devServer: {
        contentBase: './dist',
        port: '8080',
        host: 'localhost'
    },
    module: {
        rules: [{
            test: /\.css/,
            use: ['style-loader', 'css-loader'],
        }]
    }
}