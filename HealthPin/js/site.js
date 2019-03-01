$(document).ready(loadlocation);

function loadlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                //do succes handling
                initialize(position.coords.latitude, position.coords.longitude);
            },
            function errorCallback(error) {
                //do error handling
            },
            {
                maximumAge:Infinity,
                timeout:5000
            }
        );
    } else {
        initialize(-37.813611, 144.963056);
    }
}

function initialize(lat, lng) {

    var apikey = 'AIzaSyCr5tneICjc77TVKJMVUr0rVw0uryDy4gI';

    var melbourne_center = new google.maps.LatLng(lat, lng);

    var mapOptions = {
        center: melbourne_center,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var geocoder = new google.maps.Geocoder();

    var infowindow = new google.maps.InfoWindow();

    var content = document.createElement('div');

    var markersArray = [];

    var counter = 0;

    $.getJSON("data/healthengine.json", function (data) {
        var promise = data.map(function (item) {
            if (item.data_type === "Practice") {
                counter++;
                geocodeAPI(item);
            };
        });
    });

    function geocodeAPI(item) {
        var geocodeAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json'
        var query = geocodeAPIUrl + '?address=' + item.s_address + '&key=' + apikey;
        $.getJSON(query, function (data) {
            if (data.status === 'OK') {
                createMarker(data.results[0], item);

            } else {
                toastr.warning('Geocode was not successful for the following reason: ' + status);

            }
        }).always(function () {
            counter--;
            if (counter == 0) {
                var markerCluster = new MarkerClusterer(map, markersArray, {
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                });
            }
        })
    }

    function createMarker(geodata, item) {
        var marker = new google.maps.Marker({
            position: geodata.geometry.location,
            label: 'B',
            map: map
        });

        var content = document.createElement('div');
        content.innerHTML =
            '<h6>' + item.s_clinic_name + '</h6>' +
            '<div><i class="fas fa-clinic-medical" style="font-size: 1em; color: Tomato;"></i> &nbsp;' +
            geodata.formatted_address +
            '</div>' +
            '<div><i class="fas fa-phone" style="font-size: 1em; color: Tomato;"></i> &nbsp;' +
            item.s_phone +
            '</div>';

        var html_card = $('div#marker_card').html().replace('__placeholder__', content.innerHTML);

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.close();
            infowindow.setContent(html_card);
            infowindow.open(map, marker);
        })

        markersArray.push(marker);
    }

    // clean markers
    function clearOverlays() {
        for (var i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
    }

}