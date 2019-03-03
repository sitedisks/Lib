$(document).ready(loadlocation);

function loadlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                //do succes handling
                initialize(position.coords.latitude, position.coords.longitude);
            },
            function errorCallback(error) {
                //do error handling
            },
            {
                maximumAge: Infinity,
                timeout: 5000
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
        zoomControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        rotateControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var infowindow = new google.maps.InfoWindow();

    var content = document.createElement('div');

    var markersArray = [];

    var counter = 0;

    $.getJSON("data/healthengine.1.json", function (data) {
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
        });

        marker.setMap(map)

        content.innerHTML = '<h5>' + item.s_clinic_name + '</h5>'
            + '<hr class="marker-divider">'
            + '<table>'
            + '<tr>'
            + '<td><i class="fas fa-clinic-medical" style="font-size: 1em; color: #78C2AD;"></i></td>'
            + '<td>' + item.s_address + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td><i class="fas fa-phone" style="font-size: 1em; color: #78C2AD;"></i></td>'
            + '<td>' + item.s_phone + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td style="width: 20%; padding-top: 10px"><i class="fas fa-hospital-symbol" style="font-size: 1em; color: #78C2AD;"></i></td>'
            + '<td style="width: 80%; padding-top: 10px">' + item.s_specialties + '</td>'
            + '</tr>'
            + '</table>'
            + '<hr class="marker-divider">'
            + '<div class="star-rating py-1" style="color: #FFCE67">'
            + '<span class="fas fa-star"></span>'
            + '<span class="fas fa-star"></span>'
            + '<span class="fas fa-star"></span>'
            + '<span class="fas fa-star"></span>'
            + '<span class="far fa-star"></span>'
            + '</div>'
            + '<small class="text-muted pr-3">'
            + '<i class="far fa-share-square"></i> 34'
            + '</small>'
            + '<small class="text-muted pr-3">'
            + '<i class="far fa-comment-dots"></i> 87'
            + '</small>'
            + '<small class="text-muted pr-3">'
            + '<i class="far fa-thumbs-up"></i> 28'
            + '</small>'

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