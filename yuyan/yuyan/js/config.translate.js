(function () {
    'use strict';

    angular.module('yuyanApp').config(['$translateProvider',
        function ($translateProvider) {
            $translateProvider
                .translations('en', {
                    BTN_SAVE: 'Save',
                    BTN_RESET: 'Reset',
                    BTN_TEXT_EN: 'English',
                    BTN_TEXT_CN: 'Chinese',
                })
                 .translations('cn', {
                     BTN_SAVE: '保存',
                     BTN_RESET: '重启',
                     BTN_TEXT_EN: '英文',
                     BTN_TEXT_CN: '中文',
                 });

            $translateProvider.preferredLanguage('en');
        }]);
})();