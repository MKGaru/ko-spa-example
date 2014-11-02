var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: 'Application',
	output: {
		filename: '../public/js/bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.less$/, loader: 'style!css!less' },
			{ test: /\.html$/, loader: 'html' },
			{ test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml' }
			/*
			{ test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff' },
			{ test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff' },
			{ test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff' },
			{ test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
			{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" }
			*/
		]
	},
	resolve: {
		root: [
			// We want roots to resolve the app code:
			path.resolve('.'),
			// and the bower components:
			path.resolve('../public/lib')
		],
		alias: {
			/*
			// This one first to match just the entrypoint module.
			// We only need this because the module name doesn't match the file name.
			myApp$: 'myApp/app',
			// This one maps all our modules called 'myApp.something' to the app/js
			// directory
			myApp: path.resolve('app', 'js'),
			// This is also needed because the module name doesn't match the file name
			// but we don't need to locate the file because it is a bower component
			// with a file name the same as the directory (component) name:
			//  bower_components/angular-route/angular-route
			ngRoute$: 'angular-route'
			*/
		}
	},
	plugins:[
		new webpack.ResolverPlugin(
			new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("../bower.json", ["main"])
		)
	]
};