// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
'use strict';

angular.module('appThrivor', ['ionic', 'thrivor.controllers'])

.run(function ($ionicPlatform) {
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
    });
})

.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider

    .state('main', {
        url: '/',
        templateUrl: 'appThrivor/onboarding/main.html'
    })

    .state('signIn', {
        url: '/signin',
        templateUrl: 'appThrivor/onboarding/signIn.html'
    })

    .state('signUp', {
        url: '/signup',
        abstract: true,
        templateUrl: 'appThrivor/onboarding/signUp.html'
    })
    
    .state('signUp.step1', {
        url: '/step1',
        views: {
            'sign-up': {
                templateUrl: 'appThrivor/onboarding/signUp1.html'
            }
        }
    })

    .state('signUp.step2', {
        url: '/step2',
        views: {
            'sign-up': {
                templateUrl: 'appThrivor/onboarding/signUp2.html'
            }
        }
    })

    .state('signUp.step3', {
        url: '/step3',
        views: {
            'sign-up': {
                templateUrl: 'appThrivor/onboarding/signUp3.html'
            }
        }
    })

    .state('signUp.step4', {
        url: '/step4',
        views: {
            'sign-up': {
                templateUrl: 'appThrivor/onboarding/signUp4.html'
            }
        }
    })
        //** old
    .state('root', {
        url: '/root',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('root.dashboard', {
        url: '/dashboard',
        views: {
            'menuContent': {
                templateUrl: 'appThrivor/onboarding/dashboard.html'
            }
        }
    })

    .state('root.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('root.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html'
            }
        }
    })
      .state('root.playlists', {
          url: '/playlists',
          views: {
              'menuContent': {
                  templateUrl: 'templates/playlists.html',
                  controller: 'PlaylistsCtrl'
              }
          }
      })

    .state('root.single', {
        url: '/playlists/:playlistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/main');

    $locationProvider.html5Mode(true);
});
