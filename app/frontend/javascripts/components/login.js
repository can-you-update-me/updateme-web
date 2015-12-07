let templateUrl = require('../../templates/components/login.html');

angular.module('updateme')
.directive('login', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl,
    controller($location, User, QuickToast) {
      this.existingUser = true;

      this.switch = () => {
        this.existingUser = !this.existingUser;
      };

      let redirectHome = () => {
        $location.url('/');
      };

      this.login = () => {
        User.login(this.params).then(
          redirectHome,
          () => { QuickToast('Failed to login'); }
        );
      };

      this.signup = () => {
        User.signup(this.params).then(
          redirectHome,
          () => { QuickToast('Failed to sign up'); }
        );
      };
    },
    controllerAs: 'Login'
  };
});
