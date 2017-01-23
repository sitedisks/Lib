(function () {
    'use strict';

    ctrlThrivor.controller('signUpCtrl', ['$scope', '$state', '$stateParams', 'genericService', 'signInService', 'userService', 'storageService', 'nativeDeviceService', 'USER_TYPE',
        function ($scope, $state, $stateParams, genericService, signInService, userService, storageService, nativeDeviceService, USER_TYPE) {

            var userType = $stateParams.userType? $stateParams.userType: USER_TYPE.PATIENT; // default patient

            $scope.passcode = '';
            $scope.userDetails = {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                phoneNumber: "",
                userImage: "",
                tac: false
            }

            $scope.showInviteCode = userType.toLowerCase() === USER_TYPE.CREW.toLowerCase() ? true : false;

            $scope.onImageUploaded = onImageUploaded;
            $scope.enterPasscodeDigit = enterPasscodeDigit;
            $scope.removePasscodeDigit = removePasscodeDigit;
            $scope.goCreatePasscode = goCreatePasscode;
            $scope.doesUsernameExist = doesUsernameExist;
            $scope.isValidUniqueCode = isValidUniqueCode;
            $scope.signUpUser = signUpUser;
            

            genericService.registerModal($scope, 'appThrivor/onboarding/termsConditions.html', function () {
                console.log('Terms & Conditions Modal closed');
            });

            function onImageUploaded() {
                var file = event.target.files[0];
                var fileSize = file.size / 1048576;

                if (fileSize <= 4) {
                    var reader = new FileReader();

                    if (window.plugins) {
                        reader.onloadend = function (evt) {
                            EXIF.getData(file, function () {
                                var exifOri = this.exifdata.Orientation;
                                console.log("android/ios read success");
                                resizeBase64Image(evt.target.result, 1.0, 600, 450, exifOri);
                            });
                        };
                    } else {
                        reader.addEventListener("load", function () {
                            resizeBase64Image(reader.result, 1.0, 600, 450);
                        }, false);
                    }

                    if (file) {
                        reader.readAsDataURL(file);
                    }
                }
                else {
                    genericService.showAlert('Photo size limit exceeded', 'Photo size cannot be larger than 4 MB',
                        function () {
                            console.log('Photo size exceeded.');
                        });
                }
            }

            function enterPasscodeDigit(digit) {
                if ($scope.userDetails.password.length < 4)
                    $scope.userDetails.password += digit.toString();
            }

            function removePasscodeDigit() {
                if ($scope.userDetails.password.length > 0)
                    $scope.userDetails.password = $scope.userDetails.password.slice(0, -1);
            }

            function goCreatePasscode() {
                // Additional check user duplication
                var that = this;
                genericService.showLoading('saving...');
                signInService.doesUsernameExist('Thrivor', $scope.userDetails.email)
                    .success(function (response) {
                        genericService.hideLoading();
                        if (response.HasError) {
                            response.Errors.forEach(function (error) {
                                if (error.Name === 'DUPLICATE_USER') {
                                    that.signUp.email.$setValidity('userNameExists', false);
                                }
                            });
                        } else {
                            that.signUp.email.$setValidity('userNameExists', true);
                            $state.go('signUp.step3');
                        }
                    }).error(function (error) {
                        genericService.hideLoading();
                        console.log("Error while calling doesUsernameExist:" + JSON.stringify(response));
                    });
            }

            function doesUsernameExist(userName) {
                var that = this;
                signInService.doesUsernameExist('Thrivor', userName)
                    .success(function (response) {
                        if (response.HasError) {
                            response.Errors.forEach(function (error) {
                                if (error.Name === 'DUPLICATE_USER') {
                                    that.signUp.email.$setValidity('userNameExists', false);
                                }
                            });
                        } else {
                            that.signUp.email.$setValidity('userNameExists', true);
                        }
                    }).error(function (error) {
                        console.log("Error while calling doesUsernameExist:" + JSON.stringify(response));
                    });
            }

            function isValidUniqueCode(uniqueCode) {
                var that = this;
                if (typeof uniqueCode != 'undefined' && uniqueCode.length >= 5) {
                    userService.getPatientDetails(uniqueCode).success(function (response) {
                        if (response === false) {
                            that.signUp.uniqueKey.$setValidity('isValidUniqueCode', false);
                        }
                        else {
                            that.signUp.uniqueKey.$setValidity('isValidUniqueCode', true);
                        }
                    })
                   .error(function (response) {
                       console.log("Error while calling getPatientDetails:" + JSON.stringify(response));
                   });
                }
            }

            function signUpUser() {
                genericService.showLoading('Creating User...');

                var sleevesupUser = {
                    FirstName: $scope.userDetails.firstName,
                    LastName: $scope.userDetails.lastName,
                    Password: window.btoa($scope.userDetails.password),
                    UserName: $scope.userDetails.email,
                    Email: $scope.userDetails.email,
                    MobileNumber: $scope.userDetails.mobileNumber,
                    UserPhoto: $scope.userDetails.userImage,
                    ApplicationName: 'Thrivor',
                    IsPasscode: 'true'
                };

                var thrivorUser = {
                    Name: $scope.userDetails.firstName + ' ' + $scope.userDetails.lastName,
                    UserName: $scope.userDetails.email,
                    Email: $scope.userDetails.email,
                    UserType: userType,
                    Image: $scope.userDetails.userImage,
                    UniqueCode: $scope.userDetails.uniqueKey, // null if Patient
                    Status: ''
                };

                signInService.signUpSleevesUpUser(sleevesupUser)
                    .success(function (response) {
                        if (response.HasError) {

                            genericService.hideLoading();

                            if (response.Errors.length > 0) {
                                var err = response.Errors[0];
                                genericService.showAlert('Error', err.Description, function () {
                                    console.log('Error: ' + err.Description);
                                });
                            }

                        } else {
                            if (response.Body) {
                                var applicationSenderId = response.Body.SenderId; // anywhere else?
                                signInService.signUpThrivorUser(thrivorUser)
                                    .success(function (response) {
                                        // TODO: clean up the localstorage
                                        storageService.set('firstName', sleevesupUser.FirstName);
                                        storageService.set('userName', thrivorUser.UserName);
                                        storageService.set('userPhoto', thrivorUser.Image);
                                        userService.storeCurrentUser(JSON.stringify(response));
                                        setUserCapabilities(response.UserType);

                                        var inviteKey = response.UniqueCode;

                                        registerForPushNotificationsOnDevice(sleevesupUser.UserName, applicationSenderId);


                                        var credentials = {
                                            password: $scope.userDetails.password,
                                            email: $scope.userDetails.email
                                        };

                                        signInService.signIn(credentials).then(
                                            function (response) {
                                                genericService.hideLoading();
                                                var jsonData = JSON.parse(response.data);
                                                storageService.set("tokenValue", jsonData.AuthToken);

                                                $state.go('welcome', { inviteKey: inviteKey }); // ? userNameAlreadyExists??
                                            },
                                            function (error) {
                                                genericService.hideLoading();
                                                if (error.status == 401) {
                                                    genericService.showAlert('Unauthorized', 'Your username or password is incorrect', function () {
                                                    });
                                                }
                                                else {
                                                    genericService.showAlert('Sorry, we appear to be having errors', 'Please restart your application and try again. If you\'re still having problems, please contact us.', function () {
                                                    });
                                                }

                                            });

                                    })
                                    .error(function (error) {
                                        genericService.hideLoading();
                                        var message = !isNullOrEmpty(error.Message) ? error.Message : 'Sorry, we appear to be having errors';
                                        var exception = !isNullOrEmpty(error.ExceptionMessage) ? error.ExceptionMessage : 'Please restart your application and try again. If you\'re still having problems, please contact us.';
                                        genericService.showAlert(message, exception, function () { });
                                    });

                            }
                        }

                    })
                    .error(function (error) {
                        genericService.hideLoading();
                        genericService.showAlert('Sorry, we appear to be having errors',
                            'Please restart your application and try again. If you\'re still having problems, please contact us.',
                            function () { });
                    });
            }

            function isNullOrEmpty(s) {
                return (s == null || s === "");
            }

            function resizeBase64Image(base64ImageString, quality, maxWidth, maxHeight, exifOri) {
                var img = new Image();
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                var canvasCopy = document.createElement("canvas");
                var copyContext = canvasCopy.getContext("2d");

                img.onload = function () {
                    var wratio = 1;
                    var hratio = 1;

                    if (img.width > maxWidth)
                        wratio = maxWidth / img.width;

                    if (img.height > maxHeight)
                        hratio = maxHeight / img.height;

                    var ratio = Math.min(wratio, hratio);

                    canvasCopy.width = img.width;
                    canvasCopy.height = img.height;

                    if (exifOri) {
                        switch (exifOri) {
                            case 1:
                                copyContext.drawImage(img, 0, 0);
                                break;
                            case 8:
                                drawRotated(-90);
                                break;
                            case 3:
                                drawRotated(180);
                                break;
                            case 6:
                                drawRotated(90);
                                break;
                        }
                    }
                    else {
                        copyContext.drawImage(img, 0, 0);
                    }

                    canvas.width = img.width * ratio;
                    canvas.height = img.height * ratio;
                    ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);

                    var newImageBase64 = canvas.toDataURL("image/jpeg", quality);
                    $scope.userDetails.userImage = newImageBase64;
                    $scope.$apply();
                };

                function drawRotated(degrees) {
                    copyContext.clearRect(0, 0, canvasCopy.width, canvasCopy.height);
                    copyContext.save();
                    copyContext.translate(canvasCopy.width / 2, canvasCopy.height / 2);
                    copyContext.rotate(degrees * Math.PI / 180);
                    copyContext.drawImage(img, -img.width / 2, -img.height / 2);
                }

                img.src = base64ImageString;
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

        }]);
})();