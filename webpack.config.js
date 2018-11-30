'use strict';

// Modules
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var os = require('os');
var fs = require('fs');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var HOSTNAME = os.hostname();
console.log('hostname is:', HOSTNAME);

var ENV = process.env.npm_lifecycle_event;
console.log('env is:', ENV);
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

var CONFIG_ENV = process.env.BUILD_ENV || ENV;
console.log('config env is:', CONFIG_ENV);
var CONFIG_DIR = __dirname + '/src/config/';
var CONFIG_FILE = 'config';

/**
 * Site variant
 */
var SITE = process.env.FD_SITE || 'FK';
console.log('site variant:', SITE);

/**
 * Dev server port
 */
var PORT = process.env.FD_PORT || 8080;

/**
 * Check for more specific config files
 */

if (fs.existsSync(CONFIG_DIR + HOSTNAME.toLowerCase() + '_' + CONFIG_ENV + '_' + SITE.toLowerCase() + '.js')) {
  CONFIG_FILE = HOSTNAME.toLowerCase() + '_' + CONFIG_ENV + '_' + SITE.toLowerCase();
} else if (fs.existsSync(CONFIG_DIR + HOSTNAME.toLowerCase() + '_' + ENV + '.js')) {
  CONFIG_FILE = HOSTNAME.toLowerCase() + '_' + CONFIG_ENV;
} else if (fs.existsSync(CONFIG_DIR + HOSTNAME.toLowerCase() + '.js')) {
  CONFIG_FILE = HOSTNAME.toLowerCase();
} else if (fs.existsSync(CONFIG_DIR + CONFIG_ENV + '_' + SITE.toLowerCase() + '.js')) {
  CONFIG_FILE = CONFIG_ENV + '_' + SITE.toLowerCase();
} else if (fs.existsSync(CONFIG_DIR + CONFIG_ENV + '.js')) {
  CONFIG_FILE = CONFIG_ENV;
}
console.log('config file:', CONFIG_FILE);

/**
 * Media host for proxy usage
 */
var MEDIA_HOST = process.env.FK_MEDIA || 'https://www.foodkick.com';

module.exports = (function makeWebpackConfig() {

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  config.entry = isTest ? './test/unit/init.js' : {
    app: './src/js/'+SITE.toUpperCase()+'/init.js'
  };

  /**
   * ENV dependant config
   */
  config.resolve = {
    modules: [
      __dirname + '/node_modules/',
      __dirname + '/src/js/',
      __dirname + '/src/js/' + SITE.toUpperCase(),
      __dirname + '/src/css/',
      __dirname + '/src/css/' + SITE.toUpperCase()
    ],
    alias: {
      config: CONFIG_DIR + CONFIG_FILE,
      appinit: __dirname + '/src/js/'+SITE.toUpperCase()+'/init.js'
    }
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  config.output = isTest ? {} : {
    // Absolute output directory
    path: __dirname + '/dist',

    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: '/',

    // Filename for entry points
    // Only adds hash in build mode
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (isTest) {
    config.devtool = 'inline-source-map';
  }
  else if (isProd) {
    config.devtool = 'source-map';
  }
  else {
    config.devtool = 'eval-source-map';
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  // Initialize module
  config.module = {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      use: [{
        loader: 'eslint-loader'
      }],
      exclude: [
        /node_modules/,
        /bower_components/
      ]
    }, {
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }],
      exclude: [
        /node_modules/,
        /bower_components/
      ]
    }, {
      // CSS LOADER
      // Reference: https://github.com/webpack/css-loader
      // Allow loading css through js
      //
      // Reference: https://github.com/postcss/postcss-loader
      // Postprocess your css with PostCSS plugins
      test: /\.css$/,
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files in production builds
      //
      // Reference: https://github.com/webpack/style-loader
      // Use style-loader in development.

      loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {loader: 'css-loader', options: {
              sourceMap: true,
              importLoader: 1,
              minimize: true
          }},
          {loader: 'postcss-loader'}
        ]
      })
    }, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'file-loader'
    }, {
      test: /\.woff/,
      loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=css/fonts/[name].[ext]'
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: 'raw-loader'
    }, {
      test: /\.svg$/,
      use: [{
        loader: 'svg-sprite-loader',
        options: {
          name: '[name]',
          prefixize: false
        }
      }, {
        loader: 'svgo-loader'
      }]
    }]
  };

  config.plugins = [
  ];

  // Skip rendering index.html in test mode
  if (!isTest) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/'+SITE.toUpperCase()+'/index.html',
        inject: 'body'
      }),

      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files
      // Disabled when in test mode or not in build mode
      new ExtractTextPlugin({filename: 'css/[name].[hash].css', disable: !isProd, allChunks: true})
    );
  }

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      // new webpack.NoEmitOnErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin(),

      // Copy assets from the public folder
      // Reference: https://github.com/kevlened/copy-webpack-plugin
      new CopyWebpackPlugin([
          {
            from: __dirname + '/src/assets',
            to: 'assets'
          },
          {
            from: __dirname + '/src/templates',
            to: 'templates'
          },
          {
            from: __dirname + '/src/robots.txt',
          },
          {
            from: __dirname + '/src/.htaccess'
          }
      ])
    );
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    port: PORT,
    contentBase: './src',
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: {
      '/media/**': {
        target: MEDIA_HOST,
        changeOrigin: true,
        secure: false
/*****
 * Proxy to prod
 *****
      },
      '/mobileapi/**': {
        target: 'https://www.foodkick.com/',
        changeOrigin: true
*/
      }
    }
  };

  return config;
}());
