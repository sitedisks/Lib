appThrivor.controller("jobDetailsCtrl", ['$scope', '$rootScope', '$location', 'jobService', 'storageService', '$state', '$stateParams', 'userService', 'nativeDeviceService', '$http', 'genericService', '$window',
function jobsController($scope, $rootScope, $location, jobService, storageService, $state, $stateParams, userService, nativeDeviceService, $http, genericService, $window) {

        var currentUser = userService.getCurrentUser();
        $scope.message = '';
        $scope.crewMessage = '';
        $scope.new = true;
        $scope.edit = false;

        $scope.initialize = init;
        $scope.isJobAccepted = jobAccepted;

        $scope.newJobDetails = {
            location: '',
            selectedCategory: '',
            description: '',
            startTime: new Date(),
            endTime: new Date()
        };

        init();

        function init() {
            $scope.userCapabilities = JSON.parse(storageService.get('userCapabilities'));

            userService.getPatientDetails(currentUser.UniqueCode)
                 .success(function (response) {
                     storageService.set('patientPhoto', response.UserPhoto);
                     storageService.set('patientName', response.Name);
                 })
                 .error(function (data, status, headers, config) {
                     genericService.showAlert('Sorry, we appear to be having errors', 'Unable to retrive patient details', function () {
                     });
                 });

            $scope.newJobDetails.startTime = new Date();
            $scope.newJobDetails.startTime.setSeconds(0, 0);
            $scope.newJobDetails.endTime = new Date();
            $scope.newJobDetails.endTime.setSeconds(0, 0);

        }

        $scope.navigate = function () {
            $state.go('dashboard.jobs');
            //$window.location.href = '#/jobs';
        }

        jobService.getJobCategoriesList().success(function (response) {
            $scope.jobCategories = response;
        }).error(function (data, status, headers, config) {
            genericService.showAlert('Sorry, we appear to be having errors', 'Unable to retrieve job categories list', function () {
            });
        });

        if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== 'new') {
            console.log('Current route name: ' + $location.path());
            var view = $location.path();
            $scope.new = false;
            $scope.edit = true;

            jobService.getJobDetailsById($stateParams.id).success(function (response) {
                $scope.patientPhoto = storageService.get('patientPhoto');
                $scope.patientName = storageService.get('patientName');

                //var start = response.StartDateTime.replace('T', ' ').replace(/-/g, '/');
                //var end = response.DueDateTime.replace('T', ' ').replace(/-/g, '/');
                $scope.newJobDetails.categoryName = getCategory(response.TaskCategoryId);
                $scope.newJobDetails.selectedCategory = response.TaskCategoryId;
                $scope.newJobDetails.description = response.Description;
                $scope.newJobDetails.location = getFormattedLocation(response.Location);
                $scope.newJobDetails.startTime = new Date(response.StartDateTime);
                $scope.newJobDetails.endTime = new Date(response.DueDateTime);
            })
            .error(function (data, status, headers, config) {
                genericService.showAlert('Sorry, we appear to be having errors', 'Unable to retrieve job details', function () {
                });
            });
        }

        function getFormattedLocation(location) {
            if (location) {
                var formattedLocation = location.StreetNo + "," + location.StreetName + "," + location.Suburb + "," + location.PostCode + "," + location.State + "," + location.Country;
                return formattedLocation;
            }
        }

        function getCategoryIdFromName(name) {
            for (var job in $scope.jobs) {
                if ($scope.jobs[job].CategoryName.toLowerCase() == name.toLowerCase()) {
                    return $scope.jobs[job].Id;
                }
            }
            return null;
        }

        //function getCategoryType() {
        //    return $routeParams.type ? $routeParams.type : '';
        //}

        function jobAccepted(flag, jobDetails) {
            //var currentUser = userService.getCurrentUser();
            //console.log(jobDetails);
            if (flag === true) {
                var jobInNativeDevice = {
                    Title: jobDetails.categoryName,
                    Location: jobDetails.location,
                    StartDate: jobDetails.startTime,
                    EndDate: jobDetails.endTime,
                    Notes: jobDetails.description
                }

                nativeDeviceService.createCalendarEvent("Thrivor", jobInNativeDevice);
            }

            var jobVolunteer = {
                TaskDetailsId: $stateParams.id,
                UserId: currentUser.Id,
                IsAccepted: flag
            };

            jobService.updateTaskVolunteer($stateParams.id, jobVolunteer).success(function (response) {
                //$location.path('/supportUserDashboard');
                //$state.go('dashboard.jobs');
                $window.location.href = '#/jobs';
            }).error(function (data, status, headers, config) {
                genericService.showAlert('Sorry, we appear to be having errors', 'Please try again', function () {
                });
            });
        }

        //$scope.editJob = function () {
        //    $scope.new = false;
        //    $scope.edit = true;
        //    var categoryId = getCategoryIdFromName($scope.newJobDetails.selectedCategory);
        //    var jobDetails = {
        //        TaskCategoryId: categoryId,
        //        PatientId: currentUser.Id, // fix hard-coded value
        //        Description: $scope.newJobDetails.description,
        //        Location: $scope.newJobDetails.location,
        //        StartDateTime: $scope.newJobDetails.startTime,
        //        DueDateTime: $scope.newJobDetails.endTime,
        //        Status: "OPEN" // should be a constant
        //    }
        //    //console.log(jobDetails);
        //    jobService.editJob($routeParams.id, jobDetails)
        //        .success(function (response) {
        //            $scope.message = 'Job was updated successfully';
        //        })
        //        .error(function (response) {
        //            console.log('');
        //        });
        //}



        function getCategory(id) {

            var categoryData = $scope.jobCategories;
            console.log('categoryData: ');
            console.log(categoryData);
            for (var i = 0; i < categoryData.length; i++) {
                if (categoryData[i].Id == id) {
                    return categoryData[i].CategoryName;
                }
            }
            return "";
        }

    }]);