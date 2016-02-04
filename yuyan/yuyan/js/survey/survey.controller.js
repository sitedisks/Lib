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
        $scope.DefaultQuestionType = 1;
        $scope.QID = 0;
        $scope.showAddItem = false;

        $scope.disableNext = true;

        $scope.addQuestion = addQuestion;
        $scope.addItem = addItem;
        $scope.nextQuestion = nextQuestion;
    
        function addQuestion() {
            $scope.QID++;
            var question = {
                QuestionId: $scope.QID,
                Question: $scope.question,
                QuestionType: $scope.DefaultQuestionType,
                dtoItems: []
            };

            $scope.dtoQuestions.push(question);
            $scope.question = "";
            $scope.showAddItem = true;
   
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
                        $scope.disableNext = false;
                    }
                }
            });

            $scope.item = "";


        }

        function nextQuestion() {
            $scope.showAddItem = false;
            $scope.disableNext = true;
        }
    }]);

})();
