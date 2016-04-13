angular.module('LightHouse').service('goalService', function () {
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