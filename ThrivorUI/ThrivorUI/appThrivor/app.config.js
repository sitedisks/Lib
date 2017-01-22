(function () {
    'use strict';

    appThrivor.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', '$compileProvider', '$ionicConfigProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $compileProvider, $ionicConfigProvider) {
            $httpProvider.interceptors.push('interceptorSvc'); // Set the global $http interceptor - http header
            // loading local resource from mobile
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content|cdvfile):|data:image\//);
            $ionicConfigProvider.tabs.position('bottom');
            $ionicConfigProvider.backButton.icon('button-clear'); // to remove the arrow

            $stateProvider

            // uber token hack
            .state('token', {
                url: '/?code={access_token}',
                templateUrl: 'appThrivor/transport/token.html',
                controller: 'tokenCtrl'
            })
            // onboarding
            .state('main', {
                url: '/main',
                templateUrl: 'appThrivor/onboarding/main.html',
                controller: 'mainCtrl',
                params: { userName: null }
            })
            .state('signIn', {
                url: '/signin',
                templateUrl: 'appThrivor/onboarding/signIn.html',
                controller: 'signInCtrl',
                params: { userName: null }
            })
            .state('signInEmail', {
                url: '/signinemail',
                templateUrl: 'appThrivor/onboarding/signIn_email.html',
                controller: 'signInCtrl',
                params: { userName: null }
            })
            .state('retrievePasscode', {
                url: '/retrievepasscode',
                templateUrl: 'appThrivor/onboarding/retrievePasscode.html',
                controller: 'retrievePasscodeCtrl',
                params: { userName: null }
            })
            .state('signUp', {
                url: '/signup',
                abstract: true,
                templateUrl: 'appThrivor/onboarding/signUp.html',
                controller: 'signUpCtrl',
                params: { userType: null }
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
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'appThrivor/onboarding/welcome.html',
                controller: 'welcomeCtrl',
                params: { inviteKey: null }
            })

            // dashboard.home
            .state('dashboard', {
                url: '',
                abstract: true,
                templateUrl: 'appThrivor/dashboard/menu.html',
                controller: 'dashboardCtrl'
            })
            .state('dashboard.home', {
                url: '/home',
                views: {
                    'tab-dashboard': {
                        templateUrl: 'appThrivor/dashboard/home.html',
                        controller: 'homeCtrl'
                    }
                }
            })

            // dashboard.support
            .state('dashboard.support', {
                url: '/support',
                views: {
                    'tab-support': {
                        templateUrl: 'appThrivor/support/support.html',
                        controller: 'supportController'
                    }
                }
            })
            .state('dashboard.support.crew', {
                url: '/crew',
                views: {
                    'tab-support@dashboard': {
                        templateUrl: 'appThrivor/support/supportCrew.html',
                        controller: 'supportCrewCtrl'
                    }
                }
            })
            .state('dashboard.support.crew.invite', {
                url: '/invite',
                views: {
                    'tab-support@dashboard': {
                        templateUrl: 'appThrivor/support/supportCrewInvite.html',
                        controller: 'supportCrewInviteCtrl'
                    }
                }
            })
            .state('dashboard.support.gifts', {
                url: '/gifts',
                views: {
                    'tab-support@dashboard': {
                        templateUrl: 'appThrivor/support/gifts.html'
                    }
                }
            })

            // dashboard.gifts
            .state('dashboard.gifts', {
                url: '/gifts',
                views: {
                    'tab-gifts': {
                        templateUrl: 'appThrivor/support/gifts.html'
                    }
                }
            })

            // dashboard.appointments
            .state('dashboard.appointments', {
                url: '/appointments',
                views: {
                    'tab-appointments': {
                        templateUrl: 'appThrivor/appointments/appointments.html',
                        controller: 'appointmentCtrl'
                    }
                }
            })
            .state('dashboard.appointments.details', {
                url: '/details',
                views: {
                    'tab-appointments@dashboard': {
                        templateUrl: 'appThrivor/appointments/appointmentDetails.html',
                        controller: 'appointmentDetailsCtrl'
                    }
                }
            })

            // dashboard.transport
            .state('dashboard.transport', {
                url: '/transport',
                views: {
                    'tab-transport': {
                        templateUrl: 'appThrivor/transport/transport.html',
                        controller: 'transportController'
                    }
                }
            })
            .state('dashboard.transport.uber', {
                url: '/uber',
                views: {
                    'tab-transport@dashboard': {
                        templateUrl: 'appThrivor/transport/transportUber.html',
                        controller: 'transportUberController'
                    }
                }
            })

            // dashboard.jobs
            .state('dashboard.jobs', {
                url: '/jobs',
                views: {
                    'tab-jobs': {
                        templateUrl: 'appThrivor/jobs/jobs.html',
                        controller: 'jobsCtrl'
                    }
                },
                params: { type: null }
            })
            .state('dashboard.jobs.detailspatient', {
                url: '/detailspatient/:id',
                views: {
                    'tab-jobs@dashboard': {
                        templateUrl: 'appThrivor/jobs/jobDetailsPatient.html',
                        controller: 'jobDetailsCtrl'
                    }
                }
            })
             .state('dashboard.jobs.detailscrew', {
                 url: '/detailscrew/:id',
                 views: {
                     'tab-jobs@dashboard': {
                         templateUrl: 'appThrivor/jobs/jobDetailsCrew.html',
                         controller: 'jobDetailsCtrl'
                     }
                 }
             })

            // dashboard.files
            .state('dashboard.files', {
                url: '/files',
                views: {
                    'tab-files': {
                        templateUrl: 'appThrivor/files/healthFiles.html'
                    }
                }
            })
            .state('dashboard.files.recordings', {
                url: '/recordings',
                views: {
                    'tab-files@dashboard': {
                        templateUrl: 'appThrivor/files/recordings.html',
                        controller: 'recordingsCtrl'
                    }
                }
            })

            // settings
            .state('settings', {
                url: '/settings',
                templateUrl: 'appThrivor/settings/settings.html',
                controller: 'settingsCtrl',
                resolve: {
                    PreviousState: ['$state', function ($state) {
                        var currentStateData = {
                            Name: $state.current.name,
                            Params: $state.params,
                            URL: $state.href($state.current.name, $state.params)
                        };
                        return currentStateData;
                    }]
                }
            })

            // feedback
            .state('feedback', {
                url: '/feedback',
                templateUrl: 'appThrivor/settings/feedback.html'
            })

            // coming soon
            .state('comingSoon', {
                url: '/comingsoon',
                templateUrl: 'appThrivor/shared/placeholder/comingSoon.html',
                controller: 'comingSoonCtrl',
                resolve: {
                    PreviousState: ['$state', function ($state) {
                        var currentStateData = {
                            Name: $state.current.name,
                            Params: $state.params,
                            URL: $state.href($state.current.name, $state.params)
                        };
                        return currentStateData;
                    }]
                }
            })

            // test page
            .state('test', {
                url: '/test',
                templateUrl: 'appThrivor/test/test.html',
                controller: 'testCtrl'
            });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/main');

            $locationProvider.html5Mode(true);
        }]);

})();