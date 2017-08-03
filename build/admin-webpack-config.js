/**
 * Created by Wangxy on 2017/6/15.
 */
let env = process.env.NODE_ENV || 'production'
console.log('构建admin项目时环境：' + env)

let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
let CleanPlugin = require('clean-webpack-plugin')
let path = require('path')

const Config = require('../libs/config')
let clientConfig = Config.get('client')
let buildConfig = Config.get('build')

let clientEnvConfig = clientConfig.client[env]

let clientApiConfig = {
    api: {
        url: clientConfig.protocol + '://' + clientEnvConfig.api.host + ':' + clientEnvConfig.api.port + clientEnvConfig.api.path
    },
    mock: {
        url: clientConfig.protocol + '://' + clientEnvConfig.mock.host + ':' + clientEnvConfig.mock.port
    },
    site: {
        url: clientConfig.protocol + '://' + clientEnvConfig.site.host + ':' + clientEnvConfig.site.port
    },
    admin: {
        url: clientConfig.protocol + '://' + clientEnvConfig.admin.host + ':' + clientEnvConfig.admin.port
    },
    socket: {
        url: clientConfig.protocol + '://' + clientEnvConfig.socket.host + ':' + clientEnvConfig.socket.port
    },
    img: {
        url: clientConfig.protocol + '://' + clientEnvConfig.img.host + ':' + clientEnvConfig.img.port
    }
}

let outputPath = path.join(buildConfig.build[env].outputPath, 'admin')
let publicPath = buildConfig.build[env].publicPath + ('development' === env ? '' : 'admin/')

let webpackConfig = {
    entry: {
        'index': path.resolve('admin', 'entry', 'index'),
        'login': path.resolve('admin', 'entry', 'login')
    },
    output: {
        path: outputPath,
        filename: 'script/[name]' + ('development' === env ? '' : '-[chunkhash]') + '.js',
        chunkFilename: 'script/chunk-[id]' + ('development' === env ? '' : '-[chunkhash]') + '.js',
        hashDigestLength: 8,
        publicPath: publicPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract('css-loader')
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'image/[name]' + ('development' === env ? '' : '-[hash:8]') + '.[ext]'
                }
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)(\?.*$|$)/,
                loader: 'file-loader',
                options: {
                    name: 'font/[name]' + (true || 'development' === env ? '' : '-[hash:8]') + '.[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env)
            },
            'config': JSON.stringify(clientApiConfig)
        }),
        new webpack.ProvidePlugin({
            _: 'lodash',
            moment: 'moment'
        }),
        new HtmlWebpackPlugin({
            filename: 'view/index.html',
            template: path.resolve('admin', 'view', 'index.html'),
            chunks: ['index'],
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackPlugin({
            filename: 'view/login.html',
            template: path.resolve('admin', 'view', 'login.html'),
            chunks: ['login'],
            alwaysWriteToDisk: true
        }),
        new ExtractTextPlugin({
            filename: 'style/[name]' + ('development' === env ? '' : '-[chunkhash]') + '.css'
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'element-ui$': 'element-ui/lib/index.js',
            'asset': path.resolve('admin', 'asset'),
            'library': path.resolve('site', 'library'),
            'widget': path.resolve('site', 'widget'),
            'model': path.resolve('api', 'models')
        }
    }
}

if ('development' === env) {
    webpackConfig.plugins.push(
        new HtmlWebpackHarddiskPlugin()
    )
} else {
    webpackConfig.plugins.push(
        new CleanPlugin(['font', 'image', 'script', 'style'], {
            root: outputPath,
            verbose: true
        })
    )
}

if ('production' === env) {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
}

module.exports = webpackConfig