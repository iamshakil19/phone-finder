//========= global variable
const error = document.getElementById('error')
const searchData = document.getElementById('search-result');

//========== function start

//========== spinner
const spinner = displaystyle => {
    document.getElementById('spinner').style.display = displaystyle
}

//==========  result 
const searchResult = () => {
    searchData.textContent = '';
    const searchInput = document.getElementById('search-input');
    const inputValue = searchInput.value;
    if (inputValue == '') {
        error.textContent = 'Please Enter a Phone Name !';
        searchData.textContent = '';
        return
    }
    else {
        spinner('block')
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
    }
    searchInput.value = '';
}

const displaySearchResult = phones => {
    const phoneFound = phones.length
    if (phones.length <= 0) {
        spinner('none')
        error.textContent = 'Oops! Nothing Found';
        searchData.textContent = '';
        return
    }
    else {
        error.textContent = '';
        error.innerHTML = `<h2 class="text-light">Found Items: ${phoneFound} </h2>`;
        phones.forEach(phone => {
            console.table(phone);
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
            <div class="card h-100">
              <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
                <div class="d-flex align-items-center">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${phone.phone_name}</h5>
                        <h6 class="card-text">Brand: ${phone.brand}</h6>
                    </div>
                    <div class="me-3">
                        <a onclick="" class="details-button" href="">Details</a>
                    </div>
                </div>
            </div>
            `
            searchData.appendChild(div)
            spinner('none')
        })
    }
}

//========== details section 
const 