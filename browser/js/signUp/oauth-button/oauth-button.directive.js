'use strict';

app.directive('oauthButton', function () {
  return {
    restrict: 'E',
    scope: {
      providerName: '@'
    },
    templateUrl: 'js/signUp/oauth-button/oauth-button.html'
  };
});
