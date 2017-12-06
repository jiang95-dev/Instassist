'use strict';


const path = require('path');


const config = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/frontend/src/app.jsx'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/frontend/dist/js'),
    filename: 'app.js',
  },

  module: {

    // apply loaders to files that meet given conditions
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '/frontend/src'),
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?-url', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?-url', 'postcss-loader']
      }
    ],
  },

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};

module.exports = config;
