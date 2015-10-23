'use strict';

var gUtil = require('gulp-util');

module.exports = function(title, doThrow) {
    return function(err) {
        gUtil.log(gUtil.colors.red('[' + title + ']'), err.toString());
        if(doThrow) {
            throw err;
        }
        this.emit('end');
    };
};