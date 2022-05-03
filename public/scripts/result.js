// document.addEventListener("DOMContentLoaded", () => {
//     let keyword;
//     let page;
//     let resultSection = document.querySelector("#resultSection");
//     keyword = sessionStorage.getItem("keyword");
//     page = sessionStorage.getItem("page");
    
//     if(keyword != "")
//     {
//         searchKeyword(keyword, page);
//     }
//     else
//     {
//         noResult();
//     }

//     function searchKeyword(keyword, page)
//     {
//         let endpoint = `https://cors-for-apis.herokuapp.com/https://jisho.org/api/v1/search/words?keyword=${keyword}&page=${page}`;
//         fetch(endpoint)
//         .then((response) => response.json())
//         .then((result) =>{
//         validateData(result.data, page)});
//     }

//     function validateData(data, page)
//     {
//         if(!data && page == 1)
//         {
//             noResult();
//         }
//         else if(!data && page != 1)
//         {
//             noMorePages();
//         }
//         else
//         {
//             displayResults(data);
//         }
//     }

//     function displayResults(data)
//     {
//         clearChild(resultSection);
//         data.forEach((word) => {
//             let result = createResultSection(word);
//             appendToElement(result, resultSection);
//         });
//     }

//     function clearChild(section)
//     {
//         section.replaceChildren();
//     }

//     function createResultSection(keyword)
//     {
//         let resultDiv = createDiv(["col", "s12", "result"]);
//         let row = createDiv(["row"]);
//         appendToElement(row, resultDiv);
//         let wordSection = createWordSection(keyword)
//         appendToElement(wordSection, row);
//         let definitionSection = createDefinitionSection(keyword);
//         appendToElement(definitionSection, row);
//     }

//     function createDefinitionSection(definitions)
//     {
//         let definitionSection = createDiv(["col", "s12", "l7", "definitionSection"]);
//         let row = createDiv(["row"]);
        
//         definitions.senses.forEach((definition) => {
//             let entry = createDefinitionEntry(definition);
//             appendToElement(entry, row); 
//         });

//         appendToElement(row, definitionSection);

//         return definitionSection;
//     }

//     function createDefinitionEntry(definition)
//     {
//         let definitionEntry = createDiv(["col", "s12", "definition"]);
//         let partOfSpeech = createSpan(definition.parts_of_speech, ["grey-text", "text-darken-1", "speech"]);
//         appendToElement(partOfSpeech, definitionEntry);
//         let englishDefinition = createDiv();
//         definition.english_definitions.forEach((english) => {
//             let 
//         });

//         return definitionEntry;
//     }

//     function createWordSection(keyword)
//     {
//         let wordSection = createDiv(["col", "s12", "l3"]);
//         let word = createDiv(["word"]);
//         let furigana = createSpan(keyword.japanese.reading, ["furigana"]);
//         let kanji = createSpan(keyword.japanese.word, ["kanji"]);
//         appendToElement(furigana, word);
//         appendToElement(kanji, word);
//         appendToElement(word, wordSection);
//         let tagSection = createTagSection(keyword);
//         appendToElement(tagSection, wordSection);
//         return wordSection;
//     }

//     function createTagSection(keyword)
//     {
//         let tagSection = createDiv(["row"]);
//         let tag = createDiv(["tags", "col", "s6", "l12"]);
        
//         if(keyword.is_common)
//         {
//             let common = createSpan("Common", ["green", "white-text"]);
//             appendToElement(common, tag);
//         }

//         let jlpt = createSpan(keyword.jlpt[0], ["green", "white-text"], true);
//         let wanikani = createSpan(keyword.tags[0], ["green", "white-text"], true);
//         appendToElement(jlpt, tag);
//         appendToElement(wanikani, tag);
//         appendToElement(tag, tagSection);

//         if(isLoggedIn())
//         {
//             insert = insertOption();
//             appendToElement(insert, tagSection);
//         }
//         return tagSection;
//     }

//     function insertOption()
//     {
//         let insertToDeck = createDiv(["addTocard", "blue", "z-depth-2", "col", "s2", "l6"]);
//         let href = createHref();  
//         let message = createSpan("Add to Deck", ["addMessage", "white-text"]);
//         let icon = createIcon("add_circle", ["material-icons", "addButton", "white-text"]);
//         appendToElement(message, href);
//         appendToElement(icon, href);
//         appendToElement(href, insertToDeck);
//         return insertToDeck;
//     }

//     function createIcon(icon, classes)
//     {
//         let iconSection = document.createElement("i");
//         icon.textContent = icon;
//         classes.forEach((classAtr) => icon.setAttribute("class", classAtr));
//         return iconSection;
//     }

//     function createHref(reference = null)
//     {
//         let ref = document.createElement("a");
//         if(reference)
//         {
//             ref.href = reference;
//         }
//         return ref;
//     }

//     function isLoggedIn()
//     {
//         return false
//     }

//     function capitaliseFirstLetter(string) {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//       }

//     function createDiv(classes = null)
//     {
//         let div = document.createElement("div");
//         if(classes)
//         {
//             classes.forEach((classAtr) => div.setAttribute("class", classAtr));
//         }
//         return div;
//     }

//     function createSpan(entry, classes, tags = false)
//     {
//         let span = document.createElement("span");
//         tags ? span.textContent = capitaliseFirstLetter(entry) : span.textContent = entry;
//         classes.forEach((classAtr) => span.setAttribute("class", classAtr));
//         return span;
//     }

//     function appendToElement(appender, appendTo)
//     {
//         appendTo.appendChild(appender);
//     }

// });

