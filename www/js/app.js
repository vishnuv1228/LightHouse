// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//var LightHouse = angular.module('LightHouse', ['ionic','ionic.service.core', 'starter.services'])
var LightHouse = angular.module('LightHouse', ['ionic', 'ionic.service.core', 'ionic.service.analytics', 'starter.services'])

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
    });
    $urlRouterProvider.otherwise('/sign_in');
})

.controller('CalendarCtrl', function ($scope, goalService, CalendarFactory, ListFactory, $ionicModal) {
    var today = new Date();
    var month = today.getMonth() + 1;
    var d = new Date();
    var weekday = new Array(7);

    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[d.getDay()];
    // The day of the week and the date
    $scope.date = n + " " + month + "/" + today.getDate() + "/" + today.getFullYear();

    // Get all action steps
    var goals = ListFactory.getList();
    if (goals.length === 0) {
        goals = goalService.getGoals();
    }
    $scope.goals = goals;


    // Get all action steps
    $scope.tasks = CalendarFactory.getList();
    var inside = true;
    for (var y = 0; y < $scope.tasks.length; y++) {
        if ($scope.tasks[y].id === 53) {
            inside = false;
        }
    }
    if (inside) {

        // Add in 'task' objects that represent morning, afternoon, evening
        var morningTask = {
            title: "Morning",
            id: 53
        };
        var afternoonTask = {
            title: "Afternoon",
            id: 54
        };
        var eveningTask = {
            title: "Evening",
            id: 55
        };
        $scope.tasks.push(morningTask);
        $scope.tasks.push(afternoonTask);
        $scope.tasks.push(eveningTask);
    }
    // MODAL

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('templates/schedule_day.html', function (modal) {
        $scope.scheduleModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });
    // Open our new task modal
    $scope.scheduleDay = function () {
        $scope.scheduleModal.show();
        console.log($scope.tasks);
    };

    // Close the new task modal
    $scope.closeNewTask = function () {
        $scope.scheduleModal.hide();
    };
    $scope.isChecked = false;
    $scope.selected = [];
    $scope.checkedOrNot = function (task, isChecked, index) {
        if (isChecked) {
            $scope.selected.push(task);
            task.isNotInCalendar = false;
        }
    };

    $scope.addToCalendar = function () {
        for (var z = 0; z < $scope.selected.length; z++) {
            $scope.tasks.push($scope.selected[z]);
        }
        CalendarFactory.setList($scope.tasks);
        $scope.scheduleModal.hide();
    };

    $scope.data = {
        showDelete: false,
        showReorder: false
    };
    $scope.showButton = function(id) {
        return ! (id === 53 || id === 54 || id === 55);
    };

    $scope.onItemDelete = function (task) {
        if (task.id === 53 || task.id === 54 || task.id === 55) {
            return;
        }
        $scope.tasks.splice($scope.tasks.indexOf(task), 1);
        task.isNotInCalendar = true;
        CalendarFactory.setList($scope.tasks);
    };

    $scope.moveItem = function (task, fromIndex, toIndex) {
        if (task.id === 53 || task.id === 54 || task.id === 55) {
            return;
        }
        $scope.tasks.splice(fromIndex, 1);
        $scope.tasks.splice(toIndex, 0, task);
        CalendarFactory.setList($scope.tasks);
    };

    $scope.taskCompleted = function (task) {
        task.completed = (task.completed) ? false : true;


        // Get the goal from the task
        for (var x = 0; x < $scope.goals.length; x++) {
            for (var y = 0; y < $scope.goals[x].task.length; y++) {
                if ($scope.goals[x].task[y].id === task.id) {
                    var goal = $scope.goals[x];
                    var taskInGoal = $scope.goals[x].task[y];
                    taskInGoal.completed = (task.completed) ? false : true;
                    if (task.completed) {
                        taskInGoal.numCompleted += 1;
                        goalService.totalCompleted += 1;
                        goal.completed += 1;
                    } else if (task.completed === false) {
                        taskInGoal.numCompleted -= 1;
                        goalService.totalCompleted -= 1;
                        goal.completed -= 1;
                    }
                }
            }
        }
        ListFactory.setList($scope.goals);

    };





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
        $state.go('sidemenu.calendar');
    };
    $scope.createAccount = function () {
        $state.go('create_account');
    };

    $scope.routeToReflection = function () {
        $state.go('reflection');
    };
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
                alarmTime.setHours(promptTime.hour + 12);
            }

            alert(alarmTime.toTimeString());

            cordova.plugins.notification.local.schedule({
                id: 1,
                title: "Lighthouse",
                text: "It's time to reflect on today's tasks!",
                every: "day"
            });

            cordova.plugins.notification.local.on("click", function (notification) {
                if (notification.id == 1) {
                    alert("here");
                    $state.go('reflection');
                }
            });

            $state.go('create_goal');
        };

}]);

