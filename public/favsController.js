(function () {

var app = angular.module("apodViewer");

var favsController = function($scope, $http, $log, $window, $sce, $location, $rootScope, dataService, $mdDialog, $mdToast) {

  
  $scope.displayFavourite = function(apod){
    $log.info('favdisplay called');
    $rootScope.apodData = apod;
    $rootScope.imgDate = new Date(apod.date).toDateString();
    $log.info($scope.apodData);
    $location.path('/apod');
  };

  $scope.deleteFavourite = function(apod){
    var index = $scope.favourites.indexOf(apod);
    $log.info(index);
    $scope.favourites = dataService.deleteFavourite(index);
    $mdToast.show(
      $mdToast.simple()
      .parent($('#panelheading'))
      .textContent('Deleted!')
      .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
      .position('top')
      .hideDelay(500)
      );
    $log.info($scope.favourites);
  };

  // $scope.showInfo = function(ev, item) {
  //   $mdDialog.show(
  //     $mdDialog.alert()
  //       .parent($('#body'))
  //       .clickOutsideToClose(true)
  //       .title(item.title)
  //       .textContent(item.explanation)
  //       .ariaLabel('Image Info')
  //       .ok('Done')
  //       .targetEvent(ev)
  //   );
  // };

  $scope.showInfo = function(ev, item) {
    $scope.popupInfo = item.explanation;
    $mdDialog.show({
      contentElement: '#myinfoDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  $scope.expandFavourite = function(ev, item){
    $scope.popupImage = item;
    $log.info(item);
    $mdDialog.show({
      contentElement: '#myDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  }

  var onComplete = function(response) {
    $scope.favourites = response.data;
    // $scope.visited.push($scope.apodData);
    // $scope.imgDate = new Date($scope.apodData.date).toDateString();

  };

  var onError = function(reason) {
    $scope.error = "API call failed, please refresh page to try again";
  };
  
  $scope.favourites = dataService.getfromStorage('favourites');
};

app.controller("favsController", favsController);

}());
