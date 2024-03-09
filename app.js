
const BASE_URL = "https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
  for (currcode in countryList) {

    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;

    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  })
}


/*------------Function to update Flags------------------*/
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}


/*------------Function to update Exchangerate------------------*/
const updateExchangeRate = (data, amtval) => {
  let FinalAmout = data.result;
  msg.innerText = `${amtval} ${fromCurr.value} = ${FinalAmout} ${toCurr.value}`;
}

/*------------Function to get Exchangerate------------------*/
async function getexchangeRate() {

  let amount = document.querySelector(".amount input ");
  let amtval = amount.value;

  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }

  const url = `${BASE_URL}from=${fromCurr.value.toLowerCase()}&to=${toCurr.value.toLowerCase()}&amount=${amtval}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7e894ab668mshd5b079f71fa9a8dp1a843bjsn2da249536775',
      'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    let data = JSON.parse(result);
    updateExchangeRate(data, amtval);

  } catch (error) {
    console.error(error);
    alert("Try Again !");
  }
}


window.addEventListener("load", () => {
  getexchangeRate();
});

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  getexchangeRate();
})
