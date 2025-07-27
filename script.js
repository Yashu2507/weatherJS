document.addEventListener("DOMContentLoaded",()=>{
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const tempDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = 'key'; //env Variables

  getWeatherBtn.addEventListener("click", async ()=>{
      const city = cityInput.value.trim();
      if (!city) return;

      //Fetching the data may throw the error!!--> use try.....catch block
      //Server/Database is always be there in another continent It takes time-->use async... await

      try{
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
      }catch(error){
          showError();
      }


  });

  async function fetchWeatherData(city){
    //gets the Data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("REPONSE", response);

    if(!response.ok){
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(weatherData){
    //Display Weather
    console.log(weatherData);
    const {name, main, weather} = weatherData;
    cityNameDisplay.textContent = name;
    tempDisplay.textContent = `Tempereture : ${main.temp} `;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`


    //unlock the Display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden")
  }

  function showError(){
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  }

});
