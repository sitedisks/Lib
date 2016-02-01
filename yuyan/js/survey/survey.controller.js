(function(){
  'use strict';
  angular.module('yuyanApp').controller('surveyCtrl',
  ['$scope', function($scope){
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

	$scope.questions = [];
	$scope.items = [];

	$scope.question = '';
	$scope.addQuestion = addQuestion;

		//$scope.questionForm.$valid

	var qOrder = 1;
	function addQuestion(){
  
		$scope.questions.push({ Question: $scope.question, QuestionOrder: qOrder++ });
	}

  }]);

})();
