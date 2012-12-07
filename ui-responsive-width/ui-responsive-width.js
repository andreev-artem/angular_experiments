angular.module("ExperimentsModule", [])
    .directive('uiResponsiveWidth', function ($parse) {
        return function (scope, element, attrs) {
            var width = element.width();
            var setWidth = $parse(attrs.uiResponsiveWidth).assign;
            setWidth(scope, width);

            setInterval(function () {
                var newWidth = element.width();
                if (newWidth != width) {
                    width = newWidth;
                    setWidth(scope, width);
                    scope.$apply();
                }
            }, 250);
        };
    });
