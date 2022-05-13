<?php

function accountExists($users, $email)
{
    $exists = $users->findOne(
        ["email" => $email]
    );

    return !empty($exists) ? true : false;
}

function getUser($users, $userId)
{
    $user = $users->findOne(
        ["_id" => $userId]
    );

    return $user;
}
