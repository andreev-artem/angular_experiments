angular.module("UiEqualToModule", [])
    .directive('uiEqualTo', function(){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {

                function validateEqual(myValue, otherValue) {
                    if (myValue === otherValue) {
                        ctrl.$setValidity('equal', true);
                        return myValue;
                    } else {
                        ctrl.$setValidity('equal', false);
                        return myValue;
                    }
                }

                scope.$watch(attrs.uiEqualTo, function (otherModelValue) {
                    validateEqual(ctrl.$viewValue, otherModelValue);
                });

                ctrl.$parsers.unshift(function (viewValue) {
                    return validateEqual(viewValue, scope.$eval(attrs.uiEqualTo));
                });

                ctrl.$formatters.unshift(function (modelValue) {
                    return validateEqual(modelValue, scope.$eval(attrs.uiEqualTo));
                });
            }
        };
    });
