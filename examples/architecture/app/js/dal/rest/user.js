'use strict';

angular.module('app.dal.rest.user', ['app.dal.api'])

/**
 *
 * Too simple example with CRUD methods only.
 * More complex app can contain additional specific methods.
 * Also every method can have additional params handlers, etc.
 * Good place for API's documenting
 *
 * One common rule: "one endpoint - one method"
 *
 */
.factory('UserApi', function($q, Api){
    var UserApi = {};
  
    /**
     *
     * @param {Number} id
     * @returns {Promise}
     */
    UserApi.get = function(id){
        return Api.get('/users/' + id).then(
            function(response){
                return response.data.result;
            },
            function(response) {
                return $q.reject(response.data.error_code);
            }
        );
    };

    /**
     *
     * @param {Object} [params]
     * @param {Number} [params.page]
     * @param {Number} [params.limit]
     * @returns {Promise}
     */
    UserApi.query = function(params){
        return Api.get('/users/', params || {}).then(
            function(response){
                return response.data.result;
            },
            function(response) {
                return $q.reject(response.data.error_code);
            }
        );
    };
    
    /**
     *
     * @param {object} data
     * @returns {Promise}
     */
    UserApi.create = function(data){
        return Api.post('/users/', data).then(
            function(response){
                return response.data.result;
            },
            function(response) {
                return $q.reject(response.data.error_code);
            }
        );
    };

    /**
     *
     * @param {object} data
     * @returns {Promise}
     */
    UserApi.update = function(data){
        return Api.put('/users/' + data.id, data).then(
            function(response){
                return response.data.result;
            },
            function(response) {
                return $q.reject(response.data.error_code);
            }
        );
    };

    /**
     *
     * @param {Number} id
     * @returns {Promise}
     */
    UserApi.remove = function(id){
        return Api['delete']('/users/' + id).then(
            function(response){
                return response.data.result;
            },
            function(response) {
                return $q.reject(response.data.error_code);
            }
        );
    };

    return UserApi;
});