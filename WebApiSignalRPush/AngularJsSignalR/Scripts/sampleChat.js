(function () {
    'use strict';

    var app = angular.module('chatApp', []);

    app.controller('chatCtrl', ['$scope', function ($scope) {

        var chat = $.connection.ThrivorHub;

        $scope.name = 'Guest';
        $scope.message = '';
        $scope.messages = []; // collection of messages coming from server
        $scope.chatHub = null; // holds the reference to hub

     
        $.connection.hub.start(); // start the hub

        $scope.newMessage = newMessage;

        chat.client.broadcastMessage = broadcastMessage;

        function broadcastMessage(name, message) {
            $scope.$apply(function () {
                $scope.messages.push(name + ' say: ' + message);
            });
        }

        function newMessage() {
            chat.server.sendMessage($scope.name, $scope.message);
            $scope.message = '';
        }

        //$.connection.hub
        //$.connection.client  == on
        //$.connection.server  == invoke

    }]);
})();