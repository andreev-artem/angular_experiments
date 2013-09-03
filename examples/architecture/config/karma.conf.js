module.exports = function(config) {
    config.set({

        basePath: '../app',

        frameworks: ["jasmine"],

        files: [
            '../test/lib/angular/angular.js',
            '../test/lib/angular/angular-*.js',
            'lib/lodash.min.js',
            'lib/angular-route-segment.js',
            '../test/lib/helpers.js',
            'js/**/**/*.js',
            '../test/unit/**/*.js'
        ],

        autoWatch: true,
        singleRun: false,
        keepalive: true,

        browsers: ['PhantomJS'],

        preprocessors: {
            '**/*.html' : 'html2js'
        },

        reporters: ['progress','junit'],

        junitReporter: {
            outputFile: '../junit.xml',
            suite: 'unit'
        }

    });
};
