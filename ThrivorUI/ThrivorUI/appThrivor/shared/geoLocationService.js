(function () {
    'use strict';

    appThrivor.factory("geoLocationService",['$rootScope', function ($rootScope) {

        var geoLocationService = {};

        geoLocationService.notify = function(geoLocationData) {
            //console.log("geoLocationData:" + geoLocationData);
            $rootScope.$emit('geoLocationFoundEvent', geoLocationData);
        }

        function placeLookupByIdCallback(place, status) {

            if (status === google.maps.places.PlacesServiceStatus.OK) {
                //console.log("place address callback - " + JSON.stringify(place));

                var filteredAddress = {
                    street_number: 'short_name',
                    route: 'long_name',
                    locality: 'long_name',
                    administrative_area_level_1: 'short_name',
                    country: 'long_name',
                    postal_code: 'short_name'
                    
                };

                for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    if (filteredAddress[addressType]) {
                        var val = place.address_components[i][filteredAddress[addressType]];
                        filteredAddress[addressType] = val;
                    }
                }

                if (filteredAddress.street_number === 'short_name') {
                    filteredAddress.street_number = '';
                }
            
                if (filteredAddress.route === 'long_name') {
                    filteredAddress.route = '';
                }

                if (filteredAddress.locality === 'long_name') {
                    filteredAddress.locality = '';
                }

                if (filteredAddress.administrative_area_level_1 === 'short_name') {
                    filteredAddress.administrative_area_level_1 = '';
                }

                if (filteredAddress.country === 'long_name') {
                    filteredAddress.country = '';
                }

                if (filteredAddress.postal_code === 'short_name') {
                    filteredAddress.postal_code = '';
                }

                geoLocationService.notify(filteredAddress);
            }
        }

        function onNearbySearchCallback(results, status) {
            //console.log("entererd onNearbySearchCallback");
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                //console.log("nearby search results:" + JSON.stringify(results));
                if (results.length) {

                    var request = {
                        placeId: results[0].place_id
                    };

                    var map = document.createElement('map');
                    var service = new google.maps.places.PlacesService(map);
                    service.getDetails(request, placeLookupByIdCallback);
                }
            }
        }

        function onGeolocationSuccess(position) {
            

            var coordinates = position.coords;

            console.log('Your current position is:');
            console.log('Latitude : ' + coordinates.latitude);
            console.log('Longitude: ' + coordinates.longitude);
            console.log('More or less ' + coordinates.accuracy + ' meters.');  

            var co = {
                lat: coordinates.latitude,
                lng: coordinates.longitude
            };

            var map = document.createElement('map');
            var service = new google.maps.places.PlacesService(map);
            var request = {
                location: co,
                radius : 500
            };
            service.nearbySearch(request, onNearbySearchCallback);
            service.getDetails(request, onNearbySearchCallback);

            
            map = new google.maps.Map(document.getElementById('map'), {
                center: co,
                zoom: 12
            });
            
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
        }

        function onGeolocationError(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);

            if (err.code === 1) {
                //alert("Error: Access is denied!");
            }

            else if (err.code === 2) {
                //alert("Error: Position is unavailable!");
            }
        }

        geoLocationService.getCurrentLocation = function (scope, successCallback,errorCallback) {

            var handler = $rootScope.$on('geoLocationFoundEvent', successCallback);
            scope.$on('$destroy', handler);

            if (navigator.geolocation) {
                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };

                navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError, options);
            }
        };

        return geoLocationService;
    }]);
})();