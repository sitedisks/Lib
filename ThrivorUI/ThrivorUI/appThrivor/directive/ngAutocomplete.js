'use strict';

/**
 * A directive for adding google places autocomplete to a text box
 * google places autocomplete info: https://developers.google.com/maps/documentation/javascript/places
 *
 * Usage:
 *
 * + ng-model - autocomplete textbox value
 *
 * + details - more detailed autocomplete result, includes address parts, latlng, etc. (Optional)
 *
 * + options - configuration for the autocomplete (Optional)
 *
 *       + types: type,        String, values can be 'geocode', 'establishment', '(regions)', or '(cities)'
 *       + bounds: bounds,     Google maps LatLngBounds Object, biases results to bounds, but may return results outside these bounds
 *       + country: country    String, ISO 3166-1 Alpha-2 compatible country code. examples; 'ca', 'us', 'gb'
 *       + watchEnter:         Boolean, true; on Enter select top autocomplete result. false(default); enter ends autocomplete
 *
 * example:
 *
 *    options = {
 *        types: '(cities)',
 *        country: 'ca'
 *    }
**/

appThrivor.directive('ngAutocompleteAddress', function () {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            options: '=?',
            details: '=?',
            filteredAddress: '=?'
        },

        link: function (scope, element, attrs, controller) {

            //options for autocomplete
            var opts;
            var watchEnter = false;
            //convert options provided to opts
            var initOpts = function () {

                opts = {}
                if (scope.options) {

                    if (scope.options.watchEnter !== true) {
                        watchEnter = false;
                    } else {
                        watchEnter = true;
                    }

                    if (scope.options.types) {
                        opts.types = [];
                        opts.types.push(scope.options.types);
                        scope.gPlace.setTypes(opts.types);
                    } else {
                        scope.gPlace.setTypes([]);
                    }

                    if (scope.options.bounds) {
                        opts.bounds = scope.options.bounds;
                        scope.gPlace.setBounds(opts.bounds);
                    } else {
                        scope.gPlace.setBounds(null);
                    }

                    if (scope.options.country) {
                        opts.componentRestrictions = {
                            country: scope.options.country
                        }
                        scope.gPlace.setComponentRestrictions(opts.componentRestrictions);
                    } else {
                        scope.gPlace.setComponentRestrictions(null);
                    }
                }
            }

            if (scope.gPlace == undefined) {
                scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
            }
            google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                var result = scope.gPlace.getPlace();
                if (result !== undefined && result.address_components !== undefined) {

                    if (watchEnter) {
                        getPlace(result);
                    }
                }

                //if (result.address_components !== undefined) {

                //    scope.$apply(function () {

                //        scope.details = result;

                //        controller.$setViewValue(element.val());
                //    });
                //}
                //else {
                //    if (watchEnter) {
                //        getPlace(result);
                //    }
                //}
                //}
            })

            //function to get retrieve the autocompletes first result using the AutocompleteService 
            var getPlace = function (result) {
                var autocompleteService = new google.maps.places.AutocompleteService();
                if (result.name.length > 0) {
                    autocompleteService.getPlacePredictions(
                      {
                          input: result.name,
                          offset: result.name.length
                      },
                      function listentoresult(list, status) {
                          if (list == null || list.length == 0) {

                              scope.$apply(function () {
                                  scope.details = null;
                              });

                          } else {
                              var placesService = new google.maps.places.PlacesService(element[0]);
                              placesService.getDetails(
                                { 'reference': list[0].reference },
                                function detailsresult(detailsResult, placesServiceStatus) {

                                    if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                                        scope.$apply(function () {

                                            controller.$setViewValue(detailsResult.formatted_address);
                                            element.val(detailsResult.formatted_address);

                                            scope.details = detailsResult;


                                            var filteredAddress = {
                                                street_number: 'short_name',
                                                route: 'long_name',
                                                locality: 'long_name',
                                                administrative_area_level_1: 'short_name',
                                                country: 'long_name',
                                                postal_code: 'short_name',
                                                location: scope.details.geometry.location
                                            };

                                            for (var i = 0; i < detailsResult.address_components.length; i++) {
                                                var addressType = detailsResult.address_components[i].types[0];
                                                if (filteredAddress[addressType]) {
                                                    var val = detailsResult.address_components[i][filteredAddress[addressType]];
                                                    filteredAddress[addressType] = val;
                                                }
                                            }

                                            scope.details.filteredAddress = filteredAddress;

                                            //on focusout the value reverts, need to set it again.
                                            var watchFocusOut = element.on('focusout', function (event) {
                                                element.val(detailsResult.formatted_address);
                                                element.unbind('focusout');

                                            });

                                            var evt = document.createEvent("CustomEvent");
                                            evt.initCustomEvent("onLocationSet", true, true, { "elementId": element[0].id, "filteredAddress": filteredAddress });
                                            window.dispatchEvent(evt);

                                        });
                                    }
                                }
                              );
                          }
                      });
                }
            }

            controller.$render = function () {
                var location = controller.$viewValue;
                element.val(location);
            };

            //watch options provided to directive
            scope.watchOptions = function () {
                return scope.options;
            };
            scope.$watch(scope.watchOptions, function () {
                initOpts();
            }, true);

        }
    };
}).directive('ngAutocomplete', ['$parse',
    function ($parse) {

        function convertPlaceToFriendlyObject(place) {

            var componentForm = {
                street_number: 'short_name',
                route: 'short_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'long_name',
                postal_code: 'short_name'
            };

            var result = undefined;
            if (place) {
                result = {};
                for (var i = 0, l = place.address_components.length; i < l; i++) {
                    var type = place.address_components[i].types[0];
                    if (i == 0) {
                        result.searchedBy = type;
                    }
                    result[type] = place.address_components[i][componentForm[type]];
                }
                result.formattedAddress = place.formatted_address;
                result.lat = place.geometry.location.lat();
                result.lng = place.geometry.location.lng();
            }
            return result;
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, $element, $attrs, $ctrl) {
                if (!angular.isDefined($attrs.details)) {
                    throw '<ng-autocomplete> must have attribute [details] assigned to store full address object';
                }

                var getDetails = $parse($attrs.details);
                var setDetails = getDetails.assign;
                var getOptions = $parse($attrs.options);
                var googleServiceTested = false;
                var googleServiceWorks = false;

                //options for autocomplete
                var opts;

                //convert options provided to opts
                var initOpts = function () {
                    opts = {};
                    if (angular.isDefined($attrs.options)) {
                        var options = getOptions($scope);
                        if (options.types) {
                            opts.types = [];
                            opts.types.push(options.types);
                        }
                        if (options.bounds) {
                            opts.bounds = options.bounds;
                        }
                        if (options.country) {
                            opts.componentRestrictions = {
                                country: options.country
                            };
                        }
                    }
                };

                var testGoogleService = function (cb) {
                    if (!googleServiceTested) {
                        var service = new google.maps.places.AutocompleteService();
                        service.getPlacePredictions({ input: 'Phoenix' }, function (predictions, status) {
                            googleServiceTested = true;
                            googleServiceWorks = status == google.maps.places.PlacesServiceStatus.OK;
                            cb();
                        });
                    } else {
                        cb();
                    }
                }

                //create new autocomplete
                //reinitializes on every change of the options provided
                var newAutocomplete = function () {
                    testGoogleService(function () {
                        if (googleServiceWorks) {
                            var gPlace = new google.maps.places.Autocomplete($element[0], opts);
                            google.maps.event.addListener(gPlace, 'place_changed', function () {
                                $scope.$apply(function () {
                                    var place = gPlace.getPlace();
                                    var details = convertPlaceToFriendlyObject(place);
                                    setDetails($scope, details);
                                    $ctrl.$setViewValue(details.formattedAddress);
                                    $ctrl.$validate();
                                });
                                if ($ctrl.$valid && angular.isDefined($attrs.validateFn)) {
                                    $scope.$apply(function () {
                                        $scope.$eval($attrs.validateFn);
                                    });
                                }
                            });
                        }
                    });
                };

                newAutocomplete();

                $ctrl.$validators.parse = function (value) {
                    if (googleServiceWorks) {
                        var details = getDetails($scope);
                        var valid = ($attrs.required == true && details != undefined && details.lat != undefined) ||
                        (!$attrs.required && (details == undefined || details.lat == undefined) && $element.val() != '');
                        return valid;
                    } else {
                        return true;
                    }
                };

                $element.on('keypress', function (e) {
                    // prevent form submission on pressing Enter as there could be more inputs to fill out
                    if (e.which == 13) {
                        e.preventDefault();
                    }
                });

                //watch options provided to directive
                if (angular.isDefined($attrs.options)) {
                    $scope.$watch($attrs.options, function () {
                        initOpts();
                        newAutocomplete();
                    });
                }

                // user typed something in the input - means an intention to change address, which is why
                // we need to null out all fields for fresh validation
                $element.on('keyup', function (e) {
                    if (googleServiceWorks) {
                        //          chars 0-9, a-z                        numpad 0-9                   backspace         delete           space
                        if ((e.which >= 48 && e.which <= 90) || (e.which >= 96 && e.which <= 105) || e.which == 8 || e.which == 46 || e.which == 32) {
                            var details = getDetails($scope);
                            if (details != undefined) {
                                for (var property in details) {
                                    if (details.hasOwnProperty(property) && property != 'formattedAddress') {
                                        delete details[property];
                                    }
                                }
                                setDetails($scope, details);
                            }
                            if ($ctrl.$valid) {
                                $scope.$apply(function () {
                                    $ctrl.$setValidity('parse', false);
                                });
                            }
                        }
                    }
                });
            }
        };
    }
]);