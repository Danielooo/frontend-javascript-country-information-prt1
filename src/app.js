// Endpoints:
//   https://restcountries.com/v3.1/all?fields=name,flags,population,region

import axios from 'axios';

const blockCountryInfo = document.getElementById('countryInfo');
const errorMessage = document.getElementById('error');

void fetchCountryData();

async function fetchCountryData() {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=flags,name,population,region')

    let countries = response.data;
    countries = countries.sort((a, b) => a.population - b.population);

    createListItems(countries);

  } catch ( e ) {
    console.error(e);

    if (e.response.status === 404) {
      errorMessage.textContent = "Pagina niet gevonden | 404";
    } else if (e.response.status === 500) {
      errorMessage.textContent = "Internal server error | 500";
    } else {
      errorMessage.textContent = e;
    }
  }

}


function createListItems(countries) {

  countries.map((country) => {

    const countryElement = document.createElement('li');

    countryElement.innerHTML = `
         <div>
          <img class="country-flag" src="${country.flags.png}" alt="Flag of country: ${country.name.common}" />
          <span class="${regionColor(country.region)}"> ${country.name.common} </span>
          <p class="country-population">Has a population of ${country.population} people </p>
        </div>
      `

    blockCountryInfo.appendChild(countryElement);
  });
}


function regionColor(region) {
  switch (region) {
    case 'Africa':
      return 'region-africa';
    case 'Americas':
      return 'region-americas';
    case 'Asia':
      return 'region-asia';
    case 'Europe':
      return 'region-europe';
    case 'Oceania':
      return 'region-oceania';
    default:
      return 'region-other';
  }
}





