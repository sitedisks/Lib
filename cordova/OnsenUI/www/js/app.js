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

    function pageNav(url) {
        if (window.location.pathname != url)
            window.location.replace(url);
    }

    $('span.idea').on('click',function(){
        var modal = document.querySelector('ons-modal');
        modal.show();
        setTimeout(function () {
            modal.hide();
        }, 2000);
    })

    

    $('ons-button').on('click', function (e) {
        ons.notification.alert('Button is tapped!');
    })
});

