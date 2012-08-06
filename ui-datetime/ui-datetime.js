angular.module("ExperimentsModule", [])
    .directive("uiDatetime", function(){
        return {
            restrict: 'EA',
            replace: true,
            template: '<div class="ui-datetime">' +
                        '<input type="text" ng-model="_date">' +
                        '<input type="number" ng-model="_hour" min="0" max="23">' +
                        '<input type="number" ng-model="_minute" min="0" max="59">' +
                      '</div>',
            scope: true
        };
    });
