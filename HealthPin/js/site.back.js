$(document).ready(initialize);

function initialize() {

    var currentLat = -37.813611,
        currentLng = 144.963056;
    var UserId = 88888,
        Token = 'cwancwancwancwan0';
    // current pin blue
    var pinColor = "0073e5";

    var latlng = new google.maps.LatLng(currentLat, currentLng); // initial melbourne
    var howclose = 1000;
    //var endpoint = "http://localhost:2325";
    //var mysqlpoint = "http://localhost:9113";
    var endpoint = "http://pinpieceapi.azurewebsites.net";
    var mysqlpoint = "http://geogoapi.azurewebsites.net";

    var mapOptions = {
        zoom: 13,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map($('#map')[0], mapOptions);
    var infowindow = new google.maps.InfoWindow();
    var markersArray = [];
    var bounds = new google.maps.LatLngBounds();


    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(31.5, 51)
    );

    var meMarker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: true,
        icon: pinImage,
        infowindow: infowindow
    });

    // webapi add button to infowindow
    var content = document.createElement('div');
    content.innerHTML = '<h4>Move me and Pin Message : ></h4><br/><textarea class="form-control" id="pin_message" rows="4" cols="50"></textarea><br/>';
    var button = content.appendChild(document.createElement('input'));
    button.type = 'button';
    button.value = 'Pin It!';
    button.classList.add('btn');
    button.classList.add('btn-success');

    google.maps.event.addDomListener(button, 'click', function () {
        postPin();
    });
    // end webapi button

    google.maps.event.addListener(meMarker, 'click', function () {
        this.infowindow.setContent(content);
        this.infowindow.open(map, this);
    });


    // end current pin blue

    // drag - relocation
    google.maps.event.addListener(meMarker, "dragend", function (event) {
        bounds = new google.maps.LatLngBounds();
        currentLat = event.latLng.lat();
        currentLng = event.latLng.lng();
        toastr.success('Lat: ' + currentLat + ', Lng:' + currentLng);

        clearOverlays(); // clean markers

        var reload = {
            "UserId": UserId,
            "Token": Token,
            "Coord": {
                "lng": currentLng,
                "lat": currentLat
            }
        };

        $.post(endpoint + "/pins/reload", reload, function (data) {

            if (data.length > 0) {
                for (i = 0; i < data.length; i++) {
                    addMarker(data[i]);
                }
                map.setCenter(bounds.getCenter());
                //map.fitBounds(bounds);
                // map.setZoom(map.getZoom() - 1);
            }

        });

    });

    // initial screen 

    $.get(endpoint + "/pins/all", function (data) {
        for (i = 0; i < data.length; i++) {
            addMarker(data[i]);
        }
    });


    // add markers (pin)
    function addMarker(pin) {
        var readPinColor = '5cb85c';
        var readPinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + readPinColor,
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new google.maps.Size(31.5, 51)
        );

        var markerLatLng = new google.maps.LatLng(pin.Latitude, pin.Longitude);
        bounds.extend(markerLatLng);

        var tipHtml = "<h5>Pin Piece:</h5> User:" + pin.UserId + "<h5>Token:" + pin.Token + "</h5><br/>What been told: " + pin.Text;
        if (pin.Distance) {
            if (pin.IsReadable)
                tipHtml += "<h4>Readable</h4>";
            else {
                tipHtml += "<h4>Too far wasy, distance: " + pin.Distance + " M</h4>";
            }
        }

        if (pin.IsReadable) {

            var marker = new google.maps.Marker({
                position: markerLatLng,
                map: map,
                title: pin.Token,
                icon: readPinImage,
                infowindow: infowindow
            });
        } else {
            var marker = new google.maps.Marker({
                position: markerLatLng,
                map: map,
                title: pin.Token,

                infowindow: infowindow
            });
        }


        google.maps.event.addListener(marker, 'click', function () {
            this.infowindow.setContent(tipHtml);
            this.infowindow.open(map, this);
        });

        markersArray.push(marker);

    }

    // clean markers
    function clearOverlays() {
        for (var i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
    }

    function postPin() {
        var message = $('#pin_message').val();
        //toastr.warning('Lat: ' + currentLat + ', Lng:' + currentLng, message);
        var pin = {
            //"PinId": randomPinId(),
            //"UserId": UserId,
            "Token": Token,
            "Longitude": currentLng,
            "Latitude": currentLat,
            "Text": message,
            "IsPrivate": false
        };

        $.post(mysqlpoint + "/pin", pin, function (data) {

            toastr.success('New Pin Added!');
            addMarker(data);
        });

    }


    // random values
    function randomPinId() {
        return parseInt(Math.random() * 1000000);
    }

    function randomGender() {
        if (parseInt(Math.random() * 10 % 2) == 1) {
            return 'F';
        } else {
            return 'M';
        }
    }

}