angular.module('LightHouse').controller('SchedulePromptCtrl', function ($scope, $state,reflectionService)
    {
        $scope.schedulePrompt = function (promptTime) {
            var alarmTime = new Date();
            alarmTime.setMinutes(promptTime.minute);
            if (promptTime.period == "AM") {
                if (promptTime.hour == 12) {
                    promptTime.hour = 0;
                }
                alarmTime.setHours(promptTime.hour);
            } else {
                alarmTime.setHours(parseInt(promptTime.hour)+12);
            }

            if(alarmTime < new Date()){
                alarmTime.setDate(alarmTime.getDate() + 1);
            }
            
            reflectionService.displayAdd=true;

            cordova.plugins.notification.local.schedule({
                id: 1,
                title: "Lighthouse",
                text: "It's time to reflect on today's tasks!",
                every: "day",
                firstAt: alarmTime
            });

            cordova.plugins.notification.local.on("click", function (notification) {
                if (notification.id == 1) {
                    reflectionService.displayAdd=false;
                    $state.go('sidemenu.calendar');
                }
            });

            $state.go('create_goal');
        };

});