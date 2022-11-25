let duration_t = 120;
let timer = document.getElementById("timer");
timer.innerText = duration_t.toString() + " min";
setInterval(updateTimer, 60000);

const modal_container = document.getElementById('modal_container')

function closePopup() {
    modal_container.classList.remove('show');
}

function updateTimer() {
    duration_t--;
    timer.innerText = duration_t.toString() + " min";
    if (duration_t === 30) {
        modal_container.classList.add('show');
    }
    else if (duration_t < 0) {
        window.location = "/users/logout";
    }
}

window.addEventListener("reset", resetTimer);
function resetTimer() {
    closePopup();
    duration_t = 120;
    timer.innerText = duration_t.toString() + " min";
}
