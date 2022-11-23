let duration = 120;
let timer = document.getElementById("timer");
timer.innerText = duration.toString() + " min";
setInterval(updateTimer, 60000);

const modal_container = document.getElementById('modal_container')

function closePopup() {
    modal_container.classList.remove('show');
}

function updateTimer() {
    duration--;
    timer.innerText = duration.toString() + " min";
    if (duration === 30) {
        modal_container.classList.add('show');
    }
    else if (duration < 0) {
        window.location = "/users/logout";
    }
}

window.addEventListener("reset", resetTimer);
function resetTimer() {
    closePopup();
    duration = 120;
    timer.innerText = duration.toString() + " min";
}
