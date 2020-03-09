/// <binding AfterBuild='Run - Development' />

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = [
    {
        mode: 'development',
        entry: {
            lcs: './apps/lcs/index',
            css: './styles/main.scss'
        },
        output: {
            filename: '[name].js',
            path: __dirname + '/dist/'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    use: [
                        // fallback to style-loader in development
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                Promise: 'es6-promise'
            }),

            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "main.css",
                chunkFilename: "[id].css"
            }),

            new HtmlWebpackPlugin({
                hash: true,
                template: './pages/lcs.html',
                filename: 'pages/lcs.html'
            })
        ]
    },
    {
        mode: 'development',
        entry: {
            css: './styles/main.scss',
            crnt: './apps/corona/index'
        },
        output: {
            filename: '[name].js',
            path: __dirname + '/dist/'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    use: [
                        // fallback to style-loader in development
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                Promise: 'es6-promise'
            }),

            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "main.css",
                chunkFilename: "[id].css"
            }),

            new HtmlWebpackPlugin({
                hash: true,
                template: './pages/corona.html',
                filename: 'pages/corona.html'
            })
        ]
    },
    {
        mode: 'development',
        entry: {
            css: './styles/main.scss'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        // fallback to style-loader in development
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "main.css",
                chunkFilename: "[id].css"
            }),

            new HtmlWebpackPlugin({
                hash: true,
                template: './index.html',
                filename: 'index.html'
            })
        ]
    }
]