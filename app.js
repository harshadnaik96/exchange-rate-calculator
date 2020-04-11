const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

//Fetch exchange rate and update the DOM

function calculate() {
  const currency1 = currencyOne.value;
  const currency2 = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency2];

      rateEl.innerText = `1 ${currency1} = ${rate} ${currency2}`;

      amountTwo.value = (amountOne.value * rate).toFixed(2); //set decimal point to 2
    });
}

//Event listeners (since its a select list it has change event,input has a input event )
currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});

calculate();
