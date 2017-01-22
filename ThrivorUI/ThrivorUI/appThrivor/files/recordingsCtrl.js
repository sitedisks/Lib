(function () {
    'use strict';

    appThrivor.controller("recordingsCtrl", ['$scope', '$sce', 'userService', 'healthFileService',
        function ($scope, $sce, userService, healthFileService) {

            $scope.interactionMessage = "Loading recordings, please wait...";
            $scope.message = 'recording list';
            $scope.currentUser = userService.getCurrentUser();
            $scope.audioCurrentItem = null;
            $scope.audioFilesList = [];
            $scope.audioPlayer = document.getElementById("audioPlayer");
            $scope.getAudioList = audioList;
            $scope.playItem = play;
            $scope.sendEmail = emailRecording;

            function audioList() {
                healthFileService.getAudioList($scope.currentUser.Username)
                 .then(function (response) {

                     if (response.data !== null && response.data.length > 0) {

                         response.data.forEach(function (item) {
                             item.playCaption = 'Play';
                         });
                         $scope.audioFilesList = response.data;
                     }
                     $scope.interactionMessage = "";
                 }, function (error) {
                     $scope.interactionMessage = "Sorry, unable to retrieve recordings";
                     console.error(error);
                 });
            }

            function play(item) {

                $scope.audioFilesList.forEach(function (record) {
                    if (record.ReferenceName !== item.ReferenceName)
                        record.playCaption = 'Play';
                });

                if ((this.audioCurrentItem === null) || (this.audioCurrentItem.ReferenceName !== item.ReferenceName)) {
                    item.playCaption = 'Pause';
                    if (!$scope.audioPlayer.paused)
                        $scope.audioPlayer.pause();
                    $scope.audioCurrentItem = item;
                }
                else if ((this.audioCurrentItem.ReferenceName === item.ReferenceName)) {
                    if ($scope.audioPlayer.paused)
                        $scope.audioPlayer.play();
                    else
                        $scope.audioPlayer.pause();

                    item.playCaption = $scope.audioPlayer.paused ? 'Play' : 'Pause';
                    return;
                }

                $scope.interactionMessage = "Retrieving " + item.DocumentName;

                healthFileService.getAudioFile(item.ReferenceName)
                    .then(function (response) {

                        if (response.data !== null && response.data !== "") {
                            playAudio(response.data);
                            $scope.interactionMessage = "";
                        } else {
                            $scope.interactionMessage = "Currently you don't have any recording";
                        }

                    }, function (error) {
                        $scope.interactionMessage = "Sorry, unable to retrieve this recording";
                        console.error(error);

                    });

            }

            function playAudio(audio) {
                $scope.currentPlaybackUrl = thrivorBaseDocsUrl + audio;
                console.log($scope.currentPlaybackUrl);
                $scope.audioPlayer.src = $sce.trustAsResourceUrl($scope.currentPlaybackUrl);
                $scope.audioPlayer.play();
            }

            function emailRecording(audio) {
                cordova.plugins.email.isAvailable(
                    function (isAvailable) {
                        cordova.plugins.email.open({
                            //to: 'max@mustermann.de',
                            //cc: 'erika@mustermann.de',
                            //bcc: ['john@doe.com', 'jane@doe.com'],
                            subject: 'Thrivor - Listen to this',
                            body: 'Hello<br/> <p>Here\'s a recording I made on Thrivor.</p>Visit ['
                                + $scope.currentPlaybackUrl + '] to have a listen.</p>Thanks.'
                        });
                    }
                );
            }

            if (window.HTMLAudioElement)
                $scope.getAudioList();

        }]);
})();