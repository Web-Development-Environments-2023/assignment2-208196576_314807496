var about_div;
var span;

document.addEventListener('DOMContentLoaded', function (event){

    about_div = document.getElementById('about_div');
    span = document.getElementsByClassName("closeSpan")[0];

    span.addEventListener("click", close_About);
    window.addEventListener("click", click_on_outter_window);
    addEventListener("keydown", click_escape);
});

function displayAboutDiv(){
    about_div.style.display = "block";
}

function close_About(){
    about_div.style.display = "none";
}

function click_on_outter_window(event){
    if(event.target == about_div){
        about_div.style.display = "none";
    }
}
function click_escape(key){
    if(key.which == 27){
        about_div.style.display = "none";
        welcome()
    }
}