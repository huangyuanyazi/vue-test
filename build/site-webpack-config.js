/**
 * Created by Wangxy on 2017/4/10.
 */
let env = process.env.NODE_ENV || 'production'
console.log('构建site项目时环境：' + env)

let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let SpritesmithPlugin = require('webpack-spritesmith')
//let AssetsPlugin = require("assets-webpack-plugin")
let HtmlWebpackPlugin = require('html-webpack-plugin')
let HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
//let HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
let CleanPlugin = require('clean-webpack-plugin')
let path = require('path')
let glob = require('glob')
let fs = require('fs')

const Config = require('../libs/config')
let buildConfig = Config.get('build')
let clientConfig = Config.get('client')

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
    mobile: {
        url: clientConfig.protocol + '://' + clientEnvConfig.mobile.host + ':' + clientEnvConfig.mobile.port
    },
    socket: {
        url: clientConfig.protocol + '://' + clientEnvConfig.socket.host + ':' + clientEnvConfig.socket.port
    },
    img: {
        url: clientConfig.protocol + '://' + clientEnvConfig.img.host + ':' + clientEnvConfig.img.port
    }
}

//let outputPath = path.join(__dirname, '..', '..', 'static', 'site')
//let publicPath = 'production' === env ? '/' : clientApiConfig.site.url + '/'

let outputPath = path.join(buildConfig.build[env].outputPath, 'site')
let publicPath = buildConfig.build[env].publicPath + ('development' === env ? '' : 'site/')

let webpackConfig = {
    entry: {
        'vendor': ['vue', 'lodash', 'moment', 'jquery'] //作为多入口页面的公共script
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
                    name: 'font/[name]' + ('development' === env ? '' : '-[hash:8]') + '.[ext]'
                }
            }
        ],
    },
    plugins: [
        /*
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(path.join(__dirname, '..', '..', 'static', 'vendor', 'manifest.json'))
        }),
        */
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env)
            },
            'config': JSON.stringify(clientApiConfig)
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'lodash',
            moment: 'moment'
        }),
        new ExtractTextPlugin({
            filename: 'style/[name]' + ('development' === env ? '' : '-[chunkhash]') + '.css'
        })
        /*
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [
                'vendor.js'
            ],
            append: false
        })
        */
        /*
         new webpack.optimize.CommonsChunkPlugin({
         name: "vendor",
         minChunks: function (module, count) {
         return module.resource && /\.js$/.test(module.resource) && 0 === module.resource.indexOf(path.join(__dirname, "node_modules"))
         }
         }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "runtime"
        }),
        new AssetsPlugin({
            filename: path.join(outputPath, 'manifest.json'),
            prettyPrint: true
        }),
         new ManifestPlugin({
         publicPath: "production" == env ? "/" : "http://localhost:9092/",
         writeToFileEmit: "development" == env
         })
         */
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'element-ui$': 'element-ui/lib/index.js',
            'asset': path.resolve('site', 'asset'),
            'library': path.resolve('site', 'library'),
            'widget': path.resolve('site', 'widget'),
            'model': path.resolve('api', 'models')
        }
    }
}

//let entryFiles = glob.sync("./client/entry/*.js")

let entryFiles = glob.sync(path.resolve('site', 'entry') + '/*.js')
let mpaChunks = [] //待抽取公共代码的多入口
for (let file of entryFiles) {
    let entryName = path.basename(file, '.js')
    webpackConfig.entry[entryName] = file
    mpaChunks.push(entryName)
}
/*
entryFiles.map(function(file) {
    if("admin" != entryName && "user" != entryName && "patent" != entryName) {

    }
})
 */

webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: mpaChunks
    })
)


let viewFiles = glob.sync(path.resolve('site', 'view') + '/*.html')
for (let file of viewFiles) {
    webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
            filename: 'view/' + path.basename(file),
            template: file,
            chunks: ['vendor', 'common', path.basename(file, '.html')],
            chunksSortMode: 'dependency',
            alwaysWriteToDisk: true
        })
    )
}

let commonViewFiles = glob.sync(path.resolve('site', 'view', 'common') + '/*.html')
for (let file of commonViewFiles) {
    webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
            filename: 'view/common/' + path.basename(file),
            template: file,
            inject: false,
            alwaysWriteToDisk: true
        })
    )
}

let spriteFolders = glob.sync(path.resolve('site', 'asset', 'image') + '/sprite-*/')
for (let folder of spriteFolders) {
    webpackConfig.plugins.push(
        new SpritesmithPlugin({
            src: {
                cwd: path.dirname(folder),
                glob: path.basename(folder) + '/*.png'
            },
            target: {
                image: './asset/image/' + path.basename(folder) + '.png',
                css: './asset/style/' + path.basename(folder) + '.less'
            },
            apiOptions: {
                cssImageRef: '../image/' + path.basename(folder) + '.png'
            }
        })
    )
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

if('production' === env) {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
}

module.exports = webpackConfig