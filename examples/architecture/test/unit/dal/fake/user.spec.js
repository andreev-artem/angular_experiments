'use strict';

describe('app.dal.fake.user', function(){

    beforeEach(module('app.dal.fake.user'));

    beforeEach(module(function($provide){
        var users = _.collect(_.range(1, 98), function(id){ return {id: id}});
        $provide.value('UserFakeData', users);
    }));

    var $rootScope, UserFakeApi;
    var success, error;
    beforeEach(inject(function(_$rootScope_, _UserFakeApi_){
        $rootScope = _$rootScope_;
        UserFakeApi = _UserFakeApi_;

        success = jasmine.createSpy('success');
        error = jasmine.createSpy('error');
    }));

    describe('UserFakeApi.get', function(){

        it('should return user data for existing item', function(){
            var user;
            UserFakeApi.get(1).then(function(userData){ user = userData; });

            $rootScope.$apply();
            expect(user.id).toBe(1);
        });

        it('should reject with 404 if user does not exist', function(){
            UserFakeApi.get(99999).then(success, error);

            $rootScope.$apply();
            expect(error).toHaveBeenCalledWith('404');
        });

    });

    describe('UserFakeApi.query', function(){

        it('should return right total count', function(){
            var users;
            UserFakeApi.query().then(function(usersData){ users = usersData});

            $rootScope.$apply();
            expect(users.total).toBe(97);
        });

        it('should return first 10 users if params is not passed', function(){
            var users;
            UserFakeApi.query().then(function(usersData){ users = usersData});

            $rootScope.$apply();
            expect(users.data.length).toBe(10);
            expect(users.data[0].id).toBe(1);
            expect(users.data[9].id).toBe(10);
        });

        it('should return users from 11 to 20', function(){
            var users;
            UserFakeApi.query({page: 2}).then(function(usersData){ users = usersData});

            $rootScope.$apply();
            expect(users.data.length).toBe(10);
            expect(users.data[0].id).toBe(11);
            expect(users.data[9].id).toBe(20);
        });

        it('should return users from 11 to 20', function(){
            var users;
            UserFakeApi.query({page: 2}).then(function(usersData){ users = usersData});

            $rootScope.$apply();
            expect(users.data.length).toBe(10);
            expect(users.data[0].id).toBe(11);
            expect(users.data[9].id).toBe(20);
        });

        it('should return users from 91 to 98', function(){
            var users;
            UserFakeApi.query({page: 10}).then(function(usersData){ users = usersData});

            $rootScope.$apply();
            expect(users.data.length).toBe(7);
            expect(users.data[0].id).toBe(91);
            expect(users.data[6].id).toBe(97);
        });

        it('should return users from 1 to 98', function(){
            var users;
            UserFakeApi.query({page: 1, limit: 100}).then(function(usersData){ users = usersData});

            $rootScope.$apply();
            expect(users.data.length).toBe(97);
            expect(users.data[0].id).toBe(1);
            expect(users.data[96].id).toBe(97);
        });

        it('should return users from 21 to 40', function(){
            var users;
            UserFakeApi.query({page: 2, limit: 20}).then(function(usersData){ users = usersData});

            $rootScope.$apply();
            expect(users.data.length).toBe(20);
            expect(users.data[0].id).toBe(21);
            expect(users.data[19].id).toBe(40);
        });

    });

    describe('UserFakeApi.create', function(){

        it('should add new user', function(){
            var newUserData = {
                firstName: 'Artem',
                lastName: 'Andreev',
                email: 'andreev.artem@gmail.com'
            };

            var newUser;
            UserFakeApi.create(newUserData).then(function(userData){ newUser = userData});

            $rootScope.$apply();
            expect(newUser).toEqual({
                id: 98,
                firstName: 'Artem',
                lastName: 'Andreev',
                email: 'andreev.artem@gmail.com'
            });
        });

    });

    describe('UserFakeApi.update', function(){

        it('should reject with 404 if user does not exist', function(){
            UserFakeApi.update({id: 99999}).then(success, error);

            $rootScope.$apply();
            expect(error).toHaveBeenCalledWith('404');
        });

        it('should update user', function(){
            var user;
            UserFakeApi.get(1).then(function(userData){ user = userData; });
            $rootScope.$apply();
            expect(user.firstName).toBeUndefined();

            var updatedUser;
            UserFakeApi.update({id: 1, firstName: 'Artem'}).then(function(userData){ updatedUser = userData; });

            $rootScope.$apply();
            expect(updatedUser.firstName).toBe('Artem');
            expect(user.firstName).toBe('Artem');
        });

    });

    describe('UserFakeApi.remove', function(){

        it('should remove user', function(){
            UserFakeApi.remove(1);

            UserFakeApi.get({id: 1}).then(success, error);
            $rootScope.$apply();
            expect(error).toHaveBeenCalled();
        });

    });

});