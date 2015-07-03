
appControllers.controller('peopleController', function ($, $scope, $timeout, peopleService) {

    $scope.emptyPerson = {};

    // For Getting the people list.
    $scope.getPeople = function () {
        $scope.loading = true;
        peopleService.getAll().then(function(data) {
            $scope.people = data;
            $scope.loading = false;
        });
    }

    $scope.getPeople();

    $scope.save = function (person) {

        // Only submit if valid
        if (!$scope.personForm.$valid)
            return;

        // Edit?
        if (person.Id > 0) {
            peopleService.update(person).then(
            // Success
            function () {
                $scope.success = true;
                $scope.getPeople();
                $scope.reset();
                $('#personModal').modal('hide');
                // Remove the bootstrap alert.
                $timeout(function () { $scope.success = false; }, 2000);
            },
            // Error
            function (error) {
                alert(JSON.stringify(error));
                $scope.error = true;
                // Remove the bootstrap alert.
                $timeout(function () { $scope.error = false; }, 5000);
            });
        }
        // Insert
        else {
            peopleService.add(person).then(
            // Success
            function () {
                $scope.success = true;
                $scope.getPeople();
                $scope.reset();
                $('#personModal').modal('hide');
                // Remove the bootstrap alert.
                $timeout(function () { $scope.success = false; }, 2000);
            },
            // Error
            function (error) {
                alert(JSON.stringify(error));
                $scope.error = true;
                // Remove the bootstrap alert.
                $timeout(function () { $scope.error = false; }, 5000);
            });
        }

        
    };

    $scope.delete = function(person) {
        if (confirm("Are you sure you want to delete " + person.FirstName + "?")) {
            peopleService.delete(person).then(
                // Success
                function () {
                    $scope.success = true;
                    $scope.getPeople();
                    // Remove the bootstrap alert.
                    $timeout(function() { $scope.success = false; }, 2000);
                },
                // Error
                function() {
                    $scope.error = true;
                    // Remove the bootstrap alert.
                    $timeout(function() { $scope.error = false; }, 5000);
                });
        }
    };

    $scope.edit = function (person) {
        $scope.person = angular.copy(person);
    }

    $scope.reset = function() {
        $scope.person = angular.copy($scope.emptyPerson);
    }
});