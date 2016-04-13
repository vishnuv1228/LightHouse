angular.module('LightHouse').controller('GoalOverviewCtrl', function (ListFactory, $scope, $state, goalService) {


    if (ListFactory.getList().length === 0) {
        $scope.goals = goalService.getGoals();
        ListFactory.setList($scope.goals);

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

});