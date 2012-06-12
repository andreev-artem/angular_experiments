angular.module('ExperimentsModule', [])
    .directive('ngIf', function() {
        return {
            priority: 500,
            restrict: 'A',
            transclude: 'element',
            compile: function(element, attrs, transcludeFn) {
                var watchExpr = attrs.ngIf;

                return function(scope, element) {
                    var selectedElement,
                        selectedScope;

                    scope.$watch(watchExpr, function(value) {
                        if (selectedElement) {
                            selectedScope.$destroy();
                            selectedElement.remove();
                            selectedElement = selectedScope = null;
                        }

                        if (value && transcludeFn) {
                            selectedScope = scope.$new();
                            transcludeFn(selectedScope, function(transcludeElement) {
                                selectedElement = transcludeElement;
                                element.after(transcludeElement);
                            });
                        };
                    });
                };
            }
        };
    });
