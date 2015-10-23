'use strict';

var gulp = require('gulp');
var fs = require('fs-extra');
var del = require('del');
var path = require('path');
var bs = require("browser-sync").create();
var argv = require('yargs').argv;
var modRewrite  = require('connect-modrewrite');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'uglify-save-license', 'run-sequence']
});

var generateIndexes = require('./lib/generateIndexes');
var errorHandler = require('./lib/errorHandler');


var APP_PATH = 'app';

module.exports = function(options) {

    gulp.task('clean', function(cb) {
        del([
            APP_PATH + '/js/**',
            APP_PATH + '/sass/bootstrap/**',
            APP_PATH + '/index_*.html'
        ], cb);
    });

    gulp.task('copy-libs', function () {
        return gulp.src([
            'node_modules/angular2/bundles/angular2.js',
            'node_modules/angular2/bundles/angular2.min.js',
            'node_modules/angular2/bundles/http.js',
            'node_modules/angular2/bundles/http.min.js',
            'node_modules/angular2/bundles/router.js',
            'node_modules/angular2/bundles/router.min.js',
            'node_modules/systemjs/dist/system-csp-production.js',
            'node_modules/systemjs/dist/system-csp-production.src.js',
            'node_modules/rx/dist/rx.lite.js'
        ]).pipe(gulp.dest(APP_PATH + '/js/libs'));
    });

    gulp.task('copy-bootstrap', function () {
        return gulp.src([
            'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/**'
        ]).pipe(gulp.dest(APP_PATH + '/sass/bootstrap'));
    });

    gulp.task('copy-html', function () {
        return gulp.src([
            APP_PATH + '/ts/**/*.html'
        ]).pipe(gulp.dest(APP_PATH + '/js'));
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
            jsFiles: [
                APP_PATH + '/js/**/*.js',
                '!' + APP_PATH +'/js/libs/**',
                '!' + APP_PATH + '/js/**/*.spec.js'
            ]
        });
        cb();
    });

    var typescript = require('gulp-typescript');
    var tsProject = typescript.createProject({
        noImplicitAny: false,
        module: 'system',
        target: 'ES5',
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        moduleResolution: 'node'
    });
    gulp.task('ts2js', function () {
        var tsResult = gulp.src([
            APP_PATH + '/ts/**/*.ts',
            '!' + APP_PATH + '/ts/configs/**',
            'typings/tsd.d.ts'
        ])
        .pipe(typescript(tsProject));

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
        bs.init({
            port: argv.port || 80,
            open: false,
            notify: false,
            server: {
                baseDir: APP_PATH,
                middleware: [
                    modRewrite([
                        // ignore assets, etc
                        '^(/css/.*)$ $1 [L]',
                        '^(/fonts/.*)$ $1 [L]',
                        '^(/js/.*)$ $1 [L]',
                        // mocked app
                        '^/mocked/$ /index_mock.html [L]',
                        '^/mocked/.*$ /index_mock.html [L]',
                        // regular app
                        '^/.*$ /index.html [L]'
                    ])
                ]
            }
        });
    });

    gulp.task('server', function(cb) {
        return $.runSequence(
            'clean',
            ['copy-libs', 'copy-bootstrap', 'copy-config'],
            ['sass', 'ts2js', 'copy-html'],
            'index',
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
    gulp.task('e2e', function(cb) {
        gulp.src([])
        .pipe(protractor({
            configFile: options.PROJECT_PATH + '/tests/protractor.conf.js'
        })).on('error', errorHandler('protractor', true)).on('end', cb);
    });

};
