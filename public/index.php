<?php include "../partials/header.php"; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://fonts.googleapis.com/css?family=Bungee Inline' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:400,500,600,700" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" crossorigin="anonymous" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" crossorigin="anonymous"></script>
    <script src="./scripts/sidenav.js"></script>
    <link rel="stylesheet" href="./css/header.css" />
    <link rel="stylesheet" href="./css/index.css" />
    <title>Home</title>
</head>

<body>
    <?= createHeader2(isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1, './images/headericon.png', 'indigo') ?>

    <div class="container">
        <div class="row">
            <div id="searchSection" class="col s12 blue darken-1">
                <h6 class="white-text" style="font-weight: bold;">Search Using English, Romanji, Katakana or Kanji</h6>
                <div class="container indigo lighten-2" id="searchDiv">
                    <label for="search"></label>
                    <input type="text" id="search" class="white-text">
                </div>
                <div class="white-text" style="margin-top: 5px; font-weight: bold; margin-left:22px; font-size:x-small">
                    You can Search For Words or Phrases
                </div>
            </div>
            <div id='featureSection' class='col s12 teal lighten-1'>
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
        <div class="container center-align">
            Photo by <a href="https://unsplash.com/photos/SBK40fdKbAg?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink">Tianshu Liu</a> on <a href="https://unsplash.com/">Unsplash</a>
        </div>
    </div>
</body>

</html>