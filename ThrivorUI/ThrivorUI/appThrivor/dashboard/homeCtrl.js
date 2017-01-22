(function () {
    'use strict';

    ctrlThrivor.controller('homeCtrl', ['$scope', '$state', '$stateParams', 'moment', 'storageService', 'userService', 'genericService', 'appointmentService',
        function ($scope, $state, $stateParams, moment, storageService, userService, genericService, appointmentService) {

            var currentUser = userService.getCurrentUser(); // userDetails

            if (storageService.get('firstName'))
                $scope.firstName = storageService.get('firstName');

            if (currentUser)
                $scope.fullName = currentUser.Name;

            $scope.data = {
                time: new Date()
            };
            $scope.appointmentList = [];

            $scope.doRefresh = doRefresh;

            function doRefresh() {
                initalAppointments();
            }

            function initalAppointments() {
                genericService.showLoading('initial...');
                // only Patient has the appointment list
                appointmentService.getAppointmentList(currentUser.Id)
                  .success(function (response) {
                      console.log('appointments :');
                      console.log(response);

                      angular.forEach(response, function (appt) {
                          var isBeforeToday = moment(appt.StartDateTime).isBefore(moment(), 'day');

                          if (!isBeforeToday) {
                              $scope.appointmentList.push(appt);
                          }

                      });

                      genericService.hideLoading();
                      $scope.$broadcast('scroll.refreshComplete');
                  }).error(function (error) {
                      console.log('Failed to retrieve appointments');
                      genericService.hideLoading();
                      $scope.$broadcast('scroll.refreshComplete');
                  });
            }

            initalAppointments();
        }]);
})();