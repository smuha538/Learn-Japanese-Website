<?php

session_start();
header('Content-Type: application/json');

if (isset($_SESSION["decks"]) && !empty($_SESSION["decks"])) {
    $deck = $_SESSION["decks"];
    echo json_encode($deck);
}
