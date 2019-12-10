var qusAns = (function (app) {
  var jsonObj = {};
  var loadJSON = function (path) {
    var xobj = newXMLHttpRequest();
    xobj.overrideMineType('application/json');
    xobj.open('GET', path);
    xobj.onreadystatechange = function () {
      if (xobj.readyState === 4) {
        app.jsonObj = JSON.parse(xobj.responseText;)
      }
    };
    xobj.send(null)
  }
})

window.onclick = function () {
  document.querySelector('.overlay').classList.add("zero-opacity")
  this.setTimeout(function () {
    document.querySelector('.overlay').style.display = "none"
  }, 1000)
}