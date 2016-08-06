
angular.module('fl', ['ionic', 'fl.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
//This configures the routes and associates each route with a view and a controller
.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider


.state('seasons', {
    url: '/seasons',
    templateUrl: 'templates/seasons.html',
    controller: 'SeasonController'

  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'SeasonController'
  })

  // Each tab has its own nav history stack:

  .state('tab.schedule', {
    url: '/schedule/:seasonId/:roundId',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/tab-schedule.html',
        controller: 'ScheduleController'
      }
    }
  })

  .state('tab.standings', {
      url: '/standings',
      views: {
        'tab-standings': {
          templateUrl: 'templates/tab-standings.html',
          controller: 'StandingsController'
        }
      }
    })

    .state('tab.teams', {
      url: '/teams',
      views: {
        'tab-teams': {
          templateUrl: 'templates/tab-teams.html',
          controller: 'TeamController'
        }
      }
    })

    .state('tab.players', {
      url: '/teams/:id/:name',
      views: {
        'tab-teams': {
          templateUrl: 'templates/tab-players.html',
          controller: 'TeamController'
        }
      }
    })

    .state('settings', {
      url: '/settings',
      templateUrl: 'templates/settings.html',
      controller: 'SettingsController'
       
    })

    .state('teams', {
      url: '/teams',
      templateUrl: 'templates/teams.html',
      controller: 'TeamController'
       
    });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/seasons');

});
