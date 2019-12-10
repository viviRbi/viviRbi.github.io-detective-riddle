//------------------------------------ JSON

fetch("./qus.json")
  .then(response => response.json())
  .then(data => { start(data) })
  .catch(err => console.log("err", err))

//------------------------------------ Start Game

window.onclick = function () {
  document.querySelector('.overlay').classList.add("zero-opacity")
  this.setTimeout(function () {
    document.querySelector('.overlay').style.display = "none"
  }, 1000)
}

//------------------------------------- Game play

var oldIdArr = []
//......................... grab some info for id & qus the First time
function start(data) {
  var dataText = data
  oldIdArr = shuffle(dataText)
  var id = oldIdArr[0]
  console.log(id)
  displayQus(dataText)
}
//........................................ display qus -> Second time start here
function displayQus(dataText, id) {
  var qusText = document.querySelector('.ques-container h4')
  dataText = dataText
  id = 0
  document.querySelector('.conclusion-container').style.display = "block"
  document.querySelector('.check').style.opacity = 0
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
  id = Math.floor(Math.random() * (dataText.length - 1))
  dataText = dataText
  this.setTimeout(function () {
    document.querySelectorAll('.ans').forEach(e => e.remove())
    displayQus(dataText, id)
  }, 1000)

  if (oldIdArr.length === 1) {

    document.querySelector('.ques-container h4').remove()
    document.querySelector('.final .conclusion-container').innerText = "Congrats! You have completes all the riddles. You are a genius!"
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
    j = Math.floor(Math.random() * (i + 1)); // random number from 0 to a.length
    x = a[i]; // last one in the arr
    a[i] = a[j]; // random
    a[j] = x; // random = last one in the array
  }
  return a;
}