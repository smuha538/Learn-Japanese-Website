document.querySelector("#searchButton").addEventListener("click", () => {
    searchEntry();
});

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter')
     {
      searchEntry();
     }
  });

function searchEntry()
{
    let searchBar = document.querySelector("#searchBar");
    let keyword = searchBar.value.trim();

    if(keyword)
    {
        storeKeyword(keyword);
    }
    else
    {
        searchBar.placeholder = "Please Enter a Keyword";
    }
}

function storeKeyword(keyword)
{
    sessionStorage.clear();
    sessionStorage.setItem("keyword", keyword);
    sessionStorage.setItem("page", 1);
    resultRedirection();
}

function resultRedirection()
{
    window.location.href = "./result.php";
}