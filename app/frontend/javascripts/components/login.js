let templateUrl = require('../../templates/components/login.html');

angular.module('updateme')
.directive('login', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl,
    controller($location, User, Oauth, Me, QuickToast) {
      this.existingUser = true;

      this.switch = () => {
        this.existingUser = !this.existingUser;
      };

      let redirectNextOrHome = () => {
        $location.url(Me.session.nextURL || '/');
      };

      this.login = () => {
        User.login(this.params).then(
          redirectNextOrHome,
          () => { QuickToast('Failed to login'); }
        );
      };

      this.signup = () => {
        User.signup(this.params).then(
          redirectNextOrHome,
          () => { QuickToast('Failed to sign up'); }
        );
      };

      this.oauth = (service) => {
        Oauth(service).then(
          redirectNextOrHome,
          () => { QuickToast(`Oauth with ${service} failed`); }
        );
      };
    },
    controllerAs: 'Login'
  };
});
