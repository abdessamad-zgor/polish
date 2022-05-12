const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

module.exports = {
	entry: [path.resolve(__dirname, './index.js'), 'regenerator-runtime/runtime'],
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'main.js',
		publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.js$|jsx/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.', '.js', '.jsx', '.css', '.scss'],
	},
	devtool: 'eval-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
			inject: true,
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.PROD_HOST': JSON.stringify(process.env.PROD_HOST),
			'process.env.DEV_HOST': JSON.stringify(process.env.DEV_HOST),
			'process.env.DEV_API': JSON.stringify(process.env.DEV_API),
			'process.env.PROD_API': JSON.stringify(process.env.PROD_API),
		}),
	],
	devServer: {
		port: 9005,
		historyApiFallback: true,
		host: 'localhost',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
		},
	},
};
