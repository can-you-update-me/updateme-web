angular.module('updateme')
.factory('QuickToast', function($mdToast) {
  return function(text, {
    action = 'OK',
    hideDelay = 5000,
    highlightAction = false,
    position = 'top right'
  } = {}) {
    return $mdToast.show(
      $mdToast.simple()
        .textContent(text)
        .action(action)
        .highlightAction(highlightAction)
        .position(position)
        .hideDelay(hideDelay)
    );
  };
});
