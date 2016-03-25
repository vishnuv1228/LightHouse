// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//var LightHouse = angular.module('LightHouse', ['ionic', 'starter.services'])
var LightHouse = angular.module('LightHouse', ['ionic', 'starter.services'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
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

.controller('sampleController', function ($scope) {
    $scope.numberSelection = 1500;

    // To get value from range
    //    $scope.showMeTheNumber = function(){
    //    alert($scope.numberSelection); 
})

.controller('MainCtrl', function ($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
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
                    templateUrl: "templates/calendar.html"
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
        views: {
            'menuContent': {
                templateUrl: "templates/goal_overview.html",
                controller: 'GoalOverviewCtrl'
            }
        }

    })

    .state('create_task', {
        url: '/create_task',
        params: {
            obj: null,
            obj1: null
        },
        templateUrl: 'templates/create_task.html',
        controller: 'CreateTaskCtrl',
        data: {
            goal: null
        }
    })

    .state('create_goal', {
        url: '/create_goal',
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
    })
    $urlRouterProvider.otherwise('/sign_in');
})

.controller('DeadlinesCtrl', function ($scope, $ionicModal, DeadlinesFactory) {
        $scope.deadlines = DeadlinesFactory.getList();
        $scope.data = {
            showDelete: false
        };
        $scope.onItemDelete = function (deadline) {
            $scope.deadlines.splice($scope.deadlines.indexOf(deadline), 1);
            DeadlinesFactory.setList($scope.deadlines);
        };
        // Create and load the Modal
        $ionicModal.fromTemplateUrl('templates/create_deadline.html', function (modal) {
            $scope.deadlineModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });
        // Open our new task modal
        $scope.newDeadline = function () {
            $scope.deadlineModal.show();
        };

        // Close the new task modal
        $scope.closeNewTask = function () {
            $scope.deadlineModal.hide();
        };

        // Called when the form is submitted
        $scope.createDeadline = function (deadline) {
            $scope.deadlines.push({
                title: deadline.title,
                date: deadline.date
            });
            DeadlinesFactory.setList($scope.deadlines);
            $scope.deadlineModal.hide();
            deadline.title = "";

        };



    })
    .controller('TodoCtrl', function ($scope, $ionicModal, TaskFactory) {
        $scope.tasks = TaskFactory.getList();
        $scope.data = {
            showDelete: false
        };

        $scope.onItemDelete = function (task) {
            $scope.tasks.splice($scope.tasks.indexOf(task), 1);
            TaskFactory.setList($scope.tasks);
        };

        $scope.taskCompleted = function (task) {
            task.completed = (task.completed) ? false : true;
        };

        // Create and load the Modal
        $ionicModal.fromTemplateUrl('templates/create_todo_task.html', function (modal) {
            $scope.taskModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        // Called when the form is submitted
        $scope.createTask = function (task) {
            $scope.tasks.push({
                title: task.title
            });
            TaskFactory.setList($scope.tasks);
            $scope.taskModal.hide();
            task.title = "";
        };

        // Open our new task modal
        $scope.newTask = function () {
            $scope.taskModal.show();
        };

        // Close the new task modal
        $scope.closeNewTask = function () {
            $scope.taskModal.hide();
        };
    })

.controller('SignInCtrl', function ($scope, $state) {
    $scope.signIn = function (user) {
        console.log('Sign-In', user);
        $state.go('sidemenu.goal_overview');
    };
    $scope.createAccount = function () {
        $state.go('create_account');
    };
    
    $scope.routeToReflection = function(){
        $state.go('reflection');
    }
})

.controller('AccountCreationCtrl', function ($scope, $state) {
    $scope.userInfo = function (user) {
        console.log('Account', user);
        $state.go('schedule_prompt');
    };
});

LightHouse.controller('SchedulePromptCtrl', ['$scope', '$state', function ($scope, $state)
    {
        $scope.schedulePrompt = function (promptTime) {
            var alarmTime = new Date();
            alert(promptTime.minute);
            alert(promptTime.hour);
            alert(promptTime.period);
            alarmTime.setMinutes(promptTime.minute);
            if (promptTime.period == "AM") {
                alert("here");
                if (promptTime.hour == 12) {
                    promptTime.hour = 0;
                }
                alarmTime.setHours(promptTime.hour);
            } else {
                alarmTime.setHours(promptTime.hour + 19);
            }

            alert(alarmTime.toTimeString());

            cordova.plugins.notification.local.schedule({
                id: 1,
                title: "Lighthouse",
                text: "It's time to reflect on today's tasks!",
                at: alarmTime,
                every: "day"
            });

            cordova.plugins.notification.local.on("click", function (notification) {
                if(notification.id==1)
                    {
                        alert("here");
                        $state.go('reflection');
                    }
            });

            $state.go('create_goal');
        };

}]);

LightHouse.controller('ReflectionCtrl', ['$scope', '$state', 'goalService', function ($scope, $state, goalService)
    {
        var goals=goalService.getGoals();
        $scope.goals=goals;
        $scope.schedule=function()
        {
            $state.go('sidemenu.calendar');
        };
}]);

LightHouse.controller('CreateGoalCtrl', ['ListFactory', '$scope', '$state', 'goalService', function (ListFactory, $scope, $state, goalService) {

    var goalFromPrev = $state.params.obj;
    var goalBank = ListFactory.getList();
    // Set up the initial values for the goal if selected from goal overview

    if (goalFromPrev !== null) {
        $scope.goal = {
            color: goalFromPrev.color,
            name: goalFromPrev.name,
            icon: goalFromPrev.icon,
            freq: goalFromPrev.freq
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
            $state.go('sidemenu.goal_overview');
        } else { // Add new goal
            goal.task = [];

            goal.id = Math.round((Math.random() * 10) * 10);


            goalService.addGoal(goal);
            $state.get('create_task').data.goal = goal;
            $state.go('create_task');
        }


    };
}]);




// 
LightHouse.controller('CreateTaskCtrl', ['ListFactory', '$scope', '$state', 'goalService', function (ListFactory, $scope, $state, goalService) {
    var goalFromPrev = $state.params.obj;
    var taskFromPrev = $state.params.obj1;
    // var goalBank = ListFactory.getList();


    if (taskFromPrev !== null) {
        $scope.task = {
            title: taskFromPrev.title,
            priority: taskFromPrev.priority
        };
    }

    $scope.createTask = function (task) {
        // Assign an id to this new
        if (goalFromPrev !== null) {
            goalService.addTask(goalFromPrev, task);
        } else if (taskFromPrev !== null) {
            var goalBank = goalService.getGoals();
            for (var i = 0; i < goalBank.length; i++) {
                for (var j = 0; j < goalBank[i].task.length; j++) {
                    if (goalBank[i].task[j].id == taskFromPrev.id) {
                        goalBank[i].task[j].freq = task.freq;
                        goalBank[i].task[j].priority = task.priority;
                        goalBank[i].task[j].title = task.title;
                        break;
                    }
                }
            }

        } else {
            goalService.addTask($state.current.data.goal, task);
        }
        //var goalBank1 = ListFactory.getList();
        //ListFactory.setList(goalBank1);
        $state.go('sidemenu.goal_overview');
    };
}]);

LightHouse.service('goalService', function () {
    var currGoal = {};
    var counter = 0;

    var goals = [
        {

            name: 'Healthy Eating',
            color: 'positive',
            freq: 4,
            icon: 'ion-fork',
            id: 1,
            completed: 0,
            task: [
                {
                    title: 'Eating a salad',
                    priority: 'low',
                    completed: true,
                    numCompleted: 0,
                    id: 1
                    }
                ]
       }, {
            name: 'Physical Fitness',
            color: 'energized',
            freq: 3,
            icon: 'ion-android-walk',
            id: 2,
            completed: 0,
            task: [
                {
                    title: 'Running on the treadmill',
                    priority: 'medium',
                    completed: false,
                    numCompleted: 0,
                    id: 2
                    }
                ]
                },
        {
            name: 'Academic Performance',
            color: 'calm',
            freq: 5,
            icon: 'ion-university',
            id: 3,
            completed: 0,
            task: [
                {
                    title: 'Review lecture notes',
                    priority: 'high',
                    completed: false,
                    numCompleted: 0,
                    id: 3
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

    var totalCompleted = 0;

    return {
        addGoal: addGoal,
        getGoals: getGoals,
        addTask: addTask,
        currGoal: currGoal,
        totalFreq: function () {
            for (var i = 0; i < goals.length; i++) {
                counter += goals[i].freq;
            }

            return counter;
        },
        totalCompleted: totalCompleted
    };


});

LightHouse.controller('GoalOverviewCtrl', ['ListFactory', '$scope', '$state', 'goalService', function (ListFactory, $scope, $state, goalService) {

    $scope.prog = {
        progress: 0,
        total: goalService.totalFreq()

    };

    if (ListFactory.getList().length === 0) {
        $scope.goals = goalService.getGoals();
    } else {
        $scope.goals = ListFactory.getList();
    }

    $scope.doRefresh = function () {
        var goalBank = goalService.getGoals();
        ListFactory.setList(goalBank);
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
        $state.go('create_task', {
            obj: goal
        });
    };

    $scope.toggleEdit = function (goal) {
        $state.go('create_goal', {
            obj: goal
        });
    };

    $scope.taskCompleted = function (task, goal) {
        task.completed = (task.completed) ? false : true;
        if (task.completed) {
            task.numCompleted += 1;
            goalService.totalCompleted += 1;
            goal.completed += 1;
        } else if (task.completed === false) {
            task.numCompleted -= 1;
            goalService.totalCompleted -= 1;
            goal.completed -= 1;
        }

        $scope.prog.progress = goalService.totalCompleted;

    };

    $scope.toggleEditTask = function (task) {
        $state.go('create_task', {
            obj1: task
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