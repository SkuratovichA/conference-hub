function admin_users(act, username) {
    $.ajax({
        url: '',
        type: 'get',
        data: {
            action: act,
            username: username,
        },
        success: function() {
            window.location.reload();
        }
    });
}