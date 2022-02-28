const searchData = document.getElementById('search-result');
const error = document.getElementById('error')

const searchResult = () => {
    const searchInput = document.getElementById('search-input');
    const inputValue = searchInput.value;
    if (inputValue == '') {
        error.textContent = 'Please Enter a Phone Name'
        return
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => console.log(data.data))
    }
    searchInput.value = '';
}