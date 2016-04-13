angular.module('LightHouse').controller('AccountCreationCtrl', function ($scope, $state) {
    $scope.userInfo = function (user) {
        console.log('Account', user);
        $state.go('schedule_prompt');
    };
});