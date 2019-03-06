$(function () {
    $('label.home').on('click', function (e) {
        var url = '/index.html';
        pageNav(url);
    })

    $('label.me').on('click', function (e) {
        var url = '/me.html';
        pageNav(url);
    })

    $('label.info').on('click', function (e) {
        var url = '/info.html';
        pageNav(url);
    })

    function pageNav(url){
        if(window.location.pathname != url)
            window.location.replace(url);
    }

    $('ons-button').on('click', function (e) {
        ons.notification.alert('Button is tapped!');
    })
});

