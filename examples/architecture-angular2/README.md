# Experiments with a possible Angular2 project architecture

It should cover the following tasks:

- [x] multi-tier architecture:

    * `dal` - Data Access Layer:
        * `real/_api.ts` - abstraction of the HTTP/AJAX calls. Supports configurable PRODUCTION and SANDBOX urls.
         May handle any server specifics like settings (eg: withCredentials), raw-errors handling, common params, transforms, etc
        * `real/*Api.ts` - set of pure (without any logic) endpoint-based methods to talk with your servers.
         Will be replaced by a Fake API layer for e2e.
        * `fake/*Api.ts` - Fake API layer for e2e
    * `bl` - Business layer - your business reusable logic which will be used by components (send/retrieve, caching, validation, common logic, etc).
    * `modules` - components with pages logic.
    * ... - any other semantically-named sets of project-specific entities (eg: cards, actions, widgets, etc)

- [x] dev workflow gulp tasks - mostly done
- [x] very-very basic app functionality (actually almost nothing - just load some data from server and display list)
- [ ] unit-tests
    - [x] - base skeleton with simple examples
    - [ ] - more complex project components unit-tests
    - [ ] - coverage
- [ ] e2e (protractor)
    - [x] - base skeleton with helpers and simple examples
    - [ ] - more complex project components e2e-tests
- [ ] more complex project components
    - [ ] routing
    - [ ] ... to be continued
- [ ] ci/production gulp tasks
- [ ] [Hot Loader](http://blog.mgechev.com/2015/10/26/angular2-hot-loader-hot-loading-tooling/)

## Installing Local Env

* `npm i -g gulp`
* `npm i`

## Running Local Env

* `gulp server`

    http://localhost - dev app with sandbox API urls
    
    http://localhost/mocked/ - dev app with Fake API data
    
* `gulp server --env=production`

    http://localhost - dev app with production API urls
    
* `gulp unit`

    run unit-tests in auto-watch mode using PhantomJS2
    
* `gulp unit --browser=Chrome`

    run unit-tests in auto-watch mode using Chrome
    
* `gulp ci-unit`

    run unit-tests in continuous integration mode using PhantomJS2
    
* `gulp e2e`

    run e2e tests using Chrome
