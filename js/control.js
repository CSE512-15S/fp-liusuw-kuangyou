// Change the context when choosing different fasta file
function changeContext(d) {
  var selectedFasta = d.options[d.selectedIndex].value;
  // Delete previous graph
  document.getElementById("SVG").innerHTML = "";
  document.getElementById("time_line").innerHTML = "";
  init_SVG(selectedFasta);
}

function changeColorCoding(percent) {
  var percentage = percent / 100.0;
  document.getElementById("threshold").innerHTML = " " + percent + "%";
  console.log(percentage);
  var cells = document.querySelectorAll("td");
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].hasAttribute("freq")) {
      var freq = cells[i].getAttribute("freq");
      var freqSplit = freq.split("-");
      var freqCurrAA = parseFloat(freqSplit[0]);
      var freqConsensus = parseFloat(freqSplit[1]);
      var difference = freqCurrAA - freqConsensus;
      cells[i].className = "";

      var lastClass = $(cells[i]).attr('class').split(' ').pop();
      $(cells[i]).removeClass(lastClass);

      if (cells[i].innerHTML === "-") {
        cells[i].innerHTML = "";
        cells[i].classList.add("align-junk");
      } else if (difference === 0.0 || difference === -0.0) {
        cells[i].classList.add("no-change");
        cells[i].innerHTML = "";
      } else if (difference > percentage) {
        cells[i].classList.add("more-common");
      } else if (difference < -1 * percentage) {
        cells[i].classList.add("less-common");
      } else if (difference < percentage && difference > -1 * percentage) {
        cells[i].classList.add("noise");
      }
    }
  }
}

function showToolTip(d) {
  var currFastaFile = document.getElementById("sequence_name");
  var url = "http://192.241.216.102/512-finalProject/query.php?consensus=" + currFastaFile.innerHTML + "-" + this.getAttribute("col");
  d3.text(url, function(error, text){
    document.getElementById("tooltip").innerHTML = ("Consensus: " + text);
  });
}