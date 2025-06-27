
async function search(city) {
    let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
    if (t.ok && 400 != t.status) {
        let city = await t.json();
        displayCurrent(city.location, city.current),
        displayAnother(city.forecast.forecastday)
    }
}
document.getElementById("search").addEventListener("keyup", city => {
    search(city.target.value)
}
);
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayCurrent(city, t) {
    if (null != t) {
        let x = new Date(t.last_updated.replace(" ", "T"));
        let cartona = `<div class="today forecast ">\n   
         <div class="forecast-header"  id="today">\n
             <div class="day">${days[x.getDay()]}</div>\n  
               <div class=" date">${x.getDate() + monthNames[x.getMonth()]}</div>\n  
                 </div> \x3c!-- .forecast-header --\x3e\n   
                  <div class="forecast-content" id="current">\n  
                    <div class="location">${city.name}</div>\n  
                      <div class="degree">\n     
                         <div class="num">${t.temp_c}<sup>o</sup>C</div>\n   
                            \n        <div class="forecast-icon">\n      
                                  <img src="https:${t.condition.icon}" alt="" width=90>\n   
                                       </div>\t\n    \n    </div>\n    <div class="custom">${t.condition.text}</div>\n 
                                          <span><img src="images/icon-umberella.png" alt="">20%</span>\n\t\t\t\t\t\t\t\t
                                          <span>
                                          <img src="images/icon-wind.png" alt="">18km/h</span>\n\t\t\t\t\t\t\t\t
                                          <span><img src="images/icon-compass.png" alt="">East</span>\n    
                                          </div>\n</div>`;
        document.getElementById("forecast").innerHTML = cartona
    }
}
function displayAnother(city) {
    let t = "";
    for (let x = 1; x < city.length; x++)
        t += `\t<div class="forecast">\n  
            <div class="forecast-header">\n  
            <div class="day">${days[new Date(city[x].date.replace(" ", "T")).getDay()]}</div>\n 
             </div> \x3c!-- .forecast-header --\x3e\n   
              <div class="forecast-content">\n    
               <div class="forecast-icon">\n      
                 <img src="https:${city[x].day.condition.icon}" alt="" width=48>\n 
                   </div>\n          
                     <div class="degree">${city[x].day.maxtemp_c}<sup>o</sup>C</div>\n       
                      <small>${city[x].day.mintemp_c}<sup>o</sup></small>\n   
                        <div class="custom">${city[x].day.condition.text}</div>\n     
                          </div>\n        </div>`;
    document.getElementById("forecast").innerHTML += t
}
search("cairo");
