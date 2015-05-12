// the reference protein to use
var reference_protein = "MGARASVLSGGELDRWEKIRLRPGG-KKKYKLKHIVWASRELERFAVNPGLLETSEGCRQILGQLQPSLQTGSEELRSLYNTVATLYCVHQRIEIKDTKEALDKIEEEQNKS-----KKKA-QQA-----------AADTG-HS-----------------NQVSQNYPIVQNIQGQMVHQAISPRTLNAWVKVVEEKA-FSPEVIPMFSALSEGATPQDLNTMLNTVGGHQAAMQMLKETINEE-AAEWDRVHPVHAGPIAPGQMREPRGSDIAGTTSTLQEQIGWMT---NNPPI---PVGEIY-K-RW-IIL-GLNKIVRMYSPTSILDIRQGPKEPFRDYVDRFYKTLRAEQASQEVKNWMTETLLV-QNANPDCKTILKALGPAATLEEMMTACQGVGGPGHKARVLAEA---MSQV----TNS----AT-IMMQR----GNFRN-Q--RKIVKCFNCGKEGHTARNCRAPRKKGCWKCGKEGHQMKDCT----E-RQANFLGKIWPS-YK----GRPGNFLQ----------SRPEPT--------APPEE-SFRS---GVE-------TTTPP------QKQEPI----DKE-----LY--PLTSLRSLFGNDPSSQ-";
var reference_name = "B.FR.1983.HXB2_LAI_IIIB_BRU.K03455";

window.onload = (function() {
	var barPlotContainer = d3.select("#bar_plot_container").append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("id", "bar_plot");

  var text = barPlotContainer.append("text");
  var textLabels = text
      .attr("x", 20)
      .attr("y", 500)
      .text(reference_protein)
      .attr("fill", "red")
      .attr("font-size", "16px");
});