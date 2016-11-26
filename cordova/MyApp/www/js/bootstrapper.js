angular.element(function () {
    if (window.cordova) {
        document.addEventListener('deviceready', bootstrapAngular, false);
    }
    else {
        bootstrapAngular();
    }
});
function bootstrapAngular() {
    angular.bootstrap($('#appBootstrapper'), ['app']);
}
