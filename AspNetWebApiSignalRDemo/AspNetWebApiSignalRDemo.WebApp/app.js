'use strict';

angular.module("AspNetWebApiSignalRDemo", [])

.service("SignalrService", function () {
    var notificationHubProxy = null;

    this.initialize = function () {
        $.connection.hub.logging = true;
        $.connection.hub.url = 'http://localhost:12345/api/signalr';
        notificationHubProxy = $.connection.notificationHub;

        notificationHubProxy.client.hello = function () {
            console.log("Hello from ASP.NET Web API");
        };

        $.connection.hub.start().done(function () {
            console.log("started");
        }).fail(function (result) {
            console.log(result);
        });
    };
})

.controller("AppController", ["SignalrService", function (SignalrService) {
    SignalrService.initialize();
}]);