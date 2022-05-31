<?php
require "../partials/accounthelper.php";
session_start();
if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1 && isset($_GET["card"]) && $_GET["card"] != "" && isset($_GET["deck"]) && $_GET["deck"] != "") {
    $card_info = json_decode($_GET["card"]);
    $deck_name = $_GET["deck"];
    $card_info->japanese->kanji == null ? $kanji = "undefined" : $kanji = $card_info->japanese->kanji;
    $card = ["english" => $card_info->english, "japanese" => ["kanji" => $kanji, "furigana" => $card_info->japanese->furigana], "difficulty_level" => "0", "review_date" => "", "reviewed" => false, "learned" => false];
    $users = require "../partials/database.php";
    $user = $users->findOne(array("_id" => $_SESSION["userId"]));
    $decks = json_decode(json_encode($user->decks), true);
    $id = "";
    foreach ($decks as $key => $value) {
        foreach ($value as $property => $name) {
            if ($name == $deck_name) {
                $id = $key;
            }
        }
    }
    $users->updateOne(array("_id" => $_SESSION["userId"]), array('$addToSet' => array("decks.$id.cards" => $card)));

    $stored_decks = $_SESSION["decks"][$id]["cards"];
    $stored_decks[] = $card;
    $_SESSION["decks"][$id]["cards"] = $stored_decks;
} else {
    header("Location: ./login.php");
}
