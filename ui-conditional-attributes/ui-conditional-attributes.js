angular.module("UiConditionalAttributesModule", [])
    .directive('uiConditionalAttributes', function () {
        return {
            priority: 1000,
            link: function (scope, element, attrs) {
                var conditions = JSON.parse(attrs.uiConditionalAttributes);
                for (var condition in conditions) {
                    var handlerFactory = function (cond) {
                        return function (newValue) {
                            if (newValue) {
                                var attributes = conditions[cond];
                                for (var attr in attributes) {
                                    attrs.$set(attr, attributes[attr]);
                                }
                            }
                        };
                    };
                    scope.$watch(condition, handlerFactory(condition));
                };
            }
        };
    });
