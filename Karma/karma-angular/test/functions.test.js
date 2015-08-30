//http://www.sitepoint.com/unit-testing-angularjs-services-controllers-providers/
//https://www.airpair.com/angularjs/posts/unit-testing-angularjs-applications
'use strict';

describe('basic function test',function(){
	it('reverse word', function(){
		
		expect('DCBA').toEqual(reverse('ABCD'));
		expect('Conan').toEqual(reverse('nanoC'));
	});
	
});

describe('hello you', function(){
	it('say hello', function(){
		
		var name = 'Peter';
		var exp = 'Hello Peter';
		
		expect(exp).toBe(sayHello(name));
	});
	
});

describe('test angular', function(){
	var scope;
	
	// mock application to allow us to inject our own dependencies;
	beforeEach(angular.mock.module('siteApp'));
	
	// mock the controller for the same reason and include $rootScope and $controller
	beforeEach(angular.mock.inject(function($rootScope, $controller){
		// declare the controller and inject out empty scope
		scope = $rootScope.$new();
		$controller('mainCtrl', {$scope: scope}); // mock the controller
	}));
	
	it('test mainCtrl', function(){
		
		expect(scope.text).toBe('Hello World!');
	});
	
});