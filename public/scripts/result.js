
    let keyword = sessionStorage.getItem("keyword");    ;
    let page = sessionStorage.getItem("page");
    let resultSection = document.querySelector("#resultSection");
    let showMoreButton = document.querySelector("#showMoreButton");
    let deckSelect = document.querySelector("#deckSelect");
    
    if(keyword != "")
    {
        loadingAnimation();
        searchKeyword(keyword, page);
    }
    else
    {
        noResult();
    }

    function loadingAnimation()
    {
        let loadingGif = document.createElement("img");
        loadingGif.src = "./images/loadingGif.gif"
        appendToElement(loadingGif, resultSection);
    }

    function noResult()
    {
        let error = document.createElement("h1");
        error.textContent = "No Results Found";
        error.setAttribute("class", "errorMessage center-align");
        clearChild(resultSection);
        appendToElement(error, resultSection);
    }

    function searchKeyword(keyword, page)
    {
        let endpoint = `https://cors-for-apis.herokuapp.com/https://jisho.org/api/v1/search/words?keyword=${keyword}&page=${page}`;
        fetch(endpoint)
        .then((response) => response.json())
        .then((result) =>{
        validateData(result.data, page)});
    }

    function noMorePages()
    {
        showMoreButton.classList.add("disabled");
    }

    function validateData(data, page)
    {
        clearChild(resultSection);
        if(data.length == 0 && page == 1)
        {
            noResult();
        }
        else if(data.length == 0 && page != 1)
        {
            noMorePages();
        }
        else
        {
            sessionStorage.setItem("page", page);
            displayResults(data);
        }
    }

    function displayResults(data)
    {
        clearChild(resultSection);
        if(sessionStorage.getItem("cardWord"))
        {
            sessionStorage.removeItem("cardWord");
        }
        data.forEach((word) => {
            let result = createResultSection(word);
            appendToElement(result, resultSection);
        });
    }

    function createResultSection(keyword)
    {
        addToStorage(keyword);
        let resultDiv = createDiv("col s12 result");
        let row = createDiv("row");
        appendToElement(row, resultDiv);
        let wordSection = createWordSection(keyword)
        appendToElement(wordSection, row);
        let definitionSection = createDefinitionSection(keyword);
        appendToElement(definitionSection, row);
        return resultDiv;
    }

    function addToStorage(keyword)
    {
        let english = "";
        let cardArray;
        keyword.senses.forEach((englishWord) => {
            english += englishWord.english_definitions.join("; ") + ", ";
        })
        english = english.slice(0, -2);
        let cardWord = {
            "name": keyword.senses[0].english_definitions.join("; "),
            "japanese": {
                "kanji": keyword.japanese[0].word,
                "furigana": keyword.japanese[0].reading
            },
            "english": english
        };

        sessionStorage.getItem("cardWord") != null ? cardArray = JSON.parse(sessionStorage.getItem("cardWord")) : cardArray = [];
        cardArray.push(cardWord);
        
        sessionStorage.setItem("cardWord", JSON.stringify(cardArray));
    
    }

    function createDefinitionSection(definitions)
    {
        let definitionSection = createDiv("col s12 l7 definitionSection");
        let row = createDiv("row defRow");
        let counter = 1;
        
        definitions.senses.forEach((definition) => {
            let entry = createDefinitionEntry(definition, counter);
            appendToElement(entry, row); 
            counter++;
        });

        if(definitions.japanese.length > 1)
        {
            let other =  "Other Forms: ";
            for(let i = 1; i < definitions.japanese.length; i++)
            {
                other += definitions.japanese[i].word + " [" + definitions.japanese[i].reading + "], ";
            }
            other = other.slice(0, -2)
            let otherForm = createSpan(other, "grey-text otherForm");
            appendToElement(otherForm, row);
        }
         
        let divider = createDivider("col s12 divider");
        appendToElement(row, definitionSection);
        appendToElement(divider, definitionSection);

        return definitionSection;
    }


    function createDefinitionEntry(definition, counter)
    {
        let definitionEntry = createDiv("col s12 definition");
        let partOfSpeech = createSpan(definition.parts_of_speech.join(", "), "grey-text text-darken-1 speech");
        appendToElement(partOfSpeech, definitionEntry);
        let englishDefinition = createDiv();
        appendToElement(englishDefinition, definitionEntry);
        let counterSpan = createSpan(`${counter}. `, "grey-text");
        let englishSection = createSpan(definition.english_definitions.join("; "));
        appendToElement(counterSpan, englishDefinition);
        appendToElement(englishSection, englishDefinition);

        for (let property in definition)
        {
            
            if(property != "english_definitions"  && property != "parts_of_speech")
            {
             
                let fieldSection = "";
                if(property  == "see_also" && definition[property] != "")
                {
                    fieldSection =  createSpan(`See Also: ${definition[property]}`, "grey-text text-lighten-1 definitionTags seeAlso");
                }
                else if(property == "links" && definition[property] != "")
                {
                    let link = "";
                    let counter = 0;
                    definition[property].forEach((data) => {
                        if(data.text)
                        {
                            counter > 0 ? link += ", " : link += "";
                            link += data.text
                            if(data.url)
                            {
                                link += ", " + data.url;
                                counter++;
                            }
                        }
                    });                    
                     
                    fieldSection =  createDiv("grey-text text-lighten-1 definitionTags", link);
                    
                }
                else if(definition[property] != "")
                {
                    fieldSection =  createSpan(definition[property] + ", ", "grey-text text-lighten-1 definitionTags");
                }

                if(fieldSection != "")
                {
                    appendToElement(fieldSection, englishSection);
                }
                    
            }
        }

        return definitionEntry;
    }

    function createWordSection(keyword)
    {
        let wordSection = createDiv("col s12 l3");
        let word = createDiv("word");
        let furigana = createSpan(keyword.japanese[0].reading, "furigana");
        let kanji = createSpan(keyword.japanese[0].word, "kanji");
        appendToElement(furigana, word);
        appendToElement(kanji, word);
        appendToElement(word, wordSection);
        let tagSection = createTagSection(keyword);
        appendToElement(tagSection, wordSection);
        return wordSection;
    }

    function createTagSection(keyword)
    {
        let tagSection = createDiv("row");
        let tag = createDiv("tags col s6 l12");
        
        if(keyword.is_common)
        {
            let common = createSpan("Common", "green white-text");
            appendToElement(common, tag);
        }

        keyword.jlpt.forEach((jlpt) => {
            let jlptSection = createSpan(jlpt, "grey white-text", true);
            appendToElement(jlptSection, tag);
        });

        keyword.tags.forEach((wanikani) => {
            let wanikaniSection = createSpan(wanikani, "grey white-text", true);
            appendToElement(wanikaniSection, tag);
        });

        appendToElement(tag, tagSection);

        if(document.querySelector("#logged") != null)
        {
            insert = insertOption(keyword);
            appendToElement(insert, tagSection);
        }
        return tagSection;
    }

    function insertOption(keyword)
    {
        let insertToDeck = createDiv("addToCard grey z-depth-2 col s2 l6");
        let href = createHref(null, null, "btn-floating btn-small waves-effect waves-light green disabled addButton");  
        let message = createSpan("Select a Deck", "addMessage white-text");
        let icon = createIcon("add", "material-icons addIcon");
        icon.dataset.name = keyword.senses[0].english_definitions.join("; ");
        appendToElement(message, insertToDeck);
        appendToElement(icon, href);
        appendToElement(href, insertToDeck);
        if(isSelected(deckSelect))
        {
            insertToDeck.classList.add("blue");
            insertToDeck.classList.remove("grey");
            href.classList.remove("disabled");
            message.textContent = "Add to Deck";
        }
        return insertToDeck;
    }


    function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    function showMore()
    {
        let oldPage = sessionStorage.getItem("page");
        let newPage = parseInt(oldPage)+ 1;
        searchKeyword(keyword, newPage);
        window.scrollTo(0, 0);
    }

    showMoreButton.addEventListener("click", () => {
        showMore();
    });

    function deckInsertion(deckName)
    {
        let addButtons = document.querySelectorAll(".addButton");
        let addMessages = document.querySelectorAll(".addMessage");
        let addDiv = document.querySelectorAll(".addToCard");
        if(isSelected(deckName))
        {
            enableDeckInsertion(addButtons, addMessages, addDiv)
        }
    }

    function enableDeckInsertion(buttons, messages, divs)
    {
        buttons.forEach((button) => {
            button.classList.remove("disabled");
        });

        messages.forEach((message) => {
            message.textContent = "Add to Deck";
        });

        divs.forEach((div) => {
            div.classList.add("blue");
            div.classList.remove("grey");
        });
    }

    function isSelected(deckName)
    {
        return deckName.value ? true : false;
    }

    function addToDeck(cardName)
    {
        let cardArray = JSON.parse(sessionStorage.getItem("cardWord"));
        let selectedCard;
        cardArray.forEach((card) => {
            if(card["name"] == cardName)
            {
                selectedCard = card;
            }
        });
        addToAccount(selectedCard, deckSelect.value);
    }

    function addToAccount(card, deck)
    {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'addcard.php?card='+ JSON.stringify(card)+"&deck="+deck, true);
        xhr.send();
    }

    function updateInsertButton()
    {

    }

    deckSelect.addEventListener("click", (e) =>
    {
        deckInsertion(e.target);
    });

    document.addEventListener("click", (e) => {

        if(e.target && e.target.classList == "material-icons addIcon")
        {
            addToDeck(e.target.dataset.name)
        }
    })