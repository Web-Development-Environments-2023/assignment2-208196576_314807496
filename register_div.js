var Users = new Array();
const email_format = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const name_format = /^[a-z]([a-z_\s])+$/i;
const password_formart = /^[a-z]([0-9a-z_\s])+$/i;
var test_user = {
    username: "testuser",
    name: "testuser",
    password: "testuser",
    email: "testuser@p.com",
    birthday: "22/02/1999"
}
Users.push(test_user);

var dialog
var form,
    myName = document.getElementById("name"),
    username = document.getElementById("Username"),
    password = document.getElementById("password"),
    rePassword = document.getElementById("rePassword"),
    birthday = document.getElementById("birthday"),
    email = document.getElementById("email"),
    allFields = $([]).add(myName).add(username).add(password).add(rePassword).add(birthday).add(email),
    tips = $(".validateTips");


function updateTips(t) {
    tips
        .text(t)
        .addClass("ui-state-highlight");
    setTimeout(function () {
        tips.removeClass("ui-state-highlight", 1500);
    }, 500);
}

function checkLength(o, n, min, max) {
    if (o.value.length > max || o.value.length < min) {
        o.style.class = "ui-state-error";
        updateTips("Length of " + n + " must be between " +
            min + " and " + max + ".");
        return false;
    } else {
        return true;
    }
}

function addUser() {
    if (validateUsersDetails()) {
        alert("Registration Successfull");
        // $("#users tbody").append("<tr>" +
        //     "<td>" + document.getElementById("Username").value + "</td>" +
        //     "<td>" + document.getElementById("email").value + "</td>" +
        //     "<td>" + document.getElementById("birthday").value + "</td>" +
        //     "</tr>");

        var newUser = {
            myName : document.getElementById("name").value,
            username : document.getElementById("Username").value,
            password : document.getElementById("password").value,
            rePassword : document.getElementById("rePassword").value,
            birthday : document.getElementById("birthday").value,
            email : document.getElementById("email").value
        }
        Users.push(newUser);
        showDiv('login_div');
       // dialog.dialog("close");

    }
    //return valid;
}

function validateElement(o, regexp, n) {
    if ((regexp.test(o.value))) {
        return true;
    } else {
        o.addClass("ui-state-error");
        updateTips(n);
        return false;
    }
}


dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 450,
    width: 350,
    modal: true,
    buttons: {
        "Create an account": addUser,
        Cancel: function () {
            dialog.dialog("close");
        }
    },
    close: function () {
        form[0].reset();
    }
});

form = dialog.find("form").on("submit", function (event) {
    event.preventDefault();
    addUser();
});

function validateUsersDetails() {
    let myName = document.getElementById("name"),
    username = document.getElementById("Username"),
    password = document.getElementById("password"),
    rePassword = document.getElementById("rePassword"),
    birthday = document.getElementById("birthday"),
    email = document.getElementById("email")
    // var valid = true;
    // valid = valid && checkLength(myName, "name", 1, 16);
    // valid = valid && checkLength(email, "email", 6, 80);
    // valid = valid && checkLength(password, "password", 6, 16);
    // valid = valid && checkLength(rePassword, "rePassword", 6, 16);
    // valid = valid && checkLength(username, "username", 1, 16);

    // valid = valid && validateElement(myName, name_format, "only letters are alowed");
    // valid = valid && validateElement(email, email_format, "please use your real email");
    // valid = valid && validateElement(password, password_formart, "Password field only allow : a-z 0-9");
    // valid = valid && (password.value === rePassword.value)
    
    return true;
}

function openRegisterWindow() {
    showDiv('register_div');
    //dialog.dialog("open");

}