<?php
require "../vendor/autoload.php";
session_start();
$users = require "../partials/database.php";
$user = $users->findOne(array("_id" => $_SESSION["userId"]));
$decks = json_decode(json_encode($user->decks), true);
$id = "";
foreach ($decks as $key => $value) {
    foreach ($value as $property => $name) {
        if ($name == "super") {
            $id = $key;
        }
    }
}




$users->updateOne(array("_id" => $_SESSION["userId"]), array('$addToSet' => array("decks.0.cards" => "dadwa")));
var_dump($id);
