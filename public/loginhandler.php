<?php

require "../partials/accounthelper.php";
session_start();

if (isset($_POST["action"])) {

    $users = require "../partials/database.php";
    $email = strtolower($_POST["email"]);
    $password = $_POST["password"];

    if (accountExists($users, $email)) {
        $exists = $users->findOne(
            ["email" => $email]
        );

        $hash = $exists->password;

        if (password_verify($password, $hash)) {
            $_SESSION["loggedIn"] = true;
            $_SESSION["userId"] = $exists->_id;
            $decks = json_decode(json_encode($exists->decks), true);
            $_SESSION["decks"] = $decks;
            header("Location: ./index.php");
        } else {
            header("Location: ./login.php?error=invalid");
        }
    } else {
        header("Location: ./login.php?error=invalid");
    }
} else {
    header("Location: ./login.php");
}
