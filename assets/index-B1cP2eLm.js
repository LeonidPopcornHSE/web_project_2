(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const e of n.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&a(e)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();document.addEventListener("DOMContentLoaded",()=>{const d=document.getElementById("app");d.innerHTML=`
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
    `;const r="a92ca03181f3a9537da24e7d9ed94f1e",o=document.getElementById("weather-display");document.getElementById("search-btn").addEventListener("click",a),document.getElementById("city-input").addEventListener("keypress",e=>{e.key==="Enter"&&a()}),document.querySelectorAll(".city-btn").forEach(e=>{e.addEventListener("click",()=>{document.getElementById("city-input").value=e.dataset.city,a()})});async function a(){const e=document.getElementById("city-input").value.trim();if(e)try{const c=await(await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&units=metric&lang=ru&appid=${r}`)).json();if(c.cod===200)t(c);else throw new Error(c.message||"Город не найден")}catch(i){alert(i.message)}}function t(e){const i=e.weather[0],c=e.main,s=e.wind;document.getElementById("city-name").textContent=`${e.name}, ${e.sys.country}`,document.getElementById("temperature").textContent=`${Math.round(c.temp)}°C`,document.getElementById("weather-description").textContent=i.description,document.getElementById("humidity").textContent=c.humidity,document.getElementById("wind").textContent=s.speed;const l=`https://openweathermap.org/img/wn/${i.icon}@2x.png`;document.getElementById("weather-icon").innerHTML=`<img src="${l}" alt="${i.main}">`,n(i.main,i.icon.includes("n")),o.classList.remove("hidden")}function n(e,i){const c=document.getElementById("app");let s="default-bg";switch(e.toLowerCase()){case"clear":s=i?"night-clear-bg":"sunny-bg";break;case"clouds":s=i?"night-clouds-bg":"cloudy-bg";break;case"rain":case"drizzle":s="rainy-bg";break;case"thunderstorm":s="storm-bg";break;case"snow":s="snowy-bg";break;case"mist":case"fog":case"haze":s="foggy-bg";break}c.className="",c.classList.add(s)}});
