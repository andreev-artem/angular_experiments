exports.config = {
    allScriptsTimeout: 21000,
    directConnect: true,

    specs: [
        'lib/e2e/helpers.js',
        'e2e/**/*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost',

    framework: 'jasmine2',

    onPrepare: function() {
        browser.driver.manage().window().setSize(1280, 900);
    },

    rootElement: 'app',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
