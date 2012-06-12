angular.module("ExperimentsModule", [])
    .directive("uiMcomboChoices", function($document){
        // simultaneously should not be two open items
        var openElement = null, close;
        return {
            restrict: 'A',
            replace: true,
            scope: true,
            template:
                '<div class="mcombo-container mcombo-container-multi" style="width: 300px;">' +
                '    <ul class="mcombo-selected-choices">' +
                '        <li class="selected-choice" ng-repeat="choice in _selectedChoices">'+
                '            <span>{{choice.text}}</span>' +
                '            <a class="selected-choice-delete" ng-click="removeFromSelected(choice)"></a>' +
                '        </li>' +
                '        <li class="search-field">' +
                '            <input type="text" placeholder="Choose..." autocomplete="off" ng-model="_search">' +
                '        </li>' +
                '    </ul>' +
                '    <div class="mcombo-drop">' +
                '        <ul class="choices">' +
                '            <li class="item" ng-repeat="choice in filteredChoices()" ng-click="moveToSelected(choice, $event)">' +
                '                {{choice.text}}' +
                '            </li>' +
                '            <li class="no-results" ng-show="_search && filteredChoices().length == 0">No results match "{{_search}}"</li>' +
                '        </ul>' +
                '    </div>' +
                '</div>',
            inject: {
                uiMcomboChoices: 'accessor',
                uiMcomboSelected: 'accessor'
            },
            controller: ['$scope', 'uiMcomboChoices', 'uiMcomboSelected', '$filter',
                function($scope, uiMcomboChoices, uiMcomboSelected, $filter) {
                    $scope._choices = uiMcomboChoices();
                    $scope._selectedChoices = uiMcomboSelected();
                    $scope._searchElem = null;

                    $scope.filteredChoices = function() {
                        var filtered = $filter('filter')($scope._choices, $scope._search);
                        return $filter('orderBy')(filtered, 'text');
                    };

                    $scope.moveToSelected = function(choice, $event) {
                        $scope._selectedChoices.push(choice);
                        $scope._choices.splice($scope._choices.indexOf(choice), 1);
                        $scope._search='';

                        $scope._searchElem.focus();

                        // do not 'close' on choice click
                        $event.preventDefault();
                        $event.stopPropagation();
                    };

                    $scope.removeFromSelected = function(choice) {
                        $scope._choices.push(choice);
                        $scope._selectedChoices.splice($scope._selectedChoices.indexOf(choice), 1);

                        $scope._searchElem.focus();
                    };
                }
            ],
            link: function(scope, element, attrs) {
                var selUl = element.children().eq(0);
                var selItems = selUl.children();
                scope._searchElem = selItems.eq(selItems.length-1).children().eq(0)[0];
                selUl.bind('click', function(event) {
                    // otherwise 'close' will be called immediately
                    event.preventDefault();
                    event.stopPropagation();

                    if (openElement) {
                        close();
                    }

                    if (!element.hasClass('mcombo-container-active')) {
                        element.addClass('mcombo-container-active');
                        openElement = element;

                        close = function (event) {
                            event && event.preventDefault();
                            event && event.stopPropagation();
                            $document.unbind('click', close);
                            element.removeClass('mcombo-container-active');
                            close = null;
                            openElement = null;
                        }
                        $document.bind('click', close);
                    }

                    scope._searchElem.focus();
                });
            }
        };
    });