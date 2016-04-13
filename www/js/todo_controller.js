angular.module('LightHouse').controller('TodoCtrl', function ($scope, $ionicModal, TaskFactory) {
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