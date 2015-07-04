
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
            handleError);
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
            handleError);
        }

        $scope.personForm.$setPristine();
        $scope.personForm.$setUntouched();
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
                handleError);
        }
    };

    $scope.edit = function (person) {
        $scope.person = angular.copy(person);
    }

    $scope.reset = function() {
        $scope.person = angular.copy($scope.emptyPerson);
    }

    function handleError (error) {
        $scope.person.Errors = [];
        if (!_.isUndefined(error.data.ExceptionMessage))
            $scope.person.Errors.push(error.data.ExceptionMessage);

        if (!_.isUndefined(error.data.ModelState)) {
            var keys = Object.keys(error.data.ModelState);
            _.each(keys, function(key) {
                _.each(error.data.ModelState[key], function(message) {
                    $scope.person.Errors.push(message);
                });
            });
        }

        $scope.error = true;
        // Remove the bootstrap alert.
        $timeout(function () { $scope.error = false; }, 5000);
    }

});