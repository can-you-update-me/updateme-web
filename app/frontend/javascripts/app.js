let Templates = {
  home: require('../templates/home.html'),
  getStarted: require('../templates/pages/get_started.html'),
  libType: require('../templates/pages/lib_type.html')
};

angular.module('updateme', ['ngAnimate', 'ngMaterial', 'ngAria', 'ngRoute', 'angular-loading-bar'])
.config(function($httpProvider, $mdThemingProvider, $compileProvider, $locationProvider, $routeProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    document.querySelector('meta[name=csrf-token]').content;

  $mdThemingProvider.theme('default')
    .primaryPalette('light-blue', { default: '800' })
    .accentPalette('amber')
    .warnPalette('deep-orange');

  $compileProvider.debugInfoEnabled(false);

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', { templateUrl: Templates.home })
    .when('/get-started', { templateUrl: Templates.getStarted })
    .when('/libs/:libType', { templateUrl: Templates.libType })
    .otherwise({ redirectTo: '/' });
})
.factory('Preload', function($cacheFactory) {
  return $cacheFactory('Preload');
})
.directive('jsonPreload', function(Preload) {
  return {
    restrict: 'A',
    scope: false,
    link(scope, elem, attrs) {
      Preload.put(attrs.jsonPreload, JSON.parse(elem.html()));
    }
  };
});

require('./components/get_started');
require('./components/lib_type');
