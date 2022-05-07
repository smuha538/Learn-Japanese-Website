<?php require "../partials/header.php"; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?= require "../partials/headtags.php" ?>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/login.css">
    <title>Document</title>
</head>

<body>
    <?= createHeader2(isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1, './images/headericon.png', 'indigo') ?>
    <div class="container">
        <div class="row z-depth-2" id="mainRow">
            <div class="col s12 l5 indigo" id="registerSection">
                <div class="center-align" id="iconSection">
                    <img src="./images/registericon.png" alt="origami icon">
                </div>
                <div class="container center-align" id="registerContainer">
                    <span id="registrationMessage" class="white-text"> <a href="./register.php" class="green-text">Register</a> Today to Unlock Exclusive Features</span>
                </div>
            </div>
            <div class="col s12 l7 white">
                <form action="./formHandler.php" method="post" name="login" onsubmit="return emptyForm()">
                    <div class="container">
                        <h4 class="center-align" style="font-weight:bold">Login</h4>
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">account_circle</i>
                                <input id="email" type="text" name="email">
                                <label for="email">Email</label>
                                <span class="helper-text red-text hide left-align" id="emailHelper">Enter your email</span>
                            </div>
                            <div class="input-field col s12">
                                <i class="material-icons prefix">vpn_key</i>
                                <input id="password" type="password" name="password">
                                <label for="password">Password</label>
                                <span class="helper-text red-text hide left-align" id="passwordHelper">Enter your password</span>
                            </div>
                            <div class="col s12 center-align" id="loginSection">
                                <button class="btn waves-effect waves-light indigo " id="loginButton" type="submit" name="action">Login</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="./scripts/login.js"></script>
</body>

</html>