MapsController = angular.module("MapsController", []);

MapsController.controller('mapCtrl', ["$scope", "$http", "$resource", function($scope, $http, $resource) {
    var apiUrl = "http://doctorstats.herokuapp.com/api/v1/";
    var mapStyles = [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}];


    $scope.map = {
      currentMarker: {},
      control: {},
      api: [],
      markers: [],
      center: {
        latitude: 37.7683,
        longitude: -122.4408
      },
      zoom: 12,
      zoomControl: false,
      scaleControl: false,
      scrollwheel: false,
      styles: mapStyles,
      dragging: true,
      windowOptions: {
        pixelOffset: {
          width: 0,
          height: -40
        }
      },
    };
    $scope.markersOptions = {animation: google.maps.Animation.DROP};

    $scope.numPages = function () {
      return Math.ceil($scope.map.api.length / $scope.numPerPage);
    };
    
    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.$watch('currentPage + numPerPage', function() {
      var begin = (($scope.currentPage - 1) * $scope.numPerPage);
      var end = begin + $scope.numPerPage;
      $scope.map.markers = $scope.map.api.slice(begin, end);
    });

    $scope.maxSize = 3;
    $scope.more = true;
    $scope.currentPage = 0;
    $scope.numPerPage = 10;
    $scope.loading = false;
    $scope.statusBar = "Showing" + ($scope.map.markers.length === 0 ? "0" : $scope.limit.toString()) + "results";

    $scope.insurances = [
    { value: "1", display: "Blue Cross PPO and EPO" },
    { value: "2", display: "Blue Cross HMO" },
    { value: "3", display: "Kaiser" },
    { value: "4", display: "Blue Shield PPO" },
    { value: "5", display: "Blue Shield EPO" },
    { value: "6", display: "Chinese Community Health Plan" }
    ];

    $scope.doctors = [
      { value: "1", display: "name" },
      { value: "2", display: "specialty" },
      { value: "3", display: "medical_group"}
    ];

    $scope.specialtyOptions = [
      { url: "acupuncture", display: "Acupuncture" },
      { url: "adult+medicine", display: "Adult Medicine" },
      { url: "allergy", display: "Allergy" },
      { url: "anesthesiology", display: "Anesthesiology" },
      { url: "audiologist", display: "Audiologist" },
      { url: "cardio", display: "Cardiology" },
      { url: "chiropractor", display: "Chiropractic" },
      { url: "dermatology", display: "Dermatology" },
      { url: "radiology", display: "Radiology" },
      { url: "emergency+medicine", display: "Emergency Medicine" },
      { url: "family+practice", display: "Family Practice" },
      { url: "gastroenterology", display: "Gastroenterology" },
      { url: "pediatrics", display: "Pediatrics" },
      { url: "general+practice", display: "General Practice" },
      { url: "gynecology", display: "Gynecology" },
      { url: "specialist", display: "HIV/AIDS Specialist" },
      { url: "hematology", display: "Hematology" },
      { url: "Infectious", display: "Infectious Disease" },
      { url: "internal", display: "Internal Medicine" },
      { url: "nephrology", display: "Nephrology" },
      { url: "neurology", display: "Neurology" },
      { url: "occupational", display: "Occupational Therapy" },
      { url: "ophthalmologist", display: "Ophthalmology" },
      { url: "optometrist", display: "Optometry" },
      { url: "otolaryngology", display: "Otolaryngology" },
      { url: "pathology", display: "Pathology" },
      { url: "physical+therapy", display: "Physical Therapy" },
      { url: "podiatry", display: "Podiatry" },
      { url: "otolaryngology", display: "Otolaryngology" },
      { url: "surgery", display: "Surgery" },
      { url: "urology", display: "Urology" },
      { url: "speech", display: "Speech Pathology" },
      { url: "oncology", display: "Oncology" },
      { url: "preventive", display: "Preventive Medicine" },
    ];

    var iconBase = "http://maps.google.com/mapfiles/kml/pal4/icon63.png";

    $scope.alreadySearched = false;
    $scope.tryAgain = false;


    $scope.clearMap = function() {
      $scope.map.api = [];
      $scope.map.markers = [];
      $scope.map.zoom = 12;
      $scope.map.center = {
        latitude: 37.7683,
        longitude: -122.4408
      };
      $scope.alreadySearched = false;
      $scope.map.currentMarker = {};
      doctorForm.reset();
      if ($scope.doctor) {
        if ($scope.doctor.text !== undefined || $scope.doctor.text !== null) {
          $scope.doctor.text = "";
        }
      }
      $scope.doctor = false;
      $scope.insurance = false;
    };

    $scope.getDoctors = function() {
      var option;
      var connection;
      if ($scope.insurance === undefined || $scope.insurance.value === undefined) {
        $scope.tryAgain = true;
        return;
      }
      $scope.alreadySearched = true;
      $scope.tryAgain = false;

      if ($scope.doctor === undefined || $scope.doctor === null) {
         option = null;
      } else if ($scope.doctor.display == "name" || $scope.doctor.display == "medical_group") {
        option = "?" + $scope.doctor.display + "=" + $scope.doctor.text;
      } else if ($scope.doctor.display === "specialty" && $scope.specialtyOption) {
        option = "?specialty=" + $scope.specialtyOption.url;
      } else {
        option = null;
      }
      
      if ($scope.insurance.value === "1" && option === null) {
        $scope.loading = true;
        connection = $resource(apiUrl + "blue_cross.json");
        populateMarkers(connection);
      
      } else if ($scope.insurance.value === "1" && option !== null) {
        $scope.loading = true;
        connection = $resource(apiUrl + "blue_cross.json" + option);
        populateMarkers(connection);
      
      } else if ($scope.insurance.value === "2" && option === null) {
        $scope.loading = true;
        connection = $resource(apiUrl + "blue_cross_HMO.json");
        populateMarkers(connection);
      
      } else if ($scope.insurance.value === "2" && option !== null) {
        $scope.loading = true;
        connection = $resource(apiUrl + "blue_cross_HMO.json" + option);
        populateMarkers(connection);     
      
      } else if ($scope.insurance.value === "3" && option === null) {
        $scope.loading = true;
        connection = $resource(apiUrl + "kaiser.json");
        populateMarkers(connection);
      
      } else if ($scope.insurance.value === "3" && option !== null) {
        $scope.loading = true;
        connection = $resource(apiUrl + "kaiser.json" + option);
        populateMarkers(connection);
      
      } else if ($scope.insurance.value === "4" && option === null) {
        $scope.loading = true;
        connection = $resource(apiUrl + "blue_shield.json");
        populateMarkers(connection);
      
      } else if ($scope.insurance.value === "4" && option !== null) {
        $scope.loading = true;
        connection = $resource(apiUrl + "blue_shield.json" + option);
        populateMarkers(connection);
      
      } else if ($scope.insurance.value === "5" && option === null) {
        $scope.loading = true;
        connection = $resource(apiUrl + "blue_shield_EPO.json");
        populateMarkers(connection);
      
      } else if ($scope.insurance.value === "5" && option !== null) {
        $scope.loading = true;
        connection = $resource(apiUrl + "blue_shield_EPO.json" + option);
        populateMarkers(connection);
      
      } else if ($scope.insurance.value === "6" && option === null) {
        $scope.loading = true;
        connection = $resource(apiUrl + "cchp.json");
        populateMarkers(connection);
      
      } else if ($scope.insurance.value === "6" && option !== null) {
        $scope.loading = true;
        connection = $resource(apiUrl + "cchp.json" + option);
        populateMarkers(connection);
      
      } else {
      }
    };

    $scope.markersEvents = {
      click: function (gMarker, eventName, marker) {
        // $scope.map.center = {
        //   latitude: marker.latitude,
        //   longitude: marker.longitude
        // };
        // $scope.map.zoom = 13;
        marker.onClick();
        $scope.$apply();
        // if (marker.name.split(" ").length > 3) {
        //   marker.name = marker.name.split(" ")[0] + " " + marker.name.split(" ")[1] + " " + marker.name.split(" ")[3];
        // };
        // var urlFriendlyName = marker.name.replace(/ /g, '+')
        // var url = "/lookup?q=" + urlFriendlyName + "&l=" + marker.zip_code + "&limit=3"
        // var service = $resource(url);
        // marker.url = "http://www.google.com/#q=" + urlFriendlyName

        // service.get().$promise.then(function (data) {
        //   if (data.businesses) {
        //     resultArray = data.businesses;
        //     _.each(resultArray, function (business) {
        //       var markerName = marker.name.replace(/,/g, '').replace(/\./g, '').toLowerCase().split(" ")
        //       var businessName = business.name.replace(/,/g, '').replace(/\./g, '').toLowerCase().split(" ")
        //       if (_.intersection(markerName, businessName).length > 2) {
        //         marker.stars = business.rating_img_url;
        //         marker.url = business.url;
        //         marker.isYelped = true;
        //       }
        //     });
        //   } else {
        //     alert("no results");
        //   }
        // });
      },
      mouseover: function(gMarker, eventName, marker) {
        // marker.onClick();
        // $scope.$apply();
        // var urlFriendlyName = marker.name.replace(/ /g, '+')
        // var urlFriendlyAddress = marker.address.replace(/ /g, '+')
        // var url = "/lookup?q=" + urlFriendlyName + "&l=" + marker.zip_code + "&limit=2"
        // var service = $resource(url);
        // marker.url = "http://www.google.com/#q=" + urlFriendlyName

        // service.get().$promise.then(function (data){
        //   if (data.businesses) {
        //     resultArray = data.businesses;
        //     _.each(resultArray, function (business) {
        //       console.log(business)
        //       var markerName = marker.name.replace(/,/g, '').toLowerCase().split(" ")
        //       var businessName = business.name.replace(/,/g, '').toLowerCase().split(" ")
        //       if (_.intersection(markerName, businessName).length > 2) {
        //         console.log("match")
        //         marker.stars = business.rating_img_url;
        //         marker.url = business.url;
        //         marker.isYelped = true;
        //       }
        //     });
        //   } else {
        //     console.log("noresults")
        //   }
        // });
      },
      mouseout: function(gMarker, eventName, marker) {
        // marker.closeClick();
        // marker.showWindow = false;
        // $scope.$apply();
      }
    }

    var populateMarkers = function(connection) {
      connection.query().$promise.then(function (result) {
        _.each(result, function(item) {
          if (item.latitude !== null && item.longitude !== null) {
            item.icon = iconBase;
            item.url = null;
            item.showWindow = false;
            item.isYelped = false;
            item.stars = null;
            
            item.onClick = function() {
              $scope.map.currentMarker = {};
              item.showWindow = true;
              $scope.map.currentMarker = item;
              $scope.map.center = {
                latitude: item.latitude,
                longitude: item.longitude
              };
              if ($scope.map.zoom < 13) {
                $scope.map.zoom = 13;
              }
              if (item.name.split(" ").length > 3) {
                item.name = item.name.split(" ")[0] + " " + item.name.split(" ")[1] + " " + item.name.split(" ")[3];
              };
              var urlFriendlyName = item.name.replace(/ /g, '+')
              var url = "/lookup?q=" + urlFriendlyName + "&l=" + item.zip_code + "&limit=3"
              var service = $resource(url);
              item.url = "http://www.google.com/#q=" + urlFriendlyName

              service.get().$promise.then(function (data) {
                if (data.businesses) {
                  resultArray = data.businesses;
                  _.each(resultArray, function (business) {
                    var itemName = item.name.replace(/,/g, '').replace(/\./g, '').toLowerCase().split(" ")
                    var businessName = business.name.replace(/,/g, '').replace(/\./g, '').toLowerCase().split(" ")
                    if (_.intersection(itemName, businessName).length > 2) {
                      item.stars = business.rating_img_url;
                      item.url = business.url;
                      item.isYelped = true;
                    }
                  });
                } else {
                  alert("no results");
                }
              });
            };

            item.closeClick = function() {
            item.showWindow = false;
            $scope.map.currentMarker = {};
            };

            if (_.find($scope.map.api, { 'name': item.name }) === undefined) {
              $scope.map.api.push(item);
            }
          }
        });
        $scope.numPages();  
        $scope.setPage(1);  
        $scope.loading = false;
        $scope.map.markers = $scope.map.api
        $scope.totalItems = $scope.map.markers.length
        $scope.statusBar = "Showing " + ($scope.map.markers.length === 0 ? "0" : $scope.numPerPage.toString()) + " of " + $scope.map.api.length + " results";
      });
    };
}]);
