<?php require "../partials/header.php"; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?= require "../partials/headtags.php" ?>
    <link rel="stylesheet" href="./css/header.css" />
    <link rel="stylesheet" href="./css/index.css" />
    <title>Home</title>
</head>

<body>
    <?= createHeader2(isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1, './images/headericon.png', 'indigo') ?>
    <div class="container">
        <div class="row">
            <div id="searchSection" class="col s12 blue darken-1 z-depth-2">
                <h6 class="white-text" style="font-weight: bold;">Search Using English, Romanji, Katakana or Kanji</h6>
                <div class="container indigo lighten-2" id="searchDiv">
                    <label for="searchBar"></label>
                    <input type="text" id="searchBar" class="white-text" placeholder="Search">
                    <a class="btn waves-effect waves-light" style="display: block;" id="searchButton">Search</a>
                </div>
                <div style="margin-top: 10px;">

                </div>
            </div>
            <div id='featureSection' class='col s12 teal lighten-1 z-depth-2'>
                <h5 class='center-align white-text'>ALL YOUR LEARNING NEEDS IN ONE PLACE</h5>
                <div class='black-text'>
                    <a href='./register.php' class='blue-text text-darken-3' style='font-weight: bolder;'>Create</a> an Account or <a href='./login.php' class='blue-text text-darken-3' style='font-weight: bolder;'>Login</a> to Unlock New Features Such as:
                </div>
                <div>
                    <ul id="features">
                        <li>Creating Your Own Flashcard Decks</li>
                        <li>Creating Review Lists</li>
                        <li>Translate Words and Phrases from Japanese to English and Vice-Versa</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container center-align white-text">
            Photo by <a href="https://unsplash.com/photos/SBK40fdKbAg?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink" class="indigo-text">Tianshu Liu</a> on <a href="https://unsplash.com/" class="indigo-text">Unsplash</a>
        </div>
    </div>
    <script src="./scripts/index.js"></script>
</body>

</html>