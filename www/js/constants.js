//constant value declarations
var baseUrl = 'https://dl.dropboxusercontent.com/u/9597499/amleague/';
angular.module('fl.constants',[])  

  .constant('URL', {
  	'baseUrl': baseUrl,
  	'seasons':baseUrl+'soccerseasons.json',
  	'epl':baseUrl + 'teams',
  	'eplTeamList':baseUrl+'teams.json',

  })

.constant('CONFIG', {
    'appName': 'Football League',
    'appVersion': 1.0,
    'apiKey': '16b8016930944808b1d35ad547300aee'
   
});