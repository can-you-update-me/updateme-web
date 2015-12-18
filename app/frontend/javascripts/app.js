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
    let onlyCallOnObject = (func, data) => {
      if (typeof data !== 'object') { return data; }
      if (data instanceof Array) { return data.map(_.partial(onlyCallOnObject, func)); }
      return func(data);
    };

    let deepSnakeKeys = _.partial(onlyCallOnObject, data => {
      return _(data).map((v, k) => [_.snakeCase(k), deepSnakeKeys(v)]).object().value();
    });

    let deepCamelKeys = _.partial(onlyCallOnObject, data => {
      return _(data).map((v, k) => [_.camelCase(k), deepCamelKeys(v)]).object().value();
    });

    return {
      request(config) {
        config.headers.Authorization = Me.attrs.token;
        config.data = deepSnakeKeys(config.data);

        return config;
      },
      response(response) {
        response.data = deepCamelKeys(response.data);

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

  let requireUser = {
    canAccess: ['$q', '$route', 'Me', ($q, $route, Me) => {
      if (Me.attrs.token) { return $q.resolve(); }

      Me.session.nextPage = {
        url: $route.current.$$route.originalPath,
        params: $route.current.pathParams
      };

      return $q.reject();
    }],
    updateParams: ['$q', '$route', 'Me', ($q, $route, Me) => {
      if (Me.attrs.token &&
          Me.session.nextPage.url == $route.current.$$route.originalPath) {
        $route.updateParams(Me.session.nextPage.params);
        Me.session.nextPage = {};
      }

      return $q.resolve();
    }]
  };

  $routeProvider
    .when('/', { templateUrl: Templates.home })
    .when('/get-started', { templateUrl: Templates.getStarted })
    .when('/libs/:libType', { templateUrl: Templates.libs, resolve: requireUser })
    .when('/login', { templateUrl: Templates.login })
    .otherwise({ redirectTo: '/' });
})
.run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function() {
    $location.url('/login');
  });
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
require('./models/subscription');

require('./components/get_started');
require('./components/libs');
require('./components/login');
require('./components/profile_widget');
require('./components/subscription');

require('./utils/local_storage');
require('./utils/quick_toast');
require('./utils/oauth');
require('./utils/error');
