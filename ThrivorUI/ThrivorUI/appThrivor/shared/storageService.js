(function () {
    'use strict';

    appThrivor.factory("storageService", ['$window', function ($window) {

        var storageService = {};

        storageService.get = function (itemKey) {
            return $window.localStorage.getItem(itemKey);
        }

        storageService.set = function (itemKey, itemValue) {
            $window.localStorage.setItem(itemKey, itemValue);
        }

        storageService.remove = function (itemKey) {
            return $window.localStorage.removeItem(itemKey);
        }
        return storageService;
    }]);
})();
