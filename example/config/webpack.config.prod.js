// webpack.config.prod.js
// Watches + deploys files minified + cachebusted
var path = require('path');
var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var libName = 'index';
var outputFile = libName + '.js';

module.exports = {
    devtool: 'source-map',

    entry: [
        './index.js',
    ],

    module: {
        loaders: require('./loaders')
    },

    output: {
        publicPath: '/',
        path: './dist',
        filename: outputFile,
        library: libName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    plugins: [
        //Clear out build folder
        new CleanWebpackPlugin(['dist'], { root: '../' }),

        //Ensure NODE_ENV is set to production
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            },
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
        }),

        //remove duplicate files
        new webpack.optimize.DedupePlugin(),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        //Uglify
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                'screw_ie8': true
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),

    ]
}
;