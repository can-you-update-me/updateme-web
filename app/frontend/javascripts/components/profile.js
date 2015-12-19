let templateUrl = require('../../templates/components/profile.html');

angular.module('updateme')
.directive('profile', function(Error) {
  return {
    restrict: 'E',
    scope: false,
    templateUrl,
    controller(Me, User, Subscription) {
      this.attrs = {
        avatarURL: `//s.gravatar.com/avatar/${Me.attrs.emailDigest}?s=200`
      };

      _.assign(this.attrs, Me.attrs);

      this.editing = false;

      Subscription.list().then(
        ({ data }) => {
          this.attrs.subscriptions = data.subscriptions;
          this.groups = _.groupBy(data.subscriptions, 'lib.type');
        },
        Error.report
      );

      this.prettifyName = (name) => {
        let [_module, className] = name.split('::');
        return _.startCase(className);
      };

      this.edit = () => { this.editing = true; };
      this.save = () => {
        User.update({ name: this.attrs.name }).then(
          ({ data }) => {
            Me.cache(data);
            this.editing = false;
          },
          Error.report
        );
      };
    },
    controllerAs: 'Profile'
  };
});
