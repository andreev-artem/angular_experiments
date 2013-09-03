'use strict';

angular.module('app.dal.api', [])

.provider('Api', function(){

    var options = this.options = {
        apiUrl: ''
    };

    this.$get = function($http, $q, $rootScope) {

        var Api = {};

        /**
         * Some common error handler
         *
         * @param response
         * @returns {Promise}
         */
        var errorHandler = function(response) {
            return $q.reject(response);
        };

        /**
         * Generic GET method call
         * @param name
         * @param {Object} [params]
         * @returns {Promise}
         */
        Api.get = function(name, params) {
            return $http({
                method: 'GET',
                url: options.apiUrl + name,
                params: params,
                withCredentials: true
            }).then(null, errorHandler);
        };

        /**
         * Generic POST method call
         * @param name
         * @param params
         * @returns {Promise}
         */
        Api.post = function(name, params) {
            return $http.post(options.apiUrl + name, params, {withCredentials: true}).then(null, errorHandler);
        };

        /**
         * Generic DELETE method call
         * @param name
         * @param params
         * @returns {Promise}
         */
        Api.delete = function(name, params) {
            return $http.delete(options.apiUrl + name, {withCredentials: true, params: params}).then(null,errorHandler);
        };

        /**
         * Generic PUT method call
         * @param name
         * @param params
         * @returns HttpPromise
         */
        Api.put = function(name, params) {
            return $http.put(options.apiUrl+name, params, {withCredentials: true}).then(null,errorHandler);
        };

        /**
         * Generic method for sending a file
         *
         * @param name
         * @param file
         * @returns {Promise}
         */
        Api.postFile = function(name, file) {
            var deferred = $q.defer();

            var form = new FormData();
            form.append('file', file);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', options.apiUrl + name, true);
            xhr.onload = function(e) {
                if (e.target.status == 200) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
                if (!$rootScope.$$phase) $rootScope.$apply();
            };
            xhr.send(form);

            return deferred.promise;
        };

        return Api;
    };
});