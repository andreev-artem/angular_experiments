'use strict';

var fs = require('fs');
var os = require('os');
var argv = require('yargs').argv;
var template = require('lodash').template;
var gUtil = require('gulp-util');

module.exports = function(params) {

    var tpl = fs.readFileSync(params.appPath + '/index.html.tmpl', {encoding: 'utf8'});

    /**
     * regular app
     */
    fs.writeFileSync(params.appPath + '/index.html', template(tpl)({
        mocked: false
    }));
    gUtil.log('File "index.html" created.');

    /**
    * mocked app
    */
    fs.writeFileSync(params.appPath + '/index_mock.html', template(tpl)({
        mocked: true
    }));
    gUtil.log('File "index_mock.html" created.');

};