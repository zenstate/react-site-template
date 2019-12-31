/* eslint-disable global-require */
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { OUTPUT_DIR, BASE_URL, SITE_TITLE } from '../../config.dev';

module.exports = {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    entry: {
        app: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', 'react-hot-loader/patch', './src/client/index.jsx'],
    },
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, OUTPUT_DIR),
        publicPath: BASE_URL,
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                include: [
                    path.join(__dirname, 'src'),
                ],
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    plugins: [
                        'react-hot-loader/babel',
                    ],
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                include: [
                    path.join(__dirname, 'node_modules'),
                ],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]',
                    },
                }],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                exclude: [
                    path.join(__dirname, 'node_modules'),
                ],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name]-[hash].[ext]',
                    },
                }, {
                    loader: 'img-loader',
                    options: {
                        plugins: [
                            require('imagemin-gifsicle')({
                                interlaced: false,
                            }),
                            require('imagemin-mozjpeg')({
                                progressive: true,
                                arithmetic: false,
                            }),
                            require('imagemin-pngquant')({
                                floyd: 0.5,
                                speed: 2,
                            }),
                            require('imagemin-svgo')({
                                plugins: [
                                    { removeTitle: true },
                                    { convertPathData: false },
                                ],
                            }),
                        ],
                    },
                }],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name]-[hash].[ext]',
                    },
                },
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: path.resolve(__dirname, 'src/components'),
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                path.resolve(__dirname, 'src/scss'),
                            ],
                        },
                    },
                ],
                include: path.resolve(__dirname, 'src/components'),
            },
        ],
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: SITE_TITLE,
            template: 'src/template/index.hbs',
            filename: 'index.html',
            chunks: ['app'],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            BUILD_EVENT: '"dev-localstubs"',
        }),
    ],
    stats: 'none',
};
