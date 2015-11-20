'use strict';

var gulp = require('gulp');
var del = require('del');
var _ = require('lodash');
var bs = require("browser-sync").create();
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'lazypipe', 'uglify-save-license', 'run-sequence']
});

var generateIndexes = require('./lib/generateIndexes');
var errorHandler = require('./lib/errorHandler');

module.exports = function(options) {

    gulp.task('dist-clean', function() {
        return del(['dist/*']);
    });

    gulp.task('dist-index', function(cb) {
        generateIndexes({
            appPath: options.paths.app,
            dev: false
        });
        cb();
    });

    gulp.task('dist-copy-html', function () {
        return gulp.src(options.paths.html)
            // does not work with Angular2 syntax
            //.pipe($.htmlmin({
            //    collapseWhitespace: true,
            //    conservativeCollapse: true,
            //    minifyJS: true
            //}))
            .pipe(gulp.dest(`${options.paths.dist}/js`));
    });

    gulp.task('dist-copy-libs', function () {
        return gulp.src(options.paths.distLibs)
            .pipe(gulp.dest(`${options.paths.tmp}/js/libs`));
    });

    gulp.task('dist-copy-css', function () {
        return gulp.src(options.paths.appCss)
            .pipe(gulp.dest(`${options.paths.tmp}/css/`));
    });

    gulp.task('dist-copy-index', function () {
        return gulp.src(options.paths.appIndex)
            .pipe(gulp.dest(options.paths.dist));
    });

    gulp.task('dist-bundle-js', function() {
        return gulp.src(options.paths.distBundleSrc)
            .pipe($.pureCjs({}))
            .pipe($.rename({
                dirname: 'js'
            }))
            .pipe(gulp.dest(options.paths.tmp));
    });

    gulp.task('dist-bundle-mocked-js', function() {
        return gulp.src(options.paths.distBundleMockedSrc)
            .pipe($.pureCjs({}))
            .pipe($.rename({
                dirname: 'js'
            }))
            .pipe(gulp.dest(options.paths.tmp));
    });

    gulp.task('dist-process-assets', function() {
        return gulp.src(options.paths.distIndex)
            .pipe($.useref({searchPath: options.paths.tmp}))
            .pipe($.if('**/*.js',
                $.lazypipe()
                .pipe($.uglify, {preserveComments: $.uglifySaveLicense})
                .pipe($.header, options.banner, options)
                .pipe($.rev)
                ()
            ))
            .pipe($.if('**/*.css',
                $.lazypipe()
                .pipe($.minifyCss)
                .pipe($.header, options.banner, options)
                .pipe($.rev)
                ()
            ))
            .pipe($.if('*.html',
                $.htmlmin({
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    minifyJS: true
                })
            ))
            .pipe($.revReplace())
            .pipe(gulp.dest(options.paths.dist));
    });

    gulp.task('dist-remove-tmp', function () {
        return del(options.paths.tmp);
    });

    gulp.task('dist-serve', function() {
        var bsOptions = _.cloneDeep(options.bsOptions);
        bsOptions.server.baseDir = options.paths.dist;
        bs.init(bsOptions);
    });

    gulp.task('build', function(cb) {
        $.runSequence(
            ['clean', 'dist-clean'],
            ['copy-libs', 'copy-bootstrap', 'copy-config'],
            ['sass', 'ts2js', 'dist-copy-html', 'dist-index'],
            ['dist-copy-index', 'dist-copy-css', 'dist-copy-libs', 'dist-bundle-js', 'dist-bundle-mocked-js'],
            'dist-process-assets',
            'dist-remove-tmp',
            cb
        );
    });

    var protractor = require('gulp-protractor').protractor;
    gulp.task('dist-e2e', ['webdriver_update', 'dist-serve'], function(cb) {
        gulp.src([])
        .pipe(protractor({
            configFile: options.PROJECT_PATH + '/tests/protractor.conf.js',
            args: [
                '--capabilities.browserName', 'firefox'
            ]
        })).on('error', errorHandler('protractor', true)).on('end', function () {
            bs.exit();
            cb();

        });
    });

};