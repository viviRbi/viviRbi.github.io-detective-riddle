//------------------------------------ JSON

fetch("./qus.json")
  .then(response => response.json())
  .then(data => start(data))
  .catch(err => console.log("err", err))

//------------------------------------ Start Game

window.onclick = function () {
  document.querySelector('.overlay').classList.add("zero-opacity")
  this.setTimeout(function () {
    document.querySelector('.overlay').style.display = "none"
  }, 1000)
}

//------------------------------------- Game play
var alreadyId = []
//......................... grab some info for id & qus the First time
function start(data) {
  var dataText = data
  var id = Math.floor(Math.random() * dataText.length - 1);
  var qusText = document.querySelector('.ques-container h4')
  displayQus(dataText, id, qusText)
}
//........................................ display qus -> Second time start here
function displayQus(dataText, id, qusText) {
  dataText = dataText
  qusText = qusText
  document.querySelector('.conclusion-container').style.display = "block"
  document.querySelector('.check').style.opacity = 0

  id = Math.floor(Math.random() * dataText.length - 1);
  if (!alreadyId.includes(id)) {
    qusText.innerText = dataText[id].qus
    alreadyId.push(id)
    displayAns(dataText, id)
    console.log("old id", alreadyId)
  } else {

    displayQus(dataText, id, qusText)
  }
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

  dataText = dataText
  alreadyId = alreadyId
  alreadyId.push(id)
  for (var i = 0; i < alreadyId.length; i++) {
    id = Math.floor(Math.random() * dataText.length - alreadyId[i])
  }
  var qusText = document.querySelector('.ques-container h4')
  if (alreadyId.length < dataText.length) {
    this.setTimeout(function () {
      document.querySelectorAll('.ans').forEach(e => e.remove())
      displayQus(dataText, id, qusText)
    }, 1000)
  } else {
    qusText.innerText = "Congrats! You have completes all the riddles. You are a genius!"
  }
}


