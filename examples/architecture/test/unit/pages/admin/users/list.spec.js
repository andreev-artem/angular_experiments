'use strict';

describe('app.pages.admin.users.list', function(){

    beforeEach(module('app.pages.admin.users.list'));

    var $rootScope, $location, $controller, $q;
    var UsersList_Loader, User;
    var dialog, locationSearch;
    beforeEach(inject(function(_$rootScope_, _$location_, _$controller_, _$q_,
                               _UsersList_Loader_, _User_, C_UsersList){
        $rootScope = _$rootScope_;
        $location = _$location_;
        $controller = _$controller_;
        $q = _$q_;

        UsersList_Loader = _UsersList_Loader_;
        User = _User_;

        C_UsersList.PER_PAGE = 10;

        locationSearch = $location.search();
    }));

    describe('UsersList_Loader', function() {

        beforeEach(function() {
            spyOn(User, 'getAll').andReturn($q.when({users: [], total: 1}));
        });

        it('should call User.getAll with page == location.page when called without arguments', function(){
            locationSearch.page = 11;

            UsersList_Loader.load();

            $rootScope.$digest();
            expect(User.getAll).toHaveBeenCalledWith({page: 11, perPage: 10});
        });

        it('should call User.getAll with passed page', function(){
            locationSearch.page = 11;

            UsersList_Loader.load(2);

            $rootScope.$digest();
            expect(User.getAll).toHaveBeenCalledWith({page: 2, perPage: 10});
        });

        it('should initialize data', function(){
            User.getAll = User.getAll.originalValue;
            spyOn(User, 'getAll').andReturn($q.when({list: [1, 2], total: 20}));

            var result;
            UsersList_Loader.load(1).then(function(r){ result = r; });

            $rootScope.$digest();
            expect(result).toEqual({users: {list: [1, 2], total: 20}});
        });
    });

    describe('admin:Index.UsersList', function(){

        var listScope, resolvedData, UsersList;

        beforeEach(function() {
            UsersList = $controller('admin:Index.UsersList as UsersList', {
                $scope: listScope = $rootScope.$new(),
                data: resolvedData = {users: [], total: 0}
            });

            dialog = jasmine.createSpyObj('dialog', ['dialog', 'messageBox', 'open', 'close']);
            dialog.dialog.andReturn(dialog);
            dialog.open.andReturn($q.when());
            dialog.messageBox.andReturn(dialog);

            spyOn(UsersList_Loader, 'load').andReturn($q.when());
        });

        describe('noSelectedUsers', function(){

            it('should return false if any student is selected', function(){
                resolvedData.users.list = [
                    { selected: false},
                    { selected: true }
                ];

                expect(UsersList.noSelectedUsers()).toBeFalsy();
            });

            it('should return true if no student is selected', function(){
                resolvedData.users.list = [
                    { selected: false},
                    { selected: false }
                ];

                expect(UsersList.noSelectedUsers()).toBeTruthy();
            });

        });

        describe('selectedExtSyncUsers', function(){

            it('should return true if selected any imported student', function(){
                resolvedData.users.list = [
                    { selected: false, extSync: true },
                    { selected: true,  extSync: true }
                ];

                expect(UsersList.selectedExtSyncUsers()).toBeTruthy();
            });

            it('should return false if selected only manually added users', function(){
                resolvedData.users.list = [
                    { selected: false, extSync: true },
                    { selected: true,  extSync: false }
                ];

                expect(UsersList.selectedExtSyncUsers()).toBeFalsy();
            });

        });

        describe('onSelectAll', function(){
            beforeEach(function(){
                resolvedData.users.list = [
                    { selected: false},
                    { selected: true }
                ];
            });

            it('should select all users', function(){
                listScope.allSelected = true;

                listScope.onSelectAll();

                expect(resolvedData.users.list[0].selected).toBeTruthy();
                expect(resolvedData.users.list[1].selected).toBeTruthy();
            });

            it('should deselect all users', function(){
                listScope.allSelected = false;

                listScope.onSelectAll();

                expect(resolvedData.users.list[0].selected).toBeFalsy();
                expect(resolvedData.users.list[1].selected).toBeFalsy();
            });
        });

        describe('admin:Index.UsersList.Pagination', function() {
            var scope, Pagination;
            beforeEach(function(){
                Pagination = $controller('admin:Index.UsersList.Pagination', {
                    $scope: scope = listScope.$new()
                });
                listScope.$digest();
            });

            it('should track dependency `totalUsers` -> `usersTotalCount`', function() {
                listScope.data.users.total = 50;
                scope.$digest();
                expect(scope.totalUsers).toBe(50);
            });

            it('should watch for location.page changes', function() {
                locationSearch.page = 10;

                scope.$digest();
                expect(UsersList_Loader.load).toHaveBeenCalledWith(10);
                expect(scope.curPage).toBe(10);
            });

            it('should update location.page', function() {
                scope.onSelectPage(5);
                scope.$digest();
                expect(locationSearch.page).toBe(5);
            })
        });

        describe('admin:Index.UsersList.BtnRemove', function(){

            var scope, ctrl;
            beforeEach(function(){
                scope = listScope.$new();
                ctrl = $controller('admin:Index.UsersList.BtnRemove', {
                    $scope: scope,
                    $dialog: dialog
                });
            });

            describe('isDisabled', function(){

                it('should check UsersList.noSelectedUsers and UsersList.selectedExtSyncUsers', function(){
                    spyOn(UsersList, 'noSelectedUsers');
                    spyOn(UsersList, 'selectedExtSyncUsers');

                    scope.isDisabled();

                    expect(UsersList.noSelectedUsers).toHaveBeenCalled();
                    expect(UsersList.selectedExtSyncUsers).toHaveBeenCalled();
                });

            });

            describe('removeUsers', function(){

                it('should remove all selected users', function(){
                    var users = [
                        { selected: true, remove: jasmine.createSpy('remove') },
                        { selected: true, remove: jasmine.createSpy('remove') }
                    ];
                    ctrl.removeUsers(users);

                    expect(users[0].remove).toHaveBeenCalled();
                    expect(users[1].remove).toHaveBeenCalled();
                });

                it('should call UsersList.loadData after successful removes', function(){

                    ctrl.removeUsers([
                        { selected: true, remove: jasmine.createSpy('remove').andReturn($q.when()) },
                        { selected: true, remove: jasmine.createSpy('remove').andReturn($q.when()) }
                    ]);

                    $rootScope.$digest();
                    expect(UsersList_Loader.load).toHaveBeenCalled();
                });

                it('should call UsersList.loadData after error', function(){

                    ctrl.removeUsers([
                        { selected: true, remove: jasmine.createSpy('remove').andReturn($q.when()) },
                        { selected: true, remove: jasmine.createSpy('remove').andReturn($q.reject()) }
                    ]);

                    $rootScope.$digest();
                    expect(UsersList_Loader.load).toHaveBeenCalled();
                });
            });

            describe('onClick', function(){

                it('should remove all selected users', function(){
                    scope.onClick();

                    expect(dialog.messageBox).toHaveBeenCalled();
                    expect(dialog.open).toHaveBeenCalled();
                });
            });

        });

    });

});