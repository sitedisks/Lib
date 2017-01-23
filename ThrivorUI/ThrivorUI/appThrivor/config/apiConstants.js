var thrivorBaseAPIUrl = 'http://localhost:61724/v1/';                     // Local Api
var sleevesupBaseAPIUrl = 'http://localhost:51899/api/';                  // Local Common

//var thrivorBaseAPIUrl = 'https://appdev.thrivor.com/api/v1/';               // Dev Api
//var sleevesupBaseAPIUrl = 'https://appdev.thrivor.com/common/api/';         // Dev Common
//var thrivorBaseDocsUrl = 'https://appdev.thrivor.com/docs/';                // Dev Docs

//var thrivorBaseAPIUrl = 'https://appuat.thrivor.com/api/v1/';            // UAT API
//var sleevesupBaseAPIUrl = 'https://appuat.thrivor.com/common/api/';      // UAT Common
//var thrivorBaseDocsUrl = 'https://appuat.thrivor.com/docs/';             // UAT Docs


var AppointmentDetails = {
    GET: { ListByUserId: 'appointmentdetails/listbyuserid/', AppointmentDetailsById: 'appointmentdetails/appointment/' },
    POST: 'appointmentdetails/create',
    PUT: 'appointmentdetails/edit/',
    DELETE: 'appointmentdetails/remove/'
};

var AppointmentNotes = {
    GET: { ListByAppointmentId: 'appointmentnotes/listbyappointmentid/' },
    POST: 'appointmentnotes/create',
    PUT: 'appointmentnotes/edit/',
    DELETE: 'appointmentnotes/remove/'
};

var AppointmentContacts = {
    GET: { ListByPatientId: 'appointmentcontacts/listbypatientid/', AppointmentContactById: 'appointmentcontacts/appointmentcontact/' },
    POST: 'appointmentcontacts/create',
    PUT: 'appointmentcontacts/edit/',
    DELETE: 'appointmentcontacts/remove/'
};

var TaskCategory = {
    GET: { CategoriesList: 'taskcategories/list', CategoryById: 'taskcategories/category/' }
};

var TaskDetails = {
    GET: { ListByUserId: 'taskdetails/listbyuserid/', ListByCategoryId: 'taskdetails/listbycategoryid/', TaskDetailsById: 'taskdetails/task/' },
    POST: 'taskdetails/create',
    PUT: 'taskdetails/edit/',
    DELETE: 'taskdetails/remove/'
};

var TaskVolunteers = {
    GET: { ListByUserId: 'taskvolunteers/list/', TaskVolunteerById: 'taskvolunteers/volunteer/' },
    POST: 'taskvolunteers/create',
    PUT: 'taskvolunteers/edit/',
    DELETE: 'taskvolunteers/remove/'
};

var UserDetails = {
    GET: { UserDetailsByUsername: 'users/userdetails?', SupportCrewListByUniqueCode: 'users/patientsupportcrew/list?', PatientDetailsByUniquecode: 'users/patientdetails?', isUsernameValid: 'user/isUsernameValid?' },
    POST: 'users/create',
    PUT: 'users/edit/',
    DELETE: 'users/remove/'
};

var RegisterUserDevice = {
    POST: 'user/registeruserdevice'
};

var UserTypes = {
    GET: { UserTypesList: 'usertypes/list' },
    POST: 'usertypes/create'
};

var UserContacts = {
    GET: { ListByUserId: 'usercontacts/listbyuserid' },
    POST: 'usercontacts/create'
};

var SendEmail = {
    POST: 'email/sendmail'
};

var SendSMS = {
    POST: 'sms/sendsms'
};

var Documents = {
    GET: {
        AudioListByUsername: 'document/documenttypes?applicationName=Thrivor&MediaType=Audio&username=',
        AudioFileByRef: 'document/downloadbyname?referenceName=',
        AudioLinkByRef: 'document/getdocumentlink?referenceName='
    }
};