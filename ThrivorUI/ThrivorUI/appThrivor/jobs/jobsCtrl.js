appThrivor.controller("jobsCtrl", ['$scope', '$rootScope', '$location', '$timeout', 'jobService', 'storageService', '$state', '$stateParams', 'userService', 'nativeDeviceService', '$http', 'USER_TYPE', 'genericService',
    function jobsController($scope, $rootScope, $location, $timeout, jobService, storageService, $state, $stateParams, userService, nativeDeviceService, $http, USER_TYPE, genericService) {

        var currentUser = userService.getCurrentUser();
        $scope.dateMessage = '';
        $scope.crewMessage = '';
        $scope.new = true;
        $scope.edit = false;
        $scope.isCrewListEmpty = false;

        $scope.initialize = init;
        $scope.supportCrewList = crewList;
        $scope.newJob = newJobCategory;
        $scope.openTabJob = openJobs;
        $scope.openTabRostered = rosteredJobs;
        $scope.createNewJob = createJob;
        $scope.getCategory = jobCategoryName;
        $scope.onAddressSelection = onAddressSelection;

        $scope.tags = [];
        $scope.data = {}; // https://github.com/Hobbule/ion-google-autocomplete
        $scope.newJobDetails = {
            location: '',
            selectedCategory: getCategoryType(),
            description: '',
            startTime: new Date(),
            endTime: new Date()
        };

        init();

        function init() {
            $scope.userCapabilities = JSON.parse(storageService.get('userCapabilities'));
            initJobDetails();

            if (!$scope.userCapabilities.canCreateJobs)
                fetchOpenJobs();

            getAllSupportCrew();
        }

        function initJobDetails() {
            $scope.newJobDetails.startTime = new Date();
            $scope.newJobDetails.startTime.setSeconds(0, 0);
            $scope.newJobDetails.endTime = new Date();
            $scope.newJobDetails.endTime.setSeconds(0, 0);
            $scope.newJobDetails.Location = '';
            $scope.newJobDetails.description = '';
            $scope.tags.length = 0;
            if ($scope.data.location)
                $scope.data.location.formatted_address = '';
        }

        if ($scope.userCapabilities.canCreateJobs)
            $scope.tab = 1;
        else
            $scope.tab = 2;

        $scope.setTab = function (newTab) {
            if (newTab === 2) {
                fetchOpenJobs();
            }
            else {
                fetchRosteredJobs();
            }
            $scope.tab = newTab;
        };

        $scope.isSet = function (tabNum) {
            return $scope.tab === tabNum;
        };

        genericService.registerModal($scope, 'appThrivor/jobs/newJob.html', function () {
            initJobDetails();
        });

        jobService.getJobCategoriesList().success(function (response) {
            for (var i = 0; i < response.length; i++) {
                if (response[i].IconPath != null)
                    response[i].IconPath = response[i].IconPath.replace("Content/", "");
            }
            $scope.jobs = response;
        }).error(function (data, status, headers, config) {
            genericService.showAlert('Sorry, we appear to be having errors', 'Unable to retrieve job categories list', function () {
            });
        });

        function getCategoryIdFromName(name) {
            for (var job in $scope.jobs) {
                if ($scope.jobs[job].CategoryName.toLowerCase() == name.toLowerCase()) {
                    return $scope.jobs[job].Id;
                }
            }
            return null;
        }

        function getCategoryType() {
            return $stateParams.type ? $stateParams.type : '';
        }

        //$rootScope.$on(
        //        "onLocationSet",
        //        function (context) {
        //            console.log("onLocationSet event called with context - ", JSON.stringify(context));
        //            $scope.onLocationChanged(context);
        //        }
        //    );

        //window.addEventListener("onLocationSet", function (locationData) {
        //    $scope.onLocationChanged(locationData);
        //}, false);

        function newJobCategory(category) {
            //$scope.currentView = 'newRecord';
            $scope.newJobDetails.selectedCategory = category;
            $scope.openModal();
        }

        //$scope.isViewActive = function (view) {
        //    return $scope.currentView == view;
        //}

        //$scope.gotoEdit = function () {
        //    $location.path('/job/' + $stateParams.id);
        //}

        $scope.openJob = function (id) {
            $state.go('dashboard.jobs.detailscrew', { id: id }, { reload: true });
        }

        $scope.jobDetails = function (id) {
            $state.go('dashboard.jobs.detailspatient', { id: id }, { reload: true });
        }

        function openJobs() {
            //$scope.currentView = 'openJobs';
            fetchOpenJobs();
        }

        function rosteredJobs() {
            //$scope.currentView = 'rosteredJobs';
            fetchRosteredJobs();
        }

        function fetchOpenJobs() {
            genericService.showLoading('Loading....');
            jobService.getJobDetailsListByUserId(currentUser.Id)
             .success(function (response) {
                 genericService.hideLoading();
                 $scope.jobList = response;
                 console.log('open jobs list:');
                 console.log(response);
             })
            .error(function (data, status, headers, config) {
                genericService.hideLoading();
                genericService.showAlert('Sorry, we appear to be having errors', 'Unable to retrieve job list', function () {
                });
            });
        }

        function fetchRosteredJobs() {
            genericService.showLoading('Loading....');
            jobService.getRosteredTasksByUserId(currentUser.Id)
                .success(function (response) {
                    genericService.hideLoading();
                    console.log('getAllRosteredTasks: ');
                    console.log(response);
                    $scope.rosteredJobList = response;
                })
               .error(function (data, status, headers, config) {
                   genericService.hideLoading();
                   genericService.showAlert('Sorry, we appear to be having errors', 'Unable to retrieve job list', function () {
                   });
               });
        }

        function getAllSupportCrew() {
            var currentUser = userService.getCurrentUser();
            return userService.getCrewListByUniqueCode(currentUser.UniqueCode)
            .success(function (response) {
                //console.log(response);

                if (response === null)
                    $scope.isCrewListEmpty = true;
                else
                    $scope.isCrewListEmpty = false;

                var supportCrews = response;
                console.log('getAllSupportCrew');
                storageService.set('crewList', JSON.stringify(response));

            })
           .error(function (data, status, headers, config) {
               genericService.showAlert('Sorry, we appear to be having errors', 'Unable to retrieve support crew list', function () {
               });
           });
        }

        function crewList() {
            var data = JSON.parse(storageService.get('crewList'));
            return data;
        }

        function createJob() {
            $scope.dateMessage = '';
            $scope.crewMessage = '';
            $scope.invalidCrewMessage = '';

            $scope.crewList = JSON.parse(storageService.get('crewList'));
            var validCrews = [];
            var invalidCrews = [];
            var userIdList = [];

            for (var i = 0; i < $scope.crewList.length; i++) {
                validCrews.push($scope.crewList[i].Name);
            }
            console.log('valid list:');
            console.log(validCrews);

            for (var i = 0; i < $scope.tags.length; i++) {
                var x = validCrews.indexOf($scope.tags[i].Name);
                if (x >= 0) {
                    userIdList.push($scope.tags[i].Id);
                }
                else {
                    invalidCrews.push($scope.tags[i].Name);
                }
            }


            //if ($scope.hasErrors($scope.newJobForm)) {
            //    console.log("error exist in form");
            //    return;
            //}

            var jobCategory = getCategoryIdFromName($scope.newJobDetails.selectedCategory);
            var jobDetails = {
                TaskCategoryId: jobCategory,
                PatientId: currentUser.Id, // fix hard-coded value
                Description: $scope.newJobDetails.description,
                Location: $scope.newJobDetails.Location,
                StartDateTime: $scope.newJobDetails.startTime,
                DueDateTime: $scope.newJobDetails.endTime,
                Status: "OPEN" // should be a constant
            }
            console.log(jobDetails);
            if ($scope.newJobDetails.startTime > $scope.newJobDetails.endTime) {
                $scope.dateMessage = 'Start datetime cannot be greater than End datetime';
            }
            else if ($scope.isCrewListEmpty === true || $scope.tags.length <= 0) {
                $scope.crewMessage = 'A Support Crew is required';
            }
            else if (invalidCrews.length > 0) {
                var name = '';
                for (var i = 0; i < invalidCrews.length; i++) {
                    name += invalidCrews[i] + ',';
                }
                $scope.invalidCrewMessage = name + ' are/is invalid crew(s)';
            }
            else {
                genericService.showLoading('Processing...');
                jobService.createJob(jobDetails)
                    .success(function (response) {
                        console.log(response);
                        var taskDetailsId = response;
                        //var userIdList = [];
                        //for (var i = 0; i < $scope.tags.length; i++) {
                        //    userIdList[i] = $scope.tags[i].Id;
                        //}

                        var jobVolunteers = {
                            TaskDetailsId: taskDetailsId,
                            UserIdList: userIdList
                        };
                        console.log('jobVolunteers: ');
                        console.log(jobVolunteers);
                        jobService.sendJobHelpRequest(jobVolunteers)
                            .success(function (response) {
                                genericService.hideLoading();
                                genericService.showAlert('Success', 'Your Job request has been sent to your crew members', function () {
                                    initJobDetails();
                                    $scope.closeModal();
                                    $state.go('dashboard.jobs');
                                });
                            })
                            .error(function (response) {
                                genericService.hideLoading();
                                initJobDetails();
                                console.log('failed to send job request to support crew.');
                                genericService.showAlert('Sorry, we appear to be having errors', 'Unable to send job request to crew', function () {
                                });
                                //$scope.closeModal();
                            });

                        fetchOpenJobs();
                    })
                    .error(function (response) {
                        genericService.hideLoading();
                        initJobDetails();
                        genericService.showAlert('Sorry, we appear to be having errors', 'Unable to create job', function () {
                            $state.go('dashboard.jobs');
                        });
                    });
            }
        }

        function jobCategoryName(id) {
            var categoryData = $scope.jobs;
            console.log('categoryData: ');
            console.log(categoryData);
            for (var i = 0; i < categoryData.length; i++) {
                if (categoryData[i].Id == id) {
                    return categoryData[i].CategoryName;
                }
            }
            return "";
        }

        //auto-complete START ****
        $scope.result = '';
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
        $scope.watchForm = function () {
            return $scope.form;
        };
        $scope.$watch($scope.watchForm, function () {
            $scope.checkForm();
        }, true);


        //set options from form selections
        $scope.checkForm = function () {

            //$scope.options = {};
            $scope.options = { country: 'au' };

            $scope.options.watchEnter = $scope.form.watchEnter;

            if ($scope.form.typesEnabled) {
                $scope.options.types = $scope.form.type;
            }
            if ($scope.form.boundsEnabled) {

                var SW = new google.maps.LatLng($scope.form.bounds.SWLat, $scope.form.bounds.SWLng);
                var NE = new google.maps.LatLng($scope.form.bounds.NELat, $scope.form.bounds.NELng);
                var bounds = new google.maps.LatLngBounds(SW, NE);
                $scope.options.bounds = bounds;

            }
            if ($scope.form.componentEnabled) {
                $scope.options.country = $scope.form.country;
            }
        };

        $scope.onLocationChanged = function (context) {
            console.log("Location On Focus called");

            if (context && context.detail && context.detail.filteredAddress) {

                console.log("setting location");
                $scope.newJobDetails.Location = {};
                $scope.newJobDetails.Location.StreetNo = context.detail.filteredAddress.street_number;
                $scope.newJobDetails.Location.Suburb = context.detail.filteredAddress.locality;
                $scope.newJobDetails.Location.StreetName = context.detail.filteredAddress.route;
                $scope.newJobDetails.Location.PostCode = context.detail.filteredAddress.postal_code;
                $scope.newJobDetails.Location.State = context.detail.filteredAddress.administrative_area_level_1;
                $scope.newJobDetails.Location.Country = context.detail.filteredAddress.country;
            }
        };
        //auto-complete END ****

        function onAddressSelection(location) {
            var add = location.address_components;
            $scope.newJobDetails.Location = {};
            angular.forEach(add, function (a) {
                switch (a.types[0]) {
                    case 'street_number':
                        $scope.newJobDetails.Location.StreetNo = a.long_name;
                        break;
                    case 'locality':
                        $scope.newJobDetails.Location.Suburb = a.long_name;
                        break;
                    case 'route':
                        $scope.newJobDetails.Location.StreetName = a.long_name;
                        break;
                    case 'postal_code':
                        $scope.newJobDetails.Location.PostCode = a.long_name;
                        break;
                    case 'administrative_area_level_1':
                        $scope.newJobDetails.Location.State = a.long_name;
                        break;
                    case 'country':
                        $scope.newJobDetails.Location.Country = a.long_name;
                        break;
                }
            });
        }

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

        if ($stateParams.type) {
            $timeout(function () {
                newJobCategory($stateParams.type);
            }, 800);
        }

    }]);