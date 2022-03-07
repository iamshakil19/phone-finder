//========= global variable
const error = document.getElementById('error')
const productDetails = document.getElementById('details')
const searchData = document.getElementById('search-result');

//========== function start

//========== spinner
const spinner = displaystyle => {
    document.getElementById('spinner').style.display = displaystyle
}


//========== result 
const searchResult = () => {
    productDetails.textContent = '';
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
    let allPhonesData = phones.slice(21, phones.length);

    const phoneFound = phones.length
    if (phones.length <= 0) {
        spinner('none')
        error.textContent = 'Oops! Nothing Found';
        searchData.textContent = '';
        return
    }
    else {
        error.textContent = '';
        error.innerHTML = `<h2 class="text-light font">Found Items: ${phoneFound} </h2>`;
        const first20 = phones.slice(0, 20)
        first20.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
            <div class="card h-100 pt-3">
              <img src="${phone.image}" class="card-img-top img-fluid w-75 mx-auto" alt="...">
                <div class="d-flex align-items-center">
                    <div class="card-body">
                        <h5 class="card-title font">${phone.phone_name}</h5>
                        <h6 class="card-text font fw-normal">${phone.brand}</h6>
                    </div>
                    <div class="me-3">
                        <a href="#details" onclick="details('${phone.slug}')" class="details-button">Details</a>
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
    productDetails.innerHTML = `
    <div class="row">
        <div class="col-lg-5 text-center  my-auto">
            <img class=" img-fluid w-50 rounded" src="${phones.image}" alt="">
            
        </div>
        <div class="col-lg-7  text-md-start my-auto">
            <h6 class="text-light mt-3"><span class="text-primary">Name:</span> ${phones.name} </h6>
            <h6 id="release" class="text-light mt-3"><span class="text-primary">Release Date:</span> ${phones?.releaseDate ? phones?.releaseDate : ' Not Found'} </h6>
            <h6 class="text-light mt-3"><span class="text-primary">Brand:</span> ${phones.brand} </h6>
            <h6 class="text-light mt-3"><span class="text-primary">Display:</span> ${phones.mainFeatures.displaySize} </h6>
            <h6 class="text-light mt-3"><span class="text-primary">CPU:</span> ${phones.mainFeatures.chipSet} </h6>
            <h6 class="text-light mt-3"><span class="text-primary">Ram:</span> ${phones.mainFeatures.memory} </h6>
            <h6 class="text-light mt-3"><span class="text-primary">Storage:</span> ${phones.mainFeatures.storage} </h6>
            <h6 class="text-light mt-3"><span class="text-primary">Sensor:</span> ${phones.mainFeatures.sensors[0]}, ${phones.mainFeatures.sensors[1]}, ${phones.mainFeatures.sensors[2]}, ${phones.mainFeatures.sensors[3]}, ${phones.mainFeatures.sensors[4]}, ${phones.mainFeatures.sensors[5]} </h6>
            <h6 class="text-light mt-3"><span class="text-primary">Bluetooth:</span> ${phones?.others?.Bluetooth ? phones?.others?.Bluetooth : 'Not Found'} </h6>
            <h6 class="text-light mt-3"><span class="text-primary">USB:</span> ${phones?.others?.USB ? phones?.others?.USB : 'Not Found'} </h6>
            <h6 class="text-light mt-3"><span class="text-primary">Radio:</span> ${phones?.others?.Radio ? phones?.others?.Radio : 'No Found'} </h6>
            <h6 class="text-light mt-3"><span class="text-primary">GPS:</span> ${phones?.others?.GPS ? phones?.others?.GPS : 'Not Found'} </h6>
        </div>
    </div>
    `
}