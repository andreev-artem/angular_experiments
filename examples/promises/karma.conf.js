module.exports = function(config) {
    config.set({

        basePath: '.',

        frameworks: ["jasmine"],

        files: [
            '../../assets/js/angular-1.1.5.js',
            '../../assets/js/angular-mocks.js',
            '../../assets/js/lodash.min.js',

            '*.js'
        ],

        autoWatch: true,
        singleRun: false,
        keepalive: true,

        browsers: ['PhantomJS'],

        reporters: ['progress','junit'],

        unitReporter: {
            outputFile: 'junit.xml',
            suite: 'unit'
        }

    });
};