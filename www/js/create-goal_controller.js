angular.module('LightHouse').controller('CreateGoalCtrl', function (ListFactory, $scope, $state, goalService) {

    var goalFromPrev = $state.params.obj;
    var goalBank = ListFactory.getList();
    // Set up the initial values for the goal if selected from goal overview

    $scope.goal = {};

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
            goal.completed = 0;

            goal.id = Math.round((Math.random() * 10) * 10);

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
});