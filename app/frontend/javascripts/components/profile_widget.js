let templateUrl = require('../../templates/components/profile_widget.html');

angular.module('updateme')
.directive('profileWidget', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl,
    controller(Me, User) {
      this.attrs = {
        get name() { return Me.attrs.name; },
        get email() { return Me.attrs.email; },
        get token() { return Me.attrs.token; },
        get avatarURL() {
          return `//s.gravatar.com/avatar/${Me.attrs.emailDigest}?s=48`;
        }
      };
      this.logout = User.logout;
    },
    controllerAs: 'Profile'
  };
});
