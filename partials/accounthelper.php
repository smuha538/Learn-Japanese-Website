<?php

function accountExists($users, $email)
{
    $exists = $users->findOne(
        ["email" => $email]
    );

    return !empty($exists) ? true : false;
}
