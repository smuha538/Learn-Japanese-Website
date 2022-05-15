<?php

function selectDeck()
{
    $result = '<div class="input-field col s3" style="margin-top: 3rem;">';
    $result .= getSelections();
    $result .= '</div>';
    return $result;
}

function getSelections()
{
    $result = '<select class="browser-default" id="deckSelect">';

    $deck_names = getDecks();
    if (!empty($deck_names)) {
        $result .= '<option value="" disabled selected>Select your Deck</option>';
        foreach ($deck_names as $name) {
            $result .= "<option value='$name'>$name</option>";
        }
    } else {
        $result .= '<option value="" disabled selected>No Decks Created</option>';
    }
    $result .= '</select>';
    return $result;
}

function getDecks()
{
    $decks = $_SESSION["decks"];
    $deck_names = [];
    if (!empty($decks)) {
        foreach ($decks as $deck) {
            $deck_names[] = $deck["name"];
        }
    }
    return $deck_names;
}
