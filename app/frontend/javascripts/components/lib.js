let templateUrl = require('../../templates/components/lib.html');

angular.module('updateme')
.directive('lib', function(Error) {
  return {
    restrict: 'E',
    scope: true,
    bindToController: { attrs: '=' },
    templateUrl,
    controller(Me, Subscription) {
      Subscription.list().then(
        ({ data }) => {
          this.subscription = _.find(data.subscriptions, { libId: this.attrs.id });
          this.subscribed = !!this.subscription;
        },
        Error.report
      );

      this.subscribe = () => {
        Subscription.create({ libId: this.attrs.id, channel: 'stable' }).then(
          ({ data }) => {
            this.subscription = data.subscription;
            this.subscribed = true;
            Subscription.cache.push(data.subscription);
          },
          Error.report
        );
      };

      this.cancel = () => {
        Subscription.remove(this.subscription).then(
          () => {
            _.remove(Subscription.cache, this.subscription);
            this.subscription = null;
            this.subscribed = false;
          },
          Error.report
        );
      };
    },
    controllerAs: 'Lib'
  };
});
