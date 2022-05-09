<?php
require "../vendor/autoload.php";

$server = "mongodb+srv://databaseConnector:wSb7XnA0keBnIhuc@userdatacluster.adumz.mongodb.net/Data?retryWrites=true&w=majority";

$client = new MongoDB\Client($server);
$data = $client->Data;
$users = $data->Users;

return $users;
