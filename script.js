let apiKey;
let baseUrl;
const selects = document.querySelectorAll("select");
const from = document.getElementById("from");
const to = document.getElementById("to");
const convertBtn = document.getElementById("convert");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const resultContainer = document.querySelector(".result");
const mainContainer = document.querySelector("main");
const loader = document.querySelector("#loader");

let rates = {};

const getCurrency = async () => {
  try {
    const data = await fetch(`${baseUrl}latest?access_key=${apiKey}`);
    const res = await data.json();
    rates = res.rates;

    selects.forEach((select) => {
      select.innerHTML =
        "<option value='' disabled selected>Select a currency</option>";
      Object.keys(rates).forEach((currency) => {
        const option = document.createElement("option");
        option.value = currency;
        option.innerText = currency;
        select.appendChild(option);
      });
    });

    loader.style.display = "none";
    mainContainer.style.display = "flex";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

getCurrency();

const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

convertBtn.addEventListener("click", () => {
  const fromValue = from.value;
  const toValue = to.value;

  if (!fromValue || !toValue) {
    alert("Please select both currencies!");
    return;
  }
  if (!amount) {
    alert("Please enter an amount!");
    return;
  }
  if (!rates[fromValue] || !rates[toValue]) {
    result.textContent = "Error converting currency";
    resultContainer.classList.add("error");
    return;
  }

  const conversionRate = rates[toValue] / rates[fromValue];
  const conversion = conversionRate * Number(amount.value);
  const formattedNumber = formatNumber(conversion);

  result.textContent = `${toValue} ${formattedNumber}`;
  resultContainer.classList.add("success");
});
