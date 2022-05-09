<?php
require "../vendor/autoload.php";

$server = $_ENV['MONGODB_URI'] ?? '';
// $server = "mongodb+srv://databaseConnector:wSb7XnA0keBnIhuc@userdatacluster.adumz.mongodb.net/Data?retryWrites=true";

$client = new MongoDB\Client($server);
$data = $client->Data;
$users = $data->Users;

return $users;
