//This handles retrieving data and is used by controllers.
angular.module('fl.services', ['fl.loader','fl.constants','fl.utils'])

/*.factory('UserService', function($http, LoadingService,URL) {
  return {
    doLogin: function(email,password,callback) {
      console.log(email + password);
      LoadingService.show();
     
       $http.post(URL.loginApi, {"email":email,"password":password})
       .success(function(data){

                if(data){
                    callback(data);
                    LoadingService.hide();
                }
                
            });
      //return chats;
    },
    doLogout: function(chat) {
      //chats.splice(chats.indexOf(chat), 1);
    }

  };
})*/

.factory('TeamService', function($http, $localstorage, LoadingService,URL,CONFIG,BaseService) {
  return {

    getEplTeamList: function(type,callback) {
      
            BaseService.ajaxCall(URL.eplTeamList,null,'GET','minified',function(data){
              //console.log(data);
                    callback(data);
            })

    },

    getTeamPlayers : function(teamId,callback){

            BaseService.ajaxCall(URL.baseUrl+'teams/'+teamId+'/players',null,'GET',null,function(data){
              //console.log(data);
                    callback(data);
            })


    }

  }

})




.factory('SeasonService', function($http, $localstorage, LoadingService,URL,CONFIG,BaseService) {
  return {
    getSeasonList: function(callback) {
      
            BaseService.ajaxCall(URL.seasons,null,'GET',null,function(data){

                    console.log(data);
            })

    },

    getSeasonData: function(type,callback) {

            var seasonData = null;

            BaseService.ajaxCall(URL.seasons,null,'GET','minified',function(data){

                if(data){

                    $(data).each(function(i,list){

                            if(list.league == type){

                               seasonData = list; 
                                return false;
                            }
                    })

                    callback(seasonData);
                   
                }
            })

    },

    loadFixturesAsync : function(teamIds,callback){

      //console.log(teamIds);
      var awayTeamId = teamIds.awayTeamId;
      var homeTeamId = teamIds.homeTeamId;

           var token = $.Deferred();
          BaseService.ajaxCall(URL.baseUrl+'teams/'+homeTeamId,null,'GET',null,function(data){
                      
                
                BaseService.ajaxCall(URL.baseUrl+'teams/'+awayTeamId,null,'GET',null,function(awayData){

                      //console.log(data);
                      var teamData = {};
                      teamData.homeCrestUrl = data.crestUrl ? data.crestUrl : "n/a";
                      teamData.awayCrestUrl = awayData.crestUrl ? awayData.crestUrl : "n/a";

                      callback(teamData);
                      token.resolve();

                })




           })


           return token.promise();

    },

    loadFixtures: function(id, round, callback) {
      var tokens = [];
      var me = this;

         var schedules = [];

            var globalData = {};

            globalData.seasonId =  id;

            this.getSeasonData('PL',function(data){

                    if(data) {

                        
                        globalData.seasonData = data;
                        $localstorage.setObject("globalData",globalData); 

                                
                          var fixtureUrl = URL.seasons+data.id+'/fixtures';
                            
                          if(round != 0){
                              fixtureUrl += '?matchday='+round;
                          }



                          console.log(fixtureUrl);
                         BaseService.ajaxCall(fixtureUrl,null,'GET','minified',function(data){

                           
                            var fixtureList = data.fixtures;

                                $(fixtureList).each(function(i,schedule){

                                   
                                      var awayTeamId = schedule.awayTeamId;
                                      var homeTeamId = schedule.homeTeamId;


                                           tokens.push(me.loadFixturesAsync({awayTeamId:awayTeamId, homeTeamId:homeTeamId},function(teamData){

                                                console.log(teamData);

                                                schedule.homeTeamLogo = teamData.homeCrestUrl;
                                                schedule.awayTeamLogo = teamData.awayCrestUrl;
                                                schedules.push(schedule);
                                             //console.log(schedules);
                                             
                                          }));
                             

                                   
                                })

                                $.when.apply($,tokens)
                                  .then(function() {
                          

                                      console.log("completo");
                                       callback(schedules);
                                //once ALL the sub operations are completed, this callback will be invoked
                                //alert("all async calls completed");

                                });
                              

                         })


                    }

                  
               })


    },

    /*loadFixtures: function(id, round, callback) {

            var schedules = [];

            var globalData = {};

            globalData.seasonId =  id;

            this.getSeasonData('PL',function(data){

                    if(data) {

                        
                        globalData.seasonData = data;
                        $localstorage.setObject("globalData",globalData); 

                                
                          var fixtureUrl = URL.seasons+data.id+'/fixtures';
                            
                          if(round){
                              fixtureUrl += '?matchday='+round;
                          }


                          console.log(fixtureUrl);
                         BaseService.ajaxCall(fixtureUrl,null,'GET',function(data){

                            //console.log(data.fixtures);
                            var fixtureList = data.fixtures;

                                $(fixtureList).each(function(i,schedule){


                                      var awayTeamId = schedule.awayTeamId;
                                      var homeTeamId = schedule.homeTeamId;


                                      BaseService.ajaxCall(URL.baseUrl+'teams/'+awayTeamId,null,'GET',function(data){

                                          //console.log(data);

                                           schedule.teamLogo = data.crestUrl;
                                           schedules.push(schedule);
                                           //console.log(schedules);
                                           callback(schedules);

                                      })



                                   
                                })

                                      

                         })


                    }

                  
               })


              
     
    },*/

    showStandings : function(callback){


          var leagueData = $localstorage.getObject("globalData"); 
          var leagueUrl = URL.seasons+leagueData.seasonData.id+'/leagueTable';
          console.log(leagueUrl);

          BaseService.ajaxCall(leagueUrl,null,'GET',null,function(data){

              callback(data);
          })
                      
                
           
               
     }    






  };
});
