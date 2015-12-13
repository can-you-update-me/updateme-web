angular.module('updateme')
.factory('User', function($http, $q, Me) {
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
      return $q(() => { Me.cache({}); });
    }
  };

  return user;
})
.factory('Me', function(LocalStorage) {
  let cachedInfo = LocalStorage('User');
  let { name, email, token } = cachedInfo.get('me', {});

  return {
    name,
    email,
    token,
    cache(data) {
      cachedInfo.put('me', data);
    }
  };
});
