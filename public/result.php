<?php
require "../partials/header.php";
require "../partials/resulthelper.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?= require "../partials/headtags.php" ?>
    <link rel="stylesheet" href="./css/result.css" />
    <title>Search Results</title>
</head>

<body>
    <?= createHeader2(isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1, './images/headericon.png', 'indigo') ?>
    <div class="container white z-depth-2">
        <div class="row">
            <div class="col s12">
                <div class="row">
                    <div class="col s7">
                        <h5>Results</h5>
                    </div>

                    <?php
                    if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1) {
                        echo selectDeck();
                    }
                    ?>
                </div>
            </div>
            <div class="col s12">
                <div class="row" id="resultSection"></div>
            </div>
            <a class="btn waves-effect waves-light indigo" id="showMoreButton">Show More Results</a>
        </div>
    </div>
    <?php
    if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1) {
        echo "<div id='logged'></div>";
    }
    ?>
    <script src="./scripts/creatorhelpers.js"></script>
    <script src="./scripts/result.js"></script>
</body>

</html>