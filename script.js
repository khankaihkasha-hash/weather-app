const apiKey="9c891004bf3143ad79166c6e8c563dfe";
const input=document.getElementById("cityInput");
const sug=document.getElementById("suggestions");

/* Auto suggest */
input.addEventListener("input",()=>{
  let q=input.value.trim();
  if(q.length<1){sug.innerHTML="";return;}

  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${q},IN&limit=6&appid=${apiKey}`)
  .then(r=>r.json())
  .then(data=>{
    sug.innerHTML="";
    data.forEach(c=>{
      let div=document.createElement("div");
      div.innerText=c.name+", "+(c.state||"India");
      div.onclick=()=>{
        input.value=c.name;
        sug.innerHTML="";
        getWeather();
      }
      sug.appendChild(div);
    });
  });
});

function getWeather(){
  let city=input.value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
  .then(r=>r.json())
  .then(data=>{
    document.getElementById("city").innerText=data.name;
    document.getElementById("temp").innerText=data.main.temp+"°C";
    document.getElementById("desc").innerText=data.weather[0].main;
    document.getElementById("humidity").innerText="💧 "+data.main.humidity+"%";
    document.getElementById("wind").innerText="🍃 "+data.wind.speed+" km/h";
    document.getElementById("feels").innerText="🤒 "+data.main.feels_like+"°C";
    document.getElementById("visibility").innerText="👁 "+(data.visibility/1000)+" km";
    document.getElementById("pressure").innerText="🧭 "+data.main.pressure+" hPa";

    let w=data.weather[0].main.toLowerCase();
    let icon="clear";
    if(w.includes("cloud")) icon="clouds";
    else if(w.includes("rain")) icon="rain";
    else if(w.includes("drizzle")) icon="drizzle";
    else if(w.includes("thunder")) icon="thunderstorm";
    else if(w.includes("snow")) icon="snow";
    else if(w.includes("mist")) icon="mist";

    document.getElementById("icon").src="icons/"+icon+".png";
  });
}

/* Theme toggle */
let dark=false;
document.getElementById("switch").onclick=()=>{
  dark=!dark;
  document.querySelector(".circle").style.left=dark?"32px":"2px";
  document.body.classList.toggle("dark");
};
