angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', '$ionicPlatform',  function($scope, $ionicPlatform) {

  $scope.message = 'Welcome to Uber Lib';

  // TODO: http://stackoverflow.com/questions/26520308/phonegap-media-api-record-and-play-audio-android
  // TODO: https://www.raymondcamden.com/2015/07/27/recording-and-saving-audio-in-cordova-applications
  // pure cordove style of device ready
  // document.addEventListener("deviceready", onDeviceReady, false);

  // ionic style of device ready
  $ionicPlatform.ready(onDeviceReady);

  function onDeviceReady(){
    // do the native plugins
    recordAudio();
  }

  function recordAudio(){
    var src = "myrecording.wav";
    var mediaRec = new Media(src, onSuccess, onError);

    // Record audio
    mediaRec.startRecord();

    // Stop recording after 10 sec
            var recTime = 0;
            var recInterval = setInterval(function() {
                recTime = recTime + 1;
                setAudioPosition(recTime + " sec");
                if (recTime >= 3) {
                    clearInterval(recInterval);
                    mediaRec.stopRecord();
                    mediaRec.play();
                }
            }, 1000);

  }

  function onSuccess() {
       console.log("recordAudio():Audio Success");
  }

  function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
  }

  // Set audio position
  //
  function setAudioPosition(position) {
    document.getElementById('audio_position').innerHTML = position;
  }

}])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
