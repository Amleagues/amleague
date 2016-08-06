//constant value declarations
var baseUrl = 'http://api.football-data.org/v1/';
angular.module('fl.constants',[])  

  .constant('URL', {
  	'baseUrl': baseUrl,
  	'seasons':baseUrl+'soccerseasons/',
  	'epl':baseUrl+'soccerseasons/398/teams/',
  	'eplTeamList':baseUrl+'soccerseasons/398/teams/',

  })

.constant('CONFIG', {
    'appName': 'Football League',
    'appVersion': 1.0,
    'apiKey': '16b8016930944808b1d35ad547300aee'
   
});