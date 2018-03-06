(function () {

var app = angular.module("apodViewer");

var playController = function($scope, $http, $log, $window, $sce, $location, $rootScope, dataService, $mdDialog, $mdToast) {

  
  
  $log.info('play controller');

  $scope.favourites = dataService.getfromStorage('favourites');
  $log.info($scope.favourites);

};

app.controller("playController", playController);

}());
