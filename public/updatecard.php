<?php

session_start();
if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1 && isset($_GET["deck"]) && isset($_GET["card"]) && isset($_GET["date"]) && isset($_GET["status"]) && isset($_GET["difficulty"])) {
    $deck_name = $_GET["deck"];
    $card_name = json_decode($_GET["card"]);
    $date = $_GET["date"];
    $_GET["status"] == "reviewed" ? $status = true : $status = false;
    $level = $_GET["difficulty"];
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

            if ($name === $card_name) {
                $card_id = $key;
            }
        }
    }

    $users->updateOne(array("_id" => $_SESSION["userId"]), array('$set' => array("decks.$deck_id.cards.$card_id.reviewed" => $status, "decks.$deck_id.cards.$card_id.review_date" => $date, "decks.$deck_id.cards.$card_id.difficulty_level" => $level)));
    foreach ($_SESSION["decks"][$deck_id]["cards"] as $elementKey => $element) {
        foreach ($element as $valueKey => $value) {
            if ($valueKey == 'english' && $value === $card_name) {
                $status ? $_SESSION["decks"][$deck_id]["cards"][$elementKey]["reviewed"] = true : $_SESSION["decks"][$deck_id]["cards"][$elementKey]["reviewed"] = false;
                $_SESSION["decks"][$deck_id]["cards"][$elementKey]["review_date"] = $date;
                $_SESSION["decks"][$deck_id]["cards"][$elementKey]["difficulty_level"] = $level;
            }
        }
    }
} else {
    header("Location: ./login.php");
}
