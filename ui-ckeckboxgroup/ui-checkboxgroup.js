angular.module("ExperimentsModule", [])
    .directive("uiCheckboxgroup", function($document){
        return {
            restrict: 'A',
            replace: true,
            template:
                '<ul class="checkbox-group"">' +
                '    <li ng-repeat="item in _data">'+
                '        <input type="checkbox" ng-model="v"' +
                '                ng-change="toggleSelectedItem(item, v)"' +
                '                ng-init="v = isItemSelected(item)">' +
                '        <span>{{item.text}}</span>' +
                '    </li>' +
                '</ul>',
            scope: {
                _data: '=uiCheckboxgroup',
                _selectedItems: '=uiSelectedValues'
            },
            controller: ['$scope', function($scope) {
                    $scope.toggleSelectedItem = function(itemValue, checked) {
                        var idx = $scope._selectedItems.indexOf(itemValue);

                        //already selected
                        if (checked && idx > -1) return;

                        if (checked) $scope._selectedItems.push(itemValue);
                        else $scope._selectedItems.splice(idx, 1);
                    };

                    $scope.isItemSelected = function(itemValue) {
                        return $scope._selectedItems.indexOf(itemValue) > -1;
                    };
                }
            ]
        };
    });