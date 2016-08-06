angular.module('fl.controllers', ['ngCordova', 'fl.utils', 'fl.services', 'ionicLazyLoad'])

.controller('SeasonController', function($scope, $stateParams, $rootScope) {
    
    $scope.$on('$ionicView.enter', function(e) {
        $rootScope.showLeftMenu = false;
        $rootScope.showRightMenu = false;
    });

})

.controller('ScheduleController', function($scope, $timeout, $state, $stateParams, SeasonService, LoadingService, $rootScope, $ionicSideMenuDelegate) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    console.log($stateParams);
    var round = $stateParams.roundId;
    $scope.showMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };


    $scope.showRightMenu = function() {
        $ionicSideMenuDelegate.toggleRight();
    };


    $scope.$on('$ionicView.enter', function(e) {

        if($stateParams.seasonId){
            $rootScope.showLeftMenu = true;
            $rootScope.showRightMenu = true;
        }

    });


    var rounds = [];
    for (var i = 1; i < 39; i++) rounds.push(i);
    $scope.rounds = rounds;



    if($stateParams.seasonId){

        SeasonService.loadFixtures($stateParams.seasonId, round, function(data) {
            console.log(data);

            $scope.fixtures = data;
            $scope.round = round;

            LoadingService.hide();

        })
    }


})

.controller('StandingsController', function($scope, $stateParams, $localstorage, $rootScope,SeasonService,LoadingService) {

    $scope.$on('$ionicView.enter', function(e) {

        $rootScope.showSettingsIcon = false;

    });



        SeasonService.showStandings(function(data) {
            console.log(data);

            $scope.leagueTable = data.standing;
            $scope.screenTitle =  data.leagueCaption;
            LoadingService.hide();

        })
    //var season = $localstorage.getObject("season");

    //alert(season.id);


})

.controller('SettingsController', function($localstorage, $scope, $state, $stateParams, $timeout) {


    /* $scope.settingsList = [

       { text: "Wireless", checked: true },
       { text: "GPS", checked: false },
       { text: "Bluetooth", checked: false }

     ];*/
    $scope.hideBackButton = false;
    /*$scope.goTosettings = function(){

       $state.go('settings');
     }*/

    $scope.selectTeam = function() {

        $state.go('teams');
    }


    $scope.pushNotificationChange = function() {
        console.log('Push Notification Change', $scope.pushNotification.checked);
    };

    $scope.pushNotification = {
        checked: true
    };
    

    $scope.$on('$ionicView.enter', function(e) {

        var favTeam = $localstorage.getObject("favTeam");

        $scope.favClub = favTeam.name;


    })


})

.controller('TeamController', function($stateParams,$state,$scope, TeamService, LoadingService, $localstorage) {

    console.log($state);
    console.log($state.current.name);

     $scope.$on('$ionicView.enter', function(e) {


        if($state.current.name == "tab.players"){
           $scope.teamName = $stateParams.name;
        }

     })



       if($state.current.name == "tab.players"){

             var teamId = $stateParams.id;


            TeamService.getTeamPlayers(teamId,function(data){

                var players = data.players;

                $scope.players = players;
             
                console.log(data);
                LoadingService.hide();

            })
        } else {
    

            TeamService.getEplTeamList('EPL', function(list) {
                //console.log(list);

                $scope.teams = list.teams;

                if($state.current.name != "tab.teams"){
                    var favTeam = $localstorage.getObject("favTeam");
                    $scope.teamName = favTeam.code;
                }

                LoadingService.hide();


            })
        }



    $scope.showPlayers = function(team){
        $state.go('tab.players',{id:team.id,name:team.name});

    },

    $scope.teamChange = function(team) {
        //console.log(team);

        $localstorage.setObject("favTeam", {
            'code': team.code,
            'name': team.name
        });
         $state.go('settings');
    }




});