angular.module("ExperimentsModule", [])
    .directive('uiCheckbox', function () {
        return {
            restrict: 'EA',
            replace: true,
            template:
                '<div class="checkbox-control" ng-click="toggle()">' +
                    '<span ng-class="{\'icon-check-empty\': !value, \'icon-check\': value}"></span>' +
                    '<span class="checkbox-label">{{label}}</span>' +
                '</div>',
            require: 'ngModel',
            scope: true,
            link: function (scope, element, attrs, ngModelCtrl) {
                scope.value = false;
                scope.label = attrs.label;

                ngModelCtrl.$render = function () {
                    scope.value = ngModelCtrl.$viewValue;
                };

                scope.toggle = function () {
                    scope.value = !scope.value;
                    ngModelCtrl.$setViewValue(scope.value);
                };
            }
        };
    });
