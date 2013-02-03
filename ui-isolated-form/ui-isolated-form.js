angular.module("UiIsolatedFormModule", [])
    .directive('uiIsolatedForm', function(){
        return {
            require: 'form',
            link: function(scope, formElement, attrs, formController) {
                var parentFormCtrl = formElement.parent().controller('form');
                var core$setValidity = formController.$setValidity;
                formController.$setValidity = function(validationToken, isValid, control) {
                    core$setValidity(validationToken, isValid, control);
                    if (!isValid && parentFormCtrl) {
                        parentFormCtrl.$setValidity(validationToken, true, formController);
                    }
                }
            }
        };
    });
