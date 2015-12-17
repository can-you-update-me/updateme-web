let templateUrl = require('../../templates/components/libs.html');

angular.module('updateme')
.directive('libs', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl,
    controller($routeParams, $timeout, Preload, Lib) {
      let libTypes = Preload.get('libs');
      let typeKey = $routeParams.libType;

      let libType = _.find(libTypes, 'key', typeKey);
      if (!libType) { return; }

      let knownLibs = null;
      let scoutTimeout = null;
      let currentLib = null;

      this.name = libType.name;
      this.resultExist = true;
      this.libData = 'Hover a lib to check its details';

      Lib.list(libType.key).then(response => {
        this.filteredLibs = knownLibs = response.data.libs;
      });

      this.filterLibs = (name) => {
        this.resultExist = true;
        this.filteredLibs = _.filter(knownLibs, lib => _.includes(lib.name, name));

        if (!this.filteredLibs.length) {
          this.resultExist = false;
          this.preview(name);
        }
      };

      this.notFound = () => {
        if (!this.search) { return false; }

        return !_.any(knownLibs, lib => lib.name == this.search);
      };

      this.forceSearch = () => {
        this.resultExist = false;
        this.preview(this.search);
      };

      let scoutHandler = ({ data: libData }) => {
        if (libType.key == 'github-repo') {
          return this.libData = atob(libData.content);
        }
        this.libData = JSON.stringify(libData, null, '  ');
      };

      let scoutErrorHandler = (name) => {
        this.libData = `Failed to load the details about ${name}, ` +
          'file an issue if you believe something is wrong';
      };

      this.scout = (lib) => {
        if (currentLib === lib) { return; }

        $timeout.cancel(scoutTimeout);

        scoutTimeout = $timeout(() => {
          this.libData = `Loading data about ${lib.name}...`;
          currentLib = lib;

          Lib.scout(lib).then(scoutHandler, _.partial(scoutErrorHandler, lib.name));
        }, 800);
      };

      this.cancelScout = () => {
        $timeout.cancel(scoutTimeout);
      };

      this.preview = (name) => {
        this.libData = `Trying hard to load this ${libType.name}: ${name}...`;
        this.goodToAdd = false;

        Lib.preview({ name, type: typeKey }).then(
          response => {
            scoutHandler(response);
            this.goodToAdd = true;
          },
          _.partial(scoutErrorHandler, name));
      };

      this.create = (name) => {
        Lib.create({ name, type: typeKey }).then(
          ({ data: lib }) => {
            knownLibs.push(lib);
            this.filterLibs(name);
            currentLib = lib;
          },
          error => {
            console.error(error);
          }
        );
      };
    },
    controllerAs: 'Libs'
  };
});
