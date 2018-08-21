var path = require ( 'path')
var webpack = require ('webpack')
var nodeExternals = require ('webpack-node-externals')

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
			{test: /\.css$/, use: 'ignore-loader' },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}

module.exports = [browserConfig, serverConfig]
