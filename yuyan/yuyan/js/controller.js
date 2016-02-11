(function () {
    'use strict';
    angular.module('yuyanApp').controller('masterCtrl', ['$scope', '$uibModal', 'localStorageService', 'yuyanAPISvc',
        function ($scope, $uibModal, localStorageService, yuyanAPISvc) {
            $scope.userLogin = userLogin;
            $scope.userLogout = userLogout;
            $scope.userRegister = userRegister;


            function userLogin() {
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
                    yuyanAPISvc.userLoginSvc().save(userObj,
                        function (data) {
                            localStorageService.set('authorizationData', { token: data.CurrentSession.SessionId });
                            toastr.success('Welcome back!', data.Email);
                            $scope.isLogin = true;
                        }, function (data) {
                            // failed to login
                            toastr.error(data.data, data.statusText);
                        });

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
                    yuyanAPISvc.userRegisterSvc().save(userObj,
                        function (data) {
                            var newUser = data;
                        });

                }, function () {
                    // dismissed log
                });
            }

        }]);
})();