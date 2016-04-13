angular.module('LightHouse').controller('SignInCtrl', function ($scope, $state) {
    $scope.signIn = function (user) {
        $state.go('sidemenu.calendar');
    };
    $scope.createAccount = function () {
        $state.go('create_account');
    };

    $scope.routeToReflection = function () {
        $state.go('reflection');
    };
});