(function () {
    'use strict';

    ctrlThrivor.controller('comingSoonCtrl', ['$scope', '$state', 'PreviousState',
        function ($scope, $state, PreviousState) {

            $scope.goBack = goBack;

            function goBack() {
                $state.go(PreviousState.Name);
            }

        }]);

})();