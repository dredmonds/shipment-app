// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.views.transition('none');
    $stateProvider
      .state('dashboard', {
          url: '/dashboard',
          abstract: true,
          templateUrl: 'dashboard.html',
          // controller: 'dashboard'
      })
      .state('dashboard.home', {
          url: '/home',
          views: {
              'content': {
                  templateUrl: 'modules/home/HomeView.html',
                  controller: 'HomeController',
                  controllerAs: 'vm'
              }
          }
      })
      .state('dashboard.shipment', {
          url: '/shipment',
          views: {
              'content': {
                  templateUrl: 'modules/shipment/ShipmentView.html',
                  controller: 'ShipmentController',
                  controllerAs: 'vm'
              }
          }
      })
      .state('dashboard.analytics', {
          url: '/analytics',
          views: {
              'content': {
                  templateUrl: 'modules/analytics/AnalyticsView.html',
                  controller: 'AnalyticsController',
                  controllerAs: 'vm'
              }
          }
      })

   $urlRouterProvider.otherwise('/dashboard');
})


.run(function($ionicPlatform, $ionicPopup, $state, $rootScope, $http) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $state.go('dashboard.home');
})
