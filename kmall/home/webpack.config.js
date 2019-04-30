/*
* @Author: TomChen
* @Date:   2019-04-08 18:41:12
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-24 19:14:08
*/
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
//css单独打包成一个文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath = "/";

// getHtmlConfig方法作用是不同的文件打包配置的优化
const getHtmlConfig = (name,title)=>({
    template:'./src/view/'+name+'.html',//模板文件
    filename:name+'.html',//输出的文件名
    title:title,//页面标题
    inject:true,//脚本写在那个标签里,默认是true(在body结束后)
    hash:true,//给生成的js/css文件添加一个唯一的hash
    chunks:['common',name]
})


module.exports = {
	//指定打包环境
	mode:'development',
	// mode:'production',
	//指定入口
	//单入口写法一
	entry:{
		//chunk名称:文件路径
		'common':'./src/pages/common/index.js',		
		'index':'./src/pages/index/index.js',		
		'user-login':'./src/pages/user-login/index.js',		
		'user-register':'./src/pages/user-register/index.js',		
		'result':'./src/pages/result/index.js',		
	},
	//单入口写法二
	//entry: './src/index.js',
	//指定出口
	output: {
		//出口文件名称
		filename: 'js/[name].[hash].bundle.js',
		//输出路径
		publicPath:publicPath,
		//出口的文件所在的目录
		path: path.resolve(__dirname, 'dist')
	},
	//配置别名
    resolve:{
        alias:{
            pages:path.resolve(__dirname,'./src/pages'),
            util:path.resolve(__dirname,'./src/util'),
            service:path.resolve(__dirname,'./src/service'),
            common:path.resolve(__dirname,'./src/common'),
            node_modules:path.resolve(__dirname,'./node_modules'),
        }
    },	
	module: {
		rules: [
		//处理css文件
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
						}
					},
					"css-loader"
				]
			},
	    //处理图片 
			{
				test: /\.(png|jpg|gif|jpeg|ttf|woff2|woff|eot|svg)\??.*$/i,
				use: [
			  		{
			    		loader: 'url-loader',
			    		options: {
			      			limit: 100,
			      			name:'resource/[name].[ext]'
			    		}
			  		}
				]
			},
		//babel	
			{
			    test:/\.js$/,
			    exclude: /(node_modules)/,
			    use: {
			        loader: 'babel-loader',
			        options: {
			            presets: ['env','es2015','stage-3'],
			        }
			    }               
			}							
		]
	},
	plugins:[
	    new htmlWebpackPlugin(getHtmlConfig('index','首页')),
	    new htmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),	    
	    new htmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),	    
	    new htmlWebpackPlugin(getHtmlConfig('result','结果提示')),	    
	    new CleanWebpackPlugin(),
	    new MiniCssExtractPlugin({ //引入css文件时使用
	    	filename:'css/[name].css'
	    })
	],
	devServer:{
		contentBase: './dist',//内容的目录
		port:3002,//服务运行的端口
		proxy: [{//解决跨域的问题
		  context: ['/user'],//发送的请求如果以/user开头则代理到127.0.0.1服务器
		  target: 'http://127.0.0.1:3000',
		}]		
	}			
};