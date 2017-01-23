(function () {
    'use strict';

    angular.module('appThrivor')
        .constant('uberApi', {
            'clientId': 'A-XLoLlB5L0VNpA4y_y8GXWmoxjB27AZ',
            'serverToken': '61CZ9X7cRCS4FVXNnWxnDw2B_YP80rj-gOzgHDc1',
            'clientSecret': 'UXkG-Gg76J3Z2LWPqjDVO-TD54sIw4OpMTpJU0fl',
            'fareId': 'd30e732b8bba22c9cdc10513ee86380087cb4a6f89e37ad21ba2a39f3a1ba960',
            'endPoint': 'https://api.uber.com/v1.2/',
            'endPointSandbox': 'https://sandbox-api.uber.com/v1.2/',
            'endPointOAuth': 'https://login.uber.com/oauth/v2/',
            'returnUrl': 'https://appuat.thrivor.com/ui/',
            'accessToken':'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsiaGlzdG9yeSIsInBsYWNlcyIsInByb2ZpbGUiXSwic3ViIjoiZWNjZjAxYjMtM2JlNy00Yzk4LTgyM2YtMzA1NDQyNTI0ZTQ0IiwiaXNzIjoidWJlci11czEiLCJqdGkiOiIyNzMxMTk3OS1mYTAyLTQ3ODgtYThlNC0wYTAwZjMyMDVhZGQiLCJleHAiOjE0ODE4NDc2MzUsImlhdCI6MTQ3OTI1NTYzNCwidWFjdCI6IjhpUXc2MzYycThUd2RCMmliNFp1RFpqVmxlSW9mNyIsIm5iZiI6MTQ3OTI1NTU0NCwiYXVkIjoiQS1YTG9MbEI1TDBWTnBBNHlfeThHWFdtb3hqQjI3QVoifQ.dEU1W4a1oWW9YT_4y-_1wXr_luHpVMLjw1kMGB6bCmW3lAH4P1ILDezJq8HvqZQIWeNTNHrc26LHVXgkZ2pcMra5L5Jzc5CYHyZ5nrQmTP7AxUkXyuZoahoGb37PPtv0CuaxncYOfi2lLIvu2E3hM8UXxMsr29L8Eh0VoQKEOvHIj2pJbJm8gj7tQaKDuxR_6liOG-19_YuRDEhNqCwnWvYrerQCklM54I4huhcDY41XIgY0rm6D4Rhx3zi-cdfUMFcoHQ1znah8bXYJlo040UJHgT7n0GuEZZ-EKAHNm1ZPjauHoPkRHBc613ruqLbsPZwgu7uvzWmzxahk3xbldg'
        });

    angular.module('appThrivor')
        .constant('thrivorAppConstants', {
            'applicationName': 'Thrivor'
        });

    angular.module('appThrivor')
        .constant('USER_TYPE', {
            'PATIENT': 'Patient',
            'CREW': 'Crew'
        });
})();