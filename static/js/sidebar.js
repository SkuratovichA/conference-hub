
let opened = false;

function manage_notification_bar() {
    if (opened === true) {
        document.getElementById("mySidebar").style.width = "400px";
        document.getElementById("main").style.marginRight = "400px";
    } else {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginRight = "0";
    }
    opened = ! opened;
}

