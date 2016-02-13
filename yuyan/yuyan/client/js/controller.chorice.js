(function () {
    'use strict';
    angular.module('choriceApp').controller('choriceCtrl', ['$scope', '$http', '$stateParams', 'choriceAPISvc', 'endpoint',
        function ($scope, $http, $stateParams, choriceAPISvc, endpoint) {

            var tokenUrl = $stateParams.tokenUrl;

            /*  location:
            {city: "Balwyn"
            country_code: "AU"
            country_name: "Australia"
            ip: "115.64.103.98"
            latitude: -37.8117
            longitude: 145.081
            metro_code: 0
            region_code: "VIC"
            region_name: "Victoria"
            time_zone: "Australia/Melbourne"
            zip_code: "3103"}
            */
            var location;

            $scope.APIMini = 3;
            $scope.APIresolved = 0;

            $scope.loading = true;
            $scope.radioChecked = radioChecked;

            $http.get(endpoint.ipaddress).then(
                function (response) {
                    $scope.APIresolved++;
                    var ip = response.data;
                   
                    $http.get(endpoint.geoip + ip).then(
                        function (response) {
                            $scope.APIresolved++;
                            location = response.data;
                        },
                        function (response) {
                            $scope.APIresolved++;
                            toastr.error("Cannot get location.");
                        });

                }, function (response) {
                    $scope.APIresolved++;
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