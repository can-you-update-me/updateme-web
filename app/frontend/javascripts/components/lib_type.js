let templateUrl = require('../../templates/components/lib_type.html');

angular.module('updateme')
.directive('libType', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: templateUrl,
    controller: function($routeParams, $http, Preload) {
      let libTypes = Preload.get('libs');
      let typeKey = $routeParams.libType;

      let libType = _.find(libTypes, 'key', typeKey);

      this.name = libType.name;

      $http.get(`/api/libs/${libType.key}`).then(response => {
        this.knownLibs = response.data.libs;
      });
    },
    controllerAs: 'LibType'
  };
});
