(function(){
  'use strict';

  angular.module('app').controller('mainCtrl', ['$scope',
    function($scope){
      $scope.message = 'Angular Controller';


      $('#testMe').click(function(){ alert('jQuery ready');});
    }]);

})();
