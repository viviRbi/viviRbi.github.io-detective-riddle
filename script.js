//------------------------------------ Global -------------------

var oldIdArr = []
var score = 0 * 1
//------------------------------------ Fetch JSON -------------------

fetch("./qus.json")
  .then(response => response.json())
  .then(data => { start(data) })
  .catch(err => console.log("err", err))

//------------------------------------ Start Game ----------------------

window.onclick = function () {
  document.querySelector('.overlay').classList.add("zero-opacity")
  this.setTimeout(function () {
    document.querySelector('.overlay').style.display = "none"
  }, 1000)
}

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
  for (let i = 0; i < ansArr.length; i++) {
    ansArr[i].addEventListener('click', function () {
      if (quoteText[i].textContent == dataText[id].ans) {
        document.querySelector('.right-wrong').innerText = "Genius!"
        score += 1 * 1
        document.querySelector('.score-display').innerText = score
        console.log(score)
        reset(id, dataText)
      } else {
        document.querySelector('.right-wrong').innerText = "Incorrect"
        reset(id, dataText)
      }
    })
  }
}

function reset(id, dataText) {
  document.querySelector('.conclusion-container').style.display = "none"
  document.querySelector('.check').style.opacity = 1
  id = id
  dataText = dataText
  this.setTimeout(function () {
    document.querySelectorAll('.ans').forEach(e => e.remove())
    displayQus(dataText, id)
  }, 2000)

  if (oldIdArr.length === 1) {

    document.querySelector('.ques-container h4').remove()
    document.querySelector('.final .conclusion-container').innerText = "Congrats! You have completes all the riddles. You are a true dectective!"
  } else {

    oldIdArr.shift()

  }
}
//------------------------------ Shuffle
// copy from source
// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1)); // random number from 0 to array length
    x = a[i]; // first child in the arr
    a[i] = a[j]; // random
    a[j] = x; // replace first child in the array with random till i=0
  }
  return a;
}