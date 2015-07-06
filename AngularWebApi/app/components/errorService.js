appServices.service('errorService', function($http) {

    return {
        errorHandler: function(error) {
            alert(JSON.stringify(error));
        }
}
});