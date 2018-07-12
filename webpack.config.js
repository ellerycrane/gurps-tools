
const
  fs = require('fs'),
  path = require('path'),
  autoprefixer = require('autoprefixer'),
  aliases = {
    '~': path.resolve(__dirname, 'src')//for app root
  },
  webpack = require('webpack'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'),
  NODE_ENV = process.env.NODE_ENV || 'development',
  APP_BASE_PATH = process.env.APP_BASE_PATH || '/gurps-combat',
  config = {
    context: path.join(__dirname, 'src'),
    entry: {
      'app': './app.js'
    },
    cache: true,
    devtool: 'source-map',
    output: {
      publicPath: APP_BASE_PATH + '/',
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    },
    devServer: {
      historyApiFallback: true
    },
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: aliases,
      extensions: ['*', '.js']
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      // Find-and-replace references to 'process.env.NODE_ENV', used for environment-specific
      // dead code elimination
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '\'' + NODE_ENV + '\'',
        'process.env.APP_BASE_PATH': '\'' + APP_BASE_PATH + '\''
      }),

      // Copy image images from the source directory to dist
      new CopyWebpackPlugin([
        {from: 'images', to: 'images'},
        {
          from: '../node_modules/pdfjs-dist/cmaps/',
          to: 'cmaps/'
        },
        { from: './components/pdf/sample.pdf' },
        ]),

      // Pare down moment package to just english
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),

      new HtmlWebpackPlugin({
        title: 'GURPS Tools',
        favicon: 'images/favicon.ico',
        chunks: ['app'],
        hash: true
      })
    ],
    module: {
      loaders: [
        {
          include: /\.json$/, 
          loaders: ['json-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.html$/,
          loaders: ['file-loader?name=[path][name].[ext]', 'extract-loader', 'html-loader']
        },
        {
          test: /\.(ttf|eot|svg)/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]',
            limit: 1000
          }
        },
        {
          test: /\.(woff|woff2)/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]',
            limit: 1000
          }
        },
        {
          test: /\.png$/,
          loader: 'url-loader',
          query: { mimetype: 'image/png' }
        }
      ]
    }
  }

if (NODE_ENV === 'production') {
  config.plugins.push(
    // Extract CSS into a separate file:
    new ExtractTextPlugin('styles.css'),

    // Organize, optimize, minify:
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  )

  config.module.loaders.push({
    test: /\.(scss|css)$/,
    loader: ExtractTextPlugin.extract('style-loader', [
      'css-loader?sourceMap!postcss-loader?sourceMap', 'sass-loader?sourceMap'
    ])
  })
} else {
  config.module.loaders.push({
    test: /\.(scss|css)/,
    loaders: ['style-loader', 'css-loader?sourceMap!postcss-loader?sourceMap', 'sass-loader?sourceMap']
  })
}

module.exports = config
