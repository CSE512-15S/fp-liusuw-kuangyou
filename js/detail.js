function explodeDetails(d) {
    var currIndex = d.getAttribute("index");
    console.log(currIndex);
    // example query 
    // http://192.241.216.102/512-finalProject/query.php?file=HIV_pt1_AA_align_tp1&index=9&request=csv
    var fileName = "HIV_pt1_AA_align_tp1";
    var url = "http://192.241.216.102/512-finalProject/query.php?file=" + fileName + "&index=" + currIndex + "&request=json";
    d3.json(url, function(error, data) {
		
        var old_table = document.getElementById("time_line");
		//time_line.style.fontSize = "8px";
		//time_line.style.border = "thin solid #6f6d6d";
		//time_line.style.borderColor = "black";
		
		var table_div = old_table.cloneNode();

		table_div.setAttribute("BGCOLOR","#ffffff");
		
		var header = table_div.createTHead();
		var row = header.insertRow(0);
		var cell = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell.innerHTML = "<b>Day</b>";
		cell2.innerHTML = "<b>AA</b>";
		cell.style.paddingLeft = "4px";
		cell.style.paddingRight = "4px";
		cell2.style.paddingLeft = "4px";
		cell2.style.paddingRight = "4px";
		
        for (var i = 0; i < data.length; i++) {
			
            var currDay = data[i].V;
            var currAAs = data[i].aa;
			var tr = document.createElement('tr');
			var th = document.createElement('th');	
			var td = document.createElement('td');	

			th.setAttribute("rowspan", currAAs.length);
			th.appendChild(document.createTextNode(currDay));
			td.appendChild(document.createTextNode(currAAs[0]));	
			tr.appendChild(th);
			tr.appendChild(td);
		
			table_div.appendChild(tr);			
			
			for (var j = 1; j < currAAs.length; j++){				
				var tr = document.createElement('tr');
				var td = document.createElement('td');

				td.appendChild(document.createTextNode(currAAs[j]));
				tr.appendChild(td);
				table_div.appendChild(tr);
			}
			
            console.log(currDay);
            console.log(currAAs);
        }
	
		old_table.parentNode.replaceChild(table_div,old_table);
        
        
    });
  

}