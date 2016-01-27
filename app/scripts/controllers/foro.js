/*
**
 * Created by Jon on 16/12/2015.
 */
'use strict';

angular.module('myAppAngularMinApp')
  .controller('ForoCtrl', function ($scope,  $location,$routeParams, ForoService, QuestionService, LoginService, AnswerService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  $scope.error = 0;
  $scope.success = 0;


  $scope.goTo = function(url)
{
  $location.path(url);
}
/*Redirecciones*/
$scope.gotoNewQuestion = function()
{
  $scope.goTo('/foro/newquestion');
}
$scope.goToForo = function()
{
  $scope.goTo('/foro')
}

$scope.goToTags = function()
{
  
}

/*Obtener lista de preguntas*/
$scope.getQuestions = function()
{
  ForoService.getQuestions().then(function (res){
    $scope.questions = res.data;
  },function(err){
    $scope.error = err.message;
  });
}


/****** Controlador Preguntas ********

/*Funcion para crear pregunta*/
$scope.newquestion = function(question)
{
  console.log(question);
  QuestionService.createQuestion($routeParams.questionid,question).then(function (res){
    console.log(res);
  },function(err){
    $scope.error = 1;
    $scope.error = err.message;
  });
}

  $scope.comment = function(comment)
  {
    if(LoginService.isLogged())
    {
      $scope.message = '';
      $scope.error = 0;
      $scope.success = 0;
      QuestionService.commentQuestion($routeParams.questionid,comment).then(function(res){
        $scope.success =1;
        $scope.question.comments = res.comments;
      },function(err){
        $scope.error = 1;
        $scope.message = err.data.message;
      });
    }
    else
    {
      $scope.goTo('/login');
    } 
  }

  $scope.upvote = function()
  {
    QuestionService.upVote($routeParams.questionid).then(function(res){
      $scope.success =1;
      $scope.question.votes++;
      $scope.message = res.data;
    },function(err){
      $scope.error = 1;
      $scope.message = err.data.message;
    });
  }

  $scope.downvote = function()
  {
    QuestionService.downVote($routeParams.questionid).then(function(res){
      $scope.success =1;
      $scope.question.votes--;
      $scope.message = res.data;
    },function(err){
      $scope.error = 1;
      $scope.message = err.data.message;
    });
  }




/********* Answer function *******/
  /*Función para responder una pregunta*/
  $scope.newanswer = function(answer)
  {
    if(LoginService.isLogged())
    {
      AnswerService.newAnswer($routeParams.questionid, answer).then(function(res){
      $scope.answers.push(res);

      },function(err)
      {
        $scope.error = 1;
        $scope.message = err.data.message;
      });
    }
    else
    {
      $scope.goTo('/login');
    }
  }
$scope.deleteAnswer = function (answerid)
{

}

$scope.editAnswer = function()
{

}

/*Voto positivo para la respuesta*/
$scope.answerUpVote = function(answerid)
{
  if(LoginService.isLogged())
  {
     AnswerService.upVote($routeParams.questionid,answerid).then(function(res){
      $scope.success =1;
      $scope.message = res.data;
    },function(err){
      $scope.error = 1;
      $scope.message = err.data.message;
    });
  }
  else
  {

  }
}

/*Voto negativo para la respuesta*/
$scope.answerDownVote = function(answerid)
{
   if(LoginService.isLogged())
  {
     AnswerService.downVote($routeParams.questionid, answerid).then(function(res){
      $scope.success =1;
      $scope.message = res.data;
    },function(err){
      $scope.error = 1;
      $scope.message = err.data.message;
    });
  }
  else
  {
    
  }
}


/******* COntrolador tags *******/
$scope.loadTags = function(query){
  QuestionService.getTags().then( function(res){
    var tags = res.data;
    return tags.filter(function(tag) {
        return tag.text.toLowerCase().indexOf(query.toLowerCase()) != -1;
      });

  },function(err)
  {
    $scope.error = 1;
    $scope.message = err;
  });
}


/****** Funciones de Inicio*******/
$scope.getQuestion = function()
{
  QuestionService.getQuestion($routeParams.questionid).then(function (res){
    $scope.question = res.data;
  },function(err){
    $scope.error = 1;
    $scope.error = err.message;
  });
}


$scope.init = function()
{
    $scope.getQuestions();
}

});