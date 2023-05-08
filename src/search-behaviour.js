import axios from 'axios'

// Moet axios per js bestand worden geimporteerd?
const ENDPOINT = 'https://restcountries.com/v2/name/';


const inputField = document.getElementById('country-name-field');
const countryError = document.getElementById('error-message');
const submitForm = document.getElementById('submit-form');
const countryBlock = document.getElementById('info-block-outer');

// let inputValue = '';

submitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  void fetchCountrySearch( inputField.value )
  // inputField.value = ''
  countryError.innerHTML = '';

});


async function fetchCountrySearch( countryName ) {
  try {
    const response = await axios.get(`${ ENDPOINT }${ countryName }`)
    // Voeg nieuwe class toe het info-block en noem deze hidden
    console.log(response.data[0])
    createCountryBlock(response.data[0]);
    inputField.value = '';
  } catch (e) {
    if (e.status === 404) {
      countryError.innerHTML = `
        <p><b>${inputField.value}</b> niet bekend in database | 404 </p>
      `;
      inputField.value = '';
      countryBlock.innerHTML = '';
    } else if (e.status === 500) {
      countryError.innerHTML = "Internal server error | 500";
      inputField.value = '';
      countryBlock.innerHTML = '';
    } else {
      countryError.innerHTML = e;
      inputField.value = '';
      countryBlock.innerHTML = '';
    }
  }
}


function createCountryBlock(country) {

  countryBlock.innerHTML = `
       <div class="info-block-inner">
          <ul id="country-elements">
             <img src="${country.flags.svg}" alt="Country Flag">
             <p class="bold">${country.name}</p>
             <p>${country.name} is situated in ${country.region}</p>
             <p>It has a population of ${country.population} people</p>
             ${checkCapitalAndCurrency(country)}
             <p>They speak ${sumUpArrayItems(country.languages)}</p>
          </ul>
      </div>
  `;

}


function sumUpArrayItems( countryElementArray ) {

  let summedUp = '';

  if (countryElementArray) {
    countryElementArray.map((element) => {
      if (countryElementArray.length === 1) {
        summedUp = `${element.name}`
      } else if (element !== countryElementArray[countryElementArray.length - 1]) {
        summedUp += `${element.name}, `
      } else {
        summedUp += `and ${element.name}`;
      }
    })
  }

  return summedUp;

}

function checkCapitalAndCurrency(country) {
  try {
    if ( country.capital && country.currencies ) {
      return `<p>The capital is ${country.capital} and you can pay with the ${sumUpArrayItems(country.currencies)}</p>`

    } else if (country.capital) {
      return `<p>The capital is ${country.capital} there are no currencies </p>`
    } else if (country.currencies) {
      return `<p>You can pay with the ${sumUpArrayItems(country.currencies)}, there is no capital</p>`
    } else if ( !country.currencies && !country.capital) {
      return `<p>There is no capital and there are no currencies </p>`;
    }
  } catch (e) {
    return e;
  }
}
