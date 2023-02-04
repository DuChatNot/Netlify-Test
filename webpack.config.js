const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const CssMini = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: '/',
        path: __dirname + '/dist',
        filename: '[name].[chunkhash].js',
        publicPath: '/',
    },
resolve: {
    extensions: ['.js','.jsx'],
    alias: {
        '@comp' : path.resolve(__dirname, 'src/components/'),
        '@styles': path.resolve(__dirname,'src/styles/'),
    },
    mode: 'production',
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
        new CleanWebpackPlugin(),    
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new MiniCss(),
            new Terser(),
        ]
    }
}
