$(document).ready(loadlocation);

function loadlocation() {
    initialize(-37.813611, 144.963056);
    /*
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
    }*/
}

function initialize(lat, lng) {

    var apikey = 'AIzaSyCr5tneICjc77TVKJMVUr0rVw0uryDy4gI'; //Google Geocoding API Key

    var map = new BMap.Map('map');
    var point = new BMap.Point(lng, lat);
    map.centerAndZoom(point, 13);
    map.enableScrollWheelZoom(true);

    var infowindow = new BMap.InfoWindow();

    var markersArray = [];

    var counter = 0;

    $.getJSON("data/healthengine_geo.json", function (data) {
        var promise = data.map(function (item) {
            if (item.data_type === "Practice") {
                counter++;
                // geocodeAPI(item);
                createMarker(item);
            };
        });
        
        var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markersArray});
        map.reset();
    });

    function geocodeAPI(item) {
        var geocodeAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json'
        var query = geocodeAPIUrl + '?address=' + item.s_address + '&key=' + apikey;
        $.getJSON(query, function (data) {
            if (data.status === 'OK') {
                createMarker(item, data.results[0]);
            } else {
                toastr.warning('Geocode was not successful for the following reason: ' + status);

            }
        }).always(function () {
            counter--;
            // Baidu marker cluster todo
            var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markersArray});
        })
    }

    function createMarker(item, geodata) {
        if(geodata)
            var markerPoint = new BMap.Point(geodata.geometry.location.lng, geodata.geometry.location.lat);
        else 
            var markerPoint = new BMap.Point(item.lng, item.lat);

        var marker = new BMap.Marker(markerPoint);
        map.addOverlay(marker);

        var content = document.createElement('div');
        content.innerHTML = '<h4>' + item.s_clinic_name + '</h4>'
            // + '<hr class="marker-divider">'
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
            + '<span class="fas fa-star" style="padding-right: 5px"></span>'
            + '<span class="fas fa-star" style="padding-right: 5px"></span>'
            + '<span class="fas fa-star" style="padding-right: 5px"></span>'
            + '<span class="fas fa-star" style="padding-right: 5px"></span>'
            + '<span class="far fa-star"></span>'
            + '</div>'
            + '<span class="text-muted" style="padding-right: 10px">'
            + '<i class="far fa-share-square"></i> 34'
            + '</span>'
            + '<span class="text-muted" style="padding-right: 10px">'
            + '<i class="far fa-comment-dots"></i> 87'
            + '</span>'
            + '<span class="text-muted">'
            + '<i class="far fa-thumbs-up"></i> 28'
            + '</span>'

        var html_card = $('div#marker_card').html().replace('__placeholder__', content.innerHTML);

        marker.addEventListener('click', function () {
            infowindow.setTitle('<div style="padding:6px;"></div>');
            infowindow.setContent(html_card);
            map.openInfoWindow(infowindow, markerPoint);
        });

        markersArray.push(marker);
    }


}