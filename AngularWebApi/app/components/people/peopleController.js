
appControllers.controller('peopleController', peopleController);

peopleController.$inject = ['$', '_', '$timeout', 'peopleService'];

function peopleController($, _, $timeout, peopleService) {
    var personViewModel = this;
    personViewModel.emptyPerson = {};

    // For Getting the people list.
    personViewModel.getPeople = function () {
        personViewModel.loading = true;
        peopleService.getAll().then(function (data) {
            personViewModel.people = data;
            personViewModel.loading = false;
        });
    }

    personViewModel.getPeople();

    personViewModel.save = function (person) {
        // Edit
        if (person.Id > 0) {
            peopleService.update(person).then(
            // Success
            function () {
                personViewModel.success = true;
                personViewModel.getPeople();
                personViewModel.reset();
                $('#personModal').modal('hide');
                // Remove the bootstrap alert.
                $timeout(function () { personViewModel.success = false; }, 2000);
            },
            // Error
            handleError);
        }
            // Insert
        else {
            peopleService.add(person).then(
            // Success
            function () {
                personViewModel.success = true;
                personViewModel.getPeople();
                personViewModel.reset();
                $('#personModal').modal('hide');
                // Remove the bootstrap alert.
                $timeout(function () { personViewModel.success = false; }, 2000);
            },
            // Error
            handleError);
        }
    };

    personViewModel.delete = function (person) {
        if (confirm("Are you sure you want to delete " + person.FirstName + "?")) {
            peopleService.delete(person).then(
                // Success
                function () {
                    personViewModel.success = true;
                    personViewModel.getPeople();
                    // Remove the bootstrap alert.
                    $timeout(function () { personViewModel.success = false; }, 2000);
                },
                // Error
                handleError);
        }
    };

    personViewModel.edit = function (person) {
        personViewModel.person = angular.copy(person);
    }

    personViewModel.reset = function () {
        personViewModel.person = angular.copy(personViewModel.emptyPerson);
    }

    function handleError(error) {
        personViewModel.person.Errors = [];
        if (!_.isUndefined(error.data.ExceptionMessage))
            personViewModel.person.Errors.push(error.data.ExceptionMessage);

        if (!_.isUndefined(error.data.ModelState)) {
            var keys = Object.keys(error.data.ModelState);
            _.each(keys, function (key) {
                _.each(error.data.ModelState[key], function (message) {
                    personViewModel.person.Errors.push(message);
                });
            });
        }

        personViewModel.error = true;
        // Remove the bootstrap alert.
        $timeout(function () { personViewModel.error = false; }, 5000);
    }
}

