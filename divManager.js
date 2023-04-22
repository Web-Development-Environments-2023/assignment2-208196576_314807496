
function welcome(){
    showDiv('welcome_div');

}

function showDiv(divId){
    canvas.style.width = "0%";
    canvas.style.height = "0%";
    var welcome_div = document.getElementById('welcome_div');
    var reg_div = document.getElementById('register_div');
    var about_div = document.getElementById('about_div');
    var login_div = document.getElementById('login_div');
    var game_div = document.getElementById('game_div');
    var end_screen_div = document.getElementById('gameOver');
    var cur_div = document.getElementById(divId);
    var canves_info = document.getElementById('theCanvas')
    var game_canvas = document.getElementById('info-canvas')
    var settings = document.getElementById('custom_settings')
    var highScore = document.getElementById('highScore_div')
    var startGameAgain = document.getElementById('StartGameAgain');

    welcome_div.style.visibility = 'hidden';
    reg_div.style.visibility = 'hidden';
    settings.style.visibility = 'hidden'
    highScore.style.visibility = 'hidden'
    startGameAgain.style.visibility = 'hidden'

    login_div.style.visibility = 'hidden';
    about_div.style.visibility = 'hidden';

    game_div.style.visibility = 'hidden';
    end_screen_div.style.visibility = 'hidden';
    canves_info.style.visibility = "hidden";
    canvas.style.visibility = "hidden";
    game_canvas.style.visibility = "hidden";

    cur_div.style.visibility = "visible";


    if (divId == 'about_div')
        displayAboutDiv();

    // if(divId !='game_div') {
    //     stopMusic();
    //     stopGame();
    // }


    // if(divId =='game_div') {
    //     StartGame();
    //     startMusic();
    // }

    if(divId =='gameOver') {

        cur_div.style.visibility = "visible";
        //game_div.style.visibility = 'visible';


        //canves_info.style.visibility = "visible";
        showGameOver();
    }

}
