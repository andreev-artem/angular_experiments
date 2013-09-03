'use strict';

angular.module('app.dal.entities.user', ['app.dal.rest.user'])

/**
 *
 * Too simple example of entity.
 * Different caching strategies (using memory, localstorage, etc) can be added.
 * More params/responses handling can be used.
 *
 */
.factory('User', function(UserApi){

    var User = function(data) {
        angular.extend(this, data);

        // any processing logic: parse dates, etc
    };

    /**
     * Returns humanized user's full name
     *
     * @returns {string}
     */
    User.prototype.getFullName = function(){
        var names = [];
        if (this.firstName && this.firstName.length > 0) {
            names.push(this.firstName);
        }
        if (this.middleName && this.middleName.length > 0) {
            names.push(this.middleName);
        }
        if (this.lastName && this.lastName.length > 0) {
            names.push(this.lastName);
        }
        return names.join(' ');
    };

    /**
     *
     * @param {Number} id
     * @returns {Promise}
     */
    User.get = function(id){
        return UserApi.get(id).then(function(userData){
            return new User(userData);
        })
    };

    /**
     *
     * @param {Object} [pagination]
     * @param {(Number|undefined)} pagination.page
     * @param {(Number|undefined)} pagination.perPage
     * @returns {Promise}
     */
    User.getAll = function(pagination) {
        var params = {
            page: pagination.page || 1,
            limit: pagination.perPage
        };

        return UserApi.query(params).then(function (response) {
            var users = _.collect(response.data, function(u){ return new User(u); });
            return {
                list: users,
                total: response.total
            };
        });
    };

    /**
     *
     * @returns {Promise}
     */
    User.prototype.create = function() {
        var self = this;

        return UserApi.create(this).then(function(data){
            angular.extend(self, data);
            return self;
        });
    };

    /**
     *
     * @returns {Promise}
     */
    User.prototype.save = function() {
        var self = this;

        return UserApi.update(this).then(function(data){
            angular.extend(self, data);
            return self;
        });
    };

    /**
     *
     * @returns {Promise}
     */
    User.prototype.remove = function() {
        var self = this;

        return UserApi.remove(this.id);
    };


    return User;
});