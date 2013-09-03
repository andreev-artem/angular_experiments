'use strict';

angular.module('app.pages.admin.index', ['view-segment'])

.config(function($routeSegmentProvider){
    $routeSegmentProvider

    .when('/admin', 'admin')

    .segment('admin', {
        templateUrl: 'views/admin/index.html',
        controller: 'admin:Index'
    });
})

.controller('admin:Index', function($scope){

});