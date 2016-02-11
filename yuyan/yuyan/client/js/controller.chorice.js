(function () {
    'use strict';
    angular.module('choriceApp').controller('choriceCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

            $scope.url = $stateParams.tokenUrl;


        }]);

})();