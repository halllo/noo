angular.module('ratingsApp', [])
  .controller('RatingsController', ['$scope', function($scope) {
    $scope.ratings = [
      {n:'thing1', u:5, d:3},
      {n:'thing2', u:0, d:2}
    ];
 
    $scope.addRating = function() {
      $scope.ratings.push({n:$scope.newRatingText, u:4, d:2});
      $scope.newRatingText = '';
    };
 
    $scope.ratingsCount = function() {
      return $scope.ratings.length;
    };
  }]);