﻿(function () {
    'use strict';

    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events 
        document.addEventListener('pause', onPause, false);
        document.addEventListener('resume', onResume, false);

        //document.getElementsByClassName('btn-lg')[0].addEventListener('click', takePicture);

        $('#btnTakePicture').click(takePicture);
        $('#btnGetContacts').click(getContactList);
        $('#btnTest').click(testFn);

        var model = device.model;
        var uuId = device.uuid;
        var platform = device = device.platform;

        alert('You browsing the App on device model: ' + model + ', uuid: ' + uuId + ', platform: ' + platform);
    }

    function testFn() {
        alert("Test function called!");
    }

    function onPause() {
    }

    function onResume() {
    }

    function takePicture() {
        if (!navigator.camera) {
            alert("Camera API not supported");
            return;
        }
        var options = {
            quality: 20,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,
            encodingType: 0
        };
        navigator.camera.getPicture(function (imgData) {
            var el;
            el = document.getElementsByClassName('media-object')[0];
            var srcAttr = document.createAttribute("src");
            srcAttr.value = "data:image/jpeg;base64," + imgData;
            el.attributes.setNamedItem(srcAttr);
        }, function () {
            alert('Error taking picture');
        }, options);
        return false;
    }

    function getContacts() {
        // find all contacts
        alert('get contacts called');

        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        options.hasPhoneNumber = true; // android only
        //var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];

        navigator.contacts.find([navigator.contacts.fieldType.displayName], function (contacts) {
            alert('Yes we get your contact list: ' + contacts.length);
            for (var i = 0; i < contacts.length; i++) {
                $('#contactList').append('<p>' + contacts[i].displayName + '</p>');
            }
        }, function (error) {
            alert('Get contact error!');
        }, options);

    }

    function getContactList() {
        alert('contact function called');
        navigator.vibrate(300);
        navigator.contacts.find(
		[navigator.contacts.fieldType.displayName,
            navigator.contacts.fieldType.phoneNumbers,
		    navigator.contacts.fieldType.emails],
		function (contacts) {
		    alert('Get the list');
            
		    for (var i = 0; i < contacts.length; i++) {
		        if (contacts[i].displayName != null) {
		            $('#contactList').append('<div><strong>' + contacts[i].displayName +
                        '</strong><br/>' + JSON.stringify(contacts[i].phoneNumbers) + '</div>');
		        }
		    }
		},
		    function (err) {
		        alert('error: ' + err)
		    });

    }


})();