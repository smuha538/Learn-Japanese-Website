<?php
require "../partials/accounthelper.php";
session_start();

if (isset($_GET["deck"]) && $_GET["deck"] != "") {

    if (isset($_SESSION["decks"])) {
        $deck = $_SESSION["decks"];
    } else {
        $deck = [];
    }
    $deck_name = $_GET["deck"];
    if (nameExists($deck_name)) {
        echo json_encode([]);
    } else {
        $users = require "../partials/database.php";
        $new_deck = ["name" => $deck_name, "cards" => [["english" => ["man", "hand"], "japanese" => [], "difficultly_level" => "", "review_date" => ""]], "complete" => false,];
        $users->updateOne(array("_id" => $_SESSION["userId"]), array('$addToSet' => array("decks" => $new_deck)));
        $deck[] = $new_deck;
        $_SESSION["decks"] = $deck;
        echo json_encode([$new_deck]);
    }
} else {
    echo json_encode([]);
}

function nameExists($name)
{
    if (isset($_SESSION["decks"]) && !empty($_SESSION["decks"])) {
        $decks = $_SESSION["decks"];
        $exists = false;
        foreach ($decks as $deck) {
            if (strcmp($deck["name"], $name) === 0) {
                $exists = true;
            }
        }
        return $exists;
    } else {
        return false;
    }
}
