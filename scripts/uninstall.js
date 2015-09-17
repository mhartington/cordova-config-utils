#!/usr/bin/env node


// Inspired/borrowed/copied from https://github.com/rossmartin/cordova-uglify

var fs = require('fs')
var path = require('path')
var cwd = process.cwd()

var configJsPath = path.join(cwd, '../../', 'hooks', 'after_prepare', '011_update_config.js')

fs.unlink(configJsPath)
console.log('Removed config');
