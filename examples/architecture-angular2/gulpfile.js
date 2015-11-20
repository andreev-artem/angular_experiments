'use strict';

var fs = require('fs');
var gulp = require('gulp');
var argv = require('yargs').argv;
var modRewrite  = require('connect-modrewrite');

var options = {
    PROJECT_PATH: __dirname,
    pkg: require('./package.json'),
    dt: new Date(),
    banner: '/* <%= pkg.name %> v<%= pkg.version %>, <%= dt %> */\n',
    bsOptions: {
        port: argv.port || 80,
        open: false,
        notify: false,
        server: {
            middleware: [
                modRewrite([
                    // ignore assets, etc
                    '^(/css/.*)$ $1 [L]',
                    '^(/fonts/.*)$ $1 [L]',
                    '^(/js/.*)$ $1 [L]',
                    // mocked app
                    '^/mocked/$ /index_mocked.html [L]',
                    '^/mocked/.*$ /index_mocked.html [L]',
                    // regular app
                    '^/.*$ /index.html [L]'
                ])
            ]
        }
    },
    tsProject: {
        noImplicitAny: false,
        module: 'commonjs', //used instead of "system" to have lesser overhead for the dist minified version of app
        target: 'ES5',
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        moduleResolution: 'node'
    },
    paths: {
        app: 'app',
        dist: 'dist',
        libs: [
            'node_modules/angular2/bundles/angular2.js',
            'node_modules/angular2/bundles/angular2.min.js',
            'node_modules/angular2/bundles/http.js',
            'node_modules/angular2/bundles/http.min.js',
            'node_modules/angular2/bundles/router.js',
            'node_modules/angular2/bundles/router.min.js',
            'node_modules/systemjs/dist/system.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/zone.js/dist/zone.js'
        ],
        bootstrap: [
            'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/**'
        ],
        html: [
            'app/ts/**/*.html'
        ],
        ts: [
            'app/ts/**/*.ts',
            '!app/ts/configs/**'
        ],
        distBundleSrc: 'app/js/bootstrap.js',
        distBundleMockedSrc: 'app/js/bootstrap_mocked.js',
        distLibs: [
            'app/js/libs/Reflect.js',
            'app/js/libs/zone.js'
        ],
        appCss: 'app/css/**',
        appIndex: 'app/index*.html',
        distIndex: 'dist/index*.html',
        tmp: '.tmp'
    }
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
