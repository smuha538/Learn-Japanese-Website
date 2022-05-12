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
    <script src="./scripts/flashcard.js"></script>
    <title>Flashcard</title>
</head>

<body>
    <?= createHeader2(isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1, './images/headericon.png', 'indigo') ?>
    <div class="container white z-depth-1">
        <div class="row">
            <div class="col s12 center-align">
                <h3 class="">Flashcard</h3>
            </div>

            <?php
            echo addDeck();
            echo listDeck();
            ?>
            <div id="modal1" class="modal">
                <div class="modal-content center-align">
                    <h4>Create a New Deck</h4>
                    <label for="deckName"></label>
                    <input type="text" id="deckName" placeholder="Enter Deck Name">
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                    <a class="modal-close waves-effect waves-green btn-flat" id="createButton">Create</a>
                </div>
            </div>
        </div>
    </div>
</body>

</html>