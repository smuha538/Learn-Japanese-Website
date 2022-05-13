<?php
require "../partials/accounthelper.php";
session_start();

if (isset($_GET["deck"]) && $_GET["deck"] != "") {

    if (isset($_SESSION["decks"]) && !empty($_SESSION["decks"])) {
        foreach ($_SESSION["decks"] as $elementKey => $element) {
            foreach ($element as $valueKey => $value) {
                if ($valueKey == 'name' && $value == $_GET["deck"]) {
                    array_splice($_SESSION["decks"], $elementKey, 1);
                    $users = require "../partials/database.php";
                    $users->updateOne(array("_id" => $_SESSION["userId"]), array('$pull' => array("decks" => array("name" => $_GET["deck"]))));
                }
            }
        }
    }
}
