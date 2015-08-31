'use strict';

// describe('when testing karma', function (){
	// it('should report a successful test', function (){
		// expect(true).toBeTruthy();
	// });
// });

//http://blog.jobbole.com/54936/

describe('mainCtrl Test', function(){
	
	var scope;
	
	// mock the siteApp
	beforeEach(angular.mock.module('siteApp'));
	
	beforeEach(angular.mock.inject(function($rootScope, $controller){
		
		scope = $rootScope.$new();
		
		$controller('mainCtrl', {$scope:scope});
	}));
	
	it('message hello world', function(){
		expect(scope.message).toBe('Hello World!');
		
	});
});