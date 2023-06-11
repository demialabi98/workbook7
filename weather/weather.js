let cities = [
  { name: "Benbrook, TX", latitude: 32.6732, longitude: -97.4606 },

  { name: "Tampa, FL", latitude: 27.964157, longitude: -82.452606 },

  { name: "Philadelphia, PA", latitude: 39.952583, longitude: -75.165222 },

  { name: "Portland, OR", latitude: 45.523064, longitude: -122.676483 },

  { name: "San Diego, CA", latitude: 32.715736, longitude: -117.161087 },

  { name: "Atlanta, GA", latitude: 33.753746, longitude: -84.38633 },

  { name: "Denver, CO", latitude: 39.742043, longitude: -104.991531 },
];

// Populate a dropdown with the names of the cities in the array

const cityOptions = document.querySelector("#select-cities");
cityOptions.addEventListener("change", function () {
  const selectedCity = cities.find((city) => city.name == cityOptions.value);
  const apiUrl = `https://api.weather.gov/points/${selectedCity.latitude},${selectedCity.longitude}`;
  getWeatherData(apiUrl);
});
loadCityOptions();

function loadCityOptions() {
  let option = new Option("Select City...");
  cityOptions.appendChild(option);

  for (const city of cities) {
    let option = document.createElement("option");
    option.value = city.name;
    option.innerText = city.name;
    cityOptions.appendChild(option);
  }
}

// Build a table that will hold the results

const tableBody = document.querySelector("#cities-tbl-tbody");
tableBody.innerText = "";
function getWeatherData(apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const foreCast = data.properties.forecast;
      getWeatherForecast(foreCast)
    });
}

function getWeatherForecast(apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const periods = data.properties.periods;

      for (let i = 0; i < periods.length; i++) {
        const period = periods[i];

        const row = document.createElement("tr");

        const numberCell = document.createElement("td");
        numberCell.innerText = period.number;
        row.appendChild(numberCell);

        const nameCell = document.createElement("td");
        nameCell.innerText = period.name;
        row.appendChild(nameCell);

        const tempCell = document.createElement("td");
        tempCell.innerText = period.temperature;
        row.appendChild(tempCell);

        const tempUnitCell = document.createElement("td");
        tempUnitCell.innerText = period.temperatureUnit;
        row.appendChild(tempUnitCell);

        const windSpeedCell = document.createElement("td");
        windSpeedCell.innerText = period.windSpeed;
        row.appendChild(windSpeedCell);

        const windDirectionCell = document.createElement("td");
        windDirectionCell.innerText = period.windDirection;
        row.appendChild(windDirectionCell);

        const shortForcastCell = document.createElement("td");
        shortForcastCell.innerText = period.shortForecast;
        row.appendChild(shortForcastCell);

        tableBody.appendChild(row);
      }
    });
}
