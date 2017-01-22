appThrivor.controller("appointmentCtrl", [
    '$rootScope', '$scope', '$location', 'storageService', '$state', '$stateParams', 'appointmentService', 'userService', '$filter', 'nativeDeviceService', 'geoLocationService', 'USER_TYPE', 'genericService',
        function appointmentController($rootScope, $scope, $location, storageService, $state, $stateParams, appointmentService, userService, $filter, nativeDeviceService, geoLocationService, USER_TYPE, genericService) {

            // variables delaration
            $scope.fileName;
            $scope.urlPath;
            $scope.audioFile;
            $scope.today = new Date();
            $scope.initialize = init;
            $scope.onAddressSelection = onAddressSelection;
            $scope.addAppointment = newAppointment;
            $scope.createNewAppointment = newAppt;
            $scope.noteOperationCaption = "Add Note";
            //$scope.modalService = modalService;
            $scope.isMock = false;//only for testing
            //default view at start
            var onCurrentLocationFoundEventSuccess;
            var onCurrentLocationFoundEventError;
            $scope.data = {}; // https://github.com/Hobbule/ion-google-autocomplete

            function init() {
                $scope.currentUser = userService.getCurrentUser();
                $scope.appointmentList = [];
                $scope.isPlay = false;

                $scope.currentAppointment = {};
                resetNewAppointment();

                $scope.isLocationServicesOn = false;
                //if ($scope.isLocationServicesOn) {
                //    $scope.currentAppointment.OriginLocation = {};
                //}
                $scope.setDefaultAlertItems();
                if ($scope.data.location)
                    $scope.data.location.formatted_address = '';

                $scope.minDate = new Date();
                $scope.getAppointmentList($scope.currentUser.Id);
            }

            genericService.registerModal($scope, 'appThrivor/appointments/newAppointment.html', function () {
            });

            function newAppt() {
                $scope.openModal();
            }

            $scope.close =  function () {
                resetNewAppointment();
                $scope.closeModal();
            }

            $scope.tab = 1;

            $scope.setTab = function (newTab) {
                allAppointments();
                $scope.tab = newTab;
            };

            $scope.isSet = function (tabNum) {
                return $scope.tab === tabNum;
            };

            //onCurrentLocationFoundEventSuccess = function (event, filteredAddress) {
            //    console.log("onCurrentLocationFoundEventSuccess :" + JSON.stringify(filteredAddress));

            //    var location = {};
            //    location.StreetNo = filteredAddress.street_number;
            //    location.Suburb = filteredAddress.locality;
            //    location.StreetName = filteredAddress.route;
            //    location.PostCode = filteredAddress.postal_code;
            //    location.State = filteredAddress.administrative_area_level_1;
            //    location.Country = filteredAddress.country;

            //    $scope.currentAppointment.OriginLocation = location;

            //    var formattedLocation = $scope.currentAppointment.OriginLocation.StreetNo + " " + $scope.currentAppointment.OriginLocation.StreetName + " " + $scope.currentAppointment.OriginLocation.Suburb + " " + $scope.currentAppointment.OriginLocation.PostCode + " " + $scope.currentAppointment.OriginLocation.State + " " + $scope.currentAppointment.OriginLocation.Country;
            //    //$scope.autocomplete1 = formattedLocation;
            //    $scope.$apply();
            //};
            //onCurrentLocationFoundEventError = function (event, error) {
            //    console.log("onCurrentLocationFoundEventError :" + error);
            //    $scope.currentAppointment.OriginLocation = null;
            //};

            //$scope.goBack = function () {
            //    $rootScope.goBack();
            //}

            $scope.setDefaultAlertItems = function () {
                $scope.currentAppointment.selectedAlertItems = [];
                $scope.alertList.forEach(function (alertItem) {
                    if (alertItem.id === 4 || alertItem.id === 6) { //1 day before or 1 day before
                        $scope.currentAppointment.selectedAlertItems.push(alertItem);
                    }
                });
            }

            function resetNewAppointment() {
                $scope.currentAppointment = {
                    StartDateTime: new Date(),
                    EndDateTime: new Date()
                };

                $scope.currentAppointment.StartDateTime.setSeconds(0, 0);
                $scope.currentAppointment.EndDateTime.setSeconds(0, 0);
                $scope.currentAppointment.Title = '';
                $scope.currentAppointment.Provider = '';
                $scope.currentAppointment.AppointmentContact = null;
                $scope.setDefaultAlertItems();
                //$scope.currentAppointment.OriginLocation = null;
                if ($scope.data.location)
                    $scope.data.location.formatted_address = '';
            }

            $scope.navigate = function () {
                resetNewAppointment();
                $scope.closeModal();
            }
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

            //watch form for changes
            //$scope.watchForm = function () {
            //    return $scope.form;
            //};
            //$scope.$watch($scope.watchForm, function () {
            //    $scope.checkForm();
            //    //console.log(JSON.stringify($scope.details));
            //}, true);


            ////set options from form selections
            //$scope.checkForm = function () {

            //    //$scope.options = {};
            //    $scope.options = { country: 'au' };

            //    $scope.options.watchEnter = $scope.form.watchEnter;

            //    if ($scope.form.typesEnabled) {
            //        $scope.options.types = $scope.form.type;
            //    }
            //    if ($scope.form.boundsEnabled) {

            //        var SW = new google.maps.LatLng($scope.form.bounds.SWLat, $scope.form.bounds.SWLng);
            //        var NE = new google.maps.LatLng($scope.form.bounds.NELat, $scope.form.bounds.NELng);
            //        var bounds = new google.maps.LatLngBounds(SW, NE);
            //        $scope.options.bounds = bounds;

            //    }
            //    if ($scope.form.componentEnabled) {
            //        $scope.options.country = $scope.form.country;
            //    }
            //};

            //$scope.onLocationChanged = function (locationDetailsEvent) {
            //    var locationData = locationDetailsEvent.detail;
            //    console.log("onLocationChanged called");

            //    if (locationData.elementId === "addressAutoComplete1") {
            //        console.log("setting originLocationDetails");
            //        $scope.originLocationDetails = locationData.filteredAddress.location;
            //        $scope.setLocationDetails('origin', locationData.filteredAddress);
            //    }

            //};

            //$scope.setLocationDetails = function (point, filteredAddress) {

            //    if (filteredAddress !== null) {

            //        var location = {};
            //        location.StreetNo = filteredAddress.street_number;
            //        location.Suburb = filteredAddress.locality;
            //        location.StreetName = filteredAddress.route;
            //        location.PostCode = filteredAddress.postal_code;
            //        location.State = filteredAddress.administrative_area_level_1;
            //        location.Country = filteredAddress.country;

            //        if (point === 'origin') {
            //            $scope.currentAppointment.OriginLocation = location;
            //        }

            //        if (point === 'destination') {
            //            $scope.currentAppointment.DestinationLocation = location;
            //        }
            //    }
            //}
            //auto-complete END ****



            //$scope.calcuateEstimatedTravelTime = function (originLocationDetails, destinationLocationDetails) {

            //    var origin = originLocationDetails.lat() + ', ' + originLocationDetails.lng();
            //    var destination = destinationLocationDetails.lat() + ', ' + destinationLocationDetails.lng();

            //    var directionsService = new google.maps.DirectionsService();
            //    var request = {
            //        origin: origin, // LatLng|string
            //        destination: destination, // LatLng|string
            //        travelMode: google.maps.DirectionsTravelMode.DRIVING
            //    };

            //    directionsService.route(request, function (response, status) {

            //        if (status === 'OK') {
            //            var point = response.routes[0].legs[0];
            //            $scope.currentAppointment.EstimatedTravelTime = point.duration.text + ' (' + point.distance.text + ')';
            //            $scope.$digest();
            //        }
            //    });
            //}

            //change isAllDay if diff betwween start and end day is exactly 24 hours
            $scope.isStartOrEndDateTimeChanged = function () {
                var duration = moment.duration(moment($scope.currentAppointment.EndDateTime).diff(moment($scope.currentAppointment.StartDateTime)));
                var hours = duration.asHours();
                if (hours === 24) {
                    $scope.currentAppointment.IsAllDay = true;
                } else {
                    $scope.currentAppointment.IsAllDay = false;
                }
            }

            $scope.transportOptions = [
                {
                    id: 0,
                    name: "None"
                }, {
                    id: 1,
                    name: "Yes"
                }, {
                    id: 2,
                    name: "No"
                }
            ];

            $scope.repeatItemList = [
                {
                    id: 0,
                    name: "Never"
                }, {
                    id: 1,
                    name: "Everyday"
                }, {
                    id: 2,
                    name: "Every week"
                }, {
                    id: 3,
                    name: "Every month"
                }, {
                    id: 4,
                    name: "Every year"
                }
            ];

            $scope.alertList = [
                {
                    id: 0,
                    name: "At time of event"

                },
                {
                    id: 1,
                    name: "5 minutes before"

                },
                {
                    id: 2,
                    name: "15 minutes before"
                },
                {
                    id: 3,
                    name: "30 minutes before"
                },
                {
                    id: 4,
                    name: "1 hour before",
                    ticked: true
                },
                {
                    id: 5,
                    name: "2 hours before"
                },
                {
                    id: 6,
                    name: "1 day before",
                    ticked: true
                },
                {
                    id: 7,
                    name: "2 days before"
                },
                {
                    id: 8,
                    name: "1 week before"
                }
            ];

            $scope.getAppointmentList = function (currentUserId) {
                genericService.showLoading('Loading....');
                return appointmentService.getAppointmentList(currentUserId)
                        .success(function (response) {
                            genericService.hideLoading();
                            if (response) {
                                console.log('appointment list:');
                                console.log(response);
                                $scope.appointmentList = response;
                                allAppointments();
                            }
                        })
                        .error(function (response) {
                            genericService.hideLoading();
                            console.log('unable to retrieve appointment list. Error response is ' + JSON.stringify(response));
                            genericService.showAlert('Sorry, we appear to be having errors', 'Unable to retrieve appointment list', function () {
                            });
                            //$scope.modalService.showAppError();
                        });
            }

            function allAppointments()
            {
                $scope.upcomingList = [];
                $scope.pastList = [];

                if ($scope.appointmentList) {
                    $scope.appointmentList.forEach(function (appt) {
                        appt.canShow = false;
                        var isBeforeToday = moment(appt.StartDateTime).isBefore(moment(), 'day');

                        if (isBeforeToday) {
                            $scope.pastList.push(appt);
                        }
                        else {
                            $scope.upcomingList.push(appt);
                        }
                    });
                }
            }

            function onAddressSelection(location) {
                var add = location.address_components;
                $scope.currentAppointment.OriginLocation = {};
                angular.forEach(add, function (a) {
                    switch (a.types[0]) {
                        case 'street_number':
                            $scope.currentAppointment.OriginLocation.StreetNo = a.long_name;
                            break;
                        case 'locality':
                            $scope.currentAppointment.OriginLocation.Suburb = a.long_name;
                            break;
                        case 'route':
                            $scope.currentAppointment.OriginLocation.StreetName = a.long_name;
                            break;
                        case 'postal_code':
                            $scope.currentAppointment.OriginLocation.PostCode = a.long_name;
                            break;
                        case 'administrative_area_level_1':
                            $scope.currentAppointment.OriginLocation.State = a.long_name;
                            break;
                        case 'country':
                            $scope.currentAppointment.OriginLocation.Country = a.long_name;
                            break;
                    }
                });
            }

            function newAppointment() {

                if ($scope.hasErrors($scope.newAppointment)) {
                    console.log("errors on newAppointment form");
                    return;
                }

                // update after appointment is created and user prompted if transport required
                $scope.currentAppointment.IsTransportRequiredField = true;

                if (!$scope.currentAppointment.Title) {
                    $scope.currentAppointment.Title = "";
                }


                $scope.currentAppointment.UserId = $scope.currentUser.Id;
               // $scope.currentAppointment.OriginLocation = $scope.data.location.formatted_address;

                if ($scope.currentAppointment.OriginLocation != null) {
                    $scope.currentAppointment.OriginLocation.UserId = $scope.currentUser.Id;
                }

                //if ($scope.currentAppointment.DestinationLocation != null) {
                //    $scope.currentAppointment.DestinationLocation.UserId = $scope.currentUser.Id;
                //}

                //appt contact is not mandatory parameter
                if (!$scope.currentAppointment.AppointmentContact) {
                    $scope.currentAppointment.AppointmentContact = {};
                }

                if ($scope.currentAppointment.AppointmentContact !== null) {
                    $scope.currentAppointment.AppointmentContact.PatientId = $scope.currentUser.Id;
                    if (!$scope.currentAppointment.AppointmentContact.Name) {
                        $scope.currentAppointment.AppointmentContact.Name = "";
                    }
                }

                if ($scope.currentAppointment) {
                    console.log("currentAppointment being added:" + JSON.stringify($scope.currentAppointment));
                }

                //native appt creation:
                var appointmentInNativeDevice = {
                    Title: $scope.currentAppointment.Title,
                    Location: null,
                    StartDate: $scope.currentAppointment.StartDateTime,
                    EndDate: $scope.currentAppointment.EndDateTime,
                    Notes: $scope.currentAppointment.Notes
                }
                nativeDeviceService.createCalendarEvent("Thrivor", appointmentInNativeDevice);

                var alertIntervals = "";
                $scope.currentAppointment.AlertIntervalIds = [];
                $scope.currentAppointment.selectedAlertItems.forEach(function (selectedAlertItem) {
                    if (selectedAlertItem.ticked) {
                        $scope.currentAppointment.AlertIntervalIds.push(selectedAlertItem.id);
                    }
                });
                $scope.currentAppointment.AlertIntervals = alertIntervals;

                    appointmentService.addAppointment($scope.currentAppointment)
                        .success(function (response) {
                            console.log("appointment added successfully - Appointment:" + JSON.stringify($scope.currentAppointment));

                            $scope.currentAppointment.Id = response.Id;
                            //$scope.currentAppointment = response;
                            $scope.appointmentList.push($scope.currentAppointment);
                            resetNewAppointment();
                            showApptSuccessPopup();
                            //$scope.selectOperation('showAppointmentsQuickView');

                        })
                        .error(function (response) {
                            resetNewAppointment();
                            console.log("Error while adding appointment - Appointment:" + JSON.stringify(response));
                            genericService.showAlert('Sorry, we appear to be having errors', 'Error occurred while adding an appointment', function () {
                            });
                        });
            }

            //function resetToLocationDefaults(locationType, locationDetails) {

            //    locationDetails.StreetName = "";
            //    locationDetails.Suburb = "";
            //    locationDetails.State = "";
            //    locationDetails.Country = "";
            //    if (locationType === 'origin') {
            //        locationDetails.LocationName = $scope.autocomplete1; //saves the free text entry entered by user.
            //    }

            //    if (locationType === 'destination') {
            //        locationDetails.LocationName = document.getElementById("addressAutoComplete2").value; //saves the free text entry entered by user.
            //    }

            //    locationDetails.PostCode = "";
            //    locationDetails.StreetNo = "";
            //}

            $scope.hasErrors = function (form) {

                var errors = [];
                if (form && form.$error) {
                    for (var key in form.$error) {
                        errors.push(key + "=" + form.$error);
                    }

                    if (errors.length > 0) {
                        return true;
                    }
                }

                return false;
            }

            $scope.editAppointment = function () {

                if ($scope.hasErrors($scope.newAppointment)) {
                    console.log("error exist in form");
                    return;
                }

                appointmentService.editAppointment($scope.currentAppointment)
                        .success(function (response) {
                            console.log("appointment added successfully - Appointment:" + JSON.stringify($scope.currentAppointment));


                            //$scope.selectOperation('showAppointmentsQuickView');
                        })
                        .error(function (response) {
                            console.log("Error while editing appointment - Response:" + JSON.stringify(response));
                        });
            }

            //$scope.getFormattedDestinationLocation = function () {
            //    //Wattletree Rd, MALVERN VIC 3144 Radiology, Room 6, Level 7
            //    if ($scope.currentAppointment.DestinationLocation) {
            //        var formattedLocation = $scope.currentAppointment.DestinationLocation.StreetNo + "," + $scope.currentAppointment.DestinationLocation.StreetName + "," + $scope.currentAppointment.DestinationLocation.Suburb + "," + $scope.currentAppointment.DestinationLocation.PostCode + "," + $scope.currentAppointment.DestinationLocation.State + "," + $scope.currentAppointment.DestinationLocation.Country;
            //        return formattedLocation;
            //    }
            //}

            $scope.viewAppointment = function (appointment) {
                $rootScope.appointmentDetails = appointment;
                //$scope.currentAppointment = appointment;
                $state.go('dashboard.appointments.details');
            }

            $scope.startEditAppointment = function (appointment) {

                $scope.appointmentList.forEach(function (appt) {
                    if (appt.Id === appointment.Id) {
                        console.log('appointment being edited:', JSON.stringify(appt));
                        $scope.currentAppointment = appt;
                    }
                });

                //$scope.selectOperation('edit');
            }

            //$rootScope.$on(
            //    "onLocationSet",
            //    function (context) {
            //        console.log("onLocationSet event called with context - ", JSON.stringify(context));
            //        $scope.onLocationChanged(context);
            //    }
            //);

            //window.addEventListener("onLocationSet", function (locationData) {
            //    $scope.onLocationChanged(locationData);
            //}, false);


            $scope.deleteAppointment = function (appointment) {

                var appointmentToDelete = null;
                $scope.appointmentList.forEach(function (appt) {
                    if (appointment !== null && appt.Id === appointment.Id) {
                        appointmentToDelete = appt;
                        console.log('appointment being deleted:', JSON.stringify(appt));
                    }
                });

                if (appointmentToDelete === null) {
                    return;
                }

                appointmentService.deleteAppointment(appointmentToDelete.Id)
                    .success(function (response) {
                        console.log("appointment deleted successfully - Appointment:" + JSON.stringify($scope.currentAppointment));

                        var appointmentInNativeDevice = {
                            Title: $scope.currentAppointment.Title,
                            Location: null,
                            StartDate: new Date($scope.currentAppointment.StartDateTime),
                            EndDate: new Date($scope.currentAppointment.EndDateTime),
                            Notes: $scope.currentAppointment.Notes
                        }

                        if (appointmentToDelete !== null) {
                            $scope.currentAppointment = {}; //reset current appt.
                            $scope.appointmentList.pop(appointmentToDelete);
                        }
                        //$scope.selectOperation('showAppointmentsQuickView');

                        nativeDeviceService.deleteCalendarEvent("Thrivor", appointmentInNativeDevice);
                    })
                    .error(function (response) {
                        console.log("Error while editing appointment - Response:" + JSON.stringify(response)); //todo - common error handling missing in UI specs
                        genericService.showAlert('Sorry, we appear to be having errors', 'Error while deleting appointment', function () {
                        });

                    });
            }


            $scope.appointmentTitleSelectionChanged = function (context) {
                if (context && context.selected) {
                    console.log('selected Appointment Title:', context.selected.description);
                    $scope.currentAppointment.Title = context.selected.description;
                }
            }

            $scope.appointmentTitles = [
                {
                    id: 1,
                    description: 'Radiotherapy'
                }, {
                    id: 2,
                    description: 'Oncology'
                }, {
                    id: 3,
                    description: 'Stem Cell Transplant'
                }
            ];

            $scope.refreshResults = refreshResults;
            $scope.clear = clear;

            // Helper functions

            function refreshResults($select) {
                var search = $select.search,
                  list = angular.copy($select.items),
                  FLAG = -1;
                //remove last user input
                list = list.filter(function (item) {
                    return item.id !== FLAG;
                });

                if (!search) {
                    //use the predefined list
                    $select.items = list;
                }
                else {
                    //manually add user input and set selection
                    var userInputItem = {
                        id: FLAG,
                        description: search
                    };
                    $select.items = [userInputItem].concat(list);
                    $select.selected = userInputItem;
                }
            }

            function clear($event, $select) {
                $event.stopPropagation();
                //to allow empty field, in order to force a selection remove the following line
                $select.selected = undefined;
                //reset search query
                $select.search = undefined;
                //focus and open dropdown
                $select.activate();
            }

            function showApptSuccessPopup() {
                genericService.showConfirm('Appointment Created', 'Will you need help getting to your destination?', function (res) {
                    if (res) {
                        allAppointments();
                        $scope.closeModal();
                        $state.go('dashboard.transport');
                    } else {
                        $scope.getAppointmentList($scope.currentUser.Id);
                        $scope.closeModal();
                    }
                });
            }
    
        }]);