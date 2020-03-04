describe("Unit: calculatorController tests", function () {

    // setup code for testing this unit
    var $controller;

    beforeEach(module('app'));
    
    beforeEach(inject(function(_$controller_) {
      $controller = _$controller_;
    }));

    it("PASSING TEST - should be able to display a title", function () {
        var $scope = {};
        var controller = $controller('calculatorController', { $scope: $scope });
        expect($scope.message).toBe('I am a simple calculator');
    });

    // it("FAILING TEST - should be able to display a title", function () {
    //     expect(controller.message).toBe('fail fail fail');
    // });

    // it("PASSING TEST - should add 2+2 and get result of 4", function () {
    //     var $scope = {};
    //     var controller = $controller('calculatorController', { $scope: $scope });
    //     controller.firstNumber = 2;
    //     controller.secondNumber = 2;
    //     controller.result = 0;
    //     controller.addNumber()
    //     expect(controller.result).toEqual(4);
    // });

});
