// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.

var app = angular.module('app', ['ngRoute']);

app.controller('MapCtrl', ['$scope', '$http', function($scope, $http) {
  function init() {
    var myLatlng = new google.maps.LatLng(41.8237487,-71.4002502);
    var mapOptions = {
      zoom: 15,
      center: myLatlng
    };

    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    $scope.map.markers = [];
    $scope.poi = [];
    $scope.queuedLandmarks = [];
    $scope.nextDestIdx = 0;

    $scope.tripAdvisorRequest();
    //google.maps.event.addDomListener(window, 'load', $scope.populateMap);

    // wow i can't believe I tried to do this
    $('body').keydown(function(e) { handleKeydowns(e); });
  }

  $scope.tripAdvisorRequest = function () {
    $http.get('api/landmarks/providence/').success(function (data) {
      $scope.dataPoints = data;
      console.log($scope.dataPoints);
    });
  };

  $scope.enqueue = function (index) {
    var addIndex = $scope.queuedLandmarks.indexOf($scope.dataPoints.landmarks[index]);
    if (addIndex < 0) {
      $scope.queuedLandmarks.push($scope.dataPoints.landmarks[index]);
    }
  }

  $scope.queueRemove = function (index) {
    var removeIndex = $scope.queuedLandmarks.indexOf($scope.dataPoints.landmarks[index]);
    if (removeIndex > -1) {
      $scope.queuedLandmarks.splice(removeIndex, 1);
    }
  }

  function createMarker(infowindow, point, name) {
      var marker = new google.maps.Marker({
          position: point,
          map: $scope.map,
          title: name
      });

      google.maps.event.addListener(marker, 'click', function() {
        if ($scope.curInfoWindow != undefined) {
          $scope.curInfoWindow.close();
        }

        $scope.curInfoWindow = infowindow;
        $scope.curInfoWindow.open($scope.map, marker);
      });

      $scope.map.markers.push(marker);
  }

  $scope.populateMap = function() {
    var landmarks = $scope.queuedLandmarks;
    for (var i = 0; i < landmarks.length; i++) {
      var point = new google.maps.LatLng(landmarks[i].latitude, landmarks[i].longitude);
      $scope.poi.push(point);
      var contentString = '<div class="marker-popup" id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">' +
          landmarks[i].name +
          '</h1>'+
          '<div id="bodyContent">'+
          '<p>' +
          landmarks[i].description +
          '</p>'+
          '</div>'+
          '</div>';

      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });

      createMarker(infowindow, point, landmarks[i].name);
    }

    var tourPath = new google.maps.Polyline({
      path: $scope.poi,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    tourPath.setMap($scope.map);
  };

  function handleKeydowns(e) {
    // Spacebar for demo
    if (e.keyCode == 32) {
      $scope.$apply(function () {
        goNextDest(e);
      });
    }
  }

  function goNextDest(e) {
    /* Fancy spacebar stuff
    if ($scope.nextDestIdx < $scope.queuedLandmarks.length) {
      $scope.nextDestIdx++;
    } else {
      $scope.nextDestIdx = 0;
    }
    */

    $scope.queueRemove(0);
    $('.next-uber-modal-lg').modal('show');

    e.preventDefault();
  }

  init();
}]);

app.factory('tripAdvice', ['$http', function($http) {
  return {
    retrieveTripData: function() {
      $http.get('api/landmarks/providence').success(function (data) {
        var points = data;
        console.log(points);
      });
    }
  }
}]);
