(function () {
    'use strict';

    appThrivor.factory("genericService", ['$ionicLoading', '$ionicModal', '$ionicPopover', '$ionicPopup',
        function ($ionicLoading, $ionicModal, $ionicPopover, $ionicPopup) {

            var genericService = {
                showLoading: showLoading,
                hideLoading: hideLoading,
                registerModal: registerModal,
                registerPopover: registerPopover,
                registerPopup: registerPopup,
                showAlert: showAlert,
                showConfirm: showConfirm
            };

            return genericService;

            function showLoading(message) {
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner><p>' + message + '</p>'
                });
            }

            function hideLoading() {
                $ionicLoading.hide();
            }

            // genericService.registerModal($scope, 'modal-template.html');
            function registerModal(scope, template, callback) {
                $ionicModal.fromTemplateUrl(template, {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    scope.openModal = function () {
                        modal.show();
                    }
                    scope.closeModal = function () {
                        modal.hide();
                    }
                });

                scope.$on('modal.hidden', function () {
                    callback();
                });
            }

            function registerPopover(scope, template, callback) {
                $ionicPopover.fromTemplateUrl(template, {
                    scope: scope
                }).then(function (popover) {
                    scope.openPopover = function ($event) {
                        popover.show($event);
                    }
                    scope.closePopover = function () {
                        popover.hide();
                    }
                });

                scope.$on('popover.hidden', function () {
                    callback();
                });
            }

            function registerPopup(scope, template, title, callback) {
                scope.data = {};

                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                    template: template,
                    title: title,
                    scope: scope,
                    buttons: [
                    
                      {
                          text: '<b>OK</b>',
                          type: 'button-assertive',
                          onTap: function (e) {
                              return scope.data;
                          }
                      }
                    ]
                });

                myPopup.then(function (res) {
                    callback(res);
                });

            }

            function showAlert(title, template, callback) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: template
                });

                alertPopup.then(function (res) {
                    callback();
                });
            }

            function showConfirm(title, template, callback) {
                var confirmPopup = $ionicPopup.confirm({
                    title: title,
                    template: template
                });

                confirmPopup.then(function (res) {
                    callback(res);
                });
            }

        }]);
})();