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
  console.log(percentage);
  var cells = document.querySelectorAll("td");
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].hasAttribute("freq")) {
      var freq = parseFloat(cells[i].getAttribute("freq"));
      cells[i].className = "";
      if (freq < percentage) {
        cells[i].classList.add("diverge");
      } else {
        cells[i].classList.add("converge");
      }
    }
  }
}