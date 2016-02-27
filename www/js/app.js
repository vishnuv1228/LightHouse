// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//var LightHouse = angular.module('LightHouse', ['ionic', 'starter.services'])
var LightHouse = angular.module('LightHouse', ['ionic'])

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
    $stateProvider
        .state('sign_in', {
            url: '/sign_in',
            templateUrl: 'templates/sign_in.html',
            controller: 'SignInCtrl'
        })

    .state('create_account', {
        url: '/create_account',
        templateUrl: 'templates/create_account.html',
        controller: 'AccountCreationCtrl'
    })


    .state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    .state('tabs.goal_overview', {
        url: '/goal_overview',
        views: {
            'create_goal-tab': {
                templateUrl: 'templates/goal_overview.html',
                controller: 'GoalOverviewCtrl'
            }
        }
    })

    .state('tabs.create_task', {
        url: '/create_task',
        views: {
            'create_goal-tab': {
                templateUrl: 'templates/create_task.html',
                controller: 'CreateTaskCtrl'
            }
        },
        data: {
            goal: null
        }
    })

    .state('tabs.create_goal', {
        url: '/create_goal',
        views: {
            'create_goal-tab': {
                templateUrl: 'templates/create_goal.html',
                controller: 'CreateGoalCtrl'
            }
        }
    });
    $urlRouterProvider.otherwise('/sign_in');
})

.controller('SignInCtrl', function ($scope, $state) {
    $scope.signIn = function (user) {
        console.log('Sign-In', user);
        $state.go('tabs.goal_overview');
    };
    $scope.createAccount = function () {
        $state.go('create_account');
    };
})

.controller('AccountCreationCtrl', function ($scope, $state) {
    $scope.userInfo = function (user) {
        console.log('Account', user);
        $state.go('tabs.create_goal');
    };
});

LightHouse.controller('CreateGoalCtrl', ['$scope', '$state', 'goalService', function ($scope, $state, goalService) {
    $scope.createGoal = function (goal) {
        goal.task = [];
        goalService.addGoal(goal);
        console.log('Goal', goalService.getGoals);
        $state.get('tabs.create_task').data.goal = goal;
        $state.go('tabs.create_task');
    };
}]);


// 
LightHouse.controller('CreateTaskCtrl', ['$scope', '$state', 'goalService', function ($scope, $state, goalService) {
    $scope.createTask = function (task) {
        goalService.addTask($state.current.data.goal, task);
        alert(task.title);
        $state.go('tabs.goal_overview');
    };
}]);

LightHouse.service('goalService', function () {
    var currGoal = {};
    var goals = [
        {

            name: 'Healthy Eating',
            color: 'positive',
            icon: 'ion-fork',
            task: [
                {
                    title: 'Eating a salad',
                    freq: 4,
                    priority: 'low'
                    }
                ]
       }, {
            name: 'Physical Fitness',
            color: 'energized',
            icon: 'ion-android-walk',
            task: [
                {
                    title: 'Running on the treadmill',
                    freq: 3,
                    priority: 'medium'
                    }
                ]
                },
        {
            name: 'Academic Performance',
            color: 'calm',
            icon: 'ion-university',
            task: [
                {
                    title: 'Review lecture notes',
                    freq: 5,
                    priority: 'high'
                    }
                ]
                },

   ];

    var addGoal = function (newGoal) {
        goals.push(newGoal);
    };
    var getGoals = function () {
        return goals;
    };

    var addTask = function (goal, task) {
        goal.task.push(task);
    };

    return {
        addGoal: addGoal,
        getGoals: getGoals,
        addTask: addTask,
        currGoal: currGoal,
    };


});


LightHouse.controller('GoalOverviewCtrl', function ($scope, goalService) {
    $scope.goals = goalService.getGoals();

    $scope.data = {
        showDelete: false
    };
    
    $scope.onItemDelete = function(goal) {
            $scope.goals.splice($scope.goals.indexOf(goal), 1);
        };

    /*
     * if given goal is the selected goal, deselect it
     * else, select the given goal
     */
    $scope.toggleGoal = function (goal) {
        if ($scope.isGoalShown(goal)) {
            $scope.shownGoal = null;
        } else {
            $scope.shownGoal = goal;
        }
    };
    $scope.isGoalShown = function (goal) {
        return $scope.shownGoal === goal;
    };

});