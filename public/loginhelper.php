<?php
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
$exists = $users->findOne(
    ["email" => $email]
);
