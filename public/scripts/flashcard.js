document.addEventListener('DOMContentLoaded', function() {

    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
    let deckBar = document.querySelector("#deckName");
    let createDeck = document.querySelector('#deckModal');
    let deckInstance = M.Modal.getInstance(createDeck);
    let viewDeck = document.querySelector('#viewModal');
    let viewInstance = M.Modal.getInstance(viewDeck);
    let practiseModal = document.querySelector('#practiseModal');
    let practiseInstance = M.Modal.getInstance(practiseModal);
    let addDeckButton = document.querySelector('#addButton');
    let deckSection = document.querySelector('#decks');
    let deckHelper = document.querySelector('#deckHelper');
    let cardSection = document.querySelector('#cardSection');
    let card = document.querySelector('#card');
    let tooltips = document.querySelectorAll('.tooltipped');
    let furiganaSection = document.querySelector("#furigana");
    let kanjiSection = document.querySelector("#kanji");
    let englishSection = document.querySelector("#english");
    let remainingCardsSection = document.querySelector("#remainingCards");
    M.Tooltip.init(tooltips, options);
    let nextButton = document.querySelector("#nextButton");
    let previousButton = document.querySelector("#previousButton");
    let upButton = document.querySelector("#upButton");
    let downButton = document.querySelector("#downButton");
    let complete = document.querySelector("#complete");
    let deckArray = [];
    let currentDeck;
    let cardsToReview = [];
    let remainingCards = 0;
    let currentCard = 0;
    loadDeck();

    document.querySelector("#flip").addEventListener('click', function() {
    card.classList.toggle('flipped');}, false);

    addDeckButton.addEventListener('click', () => {
      deckBar.value = "";
      deckInstance.open();
    });

    document.querySelector("#closeView").addEventListener("click", () => {
      deckArray = [];
      clearChild(deckSection);
      loadDeck();
    });

    document.querySelector("#closeReview").addEventListener("click", () => {
      cardsToReview = [];
      remainingCards = 0;
      currentCard = 0;
      clearChild(deckSection);
      loadDeck();
    });

    nextButton.addEventListener("click", () => {
      displayNextCard();
    });

    previousButton.addEventListener('click', () => {
      displayPreviousCard();
    });

    upButton.addEventListener("click", () => {
      displayNextCard("levelUp");
    });

    downButton.addEventListener('click', () => {
      displayNextCard("levelDown");
    });

    document.querySelector("#deckCreateButton").addEventListener("click", () => {
      addDeck();
    });

    document.querySelector("#deckCancelButton").addEventListener("click", () => {
      removeDeckError();
    });

    document.addEventListener("click", (e) => {

      if(e.target && e.target.classList == "material-icons remove")
      {  
        deleteDeck(e.target.dataset.name);
      }
      else if(e.target && e.target.classList == "col s2 offset-s1 btn btn-small purple waves-effect waves-light view")
      {
        viewCards(e.target.dataset.name);
      }
      else if(e.target && e.target.classList == "material-icons removeCard")
      {
        removeCard(e.target.dataset.name);
      }
      else if(e.target && e.target.classList == "col s2 offset-s1 btn btn-small purple waves-effect waves-light reviewButton")
      {
        populateReview(e.target.dataset.name);
      }
    });

    function displayNextCard(type = null)
    {
      let nextCard = currentCard + 1;

      if(previousButton.classList.contains("disabled"))
      {
        previousButton.classList.toggle("disabled");
      }
      if(cardsToReview[nextCard])
      {
        remainingCards--;
        displayFlashcard(cardsToReview[nextCard], remainingCards);
        // updateReviewCard(cardsToReview[currentCard]);
      }
      else
      {
        reviewComplete();
      }
      currentCard++;
    }

    function displayPreviousCard()
    {
      let previousCard = currentCard - 1;
      
      if(cardsToReview[previousCard])
      {
        remainingCards++;
        displayFlashcard(cardsToReview[previousCard], remainingCards);
        // updateReviewCard(cardsToReview[currentCard]); 
        currentCard--; 
      }
      if(!cardsToReview[previousCard - 1])
      {
        previousButton.classList.toggle("disabled");
      }
      if(cardsToReview[currentCard] && nextButton.classList.contains("disabled"))
      {
        nextButton.classList.toggle("disabled");
        upButton.classList.toggle("disabled");
        downButton.classList.toggle("disabled");
        complete.classList.toggle("hide");
      }
      if(currentDeck["complete"])
      {
        // updateDeck(currentDeck, "uncomplete");
      }
    }

    function reviewComplete()
    {
      complete.classList.toggle("hide");
      englishSection.textContent = "";
      kanjiSection.textContent = "";
      furiganaSection.textContent = "";
      remainingCardsSection.textContent = 0;
      nextButton.classList.toggle("disabled");
      upButton.classList.toggle("disabled");
      downButton.classList.toggle("disabled");
      remainingCards = 0;
      // updateDeck(currentDeck, "complete");
    }

    function populateReview(deckName)
    {
      currentDeck = deckName;
      practiseInstance.open();
      let deck = deckArray.find((array) => array["name"] == deckName);
      let cards = deck["cards"];
      cardsToReview = getReviewCards(cards);
      remainingCards = cardsToReview.length;
      previousButton.classList.toggle("disabled");
      displayFlashcard(cardsToReview[0], remainingCards);
    }

    function displayFlashcard(card, cardNum)
    {
      furiganaSection.textContent = card["japanese"]["furigana"];
      card["japanese"]["kanji"] == "undefined" ? kanjiSection.textContent = "" : kanjiSection.textContent = card["japanese"]["kanji"];
      englishSection.textContent = card["english"];
      remainingCardsSection.textContent = cardNum;
    }

    function getReviewCards(cards)
    {
      let reviewCards = cards.filter((card) => {
        if(reviewDate(card) == "Today" && card["learned"] == true && card["reviewed"] == false)
        {
          return card;
        }
      });

      return reviewCards;
    }

    function removeCard(card)
    {
      let dataset = `[data-name='${card}Section']`;
      let cardSection = document.querySelector(dataset);
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'removecard.php?deck='+currentDeck+'&card='+card, true);
      xhr.send();
      cardSection.remove();
    }

    function viewCards(deckName)
    {
      viewInstance.open();
      let deck = deckArray.find((array) => array["name"] == deckName);
      
      let cards = deck["cards"];
      clearChild(cardSection);
      if(cards.length != 0)
      {
        currentDeck = deckName;
        cards.forEach((card) => {
        let entry = createCard(card);
        appendToElement(entry, cardSection);
        }); 
      }
      else
      {
        let errorDiv = createDiv("col s12 center-align noCards", "No Cards");
        appendToElement(errorDiv, cardSection);
      }
    }

    function createCard(card)
    {
      let main = createDiv("col s12");
      main.dataset.name = card["english"]+"Section";
      let row = createDiv("row");
      let japanese;
      card["japanese"]["kanji"] == "undefined" ? japanese = card["japanese"]["furigana"] : japanese = card["japanese"]["kanji"];
      let japaneseWords = createSpan(japanese, "col l4 s3 truncate");
      let englishWords = createSpan(card["english"], "col l4 s2 truncate");
      let learned = cardLearned(card);
      let review = createSpan(reviewDate(card), "col l2 s3");
      let deleteIcon = removeCardIcon(card);
      appendToElement(japaneseWords, row);
      appendToElement(englishWords, row);
      appendToElement(learned, row);
      appendToElement(review, row);
      appendToElement(deleteIcon, row);
      appendToElement(row, main);
      return main;
    }

    function removeCardIcon(card)
    {
      let iconSection = createDiv("col l1 s1");
      let ref = createHref(null, null, "btn-floating btn-small waves-effect waves-light red removeCard");
      let icon = createIcon("remove", "material-icons removeCard");
      icon.dataset.name = card["english"];
      appendToElement(icon, ref);
      appendToElement(ref, iconSection);
      return iconSection;
    }

    function reviewDate(card)
    {
      let today = new Date();
      let cardDate = new Date(card["review_date"]);
      let diffTime = cardDate - today;
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      let practice;
      if(diffDays < 0)
      {
        practice = recalibrateDate(card);
      }
      else if(diffDays == 0)
      {
        practice = "Today";
      }
      else if(diffDays == 1)
      {
        practice = "Tommorow";
      }
      else if(card["learned"] == false)
      {
        practice = "Not Learned";
      }
      else
      {
        practice = diffDays + " days";
      }

      return practice;
      
    }

    function recalibrateDate(card)
    {
      
    }

    function cardLearned(card)
    {
      let learned;
      let classes;
      if(card["learned"])
      {
        learned = "unlearn";
        classes = "col l1 s2 btn-small cardStatus red";
      }
      else
      {
        learned = "learn";
        classes = "col l1 s2 btn-small cardStatus";
      }
        
      let learnedSection = createHref(null, learned, classes);
      return learnedSection;
    }

    function deleteDeck(name)
    {
      let dataset = `[data-name='${name}Section']`;
      let deckArea = document.querySelector(dataset);
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'deletedeck.php?deck='+name, true);
      xhr.send();
      deckArea.remove();
    }

    function removeDeckError()
    {
      deckHelper.textContent = "";
    }

    function loadDeck()
    {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'loaddeck.php?', true);
      xhr.onload = function(){
        listDeck(JSON.parse(this.responseText));
      }
      xhr.send();
    }

    function addDeck()
    {
      let deck = deckBar.value;
      let xhr = new XMLHttpRequest();
      if(deck.trim() == "")
      {
        deckHelper.textContent = "Enter a Deck Name";
      }
      else
      {
        xhr.open('GET', 'adddeck.php?deck='+deck, true);
        xhr.onload = function(){
          if(JSON.parse(this.responseText).length != 0)
          {
            listDeck(JSON.parse(this.responseText));
            removeDeckError();
            deckInstance.close();
          }
          else
          {
            invalidName();
          }
        }
        xhr.send();
      }
    }

    function listDeck(decks)
    {
      if(decks.length != 0)
      {
        decks.forEach(deck => {
          deckArray.push(deck);
          let entry = createEntry(deck);
          appendToElement(entry, deckSection);
        });
      }
    }

    function invalidName()
    {
      deckHelper.textContent = "Deck Already Exists, Enter a Different Deck Name";
    }

    function createEntry(deck)
    {
      let main = createDiv("col s12 shift");
      let row = createDiv("row");
      main.dataset.name = deck["name"] +"Section";
      let title = createSpan(deck["name"], "col s2 deckTitle");
      let review = createReviewSection(deck);
      review.dataset.name = deck["name"];
      let viewCard = createHref(null, "View", "col s2 offset-s1 btn btn-small purple waves-effect waves-light view");
      viewCard.dataset.name = deck["name"];
      let deleteDiv = createDiv("col s2 offset-s1");
      let deleteRef = createHref(null, null, "btn-floating btn-small waves-effect waves-light red delete");
      let deleteIcon = createIcon("delete", "material-icons remove");
      deleteIcon.dataset.name = deck["name"];
      appendToElement(deleteIcon, deleteRef);
      appendToElement(deleteRef, deleteDiv);
      appendToElement(title, row);
      appendToElement(review, row);
      appendToElement(viewCard, row);
      appendToElement(deleteDiv, row);
      appendToElement(row, main);

      return main;
    
    }

    function createReviewSection(deck)
    {
      let reviewClasses = "col s2 offset-s1 btn btn-small purple waves-effect waves-light reviewButton";
      let reviewText = "Lets Review";
      if(deck["complete"])
      {
        reviewClasses += " disabled";
        reviewText = "Done for the Day";
      }
      else if(deck["cards"].length == 0)
      {
        reviewClasses += " disabled";
        reviewText = "Empty Deck";
      }
      else if(!learnedCards(deck["cards"]))
      {
        reviewClasses += " disabled";
        reviewText = "No Learned Cards";
      }
      return createHref(null, reviewText, reviewClasses);
    }
  });

  function learnedCards(cards)
  {
    let learned = false;

    cards.forEach((card) => {
      if(card["learned"] == true)
      {
        learned = true;
      }
    });

    return learned;
  }