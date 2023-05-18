function exportToExcel(fileName, sheetName, table) {
	let myData = [];
	myData = $('#table').tableToJSON();
	
	if (myData.length < 1) {
		console.error('Chưa có data');
		alert('Không có dữ liệu xuất báo cáo');
		return;
	}
	else{
		var header = Object.keys(myData[0]);
		console.log('exportToExcel', myData);
		let wb;
		if (table && table !== '') {
			wb = XLSX.utils.table_to_book($('#' + table)[0]);
		} else {
			const ws = XLSX.utils.json_to_sheet(myData);
			wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, sheetName);
		}
		console.log('wb', wb);
		XLSX.writeFile(wb, `${fileName}.xlsx`);
	}
}

//PDF 
window.jsPDF = window.jspdf.jsPDF
function expdf(){
	let datatable=$('#table').tableToJSON();
if(datatable.length<1){
alert('Không có dữ liệu xuất báo cáo');
}
else{
	var generateData = function() {
		var result = [];

		var data = {
				"Date": "1",
				"Time": "2",
				"Mode": "3",
				"Light": "4",
				"Temperature": "4",
				"Soil": "4",
				"Wheather": "4",
				"Pump": "4",
				"Motor": "4",
				"Fan": "4",
				"Lamp": "4",
				"Warm": "4",
		};
		
		for (var i = 0; i < datatable.length; i += 1) {
			data.ID = (i + 1).toString();
			data.Date = Object.values(datatable[i])[0];
			data.Time = Object.values(datatable[i])[1];
			data.Mode = Object.values(datatable[i])[2];
			data.Light = Object.values(datatable[i])[3];
			data.Temperature = Object.values(datatable[i])[4];
			data.Soil = Object.values(datatable[i])[5];
			data.Wheather = Object.values(datatable[i])[6];
			data.Pump = Object.values(datatable[i])[7];
			data.Motor = Object.values(datatable[i])[8];
			data.Fan = Object.values(datatable[i])[9];
			data.Lamp = Object.values(datatable[i])[10];
			data.Warm = Object.values(datatable[i])[11];
			console.log(data);
			result.push(Object.assign({}, data));
		}
		return result;
	};

	function createHeaders(keys) {
	var result = [];
	for (var i = 0; i < keys.length; i += 1) {
		result.push({
			ID: keys[i],
			name: keys[i],
			prompt: keys[i],
			width: 70,
			align: "left",
			padding: 5
		});
	}
	return result;
	}

	var headers = createHeaders([
		"ID",
		"Date",
		"Time",
		"Mode",
		"Light",
		"Temperature",
		"Soil",
		"Wheather",
		"Pump",
		"Motor",
		"Fan",
		"Lamp",
		"Warm",
			]);
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = day  + '-'+ month  + '-' + year;
	const hour=dateObj.getHours();
	const minute = dateObj.getMinutes();
	const sec=dateObj.getSeconds();
	const times=hour + ':' + minute + ':' + sec;
	console.log(times);
	var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
	doc.setTextColor("blue");
	doc.setFont("helvetica", "bold");
	doc.text("REPORT HISTORY OF SYSTEM", 150, 10, "center",null );
	doc.text("Date: "+output+"   Time: "+times, 60, 40, "center",null );
	
	doc.setTextColor("black");
	doc.setFont("times", "normal");
	doc.table(0, 50, generateData(), headers, { autoSize: true });
	doc.save(`file export ${output}.pdf`);

}

	}

function expandchart(idbtn,chart1,chart2,chart3){
if(this.window.innerWidth>720){
	if (document.getElementById(idbtn).value.indexOf("Mở rộng") >= 0) {
		document.getElementById(chart1).style.width = "80%";
		document.getElementById(chart2).style.display = 'none';
		document.getElementById(chart3).style.display = 'none';
		document.getElementById(idbtn).value="Thu nhỏ";
	}
	else {
		document.getElementById(chart1).style.width = '30%';
		document.getElementById(chart2).style.display = 'flex';
		document.getElementById(chart3).style.display = 'flex';
		document.getElementById(idbtn).value="Mở rộng";
	}
}
}

