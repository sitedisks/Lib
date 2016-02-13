(function () {
    'use strict';
    angular.module('choriceApp').controller('choriceCtrl', ['$scope', '$http', '$stateParams', 'choriceAPISvc', 'endpoint',
        function ($scope, $http, $stateParams, choriceAPISvc, endpoint) {

            var tokenUrl = $stateParams.tokenUrl;

            $scope.loading = true;
            $scope.radioChecked = radioChecked;

            $http.get(endpoint.ipaddress).then(
                function (response) {
                    var ip = response.data;


                }, function (response) {
                    toastr.error("Cannot get your Ip Address.");
                });


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