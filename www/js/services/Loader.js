//module created to customize the generic loader style
angular.module('fl.loader', [])

.factory('LoadingService', function($http, $ionicLoading) {
  return {
    show: function(email,password) {
	  $ionicLoading.show({
	      template: '<h4>Loading...</h4>'
	    });
    },
    hide: function(chat) {
      $ionicLoading.hide();
    },
    
  };
});
