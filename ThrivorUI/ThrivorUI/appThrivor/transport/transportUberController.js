(function () {
    'use strict';

    appThrivor.controller("transportUberController", ['$scope', '$state', '$rootScope', '$location', '$timeout', '$log', 'storageService', 'transportService', 'genericService',
        function ($scope, $state, $rootScope, $location, $timeout, $log, storageService, transportService, genericService) {

            var geo = new google.maps.Geocoder;
            var productId = storageService.get('uberProductId');
            //$scope.processing = false;

            $scope.title = 'Uber';
            $scope.accessToken = null;
            $scope.refreshToken = null;
            $scope.requestId = null;
            $scope.options = { country: 'au' };
            $scope.products = [];
            

            $scope.address = {
                current: storageService.get('uberCurrentAddress') ? JSON.parse(storageService.get('uberCurrentAddress')).address : null,
                destination: storageService.get('uberDestinationAddress') ? JSON.parse(storageService.get('uberDestinationAddress')).address : null,
                currentGeolocation: storageService.get('uberCurrentAddress') ? JSON.parse(storageService.get('uberCurrentAddress')).geo : null,
                destinationGelocation: storageService.get('uberDestinationAddress') ? JSON.parse(storageService.get('uberDestinationAddress')).geo : null
            };

            $scope.estimatedTime;
            $scope.products;
            $scope.requestEstimate;

            // functions register
            $scope.gotoTransport = gotoTransport;
            $scope.resolveCurrentGeolocation = resolveCurrentGeolocation;
            $scope.resolveDestinationGeolocation = resolveDestinationGeolocation;
            $scope.getEstimatedTime = getEstimatedTime;
            $scope.getUberProducts = getUberProducts;
            $scope.selectUberProduct = selectUberProduct;
            $scope.confirmUberRequest = confirmUberRequest;
            $scope.goBack = goBack;

            /*
            function displayModal(headerMessage, bodyMessage) {
                var modalOptions = {
                    closeButtonText: 'Close',
                    actionButtonText: 'OK',
                    headerText: headerMessage,
                    bodyText: bodyMessage,
                    isShowFooter: true
                };
            }*/

            var code = storageService.get('uberCode');

            if (code) {
                //$scope.processing = true;
                genericService.showLoading('uber...');
                transportService.apiGetAccessToken(code)
                    .then(function (result) {
                        $scope.accessToken = result.data.access_token;
                        $scope.refreshToken = result.data.refresh_token;
                        transportService.uberRequestEstimate(productId, $scope.address.currentGeolocation, $scope.address.destinationGelocation, $scope.accessToken)
                            .then(function (result) {
                                //$scope.processing = false;
                                genericService.hideLoading();
                                $scope.requestEstimate = result.data;
                            }, function (error) {
                                //$scope.processing = false;
                                genericService.hideLoading();
                                cleanUberStorage();
                            });

                    }, function (error) {
                        $log.error('Uber: Gain the access token failed. Please try again');
                        cleanUberStorage();
                        genericService.hideLoading();
                        genericService.showAlert('Error', 'Please try again. If you\'re still having problems, please contact us.', function () {
                            goBack();
                        });
                        //displayModal('Sorry, we appear to be having errors', "Please try again. If you're still having problems, please contact us.");
                    });
            } else {
                cleanUberStorage();
            }

            genericService.registerModal($scope, 'appThrivor/transport/modal_uber.html', function () {
                console.log('modal closed'); // clean the location?
            });

            // functions implementation
            function gotoTransport() {
                cleanUberStorage();
                $location.path('/transport');
            }

            function getCurrentLatLng() {
                navigator.geolocation.watchPosition(function (position) {
                    // Update the current latitude and longitude
                    codeLatLng(position.coords.latitude, position.coords.longitude);
                });
            }

            function resolveCurrentGeolocation() {
                if ($scope.current_result) {
                    $scope.address.current = $scope.current_result.formattedAddress;
                    $scope.address.currentGeolocation = {
                        'lat': $scope.current_result.lat,
                        'lng': $scope.current_result.lng
                    };
                } else {
                    if ($scope.address.current) {
                        if ($scope.address.current.length === 0)
                            $scope.address.currentGeolocation = null;
                        $timeout(function () {
                            if ($scope.address.current != null && $scope.address.current.length > 4) {
                                geo.geocode({ 'address': $scope.address.current }, function (results, status) {
                                    if (status == google.maps.GeocoderStatus.OK) {
                                        $scope.address.currentGeolocation = results[0].geometry.location;
                                    } else {
                                        $log.warn("Geocode was not successful for the following reason: " + status);
                                    }
                                });
                            }
                        }, 4000);
                    }
                }
                if ($scope.address.currentGeolocation)
                    $log.info('from: ' + $scope.address.currentGeolocation.lat + ', ' + $scope.address.currentGeolocation.lng);
            }

            function resolveDestinationGeolocation() {
                if ($scope.destination_result) {
                    $scope.address.destination = $scope.destination_result.formattedAddress;
                    $scope.address.destinationGelocation = {
                        'lat': $scope.destination_result.lat,
                        'lng': $scope.destination_result.lng
                    };
                }
                else {
                    if ($scope.address.destination) {
                        if ($scope.address.destination.length === 0)
                            $scope.address.destinationGelocation = null;
                        $timeout(function () {
                            if ($scope.address.destination != null && $scope.address.destination.length > 4) {
                                geo.geocode({ 'address': $scope.address.destination }, function (results, status) {
                                    if (status == google.maps.GeocoderStatus.OK) {
                                        $scope.address.destinationGelocation = results[0].geometry.location;
                                    } else {
                                        $log.warn("Geocode was not successful for the following reason: " + status);
                                    }
                                });
                            }
                        }, 4000);
                    }
                }
                if ($scope.address.destinationGelocation)
                    $log.info('to: ' + $scope.address.destinationGelocation.lat + ', ' + $scope.address.destinationGelocation.lng);
            }

            function getEstimatedTime() {
                genericService.showLoading('uber...');
                //$scope.processing = true;
                if ($scope.address.currentGeolocation != null & $scope.address.destinationGelocation != null) {
                    transportService.uberGetEstimatedTime($scope.address.currentGeolocation, $scope.address.destinationGelocation)
                        .then(function (result) {
                            //$scope.processing = false;
                            genericService.hideLoading();
                            $scope.estimatedTime = result.data; // objects
                        }, function (error) {
                            //$scope.processing = false;
                            genericService.hideLoading();
                            //displayModal('Sorry, we appear to be having errors', "Please try again. If you're still having problems, please contact us.");
                            genericService.showAlert('Error', 'Please try again. If you\'re still having problems, please contact us.', function () { });
                        });
                } else {
                    $log.info('address not ready');
                }
            }

            function getUberProducts() {
                //$scope.processing = true;
                genericService.showLoading('uber...');
                if ($scope.address.currentGeolocation != null && $scope.address.destinationGelocation != null) {
                    transportService.uberGetProducts($scope.address.currentGeolocation)
                        .then(function (result) {
                            //$scope.processing = false;
                            genericService.hideLoading();
                            $scope.products = result.data.products;
                            // hack https image
                            angular.forEach($scope.products, function (prod) {
                                if (prod.image.indexOf('http') > -1) {
                                    prod.image = prod.image.replace('http', 'https');
                                }
                            });
                            //displayUberProductsPopup(products);
                            $scope.openModal();
                        }, function (error) {
                            //$scope.processing = false;
                            genericService.hideLoading();
                            //displayModal('Sorry, we appear to be having errors', "Please try again. If you're still having problems, please contact us.");
                            genericService.showAlert('Error', 'Please try again. If you\'re still having problems, please contact us.', function () { });
                            //modalService.showAppError();
                        });
                } else {
                    $log.info('address not ready');
                }
            }

            /*
            function displayUberProductsPopup(products) {
                // Populate the modal popup content
                var modal = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: 'appThrivor/shared/modal_uber.html'
                };
                var modalOptions = {
                    headerText: 'Uber',
                    bodyText: 'Select services: ',
                    products: products,
                    selectUberProduct: selectUberProduct
                };
                //modalService.showModal(modal, modalOptions).then(function (modal) {
                //    //var productId = modal.product_id;
                //    //selectUberProduct(productId);
                //});
            }*/

            function selectUberProduct(id) {
                $scope.closeModal(); // close the modal
                storageService.set('uberProductId', id);
                storageService.set('uberCurrentAddress', JSON.stringify({ address: $scope.address.current, geo: $scope.address.currentGeolocation }));
                storageService.set('uberDestinationAddress', JSON.stringify({ address: $scope.address.destination, geo: $scope.address.destinationGelocation }));

                window.location.href = transportService.uberOAuth();
            }

            function cleanUberStorage() {

                storageService.remove('uberCode');
                storageService.remove('uberProductId');
                storageService.remove('uberCurrentAddress');
                storageService.remove('uberDestinationAddress');
            }

            function confirmUberRequest() {
                //$scope.processing = true;
                genericService.showLoading('uber...');
                // refresh token
                transportService.apiRefreshToken($scope.refreshToken)
                    .then(function (result) {
                        $scope.accessToken = result.data.access_token;
                        $scope.refreshToken = result.data.refresh_token;

                        transportService.uberMakeRequest(productId, $scope.address.currentGeolocation, $scope.address.destinationGelocation, $scope.accessToken)
                            .then(function (result) {
                                //$scope.processing = false;
                                genericService.hideLoading();
                                var data = result.data;
                                $scope.requestId = data.request_id;
                                storageService.set('uberRequestId', $scope.requestId);
                                genericService.showAlert('Uber Status', data.status, function () {
                                    doneRequest();
                                }); 
                            }, function (err) {
                                //$scope.processing = false;
                                genericService.hideLoading();
                                // may 409 conflict as you have the exist request
                                $log.error('Uber: problem making request.');
                                //alert(err.statusText + ' - ' + err.data.errors[0].title);
                                genericService.showAlert(err.statusText, err.data.errors[0].title, function () {
                                    doneRequest();
                                });
                            });

                    }, function (err) {
                        //displayModal('Sorry, we appear to be having errors', "Please try again. If you're still having problems, please contact us.");
                        genericService.showAlert('Error', 'Please try again. If you\'re still having problems, please contact us.', function () { });
                    });
            }

            function doneRequest() {
                cleanUberStorage();
                //window.location.href = '/#/transport'; // need 'thrivorwebtest' for staging..
                $state.go('dashboard.transport');
            }

            function codeLatLng(lat, lng) {
                var latlng = new google.maps.LatLng(lat, lng);
                geo.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        $scope.address = {
                            current: results[0].formatted_address
                        }
                    } else {
                        //alert("Geocode was not successful for the following reason: " + status);
                        //displayModal('Sorry, we appear to be having errors', "Please try again. If you're still having problems, please contact us.");
                        genericService.showAlert('Error', 'Please try again. If you\'re still having problems, please contact us.', function () { });
                    }
                });
            }

            function goBack() {
                cleanUberStorage();
                //$rootScope.goBack();
                $state.go('dashboard.transport');
            }

        }]);
})();