'use strict';

var fs = require('fs');
var gulp = require('gulp');

var options = {
    PROJECT_PATH: __dirname,
    pkg: require('./package.json'),
    dt: new Date(),
    banner: '/* <%= pkg.name %> v<%= pkg.version %>, <%= dt %> */\n'
};

fs.readdirSync('./zgulp').forEach(function(filename) {
    if (filename.slice(-3) !== '.js') {
        return;
    }
    require('./zgulp/' + filename)(options);
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
