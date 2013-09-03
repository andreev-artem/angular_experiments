'use strict';

describe('app.dal.entities.user', function(){

    beforeEach(module('app.dal.entities.user'));

    var $rootScope, $q, User, UserApi;
    beforeEach(inject(function(_$rootScope_, _$q_, _User_, _UserApi_){
        $rootScope = _$rootScope_;
        $q = _$q_;
        User = _User_;
        UserApi = _UserApi_;
    }));

    describe('User', function(){

        it('should properly create user', function(){
            var user = new User({
                firstName: 'Artem',
                lastName: 'Andreev',
                email: 'andreev.artem@gmail.com'
            });

            expect(user).toEqualData({
                firstName: 'Artem',
                lastName: 'Andreev',
                email: 'andreev.artem@gmail.com'
            });
        })

    });
    
    describe('User.prototype.getFullName', function(){
        
        it('should return empty string if name is not defined', function(){
            var user = new User({});

            expect(user.getFullName()).toEqual('');
        });

        it('should return empty string if last name is not defined', function(){
            var user = new User({
                firstName: '',
                middleName: ''
            });

            expect(user.getFullName()).toEqual('');
        });

        it('should return empty string if first name is not defined', function(){
            var user = new User({
                lastName: '',
                middleName: ''
            });

            expect(user.getFullName()).toEqual('');
        });

        it('should return empty string if middle name is not defined', function(){
            var user = new User({
                lastName: '',
                firstName: ''
            });

            expect(user.getFullName()).toEqual('');
        });

        it('should return empty string when we have empty first, middle and last', function(){
            var user = new User({
                firstName: '',
                middleName: '',
                lastName: ''
            });

            expect(user.getFullName()).toEqual('');
        });

        it('should return properly constructed full name string when we have empty middle and last', function(){
            var user = new User({
                firstName: 'First',
                middleName: '',
                lastName: ''
            });

            expect(user.getFullName()).toEqual('First');
        });

        it('should return properly constructed full name string when we have empty first and last', function(){
            var user = new User({
                firstName: '',
                middleName: 'Middle',
                lastName: ''
            });

            expect(user.getFullName()).toEqual('Middle');
        });

        it('should return properly constructed full name string when we have empty first and middle', function(){
            var user = new User({
                firstName: '',
                middleName: '',
                lastName: 'Last'
            });

            expect(user.getFullName()).toEqual('Last');
        });

        it('should return properly constructed full name string when we have empty first', function(){
            var user = new User({
                firstName: '',
                middleName: 'Middle',
                lastName: 'Last'
            });

            expect(user.getFullName()).toEqual('Middle Last');
        });

        it('should return properly constructed full name string when we have empty middle', function(){
            var user = new User({
                firstName: 'First',
                middleName: '',
                lastName: 'Last'
            });

            expect(user.getFullName()).toEqual('First Last');
        });

        it('should return properly constructed full name string when we have empty last', function(){
            var user = new User({
                firstName: 'First',
                middleName: 'Middle',
                lastName: ''
            });

            expect(user.getFullName()).toEqual('First Middle');
        });

        it('should return properly constructed full name string when we have all parts', function(){
            var user = new User({
                firstName: 'First',
                middleName: 'Middle',
                lastName: 'Last'
            });

            expect(user.getFullName()).toEqual('First Middle Last');
        });

    });

    describe('User.get', function(){

        it('should call UserApi and properly initialize data', function(){
            spyOn(UserApi, 'get').andReturn($q.when({
                id: 1,
                firstName: 'First',
                lastName: 'Last',
                email: 'first.last@gmail.com'
            }));

            var user;
            User.get(1).then(function(u){ user = u; });

            $rootScope.$digest();
            expect(UserApi.get).toHaveBeenCalledWith(1);
            expect(user.id).toBe(1);
            expect(user instanceof User).toBeTruthy();
        });

    });

    describe('User.getAll', function(){

        it('should call UserApi and properly initialize data', function(){
            spyOn(UserApi, 'query').andReturn($q.when({
                data: [
                    {
                        id: 1,
                        firstName: 'First1',
                        lastName: 'Last1',
                        email: 'first1.last1@gmail.com'
                    },
                    {
                        id: 2,
                        firstName: 'First2',
                        lastName: 'Last2',
                        email: 'first2.last2@gmail.com'
                    }
                ],
                total: 2
            }
            ));

            var users;
            User.getAll({page: 1, perPage: 10}).then(function(u){ users = u; });

            $rootScope.$digest();
            expect(UserApi.query).toHaveBeenCalledWith({page: 1, limit: 10});
            expect(users.total).toBe(2);
            expect(users.list[0].id).toBe(1);
            expect(users.list[1].id).toBe(2);
            expect(users.list[0] instanceof User).toBeTruthy();
            expect(users.list[1] instanceof User).toBeTruthy();
        });

    });

});