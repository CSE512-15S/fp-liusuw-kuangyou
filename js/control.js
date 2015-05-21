// Change the context when choosing different fasta file
function changeContext(d) {
  var selectedFasta = d.options[d.selectedIndex].value;
  // Delete previous graph
  document.getElementById("SVG").innerHTML = "";
  init_SVG(selectedFasta);
}

