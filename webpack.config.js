const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: [
            'script-loader!jquery/dist/jquery.js',
            'script-loader!foundation-sites/dist/js/foundation.min.js',
            './src/app.js',
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    externals: {
        jquery: 'jQuery'
    },
        plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery'
        })
    ],
    module: {
        rules: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react','es2015','stage-0']
                },
                test: /\.jsx?$/,
                exclude: /node_modules/
            }
        ]
    }
};