LightHouse.controller('ReflectionCtrl', ['$scope', '$state', 'goalService', function ($scope, $state, goalService)
    {
        var goals = goalService.getGoals();
        $scope.goals = goals;
        $scope.schedule = function () {
            $state.go('sidemenu.calendar');
        };
}]);

LightHouse.controller('CreateGoalCtrl', ['ListFactory', '$scope', '$state', 'goalService', function (ListFactory, $scope, $state, goalService) {

    var goalFromPrev = $state.params.obj;
    var goalBank = ListFactory.getList();
    // Set up the initial values for the goal if selected from goal overview
    
    $scope.goal = {};
    
    if (goalFromPrev !== null) {
        console.log("If you are updating a previous goal");
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
            console.log("Updating Goal");
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
            console.log("adding new goal");
            goal.task = [];
            goal.completed = 0;

            goal.id = Math.round((Math.random() * 10) * 10);

            goalService.addGoal(goal);
            var goals = ListFactory.getList();
            goals.push(goal);
            ListFactory.setList(goals);
            
            
            // Make sure create task has that goal
            $state.go('create_task', {
                obj: goal
            });
            $scope.goal = {};
        }


    };
}]);




// 
LightHouse.controller('CreateTaskCtrl', ['ListFactory', '$scope', '$state', 'goalService', function (ListFactory, $scope, $state, goalService) {
    var goalFromPrev = $state.params.obj;
    var taskFromPrev = $state.params.obj1;

    $scope.task = {};
    

    if (taskFromPrev !== null) {
        $scope.task = {
            title: taskFromPrev.title,
            priority: taskFromPrev.priority,
        };
    }

    $scope.createTask = function (task) {
        // Assign an id to this new
        if (taskFromPrev === null) {
            task.color = goalFromPrev.color;
            task.icon = goalFromPrev.icon;
            console.log("GOAL FROM PREV: " + goalFromPrev.name);
            // Add task to goals
            var goals = ListFactory.getList();
            for (var i = 0; i < goals.length; i++) {
                if (goals[i].id == goalFromPrev.id) {
                    goals[i].task.push(task);
                    break;
                }
            }
            ListFactory.setList(goals);
            $scope.task = {};
        } else {
            var goalBank = ListFactory.getList();
            for (var i = 0; i < goalBank.length; i++) {
                for (var j = 0; j < goalBank[i].task.length; j++) {
                    if (goalBank[i].task[j].id == taskFromPrev.id) {
                        goalBank[i].task[j].priority = task.priority;
                        goalBank[i].task[j].title = task.title;
                        break;
                    }
                }
            }
        }
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
                    priority: 'Morning',
                    completed: false,
                    numCompleted: 0,
                    color: 'positive',
                    icon: 'ion-fork',
                    isNotInCalendar: true,
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
                    priority: 'Afternoon',
                    completed: false,
                    numCompleted: 0,
                    color: 'energized',
                    icon: 'ion-android-walk',
                    isNotInCalendar: true,
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
                    priority: 'Evening',
                    completed: false,
                    numCompleted: 0,
                    color: 'calm',
                    icon: 'ion-university',
                    isNotInCalendar: true,
                    id: 3
                    }
                ]
                },

   ];

    var addGoal = function (newGoal) {
        goals.push(newGoal);
        for (var i = 0; i < goals.length; i++) {
            console.log("Goal " + i + " " + goals[i].name);
        }

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

    var totalCompleted = 1;

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


    if (ListFactory.getList().length === 0) {
        $scope.goals = goalService.getGoals();

    } else {
        $scope.goals = ListFactory.getList();
    }

    // Tally up total frequency of all goals
    var frequency = 0;
    for (var a = 0; a < $scope.goals.length; a++) {
        frequency += $scope.goals[a].freq;
    }
    $scope.prog = {
        progress: 0,
        total: frequency

    };
    // Find total completed
    var totalCompleted = 0;
    for (var b = 0; b < $scope.goals.length; b++) {
        totalCompleted += $scope.goals[b].completed;
    }
    $scope.prog.progress = totalCompleted;


    $scope.doRefresh = function () {
        $scope.goals = ListFactory.getList();
        var totalCompleted = 0;
        for (var b = 0; b < $scope.goals.length; b++) {
            totalCompleted += $scope.goals[b].completed;
        }
        $scope.prog.progress = totalCompleted;
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
    
    $scope.newGoal = function() {
        $state.go('create_goal');
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