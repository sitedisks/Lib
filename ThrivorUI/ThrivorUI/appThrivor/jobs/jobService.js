appThrivor.factory("jobService", function ($http, storageService) {

    var jobService = {};

    console.log('auth token:' + storageService.get('tokenValue'));
    //return jobService;

    jobService.getJobCategoriesList = function () {
        console.log("jobService:called");

        return $http({
            method: 'GET',
            url: thrivorBaseAPIUrl + TaskCategory.GET.CategoriesList, 
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue')
            }
        });
    }

    jobService.getJobCategoryById = function (id) {
        console.log("jobService:called");

        return $http({
            method: 'GET',
            url: thrivorBaseAPIUrl + TaskCategory.GET.CategoriesList + id,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    jobService.getJobDetailsListByUserId = function (id) {
        console.log("jobService:called");

        return $http({
            method: 'GET',
            url: thrivorBaseAPIUrl + TaskDetails.GET.ListByUserId + id,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    jobService.getJobDetailsListByCategoryId = function (id) {
        console.log("jobService:create");

        return $http({
            method: 'GET',
            url: thrivorBaseAPIUrl + TaskDetails.GET.ListByCategoryId + id,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    jobService.getJobDetailsById = function (id) {
        console.log("jobService:called");

        return $http({
            method: 'GET',
            url: thrivorBaseAPIUrl + TaskDetails.GET.TaskDetailsById + id,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    jobService.createJob = function (jobDetails) {
        console.log("jobService:create called");

        return $http({
            method: 'POST',
            url: thrivorBaseAPIUrl + TaskDetails.POST,
            data: JSON.stringify(jobDetails),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    jobService.editJob = function (id, jobDetails) {
        console.log("jobService:called");

        return $http({
            method: 'PUT',
            url: thrivorBaseAPIUrl + TaskDetails.PUT + id,
            data: JSON.stringify(jobDetails),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    jobService.removeJob = function (id) {
        console.log("jobService:called");

        return $http({
            method: 'POST',
            url: thrivorBaseAPIUrl + TaskDetails.DELETE + id,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    jobService.sendJobHelpRequest = function (supportCrewList) {
        console.log("jobService:create called");

        return $http({
            method: 'POST',
            url: thrivorBaseAPIUrl + TaskVolunteers.POST,
            data: JSON.stringify(supportCrewList),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    jobService.updateTaskVolunteer = function (id, jobVolunteer) {
        console.log("jobService:called");

        return $http({
            method: 'PUT',
            url: thrivorBaseAPIUrl + TaskVolunteers.PUT + id,
            data: JSON.stringify(jobVolunteer),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    jobService.getRosteredTasksByUserId = function (userId) {
        console.log("jobService:called");

        return $http({
            method: 'GET',
            url: thrivorBaseAPIUrl + TaskVolunteers.GET.ListByUserId + userId,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            headers: {
                'Authorization': "Token " + storageService.get('tokenValue'),
                'IP': ''
            }
        });
    }

    return jobService;

});