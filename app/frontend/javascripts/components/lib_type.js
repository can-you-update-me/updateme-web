let templateUrl = require('../../templates/components/lib_type.html');

angular.module('updateme')
.directive('libType', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: templateUrl,
    controller: function($routeParams, Preload) {
      this.libs = Preload.get('libs');
      this.type = $routeParams.libType;
    },
    controllerAs: 'LibType'
  };
});
