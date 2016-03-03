(function () {
    'use strict';
    angular.module('choriceApp').controller('choriceCtrl', ['$scope', '$http', '$log', '$stateParams', 'choriceAPISvc', 'endpoint',
        function ($scope, $http, $log, $stateParams, choriceAPISvc, endpoint) {

            var tokenUrl = $stateParams.tokenUrl;
            var location;

            $scope.APIMini = 1;
            $scope.APIResolved = 0;
            $scope.submitSuccess = false;
            $scope.ip;
            $scope.geo_city = null;
            $scope.geo_state = null;
            $scope.geo_country = null;

            // function register
            $scope.radioChecked = radioChecked;
            $scope.submitSurvey = submitSurvey;
            $scope.backHome = backHome;

            // --------- start use geolocation API ------------
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
            }

            function geoSuccess(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                codeLatLng(lat, lng);
            }

            function geoError(error) {
                $log.warn(error.message);
            }

            function codeLatLng(lat, lng) {
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(lat, lng);
                geocoder.geocode({ latLng: latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            $scope.geo_city = results[1].address_components[0].long_name;
                            $scope.geo_state = results[1].address_components[1].long_name;
                            $scope.geo_country = results[1].address_components[2].long_name;

                        } else {
                            $log.warn("No results found");
                        }
                    } else {
                        $log.warn("Geocoder failed due to: " + status);
                    }
                });
            }
            // ----------- end geolocation API ----------------

            choriceAPISvc.surveyRetreiveSvc().get({ urltoken: tokenUrl },
                function (data) {
                    $scope.APIResolved++;

                    // store the visited cookie

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
                    //toastr.success('Enjoy!');
                },
                function (data) {
                    $scope.APIResolved++;
                    toastr.error('Error load Survey');

                });


            function radioChecked(question, item) {
                angular.forEach(question.dtoItems, function (i) {
                    i.IsChecked = false;
                });
                item.IsChecked = true;
            }

            function submitSurvey() {
                $scope.APIMini = 1;
                $scope.APIResolved = 0;
                var dtoClientAnswers = [];
                var totalScore = 0;

                angular.forEach($scope.survey.dtoQuestions, function (q) {
                    angular.forEach(q.dtoItems, function (i) {
                        dtoClientAnswers.push({ QuestionId: i.QuestionId, QuestionItemId: i.QuestionItemId, IsChecked: i.IsChecked });
                        if (i.IsChecked && i.Score!=null) {
                            totalScore += i.Score
                        }
                    });
                });

                var surveyClient = {
                    IPAddress: $scope.ip,
                    SurveyId: $scope.survey.SurveyId,
                    TotalScore: totalScore,
                    City: $scope.geo_city,
                    State: $scope.geo_state,
                    Country: $scope.geo_country,
                    dtoClientAnswers: dtoClientAnswers
                };

                choriceAPISvc.surveySaveSvc().save(surveyClient,
                    function (data) {
                        // data is the survey dto
                        $scope.submitSuccess = true;
                        $scope.APIResolved++;
                    },
                    function (data) {
                        toastr.error('Suvry Submit Failed. Please fresh the page.');
                    });

            }

            function backHome() {
                window.location = '/';
            }
        }]);

})();