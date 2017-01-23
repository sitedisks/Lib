(function () {
    'use strict';

    ctrlThrivor.controller('testCtrl', ['$scope', '$state', '$ionicPopup', '$timeout', 'genericService',
        function ($scope, $state, $ionicPopup, $timeout, genericService) {

            genericService.registerPopover($scope, 'popover-test', function () {
                console.log('popover closed');
            });

            // register modal at current scope
            // expose openModal(), closeModal() function
            genericService.registerModal($scope, 'modal-retrievePasscode', function () {
                console.log('modal closed');
            });

            // Triggered on a button click, or some other target
            $scope.showPopup = function () {
                $scope.data = {};

                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                    template: '<input type="password" ng-model="data.wifi">',
                    title: 'Enter Wi-Fi Password',
                    subTitle: 'Please use normal things',
                    scope: $scope,
                    buttons: [
                      { text: 'Cancel' },
                      {
                          text: '<b>Save</b>',
                          type: 'button-assertive',
                          onTap: function (e) {
                              if (!$scope.data.wifi) {
                                  //don't allow the user to close unless he enters wifi password
                                  e.preventDefault();
                              } else {
                                  return $scope.data.wifi;
                              }
                          }
                      }
                    ]
                });

                myPopup.then(function (res) {
                    console.log('Tapped!', res);
                });

                // Increasing the timeout to be able to design
                $timeout(function () {
                    myPopup.close(); //close the popup after 3 seconds for some reason
                }, 7000);
            };

            $scope.showConfirm = function () {
                genericService.showConfirm('Confirm', 'IONIC generic Confirm?', function (res) {
                    if (res) {
                        console.log('Confirmed!');
                    } else {
                        console.log('Unconfirmed!');
                    }
                });

           
            };

            $scope.showAlert = function () {
                genericService.showAlert('Alert', 'IONIC generic Alert', function () {
                    console.log('Alert done');
                });

            };

        }]);
})();