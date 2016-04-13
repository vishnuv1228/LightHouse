angular.module('LightHouse').controller('ReflectionCtrl', function ($scope, $state, goalService,reflectionService, ListFactory)
    {
       var goals = ListFactory.getList();
        if (goals.length === 0) {
            goals = goalService.getGoals();
        }
        $scope.goals = goals;
        $scope.numCompleted = 0;
        for (var x = 0; x < goals.length; x++) {
            for (var y = 0; y < goals[x].task.length; y++) {
                $scope.numCompleted += goals[x].task[y].numCompleted;
            }
        }
        $scope.numTasksInCalendar = 0;
        for (var i = 0; i < goals.length; i++) {
            for (var j= 0; j < goals[i].task.length; j++) {
                if (goals[i].task[j].isNotInCalendar) {
                    $scope.numTasksInCalendar++;
                }
            }
        }
        $scope.reflection;

        $scope.schedule = function () {
            reflectionService.displayAdd=true;
            $state.go('sidemenu.calendar');
        };
});