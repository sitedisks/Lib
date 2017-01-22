appThrivor.factory("appointmentService", ['$http', 'storageService', function appointmentService($http, storageService) {

    var appointmentService = {};

    appointmentService.getAppointmentList = function (userId) {
        console.log("appointmentService:getAppointmentList called with userId-" + userId);

        return $http({
            method: 'GET',
            url: thrivorBaseAPIUrl + AppointmentDetails.GET.ListByUserId + userId,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    appointmentService.getNotesForAppointment = function (appointmentId) {
        console.log("appointmentService:getNotesForAppointment called with appointmentId-" + appointmentId);

        return $http({
            method: 'GET',
            url: thrivorBaseAPIUrl + AppointmentNotes.GET.ListByAppointmentId + appointmentId,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    appointmentService.getCurrentDayAppointmentList = function (credentials) {
        // TODO
    }

    appointmentService.addAppointment = function (appointment) {

        return $http({
            method: 'POST',
            url: thrivorBaseAPIUrl + AppointmentDetails.POST,
            data: JSON.stringify(appointment),
            datatype: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    //appointmentService.addAppointment = function (appointment) {

    //    return $http({
    //        method: 'POST',
    //        url: thrivorBaseAPIUrl + AppointmentDetails.POST,
    //        data: JSON.stringify(appointment),
    //        datatype: 'json',
    //        contentType: 'application/json;charset=utf-8',
    //        headers: {
    //            'Authorization': "Token " + storageService.get('tokenValue'),
    //            'IP': ''
    //        }
    //    });
    //}

    appointmentService.addNotesForAppointment = function (noteForAppointment) {

        return $http({
            method: 'POST',
            url: thrivorBaseAPIUrl + AppointmentNotes.POST,
            data: JSON.stringify(noteForAppointment),
            datatype: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    appointmentService.updateNotesForAppointment = function (noteId, noteForAppointment) {

        return $http({
            method: 'PUT',
            url: thrivorBaseAPIUrl + AppointmentNotes.PUT + noteId,
            data: JSON.stringify(noteForAppointment),
            datatype: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }
    
    appointmentService.deleteAppointment = function (appointmentId) {

        return $http({
            method: 'DELETE',
            url: thrivorBaseAPIUrl + AppointmentDetails.DELETE + appointmentId,
            datatype: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    appointmentService.editAppointment = function (appointmentId,appointment) {

        return $http({
            method: 'PUT',
            url: thrivorBaseAPIUrl + AppointmentDetails.PUT + appointmentId,
            data: JSON.stringify(appointment),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    appointmentService.getAudioList = function (username) {
        var url = sleevesupBaseAPIUrl + Documents.GET.AudioListByUsername;
        return $http({
            method: 'GET',
            url: url + username,
            dataType: "json",
        });
    }

    return appointmentService;
}]);