/*
**
 * Created by Jon on 16/12/2015.
 */
'use strict';

angular.module('myAppAngularMinApp')
  .controller('ForoCtrl', function ($scope,  $location,$routeParams, ForoService, QuestionService, searchservice, LoginService, AnswerService, TagService, $localStorage, $uibModal) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  $scope.error = 0;
  $scope.success = 0;
  $scope.linkQuestion = false;
  $scope.linkAnswer = false;
  $scope.tagQuestions ={};
  $scope.path = $location.path();

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
  $scope.goTo('/foro');
}

$scope.goToTags = function()
{
  $scope.goTo('/foro/tags');
}

$scope.goQuestion = function(id)
{
  $scope.goTo('/foro/question/'+id);
}


/****** Controlador Preguntas ********

/*Funcion para crear pregunta*/
$scope.newquestion = function(question)
{
  QuestionService.createQuestion(question).then(function (res){
    $scope.goTo('foro/question/'+res.data._id);
    $scope.success = 1;
    $scope.success = "Question create!!"
  },function(err){
    $scope.error = 1;
    $scope.error = err.message;
  });
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

 $scope.deleteQuestion = function(questionid,answers)
 {
    QuestionService.deleteQuestion(questionid,answers).then(function(res){
      $scope.goTo('/foro');
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
      $scope.question.answers.push(res.data);
      $scope.question.answercount++;

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
$scope.deleteAnswer = function ($index,questionid,answerid)
{
  AnswerService.deleteAnswer(questionid,answerid).then(function (res){
    $scope.question.answercount = res.data.answercount;

  },function(err){
    $scope.error = 1;
    $scope.message = err.data.message;
  });
}

$scope.editAnswer = function()
{

}


/*Voto positivo para la respuesta*/
$scope.answerUpVote = function($index,answerid)
{
  if(LoginService.isLogged())
  {
     AnswerService.upVote($routeParams.questionid,answerid).then(function(res){
      $scope.success =1;
      $scope.message = "Vote succesfully";
      $scope.question.answers[$index].votes++ ;
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

/*Voto negativo para la respuesta*/
$scope.answerDownVote = function($index,answerid)
{
   if(LoginService.isLogged())
  {
     AnswerService.downVote($routeParams.questionid, answerid).then(function(res){
      $scope.success =1;
      $scope.message = "Vote succesfully";
      $scope.question.answers[$index].votes--;
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


/******* Controlador tags *******/
$scope.getTags = function(){
  TagService.getTags().then( function(res){
    $scope.tags = res.data;
  },function(err)
  {
    $scope.error = 1;
    $scope.message = err;
  });
}

$scope.questionsByTag = function(id){
   $scope.goTo('/foro/tag/'+id);
}

$scope.getQuestiontag = function (id)
{
  TagService.getQuestionsByTag(id).then(function(res){
    console.log(res);
    $scope.questions = res.data;

  },function(err){

  });
}

/****** Funciones de Inicio*******/
$scope.getQuestion = function()
{
  QuestionService.getQuestion($routeParams.questionid).then(function (res){
    $scope.question = res.data; 
    if($scope.question._user._id == $localStorage.id)
    {
     $scope.linkQuestion= true;
    }
    if($scope.question.answer._user._id == $localStorage.id)
    {
     $scope.linkAnswer= true;
    }
  },function(err){
    $scope.error = 1;
    $scope.error = err.message;
  });
}

$scope.getQuestions = function()
{
  ForoService.getQuestions().then(function (res){
    $scope.questions = res.data;
  },function(err){
    $scope.error = err.message;
  });
}

//////////// elastic ///////////////////
 $scope.search = function(request)
    {
     $scope.questions = [];
    searchservice.forumsearch(request).then(function (res){  
    $scope.questions= $scope.questions.concat(res);
    },function(err){
      console.log(err);
    });
  }


$scope.init = function()
{
  if($location.path() == '/foro')
  {
    $scope.getQuestions();
  }
  else
  {
    $scope.getQuestiontag($routeParams.tagid);
  }
}




/*Modals*/
$scope.questionModal = function (questionId,answerid) {
  var modalInstance = $uibModal.open({
    templateUrl: 'views/modals/questionCommentModal.html',
    controller: 'commentModalCtrl',
    resolve: {
            questionid: function(){
              return questionId;
            },
            answerid: function(){
              return answerid;
            }
          }
  });
  modalInstance.result.then(function (comments) {
    $scope.question.comments=comments;
  }
  );
};

$scope.answerModal = function ($index,questionid,answerid) {
  var modalInstance = $uibModal.open({
    templateUrl: 'views/modals/answerCommentModal.html',
    controller: 'commentModalCtrl',
    resolve: {
      questionid: function(){
          return questionid;
      },
      answerid: function(){
        return answerid;
            }
      }
    });
    modalInstance.result.then(function (comments) { 
      $scope.question.answers[$index].comments=comments;
    }
  );
};


});