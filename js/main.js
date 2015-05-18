function brushed(brush, x2, focus, xAxis, yAxis, width, height) {
  x.domain(brush.empty() ? x2.domain() : brush.extent());
  focus.select(".x.axis").call(xAxis);

  d3.csv("output/HIV_pt1_AA_align_tp1_entropies.csv", type, function(error, data) {
    var leftMargin = brush.extent()[0];
    var rightMargin = brush.extent()[1];

    var filteredData = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].index >= leftMargin && data[i].index <= rightMargin) {
        filteredData.push(data[i]);
      }
    }
    
    var barWidth = width / filteredData.length;

    // removing the old child
    var focusDOM = document.querySelector(".focus");
    var rects = document.querySelectorAll(".focus rect");
    for (i = 0; i < rects.length; i++) {
      focusDOM.removeChild(rects[i]);
    }

    for (i = 0; i < filteredData.length; i++) {
      focus.append("rect")
       .attr("x", x(filteredData[i].index))
       .attr("y", y(filteredData[i].entropy))
       .attr("height", height - y(filteredData[i].entropy))
       .attr("width", barWidth)
       .attr("index", filteredData[i].index)
       .attr("onclick", "explodeDetails(this)");
    }
  });
}

function type(d) {
  d.index = +d.index;
  d.entropy = +d.entropy;
  return d;
}


window.onload = (function() {
  var margin = {top: 10, right: 10, bottom: 100, left: 40},
    margin2 = {top: 430, right: 10, bottom: 20, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

  x = d3.scale.linear().range([0, width]);
  x2 = d3.scale.linear().range([0, width]);
  y = d3.scale.linear().range([height, 0]);
  y2 = d3.scale.linear().range([height2, 0]);

  var xAxis = d3.svg.axis().scale(x).orient("bottom"),
      xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
      yAxis = d3.svg.axis().scale(y).orient("left");

  var svg = d3.select("#SVG").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

  var focus = svg.append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var context = svg.append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  var brush = d3.svg.brush()
    .x(x2)
    .on("brush", function() { brushed(brush, x2, focus, xAxis, yAxis, width, height); });

  
  d3.csv("output/HIV_pt1_AA_align_tp1_entropies.csv", type, function(error, data) {
    x.domain(d3.extent(data.map(function(d) { return d.index; })));
    y.domain([0, d3.max(data.map(function(d) { return d.entropy; }))]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");


    var barWidth2 = width / data.length;

    focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    focus.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

    context.append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("y", -6)
      .attr("height", height2 + 7);

    // Draw on little graph
    for (var i = 0; i < data.length; i++) {
      context.append("rect")
       .attr("x", x2(data[i].index))
       .attr("y", y2(data[i].entropy))
       .attr("height", height2 - y2(data[i].entropy))
       .attr("width", barWidth2);
    }

    // Draw Dash Line
    var dashLineStart = 1.4;  // change later
    var dashLineStep = 0.2;
    for (var curr = dashLineStart; curr > 0; curr -= dashLineStep) {
      focus.append("line")
           .style("stroke", "grey")
           .style("stroke-dasharray", "2,2")
           .attr("x1", x(0))
           .attr("y1", y(curr))
           .attr("x2", x(x.domain()[1]))
           .attr("y2", y(curr));
    }

  });
});


