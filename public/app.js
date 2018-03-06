(function () {
  var app = angular.module('apodViewer', ["ngRoute", 'ngAnimate', 'ngMaterial']);

  app.config(function ($routeProvider, $locationProvider) {
    // $locationProvider.hashPrefix('');
    $routeProvider
        .when("/main", {
          templateUrl: 'views/home.html', 
          controller: "homeController"
        })
        .when("/apod", {
          templateUrl: 'views/apod.html', 
          controller: "ApodController"
        })
        .when("/favourites", {
          templateUrl: 'views/favourites.html', 
          controller: "favsController"
        })
        .when("/rovers", {
          templateUrl: 'views/rovers.html', 
          controller: "roverController"
        })
        .when("/play", {
          templateUrl: 'views/playground.html', 
          controller: "playController"
        })
        // .when("/neo", {
        //   templateUrl: 'views/neo.html', 
        //   // controller: "apodController"
        // })
        .otherwise({redirectTo: "/main"});
  });
}());