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
      $location.url('/');
      return $q.resolve();
    }
  };

  return user;
})
.factory('Me', function(LocalStorage) {
  let cachedInfo = LocalStorage('User');
  let { name, email, token } = cachedInfo.get('me', {});

  return {
    attrs: {
      name,
      email,
      token
    },
    cache(data) {
      _.assign(this.attrs, _.mapValues(this.attrs, (_v, k) => data[k]));
      cachedInfo.put('me', data);
    }
  };
});
