

fetch("https://cors-for-apis.herokuapp.com/https://jisho.org/api/v1/search/words?keyword=jlpt-n5")
.then((response) => response.json())
.then((result) =>{
console.log(result.data)});