(function () {
    'use strict';
    angular.module('choriceApp').controller('choriceCtrl', ['$scope', '$stateParams', 'choriceAPISvc',
        function ($scope, $stateParams, choriceAPISvc) {

            var tokenUrl = $stateParams.tokenUrl;

            $scope.loading = true;
            $scope.radioChecked = radioChecked;

            choriceAPISvc.surveyRetreiveSvc().get({ urltoken: tokenUrl },
                function (data) {

                    if (data) {
                        angular.forEach(data.dtoQuestions, function (q) {

                            if (q.dtoItems.length > 0) {
                                angular.forEach(q.dtoItems, function (i) {
                                    i.IsChecked = false;
                                });
                            }
                        });

                        $scope.survey = data;
                    }
                 
                    $scope.loading = false;
                    //toastr.success('Enjoy!');
                },
                function (data) {
                    toastr.error('Error load Survey');
                    $scope.loading = false;
                });


            function radioChecked(question, item) {
                angular.forEach(question.dtoItems, function (i) {
                    i.IsChecked = false;
                });
                item.IsChecked = true;
            }
        }]);

})();