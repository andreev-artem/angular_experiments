angular.module("ExperimentsModule", [])
    .directive('uiRate', function () {
        return {
            restrict: 'EA',
            replace: true,
            template:
                '<ul class="rate-control">' +
                    '<li ng-repeat="item in items">' +
                        '<i ng-class="getClass($index)" ng-click="setValue($index, $event)"></i>' +
                    '</li>' +
                '</ul>',
            require: 'ngModel',
            scope: true,
            link: function (scope, element, attrs, ngModelCtrl) {
                scope.value = undefined;
                scope.items = new Array(+attrs.max);

                ngModelCtrl.$render = function () {
                    scope.last_value = scope.value = ngModelCtrl.$viewValue;
                };

                scope.getClass = function(index) {
                    if (index >= scope.value) {
                        return 'icon-star-empty';
                    }
                    if (index == Math.floor(scope.value)) {
                        return 'icon-star-empty icon-star-half';
                    }
                    if (index < scope.value) {
                        return 'icon-star';
                    }
                };

                scope.setValue = function(index, e) {
                    var star = angular.element(e.target);
                    if (e.pageX < star.offset().left + star.outerWidth() / 2) {
                        scope.last_value = index + 0.5;
                    } else {
                        scope.last_value = index + 1;
                    }
                    ngModelCtrl.$setViewValue(scope.last_value);
                };

                setTimeout(function(){
                    scope.last_value = scope.value;
                    var stars = element.find('i');
                    angular.forEach(stars, function(elem, index){
                        var star = angular.element(elem);
                        star.bind('mousemove', function(e){
                            if (e.pageX < star.offset().left + star.outerWidth() / 2) {
                                scope.value = index + 0.5;
                            } else {
                                scope.value = index + 1;
                            }
                            if (!scope.$$phase) {
                                scope.$digest();
                            }
                        });
                    });
                    element.bind('mouseout', function(){
                        scope.value = scope.last_value;
                        if (!scope.$$phase) {
                            scope.$digest();
                        }
                    });
                }, 0);
            }
        };
    });
