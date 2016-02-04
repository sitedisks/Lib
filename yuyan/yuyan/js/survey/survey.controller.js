(function () {
    'use strict';
    angular.module('yuyanApp').controller('surveyCtrl',
    ['$scope', function ($scope) {
        var surveyModel = {
            "Title": "string",
            "ShortDesc": "string",
            "LongDesc": "string",
            "UserId": "string",
            "dtoQuestions": [
              {
                  "QuestionId": 0,
                  "SurveyId": 0,
                  "Question": "string",
                  "QuestionOrder": 0,
                  "QuestionType": 1,
                  "dtoItems": [
                    {
                        "QuestionItemId": 0,
                        "QuestionId": 0,
                        "ItemDescription": "string",
                        "ItemOrder": 0
                    }
                  ]
              }
            ]
        };
        $scope.placeholder = 'Your First Question';
        $scope.dtoQuestions = [];

        $scope.addQuestion = addQuestion;
        $scope.addItem = addItem;
        $scope.showAddItem = false;
        $scope.showAddQuestion = true;

        $scope.QID = 0;
        function addQuestion() {
            $scope.QID++;
            var question = {
                QuestionId: $scope.QID,
                Question: $scope.question,
                QuestionType: 1,
                dtoItems: []
            };

            $scope.dtoQuestions.push(question);
            $scope.question = "";
            $scope.showAddItem = true;
            $scope.showAddQuestion = false;
            $scope.placeholder = 'Your Next Question';
        }


        function addItem(QID) {

            var item = {
                QuestionId: QID,
                ItemDescription: $scope.item
            };

            angular.forEach($scope.dtoQuestions, function (question) {
                if (question.QuestionId == QID) {
                    question.dtoItems.push(item);
                    if (question.dtoItems.length >= 6) {
                        $scope.showAddItem = false;
                    }
                    if (question.dtoItems.length >= 2) {
                        $scope.showAddQuestion = true;
                    }
                }
            });

            $scope.item = "";


        }


    }]);

})();
