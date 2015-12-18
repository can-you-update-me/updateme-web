let templateUrl = require('../../templates/components/profile.html');

angular.module('updateme')
.directive('profile', function(Error) {
  return {
    restrict: 'E',
    scope: false,
    templateUrl,
    controller(Me, Subscription) {
      this.attrs = {};

      Subscription.list().then(
        ({ data }) => {
          this.attrs.subscriptions = data.subscriptions;
        },
        Error.report
      );
    },
    controllerAs: 'Profile'
  };
});
