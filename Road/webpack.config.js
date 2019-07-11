const path              = require('path');
const Webpack           =require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const url = "http://42.180.0.28:13066";
// const url = "http://36.250.234.57:13077"

// let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
// console.log(WEBPACK_ENV); 
module.exports = {
    entry: './src/app.jsx',
    output: {
            path: path.resolve(__dirname, 'static'),
            publicPath:'/static/',
            // publicPath: WEBPACK_ENV === 'dev' 
            // ? '/dist/' : './',
            filename: 'js/app.js'
    },
    resolve:{
        alias:{
            page:path.resolve(__dirname, 'src/page'),
            component:path.resolve(__dirname, 'src/component'),
            util        : path.resolve(__dirname, 'src/util'),
            service     : path.resolve(__dirname, 'src/service'),
           
        }
    },
    module: {
            rules: [
                {
                    test: /\.jsx$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "es2015"
                                ,'react'],
                            plugins: [
                                ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
                            ]
                        }
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['react', 'es2015', 'stage-0'],
                        plugins: [
                            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
                        ]
                      }
                    }
                  },
            
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    })
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'less-loader']
                    })
                },

                {
                    test: /\.json$/,
                    loader: 'json-loader'
                  },
            
         
                // 图片的配置
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 81,
                                publicPath: '/static/',
                                name:'resource/[name].[ext]'
                            }
                        }
                    ]
                },
                //字体图标的配置
                {
                    test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                                publicPath: '/static/',
                                name:'resource/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
      },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            favicon: './src/favicon.ico' //favicon.ico文件路径
        }),
        new ExtractTextPlugin("css/[name].css"),
        //提出公共模块
        new Webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        }),
        // new UglifyJSPlugin(),
        
    ],
    devServer:{
        port:8086,
        historyApiFallback:{
            index:'/static/index.html'
        },
        proxy: {
            '/login': {
                target: url + '/login',
                pathRewrite: {
                    '^/login': ''
                },
            },
            '/notice': {
                target: url + '/notice',
                pathRewrite: {
                    '^/notice': ''
                },
            },
            '/eventmanage': {
                target: url + '/eventmanage',
                pathRewrite: {
                    '^/eventmanage': ''
                },
            },
            '/patrolRecord': {
                target: url + '/patrolRecord',
                pathRewrite: {
                    '^/patrolRecord': ''
                },
            },
            '/LeaderRemind': {
                target: url + '/LeaderRemind',
                pathRewrite: {
                    '^/LeaderRemind': ''
                },
            },
            '/changeRead': {
                target: url + '/changeRead',
                pathRewrite: {
                    '^/changeRead': ''
                },
            },
            '/readSituation': {
                target: url + '/readSituation',
                pathRewrite: {
                    '^/readSituation': ''
                },
            },
            '/roadOperation': {
                target: url + '/roadOperation',
                pathRewrite: {
                    '^/roadOperation': ''
                },
            },
            '/roadsituation': {
                target: url + '/roadsituation',
                pathRewrite: {
                    '^/roadsituation': ''
                },
            },
            '/maintenance': {
                target: url + '/maintenance',
                pathRewrite: {
                    '^/maintenance': ''
                },
            },
            '/news': {
                target: url + '/news',
                pathRewrite: {
                    '^/news': ''
                },
            },
            '/munstatistics': {
                target: url + '/munstatistics',
                pathRewrite: {
                    '^/munstatistics': ''
                },
            },
            '/townstatisticsLogin': {
                target: url + '/townstatisticsLogin',
                pathRewrite: {
                    '^/townstatisticsLogin': ''
                },
            },
            '/statistics': {
                target: url + '/statistics',
                pathRewrite: {
                    '^/statistics': ''
                },
            },
            '/patrolStatisticApp': {
                target: url + '/patrolStatisticApp',
                pathRewrite: {
                    '^/patrolStatisticApp': ''
                },
            },
            '/patrolExport': {
                target: url + '/patrolExport',
                pathRewrite: {
                    '^/patrolExport': ''
                },
            },
            '/patrol': {
                target: url + '/patrol',
                pathRewrite: {
                    '^/patrol': ''
                },
            },
            '/maintenance': {
                target: url + '/maintenance',
                pathRewrite: {
                    '^/maintenance': ''
                },
            },
            '/checkRecord': {
                target: url + '/checkRecord',
                pathRewrite: {
                    '^/checkRecord': ''
                },
            },
            '/eventStatistic': {
                target: url + '/eventStatistic',
                pathRewrite: {
                    '^/eventStatistic': ''
                },
            },
            '/eventReport': {
                target: url + '/eventReport',
                pathRewrite: {
                    '^/eventReport': ''
                },
            },
            '/filemanage': {
                target: url + '/filemanage',
                pathRewrite: {
                    '^/filemanage': ''
                },
            },
            '/user': {
                target: url + '/user',
                pathRewrite: {
                    '^/user': ''
                },
            },



            '/getRoadlistByUserId': {
                target: url + '/getRoadlistByUserId',
                pathRewrite: {
                    '^/getRoadlistByUserId': ''
                },
            },
            '/getAllTeam': {
                target: url + '/getAllTeam',
                pathRewrite: {
                    '^/getAllTeam': ''
                },
            },
            '/getAllRoad': {
                target: url + '/getAllRoad',
                pathRewrite: {
                    '^/getAllRoad': ''
                },
            },
            '/CheckRegionAndRoad': {
                target: url + '/CheckRegionAndRoad',
                pathRewrite: {
                    '^/CheckRegionAndRoad': ''
                },
            },
            '/delete': {
                target: url + '/delete',
                pathRewrite: {
                    '^/delete': ''
                },
            },
            '/getteam': {
                target: url + '/getteam',
                pathRewrite: {
                    '^/getteam': ''
                },
            },
            '/getRoad': {
                target: url + '/getRoad',
                pathRewrite: {
                    '^/getRoad': ''
                },
            },
            '/insertroadplan': {
                target: url + '/insertroadplan',
                pathRewrite: {
                    '^/insertroadplan': ''
                },
            },
            '/app_manageRoad':{
                target: url + '/app_manageRoad',
                pathRewrite: {
                    '^/app_manageRoad': ''
                },
            },
            '/road':{
                target: url + '/road',
                pathRewrite: {
                    '^/road': ''
                },
            },
            
        }
    }
   
};