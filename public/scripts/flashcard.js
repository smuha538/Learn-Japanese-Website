document.addEventListener('DOMContentLoaded', function() {

    let elems = document.querySelectorAll('.modal');
    let instances = M.Modal.init(elems);
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
    let card = document.getElementById('card');
    let tooltips = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltips, options);
    let deckArray = [];
    let currentDeck;

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

    loadDeck();

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
        practiseInstance.open();
      }
    });

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
      let review = reviewDate(card);
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

      let review = createSpan(practice, "col l2 s3");
      return review;
      
    }

    function recalibrateDate(card)
    {
      
    }

    function cardLearned(card)
    {
      let learned;
      card["learned"] == true ? learned = "unlearn" : learned = "learn"
      let learnedSection = createHref(null, learned, "col l1 s2 btn-small cardStatus");
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
      if(deck["cards"].length == 0)
      {
        reviewClasses += " disabled";
        reviewText = "Empty Deck";
      }
      return createHref(null, reviewText, reviewClasses);
    }
  });