

var array= [

	[[null,true],['O',false],[null,true]], [[null,true],[null,true],[null,true]], 
	[[null,true],['O',false],[null,true]]

];

function makeTable() {

	var table = document.getElementById("table");
	var row;
	var cell;

	for(var i=0; i<3; i++) {
		row = table.insertRow(i);
		for(var j=0; j<3; j++) {
			cell = row.insertCell(j);
			cell.setAttribute("id", "s" + i+ "" +j);						
		}
	}
}


function tileHover() {

	$(document).ready(function() {

		$("td").hover(function() {

			var tileID = this.id;
			var rowNum = tileID.charAt(1);	
			var colNum = tileID.charAt(2);

			if(array[rowNum][colNum][1] == true) {

			$(this).css("background-color", "#cccccc");

			}
		},

		function(){

			$(this).css("background-color", "white");
		});
	});
}


function playerMove() {

	$(document).ready(function() {

		$("td").click(function() {

			var tileID = this.id;
			var rowNum = tileID.charAt(1);	
			var colNum = tileID.charAt(2);


			if(array[rowNum][colNum][1] == true) {

				markTile(rowNum, colNum, 'X');


				// $(this).css({"font-family": "Papyrus", "text-align": "center", 
				// 	"font-size": "405%", "font-weight": "bold"} );

				// $(this).text("X");

				// array[rowNum][colNum][1] = false;
				// array[rowNum][colNum][0] = 'X';

			} else {

				alert("Invalid move. Select another tile.");
			}
		
		});	
	});

}

function markTile(empty_tile_row, empty_tile_col, marking) {

	$(document).ready(function() {

		$("#s"+empty_tile_row+empty_tile_col+"").css({"font-family": "Papyrus", "text-align": "center", 
									"font-size": "405%", "font-weight": "bold"});
		$("#s"+empty_tile_row+empty_tile_col+"").text(marking);

		});

		array[empty_tile_row][empty_tile_col][0] = marking;
		array[empty_tile_row][empty_tile_col][1] = false;
}

	
function checkRows() {

 	var o_count = 0;
	var empty_count = 0;
	var empty_tile_row = 0;
 	var empty_tile_col = 0;

 	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {

			if(array[i][j][0] == 'O') {
				o_count++;

			} else if(array[i][j][1] == true) {
				empty_count++;
				empty_tile_row = i;
 				empty_tile_col = j;			
			}			
		}

		if(o_count == 2 && empty_count == 1) {
			markTile(empty_tile_row, empty_tile_col, 'O');
			break;
						 
		} else {
			o_count = 0;
			empty_count = 0;
			empty_tile_row = 0;
 			empty_tile_col = 0;
		}
	}
}


function checkColumns() {

 	var o_count = 0;
	var empty_count = 0;
	var empty_tile_row = 0;
 	var empty_tile_col = 0;

 	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {
			if(array[j][i][0] == 'O') {
				o_count++;

			} else if(array[j][i][1] == true) {
				empty_count++;
				empty_tile_row = j;
 				empty_tile_col = i;			
			}			
		}

		if(o_count == 2 && empty_count == 1) {

			markTile(empty_tile_row, empty_tile_col, 'O');
			break;
								 
		} else {
			o_count = 0;
			empty_count = 0;
			empty_tile_row = 0;
 			empty_tile_col = 0;
		}
	}
}


tileHover();
playerMove();
checkRows();
checkColumns();

















