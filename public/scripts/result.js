document.addEventListener("DOMContentLoaded", () => {
    let keyword = sessionStorage.getItem("keyword");    ;
    let page = sessionStorage.getItem("page");
    let resultSection = document.querySelector("#resultSection");
    let showMoreButton = document.querySelector("#showMoreButton");
    
    if(keyword != "")
    {
        searchKeyword(keyword, page);
    }
    else
    {
        noResult();
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
        data.forEach((word) => {
            let result = createResultSection(word);
            appendToElement(result, resultSection);
        });
    }

    function clearChild(section)
    {
        section.replaceChildren();
    }

    function createResultSection(keyword)
    {
        let resultDiv = createDiv("col s12 result");
        let row = createDiv("row");
        appendToElement(row, resultDiv);
        let wordSection = createWordSection(keyword)
        appendToElement(wordSection, row);
        let definitionSection = createDefinitionSection(keyword);
        appendToElement(definitionSection, row);
        return resultDiv;
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

    function createDivider(classes)
    {
        let divider = document.createElement("hr");
        divider.setAttribute("class", classes);
        return divider;
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

        if(isLoggedIn())
        {
            insert = insertOption();
            appendToElement(insert, tagSection);
        }
        return tagSection;
    }

    function insertOption()
    {
        let insertToDeck = createDiv("addTocard blue z-depth-2 col s2 l6");
        let href = createHref();  
        let message = createSpan("Add to Deck", "addMessage white-text");
        let icon = createIcon("add_circle", "material-icons addButton white-text");
        appendToElement(message, href);
        appendToElement(icon, href);
        appendToElement(href, insertToDeck);
        return insertToDeck;
    }

    function createIcon(icon, classes)
    {
        let iconSection = document.createElement("i");
        iconSection.textContent = icon;
        iconSection.setAttribute("class", classes);
        return iconSection;
    }

    function createHref(reference = null)
    {
        let ref = document.createElement("a");
        if(reference)
        {
            ref.href = reference;
        }
        return ref;
    }

    function isLoggedIn()
    {
        return false
    }

    function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    function createDiv(classes = null, data = null)
    {
        let div = document.createElement("div");
        if(classes)
        {
            div.setAttribute("class", classes);
        }
        if(data)
        {
            div.textContent = data;
        }
        return div;
    }

    function createSpan(entry, classes, tags = false)
    {
        let span = document.createElement("span");
        tags ? span.textContent = capitaliseFirstLetter(entry) : span.textContent = entry;
        if(classes)
        {
          span.setAttribute("class", classes);  
        }
        
        return span;
    }

    function appendToElement(appender, appendTo)
    {
        appendTo.appendChild(appender);
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

});

