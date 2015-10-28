// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () {
};

System.config({
    packages: {
        'angular2': {
            defaultExtension: false
        },
        'base/app': {
            defaultExtension: 'js'
        }
    }
});

// Import all the specs, execute their `main()` method and kick off Karma (Jasmine).
System.import('angular2/src/core/dom/browser_adapter').then(function (browser_adapter) {
    browser_adapter.BrowserDomAdapter.makeCurrent();
}).then(function () {
        return Promise.all(
            Object.keys(window.__karma__.files)
                .filter(onlySpecFiles)
                .map(function (path) {
                    return System.import(path).then(function(module) {
                        if (module.hasOwnProperty('main')) {
                            module.main();
                        } else {
                            throw new Error('Unit-test module ' + path + ' does not implement main() method.');
                        }
                    });
                })
        );
    })
    .then(function () {
        __karma__.start();
    }, function (error) {
        __karma__.error(error.stack || error);
    });


function onlySpecFiles(path) {
    return /_spec\.js$/.test(path);
}
