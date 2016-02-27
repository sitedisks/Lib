(function () {
    'use strict';

    angular.module('yuyanApp')
		.controller('previewModalCtrl', ['$scope', '$uibModalInstance', 'survey',
			function ($scope, $uibModalInstance, survey) {

			    $scope.survey = survey;

			    $scope.shareLink = location.host + '/client/#/' + survey.URLToken;
			    $scope.sharePageLink = location.host + '/client/#/page/' + survey.URLToken;

			    $scope.ok = function () {
			        $uibModalInstance.close();
			    };

			    $scope.cancel = function () {
			        $uibModalInstance.dismiss('cancel');
			    };
			}]
		);

})();