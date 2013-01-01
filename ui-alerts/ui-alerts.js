angular.module("UiAlertsModule", [])
    .factory('alertsService', ['$timeout', function ($timeout) {
        var baseAlert = {
            success: false,
            error: false,
            warning: false,
            message: ''
        };
        return {
            messages: [],
            addSuccess: function (message) {
                this.messages.push(angular.extend({}, baseAlert, { success: true, message: message }));
            },
            addError: function (message) {
                this.messages.push(angular.extend({}, baseAlert, { error: true, message: message }));
            },
            addWarning: function (message) {
                var alert = angular.extend({}, baseAlert, { warning: true, message: message });
                this.messages.push(alert);
                var self = this;
                $timeout(function () {
                    self.remove(alert);
                }, 3000);
            },
            remove: function (alert) {
                var index = this.messages.indexOf(alert);
                this.messages.splice(index, 1);
            }
        };
    }])
    .directive('uiAlerts', ['alertsService', function (alertsService) {
        return {
            restrict: 'EA',
            replace: true,
            template:
                '<div class="alerts">' +
                    '<div class="alert" ' +
                         'ng-repeat="alert in alerts.messages" ' +
                         'ng-class="{\'alert-success\': alert.success, \'alert-error\': alert.error}"' +
                    '>' +
                        '<a class="close" ng-click="alerts.remove(alert)">&times;</a>' +
                        '{{alert.message}}' +
                    '</div>' +
                '</div>',
            link: function (scope) {
                scope.alerts = alertsService;
            }
        };
    }]);
