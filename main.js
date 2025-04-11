document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="weather-container">
        <h1>🌍 Мировая Погода</h1>
        <div class="search-box">
          <input type="text" id="city-input" placeholder="Введите город...">
          <button id="search-btn">Поиск</button>
        </div>
        <div id="weather-display" class="weather-card hidden">
          <div class="weather-main">
            <h2 id="city-name"></h2>
            <div id="weather-icon"></div>
            <p id="temperature"></p>
          </div>
          <div class="weather-details">
            <p id="weather-description"></p>
            <p>Влажность: <span id="humidity"></span>%</p>
            <p>Ветер: <span id="wind"></span> м/с</p>
          </div>
        </div>
        <div class="popular-cities">
          <h3>Популярные города:</h3>
          <div class="cities-list">
            <button class="city-btn" data-city="Москва">Москва</button>
            <button class="city-btn" data-city="Лондон">Лондон</button>
            <button class="city-btn" data-city="Нью-Йорк">Нью-Йорк</button>
            <button class="city-btn" data-city="Токио">Токио</button>
            <button class="city-btn" data-city="Париж">Париж</button>
          </div>
        </div>
      </div>
    `;
  
    const API_KEY = 'a92ca03181f3a9537da24e7d9ed94f1e';
    const weatherDisplay = document.getElementById('weather-display');
  
    document.getElementById('search-btn').addEventListener('click', searchWeather);
    document.getElementById('city-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchWeather();
    });
  
    document.querySelectorAll('.city-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('city-input').value = btn.dataset.city;
        searchWeather();
      });
    });
  
    async function searchWeather() {
      const city = document.getElementById('city-input').value.trim();
      if (!city) return;
  
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.cod === 200) {
          displayWeather(data);
        } else {
          throw new Error(data.message || 'Город не найден');
        }
      } catch (error) {
        alert(error.message);
      }
    }
  
    function displayWeather(data) {
      const weather = data.weather[0];
      const main = data.main;
      const wind = data.wind;
      
      document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById('temperature').textContent = `${Math.round(main.temp)}°C`;
      document.getElementById('weather-description').textContent = weather.description;
      document.getElementById('humidity').textContent = main.humidity;
      document.getElementById('wind').textContent = wind.speed;
      
      const iconCode = weather.icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      document.getElementById('weather-icon').innerHTML = `<img src="${iconUrl}" alt="${weather.main}">`;
      
      setWeatherBackground(weather.main, weather.icon.includes('n'));
      
      weatherDisplay.classList.remove('hidden');
    }
  
    function setWeatherBackground(weatherMain, isNight) {
      const app = document.getElementById('app');
      let bgClass = 'default-bg';
      
      switch(weatherMain.toLowerCase()) {
        case 'clear':
          bgClass = isNight ? 'night-clear-bg' : 'sunny-bg';
          break;
        case 'clouds':
          bgClass = isNight ? 'night-clouds-bg' : 'cloudy-bg';
          break;
        case 'rain':
        case 'drizzle':
          bgClass = 'rainy-bg';
          break;
        case 'thunderstorm':
          bgClass = 'storm-bg';
          break;
        case 'snow':
          bgClass = 'snowy-bg';
          break;
        case 'mist':
        case 'fog':
        case 'haze':
          bgClass = 'foggy-bg';
          break;
      }
      
      app.className = '';
      app.classList.add(bgClass);
    }
  });