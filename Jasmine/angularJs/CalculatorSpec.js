describe("Unit: calculatorController tests", function () {

    // setup code for testing this unit
    var controller;
    beforeEach(function () {
        module('testingApp');

        inject(function ($controller) {
            controller = $controller('calculatorController');
        });

    });

    it("PASSING TEST - should be able to display a title", function () {
        expect(controller.message).toBe('I am a simple calculator');
    });

    // it("FAILING TEST - should be able to display a title", function () {
    //     expect(controller.message).toBe('fail fail fail');
    // });

    it("PASSING TEST - should add 2+2 and get result of 4", function () {
        controller.firstNumber = 2;
        controller.secondNumber = 2;
        controller.result = 0;
        controller.addNumber()
        expect(controller.result).toEqual(4);
    });

});
