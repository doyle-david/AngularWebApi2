appServices.service('peopleService', function($http) {

    // Note: hardcoded application name.
    // TODO: figure out a better way of passing in the routes.
    var resourceUrl = '/AngularWebApi/api/People';

    // Services should return the promise rather than the data. This is the asynchronous way.
    return {
        getAll: function () {
            return $http.get(resourceUrl).then(function(response) { return response.data; });
        },
        get: function (personId) {
            return $http.get(resourceUrl + "/" + personId).then(function (response) { return response.data; });
        },
        add: function(person) {
            return $http.post(resourceUrl, person).then(function(response) { return response.data; });
        },
        update: function(person) {
            return $http.put(resourceUrl + "/" + person.Id, person).then(function (response) { return response.data; });
        },
        delete: function (person) {
            return $http.delete(resourceUrl + "/" + person.Id).then(function (response) { return response.data; });
        },
    }

});