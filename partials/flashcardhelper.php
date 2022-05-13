<?php

function addDeck()
{
    $result = "<div class='col s12' style='font-weight:bold; margin-top:5%; margin-bottom:5%; margin-left:5%; font-size:14pt'>";
    $result .= "Create New Deck";
    $result .= "<a id='addButton' class='btn-floating btn-small waves-effect waves-light blue' style='margin-left:0.5rem'><i class='material-icons'>add</i></a>";
    $result .= "</div>";
    return $result;
}
