var cuur_user;
var password;

function assertLogin(){

    pass = document.getElementById("pass_login").value;

    user = document.getElementById("user_login").value; 
    curr = Users.find(element => element.user === user);
    if (curr == undefined)
        alert("Error in login details");
    if (curr['password'] == pass){
        connectedUsername=user
        showDiv('custom_settings');
        return true;
    }
    else {
        alert("Error in login details");
    }
}