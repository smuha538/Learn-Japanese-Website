<?php

session_start();

function createHeader2($loggedIn, $logoPath, $navColor = 'green darken-1')
{
  $completedNav = "";
  $completedNav .= "<nav class='$navColor' style='height: 60px'>";
  $completedNav .= "<div class='nav-wrapper'>";
  // <a target="_blank" href="https://icons8.com/icon/mB4MCyTaJDSs/architecture">Architecture</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
  $completedNav .= "<a href='../index.php' class='brand-logo' style='margin-top: .5rem; margin-bottom: .5rem'><img src='$logoPath' alt='Learn Japanese Logo' height=50 width=50></a>";
  $completedNav .= "<a href='#' data-target='mobile-demo' class='sidenav-trigger'><i class='material-icons'>menu</i></a>";
  $completedNav .= "<a class='hide-on-med-and-down'style='margin-left: 6rem; font-size: x-large; font-weight: bold; font-family: Bungee Inline'>Easy Japanese</a>";
  $completedNav .= "<ul class='right hide-on-med-and-down'>";
  $completedNav .= createAllItems($loggedIn);
  $completedNav .= "</ul>";
  $completedNav .= "</div>";
  $completedNav .= "</nav>";
  $completedNav .= "<ul class='sidenav' id='mobile-demo'>";
  $completedNav .= createAllItems($loggedIn);
  $completedNav .= "</ul>";

  return $completedNav;
}

function createAllItems($loggedIn)
{
  $completedItem = "";
  if ($loggedIn) {
    $completedItem .= createNavItem('../index.php', 'Home');
    $completedItem .= createNavItem('../aboutus/aboutus.php', 'About');
    $completedItem .= createNavItem('../translator/translator.php', 'Translator');
    $completedItem .= createNavItem('../flashcard/flashcard.php', 'Flashcard');
    $completedItem .= createNavItem('../logoutpage/logout.php', 'Log out', 'logout');
  } else {
    $completedItem .= createNavItem('../index.php', 'Home');
    $completedItem .= createNavItem('../aboutus/aboutus.php', 'About');
    $completedItem .= createNavItem('../translator/translator.php', 'Translator');
    $completedItem .= createNavItem('../loginpage/login.php', 'Login');
    $completedItem .= createNavItem('../registerpage/register.php', 'Register');
  }


  return $completedItem;
}
function createNavItem($address, $title, $class = "")
{
  return "<li><a href='$address' style='font-weight: bold; font-size: 18px' class='$class'>$title</a></li>";
}
