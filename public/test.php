<?php
require "../vendor/autoload.php";
session_start();
$users = require "../partials/database.php";
$user = $users->findOne(array("_id" => $_SESSION["userId"]));
$decks = json_decode(json_encode($user->decks), true);
$deck_id = "";
$card_id = "";
// foreach ($decks as $key => $value) {
//     foreach ($value as $property => $name) {
//         if ($name == "main") {
//             $deck_id = $key;
//         }
//     }
// }

// foreach ($decks[$deck_id]["cards"] as $key => $value) {
//     foreach ($value as $property => $name) {
//         if ($name == "10,000; ten thousand, myriad, everything; all, various") {
//             $card_id = $key;
//         }
//     }
// }

$users->updateOne(array("_id" => $_SESSION["userId"]), array('$pull' => array("decks.0.cards" => array("english" => "man, Mann"))));
