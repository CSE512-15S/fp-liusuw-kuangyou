function explodeDetails(d) {
    var currIndex = d.getAttribute("index");
    console.log(currIndex);
    // example query 
    // http://192.241.216.102/512-finalProject/query.php?file=HIV_pt1_AA_align_tp1&index=9&request=csv
    var fileName = "HIV_pt1_AA_align_tp1";
    var url = "http://192.241.216.102/512-finalProject/query.php?file=" + fileName + "&index=" + currIndex + "&request=json";
    d3.json(url, function(error, data) {
		
        var old_table = document.getElementById("details");
		var table_div = old_table.cloneNode();
	
		/*
		var header = table_div.createTHead();
		var row = header.insertRow(0);
		var cell = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell.innerHTML = "<b>Day</b>";
		cell2.innerHTML = "<b>AA</b>";
		*/
        for (var i = 0; i < data.length; i++) {
			
            var currDay = data[i].V;
            var currAAs = data[i].aa;
			var tr = document.createElement('tr');
			var td = document.createElement('td');	
			
			//td.setAttribute("rowspan", currAAs.length-1);
			td.appendChild(document.createTextNode(currDay));
			tr.appendChild(td);
			//tr.appendChild(document.createTextNode(currDay));
			
			
			for (var j = 0; j < currAAs.length; j++){
				
				//var td = document.createElement('td');

				tr.appendChild(document.createTextNode(currAAs[j]));
				//tr.appendChild(td);
				table_div.appendChild(tr);
			}

            
            console.log(currDay);
            console.log(currAAs);


        }
		old_table.parentNode.replaceChild(table_div,old_table);
        
        
    });
  

}