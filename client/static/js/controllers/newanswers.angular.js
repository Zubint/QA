boardApp.controller("NewAnswersController", function($scope, AnswerFactory, UserFactory, QuestionFactory, $routeParams, $location){
  $scope.sessionUser ={};
  $scope.errorsArray = [];


    QuestionFactory.getQuestionById($routeParams.id, function(response){
      if(response.status){
        $scope.questions = response.questionInfo
      }else {
        console.log(response)
        $scope.errorsArray = response.errors;
      }
    })

    $scope.createAnswer = function(){
      var answer = '';

      // if ($scope.newAnswer !=undefined){
      //   $scope.newAnswer._questionId = $scope.questions._id;
      //   $scope.newAnswer._userId = $scope.sessionUser.user_id;
      //   var answer = $scope.newAnswer.answer;
      // }else{
      //   $scope.errorsArray = [];
      //   $scope.errorsArray.push("You must include an answer");
      //   $location.url("/questions/"+$routeParams.id+"/new_answer");
      // }

        // if(answer.trim().length<5){
        //    $scope.errorsArray = [];
        //   $scope.errorsArray.push("Your answer must be at least 5 characters long");
        //   return false
        // }

        AnswerFactory.createAnswer($scope.newAnswer, function(response){
          if (response.status){
            console.log(status);
            //go back to the dashbaord
            $location.url("#/dashboard")
          }else {
            //errors
            $scope.errorsArray = response.errors;
            console.log(response.errors)
          }
        })

    }

    $scope.logout = function(){
      UserFactory.logout(function(response){
        if(response.status){
          console.log("questions controller - logout ", response.sessionUser)
          $scope.sessionUser = response.sessionUser
          $location.url("/")
        }else{
          $scope.errorsArray.push(response.errors);
        }
      })
    }


    UserFactory.getUser(function(user_info){
        $scope.sessionUser=user_info;
        // console.log($scope.sessionUser.loggedin);
    if(!$scope.sessionUser.loggedIn){
      $location.url("/users");
    }else {
      // $location.url("/board");
    }
  })
})
