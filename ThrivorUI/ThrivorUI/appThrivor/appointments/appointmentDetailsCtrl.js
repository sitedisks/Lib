appThrivor.controller("appointmentDetailsCtrl", [
    '$rootScope', '$scope', '$location', 'storageService', '$state', '$stateParams', 'appointmentService', 'userService', '$filter', 'nativeDeviceService', 'geoLocationService', 'USER_TYPE', 'genericService', 'healthFileService',
function appointmentController($rootScope, $scope, $location, storageService, $state, $stateParams, appointmentService, userService, $filter, nativeDeviceService, geoLocationService, USER_TYPE, genericService, healthFileService) {

            // variables delaration
            $scope.fileName;
            $scope.urlPath;
            $scope.audioFile;
            $scope.today = new Date();

            $scope.noteOperationCaption = "Add Note";
            //$scope.modalService = modalService;
            $scope.isMock = false;//only for testing
            //default view at start
            var onCurrentLocationFoundEventSuccess;
            var onCurrentLocationFoundEventError;

            function init() {
                $scope.currentUser = userService.getCurrentUser();
                $scope.appointmentList = [];
                $scope.isPlay = false;

                $scope.currentAppointment = $rootScope.appointmentDetails;
                if ($scope.currentAppointment.OriginLocation) {
                    if ($scope.currentAppointment.OriginLocation.StreetNo == 0 || $scope.currentAppointment.OriginLocation.StreetNo == null)
                        $scope.currentAppointment.OriginLocation.StreetNo = '';
                    if ($scope.currentAppointment.OriginLocation.StreetName == 'long_name')
                        $scope.currentAppointment.OriginLocation.StreetName = '';
                    if ($scope.currentAppointment.OriginLocation.PostCode == 0 || $scope.currentAppointment.OriginLocation.PostCode == null)
                        $scope.currentAppointment.OriginLocation.PostCode = '';
                }

                $scope.locationDetails = $scope.currentAppointment.OriginLocation == null ? '' : $scope.currentAppointment.OriginLocation.StreetNo + ' ' + $scope.currentAppointment.OriginLocation.Suburb + ' ' + $scope.currentAppointment.OriginLocation.StreetName + ' ' + $scope.currentAppointment.OriginLocation.State + ' ' + $scope.currentAppointment.OriginLocation.PostCode + ' ' + $scope.currentAppointment.OriginLocation.Country;
            }

            init();

            $scope.tab = 1;

            $scope.setTab = function (newTab) {
                if (newTab == 2) {
                    getNotesForAppointment($scope.currentAppointment.Id);
                }
                if (newTab == 3){
                    promptAudioFilename();
                }
                $scope.tab = newTab;
            };

            $scope.isSet = function (tabNum) {
                return $scope.tab === tabNum;
            };

             function promptAudioFilename() {

                 genericService.registerPopup($scope, '<input type="text" ng-model="data.value">', 'Enter File Name', function (res) {
                     $scope.name = 'Thrivor_' + Date.now().toString();
                     if (res.value) {
                         $scope.name = res.value;
                     }
                     else
                         promptAudioFilename();

                     resolveAudioPath($scope.name);
                });
            }

            function resolveAudioPath(fileName) {
                if (window.cordova) {
                    if (fileName) {

                        if (device.platform === "iOS") {
                            $scope.fileName = fileName + ".wav";
                        }
                        else if (device.platform === "Android") {
                            $scope.fileName = fileName + ".wav";
                        }
                        else if (device.platform === "windows") {
                            $scope.fileName = fileName + ".mp3";
                        }
                    }
                }
            }

            function resolveFilePath(fileName) {
                if (device.platform === "iOS") {
                    $scope.urlPath = cordova.file.tempDirectory + fileName;
                }
                else if (device.platform === "Android") {
                    $scope.urlPath = cordova.file.externalRootDirectory + fileName;
                }
                else if (device.platform === "windows") {
                    $scope.urlPath = window.resolveLocalFileSystemURI + fileName;
                }
            }

            $scope.startRecord = function () {
                $scope.audioFile = new Media($scope.fileName,
                      function () {
                          resolveFilePath($scope.fileName);
                          if ($scope.urlPath)
                              uploadAudio($scope.urlPath);
                      },
                      function (e) {
                          //modalService.showAppError();
                      });

                $scope.audioFile.startRecord();
                $scope.isPlay = !$scope.isPlay;
            }

            $scope.endRecord = function () {
                $scope.audioFile.stopRecord();
                $scope.isPlay = !$scope.isPlay;
            }

            function uploadAudio(UrlPath) {
                resolveLocalFileSystemURL(UrlPath, function (entry) {
                    entry.file(function (newFile) {
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            var base64Audio = event.target.result; //Here is your base64 string
                            base64Audio = base64Audio.replace("data:audio/x-wav;base64,", "");
                            base64Audio = base64Audio.replace(/["']/g, "");

                            var soundFile = {
                                Username: $scope.currentUser.Username,
                                //Username: "kate@gmail.com",
                                DocumentName: $scope.fileName,
                                DocumentType: 'AUDIO',
                                IsOCRRequired: 'false',
                                ApplicationName: 'Thrivor',
                                Image: base64Audio
                            };
                            
                            healthFileService.uploadAudioFile(soundFile)
                                .success(function (response) {
                                    genericService.showAlert('Success', 'Recording has been saved successfully', function () {
                                    });
                                })
                                .error(function (response) {
                                    console.log(response);
                                    genericService.showAlert('Sorry, we appear to be having errors', 'Unable to save recording', function () {
                                });
                            });
                        }
                        reader.readAsDataURL(newFile);
                    });
                });
            }

            //$scope.resetNewAppointment = function () {
            //    $scope.currentAppointment = {
            //        StartDateTime: new Date(),
            //        EndDateTime: new Date()
            //    };

            //    $scope.currentAppointment.StartDateTime.setSeconds(0, 0);
            //    $scope.currentAppointment.EndDateTime.setSeconds(0, 0);

            //    //get current location
            //    geoLocationService.getCurrentLocation($scope, onCurrentLocationFoundEventSuccess, onCurrentLocationFoundEventError);
            //}

            //auto-complete START ****
            $scope.result = ''
            //    $scope.details = ''
            $scope.form = {
                type: 'geocode',
                bounds: { SWLat: 49, SWLng: -97, NELat: 50, NELng: -96 },
                country: 'au',
                typesEnabled: false,
                boundsEnabled: false,
                componentEnabled: false,
                watchEnter: true
            }

            function getNotesForAppointment(appointmentId) {

                return appointmentService.getNotesForAppointment(appointmentId)
                    .success(function (response) {
                        if (response.length > 0) {
                            $scope.currentAppointment.Notes = response[0].Note;
                            $scope.currentAppointment.NoteId = response[0].Id;
                        }
                    })
                    .error(function (response) {
                        genericService.showAlert('Sorry, we appear to be having errors', 'Unable to retrieve appointment notes', function () {
                        });
                    });
            }

            $scope.showCreateAppointmentErrorMessage = false;

            //$scope.deleteAppointment = function (appointment) {

            //    var appointmentToDelete = null;
            //    $scope.appointmentList.forEach(function (appt) {
            //        if (appointment !== null && appt.Id === appointment.Id) {
            //            appointmentToDelete = appt;
            //            console.log('appointment being deleted:', JSON.stringify(appt));
            //        }
            //    });

            //    if (appointmentToDelete === null) {
            //        return;
            //    }

            //    if ($scope.isMock) {
            //        $scope.currentAppointment = {}; //reset current appt.
            //        $scope.appointmentList.pop(appointmentToDelete);
            //        return;
            //    }

            //    appointmentService.deleteAppointment(appointmentToDelete.Id)
            //        .success(function (response) {
            //            console.log("appointment deleted successfully - Appointment:" + JSON.stringify($scope.currentAppointment));

            //            var appointmentInNativeDevice = {
            //                Title: $scope.currentAppointment.Title,
            //                Location: null,
            //                StartDate: new Date($scope.currentAppointment.StartDateTime),
            //                EndDate: new Date($scope.currentAppointment.EndDateTime),
            //                Notes: $scope.currentAppointment.Notes
            //            }

            //            if (appointmentToDelete !== null) {
            //                $scope.currentAppointment = {}; //reset current appt.
            //                $scope.appointmentList.pop(appointmentToDelete);
            //            }
            //            $scope.selectOperation('showAppointmentsQuickView');

            //            nativeDeviceService.deleteCalendarEvent("Thrivor", appointmentInNativeDevice);
            //        })
            //        .error(function (response) {
            //            console.log("Error while editing appointment - Response:" + JSON.stringify(response)); //todo - common error handling missing in UI specs
            //            genericService.showAlert('Sorry, we appear to be having errors', 'Error while deleting appointment', function () {
            //            });
            //        });
            //}

            $scope.addNotesToAppointment = function (appointment) {

                var toCreate = false;
                if (!$scope.currentAppointment.NoteId) {
                    toCreate = true;
                }

                var noteForAppointment = {
                    AppointmentDetailsId: appointment.Id,
                    UserId: $scope.currentUser.Id,
                    Note: $scope.currentAppointment.Notes
                }

                if (toCreate) {

                    appointmentService.addNotesForAppointment(noteForAppointment)
                        .success(function (response) {
                            if (response) {
                                console.log("note added successfully");
                                genericService.showAlert('Success', 'Note added successfully', function () {
                                });
                            }
                        })
                        .error(function (response) {
                            console.log('unable to retrieve notes for appointment. Error response is ' + JSON.stringify(response));
                            genericService.showAlert('Sorry, we appear to be having errors', 'Unable to add note for appointment', function () {
                            });
                        })
                        .finally(function () {

                        });
                    return;
                }

                appointmentService.updateNotesForAppointment($scope.currentAppointment.NoteId, noteForAppointment)
                    .success(function (response) {
                        if (response) {
                            console.log("note added successfully");
                            genericService.showAlert('Success', 'Note added successfully', function () {
                            });
                        }
                    })
                    .error(function (response) {
                        console.log('unable to retrieve notes for appointment. Error response is ' + JSON.stringify(response));
                        genericService.showAlert('Sorry, we appear to be having errors', 'Unable to update note for appointment', function () {
                        });
                    })
                    .finally(function () {

                    });
            }

            $scope.showRecordingSave = function () {
                alert("show modal");
            }
        }]);