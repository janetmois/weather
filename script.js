/* запрашиваем API на https://openweathermap.org/
https://openweathermap.org/current => API call => https://api.openweathermap.org/data/2.5
    Доступ к API */
const api = {
    //будет объектом, потому что сначала включу ссылку на которую я хочу получить доступ
    //потом свой ключ API Key
    endpoint: "https://api.openweathermap.org/data/2.5/", //вместо endpoint можно выбрать любое слово
    key: "ff04afa89700ead41e40cf4a9aa5729a"
}
//console.log(api); //endpoint и key отобразятся как object
const input = document.querySelector("#input");
input.addEventListener("keydown", enter);
/*проверяем     function enter(){
                console.log("hey");}*/

function enter(e){
    //если нажата enter (key 13) (e)-произойдет событие, то мы вызываем ф.getInfo и получаем информацию
    if (e.keyCode === 13){
        getInfo(input.value); //получаем доступ к тому, что пишет пользователь
    }
}
//это будет async JS
async function getInfo(data){ //data - параметр (любое название)
                            //ссылка на сайт,погода,data-город
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appid=${api.key}`) //связыываем с сылкой
    //console.log(res);
    const result = await res.json();
    /*температура сейчас:
    console.log(result);
    console.log(result.main.temp);
    console.log(result.main.feels_like);
    console.log(result.main.temp_min);
    console.log(result.main.temp_max);
    console.log(result.name);
    console.log(result.sys.country);
    console.log(result.weather[0].description (or main)); //clouds or sunny */

    //отражаем результат, назовем функцию displayResult:
    displayResult(result); //чтобы не потерять найденные данные (result) вводим как параметр
}
function displayResult(result){
    //console.log(result);
    // получаем доступ к строке, где нужно отразить город и страну let city (let -потому что значения будут меняться)
    let city = document.querySelector("#city");
    city.textContent = `${result.name}, ${result.sys.country}`;

    //date (тут ее вызываем, чтобы она по очереди тут показалась), а описание на строке 67
    getOurDate(result.timezone);

    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`; //innerHTML чтобы отобразить знак градуса

    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML = `Feels like: ${Math.round(result.main.feels_like)}<span>°</span>`;
    //feelsLike.innerHTML = "Feels like: " + `${Math.round(result.main.feels_like)}<span>°</span>`;

    let conditions = document.querySelector("#conditions");
    conditions.textContent = `${result.weather[0].main}`;

    let variation = document.querySelector("#variation");
    //variation.innerHTML = `Min: ${Math.round(result.main.temp_min)}<span>°</span> Max: ${Math.round(result.main.temp_max)}<span>°</span>`;
    variation.innerHTML = "Min: " + `${Math.round(result.main.temp_min)}<span>°</span>` + " Max: " + `${Math.round(result.main.temp_max)}<span>°</span>`;
}
//для даты создаем функцию с учетом timezone города:
function getOurDate(timezone) {
    //today's day
    // const myDate = new Date();
    //console.log(myDate);

    // текущее UTC-время в миллисекундах
    const nowUtc = Date.now();
const utcTime = nowUtc + new Date().getTimezoneOffset() * 60000; // текущее UTC
const cityTime = new Date(utcTime + timezone * 1000); // городское время
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    /* week day (по методу getDay будут показаны цифры дней недели, начиная с воскресенья)
    let day = document.querySelector("#date").innerHTML = days[myDate.getDay()];
    //console.log(day);
    //date
    let todayDate = document.querySelector("#date").innerHTML = myDate.getDate();
    console.log(todayDate); // но в этом случае у нас день недели заменится числом (датой) поэтому перепишем так: */
    // let day = days[myDate.getDay()];
    // console.log(day);
    // let todayDate = myDate.getDate();
    // console.log(todayDate);

    //month
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // let month = months[myDate.getMonth()];
    // console.log(month);

    //year
    // let year = myDate.getFullYear();
    // console.log(year);

    const dayName = days[cityTime.getDay()];
    const day = cityTime.getDate();
    const month = months[cityTime.getMonth()];
    const year = cityTime.getFullYear();
    //теперь отражаем это всё:
    let actualDate = document.querySelector("#date");
    actualDate.textContent = `${dayName} ${day} ${month} ${year}`;
}
// getOurDate();