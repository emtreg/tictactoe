

var array= [

	[[null,true],[null,true],[null,true]], [[null,true],[null,true],[null,true]], 
	[[null,true],[null,true],[null,true]]


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


function markTile(empty_tile_row, empty_tile_col, marking) {

	$(document).ready(function() {

		$("#s"+empty_tile_row+empty_tile_col+"").css({"font-family": "Papyrus", "text-align": "center", 
									"font-size": "405%", "font-weight": "bold"});
		$("#s"+empty_tile_row+empty_tile_col+"").text(marking);

		});

		array[empty_tile_row][empty_tile_col][0] = marking;
		array[empty_tile_row][empty_tile_col][1] = false;

			check_win_rows(marking);
			check_win_colms(marking); 
			check_win_Diagonals(marking);
		
}



function playerMove() {

	$(document).ready(function() {

		$("td").click(function() {

			var tileID = this.id;
			var rowNum = tileID.charAt(1);	
			var colNum = tileID.charAt(2);

			if(array[rowNum][colNum][1] == true) {
				markTile(rowNum, colNum, 'X');

				if(check_tie() == false) {

					computerMove();

				} else {

					alert("It's a tie!");
				}
				

			} else {
				alert("Invalid move. Select another tile.");
			}		
		});	
	});
}

function computerMove() {

	if (checkRows('O') == false) {

		//alert("check rows for O is false");

		if (checkColumns('O') == false) {

			//alert("check colms for O is false");

			if (checkDiagonals1('O') == false) {

				//alert("check diagonals1 for O is false");

				if (checkDiagonals2('O') == false) {

					//alert("check diagonals2 for O is false");

					if (checkRows('X') == false) {

						//alert("check rows for X is false");

						if (checkColumns('X') == false) {

							//alert("check colms for X is false");

							if (checkDiagonals1('X') == false) {

								//alert("check diagonals1 for X is false");

								if (checkDiagonals2('X') == false) {

									//alert("check diagonals2 for X is false");

									randomCompMove();
								}
							}
						}
					}
				}
			}
		}
	}
	
	// checkDiagonals('O');
	// checkRows('X');
	// checkColumns('X');
	// checkDiagonals('X');
	// randomCompMove();

	// if(checkColumns('O') == true) {

	// 	return;
	// }
	// // checkDiagonals('O');
	// // checkRows('X');
	// // checkColumns('X');
	// // checkDiagonals('X');
	// randomCompMove();
}
	
function checkRows(marking) {

 	var marking_count = 0;
	var empty_count = 0;
	var empty_tile_row = 0;
 	var empty_tile_col = 0;

 	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {

			if(array[i][j][0] == marking) {
				marking_count++;

			} else if(array[i][j][1] == true) {
				empty_count++;
				empty_tile_row = i;
 				empty_tile_col = j;			
			}			
		}

		if(marking_count == 2 && empty_count == 1) {
			markTile(empty_tile_row, empty_tile_col, 'O');
			return true;
			break;
						 
		} else {
			marking_count = 0;
			empty_count = 0;
			empty_tile_row = 0;
 			empty_tile_col = 0;
		}
	}

	return false;
}


function checkColumns(marking) {

 	var marking_count = 0;
	var empty_count = 0;
	var empty_tile_row = 0;
 	var empty_tile_col = 0;

 	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {
			if(array[j][i][0] == marking) {
				marking_count++;

			} else if(array[j][i][1] == true) {
				empty_count++;
				empty_tile_row = j;
 				empty_tile_col = i;			
			}			
		}

		if(marking_count == 2 && empty_count == 1) {

			markTile(empty_tile_row, empty_tile_col, 'O');
			return true;
			break;
								 
		} else {
			marking_count = 0;
			empty_count = 0;
			empty_tile_row = 0;
 			empty_tile_col = 0;
		}
	}

	return false;
}

function checkDiagonals1(marking) {

	var marking_count = 0;
	var empty_count = 0;
	var empty_tile_row = 0;
 	var empty_tile_col = 0;

	for(var i=0, j=0; i<3; i++, j++) {

		if(array[i][j][0] == marking) {
			marking_count++;

		} else if(array[i][j][1] == true) {
			empty_count++;
			empty_tile_row = i;
 			empty_tile_col = j;	
		}			
	}

	if(marking_count == 2 && empty_count == 1) {
		markTile(empty_tile_row, empty_tile_col, 'O');	
		return true;
		//break;
								 
	}

	return false;

}

function checkDiagonals2(marking) {

	marking_count = 0;
	empty_count = 0;
	empty_tile_row = 0;
 	empty_tile_col = 0; 

 	for(var i=0, j=2; i<3; i++, j--) {

		if(array[i][j][0] == marking) {
			marking_count++;

		} else if(array[i][j][1] == true) {
			empty_count++;
			empty_tile_row = i;
 			empty_tile_col = j;	
		}			
	}

	if(marking_count == 2 && empty_count == 1) {
		markTile(empty_tile_row, empty_tile_col, 'O');
		return true;
		//break;	
								 
	}

	return false;

}

function randomCompMove() {

	var rowNum = Math.floor(Math.random()*Math.floor(3));
	var colNum = Math.floor(Math.random()*Math.floor(3));

	while(array[rowNum][colNum][1] != true) {

		rowNum = Math.floor(Math.random()*Math.floor(3));
		colNum = Math.floor(Math.random()*Math.floor(3));
	}

	markTile(rowNum, colNum, 'O');
	return true;

}

function check_win_rows(marking) {

	var marking_count = 0;

 	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {

			if(array[i][j][0] == marking) {
				marking_count++;
			} 		
		}

		if(marking == 'X' && marking_count == 3) {
			alert("Player 1 has won!");
			return true;
			break;
						 
		} else if(marking == 'O' && marking_count == 3) {
			alert("Player 2 has won!");
			return true;
			break;

		} else {
			marking_count = 0;
			
		}
	}

	return false;
}


function check_win_colms(marking) {

	var marking_count = 0;

 	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {

			if(array[j][i][0] == marking) {
				marking_count++;
			} 		
		}

		if(marking == 'X' && marking_count == 3) {
			alert("Player 1 has won!");
			return true;
			break;
						 
		} else if(marking == 'O' && marking_count == 3) {
			alert("Player 2 has won!");
			return true;
			break;

		} else {
			marking_count = 0;
			
		}
	}

	return false;
}

function check_win_Diagonals(marking) {

	var marking_count = 0;
	
	for(var i=0, j=0; i<3; i++, j++) {

		if(array[i][j][0] == marking) {
			marking_count++;

		} 		
	}

	if(marking == 'X' && marking_count == 3) {
		alert("Player 1 has won!");
		return true;
		//break;	
								 
	} else if(marking == 'O' && marking_count == 3) {
		alert("Player 2 has won!");
		return true;
		//break;
	}

	marking_count = 0;
	
 	for(var i=0, j=2; i<3; i++, j--) {

		if(array[i][j][0] == marking) {
			marking_count++;

		} 		
	}

	if(marking == 'X' && marking_count == 3) {
		alert("Player 1 has won!");
		return true;
		//break;	
								 
	} else if(marking == 'O' && marking_count == 3) {
		alert("Player 2 has won!");
		return true;
		//break;
	}

	return false;

}

function check_tie() {

	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {

			if(array[i][j][1] != false) {
				return false;
			} 		
		}
	}

	return true;
	alert("It's a tie!");
}


tileHover();
playerMove();
