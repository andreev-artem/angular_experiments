'use strict';

describe('promises', function(){

    var $httpBackend, $http, $q, $timeout, $rootScope;
    beforeEach(inject(function(_$httpBackend_, _$http_, _$q_, _$timeout_, _$rootScope_){
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        $q = _$q_;
        $timeout = _$timeout_;
        $rootScope = _$rootScope_;
    }));

    describe('simplest example', function(){

        it('should call success callback on successful result', function(){
            $httpBackend.expectGET('http://api/user').respond(200, {data: ['obj1'], total: 10});

            var responseData;
            $http.get('http://api/user').then(function(response){
                responseData = response.data;
            });

            $httpBackend.flush();
            expect(responseData).toEqual({data: ['obj1'], total: 10});
        });

        it('should call error callback on error result', function(){
            $httpBackend.expectGET('http://api/user').respond(400, {error_code: 10});

            var responseData;
            $http.get('http://api/user').then(
                null,
                function(response){
                    responseData = response.data;
                }
            );

            $httpBackend.flush();
            expect(responseData).toEqual({error_code: 10});
        });

    });

    describe('returning values from callbacks', function(){

        it('should process and return only needed data', function(){
            var User = function(data){
                return angular.extend(this, data);
            };
            $httpBackend.expectGET('http://api/user').respond(200, {
                result: {
                    data: [{name: 'Artem'}],
                    page: 1,
                    total: 10
                }
            });

            var data = {};
            $http.get('http://api/user').then(function(response){
                var usersInfo = {};

                usersInfo.list = _.collect(response.data.result.data, function(u){ return new User(u); });
                usersInfo.total = response.data.result.total;

                return usersInfo;
            }).then(function(usersInfo){
                data.users = usersInfo;
            });

            $httpBackend.flush();
            expect(data.users.list.length).toBe(1);
            expect(data.users.list[0] instanceof User).toBeTruthy();
            expect(data.users.list[0].name).toBe('Artem');
            expect(data.users.total).toBe(10);
        });

        it('should resolve empty data from error callback for expected error', function(){
            $httpBackend.expectGET('http://api/user').respond(400, {error_code: 10, error_message: 'Not initialized'});

            var data = {};
            $http.get('http://api/user').then(
                null,
                function(response){
                    if (response.data && response.data.error_code == 10){
                        return {
                            list: [],
                            total: 0
                        };
                    }
                }
            ).then(function(usersInfo){
                data.users = usersInfo;
            });

            $httpBackend.flush();
            expect(data.users.list.length).toBe(0);
            expect(data.users.total).toBe(0);
        });

        it('should resolve undefined from error callback for unexpected error', function(){
            $httpBackend.expectGET('http://api/user').respond(400, {error_code: 11});

            var data = {};
            $http.get('http://api/user').then(
                null,
                function(response){
                    if (response.data && response.data.error_code == 10){
                        return {
                            list: [],
                            total: 0
                        };
                    }
                }
            ).then(function(usersInfo){
                data.users = usersInfo;
            });

            $httpBackend.flush();
            expect(data.users).toBeUndefined();
        });

        it('should reject error_code from error callback for unexpected error', function(){
            $httpBackend.expectGET('http://api/user').respond(400, {error_code: 11});

            var error;
            $http.get('http://api/user').then(
                null,
                function(response){
                    if (response.data && response.data.error_code == 10){
                        return {
                            list: [],
                            total: 0
                        };
                    }

                    return $q.reject(response.data ? response.data.error_code : null);
                }
            ).then(
                null,
                function(errorCode){
                    error = errorCode;
                }
            );

            $httpBackend.flush();
            expect(error).toBe(11);
        });

        it('should reject null from error callback for unexpected error without data', function(){
            $httpBackend.expectGET('http://api/user').respond(400);

            var error;
            $http.get('http://api/user').then(
                null,
                function(response){
                    if (response.data && response.data.error_code == 10){
                        return {
                            list: [],
                            total: 0
                        };
                    }

                    return $q.reject(response.data ? response.data.error_code : null);
                }
            ).then(
                null,
                function(errorCode){
                    error = errorCode;
                }
            );

            $httpBackend.flush();
            expect(error).toBeNull();
        });

    });

    describe('chaining promises', function(){

        it('should chain calls', function(){
            $httpBackend.expectGET('http://api/user/10').respond(200, {id: 10, name: 'Artem', group_id: 1});
            $httpBackend.expectGET('http://api/group/1').respond(200, {id: 1, name: 'Some group'});

            var user;
            $http.get('http://api/user/10').then(function(response){
                user = response.data;
                return $http.get('http://api/group/' + user.group_id);
            }).then(function(response){
                user.group = response.data;
            });

            $httpBackend.flush();
            expect(user).toEqual({
                id: 10,
                name: 'Artem',
                group_id: 1,
                group: {
                    id: 1,
                    name: 'Some group'
                }
            });
        });

    });

    describe('combining promises', function(){

        it('should wait for all promises in array', function(){
            $httpBackend.expectGET('http://api/obj1').respond(200, {type: 'obj1'});

            var obj1, obj2;
            var request1 = $http.get('http://api/obj1');
            var request2 = $timeout(function(){ return {type: 'obj2'}; });
            $q.all([request1, request2]).then(function(values){
                obj1 = values[0].data;
                obj2 = values[1];
            });

            expect(obj1).toBeUndefined();
            expect(obj2).toBeUndefined();

            $httpBackend.flush();
            expect(obj1).toBeUndefined();
            expect(obj2).toBeUndefined();

            $timeout.flush();
            expect(obj1).toEqual({type: 'obj1'});
            expect(obj2).toEqual({type: 'obj2'});
        });

        it('should wait for all promises in array', function(){
            $httpBackend.expectGET('http://api/obj1').respond(200, {type: 'obj1'});

            var obj1, obj2;
            $q.all({
                obj1: $http.get('http://api/obj1'),
                obj2: $timeout(function(){ return {type: 'obj2'}; })
            }).then(function(values){
                obj1 = values.obj1.data;
                obj2 = values.obj2;
            });

            expect(obj1).toBeUndefined();
            expect(obj2).toBeUndefined();

            $httpBackend.flush();
            expect(obj1).toBeUndefined();
            expect(obj2).toBeUndefined();

            $timeout.flush();
            expect(obj1).toEqual({type: 'obj1'});
            expect(obj2).toEqual({type: 'obj2'});
        });

    });

    describe('$q.when and unit-tests', function(){

        it('should create promise for object', function(){
            var res;
            $q.when({id: 1}).then(function(value){
                res = value;
            });

            $rootScope.$digest();
            expect(res).toEqual({id: 1});
        });

        it('should be used for mocks', function(){
            var UserApi = {
                get: function(id){
                    return $http.get('http://api/user/' + id);
                }
            };


            spyOn(UserApi, 'get').andReturn($q.when({id: 1, name: 'Artem'}));

            var res;
            UserApi.get(1).then(function(user){
                res = user;
            });

            $rootScope.$digest();
            expect(res).toEqual({id: 1, name: 'Artem'});
        });

    });

    describe('interpolation and expressions eval', function(){

        it('should use resolved value during expression eval', function(){
            $rootScope.resPromise = $timeout(function(){ return 10; });

            var res = $rootScope.$eval('resPromise + 2');
            expect(res).toBe(2);

            $timeout.flush();
            res = $rootScope.$eval('resPromise + 2');

            expect(res).toBe(12);
        });

        it('should use resolved value in $watch', function(){
            var res;
            $rootScope.resPromise = $timeout(function(){ return 10; });
            $rootScope.$watch('resPromise', function(newVal){
                res = newVal;
            });

            expect(res).toBeUndefined();

            $timeout.flush();
            expect(res).toBe(10);
        });

        it('should be promise-object', function(){
            $rootScope.resPromise = function(){
                return $timeout(function(){ return 10; });
            };

            var res = $rootScope.$eval('resPromise()');

            expect(typeof res.then).toBe('function');
        });

    });
});