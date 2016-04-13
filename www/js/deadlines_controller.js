angular.module('LightHouse').controller('DeadlinesCtrl', function ($scope, $ionicModal, DeadlinesFactory) {
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



});