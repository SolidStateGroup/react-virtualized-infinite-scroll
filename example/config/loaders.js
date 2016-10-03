module.exports = [
    {
        test: /\.css$/,
        loaders: ['style', 'css']
    },
    {
        test: /\.js?/,
        exclude: /node_modules/,
        loaders: ['babel']
    },
    {
        test: /\.html$/,
        loader: 'html-loader?attrs[]=source:src&attrs[]=img:src'
    },
    {
        test: /\.(jpe?g|png|gif|svg|mp4|webm)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack'
        ]
    }
];