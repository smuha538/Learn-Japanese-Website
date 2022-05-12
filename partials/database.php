<?php
require "../vendor/autoload.php";

$server = $_ENV['MONGODB_URI'] ?? "mongodb://localhost:27017";

$client = new MongoDB\Client($server);
$data = $client->Data;
$users = $data->Users;

return $users;
