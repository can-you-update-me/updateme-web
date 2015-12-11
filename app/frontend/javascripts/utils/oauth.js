angular.module('updateme')
.factory('Oauth', function($window, $q, Preload, Me) {
  let oauthWindowFeatures = [
    'width=800',
    'height=600',
    'resizable=yes',
    'scrollbars=yes'
  ].join(',');

  let oauthLinks = Preload.get('oauthLinks');

  function Oauth(service, oauthEnd) {
    let oauthURL = oauthLinks[service];
    let oauthWindow = window.open(oauthURL, 'OAuth', oauthWindowFeatures);

    let tryCount = 0;
    let pollTimeout = null;

    let listener = ({ data }) => {
      Me.cache(data);
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
