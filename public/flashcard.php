<?php
require "../partials/header.php";
require "../partials/flashcardhelper.php";

if (!isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] != 1) {
    header("Location: ./login.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?= require "../partials/headtags.php" ?>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/flashcard.css">
    <title>Flashcard</title>
</head>

<body>
    <?= createHeader2(isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1, './images/headericon.png', 'indigo') ?>
    <div class="container white z-depth-1">
        <div class="row">
            <div class="col s12 center-align">
                <h3 class="">Flashcard</h3>
            </div>
            <?= addDeck() ?>
            <div class='col s12' id="headers">
                <div class='row'>
                    <span class='col s2 deckTitle'>Deck</span>
                    <span class='col s2 offset-s1'>Review</span>
                    <span class='col s2 offset-s1'>Cards</span>
                    <span class='col s2 offset-s1'>Delete</span>
                </div>
            </div>
            <div class='col s12'>
                <div class='row' id='decks'></div>
            </div>
            <div id="deckModal" class="modal">
                <div class="modal-content center-align">
                    <h4>Create a New Deck</h4>
                    <label for="deckName"></label>
                    <input type="text" id="deckName" placeholder="Enter Deck Name">
                    <span class="helper-text red-text" id="deckHelper"></span>
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat" id="deckCancelButton">Cancel</a>
                    <a class="waves-effect waves-green btn-flat" id="deckCreateButton">Create</a>
                </div>
            </div>
            <div id="viewModal" class="modal modal-fixed-footer">
                <div class="modal-content">
                    <h3>Cards</h3>
                    <div class="row" style="margin-top: 2rem; font-weight:bold;">
                        <span class="col l4 s3">Japanese</span>
                        <span class="col l4 s2">English</span>
                        <span class="col l1 s2">Status</span>
                        <span class="col l2 s3">Review In</span>
                        <span class="col l1 s1">Remove</span>
                    </div>
                    <div id="cardSection" class="row" style="margin-top: 1rem;">
                        <div class="col s12">
                            <div class="row">
                                <span class="col l4 s3 truncate">Japanese</span>
                                <span class="col l4 s2 truncate">English</span>
                                <a class="col l1 s2 btn-small cardStatus">Learned</a>
                                <span class="col l2 s3">Tommorow</span>
                                <div class="col l1 s1">
                                    <a class="btn-floating btn-small waves-effect waves-light red removeCard"><i class='material-icons'>remove</i></a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
                </div>
            </div>
        </div>
    </div>
    <script src="./scripts/creatorhelpers.js"></script>
    <script src="./scripts/flashcard.js"></script>
</body>

</html>