

    function createIcon(icon, classes)
    {
        let iconSection = document.createElement("i");
        iconSection.textContent = icon;
        iconSection.setAttribute("class", classes);
        return iconSection;
    }

    function createHref(reference = null, entry = null, classes = null)
    {
        let ref = document.createElement("a");
        if(reference)
        {
            ref.href = reference;
        }
        if(classes)
        {
            ref.setAttribute("class", classes);
        }
        if(entry)
        {
            ref.textContent = entry;
        }
        return ref;
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

    function createDivider(classes)
    {
        let divider = document.createElement("hr");
        divider.setAttribute("class", classes);
        return divider;
    }

    function clearChild(section)
    {
        if (section.firstChild) {
         section.replaceChildren();   
        }    
    }
