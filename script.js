//------------------------------------ Global -------------------
var oldIdArr = []
var score = 0 * 1
//------------------------------------ Local Storage---------------
const finalScore = JSON.parse(localStorage.getItem('finalScore')) || []
localStorage.setItem('finalScore', JSON.stringify(finalScore))
// localStorage.clear()
//------------------------------------ Fetch JSON -------------------
fetch("./qus.json")
  .then(response => response.json())
  .then(data => { start(data) })
  .catch(err => console.log("err", err))
//------------------------------------ Reset -------------------
document.querySelector('.reset').addEventListener('click', restartGame)
function restartGame() {
  document.querySelectorAll('.ans').forEach(e => e.remove())
  score = 0 * 1
  document.querySelector('.final .conclusion-container').innerText = "Who is lying?"
  document.querySelector('.score .score-display').innerText = score
  if (document.querySelector('.ques-container h4') === null || document.querySelector('.ques-container h4') === undefined) {
    var qusText = document.createElement('h4')
    var qusHolder = document.querySelector('.ques-container')
    qusHolder.appendChild(qusText)
  }
  fetch("./qus.json")
    .then(response => response.json())
    .then(data => { start(data) })
    .catch(err => console.log("err", err))
}
//------------------------------------ Start Game ----------------------
document.querySelector('.overlay').addEventListener('click', function () {
  document.querySelector('.overlay').classList.add("zero-opacity")
  window.setTimeout(function () {
    document.querySelector('.overlay').style.display = "none"
  }, 4000)
})
//------------------------------------- Game play
//......................... grab some info for id & qus the First time
function start(data) {
  var dataText = data
  oldIdArr = shuffle(dataText)
  var id = oldIdArr[0]
  displayQus(dataText, id)
}
//........................................ display qus -> Second time start here
function displayQus(dataText, id) {
  var qusText = document.querySelector('.ques-container h4')
  dataText = dataText
  id = 0
  document.querySelector('.conclusion-container').style.display = "block"
  document.querySelector('.check').style.opacity = 0
  document.querySelector('.check .explain').innerText = dataText[id].explain
  qusText.innerText = dataText[id].qus
  displayAns(dataText, id)
}

//............................................... display ans (grab some info)
function displayAns(dataText, id) {
  dataText = dataText
  id = id
  var ansContainer = document.querySelector('.ans-container')
  //...............................................  start to display ans
  for (let i = 0; i < dataText[id].quotes.length; i++) {
    var ans = document.createElement('article')
    ans.setAttribute('class', 'ans')
    ansContainer.appendChild(ans)
    var quoteText = document.createElement('h5')
    ans.appendChild(quoteText)
    quoteText.textContent = dataText[id].quotes[i]
  }
  var ansArr = document.querySelectorAll('.ans')
  var quoteText = document.querySelectorAll('h5')
  //............................................... ans on click
  if (!ansArr.forEach(e => e.classList.contains('ans-click'))) {
    for (let i = 0; i < ansArr.length; i++) {
      ansArr[i].addEventListener('click', function (event) {
        this.classList.add('ans-click')
        // this.classList.remove('hover')
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
//............................................... After choose an ans
function reset(id, dataText) {
  document.querySelector('.conclusion-container').style.display = "none"
  document.querySelector('.check').style.opacity = 1
  id = id
  dataText = dataText
  document.querySelectorAll('.ans').forEach(e => e.remove())
  document.querySelector('.ques-container h4').innerHTML = " "
  setTimeout(function () {
    displayQus(dataText, id)
  }, 2000)
  if (oldIdArr.length === 1) {
    this.setTimeout(function () {
      document.querySelectorAll('.ans').forEach(e => e.remove())
      document.querySelector('.check').remove()
      document.querySelector('.ques-container h4').remove()
      document.querySelector('.final .conclusion-container').innerText = "Congrats! You have completes all the riddles. You are a true dectective!"
      document.querySelector('.overlay-score').display = "block"
    }, 1000)
    getTodayDate(score)
    //........................................ Display overlay score board
    var overlayScore = document.querySelector('.overlay-score')
    overlayScore.style.display = "block"
    document.querySelector('.overlay').style.display = "none"
    window.setTimeout(function () {
      overlayScore.style.opacity = "1"
      // Button
      document.querySelector('.restart').addEventListener('click', function () {
        location.reload()
      })
      document.querySelector('.overlay-score .save').addEventListener('click', function () {
        document.querySelector('.name-container h2').innerText = document.querySelector('.overlay-score input').value
      })
    })
  } else {
    oldIdArr.shift()
  }
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
  score = score
  const data = {
    score: score,
    date: todayDay
  }
  finalScore.push(data)
  localStorage.setItem('finalScore', JSON.stringify(finalScore))
  createScoreBoard()
}
//------------------------------- Create High score Board ---------------------------
function createScoreBoard() {
  var boardContainer = document.querySelector('.score-container')
  const value = finalScore
  console.log(value)
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
    console.log(value[i].date)
  }
}
//------------------------------ Shuffle
// copy from source
// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
  var random, index, firstChild;
  for (index = a.length - 1; index > 0; index--) {
    random = Math.floor(Math.random() * (index + 1));
    firstChild = a[index];
    a[index] = a[random];
    a[random] = firstChild;
  }
  return a;
}