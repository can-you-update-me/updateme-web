let KeyCases = require('./key_cases');

angular.module('updateme')
.factory('OauthLinks', function(Preload) {
  let { github } = Preload.get('oauthClientIds');

  return {
    github: `https://github.com/login/oauth/authorize?client_id=${github}&scope=user:email`
  };
})
.factory('Oauth', function($window, $q, OauthLinks, Me) {
  let oauthWindowFeatures = [
    'width=800',
    'height=600',
    'resizable=yes',
    'scrollbars=yes'
  ].join(',');

  function Oauth(service, oauthEnd) {
    let oauthURL = OauthLinks[service];
    let oauthWindow = window.open(oauthURL, 'OAuth', oauthWindowFeatures);

    let tryCount = 0;
    let pollTimeout = null;

    let listener = ({ data }) => {
      Me.cache(KeyCases.deepCamelKeys(data));
      oauthEnd.resolve(data);

      oauthWindow.close();
      clearTimeout(pollTimeout);

      $window.removeEventListener('message', listener);
    };

    let pollProgress = function() {
      oauthWindow.postMessage('progress', '*');

      if (tryCount < 20 && !oauthWindow.closed) {
        pollTimeout = setTimeout(pollProgress, 3000);
      } else {
        oauthEnd.reject();
        oauthWindow.close();
        $window.removeEventListener('message', listener);
      }

      tryCount++;
    };

    $window.addEventListener('message', listener);

    pollProgress();
  }

  return function(service) {
    let oauthEnd = $q.defer();

    // somehow had to use this extra timeout to get away
    // from a mysterious unprotected $apply call
    setTimeout(_.partial(Oauth, service, oauthEnd));

    return oauthEnd.promise;
  };
});
