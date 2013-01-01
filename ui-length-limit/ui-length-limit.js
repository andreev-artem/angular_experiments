angular.module("UiLengthLimitModule", [])
    .directive('uiLengthLimit', ['$parse', function ($parse) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            var ngModelSet = $parse(attrs.ngModel).assign;

            ngModelCtrl.$viewChangeListeners.push(function() {
                ngModelSet(scope, ngModelCtrl.$viewValue.slice(0, attrs.uiLengthLimit));
            });
        }
    };
}]);