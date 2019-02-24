$(document).ready(initialize);

function initialize() {

    var apikey = 'AIzaSyCr5tneICjc77TVKJMVUr0rVw0uryDy4gI';

    var lat = -37.813611,
        lng = 144.963056;
    // {lat: -37.813611, lng: 144.963056}
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

    $.getJSON("data/healthengine.json", function (data) {
        data.forEach(function (item) {
            if (item.data_type === "Practice") {
                //geocodeAddress(item);
                geocodeAPI(item);
            };

        })
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
        })
    }

    // This has limitation!
    function geocodeAddress(item) {
        geocoder.geocode({
            'address': item.s_address
        }, function (results, status) {
            if (status === 'OK') {
                createMarker(results[0], item);
            } else {
                toastr.warning('Geocode was not successful for the following reason: ' + status);
            }
        })
    }

    function createMarker(geodata, item) {
        var marker = new google.maps.Marker({
            position: geodata.geometry.location,
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

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.close();
            infowindow.setContent(content);
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