document.addEventListener("deviceready", onDeviceReady, false);
var contactdetails = [];
var deviceName;
var pushNotification;
//var GCM_SENDER_ID = "600477656880";

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    deviceName = device.uuid;

}

//function pushNoti()
//{

//    var pushNotification = window.plugins.pushNotification;

//    pushNotification.register(
//        successHandler,
//        errorHandler,
//        {
//            'senderID': '600477656880',
//            'ecb': 'onNotificationGCM' // callback function
//        }
//    );

//    function successHandler(result) {
//        console.log('Success: ' + result);
//    }

//    function errorHandler(error) {
//        console.log('Error: ' + error);
//    }

//}

//function onNotificationGCM(e) {
//    switch (e.event) {
//        case 'registered':
//            if (e.regid.length > 0) {
//                deviceRegistered(e.regid);
//            }
//            break;

//        case 'message':
//            if (e.foreground) {
//                // When the app is running foreground. 
//                alert('The room temperature is set too high')
//            }
//            break;

//        case 'error':
//            console.log('Error: ' + e.msg);
//            break;

//        default:
//            console.log('An unknown event was received');
//            break;
//    }
//}

//Take a photo
function capturePhotoWithData() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
}
//Search for an exsisting photo
function BrowsePhoto() {
    navigator.camera.getPicture(onSuccess, onFail, { sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
}
//Display Image on success
function onSuccess(imageData) {
    var image = document.getElementById('preview');
    image.src = "data:image/jpeg;base64," + imageData;
    //image.style.display = 'block';
    image.src = imageData;
}
//Show error when picture is not displayed
function onFail(message) {
    alert('Failed because: ' + message);
}

function myFunction() {
    var x = document.createElement("BUTTON");
    var t = document.createTextNode("Click me");
    x.appendChild(t);
    document.body.appendChild(x);
}
var data = [];
function contactslist() {
    getAllContacts();
    console.log(data);
}
//Get Contacts from device 
function gotContacts(c) {
    data = c;
    console.log(c);
    var JSONObj = { Category: "Invitation", Subject: "Please join", HtmlBody: "XYZ ABC", Environment: "Dev", BusinessArea: "Email", Model: "Business", SenderEmail: "saad@sleevesup.com.au", ApplicationId: "1", Recipient: [] };
    console.log("gotContacts, number of results " + c.length);
    mobileDiv = document.querySelector("#mobile");
    emailDiv = document.querySelector("#email");
    //Retriving phoneNumbers and name
    for (var i = 0, len = c.length; i < len; i++) {
        if (c[i].phoneNumbers && c[i].phoneNumbers.length > 0) {
            mobileDiv.innerHTML += "<p>" + c[i].displayName + "<br/>" + c[i].phoneNumbers[0].value + "<br/>";
            if (c[i].emails && c[i].emails.length > 0) {
                mobileDiv.innerHTML += c[i].emails[0].value + "</p>";
                JSONObj.Recipient.push({ EmailAddress: c[i].EmailAddress });
            } else {
                JSONObj.Recipient.push({ EmailAddress: c[i].EmailAddress });
                continue;
            }
            //Get contacts photo
            if (c[i].photos && c[i].photos.length > 0) {
                mobileDiv.innerHTML += "<img src='" + c[i].photos[0].value + "'>" + "<br/>";
            }
        }
    }
    contactdetails = JSONObj;
}
//Get all contacts
function getAllContacts() {
    navigator.contacts.find([navigator.contacts.fieldType.displayName], gotContacts, errorHandler);
}
//Select the contact from the device
function pickContact() {
    navigator.contacts.pickContact(gotContacts, errorHandler);
}

function errorHandler(e) {
    console.log("errorHandler: " + e);
}

function UploadContact() {
    var oXHR = new XMLHttpRequest();
    oXHR.open('POST', 'http://localhost:51899/api/email/sendmail');
    oXHR.setRequestHeader("Content-Type", "application/json");
    oXHR.send(JSON.stringify(contactdetails));
}

function UploadImage() {
    var dataURL = getBase64Image(document.getElementById('preview'));
    //Convert the image to a file
    var blob = dataURItoBlob(dataURL);
    var form = new FormData();
    form.append('image', blob);
    //Send Image
    var oXHR = new XMLHttpRequest();
    oXHR.open('POST', 'http://www.tally.co/demo/Account/PostImage');
    oXHR.send(form);
}

//This function Converts the image data into a file
function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    // if (dataURI.split(',')[0].indexOf('base64') >= 0)
    // byteString = atob(dataURI.split(',')[1]);
    // else
    // byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component

    var mimeString = dataURI;//dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    byteString = mimeString;
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


