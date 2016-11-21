document.addEventListener("deviceready", function (onDeviceReady) {
    cordova.plugins.camerapreview.startCamera({ x: 0, y: GetYPosition(), width: screen.width, height: getHeight() }, "back", false, false, true);
}, document.addEventListener('backbutton', function (e) {
 alert("i will stop the cammera"); cordova.plugins.camerapreview.stopCamera();
}, false));

function StartCammera() {
    //clear the preview picture if any
    if (document.getElementById('previewPicture').src != null) {
        document.getElementById('previewPicture').removeAttribute('src');
        document.getElementById('previewPicture').removeAttribute('height');
        document.getElementById('previewPicture').removeAttribute('width');
        var node = document.getElementById('divPreviewPicture');
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
        cordova.plugins.camerapreview.startCamera({ x: 0, y: GetYPosition(), width: screen.width, height: getHeight() }, "back", false, false, true);
    }else //Start the cammera
        cordova.plugins.camerapreview.startCamera({ x: 0, y: 0, width: screen.width, height: getHeight() }, "back", false, false, true);
}
function takePicture() {
    //Take the picture
    cordova.plugins.camerapreview.setFlashMode(2);
    cordova.plugins.camerapreview.takePicture({
        maxWidth: 1200,
        maxHeight: 1200
    });
    // when picture is taken
    cordova.plugins.camerapreview.setOnPictureTakenHandler(function (result) {
        // convert the image to base64
        resolveLocalFileSystemURL('file:///' + result[1], function (fileEntry) {
            fileEntry.file(function (file) {
                //Display Image
                var myImage = document.getElementById('previewPicture');
                myImage.style.height = getHeight();
                myImage.style.width = getWidth();
                myImage.src = file.localURL;

                //convert the cdv file to native path so we can extract the image data
                resolveLocalFileSystemURL(file.localURL, function (entry) {
                    entry.file(function (newFile) {
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            base64 = event.target.result; //Here is your base64 string
                            base64 = base64.replace("data:image/jpeg;base64,", "");
                            base64 = base64.replace(/["']/g, "");
                            var theDocument = {};
                            theDocument = { Username: window.sessionStorage.getItem("Username"), DocumentName: window.sessionStorage.getItem("Username") + '_' + mydate(), DocumentType: 'Image', IsOCRRequired: 'true', ApplicationName: 'Tally', Image: base64, SequenceNumber: '1' };
                            var oXHR = new XMLHttpRequest();
                            oXHR.open('POST', 'http://localhost:51899/API/Document');
                            oXHR.setRequestHeader("Content-Type", "application/json");
                            oXHR.send(JSON.stringify(theDocument));
                        };
                        reader.readAsDataURL(newFile);
                    });
                });
            });
        });
        //Stop the cammera.
        cordova.plugins.camerapreview.stopCamera();
    });
}

//document.getElementById('focus').addEventListener("click", function () {
//    cordova.plugins.camerapreview.focus();
//});
function mydate() {
    var utc = new Date().getTime().toJSON().slice(0, 10);
    return utc;
}

function Getdate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = "" + dd + mm + yyyy + hours + minutes;
    return today;
}
function getCurrentTimeStampDate() {
    var timeStamp = Math.floor(Date.now() / 1000);
    return timeStamp;
}
function flash() {
    var mode = document.getElementById('Flashoption').value;
    cordova.plugins.camerapreview.setFlashMode(mode);
}

function getHeightDiff() {
    var containHeight = document.getElementById('container').clientHeight;
    var divheight = document.getElementById('CameraZone').clientHeight;
    var height = containHeight - divheight;
    return height;
}
function getWidthDiff() {
    var containWidth = document.getElementById('container').clientWidth;
    var divWidth = document.getElementById('CameraZone').clientWidth;
    var newWidth = containWidth - divWidth;
    return newWidth;
}
function getWidth() {
    var divWidth = document.getElementById('CameraZone').clientWidth;
    return divWidth;
}
function GetYPosition() {
    var Yposition = getHeight() - getWidth() + 20;
    return Yposition;
}
function getHeight() {
    var divheight = document.getElementById('CameraZone').clientHeight;
    return divheight;
}