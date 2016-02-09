// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])


.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.controller('sampleController', function ($scope) {
    $scope.numberSelection = 1500;

    // To get value from range
    //    $scope.showMeTheNumber = function(){
    //    alert($scope.numberSelection); 
})



.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('tabs', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('tabs.create_task', {
            url: '/create_task',
            views: {
                'create_goal-tab': {
                    templateUrl: 'templates/create_task.html',
                }
            }
        })
        .state('tabs.create_goal', {
            url: '/create_goal',
            views: {
                'create_goal-tab': {
                    templateUrl: 'templates/create_goal.html'
                }
            }
        });
    $urlRouterProvider.otherwise('/tab/create_goal');
});