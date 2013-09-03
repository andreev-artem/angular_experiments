'use strict';

angular.module('app.pages.admin.groups.list', ['view-segment'])

.config(function($routeSegmentProvider){
    $routeSegmentProvider

    .when('/admin/groups', 'admin.groups-list')

    .within('admin')

        .segment('groups-list', {
            templateUrl: 'views/admin/groups/list.html',
            controller: 'admin:Index.GroupsList'
        });
})

.controller('admin:Index.GroupsList', function($scope){

});