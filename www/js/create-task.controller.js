angular.module('LightHouse').controller('CreateTaskCtrl', function (ListFactory, $scope, $state, goalService) {
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
            for (var x= 0; x < goalBank.length; x++) {
                for (var j = 0; j < goalBank[x].task.length; j++) {
                    if (goalBank[x].task[j].id == taskFromPrev.id) {
                        goalBank[x].task[j].priority = task.priority;
                        goalBank[x].task[j].title = task.title;
                        break;
                    }
                }
            }
        }
            $state.go('sidemenu.goal_overview');
        
    };
});