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
            <div id='featureSection' class='col s12 l5 teal lighten-1'>
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
            <div id="searchSection" class="col s12 l6 blue">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vitae voluptatibus, corrupti laboriosam praesentium rem iusto quis unde commodi alias eligendi, sapiente provident facere odio sequi laudantium expedita velit tempore.
            </div>
        </div>
    </div>
</body>

</html>