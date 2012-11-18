angular.module("ExperimentsModule", [])
    .directive('uiRate', function () {
        return {
            restrict: 'EA',
            replace: true,
            template:
                '<ul class="rate-control">' +
                    '<li ng-repeat="cls in classes()"><i ng-class="cls"></i></li>' +
                '</ul>',
            require: 'ngModel',
            scope: true,
            link: function (scope, element, attrs, ngModelCtrl) {
                scope.value = false;
                scope.max = attrs.max;

                ngModelCtrl.$render = function () {
                    scope.value = ngModelCtrl.$viewValue;
                };

                scope.classes = function() {
                    var classes = [];
                    for(var i = 1; i <= scope.value; ++i) {
                        classes.push('icon-star');
                    }
                    if (Math.ceil(scope.value) - Math.floor(scope.value)) {
                        classes.push('icon-star-empty icon-star-half');
                    }
                    for(var i = Math.ceil(scope.value) + 1; i <= scope.max; ++i) {
                        classes.push('icon-star-empty');
                    }
                    return classes;
                };
            }
        };
    });
