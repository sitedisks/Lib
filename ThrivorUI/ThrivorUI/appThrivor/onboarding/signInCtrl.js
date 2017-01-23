(function () {
    'use strict';

    ctrlThrivor.controller('signInCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'genericService', 'storageService', 'userService', 'signInService', 'nativeDeviceService', 'USER_TYPE',
        function ($scope, $rootScope, $state, $stateParams, genericService, storageService, userService, signInService, nativeDeviceService, USER_TYPE) {

            var currentUser = $stateParams.userName != null ? $stateParams.userName : storageService.get('userName');

            // define variables
            $scope.signinFull = {
                email: currentUser,
                password: ''
            }
            $scope.isDeviceKnowUser = storageService.get('userName') ? true : false;

            // define functions
            $scope.enterPasscodeDigit = enterPasscodeDigit;
            $scope.removePasscodeDigit = removePasscodeDigit;
            $scope.signInUser = signInUser;
            $scope.goSignIn = goSignIn;
            $scope.goRetrievePasscode = goRetrievePasscode;

            // implement functions
            function enterPasscodeDigit(digit) {
                if ($scope.signinFull.password.length < 4)
                    $scope.signinFull.password += digit.toString();
            }

            function removePasscodeDigit() {
                if ($scope.signinFull.password.length > 0)
                    $scope.signinFull.password = $scope.signinFull.password.slice(0, -1);
            }

            function signInUser() {

                genericService.showLoading('LogIn...');

                signInService.signIn($scope.signinFull).then(
                    function (response) {

                        // AuthToken from Common API
                        var jsonData = JSON.parse(response.data);

                        storageService.set("tokenValue", jsonData.AuthToken); // set the localStorage: tokenValue

                        userService.getUserDetails($scope.signinFull.email).then(
                            // Login from SleevesUp API
                            function (response) {
                                userService.storeCurrentUser(JSON.stringify(response.data)); // set the localStorage: userDetails
                                storageService.set('userName', response.data.Username); // set the localStorage: userName
                                setUserCapabilities(response.data.UserType);
                                genericService.hideLoading();
                                gotoDashboard(response.data.UserType);
                            }, function (error) {
                                genericService.hideLoading();
                                genericService.showAlert('Unauthorized', 'Your username or password is incorrect', function () {
                                    $scope.signinFull.password = '';
                                });
                                console.log("userService.getUserDetails errror response:" + JSON.stringify(response));
                            });

                        registerForPushNotificationsOnDevice($scope.signinFull.email, jsonData.SenderId);

                    }, function (error) {

                        genericService.hideLoading();

                        if (error.status == 401) {
                            genericService.showAlert('Unauthorized', 'Your username or password is incorrect', function () {
                                $scope.signinFull.password = '';
                            });
                        }
                        else {
                            genericService.showAlert('Sorry, we appear to be having errors', 'Please restart your application and try again. If you\'re still having problems, please contact us.', function () {
                                $scope.signinFull.password = '';
                            });
                        }
                    });
            }

            function goSignIn() {
                $state.go('signIn', { userName: $scope.signinFull.email });
            }

            function goRetrievePasscode() {
                $state.go('retrievePasscode', { userName: $scope.signinFull.email });

            }

            function gotoDashboard(userType) {
                if (userType.toLowerCase() === USER_TYPE.PATIENT.toLowerCase()) { //patient
                    $state.go('dashboard.home');
                } else if (userType.toLowerCase() === USER_TYPE.CREW.toLowerCase()) { //crew member
                    $state.go('dashboard.home');
                    //$state.go('dashboard.homeSupport');
                }
            }

            function setUserCapabilities(userType) {

                var userCapabilities = {};

                if (userType.toLowerCase() === USER_TYPE.PATIENT.toLowerCase()) { //patient
                    userCapabilities = {
                        canCreateAppointments: true,
                        canCreateJobs: true,
                        canEditJobs: true
                    }
                } else if (userType.toLowerCase() === USER_TYPE.CREW.toLowerCase()) { //crew member
                    userCapabilities = {
                        canCreateAppointments: false,
                        canCreateJobs: false,
                        canEditJobs: false
                    }
                }

                storageService.set('userCapabilities', JSON.stringify(userCapabilities));
                storageService.set('userType', userType);
            }

            function registerForPushNotificationsOnDevice(sleevesupUserName, senderId) {

                if (window.plugins) {
                    nativeDeviceService.registerForPushNotification(senderId);
                }

                document.addEventListener("deviceRegisteredEvent", function (event) {
                    console.log("deviceRegisteredEvent event received with event - " + JSON.stringify(event));

                    var deviceId = mobileDeviceId;
                    var platform = devicePlatform;

                    var registerDevicePayload =
                    {
                        "UserName": sleevesupUserName,
                        "ApplicationName": 'Thrivor',
                        "Platform": platform,
                        "DeviceRegistrationId": deviceId
                    };

                    signInService.registerDevice(registerDevicePayload).then(
                        function (response) {
                            console.log("registerDevice success response");
                        },
                        function (error) {
                            console.log("Error while registering user device");
                        });
                });
            }

            function GetIPAddress() {
                // not in use atm
                $.getJSON("https://api.ipify.org?format=jsonp&callback=?", function (json) {
                    return json.ip;
                });
            }

        }]);
})();

//if (currentUser) {
//    userService.getUserDetails(currentUser).then(
//        function (response) {
//            $scope.userPhoto.url = response.data.UserPhoto;
//        }, function (error) {
//            console.log('userService.getUserDetails Failed');
//        });
//}