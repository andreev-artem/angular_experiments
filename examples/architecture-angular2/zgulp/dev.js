'use strict';

var gulp = require('gulp');
var fs = require('fs-extra');
var del = require('del');
var _ = require('lodash');
var path = require('path');
var bs = require("browser-sync").create();
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'uglify-save-license', 'run-sequence']
});

var generateIndexes = require('./lib/generateIndexes');
var errorHandler = require('./lib/errorHandler');


module.exports = function(options) {

    var APP_PATH = options.paths.app;

    gulp.task('clean', function() {
        return del([
            APP_PATH + '/js/**',
            APP_PATH + '/sass/bootstrap/**',
            APP_PATH + '/index_*.html'
        ]);
    });

    gulp.task('copy-libs', function () {
        return gulp.src(options.paths.libs)
            .pipe(gulp.dest(APP_PATH + '/js/libs'));
    });

    gulp.task('copy-bootstrap', function () {
        return gulp.src(options.paths.bootstrap)
            .pipe(gulp.dest(APP_PATH + '/sass/bootstrap'));
    });

    gulp.task('copy-html', function () {
        return gulp.src(options.paths.html)
            .pipe(gulp.dest(APP_PATH + '/js'));
    });

    gulp.task('copy-config', function (cb) {
        fs.copySync(
            `${options.PROJECT_PATH}/${APP_PATH}/ts/configs/${argv.env || 'sandbox'}.ts`.replace('/', path.sep),
            `${options.PROJECT_PATH}/${APP_PATH}/ts/config.ts`.replace('/', path.sep)
        );
        cb();
    });

    gulp.task('index', function(cb) {
        generateIndexes({
            appPath: APP_PATH,
            dev: true
        });
        cb();
    });

    var tsProject = $.typescript.createProject(options.tsProject);
    gulp.task('ts2js', function () {
        var tsResult = gulp.src(options.paths.ts)
            .pipe($.typescript(tsProject));

        return tsResult.js.pipe(gulp.dest(APP_PATH + '/js'));
    });

    gulp.task('sass', function () {
        gulp.src(APP_PATH + '/sass/style.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gulp.dest(APP_PATH + '/css'));
    });

    gulp.task('watch', function() {

        gulp.watch([
            APP_PATH + '/ts/**/*.ts'
        ], ['ts2js']);

        gulp.watch([
            APP_PATH + '/ts/**/*.html'
        ]).on('change', function (file) {
            fs.copySync(file.path, file.path.replace(`app${path.sep}ts`, `app${path.sep}js`));
        });

        gulp.watch([
            APP_PATH + '/index.html.tmpl'
        ], ['index']);

        gulp.watch([
            APP_PATH + '/css/*.css',
            APP_PATH + '/index.html.tmpl',
            APP_PATH + '/js/**/*.js',
            '!' + APP_PATH + '/js/**/*_spec.js',
            APP_PATH + '/js/**/*.html',
            APP_PATH + '/*.html'
        ], function(event) {
            bs.reload(event.path);
        });

    });

    gulp.task('serve', function() {
        var bsOptions = _.cloneDeep(options.bsOptions);
        bsOptions.server.baseDir = APP_PATH;
        bs.init(bsOptions);
    });

    gulp.task('server', function(cb) {
        return $.runSequence(
            'clean',
            ['copy-libs', 'copy-bootstrap', 'copy-config'],
            ['sass', 'ts2js', 'copy-html', 'index'],
            ['watch', 'serve'],
            cb
        );
    });

    var KarmaServer = require('karma').Server;
    gulp.task('unit', function(cb) {
        new KarmaServer({
            configFile: options.PROJECT_PATH + '/tests/karma.conf.js',
            singleRun: false,
            browsers: [argv.browser || 'PhantomJS2']
        }).start(cb);
    });
    gulp.task('ci-unit', function(cb) {
        new KarmaServer({
            configFile: options.PROJECT_PATH + '/tests/karma.conf.js',
            singleRun: true,
            browsers: ['PhantomJS2'],
            plugins: [
                'karma-jasmine',
                'karma-phantomjs2-launcher',
                'karma-coverage'
            ],
            reporters: ['coverage', 'dots']
        }).start(cb);
    });

    var protractor = require('gulp-protractor').protractor;
    var webdriverUpdate = require('gulp-protractor').webdriver_update;
    gulp.task('webdriver_update', webdriverUpdate);
    gulp.task('e2e', ['webdriver_update'], function(cb) {
        gulp.src([])
        .pipe(protractor({
            configFile: options.PROJECT_PATH + '/tests/protractor.conf.js'
        })).on('error', errorHandler('protractor', true)).on('end', cb);
    });

};
