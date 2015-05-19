// Chart dimensions
var main_margin = {top: 20, right: 80, bottom: 100, left: 40},
    mini_margin = {top: 585, right: 80, bottom: 20, left: 40},
    main_width  = 1300 - main_margin.left - main_margin.right,
    main_height = 650 - main_margin.top - main_margin.bottom,
    mini_height = 650 - mini_margin.top - mini_margin.bottom;;

// Define some offsets
var axis_offset        = 275,
    legend_offset      = 195,
    legend_text_offset = {height: 518, width: 195},
    legend_rect_offset = {height: 525, width: 235},
    legend_interval    = 40;

// The label for the Y axis
var yLabel = "Duration";

// The date format
var dateFormat = d3.time.format("%b %d"); 

// Define main svg element in #graph
var svg = d3.select("#graph").append("svg")
    .attr("width", main_width + main_margin.left + main_margin.right)
    .attr("height", main_height + main_margin.top + main_margin.bottom);

// Add the clip path
/*svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", main_width - axis_offset)
    .attr("height", main_height);*/

var main = svg.append("g")
    .attr("transform", "translate(" + main_margin.left + "," + main_margin.top + ")");

var mini = svg.append("g")
    .attr("transform", "translate(" + mini_margin.left + "," + mini_margin.top + ")");

var colors = d3.scale.ordinal().range(["#5D5CD6","#FF7236","#5FD664","#D64041","#C53AD6"]);
var parseDate = d3.time.format("%Y-%m-%d");

var main_y  = d3.scale.linear().range([main_height, 0] );
var mini_y  = d3.scale.linear().range([mini_height, 0] );

var main_z = d3.scale.ordinal();
var mini_z = d3.scale.ordinal();

var main_yAxis = d3.svg.axis()
    .scale(main_y)
    .orient("left");

var len = 0;

data = getData();

data.result.forEach(function(d) {
    d.portfolio = d._id.portfolio
    d.date = new Date(d._id.year, d._id.month-1, d._id.day);
    len++;
});

var nestByDate = d3.nest()
                .key(function(d) { return d.date; })
                .sortValues(function(a,b) { return ((a.buildFixTime < b.buildFixTime)
                    ? -1
                    : 1);
                    return 0;} )
                .entries(data.result);

nestByDate.forEach(function(d) {
                var y0 = 0;
                var y1 = 0;
                d.vis = "1";
                d.values.forEach(function(d) {

                    // y0 is the y axis start of the bar
                    d.y0 = y0 + y1;

                    // y1 is the y axis end of the bar
                    d.y1 = y1 = d.buildFixTime;

                    // d.vis controls whether bars are visible or not
                    d.vis = "1";
                });
            });

            var main_x = d3.time.scale().range([0, main_width-main_width/len/2]);
            //main_x.domain(d3.extent(data.result, function(d) { return d.date; }));
            main_x.domain([
                d3.min(data.result, function(d) { return d.date.setDate(d.date.getDate() - 1); }),                  
                d3.max(data.result, function(d) { return d.date.setDate(d.date.getDate() + 2); })
            ]);
            // y axis domain (ie: time)
            main_y.domain([0, d3.max(data.result, function(d) { return d.buildFixTime; })]);
            mini_y.domain([0, d3.max(data.result, function(d) { return d.buildFixTime; })]);
            var mini_x = d3.time.scale().range(main_x.range()).domain(main_x.domain());;

            // Create brush for mini graph
            var brush = d3.svg.brush()
                .x(mini_x)
                .on("brush", brushed);

            // Define the X axis
            var main_xAxis = d3.svg.axis()
                .scale(main_x)
                .ticks(10)
                .orient("bottom");

            var mini_xAxis = d3.svg.axis()
                .scale(mini_x)
                .ticks(10)
                .orient("bottom");

            // Add the X axis
            main.append("g")
                .attr("class", "x axis")
                .attr("clip-path", "url(#clip)")
                .attr("transform", "translate(0," + main_height + ")")
                .call(main_xAxis);

            mini.append("g")
                .attr("class", "x axis mini_axis")
                .attr("clip-path", "url(#clip)")
                .attr("transform", "translate(0," + mini_height + ")")
                .call(mini_xAxis);

            // Add the brush
            mini.append("g")
                .attr("class", "x brush")
                .call(brush)
              .selectAll("rect")
                .attr("y", -10)
                .attr("height", mini_height + 15);

            // Add the Y axis
            main.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(0,0)")
                .call(main_yAxis)
              .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text(yLabel)
                .attr("class","y_label");

            // Create the bars
            var bar = main.selectAll(".bars")
                .data(nestByDate)
              .enter().append("g")
                .attr("class", function(d) { return d.key + "-group bar"; })
                .attr("clip-path", "url(#clip)");

            bar.selectAll("rect")
                .data(function(d) { return d.values; })
              .enter().append("rect")
                //.attr("transform", function(d) { console.log(main_x(d.date)); return "translate(" + (main_x(d.date) - (main_width/len)/2) + ",0)"; })
                .attr("width", function(d) { return main_width/len; })
                .attr("x", function(d) { return main_x(d.date.setDate(d.date.getDate() - 1)) - (main_width/len)/2; })
                .attr("y", function(d) { return main_y(d.y1); })
                .attr("fill", function(d) { return colors(d.portfolio); } )
                .attr("height", function(d) { return main_y(d.y0) - main_y(d.y1); });

            var mini_bar = mini.selectAll(".bars")
                .data(nestByDate)
              .enter().append("g")
                .attr("class", function(d) { return d.key + "-group bar"; })
                .attr("clip-path", "url(#clip)");

            mini_bar.selectAll("rect")
                .data(function(d) { return d.values; })
              .enter().append("rect")
                //.attr("transform", function(d) { console.log(main_x(d.date)); return "translate(" + (main_x(d.date) - (main_width/len)/2) + ",0)"; })
                .attr("width", function(d) { return main_width/len; })
                .attr("x", function(d) { return mini_x(d.date) - (main_width/len)/2; })
                .attr("y", function(d) { return mini_y(d.y1); })
                .attr("fill", function(d) { return colors(d.portfolio); } )
                .attr("height", function(d) { return mini_y(d.y0) - mini_y(d.y1); });


            function brushed() {
                //main_x.domain(d3.extent(data.result, xValue));
                main_x.domain(brush.empty() ? mini_x.domain() : brush.extent());
                console.log(brush.extent());

                bar.selectAll("rect")
                    .attr("width", function(d) { return main_width/len; })
                    .attr("x", function(d) { return main_x(d.date) - (main_width/len)/2; });

                main.select(".x.axis").call(main_xAxis);
            }


