angular.module('LightHouse').controller('CalendarCtrl', function ($state, $scope, goalService,reflectionService, CalendarFactory, ListFactory, $ionicModal) {
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
    
    $scope.showAdd = function(){
        if(reflectionService.displayAdd === undefined){
            reflectionService.displayAdd=true;
        }
      return reflectionService.displayAdd;  
    };
    
    $scope.showReflection = function(){
        return !reflectionService.displayAdd;
    };
    
    $scope.routeToReflect = function(){
        reflectionService.displayAdd=true;
        $state.go('reflection');
    };


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

        var goal;
        var taskInGoal;
        // Get the goal from the task
        for (var x = 0; x < $scope.goals.length; x++) {
            for (var y = 0; y < $scope.goals[x].task.length; y++) {
                if ($scope.goals[x].task[y].id === task.id) {
                    goal = $scope.goals[x];
                    taskInGoal = $scope.goals[x].task[y];
                    break;
                }
            }
        }
        if (task.completed) {
            taskInGoal.numCompleted += 1;
            goalService.totalCompleted += 1;
            goal.completed += 1;
        } else {
            taskInGoal.numCompleted -= 1;
            goalService.totalCompleted -= 1;
            goal.completed -= 1;
        }
        ListFactory.setList($scope.goals);

    };


});


    