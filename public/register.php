<?php
require "../partials/header.php";

function displayError()
{
    if (isset($_GET["error"])) {
        if ($_GET["error"] == "exists") {
            echo "<span class='col s12 red-text error'>Email already exists</span>";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?= require "../partials/headtags.php" ?>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/register.css">
    <title>Register</title>
</head>

<body>
    <?= createHeader2(isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == 1, './images/headericon.png', 'indigo') ?>
    <div class="container white z-depth-2">
        <div class="row">
            <div class="col s12">
                <h4 class="center-align">Create Account</h4>
            </div>

            <form class="col s12" method="post" action="./registerhandler.php">
                <div class="row">
                    <div class="input-field col s6">
                        <input id="first_name" type="text" class="validate" name="first_name" value="<?= $_SESSION["tempFirstName"] ?? "" ?>">
                        <label for="first_name">First Name</label>
                        <i class="material-icons prefix validateIcon" id="firstNameIcon"></i>
                        <span class="helper-text shift" id="firstNameHelper"></span>
                    </div>
                    <div class="input-field col s6">
                        <input id="last_name" type="text" class="validate" name="last_name" value="<?= $_SESSION["tempLastName"] ?? "" ?>">
                        <label for="last_name">Last Name</label>
                        <i class="material-icons prefix validateIcon" id="lastNameIcon"></i>
                        <span class="helper-text shift" id="lastNameHelper"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 customFields" id="moveEmail">
                        <i class="material-icons prefix">email</i>
                        <input id="email" type="email" class="validate" name="email" value="<?= $_SESSION["tempEmail"] ?? "" ?>">
                        <label for="email">Email</label>
                        <i class="material-icons prefix validateIcon" id="emailIcon"></i>
                        <span class="helper-text" id="emailHelper"></span>
                        <?= displayError() ?>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s11 customFields" id="movePassword">
                        <i class="material-icons prefix">lock</i>
                        <input id="password" type="password" class="validate" name="password" value="<?= $_SESSION["tempPassword"] ?? "" ?>">
                        <label for="password">Password</label>
                        <i class="material-icons prefix visibleIcon" id="passwordVisibility">visibility</i>
                        <i class="material-icons prefix validateIcon" id="passwordIcon"></i>
                        <span class="helper-text" id="passwordHelper"></span>
                    </div>
                    <div class="input-field col s11 confirmPass" id="moveConfirm">
                        <i class="material-icons prefix">lock</i>
                        <input id="confirmPassword" type="password" class="validate" name="confirmPassword" value="<?= $_SESSION["tempConfirmPassword"] ?? "" ?>">
                        <label for="confirmPassword">Confirm Password</label>
                        <i class="material-icons prefix visibleIcon" id="confirmPasswordVisibility">visibility</i>
                        <i class="material-icons prefix validateIcon" id="confirmPasswordIcon"></i>
                        <span class="helper-text" id="confirmPasswordHelper"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <button class="btn waves-effect waves-light disabled indigo" type="submit" name="register" id="signUp">Submit
                            <i class="material-icons right"></i>
                        </button>
                    </div>
                </div>
                <div class="row center-align">
                    <div class="col s12">
                        <span>Already Have an Account? <a href="./login.php">Sign In</a></span>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <script src="./scripts/register.js"></script>
</body>

</html>