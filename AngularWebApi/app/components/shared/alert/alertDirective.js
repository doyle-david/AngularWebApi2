appDirectives.directive('myAlert', [function () {
        return {
            restrict: 'E',
            //controller: 'alertController',
            templateUrl: 'app/components/shared/alert/alertTemplate.html',
            scope: {
                viewModel: '=viewModel',
                successMessage: '@',
                errorMessage: '@',
            },
        }
    }
]);