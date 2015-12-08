let Templates = {
  home: require('../templates/home.html'),
  getStarted: require('../templates/pages/get_started.html'),
  libs: require('../templates/pages/libs.html'),
  login: require('../templates/pages/login.html')
};

angular.module('updateme', ['ngAnimate', 'ngMaterial', 'ngAria', 'ngRoute', 'angular-loading-bar'])
.config(function($httpProvider, $mdThemingProvider, $compileProvider, $locationProvider, $routeProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    document.querySelector('meta[name=csrf-token]').content;

  $httpProvider.interceptors.push(function(Me) {
    return {
      request(config) {
        config.headers.Authorization = Me.token;

        if (typeof config.data == 'object') {
          config.data = _.mapKeys(config.data, (_v, k) => _.snakeCase(k));
        }

        return config;
      },
      response(response) {
        if (typeof response.data == 'object') {
          response.data = _.mapKeys(response.data, (_v, k) => _.camelCase(k));
        }

        return response;
      }
    };
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('light-blue', { default: '800' })
    .accentPalette('amber')
    .warnPalette('deep-orange');

  $compileProvider.debugInfoEnabled(false);

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', { templateUrl: Templates.home })
    .when('/get-started', { templateUrl: Templates.getStarted })
    .when('/libs/:libType', { templateUrl: Templates.libs })
    .when('/login', { templateUrl: Templates.login })
    .otherwise({ redirectTo: '/' });
})
.factory('Preload', function($cacheFactory) {
  return $cacheFactory('Preload');
})
.directive('jsonPreload', function(Preload) {
  return {
    restrict: 'A',
    scope: false,
    compile(elem, attrs) {
      Preload.put(attrs.jsonPreload, JSON.parse(elem.html()));
    }
  };
});

require('./user');

require('./models/lib');

require('./components/get_started');
require('./components/libs');
require('./components/login');

require('./utils/local_storage');
require('./utils/quick_toast');
