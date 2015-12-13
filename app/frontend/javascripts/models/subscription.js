angular.module('updateme')
.factory('Subscription', function($http) {
  let Subscription = {
    list: () => $http.get('/api/subscriptions'),
    create: (params) => $http.post('/api/subscriptions', params),
    remove: (subscription) => $http.delete(`/api/subscriptions/${subscription.id}`)
  };

  return Subscription;
});
