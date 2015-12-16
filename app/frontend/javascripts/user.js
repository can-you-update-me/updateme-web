angular.module('updateme')
.factory('User', function($http, $q, $location, Me) {
  let cacheMe = (response) => {
    Me.cache(response.data);
  };

  let user = {
    signup(params) {
      return $http.post('/api/users', params).then(cacheMe);
    },
    login(params) {
      return $http.post('/api/sessions', params).then(cacheMe);
    },
    logout() {
      Me.cache({});
      Me.session = {};
      $location.url('/');
      return $q.resolve();
    }
  };

  return user;
})
.factory('Me', function(LocalStorage) {
  let cachedInfo = LocalStorage('User');
  let cachedAttrs = cachedInfo.get('me', {});

  return {
    attrs: cachedAttrs,
    session: { nextPage: {} },
    cache(attrs) {
      this.attrs = attrs;
      cachedInfo.put('me', attrs);
    }
  };
});
