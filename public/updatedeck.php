<?php

session_start();
if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1 && isset($_GET["deck"]) && isset($_GET["status"]) && isset($_GET["date"])) {
    $deck_name = $_GET["deck"];
    $card_name = json_decode($_GET["card"]);
    $date = isset($_GET["date"]);
    $date = $_GET["date"];
    $_GET["status"] == "complete" ? $status = true : $status = false;

    $users = require "../partials/database.php";
    $user = $users->findOne(array("_id" => $_SESSION["userId"]));
    $decks = json_decode(json_encode($user->decks), true);
    $deck_id = "";

    foreach ($decks as $key => $value) {
        foreach ($value as $property => $name) {
            if ($name == $deck_name) {
                $deck_id = $key;
            }
        }
    }

    $users->updateOne(array("_id" => $_SESSION["userId"]), array('$set' => array("decks.$deck_id.complete" => $status, "decks.$deck_id.complete_date" => $date)));

    $status == true ? $_SESSION["decks"][$deck_id]["complete"] = true : $_SESSION["decks"][$deck_id]["complete"] = false;
} else {
    header("Location: ./login.php");
}
