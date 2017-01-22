(function () {
    'use strict';

    ctrlThrivor.controller('mainCtrl', ['$scope', '$state', '$stateParams', 'storageService', 'USER_TYPE',
        function ($scope, $state, $stateParams, storageService, USER_TYPE) {

            var currentUser = $stateParams.userName != null ? $stateParams.userName : storageService.get('userName');

            if (currentUser != null)
                goSignIn();

            $scope.goSignIn = goSignIn;
            $scope.setUserType = setUserType;

            function goSignIn() {
                if (currentUser)
                    $state.go('signIn');
                else
                    $state.go('signInEmail');
            }

            function setUserType(type) {
                if (type === 1) // Patient
                    $state.go('signUp.step1', { userType: USER_TYPE.PATIENT });
                else if (type === 5)  // Support Crew
                    $state.go('signUp.step1', { userType: USER_TYPE.CREW });
        }


    }]);

})();