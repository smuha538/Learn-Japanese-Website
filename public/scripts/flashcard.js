document.addEventListener('DOMContentLoaded', function() {

    let elems = document.querySelectorAll('.modal');
    let instances = M.Modal.init(elems);
    let singleModalElem = document.querySelector('#modal1');
    let instance = M.Modal.getInstance(singleModalElem);
    const modalbtn = document.querySelector('#addButton');
    let decksExists = document.querySelector('.selector') !== null;

    modalbtn.addEventListener('click', () => {
      instance.open();
    });

    loadDeck();

    document.querySelector("#createButton").addEventListener("click", () => {
      createDeck();
    });

    function loadDeck()
    {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'loaddeck.php?', true);
      xhr.onload = function(){
        listDeck(JSON.parse(this.responseText));
      }
      xhr.send();
    }

    function createDeck()
    {
      let deck = document.querySelector("#deckName").value;
      let xhr = new XMLHttpRequest();

      xhr.open('GET', 'adddeck.php?deck='+deck, true, "json");

      xhr.onload = function(){
        listDeck(JSON.parse(this.responseText));
      }

      xhr.send();
    }

    function listDeck(deck)
    {
      if(deck.lenght != 0)
      {
        deck.forEach(test => console.log(test));
      }
    }
  });