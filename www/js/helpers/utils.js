angular.module('fl.utils', ['fl.constants'])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    clearAll: function(){
      localStorage.clear();
    }
  }
}])


.factory('BaseService', function($http,LoadingService,CONFIG) {
  return {
    ajaxCall: function(givenUrl,givenData,givenType,minified,callback) {

          LoadingService.show();
          $http({
              headers: minified ? { 'X-Auth-Token': CONFIG.apiKey,'X-Response-Control': 'minified'} : { 'X-Auth-Token': CONFIG.apiKey},
              url: givenUrl,
              dataType: 'json',
              data: givenData,
              type: givenType,

          }).success(function(data){

              console.log('success base ajax call');
              callback(data);
              //LoadingService.hide();

          }).error(function(data){

              console.log('error base ajax call');
              callback(null);
              //LoadingService.hide();

          })
     
    }
    
  };
});