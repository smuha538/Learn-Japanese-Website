<?php

session_start();
if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1) {
    if (isset($_SESSION["decks"]) && !empty($_SESSION["decks"])) {
        $deck = $_SESSION["decks"];
        echo json_encode($deck);
    } else {
        echo json_encode([]);
    }
} else {
    header("Location: ./login.php");
}
