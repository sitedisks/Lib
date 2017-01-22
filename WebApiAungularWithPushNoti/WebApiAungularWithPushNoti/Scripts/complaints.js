(function () { // Angular encourages module pattern, good!
    var app = angular.module('myApp', []),
        uri = 'api/complaints',
        errorMessage = function (data, status) {
            return 'Error: ' + status +
                (data.Message !== undefined ? (' ' + data.Message) : '');
        },
        hub = $.connection.myHub; // create a proxy to signalr hub on web server

    app.controller('myCtrl', ['$http', '$scope', function ($http, $scope) {
        $scope.complaints = [];
        $scope.customerIdSubscribed;

        $scope.getAllFromCustomer = function () {
            if ($scope.customerId.length == 0) return;
            $http.get(uri + '/' + $scope.customerId)
                .success(function (data, status) {
                    $scope.complaints = data; // show current complaints
                    if ($scope.customerIdSubscribed &&
                        $scope.customerIdSubscribed.length > 0 &&
                        $scope.customerIdSubscribed !== $scope.customerId) {
                        // unsubscribe to stope to get notifications for old customer
                        hub.server.unsubscribe($scope.customerIdSubscribed);
                    }
                    // subscribe to start to get notifications for new customer
                    hub.server.subscribe($scope.customerId);
                    $scope.customerIdSubscribed = $scope.customerId;
                })
                .error(function (data, status) {
                    $scope.complaints = [];
                    $scope.errorToSearch = errorMessage(data, status);
                })
        };
        $scope.postOne = function () {
            $http.post(uri, {
                COMPLAINT_ID: 0,
                CUSTOMER_ID: $scope.customerId,
                DESCRIPTION: $scope.descToAdd
            })
                .success(function (data, status) {
                    $scope.errorToAdd = null;
                    $scope.descToAdd = null;
                })
                .error(function (data, status) {
                    $scope.errorToAdd = errorMessage(data, status);
                })
        };
        $scope.putOne = function () {
            $http.put(uri + '/' + $scope.idToUpdate, {
                COMPLAINT_ID: $scope.idToUpdate,
                CUSTOMER_ID: $scope.customerId,
                DESCRIPTION: $scope.descToUpdate
            })
                .success(function (data, status) {
                    $scope.errorToUpdate = null;
                    $scope.idToUpdate = null;
                    $scope.descToUpdate = null;
                })
                .error(function (data, status) {
                    $scope.errorToUpdate = errorMessage(data, status);
                })
        };
        $scope.deleteOne = function (item) {
            $http.delete(uri + '/' + item.COMPLAINT_ID)
                .success(function (data, status) {
                    $scope.errorToDelete = null;
                })
                .error(function (data, status) {
                    $scope.errorToDelete = errorMessage(data, status);
                })
        };
        $scope.editIt = function (item) {
            $scope.idToUpdate = item.COMPLAINT_ID;
            $scope.descToUpdate = item.DESCRIPTION;
        };
        $scope.toShow = function () { return $scope.complaints && $scope.complaints.length > 0; };

        // at initial page load
        $scope.orderProp = 'COMPLAINT_ID';

        // signalr client functions
        hub.client.addItem = function (item) {
            $scope.complaints.push(item);
            $scope.$apply(); // this is outside of angularjs, so need to apply
        }
        hub.client.deleteItem = function (item) {
            var array = $scope.complaints;
            for (var i = array.length - 1; i >= 0; i--) {
                if (array[i].COMPLAINT_ID === item.COMPLAINT_ID) {
                    array.splice(i, 1);
                    $scope.$apply();
                }
            }
        }
        hub.client.updateItem = function (item) {
            var array = $scope.complaints;
            for (var i = array.length - 1; i >= 0; i--) {
                if (array[i].COMPLAINT_ID === item.COMPLAINT_ID) {
                    array[i].DESCRIPTION = item.DESCRIPTION;
                    $scope.$apply();
                }
            }
        }

        $.connection.hub.start(); // connect to signalr hub
    }]);
})();