function getData() {
    return {
        "result" : [
                {
                        "_id" : {
                                "month" : 1,
                                "day" : 22,
                                "year" : 2014,
                                "portfolio" : "blah"
                        },
                        "buildFixTime" : 3710497
                },
                {
                        "_id" : {
                                "month" : 1,
                                "day" : 23,
                                "year" : 2014,
                                "portfolio" : "blah"
                        },
                        "buildFixTime" : 79209205
                },
                {
                        "_id" : {
                                "month" : 1,
                                "day" : 24,
                                "year" : 2014,
                                "portfolio" : "meh"
                        },
                        "buildFixTime" : 12429859
                },
                {
                        "_id" : {
                                "month" : 1,
                                "day" : 24,
                                "year" : 2014,
                                "portfolio" : "blah"
                        },
                        "buildFixTime" : 25685555.333333332
                },
                {
                        "_id" : {
                                "month" : 1,
                                "day" : 24,
                                "year" : 2014,
                                "portfolio" : "bar"
                        },
                        "buildFixTime" : 27697021.363636363
                },
                {
                        "_id" : {
                                "month" : 1,
                                "day" : 25,
                                "year" : 2014,
                                "portfolio" : "blah"
                        },
                        "buildFixTime" : 15102277
                },
                {
                        "_id" : {
                                "month" : 1,
                                "day" : 27,
                                "year" : 2014,
                                "portfolio" : "blah"
                        },
                        "buildFixTime" : 101979273.53333333
                },
                {
                        "_id" : {
                                "month" : 1,
                                "day" : 27,
                                "year" : 2014,
                                "portfolio" : "bar"
                        },
                        "buildFixTime" : 146337385
                },
                {
                        "_id" : {
                                "month" : 1,
                                "day" : 27,
                                "year" : 2014,
                                "portfolio" : "baz"
                        },
                        "buildFixTime" : 184778745.4
                },
                {
                        "_id" : {
                                "month" : 1,
                                "day" : 28,
                                "year" : 2014,
                                "portfolio" : "foo"
                        },
                        "buildFixTime" : 578188
                },
                {
                        "_id" : {
                                "month" : 1,
                                "day" : 28,
                                "year" : 2014,
                                "portfolio" : "blah"
                        },
                        "buildFixTime" : 15563893
                },
                {
                        "_id" : {
                                "month" : 1,
                                "day" : 28,
                                "year" : 2014,
                                "portfolio" : "meh"
                        },
                        "buildFixTime" : 54849882.35714286
                },
                {
                        "_id" : {
                                "month" : 1,
                                "day" : 29,
                                "year" : 2014,
                                "portfolio" : "foo"
                        },
                        "buildFixTime" : 1180700
                }
        ],
        "ok" : 1
}
}