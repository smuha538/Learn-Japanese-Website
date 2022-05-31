<?php

session_start();
if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1 && isset($_GET["deck"]) && isset($_GET["card"])) {
    $deck_name = $_GET["deck"];
    $card_name = $_GET["card"];
    $users = require "../partials/database.php";
    $user = $users->findOne(array("_id" => $_SESSION["userId"]));
    $decks = json_decode(json_encode($user->decks), true);
    $deck_id = "";
    $card_id = "";
    foreach ($decks as $key => $value) {
        foreach ($value as $property => $name) {
            if ($name == $deck_name) {
                $deck_id = $key;
            }
        }
    }
    foreach ($decks[$deck_id]["cards"] as $key => $value) {
        foreach ($value as $property => $name) {
            if ($name == $card_name) {
                $card_id = $key;
            }
        }
    }

    $users->updateOne(array("_id" => $_SESSION["userId"]), array('$pull' => array("decks.$deck_id.cards" => array("english" => "$card_name"))));

    $stored_decks = $_SESSION["decks"][$deck_id]["cards"];
    array_splice($stored_decks, $card_id, 1);
    $_SESSION["decks"][$deck_id]["cards"] = $stored_decks;
} else {
    header("Location: ./login.php");
}
