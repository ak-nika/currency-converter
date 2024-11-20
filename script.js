const apiKey = "50b7961799c9b6bf96be639640062961";
const baseUrl = "https://api.exchangeratesapi.io/v1/";
const selects = document.querySelectorAll("select");
const from = document.getElementById("from");
const to = document.getElementById("to");
const convertBtn = document.getElementById("convert");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const resultContainer = document.querySelector(".result");

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
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

getCurrency();

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

  result.textContent = `${toValue} ${conversion.toFixed(2)}`;
  resultContainer.classList.add("success");
});
