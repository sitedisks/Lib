(function () {
    'use strick';

    angular.module('yuyanApp')
        .controller('addEditQuestionCtrl', ['$scope', '$uibModalInstance', 'question', 'localStorageService', 'yuyanAPISvc',
            function ($scope, $uibModalInstance, question, localStorageService, yuyanAPISvc) {

                $scope.saving = false;

                $scope.isItemCountValid = false;

                $scope.question = question;

                $scope.addItem = addItem;
                $scope.removeItem = removeItem;

                
                if (question.dtoItems.length >= 2)
                    $scope.isItemCountValid = true;

                function addItem() {

                    var order = $scope.question.dtoItems.length + 1;
                    var item = {
                        QuestionId: $scope.question.QuestionId,
                        ItemDescription: $scope.item,
                        ItemOrder: order
                    }

                    $scope.question.dtoItems.push(item);
                    $scope.item = "";
                    ItemCountValid();
                }

                function removeItem(i) {
                    var index = $scope.question.dtoItems.indexOf(i);

                    $scope.question.dtoItems.splice(index, 1);
                    var order = 1;
                    angular.forEach($scope.question.dtoItems, function (item) {
                        item.ItemOrder = order++;
                    });
                    ItemCountValid();
                }

                function ItemCountValid() {
                    if ($scope.question.dtoItems.length < 2 || $scope.question.dtoItems.length >= 6)
                        $scope.isItemCountValid = false;
                    else
                        $scope.isItemCountValid = true; 
                }
 
                $scope.ok = function () {
                    $scope.saving = true;  
                }


                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            }]);
})();