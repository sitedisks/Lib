appThrivor.directive('phoneNumber', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) {
                return false;
            }

            function isValidPhoneNumber(value) {
                if (!value) {
                    return false;
                }
                var regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
                return regex.exec(value) != null;
            }

            scope.$watch(ctrl, function () {
                ctrl.$validate();
            });

            ctrl.$validators.phoneNumber = function (modelValue, viewValue) {
                return isValidPhoneNumber(viewValue);
            };
        }
    };
});