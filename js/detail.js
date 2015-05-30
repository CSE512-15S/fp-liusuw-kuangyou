function explodeDetails(d) {
    var currIndex = d.getAttribute("index");
    var startIndex;
    if (currIndex > 10){
        startIndex = currIndex - 10;
    } else {
        startIndex = 1;
    }
    var endIndex = parseInt(currIndex, 10) + 10;
    console.log(currIndex);
    // example query 
    // http://192.241.216.102/512-finalProject/query.php?file=HIV_pt1_AA_align_tp1&index=9&request=json
    
    var fileName = document.getElementById("sequence_name").innerHTML;
    var url = "http://192.241.216.102/512-finalProject/query.php?file=" + fileName + "&index=" + currIndex + "&request=json";
    d3.json(url, function(error, data) {
        var old_table = document.getElementById("time_line");
        old_table.innerHTML = "";
		//time_line.style.fontSize = "8px";
		//time_line.style.border = "thin solid #6f6d6d";
		//time_line.style.borderColor = "black";

		old_table.setAttribute("BGCOLOR","#ffffff");
		
		var header = old_table.createTHead();
		var row = header.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "<b>Visit</b>";
        cell.style.paddingLeft = "4px";
        cell.style.paddingRight = "4px";
        for (var i = startIndex; i <= endIndex; i++) {
            var cell2 = row.insertCell(i - startIndex + 1);
            cell2.innerHTML = i;
            cell2.style.paddingLeft = "4px";
            cell2.style.paddingRight = "4px";
            if (i == currIndex) {
                cell2.classList.add("highlight_border"); 
            }
        }

        var totalVisits = Object.keys(data[startIndex]).length;
        
        for (var v = 0; v < totalVisits; v++) {
            var currVisit = data[startIndex][v]['V'];
            var currVisitRecordsCount = data[startIndex][v].aa.length;

            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.setAttribute("rowspan", currVisitRecordsCount);
            td.appendChild(document.createTextNode(currVisit));

            tr.appendChild(td);
            // add the first line with line span
            for (var i = startIndex; i <= endIndex; i++) {
                var tdDetail = document.createElement("td");
                
                var splitString = data[i][v].aa[0].split("-");
                tdDetail.setAttribute("freq", splitString[1] + "-" + splitString[2]);
                tdDetail.appendChild(document.createTextNode(splitString[0]));
                if (i == currIndex) {
                    tdDetail.classList.add("highlight_border");
                }
                tr.appendChild(tdDetail);
            }
            old_table.appendChild(tr);

            for (var j = 1; j < data[startIndex][v].aa.length; j++) {
                var trRest = document.createElement("tr");
                for (var col = startIndex; col <= endIndex; col++) {
                    var td = document.createElement("td");
                    
                    var splitString = data[col][v].aa[j].split("-");
                    td.setAttribute("freq", splitString[1] + "-" + splitString[2]);
                    td.appendChild(document.createTextNode(splitString[0]));
                    if (col == currIndex) {
                        td.classList.add("highlight_border");
                    }
                    trRest.appendChild(td);
                }
                old_table.appendChild(trRest);
            }
        }
        var defaultThreshold = 15;
        changeColorCoding(15);
    });
}