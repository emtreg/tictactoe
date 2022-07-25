
//array to store marking and empty-status of each tile

var array= [

	[[null,true],[null,true],[null,true]], [[null,true],[null,true],[null,true]], 
	[[null,true],[null,true],[null,true]]

];

//generate table for new game and assign each tile an id

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

//change background color of tile when hovered over

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

//display marking for tile on board and change status of tile to non-empty


function markTile(empty_tile_row, empty_tile_col, marking) {

	$(document).ready(function() {

		$("#s"+empty_tile_row+empty_tile_col+"").css({"font-family": "Papyrus", "text-align": "center", 
									"font-size": "405%", "font-weight": "bold"});
		$("#s"+empty_tile_row+empty_tile_col+"").text(marking);

		});

		array[empty_tile_row][empty_tile_col][0] = marking;
		array[empty_tile_row][empty_tile_col][1] = false;

			if(check_win_rows(marking) == true || 
			check_win_colms(marking) == true ||
			check_win_Diagonals1(marking) == true || 	
			check_win_Diagonals2(marking) == true) {

				return true;
			}

			// check_win_rows(marking);
			// check_win_Diagonals1(marking);
			// check_win_Diagonals1(marking);  	
			// check_win_Diagonals2(marking); 
				
			return false;		
}

//validates that a player's tile selection is valid, if so marks the tile


function playerMove() {

	$(document).ready(function() {

	//if (check_tie() == false) {

		$("td").click(function() {

			var tileID = this.id;
			var rowNum = tileID.charAt(1);	
			var colNum = tileID.charAt(2);

				if(check_tie() == false) {

					if(array[rowNum][colNum][1] == true) {
						
						if(markTile(rowNum, colNum, 'X') == true) {

							$("td").off();
							tileHover();
							alert("Play again?");
							//$(".alert").css("font-family": "Papyrus");

						  } else {
								if(check_tie() == false) {
									setTimeout(function() { computerMove(); }, 500);
							}
						 }
						
					} else {
						alert("Invalid move. Select another tile.");
					}

				} else {
					alert("It's a tie! Play again?");
					 $("td").off();
					 tileHover();
  					
					 return;
				}
		});
	});
}

//generates appropriate move for computer based on game logic


function computerMove() {

	if(!checkRows('O') && !checkColumns('O') && !checkDiagonals1('O') && !checkDiagonals2('O')
		&& !checkRows('X') && !checkColumns('X') && !checkDiagonals1('X') && !checkDiagonals2('X')) {

		randomCompMove();
	}
}

//checks if other player is about to win in row - computer must choose remaining tile
	
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
						 
		} else {
			marking_count = 0;
			empty_count = 0;
			empty_tile_row = 0;
 			empty_tile_col = 0;
		}
	}

	return false;
}

//checks if other player is about to win in column - computer must choose remaining tile


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
								 
		} else {
			marking_count = 0;
			empty_count = 0;
			empty_tile_row = 0;
 			empty_tile_col = 0;
		}
	}

	return false;
}

//checks if other player is about to win on forward diagonal - computer must choose remaining tile


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
	}

	return false;
}

//checks if other player is about to win on backward diagonal - computer must choose remaining tile


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
	}

	return false;

}

//generates a random move for the computer


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

//checks if a player has won horizontally across a row 


function check_win_rows(marking) {

	var marking_count = 0;

 	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {

			if(array[i][j][0] == marking) {
				marking_count++;
			} 		
		}

		if(marking == 'X' && marking_count == 3) {
			alert("Player 1 wins!");
			//$("td").off();
			return true;
						 
		} else if(marking == 'O' && marking_count == 3) {
			alert("Player 2 wins!");
			$("td").off();
			tileHover();
			//$("td").off();
			alert("Play again?");
			return true;
			
		} else {
			marking_count = 0;			
		}
	}

	return false;
}

//checks if a player has won vertically across a column


function check_win_colms(marking) {

	var marking_count = 0;

 	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {

			if(array[j][i][0] == marking) {
				marking_count++;
			} 		
		}

		if(marking == 'X' && marking_count == 3) {
			alert("Player 1 wins!");	
			//$("td").off();			
			return true;
						 
		} else if(marking == 'O' && marking_count == 3) {
			alert("Player 2 wins!");
			$("td").off();
			tileHover();
			//$("td").off();
			alert("Play again?");			
			return true;

		} else {
			marking_count = 0;			
		}
	}

	return false;
}

//checks if a player has won on a forward diagonal

function check_win_Diagonals1(marking) {

	var marking_count = 0;
	
	for(var i=0, j=0; i<3; i++, j++) {

		if(array[i][j][0] == marking) {
			marking_count++;
		} 		
	}

	if(marking == 'X' && marking_count == 3) {
		alert("Player 1 wins!");
		//$("td").off();			
		return true;		
								 
	} else if(marking == 'O' && marking_count == 3) {
		alert("Player 2 wins!");
		$("td").off();
		tileHover();
		//$("td").off();
		alert("Play again?");				
		return true;	
	}

	return false;

}

//checks if a player has won on a backward diagonal

function check_win_Diagonals2(marking) {

	var marking_count = 0;
	
 	for(var i=0, j=2; i<3; i++, j--) {
		if(array[i][j][0] == marking) {
			marking_count++;
		} 		
	}

	if(marking == 'X' && marking_count == 3) {
		alert("Player 1 wins!");
		//$("td").off();
		return true;				
								 
	} else if(marking == 'O' && marking_count == 3) {
		alert("Player 2 wins!");
		$("td").off();
		tileHover();
		//$("td").off();
		alert("Play again?");	
		return true;	
	}

	return false;

}

//checks for a tie


function check_tie() {

	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {

			if(array[i][j][1] == true) {
				return false;
			} 
		}
	}

	return true;

	
}

tileHover();
playerMove();
