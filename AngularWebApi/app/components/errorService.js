appServices.service('errorService', ['$http', function($http) {

    return {
        errorHandler: function(error) {
            alert(JSON.stringify(error));
        }
}
}]);