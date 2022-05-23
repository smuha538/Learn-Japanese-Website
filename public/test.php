<?php

session_start();

// $deck_name = $_GET["deck"];
// $card_name = $_GET["card"];
$users = require "../partials/database.php";
// $user = $users->findOne(array("_id" => $_SESSION["userId"]));
// $decks = json_decode(json_encode($user->decks), true);
// $deck_id = "";
// $card_id = "";
// $date = $_GET["date"];
// $_GET["card"] == "reviewed" ? $status = true : $status = false;
// foreach ($decks as $key => $value) {
//     foreach ($value as $property => $name) {
//         if ($name == $deck_name) {
//             $deck_id = $key;
//         }
//     }
// }
// foreach ($decks[$deck_id]["cards"] as $key => $value) {
//     foreach ($value as $property => $name) {
//         if ($name == $card_name) {
//             $card_id = $key;
//         }
//     }
// }
$users->updateOne(array("_id" => $_SESSION["userId"]), array('$set' => array("decks.0.cards.0.reviewed" => "awdd", "decks.0.cards.0.review_date" => "aedawd", "decks.0.cards.0.difficulty_level" => "5")));
// $users->updateOne(array("_id" => $_SESSION["userId"]), array('$set' => array("decks.0.cards.0.learned" => "awdad", "decks.0.cards.0.review_date" => "wdawd")));
