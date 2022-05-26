<?php

session_start();

// $deck_name = $_GET["deck"];
// $card_name = $_GET["card"];
$users = require "../partials/database.php";
$user = $users->findOne(array("_id" => $_SESSION["userId"]));
$decks = json_decode(json_encode($user->decks), true);
foreach ($decks as $key => $value) {
    foreach ($value as $property => $output) {
        if ($property == "complete_date" && $output != date('n/d/Y')) {
            foreach ($value as $property => $output) {
                if ($property == "complete" && $output == true) {
                    $users->updateOne(array("_id" => $_SESSION["userId"]), array('$set' => array("decks.$key.complete" => false)));
                }
                if ($property == "cards") {
                    foreach ($output as $cardindex => $card) {
                        foreach ($card as $fields => $fieldvalue) {
                            if ($fields == "reviewed" && $fieldvalue == true) {
                                $users->updateOne(array("_id" => $_SESSION["userId"]), array('$set' => array("decks.$key.cards.$cardindex.reviewed" => false)));
                            }
                        }
                    }
                }
            }
        }
    }
}
// foreach ($decks[$deck_id]["cards"] as $key => $value) {
//     foreach ($value as $property => $name) {
//         if ($name == $card_name) {
//             $card_id = $key;
//         }
//     }
// }
// $users->updateOne(array("_id" => $_SESSION["userId"]), array('$set' => array("decks.$.cards.$.reviewed" => false)));
// $users->updateOne(array("_id" => $_SESSION["userId"]), array('$set' => array("decks.0.cards.0.learned" => "awdad", "decks.0.cards.0.review_date" => "wdawd")));
// echo date("m-d-Y");
