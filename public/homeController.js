(function () {

var app = angular.module("apodViewer");

var homeController = function($scope, $http, $log, $window, $sce, $location, $rootScope, dataService, $mdDialog, $mdToast) {

  
  
  
  $scope.favourites = dataService.getfromStorage('favourites');
};

app.controller("homeController", homeController);

}());
