//------------------------------------ Global -------------------
var oldIdArr = []
var score = 0 * 1
//------------------------------------ Local Storage---------------
const finalScore = JSON.parse(localStorage.getItem('finalScore')) || []
localStorage.setItem('finalScore', JSON.stringify(finalScore))
// localStorage.clear()
//------------------------------------ Fetch JSON -------------------
function fecthQusAns() {
  fetch("./qus.json")
    .then(response => response.json())
    .then(data => {
      navbarReset(data)
      start(data)
    })
    .catch(err => console.log("err", err))
}
//------------------------------------ Reset ----------------------------------------------------
function navbarReset(dataText) {
  document.querySelector('.reset').addEventListener('click', function () {
    resetRemoveAdd()
    checkQusText()
    var id = 0
    oldIdArr = shuffle(dataText)
    displayQus(dataText, id)
  })
}
//............................... Reset Remove and Add element 
function resetRemoveAdd() {
  document.querySelectorAll('.ans').forEach(e => e.remove())
  score = 0 * 1
  document.querySelector('.score .score-display').innerText = score
  document.querySelector('.check').style.opacity = 1
  document.querySelectorAll('.ans').forEach(e => e.remove())
}
//............................... If ques-container h4 destroyed
function checkQusText() {
  if (document.querySelector('.ques-container h4') === null || document.querySelector('.ques-container h4') === undefined) {
    var qusText = document.createElement('h4')
    var qusHolder = document.querySelector('.ques-container')
    qusHolder.appendChild(qusText)
  }
}
//------------------------------------ Game title----------------------------------------------------
document.querySelector('.overlay').addEventListener('click', function () {
  document.querySelector('.overlay').classList.add("zero-opacity")
  fecthQusAns()
  window.setTimeout(function () {
    document.querySelector('.overlay').style.display = "none"
  }, 1000)
})
//-------------------------------------Start Game 
//......................... grab some info for id & qus the First time
function start(data, id) {
  var dataText = data
  oldIdArr = shuffle(dataText)
  displayQus(dataText, id)
}
//------------------------------------- display qus -> Second time start here
function displayQus(dataText) {
  var ansArr = document.querySelectorAll('.ans')
  id = 0
  if (ansArr) {
    ansArr.forEach(e => e.remove())
  }
  var qusText = document.querySelector('.ques-container h4')
  document.querySelector('.conclusion-container').style.display = "block"
  document.querySelector('.check').style.opacity = "0"
  document.querySelector('.check .explain').innerText = dataText[id].explain
  qusText.innerText = dataText[id].qus
  displayAns(dataText, id)
}
//-------------------------------------  display ans (grab some info)
function displayAns(dataText, id) {
  var ansContainer = document.querySelector('.ans-container')
  createAns(dataText, id, ansContainer)
  var ansArr = document.querySelectorAll('.ans')
  var quoteText = document.querySelectorAll('h5')
  ansOnClick(dataText, id, ansArr, quoteText)
}
//.............................. create ans element
function createAns(dataText, id, ansContainer) {
  for (let i = 0; i < dataText[id].quotes.length; i++) {
    var ans = document.createElement('article')
    ans.setAttribute('class', 'ans')
    ansContainer.appendChild(ans)
    const ansBlock= document.createElement('div')
    ansBlock.setAttribute('class','ans-block')
    ans.appendChild(ansBlock)
    var quoteText = document.createElement('h5')
    ansBlock.appendChild(quoteText)
    quoteText.textContent = dataText[id].quotes[i]
  }
}
//.................................ans on click
function ansOnClick(dataText, id, ansArr, quoteText) {
  if (!ansArr.forEach(e => e.classList.contains('ans-click'))) {
    for (let i = 0; i < ansArr.length; i++) {
      ansArr[i].addEventListener('click', function (e) {
        e.target.classList.add('ans-click')
        if (quoteText[i].textContent == dataText[id].ans) {
          document.querySelector('.right-wrong').innerText = "Genius!"
          score += 1 * 1
          document.querySelector('.score .score-display').innerText = score
          reset(id, dataText)
        } else {
          document.querySelector('.right-wrong').innerText = "Incorrect"
          reset(id, dataText)
        }
      })
    }
  }
}
//.........................After choose an ans// reset
function reset(id, dataText) {
  document.querySelector('.conclusion-container').style.display = "none"
  document.querySelector('.check').style.opacity = 1
  document.querySelectorAll('.ans').forEach(e => e.remove())
  document.querySelector('.ques-container h4').innerHTML = " "
  setTimeout(function () {
    displayQus(dataText, id)
  }, 2000)
  outOfQus()
}
//......................... If out of question
function outOfQus() {
  if (oldIdArr.length === 1) {
    hideQusAns()
    //........................................ Display overlay score board
    var overlayScore = document.querySelector('.overlay-score')
    overlayScore.style.display = "block"
    document.querySelector('.overlay').style.display = "none"
    scoreBoardButtons(overlayScore)
    getTodayDate(score)
  } else {
    oldIdArr.shift()
  }
}
//...................................................Hide qus ans
function hideQusAns() {
  this.setTimeout(function () {
    document.querySelectorAll('.ans').forEach(e => e.remove())
    document.querySelector('.check').remove()
    document.querySelector('.ques-container h4').remove()
    document.querySelector('.final .conclusion-container').innerText = "Congrats! You have completes all the riddles. You are a true dectective!"
    document.querySelector('.overlay-score').display = "block"
  }, 3000)
}
//-------------------------------------------------- Scoreboard Fade in and button function
function scoreBoardButtons(overlayScore) {
  window.setTimeout(function () {
    overlayScore.style.opacity = "1"
    scoreBoardEvent()
  })
}
//-------------------------------------- Score board Event listener
function scoreBoardEvent() {
  document.querySelector('.restart').addEventListener('click', function () {
    location.reload()
  })
  document.querySelector('.overlay-score input').addEventListener('change', function () {
    document.querySelector('.name-container h2').innerText = document.querySelector('.overlay-score input').value
  })
  document.querySelector('.clear').addEventListener('click', function () {
    var ul = document.querySelectorAll('.score-container ul')
    ul.forEach(e => e.remove())
    localStorage.clear()
  })
}
//------------------------------- Get Date -----------------------------------
function getTodayDate(score) {
  var todayDay = new Date()
  var dd = todayDay.getDate()
  var mm = todayDay.getMonth()
  var yy = todayDay.getFullYear()
  var hour = todayDay.getHours()
  var min = todayDay.getMinutes()
  if (dd < 10) { dd = `0${dd}` }
  if (mm < 10) { mm = `0${mm}` }
  if (hour < 10) { hour = `0${hour}` }
  if (min < 10) { min = `0${min}` }
  todayDay = `${mm}-${dd}-${yy} ${hour}:${min}`
  //------Local Storage
  const data = {
    score: score,
    date: todayDay,
  }
  finalScore.push(data)
  localStorage.setItem('finalScore', JSON.stringify(finalScore))
  createScoreBoard()
}
//------------------------------- Create High score Board ---------------------------
function createScoreBoard() {
  var boardContainer = document.querySelector('.score-container')
  const value = finalScore
  for (let i = 0; i < value.length; i++) {
    var ul = document.createElement('ul')
    var date = document.createElement('li')
    var score = document.createElement('li')
    ul.setAttribute('class', 'date-score-holder')
    date.setAttribute('class', 'date-display')
    score.setAttribute('class', 'score-display')
    boardContainer.appendChild(ul)
    ul.appendChild(date)
    ul.appendChild(score)
    date.innerText = value[i].date
    score.innerText = value[i].score
  }
}
//------------------------------ Shuffle ---------------------------
// copy from source
// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
  var randomIndex, index, lastChild;
  for (index = a.length - 1; index > 0; index--) {
    // + 1 because it's the real length of array index --. Above we -1 because index first child is 0
    randomIndex = Math.floor(Math.random() * (index + 1));
    // swap index last with random number
    lastChild = a[index];
    a[index] = a[randomIndex];
    a[randomIndex] = lastChild;
  }
  return a;
}