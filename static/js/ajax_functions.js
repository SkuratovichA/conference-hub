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
             // let cnt_invites = document.getElementById("cnt_invites").innerText;
             // let int_invites = parseInt(cnt_invites, 10) - 1;
             // document.getElementById("cnt_invites").innerText = int_invites.toString();
         }
     }
}