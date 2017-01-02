(function () {
    'use strict';

    var app = angular.module('chatApp', []);

    app.controller('chatCtrl', ['$scope', function ($scope) {

        //var chat = $.connection.ThrivorHub;
        var connection = $.hubConnection();
        var chat = connection.createHubProxy('ThrivorHub');

        $scope.name = 'Guest';
        $scope.message = '';
        $scope.messages = []; // collection of messages coming from server
        $scope.chatHub = null; // holds the reference to hub


        //$.connection.hub.start(); // start the hub
        connection.start();

        $scope.newMessage = newMessage;

        //chat.client.broadcastMessage = broadcastMessage;
        chat.on('broadcastMessage', broadcastMessage);

        function broadcastMessage(name, message) {
            $scope.$apply(function () {
                $scope.messages.push(name + ' say: ' + message);
            });
        }

        function newMessage() {
            //Client invocation of server method MyServerFunc();
            //chat.server.sendMessage($scope.name, $scope.message);
            chat.invoke('sendMessage', $scope.name, $scope.message);
            $scope.message = '';
        }



    }]);
})();