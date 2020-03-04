angular
    .module('testingApp', [])
    .controller('calculatorController', function () {
        var vm = this;
        vm.message = 'I am a simple calculator';
        vm.result = 0;
        vm.firstNumber = 0;
        vm.secondNumber = 0;
        vm.addNumber = addNumber;
    
        function addNumber() {
            vm.result = vm.firstNumber + vm.secondNumber;
        }
    
    });
