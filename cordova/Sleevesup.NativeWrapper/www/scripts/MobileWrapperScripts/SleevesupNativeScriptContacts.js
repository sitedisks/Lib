document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

}

//Show error message
function onFail(message) {
    alert('Failed because: ' + message);
}

//Show success message
function onSucess(message) {
    alert('Sucess: ' + message);
}

//Get all contacts return a json object of all the contacts
function getAllContacts() {
    navigator.contacts.find([navigator.contacts.fieldType.displayName], function (contact) {
        var contactList = [];
        contactList = contact;
        return contactList;
    });
}

//retrieve specfic contact from device interactivley
function pickContact() {
    navigator.contacts.pickContact(function (contact) { 
        var oneContact;
        oneContact = contact;
        return oneContact;
    } , onFail);
}

//Upload contact to the server
function UploadContact(contactObject) {
    var oXHR = new XMLHttpRequest();
    oXHR.open('POST', Contact.add);
    oXHR.setRequestHeader("Content-Type", "application/json");
    oXHR.send(JSON.stringify(contactObject));
}

//Select multiple contact and upload it to server 
function checkCheckBox(contactList) {
    var selectedList = { contactList: [] };
    var elLength = document.MyForm.elements.length;
    for (i = 0; i < elLength; i++) {
        var type = MyForm.elements[i].type;
        if (type == "checkbox" && MyForm.elements[i].checked) {
            //store select value into a new oject
            selectedList.contactList = contactList[i];
        }
        else if (type == "checkbox") {
            alert("Form element in position " + i + " is of type checkbox and is not checked.");
        }
    }
}