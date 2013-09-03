'use strict';

angular.module('app.pages.admin.users.list', ['view-segment',
                                              'app.lib.ui.dialog',
                                              'app.lib.ui.pagination',
                                              'app.dal.entities.user'])

.config(function($routeSegmentProvider){
    $routeSegmentProvider

    .when('/admin/users', 'admin.users-list')

    .within('admin')

        .segment('users-list', {
            templateUrl: 'views/admin/users/list.html',
            controller: 'admin:Index.UsersList as UsersList',
            resolve: {
                data: function(UsersList_Loader) {
                    return UsersList_Loader.load();
                }
            }
        });
})

.constant('C_UsersList', {
    PER_PAGE: 15
})

.factory('UsersList_Loader', function($q, $location, C_UsersList, User) {
    var data = {};
    var Loader = {};

    Loader.load = function(page) {
        return $q.all({
            users: User.getAll({
                page: page || $location.search().page || 1,
                perPage: C_UsersList.PER_PAGE
            })
        }).then(function(values){
            angular.extend(data, values);
            return data;
        });
    };

    return Loader;
})

/**
 * The users list
 */
.controller('admin:Index.UsersList', function($scope, data) {
    /**
     * @class UsersList
     */
    var ctrl = this;

    $scope.data = data;

    ctrl.getSelectedUsers = function(){
        return _.filter(data.users.list, 'selected');
    };

    ctrl.noSelectedUsers = function(){
        return !_.any(data.users.list, {selected: true});
    };

    ctrl.selectedExtSyncUsers = function(){
        return _.any(data.users.list, {selected: true, extSync: true});
    };

    $scope.onSelectAll = function(){
        _.each(data.users.list, function(user){ user.selected = $scope.allSelected; });
    };
})

.controller('admin:Index.UsersList.Pagination', function($scope, $location, C_UsersList, UsersList_Loader) {
    /**
     * @type {UsersList}
     */
    var UsersList = $scope.UsersList;

    $scope.curPage = $location.search().page || 1;
    $scope.totalUsers = 0;
    $scope.perPage = C_UsersList.PER_PAGE;

    $scope.$watch('data.users.total', function(usersTotalCount) {
        $scope.totalUsers = usersTotalCount;
    });

    $scope.$watch(
        function () {
            return $location.search().page || 1;
        },
        function (page, prevPage) {
            if (page == prevPage) return;

            $scope.onSelectPage(page);
            $scope.curPage = page;
        }
    );

    $scope.onSelectPage = function(page){
        $scope.pageLoading = true;
        UsersList_Loader.load(page).always(function(){
            $scope.pageLoading = false;
        });
        $location.search('page', page);
    };
})

.controller('admin:Index.UsersList.BtnRemove', function($scope, $q, $dialog, UsersList_Loader){
    /**
     * @type {UsersList}
     */
    var UsersList = $scope.UsersList;

    $scope.isDisabled = function(){
        return UsersList.noSelectedUsers() || UsersList.selectedExtSyncUsers();
    };

    var ctrl = this;
    ctrl.removeUsers = function(users){
        return $q.all(_.invoke(users, 'remove')).always(function(){
            return UsersList_Loader.load();
        });
    };

    $scope.onClick = function(){
        var toRemove = UsersList.getSelectedUsers();

        $dialog.messageBox(
            'Remove Users',
            "Do you really want to remove " + toRemove.length + " users?",
            [
                {
                    label: 'No',
                    result: false
                },
                {
                    label: 'Yes',
                    cssClass: 'btn-primary',
                    result: function(){
                        return ctrl.removeUsers(toRemove);
                    }
                }
            ]
        )
        .open();
    };
});
