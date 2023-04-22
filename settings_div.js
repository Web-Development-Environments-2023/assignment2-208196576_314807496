var shooting_key;
var playing_time;

function chooseKey(){
    shooting_key = document.getElementById('shooting_Key').value
    playing_time = document.getElementById('time_to_play').value
    showDiv('theCanvas')
    newGame()
}
