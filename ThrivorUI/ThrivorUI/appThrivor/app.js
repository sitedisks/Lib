// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
'use strict';

var appThrivor = angular.module('appThrivor', [
    'ionic',
    'ion-google-autocomplete',
    'ngTagsInput',
    'isteven-multi-select',
    'ngSanitize',
    'angularMoment',
    'thrivor.controllers'])

.run(['$ionicPlatform', '$rootScope', '$state', function ($ionicPlatform, $rootScope, $state) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        $rootScope.$on('unauthorized', function() {
            $state.go('signIn');
        });

        /* Todo: add not found page
        $rootScope.$on('unfound', function() {
            $state.go('notFound');
        });
        */
    });
}]);
