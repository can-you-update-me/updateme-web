let templateUrl = require('../../templates/components/get_started.html');

angular.module('updateme')
.directive('getStarted', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl,
    controller(Preload) {
      this.libs = Preload.get('libs');
    },
    controllerAs: 'GetStarted'
  };
});
