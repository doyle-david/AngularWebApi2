appDirectives.directive('ngConfirmPopover', function ($document) {
    return {
        restrict: 'A',
        scope: {
            confirmAction: '&ngConfirmPopover',
            placementCallback: '&'
        },
        link: function (scope, element, attrs) {
            var buttonId = Math.floor(Math.random() * 10000000000),
                message = attrs.message || "Are you sure?",
                yep = attrs.yes || "Yes",
                nope = attrs.no || "No",
                title = attrs.title || "Confirm delete?",
                classes = attrs.classes || "text-center",
                placement = attrs.placement || "bottom";

            attrs.buttonId = buttonId;

            var html = "<div id=\"button-" + buttonId + "\" class=\"" + classes + "\">" +
                "<button type=\"button\" class=\"confirmbutton-yes btn btn-sm btn-danger\">" + yep + "</button> " +
                "<button type=\"button\" class=\"confirmbutton-no btn btn-sm\">" + nope + "</button>" +
                "</div>";

            element.popover({
                content: html,
                html: true,
                trigger: "manual",
                title: title,
                placement: (angular.isDefined(attrs.placementCallback) ? scope.placementCallback() : placement)
            });

            element.bind('click', function (e) {
                var dontBubble = true;
                e.stopPropagation();

                element.popover('show');

                var pop = $("#button-" + buttonId);

                pop.closest(".popover").click(function (e) {
                    if (dontBubble) {
                        e.stopPropagation();
                    }
                });

                pop.find('.confirmbutton-yes').click(function (e) {
                    dontBubble = false;
                    scope.$apply(scope.confirmAction);
                });

                pop.find('.confirmbutton-no').click(function (e) {
                    dontBubble = false;
                    $document.off('click.confirmbutton.' + buttonId);
                    element.popover('hide');
                });

                $document.on('click.confirmbutton.' + buttonId, ":not(.popover, .popover *)", function () {
                    $document.off('click.confirmbutton.' + buttonId);
                    element.popover('hide');
                });
            });
        }
    };
});