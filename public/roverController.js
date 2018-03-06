(function () {

var app = angular.module("apodViewer");

var roverController = function($scope, $http, $log, $window, $sce, $location, $rootScope, dataService, $mdDialog) {

  
  $scope.getRoverManifest = function(rover){
    for(i=0; i < $scope.rovers.length; i++){
      if(rover == $scope.rovers[i].name){
        $scope.roverImage = $scope.rovers[i].url;
      }
    };
    $log.info($scope.roverImage);
    $scope.filteredSols = [];
    $log.info("getting " + rover + " manifest...")
    var manifestUrl = 'https://api.nasa.gov/mars-photos/api/v1/manifests/' + rover + '?&api_key=T1AUnT68vq8FeqlfaGROtZl5h6mk9iMoz9Z7MKNy'
    $scope.isLoading = true;
    return dataService.getByUrl(manifestUrl)
    .then(onComplete, onError);
  }

  $scope.getFiltered = function(rover, sol, camera){
    var filteredUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?sol=' + sol + '&camera=' + camera + '&api_key=T1AUnT68vq8FeqlfaGROtZl5h6mk9iMoz9Z7MKNy';
    $scope.isLoading = true;
    return dataService.getByUrl(filteredUrl)
    .then(onFilter, onError);
  }

  // var getFiltered = function(rover, sol, camera){
  //   var filteredUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?sol=' + sol + '&camera=' + camera + '&api_key=T1AUnT68vq8FeqlfaGROtZl5h6mk9iMoz9Z7MKNy';
  //   $scope.isLoading = true;
  //   return dataService.getByUrl(filteredUrl)
  //   .then(onFilter, onError);
  // }

  $scope.randomDate = function(){
    var solIndex = Math.floor((Math.random() * $scope.sols.length));
    var sol = $scope.sols[solIndex];
    var rover = $scope.manifest.photo_manifest.name
    var filteredUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?sol=' + sol + '&camera=' + $scope.camera + '&api_key=T1AUnT68vq8FeqlfaGROtZl5h6mk9iMoz9Z7MKNy';
    $scope.isLoading = true;
    return dataService.getByUrl(filteredUrl)
    .then(onFilter, onError);

  }

  $scope.filterByCamera = function(camera){
    $scope.manualSol = null;
    $scope.sols = [];
    var array = $scope.manifest.photo_manifest.photos;
    $log.info('loop beginning...');
    for(var x=0; x < array.length; x++){
      var cameraArray = array[x].cameras;
      for (var y=0; y < cameraArray.length; y++){
        if (camera == cameraArray[y]){
          $scope.sols.push(array[x].sol);
          $scope.filterCount = $scope.sols.length
            }
          }
        }
    $log.info('loop ended...');
  };

  $scope.filterSols = function(){
    $scope.filteredSols = [];
    var solOnChange = ($scope.manualSol);
    if(solOnChange  == ''){
      return;
    }
    for(var i=0; i < $scope.sols.length; i++){
      var searchPattern = new RegExp('^' + solOnChange);
      if (searchPattern.test($scope.sols[i])) {
        // $log.info($scope.sols[i]);
        $scope.filteredSols.push($scope.sols[i].toString());
      }
    }
  }

  $scope.favRoverpic = function(item){
    $log.info('item to be added...' + item);
    $scope.favourites = dataService.addToStorage('favourites', item);
  }

  $scope.displayRoverpic = function(ev, item){
    $log.info(item);
    $scope.roverImage = item;
    $mdDialog.show({
      contentElement: '#myDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  }

  $scope.saveRoverpic = function(item){
    $log.info(item);
  }

  var setDates = function(){
    $scope.now = moment().format("YYYY-MM-DD");
    var date1 = new Date($scope.now);
    var date2 = new Date($scope.manifest.photo_manifest.max_date);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    $scope.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    // $scope.maxDate = date2.toDateString()
  }

  var onComplete = function(response) {
    $scope.isLoading = false;
    $log.info("get manifest completed...");
    $scope.manualSol = null;
    $scope.camera = null;
    $scope.sols = [];
    $scope.manifest = response.data;
    $scope.cameras = dataService.getCameras($scope.manifest.photo_manifest.name);
    $scope.filtered = [];
    setDates();
  };

  var onFilter = function(response) {
    $scope.isLoading = false;
    $scope.manualSol = null;
    $scope.roverImage = null;
    $scope.filtered = response.data;
    $scope.filterCount = $scope.filtered.photos.length;
    $scope.filteredSols = null;
  };

  var onError = function(reason) {
    $scope.isLoading = false;
    $scope.error = "API call failed, please refresh page to try again";
  };

  $scope.isLoading = false;
  $scope.manualSol = null;
  $scope.rovers = [{
      name:'Spirit',
      url: '/images/spiritback.jpg'},
    {
      name: 'Curiosity',
      url: '/images/curiosityback.jpg'},
    {
      name: 'Opportunity',
      url: '/images/opportunityback.jpg'}];
  $log.info($scope.rovers);

  $scope.manifest = null;
  $scope.defaultUrl = 'https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?&api_key=T1AUnT68vq8FeqlfaGROtZl5h6mk9iMoz9Z7MKNy';
};

app.controller("roverController", roverController);

}());
