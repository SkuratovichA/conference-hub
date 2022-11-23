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

function invites_action(act, lect_name, username) {
    $.ajax({
        url: '',
        type: 'get',
        data: {
            action: act,
            lecture_name: lect_name,
            username: username,
        }
    });

     window.onclick = e => {
         if (e.target.innerText === "Decline" || e.target.innerText === "Accept") {
            e.target.parentNode.parentElement.remove();
         }
     }
}