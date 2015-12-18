angular.module('updateme')
.factory('Error', function($log) {
  return {
    report: (error) => {
      $log.error(error);
    }
  };
});
