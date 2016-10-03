// webpack.config.dev.js
var path = require('path')
var src = path.join(__dirname, '../src') + '/';
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        'react-hot-loader/patch',
        './example/src/main.js',
    ],
    output: {
        path: '/',
        publicPath: 'http://localhost:3000/example/build/',
        filename: '[name].js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: require('./loaders')
            .concat([
                {
                    test: /\.scss$/,
                    loaders: ['style', 'css', 'sass']
                }
            ]),
    }
};