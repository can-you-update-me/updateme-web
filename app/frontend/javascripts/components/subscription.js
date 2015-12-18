let templateUrl = require('../../templates/components/subscription.html');

angular.module('updateme')
.directive('subscription', function(Error) {
  return {
    restrict: 'E',
    scope: true,
    bindToController: { lib: '=' },
    templateUrl,
    controller(Me, Subscription) {
      Subscription.list().then(
        ({ data }) => {
          this.attrs = _.find(data.subscriptions, { libId: this.lib.id });
          this.subscribed = !!this.attrs;
        },
        Error.report
      );

      this.subscribe = () => {
        Subscription.create({ libId: this.lib.id, channel: 'stable' }).then(
          ({ data }) => {
            this.attrs = data.subscription;
            this.subscribed = true;
            Subscription.cache.push(data.subscription);
          },
          Error.report
        );
      };

      this.cancel = () => {
        Subscription.remove(this.attrs).then(
          () => {
            _.remove(Subscription.cache, this.attrs);
            this.attrs = null;
            this.subscribed = false;
          },
          Error.report
        );
      };
    },
    controllerAs: 'Subscription'
  };
});
