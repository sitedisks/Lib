(function () {
    'use strict';

    appThrivor.factory("nativeDeviceService", [
        'storageService', function (storageService) { //use storage service if caching is required

            var nativeDeviceService = {};
            var contactList = [];

            nativeDeviceService.notifyDeviceContactsLoaded = function (deviceContacts) {
                console.log("deviceContacts:" + deviceContacts);
                $rootScope.$emit('deviceContactsLoadedEvent', deviceContacts);
            }

            function onDeviceContactsLoadedSuccess(deviceContacts) {

                nativeDeviceService.notifyDeviceContactsLoaded(deviceContacts);
            }

            function onDeviceContactsLoadedError(error) {
                //todo
            }

            nativeDeviceService.getDeviceContacts = function (scope, successCallback, errorCallback) {

                var handler = $rootScope.$on('deviceContactsLoadedEvent', successCallback);
                scope.$on('$destroy', handler);


                console.log("nativeDeviceService.getDeviceContacts called");

                if (navigator.contacts) {

                    navigator.contacts.find(
                        [
                            navigator.contacts.fieldType.displayName,
                            navigator.contacts.fieldType.phoneNumbers,
                            navigator.contacts.fieldType.emails
                        ],
                        function (contacts) {
                            contactList = contacts;
                            onDeviceContactsLoadedSuccess(contacts);
                        },
                        function (err) {
                            alert('error: ' + err); //todo
                            onDeviceContactsLoadedError(err);
                        });
                }
            };

            nativeDeviceService.createCalendarEvent = function (calenderName, eventDetails) {
                console.log("nativeDeviceService.createCalendarEvent called");

                //alert('nativeDeviceService.createCalendarEvent called');

                var startDate = eventDetails.StartDate; //month 0 = january, 11 = december 
                var endDate = eventDetails.EndDate;
                var title = eventDetails.Title;
                var location = eventDetails.Location;
                var notes = eventDetails.Notes;
                var success = function (message) { //alert("Success: " + JSON.stringify(message)); 
                }; //todo - to remove
                var error = function (message) { //alert("Error: " + message); 
                }; //todo - to remove

                if (window.plugins && window.plugins.calendar) {

                    //alert('createEvent caling');

                    window.plugins.calendar.createEvent(title, location, notes, startDate, endDate, success, error);

                    //alert('createEvent called');
                }
            }

            nativeDeviceService.modifyCalendarEvent = function (existingEventTitle, eventDetails) {
                console.log("nativeDeviceService.modifyCalendarEvent called");

                var startDate = eventDetails.StartDate; //month 0 = january, 11 = december 
                var endDate = eventDetails.EndDate;
                var newTitle = eventDetails.Title;
                var location = eventDetails.Location;
                var notes = eventDetails.Notes;
                var success = function (message) { alert("Success: " + JSON.stringify(message)); }; //todo - to remove
                var error = function (message) { alert("Error: " + message); }; //todo - to remove

                if (window.plugins && window.plugins.calendar) {
                    window.plugins.calendar.modifyEvent(existingEventTitle, location, notes, startDate, endDate, newTitle, location, notes, startDate, endDate, success, error);
                }
            }

            nativeDeviceService.deleteCalendarEvent = function (calenderName, eventDetails) {
                //alert("nativeDeviceService.deleteCalendarEvent called" + JSON.stringify(eventDetails));

                var startDate = eventDetails.StartDate; //month 0 = january, 11 = december 
                var endDate = eventDetails.EndDate;
                var title = eventDetails.Title;
                var location = eventDetails.Location;
                var notes = eventDetails.Notes;
                var success = function (message) { //alert("Success: " + JSON.stringify(message)); 
                };
                var error = function (message) { //alert("Error: " + message); 
                };

                if (window.plugins && window.plugins.calendar) {
                    window.plugins.calendar.deleteEvent(title, location, null, startDate, endDate, success, error);
                }
            }

            function successHandler(result) {
                console.log('Success: ' + result);
            }

            function errorHandler(error) {
                console.log('Error: ' + error);
            }

            function tokenHandler(result) {
                // Your iOS push server needs to know the token before it can push to this device 
                // here is where you might want to send it the token for later use. 
                console.log('iOS device token = ' + result);
                mobileDeviceId = result;
                document.dispatchEvent(devRegisteredEvent);
            }

            nativeDeviceService.registerForPushNotification = function (applicationSenderId) {
                console.log("nativeDeviceService.registerForPushNotification called for senderId:" + applicationSenderId);

                var pushNotification = function () { };

                // Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
                pushNotification.prototype.register = function (successCallback, errorCallback, options) {
                    if (errorCallback == null) {
                        errorCallback = function () { }
                    }

                    if (typeof errorCallback != "function") {
                        console.log("PushNotification.register failure: failure parameter not a function");
                        return;
                    }

                    if (typeof successCallback != "function") {
                        console.log("PushNotification.register failure: success callback parameter must be a function");
                        return;
                    }

                    cordova.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
                };

                pushNotification = new pushNotification();

                console.log("Device platform:" + device.platform);
                devicePlatform = device.platform;

                if (device.platform === 'android' || device.platform === 'Android' || device.platform === "amazon-fireos") {

                    pushNotification.register(
                        successHandler,
                        errorHandler,
                        {
                            'senderID': applicationSenderId,
                            'ecb': 'onNotificationGCM'
                        }
                    );
                } else { //iOS
                    pushNotification.register(
                        tokenHandler,
                        errorHandler,
                        {
                            "badge": "true",
                            "sound": "true",
                            "alert": "true",
                            "ecb": "onNotificationAPN"
                        });
                }
            };


            return nativeDeviceService;

        }]);
})();

var devRegisteredEvent = new CustomEvent("deviceRegisteredEvent", { "detail": "" });
var mobileDeviceId = "";
var devicePlatform = "";

function onNotificationGCM(e) {
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {

                console.log("Android device reg Id-" + e.regid);
                //raise event onse deviceId is received..
                mobileDeviceId = e.regid;
                document.dispatchEvent(devRegisteredEvent);
            }
            break;

        case 'message':
            if (e.foreground) {
                // When the app is running foreground. 
                alert(e.message);
            }
            break;

        case 'error':
            console.log('Error: ' + e.msg);
            break;

        default:
            console.log('An unknown event was received');
            break;
    }
}

function onNotificationAPN(event) {
    if (event.alert) {
        navigator.notification.alert(event.alert);
    }

    if (event.sound) {
        var snd = new Media(event.sound);
        snd.play();
    }

    if (event.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
}

function successHandler(result) {
    console.log('Success: ' + result);
}

function errorHandler(error) {
    console.log('Error: ' + error);
}
