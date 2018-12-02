'use strict'
// TODOS

// Delete Alarms Manually from Arr and UI
// Delete Expired Alarms from Arr and UI
// POST Alarms AJAX
// DELETE Alarms AJAX
// GET Alarms AJAX
// USER CRUD AJAX
// USER UI CRUD
// Sort Array by date then time

// Alarm Time
let alarmTime
let d
let hours, minutes, year, day, month
let currentTime = hours + ':' + minutes + ' ' + year + '-' + month + '-' + day

// Weather API
let api 
let count = 0
let C, F, CF
let temp
let lat
let long
let odd
let date
let time
let celOrFer
let weather
let alarmArr = []
let timeForm
let amPm
let countAlarms = 0
let alarmArrTime
let alarmArrDate

// C / F Toggle
function toggleTF(){
    count++
    console.log(count);
    tempCheck();
    if(count === 2){
        count = 0;
        APIWeatherCall(api)
    }
}

function tempCheck(){
console.log("Temp Change F C")
  const temp = ['F', 'C']
  odd = count % 2
  $('#FC').html(temp[odd])
  console.log("FC Switch")

  if (odd === 0) {
    // console.log(F)
    $('#temp').html(F + ' F')
    $('#weatherType').html(weather)
      CF = F
      celOrFer = 'Fahrenheit'
  } else {
    // console.log(C)
    $('#temp').html(C + ' C')
    $('#weatherType').html(weather)
      CF = C
      celOrFer = 'Celsius'
      console.log(C)
  }
}
// Get Location Lat and Log
function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        document.getElementById('LogLat').innerHTML = 'Geolocation is not supported by this browser.'
    }
}

// Temp convertion
function tempature(x){
    // console.log(temp)
    JSON.stringify(x)
    C = x.toFixed(0)
    F = (x * 1.8 + 32).toFixed(0)
}

// Weather Display
function weatherDisplay(x) {
    temp = x.main.temp
    weather = x.weather[0].description
    $('#weatherType').html(weather)
    tempature(temp)
}

//API Call

function APIWeatherCall(x){
    $.ajax({
        url: x,
        type: 'GET',
        success: function(response){
            weatherDisplay(response);
            tempCheck();
        }
    })
}

// Get Long Lat and send AJAX get to weather API
function showPosition (position) {
    lat = position.coords.latitude
    long = position.coords.longitude
    lat = lat.toFixed(2)
    long = long.toFixed(2)
    api = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long
    APIWeatherCall(api); 
}

//On Start get Location
getLocation()

$(() => {
  $('#submitInput').on('click', function () {
    
    console.log(countAlarms)
    let time = document.getElementById('timeInput').value
    let date = document.getElementById('dateInput').value

    // Check for empty entry 
    if(time && date !== ''){
        countAlarms++
        $('#timeInput').val('')
        $('#dateInput').val('')
        timeForm = time
        timeForm = timeForm.split(':')
        // console.log('SPLIT ' + timeForm[0] + ' ' + timeForm)
        let timeForm1 = parseInt(timeForm[0])
        // console.log(timeForm1 + ' | ' + typeof timeForm1)
        if (timeForm1 > 12) {
        amPm = 'PM'
        timeForm1 = timeForm1 - 12
        // console.log('successful convertion ' + timeForm1)
        } else {
        amPm = 'AM'
        }
        timeForm = timeForm.join(':')
        alarmTime = time + ' ' + date
        alarmArr.push(
        {
            alarmTime: time,
            alarmDate: date,
            alarmNumber: countAlarms
        }
        )
        console.log(alarmArr)
        let arrTime = hours + ':' + minutes
        let arrDate = year + '-' + month + '-' + day
        // for (let i = 0; i < alarmArr.length; i++) {
        //   alarmArrTime = alarmArr[i].alarmTime
        //   alarmArrDate = alarmArr[i].alarmDate
        // }

        $('#alarm').append('<li id="' + countAlarms + '">' + date + ' ' + timeForm + '  ' + amPm + '&nbsp;&nbsp;<button id="deleteAlarm' + countAlarms + '">Delete</button>&nbsp;&nbsp;<button id="editAlarm' + countAlarms + '">Edit</button></li>')
        $('#deleteAlarm' + countAlarms).bind('click', function () {
        let li = $(this).parent()
        li.remove()
        for (let i = 0; i < alarmArr.length; i++) {
            let index = alarmArr[i].alarmNumber.toString()
            let target = li[0].id
            if (index === target) {
            alarmArr.splice(i, 1)
            console.log('sliced ' + alarmArr)
            }
        }
        })
    }
  })

  // End Click
})

// Temp update
setInterval(tempCheck, 15000)

// check every second for matching alarm time
setInterval(function checkForAlarm () {
  d = new Date()
  year = d.getFullYear().toString()
  month = d.getMonth() + 1
  month = month.toString()
  day = d.getDate().toString()
  hours = d.getHours().toString()
  minutes = d.getMinutes().toString()
  if (minutes < 10) {
    minutes = '0' + minutes
  }

  if (year < 10) {
    year = '0' + year
  }

  if (day < 10) {
    day = '0' + day
  }

  if (month < 10) {
    month = '0' + month
  }
  if (hours < 10) {
    hours = '0' + hours
  }

  // Update currentTime
  currentTime = hours + ':' + minutes + ' ' + year + '-' + month + '-' + day
  date = day + '/' + month + '/' + year
  time = hours + ':' + minutes
  // check current time with alarm time
  if (alarmArr.length > 0) {
    for (let i = 0; i < alarmArr.length; i++) {
      alarmArrTime = alarmArr[i].alarmTime
      alarmArrDate = alarmArr[i].alarmDate
      const alaramArr = alarmArrTime + ' ' + alarmArrDate
      if (currentTime === alaramArr) {
        console.log('Success')
        success()
      } else {
        console.log('sorry')
      }
    }
    console.log(currentTime + ' | ' + alarmArrTime + ' ' + alarmArrDate)
  }

  // alarmArr.sort(function (a, b) {
  //   const dateA = new Date(a.alarmDate)
  //   const dateB = new Date(b.alarmDate)
  //   const date = dateA - dateB
  //   if (date !== 0) {
  //     return date
  //   }
  //   alarmArr.sort(function (a, b) {
  //     return b.alarmTime < a.alarmTime
  //   })
  // })
  // if (alarmArr.length > 1) {
  //   for (let i = 0; i < alarmArr.length; i++) {
  //     let j = 0
  //     if ((i + 1) < alarmArr.length) {
  //       j = i + 1
  //     }
  //   }
  // }

  // show lat long
  $('#LogLat').html('Latitude ' + lat + ' ' + 'Longitude ' + long)
}, 1000)

// Alarm Success voiceMessage

function success () {
  let voiceMessage = 'Good  morning  it is ' + timeForm + ' ' + amPm + ' todays date is' + date + ' and its ' + CF + '  degrees' + celOrFer + 'and' + weather + 'outside,  Have a great Day'
  let msg = new SpeechSynthesisUtterance(voiceMessage)
  window.speechSynthesis.speak(msg)
  // console.log(alarmArr)
  setTimeout(function () {
    window.speechSynthesis.cancel(msg)
  }, 30000)
}

$('#test').on('click', success)