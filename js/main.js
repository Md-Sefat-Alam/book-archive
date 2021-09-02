

const searchBtn = () => {
    const searchField = document.getElementById('searchField');
    const invalidSearchText = document.getElementById('invalidSearchText');
    const searchFieldResult = document.getElementById('searchField-Result');

    const searchFieldText = searchField.value;

    if (searchFieldText) {
        window.location.href = "result.html"  //page load first then data load

        //get search data from server
        fetch(`https://openlibrary.org/search.json?q=${searchFieldText}`)
            .then(res => res.json())
            .then(data => {
                searchResult(data);

            });
    } else {
        invalidSearchText.innerText = 'Enter Search Text'
    }
    searchField.addEventListener('keyup', () => {
        invalidSearchText.innerText = '';
    })
}

const searchResult = (data) => {

}