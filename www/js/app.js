// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//var LightHouse = angular.module('LightHouse', ['ionic','ionic.service.core', 'starter.services'])
angular.module('LightHouse', ['ionic', 'ionic.service.core', 'ionic.service.analytics', 'starter.factories'])

.run(function ($ionicPlatform, $ionicAnalytics) {
    $ionicPlatform.ready(function () {
        $ionicAnalytics.register();
        if (device.platform == "iOS") {
            window.plugin.notification.local.promptForPermission();
        }

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



.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('sign_in', {
            url: '/sign_in',
            templateUrl: 'templates/sign_in.html',
            controller: 'SignInCtrl'
        })

    .state('sidemenu', {
            url: "/side",
            abstract: true,
            templateUrl: "templates/side-menu.html"
        })
        .state('sidemenu.todo', {
            url: "/todo",
            views: {
                'menuContent': {
                    templateUrl: "templates/todo.html",
                    controller: 'TodoCtrl'
                }
            }

        })

    .state('sidemenu.deadlines', {
            url: "/deadlines",
            views: {
                'menuContent': {
                    templateUrl: "templates/deadlines.html",
                    controller: 'DeadlinesCtrl'

                }
            }

        })
        // Add controller for calendar below templateUrl to add functionality
        .state('sidemenu.calendar', {
            url: "/calendar",
            views: {
                'menuContent': {
                    templateUrl: "templates/calendar.html",
                    controller: 'CalendarCtrl'
                }
            }

        })

    .state('create_account', {
        url: '/create_account',
        templateUrl: 'templates/create_account.html',
        controller: 'AccountCreationCtrl'
    })


    .state('sidemenu.goal_overview', {
        url: '/goal_overview',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: "templates/goal_overview.html",
                controller: 'GoalOverviewCtrl'
            }
        }

    })

    .state('create_task', {
        url: '/create_task',
        cache: false,
        params: {
            obj: null,
            obj1: null
        },
        templateUrl: 'templates/create_task.html',
        controller: 'CreateTaskCtrl'
    })

    .state('create_goal', {
        url: '/create_goal',
        cache: false,
        params: {
            obj: null
        },
        templateUrl: 'templates/create_goal.html',
        controller: 'CreateGoalCtrl'

    })

    .state('schedule_prompt', {
        url: '/schedule_prompt',
        templateUrl: 'templates/schedule_prompt.html',
        controller: 'SchedulePromptCtrl'
    })

    .state('reflection', {
        url: '/reflection',
        templateUrl: 'templates/reflection.html',
        controller: 'ReflectionCtrl'
    });
    $urlRouterProvider.otherwise('/sign_in');
});