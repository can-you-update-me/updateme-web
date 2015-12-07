angular.module('updateme')
.factory('QuickToast', function($mdToast) {
  return function(text, {
    callback = null,
    action = 'OK',
    hideDelay = 5000,
    highlightAction = false,
    position = 'top right'
  } = {}) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(text)
        .action(action)
        .highlightAction(highlightAction)
        .position(position)
        .hideDelay(hideDelay)
    ).then(callback);
  };
});
