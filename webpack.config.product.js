// Generated by CoffeeScript 1.8.0
var path = require('path');

var webpack = require('webpack');

var base = require('./webpack.config');

base.output.publicPath = '';

base.entry = {
  index: [
    path.resolve(__dirname, './public/js/main/main.jsx')
  ],
  edit: [
    path.resolve(__dirname, './public/js/edit/edit.jsx'),
  ],
  game_create: [
    path.resolve(__dirname, './public/js/game/create/index.jsx'),
  ]
},


base.plugins = [
  new webpack.DefinePlugin({
    env: {
      isDevelopment:false
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress:{
      warnings:false
    }
  })
];

module.exports = base;
