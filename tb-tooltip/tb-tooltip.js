angular.module("ExperimentsModule", [])
    .directive("tbTooltip", function(){
        return function(scope, element, iAttrs) {
            iAttrs.$observe('title', function(value) {
                // for updating tooltip when title changed
                element.removeData('tooltip');

                element.tooltip();
            });
        }
    });
