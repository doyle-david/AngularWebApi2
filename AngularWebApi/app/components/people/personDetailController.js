
appControllers.controller('personDetailController', function ($scope, $routeParams, peopleService) {
    var personId = $routeParams.personId;
    peopleService.get(personId).then(function(data) {
        $scope.person = data;
    });
});