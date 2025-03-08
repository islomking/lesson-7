const countriesContainer = document.getElementById("countries-container");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");


async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    displayCountries(data);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

function displayCountries(countries) {
  countriesContainer.innerHTML = ""; 
  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.classList.add("box");
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common}">
      <p>${country.name.common}</p>
    `;
    countriesContainer.appendChild(countryCard);
  });
}

async function searchCountry() {
  const query = searchInput.value.trim();
  if (!query) {
    fetchCountries(); 
    return;
  }
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
    const data = await response.json();
    displayCountries(data);
  } catch (error) {
    console.error("Error searching for country:", error);
  }
}

async function filterByRegion() {
  const region = filterSelect.value;
  if (!region) {
    fetchCountries(); 
    return;
  }
  try {
    const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const data = await response.json();
    displayCountries(data);
  } catch (error) {
    console.error("Error filtering countries:", error);
  }
}


searchInput.addEventListener("input", searchCountry);
filterSelect.addEventListener("change", filterByRegion);

fetchCountries();