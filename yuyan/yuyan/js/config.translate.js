(function () {
    'use strict';

    angular.module('yuyanApp').config(['$translateProvider',
        function ($translateProvider) {
            $translateProvider
                .translations('en', {
                    BTN_SAVE: 'Save',
                    BTN_RESET: 'Reset',
                    BTN_PREVIEW: 'Preview',
                    BTN_LOGIN: 'Login',
                    BTN_LOGOUT: 'Logout',
                    BTN_REGISTER: 'Register',
                    BTN_MANAGE: 'Management',

                    TEXT_CHORICE: 'chorice',
                    TEXT_QUESTION: 'Question',
                    TEXT_HEAD_INTRO: 'Create online survey, questionary, data collection, test... Quick & Easy.',

                    BTN_TEXT_EN: 'English',
                    BTN_TEXT_CN: 'Chinese',
                })
                 .translations('cn', {
                     BTN_SAVE: '保存',
                     BTN_RESET: '重启',
                     BTN_PREVIEW: '预览',
                     BTN_LOGIN: '登陆',
                     BTN_LOGOUT: '注销',
                     BTN_REGISTER: '注册',
                     BTN_MANAGE: '管理',

                     TEXT_CHORICE: '潮米',
                     TEXT_QUESTION: '问题',
                     TEXT_HEAD_INTRO: '分享调查问卷, 测验亦或数据收集 - 方便并快捷',

                     BTN_TEXT_EN: '英文',
                     BTN_TEXT_CN: '中文',
                 });

            $translateProvider.preferredLanguage('en');
        }]);
})();