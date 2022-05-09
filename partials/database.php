<?php
require "../vendor/autoload.php";

$server = $_ENV['MONGODB_URI'] ?? '';

$client = new MongoDB\Client($server);
$data = $client->Data;
$users = $data->Users;

return $users;
