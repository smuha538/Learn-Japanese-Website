<?php
require "../partials/header.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?= require "../partials/headtags.php" ?>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/about.css">
    <title>Document</title>
</head>

<body>
    <?= createHeader2(isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1, './images/headericon.png', 'indigo') ?>
    <div class="container indigo white-text z-depth-2" id="mainContainer">
        <div class="row">
            <div class="col s12" style="margin-left: 5%;">
                <h4>About</h4>
            </div>
            <div class="col s10 offset-s1">
                <span>Easy Japanese aims to become an esstenial tool for learners of the Japanese language by providing easy to use search and flashcard features to reach mastery of the language. Easy Japanese could not have been developed if it was not for several incredible resources that inspired and provided data for us. We want to thank each one of them.</span>
            </div>
            <div class="col s12" style="margin-left: 5%;">
                <h4><a href="https://github.com/mistval/unofficial-jisho-api" class="blue-text" target="_blank">Jisho API</a></h4>
            </div>
            <div class="col s10 offset-s1">
                <span>The unofficial Jisho API by mistval made it possible for us to access the extensive Jisho dictionary that contains thousands of words and phrases for learners to scour through and add to their decks.</span>
            </div>
            <div class="col s12" style="margin-left: 5%;">
                <h4><a href="https://jisho.org" class="blue-text" target="_blank">Jisho Website</a></h4>
            </div>
            <div class="col s10 offset-s1">
                <span>Most of our design was inspired from the Jisho Website which perfectly lists and organises the dictionary entries. As the saying goes, "if it ain't broke, don't fix it".</span>
            </div>
            <div class="col s12" style="margin-left: 5%;">
                <h4><a href="https://nihongo-app.com" class="blue-text" target="_blank">Nihongo App</a></h4>
            </div>
            <div class="col s10 offset-s1" style="margin-bottom: 2%;">
                <span>Our flashcard functionalities were greatly inspired by the brilliant dictionary and flashcard application, Nihongo by Chris Vasselli</span>
            </div>
        </div>
    </div>
</body>

</html>