(function () {
    'use strict';

    angular.module('yuyanApp')
		.controller('previewModalCtrl', ['$scope', '$uibModalInstance', 'surveyQuestions',
			function ($scope, $uibModalInstance, surveyQuestions) {

			    $scope.survey = {
			        Title: "Preview Survey",
			        ShortDesc: "This is for preview only",
			        LongDesc: "Please register to access full functions",
			        UserId: "",
			        dtoQuestions: surveyQuestions
			    };

			    $scope.ok = function () {
			        $uibModalInstance.close();
			    };

			    $scope.cancel = function () {
			        $uibModalInstance.dismiss('cancel');
			    };
			}]
		);

})();