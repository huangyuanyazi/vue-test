/**
 * Created by john on 2017/4/10.
 */
let env = process.env.NODE_ENV || "production"

let webpack = require("webpack")
let ExtractTextPlugin = require("extract-text-webpack-plugin")
let SpritesmithPlugin = require("webpack-spritesmith")
let AssetsPlugin = require("assets-webpack-plugin")
let CleanPlugin = require("clean-webpack-plugin")
let config = require("config")
let path = require("path")
let glob = require("glob")
let fs = require("fs")

let webpackConfig = {
    entry: {
        "vendor": ["vue", "moment", "co", "jquery", "bootstrap"] //作为多入口页面的公共script
    },
    output: {
        path: path.resolve("site", "public"),
        filename: "script/[name]" + ("production" == env ? "-[chunkhash]" : "") + ".js",
        chunkFilename: "script/chunk-[id]" + ("production" == env ? "-[chunkhash]" : "") + ".js",
        hashDigestLength: 8,
        publicPath: "production" == env ? "/" : "http://localhost:" + config.get("build.siteDev.port") + "/"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.vue$/,
            loader: "vue-loader"
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract("css-loader")
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract(["css-loader", "less-loader"])
        } , {
            test: /\.(png|jpg|gif)$/,
            loader: "url-loader",
            options: {
                limit: 8192,
                name: "image/[name]" + ("production" == env ? "-[hash:8]" : "") + ".[ext]"
            }
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?.*$|$)/,
            loader: "file-loader",
            options: {
                name: "font/[name]" + ("production" == env ? "-[hash:8]" : "") + ".[ext]"
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(env)
            },
            "config": JSON.stringify(config.get("client"))
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            co: "co",
            moment: "moment"
        }),
        /*
         new webpack.optimize.CommonsChunkPlugin({
         name: "vendor",
         minChunks: function (module, count) {
         return module.resource && /\.js$/.test(module.resource) && 0 === module.resource.indexOf(path.join(__dirname, "node_modules"))
         }
         }),
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: "runtime"
        }),
        new ExtractTextPlugin({
            filename: "style/[name]" + ("production" == env ? "-[chunkhash]" : "") + ".css"
        }),
        new AssetsPlugin({
            filename: path.resolve("site", "public", "manifest.json"),
            prettyPrint: true
        })
        /*
         new ManifestPlugin({
         publicPath: "production" == env ? "/" : "http://localhost:9092/",
         writeToFileEmit: "development" == env
         })
         */
    ],
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.common.js",
            "element-ui$": "element-ui/lib/index.js",
            "asset": path.resolve("site", "asset"),
            "library": path.resolve("site", "library"),
            "widget": path.resolve("site", "widget")
        }
    }
}

//let entryFiles = glob.sync("./client/entry/*.js")
let entryFiles = glob.sync(path.resolve("site", "entry") + "/*.js")
let mpaChunks = [] //待抽取公共代码的多入口
entryFiles.map(function(file) {
    let entryName = path.basename(file, ".js")
    webpackConfig.entry[entryName] = file
    if("admin" != entryName && "user" != entryName)
        mpaChunks.push(entryName)
})

webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        chunks: mpaChunks
    })
)

let spriteFolders = glob.sync(path.resolve("site", "asset", "image") + "/sprite-*/")
spriteFolders.map(function(folder) {
    webpackConfig.plugins.push(
        new SpritesmithPlugin({
            src: {
                cwd: path.dirname(folder),
                glob: path.basename(folder) + "/*.png"
            },
            target: {
                image: "./asset/image/" + path.basename(folder) + ".png",
                css: "./asset/style/" + path.basename(folder) + ".less"
            },
            apiOptions: {
                cssImageRef: "../image/" + path.basename(folder) + ".png"
            }
        })
    )
})

if("production" == env) {

    webpackConfig.plugins.push(
        new CleanPlugin(["font", "image", "script", "style"], {
            root: path.resolve("site", "public"),
            verbose: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
}

module.exports = webpackConfig