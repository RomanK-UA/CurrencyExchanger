
import {animateValueOutput} from './animations.js'

const apiKey = 'ceb7fc966ba3b1053f2508fb';

const currencies = ["USD", "EUR", "UAH", "AUD", "BGN", "CAD", "DKK", "EGP", "PLN", "RON", "SEK", "TRY" /* ... */];

const selectCurrency = document.getElementById("currencySelect");
const selectTargetCurrency = document.getElementById("targetCurrencySelect")

// Adding currencies to the select 
currencies.forEach(currency => {
  const optionCurrency = document.createElement('option');
  optionCurrency.value = currency;
  optionCurrency.textContent = currency;
  selectCurrency.appendChild(optionCurrency);

  const optionTargetCurrency = document.createElement('option');
  optionTargetCurrency.value = currency;
  optionTargetCurrency.textContent = currency;
  selectTargetCurrency.appendChild(optionTargetCurrency);
});


async function currencyExchange(currency, target) {
  const url = `https://v6.exchangerate-api.com/v6/ceb7fc966ba3b1053f2508fb/pair/${currency}/${target}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
}

const btn = document.getElementById("submitBtn");
const inputField = document.getElementById("currencyValueInput");

inputField.oninput = function(event) {
  event.preventDefault(); 
  const currency = selectCurrency.value;
  const target = selectTargetCurrency.value;
  const outputField = document.getElementById("targetCurrencyOutput");
  const inputValue = inputField.value;

  currencyExchange(currency, target)

.then(exchange => {
  const result = exchange.conversion_rate * inputValue;
  outputField.innerHTML = result.toFixed(2);

  animateValueOutput(outputField, result);
})
.catch(error => {
  console.log(error);
});
};

