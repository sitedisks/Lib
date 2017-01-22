(function () {
    'use strict';

    appThrivor.factory("healthFileService", ['$http',
        function ($http) {

            var healthFileService = {
                getNoteList: getNoteList,
                getAudioList: getAudioList,
                getAudioFile: getAudioFile,
                uploadAudioFile: uploadAudioFile
            };

            return healthFileService;

            function getNoteList() { }

            function getAudioList(username) {
                var url = sleevesupBaseAPIUrl + Documents.GET.AudioListByUsername;
                return $http({
                    method: 'GET',
                    url: url + username,
                    dataType: "json"
                });
            }

            function getAudioFile(ref) {
                var url = sleevesupBaseAPIUrl + Documents.GET.AudioLinkByRef;
                return $http({
                    method: 'GET',
                    url: url + ref,
                    dataType: "text"
                });
            }

            function uploadAudioFile(audioFile) {
                return $http({
                    method: 'POST',
                    url: sleevesupBaseAPIUrl + 'document/uploaddocument',
                    data: JSON.stringify(audioFile),
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8'
                });
            }

        }]);

})();