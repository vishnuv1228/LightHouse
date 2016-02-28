// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//var LightHouse = angular.module('LightHouse', ['ionic', 'starter.services'])
var LightHouse = angular.module('LightHouse', ['ionic', 'starter.services'])

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
        params: {
            obj: null
        },
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
        params: {
            obj: null
        },
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

LightHouse.controller('CreateGoalCtrl', ['ListFactory', '$scope', '$state', 'goalService', function (ListFactory, $scope, $state, goalService) {

    var goalFromPrev = $state.params.obj;
    var goalBank = ListFactory.getList();
    // Set up the initial values for the goal if selected from goal overview

    if (goalFromPrev !== null) {
        $scope.goal = {
            color: goalFromPrev.color,
            name: goalFromPrev.name,
            icon: goalFromPrev.icon
        };
    }

    $scope.createGoal = function (goal) {
        // Update goal
        if (goalFromPrev !== null) {
            for (var i = 0; i < goalBank.length; i++) {
                if (goalBank[i].id == goalFromPrev.id) {
                    goalBank[i].name = goal.name;
                    goalBank[i].color = goal.color;
                    goalBank[i].icon = goal.icon;
                    break;
                }
            }
            ListFactory.setList(goalBank);
            $state.go('tabs.goal_overview');
        } else { // Add new goal
            goal.task = [];
            goal.id = Math.round((Math.random() * 10) * 10);
            goalService.addGoal(goal);
            //console.log('Goal', goalService.getGoals);
            $state.get('tabs.create_task').data.goal = goal;
            $state.go('tabs.create_task');
        }


    };
}]);


// 
LightHouse.controller('CreateTaskCtrl', ['ListFactory', '$scope', '$state', 'goalService', function (ListFactory, $scope, $state, goalService) {
    var goalFromPrev = $state.params.obj;

    $scope.createTask = function (task) {
        if (goalFromPrev !== null) {
            goalService.addTask(goalFromPrev, task);
        } else {
            goalService.addTask($state.current.data.goal, task);
        }
        var goalBank = goalService.getGoals();
        ListFactory.setList(goalBank);
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
            id: 1,
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
            id: 2,
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
            id: 3,
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
        for (var i = 0; i < goals.length; i++) {
            if (goals[i].id == goal.id) {
                goals[i].task.push(task);
                break;
            }
        }
    };

    return {
        addGoal: addGoal,
        getGoals: getGoals,
        addTask: addTask,
        currGoal: currGoal,
    };


});


LightHouse.controller('GoalOverviewCtrl', ['ListFactory', '$scope', '$state', 'goalService', function (ListFactory, $scope, $state, goalService) {


    if (ListFactory.getList().length === 0) {
        $scope.goals = goalService.getGoals();
    } else {
        $scope.goals = ListFactory.getList();
    }

    $scope.doRefresh = function () {
        $scope.goals = ListFactory.getList();
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.data = {
        showDelete: false
    };

    $scope.onItemDelete = function (goal) {
        $scope.goals.splice($scope.goals.indexOf(goal), 1);
        ListFactory.setList($scope.goals);
    };
    
    $scope.onTaskDelete = function (goal, task) {
        for (var i = 0; i < $scope.goals.length; i++) {
            if ($scope.goals[i].id === goal.id) {
                $scope.goals[i].task.splice($scope.goals[i].task.indexOf(task), 1);
                break;
            }
        }
        ListFactory.setList($scope.goals);
    };

    $scope.addTask = function (goal) {
        $state.go('tabs.create_task', {
            obj: goal
        });
    };

    $scope.toggleEdit = function (goal) {
        $state.go('tabs.create_goal', {
            obj: goal
        });
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

}]);