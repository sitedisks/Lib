(function(){
  'use strict';

  angular.module('app').controller('mainCtrl', ['$scope',
    function($scope){
      $scope.message = 'Angular Controller';

      $scope.vibMe = vibMe;

      function vibMe(){
        navigator.vibrate(500);
      }

      $('#testMe').click(function(){ alert('jQuery ready');});
    }]);

})();
