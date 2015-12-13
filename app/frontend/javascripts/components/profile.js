let templateUrl = require('../../templates/components/profile.html');

angular.module('updateme')
.directive('profile', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl,
    controller(Me, User) {
      this.attrs = Me.attrs;
      this.logout = User.logout;
    },
    controllerAs: 'Profile'
  };
});
