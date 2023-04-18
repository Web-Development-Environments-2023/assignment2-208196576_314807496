function welcome(){
    showDiv('welcome_div');

}

function showDiv(divId){
    var welcome_div = document.getElementById('welcome_div');
    var reg_div = document.getElementById('register_div');
    var settings_div = document.getElementById('settings_div');
    var about_div = document.getElementById('about_div');
    var login_div = document.getElementById('login_div');
    var game_div = document.getElementById('game_div');
    var end_screen_div = document.getElementById('endScreen_div');
    var cur_div = document.getElementById(divId);


    welcome_div.style.visibility = 'hidden';
    reg_div.style.visibility = 'hidden';

    settings_div.style.visibility = 'hidden';

    login_div.style.visibility = 'hidden';
    about_div.style.visibility = 'hidden';

    game_div.style.visibility = 'hidden';
    end_screen_div.style.visibility = 'hidden';

    cur_div.style.visibility = "visible";

    canves_info.style.visibility = "hidden";

    if (divId == 'about_div')
        displayAboutDiv();

    if(divId !='game_div') {
        stopMusic();
        stopGame();
    }


    if(divId =='game_div') {
        StartGame();
        startMusic();
    }

    if(divId =='endScreen_div') {

        cur_div.style.visibility = "visible";
        game_div.style.visibility = 'visible';


        canves_info.style.visibility = "visible";
        showGameOver();
    }

}
