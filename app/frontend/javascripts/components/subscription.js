let templateUrl = require('../../templates/components/subscription.html');

angular.module('updateme')
.directive('subscription', function() {
  return {
    restrict: 'E',
    scope: true,
    bindToController: { lib: '=' },
    templateUrl,
    controller(Me, Subscription) {
      this.attrs = _.find(Me.attrs.subscriptions, { libId: this.lib.id });

      this.subscribed = !!this.attrs;

      this.subscribe = () => {
        Subscription.create({ libId: this.lib.id, channel: 'stable' }).then(
          ({ data: subscription }) => {
            this.attrs = subscription;
            this.subscribed = true;
            Me.update({ subscriptions: [...Me.attrs.subscriptions, subscription] });
          },
          error => {
            console.error(error);
          }
        );
      };

      this.cancel = () => {
        Subscription.remove(this.attrs).then(
          () => {
            Me.update({ subscriptions: _.reject(Me.attrs.subscriptions, this.attrs) });
            this.attrs = null;
            this.subscribed = false;
          },
          error => {
            console.error(error);
          }
        );
      };
    },
    controllerAs: 'Subscription'
  };
});
