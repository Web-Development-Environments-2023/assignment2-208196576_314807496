var game_over;
var play_again;

document.addEventListener('DOMContentLoaded', function (event) {

    game_over =document.getElementById('gameOver');

    play_again= document.getElementsByClassName("play_again")[0];

    play_again.addEventListener("click", Start);
});

function showGameOver() {
    game_over.style.display = "block";
    window.clearInterval(interval);
    window.clearInterval(ghost_interval);
    interval.clearInterval();
}

function GameOverMessage() {

    canves_info.style.visibility = "hidden";
    msg = "";
    if (lifes == 0) {
        msg = "Loser!";
    } else if (time_elapsed <= 0) {
        if (score < 100) {
            msg = "You are better than " + score.toString() + " points!";

        } else { //score > 100
            msg = "Winner!!!";

        }
    } else {
        msg = "Winner!!!";

    }
    document.getElementById("message").innerHTML = msg;
    showDiv("gameOver")
}
