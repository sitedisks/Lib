(function () {
    'use strict';

    angular.module('yuyanApp').config(['$translateProvider',
        function ($translateProvider) {

            $translateProvider
                .translations('en', {
                    'HELLO_TEXT': 'Hello World!'
                });

            $translateProvider.useStaticFilesLoader({
                'prefix': 'data/locale-',
                'suffix': '.json'
            });

            $translateProvider.preferredLanguage('en');
            $translateProvider.forceAsyncReload(true);
        }]);
})();