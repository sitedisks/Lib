(function () {
    'use strict';
    angular.module('yuyanApp').controller('masterCtrl', ['$scope', '$rootScope', '$state', '$translate', '$uibModal', 'localStorageService', 'yuyanAPISvc',
        function ($scope, $rootScope, $state, $translate, $uibModal, localStorageService, yuyanAPISvc) {
            $scope.userLogin = userLogin;
            $scope.userLogout = userLogout;
            $scope.userRegister = userRegister;
            $scope.goManagement = goManagement;
            $scope.changeLanguage = changeLanguage;
            $rootScope.isLogin = false;

            checkSession();

            function userLogin(survey) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'templates/userModal.html',
                    controller: 'userModalCtrl',
                    size: 'md',
                    resolve: {
                        mode: function () {
                            return 'login';
                        }
                    }
                });

                modalInstance.result.then(function (userObj) {
                    if (userObj.Mode == 'login') {

                        yuyanAPISvc.userLoginSvc().save(userObj,
                           function (data) {
                               localStorageService.set('authorizationData', { token: data.CurrentSession.SessionId });
                               toastr.success('Welcome back!', data.Email);
                               $scope.isLogin = true;

                               if (survey) {
                                   $rootScope.progressing = true;
                                   survey.UserId = data.UserId;
                                   saveSurvey(survey);
                               }

                           }, function (data) {
                               // failed to login
                               toastr.error(data.data, data.statusText);
                           });

                    } else if (userObj.Mode == 'register') {

                        yuyanAPISvc.userRegisterSvc().save(userObj,
                          function (data) {
                              localStorageService.set('authorizationData', { token: data.CurrentSession.SessionId });
                              toastr.success('Welcome to Chorice!', data.Email);
                              $scope.isLogin = true;

                              if (survey) {
                                  $rootScope.progressing = true;
                                  survey.UserId = data.UserId;
                                  saveSurvey(survey);
                              }

                          }, function (data) {
                              // failed to login
                              toastr.error(data.data, data.statusText);
                          });
                    }

                }, function () {
                    // dismissed log
                });
            }

            function userLogout() {
                var localSessionToken = localStorageService.get('authorizationData');
                if (localSessionToken) {
                    yuyanAPISvc.userLogoutSvc().remove({ sessionId: localSessionToken.token },
                        function (data) {
                            localStorageService.remove('authorizationData');
                            toastr.success('See ya later!');
                            $scope.isLogin = false;
                        }, function (data) {
                            toastr.error('Failed logout.', data.statusText);
                        });
                }
            }

            function userRegister() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'templates/userModal.html',
                    controller: 'userModalCtrl',
                    size: 'md',
                    resolve: {
                        mode: function () {
                            return 'register';
                        }
                    }
                });

                modalInstance.result.then(function (userObj) {
                    if (userObj.Mode == 'login') {

                        yuyanAPISvc.userLoginSvc().save(userObj,
                           function (data) {
                               localStorageService.set('authorizationData', { token: data.CurrentSession.SessionId });
                               toastr.success('Welcome back!', data.Email);
                               $scope.isLogin = true;
                           }, function (data) {
                               // failed to login
                               toastr.error(data.data, data.statusText);
                           });

                    } else if (userObj.Mode == 'register') {

                        yuyanAPISvc.userRegisterSvc().save(userObj,
                          function (data) {
                              localStorageService.set('authorizationData', { token: data.CurrentSession.SessionId });
                              toastr.success('Welcome to Chorice!', data.Email);
                              $scope.isLogin = true;
                          }, function (data) {
                              // failed to register
                              toastr.error(data.data, data.statusText);
                          });
                    }

                }, function () {
                    // dismissed log
                });
            }

            function goManagement() {
                $state.go('manage');
            }

            function saveSurvey(survey) {
                yuyanAPISvc.surveyCrudSvc().save(survey,
                           function (data) {
                               toastr.success("Survey Saved!");
                               $scope.$broadcast('reset');
                               //reset();
                           }, function (data) {
                               toastr.error("Save Survey Error");
                               $scope.$broadcast('reset');
                           });
            }

            function checkSession() {
                var localSessionToken = localStorageService.get('authorizationData');
                if (localSessionToken) {
                    yuyanAPISvc.sessionCheckSvc().get({ sessionId: localSessionToken.token },
                        function (data) {
                            if (data.SessionId && data.IsActive) {
                                $rootScope.isLogin = true;
                            } else {
                                // session exipred
                                localStorageService.remove('authorizationData');
                            }
                        }, function (data) {
                            toastr.error('User Session Check failed. Please refresh.');
                        });
                }
            }

            function changeLanguage(langKey) {
                $translate.use(langKey);
            };

        }]);
})();