function explodeDetails(d) {
    var currIndex = d.getAttribute("index");
    console.log(currIndex);
    // example query 
    // http://192.241.216.102/512-finalProject/query.php?file=HIV_pt1_AA_align_tp1&index=9&request=csv
    var fileName = "HIV_pt1_AA_align_tp1";
    var url = "http://192.241.216.102/512-finalProject/query.php?file=" + fileName + "&index=" + currIndex + "&request=json";
    d3.json(url, function(error, data) {
        
        for (var i = 0; i < data.length; i++) {
            var currDay = data[i].V;
            var currAAs = data[i].aa;

            // 大概就从这儿开始。。。
            console.log(currDay);
            console.log(currAAs);


        }

        var table_div = document.getElementById("details");
        table_div.appendChild();
    });
  

}