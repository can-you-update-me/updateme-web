angular.module('updateme')
.factory('Subscription', function($http, $q, Me) {
  let Subscription = {
    get cache() {
      return _.get(Me.session, 'subscriptions.data.subscriptions');
    },
    list: () => {
      let session = Me.session;

      if (session.subscriptions) { return $q.resolve(session.subscriptions); }

      if (!session.fetchSubscriptions) {
        session.fetchSubscriptions = $http.get('/api/subscriptions');
        session.fetchSubscriptions.then(
          ({ data }) => { session.subscriptions = { data }; }
        );
      }

      return session.fetchSubscriptions;
    },
    create: (params) => $http.post('/api/subscriptions', params),
    remove: (params) => $http.delete(`/api/subscriptions/${params.id}`)
  };

  return Subscription;
});
