<?php

require "../partials/accounthelper.php";
session_start();

if (!empty($_POST["first_name"]) && !empty($_POST["last_name"]) && !empty($_POST["email"]) && !empty($_POST["password"]) && !empty($_POST["confirmPassword"])) {
    $users = require "../partials/database.php";
    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $email = strtolower($_POST["email"]);
    $password = password_hash($_POST["password"], PASSWORD_BCRYPT, ["cost" => 12]);;

    if (!accountExists($users, $email)) {
        $createNewUser = $users->insertOne([
            "first_name" => $first_name,
            "last_name" => $last_name,
            "email" => $email,
            "password" => $password,
            "decks" => []
        ]);

        $_SESSION["loggedIn"] = true;
        $_SESSION["userId"] = $createNewUser->getInsertedId();
        $_SESSION["decks"] = [];
        header("Location: ./index.php");
    } else {
        $_SESSION["tempFirstName"] = $_POST["first_name"];
        $_SESSION["tempLastName"] = $_POST["last_name"];
        $_SESSION["tempEmail"] = $_POST["email"];
        $_SESSION["tempPassword"] = $_POST["password"];
        $_SESSION["tempConfirmPassword"] = $_POST["confirmPassword"];
        header("Location: ./register.php?error=exists");
    }
} else {
    header("Location: ./register.php");
}
