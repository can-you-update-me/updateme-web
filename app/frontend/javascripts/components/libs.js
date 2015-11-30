let templateUrl = require('../../templates/components/libs.html');

angular.module('updateme')
.directive('libs', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: templateUrl,
    controller: function($routeParams, $http, $sce, $timeout, Preload) {
      let libTypes = Preload.get('libs');
      let typeKey = $routeParams.libType;

      let libType = _.find(libTypes, 'key', typeKey);
      let previewTimeout = null;
      let currentLib = null;

      this.name = libType.name;

      $http.get(`/api/libs/${libType.key}`).then(response => {
        this.knownLibs = response.data.libs;
      });

      this.libData = 'Hover a lib to check its details';

      this.preview = (lib) => {
        if (currentLib === lib) { return; }

        $timeout.cancel(previewTimeout);

        previewTimeout = $timeout(() => {
          this.libData = `Loading data about ${lib.name}...`;
          currentLib = lib;

          $http.get(`/api/libs/${lib.id}/preview`).then(response => {
            if (libType.key == 'github-repo') {
              return this.libData = atob(response.data.content);
            }
            this.libData = JSON.stringify(response.data, null, '  ');
          });
        }, 800);

        this.cancelPreview = () => {
          $timeout.cancel(previewTimeout);
        };
      };
    },
    controllerAs: 'Libs'
  };
});
