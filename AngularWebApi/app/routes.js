app.config(function ($routeProvider) {
    $routeProvider
        .when('/people',
        {
            controller: 'peopleController',
            templateUrl: 'app/components/people/peopleView.html'
        })
        .when('/people/:personId',
        {
            controller: 'personDetailController',
            templateUrl: 'app/components/people/personDetailView.html'
        })
        .when('/other',
        {
            controller: 'otherController',
            templateUrl: 'app/components/other/otherView.html'
        })
        .when('/',
        {
            controller: 'homeController',
            templateUrl: 'app/components/home/homeView.html'
        })
        .otherwise({ redirectTo: '/' });
});