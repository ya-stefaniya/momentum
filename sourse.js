///DOM 
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    focus = document.getElementById('focus');
    fulldate = document.getElementById('full-date'),
    weekday = document.getElementById('weekday'),
    month = document.getElementById('month'),
    day = document.getElementById('day'),
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    bgReload = document.querySelector('.bg-reload');
    blockquote = document.querySelector('blockquote');
    btnQuote = document.querySelector('.btn-quote');
    weatherIcon = document.querySelector('.weather-icon');
    temperature = document.querySelector('.temperature');
    wind = document.querySelector('.wind');
    weatherDescription = document.querySelector('.weather-description');
    city = document.querySelector('.city');
    cityInput = document.querySelector('.city_input');
    cityText = document.querySelector('.city_text');
    cityLabel = document.querySelector('.city_label');
    nameInput = document.querySelector('.name_input');
    nameText = document.querySelector('.name_text');
let bgrArr = []


//Show time
showTime = () => {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();
        weekday = days[today.getDay()];
        month = monthNames[today.getMonth()];
        day = today.getDate();

    fulldate.innerHTML = `${weekday}<span>, </span>${month}<span> </span>${day}`
    
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`
    setTimeout(showTime, 1000);
}
//Add zero
addZero = n =>{
    return (parseInt(n, 10) < 10  ? '0' : '') + n;
}
setGreet = ()  => {
    let today = new Date(),
      hour = today.getHours()
    if (hour < 6 || hour > 23) {
      greeting.textContent = 'Good Morning,  '
    } else if (hour < 12) {
      greeting.textContent = 'Good Morning,  '
    } else if (hour < 18) {
      greeting.textContent = 'Good Afternoon,  '
    } else {
      greeting.textContent = 'Good Night,  '
    }
  }
 
/********************* All about Background ***********************/
function makeBackArray() {
    let i = 0
    while (i < 6) {
      let randomBg = `images/night/${Math.floor(Math.random()*20 + 1)}.jpg`
      if (!bgrArr.includes(randomBg)) {
        bgrArr.push(randomBg)
        i++
      }
    }
    while (i < 12) {
      let randomBg = `images/morning/${Math.floor(Math.random()*20 + 1)}.jpg`
      if (!bgrArr.includes(randomBg)) {
        bgrArr.push(randomBg)
        i++
      }
    }
    while (i < 18) {
      let randomBg = `images/day/${Math.floor(Math.random()*20 + 1)}.jpg`
      if (!bgrArr.includes(randomBg)) {
        bgrArr.push(randomBg)
        i++
      }
    }
    while (i < 24) {
      let randomBg = `images/evening/${Math.floor(Math.random()*20 + 1)}.jpg`
      if (!bgrArr.includes(randomBg)) {
        bgrArr.push(randomBg)
        i++
      }
    }
  }
 
makeBackArray();
 
setBg =()=> {
    const today = new Date()
    const hour = today.getHours()
    document.body.style.backgroundImage = `url(${bgrArr[hour]})`
}
changeBgr = () =>{
    const img = document.createElement('img');
    const urlBg = document.body.style.backgroundImage;
    let numberBgImg = bgrArr.indexOf(urlBg.slice(5, -2));
    numberBgImg = (numberBgImg + 1) % 24;
    const src = bgrArr[numberBgImg];
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`
    }
}
// Quote
async function getQuote() {  
    const url = `https://type.fit/api/quotes`;
        const res = await fetch(url);
        const data = await res.json(); 
        blockquote.textContent = data[Math.floor(Math.random() * 1643)].text;
}
  
/********************* All about Name ***********************/
function setName(el) {
  if (el.type === 'keypress') {
    if (el.keyCode === 13) {
      if (nameInput.value.trim() === '') {
        nameText.innerText = localStorage.getItem('name')
        nameInput.classList.add('hidden')
        nameText.classList.remove('hidden')
        getName()
      } else {
        localStorage.setItem('name', nameInput.value)
        nameText.innerText = localStorage.getItem('name')
        nameInput.classList.add('hidden')
        nameText.classList.remove('hidden')
        nameInput.blur()
      }
    }
  } else {
    nameText.classList.add('hidden')
    nameInput.classList.remove('hidden')
  }
}  
newName = (el) =>{
  nameInput.value = '';
  setName(el);
}
clearName =()=> {
  nameInput.setAttribute('placeholder', '');
}
//Get name 
getName = () => {
  if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
    nameText.classList.add('hidden')
    nameInput.classList.remove('hidden')
    nameInput.setAttribute('placeholder', 'Your Name')
  } else {
    nameInput.classList.add('hidden')
    nameText.classList.remove('hidden')
    nameText.textContent = localStorage.getItem('name')
  }
}
blurName =()=> {
  if (nameInput.value.trim() === '') {
    console.log('из блура')
    nameText.innerText = localStorage.getItem('name')
    nameInput.classList.add('hidden')
    nameText.classList.remove('hidden')
    getName()
  } else {
    localStorage.setItem('name', nameInput.value)
    nameText.innerText = localStorage.getItem('name')
    nameInput.classList.add('hidden')
    nameText.classList.remove('hidden')
    getName()
    nameInput.setAttribute('placeholder', 'Write Your Name')
    nameInput.blur()
  }

}

