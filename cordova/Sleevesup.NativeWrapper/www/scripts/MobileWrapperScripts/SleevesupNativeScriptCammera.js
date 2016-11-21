document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    cordova.plugins.camerapreview.startCamera({ x: 0, y: 0, width: screen.width, height: 600 }, "back", true, true, true);
}
function StartCammera() {
    //clear picture 
    document.getElementById('previewPicture').removeAttribute('src');
    document.getElementById('previewPicture').removeAttribute('height');
    document.getElementById('previewPicture').removeAttribute('width');
    cordova.plugins.camerapreview.startCamera({ x: 0, y: 0, width: screen.width, height: 600 }, "back", true, true, true);
}
function takePicture() {
    // you can start here you spinner o whatever
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
                myImage.style.height = '410px';
                myImage.style.width = '300px';
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
                            theDocument = { UserId: window.sessionStorage.getItem("UserId"), DocumentName: 'TheImage.png', Location: 'C:\\Users\\Dennisdao\\Desktop\\Images', DocumentType: 'Image', IsOCRRequired: 'true', ApplicationName: 'Tally', Image: base64, SequenceNumber: '1' };
                            var oXHR = new XMLHttpRequest();
                            oXHR.open('POST', DocumentLibary.postImage);
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

function EnabledFlash() {
    var flash = document.getElementById('flashCombo').value;
    setTimeout(function () {
        cordova.plugins.camerapreview.setFlashMode(flash)// success/error callbacks may be passed
    }, 3000);
}