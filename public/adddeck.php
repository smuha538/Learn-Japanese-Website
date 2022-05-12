<?php

session_start();
header('Content-Type: application/json');

if (isset($_GET["deck"])) {

    if (isset($_SESSION["decks"])) {
        $deck = $_SESSION["decks"];
    } else {
        $deck = [];
    }
    $deck_name = $_GET["deck"];
    $new_deck = ["name" => $deck_name, "cards" => [["english" => [], "japanese" => [], "difficultly_level" => "", "review_date" => ""]], "complete" => false,];
    $deck[] = $new_deck;
    $_SESSION["decks"] = $deck;
    echo json_encode($new_deck);
}
