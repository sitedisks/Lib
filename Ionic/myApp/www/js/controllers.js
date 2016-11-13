angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', '$ionicPlatform', '$cordovaMedia',  function($scope, $ionicPlatform, $cordovaMedia) {

  // TODO: http://stackoverflow.com/questions/26520308/phonegap-media-api-record-and-play-audio-android
  // TODO: https://www.raymondcamden.com/2015/07/27/recording-and-saving-audio-in-cordova-applications
  // TODO: file location: http://qnimate.com/find-recorded-audio-file-location-in-cordova/
  // pure cordove style of device ready
  // document.addEventListener("deviceready", onDeviceReady, false);

  // ionic style of device ready
  $ionicPlatform.ready(onDeviceReady);

  function onDeviceReady(){

    // /android_asset/www/test.wav
    // var src =  'file://' + getPhoneGapPath() + "myrecording.mp3";
    var src = 'file://' + getPhoneGapPath() + 'myrecording.wav';
    // var mediaRec = new Media('8888.mp3', onSuccess, onError);
    // var mediaRec = $cordovaMedia.newMedia(src);
    var mediaRec;
    // do the native plugins
    $scope.message = 'Initial Message';
    // functions register
    $scope.recordAudio = recordAudio;
    $scope.stopRecording = stopRecording;
    $scope.playRecording = playRecording;
    $scope.logDuration = logDuration;
    $scope.showPath = showPath;

    function recordAudio(){
      // pure cordova
      // ngCordova
      //mediaRec = $cordovaMedia.newMedia(src);
      mediaRec = new Media(src,
        function(){
          $scope.track = 'on Success';
        }, function(err){
          $scope.track = 'on error ' + err.code;

        });
      // Record audio
      $scope.message = 'Start Recording...';
      mediaRec.startRecord();
      $scope.track = JSON.stringify(mediaRec);
      // setTimeout(function() {
      //     mediaRec.stopRecord();
      // }, 50000);
    }

    function onSuccess(e) {
      $scope.track ="recordAudio():Audio Success.";
    }

    function onError(error) {
      $scope.track = 'code: '    + error.code    + '\n messsage: ' + error.message + '\n';
    }

    function stopRecording(){
      $scope.message = 'stop ' + src;
      mediaRec.stopRecord();
      $scope.track = JSON.stringify(mediaRec);
    }

    function playRecording(){
      $scope.message = 'play ' + src;
      // var src =  getPhoneGapPath() + "playback.wma";
      // var mediaRec = new Media(src, onSuccess, onError);
      // mediaRec.play();

      mediaRec.release();
    }

    function logDuration(){

      var dur = mediaRec.getDuration();
      $scope.message = dur;
    }

    function logLocation(){
      return mediaRec.getCurrentPosition();
    }

    function logAmplitude(){
      return mediaRec.getCurrentAmplitude();
    }

    function showPath(){
      $scope.message = getPhoneGapPath();
    }

  }

  function getPhoneGapPath() {
      var path = window.location.pathname;
      var sizefilename = path.length - (path.lastIndexOf("/")+1);
      path = path.substr( path, path.length - sizefilename );
      return path;
  };

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
