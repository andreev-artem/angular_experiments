angular.module("ExperimentsModule", [])
    .directive('uiPagination', function () {
        return {
            restrict: 'EA',
            replace: true,
            template:
                '<div class="pagination pagination-large pagination-centered">' +
                    '<ul>' +
                        '<li ng-class="{disabled: firstPage()}" ng-click="goToFirstPage()">' +
                            '<a><i class="icon-step-backward"></i></a>' +
                        '</li>' +
                        '<li ng-class="{disabled: !hasPrev()}" ng-click="prev()">' +
                            '<a><i class="icon-caret-left"></i></a>' +
                        '</li>' +
                        '<li ng-repeat="page in pages"' +
                            'ng-class="{active: isCurrent(page)}"' +
                            'ng-click="setCurrent(page)"' +
                        '>' +
                            '<a>{{page}}</a>' +
                        '</li>' +
                        '<li ng-class="{disabled: !hasNext()}" ng-click="next()">' +
                            '<a><i class="icon-caret-right"></i></a>' +
                        '</li>' +
                        '<li ng-class="{disabled: lastPage()}" ng-click="goToLastPage()">' +
                            '<a><i class="icon-step-forward"></i></a>' +
                        '</li>' +
                    '</ul>' +
                    '</div>',
            scope: {
                cur: '=',
                total: '=',
                display: '@'
            },
            link: function (scope, element, attrs) {
                var calcPages = function () {
                    var display = +scope.display;
                    var delta = Math.floor(display / 2);
                    scope.start = scope.cur - delta;
                    if (scope.start < 1) {
                        scope.start = 1;
                    }
                    scope.end = scope.start + display - 1;
                    if (scope.end > scope.total) {
                        scope.end = scope.total;
                        scope.start = scope.end - (display - 1);
                        if (scope.start < 1) {
                            scope.start = 1;
                        }
                    }

                    scope.pages = [];
                    for (var i = scope.start; i <= scope.end; ++i) {
                        scope.pages.push(i);
                    }
                };
                scope.$watch('cur', calcPages);
                scope.$watch('total', calcPages);
                scope.$watch('display', calcPages);

                scope.isCurrent = function (index) {
                    return scope.cur == index;
                };

                scope.setCurrent = function (index) {
                    scope.cur = index;
                };

                scope.hasPrev = function () {
                    return scope.cur > 1;
                };
                scope.prev = function () {
                    if (scope.hasPrev()) scope.cur--;
                };

                scope.hasNext = function () {
                    return scope.cur < scope.total;
                };
                scope.next = function () {
                    if (scope.hasNext()) scope.cur++;
                };

                scope.firstPage = function () {
                    return scope.start == 1;
                };
                scope.goToFirstPage = function () {
                    if (!scope.firstPage()) scope.cur = 1;
                };
                scope.lastPage = function () {
                    return scope.end == scope.total;
                };
                scope.goToLastPage = function () {
                    if (!scope.lastPage()) scope.cur = scope.total;
                };
            }
        };
    });