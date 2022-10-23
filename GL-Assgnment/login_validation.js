"use strict";

import credentials from './credentials.json' assert {type: 'json'};

var user = credentials[0]['Login Username'].trim().toLowerCase();
var pass = credentials[0]['Login Password'];

$(document).ready(function () {
    $("#login-btn").click(function () {
        if (validate()) {
            location.href = "home.html"
        }
        else {
            $("#login-failed-wrapper").css("display", "block");
        }
    });

    $("#username").on("keypress focus", function () {
        $("#login-failed-wrapper").css("display", "none");
    });

    $("#password").on("keypress focus", function () {
        $("#login-failed-wrapper").css("display", "none");
    });
});

$(document).keypress(function(e){
    if (e.which == 13){
        $("#login-btn").click();
    }
});

function validate() {
    if (username.value.trim().toLowerCase() == user && password.value == pass) { return true; }
    return false;
}

window.history.forward(0);