//Set Focus
setFocus = ev => {
    if(ev.type === 'keypress'){
        //make sure enter is pressed
        if(ev.which == 13 || ev.keyCode == 13){
        localStorage.setItem('focus', ev.target.innerText);
        focus.blur();
        }
    } else {
        localStorage.setItem('focus', ev.target.innerText);
    }
}
//Get focus
getFocus = () => {
    if(localStorage.getItem('focus') === null){
        focus.textContent = '[Your Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}
/********************* All about CIty ***********************/
newCity = el => {
    cityInput.value = '';
    setCity(el);
}
setCity = (el) => {
    if(el.type === 'keypress'){
        //make sure enter is pressed
        if(el.which == 13 || el.keyCode == 13){
            if (cityInput.value.trim() === '') {
            cityText.innerText = localStorage.getItem('city');
            getCity();
        } else {
            localStorage.setItem('city', cityInput.value)
            cityText.innerText = localStorage.getItem('city')
            cityInput.classList.add('hidden')
            cityText.classList.remove('hidden')
            cityInput.blur()
            } 
        }
        } else {
                cityText.classList.add('hidden')
                cityInput.classList.remove('hidden')
        }
}
blurCity = () => {
    if (cityInput.value.trim() === '') {
      cityText.innerText = localStorage.getItem('city')
      cityInput.classList.add('hidden')
      cityText.classList.remove('hidden')
      getCity();
    } else {
      localStorage.setItem('city', cityInput.value);
      cityText.innerText = localStorage.getItem('city');
      cityInput.classList.add('hidden');
      cityText.classList.remove('hidden');
      getCity();
      cityInput.setAttribute('placeholder', 'Your City');
      cityInput.blur()
    }
  }
 
getCity = () => {
    if (localStorage.getItem('city') === null || localStorage.getItem('city') === '') {
      cityText.classList.add('hidden')
      cityInput.classList.remove('hidden')
      cityInput.setAttribute('namholder', 'Your City')
    } else {
      cityInput.classList.add('hidden')
      cityText.classList.remove('hidden')
      cityText.textContent = localStorage.getItem('city')
      getWeather()
    }
  }
  clearCity = () => {
    cityInput.setAttribute('placeholder', '')
  }

// Weather
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=c6b238e703c35c528f0e4d75e746b679&units=metric`;
   const res = await fetch(url)
   const data = await res.json()
  
   try {
     weatherIcon.className = 'weather-icon owf'
     weatherIcon.classList.add(`owf-${data.weather[0].id}`);
     weatherDescription.textContent = `${data.weather[0].description}`;
     temperature.textContent = `${data.main.temp}°C`;
   } catch (e) {
     if (localStorage.getItem('city') !== null && localStorage.getItem('city') !== '') {
       cityInput.classList.add('hidden')
       cityText.classList.remove('hidden')
       cityText.textContent = 'Hm,no city like that'
       cityInput.value = ''
       cityInput.setAttribute('placeholder', 'City');weatherDescription.textContent = ' ';
       temperature.textContent = ' ';
     }
   }
 }



//Run
showTime();
setGreet();
setBg();
getName();
getFocus();
getQuote();
getCity();

nameInput.addEventListener('keypress', setName);
nameInput.addEventListener('click', clearName);
nameInput.addEventListener('blur', blurName);
nameText.addEventListener('click', newName);

bgReload.addEventListener('click', changeBgr);


focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

document.addEventListener('DOMContentLoaded', getQuote);
btnQuote.addEventListener('click', getQuote);

document.addEventListener('DOMContentLoaded', getWeather);
cityInput.addEventListener('keypress', setCity);
cityInput.addEventListener('blur', blurCity);
cityInput.addEventListener('click', clearCity);
cityText.addEventListener('click', newCity);