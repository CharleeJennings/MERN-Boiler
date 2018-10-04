var path = require ( 'path')
var webpack = require ('webpack')
var nodeExternals = require ('webpack-node-externals')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var browserConfig =
{
	entry: './src/client/index.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
       			 use: [
          				'file-loader',
         		 		{
         		   			loader: 'image-webpack-loader',
         		   			options: {
            				 	bypassOnDebug: true, // webpack@1.x
           				   		disable: true, // webpack@2.x and newer
             				},
         		 		},
        			 ],
			},

			{
        		test: /\.css$/,
        		use: [ 'style-loader', 'css-loader' ]
      		}

		]
	},
	plugins:
	[
		new webpack.DefinePlugin({
     	 __isBrowser__: "true"
    })
	]
}

var serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {test: /\.(js)$/, use: 'babel-loader' },
			{test:  /\.(gif|png|jpe?g|svg)$/i, use: 'ignore-loader'},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it use publicPath in webpackOptions.output
							publicPath: './public'
						}
					},
					"css-loader"
				]
			},
		{
			test: /\.(gif|png|jpe?g|svg)$/i,
					 use: 'ignore-loader',
		},
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    }),
		new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "./public/[name].css",
      chunkFilename: "[id].css"
    })
  ]
}

module.exports = [browserConfig, serverConfig]
