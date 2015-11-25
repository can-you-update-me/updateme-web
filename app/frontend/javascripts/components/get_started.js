let templateUrl = require('../../templates/components/get_started.html');

angular.module('updateme')
.directive('getStarted', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: templateUrl,
    controller: function(Preload) {
      this.libs = Preload.get('libs');
    },
    controllerAs: 'GetStarted'
  };
});
