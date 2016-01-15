(function(){
	'use strict';
	
	angular.module('yuyanApp').controller('mainCtl', ['$scope', 'uiGmapGoogleMapApi', 
		function($scope, uiGmapGoogleMapApi){
			
			uiGmapGoogleMapApi.then(function(maps) {
				
				//fix of lodash.js
				if( typeof _.contains === 'undefined' ) {
					_.contains = _.includes;
				}
				if( typeof _.object === 'undefined' ) {
					_.object = _.zipObject;
				}
				  
				$scope.map = { 
					center: { latitude: 45, longitude: -73 }, 
					zoom: 8 
				};
				
			})
		
			
		
	}]);
	
})();