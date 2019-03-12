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
            window.location.replace('.' + url);
    }

    $('span.idea').on('click', function () {
        $('#info_dialog').show(200);
    })

    $('button.more').on('click', function () {
        $('#info_dialog').show(200);
    });

    $('.alert-dialog-button.cancel').click(function () {
        $('#info_dialog').hide();
    });

    $('.alert-dialog-button.subscription').click(function () {
        email = $('#sub_email').val();
        if(!isNullOrEmpty(email)){
            $('#info_dialog').hide();
            var modal = document.querySelector('ons-modal');
            modal.show();
            setTimeout(function () {
                modal.hide();
            }, 500);
        }else{
            ons.notification.toast('请输入您的电邮!', {timeout:1000, animation: 'fall'});
        }

    });

    $('ons-button').on('click', function (e) {
        ons.notification.alert('Button is tapped!');
    })

    function isNullOrEmpty(s) {
        return (s == null || s === "");
    }
});

