angular.module('updateme')
.factory('Subscription', function($http) {
  let Subscription = {
    list: () => $http.get('/api/subscriptions'),
    create: (params) => $http.post('/api/subscriptions', params),
    remove: (params) => $http.delete(`/api/subscriptions/${params.id}`)
  };

  return Subscription;
});
