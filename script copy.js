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
  var id = Math.floor(Math.random() * (dataText.length - 1))
  displayQus(dataText, id)
}
//........................................ display qus -> Second time start here
function displayQus(dataText, id) {
  var qusText = document.querySelector('.ques-container h4')
  dataText = dataText
  id = id
  document.querySelector('.conclusion-container').style.display = "block"
  document.querySelector('.check').style.opacity = 0
  qusText.innerText = dataText[id].qus
  displayAns(dataText, id)

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
    alreadyId = alreadyId

    for (let i = 0; i < dataText.length; i++) {
      if (!alreadyId.includes(id)) {
        alreadyId.push(id)
        if (alreadyId.length >= dataText.length) {
          document.querySelector('.ques-container h4').remove()
          qusText.innerText = "Congrats! You have completes all the riddles. You are a genius!"
        } else {
          this.setTimeout(function () {
            document.querySelectorAll('.ans').forEach(e => e.remove())
            displayQus(dataText, id)
          }, 1000)
        }
      } else {
        var index = alreadyId.indexOf(i)
        alreadyId.slice(index, 1)
        console.log(alreadyId)
      }
    }

  }
}
// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(arr) {
  let counter = arr.length

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter)
    counter--

    let temp = arr[counter];
    arr[index] = temp
  }
  return arr
}
