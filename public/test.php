<?php
require "../vendor/autoload.php";

$users = require "../partials/database.php";
$exists = $users->findOne(
    ["email" => "simon@gmail.com"]
);


var_dump($exists->_id);
