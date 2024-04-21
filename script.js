const apikey = "dd9277ba322c846efa68215a22be0320";
const weatherEl = document.getElementById("weather-data");
const cityinputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityinputEl.value;
  getweatherData(cityValue);
});

async function getweatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&
        unite=metric`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const section = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `wind speed: ${data.wind.speed}m/s`,
    ];

    weatherEl.querySelector(
      "#icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`;
    weatherEl.querySelector("#temprature").textContent = `${temperature}°C`;
    weatherEl.querySelector("#description").textContent = description;
    weatherEl.querySelector(".details").innerHTML = section
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherEl.querySelector("#icon").innerHTML = "";
    weatherEl.querySelector("#temprature").textContent = " ";
    weatherEl.querySelector("#description").textContent =
      "An error happend, please try again later";
    weatherEl.querySelector(".details").innerHTML = "";
  }
}
