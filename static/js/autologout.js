
let time_var = 120;
let timer = document.getElementById("timer");
timer.innerText = time_var.toString() + " min";
setInterval(updateTimer, 60000);

const modal_container = document.getElementById('modal_container')

function closePopup() {
    modal_container.classList.remove('show');
}

function updateTimer() {
    time_var--;
    timer.innerText = time_var.toString() + " min";
    if (time_var === 30) {
        modal_container.classList.add('show');
    }
    else if (time_var < 0) {
        window.location = "/users/logout";
    }
}

window.addEventListener("reset", resetTimer);
function resetTimer() {
    closePopup();
    time_var = 120;
    timer.innerText = time_var.toString() + " min";
}
