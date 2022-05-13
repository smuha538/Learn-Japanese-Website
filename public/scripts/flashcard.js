document.addEventListener('DOMContentLoaded', function() {

    let elems = document.querySelectorAll('.modal');
    let instances = M.Modal.init(elems);
    let deckBar = document.querySelector("#deckName");
    let createDeck = document.querySelector('#modal1');
    let deckInstance = M.Modal.getInstance(createDeck);
    const addDeckButton = document.querySelector('#addButton');
    let deckSection = document.querySelector('#decks');
    let deckHelper = document.querySelector('#deckHelper')

    addDeckButton.addEventListener('click', () => {
      deckBar.value = "";
      deckInstance.open();
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
    });

    function deleteDeck(name)
    {
      let dataset = `[data-name="${name}Section"]`;
      let deckSection = document.querySelector(dataset);
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'deletedeck.php?deck='+name, true);
      xhr.send();
      deckSection.remove();
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
      main.dataset.name = deck["name"] +"Section";
      let title = createSpan(deck["name"], "col s2 deckTitle");
      let review = createReviewSection(deck);
      let viewCard = createHref(null, "View", "col s2 offset-s1 btn btn-small purple waves-effect waves-light");
      let deleteDiv = createDiv("col s2 offset-s1");
      let deleteRef = createHref(null, null, "btn-floating btn-small waves-effect waves-light red delete");
      let deleteIcon = createIcon("delete", "material-icons remove");
      deleteIcon.dataset.name = deck["name"];
      appendToElement(deleteIcon, deleteRef);
      appendToElement(deleteRef, deleteDiv);
      appendToElement(title, main);
      appendToElement(review, main);
      appendToElement(viewCard, main);
      appendToElement(deleteDiv, main);

      return main;
    
    }

    function createReviewSection(deck)
    {
      let reviewClasses = "col s2 offset-s1 btn btn-small purple waves-effect waves-light";
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