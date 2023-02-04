const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: '/',
        path: __dirname + '/dist',
        filename: '[name].[chunkhash].js',
    },
    mode: 'development',
resolve: {
    extensions: ['.js','.jsx']
},
    module : {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }
                ]
            },
            {
                test: /\.(css|scss)$/, //Identifica si es un archivo sass o un css (combina extensiones scss y css)
                use:[
                    'style-loader', 
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCss({
            filename: '[name].css'
        }),    
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        open: true,
        port: 3006
    }
}
