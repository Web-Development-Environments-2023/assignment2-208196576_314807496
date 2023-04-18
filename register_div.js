var Users = new Array();
const email_format = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const name_format = /^[a-z]([a-z_\s])+$/i;
const password_formart = /^[a-z]([0-9a-z_\s])+$/i;
var test_user = {
    username: "p",
    name: "testuser ",
    password: "testuser ",
    email: "testuser@p.com",
    birthday: "22/02/1999"
}
Users.push(test_user);

var dialog
$(function () {
    var form,
        name = $("#name"),
        username = $("#Username "),
        password = $("#password"),
        rePassword = $("#rePassword"),
        birthday = $("#birthday"),
        email = $("#email"),
        allFields = $([]).add(name).add(username).add(password).add(rePassword).add(birthday).add(email),
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
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
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
            $("#users tbody").append("<tr>" +
                "<td>" + username.val() + "</td>" +
                "<td>" + email.val() + "</td>" +
                "<td>" + date.val() + "</td>" +
                "</tr>");

            var newUser = {
                username: $("#username").val(),
                name: $("#name").val(),
                password: $("#password").val(),
                email: $("#email").val(),
                date: $("#date").val()
            }
            Users.push(newUser);
            showDiv('login_div');
            dialog.dialog("close");

        }
        return valid;
    }

    function validateElement(o, regexp, n) {
        if ((regexp.test(o.val()))) {
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
        var valid = true;
        valid = valid && checkLength(name, "name", 1, 16);
        valid = valid && checkLength(email, "email", 6, 80);
        valid = valid && checkLength(password, "password", 6, 16);
        valid = valid && checkLength(rePassword, "rePassword", 6, 16);
        valid = valid && checkLength(username, "username", 1, 16);

        valid = valid && validateElement(name, name_format, "only letters are alowed");
        valid = valid && validateElement(email, email_format, "please use your real email");
        valid = valid && validateElement(password, password_formart, "Password field only allow : a-z 0-9");
        valid = valid && (password.val() === rePassword.val())
        
        return valid;
    }
});

function openRegisterWindow() {
    showDiv('register_div');
    dialog.dialog("open");

}