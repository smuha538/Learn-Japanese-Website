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
            <div id="practiseModal" class="modal">
                <div class="modal-content center-align">
                    <div class="center-align">
                        <span id="remainingCards"></span><span id="remaining"> Cards Remaining</span>
                    </div>
                    <div class="container center-align">
                        <section class="cardContainer">
                            <div id="card">
                                <figure class="front blue-grey darken-1 z-depth-2">
                                    <div id="frontWords" class="white-text">
                                        <span id="complete" class="hide">Review is Complete</span>
                                        <span id="furigana"></span>
                                        <span id="kanji"></span>
                                    </div>
                                </figure>
                                <figure class="back blue-grey darken-1 z-depth-2">
                                    <div id="backWords" class="white-text">
                                        <span id="english"></span>
                                    </div>
                                </figure>
                            </div>
                        </section>
                        <section id="options">
                            <p>
                                <a id="flip" class="btn blue tooltipped waves-effect waves-light" data-position="down" data-tooltip="Flip Card"><i class="material-icons">flip</i></a>
                            </p>
                        </section>
                    </div>
                    <div class="container" id="flashButtons">
                        <div class="row">
                            <div class="col s3">
                                <a class="btn indigo waves-effect waves-light" id="previousButton"><i class="material-icons">navigate_before</i></a>
                            </div>
                            <div class="col s3">
                                <a class="btn red tooltipped waves-effect waves-light" data-position="top" data-tooltip="Level Down" id="downButton"><i class="material-icons">thumb_down</i></a>
                            </div>
                            <div class="col s3">
                                <a class="btn tooltipped waves-effect waves-light" data-position="top" data-tooltip="Level Up" id="upButton"><i class="material-icons">thumb_up</i></a>
                            </div>
                            <div class="col s3">
                                <a class="btn indigo waves-effect waves-light" id="nextButton"><i class="material-icons">navigate_next</i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat" id="closeReview">Close</a>
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
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat" id="closeView">Close</a>
                </div>
            </div>
        </div>
    </div>
    <script src="./scripts/creatorhelpers.js"></script>
    <script src="./scripts/flashcard.js"></script>
</body>

</html>