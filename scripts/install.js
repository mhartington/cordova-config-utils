#!/usr/bin/env node

// Inspired/borrowed/copied from https://github.com/rossmartin/cordova-uglify

var fs = require('fs')
var path = require('path')
var cwd = process.cwd() //proj directory
var scriptPath = __dirname //node_modules/cordova-uglify/scripts
var pjson = require(path.join(cwd, '../../package.json'));

var cordovaHome = pjson.cordovaHome ? '../../' + pjson.cordovaHome : '../..';
var paths = [ path.join(cwd, cordovaHome, 'hooks'), path.join(cwd, cordovaHome, 'hooks/after_prepare') ];

for(var pathIndex in paths) {
  if(!fs.existsSync(paths[pathIndex])) {
    console.log('Creating directory: ', paths[pathIndex])
    fs.mkdirSync(paths[pathIndex]);
  }
}

var configScriptPath = path.join(cwd, 'after_prepare', '011_update_config.js');

var configFile = fs.readFileSync(configScriptPath);
var configAfterPreparePath = path.join(paths[1], '011_update_config.js')

console.log('Creating config hook: ', configAfterPreparePath)
fs.writeFileSync(configAfterPreparePath, configFile);
fs.chmodSync(configAfterPreparePath, '755');
