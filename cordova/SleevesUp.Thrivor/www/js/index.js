var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
  		// var targetUrl = "http://hostedapp-001.azurewebsites.net?platform=" + cordova.platformId;
      // var targetUrl = "http://www.tally.co/thrivorwebtest/";
      var targetUrl = "https://apidev.thrivor.com/";
      window.location.replace(targetUrl);
    }
};

app.initialize();
