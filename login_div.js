var cuur_user;
var password;

function assertLogin(){

    pass = document.getElementById("pass_login").value;

    user = document.getElementById("user_login").value; 
    curr = Users.find(element => element.username === user);
    if (curr == undefined)
        alert("Error in login details");
    if (curr.password == pass){
        highScoreArray = new Array();
        connectedUsername=user
        showDiv('custom_settings');
        return true;
    }
    else {
        alert("Error in login details");
    }
}