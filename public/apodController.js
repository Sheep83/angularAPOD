(function () {
           
var app = angular.module("apodViewer");

var ApodController = function($scope, $http, $log, $window, $sce, $location, dataService, $rootScope, $mdToast, $mdDialog){

  $scope.newWindow = function(url) {
    $window.open(url);
  };

  $scope.randomDate = function() {
    array = [];
    var randMonth = Math.floor((Math.random() * 12) + 1);
    var randDay = null;
    var randYear = null;
    if (randMonth == 2) {
      randDay = Math.floor((Math.random() * 28) + 1);
    } else if (randMonth == 4 || 6 || 9 || 11) {
      randDay = Math.floor((Math.random() * 30) + 1);
    } else {
      randDay = Math.floor((Math.random() * 31) + 1);
    }
    randYear = Math.floor(Math.random() * (2015 - 1996) + 1996);
    array.push(randYear, randMonth, randDay);
    var randDate = array.join('-');
    var randUrl = 'https://api.nasa.gov/planetary/apod?date=' + randDate + '&api_key=T1AUnT68vq8FeqlfaGROtZl5h6mk9iMoz9Z7MKNy';
    $scope.isLoading = true;
    dataService.getByUrl(randUrl).then(onComplete, onError);
  };


  $scope.visitedDisplay = function(object) {
    $log.info(object.date);
    $scope.isLoading = true;
    dataService.getByDate(object.date)
    .then(onVisitedComplete, onError);
    // $scope.apodData = object;
    // onComplete();
    // $location.path('#/apod')
    // $rootScope.imgDate = new Date(object.date).toDateString();
  };

  $scope.selectedDate = function(date) {
    dateArray = [];
    newDate = Date.parse(date);
    var day = new Date(newDate).getUTCDate();
    var month = new Date(newDate).getUTCMonth();
    month += 1;
    var year = new Date(newDate).getUTCFullYear();
    dateArray.push(year, month, day);
    var urlDate = dateArray.join('-');
    var url = ('https://api.nasa.gov/planetary/apod?date=' + urlDate + '&api_key=T1AUnT68vq8FeqlfaGROtZl5h6mk9iMoz9Z7MKNy');
    $scope.isLoading = true;
    dataService.getByUrl(url).then(onComplete, onError);
  };
  
  $scope.addFavourite = function (apodData){

    $scope.favourites = dataService.addToStorage('favourites', apodData);
    $mdToast.show(
      $mdToast.simple()
      .parent($('#apodHeader'))
      .textContent('Saved!')
      .highlightClass('md-accent')
      .position('top')
      .hideDelay(500)
      );
    $log.info($scope.favourites);
  };

  var onComplete = function(response) {
    $scope.isLoading = false;
    $scope.apodData = response.data;

    // $scope.visited.push($scope.apodData);
    $scope.visited = dataService.addToStorage('visited', $scope.apodData)
    $scope.imgDate = new Date($scope.apodData.date).toDateString();
    $scope.error=null;

  };

  var onVisitedComplete = function(response) {
    $scope.isLoading = false;
    $scope.apodData = response.data;
    // $scope.visited.push($scope.apodData);
    // $scope.visited = dataService.addToStorage('visited', $scope.apodData)
    $scope.imgDate = new Date($scope.apodData.date).toDateString();
    $scope.error=null;

  };

  var onError = function(reason) {
    $scope.error = "Server busy. Please try again";
    $scope.isLoading = false;
  };

/////////////////////////////////////////////////////////////////////////
  $scope.header = "NASA Image Viewer";
  $scope.defaultUrl = 'https://api.nasa.gov/planetary/apod?&api_key=T1AUnT68vq8FeqlfaGROtZl5h6mk9iMoz9Z7MKNy';
  $scope.visited = dataService.getfromStorage('visited');
  $scope.favourites = dataService.getfromStorage('favourites');
  $scope.isLoading = false;

  if(!$scope.apodData){
    dataService.getByUrl($scope.defaultUrl).then(onComplete, onError);
  }

  // $scope.imgDate = $scope.apodData.date;

//////////////////////////////////////////////////////////////  
};
app.controller("ApodController", ApodController);
app.filter('trustUrl', ['$sce', function($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
}]);

}());

