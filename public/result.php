<?php require "../partials/header.php"; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?= require "../partials/headtags.php" ?>
    <link rel="stylesheet" href="./css/result.css" />
    <script src="./scripts/result.js"></script>
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
                    <!-- <div class="col s3">
                        Select Your Deck
                    </div> -->
                </div>
            </div>
            <div class="col s12">
                <div class="row" id="resultSection">


                    <!-- <div class="col s12 result">
                        <div class="row">
                            <div class="col s12 l3">
                                <div class="word">
                                    <span class="furigana">
                                        ぼく
                                    </span>
                                    <span class="kanji">
                                        僕
                                    </span>
                                </div>
                                <div class="row">
                                    <div class="tags col s12">
                                        <span class="green white-text">
                                            Common
                                        </span>
                                        <span class="grey white-text">
                                            JLPT N5
                                        </span>
                                        <span class="grey white-text">
                                         
                                            Wanikani
                                        </span>
                                    </div>
                                    <div class="addTocard blue z-depth-2 col s12">
                                        <a href="#">
                                            <span class="addMessage white-text">Add to Deck</span><i class="material-icons addButton white-text">add_circle</i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col s12 l7 definitionSection">
                        
                                <div class="row">
                                    <div class="col s12 definition">
                                        <span class="grey-text text-darken-1 speech">
                                           
                                            Pronoun
                                        </span>
                                        <div>
                                            <span class="grey-text">1.</span> <span>I; Me</span>
                                            <span class="grey-text text-lighten-1 definitionTags">
                                                 
                                                Male term or language
                                            </span>
                                        </div>
                                    </div>
                                  
                                    <div class="col s12 definition">
                                        <div class="grey-text text-darken-1">
                                          
                                            Pronoun
                                        </div>
                                        <div>
                                            <span class="grey-text">2.</span> <span>You</span>
                                            <span class="grey-text text-lighten-1 definitionTags">
                                               
                                                when addressing a young boy
                                            </span>
                                        </div>
                                    </div>
                                   
                                    <div class="col s12 definition">
                                        <div class="grey-text text-darken-1">
                                          
                                            Pronoun
                                        </div>
                                        <div>
                                            <span class="grey-text">3.</span> <span>manservant</span>
                                            <span class="grey-text text-lighten-1 definitionTags">
                                                
                                                <span>Also See</span> <a href="#">しもべ</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <hr class="col s12 divider">
                            </div>
                        </div>
                    </div> -->


                </div>
            </div>
            <a class="btn waves-effect waves-light indigo" id="showMoreButton">Show More Results</a>

        </div>
    </div>
</body>

</html>