//------------------------------------ JSON

fetch("./qus.json")
  .then(response => response.json())
  .then(data => displayQus(data))
  .catch(err => console.log("err", err))

//------------------------------------ Start Game

window.onclick = function () {
  document.querySelector('.overlay').classList.add("zero-opacity")
  this.setTimeout(function () {
    document.querySelector('.overlay').style.display = "none"
  }, 1000)
}

//------------------------------------- Game play

function displayQus(data) {
  var dataText = data
  var id = Math.floor(Math.random() * dataText.length - 1);
  var qusText = document.querySelector('.ques-container h4')
  qusText.innerText = dataText[id].qus
  console.log(dataText[id].qus)
  displayAns(dataText, id)
}

function displayAns(dataText, id) {
  dataText = dataText
  id = id
  console.log(id)
  var ansContainer = document.querySelector('.ans-container')
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
  for (let i = 0; i < ansArr.length; i++) {
    ansArr[i].addEventListener('click', function () {
      if (quoteText[i].textContent == dataText[id].ans) {
        console.log('correct')
      } else {
        console.log("wrong")
      }
    })
  }
}


