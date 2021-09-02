const searchFieldResult = document.getElementById('searchField-Result');
const resultStatus = document.getElementById('resultStatus');
const searchResultContainer = document.getElementById('searchResultContainer')
const clearText = document.getElementById('clearText');

//load server data function
const loadServerData = () => {
    loader('start')
    displayOrNot('searchResultContainer', 'none');
    displayOrNot('resultStatus', 'none');

    const invalidSearchTextResult = document.getElementById('invalidSearchTextResult');
    const searchFieldText = searchFieldResult.value;

    if (searchFieldText) {
        //get search data from server
        fetch(`https://openlibrary.org/search.json?q=${searchFieldText}`)
            .then(res => res.json())
            .then(data => {
                showData(data);
                console.log(data)

            })
    }
    else {
        //error handelling
        loader('stop');
        invalidSearchTextResult.innerText = 'Enter Search Text';
        return;
    }
}

//when write loader stop
searchFieldResult.addEventListener('keyup', () => {
    invalidSearchTextResult.innerText = '';
    // loader('stop');
})



const showData = serverData => {
    //some inportant manageing
    loader('stop');
    displayOrNot('searchResultContainer', 'grid')
    displayOrNot('resultStatus', 'flex');

    searchResultContainer.textContent = "";
    resultStatus.style.display = 'flex'     //showing search status
    const totalResultStatus = document.getElementById('totalResult');
    const totalShowingStatus = document.getElementById('totalShowing');

    totalResultStatus.innerText = serverData.num_found;
    totalShowingStatus.innerText = serverData.docs.length;

    // search data show with arror handling
    if (serverData.num_found !== 0) {
        setResultData(serverData);
    }
    else {
        searchResultContainer.innerHTML = `<p>No result found for <span style="color: red;">"${serverData.q}"</span></p>`
    }
}
const setResultData = (serverData) => {
    //showing search result
    serverData.docs.forEach(singleBook => {
        const div = document.createElement('div');
        div.classList.add('flex', 'gap-3', 'items-center', 'bg-gray-50', 'p-3', 'rounded');

        //image error handleing
        let image;
        if (singleBook.cover_i) {
            image = `<img src="https://covers.openlibrary.org/b/id/${singleBook.cover_i}-M.jpg" alt="">`
        } else {
            image = `<img src="https://openlibrary.org/images/icons/avatar_book-sm.png" alt="">`
        }

        div.innerHTML = `
        <!-- single post div -->
        <div class="w-1/4 flex justify-center">
            <!-- picture div -->
            ${image}
        </div>
        <div class="w-3/4 flex flex-col min-h-full border-l px-4 border-gray-200">
            <!-- text div -->
            <h1 class="text-xl font-bold text-gray-800 cursor-pointer">${singleBook.title_suggest}</h1>
            <h3 class="text-xl text-gray-400 cursor-pointer">by <span
                    class="font-normal text-gray-800">${singleBook.author_name ? author_name(singleBook.author_name) : "Unknown author"}</span></h3>
            <h3 class="text-xl text-gray-400 cursor-pointer">publisher <span
                    class="font-normal text-gray-800">${singleBook.publisher ? author_name(singleBook.publisher) : "Unknown author"}</span>
            </h3>
            <p class="text-gray-400 mt-4">First publish <span
                    class="font-normal text-gray-800">${singleBook.publish_date ? singleBook.publish_date[0] : "not found"}</span></p>
            <p class="text-gray-500"><span class="font-normal text-gray-800">${singleBook.edition_count ? singleBook.edition_count : "no found"}</span> edition in one
                <span class="font-normal text-gray-800">${singleBook.language ? singleBook.language.length : "1"}</span> languages
            </p>
        </div>
        `
        searchResultContainer.appendChild(div)
    });
    return;
}

//author or publicher name string set
const author_name = (names) => {
    let author_name = ''
    for (const name of names) {
        //fixed 5 showing publisher
        if (name === names[5]) {
            author_name += name + `<span style='color: green;'>...more ${names.length - 5}</span>`;
            return author_name;
        }
        author_name += name + ", "
    }
    return author_name;
}


//spinner show or hidden by function
const loader = loadingStatus => {
    const loaderElement = document.getElementById('loader')
    if (loadingStatus === 'start') {
        loaderElement.style.display = 'block';
    }
    else {
        loaderElement.style.display = 'none';
    }
}

//manage display or not
const displayOrNot = (propertyId, displayValue = 'block') => {
    const displayElement = document.getElementById(propertyId);
    if (displayValue === 'none') {
        displayElement.style.display = 'none';
    } else {
        displayElement.style.display = displayValue;
    }
}



//input field text clear
searchFieldResult.addEventListener('mouseenter', () => {
    clearText.style = 'display: block; color: black'
})
clearText.addEventListener('mouseenter', () => {
    clearText.style = 'display: block; color:red'
})
clearText.addEventListener('click', () => {
    searchFieldResult.value = "";
})
searchFieldResult.addEventListener('mouseleave', () => {
    clearText.style.display = 'none'
})