(function () {
    'use strick';
    angular.module('choriceApp').constant("endpoint", {
        "ipaddress": "http://www.lowata.com.au/tohowapi/ipaddress",
        "geoip": "http://freegeoip.net/json/",
        "localAPI": "http://localhost:5613/"
    });

})();