MainController = angular.module("MainController", []);

MainController.controller("mainCtrl", ["$scope", "$http", "$resource", function($scope, $http, $resource) {
  
    $scope.yelp = [];
    $scope.doctors = [];

    var url = "http://doctorstats.herokuapp.com/api/v1/doctors.json";
    var Connection = $resource(url);

    $scope.getAllDoctors = function() {
      console.log("Hi");
    }

    // $scope.doctors = Connection.query();

}]);