(function () {
    'use strict';

    angular.module('hostedApp').controller('calendarController', ['$scope',
        function ($scope) {
            $scope.title = 'Native SMS';

            $scope.sendSms = sendSms;

            function sendSms() {
                //CONFIGURATION
                var options = {
                    replaceLineBreaks: false, // true to replace \n by a new line, false by default
                    android: {
                        //intent: 'INTENT'  // send SMS with the native android SMS messaging
                        intent: '' // send SMS without open any other app
                    }
                };

                var success = function () {
                    $scope.numberTxt = '';
                    $scope.messageTxt = '';
                    alert('Message sent successfully');

                };
                var error = function (e) {
                    alert('Message Failed:' + e);
                };
                sms.send($scope.numberTxt, $scope.messageTxt, options, success, error);
            }


        }]);
})();