'use strict';

/**
 *
 * Real application
 *
 * Requirements list contains 'app.pages' (high level business logic of our pages) and
 * modules which is used by index.html
 *
 */
angular.module('app', ['app.pages'])

.config(function($routeSegmentProvider, $dialogProvider, ApiProvider){
    $routeSegmentProvider.options.autoLoadTemplates = true;
    $routeSegmentProvider.options.strictMode = true;

    $dialogProvider.options({modalFade: true});

    ApiProvider.options.apiUrl = 'http://path/to/my/api';
})

.run(function($rootScope, $routeSegment){
    $rootScope.routeSegment = $routeSegment;
});


/**
 *
 * Mocked mode of application
 *
 */
angular.module('app-mocked', ['ngMockE2E',
                              'view-segment',
                              'app',
                              'app.dal.fake.user'])

.config(function($provide) {
    $provide.factory('UserApi', function(UserFakeApi){ return UserFakeApi });
})

.run(function($httpBackend) {
    $httpBackend.whenGET(/views\/.*/).passThrough();
});
