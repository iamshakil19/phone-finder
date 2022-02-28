//========= global variable
const error = document.getElementById('error')
const productDetails = document.getElementById('details')
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
        productDetails.textContent = '';
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
        const first20 = phones.slice(0, 20)
        first20.forEach(phone => {
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
                        <a onclick="details('${phone.slug}')" class="details-button">Details</a>
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
const details = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}
const displayDetails = phones => {
    console.log(phones);
    productDetails.innerHTML = `
    <div class="row">
        <div class="col-md-6 text-center my-auto">
            <img class="img-fluid rounded" src="${phones.image}" alt="">
            <h6 class="text-light mt-3"> ${phones.releaseDate} </h6>
        </div>
        <div class="col-md-6  text-md-start my-auto">
            <h6 class="text-light mt-3">Name: ${phones.name} </h6>
            <h6 class="text-light mt-3">Brand: ${phones.brand} </h6>
            <h6 class="text-light mt-3">Display: ${phones.mainFeatures.displaySize} </h6>
            <h6 class="text-light mt-3">CPU: ${phones.mainFeatures.chipSet} </h6>
            <h6 class="text-light mt-3">Ram: ${phones.mainFeatures.memory} </h6>
            <h6 class="text-light mt-3">Storage: ${phones.mainFeatures.storage} </h6>
            <h6 class="text-light mt-3">Sensor: ${phones.mainFeatures.sensors[0]}, ${phones.mainFeatures.sensors[1]}, ${phones.mainFeatures.sensors[2]}, ${phones.mainFeatures.sensors[3]} </h6>
            <h6 class="text-light mt-3">Bluetooth: ${phones.others.Bluetooth} </h6>
            <h6 class="text-light mt-3">Storage: ${phones.others.USB} </h6>
        </div>
    </div>
    `
}