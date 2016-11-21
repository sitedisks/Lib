'use strict';

var hostedApp001 = angular.module('hostedApp', ['ngRoute']);

hostedApp001.config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'cordovaApp/home/home.html',
            controller: 'homeController'
        })
        .when('/contact', {
            templateUrl: 'cordovaApp/contact/contact.html',
            controller: 'contactController'
        })
        .when('/calendar', {
            templateUrl: 'cordovaApp/calendar/calendar.html',
            controller: 'calendarController'
        });

    $locationProvider.html5Mode(false);
}