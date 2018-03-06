var app = angular.module("apodViewer");
app.factory('dataService',
  function($http, $routeParams, $log) {

    var getByDate = function(date){
    return $http.get('https://api.nasa.gov/planetary/apod?date=' + date + '&api_key=T1AUnT68vq8FeqlfaGROtZl5h6mk9iMoz9Z7MKNy');
};

    var getByUrl = function(url){
      $log.info('service called');
      $log.info(url);
      return $http.get(url);
    };

    var getfromStorage = function(collection){
      var string = localStorage.getItem(collection);
      if (string === null){
        var array = [];
      }else{
      array = JSON.parse(string);
      }
      return array;
    };

    var savetoStorage = function(collection, array){
    var string = JSON.stringify(array);
    localStorage.setItem(collection, string);
    };

    var addToStorage = function(collection, item){
      var array = getfromStorage(collection);
      $log.info(array);
      if (collection == 'visited'){
        if(!sizeCheck(array)){
            array.splice(0, 1);
            $log.info('spliced array...' + array.length);
            $log.info(array);
            // array.push(item);
          } 
        if(!dupeCheck(item, array)){
          array.push(item);
          savetoStorage(collection, array);
      }
      return array;
      }else{
        if(!dupeCheck(item, array)){
          $log.info(array.length);
          array.push(item);
          $log.info(array.length);
          $log.info('item added!')
          savetoStorage(collection, array);
      }else{
        $log.info('dupe check failed')
        
      }
      return array;
  }
}

    var deleteFromStorage = function(collection, index){
      $log.info(index);
      var array = getfromStorage(collection);
      array.splice(index, 1);
      $log.info('deleted')
      savetoStorage(collection, array);
      return array;
    };

    var deleteFavourite = function(index){
      $log.info(index);
      var array = getfromStorage('favourites');
      array.splice(index, 1);
      $log.info('deleted')
      savetoStorage('favourites', array);
      return array;
    };

    var dupeCheck = function(item, array){
      if(item.date == null){
        var date = item.earth_date;
      }else{
          date = item.date;
      }
      var dupe = false;
      for(i=0; i < array.length; i++){
        $log.info(date);
        $log.info(array[i].date);
        if(date == array[i].date){
          dupe = true;
        }
      }
      return dupe;
    };

    var sizeCheck = function(array){
      var size = true;
      if(array.length > 9){
        size = false;
      }
      return size;
    };

  var getCameras = function(rover){
      var cameras = [];
      var entryCam = {
        fullName: 'Entry, Descent and Landing Camera',
        name: "ENTRY"
      };

      var fHaz = {
        fullName: 'Front Hazard Avoidance Camera',
        name: "FHAZ"
      };

      var rHaz = {
        fullName: 'Rear Hazard Avoidance Camera',
        name: "RHAZ"
      };

      var panCam = {
        fullName: 'Panoramic Camera',
        name: "PANCAM"
      };

      var navCam = {
        fullName: 'Navigation Camera',
        name: "NAVCAM"
      };

      var chemCam = {
        fullName: 'Chemistry and Camera Complex',
        name: "CHEMCAM"
      };

      var mahliCam = {
        fullName: 'Mars Hand Lens Imager',
        name: "MAHLI"
      };

      var mardiCam = {
        fullName: 'Mars Descent Imager',
        name: "MARDI"
      };

      var mastCam = {
        fullName: 'Mast Camera',
        name: "MAST"
      };

      if(rover == 'Spirit'){
        cameras = [entryCam, fHaz, rHaz, navCam, panCam]
      }else if(rover == 'Opportunity'){
        cameras = [entryCam, fHaz,rHaz, navCam, panCam]
      }else if(rover == 'Curiosity'){
        cameras = [chemCam, fHaz, rHaz, mardiCam, mahliCam, mastCam, navCam]
      }
      $log.info(cameras);
      return cameras;
    };

    return {
      getCameras: getCameras,
      addToStorage: addToStorage,
      deleteFavourite: deleteFavourite,
      getByDate: getByDate,
      getByUrl: getByUrl,
      getfromStorage: getfromStorage,
      savetoStorage: savetoStorage,
      deleteFromStorage: deleteFromStorage
    }
});






  // var dataService = function($scope, $http, $log, $location){
    
  //   var getByDate = function(date){
  //    return $http.get('https://api.nasa.gov/planetary/apod?date=' + date + '&api_key=T1AUnT68vq8FeqlfaGROtZl5h6mk9iMoz9Z7MKNy');
  //     // .then(function(response){
  //     //   // $log.info(response);
  //     //   return response.data;
  //     // });
  //   };
    
  //   var getByUrl = function(url){
  //     $log.info(url);
  //     return $http.get(url)
  //     .then(function(response){
  //       $log.info(response);
  //       return response.data
  //     });
  //   }

  //   var setScopeUrl = function(url){
  //     $scope.url = url;
  //   }
    
  //   return {
  //     getByDate: getByDate,
  //     getByUrl: getByUrl,
  //     setScopeUrl: setScopeUrl
      
  //   };
  // };
  // var module = angular.module("apodViewer");
  // module.factory("dataService", [dataService]);
  


